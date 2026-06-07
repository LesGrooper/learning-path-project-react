import { useEffect, useState } from 'react';
import { SquarePartWrapper } from './squarePart.styled';

const SquarePart = () => {
   const [show, setShow] = useState(false);
   
   useEffect(() => {
      const timer = setTimeout(() => {
         setShow(true);
      }, 3000)

      return () => clearTimeout(timer);
   }, []);

   if(!show) return null;

   setTimeout(() => {
   }, 300)
   return (
      <SquarePartWrapper>
         squarePart Component
      </SquarePartWrapper>
   );
};

export default SquarePart;
