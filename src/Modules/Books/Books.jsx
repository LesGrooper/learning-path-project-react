import { BooksWrapper } from './Books.styled';
import { Link, Outlet } from 'react-router-dom';

const Books = ({ books = [{ id: 1, title: 'A' }] }) => {
   return (
      <>
         <h2>Books</h2>
         <ul>
            {books.map(b => (
               <li key={b.id}><Link to={`${b.id}`}>{b.title}</Link></li>
            ))}
         </ul>
         <Outlet />
      </>
   );
};

export default Books;
