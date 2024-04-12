import { useEffect } from 'react';

export default function useOutsideFocus(ref, callback) {
  function handleMouseDown(e) {
    ref.current && !ref.current.contains(e.target) && callback();
  }

  function handleKeyUp(e) {
    e.key === 'Escape' && callback();
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('click', handleMouseDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);
}
