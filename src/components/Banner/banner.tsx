import { Carousel } from "primereact/carousel";

interface BannerProps {
  images: string[];
}

export default function Banner({ images }: BannerProps) {
  const responsiveOptions = [
    { breakpoint: "1400px", numVisible: 1, numScroll: 1 },
  ];

  const imageTemplate = (imageUrl: string) => (
    <div className="carousel-item">
      <img src={imageUrl} alt="Banner" className="carousel-image" />
    </div>
  );

  return (
      <Carousel
        value={images}
        numVisible={1}
        numScroll={1}
        responsiveOptions={responsiveOptions}
        className="custom-carousel"
        circular
        autoplayInterval={3000}
        itemTemplate={imageTemplate}
      />
  );
}
