import React from "react";

// Icons
import { RxCrossCircled } from "react-icons/rx";

// Styles
import Style from "./HeaderMenu.module.css";

const HeaderMenu = ({ setPages, pageIndex, removeNoise }) => {
  return (
    <span
      className={Style.menuRowButtonsContainer}
      style={{
        opacity: removeNoise ? 0 : 1,
      }}
    >
      <span>
        <RxCrossCircled
          className={Style.menuIconsDelete}
          onClick={() => {
            setPages((prevPages) => {
              const newPages = [...prevPages];
              newPages[pageIndex].header.show = false;
              return newPages;
            });
          }}
        />
      </span>
    </span>
  );
};

export default HeaderMenu;
