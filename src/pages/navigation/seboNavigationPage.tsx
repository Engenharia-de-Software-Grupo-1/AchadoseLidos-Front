import './style.css';
import { useEffect, useState } from 'react';
import GenericCard, { GenericCardProps } from '@components/GenericCard/genericCard';
import ALBreadCrumb from '@components/ALBreadCrumb/breadCrumb';
import SeboFilters from '@components/Filters/seboFilters';
import { Sorter } from 'types/NavigationFilters';
import { getAll } from 'routes/routesSebo';
import { Sebo } from '@domains/Sebo';
import { useSorting } from '@hooks/useSorting';
import { useSeboFilterStore } from '@stores/filters/seboFilterStore';
import { Paginator } from 'primereact/paginator';
import TemplatePage from '@pages/template';

interface SeboNavigationPageProps {
  sorters: Sorter[];
}

export const SeboNavigationPage = ({ sorters }: SeboNavigationPageProps) => {
  const { filters } = useSeboFilterStore();
  const [seboCards, setSeboCards] = useState<GenericCardProps[]>([]);
  const breadcrumbItems = [{ label: 'Sebos', url: '/navigation/sebos' }];
  const { nameIcon, changeOrder } = useSorting(sorters);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(4);

  useEffect(() => {
    getSebos();
  }, [filters, sorters, nameIcon]);

  const getSebos = async () => {
    const response = await getAll({ filters, sorters });
    setSeboCards(
      response.map((sebo: Sebo) => ({
        id: sebo.id,
        title: sebo.nome,
        description: sebo.endereco?.bairro || 'Campina Grande',
        imageUrl: sebo.fotoPerfil ? sebo.fotoPerfil : '/images/sem_foto.png',
        topLabel: sebo.endereco?.bairro || 'Campina Grande',
        seboId: sebo.id,
        isButtonVisible: true,
        isOffWhiteFrills: true,
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
        <div className="nav-content-container">
          <SeboFilters />
          <div className="nav-content-column">
            <div className="nav-filter-display">
              <p className="nav-filter-display-text">
                Resultados de pesquisa para: <br />
                {filters
                  .map((filter) => (filter.campo === 'concordaVender' ? 'Concorda vender' : filter.valor))
                  .join(', ')
                  .slice(0, 103) + (filters.map((filter) => (filter.campo === 'concordaVender' ? 'Concorda vender' : filter.valor)).join(', ').length > 103 ? '...' : '')}
              </p>
              <div className="nav-filter-display-order">
                <p className="nav-filter-display-order-text" style={{ cursor: 'pointer' }}>
                  Nome
                </p>
                <i className={nameIcon} onClick={() => changeOrder('nome')} style={{ cursor: 'pointer' }} />
              </div>
            </div>
            {seboCards.length > 0 ? (
              <>
                <div className="nav-content-center-sebo">
                  {seboCards.slice(first, first + rows).map((card, index) => (
                    <GenericCard key={index} {...card} />
                  ))}
                </div>
              </>
            ) : (
              handleEmptyContent('Nenhum sebo encontrado!')
            )}
          </div>
        </div>
        <div className="nav-page-paginator">
          <Paginator
            first={first}
            rows={rows}
            totalRecords={seboCards.length}
            onPageChange={(e) => {
              setFirst(e.first);
              setRows(e.rows);
            }}
            style={{ backgroundColor: 'var(--Achados-OffWhite', alignSelf: 'flex-end'}}
          ></Paginator>
        </div>
      </TemplatePage>
    </div>
  );
};
