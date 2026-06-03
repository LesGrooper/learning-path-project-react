import { createRoot } from 'react-dom/client';
import buttonCounter from './buttonCounter';

it('should mount', () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  root.render(<buttonCounter />);
  root.unmount();
});