import React from "react";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SaveIcon from "@material-ui/icons/Save";
import "./header.css";
import { PROJECTS_PATH } from "../../services/services";
import { notifyInfo } from "../../components/toast/notify";

export default function Header(props) {
  const path = "http://localhost:8081/Projects/" + props.appName + "/index.html";

  const clickDownload = () => {
    notifyInfo("Saved project path: " + PROJECTS_PATH + props.appName);
  };

  return (
    <header className="ab-header">
      <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center gap-4 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-tide-600 text-sm font-bold text-white shadow-soft">
            AB
          </span>
          <div className="min-w-0">
            <p className="truncate font-display text-lg font-semibold tracking-tight text-white">
              Application Builder
            </p>
            {props.open ? (
              <p className="truncate font-mono text-[11px] uppercase tracking-[0.18em] text-ink-300">
                {props.appName}
              </p>
            ) : (
              <p className="truncate text-xs text-ink-300">
                Design interactive pages
              </p>
            )}
          </div>
        </div>

        {props.open && (
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              className="ab-header-action"
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
              className={`ab-header-action ${
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
              title="Download path"
            >
              <SaveAltIcon fontSize="small" />
              <span className="hidden sm:inline">Path</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
