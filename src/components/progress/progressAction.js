import React from "react";
import {
  TextField,
  ListItem,
  List,
  FormControlLabel,
  Switch,
} from "@material-ui/core";

export default function ProgressAction(props) {
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
          type="number"
          label="Value"
          value={props.ActionbarData.value}
          onChange={(event) => handleChange("value", event)}
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
          label="Bar colour"
          value={props.ActionbarData.barColour || ""}
          onChange={(event) => handleChange("barColour", event)}
        />
      </ListItem>
      <ListItem>
        <TextField
          fullWidth
          label="Track colour"
          value={props.ActionbarData.trackColour || ""}
          onChange={(event) => handleChange("trackColour", event)}
        />
      </ListItem>
      <ListItem>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={props.ActionbarData.showLabel !== false}
              onChange={(event) => {
                const clone = Object.assign(props.ActionbarData, {});
                clone.showLabel = event.target.checked;
                props.updateAppComponent(clone);
              }}
            />
          }
          label="Show percent label"
        />
      </ListItem>
    </List>
  );
}
