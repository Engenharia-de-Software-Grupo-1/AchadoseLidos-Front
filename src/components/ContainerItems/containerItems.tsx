import './style.css';

interface ContainerItemsProps {
  title: string;
  children: React.ReactNode;
  backgroundBege: boolean;
  isFirst?: boolean;
}

const ContainerItems = ({ title, children, backgroundBege, isFirst }: ContainerItemsProps) => {
  const getClassName = (classNameBase: string, isFirst?: boolean) => {
    return backgroundBege
      ? classNameBase + '-event'
      : isFirst
        ? classNameBase + '-items-first'
        : classNameBase + '-items';
  };

  return (
    <>
      <div className={getClassName('container-carousel', isFirst)}>
        <div className={getClassName('content-title')}>
          <span className={getClassName('title-carousel')}>
            {title} {'>'}
          </span>
        </div>
      </div>

      <div className={getClassName('space-carousel')}>{children}</div>
    </>
  );
};

export default ContainerItems;
