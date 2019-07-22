class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  }
  throw new MultiplicatorUnitFailure('Klunk');
}

function reliableMultiply(a, b) {
  for (;;) {
    try {
      let ans = primitiveMultiply(a, b);
      console.log(`You multiplied ${a} and ${b}`);
      return ans;
    } catch (e) {
      console.log(`Klunk. Try again.`);
    }
  }
  // Your code here.
}

console.log(reliableMultiply(8, 8));
// → 64
