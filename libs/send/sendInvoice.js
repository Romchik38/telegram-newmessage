'use strict';

const sendMessage = require('./sendMessage');

const sendInvoice = async answer => {
  const { data, headers } = await sendMessage(answer);
  return { data, headers };
};

module.exports = sendInvoice;
