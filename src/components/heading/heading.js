import React from "react";

export function defaultprops() {
  return {
    type: "Heading",
    label: "Heading",
    text: "Section title",
    level: "h2",
    textColour: "#12181d",
    fontSize: 28,
    font: "Sora, sans-serif",
    alignment: "left",
    script: [],
    Rndprops: {
      x: 24,
      y: 24,
      width: 360,
      height: 56,
    },
  };
}

export default function Heading(props) {
  const Tag = props.data.level || "h2";
  return (
    <Tag
      id={props.data.id}
      style={{
        margin: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        color: props.data.textColour,
        fontSize: parseInt(props.data.fontSize, 10) || 28,
        fontFamily: props.data.font,
        textAlign: props.data.alignment,
        fontWeight: 700,
        letterSpacing: "-0.02em",
        lineHeight: 1.15,
      }}
    >
      {props.data.text}
    </Tag>
  );
}
