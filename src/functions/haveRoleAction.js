export default function haveRoleAction(role) {
  switch (role) {
    case 'doctor':
    case 'detective':
    case 'sniper':
    case 'dr. lector':
    case 'joker':
      return true;
    
    default:
      return false;
  }
}
