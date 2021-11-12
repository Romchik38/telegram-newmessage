'use strict';

//Тут можно обработать ответ от Телеграм.
//Если там будет информация, которая должна быть обработана
//на уровне newMessage, то нужно это сделать.
//  Например
//Если пришел ответ, что много запросов, попробуйте позже.
//В таком случае нужно подождать и отправить сообщение еще раз

const okTrue = require('./checkResponse/okTrue.js');
const okFalse = require('./checkResponse/okFalse.js');

const routers = {
  true: okTrue,
  false: okFalse
};

const checkResponse = async ({ response, messageToSend }) => {
  const { ok } = response;
  return await routers[ok]();
};

module.exports = checkResponse;
