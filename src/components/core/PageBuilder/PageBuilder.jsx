import React, { useRef, useState } from "react";

// Libraries
import useForm from "@hybris-software/use-ful-form";

// Components
import BaseRowGenerator from "../BaseRowGenerator/BaseRowGenerator";
import PageMenu from "../PageMenu/PageMenu";

// Styles
import Style from "./PageBuilder.module.css";

const PageBuilder = ({ layouts, layoutsPost, generalModalRef }) => {
  // States
  const [rows, setRows] = useState([]);
  const [removeNoise, setRemoveNoise] = useState(false);

  // Refs
  const paperRef = useRef(null);

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

  return (
    <div>
      <PageMenu
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
          removeNoise={removeNoise}
          generalModalRef={generalModalRef}
        />
      </div>
    </div>
  );
};

export default PageBuilder;
