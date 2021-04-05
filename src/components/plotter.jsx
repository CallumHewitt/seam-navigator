import React, { Component } from "react";
import Stop from "./stop";
import { calculateRoute } from "../service/routeCalculator";
import RouteCards from "./routeCards";

class Plotter extends Component {
  constructor(props) {
    super(props);
    const map = props.map;
    const nodes = props.map.nodes;
    const stops = Object.keys(nodes)
      .filter((nodeId) => !nodes[nodeId].hidden)
      .map((nodeId) => {
        return {
          id: nodeId,
          label: nodes[nodeId].name,
        };
      });
    const route = ["", ""];
    this.state = {
      map,
      stops,
      route,
      distance: 0,
    };
  }

  render() {
    const route = this.state.route;
    const accordionId = "accordion";

    return (
      <div className="row">
        <div className="col-sm-4">
          <button className="btn btn-primary my-2" onClick={this.handleAddStop}>
            Add Stop
          </button>
          <ul>
            {route.map((stopId, index) => (
              <Stop
                key={index}
                id={index}
                options={this.state.stops}
                selected={this.getLabelFromId(stopId)}
                onChange={this.handleChangeStop}
                onDelete={this.handleDeleteStop}
              ></Stop>
            ))}
          </ul>
        </div>
        <div id={accordionId} className="col-sm-6">
          {this.calculateLegs().map((leg) => (
            <RouteCards
              key={leg.to + leg.from}
              leg={leg}
              dataParent={accordionId}
            ></RouteCards>
          ))}
        </div>
      </div>
    );
  }

  handleChangeStop = (index, selected) => {
    const stopId = this.getIdFromLabel(selected);
    const route = [...this.state.route];
    route[index] = stopId;
    this.setState({ route });
  };

  getIdFromLabel(label) {
    const stop = this.state.stops.find((value) => value.label === label);
    return !!stop ? stop.id : undefined;
  }

  getLabelFromId(id) {
    const stop = this.state.stops.find((value) => value.id === id);
    return !!stop ? stop.label : "";
  }

  handleDeleteStop = (index) => {
    if (this.state.route.length > 1) {
      const route = [...this.state.route];
      route.splice(index, 1);
      this.setState({ route });
    }
  };

  handleAddStop = () => {
    this.setState((prevState) => ({
      route: [...prevState.route, ""],
    }));
  };

  calculateLegs() {
    const route = this.state.route;
    const legs = [...Array(route.length - 1).keys()].map((index) => {
      return this.calculateLeg(route[index], route[index + 1]);
    });
    return legs.filter((leg) => leg !== undefined);
  }

  calculateLeg(stopIdFrom, stopIdTo) {
    let leg = calculateRoute(this.state.map, stopIdFrom, stopIdTo);
    if (leg !== undefined) {
      leg.from = this.getLabelFromId(leg.from);
      leg.to = this.getLabelFromId(leg.to);
      leg.route.forEach((jump) => {
        jump.from = this.getLabelFromId(jump.from);
        jump.to = this.getLabelFromId(jump.to);
      });
    }
    console.log(leg);
    return leg;
  }
}

export default Plotter;
