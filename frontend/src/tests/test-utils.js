import { render } from '@testing-library/react';
import AllTheProviders from './AllTheProviders';

function customRender(ui, options) {
  return render(ui, { wrapper: AllTheProviders, ...options });
}

export * from '@testing-library/react';

export { customRender as render };
