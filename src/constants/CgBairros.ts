const bairros = [
  'Alto Branco',
  'Araxá',
  'Bairro das Nações',
  'Castelo Branco',
  'José Pinheiro',
  'Mirante',
  'Monte Castelo',
  'Nova Brasília',
  'Santo Antônio',
  'Acácio Figueiredo',
  'Bairro das Cidades',
  'Catolé',
  'Catolé de Zé Ferreira',
  'Cruzeiro',
  'Distrito Industrial',
  'Estação Velha',
  'Itararé',
  'Jardim Borborema',
  'Jardim Paulistano',
  'Jardim Tavares',
  'Jardim Quarenta',
  'Jardim Verdejante',
  'Liberdade',
  'Ligeiro',
  'Malvinas',
  'Monte Santo',
  'Novo Bodocongó',
  'Novo Cruzeiro',
  'Novo Horizonte',
  'Pedregal',
  'Prata',
  'Ramadinha',
  'Santa Cruz',
  'Santa Rosa',
  'Serrotão',
  'Sítio Lucas',
  'Sítio Estreito',
  'Universitário',
  'Distrito de Catolé',
  'Centro'
];

const formattedBairros = bairros
  .sort((a, b) => a.localeCompare(b))
  .map((bairro) => ({
    label: bairro,
    value: bairro
      .toLowerCase()
      .replace(/\s+/g, '-')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, ''),
  }));

export default formattedBairros;
