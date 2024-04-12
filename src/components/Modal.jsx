import { useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import useOutsideFocus from '../hooks/useOutsideFocus';

export default function Modal(props) {
  const { modalIsOpen, handleCloseModal, title, value } = props;

  const modalRef = useRef(null);
  useOutsideFocus(modalRef, handleCloseModal);

  return (
    <div
      className={`bg-slate-800/60 backdrop-blur-sm absolute inset-0 z-40 flex items-center justify-center transition-all duration-300 ${
        modalIsOpen ? 'opacity-100 visible' : 'opacity-0 invisible  delay-200'
      }`}
    >
      <div
        className={`bg-slate-700 text-xl font-bold capitalize w-5/6 p-8 rounded shadow-xl transition-all duration-300 ${
          modalIsOpen
            ? 'opacity-100 translate-y-0 delay-200'
            : 'opacity-0 -translate-y-8'
        }`}
        ref={modalRef}
      >
        <div className='flex justify-between items-center'>
          <span className='text-slate-400 text-sm'>{title}</span>
          <button
            className='bg-slate-600 p-1.5 rounded'
            onClick={handleCloseModal}
          >
            <IoClose className='text-slate-400' />
          </button>
        </div>

        <p className='text-slate-200 text-3xl pb-4 tracking-wider border-b-2 border-slate-500'>
          {value}
        </p>
        <button
          className='bg-sky-600 w-full py-2 mt-8 rounded shadow-xl'
          onClick={handleCloseModal}
        >
          OK
        </button>
      </div>
    </div>
  );
}
