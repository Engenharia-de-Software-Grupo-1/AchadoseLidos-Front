import TemplatePage from '@pages/templatePage';
import './style.css';
import ALBreadCrumb from '@components/ALBreadCrumb/ALBreadCrumb';
import { useBreadcrumb } from '@hooks/useBreadcrumb';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { Button } from 'primereact/button';

const ProfileSeboForm = () => {
  const breadcrumbItems = [
    { label: 'Meu Perfil', url: '/profile/sebo' },
    { label: 'Editar Sebo', url: '/profile/sebo/edit' },
  ];

  const imageProfile = '/images/anarita.JPG';

  return (
    <div className="container-main-edit-sebo">
      <TemplatePage simpleHeader={false} simpleFooter={false} backgroundFooterDiff={true}>
        <ALBreadCrumb breadcrumbItems={breadcrumbItems}></ALBreadCrumb>

        <div className="container-edit-sebo">
          <div className="form-edit-sebo">
            <div
              className="profile-picture-sebo"
              style={{
                backgroundImage: `linear-gradient(rgba(169, 169, 169, 0.5), rgba(169, 169, 169, 0.5)),url(${imageProfile})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            >
              <i className="pi pi-pencil icon-image" />
            </div>

            <div className="container-data-form"></div>
          </div>
        </div>
      </TemplatePage>
    </div>
  );
};

export default ProfileSeboForm;
