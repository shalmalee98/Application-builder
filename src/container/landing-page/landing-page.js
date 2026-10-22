import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import "./landing-page.css";

import { getApplicationJson } from "../../services/services";
import { getApplicationList } from "../../services/services";
import { notifyError, notifyInfo } from "../../components/toast/notify";

export default function LandingPage(props) {
  const [apps, setApps] = React.useState({});
  const [dialogOpen, setDialogOpen] = React.useState(false);
  let arr = [];

  const handleAppname = (event) => {
    props.setAppName(event.target.value);
  };
  const openApp = () => {
    getApplicationList().then((data) => {
      const names =
        data && typeof data === "object" ? Object.keys(data) : [];
      if (names.indexOf(props.appName) !== -1) {
        notifyInfo("This application already exists — opening it instead");
        handleListItemClick(props.appName);
        return;
      }
      props.openApplication();
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
        notifyError("No existing applications yet");
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
    <section className="landing-shell">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="landing-orb landing-orb-a animate-soft-pulse" />
        <div className="landing-orb landing-orb-b" />
        <div className="landing-grid" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl flex-col justify-center px-6 py-12">
        <div className="animate-fade-up max-w-2xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.28em] text-tide-700">
            Visual page studio
          </p>
          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-ink-950 sm:text-6xl md:text-7xl">
            Application Builder
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600 sm:text-xl">
            Name a project, drop in components, and ship an interactive page in minutes.
          </p>
        </div>

        <form
          className="animate-fade-up mt-10 w-full max-w-xl delay-100"
          style={{ animationDelay: "120ms" }}
          onSubmit={(event) => {
            event.preventDefault();
            if (!props.startAppButton) {
              openApp();
            }
          }}
        >
          <label htmlFor="appname" className="mb-2 block text-sm font-medium text-ink-700">
            Project name
          </label>
          <input
            id="appname"
            name="appname"
            type="text"
            autoFocus
            required
            className="ab-field"
            placeholder="Portfolio, dashboard, event RSVP…"
            value={props.appName}
            onChange={handleAppname}
          />

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="ab-btn-primary"
              disabled={props.startAppButton}
            >
              Open new application
            </button>
            <button
              type="button"
              className="ab-btn-secondary"
              onClick={openExistingApplication}
            >
              Open existing
            </button>
          </div>
        </form>
      </div>

      {dialogOpen && (
        <Dialog onClose={handleDialogClose} open={dialogOpen}>
          <DialogTitle id="simple-dialog-title">Your applications</DialogTitle>
          <List>
            {Object.keys(apps).map((key, i) => (
              <ListItem
                button
                onClick={() => handleListItemClick(key)}
                key={i}
              >
                <ListItemText primary={key} secondary={apps[key]} />
              </ListItem>
            ))}
          </List>
        </Dialog>
      )}
    </section>
  );
}
