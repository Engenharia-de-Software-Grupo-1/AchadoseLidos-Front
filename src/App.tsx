import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@pages/homePage';
import RegisterSebo from '@pages/register/sebo';
import { RegisterSeboProvider } from '@stores/register/sebo/store';
import { NotificationProvider } from '@contexts/notificationContext';
import ProfileSebo from '@pages/profile/sebo';
import ProfileSeboForm from '@pages/profile/sebo/form';
import { ProfileSeboFormProvider } from '@stores/profile/sebo/formStore';
import { ErrorProvider } from '@contexts/errorContext';
import ProductPage from '@pages/product/index';
import { ProdutoFormProvider } from '@stores/product/formStore';
import ProductForm from '@pages/product/form';
import { NavigationPage } from '@pages/navigation/index';

const App = () => {
  return (
    <ErrorProvider>
      <BrowserRouter>
        <NotificationProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/*<Route path="/register" element={<Register />} />  path pra tela inicial de cadastro*/}
            <Route
              path="/register/sebo"
              element={
                <RegisterSeboProvider>
                  <RegisterSebo />
                </RegisterSeboProvider>
              }
            />
            <Route path="/profile/sebo" element={<ProfileSebo id={0} />} />
            <Route
              path="/profile/sebo/edit"
              element={
                <ProfileSeboFormProvider>
                  <ProfileSeboForm />
                </ProfileSeboFormProvider>
              }
            />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route
              path="/product/edit"
              element={
                <ProdutoFormProvider>
                  <ProductForm />
                </ProdutoFormProvider>
              }
            />
            <Route
               path="/navigation"
               element={
                 <NavigationPage
                   filters={[]}
                   orders={[
                     { field: 'name', order: 'ASC' },
                     { field: 'price', order: 'ASC' },
                     { field: 'createdAt', order: 'DESC' },
                   ]}
                 />
               }
             />
          </Routes>
        </NotificationProvider>
      </BrowserRouter>
    </ErrorProvider>
  );
};

export default App;
