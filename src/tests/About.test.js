import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../pages';

describe('Teste o componente <App.js />', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const about = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
    expect(about).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
    renderWithRouter(<About />);
    const image = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const src = screen.getByRole('img');
    expect(src.src).toBe(image);
  });
});
