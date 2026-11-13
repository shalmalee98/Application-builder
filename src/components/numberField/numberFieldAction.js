import React from "react";
import { TextField, ListItem, List } from "@material-ui/core";

export default function NumberFieldAction(props) {
  const handleChange = (type, event) => {
    const clone = Object.assign(props.ActionbarData, {});
    clone[type] = event.target.value;
    props.updateAppComponent(clone);
  };

  return (
    <List>
      <ListItem>
        <TextField
          fullWidth
          label="Label"
          value={props.ActionbarData.fieldLabel || ""}
          onChange={(event) => handleChange("fieldLabel", event)}
        />
      </ListItem>
      <ListItem>
        <TextField
          fullWidth
          type="number"
          label="Default value"
          value={props.ActionbarData.value}
          onChange={(event) => handleChange("value", event)}
        />
      </ListItem>
      <ListItem>
        <TextField
          fullWidth
          type="number"
          label="Min"
          value={props.ActionbarData.min}
          onChange={(event) => handleChange("min", event)}
        />
      </ListItem>
      <ListItem>
        <TextField
          fullWidth
          type="number"
          label="Max"
          value={props.ActionbarData.max}
          onChange={(event) => handleChange("max", event)}
        />
      </ListItem>
      <ListItem>
        <TextField
          fullWidth
          type="number"
          label="Step"
          value={props.ActionbarData.step || 1}
          onChange={(event) => handleChange("step", event)}
        />
      </ListItem>
    </List>
  );
}
