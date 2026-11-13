import React from "react";

export function defaultprops() {
  return {
    type: "Divider",
    label: "Divider",
    colour: "#c4d3d9",
    thickness: 1,
    styleType: "solid",
    script: [],
    Rndprops: {
      x: 24,
      y: 100,
      width: 400,
      height: 16,
    },
  };
}

export default function Divider(props) {
  return (
    <div
      id={props.data.id}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <hr
        style={{
          width: "100%",
          border: 0,
          borderTop:
            (parseInt(props.data.thickness, 10) || 1) +
            "px " +
            (props.data.styleType || "solid") +
            " " +
            (props.data.colour || "#c4d3d9"),
          margin: 0,
        }}
      />
    </div>
  );
}
