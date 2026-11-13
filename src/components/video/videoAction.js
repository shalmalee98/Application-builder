import React from "react";
import {
  TextField,
  ListItem,
  List,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import { notifyError, notifySuccess } from "../toast/notify";

const MAX_VIDEO_BYTES = 12 * 1024 * 1024;

function readAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error || new Error("Read failed"));
    reader.readAsDataURL(file);
  });
}

export default function VideoAction(props) {
  const fileRef = React.useRef(null);

  const handleChange = (type, event) => {
    const clone = Object.assign(props.ActionbarData, {});
    clone[type] = event.target.value;
    props.updateAppComponent(clone);
  };

  const handleUpload = async (event) => {
    const file = event.target.files && event.target.files[0];
    event.target.value = "";
    if (!file) return;
    if (!String(file.type || "").startsWith("video/")) {
      notifyError("Choose a video file");
      return;
    }
    if (file.size > MAX_VIDEO_BYTES) {
      notifyError("Video must be 12MB or smaller");
      return;
    }
    try {
      const dataUrl = await readAsDataURL(file);
      const clone = Object.assign(props.ActionbarData, {});
      clone.src = dataUrl;
      clone.fileName = file.name;
      props.updateAppComponent(clone);
      notifySuccess('Video "' + file.name + '" loaded');
    } catch (err) {
      notifyError((err && err.message) || "Could not read video");
    }
  };

  return (
    <List>
      <ListItem className="!block">
        <p className="ab-inspector-heading">Video file</p>
        <input
          ref={fileRef}
          type="file"
          accept="video/*"
          className="sr-only"
          onChange={handleUpload}
        />
        <button
          type="button"
          className="ab-upload-drop"
          onClick={() => fileRef.current && fileRef.current.click()}
        >
          <span className="text-sm font-semibold text-tide-800">
            Upload video from your computer
          </span>
          <span className="text-[11px] text-ink-500">
            MP4, WEBM, etc · up to 12MB
          </span>
        </button>
        {props.ActionbarData.fileName ? (
          <div className="ab-dataset-meta">
            <span className="truncate font-medium text-ink-800">
              {props.ActionbarData.fileName}
            </span>
          </div>
        ) : null}
      </ListItem>
      <ListItem>
        <TextField
          fullWidth
          label="Or paste video URL"
          value={
            props.ActionbarData.src &&
            String(props.ActionbarData.src).indexOf("data:") === 0
              ? ""
              : props.ActionbarData.src || ""
          }
          onChange={(event) => handleChange("src", event)}
          placeholder="https://…"
        />
      </ListItem>
      <ListItem>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={props.ActionbarData.controls !== false}
              onChange={(event) => {
                const clone = Object.assign(props.ActionbarData, {});
                clone.controls = event.target.checked;
                props.updateAppComponent(clone);
              }}
            />
          }
          label="Controls"
        />
      </ListItem>
      <ListItem>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={!!props.ActionbarData.autoplay}
              onChange={(event) => {
                const clone = Object.assign(props.ActionbarData, {});
                clone.autoplay = event.target.checked;
                props.updateAppComponent(clone);
              }}
            />
          }
          label="Autoplay"
        />
      </ListItem>
      <ListItem>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={props.ActionbarData.muted !== false}
              onChange={(event) => {
                const clone = Object.assign(props.ActionbarData, {});
                clone.muted = event.target.checked;
                props.updateAppComponent(clone);
              }}
            />
          }
          label="Muted"
        />
      </ListItem>
      <ListItem>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={!!props.ActionbarData.loop}
              onChange={(event) => {
                const clone = Object.assign(props.ActionbarData, {});
                clone.loop = event.target.checked;
                props.updateAppComponent(clone);
              }}
            />
          }
          label="Loop"
        />
      </ListItem>
    </List>
  );
}
