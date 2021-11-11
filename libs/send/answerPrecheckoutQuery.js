'use strict';

const example = {
  //required
  pre_checkout_query_id: 'string',
  ok: 'boolean',
  //optional
  error_message: 'string'
}

const sendMessage = require('./sendMessage');

const answerPrecheckoutQuery = async answer => {
  const { data, headers } = await sendMessage(answer);
  return { data, headers };
};

module.exports = answerPrecheckoutQuery;
