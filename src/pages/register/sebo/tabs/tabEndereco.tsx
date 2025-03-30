import FormField from '@components/FormField/formField';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Sebo } from '@domains/Sebo';
import { useLoadCities } from '@hooks/useLoadCities';

interface TabEnderecoProps {
  sebo: Sebo;
  setField: (field: string, value: any) => void;
  cities: { value: string; text: string }[];
}

const TabEndereco: React.FC<TabEnderecoProps> = ({ sebo, setField, cities }) => {
  useLoadCities();

  return (
    <div className="container-register-sebo">
      <div className="container-register">
        <div className="container-data">
          <FormField attribute="estado">
            <InputText value="Paraíba" disabled placeholder="Estado *" style={{ width: '400px' }} />
          </FormField>

          <FormField attribute="cidade">
            <Dropdown
              value={sebo.endereco.cidade}
              onChange={(e) => setField('endereco.cidade', e.target.value)}
              options={cities}
              optionLabel="text"
              optionValue="value"
              showClear
              placeholder="Cidade *"
              style={{ width: '400px' }}
            />
          </FormField>

          <FormField attribute="cep">
            <InputText
              value={sebo.endereco.cep}
              maxLength={8}
              keyfilter="int"
              onChange={(e) => setField('endereco.cep', e.target.value?.replace(/\D/g, ''))}
              placeholder="CEP *"
            />
          </FormField>

          <FormField attribute="rua">
            <InputText
              value={sebo.endereco.rua}
              onChange={(e) => setField('endereco.rua', e.target.value)}
              placeholder="Rua *"
            />
          </FormField>

          <FormField attribute="bairro">
            <InputText
              value={sebo.endereco.bairro}
              onChange={(e) => setField('endereco.bairro', e.target.value)}
              placeholder="Bairro *"
            />
          </FormField>

          <FormField attribute="numero">
            <InputText
              value={sebo.endereco.numero}
              onChange={(e) => setField('endereco.numero', e.target.value)}
              placeholder="Número *"
            />
          </FormField>

          <FormField attribute="complemento">
            <InputText
              value={sebo.endereco.complemento}
              onChange={(e) => setField('endereco.complemento', e.target.value)}
              placeholder="Complemento"
            />
          </FormField>

          <div className="card flex align-items-center gap-4">
            <p className="text-sales">Esse endereço é público?</p>
            <Checkbox onChange={(e) => setField('endereco.ehPublico', e.checked)} checked={sebo.endereco.ehPublico} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabEndereco;
