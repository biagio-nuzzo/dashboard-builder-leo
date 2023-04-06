import React, { useState } from "react";

// Styles
import Style from "./MouseDrag.module.css";

const MouseDrag = ({ children, style }) => {
  const [isDown, setIsDown] = useState(false);

  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollDown, setScrollDown] = useState(0);

  return (
    <div
      style={{ ...style, height: "100vh" }}
      className={Style.draggable}
      onMouseDown={(e) => {
        setIsDown(true);
        e.currentTarget.classList.add(Style.active);

        // Horizontal
        setStartX(e.pageX - e.currentTarget.offsetLeft);
        setScrollLeft(e.currentTarget.scrollLeft);

        // Vertical
        setStartY(e.pageY - e.currentTarget.offsetTop);
        setScrollDown(e.currentTarget.scrollTop);
      }}
      onMouseLeave={(e) => {
        setIsDown(false);
        e.currentTarget.classList.remove(Style.active);
      }}
      onMouseUp={(e) => {
        setIsDown(false);
        e.currentTarget.classList.remove(Style.active);
      }}
      onMouseMove={(e) => {
        if (!isDown) return;
        e.preventDefault();

        // Horizontal
        const x = e.pageX - e.currentTarget.offsetLeft;
        const walk = (x - startX) * 1;
        e.currentTarget.scrollLeft = scrollLeft - walk;

        // Vertical
        const y = e.pageY - e.currentTarget.offsetTop;
        const walkY = (y - startY) * 1;
        e.currentTarget.scrollTop = scrollDown - walkY;

        console.log(scrollDown + walkY);
      }}
    >
      {children}
    </div>
  );
};

export default MouseDrag;
