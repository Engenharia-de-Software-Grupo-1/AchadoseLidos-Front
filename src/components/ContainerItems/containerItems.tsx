import './style.css';

interface ContainerItemsProps {
  title: string;
  children: React.ReactNode;
  backgroundBege: boolean;
}

const ContainerItems = ({ title, children, backgroundBege }: ContainerItemsProps) => {
  const getClassName = (classNameBase: string) => {
    if (backgroundBege) return classNameBase + '-event';
    return classNameBase + '-items';
  };

  return (
    <>
      <div className={getClassName('container-carousel')}>
        <div className={getClassName('content-title')}>
          <span className={getClassName('title-carousel-event')}>
            {title} {'>'}
          </span>
        </div>
      </div>

      <div className={getClassName('space-carousel')}>{children}</div>
    </>
  );
};

export default ContainerItems;
