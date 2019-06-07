import React from 'react';
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  example: {
    id: 'defineMessages.key',
    defaultMessage: 'defineMessages.key',
  },
});

export const Dumb = ({ formatMessage }) => {
  return <div>{formatMessage(messages.example)}</div>;
};
