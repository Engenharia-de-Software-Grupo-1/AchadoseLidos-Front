import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import './style.css';

interface DialogModalProps {
    visibleDialog: boolean;
    setVisibleDialog: (visible: boolean) => void;
    onClickDelete: (sucessCallback?: () => void) => void;
}

export default function DialogModal({ visibleDialog, setVisibleDialog, onClickDelete }: DialogModalProps) {
    const footerContent = (
        <div>
            <Button label="Cancel" onClick={() => setVisibleDialog(false)} className="p-button-text button-cancel-dialog" />
            <Button label="OK" onClick={() => onClickDelete()} className='button-confirm-dialog'/>
        </div>
    );

  return (
    <div className="card flex justify-content-center">
      <Dialog
        header="Está certo disso?"
        visible={visibleDialog}
        style={{ width: '50vw' }}
        onHide={() => {
          if (!visibleDialog) return;
          setVisibleDialog(false);
        }}
        footer={footerContent}
      >
        <div className="container-dialog-text">
          <i className="pi pi-exclamation-triangle" style={{ color: '#DB9146' }}></i>
          <p className="m-0 paragraph-modal">
            Você tem certeza que deseja excluir sua conta? Todos os seus dados serão apagados.
          </p>
        </div>
      </Dialog>
    </div>
  );
}
