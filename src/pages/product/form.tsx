import TemplatePage from "@pages/templatePage";
import { useForm } from "./useForm";
import './style.css'
import ALBreadCrumb from "@components/ALBreadCrumb/breadCrumb";
import Gallery from "@components/Gallery/gallery";
import UploadImages from "@components/UploadImages/uploadImages";
import { ProductFormField } from "@components/ProductDetails/ProductFormFields";
import { FieldNamesProduct } from "@domains/FieldNamesProduct";

const ProductForm = () => {

    const {
        product,
        breadcrumbItems,
        getRule,
        setField,
        setSubmitted,
        submitted,
        validateStep,
        imageProduct,
    } = useForm();


    return (

        <main className="main-container-edit-product">
            <TemplatePage simpleFooter simpleHeader={false}>
                <ALBreadCrumb breadcrumbItems={breadcrumbItems} />
                <section className="section-content-body-form">
                    <section className="content-items-product">

                        <div className="conatiner-gallery-upload">
                            <span className="span-image-product-name">Imagens do produto *</span>
                            <Gallery />
                            <UploadImages />
                        </div>

                        <div className="content-form-edit-product">
                            <ProductFormField
                                labelText="Nome do produto"
                                fieldName={FieldNamesProduct.nome}
                                fieldValue={product.nome}
                                setField={setField}
                                hasSubmissionFailed={submitted} // tem que alterar isso. submitted ainda nao diz se a submissao falhou
                                placeholderText="Nome do Produto"
                            />
                        <div className="content-price-form">
                            <ProductFormField
                                labelText="Preco"
                                fieldName={FieldNamesProduct.preco}
                                fieldValueNumber={product.preco}
                                setField={setField}
                                hasSubmissionFailed={submitted} // tem que alterar isso. submitted ainda nao diz se a submissao falhou
                                placeholderText="0,00"
                                isPrice
                                isShortInput
                            />
                            <ProductFormField
                                labelText="Preco"
                                fieldName={FieldNamesProduct.preco}
                                fieldValueNumber={product.preco}
                                setField={setField}
                                hasSubmissionFailed={submitted} // tem que alterar isso. submitted ainda nao diz se a submissao falhou
                                placeholderText="0,00"
                                isPrice
                                isShortInput
                            />
                    
                        </div>



                        </div>

                    </section>
                </section>
            </TemplatePage>
        </main>

    )
}


export default ProductForm