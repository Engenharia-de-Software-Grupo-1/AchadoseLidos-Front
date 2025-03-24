import { Galleria } from 'primereact/galleria';
import './style.css';

interface GalleryProps {
  images?: string[];
}

export default function Gallery({ images = [] }: GalleryProps) {
  const imagesList =
    images.length > 0
      ? images.map((img) => ({
          itemImageSrc: img,
          thumbnailImageSrc: img,
          alt: 'Imagem da Galeria',
        }))
      : [
          { itemImageSrc: '/images/cg.jpg', thumbnailImageSrc: '/images/cg.jpg', alt: 'Imagem Padrão' },
          { itemImageSrc: '/images/cg2.jpg', thumbnailImageSrc: '/images/cg2.jpg', alt: 'Imagem Padrão 2' },
        ];

  const itemTemplate = (item: any) => (
    <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', display: 'block' }} />
  );

  const thumbnailTemplate = (item: any) => (
    <img src={item.thumbnailImageSrc} alt={item.alt} style={{ display: 'block' }} />
  );

  return (
    <div className="card-galleria">
      <Galleria
        value={imagesList}
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
