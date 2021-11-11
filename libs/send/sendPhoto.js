'use strict';

const exampleAnswer = {
  telegramMethod: 'sendPhoto',
  answer: [
    { name: 'chat_id', data: 'some_text' },
    { name: 'photo', fileName: 'some_name', contentType: 'image/png', data: 'some_Buffer_data' },
    { name: 'reply_markup', data: JSON.stringify({ keyboard: [['home']] }) }
  ]
};

const { Buffer } = require('buffer');
const multipart = require('multipart-form');

const headers = {
  'buffer': (boundary) => {
    return ({ 'Content-Type': `multipart/form-data; boundary=${boundary}` });
  },
  'string': () => ({ 'Content-Type': 'application/json' }),
};

const getMultiPart = ( parts, boundary ) => {
  const form1 = multipart()
    .boundary(boundary);
    for (const part of parts) {
      form1.add(part);
    }
    const data = form1();
  return data;
};

const sendPhoto = async obj => {
  if (Array.isArray(obj))  {
    const boundary = (new Date().getTime()).toString();
    return {
      data: getMultiPart(obj, boundary),
      headers: headers['buffer'](boundary)
    }
  } else {
    return {
      data: JSON.stringify(obj),
      headers: headers['string']()
    }
  }
};

module.exports = sendPhoto;
