import Layout from '../components/Layout';
import isGameOver from '../functions/isGameOver';
import mafiaTarget from '../functions/mafiaTarget';
import sniperTarget from '../functions/sniperTarget';
import nightOverAudio from '../../public/voice/night-over.mp3';
import { usePlayers } from '../contexts/Players';
import { REMOVE_PLAYER } from '../data/actionsType';
import { useRemovedPlayers } from '../contexts/RemovedPlayers';
import { useNights } from '../contexts/Nights';
import { useDayNumber } from '../contexts/DayNumber';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThreeCircles } from 'react-loader-spinner';

export default function NightLoading() {
  const { nights } = useNights();
  const { dayNumber } = useDayNumber();
  const { players, dispatch } = usePlayers();
  const { removedPlayers, setRemovedPlayers } = useRemovedPlayers();

  const navigate = useNavigate();
  const actions = nights[dayNumber - 1];

  useEffect(() => {
    new Audio(nightOverAudio).play();

    if (mafiaTarget(actions)) {
      setRemovedPlayers({
        mafiaTarget: mafiaTarget(actions),
        ...removedPlayers,
      });

      const playerID = players.find(
        (player) => player.name === mafiaTarget(actions)
      ).id;
      dispatch({ type: REMOVE_PLAYER, payload: playerID });
    }

    if (sniperTarget(players, actions)) {
      setRemovedPlayers({
        ...removedPlayers,
        sniperTarget: sniperTarget(players, actions),
      });

      const playerID = players.find(
        (player) => player.name === sniperTarget(players, actions)
      ).id;
      dispatch({ type: REMOVE_PLAYER, payload: playerID });
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (isGameOver(players)) navigate('/result');
      else navigate('/night-result');
    }, 6000);
  }, [players]);

  return (
    <Layout providerMode={false}>
      <div className='text-slate-200 flex flex-col items-center gap-y-8 mt-48'>
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
    </Layout>
  );
}
