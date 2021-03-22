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
        let result;
        try {
          result = await sut.GetDependencies(null);
        } catch (error) {
          expect(error.message).to.equal('No npm package specified.  Please amend the url and try again.');
        }
        expect(result).to.be.undefined;
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

describe('GetDependenciesAndSubDependencies', () => {
  describe('given a package that exists in npm', () => {
    it('then should return dependencies', async () => {
      const result = await sut.GetDependenciesAndSubDependencies('snyk');

      expect(result).to.not.be.null;
      expect(result.dependencies.length).to.be.greaterThan(5);
    });
  });


  describe('given an unknown package', () => {
    it('should throw error', async () => {
      const packageName = 'kajhsegkjshbgdkj h iurhgiuawhgiuahgiuahiughawiurghaiurw';
      try {
        await sut.GetDependenciesAndSubDependencies(packageName);
      } catch (error) {
        expect(error.message).to.equal(`Package \`${packageName}\` doesn't exist`);
      }
    });
  });

  describe('given no package', () => {
    describe('when empty', () => {
      it('then should throw error', async () => {
        try {
          await sut.GetDependenciesAndSubDependencies(null);
        } catch (error) {
          expect(error.message).to.equal('No npm package specified.  Please amend the url and try again.');
        }
      });
    });

    describe('when null', () => {
      it('then should throw error', async () => {
        try {
          await sut.GetDependenciesAndSubDependencies(null);
        } catch (error) {
          expect(error.message).to.equal('No npm package specified.  Please amend the url and try again.');
        }
      });
    });
  });
});

describe.only('GetAllDependencies', () => {
  it('should return ALL dependencies', async () => {
    const result = await sut.GetAllDependencies('time');

    console.log(result);

    expect(result).to.not.be.null;
    expect(result.dependencies.length).to.be.greaterThan(5);
  });
});