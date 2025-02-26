import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import "./style.css";

interface ProfileProps {
    imageProfile: string;
    titleProfile: string;
    descripProfile: string;
    isSebo: boolean;
}

const Profile = ({ imageProfile, titleProfile, descripProfile, isSebo }: ProfileProps) => {
    return (
        <>
            <div className="container-profile">

                <div className="profile-picture"
                    style={{
                        backgroundImage: `url(${imageProfile})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                    }} />

                <div className="profile-description">
                    <div className="content-title-profile">
                        <p className="titulo-profile">{titleProfile}</p>

                        {isSebo ? (
                            <Button label="Editar" icon="pi pi-pencil" className="button-edit" />
                        ) : null}

                    </div>

                    <p className="descrip-profile">{descripProfile}</p>

                    {isSebo ? (
                    <div className="information-profile">
                        <IconField iconPosition="left">
                            <i className="pi pi-map-marker mr-2" />
                            <span className="text-profile">Rua Exemplo de Rua, No 306 - Bairro Tal</span>
                        </IconField>

                        <IconField iconPosition="left" >
                            <i className="pi pi-clock mr-2" />
                            <span className="text-profile">Horário de Funcionamento: Segunda a Sexta, 9h às 18h</span>
                        </IconField>
                    </div>
                    ): null}

                </div>
            </div>
        </>
    )
};

export default Profile;