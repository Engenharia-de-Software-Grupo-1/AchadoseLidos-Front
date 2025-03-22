import Banner from '@components/Banner/banner';
import TemplatePage from '@pages/templatePage';
import './style.css';
import ContainerItems from '@components/ContainerItems/containerItems';

const HomePage = () => {
  const images = ['/images/banner.jpg'];

  return (
    <TemplatePage simpleHeader={false} simpleFooter={false} backgroundFooterDiff={true}>
      <div className="main-context">
        <Banner images={images} showIndicators={true} />
        <div>
          <p className="main-p1">Explore itens de segunda mão!</p>
          <p className="main-p2">ACHADOS E LIDOS</p>
          <p className="main-p3">é o catálogo virtual dos sebos de Campina Grande!</p>
        </div>

        <img src="/images/underline.svg" alt="underline" style={{ marginTop: '42px', marginBottom: '42px' }} />
        <ContainerItems title="Livros" backgroundBege={false}>
          {' '}
        </ContainerItems>
        <ContainerItems title="Sebos" backgroundBege={true}>
          {' '}
        </ContainerItems>
        <ContainerItems title="Eventos" backgroundBege={false}>
          {' '}
        </ContainerItems>
        <ContainerItems title="Todos os itens" backgroundBege={true}>
          {' '}
        </ContainerItems>

      </div>
    </TemplatePage>
  );
};

export default HomePage;
