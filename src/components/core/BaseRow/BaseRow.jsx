import React, { useState, createElement } from "react";

// Components
import RowMenu from "../RowMenu/RowMenu";
import ColMenu from "../ColMenu/ColMenu";

// Libraries
import { Row, Col, Select } from "@hybris-software/ui-kit";

// Settings
import {
  paperHeight,
  maxColumns,
  componentIds,
  headerHeight,
} from "../../../data/settings";

// Styles
import Style from "./BaseRow.module.css";

const BaseRow = ({
  row,
  setRows,
  horizontalSpace,
  rows,
  componentsList,
  form,
  removeNoise,
  generalModalRef,
  page,
}) => {
  // Sizes
  const sumOfColSizes = row.columns.reduce((acc, col) => acc + col.colSize, 0);
  const sumOfRowSizes = rows.reduce((acc, row) => acc + row.rowSize, 0);
  const computedHeaderHeight = page.header.show ? headerHeight : 0;
  const height =
    (paperHeight -
      computedHeaderHeight -
      form.values.verticalSpace * (sumOfRowSizes - 1)) *
    (row.rowSize / sumOfRowSizes);

  return (
    <div
      className={Style.rowContainer}
      style={{
        height: height,
      }}
    >
      <RowMenu
        setRows={setRows}
        row={row}
        rows={rows}
        modalRef={generalModalRef}
        removeNoise={removeNoise}
      />
      <Row
        className={Style.baseRow}
        columnGap={{
          horizontal: {
            xs: horizontalSpace,
            sm: horizontalSpace,
            md: horizontalSpace,
            lg: horizontalSpace,
          },
        }}
      >
        {row.columns.map((column, index) => {
          const colSize = (maxColumns / sumOfColSizes) * column.colSize;

          return (
            <Col key={index} xs={colSize} className={Style.baseCol}>
              <ColMenu
                row={row}
                setRows={setRows}
                column={column}
                modalRef={generalModalRef}
                removeNoise={removeNoise}
              />
              {column.element ? (
                createElement(componentIds[column.element], {
                  rows: { rows },
                  form: { form },
                })
              ) : (
                <BaseColContent
                  setRows={setRows}
                  column={column}
                  columns={row.columns}
                  row={row}
                  componentsList={componentsList}
                />
              )}
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

const BaseColContent = ({ setRows, column, row, componentsList }) => {
  const [selectValue, setSelectValue] = useState(null);
  return (
    <div className={Style.baseColContent}>
      <div>Select component...</div>
      <Select
        items={componentsList}
        placeholder="Select component"
        value={selectValue}
        setValue={(value) => {
          setSelectValue(value);
          setRows((rows) => {
            const newRows = [...rows];
            const rowIndex = newRows.findIndex((r) => r.id === row.id);
            const columnIndex = newRows[rowIndex].columns.findIndex(
              (c) => c.id === column.id
            );
            newRows[rowIndex].columns[columnIndex].element = value.value;
            return newRows;
          });
        }}
      />
    </div>
  );
};

export default BaseRow;
