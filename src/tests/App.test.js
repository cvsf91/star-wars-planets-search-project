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
    await waitFor(() => {
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
  test('tests numeric filters inputs', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });

    render(<App />);
    const planetsNameList = await screen.findAllByTestId('planet-name');
    expect(planetsNameList).toHaveLength(10)
    const orbitalPeriodOption = screen.getByRole('option', { name: 'orbital_period' });
    // const valueInput = screen.getByRole('textbox', { name: 'value' });
    // expect(valueInput).toBeInTheDocument();
    expect(orbitalPeriodOption).toBeInTheDocument();
  });
});
