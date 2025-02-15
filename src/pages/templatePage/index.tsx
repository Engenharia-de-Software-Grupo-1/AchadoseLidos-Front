import Menu from '@components/Header/header';

interface TemplatePageProps {
  children: React.ReactNode;
  simpleHeader: boolean;
}

const TemplatePage: React.FC<TemplatePageProps> = ({ children, simpleHeader }) => {
  return (
    <div>
      <Menu simpleHeader={simpleHeader} />
      {children}
    </div>
  );
};

export default TemplatePage;