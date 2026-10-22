import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DeleteIcon from "@material-ui/icons/Delete";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";

import "../action-bar/action-bar.css";
import { notifyInfo, notifySuccess } from "../../components/toast/notify";
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
      const label =
        (this.props.ActionbarData && this.props.ActionbarData.type) ||
        "component";
      const confirmed = window.confirm(
        "Delete this " + label + "? You can still undo by not saving."
      );
      if (!confirmed) {
        notifyInfo("Delete cancelled");
        return;
      }
      this.props.handleComponentDelete(compId);
      handleDrawerClose();
      this.props.setActionbarData({});
      notifySuccess(label + " deleted");
    };

    const handleComponentDuplicate = (compId) => {
      if (typeof this.props.duplicateComponent === "function") {
        this.props.duplicateComponent(compId);
        notifySuccess("Component duplicated");
      }
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

    const renderField = (label, value, type, readOnly) => (
      <label className="ab-inspector-field">
        <span>{label}</span>
        <input
          className="ab-field !rounded-lg !px-3 !py-2 !text-sm"
          value={value == null ? "" : value}
          readOnly={!!readOnly}
          onChange={
            readOnly
              ? undefined
              : (event) => {
                  handleChange(type, event);
                }
          }
        />
      </label>
    );

    const renderComponentParams = () => {
      if (!this.props.ActionbarData || !this.props.ActionbarData.Rndprops) {
        return null;
      }
      return (
        <div className="ab-inspector-section">
          <p className="ab-inspector-heading">Layout</p>
          {renderField("ID", this.props.ActionbarData.id, "id", true)}
          {renderField(
            "Height",
            this.props.ActionbarData.Rndprops.height,
            "height"
          )}
          {renderField(
            "Width",
            this.props.ActionbarData.Rndprops.width,
            "width"
          )}
          {renderField("X", this.props.ActionbarData.Rndprops.x, "x")}
          {renderField("Y", this.props.ActionbarData.Rndprops.y, "y")}
          <div className="mt-2 flex flex-col gap-2">
            <button
              type="button"
              className="ab-btn-secondary w-full"
              onClick={() =>
                handleComponentDuplicate(this.props.ActionbarData.id)
              }
            >
              <FileCopyOutlinedIcon fontSize="small" />
              Duplicate
            </button>
            <button
              type="button"
              className="ab-btn-secondary w-full text-ember-600 hover:border-ember-400"
              onClick={() =>
                handleComponentDelete(this.props.ActionbarData.id)
              }
            >
              <DeleteIcon fontSize="small" />
              Delete
            </button>
          </div>
        </div>
      );
    };

    const renderActionComponent = (type) => {
      if (!type) {
        return (
          <div className="px-4 py-8 text-center text-sm text-ink-500">
            Select a component on the canvas to edit its properties.
          </div>
        );
      }
      if (type === "Form") {
        return (
          <FormAction
            formdata={this.props.formdata}
            setFormdata={this.props.setFormdata}
            ActionbarData={this.props.ActionbarData}
            updateAppComponent={this.props.updateAppComponent}
          />
        );
      }
      const common = {
        ActionbarData: this.props.ActionbarData,
        updateAppComponent: this.props.updateAppComponent,
      };
      let editor = null;
      if (type === "Button") {
        editor = (
          <ButtonAction
            handleComponentDelete={this.props.handleComponentDelete}
            {...common}
          />
        );
      } else if (type === "Input Box") {
        editor = <TextboxAction {...common} />;
      } else if (type === "Multiline Input Box") {
        editor = <TextAreaAction {...common} />;
      } else if (type === "Radiogroup") {
        editor = <RadiobuttonAction {...common} />;
      } else if (type === "Label") {
        editor = <LabelAction {...common} />;
      } else if (type === "Checkbox") {
        editor = <CheckboxAction {...common} />;
      } else if (type === "Link") {
        editor = <LinkAction {...common} />;
      } else if (type === "Linechart") {
        editor = <LineChartAction {...common} />;
      } else if (type === "Barchart") {
        editor = <BarChartAction {...common} />;
      } else if (type === "Piechart") {
        editor = <PieChartAction {...common} />;
      } else if (type === "Geochart") {
        editor = <GeoChartAction {...common} />;
      } else if (type === "Tablechart") {
        editor = <TableChartAction {...common} />;
      } else if (type === "Image") {
        editor = <ImageAction {...common} />;
      } else if (type === "Dropdown") {
        editor = <DropdownAction {...common} />;
      }

      return (
        <div className="ab-inspector-body">
          {editor}
          {renderComponentParams()}
        </div>
      );
    };

    return (
      <aside
        className={`ab-action-bar ${
          this.props.openActionBar
            ? "ab-action-bar-open"
            : "ab-action-bar-closed"
        }`}
      >
        <div className="flex items-center justify-between border-b border-ink-100 px-2 py-2">
          {this.props.openActionBar ? (
            <p className="px-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500">
              Inspector
            </p>
          ) : (
            <span className="sr-only">Inspector</span>
          )}
          <button
            type="button"
            className="ab-icon-btn"
            onClick={
              this.props.openActionBar ? handleDrawerClose : handleDrawerOpen
            }
            aria-label={
              this.props.openActionBar
                ? "Collapse inspector"
                : "Expand inspector"
            }
          >
            {this.props.openActionBar ? <ChevronRightIcon /> : <MenuIcon />}
          </button>
        </div>

        {this.props.openActionBar ? (
          <div className="ab-action-bar-scroll">
            {this.props.ActionbarData && this.props.ActionbarData.type ? (
              <div className="border-b border-ink-100 px-4 py-3">
                <p className="font-display text-xl font-semibold text-ink-900">
                  {this.props.ActionbarData.type}
                </p>
              </div>
            ) : null}
            {renderActionComponent(
              this.props.ActionbarData && this.props.ActionbarData.type
            )}
          </div>
        ) : null}
      </aside>
    );
  }
}
