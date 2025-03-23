import { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import {
  FileUpload,
  FileUploadHeaderTemplateOptions,
  FileUploadSelectEvent,
  FileUploadUploadEvent,
  ItemTemplateOptions,
} from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import './style.css';
import { set } from 'cypress/types/lodash';

interface UploadProps {
  setField?: (field: string, value: File[]) => void;
  setImage?: (images: {url: string}[]) => void;
}

export default function UploadImages({ setField, setImage }: UploadProps) {
  const toast = useRef<Toast>(null);
  const [totalSize, setTotalSize] = useState(0);
  const [imagens, setImagens] = useState<File[]>([]);
  const fileUploadRef = useRef<FileUpload>(null);

  const onTemplateSelect = (e: FileUploadSelectEvent) => {
    let _totalSize = totalSize;
    let files = e.files;

    for (let i = 0; i < files.length; i++) {
      _totalSize += files[i].size || 0;
    }

    setTotalSize(_totalSize);
  };

  const handleUpload = (event: FileUploadSelectEvent) => {
    let _totalSize = totalSize;
    const uploadedFiles = event.files.map((file) => {
        _totalSize += file.size || 0;
        return file; 
    });

    setTotalSize(_totalSize);

    // Usa callback para evitar estado desatualizado
    setImagens((prev) => {
        const newImagens = [...prev, ...uploadedFiles];
        setField?.('fotos', newImagens);
        return newImagens;
    });

    // @ts-ignore
    setImage?.((prev) => [
      ...prev,
      ...uploadedFiles.map((file) => ({ url: URL.createObjectURL(file) })) 
  ]);
};

  const onTemplateUpload = (e: FileUploadUploadEvent) => {
    let _totalSize = 0;

    e.files.forEach((file) => {
      _totalSize += file.size || 0;
    });

    setTotalSize(_totalSize);
    toast.current?.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
  };

 

  const onTemplateRemove = (file: File, callback: Function) => {
    setTotalSize((prevSize) => prevSize - file.size);

    setImagens((prev) => {
        const newImagens = prev.filter((foto) => foto.name !== file.name); // Comparando pelo nome

        setField?.('fotos', newImagens);
        setImage?.(newImagens.map((f) => ({ url: URL.createObjectURL(f) })));

        return newImagens;
    });

    callback();
};
  const onTemplateClear = () => {
    setTotalSize(0);
  };

  const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    const value = totalSize / 10000;
    const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

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
        {uploadButton}
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
          <span className="flex flex-column text-left ml-3">{file.name}</span>
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
  const uploadOptions = {
    icon: 'pi pi-fw pi-upload',
    iconOnly: true,
    className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined buttom-upload-plus',
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
      <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
      <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

      <FileUpload
        ref={fileUploadRef}
        name="demo[]"
        url="/api/upload"
        multiple
        accept="image/*"
        maxFileSize={10000000000000}
        onUpload={onTemplateUpload}
        onSelect={handleUpload}
        onError={onTemplateClear}
        onClear={onTemplateClear}
        headerTemplate={headerTemplate}
        itemTemplate={itemTemplate}
        emptyTemplate={emptyTemplate}
        chooseOptions={chooseOptions}
        uploadOptions={uploadOptions}
        cancelOptions={cancelOptions}
      />
    </div>
  );
}
