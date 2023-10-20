import 'zone.js/dist/zone';
import { ChangeDetectionStrategy, Component, computed, Signal, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { DeferedComponent } from './components/defered/defered.component';

export interface User {
  id: number,
  name: string;
}

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, DeferedComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    div {
      border-color: purple
    }
  `,
  template: `
    <h1>Signals with {{ name }}!</h1>
    <h2>Angular signal with primitive : {{count()}}</h2>
    <div><button (click)="increment()">Set primitive</button></div>
    <div>Computed signal : {{doubleCount()}}</div>
    @if(count() === 20) {
      <div>Counter is 20</div>
    } @else {
      <div>Counter is not 20</div>
    }
    <hr>
    <h2>Angular signal with object : {{complex().name}}</h2>
    <div>
      <button (click)="toMichael()">Modifiy Object</button>
      <button (click)="toNewMichael()">Replace Object</button>
    </div>
    <div>Modified user : {{superUser()}}</div>
    <hr>
    <h2>Angular defer block</h2>
    <div><button #trigger>defer</button></div>
    @defer (on interaction(trigger)) {
      <app-defered></app-defered>
    }
  `,
})
export class App {
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

bootstrapApplication(App);
