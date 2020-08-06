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
} from "@material-ui/core";
import { SketchPicker } from "react-color";
import PaletteIcon from "@material-ui/icons/Palette";

export default class LabelAction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openPalette: false,
      openTextPalette: false,
    };
    this.setOpenPalette = this.setOpenPalette.bind(this);
    this.setOpenTextPalette = this.setOpenTextPalette.bind(this);
  }
  setOpenPalette(d) {
    this.setState({
      openPalette: d,
    });
  }
  setOpenTextPalette(d) {
    this.setState({
      openTextPalette: d,
    });
  }
  handlePaletteOpen = () => {
    this.setOpenPalette(true);
  };
  handlePaletteClose = () => {
    this.setOpenPalette(false);
  };
  handleTextPaletteOpen = () => {
    this.setOpenTextPalette(true);
  };
  handleTextPaletteClose = () => {
    this.setOpenTextPalette(false);
  };
  handleChangeTextColor = (color) => {
    this.props.ActionbarData.textColour = color.hex;
    console.log(this.props.ActionbarData.textColour);
    this.props.updateAppComponent(this.props.ActionbarData.textColour);
  };
  handleChangeBackgroundColor = (color) => {
    this.props.ActionbarData.backgroundColour = color.hex;
    console.log(this.props.ActionbarData.backgroundColour);
    this.props.updateAppComponent(this.props.ActionbarData.backgroundColour);
  };

  render() {
    const handleChange = (type, event) => {
      var clone = Object.assign(this.props.ActionbarData, {});
      let newname = event.target.value;
      if (type === "label") {
        clone.inputText = newname;
      } else if (type === "fontSize") {
        clone.fontSize = newname;
      } else if (type === "font") {
        clone.font = newname;
      } else if (type === "alignment") {
        clone.alignment = newname;
      } else if (type === "backgroundColour") {
        clone.backgroundColour = newname;
      } else if (type === "textColour") {
        clone.textColour = newname;
      }
      this.props.updateAppComponent(clone);
    };

    return (
      <div>
        <ListItem>
          <TextField
            label="Text"
            multiline={true}
            value={this.props.ActionbarData.inputText}
            onChange={(event) => {
              handleChange("label", event);
            }}
          ></TextField>
        </ListItem>
        <ListItem>
          <TextField
            label="Background Colour"
            value={this.props.ActionbarData.backgroundColour}
            onChange={(event) => {
              handleChange("backgroundColour", event);
            }}
          ></TextField>
          <button variant="outlined" onClick={this.handlePaletteOpen}>
            <PaletteIcon></PaletteIcon>
          </button>
        </ListItem>
        <Dialog open={this.state.openPalette} onClose={this.handlePaletteClose}>
          <DialogContent>
            <SketchPicker
              color={this.props.ActionbarData.backgroundColour}
              width="350px"
              height="500px"
              onChangeComplete={this.handleChangeBackgroundColor}
            />
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              variant="outlined"
              onClick={this.handlePaletteClose}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <ListItem>
          <TextField
            label="Text Colour"
            value={this.props.ActionbarData.textColour}
            onChange={(event) => {
              handleChange("textColour", event);
            }}
          ></TextField>
          <button variant="outlined" onClick={this.handleTextPaletteOpen}>
            <PaletteIcon></PaletteIcon>
          </button>
        </ListItem>
        <Dialog
          open={this.state.openTextPalette}
          onClose={this.handleTextPaletteClose}
        >
          <DialogContent>
            <SketchPicker
              color={this.props.ActionbarData.textColour}
              width="350px"
              height="500px"
              onChangeComplete={this.handleChangeTextColor}
            />
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              variant="outlined"
              onClick={this.handleTextPaletteClose}
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
              value={this.props.ActionbarData.font}
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
            label="Alignment"
            value={this.props.ActionbarData.alignment}
            onChange={(event) => {
              handleChange("alignment", event);
            }}
          ></TextField>
        </ListItem>
        <ListItem>
          <TextField
            label="Font Size"
            value={this.props.ActionbarData.fontSize}
            onChange={(event) => {
              handleChange("fontSize", event);
            }}
          ></TextField>
        </ListItem>
      </div>
    );
  }
}
