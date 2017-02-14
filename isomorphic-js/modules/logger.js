import Log4js from 'log4js';
import log4js_extend from "log4js-extend";

(function(){
  // Log4js.configure('./config.json');

  log4js_extend(Log4js, {
    path: null,
    format: "(@file[@name]:@line:@column)"
  });
})();

module.exports = Log4js.getLogger('develop');
