import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemon } from '../pages';

describe('Teste o componente <FavoritePokemon.js />', () => {
  it('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    renderWithRouter(<FavoritePokemon />);
    const text = screen.getByText('No favorite Pokémon found');
    expect(text).toBeInTheDocument();
  });

  it('Teste se apenas são exibidos os Pokémon favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /Home/i });
    const favorites = screen.getByRole('link', { name: /Favorite Pokémon/i });

    userEvent.click(favorites);
    expect(history.location.pathname).toBe('/favorites');

    const noFavorite = screen.getByText(/No favorite Pokémon found/i);
    expect(noFavorite).toBeInTheDocument();

    userEvent.click(home);
    expect(history.location.pathname).toBe('/');

    const details = screen.getByRole('link', { name: /More Details/i });
    expect(details).toBeInTheDocument();
    userEvent.click(details);

    expect(screen.getByText(/Pikachu Details/i)).toBeInTheDocument();
    const favoritePokemon = screen.getByLabelText(/Pokémon favoritado?/i);
    userEvent.click(favoritePokemon);

    userEvent.click(favorites);
    expect(history.location.pathname).toBe('/favorites');
    const pikachuFavorited = screen.getByText(/Pikachu/i);
    const charmanderNotFavorited = screen.queryByText(/Charmander/i);
    expect(pikachuFavorited).toBeInTheDocument();
    expect(charmanderNotFavorited).not.toBeInTheDocument();
  });
});
