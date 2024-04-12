import Layout from '../components/Layout';
import { useDayNumber } from '../contexts/DayNumber';
import { useRemovedPlayers } from '../contexts/RemovedPlayers';

import { useNavigate } from 'react-router-dom';

export default function NightResult() {
  const { removedPlayers } = useRemovedPlayers();
  const { mafiaTarget, sniperTarget } = removedPlayers;
  const { dayNumber, setDayNumber } = useDayNumber();

  const haveRemovedPlayers = Boolean(mafiaTarget || sniperTarget);
  const navigate = useNavigate();

  const singlePlayer = (
    <p>
      <span className='bg-sky-600 capitalize px-2 py-1 mr-2 rounded'>
        {mafiaTarget || sniperTarget}
      </span>
      must removed from the game
    </p>
  );

  const doublePlayers = (
    <p className='text-base/8'>
      We must say goodbye to{' '}
      <span className='bg-sky-600 capitalize px-2 py-1 mx-2 rounded'>
        {mafiaTarget}
      </span>
      and{' '}
      <span className='bg-sky-600 capitalize px-2 py-1 mx-2 rounded'>
        {sniperTarget}
      </span>
    </p>
  );

  return (
    <Layout
      funcMode
      title='Night Result'
      back={() => navigate('/night')}
      next={() => {
        setDayNumber(Number(dayNumber) + 1);
        navigate('/talking');
      }}
    >
      <div className='font-semibold'>
        {haveRemovedPlayers
          ? mafiaTarget && sniperTarget
            ? doublePlayers
            : singlePlayer
          : 'Nobody removed from the game ...'}
      </div>
    </Layout>
  );
}
