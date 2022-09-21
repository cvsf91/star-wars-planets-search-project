import React from 'react';
import './App.css';
import ContextProvider from './context/ContextProvider';
import Table from './components/Table';
import Filters from './components/Filters';

function App() {
  return (
    <ContextProvider>
      <div className="App">
        <h1>Planets</h1>
        <Filters />
        <Table />
      </div>
    </ContextProvider>
  );
}

export default App;
