import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  LOCALE_ID,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { DecimalPipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@Component({
  selector: 'app-counter',
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'}],
  imports: [DecimalPipe],
  template: `<span>{{ prefix() + (currentCount() | number:'1.0-0') }}</span>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent {
  readonly countTo = input<number>(0);
  readonly duration = input<number>(2000);
  readonly prefix = input<string>('');

  readonly currentCount = signal(0);
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      const countTo = this.countTo();
      const duration = this.duration();
      this.startCounting(countTo, duration);
    });

    this.destroyRef.onDestroy(() => this.stopCounting());
  }

  private startCounting(countTo: number, duration: number) {
    this.stopCounting();
    const frameRate = 30;
    const totalFrames = Math.max(1, duration / frameRate);
    const start = this.currentCount();
    const increment = (countTo - start) / totalFrames;

    this.intervalId = setInterval(() => {
      this.currentCount.set(this.currentCount() + increment);
      if ((increment >= 0 && this.currentCount() >= countTo) || (increment < 0 && this.currentCount() <= countTo)) {
        this.currentCount.set(countTo);
        this.stopCounting();
      }
    }, frameRate);
  }

  private stopCounting() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
