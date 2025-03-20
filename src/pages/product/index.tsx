import TemplatePage from '@pages/templatePage';
import './style.css';
import '@utils/typography.css';
import ALBreadCrumb from '@components/ALBreadCrumb/breadCrumb';
import ProductDetails from '@components/ProductDetails/ProductDetails';
import { getById } from 'routes/routesProduto';

const breadcrumbItems = [{ label: 'Página do produto', url: '/product-page' }];

const ProductPage = async (id: number) => {
  
  const produto = await getById(id);

  return (
    <main className="container-product-page">
      <TemplatePage simpleHeader={false} simpleFooter={true}>
        <ALBreadCrumb breadcrumbItems={breadcrumbItems} style={{ backgroundColor: '#F5ECDD' }} />
        <ProductDetails
          productName={produto.nome}
          seboName={produto.sebo?.nome}
          bairro="Icoaraci"
          tags={[
            { severity: 'warning', value: 'Bom estado' },
            { severity: 'warning', value: 'K7' },
          ]}
          stock={produto.qtdEstoque}
          price={produto.preco}
          editionYear={produto.anoEdicao}
          releaseYear={2025}
          author={produto.autores}
          description={produto.descricao}
        />
      </TemplatePage>
    </main>
  );
};

export default ProductPage;
