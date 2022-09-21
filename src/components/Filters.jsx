import React, { useContext } from 'react';
import Context from '../context/Context';

export default function Filters() {
  const { filter: filterByName, filterName } = useContext(Context);

  return (
    <div>
      <label htmlFor="filter-form">
        <input
          className="filter-by-name"
          value={ filterByName.name }
          type="text"
          data-testid="name-filter"
          onChange={ filterName }
        />
      </label>
    </div>
  );
}
