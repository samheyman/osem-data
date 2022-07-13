import "./App.css";
import { csv, arc, pie, scaleBand, scaleLinear, max, format } from "d3";
import { useData } from "./hooks/useData";
import { Marks } from "./Marks";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";

const width = 900;
const height = 600;
const margin = { top: 20, right: 30, bottom: 95, left: 220 };
const xAxisLabelOffset = 80;

function App() {
  const data = useData();
  if (!data) {
    return <pre>... loading ...</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const yValue = (d) => d["Project name"];
  const xValue = (d) => d.Users;
  const siFormat = format(".2s");
  const xAxisTickFormat = (tickValue) => siFormat(tickValue).replace("G", "B");

  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .padding(0.15);

  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth]);

  return (
    <div className="App">
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={xAxisTickFormat}
          />
          <AxisLeft yScale={yScale} />
          <text
            className="axis-label"
            x={innerWidth / 2}
            y={innerHeight + xAxisLabelOffset}
            textAnchor="middle"
          >
            Users
          </text>
          <Marks
            data={data}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            tooltipFormat={xAxisTickFormat}
          />
        </g>
      </svg>
    </div>
  );
}

export default App;
