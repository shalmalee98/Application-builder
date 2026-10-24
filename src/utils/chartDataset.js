/**
 * Shared helpers for chart/table inspectors that bind uploaded row data.
 */

export function applyDataset(actionbarData, payload) {
  const rows = payload.rows || [];
  actionbarData.dataset = rows;
  actionbarData.sourceFile = payload.fileName || "";
  actionbarData.dataname = payload.fileName || payload.source || "Uploaded data";
  actionbarData.y = payload.dimensions || [];
  actionbarData.x = payload.measures || [];
  actionbarData.dimention = [];
  actionbarData.measure = [];
  actionbarData.dimentionname = "";
  actionbarData.measurename = "";
  return actionbarData;
}

export function buildChartMatrix(rows, dimensions, measures) {
  const dim = Array.isArray(dimensions) ? dimensions : [];
  const meas = Array.isArray(measures) ? measures : [];
  if (!rows || !rows.length || !dim.length || !meas.length) {
    return null;
  }
  const headers = dim.concat(meas);
  const matrix = [headers];
  rows.forEach((row) => {
    matrix.push(headers.map((key) => row[key]));
  });
  return matrix;
}

export function commitChartSelection(actionbarData, rows, updateAppComponent) {
  const matrix = buildChartMatrix(
    rows,
    actionbarData.dimention,
    Array.isArray(actionbarData.measure)
      ? actionbarData.measure
      : actionbarData.measure
        ? [actionbarData.measure]
        : []
  );
  if (!matrix) {
    return;
  }
  actionbarData.data = matrix;
  updateAppComponent(actionbarData);
}
