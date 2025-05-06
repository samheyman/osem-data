import { geoNaturalEarth1, geoPath, geoGraticule } from "d3";
import { useRef, useEffect, useState } from "react";
import { select, zoom, event } from "d3";
import { useDarkMode } from "./contexts/DarkModeContext";

const projection = geoNaturalEarth1()
  .center([-20, 56]) // Center on Europe (longitude: 10, latitude: 50)
  .scale(800);
const path = geoPath(projection);
const graticule = geoGraticule();

export const GeoMarks = ({
  data: { land, interiors },
  projects,
  rigs,
  installations,
  visibleLayers,
}) => {
  const svgRef = useRef();
  const [zoomLevel, setZoomLevel] = useState(1);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const svg = select(svgRef.current);
    const zoomBehavior = zoom().on("zoom", (event) => {
      svg.select(".marks").attr("transform", event.transform);
      setZoomLevel(event.transform.k);
    });
    svg.call(zoomBehavior);
  }, []);

  useEffect(() => {
    console.log(zoomLevel * 10);
  }, [zoomLevel]);

  // Apply dark mode class to the SVG
  useEffect(() => {
    const svg = select(svgRef.current);
    if (darkMode) {
      svg.classed("dark-mode", true);
    } else {
      svg.classed("dark-mode", false);
    }
  }, [darkMode]);

  return (
    <svg ref={svgRef} width="1800" height="1000" className="globe">
      <g className="marks">
        <path className="globe__sphere" d={path({ type: "Sphere" })} />
        {land.features.map((feature, id) => (
          <path key={id} className="globe__land" d={path(feature)} />
        ))}
        <path className="globe__interiors" d={path(interiors)} />

        {projects.map((d, id) => {
          if (d.lng === 0 || d.lat === 0) return null;
          if (d.phase === "construction" && !visibleLayers.construction)
            return null;
          if (d.phase === "O&M" && !visibleLayers.operations) return null;

          const [x, y] = projection([d.lng, d.lat]);
          return (
            <g>
              <path
                transform={`translate(${x - 4} ${y - 7}) scale(${0.015})`}
                fill={d.phase === "construction" ? "#3da5ff" : "#10a52b"}
                d="M272 16c-32 48-38.97 115.99-38 176 .118 7.3 2.486 17.54 5.086 26.69 5.166-2.36 10.89-3.69 16.914-3.69 3.04 0 6 .346 8.857.982L272 16zm-16 217c-12.81 0-23 10.19-23 23s10.19 23 23 23 23-10.19 23-23-10.19-23-23-23zm40.8 27.033c-.897 9.054-4.776 17.268-10.632 23.643L455.812 389.87c-25.57-51.714-80.964-91.744-133.42-120.91-6.366-3.54-16.386-6.605-25.593-8.927zm-79.896 8.274L40.124 362.12c57.57 3.714 119.937-24.243 171.423-55.09 6.274-3.758 13.95-10.936 20.58-17.77-7.1-5.122-12.522-12.447-15.223-20.953zm55.86 25.07c-5.127 2.32-10.8 3.623-16.764 3.623-5.964 0-11.637-1.302-16.764-3.62L232 496h48l-7.236-202.623z"
              />
              {/* Add a transparent circle to increase hover area */}

              <circle cx={x} cy={y - 3} r={4} fill="transparent">
                <title>{`${d.longName}\n${d.mw} GW\n${d.turbines} turbines\nIn ${d.phase}`}</title>
              </circle>
              <text
                x={x}
                y={y + 1}
                textAnchor="middle"
                style={{
                  cursor: "default",
                  fontFamily: "Source Sans Pro",
                  textTransform: "uppercase",
                  fontSize: `${(40 + zoomLevel * 10) / (zoomLevel * 10)}px`,
                  fill: "var(--text-color)",
                  dominantBaseline: "hanging",
                }}
              >
                {d.name}
                <title>{`${d.longName}\n${d.mw} GW\n${d.turbines} turbines\nIn ${d.phase}`}</title>
              </text>
            </g>
          );
        })}
        {rigs.map((d, id) => {
          if (d.lng === 0 || d.lat === 0) return null;
          if (!visibleLayers.oilRig) return null;
          const [x, y] = projection([d.lng, d.lat]);
          return (
            <g>
              <g fill="#c7860e">
                <path
                  transform={`translate(${x - 1} ${y - 4}) scale(${0.009})`}
                  d="M307.5,272h-24c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h24c4.142,0,7.5-3.358,7.5-7.5S311.642,272,307.5,272z"
                />
                <path
                  transform={`translate(${x - 1} ${y - 4}) scale(${0.009})`}
                  d="M251.5,272h-24c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h24c4.142,0,7.5-3.358,7.5-7.5S255.642,272,251.5,272z"
                />
                <path
                  transform={`translate(${x - 1} ${y - 4}) scale(${0.009})`}
                  d="M427.5,192H411V71h16.5c2.841,0,5.438-1.605,6.708-4.146c1.271-2.541,0.997-5.582-0.708-7.854l-24-32
		c-1.417-1.889-3.639-3-6-3H293.266l-1.204-9.028C295.941,14.683,299,11.452,299,7.5c0-4.142-3.358-7.5-7.5-7.5h-48
		c-4.142,0-7.5,3.358-7.5,7.5c0,3.952,3.059,7.183,6.938,7.472L212.934,240H195.5c-4.142,0-7.5,3.358-7.5,7.5V272h-10.192
		l-29.402-169.06c3.714-0.448,6.593-3.605,6.593-7.44c0-4.142-3.358-7.5-7.5-7.5H147V63.5c0-4.142-3.358-7.5-7.5-7.5H131v-8.5
		c0-4.142-3.358-7.5-7.5-7.5s-7.5,3.358-7.5,7.5V56h-8.5c-4.142,0-7.5,3.358-7.5,7.5V88h-0.5c-4.142,0-7.5,3.358-7.5,7.5
		c0,3.835,2.88,6.992,6.593,7.44L69.192,272H67.5c-4.142,0-7.5,3.358-7.5,7.5V304H35.5c-4.142,0-7.5,3.358-7.5,7.5v32
		c0,4.142,3.358,7.5,7.5,7.5H60v24.5c0,4.142,3.358,7.5,7.5,7.5H76v64.995c-0.125,0.001-0.242,0.005-0.369,0.005
		c-6.232,0-8.924-1.346-12.651-3.208C58.709,442.657,53.394,440,43.622,440c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5
		c6.232,0,8.925,1.346,12.651,3.208c4.271,2.135,9.586,4.792,19.358,4.792c9.771,0,15.084-2.657,19.354-4.792
		c3.725-1.862,6.417-3.208,12.646-3.208c6.229,0,8.919,1.346,12.644,3.208c4.27,2.135,9.583,4.792,19.353,4.792
		c9.771,0,15.086-2.657,19.356-4.792c3.726-1.863,6.418-3.208,12.649-3.208s8.923,1.346,12.649,3.208
		c4.27,2.135,9.584,4.792,19.356,4.792c9.772,0,15.086-2.657,19.356-4.792c3.726-1.863,6.418-3.208,12.649-3.208
		c6.227,0,8.917,1.346,12.641,3.208c4.269,2.135,9.582,4.792,19.351,4.792c9.766,0,15.077-2.657,19.344-4.793
		c3.721-1.862,6.41-3.207,12.632-3.207c6.228,0,8.919,1.346,12.643,3.208c4.269,2.135,9.583,4.792,19.352,4.792
		c9.763,0,15.073-2.658,19.339-4.793c3.719-1.861,6.407-3.207,12.625-3.207c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5
		c-9.764,0-15.073,2.658-19.339,4.793c-3.719,1.861-6.406,3.207-12.625,3.207c-0.21,0-0.406-0.005-0.607-0.008V383h8.5
		c4.142,0,7.5-3.358,7.5-7.5V351h24.5c4.142,0,7.5-3.358,7.5-7.5v-32c0-4.142-3.358-7.5-7.5-7.5H347v-56.5
		c0-4.142-3.358-7.5-7.5-7.5h-17.434L299.533,71H396v121h-16.5c-4.142,0-7.5,3.358-7.5,7.5v48c0,4.142,3.358,7.5,7.5,7.5h48
		c4.142,0,7.5-3.358,7.5-7.5v-48C435,195.358,431.642,192,427.5,192z M276.934,15l8.667,65H249.4l8.667-65H276.934z M282.388,95
		L267.5,114.141L252.612,95H282.388z M245.382,110.135l12.617,16.222l-17.838,22.935L245.382,110.135z M250.835,160l16.665-21.427
		L284.165,160H250.835z M281.394,175L267.5,188.894L253.606,175H281.394z M236.222,178.829l20.671,20.671l-27.031,27.031
		L236.222,178.829z M267.5,210.106L297.394,240h-59.787L267.5,210.106z M278.106,199.5l20.671-20.671l6.36,47.703L278.106,199.5z
		 M277.001,126.357l12.617-16.222l5.221,39.157L277.001,126.357z M135.955,215L123.5,226.21L111.045,215H135.955z M106.238,200
		l17.262-23.71L140.762,200H106.238z M153.442,219.442l6.952,39.973L134.711,236.3L153.442,219.442z M147.156,183.297l-14.379-19.75
		l8.834-12.134L147.156,183.297z M123.5,150.804L111.994,135h23.013L123.5,150.804z M133.192,103l2.956,17h-25.296l2.956-17H133.192
		z M105.389,151.414l8.834,12.134l-14.379,19.75L105.389,151.414z M93.558,219.442l18.731,16.858l-25.683,23.115L93.558,219.442z
		 M123.5,246.39L151.955,272H95.045L123.5,246.39z M115,71h17v17h-17V71z M75,287h0.475c0.011,0,0.023,0.001,0.034,0.001
		c0.011,0,0.022-0.001,0.033-0.001H188v17H75V287z M75,351h49v17H75V351z M91,443.472V383h17v57.006
		c-0.125-0.001-0.242-0.006-0.368-0.006C99.819,440,94.859,441.699,91,443.472z M267.637,448c-6.227,0-8.917-1.346-12.641-3.208
		c-4.269-2.135-9.582-4.792-19.351-4.792c-9.771,0-15.086,2.657-19.356,4.792c-3.726,1.863-6.418,3.208-12.649,3.208
		c-6.231,0-8.923-1.346-12.649-3.208c-4.27-2.135-9.584-4.792-19.356-4.792c-9.771,0-15.086,2.657-19.356,4.792
		c-3.726,1.863-6.418,3.208-12.649,3.208c-6.228,0-8.919-1.346-12.644-3.208c-1.216-0.608-2.521-1.257-3.985-1.876V383h8.5
		c4.142,0,7.5-3.358,7.5-7.5V351h129v24.5c0,4.142,3.358,7.5,7.5,7.5h8.5v60.023c-1.361,0.587-2.586,1.197-3.731,1.77
		C276.547,446.655,273.859,448,267.637,448z M316,443.363c-3.824-1.732-8.737-3.363-16.388-3.363c-0.21,0-0.406,0.008-0.612,0.01
		V383h17V443.363z M332,368h-49v-17h49V368z M364,336H43v-17h321V336z M332,304H203v-49h16.495c0.005,0,0.01,0.001,0.015,0.001
		c0.007,0,0.014-0.001,0.021-0.001h95.939c0.007,0,0.014,0.001,0.021,0.001c0.005,0,0.01-0.001,0.015-0.001H332V304z M295.266,39
		H399.75l12.75,17H297.533L295.266,39z M420,240h-33v-33h33V240z"
                />
              </g>
              <circle cx={x} cy={y - 3} r={4} fill="transparent">
                <title>{`${d.name}\n${d.info}`}</title>
              </circle>
              <text
                x={x + 1}
                y={y + 1}
                textAnchor="middle"
                style={{
                  cursor: "default",
                  fontFamily: "Source Sans Pro",
                  textTransform: "uppercase",
                  fontSize: `${(40 + zoomLevel * 10) / (zoomLevel * 10)}px`,
                  fill: "var(--text-color)",
                  dominantBaseline: "hanging",
                }}
              >
                {d.Abbreviation}
                <title>{`${d.name}\n${d.info}`}</title>
              </text>
            </g>
          );
        })}
        {installations.map((d, id) => {
          if (d.lng === 0 || d.lat === 0) return null;
          if (!visibleLayers.port) return null;
          const [x, y] = projection([d.lng, d.lat]);
          return (
            <g>
              <circle
                key={`rig ${id}`}
                className={`globe__installations `}
                cx={x}
                cy={y}
                r={5 / zoomLevel}
                style={{
                  stroke: "#e91e63",
                  strokeWidth: 2 / zoomLevel,
                  fill: "none",
                }}
              ></circle>
              <circle cx={x} cy={y - 3} r={6} fill="transparent">
                <title>{`${d.name}\n${d.description}`}</title>
              </circle>
              <text
                x={x}
                y={y + 7 / zoomLevel}
                textAnchor="middle"
                style={{
                  cursor: "default",
                  fontFamily: "Source Sans Pro",
                  textTransform: "uppercase",
                  fontSize: `${(40 + zoomLevel * 10) / (zoomLevel * 10)}px`,
                  fill: "var(--text-color)",
                  dominantBaseline: "hanging",
                }}
              >
                {d.name}
                <title>{`${d.name}\n${d.description}`}</title>
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
};

// export const GeoMarksEurope = ({ data: { land, interiors }, projects }) => {
//   return (
//     <svg ref={svgRef} width="800" height="600">
//       <g className="marks">
//         <path className="globe__sphere" d={path({ type: "Sphere" })} />
//         {land.features.map((feature, id) => (
//           <path key={id} className="globe__land" d={path(feature)} />
//         ))}
//         <path className="globe__interiors" d={path(interiors)} />
//         {projects.map((d, id) => {
//           if (d.lng === 0 || d.lat === 0) {
//             return;
//           }
//           const [x, y] = projection([d.lng, d.lat]);
//           return (
//             <circle
//               key={`windfarm ${id}`}
//               className={`globe__projects ${
//                 d.phase === "construction" ? "construction" : "operational"
//               }`}
//               cx={x}
//               cy={y}
//               r={3}
//             >
//               <title>{`${d.name}\n${d.mw} GW\n${d.turbines} turbines\n${d.phase}`}</title>
//             </circle>
//           );
//         })}
//       </g>
//     </svg>
//   );
// };
