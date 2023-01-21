import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

const pokemonName = 'pokemon-name';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    const encountered = screen.getByRole('heading', { level: 2, name: 'Encountered Pokémon' });
    expect(encountered).toBeInTheDocument();
    const button = screen.getByText('Próximo Pokémon');
    expect(button).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByTestId('next-pokemon');
    expect(nextButton).toBeInTheDocument();
    const visiblePokemonName = screen.getByTestId(pokemonName);
    expect(visiblePokemonName.innerHTML).toBe(pokemonList[0].name);
    userEvent.click(nextButton);
    expect(visiblePokemonName.innerHTML).toBe(pokemonList[1].name);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    expect(visiblePokemonName.innerHTML).toBe(pokemonList[8].name);
    userEvent.click(nextButton);
    expect(visiblePokemonName.innerHTML).toBe(pokemonList[0].name);
  });

  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const shownPokemon = screen.queryAllByTestId(pokemonName);
    expect(shownPokemon).toHaveLength(1);
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const all = screen.getByRole('button', { name: /All/i });
    expect(all).toBeInTheDocument();

    const types = [];
    pokemonList.forEach((element) => {
      if (!types.includes(element.type)) {
        types.push(element.type);
      }
    });
    console.log(types);
    const typeButtons = screen.queryAllByTestId('pokemon-type-button');
    console.log(typeButtons.length);

    for (let a = 0; a < types.length; a += 1) {
      // console.log(`types${a} ${types[a]}`);
      // console.log(`typebuttons${a}  ${typeButtons[a].innerHTML}`);
      expect(types[a]).toBe(typeButtons[a].innerHTML);
    }
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const resetButton = screen.getByText('All');
    const fireButton = screen.getByText('Fire');
    let visiblePokemonName = screen.getByTestId(pokemonName);
    expect(visiblePokemonName).toBeInTheDocument();
    expect(visiblePokemonName.innerHTML).toBe('Pikachu');
    userEvent.click(fireButton);
    visiblePokemonName = screen.getByTestId(pokemonName);
    expect(visiblePokemonName).toBeInTheDocument();
    expect(visiblePokemonName.innerHTML).toBe('Charmander');
    userEvent.click(resetButton);
    visiblePokemonName = screen.getByTestId(pokemonName);
    expect(visiblePokemonName.innerHTML).toBe('Pikachu');
  });
});
