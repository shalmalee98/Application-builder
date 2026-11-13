import React from "react";

export function defaultprops() {
  return {
    type: "Number Field",
    label: "Number Field",
    fieldLabel: "Amount",
    value: 0,
    min: "",
    max: "",
    step: 1,
    backgroundColour: "#ffffff",
    textColour: "#2a363d",
    borderColour: "#c4d3d9",
    script: [],
    Rndprops: {
      x: 24,
      y: 160,
      width: 180,
      height: 64,
    },
  };
}

export default function NumberField(props) {
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
      <span>{props.data.fieldLabel || "Number"}</span>
      <input
        type="number"
        defaultValue={props.data.value}
        min={props.data.min === "" ? undefined : props.data.min}
        max={props.data.max === "" ? undefined : props.data.max}
        step={props.data.step || 1}
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
