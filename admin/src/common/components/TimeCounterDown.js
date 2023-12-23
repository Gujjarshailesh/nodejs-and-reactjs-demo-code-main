import React from 'react';
import PropTypes from 'prop-types';

const TimeCounterDown = ({ endEvent }) => {
  const [counter, setCounter] = React.useState(60);

  // For 60 seconds countdown
  React.useEffect(() => {
    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);
  if (counter === 0) {
    endEvent();
  }
  return (
    <div id="countdown" className="d-inline-flex">
      <div className="counter" data-count="seconds">
        <span data-b="--">{counter}</span>
      </div>
    </div>
  );
};
TimeCounterDown.propTypes = {
  endEvent: PropTypes.any,
  startdate: PropTypes.any,
  enddate: PropTypes.any,
};
export default TimeCounterDown;
