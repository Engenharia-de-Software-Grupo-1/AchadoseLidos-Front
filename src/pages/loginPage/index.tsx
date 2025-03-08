import TemplatePage from '@pages/templatePage';
import { InputText } from 'primereact/inputtext';
import CustomButton from '@components/CustomButton/custom-button';
import { Password } from 'primereact/password';


import './style.css';
import { redirect } from 'react-router-dom';

interface LoginPageProps {
  children: React.ReactNode;
  simpleHeader: boolean;
}

const LoginPage = () => {
  return (
    <TemplatePage simpleHeader={true}>
      <div className="background">
        <div className="container">
          <h1>Já possui uma conta?</h1>
          <div className="fields">

            <InputText placeholder="E-mail"/>
            <Password placeholder="Senha" toggleMask />
          </div>
          <CustomButton label="Entrar"/>
          <div className="footer">
            <p>Não possui uma conta? <a>Cadastre-se</a></p>
            <p>Esqueceu sua senha? <a>Recuperar senha</a></p>
          </div>
        </div>
      </div>
    </TemplatePage>
  );
};

export default LoginPage;