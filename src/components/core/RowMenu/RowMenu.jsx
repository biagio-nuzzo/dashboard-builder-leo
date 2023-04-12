import React from "react";

// Components
import RowSettings from "../RowSettings/RowSettings";

// Icons
import { IoMdAddCircleOutline, IoMdSettings } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";

// Utils
import { generateId } from "../../../utils/utils";

// Styles
import Style from "./RowMenu.module.css";

const RowMenu = ({ row, rows, setRows, modalRef, removeNoise }) => {
  const modalBody = (
    <RowSettings row={row} setRows={setRows} modalRef={modalRef} rows={rows} />
  );
  return (
    <span
      className={Style.menuRowButtonsContainer}
      style={{
        opacity: removeNoise ? 0 : 1,
      }}
    >
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
                colSize: 1,
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

export default RowMenu;