const fetch = require('node-fetch');
const groupBy = require('lodash.groupby');

/**
 * @param {array} translations
 */

const normalizeTranslations = translations => {
  return translations.reduce((prev, curr) => {
    let key = curr.key.name;
    if (curr.plural_suffix) {
      key = key + '.' + curr.plural_suffix;
    }
    return {
      ...prev,
      [key]: curr.content,
    };
  }, {});
};

module.exports = async ({ projectId, token }) => {
  const req = await fetch(
    `https://api.phraseapp.com/api/v2/projects/${projectId}/translations`,
    {
      headers: {
        Authorization: `token ${token}`,
      },
    }
  );
  const translations = await req.json();

  const groupedTranslations = groupBy(
    translations,
    ({ locale }) => locale.code
  );

  return Object.entries(groupedTranslations).map(([lang, translations]) => ({
    language: lang,
    translations: normalizeTranslations(translations),
  }));
};
