const data = [1, 2, 3, 4, 5];

// map
Array.prototype.myMap = function (callback) {
  const arr = [];

  for (let i = 0; i < this.length; i++) {
    arr.push(callback(this[i], i, this));
  }

  return arr;
};

// filter
Array.prototype.myFilter = function (callback) {
  const arr = [];

  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      arr.push(this[i]);
    }
  }

  return arr;
};

// reduce
Array.prototype.myReduce = function (callback, initialValue) {
  let accumulator = initialValue;
  for (let i = 0; i < this.length; i++) {
    accumulator = accumulator
      ? callback(accumulator, this[i], i, this)
      : this[i];
  }

  return accumulator;
};

// Promise.All
const myPromiseAll = (promises) => {
  const result = [];

  return new Promise((resolve, reject) => {
    promises.map((promise, i) => {
      Promise.resolve(promise).then((value) => {
        result[i] = value;

        if (result.length === promises.length) {
          resolve(result);
        }
      }, reject);
    });
  });
};

// flatten object
const flattenObj = (obj) => {
  let result = {};

  for (const i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if (typeof obj[i] === 'object' && !Array.isArray(obj[i])) {
      const temp = flattenObj(obj[i]);
      for (const j in temp) {
        result[i + '.' + j] = temp[j];
      }
    } else {
      result[i] = obj[i];
    }
  }

  return result;
};

// memo
function memo(fn, context) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);
    if (!cache.has(key)) {
      cache.set(key, fn.apply(context || this, args));
    }

    return cache.get(key);
  };
}

myPromiseAll([
  Promise.resolve('hi'),
  Promise.resolve('bye'),
  Promise.resolve('exit'),
])
  .then((value) => console.log(value))
  .catch((err) => console.log(err));

const reduceLog = data.myReduce((el) => el + 4, 5);
console.log(reduceLog);

const filterLog = data.myFilter((el) => el < 4);
console.log(filterLog);

const mapLog = data.myMap((el) => el * 2);
console.log(mapLog);

const response = {
  name: 'Manu',
  age: 21,
  characteristics: {
    height: '6 feet',
    complexion: 'dark',
    hair: 'black',
    test: {
      v: 1,
    },
  },
  techStack: {
    language: 'Javascript',
    framework: {
      name: 'Nextjs',
      version: '12',
    },
  },
};
console.log(flattenObj(response));

const product = (num1, num2) => {
  // Long function
  for (let i = 0; i < 400000; i++);
  return num1 * num2;
};

const memoProduct = memo(product);

const first = performance.now();
console.log(`Result: `, memoProduct(123893, 1299123));
console.log('Time: ', performance.now() - first);

const second = performance.now();
console.log(`Result:`, memoProduct(123893, 1299123));
console.log('Time: ', performance.now() - second);
