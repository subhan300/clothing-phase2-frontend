import React from 'react'
import { useState, useEffect } from 'react';
import ModalResult from '../components/ModalResult'

function TestModal() {

    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  return (
    <div>
      <button className='bg-black text-white p-4' onClick={() => {
        setIsOpen(true);
        setModalOpen(true)
      }}>Open Modal</button>
        <ModalResult type="confirm" 
        message="The Post has been added!"
        modalState={isModalOpen} // pass for confirmation modal
        // state={isOpen} pass when you want to use success or warning modal
        />
    </div>
  )
}

export default TestModal
