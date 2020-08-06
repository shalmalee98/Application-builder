import React from "react";
import "./line-chart.css";
import Chart from "react-google-charts";

export function defaultprops() {
  const data = {
    type: "Linechart",
    label: "LineChart",
    titlename: "Title",
    dataname: "Sales and Expenditure",
    data: defaultdata,
    x: [],
    y: [],
    dimention: [],
    measure: [],
    Rndprops: {
      x: 0,
      y: 0,
      width: "400px",
      height: "300px",
    },
  };
  return data;
}
export const defaultdata = [
  ["Year", "Sales", "Expenses"],
  ["2004", 1000, 400],
  ["2005", 1170, 460],
  ["2006", 660, 1120],
  ["2007", 1030, 540],
];

export default class LineChart extends React.Component {
  render() {
    return (
      <Chart
        id={this.props.data.id}
        chartType="LineChart"
        width="100%"
        height="100%"
        data={this.props.data.data}
        options={{
          chartArea: { width: "50%", height: "75%" },
          title: this.props.data.titlename,
          legend: { position: "right" },
        }}
      />
    );
  }
}
