import { Carousel } from 'primereact/carousel';
import './style.css';
import { Foto } from '@domains/Foto';

interface BannerProps {
  images: Foto[] | string[]
  showIndicators: boolean
}

export default function Banner({ images, showIndicators }: BannerProps) {
  const responsiveOptions = [{ breakpoint: '1400px', numVisible: 1, numScroll: 1 }];

  const imageTemplate = (image: Foto | string) => (
    <div className="carousel-item">
      <img src={typeof image === 'string' ? image : image?.url} alt="Banner" className="carousel-image" />
    </div>
  );

  return (
    <div className="carousel-container">
      <Carousel
        value={images}
        numVisible={1}
        numScroll={1}
        responsiveOptions={responsiveOptions}
        className="custom-carousel"
        circular
        autoplayInterval={3000}
        itemTemplate={imageTemplate}
        showIndicators={showIndicators}
      />
    </div>
  );
}
