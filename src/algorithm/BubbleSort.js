const BubbleSort = (array, position, steps, colors) => {
    let colorKey = new Array(array.length).fill(0);
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
        }
        colorKey[j] = 1;
        colorKey[j + 1] = 1;
        steps.push({ arr: array.slice(), colorKey: colorKey.slice() });
        colorKey[j] = 0;
        colorKey[j + 1] = 0;
      }
      colorKey[array.length - i - 1] = 2;
      steps.push({ arr: array.slice(), colorKey: colorKey.slice() });
    }
    return steps;
  };
  
  export default BubbleSort;
  