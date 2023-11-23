function bubbleSort(array) {
  console.log(array);
  for (i = 0; i < array.length; ++i) {
    for (j = 0; j < array.length - 1 - i; ++j) {
      if (array[j] >= array[j + 1]) {
        // console.log(`${array[j]} is bigger than ${array[j + 1]}`);
        biggest = array[j];
        array[j] = array[j + 1];
        array[j + 1] = biggest;
        console.log(`Swapped ${array[j]} and ${array[j + 1]}`);

        console.log(array);
      }
    }
  }
  console.log(array);
  return array;
}

array = [2, 1, 3, 6, 5, 4, 2, 1, 7, 1, 3];

bubbleSort(array);
