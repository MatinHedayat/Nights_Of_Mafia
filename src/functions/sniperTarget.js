export default function sniperAction(players, actions) {
  const sniperTarget = actions.find(
    (action) => action.role === 'sniper'
  )?.target;

  const sniperTargetGroupType = players.find(
    (player) => player.name === sniperTarget
  )?.groupType;

  if (sniperTargetGroupType === 'citizen') {
    return players.find((player) => player.role === 'sniper')?.name;
  } else {
    const doctorLectorTarget = actions.find(
      (action) => action.role === 'dr. lector'
    )?.target;

    if (sniperTarget !== doctorLectorTarget) return sniperTarget;
  }
}
