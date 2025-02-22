import Menu from '@components/Header/header';
import "./style.css"

interface TemplatePageProps {
  children: React.ReactNode;
  simpleHeader: boolean;
  simpleFooter: boolean;
}

const TemplatePage: React.FC<TemplatePageProps> = ({ children, simpleHeader, simpleFooter }) => {
  const footer = simpleFooter ? (
    <footer className="container-footer" />
  ) : (
    <footer className="initial-footer">
      <p className="text-footer">ACHADOS E LIDOS</p>
    </footer>
  );

  return (
    <div style={{ height: '100%' }}>
      <Menu simpleHeader={simpleHeader} />
      {children}
      {footer}
    </div>
  );
};

export default TemplatePage;
