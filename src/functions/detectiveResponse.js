export default function detectiveResponse(players, actions, target) {
  let groupType = 'citizen';
  if (target === 'Step Father') return groupType;

  groupType = players.find((player) => player.name === target)?.groupType;
  const jokerTarget = actions.find((action) => action.role === 'joker')?.target;

  if (target === jokerTarget) {
    return groupType === 'citizen' ? 'mafia' : 'citizen';
  } else return groupType;
}
