import React from "react";

// Icons
import { BiZoomIn, BiZoomOut } from "react-icons/bi";
import { MdCenterFocusStrong } from "react-icons/md";

// Settings
import {
  zoomMax,
  zoomMin,
  zoomStep,
  zoomStepSmoothing,
} from "../../../data/settings";

// Styles
import Style from "./GlobalSettings.module.css";

const GlobalSettings = ({ zoom, setZoom, focusRef }) => {
  return (
    <div className={Style.settingsMenu}>
      <div
        className={Style.settingComponent}
        style={{
          opacity: zoom >= zoomMax ? 0.5 : 1,
        }}
        onClick={() => {
          if (zoom >= zoomMax) return;

          for (let i = 0; i < zoomStepSmoothing; i++) {
            setTimeout(() => {
              setZoom((zoom) => {
                return zoom + zoomStep / zoomStepSmoothing;
              });
            }, 10 * i);
          }
        }}
      >
        <BiZoomIn />
      </div>
      <div
        className={Style.settingComponent}
        style={{
          opacity: zoom <= zoomMin ? 0.5 : 1,
        }}
        onClick={() => {
          if (zoom <= zoomMin) return;

          for (let i = 0; i < zoomStepSmoothing; i++) {
            setTimeout(() => {
              setZoom((zoom) => {
                return zoom - zoomStep / zoomStepSmoothing;
              });
            }, 10 * i);
          }
        }}
      >
        <BiZoomOut />
      </div>
      <div
        className={Style.settingComponent}
        onClick={() => {
          focusRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "center",
          });
        }}
      >
        <MdCenterFocusStrong />
      </div>
    </div>
  );
};

export default GlobalSettings;
