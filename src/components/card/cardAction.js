import React from "react";
import { TextField, ListItem, List } from "@material-ui/core";

export default function CardAction(props) {
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
          label="Title"
          value={props.ActionbarData.title || ""}
          onChange={(event) => handleChange("title", event)}
        />
      </ListItem>
      <ListItem>
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Body"
          value={props.ActionbarData.body || ""}
          onChange={(event) => handleChange("body", event)}
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
          label="Text colour"
          value={props.ActionbarData.textColour || ""}
          onChange={(event) => handleChange("textColour", event)}
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
      <ListItem>
        <TextField
          fullWidth
          type="number"
          label="Radius"
          value={props.ActionbarData.radius || 12}
          onChange={(event) => handleChange("radius", event)}
        />
      </ListItem>
    </List>
  );
}
