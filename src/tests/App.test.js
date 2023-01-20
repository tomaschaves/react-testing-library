import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <App.js />', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação:', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /Home/i });
    const about = screen.getByRole('link', { name: /About/i });
    const favorite = screen.getByRole('link', { name: /Favorite Pokémon/i });

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: /Home/i });
    expect(home).toBeInTheDocument();
    userEvent.click(home);

    const { pathname } = history.location;

    expect(pathname).toBe('/');

    const homeTitle = screen.getByRole('heading', { name: 'Encountered Pokémon' });
    expect(homeTitle).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação;', () => {
    const { history } = renderWithRouter(<App />);

    const aboutPokemon = screen.getByRole('link', { name: /About/i });
    expect(aboutPokemon).toBeInTheDocument();
    userEvent.click(aboutPokemon);

    const { pathname } = history.location;

    expect(pathname).toBe('/about');

    const favoriteTitle = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(favoriteTitle).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const favoritePokemon = screen.getByRole('link', { name: /Favorite Pokémon/i });
    expect(favoritePokemon).toBeInTheDocument();
    userEvent.click(favoritePokemon);

    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');

    const favoriteTitle = screen.getByRole('heading', { name: 'Favorite Pokémon' });
    expect(favoriteTitle).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('urldesconhecita');
    });

    screen.getByRole('heading', { level: 2,
      name: /Page requested not found/i,
    });
  });
});
