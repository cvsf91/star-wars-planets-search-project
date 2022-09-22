import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import mockData from './mocks/mockData'
import userEvent from '@testing-library/user-event';

describe('Application tests', () => {
  test('tests name filter input', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    render(<App />);
    const nameFilter = screen.getByTestId('name-filter');
    expect(nameFilter).toBeInTheDocument();

    const planetsNameList = await screen.findAllByTestId('planet-name');
    await waitFor(() => {
      expect(planetsNameList).toHaveLength(10)
      planetsNameList.forEach((planet) => expect(planet).toBeInTheDocument());
    });
  })
});
