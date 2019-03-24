const Disposable = require('./disposable');
const Version = require('semver');
/**
 * A disposable service provider.
 */
class Provider extends Disposable {
  /**
   * Constructs a service provider.
   *
   * @param {string} version A services versioned interface that this provider
   * agrees to adheres to.
   * @param {object} service An interface to the service being provided.
   */
  constructor(version, service) {
    super();

    if (!version) {
      throw new Error('A version must be provided.');
    }

    if (!Version.valid(version)) {
      throw new TypeError('A semantic version must be provided.');
    }

    if (!service) {
      throw new Error('A service must be provided.');
    }

    this.version = new Version(version);
    this.service = service;
  }
}
module.exports = Provider;
