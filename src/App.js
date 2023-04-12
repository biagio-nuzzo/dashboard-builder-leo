import React, { useState, useRef, useEffect } from "react";

// Libraries
import { ThemeProvider, MagicModal } from "@hybris-software/ui-kit";
import useForm from "@hybris-software/use-ful-form";
import useQuery from "@hybris-software/use-query";

// Components
// core
import MouseDrag from "./components/core/MouseDrag/MouseDrag";
import BaseRowGenerator from "./components/core/BaseRowGenerator/BaseRowGenerator";
import GlobalSettings from "./components/core/GlobalSettings/GlobalSettings";
import PageMenu from "./components/core/PageMenu/PageMenu";

// Utils
import { generateId } from "./utils/utils";

// Styles
import Style from "./App.module.css";

function App() {
  // States
  const [rows, setRows] = useState([]);
  const [zoom, setZoom] = useState(1);
  const [removeNoise, setRemoveNoise] = useState(false);

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

  // Effects
  useEffect(() => {
    if (zoomRef?.current) {
      zoomRef.current.style.zoom = zoom;
    }
  }, [zoom]);

  return (
    <ThemeProvider>
      <MouseDrag>
        <MagicModal ref={generalModalRef} />
        <GlobalSettings zoom={zoom} setZoom={setZoom} focusRef={focusRef} />
        <div className={Style.mainContainer}>
          <div ref={zoomRef}>
            <PageMenu
              focusRef={focusRef}
              paperRef={paperRef}
              rows={rows}
              setRows={setRows}
              layouts={layouts}
              layoutsPost={layoutsPost}
              setRemoveNoise={setRemoveNoise}
              form={form}
            />
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

export default App;
