import TemplatePage from '@pages/template';
import './style.css';
import ALBreadCrumb from '@components/ALBreadCrumb/breadCrumb';
import { useAuth } from '@contexts/authContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CestaComponent from '@components/Cesta/cesta';
import { ProgressSpinner } from 'primereact/progressspinner';

const CestaPage = () => {
    const { conta, authChecked } = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (authChecked && (!conta || conta.tipo !== 'USUARIO')) {
            navigate('/login');
        }
    }, [authChecked, conta, navigate]);


    if (!authChecked) {
        return (
                <TemplatePage simpleHeader={false} simpleFooter={true}>
                    <div className='container-cesta-user'>
                        <div className="flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                            <ProgressSpinner />
                        </div>
                    </div>
                </TemplatePage>
        );
    }

    const breadCrumbItems = [
        { label: 'Cesta', url: '/profile/cesta' }
    ];

    return (
        <TemplatePage simpleHeader={false} simpleFooter={true}>
                <div className='container-cesta-user'>
                    <ALBreadCrumb breadcrumbItems={breadCrumbItems} />
                    <h1 className='h1-highlight'>Cesta</h1>
                    <CestaComponent/>
                </div>
        </TemplatePage>
    );
};

export default CestaPage;