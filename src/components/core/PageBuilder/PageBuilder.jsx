import React, { useMemo } from "react";

// Libraries
import useForm from "@hybris-software/use-ful-form";

// Components
import BaseRowGenerator from "../BaseRowGenerator/BaseRowGenerator";
import PageMenu from "../PageMenu/PageMenu";

// Styles
import Style from "./PageBuilder.module.css";

const PageBuilder = ({
  layouts,
  layoutsPost,
  generalModalRef,
  rows,
  setRows,
  page,
  setPages,
  pageIndex,
  paperRef,
  removeNoise,
  setRemoveNoise,
}) => {
  // Memo
  const sizes = useMemo(() => {
    if (page.portrait) {
      return {
        width: 1400,
        height: 1400 * 1.41451,
      };
    } else {
      return {
        width: 1400 * 1.41451,
        height: 1400,
      };
    }
  }, [page.portrait]);

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

  return (
    <div>
      <PageMenu
        paperRef={paperRef}
        rows={rows}
        setRows={setRows}
        layouts={layouts}
        layoutsPost={layoutsPost}
        setRemoveNoise={setRemoveNoise}
        form={form}
        pageIndex={pageIndex}
        page={page}
        setPages={setPages}
      />
      <div
        id="paper"
        ref={paperRef}
        className={Style.paper}
        style={{
          width: sizes.width,
          height: sizes.height,
        }}
      >
        <BaseRowGenerator
          page={page}
          setPages={setPages}
          pageIndex={pageIndex}
          rows={rows}
          setRows={setRows}
          form={form}
          removeNoise={removeNoise}
          generalModalRef={generalModalRef}
        />
      </div>
    </div>
  );
};

export default PageBuilder;
