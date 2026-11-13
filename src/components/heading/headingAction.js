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

export default function HeadingAction(props) {
  const handleChange = (type, event) => {
    const clone = Object.assign(props.ActionbarData, {});
    const value = event.target.value;
    if (type === "text") clone.text = value;
    else if (type === "level") clone.level = value;
    else if (type === "fontSize") clone.fontSize = value;
    else if (type === "font") clone.font = value;
    else if (type === "alignment") clone.alignment = value;
    else if (type === "textColour") clone.textColour = value;
    props.updateAppComponent(clone);
  };

  return (
    <List>
      <ListItem>
        <TextField
          fullWidth
          label="Text"
          value={props.ActionbarData.text || ""}
          onChange={(event) => handleChange("text", event)}
        />
      </ListItem>
      <ListItem>
        <FormControl fullWidth>
          <InputLabel>Level</InputLabel>
          <Select
            value={props.ActionbarData.level || "h2"}
            onChange={(event) => handleChange("level", event)}
          >
            <MenuItem value="h1">H1</MenuItem>
            <MenuItem value="h2">H2</MenuItem>
            <MenuItem value="h3">H3</MenuItem>
            <MenuItem value="h4">H4</MenuItem>
          </Select>
        </FormControl>
      </ListItem>
      <ListItem>
        <TextField
          fullWidth
          type="number"
          label="Font size"
          value={props.ActionbarData.fontSize || 28}
          onChange={(event) => handleChange("fontSize", event)}
        />
      </ListItem>
      <ListItem>
        <TextField
          fullWidth
          label="Text colour"
          value={props.ActionbarData.textColour || ""}
          onChange={(event) => handleChange("textColour", event)}
        />
      </ListItem>
      <ListItem>
        <FormControl fullWidth>
          <InputLabel>Align</InputLabel>
          <Select
            value={props.ActionbarData.alignment || "left"}
            onChange={(event) => handleChange("alignment", event)}
          >
            <MenuItem value="left">Left</MenuItem>
            <MenuItem value="center">Center</MenuItem>
            <MenuItem value="right">Right</MenuItem>
          </Select>
        </FormControl>
      </ListItem>
    </List>
  );
}
