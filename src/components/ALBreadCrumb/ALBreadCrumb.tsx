import { BreadCrumb } from 'primereact/breadcrumb';
import './style.css';

interface BreadcrumbItem {
  label: string;
  url: string;
}

interface ALBreadCrumbComponentProps {
  breadcrumbItems: BreadcrumbItem[];
  background?: string;
}

const ALBreadCrumb: React.FC<ALBreadCrumbComponentProps> = ({ breadcrumbItems, background }) => {
  return (
    <div className="breadcrumb-edit" style={{ background: background ?? '' }}>
      <BreadCrumb
        model={[...breadcrumbItems].map((item) => ({
          label: item.label,
          url: item.url,
        }))}
        home={{ icon: 'pi pi-home', url: '/' }}
        style={{ justifyContent: 'flex-start', marginLeft: '1rem' }}
      />
    </div>
  );
};

export default ALBreadCrumb;
