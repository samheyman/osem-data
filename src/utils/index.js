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
