import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import ShowChartOutlinedIcon from "@material-ui/icons/ShowChartOutlined";
import InsertChartOutlinedIcon from "@material-ui/icons/InsertChartOutlined";
import PieChartIcon from "@material-ui/icons/PieChart";
import MapIcon from "@material-ui/icons/Map";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import RadioButtonCheckedOutlinedIcon from "@material-ui/icons/RadioButtonCheckedOutlined";
import Crop54RoundedIcon from "@material-ui/icons/Crop54Rounded";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";
import LinkIcon from "@material-ui/icons/Link";
import TableChartIcon from "@material-ui/icons/TableChart";
import ImageIcon from "@material-ui/icons/Image";
import ArrowDropDownCircleIcon from "@material-ui/icons/ArrowDropDownCircle";
import "./side-nav.css";

import { defaultprops as buttonProps } from "../../components/button/button";
import { defaultprops as textboxProps } from "../../components/textbox/textbox";
import { defaultprops as textareaProps } from "../../components/textArea/textArea";
import { defaultprops as linechartProps } from "../../components/charts/line-chart/line-chart";
import { defaultprops as barchartProps } from "../../components/charts/barchart/barchart";
import { defaultprops as piechartProps } from "../../components/charts/pie-chart/pie-chart";
import { defaultprops as geochartProps } from "../../components/charts/geo-chart/geo-chart";
import { defaultprops as tablechartProps } from "../../components/charts/table/table";
import { defaultprops as radiogroupProps } from "../../components/radiobutton/radiobutton";
import { defaultprops as labelProps } from "../../components/label/label";
import { defaultprops as checkboxProps } from "../../components/checkbox/checkbox";
import { defaultprops as anchortagProps } from "../../components/anchor_tag/anchor_tag";
import { defaultprops as imageProps } from "../../components/image/image";
import { defaultprops as dropdownProps } from "../../components/dropdown/dropdown";

export default function SideNav(props) {
  const handleDrawerClose = () => {
    props.setOpenSideNav(false);
  };
  const handleDrawerOpen = () => {
    props.setOpenSideNav(true);
  };

  const handleComponentSelect = (type) => {
    if (type === "button") {
      props.handleComponentClick(buttonProps());
    } else if (type === "textbox") {
      props.handleComponentClick(textboxProps());
    } else if (type === "textarea") {
      props.handleComponentClick(textareaProps());
    } else if (type === "linechart") {
      props.handleComponentClick(linechartProps());
    } else if (type === "barchart") {
      props.handleComponentClick(barchartProps());
    } else if (type === "piechart") {
      props.handleComponentClick(piechartProps());
    } else if (type === "image") {
      props.handleComponentClick(imageProps());
    } else if (type === "geochart") {
      props.handleComponentClick(geochartProps());
    } else if (type === "radiogroup") {
      props.handleComponentClick(radiogroupProps());
    } else if (type === "label") {
      props.handleComponentClick(labelProps());
    } else if (type === "checkbox") {
      props.handleComponentClick(checkboxProps());
    } else if (type === "link") {
      props.handleComponentClick(anchortagProps());
    } else if (type === "tablechart") {
      props.handleComponentClick(tablechartProps());
    } else if (type === "dropdown") {
      props.handleComponentClick(dropdownProps());
    }
  };
  return (
    <Drawer
      variant="persistent"
      open={true}
      anchor="left"
      style={{ overflow: "hidden" }}
      className={props.openSideNav ? "drawer-open" : "drawer-close"}
      classes={{
        paper: props.openSideNav ? "drawer-open" : "drawer-close",
      }}
    >
      <div>
        {!props.openSideNav ? (
          <IconButton
            style={{ justifyContent: "flex-end", marginLeft: 4 }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
        ) : null}
        {props.openSideNav ? (
          <IconButton
            style={{ justifyContent: "flex-end" }}
            onClick={handleDrawerClose}
          >
            <ChevronLeftIcon />
          </IconButton>
        ) : null}
      </div>
      <Divider />
      <Divider />
      <List>
        <ListItem
          button
          onClick={() => {
            handleComponentSelect("button");
          }}
        >
          <ListItemIcon>
            <Crop54RoundedIcon />
          </ListItemIcon>
          Button
        </ListItem>
        <ListItem
          button
          onClick={() => {
            handleComponentSelect("textbox");
          }}
        >
          <ListItemIcon>
            <TextFieldsIcon />
          </ListItemIcon>
          Input Box
        </ListItem>
        <ListItem
          button
          onClick={() => {
            handleComponentSelect("textarea");
          }}
        >
          <ListItemIcon>
            <ViewHeadlineIcon />
          </ListItemIcon>
          Multiline Input Box
        </ListItem>
        <ListItem
          button
          onClick={() => {
            handleComponentSelect("label");
          }}
        >
          <ListItemIcon>
            <LabelOutlinedIcon />
          </ListItemIcon>
          Label
        </ListItem>
        <ListItem
          button
          onClick={() => {
            handleComponentSelect("radiogroup");
          }}
        >
          <ListItemIcon>
            <RadioButtonCheckedOutlinedIcon />
          </ListItemIcon>
          Radio Group
        </ListItem>
        <ListItem
          button
          onClick={() => {
            handleComponentSelect("checkbox");
          }}
        >
          <ListItemIcon>
            <CheckBoxIcon />
          </ListItemIcon>
          CheckBox
        </ListItem>
        <ListItem
          button
          onClick={() => {
            handleComponentSelect("dropdown");
          }}
        >
          <ListItemIcon>
            <ArrowDropDownCircleIcon />
          </ListItemIcon>
          Dropdown
        </ListItem>
        <ListItem
          button
          onClick={() => {
            handleComponentSelect("link");
          }}
        >
          <ListItemIcon>
            <LinkIcon />
          </ListItemIcon>
          Link
        </ListItem>
        <ListItem
          button
          onClick={() => {
            handleComponentSelect("image");
          }}
        >
          <ListItemIcon>
            <ImageIcon />
          </ListItemIcon>
          Image
        </ListItem>
        <Divider></Divider>
        <ListItem
          button
          onClick={() => {
            handleComponentSelect("tablechart");
          }}
        >
          <ListItemIcon>
            <TableChartIcon />
          </ListItemIcon>
          Table
        </ListItem>
        <ListItem
          button
          onClick={() => {
            handleComponentSelect("linechart");
          }}
        >
          <ListItemIcon>
            <ShowChartOutlinedIcon />
          </ListItemIcon>
          Line Chart
        </ListItem>
        <ListItem
          button
          onClick={() => {
            handleComponentSelect("barchart");
          }}
        >
          <ListItemIcon>
            <InsertChartOutlinedIcon />
          </ListItemIcon>
          Bar Chart
        </ListItem>
        <ListItem
          button
          onClick={() => {
            handleComponentSelect("piechart");
          }}
        >
          <ListItemIcon>
            <PieChartIcon />
          </ListItemIcon>
          Pie Chart
        </ListItem>
        <ListItem
          button
          onClick={() => {
            handleComponentSelect("geochart");
          }}
        >
          <ListItemIcon>
            <MapIcon />
          </ListItemIcon>
          Geo Chart
        </ListItem>
      </List>
    </Drawer>
  );
}
