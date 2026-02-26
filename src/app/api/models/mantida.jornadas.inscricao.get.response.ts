import { Condicao, GrauFormacao, Id } from '@app/api';

interface Nome {
  nome: string;
}

interface Campus extends Nome {
  codigo: number;
}

interface Turno extends Nome {}

interface Denominacao extends Nome {}

interface Modalidade extends Nome {}

interface Curso extends Id {
  turno: Turno;
  denominacao: Denominacao;
  modalidade: Modalidade;
  grau_formacao: GrauFormacao;
}

interface Observacao extends Id {
  texto: string;
  tipo: string;
  usuario: string;
  cadastrado_em: string;
}

interface Precificacao {
  valor: number;
}

interface Bolsa extends Nome {
  percentual_desconto: number;
}

interface OfertaCurso extends Id {
  uid: string;
  precificacao: Precificacao;
  bolsa: Bolsa;
  valor_inscricao: number;
  valor_primeira_mensalidade: number;
  percentual_desconto: number;
  total_disponivel: number | null;
  total_utilizado: number;
  valor_demais_mensalidades: number;
}

interface PeriodoLetivo extends Nome {
  tipo: string;
}

interface FormaIngresso extends Nome {}

interface ModeloAvaliacao {
  tipo_avaliacao: string;
}

interface ProcessoSeletivo extends Id {
  nome: string;
  modalidade: Modalidade;
  periodo_letivo: PeriodoLetivo;
  forma_ingresso: FormaIngresso;
  modelo_avaliacao: ModeloAvaliacao;
  data_inicio_academico: string;
  data_limite_matricula: string;
}

export interface MantidaJornadasInscricaoGetResponse extends Id {
  campus: Campus;
  curso: Curso;
  codigo: string;
  observacoes: Observacao[];
  oferta_curso: OfertaCurso;
  processo_seletivo: ProcessoSeletivo;
  cadastrado_em: string;
  condicao?: Condicao;
}
