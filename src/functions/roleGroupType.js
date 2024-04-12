export default function roleGroupType(role) {
  switch (role) {
    case 'doctor':
    case 'detective':
    case 'sniper':
    case 'die hard':
    case 'simple citizen':
      return 'citizen';

    default:
      return 'mafia';
  }
}
