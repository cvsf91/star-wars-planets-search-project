import React, { useContext } from 'react';
import Context from '../context/Context';

function Filters() {
  const {
    filter,
    filterName,
    options,
    COLUMNS,
    ordenateFilters,
    numberFilters,
    filtersList,
    addFilter,
    removeFilter,
    removeAllFilters,
    filtBtnDisable,
    setTypeOrder,
    ordenatePlanets,
    ordenateValues,
  } = useContext(Context);

  return (
    <div>
      <form>
        <input
          className="filter-by-name"
          value={ filter.filterByName.name }
          type="text"
          data-testid="name-filter"
          onChange={ filterName }
        />
        <label htmlFor="select-column">
          { options.length > 0
          && (
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
          ) }
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
            disabled={ filtBtnDisable }
            type="button"
            data-testid="button-filter"
            onClick={ () => addFilter(filter.filterByNumericValues) }
          >
            FILTRAR
          </button>
        </label>
        <select
          value={ filter.order.column }
          name="ordenate-columns"
          data-testid="column-sort"
          onChange={ ordenateFilters }
        >
          { COLUMNS.map((option, i) => (
            <option value={ option } key={ option + i }>{ option }</option>
          )) }
        </select>
        <label htmlFor="ASC">
          <input
            data-testid="column-sort-input-asc"
            id="ASC"
            type="radio"
            name="type-order"
            value="ASC"
            checked={ ordenateValues.ASC }
            onChange={ setTypeOrder }
          />
          ASC
        </label>
        <label htmlFor="DESC">
          <input
            data-testid="column-sort-input-desc"
            id="DESC"
            type="radio"
            name="type-order"
            value="DESC"
            checked={ ordenateValues.DESC }
            onChange={ setTypeOrder }
          />
          DESC
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ ordenatePlanets }
        >
          ORDENAR
        </button>
      </form>
      {
        filtersList.map((filt, i) => (
          <div
            key={ filt.column + i }
            data-testid="filter"
          >
            <p>
              {`${filt.column} ${filt.comparison} ${filt.value}`}
            </p>
            <button
              name={ filt.column }
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
