import Layout from '../components/Layout';
import ModalBox from '../components/ModalBox';
import isGameOver from '../functions/isGameOver';
import { REMOVE_PLAYER } from '../data/actionsType';
import { useDayNumber } from '../contexts/DayNumber';
import { usePlayers } from '../contexts/Players';

import { useState } from 'react';
import { MdOutlineLightMode } from 'react-icons/md';

export default function Voting() {
  const { dayNumber } = useDayNumber();
  const { players, dispatch } = usePlayers();
  const [selectedTarget, setSelectedTarget] = useState('');

  const [modalIsOpen, setModalOpen] = useState(false);
  const handleCloseModal = () => setModalOpen(false);

  const modalQuestion = (
    <p>
      Are you sure you want to remove{' '}
      <span className='text-sky-500 mx-1'>
        {players.find((player) => player.id === selectedTarget)?.name}
      </span>{' '}
      from the game ?
    </p>
  );

  return (
    <Layout title='Voting' back='/talking' next='/night'>
      <p className='w-max text-sm mb-6 flex-center gap-x-2'>
        <span className='bg-sky-600 px-2 py-1 flex-center gap-x-2 rounded'>
          <MdOutlineLightMode className='text-base' /> DAY
        </span>

        <span className='bg-slate-700 px-3.5 py-1 rounded'>{dayNumber}</span>
      </p>

      <p className='text-slate-200 text-sm mb-8 flex-center gap-x-1'>
        <span className='bg-slate-700 px-2 py-1 mr-1.5 rounded'>Hint</span>
        <span className='text-slate-300 text-sm/4'>
          If you want, you can select the player and remove it from the game
        </span>
      </p>

      <div className='grid grid-cols-2 gap-2'>
        {players.map((player) => (
          <button
            key={player.id}
            className={`text-slate-300 capitalize text-ellipsis px-4 py-2 overflow-hidden border-2 rounded transition-all ${
              player.id === selectedTarget
                ? 'bg-slate-700 border-slate-700'
                : 'border-slate-600'
            }`}
            onClick={() =>
              setSelectedTarget(player.id === selectedTarget ? '' : player.id)
            }
          >
            {player.name}
          </button>
        ))}
      </div>

      <button
        className='bg-rose-500 text-sm px-4 py-1.5 mt-4 rounded'
        onClick={() => selectedTarget && setModalOpen(true)}
      >
        Remove Player
      </button>

      <ModalBox
        modalIsOpen={modalIsOpen}
        handleCloseModal={handleCloseModal}
        title='Attention'
        question={modalQuestion}
        handleSuccess={() => {
          dispatch({
            type: REMOVE_PLAYER,
            payload: selectedTarget,
          });
          setSelectedTarget('');
        }}
      />
    </Layout>
  );
}
