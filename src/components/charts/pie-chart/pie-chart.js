import React from "react";
import { Chart } from "react-google-charts";
import "../../../App.css";

export function defaultprops() {
  const data = {
    type: "Piechart",
    label: "PieChart",
    titlename: "Pie Chart Data",
    x: [],
    y: [],
    dataname: "Sales and Expenditure",
    data: defaultdata,
    backgroundColor: "white",
    dimention: [],
    measure: [],
    Rndprops: {
      x: 0,
      y: 0,
      width: "300px",
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
export default class PieChart extends React.Component {
  render() {
    // var data = this.props.data.data;
    // var arr=[]
    // var pie = [];
    // Object.keys(data[0]).map(key =>
    //   arr.push(key)
    // )
    // pie.push(arr);
    // data.map(d => {
    //   let row = []
    //   arr.map(key => {
    //     row.push(d[key]);
    //   })
    //   pie.push(row)
    // })
    // console.log(arr, pie)
    return (
      <Chart
        id={this.props.data.id}
        width={"100%"}
        height={"100%"}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={this.props.data.data}
        options={{
          title: this.props.data.titlename,
          backgroundColor: this.props.data.backgroundColor,
          legend: {
            position: "right",
          },
          chartArea: { width: "80%", height: "75%" },

          // sliceVisibilityThreshold: 0.2, // 20%
        }}
        rootProps={{ "data-testid": "7" }}
      />
    );
  }
}
