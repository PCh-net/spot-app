// components/PaginationButton.tsx
import React, { ReactNode, MouseEventHandler } from 'react';

interface PaginationButtonProps {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const PaginationButton = ({ children, onClick, disabled = false }: PaginationButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gradient-to-br'
      } text-s text-sky-100 bg-gradient-to-r from-sky-600 via-sky-400 to-sky-500 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:focus:ring-sky-800 shadow-lg shadow-sky-500/50 dark:shadow-lg dark:shadow-sky-800/80 rounded-2xl px-2 py-1 me-2 mb-2`}
    >
      {children}
    </button>
  );
};

export default PaginationButton;

