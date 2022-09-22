import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';

describe('Application tests', () => {
  test('tests name filter input', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });

    render(<App />);
    const nameFilter = screen.getByTestId('name-filter');
    expect(nameFilter).toBeInTheDocument();

    const planetsNameList = await screen.findAllByTestId('planet-name');
    await waitFor(async () => {
      expect(planetsNameList).toHaveLength(10)
      planetsNameList.forEach((planet) => expect(planet).toBeInTheDocument());
    });

    userEvent.type(nameFilter, 'tatooine');

    const planetFiltered = await screen.findByRole('cell', { name: /tatooine/i });
    const planetFiltered2 = await screen.findByRole('cell', { name: /alderaan/i });
    // await waitForElementToBeRemoved(planetFiltered2)
    await waitFor(() => {
      expect(planetFiltered).toBeInTheDocument();
      expect(planetFiltered2).not.toBeInTheDocument();
    });
  })
});
