import { ChangeDetectionStrategy, Component, computed, effect, input, signal, ViewEncapsulation } from '@angular/core';
import {
  CalendarDateFormatter,
  CalendarEvent,
  CalendarModule,
  CalendarView,
  DateFormatterParams,
} from 'angular-calendar';
import { MatCard, MatCardContent, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DatePipe, formatDate } from '@angular/common';
import { isSameDay, isSameMonth, subMonths, addMonths } from 'date-fns';
import { Subject } from 'rxjs';

export interface DashboardCalendarEvent {
  key: string;
  date: string | Date;
  title: string;
  description?: string;
}

const calendarColors = {
  primary: 'var(--mat-sys-primary)',
  secondary: 'var(--mat-sys-primary-fixed-dim)',
};

@Component({
  selector: 'app-dashboard-events-calendar',
  templateUrl: './dashboard-events-calendar.component.html',
  styleUrls: ['./dashboard-events-calendar.component.css'],
  imports: [CalendarModule, MatButton, MatCard, MatCardContent, MatIcon, MatIconButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DashboardEventsCalendarComponent {
  readonly title = input<string>('Eventos');
  readonly subtitle = input<string>('');
  readonly events = input<DashboardCalendarEvent[]>([]);

  readonly view = signal<CalendarView>(CalendarView.Month);
  readonly viewMonth = CalendarView.Month;
  readonly viewWeek = CalendarView.Week;
  readonly viewDay = CalendarView.Day;
  readonly viewDate = signal<Date>(new Date());
  readonly activeDayIsOpen = signal<boolean>(false);
  readonly refresh = new Subject<void>();

  readonly calendarEvents = computed<CalendarEvent[]>(() =>
    this.events().map(event => {
      const localDate = this.toLocalDate(event.date);
      return {
        id: event.key,
        title: this.formatEventTitle(event),
        start: localDate,
        allDay: !this.hasTimeValue(event.date),
        color: calendarColors,
      };
    })
  );

  readonly viewTitle = computed(() => {
    const format = this.view() === CalendarView.Month ? 'MMMM y' : 'MMMM y';
    const value = formatDate(this.viewDate(), format, 'pt-BR');
    return this.capitalize(value);
  });

  readonly triggerRefresh = effect(() => {
    this.calendarEvents();
    queueMicrotask(() => this.refresh.next());
  });

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (!isSameMonth(date, this.viewDate())) {
      return;
    }

    if (events.length === 0) {
      this.activeDayIsOpen.set(false);
      return;
    }

    if (isSameDay(this.viewDate(), date) && this.activeDayIsOpen()) {
      this.activeDayIsOpen.set(false);
      return;
    }

    this.viewDate.set(date);
    this.activeDayIsOpen.set(true);
  }

  setView(view: CalendarView): void {
    this.view.set(view);
  }

  goToPreviousMonth(): void {
    this.viewDate.set(subMonths(this.viewDate(), 1));
  }

  goToNextMonth(): void {
    this.viewDate.set(addMonths(this.viewDate(), 1));
  }

  goToToday(): void {
    this.viewDate.set(new Date());
  }

  private hasTimeValue(date: string | Date): boolean {
    if (typeof date === 'string') {
      return /(?:T|\s)\d{2}:\d{2}(?::\d{2})?/.test(date);
    }

    return date.getHours() !== 0 || date.getMinutes() !== 0 || date.getSeconds() !== 0;
  }

  private toLocalDate(date: string | Date): Date {
    const timestamp = typeof date === 'string' ? Date.parse(date) : date.getTime();
    return new Date(Number.isNaN(timestamp) ? Date.now() : timestamp);
  }

  private formatEventTitle(event: DashboardCalendarEvent): string {
    const description = event.description?.trim();
    if (!description) {
      return event.title;
    }

    return `${event.title} — ${description}`;
  }

  private capitalize(value: string): string {
    if (!value) {
      return value;
    }

    return value[0].toUpperCase() + value.slice(1);
  }
}
