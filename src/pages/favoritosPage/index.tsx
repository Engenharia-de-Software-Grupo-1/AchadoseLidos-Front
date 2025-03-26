import TemplatePage from '@pages/templatePage';
import ALBreadCrumb from '@components/ALBreadCrumb/breadCrumb';
import './style.css';
import FavoritoComponent from '@components/Favoritos/favoritos';

const FavoritosPage: React.FC = () => {

    const breadCrumbItems = [
        { label: 'Favoritos', url: '/profile/user/favoritos' }
    ];

    return (
        <TemplatePage simpleHeader={false} simpleFooter={true}>
            <ALBreadCrumb breadcrumbItems={breadCrumbItems} style={{backgroundColor: 'var(--Achados-OffWhite)'}} />
            <div className="main-favoritos">
                <h1 className='title-fav'>Favoritos</h1>
                <div className="component-fav">
                    <FavoritoComponent />
                </div>
            </div>
        </TemplatePage>
    );
};

export default FavoritosPage;