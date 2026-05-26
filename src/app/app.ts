import { Component } from '@angular/core';
import { ReservaPage } from './reserva/reserva.page';

@Component({
  selector: 'app-root',
  imports: [ReservaPage],
  template: '<app-reserva />',
})
export class App {}
