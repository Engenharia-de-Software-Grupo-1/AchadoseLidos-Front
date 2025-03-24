import TemplatePage from '@pages/templatePage';
import './style.css';
import Banner from '@components/Banner/banner';
import Profile from '@components/ProfileUsers/profileUsers';
import Gallery from '@components/Gallery/gallery';
import MyMap from '@components/Map/map';
import ContainerItems from '@components/ContainerItems/containerItems';
import { useSebo } from '@stores/profile/sebo/indexStore';
import { useEffect } from 'react';
import { useAuth } from '@contexts/authContext';

const ProfileSebo = ({ id }: { id?: number }) => {
  const { sebo, initialize, loading } = useSebo();
  const { conta, isAuthenticated } = useAuth();

  useEffect(() => {
    const seboId = conta?.sebo?.id ?? id;

    if (seboId) {
      initialize(seboId);
    }
  }, [conta?.sebo?.id, id, initialize]);

  return (
    <div className="main-profile-sebo">
      <TemplatePage simpleHeader={false} simpleFooter={false} backgroundFooterDiff={true}>
        {loading ? (
          <div className="loading-spinner">
            <i className="pi pi-spinner mr-2" />
          </div>
        ) : (
          <>
            <Banner images={sebo?.fotos} showIndicators={false} />
            <div className="profile-sebo">
              <Profile authUser={isAuthenticated} role={conta?.tipo} data={sebo} />
            </div>

            <ContainerItems title="Todos os Itens" backgroundBege={false}>
              {' '}
            </ContainerItems>
            <ContainerItems title="Eventos" backgroundBege={true}>
              {' '}
            </ContainerItems>

            <div className="container-carousel-items">
              <div className="content-title-history">
                <span className="title-carousel-history">Nossa História</span>
              </div>
            </div>

            <div className="space-carousel-history">
              <div className="container-hist-pics">
                <div className="hist">
                  <span className="text-hist">{`${sebo?.biografia}`}</span>
                </div>

                <Gallery />
              </div>

              <div className="container-map">
                <MyMap endereco={sebo?.endereco} />
              </div>
            </div>
          </>
        )}
      </TemplatePage>
    </div>
  );
};

export default ProfileSebo;
