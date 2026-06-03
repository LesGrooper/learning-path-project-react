import { createRoot } from 'react-dom/client';
import listing from './listing';

it('should mount', () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  root.render(<listing />);
  root.unmount();
});