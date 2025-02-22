import { useState } from 'react';
import TemplatePage from '@pages/templatePage';
import { Steps } from 'primereact/steps';
import { Button } from 'primereact/button';
import TabDadosBasicos from './tabs/tabDadosBasicos';
import TabEndereco from './tabs/tabEndereco';
import TabDadosPerfil from './tabs/tabPerfil';
import { useRegisterSebo } from '@stores/register/sebo/store';

import './style.css';

const RegisterSebo = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { sebo, setField, validateStep } = useRegisterSebo();

  const nextStep = (e: any) => {
    if (validateStep(e.index)) {
      setActiveIndex(e.index);
    }
  };

  const stepsItems = [
    { label: 'Dados Básicos', component: <TabDadosBasicos sebo={sebo} setField={setField} /> },
    { label: 'Endereço', component: <TabEndereco /> },
    { label: 'Dados do Perfil', component: <TabDadosPerfil /> },
  ];

  return (
    <div className="main-register-sebo">
      <TemplatePage simpleHeader={true} simpleFooter={true}>
        <div className="container-register-sebo">
          <div className="card">
            <div className="steps-content">{stepsItems[activeIndex].component}</div>
            <Steps
              model={stepsItems.map((step, index) => ({
                label: step.label,
                command: () => setActiveIndex(index),
              }))}
              activeIndex={activeIndex}
              readOnly
            />
            <Button label="Continuar" onClick={(e) => nextStep(e)} />
          </div>
        </div>
      </TemplatePage>
    </div>
  );
};

export default RegisterSebo;
