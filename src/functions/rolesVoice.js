import lectorAudio from '../../public/voice/doctor-lector.mp3';
import jokerAudio from '../../public/voice/joker.mp3';
import doctorAudio from '../../public/voice/doctor.mp3';
import detectiveAudio from '../../public/voice/detective.mp3';
import sniperAudio from '../../public/voice/sniper.mp3';

export default function rolesVoice(players, role) {
  const filteredPlayers = [
    'mafia',
    ...players
      .filter((player) => player.hasAction)
      .sort((a, b) => a.sortId - b.sortId)
      .map((player) => player.role),
  ];

  const roleIndex = filteredPlayers.findIndex((player) => player === role) + 1;

  console.log(filteredPlayers);
  console.log(roleIndex);

  return new Audio(findRolesVoice(filteredPlayers[roleIndex]));
}

function findRolesVoice(role) {
  switch (role) {
    case 'dr lector':
      return lectorAudio;

    case 'joker':
      return jokerAudio;

    case 'doctor':
      return doctorAudio;

    case 'detective':
      return detectiveAudio;

    case 'sniper':
      return sniperAudio;
  }
}
