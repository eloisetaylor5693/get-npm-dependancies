const expect = require('chai').expect;
const sut = require('./get-npm-dependencies');

describe('given a package that exists in npm', () => {
  it('then should return dependencies', async () => {
    const result = await sut.GetDependencies('snyk');

    expect(result).to.not.be.null;
    expect(result.dependencies).to.be.an('array').that.includes("diff");
  });
});

describe('given no package', () => {
  describe('when empty', () => {
    it('then should throw error', async () => {
      try {
        await sut.GetDependencies(null);
      } catch (error) {
        expect(error.message).to.equal('No npm package specified.  Please amend the url and try again.');
      }
    });
  });

  describe('when null', () => {
    it('then should throw error', async () => {
      try {
        await sut.GetDependencies(null);
      } catch (error) {
        expect(error.message).to.equal('No npm package specified.  Please amend the url and try again.');
      }
    });
  });
});