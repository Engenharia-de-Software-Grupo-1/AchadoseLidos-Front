import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@pages/homePage';
import RegisterSebo from '@pages/register/sebo';
import { RegisterSeboProvider } from '@stores/register/sebo/store';
import { NotificationProvider } from '@contexts/notificationContext';
import ProfileSebo from '@pages/profile/sebo';
import ProfileSeboForm from '@pages/profile/sebo/form';
import { ProfileSeboFormProvider } from '@stores/profile/sebo/formStore';
import { ErrorProvider } from '@contexts/errorContext';
import LoginPage from '@pages/loginPage';
import { LoginProvider } from '@stores/login/loginStore';
import { RecoverRequestProvider } from '@stores/recover/recoverRequest';
import RecoverRequestPage from '@pages/recover/request';
import { ResetRequestProvider } from '@stores/recover/resetRequest';
import ResetRequestPage from '@pages/recover/reset';
import RegisterUser from '@pages/register/user';
import { RegisterUserProvider } from '@stores/register/user/store';
import RegistrationPage from '@pages/registrationPage';
import ProfileUser from '@pages/profile/user';
import ProfileUserForm from '@pages/profile/user/form';
import { ProfileUserFormProvider } from '@stores/profile/user/formStore';
import { AuthProvider } from '@contexts/authContext';
import ProtectedRoute from '@components/ProtectedRoute/protectedRoute';

const App = () => {
  return (
    <ErrorProvider>
      <BrowserRouter>
        <NotificationProvider>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegistrationPage />} />
              {/*<Route path="/register" element={<Register />} />  path pra tela inicial de cadastro*/}
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
              <Route path="/profile/sebo" element={<ProfileSebo />} />
              <Route
                path="/profile/sebo/edit"
                element={
                  <ProfileSeboFormProvider>
                    <ProfileSeboForm />
                  </ProfileSeboFormProvider>
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
            <Route path="/profile/user" element={<ProfileUser />} />
            <Route
              path="/profile/user/edit"
              element={
                <ProfileUserFormProvider>
                  <ProfileUserForm />
                </ProfileUserFormProvider>
              }
            />
             <Route path="/register" element={<RegistrationPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/protected_example" element={<h1>This is protected!!!</h1>} />
                </Route>
            </Routes>
          </AuthProvider>
        </NotificationProvider>
      </BrowserRouter>
    </ErrorProvider>
  );
};

export default App;
