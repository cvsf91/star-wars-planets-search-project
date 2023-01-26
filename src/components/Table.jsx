import React, { useContext } from 'react';
import Context from '../context/Context';
import '../css/table.css';

function Table() {
  const { planets, filter, filtersList } = useContext(Context);
  const planetsFiltered = planets.filter((planet) => (
    planet.name.toLowerCase().includes(filter.filterByName.name.toLowerCase())
  ));

  const planetsFilteredByNumericValues = planetsFiltered
    .filter((planet) => filtersList.every((element) => {
      const column = Number(planet[element.column]);
      const value = Number(element.value);
      switch (element.comparison) {
      case 'maior que':
        return column > value;
      case 'menor que':
        return column < value;
      default:
        return column === value;
      }
    }));

  const TABLE_THS = [
    'Name',
    'Rotation Period',
    'Orbital Period',
    'Diameter',
    'Climate',
    'Gravity',
    'Terrain',
    'Surface Water',
    'Population',
    'Films',
    'Created',
    'Edited',
    'URL',
  ];

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
            { TABLE_THS.map((th) => <th key={ th }>{ th }</th>) }
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
