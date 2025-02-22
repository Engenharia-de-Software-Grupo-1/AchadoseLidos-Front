import * as React from "react";
import TemplatePage from "@pages/templatePage";
import { Steps } from "primereact/steps";
import TabDadosBasicos from "./tabs/tabDadosBasicos";
import TabEndereco from "./tabs/tabEndereco";
import TabDadosPerfil from "./tabs/tabPerfil";

import "./style.css";

const RegisterSebo = () => {
    const [activeIndex, setActiveIndex] = React.useState(0);

    const stepsItems = [
        { label: "Dados Básicos", component: <TabDadosBasicos /> },
        { label: "Endereço", component: <TabEndereco /> },
        { label: "Dados do Perfil", component: <TabDadosPerfil /> },
    ];

    return (
        <div className="main-register-sebo">
            <TemplatePage simpleHeader={true} simpleFooter={true}>
                <div className="container-register-sebo">
                    <div className="card">
                        <div className="steps-content">
                            {stepsItems[activeIndex].component}
                        </div>
                        <Steps 
                            model={stepsItems.map((step, index) => ({
                                label: step.label,
                                command: () => setActiveIndex(index)
                            }))}
                            activeIndex={activeIndex}
                            onSelect={(e) => setActiveIndex(e.index)}
                        />
                    </div>
                </div>
            </TemplatePage>
        </div>
    );
};

export default RegisterSebo;
