import Layout from '../components/Layout';
import Modal from '../components/Modal';
import randomNumbers from '../functions/randomNumbers';
import { usePlayers } from '../contexts/Players';
import { ADD_PLAYERS_ROLE, UPDATE_PLAYERS } from '../data/actionsType';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RandomizeRoles() {
  const { players, dispatch } = usePlayers();
  const navigate = useNavigate();

  const [seenRoles, setSeenRoles] = useState([]);
  const [playerRole, setPlayerRole] = useState('');

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleCloseModal = () => setModalIsOpen(false);

  const selectedRoles = JSON.parse(localStorage.getItem('selective-roles'))
    .filter((role) => role.isSelected)
    .map((role) => role.role);

  useEffect(() => {
    handleReRandomization();
  }, []);

  const handleSeePlayersRole = (role) => {
    setPlayerRole(role);
    setSeenRoles([...seenRoles, role]);
    setModalIsOpen(true);
  };

  const handleReRandomization = () => {
    setSeenRoles([]);
    dispatch({
      type: ADD_PLAYERS_ROLE,
      payload: { selectedRoles, randomNumbers: randomNumbers(players.length) },
    });
    dispatch({ type: UPDATE_PLAYERS });
  };

  const handleNextBtn = () => {
    localStorage.setItem('backup-players', JSON.stringify(players));
    // seenRoles.length === players.length && navigate('/talking');
    navigate('/talking');
  };

  return (
    <Layout
      funcMode
      title='Randomize Roles'
      back={() => navigate('/selecting-roles')}
      next={handleNextBtn}
    >
      <div className='grid grid-cols-2 gap-2'>
        {players.map((player) => (
          <button
            className={`text-slate-300 text-ellipsis capitalize px-4 py-2 overflow-hidden border-2 rounded transition-all duration-300 ${
              seenRoles.includes(player.role)
                ? 'bg-slate-700 border-slate-700'
                : 'border-slate-600'
            }`}
            key={player.id}
            onClick={() => handleSeePlayersRole(player.role)}
          >
            {player.name}
          </button>
        ))}
      </div>

      <div className='text-sm mt-4'>
        <button
          className='bg-rose-500 px-4 py-1.5 rounded'
          onClick={handleReRandomization}
        >
          Re-Randomization
        </button>
      </div>

      <Modal
        modalIsOpen={modalIsOpen}
        handleCloseModal={handleCloseModal}
        title='Your role'
        value={playerRole}
      />
    </Layout>
  );
}
