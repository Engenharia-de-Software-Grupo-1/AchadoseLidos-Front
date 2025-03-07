import { Button } from 'primereact/button';
import { IconField } from 'primereact/iconfield';
import { Tag } from 'primereact/tag';
import './style.css';
import { Link } from 'react-router-dom';

// trocar pra trazer o objeto sebo pra renderizar as infos
interface ProfileProps {
  imageProfile: string;
  titleProfile: string;
  descripProfile: string;
  isSebo: boolean;
  authUser: boolean;
}

const Profile = ({ imageProfile, titleProfile, descripProfile, isSebo, authUser }: ProfileProps) => {
  return (
    <>
      <div className="container-profile">
        <div
          className="profile-picture"
          style={{
            backgroundImage: `url(${imageProfile})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        />

        <div className="profile-description">
          <div className="content-title-profile">
            <p className="titulo-profile">{titleProfile}</p>

            {isSebo ? (
              <Link to="/profile/sebo/edit">
                <Button label="Editar" icon="pi pi-pencil" className="button-edit" />
              </Link>
            ) : authUser ? (
              <img src="/images/bell.svg"></img>
            ) : null}
          </div>

          <p className="descrip-profile">{descripProfile}</p>

          {isSebo ? (
            <>
              <div className="information-profile">
                <IconField iconPosition="left">
                  <i className="pi pi-map-marker mr-2" />
                  <span className="text-profile">Rua Exemplo de Rua, No 306 - Bairro Tal</span>
                </IconField>

                <IconField iconPosition="left">
                  <i className="pi pi-clock mr-2" />
                  <span className="text-profile">Horário de Funcionamento: Segunda a Sexta, 9h às 18h</span>
                </IconField>
              </div>

              <div className="tags-profile">
                <Tag className="mr-2 mt-2" icon="pi pi-whatsapp" value="(83)9888-8888"></Tag>
                <Tag className="mr-2 mt-2" icon="pi pi-book" value="/fulano_detal"></Tag>
                <Tag className="mr-2 mt-2" icon="pi pi-instagram" value="@fulano_detal"></Tag>
                <Tag className="mr-2 mt-2" icon="pi pi-facebook" value="@fulano_detal"></Tag>
              </div>
            </>
          ) : (
            <div className="tags-profile-user">
              <Tag className="mr-2 mt-4" icon="pi pi-whatsapp" value="(83)9888-8888"></Tag>
              <Tag className="mr-2 mt-4" icon="pi pi-book" value="/fulano_detal"></Tag>
              <Tag className="mr-2 mt-4" icon="pi pi-instagram" value="@fulano_detal"></Tag>
              <Tag className="mr-2 mt-4" icon="pi pi-facebook" value="@fulano_detal"></Tag>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
