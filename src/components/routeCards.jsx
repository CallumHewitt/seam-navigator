import React, { Component } from "react";

class RouteCards extends Component {
  render() {
    const leg = this.props.leg;
    return (
      <div className="card mb-2" key={leg.from + leg.to}>
        <div className="card-header">
          <h5 className="mb-0">{leg.from + " to " + leg.to}</h5>
        </div>
        <div className="card-body">
          <p className="mb-0">
            <b>Chalks:</b> {this.formatDistance(leg.chalkedDistance)}
          </p>
          <p className="mb-0">
            <b>Direct:</b> {this.formatDistance(leg.crowDistance)}
          </p>
          <p className="mb-0">
            <b>Route:</b>
          </p>
          <ul className="ml-4">
            {leg.route.map((step) => (
              <li key={step.from + step.to}>
                {step.from}
                {" -> "}
                {step.to} ({this.formatDistance(step.distance)})
              </li>
            ))}
          </ul>
          {!!leg.warning && (
            <div className="alert alert-warning">{leg.warning}</div>
          )}
        </div>
      </div>
    );
  }

  formatDistance(number) {
    return (
      number.toLocaleString(undefined, { maximumFractionDigits: 2 }) + " miles"
    );
  }
}

export default RouteCards;
