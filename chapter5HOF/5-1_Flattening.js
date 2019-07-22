const arrays = [[1, 2, 3], [4, 5], [6]];
// Your code here.
// → [1, 2, 3, 4, 5, 6]

function flatten(sets) {
  return sets.reduce((a, b) => a.concat(b));
}

console.log(flatten(arrays));
