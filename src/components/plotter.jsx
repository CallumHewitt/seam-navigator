import React, { Component } from "react";
import Stop from "./stop";
import { calculateRoute } from "../service/routeCalculator";

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

    return (
      <div>
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
        <button onClick={this.handleAddStop}>Add Stop</button>
        <ul>{this.renderRouteDetails()}</ul>
      </div>
    );
  }

  renderRouteDetails() {
    const route = this.state.route;
    const legs = [...Array(route.length - 1).keys()].map((index) => {
      return this.calculateLeg(route[index], route[index + 1]);
    });
    const filteredLegs = legs.filter((leg) => leg !== undefined);

    return filteredLegs.map((leg) => (
      <li key={leg.from + leg.to}>
        {this.getLabelFromId(leg.from) + " to " + this.getLabelFromId(leg.to)}
        <p>Chalked Distance: {leg.chalkedDistance} miles</p>
        <p>Crow Distance: {leg.crowDistance} miles</p>
        <p>Route:</p>
        <ul>
          {leg.route.map((step) => (
            <li key={step.from + step.to}>
              {this.getLabelFromId(step.from)}
              {" -> "}
              {this.getLabelFromId(step.to)} ({step.distance})
            </li>
          ))}
        </ul>
      </li>
    ));
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
    const route = [...this.state.route];
    route.splice(index, 1);
    this.setState({ route });
  };

  handleAddStop = () => {
    this.setState((prevState) => ({
      route: [...prevState.route, ""],
    }));
  };

  calculateLeg(stopIdFrom, stopIdTo) {
    return calculateRoute(this.state.map, stopIdFrom, stopIdTo);
  }
}

export default Plotter;
