import { Button } from 'primereact/button';
import { IconField } from 'primereact/iconfield';
import { Tag } from 'primereact/tag';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import ProfilePhoto from '@components/ProfilePhoto/profilePhoto';
import { Sebo } from '@domains/Sebo';
import { Usuario } from '@domains/Usuario';

interface ProfileProps {
  authUser?: boolean;
  data?: Sebo | Usuario | null;
  role: string | undefined;
}

const Profile = ({ authUser, role, data }: ProfileProps) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container-profile">
        <ProfilePhoto imageProfile={data?.fotoPerfil || ''} />

        <div className="profile-description">
          <div className="content-title-profile">
            <p className="titulo-profile">{data?.nome}</p>

            {role ? (
              <Button
                label="Editar"
                icon="pi pi-pencil"
                className="button-edit"
                onClick={() => navigate(`/profile/${role.toLowerCase()}/edit`)}
              />
            ) : authUser ? (
              <i className="pi pi-bell" style={{ fontSize: 'x-large' }} />
            ) : null}
          </div>

          <p className="descrip-profile">{data?.biografia}</p>

          {role === 'SEBO' ? (
            <>
              <div className="information-profile">
                {data?.endereco?.ehPublico && (
                  <IconField iconPosition="left">
                    <i className="pi pi-map-marker mr-2" />
                    <span className="text-profile">{`${data?.endereco?.rua}, No ${data?.endereco?.numero} - ${data?.endereco?.bairro}`}</span>
                  </IconField>
                )}
                {data?.horarioFuncionamento && (
                  <IconField iconPosition="left">
                    <i className="pi pi-clock mr-2" />
                    <span className="text-profile">{`Horário de Funcionamento: ${data?.horarioFuncionamento}`}</span>
                  </IconField>
                )}
              </div>

              <div className="tags-profile">
                {data?.telefone && <Tag className="mr-2 mt-2" icon="pi pi-whatsapp" value={`${data?.telefone}`} />}
                {data?.estanteVirtual && (
                  <Tag className="mr-2 mt-2" icon="pi pi-book" value={`/${data?.estanteVirtual}`} />
                )}
                {data?.instagram && <Tag className="mr-2 mt-2" icon="pi pi-instagram" value={`${data?.instagram}`} />}
                {data?.amazon && <Tag className="mr-2 mt-2" icon="pi pi-amazon" value={`${data?.amazon}`} />}
              </div>
            </>
          ) : (
            <div className="tags-profile-user">
              {data?.goodreads && <Tag className="mr-2 mt-4" icon="pi pi-book" value={data.goodreads} />}
              {data?.skoob && <Tag className="mr-2 mt-4" icon="pi pi-book" value={data.skoob} />}
              {data?.instagram && <Tag className="mr-2 mt-4" icon="pi pi-instagram" value={data.instagram} />}
              {data?.twitter && <Tag className="mr-2 mt-4" icon="pi pi-twitter" value={data.twitter} />}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
