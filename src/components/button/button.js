import React from "react";

export function defaultprops() {
  const data = {
    type: "Button",
    label: "Button",
    backgroundColour: "Default",
    textColour: "Black",
    fontSize: 15,
    font: "Arial",
    script: [],
    Rndprops: {
      x: 0,
      y: 0,
      width: 90,
      height: 40,
    },
  };

  return data;
}
export default class Button extends React.Component {
  render() {
    return (
      <button
        id={this.props.data.id}
        style={{
          width: "100%",
          height: "100%",
          background: this.props.data.backgroundColour,
          color: this.props.data.textColour,
          fontSize: parseInt(this.props.data.fontSize),
          fontFamily: this.props.data.font,
        }}
      >
        {this.props.data.label}
      </button>
    );
  }
}
