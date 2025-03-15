export interface Credenciais {
    senha: string;
    email:string;
}

export interface CredenciaisRecoverRequest {
    email:string;
}

export interface CredenciaisRecover {
    senha: string;
    confirma: string;
}