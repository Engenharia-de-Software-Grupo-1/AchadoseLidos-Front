import TemplatePage from '@pages/template';
import { useForm } from './useForm';
import './style.css';
import ALBreadCrumb from '@components/ALBreadCrumb/breadCrumb';
import Gallery from '@components/Gallery/gallery';
import UploadImages from '@components/UploadImages/uploadImages';
import { ProdutoFieldNames } from '@domains/ProdutoFieldNames';
import { ProductFormField } from '@components/ProductDetails/productFormFields';
import { Button } from 'primereact/button';
import { CategoriaProduto, EstadoConservacaoProduto, GeneroProduto } from 'constants/produtoConstants';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useErrorContext } from '@contexts/errorContext';
import { useAuth } from '@contexts/authContext';
import Atention from '@components/Attention';

interface ProdutoFormProps {
  isRegister?: boolean;
}

const ProductForm = ({ isRegister = false }: ProdutoFormProps) => {
  const { id } = useParams();
  const { produto, setField, submitted, setProduct, images, setImages, handleSave } = useForm();
  const [genero, setGenero] = useState<keyof typeof GeneroProduto>('LIVRO');
  const { errors } = useErrorContext();
  const { conta } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setProduct(id);
    }
  }, [id]);

  useEffect(() => {
    // Retorna imediatamente se os dados ainda não foram carregados
    if (!produto?.sebo?.id || !conta?.sebo?.id) return;

    if (!isRegister && conta.tipo === 'SEBO' && produto.sebo?.id !== conta.sebo.id) {
      navigate('/', { replace: true });
    }
  }, [produto, conta, isRegister, navigate]);

  const breadcrumbItems = [
    {
      label: isRegister ? 'Meus Produtos' : 'Meu Produto',
      url: isRegister ? '/navigation/meus-produtos' : `/product/${id}`,
    },
    {
      label: isRegister ? 'Cadastrar Produto' : 'Editar Produto',
      url: isRegister ? '/register/product' : `/product/${id}/edit`,
    },
  ];

  return (
    <main className="main-container-edit-product">
      <TemplatePage simpleFooter simpleHeader={false}>
        <ALBreadCrumb breadcrumbItems={breadcrumbItems} />

        <section className="section-content-body-form">
          <section className="content-items-product">
            <div className="conatiner-gallery-upload">
              <span className="span-image-product-name">Imagens do produto *</span>
              <Gallery photos={images} />
              <UploadImages setField={setField} setImage={setImages} image={images} />
            </div>

            <div className="content1-form-edit-product">
              <div className="content2-form-edit-product">
                <ProductFormField
                  labelText="Nome do produto"
                  fieldName={ProdutoFieldNames.nome}
                  fieldValue={produto.nome}
                  setField={setField}
                  hasSubmissionFailed={errors?.nome?.error ? errors.nome.error : false}
                  placeholderText="Nome do Produto"
                />

                <div className="content-price-form">
                  <ProductFormField
                    labelText="Preço"
                    fieldName={ProdutoFieldNames.preco}
                    fieldValuePrice={produto.preco}
                    setField={setField}
                    hasSubmissionFailed={errors?.preco?.error ? errors.preco.error : false}
                    placeholderText="R$ 0.00"
                    isPrice
                    isShortInput
                  />

                  <ProductFormField
                    labelText="Estoque"
                    fieldName={ProdutoFieldNames.qtdEstoque}
                    fieldValueStock={produto.qtdEstoque}
                    setField={setField}
                    hasSubmissionFailed={errors?.qtdEstoque?.error ? errors.qtdEstoque.error : false}
                    placeholderText="0"
                    isStock
                    isShortInput
                  />
                </div>

                <div className="content-price-form">
                  <ProductFormField
                    labelText="Ano Edição"
                    fieldName={ProdutoFieldNames.anoEdicao}
                    fieldValueNumber={produto.anoEdicao}
                    setField={setField}
                    hasSubmissionFailed={submitted}
                    placeholderText="0000"
                    isYear
                    isOptional
                  />

                  <ProductFormField
                    labelText="Ano Lançamento"
                    fieldName={ProdutoFieldNames.anoLancamento}
                    fieldValueNumber={produto.anoLancamento}
                    setField={setField}
                    hasSubmissionFailed={submitted}
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
                    hasSubmissionFailed={errors?.categoria?.error ? errors.categoria.error : false}
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
                    hasSubmissionFailed={errors?.generos?.error ? errors.generos.error : false}
                    placeholderText="Gênero"
                    isGenero
                    isShortInput
                    genero={genero}
                  />

                  <ProductFormField
                    labelText="Estado"
                    fieldName={ProdutoFieldNames.estadoConservacao}
                    fieldValue={produto.estadoConservacao}
                    setField={setField}
                    hasSubmissionFailed={errors?.estadoConservacao?.error ? errors.estadoConservacao.error : false}
                    placeholderText="Estado"
                    isCategory
                    isShortInput
                    options={Object.entries(EstadoConservacaoProduto).map(([key, value]) => ({ label: key, value }))}
                  />
                </div>

                <ProductFormField
                  labelText="Nome dos Autores (separados por vírgula)"
                  fieldName={ProdutoFieldNames.autores}
                  fieldValue={produto.autores}
                  setField={setField}
                  hasSubmissionFailed={submitted}
                  placeholderText="Autor1, Autor2"
                  isTextArea
                  isOptional
                />

                <ProductFormField
                  labelText="Descrição"
                  fieldName={ProdutoFieldNames.descricao}
                  fieldValue={produto.descricao}
                  setField={setField}
                  hasSubmissionFailed={submitted}
                  placeholderText="Escreva uma descrição do produto"
                  isTextArea
                  isOptional
                />
                {conta?.tipo === 'SEBO' && !conta?.sebo?.concordaVender && <Atention />}
              </div>
              <Button label="Salvar" className="button-save" onClick={() => handleSave(isRegister, id)} />
            </div>
          </section>
        </section>
      </TemplatePage>
    </main>
  );
};

export default ProductForm;
