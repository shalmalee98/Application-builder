import React from "react";

export function defaultprops() {
  return {
    type: "Card",
    label: "Card",
    title: "Card title",
    body: "Describe this section in a short paragraph.",
    backgroundColour: "#ffffff",
    textColour: "#2a363d",
    borderColour: "#c4d3d9",
    radius: 12,
    script: [],
    Rndprops: {
      x: 40,
      y: 40,
      width: 280,
      height: 160,
    },
  };
}

export default function Card(props) {
  return (
    <div
      id={props.data.id}
      style={{
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        padding: "16px 18px",
        background: props.data.backgroundColour || "#fff",
        color: props.data.textColour || "#2a363d",
        border: "1px solid " + (props.data.borderColour || "#c4d3d9"),
        borderRadius: parseInt(props.data.radius, 10) || 12,
        boxShadow: "0 12px 28px -22px rgba(18,24,29,0.45)",
        overflow: "hidden",
        fontFamily: "Sora, sans-serif",
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>
        {props.data.title}
      </div>
      <div style={{ fontSize: 13, lineHeight: 1.45, opacity: 0.9 }}>
        {props.data.body}
      </div>
    </div>
  );
}
