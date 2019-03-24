const Disposable = require('../../../lib/disposable');
const Provider = require('../../../lib/provider');
const Version = require('semver');

describe('Provider', () => {
  it('should inherit from Disposable class', () => {
    const provider = new Provider('1.0.0', {});
    provider.should.be.an.instanceof(Disposable);
  });

  describe('#constructor', () => {
    it('should throw an error when a version is not provided', () => {
      try {
        // eslint-disable-next-line no-new
        new Provider();
        throw new Error('Did not throw the expected error.')
      } catch (err) {
        err.message.should.equal('A version must be provided.');
      }
    });

    it('should throw an error when version is not semantic', () => {
      try {
        // eslint-disable-next-line no-new
        new Provider('incorrect-version-string');
        throw new Error('Did not throw the expected error.')
      } catch (err) {
        err.message.should.equal('A semantic version must be provided.');
      }

      try {
        // eslint-disable-next-line no-new
        new Provider('1.0');
        throw new Error('Did not throw the expected error.')
      } catch (err) {
        err.message.should.equal('A semantic version must be provided.');
      }

      try {
        // eslint-disable-next-line no-new
        new Provider('a.v.s');
        throw new Error('Did not throw the expected error.')
      } catch (err) {
        err.message.should.equal('A semantic version must be provided.');
      }

      try {
        // eslint-disable-next-line no-new
        new Provider('1');
        throw new Error('Did not throw the expected error.')
      } catch (err) {
        err.message.should.equal('A semantic version must be provided.');
      }

      try {
        // eslint-disable-next-line no-new
        new Provider('#Q)(%*');
        throw new Error('Did not throw the expected error.')
      } catch (err) {
        err.message.should.equal('A semantic version must be provided.');
      }
    });

    it('should not throw an error when valid version is provided', () => {
      expect(() => {
        // eslint-disable-next-line no-new
        new Provider('1.0.0', {});
      }).to.not.throw();
    });

    it('should throw an error when service is not provided', () => {
      try {
        // eslint-disable-next-line no-new
        new Provider('1.0.0');
        throw new Error('Did not throw the expected error.')
      } catch (err) {
        err.message.should.equal('A service must be provided.');
      }
    });

    it('should initialize its own SemVer version property', () => {
      const provider = new Provider('1.0.0', {});
      provider.version.should.be.an.instanceof(Version);
      provider.version.raw.should.equal('1.0.0');
    });

    it('should initialize its own service property', () => {
      const someService = {};
      const provider = new Provider('1.0.0', someService);
      provider.service.should.equal(someService);
    });
  });
});
