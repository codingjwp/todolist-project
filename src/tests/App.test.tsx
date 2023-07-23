import { RouterProvider, createMemoryRouter} from 'react-router-dom';
import { render, screen} from '@testing-library/react';
import { it, describe } from 'vitest';
import { routerElement } from '../App'

describe('App Router', () => {
  it('render path "/" Home page', async () => {
    const routers = createMemoryRouter(routerElement, {
      initialEntries: ['/']
    });
    render(<RouterProvider router={routers} />);
    const heading = screen.getByRole('heading', {level:1});
    const signInBtn = screen.getByRole('button', {name: 'signin'});
    const signUpBtn = screen.getByRole('button', {name: 'signup'});

    expect(heading).toBeInTheDocument();
    expect(signInBtn).toBeInTheDocument();
    expect(signUpBtn).toBeInTheDocument();
  });
});