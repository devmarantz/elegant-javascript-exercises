const SCRIPTS = require('./scripts.js');

function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.findIndex(c => c.name == name);
    if (known == -1) {
      counts.push({ name, count: 1 });
    } else {
      counts[known].count++;
    }
  }
  return counts;
}

function characterScript(code) {
  for (let script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => code >= from && code < to)) {
      return script;
    }
  }
  return null;
}

function dominantDirection(text) {
  let scripts = countBy(text, char => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.name : 'none';
  }).filter(({ name }) => name != 'none');

  let total = scripts.reduce((n, { count }) => n + count, 0);
  if (total == 0) return 'No scripts found';

  let maxCount = 0;
  let dom = 'none';
  scripts.forEach(textScript => {
    if (textScript.count > maxCount) {
      maxCount = textScript.count;
      SCRIPTS.forEach(script => {
        if (script.name === textScript.name) {
          dom = script.direction;
        }
      });
    }
  });
  return dom;
}

console.log(dominantDirection('Hello!'));
// → ltr
console.log(dominantDirection('Hey, مساء الخير'));
// → rtl
