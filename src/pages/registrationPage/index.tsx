import TemplatePage from '@pages/templatePage';
import { Button } from 'primereact/button';
import './style.css';

const RegistrationPage = () => {
  return (
    <div className="container">
      <TemplatePage simpleHeader simpleFooter contents>
      <div className="content-area">
        <div className="card-register">
          <div className="options-container">
            <div className="option-column user-column">
              <h2 className="option-title">Sou Usuário</h2>
              <p className="option-description">
                Quero navegar pelos produtos, favoritá-los e fazer compras.
              </p>
              <Button className="register-button">
                Cadastrar-se como usuário
              </Button>
              <div className="login-link">
                <span>Já possui conta? </span>
                <a href="#" className="enter-link">Entre</a>
              </div>
            </div>
            
            <div className="divider"></div>
            
            <div className="option-column seller-column">
              <div className="highlight-indicator"></div>
              <h2 className="option-title">Sou Vendedor</h2>
              <p className="option-description">
                Quero registrar minha história ou inventário e anunciar produtos e eventos.
              </p>
              <Button className="register-button">
                Cadastrar-se como sebista
              </Button>
              <div className="login-link">
                <span>Já possui conta? </span>
                <a href="#" className="enter-link">Entre</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      </TemplatePage>
    </div>
  );
};

export default RegistrationPage;
