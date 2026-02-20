import { Injectable, signal } from '@angular/core';
import { AppSettings, defaults } from '../config';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  private optionsSignal = signal<AppSettings>(defaults);
  readonly options = this.optionsSignal.asReadonly();
  private readonly history: AppSettings[] = [];

  getOptions() {
    return this.optionsSignal();
  }

  setOptions(options: Partial<AppSettings>) {
    this.optionsSignal.update(current => ({
      ...current,
      ...options,
    }));
  }

  applyOptions(options: Partial<AppSettings>) {
    this.saveSnapshot();
    this.optionsSignal.update(current => ({
      ...current,
      ...options,
    }));
  }

  revertLastOptions() {
    const previous = this.history.pop();
    if (!previous) return false;
    this.optionsSignal.set(previous);
    return true;
  }

  clearOptionsHistory() {
    this.history.length = 0;
  }

  private saveSnapshot() {
    this.history.push(this.optionsSignal());
  }
}
