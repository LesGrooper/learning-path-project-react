import { lazy, Suspense } from 'react';

const Lazymodal = lazy(() => import('./modal'));

const modal = (props) => (
  <Suspense fallback={null}>
    <Lazymodal {...props} />
  </Suspense>
);

export default modal;
