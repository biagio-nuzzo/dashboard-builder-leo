import React from "react";

// Libraries
import { Button, InputField } from "@hybris-software/ui-kit";
import useForm from "@hybris-software/use-ful-form";

// Utils
import { numberToWord } from "../../../utils/utils";

// Settings
import { maxRows } from "../../../data/settings";

// Styles
import Style from "./RowSettings.module.css";

const RowSettings = ({ row, setRows, modalRef, rows }) => {
  const numberFormatter = (value) => {
    const tmpValue = parseInt(value.replace(/[^0-9]/g, "")) || 1;
    const sumOfRowSizes = rows.reduce((acc, row) => acc + row.rowSize, 0);
    const maxValueAccepted = maxRows - sumOfRowSizes + row.rowSize;
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
      rowSize: {
        value: row.rowSize,
        validator: (value) => {
          if (value === "") return [false, "Row size is required"];
          else if (value === 0)
            return [false, "Row size must be greater than 0"];
          else return [true, ""];
        },
        formatter: (value) => {
          return numberFormatter(value, maxRows);
        },
      },
    },
  });

  return (
    <div>
      <div className={Style.modalSection}>
        <h3>Row Size</h3>
        <p>
          Insert the row size do you prefer. You can create maximum {maxRows}{" "}
          rows with size 1 or different combination of rows with different
          sizes. (ex. One row with size 2 and {numberToWord(maxRows - 2)} rows
          with size 1). The row size increase the height of the row.
        </p>
        <InputField {...form.getInputProps("rowSize")} />
      </div>
      <div className={Style.buttonContainer}>
        <Button
          onClick={() => {
            // update row size
            setRows((rows) => {
              const newRows = [...rows];
              const rowIndex = newRows.findIndex((r) => r.id === row.id);
              newRows[rowIndex].rowSize = form.values.rowSize;
              return newRows;
            });

            modalRef.current.hide();
          }}
        >
          Confirm Changes
        </Button>
      </div>
    </div>
  );
};

export default RowSettings;
