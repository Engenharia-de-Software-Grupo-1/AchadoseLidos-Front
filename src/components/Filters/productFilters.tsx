import './style.css';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import React from 'react';
import { MultiSelect } from 'primereact/multiselect';
import { InputNumber } from 'primereact/inputnumber';
import { useFilterStore } from '../../stores/filters/productFilterStore';
import { CategoriaProduto, EstadoConservacaoProduto, GeneroProduto } from 'constants/ProdutoConstants';

export const ProductFilters: React.FC = () => {
  const {
    name,
    genre,
    firstPrice,
    secondPrice,
    selectedCategories,
    estadoConservacao,
    setName,
    setGenre,
    setFirstPrice,
    setSecondPrice,
    setSelectedCategories,
    setEstadoConservacao,
    applyFilters,
  } = useFilterStore();

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
        placeholder="Digite o nome do produto"
        className="nav-filter-column-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <span className="nav-filter-colum-input-title"> Estado de Conservação </span>
      <div className="nav-filter-column-dropdown">
        <MultiSelect
          value={estadoConservacao}
          onChange={(e) => setEstadoConservacao(e.value)}
          options={Object.keys(EstadoConservacaoProduto).map((key) => ({
            label: key,
            value: EstadoConservacaoProduto[key as keyof typeof EstadoConservacaoProduto],
          }))}
          optionLabel="label"
          placeholder={'Selecione'}
          maxSelectedLabels={6}
          className="w-full md:w-20rem"
        />
      </div>
      <span className="nav-filter-colum-input-title"> Categoria </span>
      <div className="nav-filter-column-dropdown">
        <MultiSelect
          value={selectedCategories}
          onChange={(e) => setSelectedCategories(e.value)}
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
      <div className="nav-filter-column-dropdown">
        <MultiSelect
          value={genre}
          onChange={(e) => setGenre(e.value)}
          options={selectedCategories.reduce(
            (acc, category) => {
              const genres = GeneroProduto[category as keyof typeof GeneroProduto];
              if (Array.isArray(genres)) {
                genres.forEach((genre) => acc.push({ label: genre, value: genre }));
              }
              return acc;
            },
            [] as { label: string; value: string }[]
          )}
          optionLabel="label"
          placeholder={'Selecione'}
          maxSelectedLabels={6}
          className="w-full md:w-20rem"
          disabled={selectedCategories.length === 0}
        />
      </div>
      <span className="nav-filter-column-title">Preço</span>
      <div className="nav-filter-column-price-inputs">
        <div>
          <InputNumber
            value={firstPrice}
            onValueChange={(e) => setFirstPrice(e.value ?? 0)}
            mode="currency"
            currency="BRL"
            locale="pt-BR"
            style={{ width: '140px' }}
            inputStyle={{ width: '100%' }}
          />
        </div>
        <span> até </span>
        <div>
          <InputNumber
            value={secondPrice}
            onValueChange={(e) => setSecondPrice(e.value ?? 0)}
            mode="currency"
            currency="BRL"
            locale="pt-BR"
            style={{ width: '140px' }}
            inputStyle={{ width: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
