import React from "react";

export function defaultprops() {
  return {
    type: "Video",
    label: "Video",
    src: "",
    poster: "",
    controls: true,
    autoplay: false,
    loop: false,
    muted: true,
    script: [],
    Rndprops: {
      x: 40,
      y: 40,
      width: 360,
      height: 220,
    },
  };
}

export default function Video(props) {
  const hasSrc = Boolean(props.data.src);

  if (!hasSrc) {
    return (
      <div
        id={props.data.id}
        style={{
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px dashed #97b0ba",
          borderRadius: 12,
          background: "#f2f6f7",
          color: "#4f7382",
          fontFamily: "Sora, sans-serif",
          fontSize: 13,
          textAlign: "center",
          padding: 16,
        }}
      >
        Upload a video in the inspector
      </div>
    );
  }

  return (
    <video
      id={props.data.id}
      src={props.data.src}
      poster={props.data.poster || undefined}
      controls={props.data.controls !== false}
      autoPlay={!!props.data.autoplay}
      loop={!!props.data.loop}
      muted={props.data.muted !== false}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: 8,
        background: "#12181d",
      }}
    />
  );
}
