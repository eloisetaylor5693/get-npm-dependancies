const expect = require('chai').expect;
const sut = require('./get-npm-dependencies');

describe('GetDependencies', () => {

  describe('given a package that exists in npm', () => {
    it('then should return dependencies', async () => {
      const result = await sut.GetDependencies('snyk');

      expect(result).to.not.be.null;
      expect(result.dependencies).to.be.an('array').that.includes("diff");
    });
  });

  describe('given an unknown package', () => {
    it('should throw error', async () => {
      const packageName = 'kajhsegkjshbgdkj h iurhgiuawhgiuahgiuahiughawiurghaiurw';
      try {
        await sut.GetDependencies(packageName);
      } catch (error) {
        expect(error.message).to.equal(`Package \`${packageName}\` doesn't exist`);
      }
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

});

describe('GetAllDependencies', () => {
  describe('given a package that exists in npm', () => {
    it('then should return dependencies', async () => {
      const result = await sut.GetAllDependencies('snyk');

      expect(result).to.not.be.null;
      expect(result.dependencies.length).to.be.greaterThan(5);
    });
  });


  describe('given an unknown package', () => {
    it('should throw error', async () => {
      const packageName = 'kajhsegkjshbgdkj h iurhgiuawhgiuahgiuahiughawiurghaiurw';
      try {
        await sut.GetAllDependencies(packageName);
      } catch (error) {
        expect(error.message).to.equal(`Package \`${packageName}\` doesn't exist`);
      }
    });
  });

  describe('given no package', () => {
    describe('when empty', () => {
      it('then should throw error', async () => {
        try {
          await sut.GetAllDependencies(null);
        } catch (error) {
          expect(error.message).to.equal('No npm package specified.  Please amend the url and try again.');
        }
      });
    });

    describe('when null', () => {
      it('then should throw error', async () => {
        try {
          await sut.GetAllDependencies(null);
        } catch (error) {
          expect(error.message).to.equal('No npm package specified.  Please amend the url and try again.');
        }
      });
    });
  });
});