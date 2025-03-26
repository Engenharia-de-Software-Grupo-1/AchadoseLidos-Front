import ALBreadCrumb from '@components/ALBreadCrumb/breadCrumb';
import ProductDetails from '@components/ProductDetails/ProductDetails';
import { Produto } from '@domains/Produto/Produto';
import TemplatePage from '@pages/templatePage';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getById } from 'routes/routesProduto';

const breadcrumbItems = [{ label: 'Página do produto', url: '/product-page' }];

const ProductPage = () => {
  const { id } = useParams();
  const [produto, setProduto] = useState<Produto | null>(null);

  const fetchProduto = async () => {
    try {
      const data = await getById(Number(id));
      setProduto(data);
    } catch (error) {
      console.error('Erro ao buscar produto', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduto();
    }
  }, [id]);

  if (!produto) {
    return null;
  }

  return (
    <main className="container-product-page">
      <TemplatePage simpleHeader={false} simpleFooter={true}>
        <ALBreadCrumb breadcrumbItems={breadcrumbItems} style={{ backgroundColor: '#F5ECDD' }} />
        <ProductDetails
          id={id? id : ''}
          data={produto}
        />
      </TemplatePage>
    </main>
  );
};

export default ProductPage;
