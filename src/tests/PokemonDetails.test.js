import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    expect(details).toBeInTheDocument();
    userEvent.click(details);
    const title = screen.getByText(/Pikachu Details/i);
    expect(title).toBeInTheDocument();
    expect(details).not.toBeInTheDocument();
    const summary = screen.getByText(/summary/i);
    expect(summary).toBeInTheDocument();
  });

  it('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    expect(details).toBeInTheDocument();
    userEvent.click(details);
    const h2 = screen.getByRole('heading', { level: 2,
      name: /Game Locations of Pikachu/i });
    expect(h2).toBeInTheDocument();
    const location = 'Pikachu location';
    const maps = screen.getAllByAltText(location);
    expect(maps.length).toBe(2);
    expect(maps[0].src).toBe('https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(maps[0].alt).toBe(location);
    expect(maps[1].src).toBe('https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(maps[1].alt).toBe(location);
    const summary = (/This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat./i
    );
    const summaryInDocument = screen.getByText(summary);
    expect(summaryInDocument).toBeInTheDocument();
  });

  it('Teste se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    expect(details).toBeInTheDocument();
    userEvent.click(details);
    const check = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    expect(check).toBeInTheDocument();
    expect(check.checked).toBe(false);
    userEvent.click(check);
    expect(check.checked).toBe(true);
    userEvent.click(check);
    expect(check.checked).toBe(false);
  });
});
