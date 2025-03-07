import { useState } from 'react';
import { Galleria } from 'primereact/galleria';
import './style.css';

export default function Gallery() {
  const [images] = useState([
    { itemImageSrc: '/images/anarita.JPG', thumbnailImageSrc: '/images/anarita.JPG', alt: 'Imagem 1' },
  ]);

  const itemTemplate = (item: any) => {
    return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
  };

  const thumbnailTemplate = (item: any) => {
    return <img src={item.thumbnailImageSrc} alt={item.alt} style={{ display: 'block' }} />;
  };

  return (
    <div className="card-galleria">
      <Galleria
        value={images}
        numVisible={5}
        circular
        style={{ maxWidth: '640px', width: '100%', height: '400px' }}
        showThumbnails={false}
        showItemNavigators
        item={itemTemplate}
        thumbnail={thumbnailTemplate}
      />
    </div>
  );
}
