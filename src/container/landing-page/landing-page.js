import React from "react";
import "./landing-page.css";

import { getApplicationJson } from "../../services/services";
import { getApplicationList } from "../../services/services";
import { notifyInfo } from "../../components/toast/notify";

function initials(name) {
  const parts = String(name || "")
    .trim()
    .split(/[\s_-]+/)
    .filter(Boolean);
  if (parts.length === 0) {
    return "App";
  }
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

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
        <div className="landing-sheen" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl gap-10 px-4 py-10 sm:gap-12 sm:px-6 sm:py-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] lg:items-stretch">
        <div className="flex flex-col justify-center">
          <div className="animate-fade-up max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-ink-200/80 bg-white/70 px-3 py-1 shadow-sm backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-tide-500" />
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-600">
                Low-code studio
              </span>
            </div>
            <h1 className="font-display text-[2.75rem] font-bold leading-[0.98] tracking-tight text-ink-950 sm:text-6xl md:text-7xl">
              Application
              <span className="block text-tide-700">Builder</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-600 sm:text-lg">
              Compose pages visually, wire interactions, and preview instantly —
              the workspace for shipping internal tools without waiting on a full stack.
            </p>
          </div>

          <form
            className="animate-fade-up mt-9 w-full max-w-xl rounded-2xl border border-ink-200/80 bg-white/80 p-5 shadow-panel backdrop-blur sm:mt-10 sm:p-6"
            style={{ animationDelay: "100ms" }}
            onSubmit={(event) => {
              event.preventDefault();
              if (!props.startAppButton) {
                openApp();
              }
            }}
          >
            <div className="mb-4 flex items-baseline justify-between gap-3">
              <div>
                <p className="ab-kicker">New project</p>
                <h2 className="mt-1 font-display text-xl font-semibold text-ink-900">
                  Start building
                </h2>
              </div>
            </div>

            <label htmlFor="appname" className="mb-1.5 block text-sm font-medium text-ink-700">
              Application name
            </label>
            <input
              id="appname"
              name="appname"
              type="text"
              autoFocus
              required
              className="ab-field"
              placeholder="e.g. Ops dashboard, RSVP form…"
              value={props.appName}
              onChange={handleAppname}
            />

            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:items-center">
              <button
                type="submit"
                className="ab-btn-primary w-full sm:min-w-[11rem] sm:w-auto"
                disabled={props.startAppButton}
              >
                Create application
              </button>
              <button
                type="button"
                className="ab-btn-ghost w-full sm:w-auto"
                onClick={refreshApps}
              >
                Refresh library
              </button>
            </div>
            <p className="mt-3 text-xs text-ink-500">
              Press Enter to open. Existing names reopen the saved project.
            </p>
          </form>
        </div>

        <aside
          className="animate-fade-up flex min-h-[22rem] flex-col rounded-2xl border border-ink-200/80 bg-white/85 p-4 shadow-panel backdrop-blur sm:p-5"
          style={{ animationDelay: "160ms" }}
        >
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <p className="ab-kicker">Library</p>
              <h2 className="mt-1 font-display text-2xl font-semibold text-ink-900">
                Your applications
              </h2>
            </div>
            <span className="rounded-md bg-ink-100 px-2 py-1 font-mono text-xs font-medium text-ink-600">
              {appEntries.length}
            </span>
          </div>

          <label htmlFor="app-search" className="sr-only">
            Search applications
          </label>
          <input
            id="app-search"
            type="search"
            className="ab-field !py-2.5"
            placeholder="Search projects…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            disabled={loadingApps || appEntries.length === 0}
          />

          <div className="mt-4 min-h-0 flex-1 space-y-2 overflow-y-auto pr-0.5">
            {loadingApps ? (
              <div className="space-y-2 py-2">
                {[0, 1, 2].map((n) => (
                  <div key={n} className="ab-recent-skeleton" />
                ))}
              </div>
            ) : null}

            {!loadingApps && filteredApps.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-tide-50 text-sm font-bold text-tide-700">
                  +
                </div>
                <p className="text-sm font-medium text-ink-700">
                  {appEntries.length === 0
                    ? "No applications yet"
                    : "No matches"}
                </p>
                <p className="mt-1 max-w-[16rem] text-xs leading-relaxed text-ink-500">
                  {appEntries.length === 0
                    ? "Name a project on the left and create your first canvas."
                    : "Try a different search term."}
                </p>
              </div>
            ) : null}

            {filteredApps.map((app, index) => (
              <button
                key={app.name}
                type="button"
                className="ab-recent-item"
                style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
                onClick={() => handleListItemClick(app.name)}
              >
                <span className="ab-recent-avatar" aria-hidden="true">
                  {initials(app.name)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold text-ink-900">
                    {app.name}
                  </span>
                  <span className="mt-0.5 block truncate font-mono text-[11px] text-ink-500">
                    Updated {app.updatedAt}
                  </span>
                </span>
                <span className="ab-recent-open">Open</span>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
