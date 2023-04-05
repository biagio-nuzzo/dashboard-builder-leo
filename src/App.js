import React, { useState } from "react";

// Libraries
import {
  ThemeProvider,
  Row,
  Col,
  Button,
  InputField,
  Select,
} from "@hybris-software/ui-kit";
import useForm from "@hybris-software/use-ful-form";

// Components
import LineChart from "./Components/LineChart/LineChart";
import BarChart from "./Components/BarChart/BarChart";

// Icons
import {
  IoMdAddCircleOutline,
  IoMdSettings,
  IoIosRemoveCircleOutline,
} from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";

// Styles
import Style from "./App.module.css";

// Utils
const generateId = (elType = "row") => {
  const timestamp = Math.floor(Date.now() / 1000);
  const random = Math.floor(Math.random() * 1000);
  const randomString = Math.random().toString(36).substring(2, 15);
  return `${timestamp}-${random}-${randomString}-${elType}`;
};

// V0.1

const generateBaseRow = () => {
  return {
    id: generateId(),
    columns: [
      {
        id: generateId("column"),
        element: null,
      },
    ],
  };
};

const componentsList = [
  {
    id: generateId("component"),
    label: "Line Chart",
    value: <LineChart />,
  },
  {
    id: generateId("component"),
    label: "Bar Chart",
    value: <BarChart />,
  },
];

function App() {
  const [rows, setRows] = useState([]);

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
    <ThemeProvider>
      <div className={Style.mainContainer}>
        <div className={Style.globalBuilderMenu}>
          <Button
            onClick={() => {
              setRows((rows) => {
                const newRows = [...rows];
                newRows.push(generateBaseRow());
                return newRows;
              });
            }}
          >
            Add Row
          </Button>
          <div className={Style.inputFieldContainer}>
            <label>Vertical space between rows</label>
            <InputField {...form.getInputProps("verticalSpace")} />
          </div>
          <div className={Style.inputFieldContainer}>
            <label>Horizontal space between columns</label>
            <InputField {...form.getInputProps("horizontalSpace")} />
          </div>
        </div>
        <div className={Style.paper}>
          <BaseRowGenerator rows={rows} setRows={setRows} form={form} />
        </div>
      </div>
    </ThemeProvider>
  );
}

const BaseRow = ({ row, setRows, horizontalSpace }) => {
  const colSize = 12 / row.columns.length;

  return (
    <div className={Style.rowContainer}>
      <RowMenu setRows={setRows} row={row} />
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
          return (
            <Col
              key={index}
              column={column}
              setRows={setRows}
              sm={colSize}
              className={Style.baseCol}
            >
              <ColMenu setRows={setRows} column={column} />
              {column.element ? (
                column.element
              ) : (
                <BaseColContent
                  setRows={setRows}
                  column={column}
                  columns={row.columns}
                  row={row}
                />
              )}
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

const BaseRowGenerator = ({ rows, setRows, form }) => {
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
          />
        );
      })}
    </div>
  );
};

const BaseColContent = ({ setRows, column, columns, row }) => {
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

const RowMenu = ({ row, setRows }) => {
  return (
    <span className={Style.menuRowButtonsContainer}>
      <span>
        <IoMdAddCircleOutline
          className={Style.menuIcons}
          onClick={() => {
            setRows((rows) => {
              const newRows = [...rows];
              const rowIndex = newRows.findIndex((r) => r.id === row.id);
              newRows[rowIndex].columns.push({
                id: generateId("column"),
                element: null,
              });
              return newRows;
            });
          }}
        />
      </span>
      <span>
        <IoMdSettings className={Style.menuIcons} />
      </span>
      <span>
        <RxCrossCircled
          className={Style.menuIconsDelete}
          onClick={() => {
            setRows((rows) => rows.filter((r) => r.id !== row.id));
          }}
        />
      </span>
    </span>
  );
};

const ColMenu = ({ column, setRows }) => {
  return (
    <span className={Style.menuColButtonsContainer}>
      <span>
        <IoIosRemoveCircleOutline
          className={Style.menuIcons}
          onClick={() => {
            // Remove this column
            setRows((rows) => {
              const newRows = [...rows];
              const rowIndex = newRows.findIndex((r) =>
                r.columns.find((c) => c.id === column.id)
              );
              const columnIndex = newRows[rowIndex].columns.findIndex(
                (c) => c.id === column.id
              );
              newRows[rowIndex].columns.splice(columnIndex, 1);
              return newRows;
            });
          }}
        />
      </span>
    </span>
  );
};

export default App;
