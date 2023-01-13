export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  tooltipFormat,
}) =>
  data.map((d, id) => {
    return (
      <rect
        className="mark"
        key={id}
        x={0}
        y={yScale(yValue(d))}
        width={xScale(xValue(d))}
        height={yScale.bandwidth()}
      >
        <title>{tooltipFormat(xValue(d))}</title>
      </rect>
    );
  });
