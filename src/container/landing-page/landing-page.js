import React from "react";
import { TextField, Button } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Alert from '@material-ui/lab/Alert';
import "./landing-page.css";

import { getApplicationJson } from "../../services/services";
import { getApplicationList } from "../../services/services";

export default function LandingPage(props) {
  const [apps, setApps] = React.useState({});
  const [dialogOpen, setDialogOpen] = React.useState(false);
  let arr = [];

  const handleAppname = (event) => {
    props.setAppName(event.target.value);
  }
  const openApp = () => {
    getApplicationList().then((data) => {
      if (data === undefined) {
        props.openApplication();
      } else if (Object.keys(data).length !== 0) {
        Object.keys(data).map((key) => {
          arr.push(key);
        });
        for(let i=0; i<arr.length; i++){
          if(arr[i] === props.appName){
            alert("This application already exists");
            handleListItemClick(arr[i]);
          } else {
            props.openApplication();
          }
        }
      }  
    });
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const openExistingApplication = () => {
    getApplicationList().then((data) => {
      if (data === undefined) {
        return null;
      } else if (Object.keys(data).length !== 0) {
        Object.keys(data).map((key) => {
          arr.push(key);
          return arr;
        });
        setApps(data);
        setDialogOpen(true);
      } else {
        alert("No existing applications!");
      }
    });
  };
  const handleListItemClick = (appName) => {
    setDialogOpen(false);
    props.setAppName(appName);
    getApplicationJson(appName).then((form) => {
      let bg = "";
      let style = form.style;
      props.setComponentID(form.componentID);
      props.setAppComponent(form.components);
      Object.keys(style).map((key) => {
        if (key === "background-color") {
          bg = style[key];
        }
        return bg;
      });
      let data = {
        width: form.width,
        height: form.height,
        style: form.style,
        components: form.components,
      };
      let formdata = {
        id: "form_1",
        type: "Form",
        label: "Form",
        colour: bg,
        width: form.width,
        height: form.height,
      };
      props.setFormdata(formdata);
      props.setJsonForm(data);
      props.openApplication();
    });
  };

  return (
    <form>
      <h1 align="center">NEW APPLICATION</h1>
      <br></br>
      <TextField
        style={{ width: 560 }}
        autoFocus
        margin="dense"
        id="appname"
        inputMode="text"
        name="appname"
        label="Enter Application name"
        type="text"
        fullWidth
        onChange={handleAppname}
        required
      ></TextField>
      <br></br>
      <br></br>
      <div className="alignment">
        <Button onClick={openExistingApplication} color="primary">
          Open Existing
        </Button>
        {dialogOpen && (
          <Dialog onClose={handleDialogClose} open={dialogOpen}>
            <DialogTitle id="simple-dialog-title">
              List of applications
            </DialogTitle>
            <List>
              {Object.keys(apps).map((key, i) => (
                <ListItem
                  button
                  onClick={() => handleListItemClick(key)}
                  key={i}
                >
                  <ListItemText primary={key} secondary={apps[key]}>
                    {apps[key]}{" "}
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </Dialog>
        )}
        <Button
          disabled={props.startAppButton}
          // onClick={props.openApplication}
          onClick={openApp}
          color="primary"
        >
          Open New Application
        </Button>
      </div>
      <br></br>
      <br></br>
    </form>
  );
}
