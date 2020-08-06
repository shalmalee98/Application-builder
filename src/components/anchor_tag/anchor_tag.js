import React from "react";

export function defaultprops() {
  const data = {
    type: "Link",
    label: "Link",
    linkname: "Link Name",
    link: "https://www.samplelink.com",
    title: "",
    backgroundColour: "Default",
    textColour: "Black",
    fontSize: 15,
    font: "Arial",
    target: "_self",

    Rndprops: {
      x: 0,
      y: 0,
      width: "auto",
      height: "auto",
    },
  };

  return data;
}
export default class Link extends React.Component {
  render() {
    return (
      <a
        id={this.props.data.id}
        style={{
          width: "100%",
          height: "100%",
          background: this.props.data.backgroundColour,
          color: this.props.data.textColour,
          fontSize: parseInt(this.props.data.fontSize),
          fontFamily: this.props.data.font,
        }}
        href={this.props.data.link}
        title={this.props.data.title}
        target={this.props.data.target}
      >
        {this.props.data.linkname}
      </a>
    );
  }
}
