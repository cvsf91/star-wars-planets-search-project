import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function ContextProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  const [filtersList, setFiltersList] = useState([]);

  const filterObj = {
    filterByName: {
      name: '',
    },
    filterByNumericValues: {
      column: 'population',
      comparison: 'maior que',
      value: 0,
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
  }, []);

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

  const value = {
    planets,
    setPlanets,
    filter,
    filterName,
    numberFilters,
    setFiltersList,
    filtersList,
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
