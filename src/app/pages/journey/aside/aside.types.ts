export interface LeadProfile {
  id: number;
  uid: string;
  name: string;
  cpf: string;
  phone?: string;
}

export interface RegistrationItem {
  journeyId: number;
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
