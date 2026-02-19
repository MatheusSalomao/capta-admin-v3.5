import { ChangeDetectionStrategy, Component, inject, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { DashboardEventsCalendarComponent } from './dashboard-events-calendar.component';
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
import { DashboardService } from '@app/api/services/dashboard.service';
import { finalize, forkJoin } from 'rxjs';
import { RankItem } from './rank-card/rank-card.component';

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
  interesses = signal<number[]>([]);
  inscricoes = signal<number[]>([]);
  matriculas = signal<number[]>([]);
  interesse_vs_inscricao = signal<number[]>([]);
  inscricao_vs_matricula = signal<number[]>([]);
  tempo_medio = signal<number[]>([]);
  segmentacao_interesse = signal<number[]>([]);
  segmentacao_inscricao = signal<number[]>([]);
  segmentacao_matricula = signal<number[]>([]);
  eventos = signal<
    {
      key: string;
      date: string;
      title: string;
      description?: string;
    }[]
  >([]);
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
        this.interesses.update(() => [...series.interesses]);
        this.inscricoes.update(() => [...series.inscricoes]);
        this.matriculas.update(() => [...series.matriculas]);
        this.interesse_vs_inscricao.update(() => [...series.interesse_vs_inscricao]);
        this.inscricao_vs_matricula.update(() => [...series.inscricao_vs_matricula]);
        this.tempo_medio.update(() => [...series.tempo_medio]);

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

        this.eventos.set(this.toTimelineEvents(eventos));
      });
  }

  private toRankItems(items: Array<{ id: number; nome: string; total: number }>): RankItem[] {
    return items.map(item => ({
      key: String(item.id),
      label: item.nome,
      value: item.total,
    }));
  }

  private toTimelineEvents(
    items: Array<{ id: string; tipo: string; data_hora: string; evento: string; descricao: string }>
  ) {
    const titles = {
      CAPTACAO: {
        INICIO: 'Início da captação',
        FIM: 'Fim da captação',
      },
      PROCESSO_SELETIVO: {
        INICIO_INSCRICAO: 'Início da inscrição',
        FIM_INSCRICAO: 'Fim da inscrição',
        FIM_AVALIACAO: 'Fim da avaliação',
        FIM_PRE_MATRICULA: 'Fim da pré-matrícula',
      },
      MODELO_AVALIACAO: {
        INICIO_AVALIACAO: 'Início da avaliação',
        FIM_AVALIACAO: 'Fim da avaliação',
        FIM_LIMITE_AVALIACAO: 'Fim do limite de avaliação',
      },
    } as const;
    return items.map(item => ({
      key: item.id,
      date: item.data_hora,
      title: this.getTimelineTitle(titles, item.tipo, item.evento),
      description: item.descricao || undefined,
    }));
  }

  private getTimelineTitle(
    titles: {
      CAPTACAO: Record<string, string>;
      PROCESSO_SELETIVO: Record<string, string>;
      MODELO_AVALIACAO: Record<string, string>;
    },
    tipo: string,
    evento: string
  ): string {
    if (this.isKeyOf(titles, tipo)) {
      const eventos = titles[tipo];
      if (this.isKeyOf(eventos, evento)) {
        return eventos[evento];
      }
    }

    return evento || 'Evento desconhecido';
  }

  private isKeyOf<T extends object>(value: T, key: string): key is Extract<keyof T, string> {
    return key in value;
  }
}
