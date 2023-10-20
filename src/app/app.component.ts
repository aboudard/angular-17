import { Component, WritableSignal, Signal, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DeferedComponent } from './components/defered/defered.component';

export interface User {
  id: number,
  name: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DeferedComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  name = 'Angular';
  count: WritableSignal<number> = signal(17);
  doubleCount: Signal<number> = computed(() => this.count() * 2);

  complex: WritableSignal<User> = signal({id: 0, name: 'alain'});
  superUser: Signal<string> = computed(() => this.complex().name === 'alain' ? 'initial' : 'modified');

  increment(): void {
    this.count.update(value => value + 1)
  }

  toMichael(): void {
    this.complex.update(value => {
      value.name = value.name === 'alain' ? 'Michael' : 'alain';
      return value;
    });
  }

  toNewMichael(): void {
    this.complex.update(value => {
      return { ...value, name: (value.name === 'alain' ? 'Michael' : 'alain')}
    })
  }
}
