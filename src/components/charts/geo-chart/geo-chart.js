import * as React from "react";
import { Chart } from "react-google-charts";

export function defaultprops() {
  const data = {
    type: "Geochart",
    label: "GeoChart",
    titlename: "Geo Chart Data",
    dataset: "",
    dimensionname: "",
    measurename: "",
    subtitle: "Subtitle",
    x: [],
    y: [],
    dimention: [],
    measure: [],
    dataname: "",
    data: defaultdata,
    region: "world",
    resolution: "countries",
    defaultColor: "#f1910e",
    Rndprops: {
      x: 0,
      y: 0,
      width: "auto",
      height: "auto",
    },
  };
  return data;
}
export const defaultdata = [
  ["Country", "Popularity"],
  ["Germany", 200],
  ["United States", 300],
  ["Brazil", 400],
  ["Canada", 500],
  ["France", 600],
  ["RU", 700],
];

export default class GeoChart extends React.Component {
  render() {
    return (
      <div className="App">
        <label style={{ fontSize: 20 }}>{this.props.data.titlename}</label>
        <br></br>
        <label style={{ fontSize: 17 }}>{this.props.data.subtitle}</label>

        <Chart
          chartType="GeoChart"
          width="100%"
          height="200px"
          data={this.props.data.data}
          options={{
            region: this.props.data.region,
            dataMode: "regions",
            resolution: this.props.data.resolution,
            // displayMode: 'markers',
            colorAxis: { colors: ["#e7711c", "#4374e0"] },
            magnifyingGlass: { enable: true },
          }}
        />
      </div>
    );
  }
}
