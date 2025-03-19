import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@pages/homePage';
import RegisterSebo from '@pages/register/sebo';
import { RegisterSeboProvider } from '@stores/register/sebo/store';
import { NotificationProvider } from '@contexts/notificationContext';
import ProfileSebo from '@pages/profile/sebo';
import ProfileSeboForm from '@pages/profile/sebo/form';
import { ProfileSeboFormProvider } from '@stores/profile/sebo/formStore';
import { ErrorProvider } from '@contexts/errorContext';
import ProductPage from '@pages/product';
import { ProductFormProvider } from '@stores/product/formStore';
import ProductForm from '@pages/product/form';

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
            <Route path="/profile/sebo" element={<ProfileSebo />} />
            <Route
              path="/profile/sebo/edit"
              element={
                <ProfileSeboFormProvider>
                  <ProfileSeboForm />
                </ProfileSeboFormProvider>
              }
            />
            <Route path="/product" element={<ProductPage />} />
            <Route
              path="/product/edit"
              element={
                <ProductFormProvider>
                  <ProductForm />
                </ProductFormProvider>
              }
            />
          </Routes>
        </NotificationProvider>
      </BrowserRouter>
    </ErrorProvider>
  );
};

export default App;
