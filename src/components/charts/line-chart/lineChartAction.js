import React from "react";
import {
  TextField,
  ListItem,
  List,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Input,
  useTheme,
} from "@material-ui/core";
import agedata from "../../../data/line-chart-data";
import rainfalldata from "../../../data/rainfall";
import coviddata from "../../../data/covid-data";

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function PieChartAction(props) {
  const theme = useTheme();
  const [data, setData] = React.useState("");

  var chartData = [];
  let arr = [];
  let dimentions = [];
  let measures = [];
  let myObject = {};

  const handleDataSelect = (event) => {
    props.ActionbarData.dataname = event.target.value;
    setData(event.target.value);
    props.ActionbarData.dataset = event.target.value;
    myObject = event.target.value[0];
    Object.keys(event.target.value[0]).map((key) => arr.push(key));
    arr.map((key) => {
      if (typeof myObject[key] === "string") {
        dimentions.push(key);
      } else if (typeof myObject[key] === "number") {
        measures.push(key);
      }
      return null;
    });
    props.ActionbarData.y = dimentions;
    props.ActionbarData.x = measures;
  };

  const handleY = (event) => {
    props.ActionbarData.dimention = [event.target.value];
    createJSON();
  };
  const handleX = (event) => {
    props.ActionbarData.measure = event.target.value;
    createJSON();
  };
  const createJSON = () => {
    if (
      props.ActionbarData.dimention.length !== 0 &&
      props.ActionbarData.measure.length !== 0
    ) {
      var array = [];
      array = props.ActionbarData.dimention.concat(props.ActionbarData.measure);
      chartData.push(array);
      data.map((d) => {
        let row = [];
        array.map((key) => {
          row.push(d[key]);
          return null;
        });
        chartData.push(row);
        return null;
      });
      props.ActionbarData.data = chartData;
      props.updateAppComponent(props.ActionbarData.data);
    }
  };
  const handleChange = (type, event) => {
    var clone = Object.assign(props.ActionbarData, {});
    let newname = event.target.value;
    if (type === "titlename") {
      clone.titlename = newname;
    }
    props.updateAppComponent(clone);
  };

  return (
    <List>
      <ListItem>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Data</InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.ActionbarData.dataname}
            onChange={(event) => {
              handleDataSelect(event);
            }}
          >
            <MenuItem value={agedata}>Age Data</MenuItem>
            <MenuItem value={rainfalldata}>Rainfall Data</MenuItem>
            <MenuItem value={coviddata}>Covid-19 Data</MenuItem>
          </Select>
        </FormControl>
      </ListItem>
      <ListItem>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Select Dimention
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.ActionbarData.dimention}
            onChange={(event) => {
              handleY(event);
            }}
          >
            {props.ActionbarData.y.map((key) => {
              return (
                <MenuItem key={key} value={key}>
                  {key}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </ListItem>
      <ListItem>
        <FormControl fullWidth>
          <InputLabel id="demo-mutiple-name-label">Select Measures</InputLabel>
          <Select
            labelId="demo-mutiple-name-label"
            id="demo-mutiple-name"
            multiple
            value={props.ActionbarData.measure}
            onChange={handleX}
            input={<Input />}
          >
            {props.ActionbarData.x.map((meas) => (
              <MenuItem
                key={meas}
                value={meas}
                style={getStyles(meas, props.ActionbarData.measure, theme)}
              >
                {meas}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </ListItem>
      <ListItem>
        <TextField
          label="Title"
          value={props.ActionbarData.titlename}
          onChange={(event) => {
            handleChange("titlename", event);
          }}
        />
      </ListItem>
    </List>
  );
}
