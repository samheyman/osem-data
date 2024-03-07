export const Bars = ({
  data,
  xScale,
  yScale,
  x1Value,
  x2Value,
  yValue,
  tooltipFormat,
}) =>
  data.map((d, id) => {
    return (
      <>
        <rect
          className="mark"
          key={id}
          x={0}
          y={yScale(yValue(d))}
          width={xScale(x1Value(d))}
          height={yScale.bandwidth()}
        >
          <title>{tooltipFormat(x1Value(d))}</title>
        </rect>
        <rect
          style={{ fill: "#c2bdbd " }}
          key={id}
          x={xScale(x1Value(d))}
          y={yScale(yValue(d))}
          width={xScale(x2Value(d))}
          height={yScale.bandwidth()}
        >
          <title>{tooltipFormat(x2Value(d))}</title>
        </rect>
      </>
    );
  });
