const SelectionSort = (array, position, steps, colors) => {
    let colorKey = new Array(array.length).fill(0);
    for (let i = 0; i < array.length; i++) {
      let minIndex = i;
      for (let j = i + 1; j < array.length; j++) {
        if (array[j] < array[minIndex]) {
          minIndex = j;
        }
        colorKey[minIndex] = 1;
        colorKey[j] = 1;
        steps.push({ arr: array.slice(), colorKey: colorKey.slice() });
        colorKey[minIndex] = 0;
        colorKey[j] = 0;
      }
      if (minIndex !== i) {
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
      }
      colorKey[i] = 2;
      steps.push({ arr: array.slice(), colorKey: colorKey.slice() });
    }
    return steps;
  };
  
  export default SelectionSort;
  
