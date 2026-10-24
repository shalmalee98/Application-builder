import React from "react";
import { Dialog, DialogContent, DialogActions, Button } from "@material-ui/core";
import { SketchPicker } from "react-color";
import PaletteIcon from "@material-ui/icons/Palette";

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
      clone.height = parseInt(newname, 10);
    } else if (type === "width") {
      clone.width = parseInt(newname, 10);
    } else if (type === "colour") {
      clone.colour = newname;
    }
    props.updateAppComponent(clone);
  };

  return (
    <div>
      <p className="ab-inspector-heading">Page</p>
      <label className="ab-inspector-field">
        <span>Height</span>
        <input
          className="ab-field !rounded-lg !px-3 !py-2 !text-sm"
          type="number"
          value={props.formdata.height}
          onChange={(event) => handleChange("height", event)}
        />
      </label>
      <label className="ab-inspector-field">
        <span>Width</span>
        <input
          className="ab-field !rounded-lg !px-3 !py-2 !text-sm"
          type="number"
          value={props.formdata.width}
          onChange={(event) => handleChange("width", event)}
        />
      </label>
      <label className="ab-inspector-field">
        <span>Background</span>
        <div className="flex items-center gap-2">
          <input
            className="ab-field !rounded-lg !px-3 !py-2 !text-sm"
            value={props.formdata.colour || ""}
            onChange={(event) => handleChange("colour", event)}
          />
          <button
            type="button"
            className="ab-btn-secondary !px-2.5 !py-2"
            onClick={handlePaletteOpen}
            title="Pick color"
            aria-label="Open color picker"
          >
            <span
              className="inline-block h-4 w-4 rounded border border-ink-200"
              style={{ background: props.formdata.colour || "#ffffff" }}
            />
            <PaletteIcon fontSize="small" />
          </button>
        </div>
      </label>

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
          <Button color="primary" variant="outlined" onClick={handlePaletteClose}>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
