// comentário para commit porque o avaliador deu algum problema
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  const routePikachu = '/pokemon/25';

  it('Teste se é renderizado um card com as informações de determinado Pokémon e se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    renderWithRouter(<App />);
    const pikachuName = screen.getByText('Pikachu');
    const pikachuType = screen.getByTestId('pokemon-type');
    const pikachuWeight = screen.getByText(/average weight: 6\.0 kg/i);
    const pikachuImage = screen.getByAltText('Pikachu sprite');
    const image = 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png';
    expect(pikachuName.innerHTML).toBe('Pikachu');
    expect(pikachuType.innerHTML).toBe('Electric');
    expect(pikachuWeight.innerHTML).toBe('Average weight: 6.0 kg');
    expect(pikachuImage.src).toBe(image);
    expect(pikachuImage.alt).toBe('Pikachu sprite');

    const details = screen.getByRole('link', { name: /more details/i });
    expect(details).toBeInTheDocument();
    expect(details.href.includes(routePikachu)).toBeTruthy();
  });

  it('Teste também se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id do Pokémon cujos detalhes se deseja ver.', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    const pikachuDetails = screen.getByText('Pikachu Details');

    expect(pikachuDetails).toBeInTheDocument();
    expect(history.location.pathname).toBe(routePikachu);
  });

  it('Teste se existe um ícone de estrela nos Pokémon favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    expect(history.location.pathname).toBe(routePikachu);

    const favorite = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(favorite).toBeInTheDocument();
    userEvent.click(favorite);
    const star = screen.queryByRole('img', { name: /Pikachu is marked as favorite/i });
    expect(favorite.checked).toBeTruthy();
    expect(star).toBeInTheDocument();
    expect(star.src.includes('/star-icon.svg')).toBeTruthy();
    expect(star.alt.includes('Pikachu is marked as favorite')).toBeTruthy();
  });
});
