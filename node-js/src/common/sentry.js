const raven = require('raven');

let instance = null;

class Sentry {

  constructor() {
    this.params = {};
    this.client = new raven.Client(process.env.SENTRY_DSN);
  }

  setParam(param = {}) {
    this.params = Object.assign({}, this.params, param);
  }

  catchError(error) {
    this.setParam({ error });
    this.client.setExtraContext(this.params);
    this.client.captureException(error);
  }

}

if (instance === null) {
  instance = new Sentry();
}

exports.sentry = instance;
