import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonDirective } from 'primeng/button';
import { Card } from 'primeng/card';
import { DatePicker } from 'primeng/datepicker';
import { InputMask } from 'primeng/inputmask';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { Toast } from 'primeng/toast';
import { FieldErrorComponent } from '../shared/components/field-error/field-error.component';
import { ReservaApiService } from './services/reserva-api.service';

const WEEKDAYS = [
  'domingo',
  'segunda-feira',
  'terça-feira',
  'quarta-feira',
  'quinta-feira',
  'sexta-feira',
  'sábado',
];

type SelectOption = { label: string; value: string };

function validateCpf(control: AbstractControl): { [key: string]: boolean } | null {
  const val: string = control.value ?? '';
  return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(val) ? null : { cpfIncomplete: true };
}

@Component({
  selector: 'app-reserva',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, InputText, InputMask, Select, DatePicker, ButtonDirective, Card, FieldErrorComponent, Toast],
  providers: [MessageService],
  templateUrl: './reserva.page.html',
  styleUrl: './reserva.page.scss',
})
export class ReservaPage {
  private readonly fb = inject(FormBuilder);
  private readonly reservaApi = inject(ReservaApiService);
  private readonly messageService = inject(MessageService);

  readonly sending = signal(false);

  readonly minDate = new Date();

  readonly nameErrors = { required: 'Nome completo é obrigatório', minlength: 'Informe pelo menos 3 caracteres' };
  readonly cpfErrors = { required: 'Informe o CPF completo', cpfIncomplete: 'Informe o CPF completo' };
  readonly dateErrors = { required: 'Selecione a data da reserva' };
  readonly timeSlotErrors = { required: 'Selecione o horário' };

  readonly timeSlots: SelectOption[] = Array.from({ length: 17 }, (_, i) => {
    const hour = i + 6;
    return { label: `${hour}:00`, value: `${hour}h` };
  });

  private createSlot(): FormGroup {
    return this.fb.group({
      date: [null as Date | null, Validators.required],
      timeSlot: [null as SelectOption | null, Validators.required],
    });
  }

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    cpf: ['', [Validators.required, validateCpf]],
    slots: this.fb.array([this.createSlot()]),
  });

  get slots(): FormArray {
    return this.form.get('slots') as FormArray;
  }

  readonly slotControls = signal<FormGroup[]>([...this.slots.controls] as FormGroup[]);

  addSlot(): void {
    this.slots.push(this.createSlot());
    this.slotControls.set([...this.slots.controls] as FormGroup[]);
  }

  removeSlot(index: number): void {
    this.slots.removeAt(index);
    this.slotControls.set([...this.slots.controls] as FormGroup[]);
  }

  private readonly formValues = toSignal(this.form.valueChanges, {
    initialValue: this.form.value,
  });

  readonly emailBody = computed(() => {
    const v = this.formValues();
    if (!v.name || !v.cpf) return '';
    if (!this.form.valid) return '';

    const slots = (v.slots ?? []) as Array<{ date: Date | null; timeSlot: SelectOption | null }>;
    if (!slots.length || slots.some(s => !s.date || !s.timeSlot)) return '';

    const firstName = v.name.trim().split(' ')[0];
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';

    const formatSlot = (slot: { date: Date; timeSlot: SelectOption }): string => {
      const weekday = WEEKDAYS[slot.date.getDay()];
      const day = String(slot.date.getDate()).padStart(2, '0');
      const month = String(slot.date.getMonth() + 1).padStart(2, '0');
      return `${weekday}, dia ${day}/${month} às ${slot.timeSlot.value}`;
    };

    const validSlots = slots as Array<{ date: Date; timeSlot: SelectOption }>;

    if (validSlots.length === 1) {
      return (
        `${greeting}!\n\n` +
        `Meu nome é ${v.name} com o CPF ${v.cpf} e gostaria de reservar a quadra de tênis sintética ` +
        `para essa ${formatSlot(validSlots[0])}.\n\n` +
        `Att,\n${firstName}`
      );
    }

    const slotLines = validSlots.map(s => `- ${formatSlot(s)}`).join('\n');
    return (
      `${greeting}!\n\n` +
      `Meu nome é ${v.name} com o CPF ${v.cpf} e gostaria de reservar a quadra de tênis sintética ` +
      `nas seguintes datas:\n${slotLines}\n\n` +
      `Att,\n${firstName}`
    );
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    }
  }

  onSend(): void {
    if (this.form.invalid || this.sending()) return;

    const v = this.form.value;
    const slots = (v.slots ?? []) as Array<{ date: Date; timeSlot: { value: string } }>;

    this.sending.set(true);

    this.reservaApi.enviar({
      name: v.name!,
      cpf: v.cpf!,
      slots: slots.map(s => ({
        date: s.date.toISOString(),
        timeSlot: s.timeSlot.value,
      })),
    }).subscribe({
      next: () => {
        this.sending.set(false);
        this.messageService.add({
          severity: 'success',
          summary: 'Reserva enviada!',
          detail: 'Seu e-mail de solicitação foi enviado com sucesso.',
          life: 5000,
        });
        this.form.reset();
        this.slots.clear();
        this.slots.push(this.createSlot());
        this.slotControls.set([...this.slots.controls] as FormGroup[]);
      },
      error: () => {
        this.sending.set(false);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao enviar',
          detail: 'Não foi possível enviar a reserva. Tente novamente.',
          life: 6000,
        });
      },
    });
  }
}
