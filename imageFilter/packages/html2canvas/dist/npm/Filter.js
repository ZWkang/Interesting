'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FILTER_TYPE = exports.FILTER_TYPE = {
    UNDEFINED: 'none',
    BRIGHTNESS: 'brightness',
    CONTRAST: 'contrast',
    GRAYSCALE: 'grayscale',
    HUEROTATE: 'hue-rotate',
    INVERT: 'invert',
    OPACITY: 'opacity',
    SATURATION: 'saturation',
    SEPIA: 'sepia'
};

var Filter = function () {
    function Filter(value) {
        _classCallCheck(this, Filter);

        var filters = value.split(' ');
        this.filterTypes = filters.map(function (f) {
            return f.slice(0, f.indexOf('('));
        });
        this.values = filters.map(function (f) {
            var v = f.slice(f.indexOf('(') + 1, f.indexOf(')'));

            if (v.slice(-1) == '%') {
                //turn % into 0 - 1 values
                v = v.slice(0, -1);
                v = Number(v);
                if (v > 1) v /= 100;
            } else if (v.slice(-3) == 'deg') {
                //turn deg into 0 - 360, for hue-rotate
                v = v.slice(0, -3);
                v = Number(v);
                if (v < 0) v += 360;
                if (v > 360) v -= 360;
            }

            return Number(v);
        });
    }

    _createClass(Filter, [{
        key: 'isDefined',
        value: function isDefined() {
            if (this.filterTypes[0] == FILTER_TYPE.UNDEFINED) return false;
            return true;
        }
    }, {
        key: 'getFilterValue',
        value: function getFilterValue(fType) {
            for (var i = 0; i < this.filterTypes.length; i++) {
                if (this.filterTypes[i] == fType) return this.values[i];
            }return 1;
        }
    }, {
        key: 'hasFilterValue',
        value: function hasFilterValue(fType) {
            for (var i = 0; i < this.filterTypes.length; i++) {
                if (this.filterTypes[i] == fType) return true;
            }return false;
        }
    }, {
        key: 'getGrayscale',
        value: function getGrayscale() {
            return this.getFilterValue(FILTER_TYPE.GRAYSCALE);
        }
    }, {
        key: 'getBrightness',
        value: function getBrightness() {
            return this.getFilterValue(FILTER_TYPE.BRIGHTNESS);
        }
    }, {
        key: 'getOpacity',
        value: function getOpacity() {
            return this.getFilterValue(FILTER_TYPE.OPACITY);
        }
    }, {
        key: 'getSepia',
        value: function getSepia() {
            return this.getFilterValue(FILTER_TYPE.SEPIA);
        }
    }, {
        key: 'getInvert',
        value: function getInvert() {
            return this.getFilterValue(FILTER_TYPE.INVERT);
        }
    }, {
        key: 'getContrast',
        value: function getContrast() {
            return this.getFilterValue(FILTER_TYPE.CONTRAST);
        }
    }, {
        key: 'getSaturation',
        value: function getSaturation() {
            return this.getFilterValue(FILTER_TYPE.SATURATION);
        }
    }, {
        key: 'getHueRotate',
        value: function getHueRotate() {
            return this.getFilterValue(FILTER_TYPE.HUEROTATE);
        }
    }, {
        key: 'hasGrayscale',
        value: function hasGrayscale() {
            return this.hasFilterValue(FILTER_TYPE.GRAYSCALE);
        }
    }, {
        key: 'hasBrightness',
        value: function hasBrightness() {
            return this.hasFilterValue(FILTER_TYPE.BRIGHTNESS);
        }
    }, {
        key: 'hasOpacity',
        value: function hasOpacity() {
            return this.hasFilterValue(FILTER_TYPE.OPACITY);
        }
    }, {
        key: 'hasSepia',
        value: function hasSepia() {
            return this.hasFilterValue(FILTER_TYPE.SEPIA);
        }
    }, {
        key: 'hasInvert',
        value: function hasInvert() {
            return this.hasFilterValue(FILTER_TYPE.INVERT);
        }
    }, {
        key: 'hasContrast',
        value: function hasContrast() {
            return this.hasFilterValue(FILTER_TYPE.CONTRAST);
        }
    }, {
        key: 'hasSaturation',
        value: function hasSaturation() {
            return this.hasFilterValue(FILTER_TYPE.SATURATION);
        }
    }, {
        key: 'hasHueRotate',
        value: function hasHueRotate() {
            return this.hasFilterValue(FILTER_TYPE.HUEROTATE);
        }
    }], [{
        key: 'create',
        value: function create(s) {
            return new Filter(s);
        }
    }]);

    return Filter;
}();

exports.default = Filter;
var parseFilter = exports.parseFilter = function parseFilter(filterValue) {
    if (filterValue == 'none') return Filter.create(FILTER_TYPE.UNDEFINED);
    return Filter.create(filterValue);
};