import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { LeadProfile } from '@app/pages/journey/aside/aside.types';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'section[journey-aside-leads]',
  templateUrl: './aside-leads.component.html',
  imports: [TablerIconsModule, MatProgressBar],
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

  getInitials(name: string): string {
    const parts = name.trim().split(/\s+/);
    if (!parts.length) return '';
    const first = parts[0][0] ?? '';
    const last = parts.length > 1 ? (parts[parts.length - 1][0] ?? '') : '';
    return (first + last).toUpperCase();
  }

  phone(tel: string | undefined) {
    if (tel) {
      const value = tel.toString().replace(/\D/g, '');

      let foneFormatado = '';

      if (value.length > 12) {
        foneFormatado = value.replace(/(\d{2})?(\d{2})?(\d{5})?(\d{4})/, '+$1 ($2) $3-$4');
      } else if (value.length > 11) {
        foneFormatado = value.replace(/(\d{2})?(\d{2})?(\d{4})?(\d{4})/, '+$1 ($2) $3-$4');
      } else if (value.length > 10) {
        foneFormatado = value.replace(/(\d{2})?(\d{5})?(\d{4})/, '($1) $2-$3');
      } else if (value.length > 9) {
        foneFormatado = value.replace(/(\d{2})?(\d{4})?(\d{4})/, '($1) $2-$3');
      } else if (value.length > 5) {
        foneFormatado = value.replace(/^(\d{2})?(\d{4})?(\d{0,4})/, '($1) $2-$3');
      } else if (value.length > 1) {
        foneFormatado = value.replace(/^(\d{2})?(\d{0,5})/, '($1) $2');
      } else {
        if (tel !== '') {
          foneFormatado = value.replace(/^(\d*)/, '($1');
        }
      }
      return foneFormatado;
    }

    return undefined;
  }
}
