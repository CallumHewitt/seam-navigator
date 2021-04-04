import React, { Component } from "react";

class Stop extends Component {
  render() {
    const id = this.props.id;
    const datalistId = id + "StopOptions";
    const selected = this.props.selected;
    return (
      <div>
        <input
          value={selected}
          list={datalistId}
          placeholder="Enter stop..."
          onChange={(e) => this.props.onChange(id, e.target.value)}
        />
        <datalist id={datalistId}>
          {this.props.options.map((option) => (
            <option key={option.id} value={option.label} />
          ))}
        </datalist>
        <button onClick={() => this.props.onDelete(id)}>Delete Stop</button>
      </div>
    );
  }
}

export default Stop;
