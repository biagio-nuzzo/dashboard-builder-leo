import React from "react";

// Libraries
import { Button, InputField } from "@hybris-software/ui-kit";
import useForm from "@hybris-software/use-ful-form";

// Utils
import { numberToWord } from "../../../utils/utils";

// Settings
import { maxColumns } from "../../../data/settings";

// Styles
import Style from "./ColSettings.module.css";

const ColSettings = ({ column, row, setRows, modalRef }) => {
  const numberFormatter = (value) => {
    const tmpValue = parseInt(value.replace(/[^0-9]/g, "")) || 1;
    const sumOfColSizes = row.columns.reduce(
      (acc, col) => acc + col.colSize,
      0
    );
    const maxValueAccepted = maxColumns - sumOfColSizes + column.colSize;
    if (tmpValue > maxValueAccepted) {
      return maxValueAccepted;
    } else if (value === "") {
      return "";
    } else if (value === 0) {
      return 1;
    } else {
      return tmpValue;
    }
  };

  const form = useForm({
    inputs: {
      colSize: {
        value: column.colSize,
        validator: (value) => {
          if (value === "") return [false, "Column size is required"];
          else if (value === 0)
            return [false, "Column size must be greater than 0"];
          else return [true, ""];
        },
        formatter: numberFormatter,
      },
    },
  });

  return (
    <div>
      <div className={Style.modalSection}>
        <h3>Column Size</h3>
        <p>
          Insert the column size do you prefer. You can create maximum{" "}
          {maxColumns} columns with size 1 or different combination of columns
          with different sizes. (ex. One column with size 2 and{" "}
          {numberToWord(maxColumns - 2)} columns with size 1). The column size
          increase the width of the column.
        </p>
        <InputField {...form.getInputProps("colSize")} />
      </div>
      <div className={Style.buttonContainer}>
        <Button
          onClick={() => {
            // update col size
            setRows((rows) => {
              const newRows = [...rows];
              const rowIndex = newRows.findIndex((r) => r.id === row.id);
              const columnIndex = newRows[rowIndex].columns.findIndex(
                (c) => c.id === column.id
              );
              newRows[rowIndex].columns[columnIndex].colSize = parseInt(
                form.values.colSize
              );
              return newRows;
            });
            form.reset();
            modalRef.current.destroy();
          }}
        >
          Confirm Changes
        </Button>
      </div>
    </div>
  );
};

export default ColSettings;
