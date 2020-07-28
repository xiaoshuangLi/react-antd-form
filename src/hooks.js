import {
  useRef,
  useMemo,
  useCallback,
  createRef,
} from 'react';

export const useStableRef = (ref) => {
  return useMemo(() => {
    return ref || createRef(null);
  }, [ref]);
};

export const useEventCallback = (fn) => {
  const ref = useRef(fn);

  ref.current = fn;

  return useCallback((...args) => {
    const { current } = ref;

    return current && current(...args);
  }, [ref]);
};
