import { useEffect, useRef } from 'react';

const useShowThenHide = (props) => {
  let isCurrent = useRef(true);
  useEffect(() => {
    isCurrent.current = true;
    const node = props.ref.current;

    node.style.transition = '0s opacity';
    node.style.opacity = 1;
    setTimeout(() => {
      node.style.transition = `${props.time / 1000}s opacity`;
      node.style.opacity = 0;
    }, 100);

    return () => {
      isCurrent.current = false;
    };
  }, [props.message, props.ref, props.time]);
};

export default useShowThenHide;
