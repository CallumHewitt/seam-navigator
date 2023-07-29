import React, { Component } from "react";

class Stop extends Component {
  render() {
    const id = this.props.id;
    const datalistId = id + "DataList";
    return (
      <div>
        <datalist id={datalistId}>
          {this.props.options.map((option) => (
            <option key={option} value={option} />
          ))}
        </datalist>
        <div className="input-group mb-2">
          <input
            className="form-control"
            value={this.props.text}
            list={datalistId}
            placeholder="Enter stop..."
            onChange={(e) => this.handleInputChange(id, e)}
          />
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => this.handleClear(id)}
          >
            <i className="fa-regular fa-circle-xmark"></i>
          </button>
          <button
            className="btn btn-danger"
            type="button"
            onClick={() => this.handleDelete(id)}
          >
            <i className="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    );
  }

  handleInputChange = (id, e) => {
    let text = e.target.value;
    if (e.nativeEvent.inputType === "deleteContentBackward") {
      text = "";
    }
    this.props.onChange(id, text);
  };

  handleClear = (id) => {
    this.props.onChange(id, "");
  };

  handleDelete = (id) => {
    this.props.onDelete(id);
  };
}

export default Stop;
