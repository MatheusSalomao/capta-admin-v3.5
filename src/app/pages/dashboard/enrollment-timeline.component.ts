import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TimelineCardComponent, TimelineEvent } from './timeline-card/timeline-card.component';

@Component({
  selector: 'app-enrollment-timeline',
  template: `
    <app-timeline-card [title]="title" [subtitle]="subtitle" [events]="events()" [groupBy]="groupBy">
    </app-timeline-card>
  `,
  imports: [TimelineCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnrollmentTimelineComponent {
  readonly title = 'Eventos Importantes';
  readonly subtitle = 'Eventos chave da captação';
  readonly events = input<TimelineEvent[]>([]);
  readonly groupBy = ['date', 'time', 'title'] as const;
}
