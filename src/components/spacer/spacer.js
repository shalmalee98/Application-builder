import React from "react";

export function defaultprops() {
  return {
    type: "Spacer",
    label: "Spacer",
    showGuides: true,
    script: [],
    Rndprops: {
      x: 24,
      y: 140,
      width: 200,
      height: 40,
    },
  };
}

export default function Spacer(props) {
  return (
    <div
      id={props.data.id}
      className="remove-from-html"
      style={{
        width: "100%",
        height: "100%",
        border:
          props.data.showGuides === false
            ? "0"
            : "1px dashed rgba(104, 141, 154, 0.45)",
        borderRadius: 8,
        background:
          props.data.showGuides === false
            ? "transparent"
            : "rgba(237, 250, 247, 0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#688d9a",
        fontFamily: "IBM Plex Mono, monospace",
        fontSize: 10,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
      }}
    >
      Spacer
    </div>
  );
}
