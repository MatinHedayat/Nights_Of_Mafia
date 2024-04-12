import Layout from '../components/Layout';
import Modal from '../components/Modal';
import Timer from '../components/Timer';
import roleTargets from '../functions/roleTargets';
import detectiveResponse from '../functions/detectiveResponse';
import rolesVoice from '../functions/rolesVoice';
import { usePlayers } from '../contexts/Players';
import { useDayNumber } from '../contexts/DayNumber';
import { useNights } from '../contexts/Nights';

import nightStartAudio from '../../public/voice/night-start.mp3';
import mafiaGroupAudio from '../../public/voice/mafia-group.mp3';
import countDownAudio from '../../public/voice/count-down-3.mp3';

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineDarkMode } from 'react-icons/md';

export default function Night() {
  const { players } = usePlayers();
  const { dayNumber } = useDayNumber();
  const { nights, setNights } = useNights();

  const [actions, setActions] = useState([]);
  const [actionsIndex, setActionsIndex] = useState(0);
  const [selectedTarget, setSelectedTarget] = useState('');

  const [soundIsPlayed, setSound] = useState(true);
  const mafiaGroupRef = useRef();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleCloseModal = () => setModalIsOpen(false);

  const navigate = useNavigate();

  const actionsInfo = [
    {
      sortId: 1,
      role: 'mafia',
      targets: roleTargets(players, 'mafia'),
      voice: rolesVoice(players, 'mafia'),
    },
    ...players
      .filter((player) => player.hasAction)
      .map((player) => ({
        sortId: player.sortId,
        role: player.role,
        targets: roleTargets(players, player.role),
        voice: rolesVoice(players, player.role),
      }))
      .sort((a, b) => a.sortId - b.sortId),
  ];
  console.log(actionsInfo);

  const playerAction = {
    role: actionsInfo[actionsIndex].role,
    target: selectedTarget,
  };

  useEffect(() => {
    const nightStartSound = new Audio(nightStartAudio);
    const mafiaGroupSound = new Audio(mafiaGroupAudio);

    nightStartSound.play();
    mafiaGroupRef.current = setTimeout(() => mafiaGroupSound.play(), 5000);

    return () => {
      clearTimeout(mafiaGroupRef.current);

      nightStartSound.pause();
      mafiaGroupSound.pause();
    };
  }, []);

  useEffect(() => {
    if (actionsInfo.length === actions.length) {
      setNights([...nights, actions]);

      setTimeout(() => {
        navigate('/night-loading');
      }, 10);
    }
  }, [actions]);

  const handleBackBtnClick = () => {
    if (actionsIndex === 0) navigate('/voting');

    setSelectedTarget('');
    setActionsIndex(actionsIndex - 1);
  };

  const handleNextBtnClick = () => {
    if (soundIsPlayed) {
      const countDownSound = new Audio(countDownAudio);
      countDownSound.play();
      setSound(false);

      setTimeout(() => {
        setSound(true);
        setActions([...actions, playerAction]);

        if (actionsIndex !== actionsInfo.length - 1) {
          setSelectedTarget('');
          setActionsIndex(actionsIndex + 1);
          actionsInfo[actionsIndex].voice.play();
        }
      }, 4000);
    }
  };

  return (
    <Layout
      funcMode
      title='Night'
      back={handleBackBtnClick}
      next={handleNextBtnClick}
      nextBtn={actionsIndex === actionsInfo.length - 1 ? 'Finish' : 'Next'}
    >
      <div className='text-sm mb-6 flex-between'>
        <p className='w-max flex-center gap-x-2'>
          <span className='bg-sky-600 px-2 py-1 flex-center gap-x-2 rounded'>
            <MdOutlineDarkMode className='text-base' /> NIGHT
          </span>

          <span className='bg-slate-700 px-3.5 py-1 rounded'>{dayNumber}</span>
        </p>

        <Timer />
      </div>

      <p className='text-slate-200 text-sm mb-8 flex-center gap-x-1'>
        <span className='bg-slate-700 px-2 py-1 mr-1.5 rounded'>Hint</span>
        <span className='text-slate-300 text-sm/4'>
          You can select one target or nothing Select and press next button ...
        </span>
      </p>

      <h3 className='text-3xl font-bold capitalize tracking-wider mb-4'>
        {actionsInfo[actionsIndex].role}
      </h3>

      <div className='grid grid-cols-2 gap-2'>
        {actionsInfo[actionsIndex].targets.map((target) => (
          <button
            key={target}
            className={`text-slate-300 capitalize text-ellipsis px-4 py-2 overflow-hidden border-2 rounded transition-all ${
              target === selectedTarget
                ? 'bg-slate-700 border-slate-700'
                : 'border-slate-600'
            }`}
            onClick={() =>
              setSelectedTarget(target === selectedTarget ? '' : target)
            }
          >
            {target}
          </button>
        ))}
      </div>

      {actionsInfo[actionsIndex].role === 'detective' && (
        <button
          className='bg-rose-500 text-sm px-4 py-1 mt-4 rounded'
          onClick={() => selectedTarget && setModalIsOpen(true)}
        >
          See Result
        </button>
      )}

      <Modal
        modalIsOpen={modalIsOpen}
        handleCloseModal={handleCloseModal}
        title='Result'
        value={detectiveResponse(players, actions, selectedTarget)}
      />
    </Layout>
  );
}
