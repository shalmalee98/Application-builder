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
} from "@material-ui/core";
import { SketchPicker } from "react-color";
import PaletteIcon from "@material-ui/icons/Palette";
import CancelIcon from "@material-ui/icons/Cancel";
import image1 from "../../static/image1.jpg";
import image2 from "../../static/image2.jpg";
import image3 from "../../static/image3.jpg";
import image4 from "../../static/image4.jpg";
import image5 from "../../static/image5.png";
import image7 from "../../static/image7.jpg";
import image8 from "../../static/image8.jpg";
import image9 from "../../static/image9.jpg";
import image10 from "../../static/image10.jpg";
import download from "../../static/download.jpg";
import download1 from "../../static/download1.jpg";
import download2 from "../../static/download2.jpg";
import download3 from "../../static/download3.jpg";

export default function ImageAction(props) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDialog1, setOpenDialog1] = React.useState(false);
  const [eventtype, setEventtype] = React.useState("");
  const [currentCode, setCurrentCode] = React.useState("");
  const [openBorderPalette, setOpenBorderPalette] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };
  const handleClose1 = () => {
    setEventtype("");
    setCurrentCode("");
    setOpenDialog1(false);
  };
  const handleSubmit = () => {
    var clone = Object.assign(props.ActionbarData, {});
    let arr1 = clone.script.filter((d) => d.event === eventtype);

    if (arr1.length === 0) {
      var obj = { event: eventtype, code: currentCode, id: clone.id };
      clone.script.push(obj);
    } else {
      setEventtype(arr1[0].event);
      arr1[0].code = currentCode;
    }
    props.updateAppComponent(clone);
    setEventtype("");
    setCurrentCode("");
    setOpenDialog1(false);
  };
  const handleClickOpen1 = () => {
    setOpenDialog1(true);
  };

  const handleChangeBorderColor = (color) => {
    var clone = Object.assign(props.ActionbarData, {});
    clone.borderColour = color.hex;

    props.updateAppComponent(clone);
  };

  const handleBorderPaletteOpen = () => {
    setOpenBorderPalette(true);
  };
  const handleBorderPaletteClose = () => {
    setOpenBorderPalette(false);
  };

  const handleImageSelect = (event) => {
    var clone = Object.assign(props.ActionbarData, {});
    let newname = event.target.src;

    clone.image = newname;
    props.updateAppComponent(clone);
  };

  const handleChange = (type, event) => {
    var clone = Object.assign(props.ActionbarData, {});
    let newname = event.target.value;

    if (type === "alt") {
      clone.alt = newname;
    } else if (type === "border") {
      clone.border = newname;
    } else if (type === "borderColour") {
      clone.borderColour = newname;
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
        <Button fullWidth variant="outlined" onClick={handleClickOpen}>
          Select Image
        </Button>
      </ListItem>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogActions>
          <Button color="secondary" variant="outlined">
            <CancelIcon onClick={handleClose}></CancelIcon>
          </Button>
        </DialogActions>
        <DialogTitle id="form-dialog-title">Select Image</DialogTitle>

        <DialogContent>
          <img
            className="img2"
            src={download}
            height={200}
            width={200}
            onClick={(event) => {
              handleImageSelect(event);
            }}
          ></img>
          <img
            className="img2"
            src={download1}
            height={200}
            width={200}
            onClick={(event) => {
              handleImageSelect(event);
            }}
          ></img>
          <img
            className="img2"
            src={download2}
            height={200}
            width={200}
            onClick={(event) => {
              handleImageSelect(event);
            }}
          ></img>
          <img
            className="img2"
            src={download3}
            height={200}
            width={200}
            onClick={(event) => {
              handleImageSelect(event);
            }}
          ></img>
          <img
            className="img2"
            src={image2}
            height={200}
            width={200}
            onClick={(event) => {
              handleImageSelect(event);
            }}
          ></img>
          {"  "}
          <img
            className="img2"
            src={image3}
            height={200}
            width={200}
            onClick={(event) => {
              handleImageSelect(event);
            }}
          ></img>
          <img
            className="img2"
            src={image1}
            height={200}
            width={200}
            onClick={(event) => {
              handleImageSelect(event);
            }}
          ></img>
          {"  "}
          <img
            className="img2"
            src={image4}
            height={200}
            width={200}
            onClick={(event) => {
              handleImageSelect(event);
            }}
          ></img>
          <img
            className="img2"
            src={image5}
            height={200}
            width={200}
            onClick={(event) => {
              handleImageSelect(event);
            }}
          ></img>
          <img
            className="img2"
            src={image7}
            height={200}
            width={200}
            onClick={(event) => {
              handleImageSelect(event);
            }}
          ></img>{" "}
          <img
            className="img2"
            src={image8}
            height={200}
            width={200}
            onClick={(event) => {
              handleImageSelect(event);
            }}
          ></img>
          <img
            className="img2"
            src={image9}
            height={200}
            width={200}
            onClick={(event) => {
              handleImageSelect(event);
            }}
          ></img>{" "}
          <img
            className="img2"
            src={image10}
            height={200}
            width={200}
            onClick={(event) => {
              handleImageSelect(event);
            }}
          ></img>
        </DialogContent>
      </Dialog>

      <ListItem>
        <TextField
          label="Alternate Text"
          value={props.ActionbarData.alt}
          onChange={(event) => {
            handleChange("alt", event);
          }}
        />
      </ListItem>
      <ListItem>
        <TextField
          label="Border Thickness"
          value={props.ActionbarData.border}
          onChange={(event) => {
            handleChange("border", event);
          }}
        />
      </ListItem>
      <ListItem>
        <TextField
          label="Border Colour"
          value={props.ActionbarData.borderColour}
          onChange={(event) => {
            handleChange("borderColour", event);
          }}
        ></TextField>
        <button variant="outlined" onClick={handleBorderPaletteOpen}>
          <PaletteIcon></PaletteIcon>
        </button>
      </ListItem>
      <Dialog open={openBorderPalette} onClose={handleBorderPaletteClose}>
        <DialogContent>
          <SketchPicker
            color={props.ActionbarData.borderColour}
            width="350px"
            height="500px"
            onChangeComplete={handleChangeBorderColor}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="outlined"
            onClick={handleBorderPaletteClose}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <ListItem>
        <Button fullWidth variant="outlined" onClick={handleClickOpen1}>
          Add Event
        </Button>
      </ListItem>
      <Dialog open={openDialog1} onClose={handleClose1}>
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
          <Button color="primary" variant="outlined" onClick={handleClose1}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </List>
  );
}
