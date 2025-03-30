import './style.css';
import { Button } from 'primereact/button';
import React from 'react';
import { Filter } from 'types/NavigationFilters';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { useSeboFilterStore } from '@stores/filters/seboFilterStore';
import bairros from '@constants/CgBairros';
import { Checkbox } from 'primereact/checkbox';

type SeboFilters = {
  filters: Filter[];
};

const SeboFilters: React.FC = () => {
  const { nome, endereco, concordaVender, setNome, setEndereco, setConcordaVender, applyFilters } =
    useSeboFilterStore();

  return (
    <div className="nav-filter-column">
      <div className="nav-filter-column-header">
        <span className="nav-filter-column-header-text">Filtros</span>
        <Button className="nav-filter-column-header-button" rounded onClick={applyFilters}>
          Aplicar {'>'}
        </Button>
      </div>
      <span className="nav-filter-colum-input-title"> Nome </span>
      <InputText
        placeholder="Digite o nome do sebo"
        className="nav-filter-column-input"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <span className="nav-filter-colum-input-title"> Bairro </span>
      <div className="nav-filter-column-dropdown">
        <MultiSelect
          value={endereco}
          onChange={(e) => setEndereco(e.value)}
          options={bairros}
          optionLabel="label"
          placeholder={'Selecione'}
          maxSelectedLabels={6}
          className="w-full md:w-20rem"
        />
      </div>
      <div className="nav-filter-column-checkbox">
        <Checkbox onChange={(e) => setConcordaVender(e.checked ? true : false)} checked={concordaVender} />
        <span className="text-sales">Vende produtos pelo site?</span>
      </div>
    </div>
  );
};

export default SeboFilters;
