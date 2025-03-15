import { Conta } from "./Conta";

export interface LoginResponse {
    token: string;
    user: Conta;
  }