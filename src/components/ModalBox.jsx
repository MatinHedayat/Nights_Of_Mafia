import useOutsideFocus from '../hooks/useOutsideFocus';

import { useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import { FaQuestionCircle } from 'react-icons/fa';

export default function ModalBox(props) {
  const { modalIsOpen, handleCloseModal, title, question, handleSuccess, timer = 300} =
    props;

  const modalRef = useRef(null);
  useOutsideFocus(modalRef, handleCloseModal);

  return (
    <div
      className={`bg-slate-800/60 backdrop-blur-sm absolute inset-0 z-40 flex items-center justify-center transition-all duration-300 ${
        modalIsOpen ? 'opacity-100 visible' : 'opacity-0 invisible  delay-200'
      }`}
    >
      <div
        className={`bg-slate-700 capitalize w-5/6 p-6 rounded shadow-xl transition-all duration-300 ${
          modalIsOpen
            ? 'opacity-100 translate-y-0 delay-200'
            : 'opacity-0 -translate-y-8'
        }`}
        ref={modalRef}
      >
        <div className='flex items-center justify-between'>
          <p className='text-sm text-slate-400 flex items-center gap-x-2'>
            <FaQuestionCircle />
            {title}
          </p>
          <button
            className='bg-slate-600 p-1.5 rounded shadow-xl'
            onClick={handleCloseModal}
          >
            <IoClose className='text-slate-400' />
          </button>
        </div>

        <div className='text-lg/6 font-bold mt-4 mb-8'>{question}</div>

        <div className='text-slate-200 font-semibold flex gap-x-4'>
          <button
            className='w-1/2 bg-slate-600 py-2 rounded shadow-xl'
            onClick={handleCloseModal}
          >
            Cancel
          </button>
          <button
            className='w-1/2 bg-slate-600 py-2 rounded shadow-xl'
            onClick={() => {
              handleCloseModal();
              setTimeout(() => {
                handleSuccess();
              }, timer);
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
