import React, { useState } from "react";

// Libraries
import { Button, Select, InputField } from "@hybris-software/ui-kit";
import { useScreenshot, createFileName } from "use-react-screenshot";

// Utils
import { generateBaseRow } from "../../../utils/utils";

// Settings
import { maxRows } from "../../../data/settings";

// Style
import Style from "./PageMenu.module.css";

const PageMenu = ({
  paperRef,
  rows,
  setRows,
  layoutsPost,
  layouts,
  setRemoveNoise,
  form,
}) => {
  // States
  const [selectedLayout, setSelectedLayout] = useState(null);

  // Hooks
  // eslint-disable-next-line no-unused-vars
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
  });

  const download = (image, { name = "img", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const downloadScreenshot = () =>
    takeScreenShot(paperRef.current).then(download);

  return (
    <div className={Style.globalBuilderMenu}>
      <Button
        onClick={() => {
          console.log(rows);
          console.log(JSON.stringify(rows));
        }}
      >
        Log Rows
      </Button>
      <Button
        onClick={() => {
          layoutsPost.executeQuery({
            name: "2x2",
            structure: JSON.stringify(rows),
          });
        }}
      >
        Save Layout
      </Button>
      <Select
        items={layouts?.response?.data}
        labelKey="name"
        value={selectedLayout}
        setValue={setSelectedLayout}
        placeholder="Select Layout"
        onSelectChange={(value) => {
          setRows(JSON.parse(value.structure));
        }}
      ></Select>
      <Button
        onClick={() => {
          setRemoveNoise(true);
          setTimeout(() => {
            downloadScreenshot();
          }, 300);
          setTimeout(() => {
            setRemoveNoise(false);
          }, 300);
        }}
      >
        Export
      </Button>
      <Button
        disabled={rows.length >= maxRows}
        onClick={() => {
          const sumOfRowSizes = rows.reduce((acc, row) => acc + row.rowSize, 0);
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
  );
};

export default PageMenu;
