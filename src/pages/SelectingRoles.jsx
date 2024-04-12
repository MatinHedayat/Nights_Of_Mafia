import Layout from '../components/Layout';
import allRoles from '../data/selectiveRoles';
import roleGroupType from '../functions/roleGroupType';
import { usePlayers } from '../contexts/Players';

import { useEffect, useState } from 'react';

export default function SelectingRoles() {
  const { players } = usePlayers();

  const initialState =
    JSON.parse(localStorage.getItem('selective-roles')) || allRoles;
  const [selectiveRoles, setSelectiveRoles] = useState(initialState);

  const selectedRoles = selectiveRoles.filter((role) => role.isSelected);

  useEffect(() => {
    localStorage.setItem('selective-roles', JSON.stringify(selectiveRoles));
  }, [selectiveRoles]);

  const handleSetSelectiveRoles = (id) => {
    setSelectiveRoles(
      selectiveRoles.map((role) =>
        role.id === id ? { ...role, isSelected: !role.isSelected } : role
      )
    );
  };

  const handleClearSelection = () => {
    setSelectiveRoles(
      selectiveRoles.map((role) => ({ ...role, isSelected: false }))
    );
  };

  const groupTypes = selectedRoles.map((role) => roleGroupType(role.role));
  const citizenGroup = groupTypes.filter((type) => type === 'citizen');
  const mafiaGroup = groupTypes.filter((type) => type === 'mafia');

  const nextCondition =
    players.length === selectedRoles.length &&
    citizenGroup.length > mafiaGroup.length &&
    mafiaGroup.length > 0;

  return (
    <Layout
      title='Selecting Roles'
      back='/add-players'
      next={nextCondition && '/randomize-roles'}
    >
      <div className='grid grid-cols-2 items-start gap-2 mt-8'>
        <div className='grid gap-2'>
          <p className='text-slate-300 text-sm tracking-wider text-center mb-4'>
            Citizen Group
          </p>

          {selectiveRoles
            .filter((role) => role.groupType === 'citizen')
            .map((role) => (
              <button
                className={`text-slate-300 py-2 capitalize border-2 rounded transition-all duration-300 ${
                  role.isSelected
                    ? 'bg-slate-700 border-slate-700'
                    : 'border-slate-600'
                }`}
                key={role.id}
                onClick={() => handleSetSelectiveRoles(role.id)}
              >
                {role.role}
              </button>
            ))}
        </div>

        <div className='grid gap-2'>
          <p className='text-slate-300 text-sm tracking-wider text-center mb-4'>
            Mafia Group
          </p>

          {selectiveRoles
            .filter((role) => role.groupType === 'mafia')
            .map((role) => (
              <button
                className={`text-slate-300 py-2 capitalize border-2 rounded transition-all duration-300 ${
                  role.isSelected
                    ? 'bg-slate-700 border-slate-700'
                    : 'border-slate-600'
                }`}
                key={role.id}
                onClick={() => handleSetSelectiveRoles(role.id)}
              >
                {role.role}
              </button>
            ))}
        </div>
      </div>

      <div className='text-sm flex items-center justify-between mt-5'>
        <button
          className='bg-rose-500 px-4 py-1.5 rounded'
          onClick={handleClearSelection}
        >
          Clear Selection ({selectedRoles.length})
        </button>

        <p className='text-slate-300'>
          Players :
          <span className='bg-slate-700 text-[0.8rem] px-3 py-1 ml-2 rounded shadow-xl'>
            {players.length}
          </span>
        </p>
      </div>
    </Layout>
  );
}
