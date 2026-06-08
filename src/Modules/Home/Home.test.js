import { createRoot } from 'react-dom/client';
import /Modules/Home from './/Modules/Home';

it('should mount', () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  root.render(</Modules/Home />);
  root.unmount();
});