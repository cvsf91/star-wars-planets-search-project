import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function ContextProvider({ children }) {
  const [planets, setPlanets] = useState([]);

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

  return (
    <Context.Provider value={ planets }>
      { children }
    </Context.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ContextProvider;
