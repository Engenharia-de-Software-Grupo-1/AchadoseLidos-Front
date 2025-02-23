import FormField from '@components/FormField/formField';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';
import { Sebo } from '@domains/Sebo';
import { getEstados } from '@services/DadosEstaticosService';
import { useLoadCities } from '@hooks/useLoadCities';

interface TabEnderecoProps {
  sebo: Sebo;
  setField: (field: keyof Sebo, value: any) => void;
  getRule: (field: string) => {};
  cities: { value: string; text: string }[];
}

const TabEndereco: React.FC<TabEnderecoProps> = ({ sebo, setField, getRule, cities }) => {
  useLoadCities(sebo.endereco.estado);

  return (
    <div className="container-register-sebo">
      <div className="container-register">
        <div className="container-data">
          <FormField attribute="estado" rule={getRule('estado')} submitted={false}>
            <Dropdown
              value={sebo.endereco.estado}
              onChange={(e) => setField('endereco', { ...sebo.endereco, estado: e.target.value })}
              options={getEstados()}
              optionLabel="text"
              optionValue="value"
              showClear
              placeholder="Estado *"
            />
          </FormField>

          <FormField attribute="cidade" rule={getRule('cidade')} submitted={false}>
            <Dropdown
              value={sebo.endereco.cidade}
              onChange={(e) => setField('endereco', { ...sebo.endereco, cidade: e.target.value })}
              options={cities}
              optionLabel="text"
              optionValue="value"
              showClear
              placeholder="Cidade *"
            />
          </FormField>

          <FormField attribute="cep" rule={getRule('cep')} submitted={false}>
            <InputMask
              value={sebo.endereco.cep}
              mask="99999-999"
              onChange={(e) => setField('endereco', { ...sebo.endereco, cep: e.target.value })}
              placeholder="CEP *"
            />
          </FormField>

          <FormField attribute="rua" rule={getRule('rua')} submitted={false}>
            <InputText
              value={sebo.endereco.rua}
              onChange={(e) => setField('endereco', { ...sebo.endereco, rua: e.target.value })}
              placeholder="Rua *"
            />
          </FormField>

          <FormField attribute="bairro" rule={getRule('bairro')} submitted={false}>
            <InputText
              value={sebo.endereco.bairro}
              onChange={(e) => setField('endereco', { ...sebo.endereco, bairro: e.target.value })}
              placeholder="Bairro *"
            />
          </FormField>

          <FormField attribute="numero" rule={getRule('numero')} submitted={false}>
            <InputText
              value={sebo.endereco.numero}
              onChange={(e) => setField('endereco', { ...sebo.endereco, numero: e.target.value })}
              placeholder="Número *"
            />
          </FormField>

          <FormField attribute="complemento" rule={getRule('complemento')} submitted={false}>
            <InputText
              value={sebo.endereco.complemento}
              onChange={(e) => setField('endereco', { ...sebo.endereco, complemento: e.target.value })}
              placeholder="Complemento *"
            />
          </FormField>

          <div className="card flex align-items-center gap-4">
            <p className="text-sales">Esse endereo é público?</p>
            <Checkbox
              onChange={(e) => setField('endereco', { ...sebo.endereco, ehPublico: e.target.value })}
              checked={sebo.endereco.ehPublico}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabEndereco;
