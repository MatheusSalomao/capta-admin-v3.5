import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { LeadProfile } from '@app/pages/journey/aside/aside.types';
import { MatProgressBar } from '@angular/material/progress-bar';
import { PhonePipe } from '@app/pipe/phone.pipe';

@Component({
  selector: 'section[journey-aside-leads]',
  templateUrl: './aside-leads.component.html',
  imports: [TablerIconsModule, MatProgressBar, PhonePipe],
})
export class AsideLeadsComponent {
  @Input() asideCollapsed = false;
  @Input() leadCollapsed = false;
  @Input() registrationCollapsed = false;
  @Input() isLoadingLeads = false;
  @Input() profiles: LeadProfile[] = [];
  @Input() selectedLeadUid: string | null = null;

  @Output() toggleLeadCollapsed = new EventEmitter<void>();
  @Output() toggleAsideCollapsed = new EventEmitter<string | undefined>();
  @Output() selectLead = new EventEmitter<LeadProfile>();
}
