import { useContext, createContext, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useIdleTimer } from 'react-idle-timer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { loggedUser } from 'store/features/authSlice';
import { useGenrateRefreshToken } from 'hooks';
import { logoutSuccess, updateToken } from 'store/features/authSlice';
import { Modal } from 'react-bootstrap';
import { t } from 'i18next';
import { TNButton, TimeCounterDown } from 'common/components';
const UserActivity = createContext();

const UserActivityProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [state, setState] = useState('Active');
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const checkLoggedInUser = useSelector(loggedUser);

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };
  const decodedJwt = parseJwt(checkLoggedInUser.accessToken || '');
  const created_time = moment(decodedJwt ? decodedJwt.created_at || '' : '');
  let current_time = moment();
  let duration = moment.duration(current_time.diff(created_time));
  let minutes = parseInt(duration.asMinutes(), 10) % 60;
  if (!decodedJwt) {
    minutes = 0;
  }
  console.log(minutes, decodedJwt, 'minutes');

  const timeout = 660_000;
  const promptBeforeIdle = 60_000;

  const onIdle = () => {
    if (
      localStorage.getItem('video-call-id') &&
      history.pathname &&
      history.pathname.split('/')[1] === 'video-call'
    ) {
      console.log(history, 'history', 'onIdle If');
      activate();
    } else {
      if (history.pathname && history.pathname.split('/')[1] === 'video-call' && minutes >= 60) {
        console.log(history, 'history', 'onIdle token update If');
        doTokenData();
      } else {
        console.log(history, 'history', 'onIdle token update else');
        dispatch(logoutSuccess());
        localStorage.loginActivityError = t('page.admin_auto_logout_by_in_activty');
        toast.error(t('page.admin_auto_logout_by_in_activty'));
        navigation('/login');
        setShow(false);
      }
    }
  };

  const onActive = () => {
    setState('Active');
    setShow(false);
  };
  const onPrompt = () => {
    if (minutes >= 60) {
      if (history.pathname && history.pathname.split('/')[1] === 'video-call') {
        console.log(history, 'history', 'onPrompt If');
        doTokenData();
      } else {
        console.log(history, 'history', 'onPrompt else');
        dispatch(logoutSuccess());
        localStorage.loginActivityError = t('page.admin_auto_logout_by_in_timeout');
        toast.error(t('page.admin_auto_logout_by_in_timeout'));
        setShow(false);
        navigation('/login');
      }
    } else if (history.pathname && history.pathname.split('/')[1] === 'video-call') {
      console.log(history, 'history', 'onPrompt else if');
      activate();
    } else {
      setShow(true);
    }
    setState('Prompt');
  };
  const onAction = () => {
    current_time = moment();
    duration = moment.duration(current_time.diff(created_time));
    minutes = parseInt(duration.asMinutes(), 10) % 60;
    if (minutes >= 58) {
      if (history.pathname && history.pathname.split('/')[1] === 'video-call') {
        doTokenData();
        console.log(history, 'history', 'onAction if');
      } else {
        setState('Action');
        setShow(true);
      }
    }
  };
  const { activate } = useIdleTimer({
    onIdle,
    onActive,
    onPrompt,
    onAction,
    timeout,
    promptBeforeIdle,
    throttle: 600,
    disabled: !decodedJwt ? true : false,
  });

  const { mutate: doTokenData } = useGenrateRefreshToken((res) => {
    dispatch(updateToken(res.data.refreshToken));
  });

  if (minutes >= 60) {
    if (history.pathname && history.pathname.split('/')[1] === 'video-call') {
      doTokenData();
    } else {
      console.log('else timeout', minutes, history, 'history');
      dispatch(logoutSuccess());
      toast.error(t('page.admin_auto_logout_by_in_timeout'));
      localStorage.loginActivityError = t('page.admin_auto_logout_by_in_timeout');
      navigation('/login');
    }
  }
  return (
    <UserActivity.Provider value={{ minutes }}>
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
        backdrop="static"
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        className="mt-5"
        centered>
        <Modal.Header className="d-flex justify-content-center">
          <Modal.Title id="contained-modal-title-vcenter" className="ps-2">
            {state === 'Action'
              ? t('page.admin_auto_logout_session_timeout_title_text')
              : t('page.admin_auto_logout_title_text')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p className="fw-light">
            {state === 'Action'
              ? t('page.admin_auto_logout_session_timeout_description_text')
              : t('page.admin_auto_logout_description_text')}
          </p>
          {t('page.admin_auto_logout_countdown')}
          <TimeCounterDown
            startdate={created_time.format('YYYY-MM-DD hh:mm:ss')}
            enddate={current_time.format('YYYY-MM-DD hh:mm:ss')}
            endEvent={() => {
              dispatch(logoutSuccess());
              navigation('/login');
            }}
          />
          <div className="inner-page-button button-auto-logout">
            <TNButton
              onClick={() => {
                dispatch(logoutSuccess());
                navigation('/login');
                setShow(false);
              }}
              className="button-rounded-logout cancel-button settings-btn">
              {t('page.admin_auto_logout_popup_logout_button')}
            </TNButton>
            <TNButton
              onClick={() => {
                if (minutes >= 58) {
                  doTokenData();
                }
                activate();
                setShow(false);
              }}
              className="button-rounded checkout-submit-button settings-btn section-button me-2"
              type="button">
              {`${t('page.admin_auto_logout_popup_stay_log_in_button')}`}
            </TNButton>
          </div>
        </Modal.Body>
      </Modal>
      {children}
    </UserActivity.Provider>
  );
};
UserActivityProvider.propTypes = {
  children: PropTypes.any,
};
const UserActivityContext = () => {
  return useContext(UserActivity);
};
export { UserActivityProvider, UserActivityContext };
