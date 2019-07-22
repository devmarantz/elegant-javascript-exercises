// Your code here.
const loop = (num, test, update, func) => {
  let value = num;
  while (test(value)) {
    func(value);
    value = update(value);
  }
};

loop(3, n => n > 0, n => n - 1, console.log);
// → 3
// → 2
// → 1
