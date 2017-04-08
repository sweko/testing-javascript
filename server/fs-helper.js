"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
var FileSystem = (function () {
    function FileSystem() {
    }
    FileSystem.prototype.getExtension = function (filename) {
        return path.extname(filename);
    };
    FileSystem.prototype.getFileNameWithoutExtension = function (filename) {
        return path.basename(filename, path.extname(filename));
    };
    FileSystem.prototype.addFileNameSuffix = function (filename, suffix) {
        var ext = path.extname(filename);
        var base = path.basename(filename, ext);
        var dir = path.dirname(filename);
        var newFileName = "" + base + suffix + ext;
        return path.join(dir, newFileName);
    };
    FileSystem.prototype.readDirectory = function (name) {
        var promise = new Promise(function (resolve, reject) {
            fs.readdir(name, function (err, files) {
                if (err) {
                    reject(err);
                }
                resolve(files);
            });
        });
        return promise;
    };
    FileSystem.prototype.joinPath = function () {
        var paths = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            paths[_i] = arguments[_i];
        }
        return path.join.apply(path, paths);
    };
    FileSystem.prototype.readTextFile = function (name) {
        var promise = new Promise(function (resolve, reject) {
            fs.readFile(name, { encoding: 'utf8' }, function (err, data) {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
        return promise;
    };
    FileSystem.prototype.writeTextFile = function (name, data) {
        var promise = new Promise(function (resolve, reject) {
            fs.writeFile(name, data, function (err) {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
        return promise;
    };
    return FileSystem;
}());
exports.FileSystem = FileSystem;
