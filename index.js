'use strict';

const newMessage = require('./newMessage.js');

const indexNewMessage = ({ api, apiResponse, botToken }) => {
  const fn = ({ req }) => new Promise((resolve, reject) => {
    let data = '';
    req.on('data', d => {
      data = data.concat(d.toString());
    });
    req.on('end', () => {
      newMessage({ data, api, apiResponse, botToken })
        .then(response => resolve(response))
        .catch(err => {
          reject(err);
        });
    });
  });
  return fn;
};

module.exports = indexNewMessage;
