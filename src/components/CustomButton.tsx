const CustomButton = ({ size = 'text-lg', fullWidth = false, ...props }) => {
  const buttonClasses = `
    ${size}
    ${fullWidth ? 'w-full' : ''}
    text-sky-100
    hover:text-sky-100
    bg-gradient-to-r from-sky-400 via-sky-600 to-sky-500
    hover:bg-gradient-to-br from-sky-400 via-sky-500 to-sky-600
    focus:ring-4
    focus:outline-none
    focus:ring-sky-300
    dark:focus:ring-sky-800
    shadow-lg
    shadow-sky-500/50
    dark:shadow-lg
    dark:shadow-sky-800/80
    rounded-2xl
    px-4
    py-2
    text-center
    me-2
    mb-2
    mt-2
  `;

  return (
    <button className={buttonClasses} {...props} />
  );
};

export default CustomButton;
