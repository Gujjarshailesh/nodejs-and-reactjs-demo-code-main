import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ReadMore = ({ children }) => {
  const text = children;
  console.log(text);
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 100) : text}{' '}
      <a href="javascript:void(0);" onClick={toggleReadMore} className="read-or-hide text-primary">
        {isReadMore ? '...read more' : ' show less'}
      </a>
    </p>
  );
};
ReadMore.propTypes = {
  children: PropTypes.string,
};
export default ReadMore;
