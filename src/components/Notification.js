import React, { useRef } from 'react';
import useShowThenHide from '../helpers/useShowThenHide';

const Notification = (props) => {
  const divRef = useRef();
  useShowThenHide({ ref: divRef, time: props.time, message: props.message });

  return (
    <div ref={divRef} className='notification'>
      {props.message}
    </div>
  );
};

export default Notification;
