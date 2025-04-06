import TemplatePage from '@pages/template';
import { Button } from 'primereact/button';
import './style.css';
import { Link } from 'react-router-dom';

const RegistrationPage = () => {
  return (
    <div className="container">
      <TemplatePage simpleHeader simpleFooter contents>
        <div className="content-area">
          <div className="card-register">
            <div className="highlight-indicator"></div>
            <div className="options-container">
              <div className="option-column user-column">
                <h2 className="option-title">
                  Sou <span className="option-title-users">Usuário</span>
                </h2>
                <p className="option-description">Quero navegar pelos produtos, favoritá-los e fazer compras.</p>
                <Link to="/register/user">
                  <Button className="register-button">Cadastrar-se como usuário</Button>
                </Link>
                <div className="login-link">
                  <span>Já possui conta? </span>
                  <Link to="/login" className="enter-link">
                    Entre
                  </Link>
                </div>
              </div>

              <div className="divider"></div>

              <div className="option-column seller-column">
                <h2 className="option-title">
                  Sou <span className="option-title-users">Vendedor</span>
                </h2>
                <p className="option-description">
                  Quero registrar minha história ou inventário e anunciar produtos e eventos.
                </p>
                <Link to="/register/sebo">
                  <Button className="register-button">Cadastrar-se como sebista</Button>
                </Link>
                <div className="login-link">
                  <span>Já possui conta? </span>
                  <Link to="/login" className="enter-link">
                    Entre
                  </Link>
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
