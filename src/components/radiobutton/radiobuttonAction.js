import React from "react";
import {
  TextField,
  ListItem,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  DialogTitle,
  TextareaAutosize,
  Divider,
} from "@material-ui/core";
import { SketchPicker } from "react-color";
import PaletteIcon from "@material-ui/icons/Palette";

export default function RadiobuttonAction(props) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openTextPalette, setOpenTextPalette] = React.useState(false);
  const [optionNo, setOptionNo] = React.useState("");
  const [currentCode, setCurrentCode] = React.useState("");
  const [eventtype, setEventtype] = React.useState("");

  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setEventtype("");
    setCurrentCode("");
    setOptionNo("");
    setOpenDialog(false);
  };
  const handleSubmit = () => {
    var clone = Object.assign(props.ActionbarData, {});

    let arr1 = clone.script.filter(
      (d) => d.event === eventtype && d.option === optionNo
    );
    let no = clone.names.indexOf(optionNo) + 1;
    if (arr1.length === 0) {
      var obj = {
        event: eventtype,
        option: optionNo,
        code: currentCode,
        id: clone.id + "-Option" + no,
      };
      clone.script.push(obj);
    } else {
      arr1[0].option = optionNo;
      arr1[0].code = currentCode;
    }
    props.updateAppComponent(clone);
    setEventtype("");
    setOptionNo("");
    setCurrentCode("");
    setOpenDialog(false);
  };
  const handleTextPaletteOpen = () => {
    setOpenTextPalette(true);
  };
  const handleTextPaletteClose = () => {
    setOpenTextPalette(false);
  };
  const handleChangeTextColor = (color) => {
    props.ActionbarData.textColour = color.hex;
    console.log(props.ActionbarData.textColour);
    props.updateAppComponent(props.ActionbarData.textColour);
  };
  const handleChange = (type, event) => {
    var clone = Object.assign(props.ActionbarData, {});

    let newname = event.target.value;
    if (type === "number") {
      clone.number = newname;
      let temp = [];
      let temp2 = [];

      for (let j = 1; j <= newname; j++) {
        temp.push("Option" + j);
        temp2.push(clone.id + "-Option" + j);
      }
      clone.names = temp;
      clone.radiobuttonID = temp2;
      console.log(temp2);
    } else if (type === "title") {
      clone.title = newname;
    } else if (type === "fontSize") {
      clone.fontSize = newname;
    } else if (type === "font") {
      clone.font = newname;
    } else if (type === "selection") {
      clone.defaultvalue = newname;
    } else if (type === "textColour") {
      clone.textColour = newname;
    } else if (type === "event") {
      setEventtype(newname);
      setOptionNo("");
      setCurrentCode("");
    } else if (type === "option") {
      let arr1 = clone.script.filter(
        (d) => d.event === eventtype && d.option === newname
      );

      if (arr1.length === 0) {
        setOptionNo(newname);
        setCurrentCode("//Add Code");
      } else {
        setEventtype(arr1[0].event);
        setOptionNo(arr1[0].option);
        setCurrentCode(arr1[0].code);
      }
    } else if (type === "script") {
      setCurrentCode(newname);
    }
    props.updateAppComponent(clone);
    console.log(clone);
  };

  const handleChangeName = (index, event) => {
    var clone = Object.assign(props.ActionbarData, {});
    let newname = event.target.value;
    clone.names[index] = newname;
    console.log(clone.radiobuttonID);
    props.updateAppComponent(clone);
  };
  const printRadiobuttonID = () => {
    var count = props.ActionbarData.names;
    var i = -1;
    var names = count.map(function (name) {
      i = i + 1;
      return (
        <div key={"listitem" + props.ActionbarData.radiobuttonID[i]}>
          <ListItem>
            {name} : {props.ActionbarData.radiobuttonID[i]}
          </ListItem>
        </div>
      );
    });
    return names;
  };

  const loopforeventmenu = () => {
    var count = props.ActionbarData.names;
    var namesList = count.map(function (menuname) {
      // for (let i = 1; i <= count; i++) {
      // no = no + 1;
      return (
        <MenuItem key={"menuitem" + menuname} value={menuname}>
          {menuname}
        </MenuItem>
      );
    });

    return (
      <div>
        Select Event :<br></br>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          style={{ color: "inherit", width: 250 }}
          value={eventtype}
          onChange={(event) => {
            handleChange("event", event);
          }}
        >
          <MenuItem value="click">On Click</MenuItem>
          <MenuItem value="change">On Change</MenuItem>
        </Select>
        <br></br>
        <br></br>
        Select Radiobutton :<br></br>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          style={{ color: "inherit", width: 250 }}
          value={optionNo}
          onChange={(event) => {
            handleChange("option", event);
          }}
        >
          {namesList}
        </Select>
      </div>
    );
  };
  const looping = () => {
    var count = props.ActionbarData.names;
    var namesList = count.map(function (name, index) {
      return (
        <div key={"div" + index}>
          <TextField
            value={name}
            onChange={(event) => {
              handleChangeName(index, event);
            }}
          />
        </div>
      );
    });

    return <div>{namesList}</div>;
  };
  return (
    <div>
      <ListItem>
        <TextField
          label="Title"
          value={props.ActionbarData.title}
          onChange={(event) => {
            handleChange("title", event);
          }}
        ></TextField>
      </ListItem>
      <ListItem>
        <TextField
          label="Number"
          value={props.ActionbarData.number}
          onChange={(event) => {
            handleChange("number", event);
          }}
        ></TextField>
      </ListItem>
      <br></br>
      <Divider></Divider>
      <ListItem style={{ fontSize: 13, color: "grey" }}>Text</ListItem>
      <ListItem>{looping()}</ListItem>
      <br></br>
      <Divider></Divider>
      <br></br>
      <ListItem>
        <TextField
          label="Text Colour"
          value={props.ActionbarData.textColour}
          onChange={(event) => {
            handleChange("textColour", event);
          }}
        ></TextField>
        <button variant="outlined" onClick={handleTextPaletteOpen}>
          <PaletteIcon></PaletteIcon>
        </button>
      </ListItem>
      <Dialog open={openTextPalette} onClose={handleTextPaletteClose}>
        <DialogContent>
          <SketchPicker
            color={props.ActionbarData.textColour}
            width="350px"
            height="500px"
            onChangeComplete={handleChangeTextColor}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="outlined"
            onClick={handleTextPaletteClose}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <ListItem>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Font Family</InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.ActionbarData.font}
            onChange={(event) => {
              handleChange("font", event);
            }}
          >
            <MenuItem style={{ fontFamily: "Arial" }} value="Arial">
              Arial
            </MenuItem>
            <MenuItem style={{ fontFamily: "Cursive" }} value="Cursive">
              Cursive
            </MenuItem>
            <MenuItem style={{ fontFamily: "Tahoma" }} value="Tahoma">
              Tahoma
            </MenuItem>
            <MenuItem style={{ fontFamily: "Verdana" }} value="Verdana">
              Verdana
            </MenuItem>
          </Select>
        </FormControl>
      </ListItem>
      <ListItem>
        <TextField
          label="Font Size"
          value={props.ActionbarData.fontSize}
          onChange={(event) => {
            handleChange("fontSize", event);
          }}
        ></TextField>
      </ListItem>
      <ListItem>
        <Button fullWidth variant="outlined" onClick={handleClickOpen}>
          Add Event
        </Button>
      </ListItem>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Handle Event of Button</DialogTitle>
        <DialogContent>
          {loopforeventmenu()}
          <br />
          <br />
          Enter Your Script Here <br />
          <TextareaAutosize
            rowsMin={15}
            style={{ width: 400 }}
            value={currentCode}
            onChange={(event) => {
              handleChange("script", event);
            }}
          ></TextareaAutosize>
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="outlined" onClick={handleSubmit}>
            Submit
          </Button>
          <Button color="primary" variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <br></br>
      <ListItem>Radiobutton ID's - </ListItem>
      {"\n"} {printRadiobuttonID()}
    </div>
  );
}
