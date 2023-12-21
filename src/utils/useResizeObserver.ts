import { useEffect, RefObject } from 'react';

export function useResizeObserver(
  ref: RefObject<HTMLElement>,
  callback: (rect: DOMRectReadOnly) => void
) {
  useEffect(() => {
    if (!ref.current || typeof ResizeObserver === 'undefined') {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        callback(entry.contentRect);
      }
    });

    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref, callback]);
}
