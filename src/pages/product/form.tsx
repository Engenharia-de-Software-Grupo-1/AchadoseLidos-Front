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
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getById, updateProduct } from 'routes/routesProduto';
import { Produto } from '@domains/Produto/Produto';
import { useNotification } from '@contexts/notificationContext';
import { uploadImage } from '@utils/cloudinary';
import { set } from 'cypress/types/lodash';

const ProductForm = () => {
  const { id } = useParams();
  const { produto, breadcrumbItems, setField, submitted } = useForm();
  const [genero, setGenero] = useState<keyof typeof GeneroProduto>('LIVRO');
  const { showNotification } = useNotification();
  const [images, setImages] = useState<{ url: string }[]>();


  useEffect(() => {
    if (id) {
      setProduct(id);
    }
  }, [id]);

  const setProduct = async (id: any) => {
    try {
      const product = await getById(id);
      setImages(product.fotos);
      (Object.keys(product) as Array<keyof Produto>).forEach((key) => {
              if (product[key as keyof Produto] !== undefined) {
          setField(key, product[key]);
        }
      });
    } catch (error) {
      console.error('Erro ao buscar produto', error);
    }
  };

  const handleConfirm = async () => {
    try {
        // @ts-ignore
        const uploadedImages = await uploadImages(produto.fotos || []);

        const formattedImages = uploadedImages.map((url) => ({ url }));

        produto.fotos = formattedImages;
        await updateProduct({ ...produto, fotos: formattedImages }, id);
        showNotification('success', 'Produto salvo com sucesso!', '');
    } catch (error) {
        console.error('Erro ao salvar produto', error);
    }
};

const uploadImages = async (files: File[]): Promise<string[]> => {
  try {
      const uploadedUrls: string[] = [];

      for (const file of files) {
          // Faz o upload do arquivo e adiciona a URL no array
          const uploadedUrl = await uploadImage(file);
          if (uploadedUrl) {
              uploadedUrls.push(uploadedUrl);
          }
      }

      return uploadedUrls;
  } catch (error) {
      console.error('Erro ao fazer upload de imagens', error);
      return [];
  }
};

  return (
    <main className="main-container-edit-product">
      <TemplatePage simpleFooter simpleHeader={false}>
        <ALBreadCrumb breadcrumbItems={breadcrumbItems} />

        <section className="section-content-body-form">
          <section className="content-items-product">
            <div className="conatiner-gallery-upload">
              <span className="span-image-product-name">Imagens do produto *</span>
              <Gallery photos={images}/>
              <UploadImages setField={setField} setImage={setImages}/>
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
                  fieldName={ProdutoFieldNames.autores}
                  fieldValue={produto.autores}
                  setField={setField}
                  hasSubmissionFailed={submitted} // tem que alterar isso. submitted ainda nao diz se a submissao falhou
                  placeholderText="Autor1, Autor2"
                  isTextArea
                  isOptional
                />

                <ProductFormField
                  labelText="Descrição"
                  fieldName={ProdutoFieldNames.descricao}
                  fieldValue={produto.descricao}
                  setField={setField}
                  hasSubmissionFailed={submitted} // tem que alterar isso. submitted ainda nao diz se a submissao falhou
                  placeholderText="Escreva uma descrição do produto"
                  isTextArea
                  isOptional
                />
              </div>

              <Button label="Salvar" className="button-save" onClick={handleConfirm}/>
            </div>
          </section>
        </section>
      </TemplatePage>
    </main>
  );
};

export default ProductForm;
