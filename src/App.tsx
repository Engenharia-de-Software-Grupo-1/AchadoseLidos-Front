import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@pages/homePage';
import RegisterSebo from '@pages/register/sebo';
import { RegisterSeboProvider } from '@stores/register/sebo/registerStore';
import { NotificationProvider } from '@contexts/notificationContext';
import ProfileSebo from '@pages/profile/sebo';
import ProfileSeboForm from '@pages/profile/sebo/form';
import { ProfileSeboFormProvider } from '@stores/profile/sebo/formStore';
import { ErrorProvider } from '@contexts/errorContext';
import ProductPage from '@pages/product/index';
import { ProdutoFormProvider } from '@stores/product/formStore';
import ProductForm from '@pages/product/form';
import LoginPage from '@pages/loginPage';
import { LoginProvider } from '@stores/login/loginStore';
import { RecoverRequestProvider } from '@stores/recover/recoverStore';
import RecoverRequestPage from '@pages/recover/request';
import { ResetRequestProvider } from '@stores/recover/resetStore';
import ResetRequestPage from '@pages/recover/reset';
import RegisterUser from '@pages/register/user';
import { RegisterUserProvider } from '@stores/register/user/store';
import RegistrationPage from '@pages/registrationPage';
import ProfileUser from '@pages/profile/user';
import ProfileUserForm from '@pages/profile/user/form';
import { ProfileUserFormProvider } from '@stores/profile/user/formStore';
import { AuthProvider } from '@contexts/authContext';
import { SeboProvider } from '@stores/profile/sebo/indexStore';
import FavoritosPage from '@pages/favoritosPage';
import { FavoritoProvider } from '@stores/favorito/favoritoStore';
import CestaPage from '@pages/cestaPage';
import { CestaProvider } from '@stores/cesta/cestaStore';

const App = () => {
  return (
    <ErrorProvider>
      <BrowserRouter>
        <NotificationProvider>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route
                path="/register/sebo"
                element={
                  <RegisterSeboProvider>
                    <RegisterSebo />
                  </RegisterSeboProvider>
                }
              />
              <Route
                path="/register/user"
                element={
                  <RegisterUserProvider>
                    <RegisterUser />
                  </RegisterUserProvider>
                }
              />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route
                path="/product/:id/edit"
                element={
                  <ProdutoFormProvider>
                    <ProductForm />
                  </ProdutoFormProvider>
                }
              />
              <Route
                path="/register/product"
                element={
                  <ProdutoFormProvider>
                    <ProductForm isRegister />
                  </ProdutoFormProvider>
                }
              />

              <Route
                path="/login"
                element={
                  <LoginProvider>
                    <LoginPage />
                  </LoginProvider>
                }
              />
              <Route
                path="/recover/request"
                element={
                  <RecoverRequestProvider>
                    <RecoverRequestPage />
                  </RecoverRequestProvider>
                }
              />
              <Route
                path="/recover/reset"
                element={
                  <ResetRequestProvider>
                    <ResetRequestPage />
                  </ResetRequestProvider>
                }
              />

              <Route
              path="/profile/user/cesta"
              element={
                <CestaProvider>
                  <CestaPage/>
                </CestaProvider>
              }/>
              
              <Route path="/profile/user/:id?" element={<ProfileUser />} />
              <Route
                path="/profile/user/edit"
                element={
                  <ProfileUserFormProvider>
                    <ProfileUserForm />
                  </ProfileUserFormProvider>
                }
              />
              <Route
                path="/profile/sebo"
                element={
                  <SeboProvider>
                    <ProfileSebo id={1} />
                  </SeboProvider>
                }
              />
              <Route
                path="/profile/sebo/edit"
                element={
                  <ProfileSeboFormProvider>
                    <ProfileSeboForm />
                  </ProfileSeboFormProvider>
                }
              />
              <Route path="/profile/user/favoritos" element={
                <FavoritoProvider>
                  <FavoritosPage />
                </FavoritoProvider>
              } />
            </Routes>
          </AuthProvider>
        </NotificationProvider>
      </BrowserRouter>
    </ErrorProvider>
  );
};

export default App;
