import React, { Component } from "react";
import Stop from "./stop";
import { calculateRoute } from "../service/routeCalculator";
import RouteCards from "./routeCards";

class Plotter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: ["", ""],
      distance: 0,
    };
  }

  render() {
    const route = this.state.route;
    const accordionId = "accordion";
    return (
      <div className="row">
        <div className="col-md-5">
          <button className="btn btn-primary mb-2" onClick={this.handleAddStop}>
            Add Stop
          </button>
          <div>
            {route.map((text, index) => (
              <Stop
                id={index}
                key={index}
                text={text}
                options={Object.values(this.props.map.nodes).map(
                  (node) => node.name
                )}
                onChange={this.handleChangeStop}
                onDelete={this.handleDeleteStop}
              ></Stop>
            ))}
          </div>
        </div>
        <div id={accordionId} className="col-md-7">
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

  handleAddStop = () => {
    this.setState((prevState) => ({
      route: [...prevState.route, ""],
    }));
  };

  handleChangeStop = (index, text) => {
    const route = [...this.state.route];
    route[index] = text;
    this.setState({ route });
  };

  handleDeleteStop = (index) => {
    if (this.state.route.length > 1) {
      const route = [...this.state.route];
      route.splice(index, 1);
      this.setState({ route });
    }
  };

  calculateLegs() {
    const route = this.state.route;
    const legs = [...Array(route.length - 1).keys()].map((index) => {
      const stopKeyFrom = this.getNodeKeyFromName(route[index]);
      const stopKeyTo = this.getNodeKeyFromName(route[index + 1]);
      return this.calculateLeg(stopKeyFrom, stopKeyTo);
    });
    return legs.filter((leg) => leg !== undefined);
  }

  getNodeKeyFromName = (nodeName) => {
    const nodeEntry = Object.entries(this.props.map.nodes).find(
      (entry) => entry[1].name === nodeName
    );
    return !!nodeEntry ? nodeEntry[0] : undefined;
  };

  calculateLeg(stopKeyFrom, stopKeyTo) {
    let leg = calculateRoute(this.props.map, stopKeyFrom, stopKeyTo);
    if (leg !== undefined) {
      leg.from = this.getNodeNameFromKey(leg.from);
      leg.to = this.getNodeNameFromKey(leg.to);
      leg.route.forEach((jump) => {
        jump.from = this.getNodeNameFromKey(jump.from);
        jump.to = this.getNodeNameFromKey(jump.to);
      });
    }
    return leg;
  }

  getNodeNameFromKey(nodeKey) {
    const nodeName = this.props.map.nodes[nodeKey];
    return !!nodeName ? nodeName.name : "";
  }
}

export default Plotter;
