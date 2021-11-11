'use strict';

const multipart = require('./multipart.js');

const boundary = '974767299852498929531610575';

const item = {
  name: 'some_name',
  fileName: 'some_filename',
  contentType: 'some_type',
  data: 'some_data'
};
const item2 = {
  name: 'some_name2',
  fileName: 'some_filename2',
  contentType: 'some_type2',
  data: 'some_data2'         //can be binary
};

const arr = [item, item2];   //future functionality

const form1 = multipart()
  .boundary(boundary)
  .add(item)
  .add(item2);

const data = form1();
const stringData = form1.stringParts();
const bufferData = form1.bufferParts();

console.log({ data });
console.log({ stringData });
console.log({ bufferData });
