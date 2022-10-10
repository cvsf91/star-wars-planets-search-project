import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import { COLUMNS } from '../utils/content';

function ContextProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filtBtnDisable, setDisabled] = useState(false);
  const [filtersList, setFiltersList] = useState([]);

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
    order: {
      column: '',
      sort: '',
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
      order: {
        ...filter.order,
        column: 'population',
      },
      filterByNumericValues: {
        column: 'population',
        comparison: 'maior que',
        value: '0',
      },
    });
  }, []);

  useEffect(() => {
    if (options.length < 1) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
    setFilter({
      ...filter,
      order: {
        ...filter.order,
        column: 'population',
      },
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

  const ordenateFilters = ({ target: { value } }) => {
    setFilter({
      ...filter,
      order: {
        ...filter.order,
        column: value,
      },
    });
  };

  const removeFilter = ({ target: { id, name } }) => {
    setFiltersList(filtersList.filter((filtEl) => Number(filtEl.id) !== Number(id)));
    setOptions(options.concat(name));
  };

  const setTypeOrder = ({ target: { value } }) => {
    setFilter({
      ...filter,
      order: {
        ...filter.order,
        sort: value,
      },
    });
  };

  const ordenatePlanets = (e) => {
    e.preventDefault();
    const { order: { sort, column } } = filter;
    const unknownPlanets = planets.filter((planet) => (
      planet[column] === 'unknown'
    ));
    const planetsValuesKnown = planets.filter((planet) => (
      planet[column] !== 'unknown'
    ));
    const orderedPlanets = planetsValuesKnown.sort((a, b) => {
      if (sort === 'ASC') {
        return a[column] - b[column];
      }
      return b[column] - a[column];
    });
    setPlanets(orderedPlanets.concat(unknownPlanets));
  };

  const removeAllFilters = () => {
    setFiltersList([]);
    setOptions(COLUMNS);
  };

  const value = {
    planets,
    setPlanets,
    options,
    COLUMNS,
    filter,
    filterName,
    numberFilters,
    ordenateFilters,
    setFiltersList,
    filtersList,
    addFilter,
    setTypeOrder,
    removeFilter,
    removeAllFilters,
    filtBtnDisable,
    ordenatePlanets,
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
