'use strict';

const https = require('https');

const request = (sendOptions, data) => new Promise((resolve, reject) => {
  const req = https.request(sendOptions, async res => {
    try {
      const recivedData = [];
      for await (const chunk of res) recivedData.push(chunk);
      resolve(recivedData.join(''));
    } catch (e) {
      reject(e);
    }
  });
  req.on('error', err => {
    reject(err);
  });
  req.write(data);
  req.end();
});

module.exports = request;
