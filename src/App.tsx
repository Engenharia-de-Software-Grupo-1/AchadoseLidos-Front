import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@pages/home';
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
import LoginPage from '@pages/login';
import { LoginProvider } from '@stores/login/loginStore';
import { RecoverRequestProvider } from '@stores/recover/recoverStore';
import RecoverRequestPage from '@pages/recover/request';
import { ResetRequestProvider } from '@stores/recover/resetStore';
import ResetRequestPage from '@pages/recover/reset';
import RegisterUser from '@pages/register/user';
import { RegisterUserProvider } from '@stores/register/user/registerStore';
import RegistrationPage from '@pages/register';
import ProfileUser from '@pages/profile/user';
import ProfileUserForm from '@pages/profile/user/form';
import { ProfileUserFormProvider } from '@stores/profile/user/formStore';
import { AuthProvider } from '@contexts/authContext';
import { SeboProvider } from '@stores/profile/sebo/indexStore';
import FavoritosPage from '@pages/favoritos';
import { FavoritoProvider } from '@stores/favorito/favoritoStore';
import CestaPage from '@pages/cesta';
import { CestaProvider } from '@stores/cesta/cestaStore';
import PedidoPage from '@pages/pedido';
import { ProductNavigationPage } from '@pages/navigation/productNavigationPage';
import { SeboNavigationPage } from '@pages/navigation/seboNavigationPage';

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
              <Route
                path="/product/:id"
                element={
                  <FavoritoProvider>
                    <ProductPage />
                  </FavoritoProvider>
                }
              />
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
                    <CestaPage />
                  </CestaProvider>
                }
              />

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
                path="/profile/sebo/:id?"
                element={
                  <SeboProvider>
                    <ProfileSebo />
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
              <Route
                path="/profile/historico/pedido1"
                element={
                  <CestaProvider>
                    <PedidoPage />
                  </CestaProvider>
                }
              />
              <Route
                path="/profile/user/favoritos"
                element={
                  <FavoritoProvider>
                    <FavoritosPage />
                  </FavoritoProvider>
                }
              />
              <Route
                path="/product/edit"
                element={
                  <ProdutoFormProvider>
                    <ProductForm />
                  </ProdutoFormProvider>
                }
              />
              <Route
                path="/navigation/products"
                element={<ProductNavigationPage sorters={[{ campo: 'nome', ordem: 'ASC' }]} meusProdutos={false} />}
              />

              <Route
                path="/navigation/sebos"
                element={<SeboNavigationPage sorters={[{ campo: 'nome', ordem: 'ASC' }]} />}
              />

              <Route
                path="/navigation/meus-produtos"
                element={<ProductNavigationPage sorters={[{ campo: 'nome', ordem: 'ASC' }]} meusProdutos={true} />}
              />
            </Routes>
          </AuthProvider>
        </NotificationProvider>
      </BrowserRouter>
    </ErrorProvider>
  );
};

export default App;
