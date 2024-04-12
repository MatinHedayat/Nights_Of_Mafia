export default function isGameOver(players) {
  const citizenGroup = players.filter(
    (player) => player.groupType === 'citizen'
  );
  const mafiaGroup = players.filter((player) => player.groupType === 'mafia');

  return mafiaGroup.length === 0 || citizenGroup.length === mafiaGroup.length;
}
