import React from "react";
import "./landing-page.css";

import { getApplicationJson } from "../../services/services";
import { getApplicationList } from "../../services/services";
import { notifyInfo } from "../../components/toast/notify";

export default function LandingPage(props) {
  const [apps, setApps] = React.useState({});
  const [loadingApps, setLoadingApps] = React.useState(true);
  const [query, setQuery] = React.useState("");

  const refreshApps = React.useCallback(() => {
    setLoadingApps(true);
    return getApplicationList()
      .then((data) => {
        setApps(data && typeof data === "object" ? data : {});
      })
      .finally(() => {
        setLoadingApps(false);
      });
  }, []);

  React.useEffect(() => {
    refreshApps();
  }, [refreshApps]);

  const appEntries = React.useMemo(() => {
    return Object.keys(apps)
      .map((name) => ({ name, updatedAt: apps[name] }))
      .sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)));
  }, [apps]);

  const filteredApps = React.useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      return appEntries;
    }
    return appEntries.filter((app) =>
      app.name.toLowerCase().includes(needle)
    );
  }, [appEntries, query]);

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

  const handleListItemClick = (appName) => {
    props.setAppName(appName);
    getApplicationJson(appName).then((form) => {
      if (!form) {
        return;
      }
      let bg = "";
      let style = form.style || {};
      props.setComponentID(form.componentID);
      props.setAppComponent(form.components || []);
      Object.keys(style).forEach((key) => {
        if (key === "background-color") {
          bg = style[key];
        }
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

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)] lg:items-center">
        <div>
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
            className="animate-fade-up mt-10 w-full max-w-xl"
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
                className="ab-btn-ghost"
                onClick={refreshApps}
              >
                Refresh list
              </button>
            </div>
          </form>
        </div>

        <aside
          className="animate-fade-up ab-panel p-5"
          style={{ animationDelay: "180ms" }}
        >
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500">
                Recent
              </p>
              <h2 className="font-display text-2xl font-semibold text-ink-900">
                Your applications
              </h2>
            </div>
            <span className="rounded-full bg-ink-100 px-2.5 py-1 font-mono text-xs text-ink-600">
              {appEntries.length}
            </span>
          </div>

          <label htmlFor="app-search" className="sr-only">
            Search applications
          </label>
          <input
            id="app-search"
            type="search"
            className="ab-field !rounded-xl !py-2.5 !text-sm"
            placeholder="Search by name…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            disabled={loadingApps || appEntries.length === 0}
          />

          <div className="mt-4 max-h-80 space-y-2 overflow-y-auto pr-1">
            {loadingApps ? (
              <p className="py-8 text-center text-sm text-ink-500">
                Loading projects…
              </p>
            ) : null}

            {!loadingApps && filteredApps.length === 0 ? (
              <p className="py-8 text-center text-sm text-ink-500">
                {appEntries.length === 0
                  ? "No saved applications yet. Create one to get started."
                  : "No projects match that search."}
              </p>
            ) : null}

            {filteredApps.map((app) => (
              <button
                key={app.name}
                type="button"
                className="ab-recent-item"
                onClick={() => handleListItemClick(app.name)}
              >
                <span className="truncate font-medium text-ink-900">
                  {app.name}
                </span>
                <span className="truncate font-mono text-[11px] text-ink-500">
                  {app.updatedAt}
                </span>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
