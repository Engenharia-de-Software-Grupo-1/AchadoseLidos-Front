import TemplatePage from '@pages/template';
import './style.css';
import Banner from '@components/Banner/banner';
import Profile from '@components/ProfileUsers/profileUsers';
import Gallery from '@components/Gallery/gallery';
import MyMap from '@components/Map/map';
import ContainerItems from '@components/ContainerItems/containerItems';
import { useSebo } from '@stores/profile/sebo/indexStore';
import { useEffect, useState } from 'react';
import { useAuth } from '@contexts/authContext';
import ProductCard, { ProductCardProps } from '@components/ProductCard/productCard';
import { getAllProducts } from '@routes/routesProduto';
import { Carousel } from 'primereact/carousel';
import { useParams } from 'react-router-dom';

const ProfileSebo = () => {
  const { sebo, initialize, loading } = useSebo();
  const { id } = useParams<{ id: string }>();
  const [produtos, setProdutos] = useState<ProductCardProps[]>([]);
  const { conta, isAuthenticated } = useAuth();

  useEffect(() => {
    let seboId = conta?.sebo?.id;

    if (id) {
      seboId = Number(id);
    }

    if (seboId) {
      initialize(seboId);
    }

    fetchProdutos(seboId ?? -1);
  }, [conta?.sebo?.id, id, initialize]);

  const fetchProdutos = async (seboId: number) => {
    const response = await getAllProducts({
      filters: [{ campo: 'seboId', operador: '=', valor: seboId }],
      sorters: [],
    });
    setProdutos(
      response.map((item) => {
        return {
          id: item.id,
          name: item.nome,
          image: item.fotos && item.fotos.length > 0 ? item.fotos[0].url : '/images/sem_foto.png',
          owner: item.sebo?.nome ?? '',
          price: item.preco,
          begeBackground: true,
        };
      })
    );
  };

  // Verificar se o usuário logado é o proprietário deste perfil
  const isOwnProfile = conta?.sebo?.id === sebo?.id;

  return (
    <div className="main-profile-sebo">
      <TemplatePage simpleHeader={false} simpleFooter={false} backLight={true}>
        {loading ? (
          <div className="loading-spinner">
            <i className="pi pi-spinner mr-2" />
          </div>
        ) : (
          <>
            <Banner images={sebo?.fotos} showIndicators={false} />
            <div className="profile-sebo">
              <Profile authUser={isAuthenticated} role={conta?.tipo} data={sebo} isOwnProfile={isOwnProfile}/>
            </div>
            <ContainerItems title="Todos os produtos" backgroundBege={false} idSebo={sebo?.id}>
              <div className="carrousel-product">
                <Carousel
                  value={produtos}
                  numVisible={11}
                  numScroll={10}
                  circular
                  itemTemplate={(produto: ProductCardProps) => <ProductCard {...produto} />}
                />
              </div>
            </ContainerItems>
            <div className="container-carousel-items-h">
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
