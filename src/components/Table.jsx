import React, { useContext } from 'react';
import Context from '../context/Context';
import '../css/table.css';

function Table() {
  const { planets, filter, filtersList } = useContext(Context);
  const planetsFiltered = planets.filter((planet) => (
    planet.name.includes(filter.filterByName.name)
    || planet.name.toUpperCase().includes(filter.filterByName.name)
    || planet.name.toLowerCase().includes(filter.filterByName.name)
  ));

  const planetsFilteredByNumericValues = planetsFiltered
    .filter((planet) => filtersList.every((element) => {
      if (element.comparison === 'maior que') {
        return Number(planet[element.column]) > Number(element.value);
      } if (element.comparison === 'menor que') {
        return Number(planet[element.column]) < Number(element.value);
      }
      return Number(planet[element.column]) === Number(element.value);
    }));

  const tableLineGenerator = (planetsList) => (
    planetsList.map((planet) => (
      <tr key={ planet.url }>
        <td data-testid="planet-name">{ planet.name }</td>
        <td>{ planet.rotation_period }</td>
        <td>{ planet.orbital_period }</td>
        <td>{ planet.diameter }</td>
        <td>{ planet.climate }</td>
        <td>{ planet.gravity }</td>
        <td>{ planet.terrain }</td>
        <td>{ planet.surface_water }</td>
        <td>{ planet.population }</td>
        <td>{ planet.films.map((film) => <p key={ film }>{ film }</p>) }</td>
        <td>{ planet.created }</td>
        <td>{ planet.edited }</td>
        <td>{ planet.url }</td>
      </tr>
    ))
  );

  return (
    <div>
      <table id="planets-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {
            !filter.filterByName.name && filtersList.length === 0
              ? tableLineGenerator(planets)
              : tableLineGenerator(planetsFilteredByNumericValues)
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
