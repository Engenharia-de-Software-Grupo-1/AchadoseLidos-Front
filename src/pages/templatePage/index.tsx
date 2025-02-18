import Menu from '@components/Header/header';

interface TemplatePageProps {
  children: React.ReactNode;
  simpleHeader: boolean;
}

const TemplatePage: React.FC<TemplatePageProps> = ({ children, simpleHeader }) => {
  return (
    <div style={{height: '100%'}}>
      <Menu simpleHeader={simpleHeader} />
      {children}
    </div>
  );
};

export default TemplatePage;