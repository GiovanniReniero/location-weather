function debounce (func, delay=850) {
  let timeOutId 
  return (...args) => {
    if (timeOutId) {
      clearTimeout(timeOutId)
    };
    timeOutId = setTimeout(() => {
       func.apply(null, args)    
      },delay);
    };
};