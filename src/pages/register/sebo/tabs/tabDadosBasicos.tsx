import FormField from '@components/FormField/formField';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Sebo } from '@domains/Sebo';

interface TabDadosBasicosProps {
  sebo: Sebo;
  setField: (field: keyof Sebo, value: any) => void;
  getRule: (field: keyof Sebo) => {};
  submitted: boolean;
}

const TabDadosBasicos: React.FC<TabDadosBasicosProps> = ({ sebo, setField, getRule, submitted }) => {
  return (
    <div className="container-register-sebo">
      <div className="container-register">
        <div className="container-data">
          <FormField attribute="nomeSebo" rule={getRule('nomeSebo')} submitted={submitted}>
            <InputText
              value={sebo.nomeSebo}
              onChange={(e) => setField('nomeSebo', e.target.value)}
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
            <InputText value={sebo.email} onChange={(e) => setField('email', e.target.value)} placeholder="E-mail *" />
          </FormField>

          <FormField attribute="senha" rule={getRule('senha')} submitted={submitted}>
            <InputText
              value={sebo.senha}
              onChange={(e) => setField('senha', e.target.value)}
              type="password"
              placeholder="Senha *"
            />
          </FormField>

          <FormField attribute="confirmarSenha" rule={getRule('confirmarSenha')} submitted={submitted}>
            <InputText
              value={sebo.confirmarSenha}
              onChange={(e) => setField('confirmarSenha', e.target.value)}
              type="password"
              placeholder="Confirme a senha *"
            />
          </FormField>

          <FormField attribute="whatsapp" rule={getRule('whatsapp')} submitted={submitted}>
            <InputMask
              value={sebo.whatsapp}
              mask="(99) 9 9999-9999"
              onChange={(e) => setField('whatsapp', e.target.value)}
              placeholder={sebo.concordaVenda ? 'WhatsApp *' : 'WhatsApp'}
            />
          </FormField>

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
