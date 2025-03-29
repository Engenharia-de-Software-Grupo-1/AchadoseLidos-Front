import './style.css';
import { useEffect, useState } from 'react';
import TemplatePage from '@pages/template';
import ProductCard, { ProductCardProps } from '@components/ProductCard/productCard';
import ALBreadCrumb from '@components/ALBreadCrumb/breadCrumb';
import ProductFilters from '@components/Filters/productFilters';
import { Sorter } from 'types/NavigationFilters';
import { getAllProducts } from 'routes/routesProduto';
import { useAuth } from '@contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { useSorting } from '@hooks/useSorting';
import { useProductFilterStore } from '@stores/filters/productFilterStore';
import { Paginator } from 'primereact/paginator';

interface ProductNavigationPageProps {
  sorters: Sorter[];
  meusProdutos?: boolean;
}

export const ProductNavigationPage = ({ sorters, meusProdutos }: ProductNavigationPageProps) => {
  const breadcrumbItems = meusProdutos
    ? [{ label: 'Meus produtos', url: '/navigation/meus-produtos' }]
    : [{ label: 'Produtos', url: '/navigation/products' }];
  const navigate = useNavigate();
  const { nameIcon, changeOrder } = useSorting(sorters);
  const { filters } = useProductFilterStore();
  const [productCards, setProductCards] = useState<ProductCardProps[]>([]);
  const [first, setFirst] = useState(0);  
  const [rows, setRows] = useState(12);
  const { conta } = useAuth();
  const isSebo = conta?.tipo === 'SEBO';
  const _ = meusProdutos ? filters : filters.push({ campo: 'seboId', operador: '=', valor: conta?.id || -1 });

  useEffect(() => {
    if (meusProdutos && conta?.id && isSebo) { // corrigir lógica da página meus-produtos
      filters.push({ campo: 'seboId', operador: '=', valor: conta?.id || -1 });
    }
    getProducts();
  }, [filters, sorters, nameIcon, meusProdutos]);

  const getProducts = async () => {
    const response = await getAllProducts({ filters, sorters: sorters });
    const produtos = response.map((item) => {
      return {
        name: item.nome,
        image: item.fotos && item.fotos.length > 0 ? item.fotos[0].url : '/images/sem_foto.png',
        owner: item.sebo?.nome ?? '',
        price: item.preco,
        colorFrills: '1',
      };
    });
    setProductCards(produtos);
  };

  const handleEmptyContent = (message: string) => (
    <div className="empty-filter">
      <i className="pi pi-search-minus" style={{ fontSize: '3rem', color: 'var(--Achados-Black-50)' }} />
      <div className="empty-filter-text">
        <div className="empty-filter-text-1">
          <span>{message}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="nav-page">
      <TemplatePage simpleHeader={false} simpleFooter={false} backgroundFooterDiff={true}>
        <ALBreadCrumb breadcrumbItems={breadcrumbItems} style={{ backgroundColor: '#F5ECDD' }} />
        <div className="nav-content-center">
          <ProductFilters />
          <div className="nav-content-column">
            <div className="nav-filter-display">
              <p className="nav-filter-display-text">
                Resultados de pesquisa para: <br />
                Filtro 1, Filtro 2.
              </p>
              <div className="nav-filter-display-order">
                <p className="nav-filter-display-order-text" style={{ cursor: 'pointer' }}>
                  Nome
                </p>
                <i className={nameIcon} onClick={() => changeOrder('nome')} style={{ cursor: 'pointer' }} />
              </div>
            </div>
            {isSebo && meusProdutos && (
              <div className="nav-pagination-header-button-container">
                <Button
                  icon="pi pi-plus"
                  className="nav-pagination-header-button"
                  onClick={() => navigate('/product/edit')}
                >
                  Adicionar produto
                </Button>
              </div>
            )}
            {productCards.length > 0 ? (
              <>
                <div className="nav-content-center">
                  {productCards.slice(first, first + rows).map((card, index) => (
                    <ProductCard key={index} {...card} />
                  ))}
                </div>
                <Paginator
                  first={first}
                  rows={rows}
                  totalRecords={productCards.length}
                  onPageChange={(e) => {
                    setFirst(e.first);
                    setRows(e.rows);
                  }}
                ></Paginator>
              </>
            ) : (
              handleEmptyContent('Nenhum produto encontrado!')
            )}
          </div>
        </div>
      </TemplatePage>
    </div>
  );
};
