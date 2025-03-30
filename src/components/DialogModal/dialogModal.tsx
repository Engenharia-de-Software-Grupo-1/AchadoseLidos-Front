import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import './style.css';

interface DialogModalProps {
  visibleDialog: boolean;
  setVisibleDialog: (visible: boolean) => void;
  onClickDelete: (sucessCallback?: () => void) => void;
  message: string;
}

export default function DialogModal({ visibleDialog, setVisibleDialog, onClickDelete, message }: DialogModalProps) {
  const footerContent = (
    <div>
      <Button label="Cancel" onClick={() => setVisibleDialog(false)} className="p-button-text button-cancel-dialog" />
      <Button label="OK" onClick={() => onClickDelete()} className="button-confirm-dialog" />
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
          <p className="m-0 paragraph-modal">{message}</p>
        </div>
      </Dialog>
    </div>
  );
}
