import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DeleteIcon from "@material-ui/icons/Delete";

import "../action-bar/action-bar.css";
import { TextField, ListItem, Button } from "@material-ui/core";
import ButtonAction from "../../components/button/buttonAction";
import TextboxAction from "../../components/textbox/textboxAction";
import RadiobuttonAction from "../../components/radiobutton/radiobuttonAction";
import LabelAction from "../../components/label/labelAction";
import FormAction from "../application/formAction";
import CheckboxAction from "../../components/checkbox/checkboxAction";
import LineChartAction from "../../components/charts/line-chart/lineChartAction";
import BarChartAction from "../../components/charts/barchart/barChartAction";
import LinkAction from "../../components/anchor_tag/anchor_tagAction";
import PieChartAction from "../../components/charts/pie-chart/pieChartAction";
import GeoChartAction from "../../components/charts/geo-chart/geoChartAction";
import TextAreaAction from "../../components/textArea/textAreaAction";
import TableChartAction from "../../components/charts/table/tableAction";
import ImageAction from "../../components/image/imageAction";
import DropdownAction from "../../components/dropdown/dropdownAction";

export default class ActionBar extends React.Component {
  render() {
    const handleDrawerClose = () => {
      this.props.setOpenActionBar(false);
    };
    const handleDrawerOpen = () => {
      this.props.setOpenActionBar(true);
    };
    const handleComponentDelete = (compId) => {
      this.props.handleComponentDelete(compId);
      handleDrawerClose();
      this.props.setActionbarData({});
    };

    const handleChange = (type, event) => {
      var clone = Object.assign(this.props.ActionbarData, {});
      let newname = event.target.value;
      if (type === "x") {
        clone.Rndprops.x = newname;
      } else if (type === "height") {
        clone.Rndprops.height = newname;
      } else if (type === "width") {
        clone.Rndprops.width = newname;
      } else if (type === "y") {
        clone.Rndprops.y = newname;
      }
      this.props.updateAppComponent(clone);
    };
    const renderComponentParams = () => {
      return (
        <div>
          <ListItem>
            <TextField
              label="ID"
              value={this.props.ActionbarData.id}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              label="Height"
              value={this.props.ActionbarData.Rndprops.height}
              onChange={(event) => {
                handleChange("height", event);
              }}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              label="Width"
              value={this.props.ActionbarData.Rndprops.width}
              onChange={(event) => {
                handleChange("width", event);
              }}
            ></TextField>
          </ListItem>

          <ListItem style={{ fontSize: 13, color: "grey" }}>
            Position :
          </ListItem>
          <ListItem>
            <TextField
              label="x :"
              value={this.props.ActionbarData.Rndprops.x}
              onChange={(event) => {
                handleChange("x", event);
              }}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              label="y :"
              value={this.props.ActionbarData.Rndprops.y}
              onChange={(event) => {
                handleChange("y", event);
              }}
            ></TextField>
          </ListItem>
          <ListItem style={{ justifyContent: "center" }}>
            <Button
              variant="outlined"
              onClick={() => handleComponentDelete(this.props.ActionbarData.id)}
            >
              <DeleteIcon></DeleteIcon>
            </Button>
          </ListItem>
        </div>
      );
    };
    const renderActionComponent = (type) => {
      if (type === "Form") {
        return (
          <FormAction
            formdata={this.props.formdata}
            setFormdata={this.props.setFormdata}
            ActionbarData={this.props.ActionbarData}
            updateAppComponent={this.props.updateAppComponent}
          ></FormAction>
        );
      } else {
        if (type === "Button") {
          return (
            <div>
              <ButtonAction
                handleComponentDelete={this.props.handleComponentDelete}
                ActionbarData={this.props.ActionbarData}
                updateAppComponent={this.props.updateAppComponent}
              ></ButtonAction>
              {renderComponentParams()}
            </div>
          );
        }
        if (type === "Input Box") {
          return (
            <div>
              <TextboxAction
                ActionbarData={this.props.ActionbarData}
                updateAppComponent={this.props.updateAppComponent}
              ></TextboxAction>
              {renderComponentParams()}
            </div>
          );
        }
        if (type === "Multiline Input Box") {
          return (
            <div>
              <TextAreaAction
                ActionbarData={this.props.ActionbarData}
                updateAppComponent={this.props.updateAppComponent}
              ></TextAreaAction>
              {renderComponentParams()}
            </div>
          );
        }
        if (type === "Radiogroup") {
          return (
            <div>
              <RadiobuttonAction
                ActionbarData={this.props.ActionbarData}
                updateAppComponent={this.props.updateAppComponent}
              ></RadiobuttonAction>
              {renderComponentParams()}
            </div>
          );
        }
        if (type === "Label") {
          return (
            <div>
              <LabelAction
                ActionbarData={this.props.ActionbarData}
                updateAppComponent={this.props.updateAppComponent}
              ></LabelAction>
              {renderComponentParams()}
            </div>
          );
        }
        if (type === "Checkbox") {
          return (
            <div>
              <CheckboxAction
                ActionbarData={this.props.ActionbarData}
                updateAppComponent={this.props.updateAppComponent}
              ></CheckboxAction>
              {renderComponentParams()}
            </div>
          );
        }
        if (type === "Link") {
          return (
            <div>
              <LinkAction
                ActionbarData={this.props.ActionbarData}
                updateAppComponent={this.props.updateAppComponent}
              ></LinkAction>
              {renderComponentParams()}
            </div>
          );
        }
        if (type === "Linechart") {
          return (
            <div>
              <LineChartAction
                ActionbarData={this.props.ActionbarData}
                updateAppComponent={this.props.updateAppComponent}
              ></LineChartAction>
              {renderComponentParams()}
            </div>
          );
        }
        if (type === "Barchart") {
          return (
            <div>
              <BarChartAction
                ActionbarData={this.props.ActionbarData}
                updateAppComponent={this.props.updateAppComponent}
              />
              {renderComponentParams()}
            </div>
          );
        }
        if (type === "Piechart") {
          return (
            <div>
              <PieChartAction
                ActionbarData={this.props.ActionbarData}
                updateAppComponent={this.props.updateAppComponent}
              />
              {renderComponentParams()}
            </div>
          );
        }
        if (type === "Geochart") {
          return (
            <div>
              <GeoChartAction
                ActionbarData={this.props.ActionbarData}
                updateAppComponent={this.props.updateAppComponent}
              />
              {renderComponentParams()}
            </div>
          );
        }
      }
      if (type === "Tablechart") {
        return (
          <div>
            <TableChartAction
              ActionbarData={this.props.ActionbarData}
              updateAppComponent={this.props.updateAppComponent}
            />
            {renderComponentParams()}
          </div>
        );
      }
      if (type === "Image") {
        return (
          <div>
            <ImageAction
              ActionbarData={this.props.ActionbarData}
              updateAppComponent={this.props.updateAppComponent}
            />
            {renderComponentParams()}
          </div>
        );
      }
      if (type === "Dropdown") {
        return (
          <div>
            <DropdownAction
              ActionbarData={this.props.ActionbarData}
              updateAppComponent={this.props.updateAppComponent}
            />
            {renderComponentParams()}
          </div>
        );
      }
    };

    return (
      <Drawer
        variant="persistent"
        open={true}
        overflow="auto"
        className={
          this.props.openActionBar
            ? "drawer-open-actionbar"
            : "drawer-close-actionbar"
        }
        classes={{
          paper: this.props.openActionBar
            ? "drawer-open-actionbar"
            : "drawer-close-actionbar",
        }}
        anchor="right"
      >
        <div>
          {!this.props.openActionBar ? (
            <IconButton
              style={{ justifyContent: "flex-start", marginLeft: 4 }}
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
          ) : null}
          {this.props.openActionBar ? (
            <IconButton
              style={{ justifyContent: "flex-start", marginLeft: 4 }}
              onClick={handleDrawerClose}
            >
              <ChevronRightIcon />
            </IconButton>
          ) : null}
        </div>

        <Divider />
        {this.props.openActionBar ? (
          <ListItem
            style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
          >
            {this.props.ActionbarData.type}
          </ListItem>
        ) : null}
        <Divider />
        {this.props.openActionBar ? (
          <List>{renderActionComponent(this.props.ActionbarData.type)}</List>
        ) : null}
        {this.props.openActionBar ? (
          <List>
            <ListItem>
              <div style={{ height: 80 }} />
            </ListItem>
          </List>
        ) : null}
      </Drawer>
    );
  }
}
