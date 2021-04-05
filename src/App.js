import React, { Component } from 'react';
import './App.css';
import Plotter from './components/plotter'
import map from './data/map'

class App extends Component {
  state = {
    map
  }

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-light">
          <h2>Seam Navigator</h2>
        </nav>
        <div className="container-lg m-3">
          <Plotter map={map}></Plotter>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
