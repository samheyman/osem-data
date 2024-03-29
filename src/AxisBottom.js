export const AxisBottom = ({ xScale, innerHeight, tickFormat }) =>
  xScale.ticks().map((tickValue, id) => (
    <g
      className="tick"
      key={id}
      transform={`translate(${xScale(tickValue)},0)`}
    >
      <line y2={innerHeight} stroke="black" />
      <text style={{ textAnchor: "middle" }} dy=".71em" y={innerHeight + 3}>
        {tickFormat(tickValue)}
      </text>
    </g>
  ));
