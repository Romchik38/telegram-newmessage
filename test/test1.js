'use strict';

const { Buffer } = require('buffer');
const { EventEmitter } = require('events');
const req = new EventEmitter();

const { id, botToken } = require('./conf.js');
const index = require('../index.js');

const message = {
    update_id: 12,
    message: {
      message_id: 602,
      from: {
        id,
        is_bot: false,
        first_name: 'Ser',
        last_name: 'Rom',
        username: 'ser_rom',
        language_code: 'ru'
      },
      chat: {
        id,
        first_name: 'Ser',
        last_name: 'Rom',
        username: 'ser_rom',
        type: 'private'
      },
      date: 1636493185,
      text: '/home'
    }
};

const data = Buffer.from(JSON.stringify(message), 'utf8');

const api = ({ message }) => {
  console.log(message.message);
  return {
    telegramMethod: 'sendMessage',
    answer: { chat_id: message.message.chat.id, text: 'test1' }
  };
}

const apiResponse = async ({ response, messageToSend }) => {
  console.log({ response });
  return null;
};

const router = index({ api, apiResponse, botToken });

router({ req }).then(response => {
    console.log({ response });
  }).catch(err => {
    console.log({ err });
  });

req.emit('data', data);
req.emit('end');
