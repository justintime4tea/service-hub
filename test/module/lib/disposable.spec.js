/* eslint-disable no-unused-expressions */
const Disposable = require('../../../lib/disposable');
describe('Disposable', () => {
  it('should be inheritable', () => {
    // @ts-ignore
    expect(() => {
      // eslint-disable-next-line require-jsdoc,no-unused-vars
      class SomeClass extends Disposable {}
    }).to.not.throw();
  });
  it('should be have an event emitter interface', () => {
    Disposable.prototype.on.should.exist;
    Disposable.prototype.emit.should.exist;
  });
  describe('#constructor', () => {
    it('should initialize itself with disposed property', () => {
      const disposable = new Disposable();
      disposable.disposed.should.be.a('boolean');
    });
    it('should have it\'s disposed state read-only', () => {
      const disposable = new Disposable();
      // @ts-ignore
      expect(() => {
        // @ts-ignore
        disposable.disposed = true;
      }).to.throw();
    });
  });
  describe('#dispose', () => {
    // @ts-ignore
    const sandbox = sinon.createSandbox();
    beforeEach(() => {
      sandbox.stub(Disposable.prototype, 'on');
      sandbox.stub(Disposable.prototype, 'emit');
    });
    afterEach(() => {
      sandbox.restore();
    });
    it("should set it's disposed flag to true", () => {
      const disposable = new Disposable();
      disposable.disposed.should.be.false;
      disposable.dispose();
      disposable.disposed.should.be.true;
    });
    it('should not emit a disposed event if already disposed', () => {
      const disposable = new Disposable();
      disposable.emit.should.not.have.been.called;
      disposable.dispose();
      disposable.dispose();
      disposable.emit.should.have.been.calledOnce;
    });
    it('should emit a disposed event after becoming disposed', () => {
      const disposable = new Disposable();
      disposable.dispose();
      disposable.emit
        .should.have.been.calledOnceWithExactly('disposed');
    });
  });
});
