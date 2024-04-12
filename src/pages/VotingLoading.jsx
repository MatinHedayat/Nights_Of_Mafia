import Layout from '../components/Layout';
import isgGameOver from '../functions/isGameOver';
import { usePlayers } from '../contexts/Players';

import nightStartAudio from '../../public/voice/night-start-warning.mp3';
import countDownAudio from '../../public/voice/count-down-3.mp3';

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThreeCircles } from 'react-loader-spinner';

export default function VotingLoading() {
  const { players } = usePlayers();
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(true);

  const nightTimerRef = useRef();
  const countTimerRef = useRef();

  useEffect(() => {
    const nightStartSound = new Audio(nightStartAudio);
    const countDownSound = new Audio(countDownAudio);

    setTimeout(() => {
      if (isgGameOver(players)) navigate('/result');
      else {
        setLoading(false);
        nightStartSound.play();
        countTimerRef.current = setTimeout(() => countDownSound.play(), 5000);
        nightTimerRef.current = setTimeout(() => navigate('/night'), 9000);
      }
    }, 3000);

    return () => {
      clearTimeout(nightTimerRef.current);
      clearTimeout(countTimerRef.current);

      nightStartSound.pause();
      countDownSound.pause();
    };
  }, []);

  return (
    <Layout providerMode={false}>
      <div className='text-slate-200 mt-48'>
        {isLoading ? (
          <div className='flex flex-col items-center gap-y-8'>
            <p>Please Wait ...</p>

            <ThreeCircles
              visible={true}
              height='200'
              width='200'
              color='#0284c7'
              ariaLabel='three-circles-loading'
              wrapperStyle={{}}
              wrapperClass=''
            />
          </div>
        ) : (
          <div className='flex flex-col items-center gap-y-8'>
            <p className='text-2xl/[2.5rem] font-semibold text-center'>
              We are going to{' '}
              <span className='bg-sky-600 px-2 py-1 mx-2 rounded'>Night</span>,
              <br />
              <span className='text-xl'>Please everyone sleep ...</span>
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
