import FormField from '@components/FormField/formField';
import { InputText } from 'primereact/inputtext';
import { Usuario } from '@domains/Usuario';

interface TabDadosBasicosProps {
    user: Usuario
    setField: (field: string, value: any) => void
}

const TabDadosBasicos: React.FC<TabDadosBasicosProps> = ({ user, setField }) => {
  return (
    <div className="container-register-user">
      <div className="container-register">
        <div className="container-data">
          <FormField attribute="nome">
            <InputText
              value={user.nome}
              onChange={(e) => setField('nome', e.target.value)}
              placeholder="Nome *"
            />
          </FormField>

          <FormField attribute="telefone">
            <InputText
              value={user.telefone}
              onChange={(e) => setField('telefone', e.target.value)}
              placeholder="Telefone *"
              keyfilter="int"
              maxLength={13}
            />
          </FormField>

          <FormField attribute="cpf">
            <InputText
              value={user.cpf}
              onChange={(e) => setField('cpf', e.target.value)}
              placeholder="CPF *"
              keyfilter="int"
              maxLength={11}
            />
          </FormField>

          <FormField attribute="conta.email">
            <InputText
              value={user.conta.email}
              onChange={(e) => setField('conta.email', e.target.value)}
              placeholder="E-mail *"
            />
          </FormField>

          <FormField attribute="senha">
            <InputText
              value={user.conta.senha}
              onChange={(e) => setField('conta.senha', e.target.value)}
              type="password"
              placeholder="Senha *"
            />
          </FormField>

          <FormField attribute="confirmarSenha">
            <InputText
              value={user.conta.confirmaSenha}
              onChange={(e) => setField('conta.confirmaSenha', e.target.value)}
              type="password"
              placeholder="Confirmar Senha *"
            />
          </FormField>
        </div>
      </div>
    </div>
    );
};

export default TabDadosBasicos;