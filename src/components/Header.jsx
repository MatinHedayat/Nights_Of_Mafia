import { Button } from '@mui/material';
import { FaUserSecret } from 'react-icons/fa6';
import { CgMenuLeft } from 'react-icons/cg';

export default function Header({ title }) {
  const buttonSX = {
    padding: '0.25rem',
    color: 'white',
    background: 'rgba(255, 255, 255, 0.15)',
    boxShadow: 'none',
    '&:hover': { background: 'rgba(255, 255, 255, 0.2)', boxShadow: 'none' },
  };

  return (
    <div className='bg-sky-600 h-12 px-4 mb-6 flex-between rounded shadow-xl'>
      <div className='flex-center gap-x-4'>
        <Button sx={buttonSX} onClick={() => localStorage.clear()}>
          <CgMenuLeft className='text-[1.4rem]' />
        </Button>

        <button className=''>
          <FaUserSecret className='text-xl' />
        </button>
      </div>

      <p className='text-sm'>{title}</p>
    </div>
  );
}
