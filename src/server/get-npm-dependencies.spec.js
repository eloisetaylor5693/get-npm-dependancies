const expect = require('chai').expect;
const sut = require('./get-npm-dependencies');

describe('given a package that exists in npm', () => {
  it('then should return dependencies', async () => {
    const result = await sut.GetDependencies('snyk');

    expect(result).to.not.be.null;
    expect(result).to.be.an('array').that.includes("diff");
  });
});

describe('given no package', () => {
  describe('when empty', () => {
    it('then should return dependencies', async () => {
      const result = await sut.GetDependencies('');
  
      expect(result).to.not.be.null;
    });
  });
 
  describe('when null', () => {
    it('then should return dependencies', async () => {
      const result = await sut.GetDependencies(null);
  
      expect(result).to.not.be.null;
    });
  });  
});