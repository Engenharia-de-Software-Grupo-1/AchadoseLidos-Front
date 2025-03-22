import TemplatePage from '@pages/templatePage';
import { InputText } from 'primereact/inputtext';
import './style.css';

import FormField from '@components/FormField/formField';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { useErrorContext } from '@contexts/errorContext';
import { useLogin } from '@stores/login/loginStore';
import { informacoes, login } from 'routes/routesAuth';
import { useNotification } from '@contexts/notificationContext';
import { useAuth } from '@contexts/authContext';

const LoginPage = () => {
  const { credenciais, setField, validate } = useLogin();
  const { setError } = useErrorContext();
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const { auth_login } = useAuth();
  

  const finalizeLogin = async () => {
    if (validate()) {
      try {
        const response = await login(credenciais);

        if (response.status === 200) {
          showNotification('success', 'Login realizado com sucesso!', '');
          const response = await informacoes();
          auth_login(response.data.conta);
          navigate('/');
        }
      } catch (error) {
        if (error.response.status === 401) {
          setError('senha', {error:true, message:'Senha incorreta.'});
        } else if (error.response.status === 404) {
          setError('email', {error:true, message:'Email inválido.'});
          setError('senha', {error:true, message:''});
        } else if (error.response) {
          const errorMessage = error.response.data.message || 'Erro no servidor.';
          showNotification('error', errorMessage, '');
        } else if (error.request) {
          showNotification('error', 'Sem resposta do servidor. Verifique sua conexão.', '');
        } else {
          showNotification('error', 'Algo deu errado. Tente novamente mais tarde.', '');
        }
      }
    } 
  };

  return (
    <div className="main-login">
      <TemplatePage simpleHeader simpleFooter contents>
        <div className="container-login">
          <div className="card-login">
            <h1>Já possui uma conta?</h1>
            <div className="fields">
              <FormField attribute="email">
                <InputText
                  name="email"
                  value={credenciais.email}
                  onChange={(e) => setField('email', e.target.value)}
                  placeholder="E-mail *"
                  required
                />
              </FormField>

              <FormField attribute="senha">
                <InputText
                  name="senha"
                  value={credenciais.senha}
                  onChange={(e) => setField('senha', e.target.value)}
                  type="password"
                  placeholder="Senha *"
                  required
                />
              </FormField>
            </div>
            <Button label="Entrar" className="button" type="submit" onClick={finalizeLogin} />
            <div className="footer">
              <p>
                Não possui uma conta? <a href="/register">Cadastre-se</a>
              </p>
              <p>
                Esqueceu sua senha? <a href="/recover/request">Recuperar senha</a>
              </p>
            </div>
          </div>
        </div>
      </TemplatePage>
    </div>
  );
};

export default LoginPage;
