import React from "react";

export function defaultprops() {
  return {
    type: "Date Field",
    label: "Date Field",
    fieldLabel: "Date",
    value: "",
    backgroundColour: "#ffffff",
    textColour: "#2a363d",
    borderColour: "#c4d3d9",
    script: [],
    Rndprops: {
      x: 24,
      y: 80,
      width: 220,
      height: 64,
    },
  };
}

export default function DateField(props) {
  return (
    <label
      id={props.data.id}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        fontFamily: "Sora, sans-serif",
        color: props.data.textColour || "#2a363d",
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      <span>{props.data.fieldLabel || "Date"}</span>
      <input
        type="date"
        defaultValue={props.data.value || ""}
        style={{
          flex: 1,
          border: "1px solid " + (props.data.borderColour || "#c4d3d9"),
          borderRadius: 8,
          padding: "8px 10px",
          background: props.data.backgroundColour || "#fff",
          color: props.data.textColour || "#2a363d",
          fontFamily: "inherit",
          fontSize: 13,
          fontWeight: 500,
        }}
      />
    </label>
  );
}
