import { useEffect, useRef } from 'react';

export default function usePrevious(value: unknown): unknown {
  const ref = useRef<unknown>();

  useEffect(() => {
    // eslint-disable-next-line
    ref.current = value;
  }, [value]);
  return ref.current;
}
