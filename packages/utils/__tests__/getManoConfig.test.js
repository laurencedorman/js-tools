const getManoConfig = require('../getManoConfig');

jest.mock('../getProjectPackageJson', () => ({
  manoConfig: { someConfig: 'file' },
}));

describe('getManoconfig', () => {
  it('should get manoConfig when it exists', () => {
    expect(getManoConfig).toEqual({ someConfig: 'file' });
  });
});
