import React from "react";
import {
  TextField,
  ListItem,
  List,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";

export default function DividerAction(props) {
  const handleChange = (type, event) => {
    const clone = Object.assign(props.ActionbarData, {});
    const value = event.target.value;
    if (type === "colour") clone.colour = value;
    else if (type === "thickness") clone.thickness = value;
    else if (type === "styleType") clone.styleType = value;
    props.updateAppComponent(clone);
  };

  return (
    <List>
      <ListItem>
        <TextField
          fullWidth
          label="Colour"
          value={props.ActionbarData.colour || ""}
          onChange={(event) => handleChange("colour", event)}
        />
      </ListItem>
      <ListItem>
        <TextField
          fullWidth
          type="number"
          label="Thickness"
          value={props.ActionbarData.thickness || 1}
          onChange={(event) => handleChange("thickness", event)}
        />
      </ListItem>
      <ListItem>
        <FormControl fullWidth>
          <InputLabel>Style</InputLabel>
          <Select
            value={props.ActionbarData.styleType || "solid"}
            onChange={(event) => handleChange("styleType", event)}
          >
            <MenuItem value="solid">Solid</MenuItem>
            <MenuItem value="dashed">Dashed</MenuItem>
            <MenuItem value="dotted">Dotted</MenuItem>
          </Select>
        </FormControl>
      </ListItem>
    </List>
  );
}
