import { EnumType } from './types.enum';

export interface EnumOptionItem {
  value: string;
  label: string;
}

export type UiOptionsGetResponse = Partial<Record<EnumType, EnumOptionItem[]>> & Record<string, EnumOptionItem[]>;
