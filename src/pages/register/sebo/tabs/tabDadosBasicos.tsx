import { useState } from "react";
import InputText from "@components/InputText/input";
import { Checkbox } from "primereact/checkbox";

const TabDadosBasicos = () => {
    const [checked, setChecked] = useState<boolean>(false);

    return (
        <div className="container-register-sebo">
            <div className="container-register">
                <p className="tittle-register">Cadastro de Sebo</p>

                <div className="container-data">
                    <p className="text-data">Dados Obrigatórios *</p>

                    <InputText placeholder="Nome do Sebo *" />
                    <InputText placeholder="CPF ou CNPJ *" />
                    <InputText placeholder="E-mail *" />
                    <InputText placeholder="Senha *" />
                    <InputText placeholder="Confirme a senha *" />
                    <InputText placeholder="WhatsApp * (obrigatório para vender na plataforma)" />

                    <div className="card flex align-items-center gap-4">
                        <p className="text-sales">Você concorda em vender produtos via plataforma?</p>
                        <Checkbox 
                            onChange={(e) => setChecked(!!e.checked)} 
                            checked={checked}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TabDadosBasicos;
