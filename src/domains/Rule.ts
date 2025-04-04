export interface Rule {
  rule: string;
  message?: string;
  maxLength?: number;
  minLength?: number;
}

export interface ValidationResult {
  error: boolean;
  message: string;
  rules?: Rule[];
};