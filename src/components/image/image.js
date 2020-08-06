import React from "react";
import "./image.css";
import image1 from "../../static/image1.jpg";

export function defaultprops() {
  const data = {
    type: "Image",
    label: "image",
    height: 140,
    alt: "Alternate Text",
    image: image1,
    script: [],
    border: "0",
    borderColour: "Black",
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9,
      marginTop: "30",
    },

    Rndprops: {
      x: 0,
      y: 0,
      width: "auto",
      height: "auto",
    },
  };
  return data;
}

export default function Image(props) {
  return (
    <img
      id={props.data.id}
      src={props.data.image}
      width="100%"
      height="100%"
      alt={props.data.alt}
      border={props.data.border}
      style={{ borderColor: props.data.borderColour }}
    />
  );
}
