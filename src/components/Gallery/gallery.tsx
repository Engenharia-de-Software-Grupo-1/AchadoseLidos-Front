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
    if (!urlImages || urlImages.length === 0) {
      return [
        {
          itemImageSrc: '',
          thumbnailImageSrc: '',
          alt: 'Nenhuma imagem disponível',
          empty: true,
        },
      ];
    }

    return urlImages
      .filter((url) => url?.url)
      .map((url) => ({
        itemImageSrc: url.url,
        thumbnailImageSrc: url.url,
        alt: 'Imagem',
      }));
  };

  const emptyTemplate = () => {
    return (
      <div className="flex align-items-center flex-column">
        <i
          className="pi pi-image mt-3 p-5"
          style={{
            fontSize: '5em',
            borderRadius: '50%',
            color: 'var(--surface-d)',
          }}
        ></i>
      </div>
    );
  };

  const itemTemplate = (item: any) =>
    item.itemImageSrc ? (
      <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', display: 'block' }} />
    ) : (
      emptyTemplate()
    );

  const thumbnailTemplate = (item: any) =>
    item.thumbnailImageSrc ? (
      <img src={item.thumbnailImageSrc} alt={item.alt} style={{ display: 'block' }} />
    ) : (
      emptyTemplate()
    );

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