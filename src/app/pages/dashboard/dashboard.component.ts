import { ChangeDetectionStrategy, Component, inject, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import {
  DashboardCalendarEvent,
  DashboardEventsCalendarComponent,
} from './events-calendar/dashboard-events-calendar.component';
import { InterestToRegistrationTimeComponent } from './interest-to-registration-time.component';
import { InterestToSubscribeRateComponent } from './interest-to-subscribe-rate.component';
import { InterestsRankingComponent } from './interests-ranking.component';
import { InterestsSegmentationComponent } from './interests-segmentation.component';
import { RegistrationsRankingComponent } from './registrations-ranking.component';
import { RegistrationsSegmentationComponent } from './registrations-segmentation.component';
import { SubscribeToRegistrationRateComponent } from './subscribe-to-registration-rate.component';
import { SubscribesRankingComponent } from './subscribes-ranking.component';
import { SubscribesSegmentationComponent } from './subscribes-segmentation.component';
import { WeeklyInterestsComponent } from './weekly-interests.component';
import { WeeklyRegistrationsComponent } from './weekly-registrations.component';
import { WeeklySubscribersComponent } from './weekly-subscribers.component';
import { finalize, forkJoin } from 'rxjs';
import { RankItem } from './rank-card/rank-card.component';
import { DashboardService, MantidaDashboardEventosGetResponse, MantidaDashboardRankBaseGetResponse } from '@app/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [
    MatCard,
    MatCardContent,
    WeeklyInterestsComponent,
    WeeklySubscribersComponent,
    WeeklyRegistrationsComponent,
    InterestsSegmentationComponent,
    SubscribesSegmentationComponent,
    RegistrationsSegmentationComponent,
    InterestsRankingComponent,
    SubscribesRankingComponent,
    RegistrationsRankingComponent,
    InterestToSubscribeRateComponent,
    SubscribeToRegistrationRateComponent,
    InterestToRegistrationTimeComponent,
    DashboardEventsCalendarComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  dashboard = inject(DashboardService);
  isLoading = signal(true);
  readonly placeholders = Array.from({ length: 12 });
  serie_interesses = signal<number[]>([]);
  serie_inscricoes = signal<number[]>([]);
  serie_matriculas = signal<number[]>([]);
  serie_interesse_vs_inscricao = signal<number[]>([]);
  serie_inscricao_vs_matricula = signal<number[]>([]);
  serie_tempo_medio = signal<number[]>([]);
  segmentacao_interesse = signal<number[]>([]);
  segmentacao_inscricao = signal<number[]>([]);
  segmentacao_matricula = signal<number[]>([]);
  eventos = signal<Array<DashboardCalendarEvent>>([]);
  rank_interesse = signal<RankItem[]>([]);
  rank_inscricao = signal<RankItem[]>([]);
  rank_matricula = signal<RankItem[]>([]);

  ngOnInit(): void {
    this.isLoading.set(true);
    forkJoin({
      series: this.dashboard.series(),
      ranks: this.dashboard.ranks({ quantidade: 5 }),
      segmentacoes: this.dashboard.segmentacoes(),
      eventos: this.dashboard.eventos(),
    })
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe(({ series, ranks, segmentacoes, eventos }) => {
        this.serie_interesses.update(() => [...series.interesses]);
        this.serie_inscricoes.update(() => [...series.inscricoes]);
        this.serie_matriculas.update(() => [...series.matriculas]);
        this.serie_interesse_vs_inscricao.update(() => [...series.interesse_vs_inscricao]);
        this.serie_inscricao_vs_matricula.update(() => [...series.inscricao_vs_matricula]);
        this.serie_tempo_medio.update(() => [...series.tempo_medio]);

        this.rank_interesse.set(this.toRankItems(ranks.interesse));
        this.rank_inscricao.set(this.toRankItems(ranks.inscricao));
        this.rank_matricula.set(this.toRankItems(ranks.matricula));

        this.segmentacao_interesse.set([
          segmentacoes.interesse.qualificacao_fraca,
          segmentacoes.interesse.qualificacao_curso,
          segmentacoes.interesse.qualificacao_preco,
        ]);
        this.segmentacao_inscricao.set([
          segmentacoes.inscricao.pendente,
          segmentacoes.inscricao.em_avaliacao,
          segmentacoes.inscricao.aprovado,
          segmentacoes.inscricao.reprovado,
          segmentacoes.inscricao.desistente,
          segmentacoes.inscricao.cancelado,
        ]);
        this.segmentacao_matricula.set([
          segmentacoes.matricula.pendente,
          segmentacoes.matricula.pre_matricula,
          segmentacoes.matricula.matricula,
        ]);

        this.eventos.set(this.toCalendarEvents(eventos));
      });
  }

  private toRankItems(items: Array<MantidaDashboardRankBaseGetResponse>): RankItem[] {
    return items.map(item => ({
      key: String(item.id),
      label: item.nome,
      value: item.total,
    }));
  }

  private toCalendarEvents(items: Array<MantidaDashboardEventosGetResponse>) {
    const options = {
      CAPTACAO: {
        INICIO: {
          TEXTO: 'Início da captação às',
          COR: {
            primary: 'var(--mat-sys-accent-100)',
            secondary: 'var(--mat-sys-accent-400)',
          },
        },
        FIM: {
          TEXTO: 'Fim da captação às',
          COR: {
            primary: 'var(--mat-sys-error)',
            secondary: 'var(--mat-sys-error)',
          },
        },
      },
      PROCESSO_SELETIVO: {
        INICIO_INSCRICAO: {
          TEXTO: 'Início das inscrições às',
          COR: {
            primary: 'var(--mat-sys-primary)',
            secondary: 'var(--mat-sys-primary-fixed-dim)',
          },
        },
        FIM_INSCRICAO: {
          TEXTO: 'Fim das inscrições às',
          COR: {
            primary: 'var(--warning-color)',
            secondary: 'var(--lightwarning-color)',
          },
        },
        FIM_AVALIACAO: {
          TEXTO: 'Fim das avaliações às',
          COR: {
            primary: 'var(--mat-sys-primary)',
            secondary: 'var(--mat-sys-primary-fixed-dim)',
          },
        },
        FIM_PRE_MATRICULA: {
          TEXTO: 'Fim do perídio de pré-matrícula às',
          COR: {
            primary: 'var(--mat-sys-error)',
            secondary: 'var(--mat-sys-error)',
          },
        },
      },
      MODELO_AVALIACAO: {
        INICIO_AVALIACAO: {
          TEXTO: 'Início das avaliações às',
          COR: {
            primary: 'var(--mat-sys-primary)',
            secondary: 'var(--mat-sys-primary-fixed-dim)',
          },
        },
        FIM_AVALIACAO: {
          TEXTO: 'Fim das avaliações às',
          COR: {
            primary: 'var(--mat-sys-primary)',
            secondary: 'var(--mat-sys-primary-fixed-dim)',
          },
        },
        FIM_LIMITE_AVALIACAO: {
          TEXTO: 'Fim do praza para lançamento de notas às',
          COR: {
            primary: 'var(--warning-color)',
            secondary: 'var(--lightwarning-color)',
          },
        },
      },
    } as const;
    const idFormatter = (id: string) => id.split(':')[0].padStart(3, '0');

    return items.map(item => ({
      key: item.id,
      date: item.data_hora,
      title: this.getEventTitle(options, item.tipo, item.evento),
      description: `[cód. ${idFormatter(item.id)}] ${item.descricao}` || undefined,
      color: this.getEventColor(options, item.tipo, item.evento),
    }));
  }

  private getEventTitle(
    options: {
      CAPTACAO: Record<string, { TEXTO: string; COR: { primary: string; secondary: string } }>;
      PROCESSO_SELETIVO: Record<string, { TEXTO: string; COR: { primary: string; secondary: string } }>;
      MODELO_AVALIACAO: Record<string, { TEXTO: string; COR: { primary: string; secondary: string } }>;
    },
    tipo: string,
    evento: string
  ): string {
    if (this.isKeyOf(options, tipo)) {
      const eventos = options[tipo];
      if (this.isKeyOf(eventos, evento)) {
        return eventos[evento].TEXTO;
      }
    }

    return evento || 'Evento desconhecido';
  }

  private getEventColor(
    options: {
      CAPTACAO: Record<string, { TEXTO: string; COR: { primary: string; secondary: string } }>;
      PROCESSO_SELETIVO: Record<string, { TEXTO: string; COR: { primary: string; secondary: string } }>;
      MODELO_AVALIACAO: Record<string, { TEXTO: string; COR: { primary: string; secondary: string } }>;
    },
    tipo: string,
    evento: string
  ): { primary: string; secondary: string } {
    const $default = {
      primary: 'var(--mat-sys-primary-100)',
      secondary: 'var(--mat-sys-primary-400)',
    };

    if (this.isKeyOf(options, tipo)) {
      const eventos = options[tipo];
      if (this.isKeyOf(eventos, evento)) {
        return eventos[evento].COR || $default;
      }
    }

    return $default;
  }

  private isKeyOf<T extends object>(value: T, key: string): key is Extract<keyof T, string> {
    return key in value;
  }
}
