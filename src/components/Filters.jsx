import React, { useContext, useRef, useEffect } from 'react';
import Context from '../context/Context';

function Filters() {
  const inputRef = useRef(null);
  const {
    filter,
    filterName,
    options,
    numberFilters,
    filtersList,
    addFilter,
    removeFilter,
    removeAllFilters,
  } = useContext(Context);

  useEffect(() => {
    if (inputRef) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  return (
    <div>
      <form>
        <input
          ref={ inputRef }
          className="filter-by-name"
          value={ filter.filterByName.name }
          type="text"
          data-testid="name-filter"
          onChange={ filterName }
        />
        <label htmlFor="select-column">
          <select
            value={ filter.filterByNumericValues.column }
            name="column"
            data-testid="column-filter"
            onChange={ numberFilters }
          >
            { options.map((option, i) => (
              <option value={ option } key={ option + i }>{ option }</option>
            )) }
          </select>
          <select
            value={ filter.filterByNumericValues.comparison }
            name="comparison"
            data-testid="comparison-filter"
            onChange={ numberFilters }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
          <input
            value={ filter.filterByNumericValues.value }
            name="value"
            type="number"
            data-testid="value-filter"
            onChange={ numberFilters }
          />
          <button
            type="button"
            data-testid="button-filter"
            onClick={ () => addFilter(filter.filterByNumericValues) }
          >
            FILTRAR
          </button>
        </label>
      </form>
      {
        filtersList.map((filt, i) => (
          <div
            key={ i + filt.column + filt.comparison + filt.value }
            data-testid="filter"
          >
            <p>
              {`${filt.column} ${filt.comparison} ${filt.value}`}
            </p>
            <button
              id={ filt.id }
              type="button"
              onClick={ removeFilter }
            >
              Remover Filtro
            </button>
          </div>
        ))
      }
      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ removeAllFilters }
      >
        Remover todas filtragens
      </button>
    </div>
  );
}

export default Filters;
