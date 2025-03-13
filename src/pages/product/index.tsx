import TemplatePage from '@pages/templatePage';
import './style.css';
import '@utils/typography.css';
import ALBreadCrumb from '@components/ALBreadCrumb/breadCrumb';
import ProductDetails from '@components/ProductDetails/ProductDetails';

const breadcrumbItems = [{ label: 'Página do produto', url: '/product-page' }];
const mockDescription =
  'Escrito por um autor defunto (e não por um defunto autor, como o próprio destaca), Memórias Póstumas de Brás Cubas é um livro atípico, bastante original e desafiador em relação às suas escolhas estéticas e estilísticas. Considerada atualmente a obra que dá início ao Realismo literário no país, este quinto romance de Machado de Assis, publicado em 1881, representou um ponto de virada na carreira do escritor, até então filiado ao ideário do Romantismo.';
const ProductPage = () => {
  return (
    <main className="container-product-page">
      <TemplatePage simpleHeader={false} simpleFooter={true}>
        <ALBreadCrumb breadcrumbItems={breadcrumbItems} style={{ backgroundColor: '#F5ECDD' }} />
        <ProductDetails
          productName="Memórias Póstumas de Brás Cubas"
          seboName="Recanto das Ondas"
          bairro="Icoaraci"
          tags={[
            { severity: 'warning', value: 'Bom estado' },
            { severity: 'warning', value: 'K7' },
          ]}
          stock={5}
          price={68.4}
          editionYear={2025}
          releaseYear={2025}
          author="Machado de Assis"
          description={mockDescription}
        />
      </TemplatePage>
    </main>
  );
};

export default ProductPage;
