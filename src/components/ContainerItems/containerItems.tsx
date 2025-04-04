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

  const getNavigationLink = () => {
    if (title === 'Sebos') return '/navigation/sebos';
    if (title === 'Todos os produtos' || 'Livros') return `/navigation/${idSebo ? `meus-produtos/${idSebo}` : 'products'}`;
    return `/profile/sebo/${idSebo}`;
  };

  return (
    <>
      <div className={getClassName('container-carousel', isFirst)}>
        <div className={getClassName('content-title')}>
          <span className={getClassName('title-carousel')}>
            <Link
              to={getNavigationLink()}
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
