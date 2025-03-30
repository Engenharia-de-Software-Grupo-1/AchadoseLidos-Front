import { Carousel } from 'primereact/carousel';
import './style.css';

interface BannerProps {
  images?: string[];
  showIndicators: boolean;
}

const DEFAULT_BANNER = '/images/banner.jpg';

export default function Banner({ images = [], showIndicators }: BannerProps) {
  const responsiveOptions = [{ breakpoint: '1400px', numVisible: 1, numScroll: 1 }];

  const imagesToShow = images.length > 0 ? images : [DEFAULT_BANNER];

  const imageTemplate = (image: string) => (
    <div className="carousel-item">
      <img src={image} alt="Banner" className="carousel-image" />
    </div>
  );

  return (
    <div className="carousel-container">
      <Carousel
        value={imagesToShow}
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
