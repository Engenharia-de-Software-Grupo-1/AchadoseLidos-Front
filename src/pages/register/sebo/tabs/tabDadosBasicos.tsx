import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Sebo } from '@domains/Sebo';

interface TabDadosBasicosProps {
  sebo: Sebo;
  setField: (field: keyof Sebo, value: any) => void;
}

const TabDadosBasicos: React.FC<TabDadosBasicosProps> = ({ sebo, setField }) => {
  return (
    <div className="container-register-sebo">
      <div className="container-register">
        <p className="tittle-register">Cadastro de Sebo</p>

        <div className="container-data">
          <p className="text-data">Dados Obrigatórios *</p>

          <InputText
            placeholder="Nome do Sebo *"
            value={sebo.nomeSebo}
            onChange={(e) => setField('nomeSebo', e.target.value)}
          />
          <InputText
            placeholder="CPF ou CNPJ *"
            value={sebo.cpfCnpj}
            onChange={(e) => setField('cpfCnpj', e.target.value)}
          />
          <InputText placeholder="E-mail *" value={sebo.email} onChange={(e) => setField('email', e.target.value)} />
          <InputText
            placeholder="Senha *"
            value={sebo.senha}
            onChange={(e) => setField('senha', e.target.value)}
            type="password"
          />
          <InputText
            placeholder="Confirme a senha *"
            value={sebo.confirmarSenha}
            onChange={(e) => setField('confirmarSenha', e.target.value)}
            type="password"
          />
          <InputText
            placeholder="WhatsApp * (obrigatório para vender na plataforma)"
            value={sebo.whatsapp}
            onChange={(e) => setField('whatsapp', e.target.value)}
          />

          <div className="card flex align-items-center gap-4">
            <p className="text-sales">Você concorda em vender produtos via plataforma?</p>
            <Checkbox onChange={(e) => setField('concordaVenda', e.checked)} checked={sebo.concordaVenda} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabDadosBasicos;
