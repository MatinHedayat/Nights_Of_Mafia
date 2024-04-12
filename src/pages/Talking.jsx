import Layout from '../components/Layout';
import Timer from '../components/Timer';
import { useDayNumber } from '../contexts/DayNumber';
import { usePlayers } from '../contexts/Players';

import { useEffect, useState } from 'react';
import { MdOutlineLightMode } from 'react-icons/md';

export default function Talking() {
  const { dayNumber } = useDayNumber();
  const { players } = usePlayers();

  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    handleRandomPlayer();
  }, []);

  function handleRandomPlayer() {
    const randomNumber = Math.floor(Math.random() * players.length);
    setPlayerName(players[randomNumber].name);
  }

  return (
    <Layout title='Talking' back='/randomize-roles' next='/voting'>
      <div className='text-sm mb-6 flex-between'>
        <p className='w-max flex-center gap-x-2'>
          <span className='bg-sky-600 px-2 py-1 flex-center gap-x-2 rounded'>
            <MdOutlineLightMode className='text-base' /> DAY
          </span>

          <span className='bg-slate-700 px-3.5 py-1 rounded'>{dayNumber}</span>
        </p>

        <Timer />
      </div>

      <p className='text-slate-200 text-sm flex-center gap-x-1'>
        <span className='bg-slate-700 px-2 py-1 mr-1.5 rounded'>Hint</span>
        <span className='text-slate-300 text-sm/4'>
          Talk to each other throughout the day and convince each other ...
        </span>
      </p>

      <div className='w-max mb-4 mt-8 flex-center gap-x-2'>
        <p>Talking Head :</p>
        <p className='bg-slate-700 text-slate-300 capitalize px-2 py-1 rounded'>
          {playerName}
        </p>
      </div>

      <button
        className='bg-rose-500 text-sm px-4 py-1.5 rounded'
        onClick={handleRandomPlayer}
      >
        Re-Randomization
      </button>
    </Layout>
  );
}
