import React from "react";

export function defaultprops() {
  return {
    type: "Progress",
    label: "Progress",
    value: 45,
    max: 100,
    showLabel: true,
    barColour: "#1f9d8a",
    trackColour: "#e2eaed",
    textColour: "#2a363d",
    script: [],
    Rndprops: {
      x: 24,
      y: 220,
      width: 280,
      height: 48,
    },
  };
}

export default function Progress(props) {
  const max = Number(props.data.max) || 100;
  const value = Math.max(0, Math.min(max, Number(props.data.value) || 0));
  const pct = max === 0 ? 0 : Math.round((value / max) * 100);

  return (
    <div
      id={props.data.id}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 6,
        fontFamily: "Sora, sans-serif",
        color: props.data.textColour || "#2a363d",
      }}
    >
      {props.data.showLabel !== false ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 11,
            fontWeight: 600,
          }}
        >
          <span>Progress</span>
          <span style={{ fontFamily: "IBM Plex Mono, monospace" }}>{pct}%</span>
        </div>
      ) : null}
      <div
        style={{
          width: "100%",
          height: 10,
          borderRadius: 999,
          background: props.data.trackColour || "#e2eaed",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: pct + "%",
            height: "100%",
            background: props.data.barColour || "#1f9d8a",
            borderRadius: 999,
            transition: "width 200ms ease",
          }}
        />
      </div>
    </div>
  );
}
