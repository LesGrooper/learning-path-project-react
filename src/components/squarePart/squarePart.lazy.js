import { lazy, Suspense } from 'react';

const LazysquarePart = lazy(() => import('./squarePart'));

const squarePart = (props) => (
  <Suspense fallback={null}>
    <LazysquarePart {...props} />
  </Suspense>
);

export default squarePart;
