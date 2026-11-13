import React from "react";
import { ListItem, List, FormControlLabel, Switch } from "@material-ui/core";

export default function SpacerAction(props) {
  return (
    <List>
      <ListItem>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={props.ActionbarData.showGuides !== false}
              onChange={(event) => {
                const clone = Object.assign(props.ActionbarData, {});
                clone.showGuides = event.target.checked;
                props.updateAppComponent(clone);
              }}
            />
          }
          label="Show editor guides"
        />
      </ListItem>
      <ListItem>
        <p style={{ margin: 0, fontSize: 12, color: "#4f7382", lineHeight: 1.45 }}>
          Spacers are layout-only. Guides are hidden in the saved HTML preview.
        </p>
      </ListItem>
    </List>
  );
}
