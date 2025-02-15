import { useBreadcrumb } from '../../hooks/useBreadcrumb';
import Banner from '../../components/Banner/banner';
import ALBreadCrumb from '../../components/ALBreadCrumb/ALBreadCrumb';
import TemplatePage from '../templatePage';
import './style.css';

const HomePage = () => {
  const breadcrumbItems = useBreadcrumb();
  const images = ['/images/banner.jpg'];

  return (
    <TemplatePage simpleHeader={false}>
      <div className="main-context">
        <Banner images={images} />
        <div>
          <p className="main-p1">Explore itens de segunda mão!</p>
          <p className="main-p2">ACHADOS E LIDOS</p>
          <p className="main-p3">é o catálogo virtual dos sebos de Campina Grande!</p>
        </div>
        <ALBreadCrumb breadcrumbItems={breadcrumbItems} />
      </div>
    </TemplatePage>
  );
};

export default HomePage;
