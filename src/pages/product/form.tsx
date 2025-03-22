import TemplatePage from '@pages/templatePage';
import { useForm } from './useForm';
import './style.css';
import ALBreadCrumb from '@components/ALBreadCrumb/breadCrumb';
import Gallery from '@components/Gallery/gallery';
import UploadImages from '@components/UploadImages/uploadImages';
import { ProdutoFieldNames } from '@domains/Produto/ProdutoFieldNames';
import { ProductFormField } from '@components/ProductDetails/ProductFormFields';
import { Button } from 'primereact/button';
import { CategoriaProduto, EstadoConservacaoProduto, GeneroProduto } from 'constants/ProdutoConstants';
import { useState } from 'react';

const ProductForm = () => {
  const { produto, breadcrumbItems, setField, submitted} =
    useForm();

  const [genero, setGenero] = useState<keyof typeof GeneroProduto>('LIVRO');

  return (
    <main className="main-container-edit-product">
      <TemplatePage simpleFooter simpleHeader={false}>
        <ALBreadCrumb breadcrumbItems={breadcrumbItems} />

        <section className="section-content-body-form">
          <section className="content-items-product">
            <div className="conatiner-gallery-upload">
              <span className="span-image-product-name">Imagens do produto *</span>
              <Gallery />
              <UploadImages setField={setField}/>
            </div>

            <div className="content1-form-edit-product">
              <div className="content2-form-edit-product">
                <ProductFormField
                  labelText="Nome do produto"
                  fieldName={ProdutoFieldNames.nome}
                  fieldValue={produto.nome}
                  setField={setField}
                  hasSubmissionFailed={submitted} // tem que alterar isso. submitted ainda nao diz se a submissao falhou
                  placeholderText="Nome do Produto"
                />

                <div className="content-price-form">
                  <ProductFormField
                    labelText="Preco"
                    fieldName={ProdutoFieldNames.preco}
                    fieldValuePrice={produto.preco}
                    setField={setField}
                    hasSubmissionFailed={submitted} // tem que alterar isso. submitted ainda nao diz se a submissao falhou
                    placeholderText="R$ 0.00"
                    isPrice
                    isShortInput
                  />

                  <ProductFormField
                    labelText="Estoque"
                    fieldName={ProdutoFieldNames.estoque}
                    fieldValueStock={produto.qtdEstoque}
                    setField={setField}
                    hasSubmissionFailed={submitted} // tem que alterar isso. submitted ainda nao diz se a submissao falhou
                    placeholderText="0"
                    isStock
                    isShortInput
                  />
                </div>

                <div className="content-price-form">
                  <ProductFormField
                    labelText="Ano-Edição"
                    fieldName={ProdutoFieldNames.anoEdicao}
                    fieldValueNumber={produto.anoEdicao}
                    setField={setField}
                    hasSubmissionFailed={submitted} // tem que alterar isso. submitted ainda nao diz se a submissao falhou
                    placeholderText="0000"
                    isYear
                    isOptional
                  />

                  <ProductFormField
                    labelText="Ano-Lançamento"
                    fieldName={ProdutoFieldNames.anoLancamento}
                    fieldValueNumber={produto.anoLancamento}
                    setField={setField}
                    hasSubmissionFailed={submitted} // tem que alterar isso. submitted ainda nao diz se a submissao falhou
                    placeholderText="0000"
                    isYear
                    isShortInput
                    isOptional
                  />
                </div>

                <div className="content-price-form">
                  <ProductFormField
                    labelText="Categoria"
                    fieldName={ProdutoFieldNames.categoria}
                    fieldValue={produto.categoria}
                    setField={setField}
                    hasSubmissionFailed={submitted} // tem que alterar isso. submitted ainda nao diz se a submissao falhou
                    placeholderText="Categoria"
                    isCategory
                    setGenero={setGenero}
                    isShortInput
                    options={Object.entries(CategoriaProduto).map(([key, value]) => ({ label: key, value }))}
                  />

                  <ProductFormField
                    labelText="Gênero"
                    fieldName={ProdutoFieldNames.genero}
                    fieldValues={produto.generos}
                    setField={setField}
                    hasSubmissionFailed={submitted} // tem que alterar isso. submitted ainda nao diz se a submissao falhou
                    placeholderText="Gênero"
                    isGenero
                    isShortInput
                    genero={genero}
                  />

                  <ProductFormField
                    labelText="Estado"
                    fieldName={ProdutoFieldNames.estado}
                    fieldValue={produto.estadoConservacao}
                    setField={setField}
                    hasSubmissionFailed={submitted} // tem que alterar isso. submitted ainda nao diz se a submissao falhou
                    placeholderText="Estado"
                    isCategory
                    isShortInput
                    options={Object.entries(EstadoConservacaoProduto).map(([key, value]) => ({ label: key, value }))}
                  />
                </div>

                <ProductFormField
                  labelText="Nome dos Autores (separados por vírgula)"
                  fieldName={ProdutoFieldNames.preco}
                  fieldValueNumber={produto.preco}
                  setField={setField}
                  hasSubmissionFailed={submitted} // tem que alterar isso. submitted ainda nao diz se a submissao falhou
                  placeholderText="Autor1, Autor2"
                  isTextArea
                  isOptional
                />

                <ProductFormField
                  labelText="Descrição"
                  fieldName={ProdutoFieldNames.preco}
                  fieldValueNumber={produto.preco}
                  setField={setField}
                  hasSubmissionFailed={submitted} // tem que alterar isso. submitted ainda nao diz se a submissao falhou
                  placeholderText="Escreva uma descrição do produto"
                  isTextArea
                  isOptional
                />
              </div>

              <Button label="Salvar" className="button-save" />
            </div>
          </section>
        </section>
      </TemplatePage>
    </main>
  );
};

export default ProductForm;
