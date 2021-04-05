import React, { Component } from "react";

class Stop extends Component {
  render() {
    const id = this.props.id;
    const datalistId = id + "StopOptions";
    const selected = this.props.selected;
    return (
      <div className="input-group mb-2">
        <input
          type="text"
          className="form-control"
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
        <button
          className="btn btn-danger"
          type="button"
          onClick={() => this.props.onDelete(id)}
        >
          Delete
        </button>
      </div>
    );
  }
}

export default Stop;
