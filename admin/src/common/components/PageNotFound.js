import React from 'react';
import Errorpage from 'assets/images/404-page.png';
import PropTypes from 'prop-types';
import { Container, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import userIcon from 'assets/images/admin-telepath-logo.png';

import { TNButton } from './TNButton';
import 'assets/scss/page/_notfound.scss';
const PageNotFound = (props) => {
  const navigate = useNavigate();

  /**
    This function will call on go to home button and will redirect user to dashboard 
   */
  const handleClick = () => {
    navigate('/dashboard');
  };
  return (
    <>
      <Navbar className="sticky-top navbar-section">
        <Container fluid className="container-section">
          <Navbar.Brand className="dashboard-logo">
            <img src={userIcon} alt="dashboardlogo" className="nav-brand" />
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <div className="page-not-found">
          <img src={Errorpage} alt="404" className="not-found-image" />
          <h1 className="page-heading-center">{props.t('page.admin_not_found_oops_text')}</h1>
          <div className="error-page-text">{props.t('page.admin_not_found_text')}</div>
          <div className="primary-button">
            <TNButton onClick={handleClick} loading={false}>
              {props.t('page.admin_back_to_home')}
            </TNButton>
          </div>
        </div>
      </Container>
    </>
  );
};

PageNotFound.propTypes = {
  from: PropTypes.string,
  t: PropTypes.func,
};

export default PageNotFound;
