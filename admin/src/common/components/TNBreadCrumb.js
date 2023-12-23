import PropTypes from 'prop-types';
import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TNBreadCrumb = (props) => {
  const breadCrumbArray = props.breadCrumbArray;
  return (
    <Breadcrumb>
      {breadCrumbArray.map((bread) => {
        return (
          <Breadcrumb.Item
            key={Math.floor(Math.random() * (1000 - 1 + 1) + 1)}
            active={bread.active}
            linkAs={Link}
            linkProps={{ to: bread.link }}>
            {bread.label}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

TNBreadCrumb.propTypes = {
  breadCrumbArray: PropTypes.array.isRequired,
};
export { TNBreadCrumb };
