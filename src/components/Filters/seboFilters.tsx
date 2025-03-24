import BasicDemo from '@components/MultiSelect/BasicDemo';
import './style.css';
import { Button } from 'primereact/button';
import React from 'react';
import { Filters } from 'types/NavigationFilters';
import { InputText } from 'primereact/inputtext';
import { EstadoConservacaoProduto } from 'constants/ProdutoConstants';

type SeboFilters = {
  filters: Filters[];
};

const SeboFilters: React.FC<SeboFilters> = ({ filters }) => {
  const [value, setValue] = React.useState('');

  return (
    <div className="nav-filter-column">
      <div className="nav-filter-column-header">
        <span className="nav-filter-column-header-text">Filtros</span>
        <Button className="nav-filter-column-header-button" rounded>
          Aplicar {'>'}
        </Button>
      </div>
      <span className="nav-filter-colum-input-title"> Nome </span>
      <InputText placeholder='Digite o nome do sebo' className="nav-filter-column-input" value={value} onChange={(e) => setValue(e.target.value)} />
      <span className="nav-filter-colum-input-title"> Bairro </span>
      <BasicDemo className={'nav-filter-column-dropdown'} type={EstadoConservacaoProduto}></BasicDemo>
    </div>
  );
};

export default SeboFilters;
