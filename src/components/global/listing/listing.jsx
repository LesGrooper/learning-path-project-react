import { useState } from 'react';
import { ListingWrapper } from './listing.styled';

const GlobalListing = ({items : initialItems = {}}) => {
   const [items, setItems] = useState(initialItems ?? []);
   const [loadings, setLoadings] = useState(initialItems);
   const [errors, setErrors] = useState(null);
   
   return (
      <>
         <ListingWrapper>

         </ListingWrapper>
      </>
   )
};

export default GlobalListing;
