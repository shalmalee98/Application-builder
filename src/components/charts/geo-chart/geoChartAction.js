import React from "react";
import {
  TextField,
  ListItem,
  List,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import geodata from "../../../data/geo-data";
import populationdata from "../../../data/state-population";
import italydata from "../../../data/italy-geo-data";
import coviddata from "../../../data/covid-data";

export default function GeoChartAction(props) {
  const [data, setData] = React.useState("");

  var chartData = [];
  let arr = [];
  let dimentions = [];
  let measures = [];
  let myObject = {};

  const selectData = (event) => {
    var json = event.target.value;
    handleDataSelect(json);
  };
  const handleDataSelect = (json) => {
    if (json === geodata || json === coviddata) {
      props.ActionbarData.region = "world";
      props.ActionbarData.resolution = "countries";
    } else if ((json = populationdata)) {
      props.ActionbarData.region = "IN";
      props.ActionbarData.resolution = "provinces";
    } else if (json === italydata) {
      props.ActionbarData.region = "IT";
      props.ActionbarData.resolution = "metros";
    }
    props.ActionbarData.dataname = json;
    setData(json);
    myObject = json[0];
    Object.keys(json[0]).map((key) => arr.push(key));
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
    props.ActionbarData.dimentionname = event.target.value;
    createJSON();
  };
  const handleX = (event) => {
    props.ActionbarData.measure = [event.target.value];
    props.ActionbarData.measurename = event.target.value;
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
    } else if (type === "subtitle") {
      clone.subtitle = newname;
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
              selectData(event);
            }}
          >
            <MenuItem value={geodata}>Popularity Data</MenuItem>
            <MenuItem value={populationdata}>Population Data</MenuItem>
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
            value={props.ActionbarData.dimentionname}
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
            value={props.ActionbarData.measurename}
            onChange={handleX}
          >
            {props.ActionbarData.x.map((key) => {
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
        <TextField
          label="Title"
          value={props.ActionbarData.titlename}
          onChange={(event) => {
            handleChange("titlename", event);
          }}
        />
      </ListItem>
      <ListItem>
        <TextField
          label="Subtitle"
          value={props.ActionbarData.subtitle}
          onChange={(event) => {
            handleChange("subtitle", event);
          }}
        ></TextField>
      </ListItem>
    </List>
  );
}
