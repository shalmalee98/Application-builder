import React from "react";
import { safeReadDataset, classifyColumns } from "../../utils/fileReaders";

/**
 * Upload-first dataset picker for charts/tables.
 * samples: optional [{ label, rows }]
 */
export default function DatasetSource(props) {
  const inputRef = React.useRef(null);
  const samples = props.samples || [];
  const fileName = props.fileName || "";
  const rowCount = Array.isArray(props.rows) ? props.rows.length : 0;

  const applyRows = (rows, nextFileName, source) => {
    const { dimensions, measures } = classifyColumns(rows);
    if (typeof props.onChange === "function") {
      props.onChange({
        rows,
        fileName: nextFileName || "",
        source: source || "upload",
        dimensions,
        measures,
      });
    }
  };

  const onUpload = async (event) => {
    const file = event.target.files && event.target.files[0];
    event.target.value = "";
    if (!file) {
      return;
    }
    const result = await safeReadDataset(file);
    if (!result) {
      return;
    }
    applyRows(result.rows, result.fileName, "upload");
  };

  return (
    <div className="ab-dataset-source">
      <p className="ab-inspector-heading">Data source</p>
      <input
        ref={inputRef}
        type="file"
        accept=".csv,.json,text/csv,application/json"
        className="sr-only"
        onChange={onUpload}
      />
      <button
        type="button"
        className="ab-btn-primary w-full"
        onClick={() => inputRef.current && inputRef.current.click()}
      >
        Upload CSV / JSON
      </button>
      <p className="mt-2 text-[11px] leading-relaxed text-ink-500">
        Use a header row in CSV, or a JSON array of objects. Columns are detected
        automatically.
      </p>

      {fileName || rowCount ? (
        <div className="ab-dataset-meta">
          <span className="truncate font-medium text-ink-800">
            {fileName || "Loaded dataset"}
          </span>
          <span className="font-mono text-[11px] text-ink-500">
            {rowCount} rows
          </span>
        </div>
      ) : (
        <p className="mt-3 text-xs text-ink-500">No file loaded yet.</p>
      )}

      {samples.length > 0 ? (
        <div className="mt-3">
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink-500">
            Or use a sample
          </p>
          <div className="flex flex-col gap-1.5">
            {samples.map((sample) => (
              <button
                key={sample.label}
                type="button"
                className="ab-btn-secondary w-full !justify-start !py-2 !text-xs"
                onClick={() =>
                  applyRows(sample.rows, sample.label, "sample")
                }
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
