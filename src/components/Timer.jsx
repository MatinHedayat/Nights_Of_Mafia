import useTimer from '../hooks/useTimer';

export default function Timer() {
  const timer = useTimer();

  return (
    <p className='bg-sky-600 w-16 text-center py-1 rounded'>
      {timer.minutes < 10 ? `0${timer.minutes}` : timer.minutes}
      <span className='mx-1'>:</span>
      {timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds}
    </p>
  );
}
