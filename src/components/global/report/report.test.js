import { createRoot } from 'react-dom/client';
import report from './report';

it('should mount', () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  root.render(<report />);
  root.unmount();
});