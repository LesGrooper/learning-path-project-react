import { lazy, Suspense } from 'react';

const Lazyreport = lazy(() => import('./report'));

const report = (props) => (
  <Suspense fallback={null}>
    <Lazyreport {...props} />
  </Suspense>
);

export default report;
