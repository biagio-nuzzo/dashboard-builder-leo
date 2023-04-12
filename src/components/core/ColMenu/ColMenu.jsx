import React from "react";

// Components
import ColSettings from "../ColSettings/ColSettings";

// Icons
import { IoMdSettings, IoIosRemoveCircleOutline } from "react-icons/io";

// Styles
import Style from "./ColMenu.module.css";

const ColMenu = ({ column, row, setRows, modalRef, removeNoise }) => {
  const modalBody = (
    <ColSettings
      row={row}
      column={column}
      setRows={setRows}
      modalRef={modalRef}
    />
  );
  return (
    <span
      className={Style.menuColButtonsContainer}
      style={{
        opacity: removeNoise ? 0 : 1,
      }}
    >
      <span>
        <IoIosRemoveCircleOutline
          className={Style.menuIcons}
          onClick={() => {
            if (column.element === null) {
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
            } else {
              setRows((rows) => {
                const newRows = [...rows];
                const rowIndex = newRows.findIndex((r) =>
                  r.columns.find((c) => c.id === column.id)
                );
                const columnIndex = newRows[rowIndex].columns.findIndex(
                  (c) => c.id === column.id
                );
                newRows[rowIndex].columns[columnIndex].element = null;
                return newRows;
              });
            }
          }}
        />
      </span>
      {/* settings */}
      <span>
        <IoMdSettings
          className={Style.menuIcons}
          onClick={() => {
            modalRef.current.updateBody(modalBody);
          }}
        />
      </span>
    </span>
  );
};

export default ColMenu;
