import dayjs from 'dayjs';

export interface IProfissionalTipo {
  id?: number;
  descricao?: string;
  situacao?: boolean;
  updatedAt?: string | null;
  createdAt?: string | null;
}

export const defaultValue: Readonly<IProfissionalTipo> = {
  situacao: false,
};
