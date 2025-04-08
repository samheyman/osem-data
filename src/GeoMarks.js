import { geoNaturalEarth1, geoPath, geoGraticule } from "d3";

const projection = geoNaturalEarth1()
  .center([-20, 58]) // Center on Europe (longitude: 10, latitude: 50)
  .scale(1800);
const path = geoPath(projection);
const graticule = geoGraticule();

export const GeoMarks = ({ data: { land, interiors }, projects }) => (
  <g className="marks">
    <path className="globe__sphere" d={path({ type: "Sphere" })} />
    <path className="globe__graticules" d={path(graticule())} />
    {land.features.map((feature, id) => (
      <path key={id} className="globe__land" d={path(feature)} />
    ))}
    <path className="globe__interiors" d={path(interiors)} />
    {projects.map((d, id) => {
      if (d.lng === 0 || d.lat === 0) {
        return;
      }
      const [x, y] = projection([d.lng, d.lat]);
      console.log(d.phase);
      return (
        <circle
          key={`windfarm ${id}`}
          className={`globe__projects ${
            d.phase === "construction" ? "construction" : "operational"
          }`}
          cx={x}
          cy={y}
          r={3}
        >
          <title>{`${d.name}\n${d.mw} GW\n${d.turbines} turbines\n${d.phase}`}</title>
        </circle>
      );
    })}
  </g>
);
