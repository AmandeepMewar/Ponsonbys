import { render, screen } from '../test-utils.js';

import Navbar from '../../ui/Navbar.jsx';
import { expect } from 'vitest';

describe('Navbar Component', () => {
  it('should render home link with icon', () => {
    render(<Navbar />);
    const homeLink = screen.getByText('Home');
    const icon = screen.getByTestId('home-icon');
    expect(homeLink).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });
});
