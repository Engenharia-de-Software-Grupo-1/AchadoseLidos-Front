import { Link } from 'react-router-dom';
import './style.css';

interface ContainerItemsProps {
  title: string;
  children: React.ReactNode;
  backgroundBege: boolean;
  isFirst?: boolean;
  idSebo?: number;
}

const ContainerItems = ({ title, children, backgroundBege, isFirst, idSebo }: ContainerItemsProps) => {
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
            <Link
              to={
                title === 'Sebos'
                  ? '/navigation/sebos'
                  : title === 'Todos os produtos' || title === 'Livros'
                    ? `/navigation/${idSebo ? `meus-produtos/${idSebo}` : 'products'}`
                    : `/profile/sebo/${idSebo}`
              }
              className="link-conatiner-items"
            >
              {title} {'>'}
            </Link>
          </span>
        </div>
      </div>

      <div className={getClassName('space-carousel')}>{children}</div>
    </>
  );
};

export default ContainerItems;
