import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

export function defaultprops() {
  const data = {
    type: "Multiline Input Box",
    label: "Text Area",
    inputText: "Enter your text here",
    backgroundColour: "Default",
    textColour: "Black",
    fontSize: 15,
    font: "Arial",
    alignment: "Center",

    rowsmin: 3,
    rowsmax: 10,

    Rndprops: {
      x: 0,
      y: 0,
      width: "auto",
      height: "auto",
    },
  };

  return data;
}

export default function TextArea(props) {
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
      fullWidth
      id={props.data.id}
      multiline
      placeholder={props.data.inputText}
      //style={{ height: "auto", width: "auto" }}

      rows={props.data.rowsmin}
      rowsmax={props.data.rowsmax}
      InputProps={{
        classes: {
          input: classes.resize,
        },
      }}
    ></TextField>
  );
}
