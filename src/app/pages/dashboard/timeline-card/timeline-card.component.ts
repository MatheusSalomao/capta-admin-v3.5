import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatCard, MatCardContent, MatCardSubtitle, MatCardTitle } from '@angular/material/card';

export interface TimelineEvent {
  key: string;
  date: string | Date;
  title: string;
  description?: string;
}

interface TimelineDisplayEvent extends TimelineEvent {
  timestamp: number;
  hasTime: boolean;
  localDate: Date;
}

type TimelineGroupMode = 'date' | 'title' | 'time' | 'none';
type TimelineGroupModeInput = TimelineGroupMode | ReadonlyArray<TimelineGroupMode>;

interface TimelineGroupNode {
  key: string;
  label: string;
  type: Exclude<TimelineGroupMode, 'none'>;
  timestamp: number;
  children?: TimelineGroupNode[];
  items?: TimelineDisplayEvent[];
}

@Component({
  selector: 'app-timeline-card',
  templateUrl: './timeline-card.component.html',
  styleUrls: ['./timeline-card.component.css'],
  imports: [MatCard, MatCardContent, MatCardSubtitle, MatCardTitle, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineCardComponent {
  readonly title = input<string>('');
  readonly subtitle = input<string>('');
  readonly events = input<TimelineEvent[]>([]);
  readonly groupBy = input<TimelineGroupModeInput | null>(null);

  readonly groupOrder = computed<Exclude<TimelineGroupMode, 'none'>[]>(() => {
    const raw = this.groupBy();
    const base = Array.isArray(raw) ? raw : raw ? [raw] : [];
    const filtered = base.filter((mode): mode is Exclude<TimelineGroupMode, 'none'> => mode !== 'none');
    return filtered.length ? filtered : ['date'];
  });

  readonly hideItemTitle = computed(() => this.groupOrder().includes('title'));
  readonly hideItemTime = computed(() => this.groupOrder().includes('time'));

  readonly groupedEvents = computed<TimelineGroupNode[]>(() => {
    const sortedEvents = [...this.events()]
      .map((event) => ({
        ...event,
        timestamp: this.parseTimestamp(event.date),
        hasTime: this.hasTimeValue(event.date),
        localDate: this.toLocalDate(event.date),
      }))
      .sort((left, right) => right.timestamp - left.timestamp);

    if (!this.groupOrder().length) {
      return [
        {
          key: 'all',
          label: 'Eventos',
          type: 'title',
          timestamp: sortedEvents[0]?.timestamp ?? 0,
          items: [...sortedEvents].sort((left, right) => right.timestamp - left.timestamp),
        },
      ];
    }

    return this.buildGroups(sortedEvents, this.groupOrder(), 0);
  });

  private parseTimestamp(date: string | Date): number {
    const timestamp = typeof date === 'string' ? Date.parse(date) : date.getTime();
    return Number.isNaN(timestamp) ? 0 : timestamp;
  }

  private toDateKey(date: string | Date): string {
    if (typeof date === 'string') {
      const match = date.match(/^\d{4}-\d{2}-\d{2}/);
      if (match) {
        return match[0];
      }
    }

    const value = typeof date === 'string' ? new Date(this.parseTimestamp(date)) : date;
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private hasTimeValue(date: string | Date): boolean {
    if (typeof date === 'string') {
      return /(?:T|\s)\d{2}:\d{2}(?::\d{2})?/.test(date);
    }

    return date.getHours() !== 0 || date.getMinutes() !== 0 || date.getSeconds() !== 0;
  }

  private toTimeKey(date: string | Date): string {
    if (!this.hasTimeValue(date)) {
      return 'Sem horário';
    }

    if (typeof date === 'string') {
      const match = date.match(/(?:T|\s)(\d{2}:\d{2})/);
      if (match) {
        return match[1];
      }
    }

    const value = typeof date === 'string' ? new Date(this.parseTimestamp(date)) : date;
    const hours = String(value.getHours()).padStart(2, '0');
    const minutes = String(value.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  private toLocalDate(date: string | Date): Date {
    const timestamp = this.parseTimestamp(date);
    return new Date(timestamp);
  }

  private buildGroups(
    events: TimelineDisplayEvent[],
    order: Array<Exclude<TimelineGroupMode, 'none'>>,
    level: number
  ): TimelineGroupNode[] {
    const mode = order[level];
    const isLeaf = level === order.length - 1;
    const groups = new Map<string, TimelineDisplayEvent[]>();

    for (const event of events) {
      const key = this.getGroupKey(mode, event);
      const list = groups.get(key);
      if (list) {
        list.push(event);
      } else {
        groups.set(key, [event]);
      }
    }

    const nodes = Array.from(groups.entries()).map(([key, items]) => {
      const timestamp = items[0]?.timestamp ?? 0;
      if (isLeaf) {
        return {
          key,
          label: key,
          type: mode,
          timestamp,
          items: this.sortLeafItems(items, order),
        };
      }

      return {
        key,
        label: key,
        type: mode,
        timestamp,
        children: this.buildGroups(items, order, level + 1),
      };
    });

    return nodes.sort((left, right) => right.timestamp - left.timestamp);
  }

  private getGroupKey(mode: Exclude<TimelineGroupMode, 'none'>, event: TimelineDisplayEvent): string {
    switch (mode) {
      case 'date':
        return this.toDateKey(event.localDate);
      case 'time':
        return this.toTimeKey(event.localDate);
      case 'title':
      default:
        return event.title;
    }
  }

  private sortLeafItems(
    items: TimelineDisplayEvent[],
    order: Array<Exclude<TimelineGroupMode, 'none'>>
  ): TimelineDisplayEvent[] {
    if (order.includes('date')) {
      return [...items].sort((left, right) => left.timestamp - right.timestamp);
    }
    return [...items].sort((left, right) => right.timestamp - left.timestamp);
  }
}
