import React from 'react';

const XMiniButton = ({ fullWidth = false, ...props }) => {
  const buttonClasses = `
    ${fullWidth ? 'w-full' : ''}
    text-xs
    md:text-xs
    lg:text-xs
    text-sky-100
    bg-gradient-to-br from-sky-700 via-sky-400 to-sky-200
    hover:bg-gradient-to-r from-sky-200 via-sky-400 to-sky-500
    focus:ring-4
    focus:outline-none
    focus:ring-sky-300
    dark:focus:ring-sky-800
    shadow-lg
    shadow-sky-500/50
    dark:shadow-lg
    dark:shadow-sky-800/80
    rounded-lg
    px-3
    py-0.5
    text-center
    me-2
    mb-2
    transition duration-150 ease-in-out
  `;

  return (
    <button className={buttonClasses} {...props} />
  );
};

export default XMiniButton;
