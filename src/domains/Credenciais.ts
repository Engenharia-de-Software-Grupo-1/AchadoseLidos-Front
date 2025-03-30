export interface Credenciais {
  senha: string;
  email: string;
}

export interface CredenciaisRecoverRequest {
  email: string;
}

export interface CredenciaisResetRequest {
  conta: {
    senha: string;
    token: string;
  };
  confirmaSenha: '';
}
