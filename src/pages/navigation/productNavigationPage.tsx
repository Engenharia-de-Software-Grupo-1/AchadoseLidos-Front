import './style.css';
import { useEffect, useState } from 'react';
import TemplatePage from '@pages/template';
import ProductCard, { ProductCardProps } from '@components/ProductCard/productCard';
import ALBreadCrumb from '@components/ALBreadCrumb/breadCrumb';
import ProductFilters from '@components/Filters/productFilters';
import { Sorter } from 'types/NavigationFilters';
import { getAllProducts } from '@routes/routesProduto';
import { useAuth } from '@contexts/authContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { useSorting } from '@hooks/useSorting';
import { useProductFilterStore } from '@stores/filters/productFilterStore';
import { Paginator } from 'primereact/paginator';
import { formatTypedValue } from '@utils/utils';

interface ProductNavigationPageProps {
  sorters: Sorter[];
  meusProdutos?: boolean;
}

export const ProductNavigationPage = ({ sorters, meusProdutos }: ProductNavigationPageProps) => {
  const { conta } = useAuth();
  const { id } = useParams<{ id: string }>();
  const breadcrumbItems = meusProdutos
    ? [{ label: 'Meus produtos', url: `/navigation/meus-produtos/${conta?.sebo?.id}` }]
    : [{ label: 'Produtos', url: '/navigation/products' }];
  const navigate = useNavigate();
  const { nameIcon, changeOrder } = useSorting(sorters);
  const { filters } = useProductFilterStore();
  const [productCards, setProductCards] = useState<ProductCardProps[]>([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const isSebo = conta?.tipo === 'SEBO';
  
  useEffect(() => {
    if (window.location.pathname.includes('meus-produtos')) {
      filters.splice(0, filters.length);    
    } else if (filters.some((filter) => filter.campo === 'seboId')) {
      filters.splice(filters.findIndex((filter) => filter.campo === 'seboId'), 1);
    }
  }, [window.location.pathname]);
  
  useEffect(() => {
    let seboId = conta?.sebo?.id;

    if (id) {
      seboId = Number(id);
    }

    if (meusProdutos && seboId && !filters.some((filter) => filter.campo === 'seboId')) {
      filters.push({ campo: 'seboId', operador: '=', valor: seboId ?? -1 });
    } 
    getProducts();
  }, [filters[0]?.valor, filters, nameIcon, window.location.pathname, id]);


  const handleAcessProductPage = (id: number) => {
    navigate(`/product/${id}`);
  };

  const getProducts = async () => {
    const response = await getAllProducts({ filters, sorters: sorters });
    const produtos = response.map((item) => {
      return {
        id: item.id,
        name: item.nome,
        image: item.fotos && item.fotos.length > 0 ? item.fotos[0].url : '/images/sem_foto.png',
        owner: item.sebo?.nome ?? '',
        price: item.preco,
        begeBackground: true,
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
        <div className="nav-content-container">
          <ProductFilters />
          <div className="nav-content-column">
            <div className="nav-filter-display">
              <p className="nav-filter-display-text">
                Resultados de pesquisa para: <br />
                {formatTypedValue(filters
                  .filter((filter) => filter.campo !== 'seboId')
                  .map((filter) => Array.isArray(filter.valor) ? filter.valor.join(', ') : filter.valor)
                  .join(', '), 103)}
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
                  onClick={() => navigate('/register/product')}
                >
                  Adicionar produto
                </Button>
              </div>
            )}
            {productCards.length > 0 ? (
              <>
                <div className="nav-content-center">
                  {productCards.slice(first, first + rows).map((card, index) => (
                    <div style={{cursor: 'pointer'}} onClick={() => card.id !== undefined && handleAcessProductPage(card.id)} key={index}>
                      <ProductCard key={index} {...card} />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              handleEmptyContent('Nenhum produto encontrado!')
            )}
          </div>
        </div>
        <div className="nav-page-paginator">
          <Paginator
            first={first}
            rows={rows}
            totalRecords={productCards.length}
            onPageChange={(e) => {
              setFirst(e.first);
              setRows(e.rows);
            }}
            style={{ backgroundColor: 'var(--Achados-OffWhite)' }}
          ></Paginator>
        </div>
      </TemplatePage>
    </div>
  );
};
function initialize(seboId: number) {
  throw new Error('Function not implemented.');
}

