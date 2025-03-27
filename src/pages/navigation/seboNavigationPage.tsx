import './style.css';
import { useEffect, useState } from 'react';
import TemplatePage from '@pages/templatePage';
import GenericCard, { GenericCardProps } from '@components/GenericCard/genericCard';
import ALBreadCrumb from '@components/ALBreadCrumb/breadCrumb';
import SeboFilters from '@components/Filters/seboFilters';
import { Sorter } from 'types/NavigationFilters';
import { getAll, getAllSebosByFilterAndOrders } from 'routes/routesSebo';
import { Sebo } from '@domains/Sebo';
import { useSorting } from '@hooks/useSorting';
import { useSeboFilterStore } from '@stores/filters/seboFilterStore';

interface SeboNavigationPageProps {
  sorters: Sorter[];
}

export const SeboNavigationPage = ({ sorters }: SeboNavigationPageProps) => {
  const { filters } = useSeboFilterStore();
  const [seboCards, setSeboCards] = useState<GenericCardProps[]>([]);
  const breadcrumbItems = [{ label: 'Sebo', url: '/sebos' }];
  const { nameIcon, changeOrder } = useSorting(sorters);

  useEffect(() => {
    getSebos();
  }, [filters, sorters]);

  const getSebos = async () => {
    const response = await getAll();
    setSeboCards(
      response.map((sebo: Sebo) => ({
        id: sebo.id,
        title: sebo.nome,
        description: sebo.endereco?.bairro || 'Campina Grande',
        imageUrl: sebo.fotoPerfil && sebo.fotoPerfil !== '' ? sebo.fotoPerfil : '/images/sem_foto.png',
        topLabel: sebo.endereco?.bairro || 'Campina Grande',
        isButtonVisible: true,
      }))
    );
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
          <SeboFilters />
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
            {seboCards.length > 0 ? (
              <div className="nav-content-center-sebo">
                {seboCards.map((card, index) => (
                  <GenericCard key={index} {...card} />
                ))}
              </div>
            ) : (
              handleEmptyContent('Nenhum sebo encontrado!')
            )}
            {seboCards.length > 4 && (
              <div className="nav-pagination-footer">
                1-20 de 200
                <i className="pi pi-angle-left"></i>
                <i className="pi pi-angle-right"></i>
              </div>
            )}{' '}
          </div>
        </div>
      </TemplatePage>
    </div>
  );
};
