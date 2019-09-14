(function memoTest() {
  const memoize = function memoize(func) {
    const results = {};
    return function memoFunc(...args) {
      const key = JSON.stringify(args);
      if (Object.prototype.hasOwnProperty.call(results, key)) {
        return results[key];
      }
      results[key] = func(...args);
      return results[key];
    };
  };

  const memoFact = memoize(function fact(num) {
    if (num === 0 || num === 1) {
      return 1;
    }
    return fact(num - 1) * num;
  });

  const test1 = memoFact(6);
  const test2 = memoFact(6);
  const test3 = memoFact(5);
}());
