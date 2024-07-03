const InsertionSort = (arr) => {
    const n = arr.length;
    let steps = [];
    let colorKey = new Array(n).fill(0);
  
    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;
  
      colorKey[i] = 1;  // Mark the key being compared
      steps.push({ arr: [...arr], colorKey: [...colorKey] });
  
      while (j >= 0 && arr[j] > key) {
        colorKey[j] = 2;  // Mark the elements being compared
        colorKey[j + 1] = 3;  // Mark the insertion position
  
        steps.push({ arr: [...arr], colorKey: [...colorKey] });
  
        arr[j + 1] = arr[j];
        colorKey[j] = 0;  // Reset the color of the element that was just moved
  
        j--;
  
        colorKey[j + 1] = 3;  // Keep marking the insertion position
        steps.push({ arr: [...arr], colorKey: [...colorKey] });
      }
  
      arr[j + 1] = key;
      colorKey[j + 1] = 0;  // Reset the color of the insertion position
      colorKey[i] = 0;  // Reset the color of the key being inserted
  
      steps.push({ arr: [...arr], colorKey: [...colorKey] });
    }
  
    // Final step with all elements sorted
    steps.push({ arr: [...arr], colorKey: new Array(n).fill(0) });
  
    return steps;
  };
  
  export default InsertionSort; // Ensure the function is exported
  
  
  
