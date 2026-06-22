import { useEffect } from 'react';
import { useBooks } from '../../hooks';
import { BooksWrapper } from './Books.styled';
import { Link, Outlet } from 'react-router-dom';

const Books = () => {
   const { books = [], total, isLoading, fetchBooks } = useBooks();

   useEffect(() => {
      fetchBooks();
   }, [fetchBooks]);

   return (
      <>
         <h2>Books</h2>
         <ul>
            {
               !isLoading ? books.map(b => (
                  <li key={b.id}><Link to={`${b.id}`}>{b.title}</Link>{b.author}</li>
               )) : "loading data.."
            }
         </ul>
         <Outlet />
      </>
   );
};

export default Books;
