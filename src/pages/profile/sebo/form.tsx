import TemplatePage from '@pages/templatePage';
import './style.css';
import ALBreadCrumb from '@components/ALBreadCrumb/ALBreadCrumb';
import { useBreadcrumb } from '@hooks/useBreadcrumb';
import ProfilePhoto from '@components/ProfilePhoto';

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
            <ProfilePhoto imageProfile={imageProfile} canUpload/>

            <div className="container-data-form"></div>
          </div>
        </div>
      </TemplatePage>
    </div>
  );
};

export default ProfileSeboForm;
