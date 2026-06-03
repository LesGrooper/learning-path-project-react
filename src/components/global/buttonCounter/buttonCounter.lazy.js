import { lazy, Suspense } from 'react';

const LazybuttonCounter = lazy(() => import('./buttonCounter'));

const buttonCounter = (props) => (
  <Suspense fallback={null}>
    <LazybuttonCounter {...props} />
  </Suspense>
);

export default buttonCounter;
