'use strict';

const { Buffer } = require('buffer');

const lenZero = item => (item.length === 0);

const isString = str => {
  if (typeof str === 'string') return true;
  return false;
};

const CRLF = '\r\n';
const dd = '--';

const buf = (str, enc = 'utf8') => Buffer.from(str, enc);

const makeSeparator = boundary => buf(`${dd}${boundary}`);

const makeDisposition = (name, fileName) => {
  const arr = [];
  arr.push(`Content-Disposition: form-data; name="${name}"`);
  if(fileName) arr.push(`; filename="${fileName}"`);
  return buf(arr.join(''));
};

const makeType = type => buf(`Content-Type: ${type}`);

const makeCrLf = (num) => {
  const arr = [];
  for (let i = 0; i < num; i++) arr.push(`${CRLF}`);
  return buf(arr.join(''));
};

const makeData = data => {
  if (Buffer.isBuffer(data)) return data;
  if (isString(data)) return buf(data);
  return buf(data.toString());
};

const makeTail = (boundary) => {
  const arr = [];
  arr.push(makeSeparator(boundary));
  arr.push(dd);
  return buf(arr.join(''));
};

const makeBuffer = ({ parts, boundary }) => {
  const dataArr = [];
  const len = parts.length;

  for (let i = 0; i < len; i++) {
    const part = parts[i];
    const { name, fileName, contentType, data } = part;
    dataArr.push(makeSeparator(boundary));
    dataArr.push(makeCrLf(1));
    dataArr.push(makeDisposition(name, fileName));
    if (contentType !== undefined) {
      dataArr.push(makeCrLf(1));
      dataArr.push(makeType(contentType));
    }
    dataArr.push(makeCrLf(2));
    dataArr.push(makeData(data));
    dataArr.push(makeCrLf(1));
  }
  dataArr.push(makeTail(boundary));
  dataArr.push(makeCrLf(1));
  return dataArr;
};

const fieldsExist = (fields, obj) => {
  for (const field of fields) {
    const result = obj[field];
    if(result === undefined) return false;
  }
  return true;
};

const multipart = () => {
  const parts = [];
  let bufferedParts = [];
  let boundary = '';
  const fields = ['name', 'data'];
  const fn = () => {
    if (lenZero(parts) || lenZero(boundary)) return;
    const checkFields = parts.every(fieldsExist.bind(null, fields));
    if(!checkFields) return;
    bufferedParts = makeBuffer({ parts, boundary });
    return Buffer.concat(bufferedParts);
  };
  fn.add = (obj) => {
    parts.push(obj);
    return fn;
  };
  fn.boundary = (str) => {
    boundary = str;
    return fn;
  };
  fn.stringParts = (enc = 'utf8') => bufferedParts.map(item => item.toString(enc));
  fn.bufferParts = () => ({ ...bufferedParts });
  return fn;
};

module.exports = multipart;
