const EventEmitter = require('events');
/**
 * Both an EventEmitter and has a disposed state for determining if
 * it has been disposed.
 *
 * Kind of like if an EventEmitter and C#'s IDisposable interface had a baby.
 */
class Disposable extends EventEmitter {
  /**
   * Constructs a new Disposable.
   */
  constructor() {
    super();
    /**
     * Whether or not this disposable is considered disposed.
     * @private
     * @type {boolean}
     */
    this._disposed = false;
  }
  /**
   * Whether or not this disposable is considered disposed.
   * @type {boolean}
   */
  get disposed() {
    return this._disposed;
  }
  /**
   * Will set this disposable to a state of disposed and emit a disposed event.
   */
  dispose() {
    if (!this._disposed) {
      this._disposed = true;
      this.emit('disposed');
    }
  }
}
module.exports = Disposable;
