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

export default function DropdownAction(props) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openTextPalette, setOpenTextPalette] = React.useState(false);
  const [openBackgroundPalette, setOpenBackgroundPalette] = React.useState(
    false
  );
  const [eventtype, setEventtype] = React.useState("");
  const [currentCode, setCurrentCode] = React.useState("");
  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setEventtype("");
    setCurrentCode("");
    setOpenDialog(false);
  };
  const handleSubmit = () => {
    var clone = Object.assign(props.ActionbarData, {});
    let arr1 = clone.script.filter((d) => d.event === eventtype);

    if (arr1.length === 0) {
      var obj = { event: eventtype, code: currentCode, id: clone.id };
      clone.script.push(obj);
      // setEventtype(newname);
      // setCurrentCode("//Add Code");
    } else {
      setEventtype(arr1[0].event);
      arr1[0].code = currentCode;
      // setCurrentCode(arr1[0].code);
    }
    props.updateAppComponent(clone);
    setEventtype("");
    setCurrentCode("");
    setOpenDialog(false);
  };
  const handleTextPaletteOpen = () => {
    setOpenTextPalette(true);
  };
  const handleTextPaletteClose = () => {
    setOpenTextPalette(false);
  };
  const handleBackgroundPaletteOpen = () => {
    setOpenBackgroundPalette(true);
  };
  const handleBackgroundPaletteClose = () => {
    setOpenBackgroundPalette(false);
  };
  const handleChangeTextColor = (color) => {
    props.ActionbarData.textColour = color.hex;
    console.log(props.ActionbarData.textColour);
    props.updateAppComponent(props.ActionbarData.textColour);
  };
  const handleChangeBackgroundColor = (color) => {
    props.ActionbarData.backgroundColour = color.hex;
    console.log(props.ActionbarData.backgroundColour);
    props.updateAppComponent(props.ActionbarData.backgroundColour);
  };
  const handleChange = (type, event) => {
    var clone = Object.assign(props.ActionbarData, {});

    let newname = event.target.value;
    if (type === "number") {
      clone.number = newname;
      let temp = [];
      let temp2 = [];

      for (let j = 1; j <= newname; j++) {
        temp.push("Option " + j);
        temp2.push(clone.id + "-Option" + j);
      }
      clone.names = temp;
      clone.dropdownID = temp2;
      console.log(temp2);
    } else if (type === "title") {
      clone.title = newname;
    } else if (type === "fontSize") {
      clone.fontSize = newname;
    } else if (type === "font") {
      clone.font = newname;
    } else if (type === "selection") {
      clone.defaultvalue = newname;
    } else if (type === "backgroundColour") {
      clone.backgroundColour = newname;
    } else if (type === "multiple") {
      clone.multiple = newname;
    } else if (type === "event") {
      let arr1 = clone.script.filter((d) => d.event === newname);

      if (arr1.length === 0) {
        setEventtype(newname);
        setCurrentCode("//Add Code");
      } else {
        setEventtype(arr1[0].event);
        setCurrentCode(arr1[0].code);
      }
    } else if (type === "script") {
      setCurrentCode(newname);
    }
    props.updateAppComponent(clone);
  };

  const handleChangeName = (index, event) => {
    var clone = Object.assign(props.ActionbarData, {});
    let newname = event.target.value;
    clone.names[index] = newname;
    clone.dropdownID[index] = clone.id + "-" + newname;
    props.updateAppComponent(clone);
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
      <ListItem style={{ fontSize: 13, color: "grey" }}>Text</ListItem>
      <ListItem>{looping()}</ListItem>
      <br></br>
      <Divider></Divider>
      <br></br>
      <ListItem>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Multiple Selection
          </InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.ActionbarData.multiple}
            onChange={(event) => {
              handleChange("multiple", event);
            }}
          >
            <MenuItem value={true}>True</MenuItem>
            <MenuItem value={false}>False</MenuItem>
          </Select>
        </FormControl>
      </ListItem>
      <ListItem>
        <TextField
          label="Text Colour"
          value={props.ActionbarData.textColour}
          onChange={(event) => {
            handleChange("textColour", event);
          }}
        ></TextField>
        <button variant="outlined" onClick={handleTextPaletteOpen}>
          <PaletteIcon onClick={handleTextPaletteOpen}></PaletteIcon>
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
        <TextField
          label="Background Colour"
          value={props.ActionbarData.backgroundColour}
          onChange={(event) => {
            handleChange("backgroundColour", event);
          }}
        ></TextField>
        <button variant="outlined" onClick={handleBackgroundPaletteOpen}>
          <PaletteIcon></PaletteIcon>
        </button>
      </ListItem>
      <Dialog
        open={openBackgroundPalette}
        onClose={handleBackgroundPaletteClose}
      >
        <DialogContent>
          <SketchPicker
            color={props.ActionbarData.backgroundColour}
            width="350px"
            height="500px"
            onChangeComplete={handleChangeBackgroundColor}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="outlined"
            onClick={handleBackgroundPaletteClose}
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
          Select Event:<br></br>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={eventtype}
            onChange={(event) => {
              handleChange("event", event);
            }}
            style={{ color: "inherit", width: 300 }}
          >
            <MenuItem value="change">On Change</MenuItem>
          </Select>
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
          <DialogActions>
            <Button color="primary" variant="outlined" onClick={handleSubmit}>
              Submit
            </Button>
            <Button color="primary" variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}
