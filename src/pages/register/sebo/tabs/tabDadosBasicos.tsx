import FormField from '@components/FormField/formField';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import { Sebo } from '@domains/Sebo';

interface TabDadosBasicosProps {
  sebo: Sebo;
  setField: (field: string, value: any) => void;
}

const TabDadosBasicos: React.FC<TabDadosBasicosProps> = ({ sebo, setField }) => {
  return (
    <div className="container-register-sebo">
      <div className="container-register">
        <div className="container-data">
          <FormField attribute="nome">
            <InputText
              value={sebo.nome}
              onChange={(e) => setField('nome', e.target.value)}
              placeholder="Nome do Sebo *"
            />
          </FormField>

          <FormField attribute="cpfCnpj">
            <InputText
              value={sebo.cpfCnpj}
              onChange={(e) => setField('cpfCnpj', e.target.value)}
              placeholder="CPF ou CNPJ *"
              keyfilter="int"
            />
          </FormField>

          <FormField attribute="conta.email">
            <InputText
              value={sebo.conta.email}
              onChange={(e) => setField('conta.email', e.target.value)}
              placeholder="E-mail *"
            />
          </FormField>

          <FormField attribute="senha">
            <InputText
              value={sebo.conta.senha}
              onChange={(e) => setField('conta.senha', e.target.value)}
              type="password"
              placeholder="Senha *"
            />
          </FormField>

          <FormField attribute="confirmaSenha">
            <InputText
              value={sebo.conta.confirmaSenha}
              onChange={(e) => setField('conta.confirmaSenha', e.target.value)}
              type="password"
              placeholder="Confirme a senha *"
            />
          </FormField>

          <FormField attribute="telefone">
            <InputText
              value={sebo.telefone}
              onChange={(e) => setField('telefone', e.target.value)}
              placeholder={sebo.concordaVender ? 'WhatsApp *' : 'WhatsApp'}
              keyfilter="int" 
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
