import { buttonCounterWrapper } from './buttonCounter.styled';

const ButtonCounter = ({ sign = '', onStep, disabled = false }) => {
   const handleClick = () => {
      if (disabled) {
         return
      } else if (sign === "reset") {
         disabled = false;
      }
      const delta = sign === '+' ? 1 : sign === 'reset' ? 0 : -1;
      onStep?.(delta);
   };

   return (
      <button
         type="button"
         className="counter"
         onClick={handleClick}
         disabled={disabled}
      >
         {sign === '+' ? '+' : sign === 'reset' ? 'Reset' : '-'}
      </button>
   );
};

export default ButtonCounter;
