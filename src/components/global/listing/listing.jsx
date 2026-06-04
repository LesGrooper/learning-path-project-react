import { useState } from 'react';
import { ListingWrapper } from './listing.styled';

const GlobalListing = ({items : initialItems = {}}) => {
   const [items, setItems] = useState(initialItems ?? []);
   const [loadings, setLoadings] = useState(initialItems);
   const [errors, setErrors] = useState(null);
   const [lists, setLists] = useState('https://jsonplaceholder.typicode.com/posts');
   console.log(lists)
   return (
      <>
         <ListingWrapper>
            asdf
         </ListingWrapper>
      </>
   )
};

export default GlobalListing;
