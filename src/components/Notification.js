import React, { useRef } from 'react';
import useShowThenHide from '../helpers/useShowThenHide';
import '../styles/Notification.css';

const Notification = (props) => {
  const divRef = useRef();
  useShowThenHide({ ref: divRef, time: props.time, message: props.message });
  const border = props.message ? '1' : '0';

  return (
    <div
      ref={divRef}
      className='notification'
      style={{ border: border + 'px solid black' }}
    >
      {props.message}
    </div>
  );
};

export default Notification;
