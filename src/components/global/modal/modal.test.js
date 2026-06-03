import { createRoot } from 'react-dom/client';
import modal from './modal';

it('should mount', () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  root.render(<modal />);
  root.unmount();
});