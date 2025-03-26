import { useEffect, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import {
  FileUpload,
  FileUploadHeaderTemplateOptions,
  FileUploadSelectEvent,
  ItemTemplateOptions,
} from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import './style.css';

interface UploadProps {
  setField?: (field: string, value: File[]) => void;
  setImage?: (images: { url: string }[]) => void;
  image?: { url: string }[];
}

export default function UploadImages({ setField, setImage, image }: UploadProps) {
  const toast = useRef<Toast>(null);
  const [totalSize, setTotalSize] = useState(0);
  const [imagens, setImagens] = useState<File[]>([]);
  const fileUploadRef = useRef<FileUpload>(null);
  const [nameImages, setNameImages] = useState<string[]>([]);
  const [namesImagesProcessed, setNamesImagesProcessed] = useState<File[]>([]);

  const loadedImages = useRef(new Set<string>());

  const loadExistingImages = async () => {
    if (!fileUploadRef.current || !image?.length) return;

    interface Image {
      url: string;
    }

    const imageFiles: File[] = await Promise.all(
      image.map(async (img: Image, index: number): Promise<File> => {
        if (loadedImages.current.has(img.url)) return null as unknown as File;

        const response = await fetch(img.url);
        const blob = await response.blob();
        const file = new File([blob], `imagem-${index}.jpg`, { type: blob.type });

        loadedImages.current.add(img.url);
        return file;
      })
    );

    const validImageFiles = imageFiles.filter((file) => file);
    setNamesImagesProcessed(validImageFiles);

    if (validImageFiles.length > 0) {
      setNameImages(validImageFiles.map((file) => file.name));
      //@ts-ignore
      fileUploadRef.current.setFiles(validImageFiles);
    }
  };

  useEffect(() => {
    loadExistingImages();
  }, [image]);

  const handleUpload = (event: FileUploadSelectEvent) => {
    let _totalSize = totalSize;
    const uploadedFiles = event.files.map((file) => {
      _totalSize += file.size || 0;
      return file;
    });

    setTotalSize(_totalSize);

    setImagens(uploadedFiles); // Substitui todas as imagens antigas pelas novas
    setImage?.(uploadedFiles.map((file) => ({ url: URL.createObjectURL(file) })));
    setField?.('fotos', uploadedFiles);
  };

  const onTemplateRemove = (file: File, callback: Function) => {
    setTotalSize((prevSize) => prevSize - file.size);

    setNamesImagesProcessed((prev) => {
      const updatedNamesImagesProcessed = prev.filter((image) => image.name !== file.name);
      setImage?.(updatedNamesImagesProcessed.map((file) => ({ url: URL.createObjectURL(file) })));
      setField?.('fotos', updatedNamesImagesProcessed);
      return updatedNamesImagesProcessed;
    });

    callback();
  };

  const onTemplateClear = () => {
    setTotalSize(0);
    setImagens([]);
    setNamesImagesProcessed([]);
    setImage?.([]);
    setField?.('fotos', []);
  };

  console.log('imagens', image);

  const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
    const { className, chooseButton, cancelButton } = options;

    return (
      <div
        className={className}
        style={{
          backgroundColor: 'rgba(207, 179, 88, 0.30)',
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid rgba(47, 41, 42, 0.50)',
        }}
      >
        {chooseButton}
        {cancelButton}
      </div>
    );
  };

  const itemTemplate = (inFile: object, props: ItemTemplateOptions) => {
    const file = inFile as File;
    return (
      <div className="flex align-items-center flex-wrap">
        <div className="flex align-items-center" style={{ width: '40%' }}>
          <img alt={file.name} role="presentation" src={URL.createObjectURL(file)} width={100} />
          <span className="flex flex-column text-left ml-3">Imagem do produto</span>
        </div>
        <Button
          icon="pi pi-times-circle"
          className="buttom-icon-x"
          onClick={() => onTemplateRemove(file, props.onRemove)}
        />
      </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <div className="flex align-items-center flex-column">
        <i
          className="pi pi-image mt-3 p-5"
          style={{
            fontSize: '5em',
            borderRadius: '50%',
            backgroundColor: 'var(--surface-b)',
            color: 'var(--surface-d)',
          }}
        ></i>
      </div>
    );
  };

  const chooseOptions = {
    icon: 'pi pi-fw pi-plus',
    iconOnly: true,
    className: 'custom-choose-btn p-button-rounded p-button-outlined buttom-upload-plus',
  };

  const cancelOptions = {
    icon: 'pi pi-fw pi-times-circle',
    iconOnly: true,
    className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined buttom-upload-plus',
  };

  return (
    <div className="fileupload-demo">
      <Toast ref={toast}></Toast>

      <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
      <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

      <FileUpload
        ref={fileUploadRef}
        name="demo[]"
        multiple
        accept="image/*"
        maxFileSize={10000000000000}
        onSelect={handleUpload}
        onError={onTemplateClear}
        onClear={onTemplateClear}
        headerTemplate={headerTemplate}
        itemTemplate={itemTemplate}
        emptyTemplate={emptyTemplate}
        chooseOptions={chooseOptions}
        cancelOptions={cancelOptions}
      />
    </div>
  );
}
