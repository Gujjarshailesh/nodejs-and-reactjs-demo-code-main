import { React } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
const Sidebar = (props) => {
  const { t } = props;

  return (
    <>
      <aside id="sidebar-wrapper">
        <div className="sidebar mt-4">
          <nav className="navigation">
            <ul className="mainmenu">
              <li>
                <NavLink to="/dashboard" onClick={props.toggleClass}>
                  <span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke="#4d8481"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <rect
                        x="13.8333"
                        y="3"
                        width="7.16667"
                        height="7.16667"
                        rx="2"
                        stroke="#4d8481"
                        strokeWidth="2"
                      />
                      <rect
                        x="13.8333"
                        y="13.8333"
                        width="7.16667"
                        height="7.16667"
                        rx="2"
                        stroke="#4d8481"
                        strokeWidth="2"
                      />
                      <rect
                        x="3"
                        y="13.8333"
                        width="7.16667"
                        height="7.16667"
                        rx="2"
                        stroke="#4d8481"
                        strokeWidth="2"
                      />
                      <rect
                        x="3"
                        y="3"
                        width="7.16667"
                        height="7.16667"
                        rx="2"
                        stroke="#4d8481"
                        strokeWidth="2"
                      />
                    </svg>
                  </span>
                  {t('page.sidebar_dashboard')}
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};
Sidebar.propTypes = {
  toggleClass: PropTypes.any.isRequired,
  t: PropTypes.func,
};

export { Sidebar };
