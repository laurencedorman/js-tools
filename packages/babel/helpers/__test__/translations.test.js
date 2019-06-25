const path = require('path');
const { extractTranslations } = require('../translations');

describe('Translations', () => {
  it('should extract formattedMessage key', () => {
    const filePath = path.join(
      __dirname,
      '../__fixtures__/translations/formattedMessage.jsx'
    );

    const translations = extractTranslations(filePath);

    expect(translations).toContainEqual(
      expect.objectContaining({
        id: 'formattedMessage.key',
      })
    );
  });

  it('should extract defineMessage key', () => {
    const filePath = path.join(
      __dirname,
      '../__fixtures__/translations/defineMessage.jsx'
    );

    const translations = extractTranslations(filePath);

    expect(translations).toContainEqual(
      expect.objectContaining({
        id: 'defineMessages.key',
      })
    );
  });

  it('should not crash with dynamicImports', () => {
    const filePath = path.join(
      __dirname,
      '../__fixtures__/translations/dynamicImport.jsx'
    );

    const translations = extractTranslations(filePath);

    expect(translations).toContainEqual(
      expect.objectContaining({
        id: 'dynamicKey.key',
      })
    );
  });
});
