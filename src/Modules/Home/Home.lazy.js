import { lazy, Suspense } from 'react';

const Lazy/Modules/Home = lazy(() => import('.//Modules/Home'));

const /Modules/Home = (props) => (
  <Suspense fallback={null}>
    <Lazy/Modules/Home {...props} />
  </Suspense>
);

export default /Modules/Home;
