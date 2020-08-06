import React from "react";
import {
  TextField,
  ListItem,
  List,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import { SketchPicker } from "react-color";
import PaletteIcon from "@material-ui/icons/Palette";
//import CancelIcon from "@material-ui/icons/Cancel";

export default function FormAction(props) {
  const [openPalette, setOpenPalette] = React.useState(false);

  const handlePaletteOpen = () => {
    setOpenPalette(true);
  };
  const handlePaletteClose = () => {
    setOpenPalette(false);
  };
  const handleChangeBackgroundColor = (color) => {
    var clone = Object.assign(props.ActionbarData, {});
    clone.colour = color.hex;
    props.updateAppComponent(clone);
  };

  const handleChange = (type, event) => {
    var clone = Object.assign(props.ActionbarData, {});
    let newname = event.target.value;

    if (type === "height") {
      clone.height = parseInt(newname);
    } else if (type === "width") {
      clone.width = parseInt(newname);
    } else if (type === "colour") {
      clone.colour = newname;
    }
    props.updateAppComponent(clone);
  };
  return (
    <List>
      <ListItem>
        <TextField
          type="number"
          label="Height"
          value={props.formdata.height}
          onChange={(event) => {
            handleChange("height", event);
          }}
        ></TextField>
      </ListItem>
      <ListItem>
        <TextField
          label="Width"
          type="number"
          value={props.formdata.width}
          onChange={(event) => {
            handleChange("width", event);
          }}
        ></TextField>
      </ListItem>

      <ListItem>
        <TextField
          label="Background Colour"
          value={props.formdata.colour}
          onChange={(event) => {
            handleChange("colour", event);
          }}
        ></TextField>
        <button variant="outlined" onClick={handlePaletteOpen}>
          <PaletteIcon></PaletteIcon>
        </button>
      </ListItem>
      <Dialog open={openPalette} onClose={handlePaletteClose}>
        <DialogContent>
          <SketchPicker
            color={props.formdata.colour}
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
          {/* <Button
            color="primary"
            variant="outlined"
            onClick={handlePaletteClose}
          >
            Cancel
          </Button> */}
        </DialogActions>
      </Dialog>
    </List>
  );
}
