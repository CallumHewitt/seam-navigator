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
        <nav>
          Seam Navigator
        </nav>
        <main>
          <Plotter map={map}></Plotter>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
