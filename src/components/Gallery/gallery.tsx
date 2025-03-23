import { useEffect, useState } from 'react';
import { Galleria } from 'primereact/galleria';
import './style.css';

interface GalleryProps {
  position?: string;
  photos?: { url: string }[];
}

export default function Gallery({ position, photos }: GalleryProps) {
  const [images] = useState([
    {
      itemImageSrc:
        'https://fastprint.com.br/wp-content/uploads/2023/06/Detalhe-prod-LivrosDigitalizacaoExpressa-full2x-1010x718-1.jpg.webp',
      thumbnailImageSrc:
        'https://fastprint.com.br/wp-content/uploads/2023/06/Detalhe-prod-LivrosDigitalizacaoExpressa-full2x-1010x718-1.jpg.webp',
      alt: 'Imagem 1',
    },
  ]);

  const returnImages = (urlImages: { url: string }[]) => {
    return urlImages
      .filter((url) => url?.url) // Garante que apenas imagens válidas sejam retornadas
      .map((url) => ({
        itemImageSrc: url.url,
        thumbnailImageSrc: url.url,
        alt: 'Imagem 1',
      }));
  };

  const itemTemplate = (item: any) => {
    return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
  };

  const thumbnailTemplate = (item: any) => {
    return <img src={item.thumbnailImageSrc} alt={item.alt} style={{ display: 'block' }} />;
  };

  return (
    <div className={`card-galleria ${position}`}>
      <Galleria
        value={photos ? returnImages(photos) : images}
        numVisible={photos?.length || 1}
        circular
        style={{ width: '100%', height: '400px' }}
        showThumbnails={false}
        showItemNavigators
        item={itemTemplate}
        thumbnail={thumbnailTemplate}
      />
    </div>
  );
}
