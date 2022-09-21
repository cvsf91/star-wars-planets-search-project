import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function ContextProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  const filterObj = {
    filterByName: {
      name: '',
    },
  };

  const [filter, setFilter] = useState(filterObj);

  useEffect(() => {
    async function fetchPlanets() {
      const data = await fetch('https://swapi.dev/api/planets').then((response) => response.json());
      data.results.forEach((planet) => {
        delete planet.residents;
      });
      setPlanets(data.results);
    }
    fetchPlanets();
  }, []);

  const filterName = (event) => {
    event.preventDefault();
    setFilter((state) => {
      const updatedState = { ...state };
      updatedState.filterByName.name = event.target.value;
      return updatedState;
    });
  };

  const value = {
    planets,
    setPlanets,
    filter,
    filterName,
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
