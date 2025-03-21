import FormField from '@components/FormField/formField';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Sebo } from '@domains/Sebo';
import ProfilePhoto from '@components/ProfilePhoto/profilePhoto';

interface TabDadosPerfilProps {
  sebo: Sebo;
  setField: (field: string, value: any) => void;
}

const TabDadosPerfil: React.FC<TabDadosPerfilProps> = ({ sebo, setField }) => {
  return (
    <div className="container-register-sebo">
      <div className="container-register">
        <div className="container-data">
          <ProfilePhoto canUpload imageProfile="" />
          <FormField attribute="biografia">
            <InputTextarea
              value={sebo.biografia}
              onChange={(e) => setField('biografia', e.target.value)}
              placeholder="Biografia"
              rows={5}
              cols={30}
            />
          </FormField>

          <FormField attribute="instagram">
            <InputText
              value={sebo.instagram}
              onChange={(e) => setField('instagram', e.target.value)}
              placeholder="Instagram"
            />
          </FormField>

          <FormField attribute="estanteVirtual">
            <InputText
              value={sebo.estanteVirtual}
              onChange={(e) => setField('estanteVirtual', e.target.value)}
              placeholder="Estante Virtual"
            />
          </FormField>

          <FormField attribute="curadores">
            <InputText
              value={sebo.curadores}
              onChange={(e) => setField('curadores', e.target.value)}
              placeholder="Curadores (separados por vírgula)"
            />
          </FormField>
        </div>
      </div>
    </div>
  );
};

export default TabDadosPerfil;
