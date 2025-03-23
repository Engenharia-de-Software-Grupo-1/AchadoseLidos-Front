export interface Endereco {
  estado: string;
  cidade: string;
  cep: string;
  rua: string;
  bairro: string;
  numero: string;
  complemento?: string;
  ehPublico: boolean;
}
