// library components
import LineChart from "../components/library/LineChart/LineChart";
import BarChart from "../components/library/BarChart/BarChart";

const maxRows = 6;
const maxColumns = 12;
const padding = 75;
const paperHeight = 1400 * 1.41451 - padding;
const zoomStep = 0.1;
const zoomStepSmoothing = 20;
const zoomMax = 2;
const zoomMin = 0.1;
const headerHeight = 100;
const footerHeight = 30;

const componentIds = {
  lineChart: LineChart,
  barChart: BarChart,
};

export {
  maxRows,
  maxColumns,
  padding,
  paperHeight,
  zoomStep,
  zoomStepSmoothing,
  zoomMax,
  zoomMin,
  headerHeight,
  footerHeight,
  componentIds,
};
