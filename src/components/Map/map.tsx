import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Endereco } from '@domains/Endereco';

interface MyMapProps {
  endereco?: Endereco;
}

const DEFAULT_POSITION: [number, number] = [-7.2290752, -35.8808337];

const MyMap: React.FC<MyMapProps> = ({ endereco }) => {
  const [position, setPosition] = useState<[number, number]>(DEFAULT_POSITION);

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (endereco && endereco.ehPublico) {
        const url = `https://nominatim.openstreetmap.org/search?street=${endereco.rua}&city=${endereco.cidade}&state=${endereco.estado}&country=Brasil&format=json`;

        try {
          const response = await fetch(url);
          const data = await response.json();

          if (data.length > 0) {
            setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
          }
        } catch (error) {
          console.error('Erro ao obter coordenadas:', error);
        }
      }
    };

    fetchCoordinates();
  }, [endereco]);

  return (
    <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position} />
    </MapContainer>
  );
};

export default MyMap;
