import React from "react";

// Components
import BaseRow from "../BaseRow/BaseRow";

// Settings
import { generateId } from "../../../utils/utils";

// Styles
import Style from "./BaseRowGenerator.module.css";

const BaseRowGenerator = ({
  rows,
  setRows,
  form,
  removeNoise,
  generalModalRef,
}) => {
  
  // Components List
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

  return (
    <div
      className={Style.rowsContainer}
      style={{
        gap: rows.length > 1 ? `${form.values.verticalSpace}px` : 0,
      }}
    >
      {rows.map((row, index) => {
        return (
          <BaseRow
            key={index}
            setRows={setRows}
            row={row}
            horizontalSpace={form.values.horizontalSpace}
            componentsList={componentsList}
            rows={rows}
            form={form}
            removeNoise={removeNoise}
            generalModalRef={generalModalRef}
          />
        );
      })}
    </div>
  );
};

export default BaseRowGenerator;
