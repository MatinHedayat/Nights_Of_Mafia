import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function Controllers(props) {
  const { funcMode = false, back, next, nextBtn = 'Next' } = props;
  const buttonSX = { width: '6rem', fontSize: 16, padding: '0.5rem 0', gap: 1 };
  const navigate = useNavigate();

  return (
    <div className='fixed bottom-12 inset-x-8 z-30 pt-6 flex justify-between border-t border-slate-600'>
      <Button
        sx={buttonSX}
        onClick={() => {
          funcMode ? back() : navigate(back);
        }}
      >
        <FaArrowLeft />
        Back
      </Button>

      <Button
        sx={buttonSX}
        onClick={() => {
          funcMode ? next() : navigate(next);
        }}
      >
        {nextBtn}
        {nextBtn === 'Next' && <FaArrowRight />}
      </Button>
    </div>
  );
}
