import { useEffect, useRef, useState } from 'react';

export default function useTimer() {
  const [timer, setTimer] = useState({
    minutes: 0,
    seconds: 0,
  });

  const interval = useRef();

  useEffect(() => {
    interval.current = setInterval(() => {
      setTimer({ ...timer, seconds: timer.seconds + 1 });

      timer.seconds === 59 &&
        setTimer({ minutes: timer.minutes + 1, seconds: 0 });
    }, 1000);

    return () => clearInterval(interval.current);
  }, [timer]);

  return timer;
}
