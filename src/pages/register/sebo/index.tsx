import { useState } from 'react';
import TemplatePage from '@pages/templatePage';
import { Steps } from 'primereact/steps';
import { Button } from 'primereact/button';
import TabDadosBasicos from './tabs/tabDadosBasicos';
import TabEndereco from './tabs/tabEndereco';
import TabDadosPerfil from './tabs/tabPerfil';
import { useRegisterSebo } from '@stores/register/sebo/registerStore';
import { useNotification } from '@contexts/notificationContext';
import { Link, useNavigate } from 'react-router-dom';

import './style.css';

const RegisterSebo = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { sebo, setField, validateStep, cities, saveRegisterSebo } = useRegisterSebo();
  const [_, setSubmitted] = useState(false);
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const nextStep = () => {
    if (validateStep(activeIndex)) {
      setSubmitted(true);
      setActiveIndex(activeIndex + 1);
    } else {
      showNotification('error', null, 'Preencha todos os campos obrigatórios!');
    }
    setSubmitted(false);
  };

  const stepBack = () => {
    setActiveIndex(activeIndex - 1);
  };

  const stepsItems = [
    {
      label: 'Dados Básicos',
      component: <TabDadosBasicos sebo={sebo} setField={setField} />,
    },
    {
      label: 'Endereço',
      component: <TabEndereco sebo={sebo} setField={setField} cities={cities} />,
    },
    {
      label: 'Dados do Perfil',
      component: <TabDadosPerfil sebo={sebo} setField={setField} />,
    },
  ];

  return (
    <div className="main-register-sebo">
      <TemplatePage simpleHeader simpleFooter contents>
        <div className="container-register-sebo">
          <div className="card">
            <p className="tittle-register">Cadastro de Sebo</p>
            <div className="steps-content">{stepsItems[activeIndex].component}</div>
            <Steps
              model={stepsItems.map((step, index) => ({
                label: step.label,
                command: () => setActiveIndex(index),
              }))}
              activeIndex={activeIndex}
              readOnly
            />
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              {activeIndex !== 0 &&
              <Button className="step-button" label="Voltar" onClick={() => stepBack()} />}
              {activeIndex === 2 && (
                <Button className="step-button" label="Finalizar" onClick={() => saveRegisterSebo(() => navigate('/'))} />
              )}
              {activeIndex < 2 && (
              <Button className="step-button" label="Continuar" onClick={() => nextStep()} />
              )}

            </div>
            <p className="login" style={{ color: '#2F292A', textAlign: 'center' }}>
              Já tem uma conta? <Link to="/login">Entrar</Link>
            </p>
          </div>
        </div>
      </TemplatePage>
    </div>
  );
};

export default RegisterSebo;
