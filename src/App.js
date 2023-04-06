import React, { useState, useRef, useEffect } from "react";

// Libraries
import {
  ThemeProvider,
  Row,
  Col,
  Button,
  InputField,
  Select,
  MagicModal,
} from "@hybris-software/ui-kit";
import useForm from "@hybris-software/use-ful-form";

// Components
import LineChart from "./Components/LineChart/LineChart";
import BarChart from "./Components/BarChart/BarChart";
import MouseDrag from "./Components/MouseDrag/MouseDrag";

// Icons
import {
  IoMdAddCircleOutline,
  IoMdSettings,
  IoIosRemoveCircleOutline,
} from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import { BiZoomIn, BiZoomOut } from "react-icons/bi";
import { MdCenterFocusStrong } from "react-icons/md";

// Styles
import Style from "./App.module.css";

// Utils
const generateId = (elType = "row") => {
  const timestamp = Math.floor(Date.now() / 1000);
  const random = Math.floor(Math.random() * 1000);
  const randomString = Math.random().toString(36).substring(2, 15);
  return `${timestamp}-${random}-${randomString}-${elType}`;
};

const generateBaseRow = () => {
  return {
    id: generateId(),
    rowSize: 1,
    columns: [
      {
        id: generateId("column"),
        element: null,
      },
    ],
  };
};

// Constants
const maxRows = 6;
const padding = 75;
const paperHeight = 1400 * 1.41451 - padding;
const zoomStep = 0.05;
const zoomMax = 1.5;
const zoomMin = 0.3;

const componentIds = {
  lineChart: LineChart,
  barChart: BarChart,
};

function App() {
  // States
  const [rows, setRows] = useState([]);
  const [zoom, setZoom] = useState(1);

  // Components
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

  // Refs
  const zoomRef = useRef(null);
  const focusRef = useRef(null);

  // Effects
  useEffect(() => {
    zoomRef.current.style.zoom = zoom;
  }, [zoom]);

  useEffect(() => {
    focusRef.current.focus();
    focusRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "center",
    });
  }, []);
  return (
    <ThemeProvider>
      <MouseDrag>
        <GlobalSettings zoom={zoom} setZoom={setZoom} focusRef={focusRef} />
        <div ref={zoomRef} className={Style.mainContainer}>
          <div className={Style.globalBuilderMenu}>
            <div className={Style.focusInput}>
              <input ref={focusRef} />
            </div>
            <Button
              onClick={() => {
                console.log(rows);
              }}
            >
              Log Rows
            </Button>
            <Button
              disabled={rows.length >= maxRows}
              onClick={() => {
                const sumOfRowSizes = rows.reduce(
                  (acc, row) => acc + row.rowSize,
                  0
                );
                if (sumOfRowSizes >= maxRows) return;
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
            <BaseRowGenerator
              rows={rows}
              setRows={setRows}
              form={form}
              componentsList={componentsList}
            />
          </div>
        </div>
      </MouseDrag>
    </ThemeProvider>
  );
}

const BaseRowGenerator = ({ rows, setRows, form, componentsList }) => {
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
          />
        );
      })}
    </div>
  );
};

const BaseRow = ({
  row,
  setRows,
  horizontalSpace,
  rows,
  componentsList,
  form,
}) => {
  // Sizes
  const colSize = 12 / row.columns.length;
  const sumOfRowSizes = rows.reduce((acc, row) => acc + row.rowSize, 0);
  const height =
    (paperHeight - form.values.verticalSpace * (sumOfRowSizes - 1)) *
    (row.rowSize / sumOfRowSizes);

  // Refs
  const modalRef = useRef(null);
  return (
    <div
      className={Style.rowContainer}
      style={{
        height: height,
      }}
    >
      <RowMenu setRows={setRows} row={row} rows={rows} modalRef={modalRef} />
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
            <Col key={index} sm={colSize} className={Style.baseCol}>
              <ColMenu setRows={setRows} column={column} />
              {column.element ? (
                React.createElement(componentIds[column.element], {
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

const RowMenu = ({ row, rows, setRows, modalRef }) => {
  const modalBody = (
    <RowSettings row={row} setRows={setRows} modalRef={modalRef} rows={rows} />
  );
  return (
    <span className={Style.menuRowButtonsContainer}>
      <MagicModal ref={modalRef} />
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
        <IoMdSettings
          className={Style.menuIcons}
          onClick={() => {
            modalRef.current.updateBody(modalBody);
          }}
        />
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

const RowSettings = ({ row, setRows, modalRef, rows }) => {
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
        },
      },
    },
  });

  return (
    <div>
      <InputField {...form.getInputProps("rowSize")} />
      <Button
        onClick={() => {
          // Update rowSize in this row
          setRows((rows) => {
            const newRows = [...rows];
            const rowIndex = newRows.findIndex((r) => r.id === row.id);
            newRows[rowIndex].rowSize = parseInt(form.values.rowSize);
            return newRows;
          });

          // Close modal
          modalRef.current.hide();
        }}
      >
        Confirm
      </Button>
    </div>
  );
};

const GlobalSettings = ({ zoom, setZoom, focusRef }) => {
  const [zoomIsChanging, setZoomIsChanging] = useState(null);
  const [autoCenterOnZoom, setAutoCenterOnZoom] = useState(true);

  useEffect(() => {
    if (autoCenterOnZoom) {
      if (zoomIsChanging) {
        const timeout = setTimeout(() => {
          setZoomIsChanging(false);
        }, 750);
        return () => clearTimeout(timeout);
      } else if (zoomIsChanging === false) {
        focusRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "center",
        });
        setZoomIsChanging(null);
      }
    }
  }, [zoomIsChanging, autoCenterOnZoom]);

  return (
    <div className={Style.settingsMenu}>
      <div
        className={Style.settingComponent}
        style={{
          opacity: zoom >= zoomMax ? 0.5 : 1,
        }}
        onClick={() => {
          if (zoom >= zoomMax) return;
          setZoom((zoom) => {
            return zoom + zoomStep;
          });
          setZoomIsChanging(true);
        }}
      >
        <BiZoomIn />
      </div>
      <div
        className={Style.settingComponent}
        style={{
          opacity: zoom <= zoomMin ? 0.5 : 1,
        }}
        onClick={() => {
          if (zoom <= zoomMin) return;
          setZoom((zoom) => {
            return zoom - zoomStep;
          });
          setZoomIsChanging(true);
        }}
      >
        <BiZoomOut />
      </div>
      <div
        className={Style.settingComponent}
        onClick={() => {
          focusRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "center",
          });
        }}
      >
        <MdCenterFocusStrong />
      </div>
      <div
        className={Style.settingComponent}
        onClick={() => {
          setAutoCenterOnZoom(!autoCenterOnZoom);
        }}
      >
        <div className={Style.settingsTooltip}>
          <p>Enable auto center on zoom</p>
        </div>
        <input
          style={{ cursor: "pointer" }}
          type="checkbox"
          checked={autoCenterOnZoom}
          onChange={(e) => {
            setAutoCenterOnZoom(e.target.checked);
          }}
        />
      </div>
    </div>
  );
};

export default App;
