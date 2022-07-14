export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  tooltipFormat,
}) =>
  data.map((d, i) => {
    return (
      <rect
        className="mark"
        key={i}
        x={0}
        y={yScale(yValue(d))}
        width={xScale(xValue(d))}
        height={yScale.bandwidth()}
      >
        <title>{tooltipFormat(xValue(d))}</title>
      </rect>
    );
  });
