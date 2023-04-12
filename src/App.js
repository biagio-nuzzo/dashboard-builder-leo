import React, { useState, useRef, useEffect } from "react";

import { useScreenshot, createFileName } from "use-react-screenshot";

// Libraries
import {
  ThemeProvider,
  Button,
  InputField,
  Select,
  MagicModal,
} from "@hybris-software/ui-kit";
import useForm from "@hybris-software/use-ful-form";
import useQuery from "@hybris-software/use-query";

// Components
// core
import MouseDrag from "./components/core/MouseDrag/MouseDrag";
import BaseRowGenerator from "./components/core/BaseRowGenerator/BaseRowGenerator";

// Icons
import { BiZoomIn, BiZoomOut } from "react-icons/bi";
import { MdCenterFocusStrong } from "react-icons/md";

// Utils
import { generateId, generateBaseRow } from "./utils/utils";

// Styles
import Style from "./App.module.css";

// Settings
import {
  maxRows,
  zoomStepSmoothing,
  zoomStep,
  zoomMin,
  zoomMax,
} from "./data/settings";

function App() {
  // States
  const [rows, setRows] = useState([]);
  const [zoom, setZoom] = useState(1);
  const [removeNoise, setRemoveNoise] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState(null);

  // Components
  const componentsList = [
    {
      id: generateId("component"),
      label: "Line Chart",
      value: "lineChart",
    },
    {
      id: generateId("component"),
      label: "Bar Chart",
      value: "barChart",
    },
  ];

  // Form
  const form = useForm({
    inputs: {
      verticalSpace: {
        value: 20,
        formatter: (value) => {
          return value.replace(/[^0-9]/g, "");
        },
      },
      horizontalSpace: {
        value: 20,
        formatter: (value) => {
          return value.replace(/[^0-9]/g, "");
        },
      },
    },
  });

  // Queries
  const layouts = useQuery({
    url: "layouts/",
    method: "GET",
    executeImmediately: true,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const layoutsPost = useQuery({
    url: "layouts/",
    method: "POST",
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // Refs
  const zoomRef = useRef(null);
  const focusRef = useRef(null);
  const paperRef = useRef(null);
  const generalModalRef = useRef(null);

  // Hooks
  // eslint-disable-next-line no-unused-vars
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
  });

  const download = (image, { name = "img", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const downloadScreenshot = () =>
    takeScreenShot(paperRef.current).then(download);

  // Effects
  useEffect(() => {
    if (zoomRef?.current) {
      zoomRef.current.style.zoom = zoom;
    }
  }, [zoom]);

  useEffect(() => {
    if (focusRef?.current) {
      focusRef.current.focus();
      focusRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "center",
      });
    }
  }, []);

  return (
    <ThemeProvider>
      <MouseDrag>
        <MagicModal ref={generalModalRef} />
        <GlobalSettings zoom={zoom} setZoom={setZoom} focusRef={focusRef} />

        <div className={Style.mainContainer}>
          <div ref={zoomRef}>
            <div className={Style.globalBuilderMenu}>
              <div className={Style.focusInput}>
                <input ref={focusRef} />
              </div>
              <Button
                onClick={() => {
                  console.log(rows);
                  console.log(JSON.stringify(rows));
                }}
              >
                Log Rows
              </Button>
              <Button
                onClick={() => {
                  layoutsPost.executeQuery({
                    name: "2x2",
                    structure: JSON.stringify(rows),
                  });
                }}
              >
                Save Layout
              </Button>
              <Select
                items={layouts?.response?.data}
                labelKey="name"
                value={selectedLayout}
                setValue={setSelectedLayout}
                placeholder="Select Layout"
                onSelectChange={(value) => {
                  setRows(JSON.parse(value.structure));
                }}
              ></Select>
              <Button
                onClick={() => {
                  setRemoveNoise(true);
                  setTimeout(() => {
                    downloadScreenshot();
                  }, 300);
                  setTimeout(() => {
                    setRemoveNoise(false);
                  }, 300);
                }}
              >
                Export
              </Button>
              <Button
                disabled={rows.length >= maxRows}
                onClick={() => {
                  const sumOfRowSizes = rows.reduce(
                    (acc, row) => acc + row.rowSize,
                    0
                  );
                  if (sumOfRowSizes >= maxRows) return;
                  setRows((rows) => {
                    const newRows = [...rows];
                    newRows.push(generateBaseRow());
                    return newRows;
                  });
                }}
              >
                Add Row
              </Button>
              <div className={Style.inputFieldContainer}>
                <label>Vertical space between rows</label>
                <InputField {...form.getInputProps("verticalSpace")} />
              </div>
              <div className={Style.inputFieldContainer}>
                <label>Horizontal space between columns</label>
                <InputField {...form.getInputProps("horizontalSpace")} />
              </div>
            </div>
            <div id="paper" ref={paperRef} className={Style.paper}>
              <BaseRowGenerator
                rows={rows}
                setRows={setRows}
                form={form}
                componentsList={componentsList}
                removeNoise={removeNoise}
                generalModalRef={generalModalRef}
              />
            </div>
          </div>
        </div>
      </MouseDrag>
    </ThemeProvider>
  );
}

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

export default App;
