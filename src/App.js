import React, { useState, useRef, useEffect } from "react";

// Libraries
import { ThemeProvider, MagicModal } from "@hybris-software/ui-kit";
import useQuery from "@hybris-software/use-query";

// Components
// core
import MouseDrag from "./components/core/MouseDrag/MouseDrag";
import GlobalSettings from "./components/core/GlobalSettings/GlobalSettings";
import PageBuilder from "./components/core/PageBuilder/PageBuilder";

// Utils
import { generateId } from "./utils/utils";

// Styles
import Style from "./App.module.css";

function App() {
  // States
  const [zoom, setZoom] = useState(1);
  const [pages, setPages] = useState([
    {
      id: generateId("page"),
      rows: [],
      header: {
        show: true,
        image: null,
        imageOptions: {
          fullWidth: false,
        },
        text: "",
        textOptions: {
          fontSize: 20,
          bold: false,
        },
      },
    },
    {
      id: generateId("page"),
      rows: [],
      header: {
        show: false,
        image: null,
        imageOptions: {
          fullWidth: false,
        },
        text: "",
        textOptions: {
          fontSize: 20,
          bold: false,
        },
      },
    },
  ]);

  const setPageRows = (pageIndex, rows) => {
    return setPages((pages) => {
      const newPages = [...pages];
      if (typeof rows === "function") {
        newPages[pageIndex].rows = rows(newPages[pageIndex].rows);
      } else {
        newPages[pageIndex].rows = rows;
      }
      return newPages;
    });
  };

  // Queries
  const layouts = useQuery({
    url: "layouts/",
    method: "GET",
    executeImmediately: true,
    onSuccess: (data) => {
      // console.log(data);
    },
    onError: (error) => {
      // console.log(error);
    },
  });

  const layoutsPost = useQuery({
    url: "layouts/",
    method: "POST",
    onSuccess: (data) => {
      // console.log(data);
    },
    onError: (error) => {
      // console.log(error);
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
            {pages.map((page, index) => (
              <PageBuilder
                key={page.id}
                layouts={layouts}
                layoutsPost={layoutsPost}
                generalModalRef={generalModalRef}
                rows={page.rows}
                setRows={(rows) => setPageRows(index, rows)}
                page={page}
                setPages={setPages}
                pageIndex={index}
              />
            ))}
          </div>
        </div>
      </MouseDrag>
    </ThemeProvider>
  );
}

export default App;
