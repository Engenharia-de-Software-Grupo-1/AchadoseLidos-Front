import './style.css';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';
import { Filters } from 'types/NavigationFilters';
import { CategoriaProduto, EstadoConservacaoProduto, GeneroProduto } from 'constants/ProdutoConstants';
import BasicDemo from '@components/MultiSelect/BasicDemo';
import { MultiSelect } from 'primereact/multiselect';
import PriceInput from '@components/PriceInput/priceInput';

type ProductFilters = {
  filters: Filters[];
};

const ProductFilters: React.FC<ProductFilters> = ({ filters }) => {
  const [value, setValue] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="nav-filter-column">
      <div className="nav-filter-column-header">
        <span className="nav-filter-column-header-text">Filtros</span>
        <Button className="nav-filter-column-header-button" rounded>
          Aplicar {'>'}
        </Button>
      </div>
      <span className="nav-filter-colum-input-title"> Nome </span>
      <InputText
        placeholder="Digite o nome do produto"
        className="nav-filter-column-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <span className="nav-filter-colum-input-title"> Estado de Conservação </span>
      <BasicDemo className={'nav-filter-column-dropdown'} type={EstadoConservacaoProduto}></BasicDemo>
      <span className="nav-filter-colum-input-title"> Categoria </span>
      <div className="nav-filter-colum-input-title">
        <MultiSelect
          value={selectedCategories}
          onChange={(e: { value: React.SetStateAction<string[]> }) => setSelectedCategories(e.value)}
          options={Object.keys(CategoriaProduto).map((key) => ({
            label: key,
            value: CategoriaProduto[key as keyof typeof CategoriaProduto],
          }))}
          optionLabel="label"
          maxSelectedLabels={6}
          className="w-full md:w-20rem"
          placeholder={'Selecione'}
        />
      </div>
      <span className="nav-filter-colum-input-title"> Gênero </span>
      <BasicDemo // Resolver o caso que dado uma categoria selecionada e deselecionada, o gênero é limpo no dropdown. Atualmente aparece undefined.
        className={'nav-filter-column-dropdown'}
        type={selectedCategories.reduce(
          (acc, category) => {
            const genres = GeneroProduto[category as keyof typeof GeneroProduto];
            if (Array.isArray(genres)) {
              genres.forEach((genre) => (acc[genre] = genre));
            }
            return acc;
          },
          {} as { [key: string]: string }
        )}
        disabled={selectedCategories.length === 0}
      />
      <span className="nav-filter-column-title">Preço</span>
      <div className="nav-filter-column-price-inputs">
        <PriceInput />
        <span> até </span>
        <PriceInput />
      </div>
    </div>
  );
};

export default ProductFilters;
