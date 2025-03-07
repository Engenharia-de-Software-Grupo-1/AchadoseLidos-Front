import FormField from '@components/FormField/formField';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Sebo } from '@domains/Sebo';

interface TabDadosBasicosProps {
  sebo: Sebo;
  setField: (field: keyof Sebo, value: any) => void;
  getRule: (field: string) => {};
  submitted: boolean;
}

const TabDadosBasicos: React.FC<TabDadosBasicosProps> = ({ sebo, setField, getRule, submitted }) => {
  return (
    <div className="container-register-sebo">
      <div className="container-register">
        <div className="container-data">
          <FormField attribute="nome" rule={getRule('nome')} submitted={submitted}>
            <InputText
              value={sebo.nome}
              onChange={(e) => setField('nome', e.target.value)}
              placeholder="Nome do Sebo *"
            />
          </FormField>

          <FormField attribute="cpfCnpj" rule={getRule('cpfCnpj')} submitted={submitted}>
            <InputText
              value={sebo.cpfCnpj}
              onChange={(e) => setField('cpfCnpj', e.target.value)}
              placeholder="CPF ou CNPJ *"
            />
          </FormField>

          <FormField attribute="email" rule={getRule('email')} submitted={submitted}>
            <InputText
              value={sebo.conta.email}
              onChange={(e) => setField('conta', { ...sebo.conta, email: e.target.value })}
              placeholder="E-mail *"
            />
          </FormField>

          <FormField attribute="senha" rule={getRule('senha')} submitted={submitted}>
            <InputText
              value={sebo.conta.senha}
              onChange={(e) => setField('conta', { ...sebo.conta, senha: e.target.value })}
              type="password"
              placeholder="Senha *"
            />
          </FormField>

          <FormField attribute="confirmaSenha" rule={getRule('confirmaSenha')} submitted={submitted}>
            <InputText
              value={sebo.conta.confirmaSenha}
              onChange={(e) => setField('conta', { ...sebo.conta, confirmaSenha: e.target.value })}
              type="password"
              placeholder="Confirme a senha *"
            />
          </FormField>

          <FormField attribute="telefone" rule={getRule('telefone')} submitted={submitted}>
            <InputMask
              value={sebo.telefone}
              mask="(99) 9 9999-9999"
              onChange={(e) => setField('telefone', e.target.value)}
              placeholder={sebo.concordaVender ? 'WhatsApp *' : 'WhatsApp'}
            />
          </FormField>

          <div className="card flex align-items-center gap-4">
            <p className="text-sales">Você concorda em vender produtos via plataforma?</p>
            <Checkbox onChange={(e) => setField('concordaVender', e.checked)} checked={sebo.concordaVender} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabDadosBasicos;
