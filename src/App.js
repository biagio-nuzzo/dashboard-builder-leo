import React, { useState, useRef, useEffect } from "react";

// Libraries
import { ThemeProvider, MagicModal } from "@hybris-software/ui-kit";
import useQuery from "@hybris-software/use-query";

// Components
// core
import MouseDrag from "./components/core/MouseDrag/MouseDrag";
import GlobalSettings from "./components/core/GlobalSettings/GlobalSettings";
import PageBuilder from "./components/core/PageBuilder/PageBuilder";

// Styles
import Style from "./App.module.css";

function App() {
  // States
  const [zoom, setZoom] = useState(1);

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
  const generalModalRef = useRef(null);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider>
      <MouseDrag>
        <MagicModal ref={generalModalRef} />
        <GlobalSettings zoom={zoom} setZoom={setZoom} focusRef={focusRef} />
        <div className={Style.mainContainer}>
          <div className={Style.pagesContainer} ref={zoomRef}>
            <div className={Style.focusInput}>
              <input ref={focusRef} />
            </div>
            <PageBuilder
              layouts={layouts}
              layoutsPost={layoutsPost}
              generalModalRef={generalModalRef}
            />
            <PageBuilder
              layouts={layouts}
              layoutsPost={layoutsPost}
              generalModalRef={generalModalRef}
            />
          </div>
        </div>
      </MouseDrag>
    </ThemeProvider>
  );
}

export default App;
