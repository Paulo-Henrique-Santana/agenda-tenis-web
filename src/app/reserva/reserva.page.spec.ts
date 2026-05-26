import { TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ReservaPage } from './reserva.page';

describe('ReservaComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservaPage],
      providers: [provideAnimationsAsync()],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ReservaPage);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when empty', () => {
    const fixture = TestBed.createComponent(ReservaPage);
    const component = fixture.componentInstance;
    expect(component.form.valid).toBeFalse();
  });

  it('should not generate email body when form is incomplete', () => {
    const fixture = TestBed.createComponent(ReservaPage);
    const component = fixture.componentInstance;
    expect(component.emailBody()).toBe('');
  });

  it('should generate email body when form is valid', () => {
    const fixture = TestBed.createComponent(ReservaPage);
    const component = fixture.componentInstance;

    component.form.setValue({
      name: 'Paulo Henrique Silva',
      cpf: '123.456.789-09',
      courtType: { label: 'Quadra de Tênis Sintética', value: 'quadra de tênis sintética' },
      date: new Date(2026, 5, 30),
      timeSlot: { label: '10:00', value: '10h' },
    });

    expect(component.emailBody()).toContain('Paulo Henrique Silva');
    expect(component.emailBody()).toContain('123.456.789-09');
    expect(component.emailBody()).toContain('quadra de tênis sintética');
    expect(component.emailBody()).toContain('10h');
  });

  it('should generate a valid mailto link when form is valid', () => {
    const fixture = TestBed.createComponent(ReservaPage);
    const component = fixture.componentInstance;

    component.form.setValue({
      name: 'Paulo Henrique Silva',
      cpf: '123.456.789-09',
      courtType: { label: 'Quadra de Tênis Sintética', value: 'quadra de tênis sintética' },
      date: new Date(2026, 5, 30),
      timeSlot: { label: '10:00', value: '10h' },
    });

    expect(component.mailtoLink()).toContain('mailto:cesantoamaro@prefeitura.sp.gov.br');
    expect(component.mailtoLink()).toContain('subject=');
  });

  it('should mark all fields as touched on submit when form is invalid', () => {
    const fixture = TestBed.createComponent(ReservaPage);
    const component = fixture.componentInstance;

    component.onSubmit();

    expect(component.form.controls.name.touched).toBeTrue();
    expect(component.form.controls.cpf.touched).toBeTrue();
    expect(component.form.controls.date.touched).toBeTrue();
    expect(component.form.controls.timeSlot.touched).toBeTrue();
  });
});
