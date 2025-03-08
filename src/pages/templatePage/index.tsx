import Menu from '@components/Header/header';
import './style.css';

interface TemplatePageProps {
  children: React.ReactNode;
  simpleHeader: boolean;
  simpleFooter: boolean;
  backgroundFooterDiff?: boolean;
  contents?: boolean;
}

const TemplatePage: React.FC<TemplatePageProps> = ({ children, simpleHeader, simpleFooter, backgroundFooterDiff, contents=false }) => {
  const footer = simpleFooter ? (
    <footer className="container-footer" />
  ) : (
    <footer className={`initial-footer ${backgroundFooterDiff ? 'backgroundDiff' : ''}`}>
      <p className="text-footer">ACHADOS E LIDOS</p>
    </footer>
  );

  const style = contents ? { height: '100%', display: 'contents' } : { height: '100%'};

  return (
    <div style={style}>
      <Menu simpleHeader={simpleHeader} />
      {children}
      {footer}
    </div>
  );
};

export default TemplatePage;
