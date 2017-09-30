"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("magnet-core/module");
const mongoose = require("mongoose");
const bluebird = require("bluebird");
class MagnetMongoose extends module_1.Module {
    init() {
        this.moduleName = 'mongoose';
        this.defaultConfig = __dirname;
    }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield new Promise((resolve, reject) => {
                    const _a = this.config, { uri } = _a, config = __rest(_a, ["uri"]);
                    this.app.mongoose = mongoose.connect(uri, config);
                    this.app.mongoose.Promise = bluebird;
                    const db = this.app.mongoose.connection;
                    db.on('error', function listenError(err) {
                        reject(err);
                    });
                    db.once('open', function listenOpen(callback) {
                        resolve();
                    });
                });
            }
            catch (err) {
                this.app.log.error(err);
            }
        });
    }
}
exports.default = MagnetMongoose;
//# sourceMappingURL=index.js.map