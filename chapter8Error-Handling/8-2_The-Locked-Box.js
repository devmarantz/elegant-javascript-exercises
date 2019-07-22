const box = {
  locked: true,
  unlock() {
    this.locked = false;
  },
  lock() {
    this.locked = true;
  },
  _content: [],
  get content() {
    if (this.locked) throw new Error('Locked!');
    return this._content;
  },
};

function withBoxUnlocked(body) {
  // Your code here.
  let lockStatus = box.locked;
  box.unlock();
  try {
    body();
    if (lockStatus) {
      box.lock();
    } else {
      box.unlock();
    }
  } catch (e) {
    console.log('Error caught inside boxUnlocked');
    if (lockStatus) {
      box.lock();
    } else {
      box.unlock();
    }
    throw e;
  }
}

// Used to test if the box is unlocked before the function call
// box.unlock();

withBoxUnlocked(function() {
  box.content.push('gold piece');
});

try {
  withBoxUnlocked(function() {
    throw new Error('Pirates on the horizon! Abort!');
  });
} catch (e) {
  console.log(`Error raised: ${e}`);
}
console.log(box.locked);
// → true

// Used to check if the contents are being changed in the box;
box.unlock();
console.log(box.content);
