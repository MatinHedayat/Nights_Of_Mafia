export default function roleTargets(players, role) {
  switch (role) {
    case 'mafia':
      return players
        .filter((player) => player.groupType === 'citizen')
        .map((player) => player.name);

    case 'joker':
      return players
        .filter((player) => player.role !== 'step father')
        .map((player) => player.name);

    case 'dr. lector':
      return players
        .filter((player) => player.groupType === 'mafia')
        .map((player) => player.name);

    case 'doctor':
      return players.map((player) => player.name);

    case 'detective':
      return players
        .filter((player) => player.role !== 'detective')
        .map((player) => player.name);

    case 'sniper':
      return players
        .filter((player) => player.role !== 'sniper')
        .map((player) => player.name);
  }
}
