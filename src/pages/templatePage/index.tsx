import Menu from '@components/Header/header';
import './style.css';
import React from 'react';

interface TemplatePageProps {
  children: React.ReactNode
  simpleHeader: boolean
  simpleFooter: boolean
  backgroundFooterDiff?: boolean
  contents?: boolean
}

const TemplatePage: React.FC<TemplatePageProps> = ({
  children,
  simpleHeader,
  simpleFooter,
  backgroundFooterDiff,
  contents = false,
}) => {
  const footer = simpleFooter ? (
    <footer className="container-footer" />
  ) : (
    <footer className={`initial-footer ${backgroundFooterDiff ? 'backgroundDiff' : ''}`}>
      <p className="text-footer">ACHADOS E LIDOS</p>
    </footer>
  );

  const style: React.CSSProperties = contents
    ? { height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column' }
    : { height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column' };

  return (
    <div style={style}>
      <Menu simpleHeader={simpleHeader} />
      {children}
      {footer}
    </div>
  );
};

export default TemplatePage;
