import Menu from '@components/Header/header';
import './style.css';

interface TemplatePageProps {
  children: React.ReactNode;
  simpleHeader: boolean;
  simpleFooter: boolean;
  backgroundFooterDiff?: boolean;
}

const TemplatePage: React.FC<TemplatePageProps> = ({ children, simpleHeader, simpleFooter, backgroundFooterDiff }) => {
  const footer = simpleFooter ? (
    <footer className="container-footer" />
  ) : (
    <footer className={`initial-footer ${backgroundFooterDiff ? 'backgroundDiff' : ''}`}>
      <p className="text-footer">ACHADOS E LIDOS</p>
    </footer>
  );

  return (
    <div style={{ height: '100%', display: 'contents' }}>
      <Menu simpleHeader={simpleHeader} />
      {children}
      {footer}
    </div>
  );
};

export default TemplatePage;
