/*global $,module,exports,require,define,console,Utils*/
(function (root, factory) {
    'use strict';
    if (typeof exports === 'object') {
        module.exports = factory(require('handlebars'));
    } else if (typeof define === 'function' && define.amd) {
        define(['handlebars'], factory);
    } else {
        root.HandlebarsHelpersRegistry = factory(root.Handlebars);
    }
}(this, function (Handlebars) {
    'use strict';
    var isArray = function (value) {
            return Object.prototype.toString.call(value) === '[object Array]';
        },
        ExpressionRegistry = function () {
            this.expressions = [];
        },
        eR = new ExpressionRegistry(),
        isHelper;

    ExpressionRegistry.prototype.add = function (operator, method) {
        this.expressions[operator] = method;
    };

    ExpressionRegistry.prototype.call = function (operator, left, right) {
        if (!this.expressions.hasOwnProperty(operator)) {
            throw new Error('Unknown operator "' + operator + '"');
        }
        return this.expressions[operator](left, right);
    };

    eR.add('not', function (left, right) {
        return left != right;
    });
    eR.add('>', function (left, right) {
        return left > right;
    });
    eR.add('<', function (left, right) {
        return left < right;
    });
    eR.add('>=', function (left, right) {
        return left >= right;
    });
    eR.add('<=', function (left, right) {
        return left <= right;
    });
    eR.add('===', function (left, right) {
        return left === right;
    });
    eR.add('!==', function (left, right) {
        return left !== right;
    });
    eR.add('in', function (left, right) {
        if (!isArray(right)) {
            right = right.split(',');
        }
        return right.indexOf(left) !== -1;
    });

    isHelper = function () {
        var args = arguments,
            left = args[0],
            operator = args[1],
            right = args[2],
            options = args[3];

        if (args.length === 2) {
            options = args[1];
            if (left) { return options.fn(this); }
            return options.inverse(this);
        }

        if (args.length === 3) {
            right = args[1];
            options = args[2];
            if (left === right) { return options.fn(this); }
            return options.inverse(this);
        }

        if (eR.call(operator, left, right)) {
            return options.fn(this);
        }
        return options.inverse(this);
    };

    Handlebars.registerHelper('is', isHelper);

    Handlebars.registerHelper('nl2br', function (text) {
        var nl2br = (text + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
        return new Handlebars.SafeString(nl2br);
    });

    Handlebars.registerHelper('log', function () {
        console.log(['Values:'].concat(
            Array.prototype.slice.call(arguments, 0, -1)
        ));
    });

    Handlebars.registerHelper('debug', function () {
        console.log('Context:', this);
        console.log(['Values:'].concat(
            Array.prototype.slice.call(arguments, 0, -1)
        ));
    });

    Handlebars.registerHelper('pluralize', function (number, single, plural) {
        if (number === 1) { return single; }
        return plural;
    });

    Handlebars.registerHelper('not_android', function (options) {
        if (!Utils.isAndroidApp()) {
            return options.fn(this);
        }
    });

    Handlebars.registerHelper('comment_has_anno', function(annotation, comment_id, options) {
        var anno = JSON.parse(annotation),
            found = false;
        if (!anno) {
            return found;
        }
        // Search through the post's annotations array for 1 attached to commenti in question
        $.each(anno, function (key, val) {
            if (parseInt(val.comment_id, 10) === parseInt(comment_id, 10)) {
                found = options.fn(this);
            }
        });
        return found;
    });

    return eR;

}));