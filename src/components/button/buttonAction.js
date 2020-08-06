import React from "react";
import {
  TextField,
  ListItem,
  List,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Select,
  MenuItem,
  TextareaAutosize,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { SketchPicker } from "react-color";
import PaletteIcon from "@material-ui/icons/Palette";

export default function ButtonAction(props) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openPalette, setOpenPalette] = React.useState(false);
  const [openTextPalette, setOpenTextPalette] = React.useState(false);
  const [eventtype, setEventtype] = React.useState("");
  const [currentCode, setCurrentCode] = React.useState("");
  let fontSizes = [];
  for (var i = 2; i < 40; i++) {
    if (i % 2 === 0) {
      fontSizes.push(i);
    }
  }

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
  const handlePaletteOpen = () => {
    setOpenPalette(true);
  };
  const handlePaletteClose = () => {
    setOpenPalette(false);
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
  const handleChangeBackgroundColor = (color) => {
    props.ActionbarData.backgroundColour = color.hex;
    console.log(props.ActionbarData.backgroundColour);
    props.updateAppComponent(props.ActionbarData.backgroundColour);
  };
  const handleChange = (type, event) => {
    var clone = Object.assign(props.ActionbarData, {});
    let newname = event.target.value;

    if (type === "label") {
      clone.label = newname;
    } else if (type === "backgroundColour") {
      clone.backgroundColour = newname;
    } else if (type === "textColour") {
      clone.textColour = newname;
    } else if (type === "fontSize") {
      clone.fontSize = newname;
    } else if (type === "font") {
      clone.font = newname;
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
      console.log(currentCode);
    }
    props.updateAppComponent(clone);
  };

  return (
    <List>
      <ListItem>
        <TextField
          label="Text"
          value={props.ActionbarData.label}
          onChange={(event) => {
            handleChange("label", event);
          }}
        ></TextField>
      </ListItem>
      <ListItem>
        <TextField
          label="Background Colour"
          value={props.ActionbarData.backgroundColour}
          onChange={(event) => {
            handleChange("backgroundColour", event);
          }}
        ></TextField>
        <button variant="outlined" onClick={handlePaletteOpen}>
          <PaletteIcon />
        </button>
      </ListItem>
      <Dialog open={openPalette} onClose={handlePaletteClose}>
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
            onClick={handlePaletteClose}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
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
            <MenuItem value="click">On Click</MenuItem>
            <MenuItem value="mouseover">On Hover</MenuItem>
            <MenuItem value="dblclick">On Double Click</MenuItem>
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
    </List>
  );
}
