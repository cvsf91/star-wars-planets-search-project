import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';

describe('Application tests', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });
    render(<App />);
  })

  afterEach(() => {
    jest.clearAllMocks();
    render(<App />);
  });

  it('tests name filter input', async () => {
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
    const optionsColumnFilter = screen.getByTestId('column-sort').childNodes

    const filterButton = screen.getByRole('button', { name: /filtrar/i });
    optionsColumnFilter.forEach(() => {
      userEvent.click(filterButton)
    })
    expect(filterButton).toBeDisabled()
  })
  it('should ordenate the planets', async () => {
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
  it('should filter the planets', async () => {
    const numericFilterBtn = screen.getByRole('button', { name: /filtrar/i });
    const clearAllFiltersBtn = screen.getByRole('button', { name: /remover todas filtragens/i });
    const selectColumnFilter = screen.getByTestId('column-filter')
    const orbitalPeriodOption = screen.getByTestId('column-filter').childNodes[1]
    const comparisonFilter = screen.getByTestId('comparison-filter')
    const minorOption = screen.getByRole('option', { name: 'menor que' })
    const numericFilterInput = screen.getByRole('textbox', { type: 'number' })
    await waitFor(() => {
      userEvent.click(numericFilterBtn)
    });
    expect(screen.getAllByTestId('planet-name')).toHaveLength(8);
    userEvent.click(clearAllFiltersBtn);
    expect(screen.getAllByTestId('planet-name')).toHaveLength(10);

    userEvent.selectOptions(selectColumnFilter, 'orbital_period');
    expect(orbitalPeriodOption.selected).toBe(true)

    userEvent.selectOptions(comparisonFilter, 'menor que')
    expect(minorOption.selected).toBe(true)

    expect(numericFilterInput).toHaveValue('')
    userEvent.type(numericFilterInput, '0')
    expect(numericFilterInput).toHaveValue('0')
    userEvent.click(numericFilterBtn)

    expect(screen.queryAllByTestId('planet-name')).toHaveLength(0)
  })
  it('should remove the filter', () => {
    userEvent.selectOptions(screen.getByTestId('column-filter'), 'orbital_period');
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'menor que');
    userEvent.click(screen.getByRole('button', { name: /filtrar/i }));
    userEvent.click(screen.getByRole('button', { name: /filtrar/i }));
    expect(screen.queryAllByTestId('planet-name')).toHaveLength(0)
    userEvent.click(screen.getAllByRole('button', { name: /remover filtro/i })[0]);
    expect(screen.queryAllByTestId('planet-name')).toHaveLength(8);
    userEvent.click(screen.getByRole('button', { name: /remover todas filtragens/i }))
    expect(screen.queryAllByTestId('planet-name')).toHaveLength(10);
  });
});
