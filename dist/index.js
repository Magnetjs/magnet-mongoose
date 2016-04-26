'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = require('magnet-core/dist/base');

var _base2 = _interopRequireDefault(_base);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _fs = require('mz/fs');

var _fs2 = _interopRequireDefault(_fs);

var _requireAll = require('require-all');

var _requireAll2 = _interopRequireDefault(_requireAll);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _forOwn = require('lodash/forOwn');

var _forOwn2 = _interopRequireDefault(_forOwn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mongoose = function (_Base) {
  _inherits(Mongoose, _Base);

  function Mongoose() {
    _classCallCheck(this, Mongoose);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Mongoose).apply(this, arguments));
  }

  _createClass(Mongoose, [{
    key: 'setup',
    value: function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return new Promise(function (resolve, reject) {
                  var config = _this2.app.config.connections.mongodb.default;

                  _this2.app.mongoose = _mongoose2.default.connect('mongodb://' + config.host + '/' + config.database);

                  var db = _this2.app.mongoose.connection;
                  db.on('error', function listenError(err) {
                    reject(err);
                  });
                  db.once('open', function listenOpen(callback) {
                    resolve(true);
                  });
                });

              case 3:

                if (!this.app.models) {
                  this.app.models = {};
                }
                _context.next = 9;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context['catch'](0);

                this.app.log.error(_context.t0);

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 6]]);
      }));

      function setup() {
        return ref.apply(this, arguments);
      }

      return setup;
    }()
  }, {
    key: 'start',
    value: function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var _this3 = this;

        var folderPath, exists, files;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                folderPath = _path2.default.resolve(process.cwd(), this.config.modelPath || 'server/models');
                _context2.next = 3;
                return _fs2.default.exists(folderPath);

              case 3:
                exists = _context2.sent;

                if (exists) {
                  files = (0, _requireAll2.default)(folderPath);


                  (0, _forOwn2.default)(files, function (models) {
                    (0, _forOwn2.default)(models, function (model, modelName) {
                      _this3.app.models[modelName] = model(_this3.app, _mongoose2.default);
                    });
                  });
                }

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function start() {
        return ref.apply(this, arguments);
      }

      return start;
    }()
  }]);

  return Mongoose;
}(_base2.default);

exports.default = Mongoose;
//# sourceMappingURL=index.js.map