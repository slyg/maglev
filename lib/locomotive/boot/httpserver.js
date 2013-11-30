/**
 * Listen for HTTP requests.
 *
 * This phase creates an HTTP server and listens for requests on the given
 * address and port, defaulting to 0.0.0.0:3000.
 *
 * This phase is typically one of the final phases in the boot sequence.
 * Initializers should be run and routes should be drawn prior to this phase,
 * ensuring that the application is fully prepared to handle requests.
 *
 * Examples:
 *
 *   app.phase(locomotive.boot.httpServer({ address: '127.0.0.1', port: 8080 }, app));
 *
 * @param {String|Object} options
 * @param {Object} appArg
 * @return {Function}
 * @api public
 */
module.exports = function(options, appArg) {
  var http = require('http');
  
  if (options.constructor.name != 'Object') {
    appArg = options;
    options = undefined;
  }
  options = options || {};
  var port = options.port || 3000
    , address = options.address || '0.0.0.0';
  
  return function httpServer(done) {
    http.createServer(appArg.express).listen(port, address, function() {
      var addr = this.address();
      console.info('HTTP server listening on %s:%d', addr.address, addr.port);
      return done();
    });
  }
}