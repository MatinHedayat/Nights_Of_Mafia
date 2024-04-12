export default function mafiaTarget(actions) {
  const mafiaTarget = actions.find((action) => action.role === 'mafia')?.target;
  const doctorTarget = actions.find(
    (action) => action.role === 'doctor'
  )?.target;

  if (mafiaTarget !== doctorTarget) return mafiaTarget;
}
