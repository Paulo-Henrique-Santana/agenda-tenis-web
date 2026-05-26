import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-field-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    @if (message()) {
      <span [id]="errorId()" class="error-msg" role="alert">{{ message() }}</span>
    }
  `,
  styles: [`
    .error-msg {
      color: var(--p-red-500, #ef4444);
      font-size: 0.8125rem;
    }
  `],
})
export class FieldErrorComponent {
  control = input.required<AbstractControl>();
  errors = input.required<Record<string, string>>();
  errorId = input<string>();

  message = computed(() => {
    const ctrl = this.control();
    if (!ctrl.invalid || !ctrl.touched) return null;
    const errs = ctrl.errors ?? {};
    for (const [key, msg] of Object.entries(this.errors())) {
      if (key in errs) return msg;
    }
    return null;
  });
}
