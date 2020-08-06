import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SaveIcon from "@material-ui/icons/Save";
import { List, ListItemIcon } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import "./header.css";

export default function Header(props) {
  let path = "http://localhost:8081/Projects/" + props.appName + "/index.html";

  const clickDownload = () => {
    return alert(
      "Your Project has been downloaded at the following path : \n 'C:/Users/shalm/Desktop/ApplicationBuilder/applicationbuilder/build/Projects/" +
        props.appName +
        "'"
    );
  };

  return (
    <div>
      <AppBar>
        <Toolbar style={{ float: "none" }}>
          <Typography component="h1" variant="h6" color="inherit" noWrap>
            Application Builder
          </Typography>
          {props.open && (
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              style={{ position: "relative", left: "25%" }}
            >
              {props.appName}
            </Typography>
          )}

          {props.open && (
            <div style={{ position: "absolute", right: "5px", float: "none" }}>
              <List style={{ display: "flex" }}>
                <ListItem
                  button
                  onClick={props.saveApp}
                  style={{
                    paddingTop: 0,
                    paddingBottom: 0,
                  }}
                >
                  <ListItemIcon
                    style={{
                      color: "white",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <SaveIcon fontSize="large" titleAccess="Save" />
                  </ListItemIcon>
                </ListItem>
                <ListItem
                  button
                  style={{ paddingTop: 0, paddingBottom: 0 }}
                  disabled={props.startbuttons}
                >
                  <ListItemIcon
                    style={{
                      color: "white",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <a
                      href={path}
                      target="_blank"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      <PlayCircleOutlineIcon
                        style={{}}
                        titleAccess="Run"
                        fontSize="large"
                      />
                    </a>
                  </ListItemIcon>
                </ListItem>
                <ListItem
                  button
                  style={{ paddingTop: 0, paddingBottom: 0 }}
                  onClick={clickDownload}
                  disabled={props.startbuttons}
                >
                  <ListItemIcon
                    style={{
                      color: "white",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <SaveAltIcon fontSize="large" titleAccess="Download" />
                  </ListItemIcon>
                </ListItem>
              </List>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
