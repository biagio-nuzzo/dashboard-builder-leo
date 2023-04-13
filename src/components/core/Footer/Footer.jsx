import React from "react";

// Libraries
import { Row, Col } from "@hybris-software/ui-kit";

// Settings
import { footerHeight } from "../../../data/settings";

// Styles
import Style from "./Footer.module.css";

const Footer = ({ pageIndex }) => {
  return (
    <div
      className={Style.footer}
      style={{
        height: footerHeight,
      }}
    >
      <Row
        style={{ height: "100%", width: "100%" }}
        columnGap={{
          horizontal: {
            xs: 10,
            sm: 10,
            md: 10,
            lg: 10,
          },
        }}
      >
        <Col xs={11}>Questo è un testo standard per il footer. </Col>
        <Col xs={1}>
          <div
            style={{
              textAlign: "right",
            }}
          >
            Pagina {pageIndex + 1}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
