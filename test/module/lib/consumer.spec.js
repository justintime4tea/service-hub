/* eslint-disable no-unused-expressions */
const Consumer = require('../../../lib/consumer');
const Disposable = require('../../../lib/disposable');

describe('Consumer', () => {
  it('should inherit from Disposable class', () => {
    const consumer = new Consumer('~1.0.0');
    consumer.should.be.an.instanceof(Disposable);
  });

  describe('#constructor', () => {
    const sandbox = sinon.createSandbox();

    beforeEach(() => {
      sandbox.stub(Consumer.prototype, 'on');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should throw an error if a semantic version range is not provided',
      () => {
        try {
          // eslint-disable-next-line no-new
          new Consumer();
          throw new Error('Did not throw the expected error.')
        } catch (err) {
          err.message
            .should.equal('You must provide a semantic version range.');
        }
      });

    it('should set its own versionRange property', () => {
      const consumer = new Consumer('~1.0.0');
      consumer.versionRange.raw.should.equal('~1.0.0');
    });

    it('should optionally accept a Provider', () => {
      expect(() => {
        // eslint-disable-next-line no-new
        new Consumer('~1.0.0');
        // eslint-disable-next-line no-new
        new Consumer('~1.0.0', {});
      }).to.not.throw();
    });

    it('should set its own service property when provided', () => {
      // eslint-disable-next-line no-unused-vars
      const service = {
        foo: 'bar'
      };
      const consumer = new Consumer('~1.0.0', service);
      consumer.service.should.deep.equal(service);
    });

    it('should listen to its own disposed event and set service to null',
      () => {
        // eslint-disable-next-line no-unused-vars
        const service = {
          foo: 'bar'
        };
        // eslint-disable-next-line no-new
        const consumer = new Consumer('~1.0.0', service);
        consumer.on.should.have.been.calledOnce;
        consumer.service.should.deep.equal(service);
        const disposeCallback = consumer.on.getCall(0).args[1];
        disposeCallback();
        expect(consumer.service).to.be.null;
      });
  });
});
