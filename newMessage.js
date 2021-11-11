'use strict';

const cache = require('./libs/cache.js');
const checkResponse = require('./libs/checkResponse.js');
const send = require('./libs/send.js');

const makeResponse = (num, str) => ({
  statusCode: num,
  response: str
});

const newMessage = async ({ data, api, apiResponse, botToken }) => {
  try {
    const message = JSON.parse(data);
    const id = message.update_id;
    const result = cache(id);
    try {
      //messageToSend = [{}, ...] or {}
      const messageToSend = await api({ message });
      if (messageToSend) {
        let messages = [];
        if (Array.isArray(messageToSend) === false) {
          messages.push(messageToSend);
        } else messages = messageToSend;
        for (const value of messages) {
          const response = await send(botToken, value);
          //проверка ответа на уровне newMessage, например нужно повторить
          //отправку через некоторое время
          const check = { response, messageToSend: value };
          await checkResponse(check);
          //Проверка ответа на уровне api. это не относиться к newMessage
          await apiResponse(check);
        }
      }
    } catch (e) {
      console.log('Ошибка из NewMessage при выполнении api or send');
      console.log(e);
      console.log(new Date().toString());
      return makeResponse(500, 'internal error, try later'); //сервер не может правильно обработать данные
    }                     //запрос нужно повторить позднее
    return makeResponse(200, 'data recieved');
  } catch (e) {
    console.log(e); //логируем ошибку
    return makeResponse(400, 'bad data'); //плохие данные, нельзя их обработать
  }
};

module.exports = newMessage;
