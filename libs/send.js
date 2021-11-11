'use strict';

const request = require('./request');

const parameters = [ 'answerPrecheckoutQuery', 'sendInvoice',
  'sendMessage', 'sendPhoto' ];

const routes = Object.create(null);
for (const route of parameters) {
  routes[route] = require(`./send/${route}.js`);
};

const sendOptions = {
  hostname: 'api.telegram.org',
  port: 443,
  path: '',
  method: 'POST',
}

const send = async (token, messageToSend) => {
  //проверка на метод
  try {
    const { telegramMethod, answer } = messageToSend;
    const method = routes[telegramMethod];
    if (method === undefined) {
      const err = new Error(`Неразрешенный метод отправки сообщения: ${telegramMethod}`);
      throw err;
    }
    //Отправка сообщения
    sendOptions.path = '/bot'.concat(token).concat(`/${telegramMethod}`);
    const { data, headers } = await method(answer);
    if (typeof headers === undefined) {
      throw new Error(`headers is undefined, method: ${telegramMethod}`);
    }
    sendOptions.headers = headers;
    const result = await request(sendOptions, data);
    const json = JSON.parse(result);
    return json;
  } catch (e) {
    throw e;
  }
};

module.exports = send;
