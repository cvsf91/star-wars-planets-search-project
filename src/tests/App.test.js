import React, { useEffect } from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import ContextProvider from '../context/ContextProvider';
import testData from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

describe('Application tests', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });
  })

  it('tests name filter input', async () => {
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

  it('tests numeric filters inputs', async () => {
    render(<App />);
    const planetsNameList = await screen.findAllByTestId('planet-name');
    expect(planetsNameList).toHaveLength(10)
    const orbitalPeriodOptions = screen.getAllByRole('option', { name: 'orbital_period' });
    expect(orbitalPeriodOptions[0]).toBeInTheDocument();
  });

  it('verify\'s if the alert is called when fetch gets rejected', async () => {
    jest.spyOn(global, 'fetch');
    jest.spyOn(global, 'alert').mockImplementation(() => {});
    global.fetch.mockResolvedValue(new Error('request rejeitado'));
    render(<App />);
    await waitFor(() => {
      expect(global.alert).toBeCalled()
    })
  });
  it('verify\'s the filter button is disabled when set all the possible filters', () => {
    render(<App />);
    const optionsColumnFilter = screen.getByTestId('column-sort').childNodes

    const filterButton = screen.getByRole('button', { name: /filtrar/i });
    optionsColumnFilter.forEach(() => {
      userEvent.click(filterButton)
    })
    expect(filterButton).toBeDisabled()
  })
  it('should ordenate the planets', async () => {
    render(<App />);

    await waitFor(() => {
    const ascOrdenateRadio = screen.getByTestId('column-sort-input-asc')
    const descOrdenateRadio = screen.getByTestId('column-sort-input-desc')
    const ordenateButton = screen.getByRole('button', { name: /ordenar/i })
    userEvent.click(ascOrdenateRadio)
    userEvent.click(ordenateButton)
    expect(screen.getAllByTestId('planet-name')[0]).toHaveTextContent(/yavin/i)
    userEvent.click(descOrdenateRadio)
    userEvent.click(ordenateButton)
    expect(screen.getAllByTestId('planet-name')[0]).toHaveTextContent(/coruscant/i)
    })
  });
});
