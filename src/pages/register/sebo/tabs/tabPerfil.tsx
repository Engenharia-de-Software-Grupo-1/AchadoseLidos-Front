import FormField from '@components/FormField/formField';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Sebo } from '@domains/Sebo';

interface TabDadosPerfilProps {
  sebo: Sebo;
  setField: (field: keyof Sebo, value: any) => void;
  getRule: (field: string) => {};
}

// faltando foto de perfil
const TabDadosPerfil: React.FC<TabDadosPerfilProps> = ({ sebo, setField, getRule }) => {
  return (
    <div className="container-register-sebo">
      <div className="container-register">
        <div className="container-data">
          <FormField attribute="biografia" rule={getRule('biografia')} submitted={false}>
            <InputTextarea
              value={sebo.biografia}
              onChange={(e) => setField('biografia', e.target.value)}
              placeholder='Biografia'
              rows={5}
              cols={30}
            />
          </FormField>

          <FormField attribute="instagram" rule={getRule('instagram')} submitted={false}>
            <InputText
              value={sebo.instagram}
              onChange={(e) => setField('instagram', e.target.value)}
              placeholder="Instagram"
            />
          </FormField>

          <FormField attribute="estanteVirtual" rule={getRule('estanteVirtual')} submitted={false}>
            <InputText
              value={sebo.estanteVirtual}
              onChange={(e) => setField('estanteVirtual', e.target.value)}
              placeholder="Estante Virtual"
            />
          </FormField>

          <FormField attribute="curadores" rule={getRule('curadores')} submitted={false}>
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
