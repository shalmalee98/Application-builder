import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

export function defaultprops() {
  const data = {
    type: "Input Box",
    label: "Input Box",
    inputText: "Enter your text here",
    backgroundColour: "Default",
    textColour: "Black",
    fontSize: 15,
    font: "Arial",
    alignment: "Center",
    inputType: "text",

    Rndprops: {
      x: 0,
      y: 0,
      width: 200,
      height: 50,
    },
  };

  return data;
}

export default function TextBox(props) {
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
      type={props.data.inputType}
      placeholder={props.data.inputText}
      style={{ height: "100%", width: "100%" }}
      InputProps={{
        classes: {
          input: classes.resize,
        },
      }}
    ></TextField>
  );
}
