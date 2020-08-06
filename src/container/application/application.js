import React from "react";
import Button from "../../components/button/button";
import { Rnd } from "react-rnd";

import TextBox from "../../components/textbox/textbox";
import TextArea from "../../components/textArea/textArea";
import LineChart from "../../components/charts/line-chart/line-chart";
import BarChart from "../../components/charts/barchart/barchart";
import PieChart from "../../components/charts/pie-chart/pie-chart";
import GeoChart from "../../components/charts/geo-chart/geo-chart";
import TableChart from "../../components/charts/table/table";
import RadioButtons from "../../components/radiobutton/radiobutton";
import Label from "../../components/label/label";
import CheckBox from "../../components/checkbox/checkbox";
import Link from "../../components/anchor_tag/anchor_tag";
import Image from "../../components/image/image";
import DropDown from "../../components/dropdown/dropdown";
import "./application.css";

export default function Application(props) {
  const updateReturnData = (oldData, updatedData) => {
    let tmpcomp = Object.assign(oldData, {});
    tmpcomp.Rndprops = Object.assign(tmpcomp.Rndprops, updatedData);
    props.updateAppComponent(tmpcomp);
  };

  const ActionBarOpen = () => {
    props.setComponentBorder(null);
    props.onComponentSelect(props.formdata);
    console.log(props.formdata);
  };

  const wrapRnD = (component, data) => {
    return (
      <Rnd
        key={data.id}
        size={{ width: data.Rndprops.width, height: data.Rndprops.height }}
        position={{ x: data.Rndprops.x, y: data.Rndprops.y }}
        bounds="parent"
        onDragStop={(e, d) => {
          const newData = { x: d.x, y: d.y, id: data.id };
          updateReturnData(data, newData);
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          const newData = {
            width: ref.style.width,
            height: ref.style.height,
            ...position,
            id: data.id,
          };
          updateReturnData(data, newData);
        }}
      >
        <div
          className={
            props.componentBorder === data.id ? "rotating-border" : undefined
          }
          style={{ width: "100%", height: "100%" }}
        >
          <div
            style={{ width: "100%", height: "100%" }}
            onClick={(e) => {
              props.setComponentBorder(data.id);
              props.onComponentSelect(data);
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {component}
          </div>
        </div>
      </Rnd>
    );
  };

  const wrapperForChart = (comp, data) => {
    return (
      <React.Fragment>
        <div
          className="remove-from-html"
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: "9999",
          }}
          onClick={(e) => {
            props.setComponentBorder(data.id);
            props.onComponentSelect(data);
            e.preventDefault();
            e.stopPropagation();
          }}
        ></div>
        {comp}
      </React.Fragment>
    );
  };

  const renderComponent = () => {
    const renderComponentList = [];
    props.appComponent.forEach((component) => {
      if (component.type === "Button") {
        const comp = wrapRnD(<Button data={component} />, component);
        renderComponentList.push(comp);
      }
      if (component.type === "Input Box") {
        const comp = wrapRnD(<TextBox data={component} />, component);
        renderComponentList.push(comp);
      }
      if (component.type === "Multiline Input Box") {
        const comp = wrapRnD(<TextArea data={component} />, component);
        renderComponentList.push(comp);
      }
      if (component.type === "Linechart") {
        const Wrapcomp = wrapperForChart(
          <LineChart data={component} />,
          component
        );
        const comp = wrapRnD(Wrapcomp, component);
        renderComponentList.push(comp);
      }
      if (component.type === "Barchart") {
        const Wrapcomp = wrapperForChart(
          <BarChart data={component} />,
          component
        );
        const comp = wrapRnD(Wrapcomp, component);
        renderComponentList.push(comp);
      }
      if (component.type === "Piechart") {
        const Wrapcomp = wrapperForChart(
          <PieChart data={component} />,
          component
        );
        const comp = wrapRnD(Wrapcomp, component);
        renderComponentList.push(comp);
      }
      if (component.type === "Geochart") {
        const Wrapcomp = wrapperForChart(
          <GeoChart data={component} />,
          component
        );
        const comp = wrapRnD(Wrapcomp, component);
        renderComponentList.push(comp);
      }
      if (component.type === "Tablechart") {
        const Wrapcomp = wrapperForChart(
          <TableChart data={component} />,
          component
        );
        const comp = wrapRnD(Wrapcomp, component);
        renderComponentList.push(comp);
      }
      if (component.type === "Radiogroup") {
        const comp = wrapRnD(<RadioButtons data={component} />, component);
        renderComponentList.push(comp);
      }
      if (component.type === "Image") {
        const comp = wrapRnD(<Image data={component} />, component);
        renderComponentList.push(comp);
      }
      if (component.type === "Label") {
        const comp = wrapRnD(<Label data={component} />, component);
        renderComponentList.push(comp);
      }
      if (component.type === "Checkbox") {
        const comp = wrapRnD(<CheckBox data={component} />, component);
        renderComponentList.push(comp);
      }
      if (component.type === "Dropdown") {
        const comp = wrapRnD(<DropDown data={component} />, component);
        renderComponentList.push(comp);
      }
      if (component.type === "Link") {
        const comp = wrapRnD(<Link data={component} />, component);
        renderComponentList.push(comp);
      }
    });

    return renderComponentList;
  };

  return (
    <div
      className="form-container"
      style={{ height: "100%", width: "100%", position: "absolute" }}
      onClick={ActionBarOpen}
    >
      <div
        id="form-content"
        className="form-content"
        style={{
          width: props.formdata.width,
          height: props.formdata.height,
          backgroundColor: props.formdata.colour,
          border: "1px solid rgba(0, 0, 0, 0.2)",
          borderRadius: 4,
        }}
        onClick={ActionBarOpen}
      >
        {renderComponent()}
      </div>
    </div>
  );
}
