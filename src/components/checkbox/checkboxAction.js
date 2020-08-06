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
  Input,
  Divider,
  useTheme,
} from "@material-ui/core";
import { SketchPicker } from "react-color";
import PaletteIcon from "@material-ui/icons/Palette";

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function checkboxAction(props) {
  const theme = useTheme();

  const [openDialog, setOpenDialog] = React.useState(false);
  const [openTextPalette, setOpenTextPalette] = React.useState(false);
  const [optionNo, setOptionNo] = React.useState([]);
  const [currentCode, setCurrentCode] = React.useState("");
  const [eventtype, setEventtype] = React.useState("");
  var clone = Object.assign(props.ActionbarData, {});
  const returncode = (thiscode) => {
    var func = "";
    for (var k = 0; k < clone.number; k++) {
      func =
        func +
        "var checkbox" +
        k +
        '= document.getElementById("' +
        clone.checkboxID[k] +
        '");';
    }
    func = func + "if ( true ";
    for (var j = 0; j < clone.number; j++) {
      if (clone.actionOptions.indexOf(clone.names[j]) !== -1) {
        func = func + "&& checkbox" + j + ".checked == true ";
      } else {
        func = func + "&& checkbox" + j + ".checked == false ";
      }
    }
    func = func + "){ " + thiscode + " }";
    return func;
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setEventtype("");
    setCurrentCode("");
    setOptionNo([]);
    props.ActionbarData.actionOptions = [];
    setOpenDialog(false);
  };
  const handleSubmit = () => {
    var clone = Object.assign(props.ActionbarData, {});

    let arr1 = clone.script.filter((d) => {
      if (d.event === eventtype && d.option.length === optionNo.length) {
        if (JSON.stringify(d.option) === JSON.stringify(optionNo)) {
          return d;
        }
        return null;
      }
    });
    var newcode = returncode(currentCode);
    if (arr1.length === 0) {
      var obj = {
        event: eventtype,
        option: optionNo,
        usercode: currentCode,
        code: newcode,
        id: clone.id,
      };
      clone.script.push(obj);
    } else {
      arr1[0].option = optionNo;
      arr1[0].usercode = currentCode;

      arr1[0].code = newcode;
    }
    props.updateAppComponent(clone);
    console.log(props.ActionbarData.script);
    setEventtype("");
    setOptionNo([]);
    setCurrentCode("");
    props.ActionbarData.actionOptions = [];
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
      clone.checkboxID = temp2;
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
      setOptionNo([]);
      setCurrentCode("");
    } else if (type === "option") {
      props.ActionbarData.actionOptions = event.target.value;
      selectOptions();
    } else if (type === "script") {
      setCurrentCode(newname);
    }
    props.updateAppComponent(clone);
  };

  const selectOptions = () => {
    var newname = props.ActionbarData.actionOptions;
    let arr1 = clone.script.filter((d) => {
      if (d.event === eventtype && d.option.length === newname.length) {
        if (JSON.stringify(d.option) === JSON.stringify(newname)) {
          return d;
        }
      }
      return null;
    });

    if (arr1.length === 0) {
      setOptionNo(newname);
      setCurrentCode("//Add Code");
    } else {
      setOptionNo(arr1[0].option);
      setCurrentCode(arr1[0].usercode);
    }
  };

  const handleChangeName = (index, event) => {
    var clone = Object.assign(props.ActionbarData, {});
    let newname = event.target.value;
    clone.names[index] = newname;
    props.updateAppComponent(clone);
  };
  const printcheckboxID = () => {
    var count = props.ActionbarData.names;
    var i = -1;
    var names = count.map(function (name) {
      i = i + 1;
      return (
        <div key={"listitem" + props.ActionbarData.checkboxID[i]}>
          <ListItem>
            {name} : {props.ActionbarData.checkboxID[i]}
          </ListItem>
        </div>
      );
    });
    return names;
  };

  const loopforeventmenu = () => {
    var count = props.ActionbarData.names;
    var namesList = count.map(function (menuname) {
      return (
        <MenuItem
          key={menuname}
          value={menuname}
          style={getStyles(menuname, props.ActionbarData.actionOptions, theme)}
        >
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
        Select checkbox :<br></br>
        <Select
          id="demo-mutiple-name"
          style={{ color: "inherit", width: 250 }}
          multiple
          value={props.ActionbarData.actionOptions}
          onChange={(event) => {
            handleChange("option", event);
          }}
          input={<Input />}
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
      <ListItem>checkbox ID's - </ListItem>
      {"\n"} {printcheckboxID()}
    </div>
  );
}
