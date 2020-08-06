import React from "react";
import { makeStyles } from "@material-ui/core/styles";

export function defaultprops() {
  const data = {
    type: "Radiogroup",
    label: "Radio Group",
    radiobuttonID: [],
    number: 2,
    title: "Title",
    names: ["Option1", "Option2"],
    font: "Arial",
    fontSize: 15,
    textColour: "Black",

    script: [],

    Rndprops: {
      x: 0,
      y: 0,
      width: "auto",
      height: "auto",
    },
  };

  return data;
}

export default function RadioButtons(props) {
  const useStyles = makeStyles((theme) => ({
    radiobuttonLabel: {
      fontFamily: props.data.font,
      fontSize: parseInt(props.data.fontSize),
      color: props.data.textColour,
    },
  }));
  const classes = useStyles();

  const looping = () => {
    let count = -1;
    let temp = [];

    for (let j = 1; j <= props.data.number; j++) {
      temp.push(props.data.id + "-Option" + j);
    }
    props.data.radiobuttonID = temp;
    var namesList = props.data.names.map(function (name) {
      count = count + 1;
      return (
        <div key={"div" + props.data.radiobuttonID[count]}>
          <input
            type="radio"
            id={props.data.radiobuttonID[count]}
            name={props.data.id}
            value={name}
          ></input>
          <label
            htmlFor={props.data.radiobuttonID[count]}
            className={classes.radiobuttonLabel}
          >
            {name}
          </label>
        </div>
      );
    });

    return <div>{namesList}</div>;
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <label className={classes.radiobuttonLabel}>{props.data.title}</label>

      <form id={props.data.id}>{looping()}</form>
    </div>
  );
}
