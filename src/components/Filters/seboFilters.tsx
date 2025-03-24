import './style.css';
import { Button } from 'primereact/button';
import React from 'react';
import { Filters } from 'types/NavigationFilters';

type SeboFilters = {
    filters: Filters[];
};

const SeboFilters: React.FC<SeboFilters> = ({filters}) => {

  return (
    <div className="nav-filter-column">
      <div className="nav-filter-column-header">
        <span className="nav-filter-column-header-text">Filtros</span>
        <Button className="nav-filter-column-header-button" rounded>
          Aplicar {'>'}
        </Button>
      </div>
    </div>
  );
};

export default SeboFilters;
