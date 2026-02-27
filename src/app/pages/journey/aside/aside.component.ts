import { Component, computed, DestroyRef, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { catchError, debounceTime, distinctUntilChanged, of, startWith, Subject, switchMap, tap } from 'rxjs';
import { JornadasService, MantidaJornadasGetResponse } from '@app/api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'journey-aside',
  templateUrl: './aside.component.html',
  imports: [TablerIconsModule],
})
export class AsideComponent implements OnInit {
  @Output() registrationSelected = new EventEmitter<number | null>();

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

  private readonly jornadas = inject(JornadasService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly searchTerm$ = new Subject<string>();

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
        const aggregated = this.aggregateJourneys(items);
        this.profiles.set(aggregated.leads);
        this.registrations.set(aggregated.registrations);
        const leadChanged = this.ensureSelectedLead();
        if (leadChanged) {
          this.ensureSelectedRegistration();
        }
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
    const trimmed = term.trim();
    this.selectedLeadUid.set(null);
    this.selectedRegistrationUid.set(null);
    this.registrationSelected.emit(null);
    if (!trimmed) {
      this.profiles.set([]);
      this.registrations.set([]);
      this.isLoadingLeads.set(false);
      return;
    }
    this.searchTerm$.next(trimmed);
  }

  selectLead(profile: LeadProfile): void {
    this.selectedLeadUid.set(profile.uid);
    this.selectedRegistrationUid.set(null);
    this.registrationSelected.emit(null);
    this.ensureSelectedRegistration();
  }

  selectRegistration(registration: RegistrationItem): void {
    this.selectedRegistrationUid.set(registration.uid);
    this.registrationSelected.emit(registration.jornadaId);
  }

  getInitials(name: string): string {
    const parts = name.trim().split(/\s+/);
    if (!parts.length) return '';
    const first = parts[0][0] ?? '';
    const last = parts.length > 1 ? (parts[parts.length - 1][0] ?? '') : '';
    return (first + last).toUpperCase();
  }

  private aggregateJourneys(items: Array<MantidaJornadasGetResponse>): {
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
          jornadaId: item.id,
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

  private ensureSelectedLead(): boolean {
    const leads = this.profiles();
    if (leads.length === 0) {
      const hadLead = Boolean(this.selectedLeadUid());
      this.selectedLeadUid.set(null);
      return hadLead;
    }
    if (leads.length === 1) {
      const onlyLead = leads[0].uid;
      const current = this.selectedLeadUid();
      if (current !== onlyLead) {
        this.selectedLeadUid.set(onlyLead);
        return true;
      }
    }
    return false;
  }

  private ensureSelectedRegistration(): void {
    if (this.selectedRegistrationUid()) return;
    const registrations = this.selectedRegistrations();
    if (registrations.length === 1) {
      this.selectedRegistrationUid.set(registrations[0].uid);
      this.registrationSelected.emit(registrations[0].jornadaId);
    }
  }
}

interface LeadProfile {
  id: number;
  uid: string;
  name: string;
  cpf: string;
}

export interface RegistrationItem {
  jornadaId: number;
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
