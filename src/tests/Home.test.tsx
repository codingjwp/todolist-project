import { RouterProvider, createMemoryRouter} from 'react-router-dom';
import { render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { it, describe } from 'vitest';
import { routerElement } from '../App'

describe('Home Page', () => {
  const user = userEvent.setup();
  it('Click SignIn button goes to /signin', async () => {
    const routers = createMemoryRouter(routerElement, {
      initialEntries: ['/']
    });
    render(<RouterProvider router={routers} />); 

    const signInBtn = screen.getByRole('button', {name: /signin/i});
    expect(signInBtn).toBeInTheDocument();
    await user.click(signInBtn);
    expect(routers.state.location.pathname).toEqual('/signin');
  });

  it('Click SignUp button goes to /signup', async () => {
    const routers = createMemoryRouter(routerElement, {
      initialEntries: ['/']
    });
    render(<RouterProvider router={routers} />);

    const signUpBtn = screen.getByRole('button', {name: /signup/i});
    expect(signUpBtn).toBeInTheDocument();
    await user.click(signUpBtn);
    expect(routers.state.location.pathname).toEqual('/signup');
  });
});