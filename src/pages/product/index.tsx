import ALBreadCrumb from '@components/ALBreadCrumb/breadCrumb';
import ProductDetails from '@components/ProductDetails/ProductDetails';
import { useNotification } from '@contexts/notificationContext';
import { Produto } from '@domains/Produto/Produto';
import TemplatePage from '@pages/templatePage';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getById } from 'routes/routesProduto';

const breadcrumbItems = [{ label: 'Página do produto', url: '/product-page' }];

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [produto, setProduto] = useState<Produto | null>(null);
  const { showNotification } = useNotification();

  const fetchProduto = async () => {
    const data = await getById(Number(id));
    setProduto(data);
  };

  useEffect(() => {
    if (id !== null) { 
      fetchProduto();
    }
  }, [id]);

  if (!produto) {
    showNotification('error', 'Produto não encontrado!', '');
    return null;
  }

  return (
    <main className="container-product-page">
      <TemplatePage simpleHeader={false} simpleFooter={true}>
        <ALBreadCrumb breadcrumbItems={breadcrumbItems} style={{ backgroundColor: '#F5ECDD' }} />
        <ProductDetails
          productName={produto.nome}
          seboName={produto.sebo?.nome}
          bairro={produto.sebo?.endereco?.bairro}
          tags={[
            { severity: 'info', value: produto?.categoria },
            { severity: 'info', value: produto?.estadoConservacao },
          ]}
          stock={produto?.qtdEstoque}
          price={produto?.preco}
          editionYear={produto?.anoEdicao}
          releaseYear={produto?.anoLancamento}
          author={produto?.autores}
        description={produto?.descricao}
        />
      </TemplatePage>
    </main>
  );
};

export default ProductPage;
