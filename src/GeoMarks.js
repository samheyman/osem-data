import { geoNaturalEarth1, geoPath, geoGraticule } from "d3";
import { useRef, useEffect, useState } from "react";
import { select, zoom, event } from "d3";

const projection = geoNaturalEarth1()
  .center([-20, 56]) // Center on Europe (longitude: 10, latitude: 50)
  .scale(800);
const path = geoPath(projection);
const graticule = geoGraticule();

export const GeoMarks = ({ data: { land, interiors }, projects, rigs }) => {
  const svgRef = useRef();
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    const svg = select(svgRef.current);
    const zoomBehavior = zoom().on("zoom", (event) => {
      svg.select(".marks").attr("transform", event.transform);
      setZoomLevel(event.transform.k);
    });
    console.log(zoomBehavior);
    svg.call(zoomBehavior);
  }, []);
  return (
    <svg ref={svgRef} width="1800" height="1000" className="globe">
      <g className="marks">
        <path className="globe__sphere" d={path({ type: "Sphere" })} />
        {land.features.map((feature, id) => (
          <path key={id} className="globe__land" d={path(feature)} />
        ))}
        <path className="globe__interiors" d={path(interiors)} />
        {projects.map((d, id) => {
          if (d.lng === 0 || d.lat === 0) {
            return;
          }
          const [x, y] = projection([d.lng, d.lat]);
          return (
            <circle
              key={`windfarm ${id}`}
              className={`globe__projects ${
                d.phase === "construction" ? "construction" : "operational"
              }`}
              cx={x}
              cy={y}
              r={5 / zoomLevel}
              style={{ strokeWidth: 1 / zoomLevel }}
            >
              <title>{`${d.name}\n${d.mw} GW\n${d.turbines} turbines\n${d.phase}`}</title>
            </circle>
          );
        })}
        {projects.map((d, id) => {
          if (d.lng === 0 || d.lat === 0) {
            return;
          }
          const [x, y] = projection([d.lng, d.lat]);
          return (
            <circle
              key={`windfarm ${id}`}
              className={`globe__projects ${
                d.phase === "construction" ? "construction" : "operational"
              }`}
              cx={x}
              cy={y}
              r={5 / zoomLevel}
              style={{ strokeWidth: 1 / zoomLevel }}
            >
              <title>{`${d.name}\n${d.mw} GW\n${d.turbines} turbines\n${d.phase}`}</title>
            </circle>
          );
        })}
        {rigs.map((d, id) => {
          if (d.lng === 0 || d.lat === 0) {
            return;
          }
          const [x, y] = projection([d.lng, d.lat]);
          return (
            <circle
              key={`rig ${id}`}
              className={`globe__rigs `}
              cx={x}
              cy={y}
              r={5 / zoomLevel}
              style={{ strokeWidth: 2 / zoomLevel }}
            >
              <title>{`${d.name}`}</title>
            </circle>
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
