const fetch = require('node-fetch');
const serializeUrlParams = require('./serializeUrlParams');

const PHRASEAPP_API_URL = 'https://api.phraseapp.com/api/v2';

/**
 * @param {Object} obj
 * @param {string} obj.projectId
 * @param {string} obj.token
 */
module.exports = async ({ projectId, token }) => {
  const queryString = serializeUrlParams({
    file_format: 'react_simple_json',
    include_empty_translations: false,
  });

  const locales = await fetch(
    `${PHRASEAPP_API_URL}/projects/${projectId}/locales`,
    {
      headers: {
        Authorization: `token ${token}`,
      },
    }
  )
    .then(res => res.json())
    .then(data =>
      data.map(({ id, name }) => ({
        name,
        url: `${PHRASEAPP_API_URL}/projects/${projectId}/locales/${id}/download?${queryString}`,
      }))
    );

  const translations = await locales.reduce(async (promise, { url, name }) => {
    const results = await promise.then();
    const req = await fetch(url, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    const json = await req.json();

    return [
      ...results,
      {
        language: name,
        translations: json,
      },
    ];
  }, Promise.resolve([]));

  return translations;
};
