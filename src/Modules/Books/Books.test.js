import { createRoot } from 'react-dom/client';
import /Modules/Books from './/Modules/Books';

it('should mount', () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  root.render(</Modules/Books />);
  root.unmount();
});