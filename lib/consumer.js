const Disposable = require('./disposable');
const Version = require('semver');

/**
 * A disposable service consumer.
 */
class Consumer extends Disposable {
  /**
   * Constructs a consumer which is compatible with a range of semantic
   * versions.
   *
   * @param {string} versionRange A range of semantic versions for which
   * this consumer is compatible with. (Similar to node package.json ie:
   * '^1.0.0', '~1.0.0', 1.0.0')
   * @param {Provider} [service] A service provider.
   */
  constructor(versionRange, service) {
    super();
    if (!Version.validRange(versionRange)) {
      throw new Error('You must provide a semantic version range.');
    }
    this.versionRange = new Version.Range(versionRange);

    this.service = service;

    this.on('disposed', () => {
      this.service = null;
    });
  }
}

module.exports = Consumer;
