import jsPDF from "jspdf";

const numberToWord = (number) => {
  const words = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
  ];
  return words[number - 1];
};

const generateBaseRow = () => {
  return {
    id: generateId(),
    rowSize: 1,
    columns: [
      {
        id: generateId("column"),
        colSize: 1,
        element: null,
      },
    ],
  };
};

const generateId = (elType = "row") => {
  const timestamp = Math.floor(Date.now() / 1000);
  const random = Math.floor(Math.random() * 1000);
  const randomString = Math.random().toString(36).substring(2, 15);
  return `${timestamp}-${random}-${randomString}-${elType}`;
};

function generateFontSizes(n, m) {
  let arr = [];
  for (let i = n; i <= m; i++) {
    arr.push({ label: i, value: i });
  }
  return arr;
}

const generatePdfFromImages = (images) => {
  const A4_PAPER_DIMENSIONS = {
    width: 210,
    height: 297,
  };

  const computedImages = images.map((image) => {
    return {
      src: image,
      imageType: "JPEG",
      width: A4_PAPER_DIMENSIONS.width,
      height: A4_PAPER_DIMENSIONS.height,
    };
  });

  const doc = new jsPDF();

  doc.deletePage(1);

  computedImages.forEach((image) => {
    const imageDimensions = {
      width: image.width,
      height: image.height,
    };

    doc.addPage();
    doc.addImage(
      image.src,
      "JPEG",
      (A4_PAPER_DIMENSIONS.width - imageDimensions.width) / 2,
      (A4_PAPER_DIMENSIONS.height - imageDimensions.height) / 2,
      imageDimensions.width,
      imageDimensions.height
    );
  });

  const pdfURL = doc.output("bloburl");
  window.open(pdfURL, "_blank");
};

export {
  numberToWord,
  generateBaseRow,
  generateId,
  generateFontSizes,
  generatePdfFromImages,
};
