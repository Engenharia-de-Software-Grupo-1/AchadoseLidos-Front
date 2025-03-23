import { Button } from 'primereact/button';
import { IconField } from 'primereact/iconfield';
import { Tag } from 'primereact/tag';
import './style.css';
import { Link } from 'react-router-dom';
import ProfilePhoto from '@components/ProfilePhoto/profilePhoto';
import { Conta } from '@domains/Conta';
import { Sebo } from '@domains/Sebo';

interface ProfileProps {
  authUser?: boolean;
  dataProfile?: Conta | null;
  content?: Sebo | null;
}

const Profile = ({ authUser, dataProfile, content }: ProfileProps) => {
  const role = dataProfile?.tipo.toLowerCase();
  return (
    <>
      <div className="container-profile">
        <ProfilePhoto imageProfile={content?.fotoPerfil?.url} />

        <div className="profile-description">
          <div className="content-title-profile">
            <p className="titulo-profile">{content?.nome}</p>

            {role ? (
              <Link to={`/profile/${role}/edit`}>
                <Button label="Editar" icon="pi pi-pencil" className="button-edit" />
              </Link>
            ) : authUser ? (
              <i className="pi pi-bell" style={{ fontSize: 'x-large' }}/>
            ) : null}
          </div>

          <p className="descrip-profile">{content?.biografia}</p>

          {role === 'sebo' ? (
            <>
              <div className="information-profile">
                <IconField iconPosition="left">
                  <i className="pi pi-map-marker mr-2" />
                  <span className="text-profile">{`${content?.endereco?.rua}, No ${content?.endereco?.numero} - ${content?.endereco?.bairro}`}</span>
                </IconField>

                <IconField iconPosition="left">
                  <i className="pi pi-clock mr-2" />
                  <span className="text-profile">{`Horário de Funcionamento: ${content?.horarioFuncionamento}`}</span>
                </IconField>
              </div>

              <div className="tags-profile">
                <Tag className="mr-2 mt-2" icon="pi pi-whatsapp" value={`${content?.telefone}`}></Tag>
                <Tag className="mr-2 mt-2" icon="pi pi-book" value={`/${content?.telefone}`}></Tag>
                <Tag className="mr-2 mt-2" icon="pi pi-instagram" value={`@${content?.telefone}`}></Tag>
                <Tag className="mr-2 mt-2" icon="pi pi-facebook" value={`${content?.telefone}`}></Tag>
              </div>
            </>
          ) : (
            <div className="tags-profile-user">
              {dataProfile?.usuario?.goodreads && (
                <Tag className="mr-2 mt-4" icon="pi pi-book" value={dataProfile.usuario.goodreads}></Tag>
              )}

              {dataProfile?.usuario?.skoob && (
                <Tag className="mr-2 mt-4" icon="pi pi-book" value={dataProfile.usuario.skoob}></Tag>
              )}
              {dataProfile?.usuario?.instagram && (
                <Tag className="mr-2 mt-4" icon="pi pi-instagram" value={dataProfile.usuario.instagram}></Tag>
              )}
              {dataProfile?.usuario?.twitter && (
                <Tag className="mr-2 mt-4" icon="pi pi-twitter" value={dataProfile.usuario.twitter}></Tag>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
