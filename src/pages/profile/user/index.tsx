import TemplatePage from '@pages/templatePage';
import './style.css';
import Profile from '@components/ProfileUsers/profileUsers';
import ALBreadCrumb from '@components/ALBreadCrumb/breadCrumb';
import { useAuth } from '@contexts/authContext';
import { useEffect } from 'react';

const ProfileUser = () => {

    const {conta} = useAuth();

     useEffect(() => {
       
      }, [conta]); // Executa sempre que conta mudar
    
    const breadCrumbItems = [
        { label: 'Usuário', url: '/profile/user' }
    ];

    return (
        <div className='container-profile-user'>
            <TemplatePage simpleHeader={false} simpleFooter={true}>

                <div className='container-profile-user'>
                    <ALBreadCrumb breadcrumbItems={breadCrumbItems} />

                    <Profile
                        imageProfile={conta?.usuario?.fotoPerfil || ''}
                        titleProfile={conta?.usuario?.nome || ''}
                        descripProfile={conta?.usuario?.biografia || ''}
                        dataProfile={conta}
                        isSebo={false}
                        isUser={true}
                    />
                </div>

            </TemplatePage>
        </div>
    );
};

export default ProfileUser;