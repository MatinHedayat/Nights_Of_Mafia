import Layout from '../components/Layout';
import { usePlayers } from '../contexts/Players';
import specialPlayers from '../functions/specialPlayers';
import ModalBox from '../components/ModalBox';
import {
  ADD_PLAYER,
  REMOVE_PLAYER,
  REMOVE_ALL_PLAYERS,
  EDIT_PLAYER,
} from '../data/actionsType';

import { useRef, useState } from 'react';
import { Button } from '@mui/material';

import { IoClose } from 'react-icons/io5';
import { TbStars } from 'react-icons/tb';
import { FaUserPlus, FaUserCheck, FaUserFriends } from 'react-icons/fa';
import { BsInfoSquareFill } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { FaDeleteLeft } from 'react-icons/fa6';

export default function AddPlayers() {
  const { players, dispatch } = usePlayers();

  const [playerName, setPlayerName] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [playerID, setPlayerID] = useState(0);

  const [modalIsOpen, setModalOpen] = useState(false);
  const handleCloseModal = () => setModalOpen(false);

  const inputRef = useRef(null);

  const handleCheckPlayerName = () => {
    return (
      players.some((player) => player.name === playerName.toLowerCase()) ||
      !playerName
    );
  };

  const handleAddOrEditPlayer = (e) => {
    e.preventDefault();
    editMode ? handleEditPlayerName(playerID, playerName) : handleAddPlayer();
  };

  const handleAddPlayer = () => {
    if (handleCheckPlayerName()) return;

    dispatch({
      type: ADD_PLAYER,
      payload: { id: Date.now(), name: playerName.toLowerCase() },
    });

    setPlayerName('');
    inputRef.current.focus();
  };

  const handleClickEditBtn = (player) => {
    setPlayerID(player.id === playerID ? 0 : player.id);
    setEditMode(player.id === playerID ? false : true);
    setPlayerName(player.name !== playerName ? player.name : '');
  };

  const handleEditPlayerName = (id, name) => {
    if (handleCheckPlayerName()) return;

    dispatch({ type: EDIT_PLAYER, payload: { id, name } });
    setPlayerName('');
    setEditMode(false);
    setPlayerID(0);
  };

  return (
    <Layout
      title='Add Players'
      back='/'
      next={players.length >= 3 && '/selecting-roles'}
    >
      <form className='flex gap-x-2' onSubmit={handleAddOrEditPlayer}>
        <div className='relative w-9/12'>
          <input
            className='w-full bg-slate-200 text-slate-500 text-[0.9rem] font-bold capitalize tracking-wider px-4 py-2.5 placeholder-slate-500 outline-none rounded'
            type='text'
            ref={inputRef}
            value={playerName}
            placeholder='Enter something ...'
            onChange={(e) => setPlayerName(e.target.value)}
          />

          {playerName && (
            <button
              className='text-slate-700 text-xl absolute top-1/2 right-2 -translate-y-1/2 rounded'
              type='button'
              onClick={() => {
                setPlayerName('');
                inputRef.current.focus();
              }}
            >
              <FaDeleteLeft />
            </button>
          )}
        </div>

        <Button sx={{ width: '25%' }} onClick={handleAddOrEditPlayer}>
          {editMode ? (
            <FaUserCheck className='text-xl' />
          ) : (
            <FaUserPlus className='text-xl' />
          )}
        </Button>
      </form>

      <div
        className={`max-h-[45dvh] space-y-2 my-5 overflow-y-auto transition-all duration-300 ${
          players.length >= 8 ? 'pr-2' : 'pr-0'
        }`}
      >
        {!players.length && (
          <div className='w-max text-slate-400 mx-auto mt-16 flex-center gap-x-2'>
            <BsInfoSquareFill />
            <p className='text-sm'>Player list is empty ...</p>
          </div>
        )}

        {players.map((player, index) => (
          <div
            className='relative bg-slate-700 px-4 py-2.5 flex-between rounded shadow-xl'
            key={player.id}
          >
            <div className='flex items-center gap-x-4'>
              <span className='bg-slate-600 text-slate-300 w-6 h-6 text-[0.7rem] flex-center rounded shadow-xl'>
                {index + 1}
              </span>

              <p className='text-slate-200 font-semibold capitalize tracking-wider flex-center gap-x-2'>
                {specialPlayers(player.name) && (
                  <TbStars className='text-slate-300' />
                )}

                <span className='w-24 text-ellipsis overflow-hidden'>
                  {player.name}
                </span>
              </p>
            </div>

            <div className='flex-center gap-x-2'>
              <button
                className={`text-slate-300 p-1 rounded transition-all ${
                  player.id === playerID ? 'bg-sky-600' : ''
                }`}
                onClick={() => handleClickEditBtn(player)}
              >
                <FiEdit />
              </button>

              <button
                className='bg-slate-600 p-1 rounded shadow-xl'
                onClick={() =>
                  dispatch({ type: REMOVE_PLAYER, payload: player.id })
                }
              >
                <IoClose />
              </button>
            </div>
          </div>
        ))}
      </div>

      {players.length > 3 && (
        <div className='text-sm flex items-center justify-between'>
          <button
            className='bg-rose-500 text-white px-4 py-1.5 flex-center gap-x-2 rounded'
            onClick={() => setModalOpen(true)}
          >
            <FaUserFriends className='text-base' />
            Remove All
          </button>

          <p className='text-slate-300'>
            Players :
            <span className='bg-slate-700 text-[0.8rem] px-3 py-1 ml-2 rounded shadow-xl'>
              {players.length}
            </span>
          </p>
        </div>
      )}

      <ModalBox
        modalIsOpen={modalIsOpen}
        handleCloseModal={handleCloseModal}
        title='Notice'
        question='Are you sure you want to remove all players ?'
        handleSuccess={() => dispatch({ type: REMOVE_ALL_PLAYERS })}
        timer={100}
      />
    </Layout>
  );
}
