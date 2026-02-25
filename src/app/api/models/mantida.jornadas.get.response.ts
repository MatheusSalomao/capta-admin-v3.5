import { Condicao, GrauFormacao, Id } from '@app/api';

interface Nome {
  nome: string;
}

interface Curso {
  denominacao: Nome;
  modalidade: Nome;
  turno: Nome;
  grau_formacao: GrauFormacao;
}

interface Inscricao extends Id {
  codigo: string;
  curso: Curso;
  forma_ingresso: Nome;
}

interface Matricula extends Id {}

interface Lead extends Id {
  nome: string;
  cpf: string;
}

export interface MantidaJornadasGetResponse extends Id {
  lead: Lead;
  inscricao?: Inscricao;
  matricula?: Matricula;
  condicao?: Condicao;
}
