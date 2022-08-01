import { geoNaturalEarth1, geoPath, geoGraticule } from "d3";

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

export const GeoMarks = ({ data: { land, interiors }, projects }) => (
  <g className="marks">
    <path className="globe__sphere" d={path({ type: "Sphere" })} />
    <path className="globe__graticules" d={path(graticule())} />

    {land.features.map((feature) => (
      <path className="globe__land" d={path(feature)} />
    ))}

    <path className="globe__interiors" d={path(interiors)} />
    {projects.map((d) => {
      if (d.lng === 0 || d.lat === 0) {
        return;
      }
      const [x, y] = projection([d.lng, d.lat]);

      return <circle className="globe__projects" cx={x} cy={y} r={3} />;
    })}
  </g>
);
