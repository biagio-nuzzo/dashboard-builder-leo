import React, { useState } from "react";

// Components
import HeaderMenu from "../HeaderMenu/HeaderMenu";

// Libraries
import { Row, Col, TextField, Button, Select } from "@hybris-software/ui-kit";

// Settings
import { headerHeight } from "../../../data/settings";

// Utils
import { generateFontSizes } from "../../../utils/utils";

// Styles
import Style from "./Header.module.css";

const Header = ({ modalRef, setPages, pageIndex, removeNoise }) => {
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(20);
  const [bold, setBold] = useState(false);
  const [file, setFile] = useState(null);

  return (
    <div style={{ height: headerHeight }} className={Style.headerContainer}>
      <HeaderMenu
        removeNoise={removeNoise}
        setPages={setPages}
        pageIndex={pageIndex}
      />
      <Row
        style={{ height: "100%" }}
        columnGap={{
          horizontal: {
            xs: 10,
            sm: 10,
            md: 10,
            lg: 10,
          },
        }}
      >
        <Col xs={3} style={{ height: "100%" }}>
          <div className={Style.imageMainContainer}>
            <div
              className={Style.imageContainer}
              style={{
                border: !file ? "1px dashed #000" : "none",
              }}
            >
              {file ? (
                <img
                  className={Style.image}
                  src={URL.createObjectURL(file)}
                  alt="header"
                />
              ) : (
                <div className={Style.textPlaceholder}>
                  <p>Clicca qui per caricare un'immagine</p>
                </div>
              )}
            </div>
            <input
              className={Style.uploadFileInput}
              type="file"
              onChange={(e) => {
                if (e.target.files[0]) {
                  setFile(e.target.files[0]);
                }
              }}
            />
          </div>
        </Col>
        <Col xs={9}>
          <div
            className={Style.textHeader}
            style={{
              border: !text ? "1px dashed #000" : "none",
            }}
            onClick={() => {
              modalRef.current.updateBody(
                <HeaderTextSettings
                  modalRef={modalRef}
                  setText={setText}
                  setFontSize={setFontSize}
                  setBold={setBold}
                  text={text}
                  fontSize={fontSize}
                  bold={bold}
                />
              );
            }}
          >
            {text ? (
              <div className={Style.textContent}>
                <p
                  style={{
                    fontSize: fontSize,
                    fontWeight: bold ? "bold" : "normal",
                  }}
                >
                  {text}
                </p>
              </div>
            ) : (
              <div className={Style.textPlaceholder}>
                <p>Clicca qui per inserire il titolo</p>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

const HeaderTextSettings = ({
  modalRef,
  setText,
  setFontSize,
  setBold,
  text,
  fontSize,
  bold,
}) => {
  const [textValue, setTextValue] = useState(text);
  const [fontSizeValue, setFontSizeValue] = useState({
    value: fontSize,
    label: fontSize,
  });
  const [boldValue, setBoldValue] = useState(bold);

  return (
    <div className={Style.modalBody}>
      <label>Seleziona la grandezza del font</label>
      <Select
        style={{ marginTop: 15 }}
        placeholder="Seleziona la grandezza del font"
        items={generateFontSizes(10, 50)}
        value={fontSizeValue}
        setValue={setFontSizeValue}
      />
      <label style={{ marginTop: 15 }}>Inserisci il testo</label>
      <TextField
        style={{ marginTop: 15 }}
        value={textValue}
        setValue={setTextValue}
      />

      <div>
        <input
          type="checkbox"
          checked={boldValue}
          onChange={(e) => {
            setBoldValue(e.target.checked);
          }}
        />
        <label style={{ marginLeft: 10 }}>Grassetto</label>
      </div>

      <Button
        style={{ marginTop: 15 }}
        onClick={() => {
          setText(textValue);
          setFontSize(fontSizeValue.value);
          setBold(boldValue);
          modalRef.current.destroy();
        }}
      >
        Conferma
      </Button>
    </div>
  );
};

export default Header;
