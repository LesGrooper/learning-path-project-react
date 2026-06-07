import { createRoot } from 'react-dom/client';
import squarePart from './squarePart';

it('should mount', () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  root.render(<squarePart />);
  root.unmount();
});