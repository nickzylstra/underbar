/* eslint-disable strict */
(function () {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function (val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function (array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function (array, n) {
    const len = array.length;
    if (n === undefined) return array[len - 1];
    if (n > len) return array;
    return array.slice(len - n, len);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  // input - array or object
  // output - none
  _.each = function (collection, iterator) {
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i += 1) {
        iterator(collection[i], i, collection);
      }
    } else { // else (is object)
      const keys = Object.keys(collection);
      for (let i = 0; i < keys.length; i += 1) {
        iterator(collection[keys[i]], keys[i], collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function (array, target) {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    let result = -1;

    _.each(array, (item, index) => {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function (collection, test) {
    const filteredCollection = [];

    _.each(collection, (el) => {
      if (test(el)) {
        filteredCollection.push(el);
      }
    });

    return filteredCollection;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function (collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, (el) => !test(el));
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function (array, isSorted, iterator = _.identity) {
    const uniqArray = [];

    if (isSorted) {
      _.each(array, (el, idx, arr) => {
        const iterEl = iterator(el);
        const iterPrevEl = idx === 0 ? undefined : iterator(arr[idx - 1]);
        if (iterEl !== iterPrevEl) {
          uniqArray.push(iterEl);
        }
      });
    } else {
      const prevEls = {};
      _.each(array, (el) => {
        const iterEl = iterator(el);
        if (!Object.prototype.hasOwnProperty.call(prevEls, iterEl)) {
          prevEls[iterEl] = true;
          uniqArray.push(iterEl);
        }
      });
    }

    return uniqArray;
  };


  // Return the results of applying an iterator to each element.
  _.map = function (collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    const mappedCollection = [];

    _.each(collection, (val, key, obj) => {
      mappedCollection.push(iterator(val, key, obj));
    });

    return mappedCollection;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns an array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function (collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, (item) => item[key]);
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function (total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function (total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function (collection, iterator, accumulator) {
    let accUndefined = accumulator === undefined;
    let result = accumulator;
    // if removing if statement from loop is desired,
    // reimplement each with but adjusting start position
    _.each(collection, (item) => {
      if (accUndefined) {
        result = item;
        accUndefined = false;
      } else {
        result = iterator(result, item);
      }
    });

    return result;
  };


  // PART ONE ENDS HERE, STOP


  // Determine if the array or object contains a given value (using `===`).
  _.contains = function (collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, (wasFound, item) => {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function (collection, iterator = _.identity) {
    return _.reduce(collection, (allMatch, item) => {
      if (!allMatch) {
        return false;
      }
      return Boolean(iterator(item));
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function (collection, iterator = _.identity) {
    // TIP: There's a very clever way to re-use every() here.
    /* let hasSome = false;

    _.each(collection, (el) => {
      if (iterator(el)) {
        hasSome = true;
      }
    });

    return hasSome; */
    return !_.every(collection, (el) => !iterator(el));
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  // mutates input
  _.extend = function (obj, ...args) {
    return _.reduce(args, (extendedObj, passedObj) => {
      _.each(passedObj, (value, key) => {
        // https://github.com/airbnb/javascript/issues/719
        // eslint-disable-next-line no-param-reassign
        extendedObj[key] = value;
      });
      return extendedObj;
    }, obj);
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  // mutates input
  _.defaults = function (obj, ...args) {
    return _.reduce(args, (defaultedObj, passedObj) => {
      _.each(passedObj, (value, key) => {
        if (!Object.prototype.hasOwnProperty.call(defaultedObj, key)) {
          // https://github.com/airbnb/javascript/issues/719
          // eslint-disable-next-line no-param-reassign
          defaultedObj[key] = value;
        }
      });
      return defaultedObj;
    }, obj);
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function (func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    let alreadyCalled = false;
    let result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function (...args) {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func(...args);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function memoize(func) {
    const results = {};
    return (...args) => {
      const key = JSON.stringify(args);
      if (Object.prototype.hasOwnProperty.call(results, key)) {
        return results[key];
      }
      results[key] = func(...args);
      return results[key];
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call somefunction ('a', 'b') after 500ms
  _.delay = function delay(func, wait, ...args) {
    // causes test error that seems strange
    /* // wait
    const start = new Date().getTime();
    for (let i = 0; i < 1e7; i += 1) {
      if ((new Date().getTime() - start) > wait) {
        break;
      }
    }
    // call func
    func(...args);
    */

    // native version?  but passes tests...
    // this spec is different than underbar github version that returns a function
    setTimeout(func, wait, ...args);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function (array) {
    const { length } = array;
    const result = [];
    const arrayCopy = array.slice();

    for (let i = 0; i < length; i += 1) {
      const kindaRandIdx = Math.floor(Math.random() * (arrayCopy.length - 1));
      result.push(arrayCopy[kindaRandIdx]);
      arrayCopy.splice(kindaRandIdx, 1);
    }

    return result;
  };

  // EXTRA CREDIT BEYOND HERE


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function (collection, functionOrKey, args) {
    const iterator = typeof functionOrKey === 'function'
      ? (el) => functionOrKey.apply(el, args)
      : (el) => el[functionOrKey](args);

    return _.map(collection, iterator);
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function (collection, iterator) {
    const sortedCollection = [];
    const procIter = typeof iterator === 'function' ? (obj) => iterator(obj) : (obj) => obj[iterator];

    // could map, then sort, then pluck as done in actual underscore lib implementation

    _.each(collection, (obj) => {
      const iterObj = procIter(obj);

      // find iterObj sorted position in sortedCollection and insert there
      // if iterObj undefined, put at end of sC
      // could optimize to use something other than insertion sort
      let i = iterObj === undefined ? sortedCollection.length : 0;
      let sCObj = sortedCollection[i];
      while (sCObj !== undefined && iterObj >= procIter(sCObj)) {
        i += 1;
        sCObj = sortedCollection[i];
      }
      sortedCollection.splice(i, 0, obj);
    });

    return sortedCollection;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function (...args) {
    /*
    const zippedArr = [];
    let lenLon = 0;
    _.each(args, (arr) => {
      const len = arr.length;
      if (len > lenLon) lenLon = len;
    });

    for (let i = 0; i < lenLon; i += 1) {
      const elArr = [];
      _.each(args, (arr) => {
        elArr.push(arr[i]);
      });
      zippedArr.push(elArr);
    }

    return zippedArr; */

    const maxLen = _.reduce(args, (len, arr) => {
      const elLen = arr.length;
      return elLen > len ? elLen : len;
    }, 0);

    const zippedArr = Array(maxLen);
    /* for (let i = 0; i < maxLen; i += 1) {
      zippedArr[i] = _.pluck(args, i);
    }
    return zippedArr; */
    return _.map(zippedArr, (el, idx) => _.pluck(args, idx));
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function (nestedArray, result = []) {
    // eslint-disable-next-line consistent-return
    _.each(nestedArray, (el) => {
      if (Array.isArray(el)) {
        return _.flatten(el, result);
      }
      result.push(el);
    });

    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function (arr1, ...otherArrays) {
    const result = [];

    // change parameters to '...arrays' if using this block of code
    // O((NM)^2)
    /* const arraysCount = arrays.length;
    const keys = {};
    _.each(arrays, (array) => {
      _.each(array, (el) => {
        if (!keys[el]) keys[el] = 0;
        keys[el] += 1;
      });
    });

    _.each(keys, (val, key) => {
      if (val === arraysCount) result.push(key);
    }); */

    // is this faster than the above method? yes much
    // change parameters to 'arr1, ...otherArrays' if using this block of code
    const otherArraysCount = otherArrays.length;
    for (let i = 0; i < arr1.length; i += 1) {
      const arr1El = arr1[i];
      if (!_.contains(result, arr1El)) {
        let j = 0;
        for (; j < otherArraysCount; j += 1) {
          if (!_.contains(otherArrays[j], arr1El)) break;
        }

        if (j === otherArraysCount) result.push(arr1El);
      }
    }

    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function (array, ...otherArrays) {
    return _.reject(array, (el) => _.contains(_.flatten(otherArrays), el));
  };
  /* {
    for (let i = 0; i < otherArrays.length; i += 1) {
      if (_.contains(otherArrays[i], el)) {
        return true;
      }
    }
    return false;
  } */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function (func, wait) {
  };
}());
