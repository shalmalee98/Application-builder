import React from "react";
import { Chart } from "react-google-charts";

export function defaultprops() {
  const data = {
    type: "Barchart",
    label: "BarChart",
    titlename: "Title",
    dataset: "",
    dimensionname: "",
    measurename: "",
    subtitle: "Subtitle",
    x: [],
    y: [],
    dimention: [],
    measure: [],
    dataname: "Sales and Expenditure",
    data: defaultdata,
    Rndprops: {
      x: 0,
      y: 0,
      width: "300px",
      height: "200px",
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
export default class BarChart extends React.Component {
  render() {
    return (
      <Chart
        id={this.props.data.id}
        width={"100%"}
        height={"100%"}
        chartType="Bar"
        loader={<div>Loading Chart</div>}
        data={this.props.data.data}
        options={{
          // Material design options
          chartArea: { width: "75%", height: "75%" },
          chart: {
            title: this.props.data.titlename,
            subtitle: this.props.data.subtitle,
          },
        }}
        // For tests
        rootProps={{ "data-testid": "2" }}
      />
    );
  }
}
