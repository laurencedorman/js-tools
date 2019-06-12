const serializeUrlParams = require('../serializeUrlParams');

describe('serializeUrlParams', () => {
  it('Should return a correctly-formatted param string', () => {
    const result = serializeUrlParams({
      foo: 'bar',
      baz: 'qux',
    });

    expect(result).toEqual('foo=bar&baz=qux');
  });
});
