import { useLocation } from 'react-router-dom';

export const useBreadcrumb = () => {
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbItems = pathnames.map((value, index) => {
    const to = `/${pathnames.slice(0, index + 1).join('/')}`;

    return {
      label: value.charAt(0).toUpperCase() + value.slice(1),
      url: to,
    };
  });

  return breadcrumbItems;
};
