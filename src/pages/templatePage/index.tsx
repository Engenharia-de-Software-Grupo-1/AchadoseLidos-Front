import Menu from '@components/Header/header';
import './style.css'

interface TemplatePageProps {
  children: React.ReactNode;
  simpleHeader: boolean;
}

const TemplatePage: React.FC<TemplatePageProps> = ({ children, simpleHeader }) => {
  return (
    <div className='TemplatePage'>
      <Menu simpleHeader={simpleHeader} />
      {children}
    </div>
  );
};

export default TemplatePage;