import React from "react";

// Libraries
import { useScreenshot } from "use-react-screenshot";

// Icons
import { AiOutlineFilePdf } from "react-icons/ai";
import { BiZoomIn, BiZoomOut } from "react-icons/bi";
import { MdCenterFocusStrong } from "react-icons/md";

// Utils
import { generatePdfFromImages } from "../../../utils/utils";

// Settings
import {
  zoomMax,
  zoomMin,
  zoomStep,
  zoomStepSmoothing,
} from "../../../data/settings";

// Styles
import Style from "./GlobalSettings.module.css";

const GlobalSettings = ({
  zoom,
  setZoom,
  focusRef,
  setLoader,
  setRemoveNoise,
  paperOneRef,
  paperTwoRef,
}) => {
  // Hooks
  // eslint-disable-next-line no-unused-vars
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
  });

  const downloadScreenshot = ({ paperRef }) => takeScreenShot(paperRef.current);

  return (
    <div className={Style.settingsMenu}>
      <div
        className={Style.settingComponent}
        style={{
          opacity: zoom >= zoomMax ? 0.5 : 1,
        }}
        onClick={() => {
          setLoader(true);
          setRemoveNoise(true);
          setTimeout(async () => {
            const image1 = await downloadScreenshot({
              paperRef: paperOneRef,
            });
            const image2 = await downloadScreenshot({
              paperRef: paperTwoRef,
            });
            generatePdfFromImages([image1, image2]);
            setTimeout(() => {
              setRemoveNoise(false);
              setLoader(false);
            }, 500);
          }, 500);
        }}
      >
        <AiOutlineFilePdf />
      </div>
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
