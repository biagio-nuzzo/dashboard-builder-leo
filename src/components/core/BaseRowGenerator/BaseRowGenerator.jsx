import React from "react";

// Components
import BaseRow from "../BaseRow/BaseRow";
import Header from "../Header/Header";

// Settings
import { generateId } from "../../../utils/utils";

// Styles
import Style from "./BaseRowGenerator.module.css";
import Footer from "../Footer/Footer";

const BaseRowGenerator = ({
  rows,
  setRows,
  form,
  removeNoise,
  generalModalRef,
  page,
  setPages,
  pageIndex,
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
        gap: form.values.verticalSpace,
      }}
    >
      {page.header.show && (
        <Header
          modalRef={generalModalRef}
          setPages={setPages}
          pageIndex={pageIndex}
          removeNoise={removeNoise}
        />
      )}
      {rows.map((row, index) => {
        return (
          <BaseRow
            page={page}
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

      <Footer pageIndex={pageIndex} />
    </div>
  );
};

export default BaseRowGenerator;
