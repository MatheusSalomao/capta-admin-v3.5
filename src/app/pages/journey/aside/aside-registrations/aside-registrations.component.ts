import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { RegistrationItem } from '@app/pages/journey/aside/aside.types';
import { MatProgressBar } from '@angular/material/progress-bar';
import { JsonPipe, SlicePipe } from '@angular/common';

@Component({
  selector: 'section[journey-aside-registrations]',
  templateUrl: './aside-registrations.component.html',
  imports: [TablerIconsModule, MatProgressBar, JsonPipe, SlicePipe],
})
export class AsideRegistrationsComponent {
  @Input() asideCollapsed = false;
  @Input() registrationCollapsed = false;
  @Input() leadCollapsed = false;
  @Input() isLoadingLeads = false;
  @Input() selectedLeadUid: string | null = null;
  @Input() selectedRegistrations: RegistrationItem[] = [];
  @Input() selectedRegistrationUid: string | null = null;

  @Output() toggleRegistrationCollapsed = new EventEmitter<void>();
  @Output() toggleAsideCollapsed = new EventEmitter<string | undefined>();
  @Output() selectRegistration = new EventEmitter<RegistrationItem>();
}
