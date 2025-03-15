import TemplatePage from '@pages/templatePage';
import { InputText } from 'primereact/inputtext';
import './style.css';

import FormField from '@components/FormField/formField';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { useErrorContext } from '@contexts/errorContext';
import { useLogin } from '@stores/login/loginStore';
import { login } from 'routes/routesLogin';
import { LoginResponse } from '@domains/LoginResponse';


const LoginPage = () => {

  const { credenciais, setField } = useLogin()
  const { setErrors, setError } = useErrorContext();
  const navigate = useNavigate();

  // adicionar verificação do tipo de erro para lançar para o usuário
  const finalizeLogin = async () => {
    try {
      const response = await login(credenciais);
      console.log(response);

      if (!response.ok) {
        const errorData: Error = await response.json();
        console.error('Erro ao realizar login:', errorData.message);
        setError('email', {error:true, message:''});
        setError('senha', {error:true, message:'Email ou senha inválidos'});
      }

      const data: LoginResponse = await response.json();
      localStorage.setItem('token', data.token);
      navigate('/');

    } catch (error) {
      console.error('Erro ao realizar login:', error);
    }
  };
  
  return (
    <div className="main-login" >
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
            <Button label="Entrar" className="button" type="submit" onClick={finalizeLogin}/>
            <div className="footer">
              <p>Não possui uma conta? <a href="/register">Cadastre-se</a></p>
              <p>Esqueceu sua senha? <a href="/recoverone">Recuperar senha</a></p>
            </div>
          </div>
        </div>
      </TemplatePage>
    </div>
  );
};

export default LoginPage;