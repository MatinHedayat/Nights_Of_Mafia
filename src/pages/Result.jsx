import Layout from '../components/Layout';
import { usePlayers } from '../contexts/Players';

export default function Result() {
  const { players } = usePlayers();
  const backupPlayers = JSON.parse(localStorage.getItem('backup-players'));

  return (
    <Layout controllersSwitch={false}>
      <p className='text-slate-300 text-sm capitalize mb-4'>
        Game is finished ...
      </p>

      <p className='bg-sky-600 w-max text-sm px-2 py-1 mb-4 rounded'>WINNER</p>
      <h2 className='text-6xl font-bold'>Citizen</h2>

      <p className='mb-2 mt-8'>Citizen Team</p>
      <div className='flex flex-wrap gap-2'>
        {backupPlayers
          .filter((player) => player.groupType === 'citizen')
          .map((player) => (
            <span
              className='bg-sky-600 capitalize px-3 py-1 rounded'
              key={player.id}
            >
              {player.name}
            </span>
          ))}
      </div>

      <p className='mt-4 mb-2'>Mafia Team</p>
      <div className='flex flex-wrap gap-2'>
        {backupPlayers
          .filter((player) => player.groupType === 'mafia')
          .map((player) => (
            <span
              className='bg-sky-600 capitalize px-3 py-1 rounded'
              key={player.id}
            >
              {player.name}
            </span>
          ))}
      </div>

      <p className='text-slate-300 text-sm mt-8 mb-2'>Players :</p>
      <div className='flex flex-wrap gap-2'>
        {backupPlayers?.map((back, index) => (
          <div
            className='relative bg-sky-600 w-full capitalize px-3 py-2 flex items-center justify-between rounded'
            key={back.id}
          >
            <p className='flex'>
              <span className='bg-sky-100 w-5 h-5 mt-0.5 font-semibold mr-3 text-sky-600 text-[0.7rem] flex items-center justify-center rounded'>
                {index + 1}
              </span>

              <span>{back.name}</span>
            </p>

            <span className='bg-sky-100 text-sky-600 text-sm font-semibold px-2 mr-2 rounded'>
              {back.role}
            </span>

            {players.some((player) => player.id === back.id) && (
              <span className='bg-sky-100 w-4 h-4 absolute -right-2 rounded'></span>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
}
