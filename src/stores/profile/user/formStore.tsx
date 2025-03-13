import { User } from "@domains/User";
import { createContext, useContext, useState, ReactNode } from 'react';
import { useNotification } from '@contexts/notificationContext';
import { extractRules, stepRules } from '@utils/formRules';
import { addRuleToField } from '@utils/utils';



interface ProfileUserFormContextType {
    user: User;
    setField: (field: string, value: any) => void;
    validateStep: (stepIndex: number) => boolean;
    getRule: (field: string) => {};
    submitted: boolean;
}

export const ProfileUserFormContext = createContext<ProfileUserFormContextType | null>(null);


export const useProfileUserForm = (): ProfileUserFormContextType => {
    const context = useContext(ProfileUserFormContext);
    if (!context) {
        throw new Error('useProfileUserForm must be used within a ProfileSeboFormProvider');
    }
    return context;
};

interface ProfileUserFormProviderProps {
    children: ReactNode;
}

export const ProfileUserFormProvider = ({ children }: ProfileUserFormProviderProps) => {
    const { showNotification } = useNotification();
    const [user, setFormData] = useState<User>({
        conta: {
            email: '',
            senha: '',
            confirmaSenha: '',
            tipo: 'USUARIO',
            status: 'ATIVA',
            createdAt: '',
            updatedAt: '',
        },
        nome: '',
        cpf: '',
        telefone: '',
        biografia: '',
        instagram: '',
        twitter: '',
        skoob: '',
        goodreads: '',
    },
    );

    const setField = (field: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [field]: value }));
    };

    const rules: Record<string, Rule[]> = {
        nome: [{ rule: 'required' }],
        cpfCnpj: [{ rule: 'required' }, { rule: 'isCpfCnpj' }],
        email: [{ rule: 'required' }, { rule: 'isEmail' }],
        senha: [{ rule: 'required' }],
        confirmaSenha: [{ rule: 'required' }],
    };

    const getRule = (field: string) => {
        return rules[field] ? rules[field] : {};
    };

    const validateStep = (stepIndex: number): boolean => {
        let fieldsToValidate = [
            'nome',
            'cpfCnpj',
            'email',
            'senha',
            'confirmaSenha',
        ];

        const rulesByStep = stepRules(fieldsToValidate, rules);

        const validationResults = extractRules(rulesByStep, user);

        const hasError = Object.keys(validationResults).some((field) => validationResults[field].error);
        return !hasError;
    };

    const [submitted, setSubmitted] = useState<boolean>(false);

    return (
        <ProfileUserFormContext.Provider value={{ user, setField, validateStep, getRule, submitted }}>
            {children}
        </ProfileUserFormContext.Provider >
    )
}

