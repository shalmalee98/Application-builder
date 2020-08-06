import React from "react";
import { Chart } from "react-google-charts";
import '../../../container/application/application.css';

export function defaultprops() {
  const data = {
    type: "Tablechart",
    label: "TableChart",
    titlename: "Title",
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
      width: "auto",
      height: "auto",
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
export default class TableChart extends React.Component {
  render() {
    return (
      <div>
        <label style={{ fontSize: 20 }}>{this.props.data.titlename}</label>
        <br></br>
      <Chart
        id={this.props.data.id}
        width={this.props.data.Rndprops.width}
        height={this.props.data.Rndprops.height}
        chartType="Table"
        loader={<div>Loading Chart</div>}
        data={this.props.data.data}
        // options={{
        //   // Material design options
        //   // chartArea:{width:'75%',height:'75%'},
        //   chart: {
        //     title: this.props.data.titlename,
        //     //   subtitle: this.props.data.subtitle,
        //   },
        // }}
        // For tests
        rootProps={{ "data-testid": "2" }}
      />
      </div>
    );
  }
}
