import React from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export function defaultprops() {
  const data = {
    type: "Label",
    label: "Label",
    inputText: "Label",
    backgroundColour: "Default",
    textColour: "Grey",
    fontSize: 15,
    font: "Arial",
    alignment: "Center",
    Rndprops: {
      x: 0,
      y: 0,
      width: 220,
      height: 55,
    },
  };

  return data;
}

export default function Label(props) {
  const useStyles = makeStyles((theme) => ({
    resize: {
      fontSize: parseInt(props.data.fontSize),
      fontFamily: props.data.font,
      color: props.data.textColour,
      backgroundColor: props.data.backgroundColour,
      textAlign: props.data.alignment,
    },
  }));
  const classes = useStyles();
  return (
    <TextField
      id={props.data.id}
      disabled
      multiline={true}
      style={{ height: "100%", width: "100%" }}
      value={props.data.inputText}
      InputProps={{
        classes: {
          input: classes.resize,
        },
      }}
    ></TextField>
  );
}
