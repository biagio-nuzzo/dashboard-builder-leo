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

export { numberToWord, generateBaseRow, generateId, generateFontSizes };
