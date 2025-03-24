import './style.css';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';
import { Filters } from 'types/NavigationFilters';
import { CategoriaProduto, EstadoConservacaoProduto, GeneroProduto } from 'constants/ProdutoConstants';
import BasicDemo from '@components/MultiSelect/BasicDemo';

type ProductFilters = {
  filters: Filters[];
};

const ProductFilters: React.FC<ProductFilters> = ({ filters }) => {
  const [value, setValue] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  return (
    <div className="nav-filter-column">
      <div className="nav-filter-column-header">
        <span className="nav-filter-column-header-text">Filtros</span>
        <Button className="nav-filter-column-header-button" rounded>
          Aplicar {'>'}
        </Button>
      </div>
      <span className="nav-filter-colum-input-title"> Nome </span>
      <InputText className="nav-filter-column-input" value={value} onChange={(e) => setValue(e.target.value)} />
      <span className="nav-filter-colum-input-title"> Estado de Conservação </span>
      <BasicDemo
        className={'nav-filter-column-dropdown'}
        type={EstadoConservacaoProduto}
        placeholder="Selecione"
      ></BasicDemo>
      <span className="nav-filter-colum-input-title"> Categoria </span>
      {/* <div className="nav-filter-colum-input-title">
        <MultiSelect
          value={selectedCategories}
          onChange={(e) => setSelectedCategories(e.value)}
          options={fieldOptions}
          optionLabel="label"
          placeholder={placeholder}
          maxSelectedLabels={6}
          className="w-full md:w-20rem"
          disabled={disabled}
        />
      </div>
      <span className="nav-filter-colum-input-title"> Gênero </span>
      <BasicDemo
        className={'nav-filter-column-dropdown'}
        // type={GeneroProduto[selectedCategoria]}
        placeholder="Selecione"
      /> */}
    </div>
  );
};

export default ProductFilters;
