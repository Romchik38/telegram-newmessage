'use strict';

const data = [];
const MAX_SIZE = 1000;

const cache = id => {
  if (typeof id !== 'number') throw new Error('cache id must be a number');
  const result = data.indexOf(id);
  if (result === -1) {
   const length = data.length;
    if (length === MAX_SIZE) {
      data.pop();
    }
    data.push(id);
    return false;
  } else {
   return true;
  }
};

module.exports = cache;
