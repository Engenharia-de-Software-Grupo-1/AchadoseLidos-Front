import './style.css';
import { Button } from 'primereact/button';
import React from 'react';
import { Filter } from 'types/NavigationFilters';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { useSeboFilterStore } from '@stores/filters/seboFilterStore';
import bairros from 'constants/CgBairros';

type SeboFilters = {
  filters: Filter[];
};

const SeboFilters: React.FC = () => {
  const { name, location, setName, setLocation, applyFilters } = useSeboFilterStore();

  return (
    <div className="nav-filter-column">
      <div className="nav-filter-column-header">
        <span className="nav-filter-column-header-text">Filtros</span>
        <Button onClick={applyFilters} className="nav-filter-column-header-button" rounded>
          Aplicar {'>'}
        </Button>
      </div>
      <span className="nav-filter-colum-input-title"> Nome </span>
      <InputText
        placeholder="Digite o nome do sebo"
        className="nav-filter-column-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <span className="nav-filter-colum-input-title"> Bairro </span>
      <div className="nav-filter-column-dropdown">
        <MultiSelect
          value={location}
          onChange={(e) => setLocation(e.value)}
          options={bairros}
          optionLabel="label"
          placeholder={'Selecione'}
          maxSelectedLabels={6}
          className="w-full md:w-20rem"
        />
      </div>
    </div>
  );
};

export default SeboFilters;
