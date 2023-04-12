import React from "react";

// Components
import BaseRow from "../BaseRow/BaseRow";

// Styles
import Style from "./BaseRowGenerator.module.css";

const BaseRowGenerator = ({
  rows,
  setRows,
  form,
  componentsList,
  removeNoise,
  generalModalRef,
}) => {
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
