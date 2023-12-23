// import libs
import { React } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { ForgetPasswordPage, LoginPage, OtpVerificationPage, ResetPasswordPage } from 'pages/Auth';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

import { DashboardPage } from 'pages/Dashboard/DashboardPage';
import { EditProfilePage, ChangePasswordPage } from 'pages/Accounts/';
import { PageNotFound } from 'common/components';

const PagesRoutes = ({ t }) => {
  return (
    <>
      <Helmet>
        <title>Telepath Admin</title>
      </Helmet>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route exact path="/" element={<LoginPage t={t} />} />
          <Route exact path="/login" element={<LoginPage t={t} />} />
          <Route exact path="/forget-password" element={<ForgetPasswordPage t={t} />} />
          <Route exact path="/otp-verification" element={<OtpVerificationPage t={t} />} />
          <Route exact path="/reset-password" element={<ResetPasswordPage t={t} />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route exact path="/dashboard" element={<DashboardPage t={t} />} />
          <Route exact path="/edit-profile" element={<EditProfilePage t={t} />} />
          <Route exact path="/change-password" element={<ChangePasswordPage t={t} />} />
        </Route>
        <Route>
          <Route path="*" element={<PageNotFound t={t} />} from="admin" />
        </Route>
      </Routes>
    </>
  );
};
PagesRoutes.propTypes = {
  t: PropTypes.func,
};
export default PagesRoutes;
