import { Component, DestroyRef, inject, OnInit, signal, computed } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TablerIconsModule } from 'angular-tabler-icons';
import { catchError, debounceTime, distinctUntilChanged, of, startWith, Subject, switchMap, tap } from 'rxjs';
import { JornadasService, MantidaJornadasGetResponse } from '@app/api';

@Component({
  selector: 'app-lead-aside',
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss',
  imports: [TablerIconsModule],
})
export class AsideComponent implements OnInit {
  private readonly jornadas = inject(JornadasService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly searchTerm$ = new Subject<string>();

  asideCollapsed = false;
  leadCollapsed = false;
  registrationCollapsed = false;
  isLoadingLeads = signal(false);
  profiles = signal<LeadProfile[]>([]);
  registrations = signal<RegistrationItem[]>([]);
  selectedLeadUid = signal<string | null>(null);
  selectedRegistrationUid = signal<string | null>(null);
  selectedRegistrations = computed(() => {
    const selectedUid = this.selectedLeadUid();
    const all = this.registrations();
    if (!selectedUid) return [];
    return all.filter(registration => registration.leadUid === selectedUid);
  });

  ngOnInit(): void {
    this.searchTerm$
      .pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => this.isLoadingLeads.set(true)),
        switchMap(term => this.jornadas.buscar(term ? { term } : undefined).pipe(catchError(() => of([])))),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(items => {
        const aggregated = this.aggregateJornadas(items);
        this.profiles.set(aggregated.leads);
        this.registrations.set(aggregated.registrations);
        this.ensureSelectedLead();
        this.isLoadingLeads.set(false);
      });
  }

  toggleLeadCollapsed(): void {
    this.leadCollapsed = !this.leadCollapsed;
  }

  toggleRegistrationCollapsed(): void {
    this.registrationCollapsed = !this.registrationCollapsed;
  }

  toggleAsideCollapsed(section?: string): void {
    this.asideCollapsed = !this.asideCollapsed;
    if (section === 'lead') {
      this.leadCollapsed = false;
    } else if (section === 'registration') {
      this.registrationCollapsed = false;
    } else {
      this.leadCollapsed = this.asideCollapsed;
      this.registrationCollapsed = this.asideCollapsed;
    }
  }

  onSearch(term: string): void {
    this.searchTerm$.next(term.trim());
  }

  selectLead(profile: LeadProfile): void {
    this.selectedLeadUid.set(profile.uid);
    this.selectedRegistrationUid.set(null);
  }

  selectRegistration(registration: RegistrationItem): void {
    this.selectedRegistrationUid.set(registration.uid);
  }

  getInitials(name: string): string {
    const parts = name.trim().split(/\s+/);
    if (!parts.length) return '';
    const first = parts[0][0] ?? '';
    const last = parts.length > 1 ? (parts[parts.length - 1][0] ?? '') : '';
    return (first + last).toUpperCase();
  }

  private aggregateJornadas(items: Array<MantidaJornadasGetResponse>): {
    leads: LeadProfile[];
    registrations: RegistrationItem[];
  } {
    const leadsMap = new Map<string, LeadProfile>();
    const registrations: RegistrationItem[] = [];

    items.forEach(item => {
      if (item.lead) {
        const leadKey = item.lead.uid ?? `lead-${item.lead.id ?? item.uid ?? item.id}`;
        if (!leadsMap.has(leadKey)) {
          leadsMap.set(leadKey, {
            id: item.lead.id,
            uid: item.lead.uid,
            name: item.lead.nome ?? 'Lead sem nome',
            cpf: item.lead.cpf ?? '',
          });
        }
      }

      if (item.inscricao) {
        const leadName = item.lead?.nome ?? 'Lead sem nome';
        const leadUid = item.lead?.uid ?? '';
        const leadId = item.lead?.id ?? 0;
        const curso = item.inscricao.curso;
        registrations.push({
          id: item.inscricao.id,
          uid: item.inscricao.uid,
          code: item.inscricao.codigo ?? '',
          courseName: curso?.denominacao?.nome ?? '',
          modality: curso?.modalidade?.nome ?? '',
          shift: curso?.turno?.nome ?? '',
          degree: curso?.grau_formacao ?? '',
          condicao: item.condicao ?? '',
          formaIngresso: item.inscricao.forma_ingresso?.nome ?? '',
          leadId,
          leadUid,
          leadName,
        });
      }
    });

    registrations.sort((a, b) => b.id - a.id);

    return {
      leads: Array.from(leadsMap.values()),
      registrations,
    };
  }

  private ensureSelectedLead(): void {
    const leads = this.profiles();
    if (leads.length === 0) {
      this.selectedLeadUid.set(null);
      return;
    }
    const current = this.selectedLeadUid();
    const stillExists = current && leads.some(lead => lead.uid === current);
    if (!stillExists) {
      this.selectedLeadUid.set(leads[0].uid);
    }
  }
}

interface LeadProfile {
  id: number;
  uid: string;
  name: string;
  cpf: string;
}

interface RegistrationItem {
  id: number;
  uid: string;
  code: string;
  courseName: string;
  modality: string;
  shift: string;
  degree: string;
  condicao: string;
  formaIngresso: string;
  leadId: number;
  leadUid: string;
  leadName: string;
}
