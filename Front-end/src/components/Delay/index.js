import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

Delay.propTypes = {
  wait: PropTypes.number,
};

function Delay(props) {
  const { wait } = props;
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWaiting(false);
    }, wait);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // eslint-disable-next-line react/prop-types
  return waiting === true ? null : props.children;
}

export default Delay;
