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
import { notifyError } from "../../components/toast/notify";
import "./application.css";

function eventScriptCode(code) {
  if (!code) {
    return "";
  }
  return code
    .split("\n")
    .filter((line) => line.trim() !== "//Add Code")
    .join("\n")
    .trim();
}

function runComponentScripts(data, eventName, domEvent) {
  (data.script || []).forEach((entry) => {
    if (entry.event !== eventName) {
      return;
    }
    const code = eventScriptCode(entry.code);
    if (!code) {
      return;
    }
    try {
      // The builder runs the script the user typed for this component.
      // eslint-disable-next-line no-new-func
      const fn = new Function("event", code);
      const target = document.getElementById(entry.id || data.id);
      fn.call(target || domEvent.currentTarget, domEvent);
    } catch (err) {
      notifyError(err.message || String(err));
    }
  });
}

const GRID_SIZE = 20;

function snapValue(value, enabled) {
  const number = parseFloat(value);
  if (!enabled || Number.isNaN(number)) {
    return number;
  }
  return Math.round(number / GRID_SIZE) * GRID_SIZE;
}

export default function Application(props) {
  const [zoom, setZoom] = React.useState(1);
  const [snapToGrid, setSnapToGrid] = React.useState(true);
  const [showGrid, setShowGrid] = React.useState(true);

  const updateReturnData = (oldData, updatedData) => {
    let tmpcomp = Object.assign(oldData, {});
    tmpcomp.Rndprops = Object.assign(tmpcomp.Rndprops, updatedData);
    props.updateAppComponent(tmpcomp);
  };

  const ActionBarOpen = () => {
    props.setComponentBorder(null);
    props.onComponentSelect(props.formdata);
  };

  const wrapRnD = (component, data) => {
    return (
      <Rnd
        key={data.id}
        size={{ width: data.Rndprops.width, height: data.Rndprops.height }}
        position={{ x: data.Rndprops.x, y: data.Rndprops.y }}
        bounds="parent"
        dragGrid={snapToGrid ? [GRID_SIZE, GRID_SIZE] : [1, 1]}
        resizeGrid={snapToGrid ? [GRID_SIZE, GRID_SIZE] : [1, 1]}
        scale={zoom}
        onDragStop={(e, d) => {
          const newData = {
            x: snapValue(d.x, snapToGrid),
            y: snapValue(d.y, snapToGrid),
            id: data.id,
          };
          updateReturnData(data, newData);
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          const newData = {
            width: snapValue(ref.offsetWidth, snapToGrid),
            height: snapValue(ref.offsetHeight, snapToGrid),
            x: snapValue(position.x, snapToGrid),
            y: snapValue(position.y, snapToGrid),
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
              runComponentScripts(data, "click", e);
              props.setComponentBorder(data.id);
              props.onComponentSelect(data);
              e.preventDefault();
              e.stopPropagation();
            }}
            onDoubleClick={(e) => {
              runComponentScripts(data, "dblclick", e);
            }}
            onMouseOver={(e) => {
              runComponentScripts(data, "mouseover", e);
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
    <div className="form-container ab-canvas-shell" onClick={ActionBarOpen}>
      <div className="ab-canvas-toolbar" onClick={(event) => event.stopPropagation()}>
        <span className="ab-canvas-toolbar-label">Canvas</span>
        <button
          type="button"
          className="ab-canvas-chip"
          onClick={() => setZoom((value) => Math.max(0.5, Number((value - 0.1).toFixed(1))))}
          aria-label="Zoom out"
        >
          −
        </button>
        <span className="ab-canvas-zoom">{Math.round(zoom * 100)}%</span>
        <button
          type="button"
          className="ab-canvas-chip"
          onClick={() => setZoom((value) => Math.min(1.5, Number((value + 0.1).toFixed(1))))}
          aria-label="Zoom in"
        >
          +
        </button>
        <button
          type="button"
          className="ab-canvas-chip"
          onClick={() => setZoom(1)}
        >
          100%
        </button>
        <button
          type="button"
          className={`ab-canvas-chip ${showGrid ? "is-active" : ""}`}
          onClick={() => setShowGrid((value) => !value)}
        >
          Grid
        </button>
        <button
          type="button"
          className={`ab-canvas-chip ${snapToGrid ? "is-active" : ""}`}
          onClick={() => setSnapToGrid((value) => !value)}
        >
          Snap
        </button>
      </div>

      <div className="ab-canvas-stage">
        <div className="ab-canvas-frame">
          <div
            id="form-content"
            className={`form-content ${showGrid ? "form-content-grid" : ""}`}
            style={{
              width: props.formdata.width,
              height: props.formdata.height,
              backgroundColor: props.formdata.colour,
              transform: `scale(${zoom})`,
              transformOrigin: "top left",
            }}
            onClick={ActionBarOpen}
          >
            {renderComponent()}
          </div>
          {(!props.appComponent || props.appComponent.length === 0) && (
            <div
              className="ab-canvas-empty remove-from-html"
              style={{
                width: props.formdata.width * zoom,
                height: props.formdata.height * zoom,
              }}
              onClick={ActionBarOpen}
            >
              <span className="ab-canvas-empty-badge">Drop components here</span>
              <p className="font-display text-2xl font-semibold text-ink-800">
                Your page starts empty
              </p>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-500">
                Add widgets from the left rail, drag to arrange, then tune
                properties in the inspector. Click the canvas to edit page size
                and background.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
