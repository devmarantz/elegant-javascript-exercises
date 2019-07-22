function Promise_all(promises) {
  return new Promise(async (resolve, reject) => {
    // Your code here.
    let promArray = [];
    for (let index = 0; index < promises.length; index++) {
      await promises[index]
        .then(result => {
          promArray.push(result);
          console.log(result);
        })
        .catch(err => {
          reject(err);
        });
    }
    return resolve(promArray);
  });
}

// Test code.
Promise_all([]).then(array => {
  console.log('This should be []:', array);
});

function soon(val) {
  return new Promise(resolve => {
    setTimeout(() => resolve(val), Math.random() * 500);
  });
}

Promise_all([soon(1), soon(2), soon(3)]).then(array => {
  console.log('This should be [1, 2, 3]:', array);
});

Promise_all([soon(1), Promise.reject('X'), soon(3)])
  .then(array => {
    console.log('We should not get here');
  })
  .catch(error => {
    if (error != 'X') {
      console.log('Unexpected failure:', error);
    }
  });
