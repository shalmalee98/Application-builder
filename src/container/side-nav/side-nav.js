import React from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
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

const BASIC_ITEMS = [
  { type: "button", label: "Button", Icon: Crop54RoundedIcon },
  { type: "textbox", label: "Input", Icon: TextFieldsIcon },
  { type: "textarea", label: "Text area", Icon: ViewHeadlineIcon },
  { type: "label", label: "Label", Icon: LabelOutlinedIcon },
  { type: "radiogroup", label: "Radio", Icon: RadioButtonCheckedOutlinedIcon },
  { type: "checkbox", label: "Checkbox", Icon: CheckBoxIcon },
  { type: "dropdown", label: "Dropdown", Icon: ArrowDropDownCircleIcon },
  { type: "link", label: "Link", Icon: LinkIcon },
  { type: "image", label: "Image", Icon: ImageIcon },
];

const CHART_ITEMS = [
  { type: "tablechart", label: "Table", Icon: TableChartIcon },
  { type: "linechart", label: "Line", Icon: ShowChartOutlinedIcon },
  { type: "barchart", label: "Bar", Icon: InsertChartOutlinedIcon },
  { type: "piechart", label: "Pie", Icon: PieChartIcon },
  { type: "geochart", label: "Geo", Icon: MapIcon },
];

export default function SideNav(props) {
  const handleDrawerClose = () => {
    props.setOpenSideNav(false);
  };
  const handleDrawerOpen = () => {
    props.setOpenSideNav(true);
  };

  const handleComponentSelect = (type) => {
    const factories = {
      button: buttonProps,
      textbox: textboxProps,
      textarea: textareaProps,
      linechart: linechartProps,
      barchart: barchartProps,
      piechart: piechartProps,
      image: imageProps,
      geochart: geochartProps,
      radiogroup: radiogroupProps,
      label: labelProps,
      checkbox: checkboxProps,
      link: anchortagProps,
      tablechart: tablechartProps,
      dropdown: dropdownProps,
    };
    const factory = factories[type];
    if (factory) {
      props.handleComponentClick(factory());
    }
  };

  const renderItem = (item) => {
    const Icon = item.Icon;
    return (
      <button
        key={item.type}
        type="button"
        className="ab-palette-item"
        onClick={() => handleComponentSelect(item.type)}
        title={`Add ${item.label}`}
      >
        <span className="ab-palette-icon">
          <Icon fontSize="small" />
        </span>
        {props.openSideNav ? <span className="ab-palette-text">{item.label}</span> : null}
      </button>
    );
  };

  return (
    <aside
      className={`ab-side-nav ${
        props.openSideNav ? "ab-side-nav-open" : "ab-side-nav-closed"
      }`}
    >
      <div className="ab-side-nav-head">
        {props.openSideNav ? (
          <div className="min-w-0 px-1">
            <p className="ab-palette-kicker">Insert</p>
            <p className="truncate text-sm font-semibold text-white">
              Components
            </p>
          </div>
        ) : (
          <span className="sr-only">Components</span>
        )}
        <button
          type="button"
          className="ab-icon-btn"
          onClick={props.openSideNav ? handleDrawerClose : handleDrawerOpen}
          aria-label={props.openSideNav ? "Collapse palette" : "Expand palette"}
        >
          {props.openSideNav ? <ChevronLeftIcon /> : <MenuIcon />}
        </button>
      </div>

      <div className="ab-side-nav-scroll">
        <div className="ab-palette-group">
          {props.openSideNav ? (
            <p className="ab-palette-label">Basics</p>
          ) : null}
          {BASIC_ITEMS.map(renderItem)}
        </div>
        <div className="ab-palette-group">
          {props.openSideNav ? (
            <p className="ab-palette-label">Data & charts</p>
          ) : null}
          {CHART_ITEMS.map(renderItem)}
        </div>
      </div>
    </aside>
  );
}
