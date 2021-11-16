import dayjs from 'dayjs';
import { IProfissionalTipo } from 'app/shared/model/profissional-tipo.model';

export interface IProfisional {
  id?: number;
  nome?: string;
  telefone?: string | null;
  email?: string | null;
  situacao?: boolean;
  updatedAt?: string | null;
  createdAt?: string | null;
  profissionalTipo?: IProfissionalTipo;
}

export const defaultValue: Readonly<IProfisional> = {
  situacao: false,
};
