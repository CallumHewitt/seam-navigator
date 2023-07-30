import React, { Component } from 'react';
import './App.css';
import Plotter from './components/plotter'
import map from './data/map'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-light px-4">
          <div className="container-fluid p-0">
            <h2 className="float-start">Seam Navigator</h2>
            <a className="float-end" href="https://callumh.io/projects/seam-navigator/">
              <i className="fa-regular fa-xl fa-circle-question"></i>
            </a>
          </div>
        </nav>
        <div className="container-lg m-0 py-3 px-4">
          <Plotter map={this.filterMap(map)}></Plotter>
        </div>
      </React.Fragment >
    );
  }

  filterMap = (map) => {
    const nodes = map.nodes
    const hiddenNodeIds = new Set(Object.keys(nodes).filter(nodeId => nodes[nodeId].hidden))
    const filteredNodes = Object.keys(nodes)
      .filter(nodeId => !hiddenNodeIds.has(nodeId))
      .reduce((obj, key) => {
        obj[key] = nodes[key];
        return obj;
      }, {});
    const filteredEdges = map.edges
      .filter(edge => !(hiddenNodeIds.has(edge[0]) || hiddenNodeIds.has(edge[1])))
    map = {
      nodes: filteredNodes,
      edges: filteredEdges
    }
    console.log("Using map: ", map)
    return map
  }
}

export default App;
