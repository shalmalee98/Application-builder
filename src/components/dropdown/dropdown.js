import React from "react";
import { makeStyles } from "@material-ui/core/styles";

export function defaultprops() {
  const data = {
    type: "Dropdown",
    label: "Dropdown List",
    dropdownID: [],
    number: 2,
    title: "Title",
    names: ["Option 1", "Option 2"],
    font: "Arial",
    fontSize: 15,
    multiple: false,
    textColour: "Black",
    backgroundColour: "White",
    defaultvalue: "None",
    script: [],

    Rndprops: {
      x: 0,
      y: 0,
      width: 250,
      height: 50,
    },
  };

  return data;
}

export default function DropDown(props) {
  const useStyles = makeStyles((theme) => ({
    dropdownLabel: {
      fontFamily: props.data.font,
      fontSize: parseInt(props.data.fontSize),
      color: props.data.textColour,
      backgroundColor: props.data.backgroundColour,
    },
  }));
  const classes = useStyles();

  const looping = () => {
    let count = 0;
    let temp = [];
    for (let j = 0; j <= props.data.number; j++) {
      temp.push(props.data.id + "-Option" + j);
    }
    props.data.dropdownID = temp;
    var namesList = props.data.names.map(function (name) {
      count = count + 1;
      return (
        <option
          key={props.data.dropdownID[count]}
          style={{
            fontFamily: props.data.font,
            fontSize: parseInt(props.data.fontSize),
          }}
          value={name}
          id={props.data.dropdownID[count]}
        >
          {name}
        </option>
      );
    });

    return (
      <React.Fragment>
        {/* <option
          style={{
            fontFamily: props.data.font,
            fontSize: parseInt(props.data.fontSize),
          }}
          value={props.data.defaultvalue}
          // disabled="true"
          selected={true}
          id={props.data.dropdownID[0]}
        >
          {props.data.defaultvalue}
        </option> */}
        {namesList}
      </React.Fragment>
    );
  };

  return (
    <form className={classes.dropdownLabel}>
      <select
        id={props.data.id}
        style={{
          width: props.data.Rndprops.width,
          height: props.data.Rndprops.height,
        }}
        className={classes.dropdownLabel}
        multiple={props.data.multiple === true ? true : false}
      >
        {looping()}
      </select>
    </form>
  );
}
