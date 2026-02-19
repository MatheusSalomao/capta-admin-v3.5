export type SituacaoMatricula = 'PEN' | 'PMA' | 'MAT' | 'CA'; // PEN = Pendente, PMA = Pré-matriculado, MAT = Matriculado, CA = Cancelada
export type HashMode = 'F' | 'D'; // F = FILE, D = DATA
export type HashType = 'xxh32'; // xxh32 = XXH32
export type SituacaoIntegracao = 'E' | 'P' | 'M' | 'C' | 'X'; // E = Erro, P = Pendente, M = Em Processamento, C = Concluída, X = Cancelada
export type TipoPeriodoLetivo = 'T' | 'S'; // T = Trimestral, S = Semestral
export type TipoData = 'F' | 'D'; // F = Fixa, D = Dinâmica
export type ErpPlataforma = 'ENSINC'; // ENSINC = Ensinc
export type SituacaoTransacao = 'I' | 'A' | 'F' | 'C' | 'P'; // I = Isento, A = Aberta, F = Fechada, C = Cancelada, P = Em processamento
export type TipoCampus = 'UAC' | 'PAP' | 'NEAD' | 'PSUAB' | 'UAD'; // UAC = Unidade Acadêmica, PAP = Polo de Apoio Presencial, NEAD = Núcleo de Educação a Distância, PSUAB = Polo do Sistema UAB, UAD = Unidade Administrativa/Reitoria
export type TipoContrato = 'B' | 'M' | 'P' | 'E' | 'C'; // B = Termo de Bolsa, M = Contrato de Matrícula, P = Termo de Privacidade, E = Termo de Entrega de Documentos, C = Termo de Matrícula Condicional
export type CondicaoDocumento = 'P' | 'I' | 'D'; // P = Pendente, I = Indeferido, D = Deferido
export type TipoLancamento = 'M' | 'A'; // M = Manual, A = Automático
export type SituacaoDocumento = 'B' | 'P' | 'E' | 'D'; // B = Bloqueado, P = Pendente, E = Entregue, D = Deferido
export type TipoToken = 'U-AU' | 'U-NA' | 'U-NP' | 'G-AU'; // U-AU = Unico Autenticado, U-NA = Unico não Autenticado, U-NP = Unico Personificado, G-AU = Geral Autenticado
export type TipoOfertaCurso = 'P' | 'B'; // P = Padrão, B = Bolsa
export type ServicoConsumidor = 'JORNADA'; // JORNADA = Jornada
export type Raca = 'B' | 'P' | 'A' | 'M' | 'I' | 'N'; // B = Branca, P = Preta, A = Parda, M = Amarela, I = Indígena, N = Não declarado
export type SituacaoEnem = 'PDT' | 'PRC' | 'ENC' | 'NEN'; // PDT = Pendente, PRC = Em processamento, ENC = Encontrado, NEN = Não encontrado
export type SituacaoBoleto = 'A' | 'F' | 'C'; // A = Abertao, F = Fechado, C = Cancelada
export type Contexto = 'CPS' | 'MNT' | 'MTR' | 'GRP' | 'USR'; // CPS = Campus, MNT = Mantida, MTR = Mantenedora, GRP = Grupo, USR = Usuário
export type CieloCheckoutPaymentStatus = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'; // 1 = PENDENTE, 2 = PAGO, 3 = NEGADO, 4 = EXPIRADO, 5 = CANCELADO, 6 = NAO_FINALIZADO, 7 = AUTORIZADO, 8 = CHARGEBACK
export type TipoTransacao = 'C' | 'D'; // C = Crédito, D = Débito
export type ModalidadeProcessoSeletivo = 'S' | 'P' | 'E'; // S = Semipresencial, P = Presencial, E = EAD
export type TipoIntegracaoArquivo = 'D' | 'MC'; // D = Documento, MC = Modelo Contrato
export type TipoInstituicaoEnsinoMedio = 'B' | 'V'; // B = Pública, V = Privada
export type TipoProcessoSeletivo = 'G' | 'P'; // G = Graduação, P = Pós-Graduação
export type OrgaoEmissorRg = 'SSP' | 'PC' | 'DIC' | 'II'; // SSP = Secretaria de Segurança Pública, PC = Polícia Civil, DIC = Diretoria de Identificação Civil, II = Instituto de Identificação
export type TipoModalidade = 'P' | 'D'; // P = Presencial, D = A distância
export type Condicao = 'A' | 'I' | 'E'; // A = Ativo, I = Inativo, E = Excluído
export type Servico = 'M' | 'I'; // M = Matrícula, I = Inscrição
export type TipoAvaliacao = 'E' | 'P' | 'R' | 'N' | 'D'; // E = Avaliação Externa, P = Prova, R = Redação, N = ENEM, D = Análise de Documento
export type TipoDocumentoMilitar = 'CAM' | 'CR' | 'CDI' | 'CI'; // CAM = Certificado de Alistamento Militar (CAM), CR = Certificado de Reservista (CR), CDI = Certificado de Dispensa de Incorporação (CDI), CI = Certificado de Isenção (CI)
export type Qualificacao = 'C' | 'O' | 'I' | 'M' | 'D' | 'F' | 'X'; // C = Curso, O = Preço, I = Inscrito, M = Matrículado, D = Desistente, F = Fraca, X = Cancelada
export type TipoParametro = 'STR' | 'INT' | 'FLT' | 'BOL' | 'DAT' | 'TIM' | 'DTM' | 'JSN' | 'CSV' | 'ENU'; // STR = Texto, INT = Inteiro, FLT = Decimal com ponto, BOL = Boleano, DAT = Data, TIM = Tempo, DTM = Data e hora, JSN = Json, CSV = Valores separados por vírgula, ENU = Enumeração
export type TipoPagamento = 'CHK' | 'BOL'; // CHK = Checkout, BOL = Boleto
export type PlataformaAvaliacao = 'CAPTA' | 'INEP' | 'GOMINING' | 'PROVA_FACIL'; // CAPTA = Capta, INEP = Inep, GOMINING = Gomining, PROVA_FACIL = Prova Fácil
export type DataSource = 'ENSINC' | 'NEMESIS'; // ENSINC = Ensinc, NEMESIS = Nemesis
export type Sexo = 'M' | 'F'; // M = Masculino, F = Feminino
export type SituacaoAvaliacao =
  | 'INI'
  | 'OPEN'
  | 'PAVA'
  | 'PDOC'
  | 'PLN'
  | 'PNM'
  | 'PNA'
  | 'AP'
  | 'RP'
  | 'CA'
  | 'NSW'
  | 'NO_SHOW'
  | 'BLOQ'
  | 'LIB'
  | 'FIN'
  | 'AGEN'
  | 'PAD'; // INI = Iniciada, OPEN = Em aberto, PAVA = Pendente avaliação, PDOC = Pendente documentação, PLN = Pendente lançamento nota, PNM = Pendente lançamento nota manual, PNA = Pendente lançamento nota automático, AP = Aprovado, RP = Reprovado, CA = Cancelada, NSW = No show, NO_SHOW = No show, BLOQ = Bloqueado, LIB = Liberada, FIN = Finalizada, AGEN = Agendada, PAD = Pendente de análise de documentação
export type Regiao = 'N' | 'NE' | 'CO' | 'SE' | 'S'; // N = Norte, NE = Nordeste, CO = Centro-Oeste, SE = Sudeste, S = Sul
export type SituacaoJornada =
  | 'QAC'
  | 'QAP'
  | 'QAF'
  | 'QAI'
  | 'QAM'
  | 'QAD'
  | 'PIN'
  | 'AGU'
  | 'AVA'
  | 'NSW'
  | 'AP'
  | 'RP'
  | 'AIV'
  | 'PDOC'
  | 'ADOC'
  | 'APG'
  | 'CA'
  | 'PEN'
  | 'PMA'
  | 'MAT'
  | 'UNK'; // QAC = Qualificado Curso, QAP = Qualificado Preço, QAF = Qualificação Fraca, QAI = Inscrito, QAM = Matrícula, QAD = Desistente, PIN = Pré-Inscrito, AGU = Pendente de Nota, AVA = Avaliação em Andamento, NSW = No Show, AP = Aprovado, RP = Reprovado, AIV = Não Avaliado, PDOC = Pendente de Documentação, ADOC = Documentação em Análise, APG = Aguardando Pagamento, CA = Cancelada, PEN = Pendente, PMA = Pré-Matriculado, MAT = Matriculado, UNK = Desconhecido
export type SituacaoContrato = 'P' | 'C' | 'M'; // P = Pendente, C = Aceito, M = Aprovado
export type Gateway = 'CIELOC' | 'ENSINC'; // CIELOC = Cielo Checkout, ENSINC = Ensinc
export type SexoDocumento = 'M' | 'F' | 'A'; // M = Masculino, F = Feminino, A = Ambos
export type ProvedorSmtp = 'gmail'; // gmail = Gmail
export type InscricaoEtapa = 'A' | 'P'; // A = Avaliação, P = Pagamento
export type GrauFormacao = 'S' | 'B' | 'L' | 'T'; // S = Sequencial, B = Bacharelado, L = Licenciatura, T = Curso Superior de Tecnologia
export type TipoAprovacaoContrato = 'D' | 'E'; // D = Aceite digital, E = Assinatura eletrônica
export type EstadoCivil = 'C' | 'S' | 'D' | 'V' | 'E' | 'O'; // C = Casado, S = Solteiro, D = Divorciado, V = Viúvo, E = Desquitado, O = Outros
export type FormatoAvaliacao = 'D' | 'F'; // D = Digital, F = Físico
export type TipoFeriado = 'N' | 'E' | 'M'; // N = Nacional, E = Estadual, M = Municipal
export type ErpIntegracao =
  | 'periodos-letivos'
  | 'turmas'
  | 'turnos'
  | 'processos-seletivos'
  | 'bolsas'
  | 'ofertas'
  | 'documentos'
  | 'cursos'
  | 'gateways-pagamento'
  | 'baixa-bancaria'
  | 'documentos-entregues'
  | 'matricula'; // periodos-letivos = Períodos Letivos, turmas = Turmas, turnos = Turnos, processos-seletivos = Processos Seletivos, bolsas = Bolsas, ofertas = Ofertas, documentos = Documentos, cursos = Cursos, gateways-pagamento = Gateways de Pagamento, baixa-bancaria = Baixa Bancária, documentos-entregues = Documentos Entregues, matricula = Matrícula
export type Visibilidade = 'B' | 'V'; // B = Publico, V = Privado
export type PlataformaConsumidor = 'LOGIK'; // LOGIK = L0gik
export type ModalidadeAvaliacao = 'P' | 'O'; // P = Presencial, O = Online
export type Environment = 'H' | 'P'; // H = Homologação, P = Produção
export type InscricaoEtapaSituacao =
  | 'PIN'
  | 'AGU'
  | 'AVA'
  | 'NSW'
  | 'AP'
  | 'APR'
  | 'RP'
  | 'REP'
  | 'AIV'
  | 'PDOC'
  | 'ADOC'
  | 'APG'
  | 'CA'
  | 'CAN'; // PIN = Pré-inscrito, AGU = Pendente de Nota, AVA = Avaliação em andamento, NSW = No show, AP = Aprovado, APR = Aprovado, RP = Reprovado, REP = Reprovado, AIV = Avaliação pendente, PDOC = Documentação pendente, ADOC = Documentação em análise, APG = Pagamento pendente, CA = Cancelada, CAN = Cancelada
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'; // GET = GET, POST = POST, PUT = PUT, PATCH = PATCH, DELETE = DELETE
export type AmbienteAvaliacao = 'P' | 'O'; // P = Presencial, O = Online
export type Moeda = 'BRL' | 'USD' | 'EUR'; // BRL = Real, USD = Dólar, EUR = Euro
export type Voto = 'S' | 'N' | 'A'; // S = Sim, N = Não, A = Abster
export type Serie =
  | 'semana'
  | 'interesse'
  | 'inscricao'
  | 'matricula'
  | 'interesse_vs_inscricao'
  | 'inscricao_vs_matricula'
  | 'tempo_medio';
export type Rank = 'INTERESSE' | 'INSCRICAO' | 'MATRICULA';
