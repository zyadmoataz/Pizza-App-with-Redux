import { Link } from 'react-router-dom';

/* eslint-disable react/prop-types */
function Button({ children, disabled, to, type, onClick }) {
  // const className =
  //   'text-stone- inline-block rounded-full bg-yellow-400 px-4 py-3 uppercase tracking-widest text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed sm:px-6 sm:py-4';
  const base =
    'text-sm text-stone-400 inline-block rounded-full bg-yellow-400 uppercase tracking-widest text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed';

  const styles = {
    small: base + ' px-2 py-1.5  md:px-5 md:py-2.5 text-xs',
    round: base + ' sm:px-3.5 sm:py-2 text-sm font-medium px-2 py-0.5',
    circle: base + ' sm:px-1 sm:py-1 text-sm font-medium px-1 py-1 ',
    primary: base + ' px-4 py-3  md:px-6 md:py-4',
    // decrease the padding in the secondary button as it has border
    secondary:
      ' text-sm text-stone- inline-block rounded-full border-2 border-stone-300 uppercase tracking-widest text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:text-stone-800 focus:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5  md:px-6 md:py-3.5',
  };
  if (to) {
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );
  }

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
