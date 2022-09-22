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

    const planet = screen.getByRole('cell', { name: /alderaan/i });
    expect(planet).toBeInTheDocument();
    userEvent.type(nameFilter, 'tatooine');
    expect(planet).not.toBeInTheDocument();
    const lineTableElement = screen.getAllByRole('row');
    expect(lineTableElement).toHaveLength(2);
  });
});
