import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function ContextProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  const [filtersList, setFiltersList] = useState([]);

  const COLUMNS = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const [options, setOptions] = useState(COLUMNS);

  const filterObj = {
    filterByName: {
      name: '',
    },
    filterByNumericValues: {
      column: '',
      comparison: '',
      value: '',
    },
  };

  const [filter, setFilter] = useState(filterObj);

  useEffect(() => {
    async function fetchPlanets() {
      try {
        const data = await fetch('https://swapi.dev/api/planets').then((response) => response.json());
        data.results.forEach((planet) => {
          delete planet.residents;
        });
        setPlanets(data.results);
      } catch (error) {
        console.log('Nenhum planeta foi encontrado');
      }
    }
    fetchPlanets();
    setFilter({
      ...filter,
      filterByNumericValues: {
        column: 'population',
        comparison: 'maior que',
        value: '0',
      },
    });
  }, []);

  useEffect(() => {
    setFilter({
      ...filter,
      filterByNumericValues: {
        column: options.length > 0 ? options[0] : '',
        comparison: 'maior que',
        value: '0',
      },
    });
  }, [filtersList]);

  const filterName = (event) => {
    event.preventDefault();
    setFilter({
      ...filter,
      filterByName: {
        name: event.target.value,
      },
    });
  };

  const numberFilters = (event) => {
    event.preventDefault();
    const { target: { value, name } } = event;
    setFilter({
      ...filter,
      filterByNumericValues: {
        ...filter.filterByNumericValues,
        [name]: value,
      },
    });
  };

  const addFilter = (filters) => {
    setFiltersList(filtersList.concat({
      id: filtersList.length,
      column: filters.column,
      comparison: filters.comparison,
      value: Number(filters.value),
    }));
    const newOptions = options.filter((column) => column !== filters.column);
    setOptions(newOptions);
  };

  const removeFilter = ({ target: { id } }) => {
    setFiltersList((oldFiltList) => {
      const stateFiltered = oldFiltList
        .filter((filtEl) => Number(filtEl.id) !== Number(id));
      return stateFiltered;
    });
  };

  const removeAllFilters = () => {
    setFiltersList([]);
    setOptions(COLUMNS);
  };

  const value = {
    planets,
    setPlanets,
    options,
    filter,
    filterName,
    numberFilters,
    setFiltersList,
    filtersList,
    addFilter,
    removeFilter,
    removeAllFilters,
  };

  return (
    <Context.Provider value={ value }>
      { children }
    </Context.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ContextProvider;
