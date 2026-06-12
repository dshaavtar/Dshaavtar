import { g as generateCategoricalChart, B as Bar, f as formatAxisMap } from "./generateCategoricalChart--dgqj_9a.js";
import { X as XAxis, Y as YAxis } from "./YAxis-BEF0I4n4.js";
var BarChart = generateCategoricalChart({
  chartName: "BarChart",
  GraphicalChild: Bar,
  defaultTooltipEventType: "axis",
  validateTooltipEventTypes: ["axis", "item"],
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: XAxis
  }, {
    axisType: "yAxis",
    AxisComp: YAxis
  }],
  formatAxisMap
});
export {
  BarChart as B
};
