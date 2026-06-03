import { lazy, Suspense } from 'react';

const Lazylisting = lazy(() => import('./listing'));

const listing = (props) => (
  <Suspense fallback={null}>
    <Lazylisting {...props} />
  </Suspense>
);

export default listing;
