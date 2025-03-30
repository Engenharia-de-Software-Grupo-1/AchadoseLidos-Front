import FormField from '@components/FormField/formField';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Usuario } from '@domains/Usuario';
import ProfilePhoto from '@components/ProfilePhoto/profilePhoto';

interface TabDadosPerfilProps {
  user: Usuario;
  setField: (field: string, value: any) => void;
}

const TabDadosPerfil: React.FC<TabDadosPerfilProps> = ({ user, setField }) => {
  return (
    <div className="container-register-user">
      <div className="container-register">
        <div className="container-data">
          <ProfilePhoto canUpload imageProfile={user.fotoPerfil || ''} setField={setField} />
          <FormField attribute="biografia">
            <InputTextarea
              value={user.biografia}
              onChange={(e) => setField('biografia', e.target.value)}
              placeholder="Biografia"
              rows={5}
              cols={30}
            />
          </FormField>

          <FormField attribute="instagram">
            <InputText
              value={user.instagram}
              onChange={(e) => setField('instagram', e.target.value)}
              placeholder="Instagram"
            />
          </FormField>

          <FormField attribute="twitter">
            <InputText
              value={user.twitter}
              onChange={(e) => setField('twitter', e.target.value)}
              placeholder="Twitter"
            />
          </FormField>

          <FormField attribute="skoob">
            <InputText value={user.skoob} onChange={(e) => setField('skoob', e.target.value)} placeholder="Skoob" />
          </FormField>

          <FormField attribute="goodreads">
            <InputText
              value={user.goodreads}
              onChange={(e) => setField('goodreads', e.target.value)}
              placeholder="Goodreads"
            />
          </FormField>
        </div>
      </div>
    </div>
  );
};

export default TabDadosPerfil;
