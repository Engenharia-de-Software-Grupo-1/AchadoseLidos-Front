import TemplatePage from '@pages/templatePage';
import './style.css';
import Profile from '@components/ProfileUsers/profileUsers';
import ALBreadCrumb from '@components/ALBreadCrumb/breadCrumb';
import { useAuth } from '@contexts/authContext';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Usuario } from '@domains/Usuario';
import { getOthersUsersById } from '@routes/routesUser';

const ProfileUser = () => {
    const { id } = useParams();
    const {conta} = useAuth();
    const [data, setData] = useState<Usuario>();

    const getUserById = async (id: string) => {
        try {
            const response = await getOthersUsersById(id);
            setData(response);
        } catch (error) {
            console.error('Erro ao buscar usuário por id', error);
        }
    };

     useEffect(() => {
        if (id){
            getUserById(id);
        } else {
            setData(conta?.usuario);
        }
      }, [conta, id]);
    
    const breadCrumbItems = [
        { label: 'Usuário', url: id ? `/profile/user/${id}` : '/profile/user' }
    ];

    return (
        <div className='container-profile-user'>
            <TemplatePage simpleHeader={false} simpleFooter={true}>

                <div className='container-profile-user'>
                    <ALBreadCrumb breadcrumbItems={breadCrumbItems} />

                    <Profile
                        authUser={id ? false : true}
                        data={data}
                        role={id ?  undefined: 'USER'}
                    />
                </div>
            </TemplatePage>
        </div>
    );
};

export default ProfileUser;