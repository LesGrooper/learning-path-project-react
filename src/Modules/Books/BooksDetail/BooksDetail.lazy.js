import { lazy, Suspense } from 'react';

const Lazy/Modules/Books = lazy(() => import('.//Modules/Books'));

const /Modules/Books = (props) => (
  <Suspense fallback={null}>
    <Lazy/Modules/Books {...props} />
  </Suspense>
);

export default /Modules/Books;
