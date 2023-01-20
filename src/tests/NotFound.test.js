import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('Teste o componente <App.js />', () => {
  it('Teste se a página contém um heading h2 com o texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);
    const notFound = screen.getByRole('heading', { level: 2, name: 'Page requested not found' });
    expect(notFound).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', () => {
    renderWithRouter(<NotFound />);
    const image = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const src = screen.getByRole('img');
    expect(src.src).toBe(image);
  });
});
