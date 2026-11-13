import React from "react";
import { TextField, ListItem, List } from "@material-ui/core";

export default function DateFieldAction(props) {
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
          type="date"
          label="Default value"
          InputLabelProps={{ shrink: true }}
          value={props.ActionbarData.value || ""}
          onChange={(event) => handleChange("value", event)}
        />
      </ListItem>
      <ListItem>
        <TextField
          fullWidth
          label="Background"
          value={props.ActionbarData.backgroundColour || ""}
          onChange={(event) => handleChange("backgroundColour", event)}
        />
      </ListItem>
      <ListItem>
        <TextField
          fullWidth
          label="Border colour"
          value={props.ActionbarData.borderColour || ""}
          onChange={(event) => handleChange("borderColour", event)}
        />
      </ListItem>
    </List>
  );
}
