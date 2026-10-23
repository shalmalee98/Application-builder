import React from "react";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SaveIcon from "@material-ui/icons/Save";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import "./header.css";
import { PROJECTS_PATH } from "../../services/services";
import { previewAppUrl } from "../../config";
import { notifyInfo } from "../../components/toast/notify";

export default function Header(props) {
  const path = previewAppUrl(props.appName);

  const clickDownload = () => {
    notifyInfo("Saved project path: " + PROJECTS_PATH + props.appName);
  };

  return (
    <header className={`ab-header ${props.open ? "ab-header-workspace" : ""}`}>
      <div className="ab-header-inner">
        <div className="flex min-w-0 items-center gap-3">
          {props.open ? (
            <button
              type="button"
              className="ab-header-back"
              onClick={() => {
                if (typeof props.onBack === "function") {
                  props.onBack();
                }
              }}
              title="Back to projects"
            >
              <ArrowBackIcon fontSize="small" />
              <span className="hidden sm:inline">Projects</span>
            </button>
          ) : (
            <span className="ab-header-mark" aria-hidden="true">
              AB
            </span>
          )}

          <div className="min-w-0">
            {props.open ? (
              <>
                <div className="flex items-center gap-2">
                  <p className="truncate font-display text-base font-semibold tracking-tight text-white sm:text-lg">
                    {props.appName || "Untitled"}
                  </p>
                  <span
                    className={`ab-header-status ${
                      props.saved ? "is-saved" : "is-draft"
                    }`}
                  >
                    {props.saved ? "Saved" : "Unsaved"}
                  </span>
                </div>
                <p className="truncate text-xs text-ink-300">
                  Visual editor · Application Builder
                </p>
              </>
            ) : (
              <>
                <p className="truncate font-display text-lg font-semibold tracking-tight text-white">
                  Application Builder
                </p>
                <p className="truncate text-xs text-ink-300">
                  Design interactive pages
                </p>
              </>
            )}
          </div>
        </div>

        {props.open && (
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              className="ab-header-action ab-header-action-primary"
              onClick={props.saveApp}
              title="Save"
            >
              <SaveIcon fontSize="small" />
              <span className="hidden sm:inline">Save</span>
            </button>
            <a
              href={path}
              target="_blank"
              rel="noopener noreferrer"
              className={`ab-header-action ab-header-action-accent ${
                props.startbuttons ? "pointer-events-none opacity-40" : ""
              }`}
              title="Run preview"
              aria-disabled={props.startbuttons}
              onClick={(event) => {
                if (props.startbuttons) {
                  event.preventDefault();
                }
              }}
            >
              <PlayCircleOutlineIcon fontSize="small" />
              <span className="hidden sm:inline">Run</span>
            </a>
            <button
              type="button"
              className="ab-header-action"
              onClick={clickDownload}
              disabled={props.startbuttons}
              title="Show save path"
            >
              <SaveAltIcon fontSize="small" />
              <span className="hidden md:inline">Path</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
