//No easing
function constant(duration, range, current) {
  return duration / range;
}

//Linear easing
export function linear(duration, range, current) {
  return ((duration * 2) / Math.pow(range, 2)) * current;
}

//Quadratic easing
function quadratic(duration, range, current) {
  return ((duration * 3) / Math.pow(range, 3)) * Math.pow(current, 2);
}

export function animateValue(id, start, end, duration, easing) {
  var range = end - start;
  var current = start;
  var increment = end > start ? 1 : -1;
  var obj = document.getElementById(id);
  var startTime = new Date();
  var offset = 1;
  var remainderTime = 0;

  var step = function () {
    current += increment;
    obj.innerHTML = current;

    if (current != end) {
      setTimeout(step, constant(duration, range, current));
    } else {
      console.log("Easing: ", easing);
      console.log("Elapsed time: ", new Date() - startTime);
      console.log("");
    }
  };

  setTimeout(step, constant(duration, range, start));
}

export function parseCoordinate(coordinate) {
  const regex = /(\d{1,3})°(\d{1,2}\.\d+)' ([EWNS])/;
  const match = coordinate.match(regex);

  if (!match) {
    console.error("Invalid coordinate format:", coordinate);
    throw new Error("Invalid coordinate format");
  }

  const degrees = parseInt(match[1], 10);
  const minutes = parseFloat(match[2]);
  const direction = match[3];

  let decimal = degrees + minutes / 60;
  if (direction === "W" || direction === "S") {
    decimal = -decimal;
  }
  // console.log("Coordinate: ", coordinate);

  // console.log("Decimal: ", decimal);
  return decimal;
}
