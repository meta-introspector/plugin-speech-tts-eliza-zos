import {
  Blob as Blob2,
  File,
  isFile,
  isFunction
} from "./chunk-DUPH4QXL.js";
import {
  Headers as Headers2,
  Request,
  Response as Response2,
  init_lib,
  lib_default,
  require_node_ponyfill
} from "./chunk-ELQIQFE3.js";
import {
  __commonJS,
  __esm,
  __glob,
  __require,
  __toESM
} from "./chunk-H3AJBOWU.js";

// ../../node_modules/fs.realpath/old.js
var require_old = __commonJS({
  "../../node_modules/fs.realpath/old.js"(exports) {
    var pathModule = __require("path");
    var isWindows = process.platform === "win32";
    var fs2 = __require("fs");
    var DEBUG = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);
    function rethrow() {
      var callback;
      if (DEBUG) {
        var backtrace = new Error();
        callback = debugCallback;
      } else
        callback = missingCallback;
      return callback;
      function debugCallback(err) {
        if (err) {
          backtrace.message = err.message;
          err = backtrace;
          missingCallback(err);
        }
      }
      function missingCallback(err) {
        if (err) {
          if (process.throwDeprecation)
            throw err;
          else if (!process.noDeprecation) {
            var msg = "fs: missing callback " + (err.stack || err.message);
            if (process.traceDeprecation)
              console.trace(msg);
            else
              console.error(msg);
          }
        }
      }
    }
    function maybeCallback(cb) {
      return typeof cb === "function" ? cb : rethrow();
    }
    var normalize = pathModule.normalize;
    if (isWindows) {
      nextPartRe = /(.*?)(?:[\/\\]+|$)/g;
    } else {
      nextPartRe = /(.*?)(?:[\/]+|$)/g;
    }
    var nextPartRe;
    if (isWindows) {
      splitRootRe = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/;
    } else {
      splitRootRe = /^[\/]*/;
    }
    var splitRootRe;
    exports.realpathSync = function realpathSync(p, cache) {
      p = pathModule.resolve(p);
      if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
        return cache[p];
      }
      var original = p, seenLinks = {}, knownHard = {};
      var pos;
      var current;
      var base;
      var previous;
      start();
      function start() {
        var m = splitRootRe.exec(p);
        pos = m[0].length;
        current = m[0];
        base = m[0];
        previous = "";
        if (isWindows && !knownHard[base]) {
          fs2.lstatSync(base);
          knownHard[base] = true;
        }
      }
      while (pos < p.length) {
        nextPartRe.lastIndex = pos;
        var result = nextPartRe.exec(p);
        previous = current;
        current += result[0];
        base = previous + result[1];
        pos = nextPartRe.lastIndex;
        if (knownHard[base] || cache && cache[base] === base) {
          continue;
        }
        var resolvedLink;
        if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
          resolvedLink = cache[base];
        } else {
          var stat = fs2.lstatSync(base);
          if (!stat.isSymbolicLink()) {
            knownHard[base] = true;
            if (cache) cache[base] = base;
            continue;
          }
          var linkTarget = null;
          if (!isWindows) {
            var id = stat.dev.toString(32) + ":" + stat.ino.toString(32);
            if (seenLinks.hasOwnProperty(id)) {
              linkTarget = seenLinks[id];
            }
          }
          if (linkTarget === null) {
            fs2.statSync(base);
            linkTarget = fs2.readlinkSync(base);
          }
          resolvedLink = pathModule.resolve(previous, linkTarget);
          if (cache) cache[base] = resolvedLink;
          if (!isWindows) seenLinks[id] = linkTarget;
        }
        p = pathModule.resolve(resolvedLink, p.slice(pos));
        start();
      }
      if (cache) cache[original] = p;
      return p;
    };
    exports.realpath = function realpath(p, cache, cb) {
      if (typeof cb !== "function") {
        cb = maybeCallback(cache);
        cache = null;
      }
      p = pathModule.resolve(p);
      if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
        return process.nextTick(cb.bind(null, null, cache[p]));
      }
      var original = p, seenLinks = {}, knownHard = {};
      var pos;
      var current;
      var base;
      var previous;
      start();
      function start() {
        var m = splitRootRe.exec(p);
        pos = m[0].length;
        current = m[0];
        base = m[0];
        previous = "";
        if (isWindows && !knownHard[base]) {
          fs2.lstat(base, function(err) {
            if (err) return cb(err);
            knownHard[base] = true;
            LOOP();
          });
        } else {
          process.nextTick(LOOP);
        }
      }
      function LOOP() {
        if (pos >= p.length) {
          if (cache) cache[original] = p;
          return cb(null, p);
        }
        nextPartRe.lastIndex = pos;
        var result = nextPartRe.exec(p);
        previous = current;
        current += result[0];
        base = previous + result[1];
        pos = nextPartRe.lastIndex;
        if (knownHard[base] || cache && cache[base] === base) {
          return process.nextTick(LOOP);
        }
        if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
          return gotResolvedLink(cache[base]);
        }
        return fs2.lstat(base, gotStat);
      }
      function gotStat(err, stat) {
        if (err) return cb(err);
        if (!stat.isSymbolicLink()) {
          knownHard[base] = true;
          if (cache) cache[base] = base;
          return process.nextTick(LOOP);
        }
        if (!isWindows) {
          var id = stat.dev.toString(32) + ":" + stat.ino.toString(32);
          if (seenLinks.hasOwnProperty(id)) {
            return gotTarget(null, seenLinks[id], base);
          }
        }
        fs2.stat(base, function(err2) {
          if (err2) return cb(err2);
          fs2.readlink(base, function(err3, target) {
            if (!isWindows) seenLinks[id] = target;
            gotTarget(err3, target);
          });
        });
      }
      function gotTarget(err, target, base2) {
        if (err) return cb(err);
        var resolvedLink = pathModule.resolve(previous, target);
        if (cache) cache[base2] = resolvedLink;
        gotResolvedLink(resolvedLink);
      }
      function gotResolvedLink(resolvedLink) {
        p = pathModule.resolve(resolvedLink, p.slice(pos));
        start();
      }
    };
  }
});

// ../../node_modules/fs.realpath/index.js
var require_fs = __commonJS({
  "../../node_modules/fs.realpath/index.js"(exports, module) {
    module.exports = realpath;
    realpath.realpath = realpath;
    realpath.sync = realpathSync;
    realpath.realpathSync = realpathSync;
    realpath.monkeypatch = monkeypatch;
    realpath.unmonkeypatch = unmonkeypatch;
    var fs2 = __require("fs");
    var origRealpath = fs2.realpath;
    var origRealpathSync = fs2.realpathSync;
    var version2 = process.version;
    var ok = /^v[0-5]\./.test(version2);
    var old = require_old();
    function newError(er) {
      return er && er.syscall === "realpath" && (er.code === "ELOOP" || er.code === "ENOMEM" || er.code === "ENAMETOOLONG");
    }
    function realpath(p, cache, cb) {
      if (ok) {
        return origRealpath(p, cache, cb);
      }
      if (typeof cache === "function") {
        cb = cache;
        cache = null;
      }
      origRealpath(p, cache, function(er, result) {
        if (newError(er)) {
          old.realpath(p, cache, cb);
        } else {
          cb(er, result);
        }
      });
    }
    function realpathSync(p, cache) {
      if (ok) {
        return origRealpathSync(p, cache);
      }
      try {
        return origRealpathSync(p, cache);
      } catch (er) {
        if (newError(er)) {
          return old.realpathSync(p, cache);
        } else {
          throw er;
        }
      }
    }
    function monkeypatch() {
      fs2.realpath = realpath;
      fs2.realpathSync = realpathSync;
    }
    function unmonkeypatch() {
      fs2.realpath = origRealpath;
      fs2.realpathSync = origRealpathSync;
    }
  }
});

// ../../node_modules/concat-map/index.js
var require_concat_map = __commonJS({
  "../../node_modules/concat-map/index.js"(exports, module) {
    module.exports = function(xs, fn) {
      var res = [];
      for (var i = 0; i < xs.length; i++) {
        var x = fn(xs[i], i);
        if (isArray(x)) res.push.apply(res, x);
        else res.push(x);
      }
      return res;
    };
    var isArray = Array.isArray || function(xs) {
      return Object.prototype.toString.call(xs) === "[object Array]";
    };
  }
});

// ../../node_modules/balanced-match/index.js
var require_balanced_match = __commonJS({
  "../../node_modules/balanced-match/index.js"(exports, module) {
    "use strict";
    module.exports = balanced;
    function balanced(a, b, str2) {
      if (a instanceof RegExp) a = maybeMatch(a, str2);
      if (b instanceof RegExp) b = maybeMatch(b, str2);
      var r = range(a, b, str2);
      return r && {
        start: r[0],
        end: r[1],
        pre: str2.slice(0, r[0]),
        body: str2.slice(r[0] + a.length, r[1]),
        post: str2.slice(r[1] + b.length)
      };
    }
    function maybeMatch(reg, str2) {
      var m = str2.match(reg);
      return m ? m[0] : null;
    }
    balanced.range = range;
    function range(a, b, str2) {
      var begs, beg, left, right, result;
      var ai = str2.indexOf(a);
      var bi = str2.indexOf(b, ai + 1);
      var i = ai;
      if (ai >= 0 && bi > 0) {
        if (a === b) {
          return [ai, bi];
        }
        begs = [];
        left = str2.length;
        while (i >= 0 && !result) {
          if (i == ai) {
            begs.push(i);
            ai = str2.indexOf(a, i + 1);
          } else if (begs.length == 1) {
            result = [begs.pop(), bi];
          } else {
            beg = begs.pop();
            if (beg < left) {
              left = beg;
              right = bi;
            }
            bi = str2.indexOf(b, i + 1);
          }
          i = ai < bi && ai >= 0 ? ai : bi;
        }
        if (begs.length) {
          result = [left, right];
        }
      }
      return result;
    }
  }
});

// ../../node_modules/minimatch/node_modules/brace-expansion/index.js
var require_brace_expansion = __commonJS({
  "../../node_modules/minimatch/node_modules/brace-expansion/index.js"(exports, module) {
    var concatMap = require_concat_map();
    var balanced = require_balanced_match();
    module.exports = expandTop;
    var escSlash = "\0SLASH" + Math.random() + "\0";
    var escOpen = "\0OPEN" + Math.random() + "\0";
    var escClose = "\0CLOSE" + Math.random() + "\0";
    var escComma = "\0COMMA" + Math.random() + "\0";
    var escPeriod = "\0PERIOD" + Math.random() + "\0";
    function numeric(str2) {
      return parseInt(str2, 10) == str2 ? parseInt(str2, 10) : str2.charCodeAt(0);
    }
    function escapeBraces(str2) {
      return str2.split("\\\\").join(escSlash).split("\\{").join(escOpen).split("\\}").join(escClose).split("\\,").join(escComma).split("\\.").join(escPeriod);
    }
    function unescapeBraces(str2) {
      return str2.split(escSlash).join("\\").split(escOpen).join("{").split(escClose).join("}").split(escComma).join(",").split(escPeriod).join(".");
    }
    function parseCommaParts(str2) {
      if (!str2)
        return [""];
      var parts = [];
      var m = balanced("{", "}", str2);
      if (!m)
        return str2.split(",");
      var pre = m.pre;
      var body = m.body;
      var post = m.post;
      var p = pre.split(",");
      p[p.length - 1] += "{" + body + "}";
      var postParts = parseCommaParts(post);
      if (post.length) {
        p[p.length - 1] += postParts.shift();
        p.push.apply(p, postParts);
      }
      parts.push.apply(parts, p);
      return parts;
    }
    function expandTop(str2) {
      if (!str2)
        return [];
      if (str2.substr(0, 2) === "{}") {
        str2 = "\\{\\}" + str2.substr(2);
      }
      return expand(escapeBraces(str2), true).map(unescapeBraces);
    }
    function embrace(str2) {
      return "{" + str2 + "}";
    }
    function isPadded(el) {
      return /^-?0\d/.test(el);
    }
    function lte(i, y) {
      return i <= y;
    }
    function gte(i, y) {
      return i >= y;
    }
    function expand(str2, isTop) {
      var expansions = [];
      var m = balanced("{", "}", str2);
      if (!m || /\$$/.test(m.pre)) return [str2];
      var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
      var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
      var isSequence = isNumericSequence || isAlphaSequence;
      var isOptions = m.body.indexOf(",") >= 0;
      if (!isSequence && !isOptions) {
        if (m.post.match(/,.*\}/)) {
          str2 = m.pre + "{" + m.body + escClose + m.post;
          return expand(str2);
        }
        return [str2];
      }
      var n;
      if (isSequence) {
        n = m.body.split(/\.\./);
      } else {
        n = parseCommaParts(m.body);
        if (n.length === 1) {
          n = expand(n[0], false).map(embrace);
          if (n.length === 1) {
            var post = m.post.length ? expand(m.post, false) : [""];
            return post.map(function(p) {
              return m.pre + n[0] + p;
            });
          }
        }
      }
      var pre = m.pre;
      var post = m.post.length ? expand(m.post, false) : [""];
      var N;
      if (isSequence) {
        var x = numeric(n[0]);
        var y = numeric(n[1]);
        var width = Math.max(n[0].length, n[1].length);
        var incr = n.length == 3 ? Math.abs(numeric(n[2])) : 1;
        var test = lte;
        var reverse = y < x;
        if (reverse) {
          incr *= -1;
          test = gte;
        }
        var pad = n.some(isPadded);
        N = [];
        for (var i = x; test(i, y); i += incr) {
          var c;
          if (isAlphaSequence) {
            c = String.fromCharCode(i);
            if (c === "\\")
              c = "";
          } else {
            c = String(i);
            if (pad) {
              var need = width - c.length;
              if (need > 0) {
                var z3 = new Array(need + 1).join("0");
                if (i < 0)
                  c = "-" + z3 + c.slice(1);
                else
                  c = z3 + c;
              }
            }
          }
          N.push(c);
        }
      } else {
        N = concatMap(n, function(el) {
          return expand(el, false);
        });
      }
      for (var j = 0; j < N.length; j++) {
        for (var k = 0; k < post.length; k++) {
          var expansion = pre + N[j] + post[k];
          if (!isTop || isSequence || expansion)
            expansions.push(expansion);
        }
      }
      return expansions;
    }
  }
});

// ../../node_modules/minimatch/minimatch.js
var require_minimatch = __commonJS({
  "../../node_modules/minimatch/minimatch.js"(exports, module) {
    module.exports = minimatch;
    minimatch.Minimatch = Minimatch;
    var path2 = function() {
      try {
        return __require("path");
      } catch (e) {
      }
    }() || {
      sep: "/"
    };
    minimatch.sep = path2.sep;
    var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {};
    var expand = require_brace_expansion();
    var plTypes = {
      "!": { open: "(?:(?!(?:", close: "))[^/]*?)" },
      "?": { open: "(?:", close: ")?" },
      "+": { open: "(?:", close: ")+" },
      "*": { open: "(?:", close: ")*" },
      "@": { open: "(?:", close: ")" }
    };
    var qmark = "[^/]";
    var star = qmark + "*?";
    var twoStarDot = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?";
    var twoStarNoDot = "(?:(?!(?:\\/|^)\\.).)*?";
    var reSpecials = charSet("().*{}+?[]^$\\!");
    function charSet(s) {
      return s.split("").reduce(function(set, c) {
        set[c] = true;
        return set;
      }, {});
    }
    var slashSplit = /\/+/;
    minimatch.filter = filter;
    function filter(pattern, options) {
      options = options || {};
      return function(p, i, list) {
        return minimatch(p, pattern, options);
      };
    }
    function ext(a, b) {
      b = b || {};
      var t = {};
      Object.keys(a).forEach(function(k) {
        t[k] = a[k];
      });
      Object.keys(b).forEach(function(k) {
        t[k] = b[k];
      });
      return t;
    }
    minimatch.defaults = function(def) {
      if (!def || typeof def !== "object" || !Object.keys(def).length) {
        return minimatch;
      }
      var orig = minimatch;
      var m = function minimatch2(p, pattern, options) {
        return orig(p, pattern, ext(def, options));
      };
      m.Minimatch = function Minimatch2(pattern, options) {
        return new orig.Minimatch(pattern, ext(def, options));
      };
      m.Minimatch.defaults = function defaults2(options) {
        return orig.defaults(ext(def, options)).Minimatch;
      };
      m.filter = function filter2(pattern, options) {
        return orig.filter(pattern, ext(def, options));
      };
      m.defaults = function defaults2(options) {
        return orig.defaults(ext(def, options));
      };
      m.makeRe = function makeRe2(pattern, options) {
        return orig.makeRe(pattern, ext(def, options));
      };
      m.braceExpand = function braceExpand2(pattern, options) {
        return orig.braceExpand(pattern, ext(def, options));
      };
      m.match = function(list, pattern, options) {
        return orig.match(list, pattern, ext(def, options));
      };
      return m;
    };
    Minimatch.defaults = function(def) {
      return minimatch.defaults(def).Minimatch;
    };
    function minimatch(p, pattern, options) {
      assertValidPattern(pattern);
      if (!options) options = {};
      if (!options.nocomment && pattern.charAt(0) === "#") {
        return false;
      }
      return new Minimatch(pattern, options).match(p);
    }
    function Minimatch(pattern, options) {
      if (!(this instanceof Minimatch)) {
        return new Minimatch(pattern, options);
      }
      assertValidPattern(pattern);
      if (!options) options = {};
      pattern = pattern.trim();
      if (!options.allowWindowsEscape && path2.sep !== "/") {
        pattern = pattern.split(path2.sep).join("/");
      }
      this.options = options;
      this.set = [];
      this.pattern = pattern;
      this.regexp = null;
      this.negate = false;
      this.comment = false;
      this.empty = false;
      this.partial = !!options.partial;
      this.make();
    }
    Minimatch.prototype.debug = function() {
    };
    Minimatch.prototype.make = make;
    function make() {
      var pattern = this.pattern;
      var options = this.options;
      if (!options.nocomment && pattern.charAt(0) === "#") {
        this.comment = true;
        return;
      }
      if (!pattern) {
        this.empty = true;
        return;
      }
      this.parseNegate();
      var set = this.globSet = this.braceExpand();
      if (options.debug) this.debug = function debug2() {
        console.error.apply(console, arguments);
      };
      this.debug(this.pattern, set);
      set = this.globParts = set.map(function(s) {
        return s.split(slashSplit);
      });
      this.debug(this.pattern, set);
      set = set.map(function(s, si, set2) {
        return s.map(this.parse, this);
      }, this);
      this.debug(this.pattern, set);
      set = set.filter(function(s) {
        return s.indexOf(false) === -1;
      });
      this.debug(this.pattern, set);
      this.set = set;
    }
    Minimatch.prototype.parseNegate = parseNegate;
    function parseNegate() {
      var pattern = this.pattern;
      var negate = false;
      var options = this.options;
      var negateOffset = 0;
      if (options.nonegate) return;
      for (var i = 0, l = pattern.length; i < l && pattern.charAt(i) === "!"; i++) {
        negate = !negate;
        negateOffset++;
      }
      if (negateOffset) this.pattern = pattern.substr(negateOffset);
      this.negate = negate;
    }
    minimatch.braceExpand = function(pattern, options) {
      return braceExpand(pattern, options);
    };
    Minimatch.prototype.braceExpand = braceExpand;
    function braceExpand(pattern, options) {
      if (!options) {
        if (this instanceof Minimatch) {
          options = this.options;
        } else {
          options = {};
        }
      }
      pattern = typeof pattern === "undefined" ? this.pattern : pattern;
      assertValidPattern(pattern);
      if (options.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern)) {
        return [pattern];
      }
      return expand(pattern);
    }
    var MAX_PATTERN_LENGTH = 1024 * 64;
    var assertValidPattern = function(pattern) {
      if (typeof pattern !== "string") {
        throw new TypeError("invalid pattern");
      }
      if (pattern.length > MAX_PATTERN_LENGTH) {
        throw new TypeError("pattern is too long");
      }
    };
    Minimatch.prototype.parse = parse;
    var SUBPARSE = {};
    function parse(pattern, isSub) {
      assertValidPattern(pattern);
      var options = this.options;
      if (pattern === "**") {
        if (!options.noglobstar)
          return GLOBSTAR;
        else
          pattern = "*";
      }
      if (pattern === "") return "";
      var re = "";
      var hasMagic = !!options.nocase;
      var escaping = false;
      var patternListStack = [];
      var negativeLists = [];
      var stateChar;
      var inClass = false;
      var reClassStart = -1;
      var classStart = -1;
      var patternStart = pattern.charAt(0) === "." ? "" : options.dot ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)";
      var self = this;
      function clearStateChar() {
        if (stateChar) {
          switch (stateChar) {
            case "*":
              re += star;
              hasMagic = true;
              break;
            case "?":
              re += qmark;
              hasMagic = true;
              break;
            default:
              re += "\\" + stateChar;
              break;
          }
          self.debug("clearStateChar %j %j", stateChar, re);
          stateChar = false;
        }
      }
      for (var i = 0, len = pattern.length, c; i < len && (c = pattern.charAt(i)); i++) {
        this.debug("%s	%s %s %j", pattern, i, re, c);
        if (escaping && reSpecials[c]) {
          re += "\\" + c;
          escaping = false;
          continue;
        }
        switch (c) {
          /* istanbul ignore next */
          case "/": {
            return false;
          }
          case "\\":
            clearStateChar();
            escaping = true;
            continue;
          // the various stateChar values
          // for the "extglob" stuff.
          case "?":
          case "*":
          case "+":
          case "@":
          case "!":
            this.debug("%s	%s %s %j <-- stateChar", pattern, i, re, c);
            if (inClass) {
              this.debug("  in class");
              if (c === "!" && i === classStart + 1) c = "^";
              re += c;
              continue;
            }
            self.debug("call clearStateChar %j", stateChar);
            clearStateChar();
            stateChar = c;
            if (options.noext) clearStateChar();
            continue;
          case "(":
            if (inClass) {
              re += "(";
              continue;
            }
            if (!stateChar) {
              re += "\\(";
              continue;
            }
            patternListStack.push({
              type: stateChar,
              start: i - 1,
              reStart: re.length,
              open: plTypes[stateChar].open,
              close: plTypes[stateChar].close
            });
            re += stateChar === "!" ? "(?:(?!(?:" : "(?:";
            this.debug("plType %j %j", stateChar, re);
            stateChar = false;
            continue;
          case ")":
            if (inClass || !patternListStack.length) {
              re += "\\)";
              continue;
            }
            clearStateChar();
            hasMagic = true;
            var pl = patternListStack.pop();
            re += pl.close;
            if (pl.type === "!") {
              negativeLists.push(pl);
            }
            pl.reEnd = re.length;
            continue;
          case "|":
            if (inClass || !patternListStack.length || escaping) {
              re += "\\|";
              escaping = false;
              continue;
            }
            clearStateChar();
            re += "|";
            continue;
          // these are mostly the same in regexp and glob
          case "[":
            clearStateChar();
            if (inClass) {
              re += "\\" + c;
              continue;
            }
            inClass = true;
            classStart = i;
            reClassStart = re.length;
            re += c;
            continue;
          case "]":
            if (i === classStart + 1 || !inClass) {
              re += "\\" + c;
              escaping = false;
              continue;
            }
            var cs = pattern.substring(classStart + 1, i);
            try {
              RegExp("[" + cs + "]");
            } catch (er) {
              var sp = this.parse(cs, SUBPARSE);
              re = re.substr(0, reClassStart) + "\\[" + sp[0] + "\\]";
              hasMagic = hasMagic || sp[1];
              inClass = false;
              continue;
            }
            hasMagic = true;
            inClass = false;
            re += c;
            continue;
          default:
            clearStateChar();
            if (escaping) {
              escaping = false;
            } else if (reSpecials[c] && !(c === "^" && inClass)) {
              re += "\\";
            }
            re += c;
        }
      }
      if (inClass) {
        cs = pattern.substr(classStart + 1);
        sp = this.parse(cs, SUBPARSE);
        re = re.substr(0, reClassStart) + "\\[" + sp[0];
        hasMagic = hasMagic || sp[1];
      }
      for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
        var tail = re.slice(pl.reStart + pl.open.length);
        this.debug("setting tail", re, pl);
        tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function(_, $1, $2) {
          if (!$2) {
            $2 = "\\";
          }
          return $1 + $1 + $2 + "|";
        });
        this.debug("tail=%j\n   %s", tail, tail, pl, re);
        var t = pl.type === "*" ? star : pl.type === "?" ? qmark : "\\" + pl.type;
        hasMagic = true;
        re = re.slice(0, pl.reStart) + t + "\\(" + tail;
      }
      clearStateChar();
      if (escaping) {
        re += "\\\\";
      }
      var addPatternStart = false;
      switch (re.charAt(0)) {
        case "[":
        case ".":
        case "(":
          addPatternStart = true;
      }
      for (var n = negativeLists.length - 1; n > -1; n--) {
        var nl = negativeLists[n];
        var nlBefore = re.slice(0, nl.reStart);
        var nlFirst = re.slice(nl.reStart, nl.reEnd - 8);
        var nlLast = re.slice(nl.reEnd - 8, nl.reEnd);
        var nlAfter = re.slice(nl.reEnd);
        nlLast += nlAfter;
        var openParensBefore = nlBefore.split("(").length - 1;
        var cleanAfter = nlAfter;
        for (i = 0; i < openParensBefore; i++) {
          cleanAfter = cleanAfter.replace(/\)[+*?]?/, "");
        }
        nlAfter = cleanAfter;
        var dollar = "";
        if (nlAfter === "" && isSub !== SUBPARSE) {
          dollar = "$";
        }
        var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast;
        re = newRe;
      }
      if (re !== "" && hasMagic) {
        re = "(?=.)" + re;
      }
      if (addPatternStart) {
        re = patternStart + re;
      }
      if (isSub === SUBPARSE) {
        return [re, hasMagic];
      }
      if (!hasMagic) {
        return globUnescape(pattern);
      }
      var flags = options.nocase ? "i" : "";
      try {
        var regExp = new RegExp("^" + re + "$", flags);
      } catch (er) {
        return new RegExp("$.");
      }
      regExp._glob = pattern;
      regExp._src = re;
      return regExp;
    }
    minimatch.makeRe = function(pattern, options) {
      return new Minimatch(pattern, options || {}).makeRe();
    };
    Minimatch.prototype.makeRe = makeRe;
    function makeRe() {
      if (this.regexp || this.regexp === false) return this.regexp;
      var set = this.set;
      if (!set.length) {
        this.regexp = false;
        return this.regexp;
      }
      var options = this.options;
      var twoStar = options.noglobstar ? star : options.dot ? twoStarDot : twoStarNoDot;
      var flags = options.nocase ? "i" : "";
      var re = set.map(function(pattern) {
        return pattern.map(function(p) {
          return p === GLOBSTAR ? twoStar : typeof p === "string" ? regExpEscape(p) : p._src;
        }).join("\\/");
      }).join("|");
      re = "^(?:" + re + ")$";
      if (this.negate) re = "^(?!" + re + ").*$";
      try {
        this.regexp = new RegExp(re, flags);
      } catch (ex) {
        this.regexp = false;
      }
      return this.regexp;
    }
    minimatch.match = function(list, pattern, options) {
      options = options || {};
      var mm = new Minimatch(pattern, options);
      list = list.filter(function(f) {
        return mm.match(f);
      });
      if (mm.options.nonull && !list.length) {
        list.push(pattern);
      }
      return list;
    };
    Minimatch.prototype.match = function match(f, partial) {
      if (typeof partial === "undefined") partial = this.partial;
      this.debug("match", f, this.pattern);
      if (this.comment) return false;
      if (this.empty) return f === "";
      if (f === "/" && partial) return true;
      var options = this.options;
      if (path2.sep !== "/") {
        f = f.split(path2.sep).join("/");
      }
      f = f.split(slashSplit);
      this.debug(this.pattern, "split", f);
      var set = this.set;
      this.debug(this.pattern, "set", set);
      var filename;
      var i;
      for (i = f.length - 1; i >= 0; i--) {
        filename = f[i];
        if (filename) break;
      }
      for (i = 0; i < set.length; i++) {
        var pattern = set[i];
        var file = f;
        if (options.matchBase && pattern.length === 1) {
          file = [filename];
        }
        var hit = this.matchOne(file, pattern, partial);
        if (hit) {
          if (options.flipNegate) return true;
          return !this.negate;
        }
      }
      if (options.flipNegate) return false;
      return this.negate;
    };
    Minimatch.prototype.matchOne = function(file, pattern, partial) {
      var options = this.options;
      this.debug(
        "matchOne",
        { "this": this, file, pattern }
      );
      this.debug("matchOne", file.length, pattern.length);
      for (var fi = 0, pi = 0, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++) {
        this.debug("matchOne loop");
        var p = pattern[pi];
        var f = file[fi];
        this.debug(pattern, p, f);
        if (p === false) return false;
        if (p === GLOBSTAR) {
          this.debug("GLOBSTAR", [pattern, p, f]);
          var fr = fi;
          var pr = pi + 1;
          if (pr === pl) {
            this.debug("** at the end");
            for (; fi < fl; fi++) {
              if (file[fi] === "." || file[fi] === ".." || !options.dot && file[fi].charAt(0) === ".") return false;
            }
            return true;
          }
          while (fr < fl) {
            var swallowee = file[fr];
            this.debug("\nglobstar while", file, fr, pattern, pr, swallowee);
            if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
              this.debug("globstar found match!", fr, fl, swallowee);
              return true;
            } else {
              if (swallowee === "." || swallowee === ".." || !options.dot && swallowee.charAt(0) === ".") {
                this.debug("dot detected!", file, fr, pattern, pr);
                break;
              }
              this.debug("globstar swallow a segment, and continue");
              fr++;
            }
          }
          if (partial) {
            this.debug("\n>>> no match, partial?", file, fr, pattern, pr);
            if (fr === fl) return true;
          }
          return false;
        }
        var hit;
        if (typeof p === "string") {
          hit = f === p;
          this.debug("string match", p, f, hit);
        } else {
          hit = f.match(p);
          this.debug("pattern match", p, f, hit);
        }
        if (!hit) return false;
      }
      if (fi === fl && pi === pl) {
        return true;
      } else if (fi === fl) {
        return partial;
      } else if (pi === pl) {
        return fi === fl - 1 && file[fi] === "";
      }
      throw new Error("wtf?");
    };
    function globUnescape(s) {
      return s.replace(/\\(.)/g, "$1");
    }
    function regExpEscape(s) {
      return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    }
  }
});

// ../../node_modules/inherits/inherits_browser.js
var require_inherits_browser = __commonJS({
  "../../node_modules/inherits/inherits_browser.js"(exports, module) {
    if (typeof Object.create === "function") {
      module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }
      };
    } else {
      module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function() {
          };
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      };
    }
  }
});

// ../../node_modules/inherits/inherits.js
var require_inherits = __commonJS({
  "../../node_modules/inherits/inherits.js"(exports, module) {
    try {
      util = __require("util");
      if (typeof util.inherits !== "function") throw "";
      module.exports = util.inherits;
    } catch (e) {
      module.exports = require_inherits_browser();
    }
    var util;
  }
});

// ../../node_modules/path-is-absolute/index.js
var require_path_is_absolute = __commonJS({
  "../../node_modules/path-is-absolute/index.js"(exports, module) {
    "use strict";
    function posix(path2) {
      return path2.charAt(0) === "/";
    }
    function win32(path2) {
      var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
      var result = splitDeviceRe.exec(path2);
      var device = result[1] || "";
      var isUnc = Boolean(device && device.charAt(1) !== ":");
      return Boolean(result[2] || isUnc);
    }
    module.exports = process.platform === "win32" ? win32 : posix;
    module.exports.posix = posix;
    module.exports.win32 = win32;
  }
});

// ../../node_modules/glob/common.js
var require_common = __commonJS({
  "../../node_modules/glob/common.js"(exports) {
    exports.setopts = setopts;
    exports.ownProp = ownProp;
    exports.makeAbs = makeAbs;
    exports.finish = finish;
    exports.mark = mark;
    exports.isIgnored = isIgnored;
    exports.childrenIgnored = childrenIgnored;
    function ownProp(obj, field) {
      return Object.prototype.hasOwnProperty.call(obj, field);
    }
    var fs2 = __require("fs");
    var path2 = __require("path");
    var minimatch = require_minimatch();
    var isAbsolute = require_path_is_absolute();
    var Minimatch = minimatch.Minimatch;
    function alphasort(a, b) {
      return a.localeCompare(b, "en");
    }
    function setupIgnores(self, options) {
      self.ignore = options.ignore || [];
      if (!Array.isArray(self.ignore))
        self.ignore = [self.ignore];
      if (self.ignore.length) {
        self.ignore = self.ignore.map(ignoreMap);
      }
    }
    function ignoreMap(pattern) {
      var gmatcher = null;
      if (pattern.slice(-3) === "/**") {
        var gpattern = pattern.replace(/(\/\*\*)+$/, "");
        gmatcher = new Minimatch(gpattern, { dot: true });
      }
      return {
        matcher: new Minimatch(pattern, { dot: true }),
        gmatcher
      };
    }
    function setopts(self, pattern, options) {
      if (!options)
        options = {};
      if (options.matchBase && -1 === pattern.indexOf("/")) {
        if (options.noglobstar) {
          throw new Error("base matching requires globstar");
        }
        pattern = "**/" + pattern;
      }
      self.silent = !!options.silent;
      self.pattern = pattern;
      self.strict = options.strict !== false;
      self.realpath = !!options.realpath;
      self.realpathCache = options.realpathCache || /* @__PURE__ */ Object.create(null);
      self.follow = !!options.follow;
      self.dot = !!options.dot;
      self.mark = !!options.mark;
      self.nodir = !!options.nodir;
      if (self.nodir)
        self.mark = true;
      self.sync = !!options.sync;
      self.nounique = !!options.nounique;
      self.nonull = !!options.nonull;
      self.nosort = !!options.nosort;
      self.nocase = !!options.nocase;
      self.stat = !!options.stat;
      self.noprocess = !!options.noprocess;
      self.absolute = !!options.absolute;
      self.fs = options.fs || fs2;
      self.maxLength = options.maxLength || Infinity;
      self.cache = options.cache || /* @__PURE__ */ Object.create(null);
      self.statCache = options.statCache || /* @__PURE__ */ Object.create(null);
      self.symlinks = options.symlinks || /* @__PURE__ */ Object.create(null);
      setupIgnores(self, options);
      self.changedCwd = false;
      var cwd = process.cwd();
      if (!ownProp(options, "cwd"))
        self.cwd = cwd;
      else {
        self.cwd = path2.resolve(options.cwd);
        self.changedCwd = self.cwd !== cwd;
      }
      self.root = options.root || path2.resolve(self.cwd, "/");
      self.root = path2.resolve(self.root);
      if (process.platform === "win32")
        self.root = self.root.replace(/\\/g, "/");
      self.cwdAbs = isAbsolute(self.cwd) ? self.cwd : makeAbs(self, self.cwd);
      if (process.platform === "win32")
        self.cwdAbs = self.cwdAbs.replace(/\\/g, "/");
      self.nomount = !!options.nomount;
      options.nonegate = true;
      options.nocomment = true;
      options.allowWindowsEscape = false;
      self.minimatch = new Minimatch(pattern, options);
      self.options = self.minimatch.options;
    }
    function finish(self) {
      var nou = self.nounique;
      var all = nou ? [] : /* @__PURE__ */ Object.create(null);
      for (var i = 0, l = self.matches.length; i < l; i++) {
        var matches = self.matches[i];
        if (!matches || Object.keys(matches).length === 0) {
          if (self.nonull) {
            var literal = self.minimatch.globSet[i];
            if (nou)
              all.push(literal);
            else
              all[literal] = true;
          }
        } else {
          var m = Object.keys(matches);
          if (nou)
            all.push.apply(all, m);
          else
            m.forEach(function(m2) {
              all[m2] = true;
            });
        }
      }
      if (!nou)
        all = Object.keys(all);
      if (!self.nosort)
        all = all.sort(alphasort);
      if (self.mark) {
        for (var i = 0; i < all.length; i++) {
          all[i] = self._mark(all[i]);
        }
        if (self.nodir) {
          all = all.filter(function(e) {
            var notDir = !/\/$/.test(e);
            var c = self.cache[e] || self.cache[makeAbs(self, e)];
            if (notDir && c)
              notDir = c !== "DIR" && !Array.isArray(c);
            return notDir;
          });
        }
      }
      if (self.ignore.length)
        all = all.filter(function(m2) {
          return !isIgnored(self, m2);
        });
      self.found = all;
    }
    function mark(self, p) {
      var abs = makeAbs(self, p);
      var c = self.cache[abs];
      var m = p;
      if (c) {
        var isDir = c === "DIR" || Array.isArray(c);
        var slash = p.slice(-1) === "/";
        if (isDir && !slash)
          m += "/";
        else if (!isDir && slash)
          m = m.slice(0, -1);
        if (m !== p) {
          var mabs = makeAbs(self, m);
          self.statCache[mabs] = self.statCache[abs];
          self.cache[mabs] = self.cache[abs];
        }
      }
      return m;
    }
    function makeAbs(self, f) {
      var abs = f;
      if (f.charAt(0) === "/") {
        abs = path2.join(self.root, f);
      } else if (isAbsolute(f) || f === "") {
        abs = f;
      } else if (self.changedCwd) {
        abs = path2.resolve(self.cwd, f);
      } else {
        abs = path2.resolve(f);
      }
      if (process.platform === "win32")
        abs = abs.replace(/\\/g, "/");
      return abs;
    }
    function isIgnored(self, path3) {
      if (!self.ignore.length)
        return false;
      return self.ignore.some(function(item) {
        return item.matcher.match(path3) || !!(item.gmatcher && item.gmatcher.match(path3));
      });
    }
    function childrenIgnored(self, path3) {
      if (!self.ignore.length)
        return false;
      return self.ignore.some(function(item) {
        return !!(item.gmatcher && item.gmatcher.match(path3));
      });
    }
  }
});

// ../../node_modules/glob/sync.js
var require_sync = __commonJS({
  "../../node_modules/glob/sync.js"(exports, module) {
    module.exports = globSync;
    globSync.GlobSync = GlobSync;
    var rp = require_fs();
    var minimatch = require_minimatch();
    var Minimatch = minimatch.Minimatch;
    var Glob = require_glob().Glob;
    var util = __require("util");
    var path2 = __require("path");
    var assert = __require("assert");
    var isAbsolute = require_path_is_absolute();
    var common = require_common();
    var setopts = common.setopts;
    var ownProp = common.ownProp;
    var childrenIgnored = common.childrenIgnored;
    var isIgnored = common.isIgnored;
    function globSync(pattern, options) {
      if (typeof options === "function" || arguments.length === 3)
        throw new TypeError("callback provided to sync glob\nSee: https://github.com/isaacs/node-glob/issues/167");
      return new GlobSync(pattern, options).found;
    }
    function GlobSync(pattern, options) {
      if (!pattern)
        throw new Error("must provide pattern");
      if (typeof options === "function" || arguments.length === 3)
        throw new TypeError("callback provided to sync glob\nSee: https://github.com/isaacs/node-glob/issues/167");
      if (!(this instanceof GlobSync))
        return new GlobSync(pattern, options);
      setopts(this, pattern, options);
      if (this.noprocess)
        return this;
      var n = this.minimatch.set.length;
      this.matches = new Array(n);
      for (var i = 0; i < n; i++) {
        this._process(this.minimatch.set[i], i, false);
      }
      this._finish();
    }
    GlobSync.prototype._finish = function() {
      assert.ok(this instanceof GlobSync);
      if (this.realpath) {
        var self = this;
        this.matches.forEach(function(matchset, index) {
          var set = self.matches[index] = /* @__PURE__ */ Object.create(null);
          for (var p in matchset) {
            try {
              p = self._makeAbs(p);
              var real = rp.realpathSync(p, self.realpathCache);
              set[real] = true;
            } catch (er) {
              if (er.syscall === "stat")
                set[self._makeAbs(p)] = true;
              else
                throw er;
            }
          }
        });
      }
      common.finish(this);
    };
    GlobSync.prototype._process = function(pattern, index, inGlobStar) {
      assert.ok(this instanceof GlobSync);
      var n = 0;
      while (typeof pattern[n] === "string") {
        n++;
      }
      var prefix;
      switch (n) {
        // if not, then this is rather simple
        case pattern.length:
          this._processSimple(pattern.join("/"), index);
          return;
        case 0:
          prefix = null;
          break;
        default:
          prefix = pattern.slice(0, n).join("/");
          break;
      }
      var remain = pattern.slice(n);
      var read;
      if (prefix === null)
        read = ".";
      else if (isAbsolute(prefix) || isAbsolute(pattern.map(function(p) {
        return typeof p === "string" ? p : "[*]";
      }).join("/"))) {
        if (!prefix || !isAbsolute(prefix))
          prefix = "/" + prefix;
        read = prefix;
      } else
        read = prefix;
      var abs = this._makeAbs(read);
      if (childrenIgnored(this, read))
        return;
      var isGlobStar = remain[0] === minimatch.GLOBSTAR;
      if (isGlobStar)
        this._processGlobStar(prefix, read, abs, remain, index, inGlobStar);
      else
        this._processReaddir(prefix, read, abs, remain, index, inGlobStar);
    };
    GlobSync.prototype._processReaddir = function(prefix, read, abs, remain, index, inGlobStar) {
      var entries = this._readdir(abs, inGlobStar);
      if (!entries)
        return;
      var pn = remain[0];
      var negate = !!this.minimatch.negate;
      var rawGlob = pn._glob;
      var dotOk = this.dot || rawGlob.charAt(0) === ".";
      var matchedEntries = [];
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        if (e.charAt(0) !== "." || dotOk) {
          var m;
          if (negate && !prefix) {
            m = !e.match(pn);
          } else {
            m = e.match(pn);
          }
          if (m)
            matchedEntries.push(e);
        }
      }
      var len = matchedEntries.length;
      if (len === 0)
        return;
      if (remain.length === 1 && !this.mark && !this.stat) {
        if (!this.matches[index])
          this.matches[index] = /* @__PURE__ */ Object.create(null);
        for (var i = 0; i < len; i++) {
          var e = matchedEntries[i];
          if (prefix) {
            if (prefix.slice(-1) !== "/")
              e = prefix + "/" + e;
            else
              e = prefix + e;
          }
          if (e.charAt(0) === "/" && !this.nomount) {
            e = path2.join(this.root, e);
          }
          this._emitMatch(index, e);
        }
        return;
      }
      remain.shift();
      for (var i = 0; i < len; i++) {
        var e = matchedEntries[i];
        var newPattern;
        if (prefix)
          newPattern = [prefix, e];
        else
          newPattern = [e];
        this._process(newPattern.concat(remain), index, inGlobStar);
      }
    };
    GlobSync.prototype._emitMatch = function(index, e) {
      if (isIgnored(this, e))
        return;
      var abs = this._makeAbs(e);
      if (this.mark)
        e = this._mark(e);
      if (this.absolute) {
        e = abs;
      }
      if (this.matches[index][e])
        return;
      if (this.nodir) {
        var c = this.cache[abs];
        if (c === "DIR" || Array.isArray(c))
          return;
      }
      this.matches[index][e] = true;
      if (this.stat)
        this._stat(e);
    };
    GlobSync.prototype._readdirInGlobStar = function(abs) {
      if (this.follow)
        return this._readdir(abs, false);
      var entries;
      var lstat;
      var stat;
      try {
        lstat = this.fs.lstatSync(abs);
      } catch (er) {
        if (er.code === "ENOENT") {
          return null;
        }
      }
      var isSym = lstat && lstat.isSymbolicLink();
      this.symlinks[abs] = isSym;
      if (!isSym && lstat && !lstat.isDirectory())
        this.cache[abs] = "FILE";
      else
        entries = this._readdir(abs, false);
      return entries;
    };
    GlobSync.prototype._readdir = function(abs, inGlobStar) {
      var entries;
      if (inGlobStar && !ownProp(this.symlinks, abs))
        return this._readdirInGlobStar(abs);
      if (ownProp(this.cache, abs)) {
        var c = this.cache[abs];
        if (!c || c === "FILE")
          return null;
        if (Array.isArray(c))
          return c;
      }
      try {
        return this._readdirEntries(abs, this.fs.readdirSync(abs));
      } catch (er) {
        this._readdirError(abs, er);
        return null;
      }
    };
    GlobSync.prototype._readdirEntries = function(abs, entries) {
      if (!this.mark && !this.stat) {
        for (var i = 0; i < entries.length; i++) {
          var e = entries[i];
          if (abs === "/")
            e = abs + e;
          else
            e = abs + "/" + e;
          this.cache[e] = true;
        }
      }
      this.cache[abs] = entries;
      return entries;
    };
    GlobSync.prototype._readdirError = function(f, er) {
      switch (er.code) {
        case "ENOTSUP":
        // https://github.com/isaacs/node-glob/issues/205
        case "ENOTDIR":
          var abs = this._makeAbs(f);
          this.cache[abs] = "FILE";
          if (abs === this.cwdAbs) {
            var error = new Error(er.code + " invalid cwd " + this.cwd);
            error.path = this.cwd;
            error.code = er.code;
            throw error;
          }
          break;
        case "ENOENT":
        // not terribly unusual
        case "ELOOP":
        case "ENAMETOOLONG":
        case "UNKNOWN":
          this.cache[this._makeAbs(f)] = false;
          break;
        default:
          this.cache[this._makeAbs(f)] = false;
          if (this.strict)
            throw er;
          if (!this.silent)
            console.error("glob error", er);
          break;
      }
    };
    GlobSync.prototype._processGlobStar = function(prefix, read, abs, remain, index, inGlobStar) {
      var entries = this._readdir(abs, inGlobStar);
      if (!entries)
        return;
      var remainWithoutGlobStar = remain.slice(1);
      var gspref = prefix ? [prefix] : [];
      var noGlobStar = gspref.concat(remainWithoutGlobStar);
      this._process(noGlobStar, index, false);
      var len = entries.length;
      var isSym = this.symlinks[abs];
      if (isSym && inGlobStar)
        return;
      for (var i = 0; i < len; i++) {
        var e = entries[i];
        if (e.charAt(0) === "." && !this.dot)
          continue;
        var instead = gspref.concat(entries[i], remainWithoutGlobStar);
        this._process(instead, index, true);
        var below = gspref.concat(entries[i], remain);
        this._process(below, index, true);
      }
    };
    GlobSync.prototype._processSimple = function(prefix, index) {
      var exists = this._stat(prefix);
      if (!this.matches[index])
        this.matches[index] = /* @__PURE__ */ Object.create(null);
      if (!exists)
        return;
      if (prefix && isAbsolute(prefix) && !this.nomount) {
        var trail = /[\/\\]$/.test(prefix);
        if (prefix.charAt(0) === "/") {
          prefix = path2.join(this.root, prefix);
        } else {
          prefix = path2.resolve(this.root, prefix);
          if (trail)
            prefix += "/";
        }
      }
      if (process.platform === "win32")
        prefix = prefix.replace(/\\/g, "/");
      this._emitMatch(index, prefix);
    };
    GlobSync.prototype._stat = function(f) {
      var abs = this._makeAbs(f);
      var needDir = f.slice(-1) === "/";
      if (f.length > this.maxLength)
        return false;
      if (!this.stat && ownProp(this.cache, abs)) {
        var c = this.cache[abs];
        if (Array.isArray(c))
          c = "DIR";
        if (!needDir || c === "DIR")
          return c;
        if (needDir && c === "FILE")
          return false;
      }
      var exists;
      var stat = this.statCache[abs];
      if (!stat) {
        var lstat;
        try {
          lstat = this.fs.lstatSync(abs);
        } catch (er) {
          if (er && (er.code === "ENOENT" || er.code === "ENOTDIR")) {
            this.statCache[abs] = false;
            return false;
          }
        }
        if (lstat && lstat.isSymbolicLink()) {
          try {
            stat = this.fs.statSync(abs);
          } catch (er) {
            stat = lstat;
          }
        } else {
          stat = lstat;
        }
      }
      this.statCache[abs] = stat;
      var c = true;
      if (stat)
        c = stat.isDirectory() ? "DIR" : "FILE";
      this.cache[abs] = this.cache[abs] || c;
      if (needDir && c === "FILE")
        return false;
      return c;
    };
    GlobSync.prototype._mark = function(p) {
      return common.mark(this, p);
    };
    GlobSync.prototype._makeAbs = function(f) {
      return common.makeAbs(this, f);
    };
  }
});

// ../../node_modules/wrappy/wrappy.js
var require_wrappy = __commonJS({
  "../../node_modules/wrappy/wrappy.js"(exports, module) {
    module.exports = wrappy;
    function wrappy(fn, cb) {
      if (fn && cb) return wrappy(fn)(cb);
      if (typeof fn !== "function")
        throw new TypeError("need wrapper function");
      Object.keys(fn).forEach(function(k) {
        wrapper[k] = fn[k];
      });
      return wrapper;
      function wrapper() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        var ret = fn.apply(this, args);
        var cb2 = args[args.length - 1];
        if (typeof ret === "function" && ret !== cb2) {
          Object.keys(cb2).forEach(function(k) {
            ret[k] = cb2[k];
          });
        }
        return ret;
      }
    }
  }
});

// ../../node_modules/once/once.js
var require_once = __commonJS({
  "../../node_modules/once/once.js"(exports, module) {
    var wrappy = require_wrappy();
    module.exports = wrappy(once);
    module.exports.strict = wrappy(onceStrict);
    once.proto = once(function() {
      Object.defineProperty(Function.prototype, "once", {
        value: function() {
          return once(this);
        },
        configurable: true
      });
      Object.defineProperty(Function.prototype, "onceStrict", {
        value: function() {
          return onceStrict(this);
        },
        configurable: true
      });
    });
    function once(fn) {
      var f = function() {
        if (f.called) return f.value;
        f.called = true;
        return f.value = fn.apply(this, arguments);
      };
      f.called = false;
      return f;
    }
    function onceStrict(fn) {
      var f = function() {
        if (f.called)
          throw new Error(f.onceError);
        f.called = true;
        return f.value = fn.apply(this, arguments);
      };
      var name = fn.name || "Function wrapped with `once`";
      f.onceError = name + " shouldn't be called more than once";
      f.called = false;
      return f;
    }
  }
});

// ../../node_modules/inflight/inflight.js
var require_inflight = __commonJS({
  "../../node_modules/inflight/inflight.js"(exports, module) {
    var wrappy = require_wrappy();
    var reqs = /* @__PURE__ */ Object.create(null);
    var once = require_once();
    module.exports = wrappy(inflight);
    function inflight(key, cb) {
      if (reqs[key]) {
        reqs[key].push(cb);
        return null;
      } else {
        reqs[key] = [cb];
        return makeres(key);
      }
    }
    function makeres(key) {
      return once(function RES() {
        var cbs = reqs[key];
        var len = cbs.length;
        var args = slice(arguments);
        try {
          for (var i = 0; i < len; i++) {
            cbs[i].apply(null, args);
          }
        } finally {
          if (cbs.length > len) {
            cbs.splice(0, len);
            process.nextTick(function() {
              RES.apply(null, args);
            });
          } else {
            delete reqs[key];
          }
        }
      });
    }
    function slice(args) {
      var length = args.length;
      var array = [];
      for (var i = 0; i < length; i++) array[i] = args[i];
      return array;
    }
  }
});

// ../../node_modules/glob/glob.js
var require_glob = __commonJS({
  "../../node_modules/glob/glob.js"(exports, module) {
    module.exports = glob;
    var rp = require_fs();
    var minimatch = require_minimatch();
    var Minimatch = minimatch.Minimatch;
    var inherits = require_inherits();
    var EE = __require("events").EventEmitter;
    var path2 = __require("path");
    var assert = __require("assert");
    var isAbsolute = require_path_is_absolute();
    var globSync = require_sync();
    var common = require_common();
    var setopts = common.setopts;
    var ownProp = common.ownProp;
    var inflight = require_inflight();
    var util = __require("util");
    var childrenIgnored = common.childrenIgnored;
    var isIgnored = common.isIgnored;
    var once = require_once();
    function glob(pattern, options, cb) {
      if (typeof options === "function") cb = options, options = {};
      if (!options) options = {};
      if (options.sync) {
        if (cb)
          throw new TypeError("callback provided to sync glob");
        return globSync(pattern, options);
      }
      return new Glob(pattern, options, cb);
    }
    glob.sync = globSync;
    var GlobSync = glob.GlobSync = globSync.GlobSync;
    glob.glob = glob;
    function extend(origin, add) {
      if (add === null || typeof add !== "object") {
        return origin;
      }
      var keys = Object.keys(add);
      var i = keys.length;
      while (i--) {
        origin[keys[i]] = add[keys[i]];
      }
      return origin;
    }
    glob.hasMagic = function(pattern, options_) {
      var options = extend({}, options_);
      options.noprocess = true;
      var g = new Glob(pattern, options);
      var set = g.minimatch.set;
      if (!pattern)
        return false;
      if (set.length > 1)
        return true;
      for (var j = 0; j < set[0].length; j++) {
        if (typeof set[0][j] !== "string")
          return true;
      }
      return false;
    };
    glob.Glob = Glob;
    inherits(Glob, EE);
    function Glob(pattern, options, cb) {
      if (typeof options === "function") {
        cb = options;
        options = null;
      }
      if (options && options.sync) {
        if (cb)
          throw new TypeError("callback provided to sync glob");
        return new GlobSync(pattern, options);
      }
      if (!(this instanceof Glob))
        return new Glob(pattern, options, cb);
      setopts(this, pattern, options);
      this._didRealPath = false;
      var n = this.minimatch.set.length;
      this.matches = new Array(n);
      if (typeof cb === "function") {
        cb = once(cb);
        this.on("error", cb);
        this.on("end", function(matches) {
          cb(null, matches);
        });
      }
      var self = this;
      this._processing = 0;
      this._emitQueue = [];
      this._processQueue = [];
      this.paused = false;
      if (this.noprocess)
        return this;
      if (n === 0)
        return done();
      var sync = true;
      for (var i = 0; i < n; i++) {
        this._process(this.minimatch.set[i], i, false, done);
      }
      sync = false;
      function done() {
        --self._processing;
        if (self._processing <= 0) {
          if (sync) {
            process.nextTick(function() {
              self._finish();
            });
          } else {
            self._finish();
          }
        }
      }
    }
    Glob.prototype._finish = function() {
      assert(this instanceof Glob);
      if (this.aborted)
        return;
      if (this.realpath && !this._didRealpath)
        return this._realpath();
      common.finish(this);
      this.emit("end", this.found);
    };
    Glob.prototype._realpath = function() {
      if (this._didRealpath)
        return;
      this._didRealpath = true;
      var n = this.matches.length;
      if (n === 0)
        return this._finish();
      var self = this;
      for (var i = 0; i < this.matches.length; i++)
        this._realpathSet(i, next);
      function next() {
        if (--n === 0)
          self._finish();
      }
    };
    Glob.prototype._realpathSet = function(index, cb) {
      var matchset = this.matches[index];
      if (!matchset)
        return cb();
      var found = Object.keys(matchset);
      var self = this;
      var n = found.length;
      if (n === 0)
        return cb();
      var set = this.matches[index] = /* @__PURE__ */ Object.create(null);
      found.forEach(function(p, i) {
        p = self._makeAbs(p);
        rp.realpath(p, self.realpathCache, function(er, real) {
          if (!er)
            set[real] = true;
          else if (er.syscall === "stat")
            set[p] = true;
          else
            self.emit("error", er);
          if (--n === 0) {
            self.matches[index] = set;
            cb();
          }
        });
      });
    };
    Glob.prototype._mark = function(p) {
      return common.mark(this, p);
    };
    Glob.prototype._makeAbs = function(f) {
      return common.makeAbs(this, f);
    };
    Glob.prototype.abort = function() {
      this.aborted = true;
      this.emit("abort");
    };
    Glob.prototype.pause = function() {
      if (!this.paused) {
        this.paused = true;
        this.emit("pause");
      }
    };
    Glob.prototype.resume = function() {
      if (this.paused) {
        this.emit("resume");
        this.paused = false;
        if (this._emitQueue.length) {
          var eq = this._emitQueue.slice(0);
          this._emitQueue.length = 0;
          for (var i = 0; i < eq.length; i++) {
            var e = eq[i];
            this._emitMatch(e[0], e[1]);
          }
        }
        if (this._processQueue.length) {
          var pq = this._processQueue.slice(0);
          this._processQueue.length = 0;
          for (var i = 0; i < pq.length; i++) {
            var p = pq[i];
            this._processing--;
            this._process(p[0], p[1], p[2], p[3]);
          }
        }
      }
    };
    Glob.prototype._process = function(pattern, index, inGlobStar, cb) {
      assert(this instanceof Glob);
      assert(typeof cb === "function");
      if (this.aborted)
        return;
      this._processing++;
      if (this.paused) {
        this._processQueue.push([pattern, index, inGlobStar, cb]);
        return;
      }
      var n = 0;
      while (typeof pattern[n] === "string") {
        n++;
      }
      var prefix;
      switch (n) {
        // if not, then this is rather simple
        case pattern.length:
          this._processSimple(pattern.join("/"), index, cb);
          return;
        case 0:
          prefix = null;
          break;
        default:
          prefix = pattern.slice(0, n).join("/");
          break;
      }
      var remain = pattern.slice(n);
      var read;
      if (prefix === null)
        read = ".";
      else if (isAbsolute(prefix) || isAbsolute(pattern.map(function(p) {
        return typeof p === "string" ? p : "[*]";
      }).join("/"))) {
        if (!prefix || !isAbsolute(prefix))
          prefix = "/" + prefix;
        read = prefix;
      } else
        read = prefix;
      var abs = this._makeAbs(read);
      if (childrenIgnored(this, read))
        return cb();
      var isGlobStar = remain[0] === minimatch.GLOBSTAR;
      if (isGlobStar)
        this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb);
      else
        this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb);
    };
    Glob.prototype._processReaddir = function(prefix, read, abs, remain, index, inGlobStar, cb) {
      var self = this;
      this._readdir(abs, inGlobStar, function(er, entries) {
        return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
      });
    };
    Glob.prototype._processReaddir2 = function(prefix, read, abs, remain, index, inGlobStar, entries, cb) {
      if (!entries)
        return cb();
      var pn = remain[0];
      var negate = !!this.minimatch.negate;
      var rawGlob = pn._glob;
      var dotOk = this.dot || rawGlob.charAt(0) === ".";
      var matchedEntries = [];
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        if (e.charAt(0) !== "." || dotOk) {
          var m;
          if (negate && !prefix) {
            m = !e.match(pn);
          } else {
            m = e.match(pn);
          }
          if (m)
            matchedEntries.push(e);
        }
      }
      var len = matchedEntries.length;
      if (len === 0)
        return cb();
      if (remain.length === 1 && !this.mark && !this.stat) {
        if (!this.matches[index])
          this.matches[index] = /* @__PURE__ */ Object.create(null);
        for (var i = 0; i < len; i++) {
          var e = matchedEntries[i];
          if (prefix) {
            if (prefix !== "/")
              e = prefix + "/" + e;
            else
              e = prefix + e;
          }
          if (e.charAt(0) === "/" && !this.nomount) {
            e = path2.join(this.root, e);
          }
          this._emitMatch(index, e);
        }
        return cb();
      }
      remain.shift();
      for (var i = 0; i < len; i++) {
        var e = matchedEntries[i];
        var newPattern;
        if (prefix) {
          if (prefix !== "/")
            e = prefix + "/" + e;
          else
            e = prefix + e;
        }
        this._process([e].concat(remain), index, inGlobStar, cb);
      }
      cb();
    };
    Glob.prototype._emitMatch = function(index, e) {
      if (this.aborted)
        return;
      if (isIgnored(this, e))
        return;
      if (this.paused) {
        this._emitQueue.push([index, e]);
        return;
      }
      var abs = isAbsolute(e) ? e : this._makeAbs(e);
      if (this.mark)
        e = this._mark(e);
      if (this.absolute)
        e = abs;
      if (this.matches[index][e])
        return;
      if (this.nodir) {
        var c = this.cache[abs];
        if (c === "DIR" || Array.isArray(c))
          return;
      }
      this.matches[index][e] = true;
      var st = this.statCache[abs];
      if (st)
        this.emit("stat", e, st);
      this.emit("match", e);
    };
    Glob.prototype._readdirInGlobStar = function(abs, cb) {
      if (this.aborted)
        return;
      if (this.follow)
        return this._readdir(abs, false, cb);
      var lstatkey = "lstat\0" + abs;
      var self = this;
      var lstatcb = inflight(lstatkey, lstatcb_);
      if (lstatcb)
        self.fs.lstat(abs, lstatcb);
      function lstatcb_(er, lstat) {
        if (er && er.code === "ENOENT")
          return cb();
        var isSym = lstat && lstat.isSymbolicLink();
        self.symlinks[abs] = isSym;
        if (!isSym && lstat && !lstat.isDirectory()) {
          self.cache[abs] = "FILE";
          cb();
        } else
          self._readdir(abs, false, cb);
      }
    };
    Glob.prototype._readdir = function(abs, inGlobStar, cb) {
      if (this.aborted)
        return;
      cb = inflight("readdir\0" + abs + "\0" + inGlobStar, cb);
      if (!cb)
        return;
      if (inGlobStar && !ownProp(this.symlinks, abs))
        return this._readdirInGlobStar(abs, cb);
      if (ownProp(this.cache, abs)) {
        var c = this.cache[abs];
        if (!c || c === "FILE")
          return cb();
        if (Array.isArray(c))
          return cb(null, c);
      }
      var self = this;
      self.fs.readdir(abs, readdirCb(this, abs, cb));
    };
    function readdirCb(self, abs, cb) {
      return function(er, entries) {
        if (er)
          self._readdirError(abs, er, cb);
        else
          self._readdirEntries(abs, entries, cb);
      };
    }
    Glob.prototype._readdirEntries = function(abs, entries, cb) {
      if (this.aborted)
        return;
      if (!this.mark && !this.stat) {
        for (var i = 0; i < entries.length; i++) {
          var e = entries[i];
          if (abs === "/")
            e = abs + e;
          else
            e = abs + "/" + e;
          this.cache[e] = true;
        }
      }
      this.cache[abs] = entries;
      return cb(null, entries);
    };
    Glob.prototype._readdirError = function(f, er, cb) {
      if (this.aborted)
        return;
      switch (er.code) {
        case "ENOTSUP":
        // https://github.com/isaacs/node-glob/issues/205
        case "ENOTDIR":
          var abs = this._makeAbs(f);
          this.cache[abs] = "FILE";
          if (abs === this.cwdAbs) {
            var error = new Error(er.code + " invalid cwd " + this.cwd);
            error.path = this.cwd;
            error.code = er.code;
            this.emit("error", error);
            this.abort();
          }
          break;
        case "ENOENT":
        // not terribly unusual
        case "ELOOP":
        case "ENAMETOOLONG":
        case "UNKNOWN":
          this.cache[this._makeAbs(f)] = false;
          break;
        default:
          this.cache[this._makeAbs(f)] = false;
          if (this.strict) {
            this.emit("error", er);
            this.abort();
          }
          if (!this.silent)
            console.error("glob error", er);
          break;
      }
      return cb();
    };
    Glob.prototype._processGlobStar = function(prefix, read, abs, remain, index, inGlobStar, cb) {
      var self = this;
      this._readdir(abs, inGlobStar, function(er, entries) {
        self._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
      });
    };
    Glob.prototype._processGlobStar2 = function(prefix, read, abs, remain, index, inGlobStar, entries, cb) {
      if (!entries)
        return cb();
      var remainWithoutGlobStar = remain.slice(1);
      var gspref = prefix ? [prefix] : [];
      var noGlobStar = gspref.concat(remainWithoutGlobStar);
      this._process(noGlobStar, index, false, cb);
      var isSym = this.symlinks[abs];
      var len = entries.length;
      if (isSym && inGlobStar)
        return cb();
      for (var i = 0; i < len; i++) {
        var e = entries[i];
        if (e.charAt(0) === "." && !this.dot)
          continue;
        var instead = gspref.concat(entries[i], remainWithoutGlobStar);
        this._process(instead, index, true, cb);
        var below = gspref.concat(entries[i], remain);
        this._process(below, index, true, cb);
      }
      cb();
    };
    Glob.prototype._processSimple = function(prefix, index, cb) {
      var self = this;
      this._stat(prefix, function(er, exists) {
        self._processSimple2(prefix, index, er, exists, cb);
      });
    };
    Glob.prototype._processSimple2 = function(prefix, index, er, exists, cb) {
      if (!this.matches[index])
        this.matches[index] = /* @__PURE__ */ Object.create(null);
      if (!exists)
        return cb();
      if (prefix && isAbsolute(prefix) && !this.nomount) {
        var trail = /[\/\\]$/.test(prefix);
        if (prefix.charAt(0) === "/") {
          prefix = path2.join(this.root, prefix);
        } else {
          prefix = path2.resolve(this.root, prefix);
          if (trail)
            prefix += "/";
        }
      }
      if (process.platform === "win32")
        prefix = prefix.replace(/\\/g, "/");
      this._emitMatch(index, prefix);
      cb();
    };
    Glob.prototype._stat = function(f, cb) {
      var abs = this._makeAbs(f);
      var needDir = f.slice(-1) === "/";
      if (f.length > this.maxLength)
        return cb();
      if (!this.stat && ownProp(this.cache, abs)) {
        var c = this.cache[abs];
        if (Array.isArray(c))
          c = "DIR";
        if (!needDir || c === "DIR")
          return cb(null, c);
        if (needDir && c === "FILE")
          return cb();
      }
      var exists;
      var stat = this.statCache[abs];
      if (stat !== void 0) {
        if (stat === false)
          return cb(null, stat);
        else {
          var type = stat.isDirectory() ? "DIR" : "FILE";
          if (needDir && type === "FILE")
            return cb();
          else
            return cb(null, type, stat);
        }
      }
      var self = this;
      var statcb = inflight("stat\0" + abs, lstatcb_);
      if (statcb)
        self.fs.lstat(abs, statcb);
      function lstatcb_(er, lstat) {
        if (lstat && lstat.isSymbolicLink()) {
          return self.fs.stat(abs, function(er2, stat2) {
            if (er2)
              self._stat2(f, abs, null, lstat, cb);
            else
              self._stat2(f, abs, er2, stat2, cb);
          });
        } else {
          self._stat2(f, abs, er, lstat, cb);
        }
      }
    };
    Glob.prototype._stat2 = function(f, abs, er, stat, cb) {
      if (er && (er.code === "ENOENT" || er.code === "ENOTDIR")) {
        this.statCache[abs] = false;
        return cb();
      }
      var needDir = f.slice(-1) === "/";
      this.statCache[abs] = stat;
      if (abs.slice(-1) === "/" && stat && !stat.isDirectory())
        return cb(null, false, stat);
      var c = true;
      if (stat)
        c = stat.isDirectory() ? "DIR" : "FILE";
      this.cache[abs] = this.cache[abs] || c;
      if (needDir && c === "FILE")
        return cb();
      return cb(null, c, stat);
    };
  }
});

// ../../node_modules/shelljs/src/common.js
var require_common2 = __commonJS({
  "../../node_modules/shelljs/src/common.js"(exports) {
    "use strict";
    var os2 = __require("os");
    var fs2 = __require("fs");
    var glob = require_glob();
    var shell = require_shell();
    var shellMethods = Object.create(shell);
    exports.extend = Object.assign;
    var isElectron = Boolean(process.versions.electron);
    var DEFAULT_CONFIG = {
      fatal: false,
      globOptions: {},
      maxdepth: 255,
      noglob: false,
      silent: false,
      verbose: false,
      execPath: null,
      bufLength: 64 * 1024
      // 64KB
    };
    var config = {
      reset: function() {
        Object.assign(this, DEFAULT_CONFIG);
        if (!isElectron) {
          this.execPath = process.execPath;
        }
      },
      resetForTesting: function() {
        this.reset();
        this.silent = true;
      }
    };
    config.reset();
    exports.config = config;
    var state = {
      error: null,
      errorCode: 0,
      currentCmd: "shell.js"
    };
    exports.state = state;
    delete process.env.OLDPWD;
    function isObject(a) {
      return typeof a === "object" && a !== null;
    }
    exports.isObject = isObject;
    function log() {
      if (!config.silent) {
        console.error.apply(console, arguments);
      }
    }
    exports.log = log;
    function convertErrorOutput(msg) {
      if (typeof msg !== "string") {
        throw new TypeError("input must be a string");
      }
      return msg.replace(/\\/g, "/");
    }
    exports.convertErrorOutput = convertErrorOutput;
    function error(msg, _code, options) {
      if (typeof msg !== "string") throw new Error("msg must be a string");
      var DEFAULT_OPTIONS2 = {
        continue: false,
        code: 1,
        prefix: state.currentCmd + ": ",
        silent: false
      };
      if (typeof _code === "number" && isObject(options)) {
        options.code = _code;
      } else if (isObject(_code)) {
        options = _code;
      } else if (typeof _code === "number") {
        options = { code: _code };
      } else if (typeof _code !== "number") {
        options = {};
      }
      options = Object.assign({}, DEFAULT_OPTIONS2, options);
      if (!state.errorCode) state.errorCode = options.code;
      var logEntry = convertErrorOutput(options.prefix + msg);
      state.error = state.error ? state.error + "\n" : "";
      state.error += logEntry;
      if (config.fatal) throw new Error(logEntry);
      if (msg.length > 0 && !options.silent) log(logEntry);
      if (!options.continue) {
        throw {
          msg: "earlyExit",
          retValue: new ShellString("", state.error, state.errorCode)
        };
      }
    }
    exports.error = error;
    function ShellString(stdout, stderr, code) {
      var that;
      if (stdout instanceof Array) {
        that = stdout;
        that.stdout = stdout.join("\n");
        if (stdout.length > 0) that.stdout += "\n";
      } else {
        that = new String(stdout);
        that.stdout = stdout;
      }
      that.stderr = stderr;
      that.code = code;
      pipeMethods.forEach(function(cmd) {
        that[cmd] = shellMethods[cmd].bind(that);
      });
      return that;
    }
    exports.ShellString = ShellString;
    function parseOptions(opt, map, errorOptions) {
      if (typeof opt !== "string" && !isObject(opt)) {
        throw new Error("options must be strings or key-value pairs");
      } else if (!isObject(map)) {
        throw new Error("parseOptions() internal error: map must be an object");
      } else if (errorOptions && !isObject(errorOptions)) {
        throw new Error("parseOptions() internal error: errorOptions must be object");
      }
      if (opt === "--") {
        return {};
      }
      var options = {};
      Object.keys(map).forEach(function(letter) {
        var optName = map[letter];
        if (optName[0] !== "!") {
          options[optName] = false;
        }
      });
      if (opt === "") return options;
      if (typeof opt === "string") {
        if (opt[0] !== "-") {
          throw new Error("Options string must start with a '-'");
        }
        var chars = opt.slice(1).split("");
        chars.forEach(function(c) {
          if (c in map) {
            var optionName = map[c];
            if (optionName[0] === "!") {
              options[optionName.slice(1)] = false;
            } else {
              options[optionName] = true;
            }
          } else {
            error("option not recognized: " + c, errorOptions || {});
          }
        });
      } else {
        Object.keys(opt).forEach(function(key) {
          var c = key[1];
          if (c in map) {
            var optionName = map[c];
            options[optionName] = opt[key];
          } else {
            error("option not recognized: " + c, errorOptions || {});
          }
        });
      }
      return options;
    }
    exports.parseOptions = parseOptions;
    function expand(list) {
      if (!Array.isArray(list)) {
        throw new TypeError("must be an array");
      }
      var expanded = [];
      list.forEach(function(listEl) {
        if (typeof listEl !== "string") {
          expanded.push(listEl);
        } else {
          var ret;
          try {
            ret = glob.sync(listEl, config.globOptions);
            ret = ret.length > 0 ? ret : [listEl];
          } catch (e) {
            ret = [listEl];
          }
          expanded = expanded.concat(ret);
        }
      });
      return expanded;
    }
    exports.expand = expand;
    var buffer = typeof Buffer.alloc === "function" ? function(len) {
      return Buffer.alloc(len || config.bufLength);
    } : function(len) {
      return new Buffer(len || config.bufLength);
    };
    exports.buffer = buffer;
    function unlinkSync(file) {
      try {
        fs2.unlinkSync(file);
      } catch (e) {
        if (e.code === "EPERM") {
          fs2.chmodSync(file, "0666");
          fs2.unlinkSync(file);
        } else {
          throw e;
        }
      }
    }
    exports.unlinkSync = unlinkSync;
    function statFollowLinks() {
      return fs2.statSync.apply(fs2, arguments);
    }
    exports.statFollowLinks = statFollowLinks;
    function statNoFollowLinks() {
      return fs2.lstatSync.apply(fs2, arguments);
    }
    exports.statNoFollowLinks = statNoFollowLinks;
    function randomFileName() {
      function randomHash(count) {
        if (count === 1) {
          return parseInt(16 * Math.random(), 10).toString(16);
        }
        var hash = "";
        for (var i = 0; i < count; i++) {
          hash += randomHash(1);
        }
        return hash;
      }
      return "shelljs_" + randomHash(20);
    }
    exports.randomFileName = randomFileName;
    function wrap(cmd, fn, options) {
      options = options || {};
      return function() {
        var retValue = null;
        state.currentCmd = cmd;
        state.error = null;
        state.errorCode = 0;
        try {
          var args = [].slice.call(arguments, 0);
          if (config.verbose) {
            console.error.apply(console, [cmd].concat(args));
          }
          state.pipedValue = this && typeof this.stdout === "string" ? this.stdout : "";
          if (options.unix === false) {
            retValue = fn.apply(this, args);
          } else {
            if (isObject(args[0]) && args[0].constructor.name === "Object") {
            } else if (args.length === 0 || typeof args[0] !== "string" || args[0].length <= 1 || args[0][0] !== "-") {
              args.unshift("");
            }
            args = args.reduce(function(accum, cur) {
              if (Array.isArray(cur)) {
                return accum.concat(cur);
              }
              accum.push(cur);
              return accum;
            }, []);
            args = args.map(function(arg) {
              if (isObject(arg) && arg.constructor.name === "String") {
                return arg.toString();
              }
              return arg;
            });
            var homeDir = os2.homedir();
            args = args.map(function(arg) {
              if (typeof arg === "string" && arg.slice(0, 2) === "~/" || arg === "~") {
                return arg.replace(/^~/, homeDir);
              }
              return arg;
            });
            if (!config.noglob && options.allowGlobbing === true) {
              args = args.slice(0, options.globStart).concat(expand(args.slice(options.globStart)));
            }
            try {
              if (isObject(options.cmdOptions)) {
                args[0] = parseOptions(args[0], options.cmdOptions);
              }
              retValue = fn.apply(this, args);
            } catch (e) {
              if (e.msg === "earlyExit") {
                retValue = e.retValue;
              } else {
                throw e;
              }
            }
          }
        } catch (e) {
          if (!state.error) {
            e.name = "ShellJSInternalError";
            throw e;
          }
          if (config.fatal) throw e;
        }
        if (options.wrapOutput && (typeof retValue === "string" || Array.isArray(retValue))) {
          retValue = new ShellString(retValue, state.error, state.errorCode);
        }
        state.currentCmd = "shell.js";
        return retValue;
      };
    }
    exports.wrap = wrap;
    function _readFromPipe() {
      return state.pipedValue;
    }
    exports.readFromPipe = _readFromPipe;
    var DEFAULT_WRAP_OPTIONS = {
      allowGlobbing: true,
      canReceivePipe: false,
      cmdOptions: null,
      globStart: 1,
      pipeOnly: false,
      wrapOutput: true,
      unix: true
    };
    var pipeMethods = [];
    function _register(name, implementation, wrapOptions) {
      wrapOptions = wrapOptions || {};
      Object.keys(wrapOptions).forEach(function(option) {
        if (!DEFAULT_WRAP_OPTIONS.hasOwnProperty(option)) {
          throw new Error("Unknown option '" + option + "'");
        }
        if (typeof wrapOptions[option] !== typeof DEFAULT_WRAP_OPTIONS[option]) {
          throw new TypeError("Unsupported type '" + typeof wrapOptions[option] + "' for option '" + option + "'");
        }
      });
      wrapOptions = Object.assign({}, DEFAULT_WRAP_OPTIONS, wrapOptions);
      if (shell.hasOwnProperty(name)) {
        throw new Error("Command `" + name + "` already exists");
      }
      if (wrapOptions.pipeOnly) {
        wrapOptions.canReceivePipe = true;
        shellMethods[name] = wrap(name, implementation, wrapOptions);
      } else {
        shell[name] = wrap(name, implementation, wrapOptions);
      }
      if (wrapOptions.canReceivePipe) {
        pipeMethods.push(name);
      }
    }
    exports.register = _register;
  }
});

// ../../node_modules/shelljs/src/cat.js
var require_cat = __commonJS({
  "../../node_modules/shelljs/src/cat.js"(exports, module) {
    var common = require_common2();
    var fs2 = __require("fs");
    common.register("cat", _cat, {
      canReceivePipe: true,
      cmdOptions: {
        "n": "number"
      }
    });
    function _cat(options, files) {
      var cat = common.readFromPipe();
      if (!files && !cat) common.error("no paths given");
      files = [].slice.call(arguments, 1);
      files.forEach(function(file) {
        if (!fs2.existsSync(file)) {
          common.error("no such file or directory: " + file);
        } else if (common.statFollowLinks(file).isDirectory()) {
          common.error(file + ": Is a directory");
        }
        cat += fs2.readFileSync(file, "utf8");
      });
      if (options.number) {
        cat = addNumbers(cat);
      }
      return cat;
    }
    module.exports = _cat;
    function addNumbers(cat) {
      var lines = cat.split("\n");
      var lastLine = lines.pop();
      lines = lines.map(function(line, i) {
        return numberedLine(i + 1, line);
      });
      if (lastLine.length) {
        lastLine = numberedLine(lines.length + 1, lastLine);
      }
      lines.push(lastLine);
      return lines.join("\n");
    }
    function numberedLine(n, line) {
      var number = ("     " + n).slice(-6) + "	";
      return number + line;
    }
  }
});

// ../../node_modules/shelljs/src/cd.js
var require_cd = __commonJS({
  "../../node_modules/shelljs/src/cd.js"(exports, module) {
    var os2 = __require("os");
    var common = require_common2();
    common.register("cd", _cd, {});
    function _cd(options, dir) {
      if (!dir) dir = os2.homedir();
      if (dir === "-") {
        if (!process.env.OLDPWD) {
          common.error("could not find previous directory");
        } else {
          dir = process.env.OLDPWD;
        }
      }
      try {
        var curDir = process.cwd();
        process.chdir(dir);
        process.env.OLDPWD = curDir;
      } catch (e) {
        var err;
        try {
          common.statFollowLinks(dir);
          err = "not a directory: " + dir;
        } catch (e2) {
          err = "no such file or directory: " + dir;
        }
        if (err) common.error(err);
      }
      return "";
    }
    module.exports = _cd;
  }
});

// ../../node_modules/shelljs/src/chmod.js
var require_chmod = __commonJS({
  "../../node_modules/shelljs/src/chmod.js"(exports, module) {
    var common = require_common2();
    var fs2 = __require("fs");
    var path2 = __require("path");
    var PERMS = function(base) {
      return {
        OTHER_EXEC: base.EXEC,
        OTHER_WRITE: base.WRITE,
        OTHER_READ: base.READ,
        GROUP_EXEC: base.EXEC << 3,
        GROUP_WRITE: base.WRITE << 3,
        GROUP_READ: base.READ << 3,
        OWNER_EXEC: base.EXEC << 6,
        OWNER_WRITE: base.WRITE << 6,
        OWNER_READ: base.READ << 6,
        // Literal octal numbers are apparently not allowed in "strict" javascript.
        STICKY: parseInt("01000", 8),
        SETGID: parseInt("02000", 8),
        SETUID: parseInt("04000", 8),
        TYPE_MASK: parseInt("0770000", 8)
      };
    }({
      EXEC: 1,
      WRITE: 2,
      READ: 4
    });
    common.register("chmod", _chmod, {});
    function _chmod(options, mode, filePattern) {
      if (!filePattern) {
        if (options.length > 0 && options.charAt(0) === "-") {
          [].unshift.call(arguments, "");
        } else {
          common.error("You must specify a file.");
        }
      }
      options = common.parseOptions(options, {
        "R": "recursive",
        "c": "changes",
        "v": "verbose"
      });
      filePattern = [].slice.call(arguments, 2);
      var files;
      if (options.recursive) {
        files = [];
        filePattern.forEach(function addFile(expandedFile) {
          var stat = common.statNoFollowLinks(expandedFile);
          if (!stat.isSymbolicLink()) {
            files.push(expandedFile);
            if (stat.isDirectory()) {
              fs2.readdirSync(expandedFile).forEach(function(child) {
                addFile(expandedFile + "/" + child);
              });
            }
          }
        });
      } else {
        files = filePattern;
      }
      files.forEach(function innerChmod(file) {
        file = path2.resolve(file);
        if (!fs2.existsSync(file)) {
          common.error("File not found: " + file);
        }
        if (options.recursive && common.statNoFollowLinks(file).isSymbolicLink()) {
          return;
        }
        var stat = common.statFollowLinks(file);
        var isDir = stat.isDirectory();
        var perms = stat.mode;
        var type = perms & PERMS.TYPE_MASK;
        var newPerms = perms;
        if (isNaN(parseInt(mode, 8))) {
          mode.split(",").forEach(function(symbolicMode) {
            var pattern = /([ugoa]*)([=\+-])([rwxXst]*)/i;
            var matches = pattern.exec(symbolicMode);
            if (matches) {
              var applyTo = matches[1];
              var operator = matches[2];
              var change = matches[3];
              var changeOwner = applyTo.indexOf("u") !== -1 || applyTo === "a" || applyTo === "";
              var changeGroup = applyTo.indexOf("g") !== -1 || applyTo === "a" || applyTo === "";
              var changeOther = applyTo.indexOf("o") !== -1 || applyTo === "a" || applyTo === "";
              var changeRead = change.indexOf("r") !== -1;
              var changeWrite = change.indexOf("w") !== -1;
              var changeExec = change.indexOf("x") !== -1;
              var changeExecDir = change.indexOf("X") !== -1;
              var changeSticky = change.indexOf("t") !== -1;
              var changeSetuid = change.indexOf("s") !== -1;
              if (changeExecDir && isDir) {
                changeExec = true;
              }
              var mask = 0;
              if (changeOwner) {
                mask |= (changeRead ? PERMS.OWNER_READ : 0) + (changeWrite ? PERMS.OWNER_WRITE : 0) + (changeExec ? PERMS.OWNER_EXEC : 0) + (changeSetuid ? PERMS.SETUID : 0);
              }
              if (changeGroup) {
                mask |= (changeRead ? PERMS.GROUP_READ : 0) + (changeWrite ? PERMS.GROUP_WRITE : 0) + (changeExec ? PERMS.GROUP_EXEC : 0) + (changeSetuid ? PERMS.SETGID : 0);
              }
              if (changeOther) {
                mask |= (changeRead ? PERMS.OTHER_READ : 0) + (changeWrite ? PERMS.OTHER_WRITE : 0) + (changeExec ? PERMS.OTHER_EXEC : 0);
              }
              if (changeSticky) {
                mask |= PERMS.STICKY;
              }
              switch (operator) {
                case "+":
                  newPerms |= mask;
                  break;
                case "-":
                  newPerms &= ~mask;
                  break;
                case "=":
                  newPerms = type + mask;
                  if (common.statFollowLinks(file).isDirectory()) {
                    newPerms |= PERMS.SETUID + PERMS.SETGID & perms;
                  }
                  break;
                default:
                  common.error("Could not recognize operator: `" + operator + "`");
              }
              if (options.verbose) {
                console.log(file + " -> " + newPerms.toString(8));
              }
              if (perms !== newPerms) {
                if (!options.verbose && options.changes) {
                  console.log(file + " -> " + newPerms.toString(8));
                }
                fs2.chmodSync(file, newPerms);
                perms = newPerms;
              }
            } else {
              common.error("Invalid symbolic mode change: " + symbolicMode);
            }
          });
        } else {
          newPerms = type + parseInt(mode, 8);
          if (common.statFollowLinks(file).isDirectory()) {
            newPerms |= PERMS.SETUID + PERMS.SETGID & perms;
          }
          fs2.chmodSync(file, newPerms);
        }
      });
      return "";
    }
    module.exports = _chmod;
  }
});

// ../../node_modules/shelljs/src/cp.js
var require_cp = __commonJS({
  "../../node_modules/shelljs/src/cp.js"(exports, module) {
    var fs2 = __require("fs");
    var path2 = __require("path");
    var common = require_common2();
    common.register("cp", _cp, {
      cmdOptions: {
        "f": "!no_force",
        "n": "no_force",
        "u": "update",
        "R": "recursive",
        "r": "recursive",
        "L": "followsymlink",
        "P": "noFollowsymlink"
      },
      wrapOutput: false
    });
    function copyFileSync(srcFile, destFile, options) {
      if (!fs2.existsSync(srcFile)) {
        common.error("copyFileSync: no such file or directory: " + srcFile);
      }
      var isWindows = process.platform === "win32";
      try {
        if (options.update && common.statFollowLinks(srcFile).mtime < fs2.statSync(destFile).mtime) {
          return;
        }
      } catch (e) {
      }
      if (common.statNoFollowLinks(srcFile).isSymbolicLink() && !options.followsymlink) {
        try {
          common.statNoFollowLinks(destFile);
          common.unlinkSync(destFile);
        } catch (e) {
        }
        var symlinkFull = fs2.readlinkSync(srcFile);
        fs2.symlinkSync(symlinkFull, destFile, isWindows ? "junction" : null);
      } else {
        var buf = common.buffer();
        var bufLength = buf.length;
        var bytesRead = bufLength;
        var pos = 0;
        var fdr = null;
        var fdw = null;
        try {
          fdr = fs2.openSync(srcFile, "r");
        } catch (e) {
          common.error("copyFileSync: could not read src file (" + srcFile + ")");
        }
        try {
          fdw = fs2.openSync(destFile, "w");
        } catch (e) {
          common.error("copyFileSync: could not write to dest file (code=" + e.code + "):" + destFile);
        }
        while (bytesRead === bufLength) {
          bytesRead = fs2.readSync(fdr, buf, 0, bufLength, pos);
          fs2.writeSync(fdw, buf, 0, bytesRead);
          pos += bytesRead;
        }
        fs2.closeSync(fdr);
        fs2.closeSync(fdw);
        fs2.chmodSync(destFile, common.statFollowLinks(srcFile).mode);
      }
    }
    function cpdirSyncRecursive(sourceDir, destDir, currentDepth, opts) {
      if (!opts) opts = {};
      if (currentDepth >= common.config.maxdepth) return;
      currentDepth++;
      var isWindows = process.platform === "win32";
      try {
        fs2.mkdirSync(destDir);
      } catch (e) {
        if (e.code !== "EEXIST") throw e;
      }
      var files = fs2.readdirSync(sourceDir);
      for (var i = 0; i < files.length; i++) {
        var srcFile = sourceDir + "/" + files[i];
        var destFile = destDir + "/" + files[i];
        var srcFileStat = common.statNoFollowLinks(srcFile);
        var symlinkFull;
        if (opts.followsymlink) {
          if (cpcheckcycle(sourceDir, srcFile)) {
            console.error("Cycle link found.");
            symlinkFull = fs2.readlinkSync(srcFile);
            fs2.symlinkSync(symlinkFull, destFile, isWindows ? "junction" : null);
            continue;
          }
        }
        if (srcFileStat.isDirectory()) {
          cpdirSyncRecursive(srcFile, destFile, currentDepth, opts);
        } else if (srcFileStat.isSymbolicLink() && !opts.followsymlink) {
          symlinkFull = fs2.readlinkSync(srcFile);
          try {
            common.statNoFollowLinks(destFile);
            common.unlinkSync(destFile);
          } catch (e) {
          }
          fs2.symlinkSync(symlinkFull, destFile, isWindows ? "junction" : null);
        } else if (srcFileStat.isSymbolicLink() && opts.followsymlink) {
          srcFileStat = common.statFollowLinks(srcFile);
          if (srcFileStat.isDirectory()) {
            cpdirSyncRecursive(srcFile, destFile, currentDepth, opts);
          } else {
            copyFileSync(srcFile, destFile, opts);
          }
        } else {
          if (fs2.existsSync(destFile) && opts.no_force) {
            common.log("skipping existing file: " + files[i]);
          } else {
            copyFileSync(srcFile, destFile, opts);
          }
        }
      }
      var checkDir = common.statFollowLinks(sourceDir);
      fs2.chmodSync(destDir, checkDir.mode);
    }
    function checkRecentCreated(sources, index) {
      var lookedSource = sources[index];
      return sources.slice(0, index).some(function(src) {
        return path2.basename(src) === path2.basename(lookedSource);
      });
    }
    function cpcheckcycle(sourceDir, srcFile) {
      var srcFileStat = common.statNoFollowLinks(srcFile);
      if (srcFileStat.isSymbolicLink()) {
        var cyclecheck = common.statFollowLinks(srcFile);
        if (cyclecheck.isDirectory()) {
          var sourcerealpath = fs2.realpathSync(sourceDir);
          var symlinkrealpath = fs2.realpathSync(srcFile);
          var re = new RegExp(symlinkrealpath);
          if (re.test(sourcerealpath)) {
            return true;
          }
        }
      }
      return false;
    }
    function _cp(options, sources, dest) {
      if (options.followsymlink) {
        options.noFollowsymlink = false;
      }
      if (!options.recursive && !options.noFollowsymlink) {
        options.followsymlink = true;
      }
      if (arguments.length < 3) {
        common.error("missing <source> and/or <dest>");
      } else {
        sources = [].slice.call(arguments, 1, arguments.length - 1);
        dest = arguments[arguments.length - 1];
      }
      var destExists = fs2.existsSync(dest);
      var destStat = destExists && common.statFollowLinks(dest);
      if ((!destExists || !destStat.isDirectory()) && sources.length > 1) {
        common.error("dest is not a directory (too many sources)");
      }
      if (destExists && destStat.isFile() && options.no_force) {
        return new common.ShellString("", "", 0);
      }
      sources.forEach(function(src, srcIndex) {
        if (!fs2.existsSync(src)) {
          if (src === "") src = "''";
          common.error("no such file or directory: " + src, { continue: true });
          return;
        }
        var srcStat = common.statFollowLinks(src);
        if (!options.noFollowsymlink && srcStat.isDirectory()) {
          if (!options.recursive) {
            common.error("omitting directory '" + src + "'", { continue: true });
          } else {
            var newDest = destStat && destStat.isDirectory() ? path2.join(dest, path2.basename(src)) : dest;
            try {
              common.statFollowLinks(path2.dirname(dest));
              cpdirSyncRecursive(src, newDest, 0, { no_force: options.no_force, followsymlink: options.followsymlink });
            } catch (e) {
              common.error("cannot create directory '" + dest + "': No such file or directory");
            }
          }
        } else {
          var thisDest = dest;
          if (destStat && destStat.isDirectory()) {
            thisDest = path2.normalize(dest + "/" + path2.basename(src));
          }
          var thisDestExists = fs2.existsSync(thisDest);
          if (thisDestExists && checkRecentCreated(sources, srcIndex)) {
            if (!options.no_force) {
              common.error("will not overwrite just-created '" + thisDest + "' with '" + src + "'", { continue: true });
            }
            return;
          }
          if (thisDestExists && options.no_force) {
            return;
          }
          if (path2.relative(src, thisDest) === "") {
            common.error("'" + thisDest + "' and '" + src + "' are the same file", { continue: true });
            return;
          }
          copyFileSync(src, thisDest, options);
        }
      });
      return new common.ShellString("", common.state.error, common.state.errorCode);
    }
    module.exports = _cp;
  }
});

// ../../node_modules/shelljs/src/dirs.js
var require_dirs = __commonJS({
  "../../node_modules/shelljs/src/dirs.js"(exports) {
    var common = require_common2();
    var _cd = require_cd();
    var path2 = __require("path");
    common.register("dirs", _dirs, {
      wrapOutput: false
    });
    common.register("pushd", _pushd, {
      wrapOutput: false
    });
    common.register("popd", _popd, {
      wrapOutput: false
    });
    var _dirStack = [];
    function _isStackIndex(index) {
      return /^[\-+]\d+$/.test(index);
    }
    function _parseStackIndex(index) {
      if (_isStackIndex(index)) {
        if (Math.abs(index) < _dirStack.length + 1) {
          return /^-/.test(index) ? Number(index) - 1 : Number(index);
        }
        common.error(index + ": directory stack index out of range");
      } else {
        common.error(index + ": invalid number");
      }
    }
    function _actualDirStack() {
      return [process.cwd()].concat(_dirStack);
    }
    function _pushd(options, dir) {
      if (_isStackIndex(options)) {
        dir = options;
        options = "";
      }
      options = common.parseOptions(options, {
        "n": "no-cd",
        "q": "quiet"
      });
      var dirs = _actualDirStack();
      if (dir === "+0") {
        return dirs;
      } else if (!dir) {
        if (dirs.length > 1) {
          dirs = dirs.splice(1, 1).concat(dirs);
        } else {
          return common.error("no other directory");
        }
      } else if (_isStackIndex(dir)) {
        var n = _parseStackIndex(dir);
        dirs = dirs.slice(n).concat(dirs.slice(0, n));
      } else {
        if (options["no-cd"]) {
          dirs.splice(1, 0, dir);
        } else {
          dirs.unshift(dir);
        }
      }
      if (options["no-cd"]) {
        dirs = dirs.slice(1);
      } else {
        dir = path2.resolve(dirs.shift());
        _cd("", dir);
      }
      _dirStack = dirs;
      return _dirs(options.quiet ? "-q" : "");
    }
    exports.pushd = _pushd;
    function _popd(options, index) {
      if (_isStackIndex(options)) {
        index = options;
        options = "";
      }
      options = common.parseOptions(options, {
        "n": "no-cd",
        "q": "quiet"
      });
      if (!_dirStack.length) {
        return common.error("directory stack empty");
      }
      index = _parseStackIndex(index || "+0");
      if (options["no-cd"] || index > 0 || _dirStack.length + index === 0) {
        index = index > 0 ? index - 1 : index;
        _dirStack.splice(index, 1);
      } else {
        var dir = path2.resolve(_dirStack.shift());
        _cd("", dir);
      }
      return _dirs(options.quiet ? "-q" : "");
    }
    exports.popd = _popd;
    function _dirs(options, index) {
      if (_isStackIndex(options)) {
        index = options;
        options = "";
      }
      options = common.parseOptions(options, {
        "c": "clear",
        "q": "quiet"
      });
      if (options.clear) {
        _dirStack = [];
        return _dirStack;
      }
      var stack = _actualDirStack();
      if (index) {
        index = _parseStackIndex(index);
        if (index < 0) {
          index = stack.length + index;
        }
        if (!options.quiet) {
          common.log(stack[index]);
        }
        return stack[index];
      }
      if (!options.quiet) {
        common.log(stack.join(" "));
      }
      return stack;
    }
    exports.dirs = _dirs;
  }
});

// ../../node_modules/shelljs/src/echo.js
var require_echo = __commonJS({
  "../../node_modules/shelljs/src/echo.js"(exports, module) {
    var format = __require("util").format;
    var common = require_common2();
    common.register("echo", _echo, {
      allowGlobbing: false
    });
    function _echo(opts) {
      var messages = [].slice.call(arguments, opts ? 0 : 1);
      var options = {};
      try {
        options = common.parseOptions(messages[0], {
          "e": "escapes",
          "n": "no_newline"
        }, {
          silent: true
        });
        if (messages[0]) {
          messages.shift();
        }
      } catch (_) {
        common.state.error = null;
      }
      var output = format.apply(null, messages);
      if (!options.no_newline) {
        output += "\n";
      }
      process.stdout.write(output);
      return output;
    }
    module.exports = _echo;
  }
});

// ../../node_modules/shelljs/src/error.js
var require_error = __commonJS({
  "../../node_modules/shelljs/src/error.js"(exports, module) {
    var common = require_common2();
    function error() {
      return common.state.error;
    }
    module.exports = error;
  }
});

// ../../node_modules/shelljs/src/exec-child.js
var require_exec_child = __commonJS({
  "../../node_modules/shelljs/src/exec-child.js"(exports, module) {
    if (__require.main !== module) {
      throw new Error("This file should not be required");
    }
    var childProcess = __require("child_process");
    var fs2 = __require("fs");
    var paramFilePath = process.argv[2];
    var serializedParams = fs2.readFileSync(paramFilePath, "utf8");
    var params = JSON.parse(serializedParams);
    var cmd = params.command;
    var execOptions = params.execOptions;
    var pipe = params.pipe;
    var stdoutFile = params.stdoutFile;
    var stderrFile = params.stderrFile;
    var c = childProcess.exec(cmd, execOptions, function(err) {
      if (!err) {
        process.exitCode = 0;
      } else if (err.code === void 0) {
        process.exitCode = 1;
      } else {
        process.exitCode = err.code;
      }
    });
    var stdoutStream = fs2.createWriteStream(stdoutFile);
    var stderrStream = fs2.createWriteStream(stderrFile);
    c.stdout.pipe(stdoutStream);
    c.stderr.pipe(stderrStream);
    c.stdout.pipe(process.stdout);
    c.stderr.pipe(process.stderr);
    if (pipe) {
      c.stdin.end(pipe);
    }
  }
});

// ../../node_modules/shelljs/src/tempdir.js
var require_tempdir = __commonJS({
  "../../node_modules/shelljs/src/tempdir.js"(exports, module) {
    var common = require_common2();
    var os2 = __require("os");
    var fs2 = __require("fs");
    common.register("tempdir", _tempDir, {
      allowGlobbing: false,
      wrapOutput: false
    });
    function writeableDir(dir) {
      if (!dir || !fs2.existsSync(dir)) return false;
      if (!common.statFollowLinks(dir).isDirectory()) return false;
      var testFile = dir + "/" + common.randomFileName();
      try {
        fs2.writeFileSync(testFile, " ");
        common.unlinkSync(testFile);
        return dir;
      } catch (e) {
        return false;
      }
    }
    var cachedTempDir;
    function _tempDir() {
      if (cachedTempDir) return cachedTempDir;
      cachedTempDir = writeableDir(os2.tmpdir()) || writeableDir(process.env.TMPDIR) || writeableDir(process.env.TEMP) || writeableDir(process.env.TMP) || writeableDir(process.env.Wimp$ScrapDir) || // RiscOS
      writeableDir("C:\\TEMP") || // Windows
      writeableDir("C:\\TMP") || // Windows
      writeableDir("\\TEMP") || // Windows
      writeableDir("\\TMP") || // Windows
      writeableDir("/tmp") || writeableDir("/var/tmp") || writeableDir("/usr/tmp") || writeableDir(".");
      return cachedTempDir;
    }
    function isCached() {
      return cachedTempDir;
    }
    function clearCache() {
      cachedTempDir = void 0;
    }
    module.exports.tempDir = _tempDir;
    module.exports.isCached = isCached;
    module.exports.clearCache = clearCache;
  }
});

// ../../node_modules/shelljs/src/pwd.js
var require_pwd = __commonJS({
  "../../node_modules/shelljs/src/pwd.js"(exports, module) {
    var path2 = __require("path");
    var common = require_common2();
    common.register("pwd", _pwd, {
      allowGlobbing: false
    });
    function _pwd() {
      var pwd = path2.resolve(process.cwd());
      return pwd;
    }
    module.exports = _pwd;
  }
});

// ../../node_modules/shelljs/src/exec.js
var require_exec = __commonJS({
  "../../node_modules/shelljs/src/exec.js"(exports, module) {
    var common = require_common2();
    var _tempDir = require_tempdir().tempDir;
    var _pwd = require_pwd();
    var path2 = __require("path");
    var fs2 = __require("fs");
    var child = __require("child_process");
    var DEFAULT_MAXBUFFER_SIZE = 20 * 1024 * 1024;
    var DEFAULT_ERROR_CODE = 1;
    common.register("exec", _exec, {
      unix: false,
      canReceivePipe: true,
      wrapOutput: false
    });
    function execSync(cmd, opts, pipe) {
      if (!common.config.execPath) {
        common.error("Unable to find a path to the node binary. Please manually set config.execPath");
      }
      var tempDir = _tempDir();
      var paramsFile = path2.resolve(tempDir + "/" + common.randomFileName());
      var stderrFile = path2.resolve(tempDir + "/" + common.randomFileName());
      var stdoutFile = path2.resolve(tempDir + "/" + common.randomFileName());
      opts = common.extend({
        silent: common.config.silent,
        cwd: _pwd().toString(),
        env: process.env,
        maxBuffer: DEFAULT_MAXBUFFER_SIZE,
        encoding: "utf8"
      }, opts);
      if (fs2.existsSync(paramsFile)) common.unlinkSync(paramsFile);
      if (fs2.existsSync(stderrFile)) common.unlinkSync(stderrFile);
      if (fs2.existsSync(stdoutFile)) common.unlinkSync(stdoutFile);
      opts.cwd = path2.resolve(opts.cwd);
      var paramsToSerialize = {
        command: cmd,
        execOptions: opts,
        pipe,
        stdoutFile,
        stderrFile
      };
      function writeFileLockedDown(filePath, data) {
        fs2.writeFileSync(filePath, data, {
          encoding: "utf8",
          mode: parseInt("600", 8)
        });
      }
      writeFileLockedDown(stdoutFile, "");
      writeFileLockedDown(stderrFile, "");
      writeFileLockedDown(paramsFile, JSON.stringify(paramsToSerialize));
      var execArgs = [
        path2.join(__dirname, "exec-child.js"),
        paramsFile
      ];
      if (opts.silent) {
        opts.stdio = "ignore";
      } else {
        opts.stdio = [0, 1, 2];
      }
      var code = 0;
      try {
        delete opts.shell;
        child.execFileSync(common.config.execPath, execArgs, opts);
      } catch (e) {
        code = e.status || DEFAULT_ERROR_CODE;
      }
      var stdout = "";
      var stderr = "";
      if (opts.encoding === "buffer") {
        stdout = fs2.readFileSync(stdoutFile);
        stderr = fs2.readFileSync(stderrFile);
      } else {
        stdout = fs2.readFileSync(stdoutFile, opts.encoding);
        stderr = fs2.readFileSync(stderrFile, opts.encoding);
      }
      try {
        common.unlinkSync(paramsFile);
      } catch (e) {
      }
      try {
        common.unlinkSync(stderrFile);
      } catch (e) {
      }
      try {
        common.unlinkSync(stdoutFile);
      } catch (e) {
      }
      if (code !== 0) {
        common.error(stderr, code, { continue: true, silent: true });
      }
      var obj = common.ShellString(stdout, stderr, code);
      return obj;
    }
    function execAsync2(cmd, opts, pipe, callback) {
      opts = common.extend({
        silent: common.config.silent,
        cwd: _pwd().toString(),
        env: process.env,
        maxBuffer: DEFAULT_MAXBUFFER_SIZE,
        encoding: "utf8"
      }, opts);
      var c = child.exec(cmd, opts, function(err, stdout, stderr) {
        if (callback) {
          if (!err) {
            callback(0, stdout, stderr);
          } else if (err.code === void 0) {
            callback(1, stdout, stderr);
          } else {
            callback(err.code, stdout, stderr);
          }
        }
      });
      if (pipe) c.stdin.end(pipe);
      if (!opts.silent) {
        c.stdout.pipe(process.stdout);
        c.stderr.pipe(process.stderr);
      }
      return c;
    }
    function _exec(command, options, callback) {
      options = options || {};
      if (!command) common.error("must specify command");
      var pipe = common.readFromPipe();
      if (typeof options === "function") {
        callback = options;
        options = { async: true };
      }
      if (typeof options === "object" && typeof callback === "function") {
        options.async = true;
      }
      options = common.extend({
        silent: common.config.silent,
        async: false
      }, options);
      if (options.async) {
        return execAsync2(command, options, pipe, callback);
      } else {
        return execSync(command, options, pipe);
      }
    }
    module.exports = _exec;
  }
});

// ../../node_modules/shelljs/src/ls.js
var require_ls = __commonJS({
  "../../node_modules/shelljs/src/ls.js"(exports, module) {
    var path2 = __require("path");
    var fs2 = __require("fs");
    var common = require_common2();
    var glob = require_glob();
    var globPatternRecursive = path2.sep + "**";
    common.register("ls", _ls, {
      cmdOptions: {
        "R": "recursive",
        "A": "all",
        "L": "link",
        "a": "all_deprecated",
        "d": "directory",
        "l": "long"
      }
    });
    function _ls(options, paths) {
      if (options.all_deprecated) {
        common.log("ls: Option -a is deprecated. Use -A instead");
        options.all = true;
      }
      if (!paths) {
        paths = ["."];
      } else {
        paths = [].slice.call(arguments, 1);
      }
      var list = [];
      function pushFile(abs, relName, stat) {
        if (process.platform === "win32") {
          relName = relName.replace(/\\/g, "/");
        }
        if (options.long) {
          stat = stat || (options.link ? common.statFollowLinks(abs) : common.statNoFollowLinks(abs));
          list.push(addLsAttributes(relName, stat));
        } else {
          list.push(relName);
        }
      }
      paths.forEach(function(p) {
        var stat;
        try {
          stat = options.link ? common.statFollowLinks(p) : common.statNoFollowLinks(p);
          if (stat.isSymbolicLink()) {
            try {
              var _stat = common.statFollowLinks(p);
              if (_stat.isDirectory()) {
                stat = _stat;
              }
            } catch (_) {
            }
          }
        } catch (e) {
          common.error("no such file or directory: " + p, 2, { continue: true });
          return;
        }
        if (stat.isDirectory() && !options.directory) {
          if (options.recursive) {
            glob.sync(p + globPatternRecursive, { dot: options.all, follow: options.link }).forEach(function(item) {
              if (path2.relative(p, item)) {
                pushFile(item, path2.relative(p, item));
              }
            });
          } else if (options.all) {
            fs2.readdirSync(p).forEach(function(item) {
              pushFile(path2.join(p, item), item);
            });
          } else {
            fs2.readdirSync(p).forEach(function(item) {
              if (item[0] !== ".") {
                pushFile(path2.join(p, item), item);
              }
            });
          }
        } else {
          pushFile(p, p, stat);
        }
      });
      return list;
    }
    function addLsAttributes(pathName, stats) {
      stats.name = pathName;
      stats.toString = function() {
        return [this.mode, this.nlink, this.uid, this.gid, this.size, this.mtime, this.name].join(" ");
      };
      return stats;
    }
    module.exports = _ls;
  }
});

// ../../node_modules/shelljs/src/find.js
var require_find = __commonJS({
  "../../node_modules/shelljs/src/find.js"(exports, module) {
    var path2 = __require("path");
    var common = require_common2();
    var _ls = require_ls();
    common.register("find", _find, {});
    function _find(options, paths) {
      if (!paths) {
        common.error("no path specified");
      } else if (typeof paths === "string") {
        paths = [].slice.call(arguments, 1);
      }
      var list = [];
      function pushFile(file) {
        if (process.platform === "win32") {
          file = file.replace(/\\/g, "/");
        }
        list.push(file);
      }
      paths.forEach(function(file) {
        var stat;
        try {
          stat = common.statFollowLinks(file);
        } catch (e) {
          common.error("no such file or directory: " + file);
        }
        pushFile(file);
        if (stat.isDirectory()) {
          _ls({ recursive: true, all: true }, file).forEach(function(subfile) {
            pushFile(path2.join(file, subfile));
          });
        }
      });
      return list;
    }
    module.exports = _find;
  }
});

// ../../node_modules/shelljs/src/grep.js
var require_grep = __commonJS({
  "../../node_modules/shelljs/src/grep.js"(exports, module) {
    var common = require_common2();
    var fs2 = __require("fs");
    common.register("grep", _grep, {
      globStart: 2,
      // don't glob-expand the regex
      canReceivePipe: true,
      cmdOptions: {
        "v": "inverse",
        "l": "nameOnly",
        "i": "ignoreCase"
      }
    });
    function _grep(options, regex, files) {
      var pipe = common.readFromPipe();
      if (!files && !pipe) common.error("no paths given", 2);
      files = [].slice.call(arguments, 2);
      if (pipe) {
        files.unshift("-");
      }
      var grep = [];
      if (options.ignoreCase) {
        regex = new RegExp(regex, "i");
      }
      files.forEach(function(file) {
        if (!fs2.existsSync(file) && file !== "-") {
          common.error("no such file or directory: " + file, 2, { continue: true });
          return;
        }
        var contents = file === "-" ? pipe : fs2.readFileSync(file, "utf8");
        if (options.nameOnly) {
          if (contents.match(regex)) {
            grep.push(file);
          }
        } else {
          var lines = contents.split("\n");
          lines.forEach(function(line) {
            var matched = line.match(regex);
            if (options.inverse && !matched || !options.inverse && matched) {
              grep.push(line);
            }
          });
        }
      });
      return grep.join("\n") + "\n";
    }
    module.exports = _grep;
  }
});

// ../../node_modules/shelljs/src/head.js
var require_head = __commonJS({
  "../../node_modules/shelljs/src/head.js"(exports, module) {
    var common = require_common2();
    var fs2 = __require("fs");
    common.register("head", _head, {
      canReceivePipe: true,
      cmdOptions: {
        "n": "numLines"
      }
    });
    function readSomeLines(file, numLines) {
      var buf = common.buffer();
      var bufLength = buf.length;
      var bytesRead = bufLength;
      var pos = 0;
      var fdr = fs2.openSync(file, "r");
      var numLinesRead = 0;
      var ret = "";
      while (bytesRead === bufLength && numLinesRead < numLines) {
        bytesRead = fs2.readSync(fdr, buf, 0, bufLength, pos);
        var bufStr = buf.toString("utf8", 0, bytesRead);
        numLinesRead += bufStr.split("\n").length - 1;
        ret += bufStr;
        pos += bytesRead;
      }
      fs2.closeSync(fdr);
      return ret;
    }
    function _head(options, files) {
      var head = [];
      var pipe = common.readFromPipe();
      if (!files && !pipe) common.error("no paths given");
      var idx = 1;
      if (options.numLines === true) {
        idx = 2;
        options.numLines = Number(arguments[1]);
      } else if (options.numLines === false) {
        options.numLines = 10;
      }
      files = [].slice.call(arguments, idx);
      if (pipe) {
        files.unshift("-");
      }
      var shouldAppendNewline = false;
      files.forEach(function(file) {
        if (file !== "-") {
          if (!fs2.existsSync(file)) {
            common.error("no such file or directory: " + file, { continue: true });
            return;
          } else if (common.statFollowLinks(file).isDirectory()) {
            common.error("error reading '" + file + "': Is a directory", {
              continue: true
            });
            return;
          }
        }
        var contents;
        if (file === "-") {
          contents = pipe;
        } else if (options.numLines < 0) {
          contents = fs2.readFileSync(file, "utf8");
        } else {
          contents = readSomeLines(file, options.numLines);
        }
        var lines = contents.split("\n");
        var hasTrailingNewline = lines[lines.length - 1] === "";
        if (hasTrailingNewline) {
          lines.pop();
        }
        shouldAppendNewline = hasTrailingNewline || options.numLines < lines.length;
        head = head.concat(lines.slice(0, options.numLines));
      });
      if (shouldAppendNewline) {
        head.push("");
      }
      return head.join("\n");
    }
    module.exports = _head;
  }
});

// ../../node_modules/shelljs/src/ln.js
var require_ln = __commonJS({
  "../../node_modules/shelljs/src/ln.js"(exports, module) {
    var fs2 = __require("fs");
    var path2 = __require("path");
    var common = require_common2();
    common.register("ln", _ln, {
      cmdOptions: {
        "s": "symlink",
        "f": "force"
      }
    });
    function _ln(options, source, dest) {
      if (!source || !dest) {
        common.error("Missing <source> and/or <dest>");
      }
      source = String(source);
      var sourcePath = path2.normalize(source).replace(RegExp(path2.sep + "$"), "");
      var isAbsolute = path2.resolve(source) === sourcePath;
      dest = path2.resolve(process.cwd(), String(dest));
      if (fs2.existsSync(dest)) {
        if (!options.force) {
          common.error("Destination file exists", { continue: true });
        }
        fs2.unlinkSync(dest);
      }
      if (options.symlink) {
        var isWindows = process.platform === "win32";
        var linkType = isWindows ? "file" : null;
        var resolvedSourcePath = isAbsolute ? sourcePath : path2.resolve(process.cwd(), path2.dirname(dest), source);
        if (!fs2.existsSync(resolvedSourcePath)) {
          common.error("Source file does not exist", { continue: true });
        } else if (isWindows && common.statFollowLinks(resolvedSourcePath).isDirectory()) {
          linkType = "junction";
        }
        try {
          fs2.symlinkSync(linkType === "junction" ? resolvedSourcePath : source, dest, linkType);
        } catch (err) {
          common.error(err.message);
        }
      } else {
        if (!fs2.existsSync(source)) {
          common.error("Source file does not exist", { continue: true });
        }
        try {
          fs2.linkSync(source, dest);
        } catch (err) {
          common.error(err.message);
        }
      }
      return "";
    }
    module.exports = _ln;
  }
});

// ../../node_modules/shelljs/src/mkdir.js
var require_mkdir = __commonJS({
  "../../node_modules/shelljs/src/mkdir.js"(exports, module) {
    var common = require_common2();
    var fs2 = __require("fs");
    var path2 = __require("path");
    common.register("mkdir", _mkdir, {
      cmdOptions: {
        "p": "fullpath"
      }
    });
    function mkdirSyncRecursive(dir) {
      var baseDir = path2.dirname(dir);
      if (baseDir === dir) {
        common.error("dirname() failed: [" + dir + "]");
      }
      if (fs2.existsSync(baseDir)) {
        fs2.mkdirSync(dir, parseInt("0777", 8));
        return;
      }
      mkdirSyncRecursive(baseDir);
      fs2.mkdirSync(dir, parseInt("0777", 8));
    }
    function _mkdir(options, dirs) {
      if (!dirs) common.error("no paths given");
      if (typeof dirs === "string") {
        dirs = [].slice.call(arguments, 1);
      }
      dirs.forEach(function(dir) {
        try {
          var stat = common.statNoFollowLinks(dir);
          if (!options.fullpath) {
            common.error("path already exists: " + dir, { continue: true });
          } else if (stat.isFile()) {
            common.error("cannot create directory " + dir + ": File exists", { continue: true });
          }
          return;
        } catch (e) {
        }
        var baseDir = path2.dirname(dir);
        if (!fs2.existsSync(baseDir) && !options.fullpath) {
          common.error("no such file or directory: " + baseDir, { continue: true });
          return;
        }
        try {
          if (options.fullpath) {
            mkdirSyncRecursive(path2.resolve(dir));
          } else {
            fs2.mkdirSync(dir, parseInt("0777", 8));
          }
        } catch (e) {
          var reason;
          if (e.code === "EACCES") {
            reason = "Permission denied";
          } else if (e.code === "ENOTDIR" || e.code === "ENOENT") {
            reason = "Not a directory";
          } else {
            throw e;
          }
          common.error("cannot create directory " + dir + ": " + reason, { continue: true });
        }
      });
      return "";
    }
    module.exports = _mkdir;
  }
});

// ../../node_modules/shelljs/src/rm.js
var require_rm = __commonJS({
  "../../node_modules/shelljs/src/rm.js"(exports, module) {
    var common = require_common2();
    var fs2 = __require("fs");
    common.register("rm", _rm, {
      cmdOptions: {
        "f": "force",
        "r": "recursive",
        "R": "recursive"
      }
    });
    function rmdirSyncRecursive(dir, force, fromSymlink) {
      var files;
      files = fs2.readdirSync(dir);
      for (var i = 0; i < files.length; i++) {
        var file = dir + "/" + files[i];
        var currFile = common.statNoFollowLinks(file);
        if (currFile.isDirectory()) {
          rmdirSyncRecursive(file, force);
        } else {
          if (force || isWriteable(file)) {
            try {
              common.unlinkSync(file);
            } catch (e) {
              common.error("could not remove file (code " + e.code + "): " + file, {
                continue: true
              });
            }
          }
        }
      }
      if (fromSymlink) return;
      var result;
      try {
        var start = Date.now();
        for (; ; ) {
          try {
            result = fs2.rmdirSync(dir);
            if (fs2.existsSync(dir)) throw { code: "EAGAIN" };
            break;
          } catch (er) {
            if (process.platform === "win32" && (er.code === "ENOTEMPTY" || er.code === "EBUSY" || er.code === "EPERM" || er.code === "EAGAIN")) {
              if (Date.now() - start > 1e3) throw er;
            } else if (er.code === "ENOENT") {
              break;
            } else {
              throw er;
            }
          }
        }
      } catch (e) {
        common.error("could not remove directory (code " + e.code + "): " + dir, { continue: true });
      }
      return result;
    }
    function isWriteable(file) {
      var writePermission = true;
      try {
        var __fd = fs2.openSync(file, "a");
        fs2.closeSync(__fd);
      } catch (e) {
        writePermission = false;
      }
      return writePermission;
    }
    function handleFile(file, options) {
      if (options.force || isWriteable(file)) {
        common.unlinkSync(file);
      } else {
        common.error("permission denied: " + file, { continue: true });
      }
    }
    function handleDirectory(file, options) {
      if (options.recursive) {
        rmdirSyncRecursive(file, options.force);
      } else {
        common.error("path is a directory", { continue: true });
      }
    }
    function handleSymbolicLink(file, options) {
      var stats;
      try {
        stats = common.statFollowLinks(file);
      } catch (e) {
        common.unlinkSync(file);
        return;
      }
      if (stats.isFile()) {
        common.unlinkSync(file);
      } else if (stats.isDirectory()) {
        if (file[file.length - 1] === "/") {
          if (options.recursive) {
            var fromSymlink = true;
            rmdirSyncRecursive(file, options.force, fromSymlink);
          } else {
            common.error("path is a directory", { continue: true });
          }
        } else {
          common.unlinkSync(file);
        }
      }
    }
    function handleFIFO(file) {
      common.unlinkSync(file);
    }
    function _rm(options, files) {
      if (!files) common.error("no paths given");
      files = [].slice.call(arguments, 1);
      files.forEach(function(file) {
        var lstats;
        try {
          var filepath = file[file.length - 1] === "/" ? file.slice(0, -1) : file;
          lstats = common.statNoFollowLinks(filepath);
        } catch (e) {
          if (!options.force) {
            common.error("no such file or directory: " + file, { continue: true });
          }
          return;
        }
        if (lstats.isFile()) {
          handleFile(file, options);
        } else if (lstats.isDirectory()) {
          handleDirectory(file, options);
        } else if (lstats.isSymbolicLink()) {
          handleSymbolicLink(file, options);
        } else if (lstats.isFIFO()) {
          handleFIFO(file);
        }
      });
      return "";
    }
    module.exports = _rm;
  }
});

// ../../node_modules/shelljs/src/mv.js
var require_mv = __commonJS({
  "../../node_modules/shelljs/src/mv.js"(exports, module) {
    var fs2 = __require("fs");
    var path2 = __require("path");
    var common = require_common2();
    var cp = require_cp();
    var rm = require_rm();
    common.register("mv", _mv, {
      cmdOptions: {
        "f": "!no_force",
        "n": "no_force"
      }
    });
    function checkRecentCreated(sources, index) {
      var lookedSource = sources[index];
      return sources.slice(0, index).some(function(src) {
        return path2.basename(src) === path2.basename(lookedSource);
      });
    }
    function _mv(options, sources, dest) {
      if (arguments.length < 3) {
        common.error("missing <source> and/or <dest>");
      } else if (arguments.length > 3) {
        sources = [].slice.call(arguments, 1, arguments.length - 1);
        dest = arguments[arguments.length - 1];
      } else if (typeof sources === "string") {
        sources = [sources];
      } else {
        common.error("invalid arguments");
      }
      var exists = fs2.existsSync(dest);
      var stats = exists && common.statFollowLinks(dest);
      if ((!exists || !stats.isDirectory()) && sources.length > 1) {
        common.error("dest is not a directory (too many sources)");
      }
      if (exists && stats.isFile() && options.no_force) {
        common.error("dest file already exists: " + dest);
      }
      sources.forEach(function(src, srcIndex) {
        if (!fs2.existsSync(src)) {
          common.error("no such file or directory: " + src, { continue: true });
          return;
        }
        var thisDest = dest;
        if (fs2.existsSync(dest) && common.statFollowLinks(dest).isDirectory()) {
          thisDest = path2.normalize(dest + "/" + path2.basename(src));
        }
        var thisDestExists = fs2.existsSync(thisDest);
        if (thisDestExists && checkRecentCreated(sources, srcIndex)) {
          if (!options.no_force) {
            common.error("will not overwrite just-created '" + thisDest + "' with '" + src + "'", { continue: true });
          }
          return;
        }
        if (fs2.existsSync(thisDest) && options.no_force) {
          common.error("dest file already exists: " + thisDest, { continue: true });
          return;
        }
        if (path2.resolve(src) === path2.dirname(path2.resolve(thisDest))) {
          common.error("cannot move to self: " + src, { continue: true });
          return;
        }
        try {
          fs2.renameSync(src, thisDest);
        } catch (e) {
          if (e.code === "EXDEV") {
            cp("-r", src, thisDest);
            rm("-rf", src);
          }
        }
      });
      return "";
    }
    module.exports = _mv;
  }
});

// ../../node_modules/shelljs/src/popd.js
var require_popd = __commonJS({
  "../../node_modules/shelljs/src/popd.js"() {
  }
});

// ../../node_modules/shelljs/src/pushd.js
var require_pushd = __commonJS({
  "../../node_modules/shelljs/src/pushd.js"() {
  }
});

// ../../node_modules/shelljs/src/sed.js
var require_sed = __commonJS({
  "../../node_modules/shelljs/src/sed.js"(exports, module) {
    var common = require_common2();
    var fs2 = __require("fs");
    common.register("sed", _sed, {
      globStart: 3,
      // don't glob-expand regexes
      canReceivePipe: true,
      cmdOptions: {
        "i": "inplace"
      }
    });
    function _sed(options, regex, replacement, files) {
      var pipe = common.readFromPipe();
      if (typeof replacement !== "string" && typeof replacement !== "function") {
        if (typeof replacement === "number") {
          replacement = replacement.toString();
        } else {
          common.error("invalid replacement string");
        }
      }
      if (typeof regex === "string") {
        regex = RegExp(regex);
      }
      if (!files && !pipe) {
        common.error("no files given");
      }
      files = [].slice.call(arguments, 3);
      if (pipe) {
        files.unshift("-");
      }
      var sed = [];
      files.forEach(function(file) {
        if (!fs2.existsSync(file) && file !== "-") {
          common.error("no such file or directory: " + file, 2, { continue: true });
          return;
        }
        var contents = file === "-" ? pipe : fs2.readFileSync(file, "utf8");
        var lines = contents.split("\n");
        var result = lines.map(function(line) {
          return line.replace(regex, replacement);
        }).join("\n");
        sed.push(result);
        if (options.inplace) {
          fs2.writeFileSync(file, result, "utf8");
        }
      });
      return sed.join("\n");
    }
    module.exports = _sed;
  }
});

// ../../node_modules/shelljs/src/set.js
var require_set = __commonJS({
  "../../node_modules/shelljs/src/set.js"(exports, module) {
    var common = require_common2();
    common.register("set", _set, {
      allowGlobbing: false,
      wrapOutput: false
    });
    function _set(options) {
      if (!options) {
        var args = [].slice.call(arguments, 0);
        if (args.length < 2) common.error("must provide an argument");
        options = args[1];
      }
      var negate = options[0] === "+";
      if (negate) {
        options = "-" + options.slice(1);
      }
      options = common.parseOptions(options, {
        "e": "fatal",
        "v": "verbose",
        "f": "noglob"
      });
      if (negate) {
        Object.keys(options).forEach(function(key) {
          options[key] = !options[key];
        });
      }
      Object.keys(options).forEach(function(key) {
        if (negate !== options[key]) {
          common.config[key] = options[key];
        }
      });
      return;
    }
    module.exports = _set;
  }
});

// ../../node_modules/shelljs/src/sort.js
var require_sort = __commonJS({
  "../../node_modules/shelljs/src/sort.js"(exports, module) {
    var common = require_common2();
    var fs2 = __require("fs");
    common.register("sort", _sort, {
      canReceivePipe: true,
      cmdOptions: {
        "r": "reverse",
        "n": "numerical"
      }
    });
    function parseNumber(str2) {
      var match = str2.match(/^\s*(\d*)\s*(.*)$/);
      return { num: Number(match[1]), value: match[2] };
    }
    function unixCmp(a, b) {
      var aLower = a.toLowerCase();
      var bLower = b.toLowerCase();
      return aLower === bLower ? -1 * a.localeCompare(b) : (
        // unix sort treats case opposite how javascript does
        aLower.localeCompare(bLower)
      );
    }
    function numericalCmp(a, b) {
      var objA = parseNumber(a);
      var objB = parseNumber(b);
      if (objA.hasOwnProperty("num") && objB.hasOwnProperty("num")) {
        return objA.num !== objB.num ? objA.num - objB.num : unixCmp(objA.value, objB.value);
      } else {
        return unixCmp(objA.value, objB.value);
      }
    }
    function _sort(options, files) {
      var pipe = common.readFromPipe();
      if (!files && !pipe) common.error("no files given");
      files = [].slice.call(arguments, 1);
      if (pipe) {
        files.unshift("-");
      }
      var lines = files.reduce(function(accum, file) {
        if (file !== "-") {
          if (!fs2.existsSync(file)) {
            common.error("no such file or directory: " + file, { continue: true });
            return accum;
          } else if (common.statFollowLinks(file).isDirectory()) {
            common.error("read failed: " + file + ": Is a directory", {
              continue: true
            });
            return accum;
          }
        }
        var contents = file === "-" ? pipe : fs2.readFileSync(file, "utf8");
        return accum.concat(contents.trimRight().split("\n"));
      }, []);
      var sorted = lines.sort(options.numerical ? numericalCmp : unixCmp);
      if (options.reverse) {
        sorted = sorted.reverse();
      }
      return sorted.join("\n") + "\n";
    }
    module.exports = _sort;
  }
});

// ../../node_modules/shelljs/src/tail.js
var require_tail = __commonJS({
  "../../node_modules/shelljs/src/tail.js"(exports, module) {
    var common = require_common2();
    var fs2 = __require("fs");
    common.register("tail", _tail, {
      canReceivePipe: true,
      cmdOptions: {
        "n": "numLines"
      }
    });
    function _tail(options, files) {
      var tail = [];
      var pipe = common.readFromPipe();
      if (!files && !pipe) common.error("no paths given");
      var idx = 1;
      if (options.numLines === true) {
        idx = 2;
        options.numLines = Number(arguments[1]);
      } else if (options.numLines === false) {
        options.numLines = 10;
      }
      options.numLines = -1 * Math.abs(options.numLines);
      files = [].slice.call(arguments, idx);
      if (pipe) {
        files.unshift("-");
      }
      var shouldAppendNewline = false;
      files.forEach(function(file) {
        if (file !== "-") {
          if (!fs2.existsSync(file)) {
            common.error("no such file or directory: " + file, { continue: true });
            return;
          } else if (common.statFollowLinks(file).isDirectory()) {
            common.error("error reading '" + file + "': Is a directory", {
              continue: true
            });
            return;
          }
        }
        var contents = file === "-" ? pipe : fs2.readFileSync(file, "utf8");
        var lines = contents.split("\n");
        if (lines[lines.length - 1] === "") {
          lines.pop();
          shouldAppendNewline = true;
        } else {
          shouldAppendNewline = false;
        }
        tail = tail.concat(lines.slice(options.numLines));
      });
      if (shouldAppendNewline) {
        tail.push("");
      }
      return tail.join("\n");
    }
    module.exports = _tail;
  }
});

// ../../node_modules/shelljs/src/test.js
var require_test = __commonJS({
  "../../node_modules/shelljs/src/test.js"(exports, module) {
    var common = require_common2();
    var fs2 = __require("fs");
    common.register("test", _test, {
      cmdOptions: {
        "b": "block",
        "c": "character",
        "d": "directory",
        "e": "exists",
        "f": "file",
        "L": "link",
        "p": "pipe",
        "S": "socket"
      },
      wrapOutput: false,
      allowGlobbing: false
    });
    function _test(options, path2) {
      if (!path2) common.error("no path given");
      var canInterpret = false;
      Object.keys(options).forEach(function(key) {
        if (options[key] === true) {
          canInterpret = true;
        }
      });
      if (!canInterpret) common.error("could not interpret expression");
      if (options.link) {
        try {
          return common.statNoFollowLinks(path2).isSymbolicLink();
        } catch (e) {
          return false;
        }
      }
      if (!fs2.existsSync(path2)) return false;
      if (options.exists) return true;
      var stats = common.statFollowLinks(path2);
      if (options.block) return stats.isBlockDevice();
      if (options.character) return stats.isCharacterDevice();
      if (options.directory) return stats.isDirectory();
      if (options.file) return stats.isFile();
      if (options.pipe) return stats.isFIFO();
      if (options.socket) return stats.isSocket();
      return false;
    }
    module.exports = _test;
  }
});

// ../../node_modules/shelljs/src/to.js
var require_to = __commonJS({
  "../../node_modules/shelljs/src/to.js"(exports, module) {
    var common = require_common2();
    var fs2 = __require("fs");
    var path2 = __require("path");
    common.register("to", _to, {
      pipeOnly: true,
      wrapOutput: false
    });
    function _to(options, file) {
      if (!file) common.error("wrong arguments");
      if (!fs2.existsSync(path2.dirname(file))) {
        common.error("no such file or directory: " + path2.dirname(file));
      }
      try {
        fs2.writeFileSync(file, this.stdout || this.toString(), "utf8");
        return this;
      } catch (e) {
        common.error("could not write to file (code " + e.code + "): " + file, { continue: true });
      }
    }
    module.exports = _to;
  }
});

// ../../node_modules/shelljs/src/toEnd.js
var require_toEnd = __commonJS({
  "../../node_modules/shelljs/src/toEnd.js"(exports, module) {
    var common = require_common2();
    var fs2 = __require("fs");
    var path2 = __require("path");
    common.register("toEnd", _toEnd, {
      pipeOnly: true,
      wrapOutput: false
    });
    function _toEnd(options, file) {
      if (!file) common.error("wrong arguments");
      if (!fs2.existsSync(path2.dirname(file))) {
        common.error("no such file or directory: " + path2.dirname(file));
      }
      try {
        fs2.appendFileSync(file, this.stdout || this.toString(), "utf8");
        return this;
      } catch (e) {
        common.error("could not append to file (code " + e.code + "): " + file, { continue: true });
      }
    }
    module.exports = _toEnd;
  }
});

// ../../node_modules/shelljs/src/touch.js
var require_touch = __commonJS({
  "../../node_modules/shelljs/src/touch.js"(exports, module) {
    var common = require_common2();
    var fs2 = __require("fs");
    common.register("touch", _touch, {
      cmdOptions: {
        "a": "atime_only",
        "c": "no_create",
        "d": "date",
        "m": "mtime_only",
        "r": "reference"
      }
    });
    function _touch(opts, files) {
      if (!files) {
        common.error("no files given");
      } else if (typeof files === "string") {
        files = [].slice.call(arguments, 1);
      } else {
        common.error("file arg should be a string file path or an Array of string file paths");
      }
      files.forEach(function(f) {
        touchFile(opts, f);
      });
      return "";
    }
    function touchFile(opts, file) {
      var stat = tryStatFile(file);
      if (stat && stat.isDirectory()) {
        return;
      }
      if (!stat && opts.no_create) {
        return;
      }
      fs2.closeSync(fs2.openSync(file, "a"));
      var now = /* @__PURE__ */ new Date();
      var mtime = opts.date || now;
      var atime = opts.date || now;
      if (opts.reference) {
        var refStat = tryStatFile(opts.reference);
        if (!refStat) {
          common.error("failed to get attributess of " + opts.reference);
        }
        mtime = refStat.mtime;
        atime = refStat.atime;
      } else if (opts.date) {
        mtime = opts.date;
        atime = opts.date;
      }
      if (opts.atime_only && opts.mtime_only) {
      } else if (opts.atime_only) {
        mtime = stat.mtime;
      } else if (opts.mtime_only) {
        atime = stat.atime;
      }
      fs2.utimesSync(file, atime, mtime);
    }
    module.exports = _touch;
    function tryStatFile(filePath) {
      try {
        return common.statFollowLinks(filePath);
      } catch (e) {
        return null;
      }
    }
  }
});

// ../../node_modules/shelljs/src/uniq.js
var require_uniq = __commonJS({
  "../../node_modules/shelljs/src/uniq.js"(exports, module) {
    var common = require_common2();
    var fs2 = __require("fs");
    function lpad(c, str2) {
      var res = "" + str2;
      if (res.length < c) {
        res = Array(c - res.length + 1).join(" ") + res;
      }
      return res;
    }
    common.register("uniq", _uniq, {
      canReceivePipe: true,
      cmdOptions: {
        "i": "ignoreCase",
        "c": "count",
        "d": "duplicates"
      }
    });
    function _uniq(options, input, output) {
      var pipe = common.readFromPipe();
      if (!pipe) {
        if (!input) common.error("no input given");
        if (!fs2.existsSync(input)) {
          common.error(input + ": No such file or directory");
        } else if (common.statFollowLinks(input).isDirectory()) {
          common.error("error reading '" + input + "'");
        }
      }
      if (output && fs2.existsSync(output) && common.statFollowLinks(output).isDirectory()) {
        common.error(output + ": Is a directory");
      }
      var lines = (input ? fs2.readFileSync(input, "utf8") : pipe).trimRight().split("\n");
      var compare = function(a, b) {
        return options.ignoreCase ? a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase()) : a.localeCompare(b);
      };
      var uniqed = lines.reduceRight(function(res, e) {
        if (res.length === 0) {
          return [{ count: 1, ln: e }];
        } else if (compare(res[0].ln, e) === 0) {
          return [{ count: res[0].count + 1, ln: e }].concat(res.slice(1));
        } else {
          return [{ count: 1, ln: e }].concat(res);
        }
      }, []).filter(function(obj) {
        return options.duplicates ? obj.count > 1 : true;
      }).map(function(obj) {
        return (options.count ? lpad(7, obj.count) + " " : "") + obj.ln;
      }).join("\n") + "\n";
      if (output) {
        new common.ShellString(uniqed).to(output);
        return "";
      } else {
        return uniqed;
      }
    }
    module.exports = _uniq;
  }
});

// ../../node_modules/shelljs/src/which.js
var require_which = __commonJS({
  "../../node_modules/shelljs/src/which.js"(exports, module) {
    var common = require_common2();
    var fs2 = __require("fs");
    var path2 = __require("path");
    common.register("which", _which, {
      allowGlobbing: false,
      cmdOptions: {
        "a": "all"
      }
    });
    var XP_DEFAULT_PATHEXT = ".com;.exe;.bat;.cmd;.vbs;.vbe;.js;.jse;.wsf;.wsh";
    var FILE_EXECUTABLE_MODE = 1;
    function isWindowsPlatform() {
      return process.platform === "win32";
    }
    function splitPath(p) {
      return p ? p.split(path2.delimiter) : [];
    }
    function isExecutable(pathName) {
      try {
        fs2.accessSync(pathName, FILE_EXECUTABLE_MODE);
      } catch (err) {
        return false;
      }
      return true;
    }
    function checkPath(pathName) {
      return fs2.existsSync(pathName) && !common.statFollowLinks(pathName).isDirectory() && (isWindowsPlatform() || isExecutable(pathName));
    }
    function _which(options, cmd) {
      if (!cmd) common.error("must specify command");
      var isWindows = isWindowsPlatform();
      var pathArray = splitPath(process.env.PATH);
      var queryMatches = [];
      if (cmd.indexOf("/") === -1) {
        var pathExtArray = [""];
        if (isWindows) {
          var pathExtEnv = process.env.PATHEXT || XP_DEFAULT_PATHEXT;
          pathExtArray = splitPath(pathExtEnv.toUpperCase());
        }
        for (var k = 0; k < pathArray.length; k++) {
          if (queryMatches.length > 0 && !options.all) break;
          var attempt = path2.resolve(pathArray[k], cmd);
          if (isWindows) {
            attempt = attempt.toUpperCase();
          }
          var match = attempt.match(/\.[^<>:"/\|?*.]+$/);
          if (match && pathExtArray.indexOf(match[0]) >= 0) {
            if (checkPath(attempt)) {
              queryMatches.push(attempt);
              break;
            }
          } else {
            for (var i = 0; i < pathExtArray.length; i++) {
              var ext = pathExtArray[i];
              var newAttempt = attempt + ext;
              if (checkPath(newAttempt)) {
                queryMatches.push(newAttempt);
                break;
              }
            }
          }
        }
      } else if (checkPath(cmd)) {
        queryMatches.push(path2.resolve(cmd));
      }
      if (queryMatches.length > 0) {
        return options.all ? queryMatches : queryMatches[0];
      }
      return options.all ? [] : null;
    }
    module.exports = _which;
  }
});

// require("./src/**/*") in ../../node_modules/shelljs/shell.js
var globRequire_src;
var init_ = __esm({
  'require("./src/**/*") in ../../node_modules/shelljs/shell.js'() {
    globRequire_src = __glob({
      "./src/cat.js": () => require_cat(),
      "./src/cd.js": () => require_cd(),
      "./src/chmod.js": () => require_chmod(),
      "./src/common.js": () => require_common2(),
      "./src/cp.js": () => require_cp(),
      "./src/dirs.js": () => require_dirs(),
      "./src/echo.js": () => require_echo(),
      "./src/error.js": () => require_error(),
      "./src/exec-child.js": () => require_exec_child(),
      "./src/exec.js": () => require_exec(),
      "./src/find.js": () => require_find(),
      "./src/grep.js": () => require_grep(),
      "./src/head.js": () => require_head(),
      "./src/ln.js": () => require_ln(),
      "./src/ls.js": () => require_ls(),
      "./src/mkdir.js": () => require_mkdir(),
      "./src/mv.js": () => require_mv(),
      "./src/popd.js": () => require_popd(),
      "./src/pushd.js": () => require_pushd(),
      "./src/pwd.js": () => require_pwd(),
      "./src/rm.js": () => require_rm(),
      "./src/sed.js": () => require_sed(),
      "./src/set.js": () => require_set(),
      "./src/sort.js": () => require_sort(),
      "./src/tail.js": () => require_tail(),
      "./src/tempdir.js": () => require_tempdir(),
      "./src/test.js": () => require_test(),
      "./src/to.js": () => require_to(),
      "./src/toEnd.js": () => require_toEnd(),
      "./src/touch.js": () => require_touch(),
      "./src/uniq.js": () => require_uniq(),
      "./src/which.js": () => require_which()
    });
  }
});

// ../../node_modules/shelljs/commands.js
var require_commands = __commonJS({
  "../../node_modules/shelljs/commands.js"(exports, module) {
    module.exports = [
      "cat",
      "cd",
      "chmod",
      "cp",
      "dirs",
      "echo",
      "exec",
      "find",
      "grep",
      "head",
      "ln",
      "ls",
      "mkdir",
      "mv",
      "pwd",
      "rm",
      "sed",
      "set",
      "sort",
      "tail",
      "tempdir",
      "test",
      "to",
      "toEnd",
      "touch",
      "uniq",
      "which"
    ];
  }
});

// ../../node_modules/shelljs/shell.js
var require_shell = __commonJS({
  "../../node_modules/shelljs/shell.js"(exports) {
    init_();
    var common = require_common2();
    require_commands().forEach(function(command) {
      globRequire_src("./src/" + command);
    });
    exports.exit = process.exit;
    exports.error = require_error();
    exports.ShellString = common.ShellString;
    exports.env = process.env;
    exports.config = common.config;
  }
});

// ../../node_modules/nodejs-whisper/dist/whisper.js
var require_whisper = __commonJS({
  "../../node_modules/nodejs-whisper/dist/whisper.js"(exports) {
    "use strict";
    var __awaiter10 = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.executeCppCommand = exports.whisperShell = void 0;
    var path_1 = __importDefault(__require("path"));
    var shelljs_1 = __importDefault(require_shell());
    var WHISPER_CPP_PATH = path_1.default.join(__dirname, "..", "cpp", "whisper.cpp");
    var WHISPER_CPP_MAIN_PATH = "./main";
    var projectDir = process.cwd();
    var defaultShellOptions = {
      silent: true,
      async: true
    };
    function handleError(error) {
      console.error("[Nodejs-whisper] Error:", error.message);
      shelljs_1.default.cd(projectDir);
      throw error;
    }
    function whisperShell(command_1) {
      return __awaiter10(this, arguments, void 0, function* (command, options = defaultShellOptions, verbose) {
        return new Promise((resolve, reject) => {
          shelljs_1.default.exec(command, options, (code, stdout, stderr) => {
            console.log("code---", code);
            console.log("stdout---", stdout);
            console.log("stderr---", stderr);
            if (code === 0) {
              if (stdout.includes("error:")) {
                reject(new Error("Error in whisper.cpp:\n" + stdout));
                return;
              }
              if (verbose) {
                console.log("stdout---", stdout);
                console.log("[Nodejs-whisper] Transcribing Done!");
              }
              resolve(stdout);
            } else {
              reject(new Error(stderr));
            }
          });
        }).catch((error) => {
          handleError(error);
          return Promise.reject(error);
        });
      });
    }
    exports.whisperShell = whisperShell;
    function executeCppCommand(command, verbose, withCuda) {
      return __awaiter10(this, void 0, void 0, function* () {
        try {
          shelljs_1.default.cd(WHISPER_CPP_PATH);
          if (!shelljs_1.default.which(WHISPER_CPP_MAIN_PATH)) {
            console.log("[Nodejs-whisper] whisper.cpp not initialized.");
            const makeCommand = withCuda ? "WHISPER_CUDA=1 make -j" : "make -j";
            shelljs_1.default.exec(makeCommand);
            if (!shelljs_1.default.which(WHISPER_CPP_MAIN_PATH)) {
              throw new Error("[Nodejs-whisper] 'make' command failed. Please run 'make' command in /whisper.cpp directory.");
            }
            console.log("[Nodejs-whisper] 'make' command successful.");
          }
          return yield whisperShell(command, defaultShellOptions, verbose);
        } catch (error) {
          handleError(error);
          throw new Error("Failed to execute C++ command");
        }
      });
    }
    exports.executeCppCommand = executeCppCommand;
  }
});

// ../../node_modules/nodejs-whisper/dist/constants.js
var require_constants = __commonJS({
  "../../node_modules/nodejs-whisper/dist/constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DEFAULT_MODEL = exports.MODEL_OBJECT = exports.MODELS = exports.MODELS_LIST = void 0;
    exports.MODELS_LIST = [
      "tiny",
      "tiny.en",
      "base",
      "base.en",
      "small",
      "small.en",
      "medium",
      "medium.en",
      "large-v1",
      "large"
    ];
    exports.MODELS = [
      "ggml-tiny.en.bin",
      "ggml-tiny.bin",
      "ggml-base.en.bin",
      "ggml-base.bin",
      "ggml-small.en.bin",
      "ggml-small.bin",
      "ggml-medium.en.bin",
      "ggml-medium.bin",
      "ggml-large-v1.bin",
      "ggml-large.bin"
    ];
    exports.MODEL_OBJECT = {
      tiny: "ggml-tiny.bin",
      "tiny.en": "ggml-tiny.en.bin",
      base: "ggml-base.bin",
      "base.en": "ggml-base.en.bin",
      small: "ggml-small.bin",
      "small.en": "ggml-small.en.bin",
      medium: "ggml-medium.bin",
      "medium.en": "ggml-medium.en.bin",
      "large-v1": "ggml-large-v1.bin",
      large: "ggml-large.bin"
    };
    exports.DEFAULT_MODEL = "tiny.en";
  }
});

// ../../node_modules/nodejs-whisper/dist/WhisperHelper.js
var require_WhisperHelper = __commonJS({
  "../../node_modules/nodejs-whisper/dist/WhisperHelper.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.constructCommand = void 0;
    var path_1 = __importDefault(__require("path"));
    var fs_1 = __importDefault(__require("fs"));
    var constants_1 = require_constants();
    var constructCommand = (filePath, args) => {
      var _a2, _b;
      let errors = [];
      if (!args.modelName) {
        errors.push("[Nodejs-whisper] Error: Provide model name");
      }
      if (!constants_1.MODELS_LIST.includes(args.modelName)) {
        errors.push(`[Nodejs-whisper] Error: Enter a valid model name. Available models are: ${constants_1.MODELS_LIST.join(", ")}`);
      }
      const modelPath = path_1.default.join(__dirname, "..", "cpp", "whisper.cpp", "models", constants_1.MODEL_OBJECT[args.modelName]);
      if (!fs_1.default.existsSync(modelPath)) {
        errors.push("[Nodejs-whisper] Error: Model file does not exist. Please ensure the model is downloaded and correctly placed.");
      }
      if (errors.length > 0) {
        throw new Error(errors.join("\n"));
      }
      const modelName = constants_1.MODEL_OBJECT[args.modelName];
      let command = `./main  ${constructOptionsFlags(args)} -l ${((_a2 = args.whisperOptions) === null || _a2 === void 0 ? void 0 : _a2.language) ? (_b = args.whisperOptions) === null || _b === void 0 ? void 0 : _b.language : "auto"} -m ./models/${modelName}  -f ${filePath}`;
      return command;
    };
    exports.constructCommand = constructCommand;
    var constructOptionsFlags = (args) => {
      var _a2, _b, _c, _d, _e, _f, _g, _h;
      let flags = [
        ((_a2 = args.whisperOptions) === null || _a2 === void 0 ? void 0 : _a2.outputInText) ? "-otxt " : "",
        ((_b = args.whisperOptions) === null || _b === void 0 ? void 0 : _b.outputInVtt) ? "-ovtt " : "",
        ((_c = args.whisperOptions) === null || _c === void 0 ? void 0 : _c.outputInSrt) ? "-osrt " : "",
        ((_d = args.whisperOptions) === null || _d === void 0 ? void 0 : _d.outputInCsv) ? "-ocsv " : "",
        ((_e = args.whisperOptions) === null || _e === void 0 ? void 0 : _e.translateToEnglish) ? "-tr " : "",
        ((_f = args.whisperOptions) === null || _f === void 0 ? void 0 : _f.wordTimestamps) ? "-ml 1 " : "",
        ((_g = args.whisperOptions) === null || _g === void 0 ? void 0 : _g.timestamps_length) ? `-ml ${args.whisperOptions.timestamps_length} ` : "",
        ((_h = args.whisperOptions) === null || _h === void 0 ? void 0 : _h.splitOnWord) ? "-sow true " : ""
      ].join("");
      return flags.trim();
    };
  }
});

// ../../node_modules/nodejs-whisper/dist/utils.js
var require_utils = __commonJS({
  "../../node_modules/nodejs-whisper/dist/utils.js"(exports) {
    "use strict";
    var __awaiter10 = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.convertToWavType = exports.checkIfFileExists = void 0;
    var fs_1 = __importDefault(__require("fs"));
    var path_1 = __importDefault(__require("path"));
    var shelljs_1 = __importDefault(require_shell());
    var checkIfFileExists = (filePath) => {
      if (!fs_1.default.existsSync(filePath)) {
        throw new Error(`[Nodejs-whisper] Error: No such file: ${filePath}`);
      }
    };
    exports.checkIfFileExists = checkIfFileExists;
    function isValidWavHeader(filePath) {
      return __awaiter10(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
          const readable = fs_1.default.createReadStream(filePath, { end: 11 });
          let data = "";
          readable.on("data", (chunk) => {
            data += chunk.toString("binary");
          });
          readable.on("end", () => {
            const isValid = data.startsWith("RIFF") || data.startsWith("RIFX");
            resolve(isValid);
          });
          readable.on("error", (err) => {
            reject(err);
          });
        });
      });
    }
    var convertToWavType = (inputFilePath, verbose) => __awaiter10(void 0, void 0, void 0, function* () {
      const fileExtension = path_1.default.extname(inputFilePath).toLowerCase();
      if (verbose) {
        console.log(`[Nodejs-whisper] Checking if the file is a valid WAV: ${inputFilePath}`);
      }
      if (fileExtension === ".wav") {
        const isWav = yield isValidWavHeader(inputFilePath);
        if (isWav) {
          if (verbose) {
            console.log(`[Nodejs-whisper] File is a valid WAV file.`);
          }
          return inputFilePath;
        } else {
          if (verbose) {
            console.log(`[Nodejs-whisper] File has a .wav extension but is not a valid WAV, overwriting...`);
          }
          const command = `ffmpeg -nostats -loglevel error -y -i "${inputFilePath}" -ar 16000 -ac 1 -c:a pcm_s16le "${inputFilePath}"`;
          const result = shelljs_1.default.exec(command, { silent: !verbose });
          if (result.code !== 0) {
            throw new Error(`[Nodejs-whisper] Failed to convert audio file: ${result.stderr}`);
          }
          return inputFilePath;
        }
      } else {
        const outputFilePath = path_1.default.join(path_1.default.dirname(inputFilePath), `${path_1.default.basename(inputFilePath, fileExtension)}.wav`);
        if (verbose) {
          console.log(`[Nodejs-whisper] Converting to a new WAV file: ${outputFilePath}`);
        }
        const command = `ffmpeg -nostats -loglevel error -y -i "${inputFilePath}" -ar 16000 -ac 1 -c:a pcm_s16le "${outputFilePath}"`;
        const result = shelljs_1.default.exec(command, { silent: !verbose });
        if (result.code !== 0) {
          throw new Error(`[Nodejs-whisper] Failed to convert audio file: ${result.stderr}`);
        }
        return outputFilePath;
      }
    });
    exports.convertToWavType = convertToWavType;
  }
});

// ../../node_modules/nodejs-whisper/dist/autoDownloadModel.js
var require_autoDownloadModel = __commonJS({
  "../../node_modules/nodejs-whisper/dist/autoDownloadModel.js"(exports) {
    "use strict";
    var __awaiter10 = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var path_1 = __importDefault(__require("path"));
    var shelljs_1 = __importDefault(require_shell());
    var fs_1 = __importDefault(__require("fs"));
    var constants_1 = require_constants();
    function autoDownloadModel(autoDownloadModelName_1, verbose_1) {
      return __awaiter10(this, arguments, void 0, function* (autoDownloadModelName, verbose, withCuda = false) {
        const projectDir = process.cwd();
        if (!autoDownloadModelName) {
          throw new Error("[Nodejs-whisper] Error: Model name must be provided.");
        }
        if (!constants_1.MODELS_LIST.includes(autoDownloadModelName)) {
          throw new Error("[Nodejs-whisper] Error: Provide a valid model name");
        }
        try {
          const modelDirectory = path_1.default.join(__dirname, "..", "cpp", "whisper.cpp", "models");
          shelljs_1.default.cd(modelDirectory);
          const existingModels = constants_1.MODELS.filter((model) => fs_1.default.existsSync(path_1.default.join(modelDirectory, model)));
          if (existingModels.length > 0) {
            if (verbose) {
              console.log("[Nodejs-whisper] Models already exist. Skipping download.");
            }
            return "Models already exist. Skipping download.";
          }
          console.log(`[Nodejs-whisper] Auto-download Model: ${autoDownloadModelName}`);
          let scriptPath = "./download-ggml-model.sh";
          if (process.platform === "win32") {
            scriptPath = "download-ggml-model.cmd";
          }
          shelljs_1.default.chmod("+x", scriptPath);
          const result = shelljs_1.default.exec(`${scriptPath} ${autoDownloadModelName}`, { silent: !verbose });
          if (result.code !== 0) {
            throw new Error(`[Nodejs-whisper] Failed to download model: ${result.stderr}`);
          }
          console.log("[Nodejs-whisper] Attempting to compile model...");
          shelljs_1.default.cd("../");
          const compileCommand = withCuda ? "WHISPER_CUDA=1 make -j" : "make -j";
          const compileResult = shelljs_1.default.exec(compileCommand, { silent: !verbose });
          if (compileResult.code !== 0) {
            throw new Error(`[Nodejs-whisper] Failed to compile model: ${compileResult.stderr}`);
          }
          return "Model downloaded and compiled successfully";
        } catch (error) {
          console.error("[Nodejs-whisper] Error caught in autoDownloadModel:", error);
          shelljs_1.default.cd(projectDir);
          throw error;
        }
      });
    }
    exports.default = autoDownloadModel;
  }
});

// ../../node_modules/nodejs-whisper/dist/index.js
var require_dist = __commonJS({
  "../../node_modules/nodejs-whisper/dist/index.js"(exports) {
    "use strict";
    var __awaiter10 = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.nodewhisper = void 0;
    var whisper_1 = require_whisper();
    var fs_1 = __importDefault(__require("fs"));
    var WhisperHelper_1 = require_WhisperHelper();
    var utils_1 = require_utils();
    var autoDownloadModel_1 = __importDefault(require_autoDownloadModel());
    function nodewhisper2(filePath, options) {
      return __awaiter10(this, void 0, void 0, function* () {
        try {
          const { verbose = false, removeWavFileAfterTranscription = false } = options;
          if (options.autoDownloadModelName) {
            if (verbose)
              console.log(`[Nodejs-whisper] Checking and downloading model if needed: ${options.autoDownloadModelName}`);
            console.log("autoDownloadModelName", options.autoDownloadModelName);
            console.log("options", options);
            yield (0, autoDownloadModel_1.default)(options.autoDownloadModelName, verbose, options.withCuda);
          }
          if (verbose)
            console.log(`[Nodejs-whisper] Checking file existence: ${filePath}`);
          (0, utils_1.checkIfFileExists)(filePath);
          if (verbose)
            console.log(`[Nodejs-whisper] Converting file to WAV format: ${filePath}`);
          const outputFilePath = yield (0, utils_1.convertToWavType)(filePath, verbose);
          if (verbose)
            console.log(`[Nodejs-whisper] Constructing command for file: ${outputFilePath}`);
          const command = (0, WhisperHelper_1.constructCommand)(outputFilePath, options);
          if (verbose)
            console.log(`[Nodejs-whisper] Executing command: ${command}`);
          const transcript = yield (0, whisper_1.executeCppCommand)(command, verbose, options.withCuda);
          if (!transcript) {
            throw new Error("Transcription failed or produced no output.");
          }
          if (removeWavFileAfterTranscription && fs_1.default.existsSync(outputFilePath)) {
            if (verbose)
              console.log(`[Nodejs-whisper] Removing temporary WAV file: ${outputFilePath}`);
            fs_1.default.unlinkSync(outputFilePath);
          }
          return transcript;
        } catch (error) {
          console.error(`[Nodejs-whisper] Error during processing: ${error.message}`);
          throw new Error(`Operation failed: ${error.message}`);
        }
      });
    }
    exports.nodewhisper = nodewhisper2;
  }
});

// ../../node_modules/event-target-shim/dist/event-target-shim.js
var require_event_target_shim = __commonJS({
  "../../node_modules/event-target-shim/dist/event-target-shim.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var privateData = /* @__PURE__ */ new WeakMap();
    var wrappers = /* @__PURE__ */ new WeakMap();
    function pd(event) {
      const retv = privateData.get(event);
      console.assert(
        retv != null,
        "'this' is expected an Event object, but got",
        event
      );
      return retv;
    }
    function setCancelFlag(data) {
      if (data.passiveListener != null) {
        if (typeof console !== "undefined" && typeof console.error === "function") {
          console.error(
            "Unable to preventDefault inside passive event listener invocation.",
            data.passiveListener
          );
        }
        return;
      }
      if (!data.event.cancelable) {
        return;
      }
      data.canceled = true;
      if (typeof data.event.preventDefault === "function") {
        data.event.preventDefault();
      }
    }
    function Event(eventTarget, event) {
      privateData.set(this, {
        eventTarget,
        event,
        eventPhase: 2,
        currentTarget: eventTarget,
        canceled: false,
        stopped: false,
        immediateStopped: false,
        passiveListener: null,
        timeStamp: event.timeStamp || Date.now()
      });
      Object.defineProperty(this, "isTrusted", { value: false, enumerable: true });
      const keys = Object.keys(event);
      for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];
        if (!(key in this)) {
          Object.defineProperty(this, key, defineRedirectDescriptor(key));
        }
      }
    }
    Event.prototype = {
      /**
       * The type of this event.
       * @type {string}
       */
      get type() {
        return pd(this).event.type;
      },
      /**
       * The target of this event.
       * @type {EventTarget}
       */
      get target() {
        return pd(this).eventTarget;
      },
      /**
       * The target of this event.
       * @type {EventTarget}
       */
      get currentTarget() {
        return pd(this).currentTarget;
      },
      /**
       * @returns {EventTarget[]} The composed path of this event.
       */
      composedPath() {
        const currentTarget = pd(this).currentTarget;
        if (currentTarget == null) {
          return [];
        }
        return [currentTarget];
      },
      /**
       * Constant of NONE.
       * @type {number}
       */
      get NONE() {
        return 0;
      },
      /**
       * Constant of CAPTURING_PHASE.
       * @type {number}
       */
      get CAPTURING_PHASE() {
        return 1;
      },
      /**
       * Constant of AT_TARGET.
       * @type {number}
       */
      get AT_TARGET() {
        return 2;
      },
      /**
       * Constant of BUBBLING_PHASE.
       * @type {number}
       */
      get BUBBLING_PHASE() {
        return 3;
      },
      /**
       * The target of this event.
       * @type {number}
       */
      get eventPhase() {
        return pd(this).eventPhase;
      },
      /**
       * Stop event bubbling.
       * @returns {void}
       */
      stopPropagation() {
        const data = pd(this);
        data.stopped = true;
        if (typeof data.event.stopPropagation === "function") {
          data.event.stopPropagation();
        }
      },
      /**
       * Stop event bubbling.
       * @returns {void}
       */
      stopImmediatePropagation() {
        const data = pd(this);
        data.stopped = true;
        data.immediateStopped = true;
        if (typeof data.event.stopImmediatePropagation === "function") {
          data.event.stopImmediatePropagation();
        }
      },
      /**
       * The flag to be bubbling.
       * @type {boolean}
       */
      get bubbles() {
        return Boolean(pd(this).event.bubbles);
      },
      /**
       * The flag to be cancelable.
       * @type {boolean}
       */
      get cancelable() {
        return Boolean(pd(this).event.cancelable);
      },
      /**
       * Cancel this event.
       * @returns {void}
       */
      preventDefault() {
        setCancelFlag(pd(this));
      },
      /**
       * The flag to indicate cancellation state.
       * @type {boolean}
       */
      get defaultPrevented() {
        return pd(this).canceled;
      },
      /**
       * The flag to be composed.
       * @type {boolean}
       */
      get composed() {
        return Boolean(pd(this).event.composed);
      },
      /**
       * The unix time of this event.
       * @type {number}
       */
      get timeStamp() {
        return pd(this).timeStamp;
      },
      /**
       * The target of this event.
       * @type {EventTarget}
       * @deprecated
       */
      get srcElement() {
        return pd(this).eventTarget;
      },
      /**
       * The flag to stop event bubbling.
       * @type {boolean}
       * @deprecated
       */
      get cancelBubble() {
        return pd(this).stopped;
      },
      set cancelBubble(value) {
        if (!value) {
          return;
        }
        const data = pd(this);
        data.stopped = true;
        if (typeof data.event.cancelBubble === "boolean") {
          data.event.cancelBubble = true;
        }
      },
      /**
       * The flag to indicate cancellation state.
       * @type {boolean}
       * @deprecated
       */
      get returnValue() {
        return !pd(this).canceled;
      },
      set returnValue(value) {
        if (!value) {
          setCancelFlag(pd(this));
        }
      },
      /**
       * Initialize this event object. But do nothing under event dispatching.
       * @param {string} type The event type.
       * @param {boolean} [bubbles=false] The flag to be possible to bubble up.
       * @param {boolean} [cancelable=false] The flag to be possible to cancel.
       * @deprecated
       */
      initEvent() {
      }
    };
    Object.defineProperty(Event.prototype, "constructor", {
      value: Event,
      configurable: true,
      writable: true
    });
    if (typeof window !== "undefined" && typeof window.Event !== "undefined") {
      Object.setPrototypeOf(Event.prototype, window.Event.prototype);
      wrappers.set(window.Event.prototype, Event);
    }
    function defineRedirectDescriptor(key) {
      return {
        get() {
          return pd(this).event[key];
        },
        set(value) {
          pd(this).event[key] = value;
        },
        configurable: true,
        enumerable: true
      };
    }
    function defineCallDescriptor(key) {
      return {
        value() {
          const event = pd(this).event;
          return event[key].apply(event, arguments);
        },
        configurable: true,
        enumerable: true
      };
    }
    function defineWrapper(BaseEvent, proto) {
      const keys = Object.keys(proto);
      if (keys.length === 0) {
        return BaseEvent;
      }
      function CustomEvent(eventTarget, event) {
        BaseEvent.call(this, eventTarget, event);
      }
      CustomEvent.prototype = Object.create(BaseEvent.prototype, {
        constructor: { value: CustomEvent, configurable: true, writable: true }
      });
      for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];
        if (!(key in BaseEvent.prototype)) {
          const descriptor = Object.getOwnPropertyDescriptor(proto, key);
          const isFunc = typeof descriptor.value === "function";
          Object.defineProperty(
            CustomEvent.prototype,
            key,
            isFunc ? defineCallDescriptor(key) : defineRedirectDescriptor(key)
          );
        }
      }
      return CustomEvent;
    }
    function getWrapper(proto) {
      if (proto == null || proto === Object.prototype) {
        return Event;
      }
      let wrapper = wrappers.get(proto);
      if (wrapper == null) {
        wrapper = defineWrapper(getWrapper(Object.getPrototypeOf(proto)), proto);
        wrappers.set(proto, wrapper);
      }
      return wrapper;
    }
    function wrapEvent(eventTarget, event) {
      const Wrapper = getWrapper(Object.getPrototypeOf(event));
      return new Wrapper(eventTarget, event);
    }
    function isStopped(event) {
      return pd(event).immediateStopped;
    }
    function setEventPhase(event, eventPhase) {
      pd(event).eventPhase = eventPhase;
    }
    function setCurrentTarget(event, currentTarget) {
      pd(event).currentTarget = currentTarget;
    }
    function setPassiveListener(event, passiveListener) {
      pd(event).passiveListener = passiveListener;
    }
    var listenersMap = /* @__PURE__ */ new WeakMap();
    var CAPTURE = 1;
    var BUBBLE = 2;
    var ATTRIBUTE = 3;
    function isObject(x) {
      return x !== null && typeof x === "object";
    }
    function getListeners(eventTarget) {
      const listeners = listenersMap.get(eventTarget);
      if (listeners == null) {
        throw new TypeError(
          "'this' is expected an EventTarget object, but got another value."
        );
      }
      return listeners;
    }
    function defineEventAttributeDescriptor(eventName) {
      return {
        get() {
          const listeners = getListeners(this);
          let node = listeners.get(eventName);
          while (node != null) {
            if (node.listenerType === ATTRIBUTE) {
              return node.listener;
            }
            node = node.next;
          }
          return null;
        },
        set(listener) {
          if (typeof listener !== "function" && !isObject(listener)) {
            listener = null;
          }
          const listeners = getListeners(this);
          let prev = null;
          let node = listeners.get(eventName);
          while (node != null) {
            if (node.listenerType === ATTRIBUTE) {
              if (prev !== null) {
                prev.next = node.next;
              } else if (node.next !== null) {
                listeners.set(eventName, node.next);
              } else {
                listeners.delete(eventName);
              }
            } else {
              prev = node;
            }
            node = node.next;
          }
          if (listener !== null) {
            const newNode = {
              listener,
              listenerType: ATTRIBUTE,
              passive: false,
              once: false,
              next: null
            };
            if (prev === null) {
              listeners.set(eventName, newNode);
            } else {
              prev.next = newNode;
            }
          }
        },
        configurable: true,
        enumerable: true
      };
    }
    function defineEventAttribute(eventTargetPrototype, eventName) {
      Object.defineProperty(
        eventTargetPrototype,
        `on${eventName}`,
        defineEventAttributeDescriptor(eventName)
      );
    }
    function defineCustomEventTarget(eventNames) {
      function CustomEventTarget() {
        EventTarget.call(this);
      }
      CustomEventTarget.prototype = Object.create(EventTarget.prototype, {
        constructor: {
          value: CustomEventTarget,
          configurable: true,
          writable: true
        }
      });
      for (let i = 0; i < eventNames.length; ++i) {
        defineEventAttribute(CustomEventTarget.prototype, eventNames[i]);
      }
      return CustomEventTarget;
    }
    function EventTarget() {
      if (this instanceof EventTarget) {
        listenersMap.set(this, /* @__PURE__ */ new Map());
        return;
      }
      if (arguments.length === 1 && Array.isArray(arguments[0])) {
        return defineCustomEventTarget(arguments[0]);
      }
      if (arguments.length > 0) {
        const types = new Array(arguments.length);
        for (let i = 0; i < arguments.length; ++i) {
          types[i] = arguments[i];
        }
        return defineCustomEventTarget(types);
      }
      throw new TypeError("Cannot call a class as a function");
    }
    EventTarget.prototype = {
      /**
       * Add a given listener to this event target.
       * @param {string} eventName The event name to add.
       * @param {Function} listener The listener to add.
       * @param {boolean|{capture?:boolean,passive?:boolean,once?:boolean}} [options] The options for this listener.
       * @returns {void}
       */
      addEventListener(eventName, listener, options) {
        if (listener == null) {
          return;
        }
        if (typeof listener !== "function" && !isObject(listener)) {
          throw new TypeError("'listener' should be a function or an object.");
        }
        const listeners = getListeners(this);
        const optionsIsObj = isObject(options);
        const capture = optionsIsObj ? Boolean(options.capture) : Boolean(options);
        const listenerType = capture ? CAPTURE : BUBBLE;
        const newNode = {
          listener,
          listenerType,
          passive: optionsIsObj && Boolean(options.passive),
          once: optionsIsObj && Boolean(options.once),
          next: null
        };
        let node = listeners.get(eventName);
        if (node === void 0) {
          listeners.set(eventName, newNode);
          return;
        }
        let prev = null;
        while (node != null) {
          if (node.listener === listener && node.listenerType === listenerType) {
            return;
          }
          prev = node;
          node = node.next;
        }
        prev.next = newNode;
      },
      /**
       * Remove a given listener from this event target.
       * @param {string} eventName The event name to remove.
       * @param {Function} listener The listener to remove.
       * @param {boolean|{capture?:boolean,passive?:boolean,once?:boolean}} [options] The options for this listener.
       * @returns {void}
       */
      removeEventListener(eventName, listener, options) {
        if (listener == null) {
          return;
        }
        const listeners = getListeners(this);
        const capture = isObject(options) ? Boolean(options.capture) : Boolean(options);
        const listenerType = capture ? CAPTURE : BUBBLE;
        let prev = null;
        let node = listeners.get(eventName);
        while (node != null) {
          if (node.listener === listener && node.listenerType === listenerType) {
            if (prev !== null) {
              prev.next = node.next;
            } else if (node.next !== null) {
              listeners.set(eventName, node.next);
            } else {
              listeners.delete(eventName);
            }
            return;
          }
          prev = node;
          node = node.next;
        }
      },
      /**
       * Dispatch a given event.
       * @param {Event|{type:string}} event The event to dispatch.
       * @returns {boolean} `false` if canceled.
       */
      dispatchEvent(event) {
        if (event == null || typeof event.type !== "string") {
          throw new TypeError('"event.type" should be a string.');
        }
        const listeners = getListeners(this);
        const eventName = event.type;
        let node = listeners.get(eventName);
        if (node == null) {
          return true;
        }
        const wrappedEvent = wrapEvent(this, event);
        let prev = null;
        while (node != null) {
          if (node.once) {
            if (prev !== null) {
              prev.next = node.next;
            } else if (node.next !== null) {
              listeners.set(eventName, node.next);
            } else {
              listeners.delete(eventName);
            }
          } else {
            prev = node;
          }
          setPassiveListener(
            wrappedEvent,
            node.passive ? node.listener : null
          );
          if (typeof node.listener === "function") {
            try {
              node.listener.call(this, wrappedEvent);
            } catch (err) {
              if (typeof console !== "undefined" && typeof console.error === "function") {
                console.error(err);
              }
            }
          } else if (node.listenerType !== ATTRIBUTE && typeof node.listener.handleEvent === "function") {
            node.listener.handleEvent(wrappedEvent);
          }
          if (isStopped(wrappedEvent)) {
            break;
          }
          node = node.next;
        }
        setPassiveListener(wrappedEvent, null);
        setEventPhase(wrappedEvent, 0);
        setCurrentTarget(wrappedEvent, null);
        return !wrappedEvent.defaultPrevented;
      }
    };
    Object.defineProperty(EventTarget.prototype, "constructor", {
      value: EventTarget,
      configurable: true,
      writable: true
    });
    if (typeof window !== "undefined" && typeof window.EventTarget !== "undefined") {
      Object.setPrototypeOf(EventTarget.prototype, window.EventTarget.prototype);
    }
    exports.defineEventAttribute = defineEventAttribute;
    exports.EventTarget = EventTarget;
    exports.default = EventTarget;
    module.exports = EventTarget;
    module.exports.EventTarget = module.exports["default"] = EventTarget;
    module.exports.defineEventAttribute = defineEventAttribute;
  }
});

// ../../node_modules/abort-controller/dist/abort-controller.js
var require_abort_controller = __commonJS({
  "../../node_modules/abort-controller/dist/abort-controller.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var eventTargetShim = require_event_target_shim();
    var AbortSignal = class extends eventTargetShim.EventTarget {
      /**
       * AbortSignal cannot be constructed directly.
       */
      constructor() {
        super();
        throw new TypeError("AbortSignal cannot be constructed directly");
      }
      /**
       * Returns `true` if this `AbortSignal`'s `AbortController` has signaled to abort, and `false` otherwise.
       */
      get aborted() {
        const aborted = abortedFlags.get(this);
        if (typeof aborted !== "boolean") {
          throw new TypeError(`Expected 'this' to be an 'AbortSignal' object, but got ${this === null ? "null" : typeof this}`);
        }
        return aborted;
      }
    };
    eventTargetShim.defineEventAttribute(AbortSignal.prototype, "abort");
    function createAbortSignal() {
      const signal = Object.create(AbortSignal.prototype);
      eventTargetShim.EventTarget.call(signal);
      abortedFlags.set(signal, false);
      return signal;
    }
    function abortSignal(signal) {
      if (abortedFlags.get(signal) !== false) {
        return;
      }
      abortedFlags.set(signal, true);
      signal.dispatchEvent({ type: "abort" });
    }
    var abortedFlags = /* @__PURE__ */ new WeakMap();
    Object.defineProperties(AbortSignal.prototype, {
      aborted: { enumerable: true }
    });
    if (typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol") {
      Object.defineProperty(AbortSignal.prototype, Symbol.toStringTag, {
        configurable: true,
        value: "AbortSignal"
      });
    }
    var AbortController2 = class {
      /**
       * Initialize this controller.
       */
      constructor() {
        signals.set(this, createAbortSignal());
      }
      /**
       * Returns the `AbortSignal` object associated with this object.
       */
      get signal() {
        return getSignal(this);
      }
      /**
       * Abort and signal to any observers that the associated activity is to be aborted.
       */
      abort() {
        abortSignal(getSignal(this));
      }
    };
    var signals = /* @__PURE__ */ new WeakMap();
    function getSignal(controller) {
      const signal = signals.get(controller);
      if (signal == null) {
        throw new TypeError(`Expected 'this' to be an 'AbortController' object, but got ${controller === null ? "null" : typeof controller}`);
      }
      return signal;
    }
    Object.defineProperties(AbortController2.prototype, {
      signal: { enumerable: true },
      abort: { enumerable: true }
    });
    if (typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol") {
      Object.defineProperty(AbortController2.prototype, Symbol.toStringTag, {
        configurable: true,
        value: "AbortController"
      });
    }
    exports.AbortController = AbortController2;
    exports.AbortSignal = AbortSignal;
    exports.default = AbortController2;
    module.exports = AbortController2;
    module.exports.AbortController = module.exports["default"] = AbortController2;
    module.exports.AbortSignal = AbortSignal;
  }
});

// ../../node_modules/deepmerge/dist/cjs.js
var require_cjs = __commonJS({
  "../../node_modules/deepmerge/dist/cjs.js"(exports, module) {
    "use strict";
    var isMergeableObject = function isMergeableObject2(value) {
      return isNonNullObject(value) && !isSpecial(value);
    };
    function isNonNullObject(value) {
      return !!value && typeof value === "object";
    }
    function isSpecial(value) {
      var stringValue = Object.prototype.toString.call(value);
      return stringValue === "[object RegExp]" || stringValue === "[object Date]" || isReactElement(value);
    }
    var canUseSymbol = typeof Symbol === "function" && Symbol.for;
    var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for("react.element") : 60103;
    function isReactElement(value) {
      return value.$$typeof === REACT_ELEMENT_TYPE;
    }
    function emptyTarget(val) {
      return Array.isArray(val) ? [] : {};
    }
    function cloneUnlessOtherwiseSpecified(value, options) {
      return options.clone !== false && options.isMergeableObject(value) ? deepmerge(emptyTarget(value), value, options) : value;
    }
    function defaultArrayMerge(target, source, options) {
      return target.concat(source).map(function(element) {
        return cloneUnlessOtherwiseSpecified(element, options);
      });
    }
    function getMergeFunction(key, options) {
      if (!options.customMerge) {
        return deepmerge;
      }
      var customMerge = options.customMerge(key);
      return typeof customMerge === "function" ? customMerge : deepmerge;
    }
    function getEnumerableOwnPropertySymbols(target) {
      return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function(symbol) {
        return Object.propertyIsEnumerable.call(target, symbol);
      }) : [];
    }
    function getKeys(target) {
      return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
    }
    function propertyIsOnObject(object, property) {
      try {
        return property in object;
      } catch (_) {
        return false;
      }
    }
    function propertyIsUnsafe(target, key) {
      return propertyIsOnObject(target, key) && !(Object.hasOwnProperty.call(target, key) && Object.propertyIsEnumerable.call(target, key));
    }
    function mergeObject(target, source, options) {
      var destination = {};
      if (options.isMergeableObject(target)) {
        getKeys(target).forEach(function(key) {
          destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
        });
      }
      getKeys(source).forEach(function(key) {
        if (propertyIsUnsafe(target, key)) {
          return;
        }
        if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
          destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
        } else {
          destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
        }
      });
      return destination;
    }
    function deepmerge(target, source, options) {
      options = options || {};
      options.arrayMerge = options.arrayMerge || defaultArrayMerge;
      options.isMergeableObject = options.isMergeableObject || isMergeableObject;
      options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
      var sourceIsArray = Array.isArray(source);
      var targetIsArray = Array.isArray(target);
      var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
      if (!sourceAndTargetTypesMatch) {
        return cloneUnlessOtherwiseSpecified(source, options);
      } else if (sourceIsArray) {
        return options.arrayMerge(target, source, options);
      } else {
        return mergeObject(target, source, options);
      }
    }
    deepmerge.all = function deepmergeAll(array, options) {
      if (!Array.isArray(array)) {
        throw new Error("first argument should be an array");
      }
      return array.reduce(function(prev, next) {
        return deepmerge(prev, next, options);
      }, {});
    };
    var deepmerge_1 = deepmerge;
    module.exports = deepmerge_1;
  }
});

// src/services/speech.ts
import { PassThrough } from "stream";
import { Readable } from "node:stream";
import { ReadableStream } from "node:stream/web";
import { ServiceType } from "@elizaos/core";

// src/services/audioUtils.ts
function getWavHeader(audioLength, sampleRate, channelCount = 1, bitsPerSample = 16) {
  const wavHeader = Buffer.alloc(44);
  wavHeader.write("RIFF", 0);
  wavHeader.writeUInt32LE(36 + audioLength, 4);
  wavHeader.write("WAVE", 8);
  wavHeader.write("fmt ", 12);
  wavHeader.writeUInt32LE(16, 16);
  wavHeader.writeUInt16LE(1, 20);
  wavHeader.writeUInt16LE(channelCount, 22);
  wavHeader.writeUInt32LE(sampleRate, 24);
  wavHeader.writeUInt32LE(
    sampleRate * bitsPerSample * channelCount / 8,
    28
  );
  wavHeader.writeUInt16LE(bitsPerSample * channelCount / 8, 32);
  wavHeader.writeUInt16LE(bitsPerSample, 34);
  wavHeader.write("data", 36);
  wavHeader.writeUInt32LE(audioLength, 40);
  return wavHeader;
}

// src/services/speech.ts
import { Service } from "@elizaos/core";

// src/environment.ts
import { z } from "zod";
var nodeEnvSchema = z.object({
  OPENAI_API_KEY: z.string().min(1, "OpenAI API key is required"),
  // Core settings
  ELEVENLABS_XI_API_KEY: z.string().optional(),
  // All other settings optional with defaults
  ELEVENLABS_MODEL_ID: z.string().optional(),
  ELEVENLABS_VOICE_ID: z.string().optional(),
  ELEVENLABS_VOICE_STABILITY: z.string().optional(),
  ELEVENLABS_VOICE_SIMILARITY_BOOST: z.string().optional(),
  ELEVENLABS_VOICE_STYLE: z.string().optional(),
  ELEVENLABS_VOICE_USE_SPEAKER_BOOST: z.string().optional(),
  ELEVENLABS_OPTIMIZE_STREAMING_LATENCY: z.string().optional(),
  ELEVENLABS_OUTPUT_FORMAT: z.string().optional(),
  VITS_VOICE: z.string().optional(),
  VITS_MODEL: z.string().optional()
});
async function validateNodeConfig(runtime) {
  try {
    const voiceSettings = runtime.character.settings?.voice;
    const elevenlabs = voiceSettings?.elevenlabs;
    const config = {
      OPENAI_API_KEY: runtime.getSetting("OPENAI_API_KEY") || process.env.OPENAI_API_KEY,
      ELEVENLABS_XI_API_KEY: runtime.getSetting("ELEVENLABS_XI_API_KEY") || process.env.ELEVENLABS_XI_API_KEY,
      // Use character card settings first, fall back to env vars, then defaults
      ...runtime.getSetting("ELEVENLABS_XI_API_KEY") && {
        ELEVENLABS_MODEL_ID: elevenlabs?.model || process.env.ELEVENLABS_MODEL_ID || "eleven_monolingual_v1",
        ELEVENLABS_VOICE_ID: elevenlabs?.voiceId || process.env.ELEVENLABS_VOICE_ID,
        ELEVENLABS_VOICE_STABILITY: elevenlabs?.stability || process.env.ELEVENLABS_VOICE_STABILITY || "0.5",
        ELEVENLABS_VOICE_SIMILARITY_BOOST: elevenlabs?.similarityBoost || process.env.ELEVENLABS_VOICE_SIMILARITY_BOOST || "0.75",
        ELEVENLABS_VOICE_STYLE: elevenlabs?.style || process.env.ELEVENLABS_VOICE_STYLE || "0",
        ELEVENLABS_VOICE_USE_SPEAKER_BOOST: elevenlabs?.useSpeakerBoost || process.env.ELEVENLABS_VOICE_USE_SPEAKER_BOOST || "true",
        ELEVENLABS_OPTIMIZE_STREAMING_LATENCY: process.env.ELEVENLABS_OPTIMIZE_STREAMING_LATENCY || "0",
        ELEVENLABS_OUTPUT_FORMAT: process.env.ELEVENLABS_OUTPUT_FORMAT || "pcm_16000"
      },
      // VITS settings
      VITS_VOICE: voiceSettings?.model || process.env.VITS_VOICE,
      VITS_MODEL: process.env.VITS_MODEL
      // AWS settings (only include if presen
    };
    return nodeEnvSchema.parse(config);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map((err) => `${err.path.join(".")}: ${err.message}`).join("\n");
      throw new Error(
        `Node configuration validation failed:
${errorMessages}`
      );
    }
    throw error;
  }
}

// src/services/speech.ts
import * as Echogarden from "echogarden";
import { elizaLogger } from "@elizaos/core";
function prependWavHeader(readable, audioLength, sampleRate, channelCount = 1, bitsPerSample = 16) {
  const wavHeader = getWavHeader(
    audioLength,
    sampleRate,
    channelCount,
    bitsPerSample
  );
  let pushedHeader = false;
  const passThrough = new PassThrough();
  readable.on("data", function(data) {
    if (!pushedHeader) {
      passThrough.push(wavHeader);
      pushedHeader = true;
    }
    passThrough.push(data);
  });
  readable.on("end", function() {
    passThrough.end();
  });
  return passThrough;
}
async function getVoiceSettings(runtime) {
  const hasElevenLabs = !!runtime.getSetting("ELEVENLABS_XI_API_KEY");
  const useVits = !hasElevenLabs;
  const voiceSettings = runtime.character.settings?.voice;
  const elevenlabsSettings = voiceSettings?.elevenlabs;
  elizaLogger.debug("Voice settings:", {
    hasElevenLabs,
    useVits,
    voiceSettings,
    elevenlabsSettings
  });
  return {
    elevenlabsVoiceId: elevenlabsSettings?.voiceId || runtime.getSetting("ELEVENLABS_VOICE_ID"),
    elevenlabsModel: elevenlabsSettings?.model || runtime.getSetting("ELEVENLABS_MODEL_ID") || "eleven_monolingual_v1",
    elevenlabsStability: elevenlabsSettings?.stability || runtime.getSetting("ELEVENLABS_VOICE_STABILITY") || "0.5",
    // ... other ElevenLabs settings ...
    vitsVoice: voiceSettings?.model || voiceSettings?.url || runtime.getSetting("VITS_VOICE") || "en_US-hfc_female-medium",
    useVits
  };
}
async function textToSpeech(runtime, text) {
  await validateNodeConfig(runtime);
  const { elevenlabsVoiceId } = await getVoiceSettings(runtime);
  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${elevenlabsVoiceId}/stream?optimize_streaming_latency=${runtime.getSetting("ELEVENLABS_OPTIMIZE_STREAMING_LATENCY")}&output_format=${runtime.getSetting("ELEVENLABS_OUTPUT_FORMAT")}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": runtime.getSetting("ELEVENLABS_XI_API_KEY")
        },
        body: JSON.stringify({
          model_id: runtime.getSetting("ELEVENLABS_MODEL_ID"),
          text,
          voice_settings: {
            similarity_boost: runtime.getSetting(
              "ELEVENLABS_VOICE_SIMILARITY_BOOST"
            ),
            stability: runtime.getSetting(
              "ELEVENLABS_VOICE_STABILITY"
            ),
            style: runtime.getSetting("ELEVENLABS_VOICE_STYLE"),
            use_speaker_boost: runtime.getSetting(
              "ELEVENLABS_VOICE_USE_SPEAKER_BOOST"
            )
          }
        })
      }
    );
    const status = response.status;
    if (status != 200) {
      const errorBodyString = await response.text();
      const errorBody = JSON.parse(errorBodyString);
      if (status === 401 && errorBody.detail?.status === "quota_exceeded") {
        elizaLogger.log(
          "ElevenLabs quota exceeded, falling back to VITS"
        );
        throw new Error("QUOTA_EXCEEDED");
      }
      throw new Error(
        `Received status ${status} from Eleven Labs API: ${errorBodyString}`
      );
    }
    if (response) {
      const webStream = ReadableStream.from(
        response.body
      );
      const reader = webStream.getReader();
      const readable = new Readable({
        read() {
          reader.read().then(({ done, value }) => {
            if (done) {
              this.push(null);
            } else {
              this.push(value);
            }
          });
        }
      });
      if (runtime.getSetting("ELEVENLABS_OUTPUT_FORMAT").startsWith("pcm_")) {
        const sampleRate = parseInt(
          runtime.getSetting("ELEVENLABS_OUTPUT_FORMAT").substring(4)
        );
        const withHeader = prependWavHeader(
          readable,
          1024 * 1024 * 100,
          sampleRate,
          1,
          16
        );
        return withHeader;
      } else {
        return readable;
      }
    } else {
      return new Readable({
        read() {
        }
      });
    }
  } catch (error) {
    if (error.message === "QUOTA_EXCEEDED") {
      const { vitsVoice } = await getVoiceSettings(runtime);
      const { audio } = await Echogarden.synthesize(text, {
        engine: "vits",
        voice: vitsVoice
      });
      let wavStream;
      if (audio instanceof Buffer) {
        elizaLogger.log("audio is a buffer");
        wavStream = Readable.from(audio);
      } else if ("audioChannels" in audio && "sampleRate" in audio) {
        elizaLogger.log("audio is a RawAudio");
        const floatBuffer = Buffer.from(audio.audioChannels[0].buffer);
        elizaLogger.log("buffer length: ", floatBuffer.length);
        const sampleRate = audio.sampleRate;
        const floatArray = new Float32Array(floatBuffer.buffer);
        const pcmBuffer = new Int16Array(floatArray.length);
        for (let i = 0; i < floatArray.length; i++) {
          pcmBuffer[i] = Math.round(floatArray[i] * 32767);
        }
        const wavHeaderBuffer = getWavHeader(
          pcmBuffer.length * 2,
          sampleRate,
          1,
          16
        );
        const wavBuffer = Buffer.concat([
          wavHeaderBuffer,
          Buffer.from(pcmBuffer.buffer)
        ]);
        wavStream = Readable.from(wavBuffer);
      } else {
        throw new Error("Unsupported audio format");
      }
      return wavStream;
    }
    throw error;
  }
}
async function processVitsAudio(audio) {
  let wavStream;
  if (audio instanceof Buffer) {
    elizaLogger.log("audio is a buffer");
    wavStream = Readable.from(audio);
  } else if ("audioChannels" in audio && "sampleRate" in audio) {
    elizaLogger.log("audio is a RawAudio");
    const floatBuffer = Buffer.from(audio.audioChannels[0].buffer);
    elizaLogger.log("buffer length: ", floatBuffer.length);
    const sampleRate = audio.sampleRate;
    const floatArray = new Float32Array(floatBuffer.buffer);
    const pcmBuffer = new Int16Array(floatArray.length);
    for (let i = 0; i < floatArray.length; i++) {
      pcmBuffer[i] = Math.round(floatArray[i] * 32767);
    }
    const wavHeaderBuffer = getWavHeader(
      pcmBuffer.length * 2,
      sampleRate,
      1,
      16
    );
    const wavBuffer = Buffer.concat([
      wavHeaderBuffer,
      Buffer.from(pcmBuffer.buffer)
    ]);
    wavStream = Readable.from(wavBuffer);
  } else {
    throw new Error("Unsupported audio format");
  }
  return wavStream;
}
async function generateVitsAudio(runtime, text) {
  const { vitsVoice } = await getVoiceSettings(runtime);
  const { audio } = await Echogarden.synthesize(text, {
    engine: "vits",
    voice: vitsVoice
  });
  return processVitsAudio(audio);
}
var SpeechService = class _SpeechService extends Service {
  static serviceType = ServiceType.SPEECH_GENERATION;
  async initialize(_runtime) {
  }
  getInstance() {
    return _SpeechService.getInstance();
  }
  async generate(runtime, text) {
    try {
      const { useVits } = await getVoiceSettings(runtime);
      if (useVits || !runtime.getSetting("ELEVENLABS_XI_API_KEY")) {
        return await generateVitsAudio(runtime, text);
      }
      return await textToSpeech(runtime, text);
    } catch (error) {
      console.error("Speech generation error:", error);
      return await generateVitsAudio(runtime, text);
    }
  }
};

// src/services/transcription.ts
import {
  elizaLogger as elizaLogger2,
  settings,
  TranscriptionProvider
} from "@elizaos/core";
import { Service as Service2, ServiceType as ServiceType2 } from "@elizaos/core";
import { exec } from "child_process";

// ../../node_modules/formdata-node/lib/esm/FormData.js
import { inspect } from "util";

// ../../node_modules/formdata-node/lib/esm/isBlob.js
var isBlob = (value) => value instanceof Blob2;

// ../../node_modules/formdata-node/lib/esm/deprecateConstructorEntries.js
import { deprecate } from "util";
var deprecateConstructorEntries = deprecate(() => {
}, 'Constructor "entries" argument is not spec-compliant and will be removed in next major release.');

// ../../node_modules/formdata-node/lib/esm/FormData.js
var __classPrivateFieldGet = function(receiver, state, kind2, f) {
  if (kind2 === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind2 === "m" ? f : kind2 === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _FormData_instances;
var _FormData_entries;
var _FormData_setEntry;
var FormData = class {
  constructor(entries) {
    _FormData_instances.add(this);
    _FormData_entries.set(this, /* @__PURE__ */ new Map());
    if (entries) {
      deprecateConstructorEntries();
      entries.forEach(({ name, value, fileName }) => this.append(name, value, fileName));
    }
  }
  static [(_FormData_entries = /* @__PURE__ */ new WeakMap(), _FormData_instances = /* @__PURE__ */ new WeakSet(), Symbol.hasInstance)](value) {
    return Boolean(value && isFunction(value.constructor) && value[Symbol.toStringTag] === "FormData" && isFunction(value.append) && isFunction(value.set) && isFunction(value.get) && isFunction(value.getAll) && isFunction(value.has) && isFunction(value.delete) && isFunction(value.entries) && isFunction(value.values) && isFunction(value.keys) && isFunction(value[Symbol.iterator]) && isFunction(value.forEach));
  }
  append(name, value, fileName) {
    __classPrivateFieldGet(this, _FormData_instances, "m", _FormData_setEntry).call(this, {
      name,
      fileName,
      append: true,
      rawValue: value,
      argsLength: arguments.length
    });
  }
  set(name, value, fileName) {
    __classPrivateFieldGet(this, _FormData_instances, "m", _FormData_setEntry).call(this, {
      name,
      fileName,
      append: false,
      rawValue: value,
      argsLength: arguments.length
    });
  }
  get(name) {
    const field = __classPrivateFieldGet(this, _FormData_entries, "f").get(String(name));
    if (!field) {
      return null;
    }
    return field[0];
  }
  getAll(name) {
    const field = __classPrivateFieldGet(this, _FormData_entries, "f").get(String(name));
    if (!field) {
      return [];
    }
    return field.slice();
  }
  has(name) {
    return __classPrivateFieldGet(this, _FormData_entries, "f").has(String(name));
  }
  delete(name) {
    __classPrivateFieldGet(this, _FormData_entries, "f").delete(String(name));
  }
  *keys() {
    for (const key of __classPrivateFieldGet(this, _FormData_entries, "f").keys()) {
      yield key;
    }
  }
  *entries() {
    for (const name of this.keys()) {
      const values = this.getAll(name);
      for (const value of values) {
        yield [name, value];
      }
    }
  }
  *values() {
    for (const [, value] of this) {
      yield value;
    }
  }
  [(_FormData_setEntry = function _FormData_setEntry2({ name, rawValue, append, fileName, argsLength }) {
    const methodName = append ? "append" : "set";
    if (argsLength < 2) {
      throw new TypeError(`Failed to execute '${methodName}' on 'FormData': 2 arguments required, but only ${argsLength} present.`);
    }
    name = String(name);
    let value;
    if (isFile(rawValue)) {
      value = fileName === void 0 ? rawValue : new File([rawValue], fileName, {
        type: rawValue.type,
        lastModified: rawValue.lastModified
      });
    } else if (isBlob(rawValue)) {
      value = new File([rawValue], fileName === void 0 ? "blob" : fileName, {
        type: rawValue.type
      });
    } else if (fileName) {
      throw new TypeError(`Failed to execute '${methodName}' on 'FormData': parameter 2 is not of type 'Blob'.`);
    } else {
      value = String(rawValue);
    }
    const values = __classPrivateFieldGet(this, _FormData_entries, "f").get(name);
    if (!values) {
      return void __classPrivateFieldGet(this, _FormData_entries, "f").set(name, [value]);
    }
    if (!append) {
      return void __classPrivateFieldGet(this, _FormData_entries, "f").set(name, [value]);
    }
    values.push(value);
  }, Symbol.iterator)]() {
    return this.entries();
  }
  forEach(callback, thisArg) {
    for (const [name, value] of this) {
      callback.call(thisArg, value, name, this);
    }
  }
  get [Symbol.toStringTag]() {
    return "FormData";
  }
  [inspect.custom]() {
    return this[Symbol.toStringTag];
  }
};

// src/services/transcription.ts
var import_nodejs_whisper = __toESM(require_dist(), 1);
import fs from "fs";

// ../../node_modules/openai/internal/qs/formats.mjs
var default_format = "RFC3986";
var formatters = {
  RFC1738: (v) => String(v).replace(/%20/g, "+"),
  RFC3986: (v) => String(v)
};
var RFC1738 = "RFC1738";

// ../../node_modules/openai/internal/qs/utils.mjs
var is_array = Array.isArray;
var hex_table = (() => {
  const array = [];
  for (let i = 0; i < 256; ++i) {
    array.push("%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase());
  }
  return array;
})();
var limit = 1024;
var encode = (str2, _defaultEncoder, charset, _kind, format) => {
  if (str2.length === 0) {
    return str2;
  }
  let string = str2;
  if (typeof str2 === "symbol") {
    string = Symbol.prototype.toString.call(str2);
  } else if (typeof str2 !== "string") {
    string = String(str2);
  }
  if (charset === "iso-8859-1") {
    return escape(string).replace(/%u[0-9a-f]{4}/gi, function($0) {
      return "%26%23" + parseInt($0.slice(2), 16) + "%3B";
    });
  }
  let out = "";
  for (let j = 0; j < string.length; j += limit) {
    const segment = string.length >= limit ? string.slice(j, j + limit) : string;
    const arr = [];
    for (let i = 0; i < segment.length; ++i) {
      let c = segment.charCodeAt(i);
      if (c === 45 || // -
      c === 46 || // .
      c === 95 || // _
      c === 126 || // ~
      c >= 48 && c <= 57 || // 0-9
      c >= 65 && c <= 90 || // a-z
      c >= 97 && c <= 122 || // A-Z
      format === RFC1738 && (c === 40 || c === 41)) {
        arr[arr.length] = segment.charAt(i);
        continue;
      }
      if (c < 128) {
        arr[arr.length] = hex_table[c];
        continue;
      }
      if (c < 2048) {
        arr[arr.length] = hex_table[192 | c >> 6] + hex_table[128 | c & 63];
        continue;
      }
      if (c < 55296 || c >= 57344) {
        arr[arr.length] = hex_table[224 | c >> 12] + hex_table[128 | c >> 6 & 63] + hex_table[128 | c & 63];
        continue;
      }
      i += 1;
      c = 65536 + ((c & 1023) << 10 | segment.charCodeAt(i) & 1023);
      arr[arr.length] = hex_table[240 | c >> 18] + hex_table[128 | c >> 12 & 63] + hex_table[128 | c >> 6 & 63] + hex_table[128 | c & 63];
    }
    out += arr.join("");
  }
  return out;
};
function is_buffer(obj) {
  if (!obj || typeof obj !== "object") {
    return false;
  }
  return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
}
function maybe_map(val, fn) {
  if (is_array(val)) {
    const mapped = [];
    for (let i = 0; i < val.length; i += 1) {
      mapped.push(fn(val[i]));
    }
    return mapped;
  }
  return fn(val);
}

// ../../node_modules/openai/internal/qs/stringify.mjs
var has = Object.prototype.hasOwnProperty;
var array_prefix_generators = {
  brackets(prefix) {
    return String(prefix) + "[]";
  },
  comma: "comma",
  indices(prefix, key) {
    return String(prefix) + "[" + key + "]";
  },
  repeat(prefix) {
    return String(prefix);
  }
};
var is_array2 = Array.isArray;
var push = Array.prototype.push;
var push_to_array = function(arr, value_or_array) {
  push.apply(arr, is_array2(value_or_array) ? value_or_array : [value_or_array]);
};
var to_ISO = Date.prototype.toISOString;
var defaults = {
  addQueryPrefix: false,
  allowDots: false,
  allowEmptyArrays: false,
  arrayFormat: "indices",
  charset: "utf-8",
  charsetSentinel: false,
  delimiter: "&",
  encode: true,
  encodeDotInKeys: false,
  encoder: encode,
  encodeValuesOnly: false,
  format: default_format,
  formatter: formatters[default_format],
  /** @deprecated */
  indices: false,
  serializeDate(date) {
    return to_ISO.call(date);
  },
  skipNulls: false,
  strictNullHandling: false
};
function is_non_nullish_primitive(v) {
  return typeof v === "string" || typeof v === "number" || typeof v === "boolean" || typeof v === "symbol" || typeof v === "bigint";
}
var sentinel = {};
function inner_stringify(object, prefix, generateArrayPrefix, commaRoundTrip, allowEmptyArrays, strictNullHandling, skipNulls, encodeDotInKeys, encoder, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, sideChannel) {
  let obj = object;
  let tmp_sc = sideChannel;
  let step = 0;
  let find_flag = false;
  while ((tmp_sc = tmp_sc.get(sentinel)) !== void 0 && !find_flag) {
    const pos = tmp_sc.get(object);
    step += 1;
    if (typeof pos !== "undefined") {
      if (pos === step) {
        throw new RangeError("Cyclic object value");
      } else {
        find_flag = true;
      }
    }
    if (typeof tmp_sc.get(sentinel) === "undefined") {
      step = 0;
    }
  }
  if (typeof filter === "function") {
    obj = filter(prefix, obj);
  } else if (obj instanceof Date) {
    obj = serializeDate?.(obj);
  } else if (generateArrayPrefix === "comma" && is_array2(obj)) {
    obj = maybe_map(obj, function(value) {
      if (value instanceof Date) {
        return serializeDate?.(value);
      }
      return value;
    });
  }
  if (obj === null) {
    if (strictNullHandling) {
      return encoder && !encodeValuesOnly ? (
        // @ts-expect-error
        encoder(prefix, defaults.encoder, charset, "key", format)
      ) : prefix;
    }
    obj = "";
  }
  if (is_non_nullish_primitive(obj) || is_buffer(obj)) {
    if (encoder) {
      const key_value = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, "key", format);
      return [
        formatter?.(key_value) + "=" + // @ts-expect-error
        formatter?.(encoder(obj, defaults.encoder, charset, "value", format))
      ];
    }
    return [formatter?.(prefix) + "=" + formatter?.(String(obj))];
  }
  const values = [];
  if (typeof obj === "undefined") {
    return values;
  }
  let obj_keys;
  if (generateArrayPrefix === "comma" && is_array2(obj)) {
    if (encodeValuesOnly && encoder) {
      obj = maybe_map(obj, encoder);
    }
    obj_keys = [{ value: obj.length > 0 ? obj.join(",") || null : void 0 }];
  } else if (is_array2(filter)) {
    obj_keys = filter;
  } else {
    const keys = Object.keys(obj);
    obj_keys = sort ? keys.sort(sort) : keys;
  }
  const encoded_prefix = encodeDotInKeys ? String(prefix).replace(/\./g, "%2E") : String(prefix);
  const adjusted_prefix = commaRoundTrip && is_array2(obj) && obj.length === 1 ? encoded_prefix + "[]" : encoded_prefix;
  if (allowEmptyArrays && is_array2(obj) && obj.length === 0) {
    return adjusted_prefix + "[]";
  }
  for (let j = 0; j < obj_keys.length; ++j) {
    const key = obj_keys[j];
    const value = (
      // @ts-ignore
      typeof key === "object" && typeof key.value !== "undefined" ? key.value : obj[key]
    );
    if (skipNulls && value === null) {
      continue;
    }
    const encoded_key = allowDots && encodeDotInKeys ? key.replace(/\./g, "%2E") : key;
    const key_prefix = is_array2(obj) ? typeof generateArrayPrefix === "function" ? generateArrayPrefix(adjusted_prefix, encoded_key) : adjusted_prefix : adjusted_prefix + (allowDots ? "." + encoded_key : "[" + encoded_key + "]");
    sideChannel.set(object, step);
    const valueSideChannel = /* @__PURE__ */ new WeakMap();
    valueSideChannel.set(sentinel, sideChannel);
    push_to_array(values, inner_stringify(
      value,
      key_prefix,
      generateArrayPrefix,
      commaRoundTrip,
      allowEmptyArrays,
      strictNullHandling,
      skipNulls,
      encodeDotInKeys,
      // @ts-ignore
      generateArrayPrefix === "comma" && encodeValuesOnly && is_array2(obj) ? null : encoder,
      filter,
      sort,
      allowDots,
      serializeDate,
      format,
      formatter,
      encodeValuesOnly,
      charset,
      valueSideChannel
    ));
  }
  return values;
}
function normalize_stringify_options(opts = defaults) {
  if (typeof opts.allowEmptyArrays !== "undefined" && typeof opts.allowEmptyArrays !== "boolean") {
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  }
  if (typeof opts.encodeDotInKeys !== "undefined" && typeof opts.encodeDotInKeys !== "boolean") {
    throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
  }
  if (opts.encoder !== null && typeof opts.encoder !== "undefined" && typeof opts.encoder !== "function") {
    throw new TypeError("Encoder has to be a function.");
  }
  const charset = opts.charset || defaults.charset;
  if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  }
  let format = default_format;
  if (typeof opts.format !== "undefined") {
    if (!has.call(formatters, opts.format)) {
      throw new TypeError("Unknown format option provided.");
    }
    format = opts.format;
  }
  const formatter = formatters[format];
  let filter = defaults.filter;
  if (typeof opts.filter === "function" || is_array2(opts.filter)) {
    filter = opts.filter;
  }
  let arrayFormat;
  if (opts.arrayFormat && opts.arrayFormat in array_prefix_generators) {
    arrayFormat = opts.arrayFormat;
  } else if ("indices" in opts) {
    arrayFormat = opts.indices ? "indices" : "repeat";
  } else {
    arrayFormat = defaults.arrayFormat;
  }
  if ("commaRoundTrip" in opts && typeof opts.commaRoundTrip !== "boolean") {
    throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
  }
  const allowDots = typeof opts.allowDots === "undefined" ? !!opts.encodeDotInKeys === true ? true : defaults.allowDots : !!opts.allowDots;
  return {
    addQueryPrefix: typeof opts.addQueryPrefix === "boolean" ? opts.addQueryPrefix : defaults.addQueryPrefix,
    // @ts-ignore
    allowDots,
    allowEmptyArrays: typeof opts.allowEmptyArrays === "boolean" ? !!opts.allowEmptyArrays : defaults.allowEmptyArrays,
    arrayFormat,
    charset,
    charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
    commaRoundTrip: !!opts.commaRoundTrip,
    delimiter: typeof opts.delimiter === "undefined" ? defaults.delimiter : opts.delimiter,
    encode: typeof opts.encode === "boolean" ? opts.encode : defaults.encode,
    encodeDotInKeys: typeof opts.encodeDotInKeys === "boolean" ? opts.encodeDotInKeys : defaults.encodeDotInKeys,
    encoder: typeof opts.encoder === "function" ? opts.encoder : defaults.encoder,
    encodeValuesOnly: typeof opts.encodeValuesOnly === "boolean" ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
    filter,
    format,
    formatter,
    serializeDate: typeof opts.serializeDate === "function" ? opts.serializeDate : defaults.serializeDate,
    skipNulls: typeof opts.skipNulls === "boolean" ? opts.skipNulls : defaults.skipNulls,
    // @ts-ignore
    sort: typeof opts.sort === "function" ? opts.sort : null,
    strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
  };
}
function stringify(object, opts = {}) {
  let obj = object;
  const options = normalize_stringify_options(opts);
  let obj_keys;
  let filter;
  if (typeof options.filter === "function") {
    filter = options.filter;
    obj = filter("", obj);
  } else if (is_array2(options.filter)) {
    filter = options.filter;
    obj_keys = filter;
  }
  const keys = [];
  if (typeof obj !== "object" || obj === null) {
    return "";
  }
  const generateArrayPrefix = array_prefix_generators[options.arrayFormat];
  const commaRoundTrip = generateArrayPrefix === "comma" && options.commaRoundTrip;
  if (!obj_keys) {
    obj_keys = Object.keys(obj);
  }
  if (options.sort) {
    obj_keys.sort(options.sort);
  }
  const sideChannel = /* @__PURE__ */ new WeakMap();
  for (let i = 0; i < obj_keys.length; ++i) {
    const key = obj_keys[i];
    if (options.skipNulls && obj[key] === null) {
      continue;
    }
    push_to_array(keys, inner_stringify(
      obj[key],
      key,
      // @ts-expect-error
      generateArrayPrefix,
      commaRoundTrip,
      options.allowEmptyArrays,
      options.strictNullHandling,
      options.skipNulls,
      options.encodeDotInKeys,
      options.encode ? options.encoder : null,
      options.filter,
      options.sort,
      options.allowDots,
      options.serializeDate,
      options.format,
      options.formatter,
      options.encodeValuesOnly,
      options.charset,
      sideChannel
    ));
  }
  const joined = keys.join(options.delimiter);
  let prefix = options.addQueryPrefix === true ? "?" : "";
  if (options.charsetSentinel) {
    if (options.charset === "iso-8859-1") {
      prefix += "utf8=%26%2310003%3B&";
    } else {
      prefix += "utf8=%E2%9C%93&";
    }
  }
  return joined.length > 0 ? prefix + joined : "";
}

// ../../node_modules/openai/version.mjs
var VERSION = "4.73.0";

// ../../node_modules/openai/_shims/registry.mjs
var auto = false;
var kind = void 0;
var fetch2 = void 0;
var Request2 = void 0;
var Response3 = void 0;
var Headers3 = void 0;
var FormData2 = void 0;
var Blob3 = void 0;
var File2 = void 0;
var ReadableStream2 = void 0;
var getMultipartRequestOptions = void 0;
var getDefaultAgent = void 0;
var fileFromPath = void 0;
var isFsReadStream = void 0;
function setShims(shims, options = { auto: false }) {
  if (auto) {
    throw new Error(`you must \`import 'openai/shims/${shims.kind}'\` before importing anything else from openai`);
  }
  if (kind) {
    throw new Error(`can't \`import 'openai/shims/${shims.kind}'\` after \`import 'openai/shims/${kind}'\``);
  }
  auto = options.auto;
  kind = shims.kind;
  fetch2 = shims.fetch;
  Request2 = shims.Request;
  Response3 = shims.Response;
  Headers3 = shims.Headers;
  FormData2 = shims.FormData;
  Blob3 = shims.Blob;
  File2 = shims.File;
  ReadableStream2 = shims.ReadableStream;
  getMultipartRequestOptions = shims.getMultipartRequestOptions;
  getDefaultAgent = shims.getDefaultAgent;
  fileFromPath = shims.fileFromPath;
  isFsReadStream = shims.isFsReadStream;
}

// ../../node_modules/openai/_shims/node-runtime.mjs
init_lib();
var import_abort_controller = __toESM(require_abort_controller(), 1);
import KeepAliveAgent from "agentkeepalive";
import { ReadStream as FsReadStream } from "node:fs";

// ../../node_modules/form-data-encoder/lib/esm/util/createBoundary.js
var alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
function createBoundary() {
  let size = 16;
  let res = "";
  while (size--) {
    res += alphabet[Math.random() * alphabet.length << 0];
  }
  return res;
}
var createBoundary_default = createBoundary;

// ../../node_modules/form-data-encoder/lib/esm/util/isPlainObject.js
var getType = (value) => Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
function isPlainObject(value) {
  if (getType(value) !== "object") {
    return false;
  }
  const pp = Object.getPrototypeOf(value);
  if (pp === null || pp === void 0) {
    return true;
  }
  const Ctor = pp.constructor && pp.constructor.toString();
  return Ctor === Object.toString();
}
var isPlainObject_default = isPlainObject;

// ../../node_modules/form-data-encoder/lib/esm/util/normalizeValue.js
var normalizeValue = (value) => String(value).replace(/\r|\n/g, (match, i, str2) => {
  if (match === "\r" && str2[i + 1] !== "\n" || match === "\n" && str2[i - 1] !== "\r") {
    return "\r\n";
  }
  return match;
});
var normalizeValue_default = normalizeValue;

// ../../node_modules/form-data-encoder/lib/esm/util/escapeName.js
var escapeName = (name) => String(name).replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/"/g, "%22");
var escapeName_default = escapeName;

// ../../node_modules/form-data-encoder/lib/esm/util/isFunction.js
var isFunction2 = (value) => typeof value === "function";
var isFunction_default = isFunction2;

// ../../node_modules/form-data-encoder/lib/esm/util/isFileLike.js
var isFileLike = (value) => Boolean(value && typeof value === "object" && isFunction_default(value.constructor) && value[Symbol.toStringTag] === "File" && isFunction_default(value.stream) && value.name != null && value.size != null && value.lastModified != null);

// ../../node_modules/form-data-encoder/lib/esm/util/isFormData.js
var isFormData = (value) => Boolean(value && isFunction_default(value.constructor) && value[Symbol.toStringTag] === "FormData" && isFunction_default(value.append) && isFunction_default(value.getAll) && isFunction_default(value.entries) && isFunction_default(value[Symbol.iterator]));

// ../../node_modules/form-data-encoder/lib/esm/FormDataEncoder.js
var __classPrivateFieldSet = function(receiver, state, value, kind2, f) {
  if (kind2 === "m") throw new TypeError("Private method is not writable");
  if (kind2 === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind2 === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet2 = function(receiver, state, kind2, f) {
  if (kind2 === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind2 === "m" ? f : kind2 === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _FormDataEncoder_instances;
var _FormDataEncoder_CRLF;
var _FormDataEncoder_CRLF_BYTES;
var _FormDataEncoder_CRLF_BYTES_LENGTH;
var _FormDataEncoder_DASHES;
var _FormDataEncoder_encoder;
var _FormDataEncoder_footer;
var _FormDataEncoder_form;
var _FormDataEncoder_options;
var _FormDataEncoder_getFieldHeader;
var defaultOptions = {
  enableAdditionalHeaders: false
};
var FormDataEncoder = class {
  constructor(form, boundaryOrOptions, options) {
    _FormDataEncoder_instances.add(this);
    _FormDataEncoder_CRLF.set(this, "\r\n");
    _FormDataEncoder_CRLF_BYTES.set(this, void 0);
    _FormDataEncoder_CRLF_BYTES_LENGTH.set(this, void 0);
    _FormDataEncoder_DASHES.set(this, "-".repeat(2));
    _FormDataEncoder_encoder.set(this, new TextEncoder());
    _FormDataEncoder_footer.set(this, void 0);
    _FormDataEncoder_form.set(this, void 0);
    _FormDataEncoder_options.set(this, void 0);
    if (!isFormData(form)) {
      throw new TypeError("Expected first argument to be a FormData instance.");
    }
    let boundary;
    if (isPlainObject_default(boundaryOrOptions)) {
      options = boundaryOrOptions;
    } else {
      boundary = boundaryOrOptions;
    }
    if (!boundary) {
      boundary = createBoundary_default();
    }
    if (typeof boundary !== "string") {
      throw new TypeError("Expected boundary argument to be a string.");
    }
    if (options && !isPlainObject_default(options)) {
      throw new TypeError("Expected options argument to be an object.");
    }
    __classPrivateFieldSet(this, _FormDataEncoder_form, form, "f");
    __classPrivateFieldSet(this, _FormDataEncoder_options, { ...defaultOptions, ...options }, "f");
    __classPrivateFieldSet(this, _FormDataEncoder_CRLF_BYTES, __classPrivateFieldGet2(this, _FormDataEncoder_encoder, "f").encode(__classPrivateFieldGet2(this, _FormDataEncoder_CRLF, "f")), "f");
    __classPrivateFieldSet(this, _FormDataEncoder_CRLF_BYTES_LENGTH, __classPrivateFieldGet2(this, _FormDataEncoder_CRLF_BYTES, "f").byteLength, "f");
    this.boundary = `form-data-boundary-${boundary}`;
    this.contentType = `multipart/form-data; boundary=${this.boundary}`;
    __classPrivateFieldSet(this, _FormDataEncoder_footer, __classPrivateFieldGet2(this, _FormDataEncoder_encoder, "f").encode(`${__classPrivateFieldGet2(this, _FormDataEncoder_DASHES, "f")}${this.boundary}${__classPrivateFieldGet2(this, _FormDataEncoder_DASHES, "f")}${__classPrivateFieldGet2(this, _FormDataEncoder_CRLF, "f").repeat(2)}`), "f");
    this.contentLength = String(this.getContentLength());
    this.headers = Object.freeze({
      "Content-Type": this.contentType,
      "Content-Length": this.contentLength
    });
    Object.defineProperties(this, {
      boundary: { writable: false, configurable: false },
      contentType: { writable: false, configurable: false },
      contentLength: { writable: false, configurable: false },
      headers: { writable: false, configurable: false }
    });
  }
  getContentLength() {
    let length = 0;
    for (const [name, raw] of __classPrivateFieldGet2(this, _FormDataEncoder_form, "f")) {
      const value = isFileLike(raw) ? raw : __classPrivateFieldGet2(this, _FormDataEncoder_encoder, "f").encode(normalizeValue_default(raw));
      length += __classPrivateFieldGet2(this, _FormDataEncoder_instances, "m", _FormDataEncoder_getFieldHeader).call(this, name, value).byteLength;
      length += isFileLike(value) ? value.size : value.byteLength;
      length += __classPrivateFieldGet2(this, _FormDataEncoder_CRLF_BYTES_LENGTH, "f");
    }
    return length + __classPrivateFieldGet2(this, _FormDataEncoder_footer, "f").byteLength;
  }
  *values() {
    for (const [name, raw] of __classPrivateFieldGet2(this, _FormDataEncoder_form, "f").entries()) {
      const value = isFileLike(raw) ? raw : __classPrivateFieldGet2(this, _FormDataEncoder_encoder, "f").encode(normalizeValue_default(raw));
      yield __classPrivateFieldGet2(this, _FormDataEncoder_instances, "m", _FormDataEncoder_getFieldHeader).call(this, name, value);
      yield value;
      yield __classPrivateFieldGet2(this, _FormDataEncoder_CRLF_BYTES, "f");
    }
    yield __classPrivateFieldGet2(this, _FormDataEncoder_footer, "f");
  }
  async *encode() {
    for (const part of this.values()) {
      if (isFileLike(part)) {
        yield* part.stream();
      } else {
        yield part;
      }
    }
  }
  [(_FormDataEncoder_CRLF = /* @__PURE__ */ new WeakMap(), _FormDataEncoder_CRLF_BYTES = /* @__PURE__ */ new WeakMap(), _FormDataEncoder_CRLF_BYTES_LENGTH = /* @__PURE__ */ new WeakMap(), _FormDataEncoder_DASHES = /* @__PURE__ */ new WeakMap(), _FormDataEncoder_encoder = /* @__PURE__ */ new WeakMap(), _FormDataEncoder_footer = /* @__PURE__ */ new WeakMap(), _FormDataEncoder_form = /* @__PURE__ */ new WeakMap(), _FormDataEncoder_options = /* @__PURE__ */ new WeakMap(), _FormDataEncoder_instances = /* @__PURE__ */ new WeakSet(), _FormDataEncoder_getFieldHeader = function _FormDataEncoder_getFieldHeader2(name, value) {
    let header = "";
    header += `${__classPrivateFieldGet2(this, _FormDataEncoder_DASHES, "f")}${this.boundary}${__classPrivateFieldGet2(this, _FormDataEncoder_CRLF, "f")}`;
    header += `Content-Disposition: form-data; name="${escapeName_default(name)}"`;
    if (isFileLike(value)) {
      header += `; filename="${escapeName_default(value.name)}"${__classPrivateFieldGet2(this, _FormDataEncoder_CRLF, "f")}`;
      header += `Content-Type: ${value.type || "application/octet-stream"}`;
    }
    if (__classPrivateFieldGet2(this, _FormDataEncoder_options, "f").enableAdditionalHeaders === true) {
      header += `${__classPrivateFieldGet2(this, _FormDataEncoder_CRLF, "f")}Content-Length: ${isFileLike(value) ? value.size : value.byteLength}`;
    }
    return __classPrivateFieldGet2(this, _FormDataEncoder_encoder, "f").encode(`${header}${__classPrivateFieldGet2(this, _FormDataEncoder_CRLF, "f").repeat(2)}`);
  }, Symbol.iterator)]() {
    return this.values();
  }
  [Symbol.asyncIterator]() {
    return this.encode();
  }
};

// ../../node_modules/openai/_shims/node-runtime.mjs
import { Readable as Readable2 } from "node:stream";

// ../../node_modules/openai/_shims/MultipartBody.mjs
var MultipartBody = class {
  constructor(body) {
    this.body = body;
  }
  get [Symbol.toStringTag]() {
    return "MultipartBody";
  }
};

// ../../node_modules/openai/_shims/node-runtime.mjs
import { ReadableStream as ReadableStream3 } from "node:stream/web";
var fileFromPathWarned = false;
async function fileFromPath2(path2, ...args) {
  const { fileFromPath: _fileFromPath } = await import("./fileFromPath-IAEHYVFL.js");
  if (!fileFromPathWarned) {
    console.warn(`fileFromPath is deprecated; use fs.createReadStream(${JSON.stringify(path2)}) instead`);
    fileFromPathWarned = true;
  }
  return await _fileFromPath(path2, ...args);
}
var defaultHttpAgent = new KeepAliveAgent({ keepAlive: true, timeout: 5 * 60 * 1e3 });
var defaultHttpsAgent = new KeepAliveAgent.HttpsAgent({ keepAlive: true, timeout: 5 * 60 * 1e3 });
async function getMultipartRequestOptions2(form, opts) {
  const encoder = new FormDataEncoder(form);
  const readable = Readable2.from(encoder);
  const body = new MultipartBody(readable);
  const headers = {
    ...opts.headers,
    ...encoder.headers,
    "Content-Length": encoder.contentLength
  };
  return { ...opts, body, headers };
}
function getRuntime() {
  if (typeof AbortController === "undefined") {
    globalThis.AbortController = import_abort_controller.AbortController;
  }
  return {
    kind: "node",
    fetch: lib_default,
    Request,
    Response: Response2,
    Headers: Headers2,
    FormData,
    Blob: Blob2,
    File,
    ReadableStream: ReadableStream3,
    getMultipartRequestOptions: getMultipartRequestOptions2,
    getDefaultAgent: (url) => url.startsWith("https") ? defaultHttpsAgent : defaultHttpAgent,
    fileFromPath: fileFromPath2,
    isFsReadStream: (value) => value instanceof FsReadStream
  };
}

// ../../node_modules/openai/_shims/index.mjs
if (!kind) setShims(getRuntime(), { auto: true });

// ../../node_modules/openai/error.mjs
var OpenAIError = class extends Error {
};
var APIError = class _APIError extends OpenAIError {
  constructor(status, error, message, headers) {
    super(`${_APIError.makeMessage(status, error, message)}`);
    this.status = status;
    this.headers = headers;
    this.request_id = headers?.["x-request-id"];
    const data = error;
    this.error = data;
    this.code = data?.["code"];
    this.param = data?.["param"];
    this.type = data?.["type"];
  }
  static makeMessage(status, error, message) {
    const msg = error?.message ? typeof error.message === "string" ? error.message : JSON.stringify(error.message) : error ? JSON.stringify(error) : message;
    if (status && msg) {
      return `${status} ${msg}`;
    }
    if (status) {
      return `${status} status code (no body)`;
    }
    if (msg) {
      return msg;
    }
    return "(no status code or body)";
  }
  static generate(status, errorResponse, message, headers) {
    if (!status) {
      return new APIConnectionError({ message, cause: castToError(errorResponse) });
    }
    const error = errorResponse?.["error"];
    if (status === 400) {
      return new BadRequestError(status, error, message, headers);
    }
    if (status === 401) {
      return new AuthenticationError(status, error, message, headers);
    }
    if (status === 403) {
      return new PermissionDeniedError(status, error, message, headers);
    }
    if (status === 404) {
      return new NotFoundError(status, error, message, headers);
    }
    if (status === 409) {
      return new ConflictError(status, error, message, headers);
    }
    if (status === 422) {
      return new UnprocessableEntityError(status, error, message, headers);
    }
    if (status === 429) {
      return new RateLimitError(status, error, message, headers);
    }
    if (status >= 500) {
      return new InternalServerError(status, error, message, headers);
    }
    return new _APIError(status, error, message, headers);
  }
};
var APIUserAbortError = class extends APIError {
  constructor({ message } = {}) {
    super(void 0, void 0, message || "Request was aborted.", void 0);
    this.status = void 0;
  }
};
var APIConnectionError = class extends APIError {
  constructor({ message, cause }) {
    super(void 0, void 0, message || "Connection error.", void 0);
    this.status = void 0;
    if (cause)
      this.cause = cause;
  }
};
var APIConnectionTimeoutError = class extends APIConnectionError {
  constructor({ message } = {}) {
    super({ message: message ?? "Request timed out." });
  }
};
var BadRequestError = class extends APIError {
  constructor() {
    super(...arguments);
    this.status = 400;
  }
};
var AuthenticationError = class extends APIError {
  constructor() {
    super(...arguments);
    this.status = 401;
  }
};
var PermissionDeniedError = class extends APIError {
  constructor() {
    super(...arguments);
    this.status = 403;
  }
};
var NotFoundError = class extends APIError {
  constructor() {
    super(...arguments);
    this.status = 404;
  }
};
var ConflictError = class extends APIError {
  constructor() {
    super(...arguments);
    this.status = 409;
  }
};
var UnprocessableEntityError = class extends APIError {
  constructor() {
    super(...arguments);
    this.status = 422;
  }
};
var RateLimitError = class extends APIError {
  constructor() {
    super(...arguments);
    this.status = 429;
  }
};
var InternalServerError = class extends APIError {
};
var LengthFinishReasonError = class extends OpenAIError {
  constructor() {
    super(`Could not parse response content as the length limit was reached`);
  }
};
var ContentFilterFinishReasonError = class extends OpenAIError {
  constructor() {
    super(`Could not parse response content as the request was rejected by the content filter`);
  }
};

// ../../node_modules/openai/internal/decoders/line.mjs
var LineDecoder = class _LineDecoder {
  constructor() {
    this.buffer = [];
    this.trailingCR = false;
  }
  decode(chunk) {
    let text = this.decodeText(chunk);
    if (this.trailingCR) {
      text = "\r" + text;
      this.trailingCR = false;
    }
    if (text.endsWith("\r")) {
      this.trailingCR = true;
      text = text.slice(0, -1);
    }
    if (!text) {
      return [];
    }
    const trailingNewline = _LineDecoder.NEWLINE_CHARS.has(text[text.length - 1] || "");
    let lines = text.split(_LineDecoder.NEWLINE_REGEXP);
    if (trailingNewline) {
      lines.pop();
    }
    if (lines.length === 1 && !trailingNewline) {
      this.buffer.push(lines[0]);
      return [];
    }
    if (this.buffer.length > 0) {
      lines = [this.buffer.join("") + lines[0], ...lines.slice(1)];
      this.buffer = [];
    }
    if (!trailingNewline) {
      this.buffer = [lines.pop() || ""];
    }
    return lines;
  }
  decodeText(bytes) {
    if (bytes == null)
      return "";
    if (typeof bytes === "string")
      return bytes;
    if (typeof Buffer !== "undefined") {
      if (bytes instanceof Buffer) {
        return bytes.toString();
      }
      if (bytes instanceof Uint8Array) {
        return Buffer.from(bytes).toString();
      }
      throw new OpenAIError(`Unexpected: received non-Uint8Array (${bytes.constructor.name}) stream chunk in an environment with a global "Buffer" defined, which this library assumes to be Node. Please report this error.`);
    }
    if (typeof TextDecoder !== "undefined") {
      if (bytes instanceof Uint8Array || bytes instanceof ArrayBuffer) {
        this.textDecoder ?? (this.textDecoder = new TextDecoder("utf8"));
        return this.textDecoder.decode(bytes);
      }
      throw new OpenAIError(`Unexpected: received non-Uint8Array/ArrayBuffer (${bytes.constructor.name}) in a web platform. Please report this error.`);
    }
    throw new OpenAIError(`Unexpected: neither Buffer nor TextDecoder are available as globals. Please report this error.`);
  }
  flush() {
    if (!this.buffer.length && !this.trailingCR) {
      return [];
    }
    const lines = [this.buffer.join("")];
    this.buffer = [];
    this.trailingCR = false;
    return lines;
  }
};
LineDecoder.NEWLINE_CHARS = /* @__PURE__ */ new Set(["\n", "\r"]);
LineDecoder.NEWLINE_REGEXP = /\r\n|[\n\r]/g;

// ../../node_modules/openai/streaming.mjs
var Stream = class _Stream {
  constructor(iterator, controller) {
    this.iterator = iterator;
    this.controller = controller;
  }
  static fromSSEResponse(response, controller) {
    let consumed = false;
    async function* iterator() {
      if (consumed) {
        throw new Error("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
      }
      consumed = true;
      let done = false;
      try {
        for await (const sse of _iterSSEMessages(response, controller)) {
          if (done)
            continue;
          if (sse.data.startsWith("[DONE]")) {
            done = true;
            continue;
          }
          if (sse.event === null) {
            let data;
            try {
              data = JSON.parse(sse.data);
            } catch (e) {
              console.error(`Could not parse message into JSON:`, sse.data);
              console.error(`From chunk:`, sse.raw);
              throw e;
            }
            if (data && data.error) {
              throw new APIError(void 0, data.error, void 0, void 0);
            }
            yield data;
          } else {
            let data;
            try {
              data = JSON.parse(sse.data);
            } catch (e) {
              console.error(`Could not parse message into JSON:`, sse.data);
              console.error(`From chunk:`, sse.raw);
              throw e;
            }
            if (sse.event == "error") {
              throw new APIError(void 0, data.error, data.message, void 0);
            }
            yield { event: sse.event, data };
          }
        }
        done = true;
      } catch (e) {
        if (e instanceof Error && e.name === "AbortError")
          return;
        throw e;
      } finally {
        if (!done)
          controller.abort();
      }
    }
    return new _Stream(iterator, controller);
  }
  /**
   * Generates a Stream from a newline-separated ReadableStream
   * where each item is a JSON value.
   */
  static fromReadableStream(readableStream, controller) {
    let consumed = false;
    async function* iterLines() {
      const lineDecoder = new LineDecoder();
      const iter = readableStreamAsyncIterable(readableStream);
      for await (const chunk of iter) {
        for (const line of lineDecoder.decode(chunk)) {
          yield line;
        }
      }
      for (const line of lineDecoder.flush()) {
        yield line;
      }
    }
    async function* iterator() {
      if (consumed) {
        throw new Error("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
      }
      consumed = true;
      let done = false;
      try {
        for await (const line of iterLines()) {
          if (done)
            continue;
          if (line)
            yield JSON.parse(line);
        }
        done = true;
      } catch (e) {
        if (e instanceof Error && e.name === "AbortError")
          return;
        throw e;
      } finally {
        if (!done)
          controller.abort();
      }
    }
    return new _Stream(iterator, controller);
  }
  [Symbol.asyncIterator]() {
    return this.iterator();
  }
  /**
   * Splits the stream into two streams which can be
   * independently read from at different speeds.
   */
  tee() {
    const left = [];
    const right = [];
    const iterator = this.iterator();
    const teeIterator = (queue) => {
      return {
        next: () => {
          if (queue.length === 0) {
            const result = iterator.next();
            left.push(result);
            right.push(result);
          }
          return queue.shift();
        }
      };
    };
    return [
      new _Stream(() => teeIterator(left), this.controller),
      new _Stream(() => teeIterator(right), this.controller)
    ];
  }
  /**
   * Converts this stream to a newline-separated ReadableStream of
   * JSON stringified values in the stream
   * which can be turned back into a Stream with `Stream.fromReadableStream()`.
   */
  toReadableStream() {
    const self = this;
    let iter;
    const encoder = new TextEncoder();
    return new ReadableStream2({
      async start() {
        iter = self[Symbol.asyncIterator]();
      },
      async pull(ctrl) {
        try {
          const { value, done } = await iter.next();
          if (done)
            return ctrl.close();
          const bytes = encoder.encode(JSON.stringify(value) + "\n");
          ctrl.enqueue(bytes);
        } catch (err) {
          ctrl.error(err);
        }
      },
      async cancel() {
        await iter.return?.();
      }
    });
  }
};
async function* _iterSSEMessages(response, controller) {
  if (!response.body) {
    controller.abort();
    throw new OpenAIError(`Attempted to iterate over a response with no body`);
  }
  const sseDecoder = new SSEDecoder();
  const lineDecoder = new LineDecoder();
  const iter = readableStreamAsyncIterable(response.body);
  for await (const sseChunk of iterSSEChunks(iter)) {
    for (const line of lineDecoder.decode(sseChunk)) {
      const sse = sseDecoder.decode(line);
      if (sse)
        yield sse;
    }
  }
  for (const line of lineDecoder.flush()) {
    const sse = sseDecoder.decode(line);
    if (sse)
      yield sse;
  }
}
async function* iterSSEChunks(iterator) {
  let data = new Uint8Array();
  for await (const chunk of iterator) {
    if (chunk == null) {
      continue;
    }
    const binaryChunk = chunk instanceof ArrayBuffer ? new Uint8Array(chunk) : typeof chunk === "string" ? new TextEncoder().encode(chunk) : chunk;
    let newData = new Uint8Array(data.length + binaryChunk.length);
    newData.set(data);
    newData.set(binaryChunk, data.length);
    data = newData;
    let patternIndex;
    while ((patternIndex = findDoubleNewlineIndex(data)) !== -1) {
      yield data.slice(0, patternIndex);
      data = data.slice(patternIndex);
    }
  }
  if (data.length > 0) {
    yield data;
  }
}
function findDoubleNewlineIndex(buffer) {
  const newline = 10;
  const carriage = 13;
  for (let i = 0; i < buffer.length - 2; i++) {
    if (buffer[i] === newline && buffer[i + 1] === newline) {
      return i + 2;
    }
    if (buffer[i] === carriage && buffer[i + 1] === carriage) {
      return i + 2;
    }
    if (buffer[i] === carriage && buffer[i + 1] === newline && i + 3 < buffer.length && buffer[i + 2] === carriage && buffer[i + 3] === newline) {
      return i + 4;
    }
  }
  return -1;
}
var SSEDecoder = class {
  constructor() {
    this.event = null;
    this.data = [];
    this.chunks = [];
  }
  decode(line) {
    if (line.endsWith("\r")) {
      line = line.substring(0, line.length - 1);
    }
    if (!line) {
      if (!this.event && !this.data.length)
        return null;
      const sse = {
        event: this.event,
        data: this.data.join("\n"),
        raw: this.chunks
      };
      this.event = null;
      this.data = [];
      this.chunks = [];
      return sse;
    }
    this.chunks.push(line);
    if (line.startsWith(":")) {
      return null;
    }
    let [fieldname, _, value] = partition(line, ":");
    if (value.startsWith(" ")) {
      value = value.substring(1);
    }
    if (fieldname === "event") {
      this.event = value;
    } else if (fieldname === "data") {
      this.data.push(value);
    }
    return null;
  }
};
function partition(str2, delimiter) {
  const index = str2.indexOf(delimiter);
  if (index !== -1) {
    return [str2.substring(0, index), delimiter, str2.substring(index + delimiter.length)];
  }
  return [str2, "", ""];
}
function readableStreamAsyncIterable(stream) {
  if (stream[Symbol.asyncIterator])
    return stream;
  const reader = stream.getReader();
  return {
    async next() {
      try {
        const result = await reader.read();
        if (result?.done)
          reader.releaseLock();
        return result;
      } catch (e) {
        reader.releaseLock();
        throw e;
      }
    },
    async return() {
      const cancelPromise = reader.cancel();
      reader.releaseLock();
      await cancelPromise;
      return { done: true, value: void 0 };
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}

// ../../node_modules/openai/uploads.mjs
var isResponseLike = (value) => value != null && typeof value === "object" && typeof value.url === "string" && typeof value.blob === "function";
var isFileLike2 = (value) => value != null && typeof value === "object" && typeof value.name === "string" && typeof value.lastModified === "number" && isBlobLike(value);
var isBlobLike = (value) => value != null && typeof value === "object" && typeof value.size === "number" && typeof value.type === "string" && typeof value.text === "function" && typeof value.slice === "function" && typeof value.arrayBuffer === "function";
var isUploadable = (value) => {
  return isFileLike2(value) || isResponseLike(value) || isFsReadStream(value);
};
async function toFile(value, name, options) {
  value = await value;
  if (isFileLike2(value)) {
    return value;
  }
  if (isResponseLike(value)) {
    const blob = await value.blob();
    name || (name = new URL(value.url).pathname.split(/[\\/]/).pop() ?? "unknown_file");
    const data = isBlobLike(blob) ? [await blob.arrayBuffer()] : [blob];
    return new File2(data, name, options);
  }
  const bits = await getBytes(value);
  name || (name = getName(value) ?? "unknown_file");
  if (!options?.type) {
    const type = bits[0]?.type;
    if (typeof type === "string") {
      options = { ...options, type };
    }
  }
  return new File2(bits, name, options);
}
async function getBytes(value) {
  let parts = [];
  if (typeof value === "string" || ArrayBuffer.isView(value) || // includes Uint8Array, Buffer, etc.
  value instanceof ArrayBuffer) {
    parts.push(value);
  } else if (isBlobLike(value)) {
    parts.push(await value.arrayBuffer());
  } else if (isAsyncIterableIterator(value)) {
    for await (const chunk of value) {
      parts.push(chunk);
    }
  } else {
    throw new Error(`Unexpected data type: ${typeof value}; constructor: ${value?.constructor?.name}; props: ${propsForError(value)}`);
  }
  return parts;
}
function propsForError(value) {
  const props = Object.getOwnPropertyNames(value);
  return `[${props.map((p) => `"${p}"`).join(", ")}]`;
}
function getName(value) {
  return getStringFromMaybeBuffer(value.name) || getStringFromMaybeBuffer(value.filename) || // For fs.ReadStream
  getStringFromMaybeBuffer(value.path)?.split(/[\\/]/).pop();
}
var getStringFromMaybeBuffer = (x) => {
  if (typeof x === "string")
    return x;
  if (typeof Buffer !== "undefined" && x instanceof Buffer)
    return String(x);
  return void 0;
};
var isAsyncIterableIterator = (value) => value != null && typeof value === "object" && typeof value[Symbol.asyncIterator] === "function";
var isMultipartBody = (body) => body && typeof body === "object" && body.body && body[Symbol.toStringTag] === "MultipartBody";
var multipartFormRequestOptions = async (opts) => {
  const form = await createForm(opts.body);
  return getMultipartRequestOptions(form, opts);
};
var createForm = async (body) => {
  const form = new FormData2();
  await Promise.all(Object.entries(body || {}).map(([key, value]) => addFormValue(form, key, value)));
  return form;
};
var addFormValue = async (form, key, value) => {
  if (value === void 0)
    return;
  if (value == null) {
    throw new TypeError(`Received null for "${key}"; to pass null in FormData, you must use the string 'null'`);
  }
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    form.append(key, String(value));
  } else if (isUploadable(value)) {
    const file = await toFile(value);
    form.append(key, file);
  } else if (Array.isArray(value)) {
    await Promise.all(value.map((entry) => addFormValue(form, key + "[]", entry)));
  } else if (typeof value === "object") {
    await Promise.all(Object.entries(value).map(([name, prop]) => addFormValue(form, `${key}[${name}]`, prop)));
  } else {
    throw new TypeError(`Invalid value given to form, expected a string, number, boolean, object, Array, File or Blob but got ${value} instead`);
  }
};

// ../../node_modules/openai/core.mjs
var __classPrivateFieldSet2 = function(receiver, state, value, kind2, f) {
  if (kind2 === "m") throw new TypeError("Private method is not writable");
  if (kind2 === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind2 === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet3 = function(receiver, state, kind2, f) {
  if (kind2 === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind2 === "m" ? f : kind2 === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AbstractPage_client;
async function defaultParseResponse(props) {
  const { response } = props;
  if (props.options.stream) {
    debug("response", response.status, response.url, response.headers, response.body);
    if (props.options.__streamClass) {
      return props.options.__streamClass.fromSSEResponse(response, props.controller);
    }
    return Stream.fromSSEResponse(response, props.controller);
  }
  if (response.status === 204) {
    return null;
  }
  if (props.options.__binaryResponse) {
    return response;
  }
  const contentType = response.headers.get("content-type");
  const isJSON = contentType?.includes("application/json") || contentType?.includes("application/vnd.api+json");
  if (isJSON) {
    const json = await response.json();
    debug("response", response.status, response.url, response.headers, json);
    return _addRequestID(json, response);
  }
  const text = await response.text();
  debug("response", response.status, response.url, response.headers, text);
  return text;
}
function _addRequestID(value, response) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return value;
  }
  return Object.defineProperty(value, "_request_id", {
    value: response.headers.get("x-request-id"),
    enumerable: false
  });
}
var APIPromise = class _APIPromise extends Promise {
  constructor(responsePromise, parseResponse = defaultParseResponse) {
    super((resolve) => {
      resolve(null);
    });
    this.responsePromise = responsePromise;
    this.parseResponse = parseResponse;
  }
  _thenUnwrap(transform) {
    return new _APIPromise(this.responsePromise, async (props) => _addRequestID(transform(await this.parseResponse(props), props), props.response));
  }
  /**
   * Gets the raw `Response` instance instead of parsing the response
   * data.
   *
   * If you want to parse the response body but still get the `Response`
   * instance, you can use {@link withResponse()}.
   *
   * 👋 Getting the wrong TypeScript type for `Response`?
   * Try setting `"moduleResolution": "NodeNext"` if you can,
   * or add one of these imports before your first `import … from 'openai'`:
   * - `import 'openai/shims/node'` (if you're running on Node)
   * - `import 'openai/shims/web'` (otherwise)
   */
  asResponse() {
    return this.responsePromise.then((p) => p.response);
  }
  /**
   * Gets the parsed response data, the raw `Response` instance and the ID of the request,
   * returned via the X-Request-ID header which is useful for debugging requests and reporting
   * issues to OpenAI.
   *
   * If you just want to get the raw `Response` instance without parsing it,
   * you can use {@link asResponse()}.
   *
   *
   * 👋 Getting the wrong TypeScript type for `Response`?
   * Try setting `"moduleResolution": "NodeNext"` if you can,
   * or add one of these imports before your first `import … from 'openai'`:
   * - `import 'openai/shims/node'` (if you're running on Node)
   * - `import 'openai/shims/web'` (otherwise)
   */
  async withResponse() {
    const [data, response] = await Promise.all([this.parse(), this.asResponse()]);
    return { data, response, request_id: response.headers.get("x-request-id") };
  }
  parse() {
    if (!this.parsedPromise) {
      this.parsedPromise = this.responsePromise.then(this.parseResponse);
    }
    return this.parsedPromise;
  }
  then(onfulfilled, onrejected) {
    return this.parse().then(onfulfilled, onrejected);
  }
  catch(onrejected) {
    return this.parse().catch(onrejected);
  }
  finally(onfinally) {
    return this.parse().finally(onfinally);
  }
};
var APIClient = class {
  constructor({
    baseURL,
    maxRetries = 2,
    timeout = 6e5,
    // 10 minutes
    httpAgent,
    fetch: overridenFetch
  }) {
    this.baseURL = baseURL;
    this.maxRetries = validatePositiveInteger("maxRetries", maxRetries);
    this.timeout = validatePositiveInteger("timeout", timeout);
    this.httpAgent = httpAgent;
    this.fetch = overridenFetch ?? fetch2;
  }
  authHeaders(opts) {
    return {};
  }
  /**
   * Override this to add your own default headers, for example:
   *
   *  {
   *    ...super.defaultHeaders(),
   *    Authorization: 'Bearer 123',
   *  }
   */
  defaultHeaders(opts) {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": this.getUserAgent(),
      ...getPlatformHeaders(),
      ...this.authHeaders(opts)
    };
  }
  /**
   * Override this to add your own headers validation:
   */
  validateHeaders(headers, customHeaders) {
  }
  defaultIdempotencyKey() {
    return `stainless-node-retry-${uuid4()}`;
  }
  get(path2, opts) {
    return this.methodRequest("get", path2, opts);
  }
  post(path2, opts) {
    return this.methodRequest("post", path2, opts);
  }
  patch(path2, opts) {
    return this.methodRequest("patch", path2, opts);
  }
  put(path2, opts) {
    return this.methodRequest("put", path2, opts);
  }
  delete(path2, opts) {
    return this.methodRequest("delete", path2, opts);
  }
  methodRequest(method, path2, opts) {
    return this.request(Promise.resolve(opts).then(async (opts2) => {
      const body = opts2 && isBlobLike(opts2?.body) ? new DataView(await opts2.body.arrayBuffer()) : opts2?.body instanceof DataView ? opts2.body : opts2?.body instanceof ArrayBuffer ? new DataView(opts2.body) : opts2 && ArrayBuffer.isView(opts2?.body) ? new DataView(opts2.body.buffer) : opts2?.body;
      return { method, path: path2, ...opts2, body };
    }));
  }
  getAPIList(path2, Page2, opts) {
    return this.requestAPIList(Page2, { method: "get", path: path2, ...opts });
  }
  calculateContentLength(body) {
    if (typeof body === "string") {
      if (typeof Buffer !== "undefined") {
        return Buffer.byteLength(body, "utf8").toString();
      }
      if (typeof TextEncoder !== "undefined") {
        const encoder = new TextEncoder();
        const encoded = encoder.encode(body);
        return encoded.length.toString();
      }
    } else if (ArrayBuffer.isView(body)) {
      return body.byteLength.toString();
    }
    return null;
  }
  buildRequest(options, { retryCount = 0 } = {}) {
    const { method, path: path2, query, headers = {} } = options;
    const body = ArrayBuffer.isView(options.body) || options.__binaryRequest && typeof options.body === "string" ? options.body : isMultipartBody(options.body) ? options.body.body : options.body ? JSON.stringify(options.body, null, 2) : null;
    const contentLength = this.calculateContentLength(body);
    const url = this.buildURL(path2, query);
    if ("timeout" in options)
      validatePositiveInteger("timeout", options.timeout);
    const timeout = options.timeout ?? this.timeout;
    const httpAgent = options.httpAgent ?? this.httpAgent ?? getDefaultAgent(url);
    const minAgentTimeout = timeout + 1e3;
    if (typeof httpAgent?.options?.timeout === "number" && minAgentTimeout > (httpAgent.options.timeout ?? 0)) {
      httpAgent.options.timeout = minAgentTimeout;
    }
    if (this.idempotencyHeader && method !== "get") {
      if (!options.idempotencyKey)
        options.idempotencyKey = this.defaultIdempotencyKey();
      headers[this.idempotencyHeader] = options.idempotencyKey;
    }
    const reqHeaders = this.buildHeaders({ options, headers, contentLength, retryCount });
    const req = {
      method,
      ...body && { body },
      headers: reqHeaders,
      ...httpAgent && { agent: httpAgent },
      // @ts-ignore node-fetch uses a custom AbortSignal type that is
      // not compatible with standard web types
      signal: options.signal ?? null
    };
    return { req, url, timeout };
  }
  buildHeaders({ options, headers, contentLength, retryCount }) {
    const reqHeaders = {};
    if (contentLength) {
      reqHeaders["content-length"] = contentLength;
    }
    const defaultHeaders = this.defaultHeaders(options);
    applyHeadersMut(reqHeaders, defaultHeaders);
    applyHeadersMut(reqHeaders, headers);
    if (isMultipartBody(options.body) && kind !== "node") {
      delete reqHeaders["content-type"];
    }
    if (getHeader(defaultHeaders, "x-stainless-retry-count") === void 0 && getHeader(headers, "x-stainless-retry-count") === void 0) {
      reqHeaders["x-stainless-retry-count"] = String(retryCount);
    }
    this.validateHeaders(reqHeaders, headers);
    return reqHeaders;
  }
  /**
   * Used as a callback for mutating the given `FinalRequestOptions` object.
   */
  async prepareOptions(options) {
  }
  /**
   * Used as a callback for mutating the given `RequestInit` object.
   *
   * This is useful for cases where you want to add certain headers based off of
   * the request properties, e.g. `method` or `url`.
   */
  async prepareRequest(request, { url, options }) {
  }
  parseHeaders(headers) {
    return !headers ? {} : Symbol.iterator in headers ? Object.fromEntries(Array.from(headers).map((header) => [...header])) : { ...headers };
  }
  makeStatusError(status, error, message, headers) {
    return APIError.generate(status, error, message, headers);
  }
  request(options, remainingRetries = null) {
    return new APIPromise(this.makeRequest(options, remainingRetries));
  }
  async makeRequest(optionsInput, retriesRemaining) {
    const options = await optionsInput;
    const maxRetries = options.maxRetries ?? this.maxRetries;
    if (retriesRemaining == null) {
      retriesRemaining = maxRetries;
    }
    await this.prepareOptions(options);
    const { req, url, timeout } = this.buildRequest(options, { retryCount: maxRetries - retriesRemaining });
    await this.prepareRequest(req, { url, options });
    debug("request", url, options, req.headers);
    if (options.signal?.aborted) {
      throw new APIUserAbortError();
    }
    const controller = new AbortController();
    const response = await this.fetchWithTimeout(url, req, timeout, controller).catch(castToError);
    if (response instanceof Error) {
      if (options.signal?.aborted) {
        throw new APIUserAbortError();
      }
      if (retriesRemaining) {
        return this.retryRequest(options, retriesRemaining);
      }
      if (response.name === "AbortError") {
        throw new APIConnectionTimeoutError();
      }
      throw new APIConnectionError({ cause: response });
    }
    const responseHeaders = createResponseHeaders(response.headers);
    if (!response.ok) {
      if (retriesRemaining && this.shouldRetry(response)) {
        const retryMessage2 = `retrying, ${retriesRemaining} attempts remaining`;
        debug(`response (error; ${retryMessage2})`, response.status, url, responseHeaders);
        return this.retryRequest(options, retriesRemaining, responseHeaders);
      }
      const errText = await response.text().catch((e) => castToError(e).message);
      const errJSON = safeJSON(errText);
      const errMessage = errJSON ? void 0 : errText;
      const retryMessage = retriesRemaining ? `(error; no more retries left)` : `(error; not retryable)`;
      debug(`response (error; ${retryMessage})`, response.status, url, responseHeaders, errMessage);
      const err = this.makeStatusError(response.status, errJSON, errMessage, responseHeaders);
      throw err;
    }
    return { response, options, controller };
  }
  requestAPIList(Page2, options) {
    const request = this.makeRequest(options, null);
    return new PagePromise(this, request, Page2);
  }
  buildURL(path2, query) {
    const url = isAbsoluteURL(path2) ? new URL(path2) : new URL(this.baseURL + (this.baseURL.endsWith("/") && path2.startsWith("/") ? path2.slice(1) : path2));
    const defaultQuery = this.defaultQuery();
    if (!isEmptyObj(defaultQuery)) {
      query = { ...defaultQuery, ...query };
    }
    if (typeof query === "object" && query && !Array.isArray(query)) {
      url.search = this.stringifyQuery(query);
    }
    return url.toString();
  }
  stringifyQuery(query) {
    return Object.entries(query).filter(([_, value]) => typeof value !== "undefined").map(([key, value]) => {
      if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      }
      if (value === null) {
        return `${encodeURIComponent(key)}=`;
      }
      throw new OpenAIError(`Cannot stringify type ${typeof value}; Expected string, number, boolean, or null. If you need to pass nested query parameters, you can manually encode them, e.g. { query: { 'foo[key1]': value1, 'foo[key2]': value2 } }, and please open a GitHub issue requesting better support for your use case.`);
    }).join("&");
  }
  async fetchWithTimeout(url, init, ms, controller) {
    const { signal, ...options } = init || {};
    if (signal)
      signal.addEventListener("abort", () => controller.abort());
    const timeout = setTimeout(() => controller.abort(), ms);
    return this.getRequestClient().fetch.call(void 0, url, { signal: controller.signal, ...options }).finally(() => {
      clearTimeout(timeout);
    });
  }
  getRequestClient() {
    return { fetch: this.fetch };
  }
  shouldRetry(response) {
    const shouldRetryHeader = response.headers.get("x-should-retry");
    if (shouldRetryHeader === "true")
      return true;
    if (shouldRetryHeader === "false")
      return false;
    if (response.status === 408)
      return true;
    if (response.status === 409)
      return true;
    if (response.status === 429)
      return true;
    if (response.status >= 500)
      return true;
    return false;
  }
  async retryRequest(options, retriesRemaining, responseHeaders) {
    let timeoutMillis;
    const retryAfterMillisHeader = responseHeaders?.["retry-after-ms"];
    if (retryAfterMillisHeader) {
      const timeoutMs = parseFloat(retryAfterMillisHeader);
      if (!Number.isNaN(timeoutMs)) {
        timeoutMillis = timeoutMs;
      }
    }
    const retryAfterHeader = responseHeaders?.["retry-after"];
    if (retryAfterHeader && !timeoutMillis) {
      const timeoutSeconds = parseFloat(retryAfterHeader);
      if (!Number.isNaN(timeoutSeconds)) {
        timeoutMillis = timeoutSeconds * 1e3;
      } else {
        timeoutMillis = Date.parse(retryAfterHeader) - Date.now();
      }
    }
    if (!(timeoutMillis && 0 <= timeoutMillis && timeoutMillis < 60 * 1e3)) {
      const maxRetries = options.maxRetries ?? this.maxRetries;
      timeoutMillis = this.calculateDefaultRetryTimeoutMillis(retriesRemaining, maxRetries);
    }
    await sleep(timeoutMillis);
    return this.makeRequest(options, retriesRemaining - 1);
  }
  calculateDefaultRetryTimeoutMillis(retriesRemaining, maxRetries) {
    const initialRetryDelay = 0.5;
    const maxRetryDelay = 8;
    const numRetries = maxRetries - retriesRemaining;
    const sleepSeconds = Math.min(initialRetryDelay * Math.pow(2, numRetries), maxRetryDelay);
    const jitter = 1 - Math.random() * 0.25;
    return sleepSeconds * jitter * 1e3;
  }
  getUserAgent() {
    return `${this.constructor.name}/JS ${VERSION}`;
  }
};
var AbstractPage = class {
  constructor(client, response, body, options) {
    _AbstractPage_client.set(this, void 0);
    __classPrivateFieldSet2(this, _AbstractPage_client, client, "f");
    this.options = options;
    this.response = response;
    this.body = body;
  }
  hasNextPage() {
    const items = this.getPaginatedItems();
    if (!items.length)
      return false;
    return this.nextPageInfo() != null;
  }
  async getNextPage() {
    const nextInfo = this.nextPageInfo();
    if (!nextInfo) {
      throw new OpenAIError("No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.");
    }
    const nextOptions = { ...this.options };
    if ("params" in nextInfo && typeof nextOptions.query === "object") {
      nextOptions.query = { ...nextOptions.query, ...nextInfo.params };
    } else if ("url" in nextInfo) {
      const params = [...Object.entries(nextOptions.query || {}), ...nextInfo.url.searchParams.entries()];
      for (const [key, value] of params) {
        nextInfo.url.searchParams.set(key, value);
      }
      nextOptions.query = void 0;
      nextOptions.path = nextInfo.url.toString();
    }
    return await __classPrivateFieldGet3(this, _AbstractPage_client, "f").requestAPIList(this.constructor, nextOptions);
  }
  async *iterPages() {
    let page = this;
    yield page;
    while (page.hasNextPage()) {
      page = await page.getNextPage();
      yield page;
    }
  }
  async *[(_AbstractPage_client = /* @__PURE__ */ new WeakMap(), Symbol.asyncIterator)]() {
    for await (const page of this.iterPages()) {
      for (const item of page.getPaginatedItems()) {
        yield item;
      }
    }
  }
};
var PagePromise = class extends APIPromise {
  constructor(client, request, Page2) {
    super(request, async (props) => new Page2(client, props.response, await defaultParseResponse(props), props.options));
  }
  /**
   * Allow auto-paginating iteration on an unawaited list call, eg:
   *
   *    for await (const item of client.items.list()) {
   *      console.log(item)
   *    }
   */
  async *[Symbol.asyncIterator]() {
    const page = await this;
    for await (const item of page) {
      yield item;
    }
  }
};
var createResponseHeaders = (headers) => {
  return new Proxy(Object.fromEntries(
    // @ts-ignore
    headers.entries()
  ), {
    get(target, name) {
      const key = name.toString();
      return target[key.toLowerCase()] || target[key];
    }
  });
};
var requestOptionsKeys = {
  method: true,
  path: true,
  query: true,
  body: true,
  headers: true,
  maxRetries: true,
  stream: true,
  timeout: true,
  httpAgent: true,
  signal: true,
  idempotencyKey: true,
  __binaryRequest: true,
  __binaryResponse: true,
  __streamClass: true
};
var isRequestOptions = (obj) => {
  return typeof obj === "object" && obj !== null && !isEmptyObj(obj) && Object.keys(obj).every((k) => hasOwn(requestOptionsKeys, k));
};
var getPlatformProperties = () => {
  if (typeof Deno !== "undefined" && Deno.build != null) {
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": VERSION,
      "X-Stainless-OS": normalizePlatform(Deno.build.os),
      "X-Stainless-Arch": normalizeArch(Deno.build.arch),
      "X-Stainless-Runtime": "deno",
      "X-Stainless-Runtime-Version": typeof Deno.version === "string" ? Deno.version : Deno.version?.deno ?? "unknown"
    };
  }
  if (typeof EdgeRuntime !== "undefined") {
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": VERSION,
      "X-Stainless-OS": "Unknown",
      "X-Stainless-Arch": `other:${EdgeRuntime}`,
      "X-Stainless-Runtime": "edge",
      "X-Stainless-Runtime-Version": process.version
    };
  }
  if (Object.prototype.toString.call(typeof process !== "undefined" ? process : 0) === "[object process]") {
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": VERSION,
      "X-Stainless-OS": normalizePlatform(process.platform),
      "X-Stainless-Arch": normalizeArch(process.arch),
      "X-Stainless-Runtime": "node",
      "X-Stainless-Runtime-Version": process.version
    };
  }
  const browserInfo = getBrowserInfo();
  if (browserInfo) {
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": VERSION,
      "X-Stainless-OS": "Unknown",
      "X-Stainless-Arch": "unknown",
      "X-Stainless-Runtime": `browser:${browserInfo.browser}`,
      "X-Stainless-Runtime-Version": browserInfo.version
    };
  }
  return {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": VERSION,
    "X-Stainless-OS": "Unknown",
    "X-Stainless-Arch": "unknown",
    "X-Stainless-Runtime": "unknown",
    "X-Stainless-Runtime-Version": "unknown"
  };
};
function getBrowserInfo() {
  if (typeof navigator === "undefined" || !navigator) {
    return null;
  }
  const browserPatterns = [
    { key: "edge", pattern: /Edge(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "ie", pattern: /MSIE(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "ie", pattern: /Trident(?:.*rv\:(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "chrome", pattern: /Chrome(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "firefox", pattern: /Firefox(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "safari", pattern: /(?:Version\W+(\d+)\.(\d+)(?:\.(\d+))?)?(?:\W+Mobile\S*)?\W+Safari/ }
  ];
  for (const { key, pattern } of browserPatterns) {
    const match = pattern.exec(navigator.userAgent);
    if (match) {
      const major = match[1] || 0;
      const minor = match[2] || 0;
      const patch = match[3] || 0;
      return { browser: key, version: `${major}.${minor}.${patch}` };
    }
  }
  return null;
}
var normalizeArch = (arch) => {
  if (arch === "x32")
    return "x32";
  if (arch === "x86_64" || arch === "x64")
    return "x64";
  if (arch === "arm")
    return "arm";
  if (arch === "aarch64" || arch === "arm64")
    return "arm64";
  if (arch)
    return `other:${arch}`;
  return "unknown";
};
var normalizePlatform = (platform) => {
  platform = platform.toLowerCase();
  if (platform.includes("ios"))
    return "iOS";
  if (platform === "android")
    return "Android";
  if (platform === "darwin")
    return "MacOS";
  if (platform === "win32")
    return "Windows";
  if (platform === "freebsd")
    return "FreeBSD";
  if (platform === "openbsd")
    return "OpenBSD";
  if (platform === "linux")
    return "Linux";
  if (platform)
    return `Other:${platform}`;
  return "Unknown";
};
var _platformHeaders;
var getPlatformHeaders = () => {
  return _platformHeaders ?? (_platformHeaders = getPlatformProperties());
};
var safeJSON = (text) => {
  try {
    return JSON.parse(text);
  } catch (err) {
    return void 0;
  }
};
var startsWithSchemeRegexp = new RegExp("^(?:[a-z]+:)?//", "i");
var isAbsoluteURL = (url) => {
  return startsWithSchemeRegexp.test(url);
};
var sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
var validatePositiveInteger = (name, n) => {
  if (typeof n !== "number" || !Number.isInteger(n)) {
    throw new OpenAIError(`${name} must be an integer`);
  }
  if (n < 0) {
    throw new OpenAIError(`${name} must be a positive integer`);
  }
  return n;
};
var castToError = (err) => {
  if (err instanceof Error)
    return err;
  if (typeof err === "object" && err !== null) {
    try {
      return new Error(JSON.stringify(err));
    } catch {
    }
  }
  return new Error(err);
};
var readEnv = (env) => {
  if (typeof process !== "undefined") {
    return process.env?.[env]?.trim() ?? void 0;
  }
  if (typeof Deno !== "undefined") {
    return Deno.env?.get?.(env)?.trim();
  }
  return void 0;
};
function isEmptyObj(obj) {
  if (!obj)
    return true;
  for (const _k in obj)
    return false;
  return true;
}
function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
function applyHeadersMut(targetHeaders, newHeaders) {
  for (const k in newHeaders) {
    if (!hasOwn(newHeaders, k))
      continue;
    const lowerKey = k.toLowerCase();
    if (!lowerKey)
      continue;
    const val = newHeaders[k];
    if (val === null) {
      delete targetHeaders[lowerKey];
    } else if (val !== void 0) {
      targetHeaders[lowerKey] = val;
    }
  }
}
function debug(action, ...args) {
  if (typeof process !== "undefined" && process?.env?.["DEBUG"] === "true") {
    console.log(`OpenAI:DEBUG:${action}`, ...args);
  }
}
var uuid4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
};
var isRunningInBrowser = () => {
  return (
    // @ts-ignore
    typeof window !== "undefined" && // @ts-ignore
    typeof window.document !== "undefined" && // @ts-ignore
    typeof navigator !== "undefined"
  );
};
var isHeadersProtocol = (headers) => {
  return typeof headers?.get === "function";
};
var getHeader = (headers, header) => {
  const lowerCasedHeader = header.toLowerCase();
  if (isHeadersProtocol(headers)) {
    const intercapsHeader = header[0]?.toUpperCase() + header.substring(1).replace(/([^\w])(\w)/g, (_m, g1, g2) => g1 + g2.toUpperCase());
    for (const key of [header, lowerCasedHeader, header.toUpperCase(), intercapsHeader]) {
      const value = headers.get(key);
      if (value) {
        return value;
      }
    }
  }
  for (const [key, value] of Object.entries(headers)) {
    if (key.toLowerCase() === lowerCasedHeader) {
      if (Array.isArray(value)) {
        if (value.length <= 1)
          return value[0];
        console.warn(`Received ${value.length} entries for the ${header} header, using the first entry.`);
        return value[0];
      }
      return value;
    }
  }
  return void 0;
};
function isObj(obj) {
  return obj != null && typeof obj === "object" && !Array.isArray(obj);
}

// ../../node_modules/openai/pagination.mjs
var Page = class extends AbstractPage {
  constructor(client, response, body, options) {
    super(client, response, body, options);
    this.data = body.data || [];
    this.object = body.object;
  }
  getPaginatedItems() {
    return this.data ?? [];
  }
  // @deprecated Please use `nextPageInfo()` instead
  /**
   * This page represents a response that isn't actually paginated at the API level
   * so there will never be any next page params.
   */
  nextPageParams() {
    return null;
  }
  nextPageInfo() {
    return null;
  }
};
var CursorPage = class extends AbstractPage {
  constructor(client, response, body, options) {
    super(client, response, body, options);
    this.data = body.data || [];
  }
  getPaginatedItems() {
    return this.data ?? [];
  }
  // @deprecated Please use `nextPageInfo()` instead
  nextPageParams() {
    const info = this.nextPageInfo();
    if (!info)
      return null;
    if ("params" in info)
      return info.params;
    const params = Object.fromEntries(info.url.searchParams);
    if (!Object.keys(params).length)
      return null;
    return params;
  }
  nextPageInfo() {
    const data = this.getPaginatedItems();
    if (!data.length) {
      return null;
    }
    const id = data[data.length - 1]?.id;
    if (!id) {
      return null;
    }
    return { params: { after: id } };
  }
};

// ../../node_modules/openai/resource.mjs
var APIResource = class {
  constructor(client) {
    this._client = client;
  }
};

// ../../node_modules/openai/resources/chat/completions.mjs
var Completions = class extends APIResource {
  create(body, options) {
    return this._client.post("/chat/completions", { body, ...options, stream: body.stream ?? false });
  }
};

// ../../node_modules/openai/resources/chat/chat.mjs
var Chat = class extends APIResource {
  constructor() {
    super(...arguments);
    this.completions = new Completions(this._client);
  }
};
Chat.Completions = Completions;

// ../../node_modules/openai/resources/audio/speech.mjs
var Speech = class extends APIResource {
  /**
   * Generates audio from the input text.
   */
  create(body, options) {
    return this._client.post("/audio/speech", { body, ...options, __binaryResponse: true });
  }
};

// ../../node_modules/openai/resources/audio/transcriptions.mjs
var Transcriptions = class extends APIResource {
  create(body, options) {
    return this._client.post("/audio/transcriptions", multipartFormRequestOptions({ body, ...options }));
  }
};

// ../../node_modules/openai/resources/audio/translations.mjs
var Translations = class extends APIResource {
  create(body, options) {
    return this._client.post("/audio/translations", multipartFormRequestOptions({ body, ...options }));
  }
};

// ../../node_modules/openai/resources/audio/audio.mjs
var Audio = class extends APIResource {
  constructor() {
    super(...arguments);
    this.transcriptions = new Transcriptions(this._client);
    this.translations = new Translations(this._client);
    this.speech = new Speech(this._client);
  }
};
Audio.Transcriptions = Transcriptions;
Audio.Translations = Translations;
Audio.Speech = Speech;

// ../../node_modules/openai/resources/batches.mjs
var Batches = class extends APIResource {
  /**
   * Creates and executes a batch from an uploaded file of requests
   */
  create(body, options) {
    return this._client.post("/batches", { body, ...options });
  }
  /**
   * Retrieves a batch.
   */
  retrieve(batchId, options) {
    return this._client.get(`/batches/${batchId}`, options);
  }
  list(query = {}, options) {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList("/batches", BatchesPage, { query, ...options });
  }
  /**
   * Cancels an in-progress batch. The batch will be in status `cancelling` for up to
   * 10 minutes, before changing to `cancelled`, where it will have partial results
   * (if any) available in the output file.
   */
  cancel(batchId, options) {
    return this._client.post(`/batches/${batchId}/cancel`, options);
  }
};
var BatchesPage = class extends CursorPage {
};
Batches.BatchesPage = BatchesPage;

// ../../node_modules/openai/resources/beta/assistants.mjs
var Assistants = class extends APIResource {
  /**
   * Create an assistant with a model and instructions.
   */
  create(body, options) {
    return this._client.post("/assistants", {
      body,
      ...options,
      headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
    });
  }
  /**
   * Retrieves an assistant.
   */
  retrieve(assistantId, options) {
    return this._client.get(`/assistants/${assistantId}`, {
      ...options,
      headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
    });
  }
  /**
   * Modifies an assistant.
   */
  update(assistantId, body, options) {
    return this._client.post(`/assistants/${assistantId}`, {
      body,
      ...options,
      headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
    });
  }
  list(query = {}, options) {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList("/assistants", AssistantsPage, {
      query,
      ...options,
      headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
    });
  }
  /**
   * Delete an assistant.
   */
  del(assistantId, options) {
    return this._client.delete(`/assistants/${assistantId}`, {
      ...options,
      headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
    });
  }
};
var AssistantsPage = class extends CursorPage {
};
Assistants.AssistantsPage = AssistantsPage;

// ../../node_modules/openai/lib/RunnableFunction.mjs
function isRunnableFunctionWithParse(fn) {
  return typeof fn.parse === "function";
}

// ../../node_modules/openai/lib/chatCompletionUtils.mjs
var isAssistantMessage = (message) => {
  return message?.role === "assistant";
};
var isFunctionMessage = (message) => {
  return message?.role === "function";
};
var isToolMessage = (message) => {
  return message?.role === "tool";
};

// ../../node_modules/openai/lib/EventStream.mjs
var __classPrivateFieldSet3 = function(receiver, state, value, kind2, f) {
  if (kind2 === "m") throw new TypeError("Private method is not writable");
  if (kind2 === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind2 === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet4 = function(receiver, state, kind2, f) {
  if (kind2 === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind2 === "m" ? f : kind2 === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _EventStream_instances;
var _EventStream_connectedPromise;
var _EventStream_resolveConnectedPromise;
var _EventStream_rejectConnectedPromise;
var _EventStream_endPromise;
var _EventStream_resolveEndPromise;
var _EventStream_rejectEndPromise;
var _EventStream_listeners;
var _EventStream_ended;
var _EventStream_errored;
var _EventStream_aborted;
var _EventStream_catchingPromiseCreated;
var _EventStream_handleError;
var EventStream = class {
  constructor() {
    _EventStream_instances.add(this);
    this.controller = new AbortController();
    _EventStream_connectedPromise.set(this, void 0);
    _EventStream_resolveConnectedPromise.set(this, () => {
    });
    _EventStream_rejectConnectedPromise.set(this, () => {
    });
    _EventStream_endPromise.set(this, void 0);
    _EventStream_resolveEndPromise.set(this, () => {
    });
    _EventStream_rejectEndPromise.set(this, () => {
    });
    _EventStream_listeners.set(this, {});
    _EventStream_ended.set(this, false);
    _EventStream_errored.set(this, false);
    _EventStream_aborted.set(this, false);
    _EventStream_catchingPromiseCreated.set(this, false);
    __classPrivateFieldSet3(this, _EventStream_connectedPromise, new Promise((resolve, reject) => {
      __classPrivateFieldSet3(this, _EventStream_resolveConnectedPromise, resolve, "f");
      __classPrivateFieldSet3(this, _EventStream_rejectConnectedPromise, reject, "f");
    }), "f");
    __classPrivateFieldSet3(this, _EventStream_endPromise, new Promise((resolve, reject) => {
      __classPrivateFieldSet3(this, _EventStream_resolveEndPromise, resolve, "f");
      __classPrivateFieldSet3(this, _EventStream_rejectEndPromise, reject, "f");
    }), "f");
    __classPrivateFieldGet4(this, _EventStream_connectedPromise, "f").catch(() => {
    });
    __classPrivateFieldGet4(this, _EventStream_endPromise, "f").catch(() => {
    });
  }
  _run(executor) {
    setTimeout(() => {
      executor().then(() => {
        this._emitFinal();
        this._emit("end");
      }, __classPrivateFieldGet4(this, _EventStream_instances, "m", _EventStream_handleError).bind(this));
    }, 0);
  }
  _connected() {
    if (this.ended)
      return;
    __classPrivateFieldGet4(this, _EventStream_resolveConnectedPromise, "f").call(this);
    this._emit("connect");
  }
  get ended() {
    return __classPrivateFieldGet4(this, _EventStream_ended, "f");
  }
  get errored() {
    return __classPrivateFieldGet4(this, _EventStream_errored, "f");
  }
  get aborted() {
    return __classPrivateFieldGet4(this, _EventStream_aborted, "f");
  }
  abort() {
    this.controller.abort();
  }
  /**
   * Adds the listener function to the end of the listeners array for the event.
   * No checks are made to see if the listener has already been added. Multiple calls passing
   * the same combination of event and listener will result in the listener being added, and
   * called, multiple times.
   * @returns this ChatCompletionStream, so that calls can be chained
   */
  on(event, listener) {
    const listeners = __classPrivateFieldGet4(this, _EventStream_listeners, "f")[event] || (__classPrivateFieldGet4(this, _EventStream_listeners, "f")[event] = []);
    listeners.push({ listener });
    return this;
  }
  /**
   * Removes the specified listener from the listener array for the event.
   * off() will remove, at most, one instance of a listener from the listener array. If any single
   * listener has been added multiple times to the listener array for the specified event, then
   * off() must be called multiple times to remove each instance.
   * @returns this ChatCompletionStream, so that calls can be chained
   */
  off(event, listener) {
    const listeners = __classPrivateFieldGet4(this, _EventStream_listeners, "f")[event];
    if (!listeners)
      return this;
    const index = listeners.findIndex((l) => l.listener === listener);
    if (index >= 0)
      listeners.splice(index, 1);
    return this;
  }
  /**
   * Adds a one-time listener function for the event. The next time the event is triggered,
   * this listener is removed and then invoked.
   * @returns this ChatCompletionStream, so that calls can be chained
   */
  once(event, listener) {
    const listeners = __classPrivateFieldGet4(this, _EventStream_listeners, "f")[event] || (__classPrivateFieldGet4(this, _EventStream_listeners, "f")[event] = []);
    listeners.push({ listener, once: true });
    return this;
  }
  /**
   * This is similar to `.once()`, but returns a Promise that resolves the next time
   * the event is triggered, instead of calling a listener callback.
   * @returns a Promise that resolves the next time given event is triggered,
   * or rejects if an error is emitted.  (If you request the 'error' event,
   * returns a promise that resolves with the error).
   *
   * Example:
   *
   *   const message = await stream.emitted('message') // rejects if the stream errors
   */
  emitted(event) {
    return new Promise((resolve, reject) => {
      __classPrivateFieldSet3(this, _EventStream_catchingPromiseCreated, true, "f");
      if (event !== "error")
        this.once("error", reject);
      this.once(event, resolve);
    });
  }
  async done() {
    __classPrivateFieldSet3(this, _EventStream_catchingPromiseCreated, true, "f");
    await __classPrivateFieldGet4(this, _EventStream_endPromise, "f");
  }
  _emit(event, ...args) {
    if (__classPrivateFieldGet4(this, _EventStream_ended, "f")) {
      return;
    }
    if (event === "end") {
      __classPrivateFieldSet3(this, _EventStream_ended, true, "f");
      __classPrivateFieldGet4(this, _EventStream_resolveEndPromise, "f").call(this);
    }
    const listeners = __classPrivateFieldGet4(this, _EventStream_listeners, "f")[event];
    if (listeners) {
      __classPrivateFieldGet4(this, _EventStream_listeners, "f")[event] = listeners.filter((l) => !l.once);
      listeners.forEach(({ listener }) => listener(...args));
    }
    if (event === "abort") {
      const error = args[0];
      if (!__classPrivateFieldGet4(this, _EventStream_catchingPromiseCreated, "f") && !listeners?.length) {
        Promise.reject(error);
      }
      __classPrivateFieldGet4(this, _EventStream_rejectConnectedPromise, "f").call(this, error);
      __classPrivateFieldGet4(this, _EventStream_rejectEndPromise, "f").call(this, error);
      this._emit("end");
      return;
    }
    if (event === "error") {
      const error = args[0];
      if (!__classPrivateFieldGet4(this, _EventStream_catchingPromiseCreated, "f") && !listeners?.length) {
        Promise.reject(error);
      }
      __classPrivateFieldGet4(this, _EventStream_rejectConnectedPromise, "f").call(this, error);
      __classPrivateFieldGet4(this, _EventStream_rejectEndPromise, "f").call(this, error);
      this._emit("end");
    }
  }
  _emitFinal() {
  }
};
_EventStream_connectedPromise = /* @__PURE__ */ new WeakMap(), _EventStream_resolveConnectedPromise = /* @__PURE__ */ new WeakMap(), _EventStream_rejectConnectedPromise = /* @__PURE__ */ new WeakMap(), _EventStream_endPromise = /* @__PURE__ */ new WeakMap(), _EventStream_resolveEndPromise = /* @__PURE__ */ new WeakMap(), _EventStream_rejectEndPromise = /* @__PURE__ */ new WeakMap(), _EventStream_listeners = /* @__PURE__ */ new WeakMap(), _EventStream_ended = /* @__PURE__ */ new WeakMap(), _EventStream_errored = /* @__PURE__ */ new WeakMap(), _EventStream_aborted = /* @__PURE__ */ new WeakMap(), _EventStream_catchingPromiseCreated = /* @__PURE__ */ new WeakMap(), _EventStream_instances = /* @__PURE__ */ new WeakSet(), _EventStream_handleError = function _EventStream_handleError2(error) {
  __classPrivateFieldSet3(this, _EventStream_errored, true, "f");
  if (error instanceof Error && error.name === "AbortError") {
    error = new APIUserAbortError();
  }
  if (error instanceof APIUserAbortError) {
    __classPrivateFieldSet3(this, _EventStream_aborted, true, "f");
    return this._emit("abort", error);
  }
  if (error instanceof OpenAIError) {
    return this._emit("error", error);
  }
  if (error instanceof Error) {
    const openAIError = new OpenAIError(error.message);
    openAIError.cause = error;
    return this._emit("error", openAIError);
  }
  return this._emit("error", new OpenAIError(String(error)));
};

// ../../node_modules/openai/lib/parser.mjs
function isAutoParsableResponseFormat(response_format) {
  return response_format?.["$brand"] === "auto-parseable-response-format";
}
function isAutoParsableTool(tool) {
  return tool?.["$brand"] === "auto-parseable-tool";
}
function maybeParseChatCompletion(completion, params) {
  if (!params || !hasAutoParseableInput(params)) {
    return {
      ...completion,
      choices: completion.choices.map((choice) => ({
        ...choice,
        message: { ...choice.message, parsed: null, tool_calls: choice.message.tool_calls ?? [] }
      }))
    };
  }
  return parseChatCompletion(completion, params);
}
function parseChatCompletion(completion, params) {
  const choices = completion.choices.map((choice) => {
    if (choice.finish_reason === "length") {
      throw new LengthFinishReasonError();
    }
    if (choice.finish_reason === "content_filter") {
      throw new ContentFilterFinishReasonError();
    }
    return {
      ...choice,
      message: {
        ...choice.message,
        tool_calls: choice.message.tool_calls?.map((toolCall) => parseToolCall(params, toolCall)) ?? [],
        parsed: choice.message.content && !choice.message.refusal ? parseResponseFormat(params, choice.message.content) : null
      }
    };
  });
  return { ...completion, choices };
}
function parseResponseFormat(params, content) {
  if (params.response_format?.type !== "json_schema") {
    return null;
  }
  if (params.response_format?.type === "json_schema") {
    if ("$parseRaw" in params.response_format) {
      const response_format = params.response_format;
      return response_format.$parseRaw(content);
    }
    return JSON.parse(content);
  }
  return null;
}
function parseToolCall(params, toolCall) {
  const inputTool = params.tools?.find((inputTool2) => inputTool2.function?.name === toolCall.function.name);
  return {
    ...toolCall,
    function: {
      ...toolCall.function,
      parsed_arguments: isAutoParsableTool(inputTool) ? inputTool.$parseRaw(toolCall.function.arguments) : inputTool?.function.strict ? JSON.parse(toolCall.function.arguments) : null
    }
  };
}
function shouldParseToolCall(params, toolCall) {
  if (!params) {
    return false;
  }
  const inputTool = params.tools?.find((inputTool2) => inputTool2.function?.name === toolCall.function.name);
  return isAutoParsableTool(inputTool) || inputTool?.function.strict || false;
}
function hasAutoParseableInput(params) {
  if (isAutoParsableResponseFormat(params.response_format)) {
    return true;
  }
  return params.tools?.some((t) => isAutoParsableTool(t) || t.type === "function" && t.function.strict === true) ?? false;
}
function validateInputTools(tools) {
  for (const tool of tools ?? []) {
    if (tool.type !== "function") {
      throw new OpenAIError(`Currently only \`function\` tool types support auto-parsing; Received \`${tool.type}\``);
    }
    if (tool.function.strict !== true) {
      throw new OpenAIError(`The \`${tool.function.name}\` tool is not marked with \`strict: true\`. Only strict function tools can be auto-parsed`);
    }
  }
}

// ../../node_modules/openai/lib/AbstractChatCompletionRunner.mjs
var __classPrivateFieldGet5 = function(receiver, state, kind2, f) {
  if (kind2 === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind2 === "m" ? f : kind2 === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AbstractChatCompletionRunner_instances;
var _AbstractChatCompletionRunner_getFinalContent;
var _AbstractChatCompletionRunner_getFinalMessage;
var _AbstractChatCompletionRunner_getFinalFunctionCall;
var _AbstractChatCompletionRunner_getFinalFunctionCallResult;
var _AbstractChatCompletionRunner_calculateTotalUsage;
var _AbstractChatCompletionRunner_validateParams;
var _AbstractChatCompletionRunner_stringifyFunctionCallResult;
var DEFAULT_MAX_CHAT_COMPLETIONS = 10;
var AbstractChatCompletionRunner = class extends EventStream {
  constructor() {
    super(...arguments);
    _AbstractChatCompletionRunner_instances.add(this);
    this._chatCompletions = [];
    this.messages = [];
  }
  _addChatCompletion(chatCompletion) {
    this._chatCompletions.push(chatCompletion);
    this._emit("chatCompletion", chatCompletion);
    const message = chatCompletion.choices[0]?.message;
    if (message)
      this._addMessage(message);
    return chatCompletion;
  }
  _addMessage(message, emit = true) {
    if (!("content" in message))
      message.content = null;
    this.messages.push(message);
    if (emit) {
      this._emit("message", message);
      if ((isFunctionMessage(message) || isToolMessage(message)) && message.content) {
        this._emit("functionCallResult", message.content);
      } else if (isAssistantMessage(message) && message.function_call) {
        this._emit("functionCall", message.function_call);
      } else if (isAssistantMessage(message) && message.tool_calls) {
        for (const tool_call of message.tool_calls) {
          if (tool_call.type === "function") {
            this._emit("functionCall", tool_call.function);
          }
        }
      }
    }
  }
  /**
   * @returns a promise that resolves with the final ChatCompletion, or rejects
   * if an error occurred or the stream ended prematurely without producing a ChatCompletion.
   */
  async finalChatCompletion() {
    await this.done();
    const completion = this._chatCompletions[this._chatCompletions.length - 1];
    if (!completion)
      throw new OpenAIError("stream ended without producing a ChatCompletion");
    return completion;
  }
  /**
   * @returns a promise that resolves with the content of the final ChatCompletionMessage, or rejects
   * if an error occurred or the stream ended prematurely without producing a ChatCompletionMessage.
   */
  async finalContent() {
    await this.done();
    return __classPrivateFieldGet5(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalContent).call(this);
  }
  /**
   * @returns a promise that resolves with the the final assistant ChatCompletionMessage response,
   * or rejects if an error occurred or the stream ended prematurely without producing a ChatCompletionMessage.
   */
  async finalMessage() {
    await this.done();
    return __classPrivateFieldGet5(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalMessage).call(this);
  }
  /**
   * @returns a promise that resolves with the content of the final FunctionCall, or rejects
   * if an error occurred or the stream ended prematurely without producing a ChatCompletionMessage.
   */
  async finalFunctionCall() {
    await this.done();
    return __classPrivateFieldGet5(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalFunctionCall).call(this);
  }
  async finalFunctionCallResult() {
    await this.done();
    return __classPrivateFieldGet5(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalFunctionCallResult).call(this);
  }
  async totalUsage() {
    await this.done();
    return __classPrivateFieldGet5(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_calculateTotalUsage).call(this);
  }
  allChatCompletions() {
    return [...this._chatCompletions];
  }
  _emitFinal() {
    const completion = this._chatCompletions[this._chatCompletions.length - 1];
    if (completion)
      this._emit("finalChatCompletion", completion);
    const finalMessage = __classPrivateFieldGet5(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalMessage).call(this);
    if (finalMessage)
      this._emit("finalMessage", finalMessage);
    const finalContent = __classPrivateFieldGet5(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalContent).call(this);
    if (finalContent)
      this._emit("finalContent", finalContent);
    const finalFunctionCall = __classPrivateFieldGet5(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalFunctionCall).call(this);
    if (finalFunctionCall)
      this._emit("finalFunctionCall", finalFunctionCall);
    const finalFunctionCallResult = __classPrivateFieldGet5(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalFunctionCallResult).call(this);
    if (finalFunctionCallResult != null)
      this._emit("finalFunctionCallResult", finalFunctionCallResult);
    if (this._chatCompletions.some((c) => c.usage)) {
      this._emit("totalUsage", __classPrivateFieldGet5(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_calculateTotalUsage).call(this));
    }
  }
  async _createChatCompletion(client, params, options) {
    const signal = options?.signal;
    if (signal) {
      if (signal.aborted)
        this.controller.abort();
      signal.addEventListener("abort", () => this.controller.abort());
    }
    __classPrivateFieldGet5(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_validateParams).call(this, params);
    const chatCompletion = await client.chat.completions.create({ ...params, stream: false }, { ...options, signal: this.controller.signal });
    this._connected();
    return this._addChatCompletion(parseChatCompletion(chatCompletion, params));
  }
  async _runChatCompletion(client, params, options) {
    for (const message of params.messages) {
      this._addMessage(message, false);
    }
    return await this._createChatCompletion(client, params, options);
  }
  async _runFunctions(client, params, options) {
    const role = "function";
    const { function_call = "auto", stream, ...restParams } = params;
    const singleFunctionToCall = typeof function_call !== "string" && function_call?.name;
    const { maxChatCompletions = DEFAULT_MAX_CHAT_COMPLETIONS } = options || {};
    const functionsByName = {};
    for (const f of params.functions) {
      functionsByName[f.name || f.function.name] = f;
    }
    const functions = params.functions.map((f) => ({
      name: f.name || f.function.name,
      parameters: f.parameters,
      description: f.description
    }));
    for (const message of params.messages) {
      this._addMessage(message, false);
    }
    for (let i = 0; i < maxChatCompletions; ++i) {
      const chatCompletion = await this._createChatCompletion(client, {
        ...restParams,
        function_call,
        functions,
        messages: [...this.messages]
      }, options);
      const message = chatCompletion.choices[0]?.message;
      if (!message) {
        throw new OpenAIError(`missing message in ChatCompletion response`);
      }
      if (!message.function_call)
        return;
      const { name, arguments: args } = message.function_call;
      const fn = functionsByName[name];
      if (!fn) {
        const content2 = `Invalid function_call: ${JSON.stringify(name)}. Available options are: ${functions.map((f) => JSON.stringify(f.name)).join(", ")}. Please try again`;
        this._addMessage({ role, name, content: content2 });
        continue;
      } else if (singleFunctionToCall && singleFunctionToCall !== name) {
        const content2 = `Invalid function_call: ${JSON.stringify(name)}. ${JSON.stringify(singleFunctionToCall)} requested. Please try again`;
        this._addMessage({ role, name, content: content2 });
        continue;
      }
      let parsed;
      try {
        parsed = isRunnableFunctionWithParse(fn) ? await fn.parse(args) : args;
      } catch (error) {
        this._addMessage({
          role,
          name,
          content: error instanceof Error ? error.message : String(error)
        });
        continue;
      }
      const rawContent = await fn.function(parsed, this);
      const content = __classPrivateFieldGet5(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_stringifyFunctionCallResult).call(this, rawContent);
      this._addMessage({ role, name, content });
      if (singleFunctionToCall)
        return;
    }
  }
  async _runTools(client, params, options) {
    const role = "tool";
    const { tool_choice = "auto", stream, ...restParams } = params;
    const singleFunctionToCall = typeof tool_choice !== "string" && tool_choice?.function?.name;
    const { maxChatCompletions = DEFAULT_MAX_CHAT_COMPLETIONS } = options || {};
    const inputTools = params.tools.map((tool) => {
      if (isAutoParsableTool(tool)) {
        if (!tool.$callback) {
          throw new OpenAIError("Tool given to `.runTools()` that does not have an associated function");
        }
        return {
          type: "function",
          function: {
            function: tool.$callback,
            name: tool.function.name,
            description: tool.function.description || "",
            parameters: tool.function.parameters,
            parse: tool.$parseRaw,
            strict: true
          }
        };
      }
      return tool;
    });
    const functionsByName = {};
    for (const f of inputTools) {
      if (f.type === "function") {
        functionsByName[f.function.name || f.function.function.name] = f.function;
      }
    }
    const tools = "tools" in params ? inputTools.map((t) => t.type === "function" ? {
      type: "function",
      function: {
        name: t.function.name || t.function.function.name,
        parameters: t.function.parameters,
        description: t.function.description,
        strict: t.function.strict
      }
    } : t) : void 0;
    for (const message of params.messages) {
      this._addMessage(message, false);
    }
    for (let i = 0; i < maxChatCompletions; ++i) {
      const chatCompletion = await this._createChatCompletion(client, {
        ...restParams,
        tool_choice,
        tools,
        messages: [...this.messages]
      }, options);
      const message = chatCompletion.choices[0]?.message;
      if (!message) {
        throw new OpenAIError(`missing message in ChatCompletion response`);
      }
      if (!message.tool_calls?.length) {
        return;
      }
      for (const tool_call of message.tool_calls) {
        if (tool_call.type !== "function")
          continue;
        const tool_call_id = tool_call.id;
        const { name, arguments: args } = tool_call.function;
        const fn = functionsByName[name];
        if (!fn) {
          const content2 = `Invalid tool_call: ${JSON.stringify(name)}. Available options are: ${Object.keys(functionsByName).map((name2) => JSON.stringify(name2)).join(", ")}. Please try again`;
          this._addMessage({ role, tool_call_id, content: content2 });
          continue;
        } else if (singleFunctionToCall && singleFunctionToCall !== name) {
          const content2 = `Invalid tool_call: ${JSON.stringify(name)}. ${JSON.stringify(singleFunctionToCall)} requested. Please try again`;
          this._addMessage({ role, tool_call_id, content: content2 });
          continue;
        }
        let parsed;
        try {
          parsed = isRunnableFunctionWithParse(fn) ? await fn.parse(args) : args;
        } catch (error) {
          const content2 = error instanceof Error ? error.message : String(error);
          this._addMessage({ role, tool_call_id, content: content2 });
          continue;
        }
        const rawContent = await fn.function(parsed, this);
        const content = __classPrivateFieldGet5(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_stringifyFunctionCallResult).call(this, rawContent);
        this._addMessage({ role, tool_call_id, content });
        if (singleFunctionToCall) {
          return;
        }
      }
    }
    return;
  }
};
_AbstractChatCompletionRunner_instances = /* @__PURE__ */ new WeakSet(), _AbstractChatCompletionRunner_getFinalContent = function _AbstractChatCompletionRunner_getFinalContent2() {
  return __classPrivateFieldGet5(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalMessage).call(this).content ?? null;
}, _AbstractChatCompletionRunner_getFinalMessage = function _AbstractChatCompletionRunner_getFinalMessage2() {
  let i = this.messages.length;
  while (i-- > 0) {
    const message = this.messages[i];
    if (isAssistantMessage(message)) {
      const { function_call, ...rest } = message;
      const ret = {
        ...rest,
        content: message.content ?? null,
        refusal: message.refusal ?? null
      };
      if (function_call) {
        ret.function_call = function_call;
      }
      return ret;
    }
  }
  throw new OpenAIError("stream ended without producing a ChatCompletionMessage with role=assistant");
}, _AbstractChatCompletionRunner_getFinalFunctionCall = function _AbstractChatCompletionRunner_getFinalFunctionCall2() {
  for (let i = this.messages.length - 1; i >= 0; i--) {
    const message = this.messages[i];
    if (isAssistantMessage(message) && message?.function_call) {
      return message.function_call;
    }
    if (isAssistantMessage(message) && message?.tool_calls?.length) {
      return message.tool_calls.at(-1)?.function;
    }
  }
  return;
}, _AbstractChatCompletionRunner_getFinalFunctionCallResult = function _AbstractChatCompletionRunner_getFinalFunctionCallResult2() {
  for (let i = this.messages.length - 1; i >= 0; i--) {
    const message = this.messages[i];
    if (isFunctionMessage(message) && message.content != null) {
      return message.content;
    }
    if (isToolMessage(message) && message.content != null && typeof message.content === "string" && this.messages.some((x) => x.role === "assistant" && x.tool_calls?.some((y) => y.type === "function" && y.id === message.tool_call_id))) {
      return message.content;
    }
  }
  return;
}, _AbstractChatCompletionRunner_calculateTotalUsage = function _AbstractChatCompletionRunner_calculateTotalUsage2() {
  const total = {
    completion_tokens: 0,
    prompt_tokens: 0,
    total_tokens: 0
  };
  for (const { usage } of this._chatCompletions) {
    if (usage) {
      total.completion_tokens += usage.completion_tokens;
      total.prompt_tokens += usage.prompt_tokens;
      total.total_tokens += usage.total_tokens;
    }
  }
  return total;
}, _AbstractChatCompletionRunner_validateParams = function _AbstractChatCompletionRunner_validateParams2(params) {
  if (params.n != null && params.n > 1) {
    throw new OpenAIError("ChatCompletion convenience helpers only support n=1 at this time. To use n>1, please use chat.completions.create() directly.");
  }
}, _AbstractChatCompletionRunner_stringifyFunctionCallResult = function _AbstractChatCompletionRunner_stringifyFunctionCallResult2(rawContent) {
  return typeof rawContent === "string" ? rawContent : rawContent === void 0 ? "undefined" : JSON.stringify(rawContent);
};

// ../../node_modules/openai/lib/ChatCompletionRunner.mjs
var ChatCompletionRunner = class _ChatCompletionRunner extends AbstractChatCompletionRunner {
  /** @deprecated - please use `runTools` instead. */
  static runFunctions(client, params, options) {
    const runner = new _ChatCompletionRunner();
    const opts = {
      ...options,
      headers: { ...options?.headers, "X-Stainless-Helper-Method": "runFunctions" }
    };
    runner._run(() => runner._runFunctions(client, params, opts));
    return runner;
  }
  static runTools(client, params, options) {
    const runner = new _ChatCompletionRunner();
    const opts = {
      ...options,
      headers: { ...options?.headers, "X-Stainless-Helper-Method": "runTools" }
    };
    runner._run(() => runner._runTools(client, params, opts));
    return runner;
  }
  _addMessage(message, emit = true) {
    super._addMessage(message, emit);
    if (isAssistantMessage(message) && message.content) {
      this._emit("content", message.content);
    }
  }
};

// ../../node_modules/openai/_vendor/partial-json-parser/parser.mjs
var STR = 1;
var NUM = 2;
var ARR = 4;
var OBJ = 8;
var NULL = 16;
var BOOL = 32;
var NAN = 64;
var INFINITY = 128;
var MINUS_INFINITY = 256;
var INF = INFINITY | MINUS_INFINITY;
var SPECIAL = NULL | BOOL | INF | NAN;
var ATOM = STR | NUM | SPECIAL;
var COLLECTION = ARR | OBJ;
var ALL = ATOM | COLLECTION;
var Allow = {
  STR,
  NUM,
  ARR,
  OBJ,
  NULL,
  BOOL,
  NAN,
  INFINITY,
  MINUS_INFINITY,
  INF,
  SPECIAL,
  ATOM,
  COLLECTION,
  ALL
};
var PartialJSON = class extends Error {
};
var MalformedJSON = class extends Error {
};
function parseJSON(jsonString, allowPartial = Allow.ALL) {
  if (typeof jsonString !== "string") {
    throw new TypeError(`expecting str, got ${typeof jsonString}`);
  }
  if (!jsonString.trim()) {
    throw new Error(`${jsonString} is empty`);
  }
  return _parseJSON(jsonString.trim(), allowPartial);
}
var _parseJSON = (jsonString, allow) => {
  const length = jsonString.length;
  let index = 0;
  const markPartialJSON = (msg) => {
    throw new PartialJSON(`${msg} at position ${index}`);
  };
  const throwMalformedError = (msg) => {
    throw new MalformedJSON(`${msg} at position ${index}`);
  };
  const parseAny = () => {
    skipBlank();
    if (index >= length)
      markPartialJSON("Unexpected end of input");
    if (jsonString[index] === '"')
      return parseStr();
    if (jsonString[index] === "{")
      return parseObj();
    if (jsonString[index] === "[")
      return parseArr();
    if (jsonString.substring(index, index + 4) === "null" || Allow.NULL & allow && length - index < 4 && "null".startsWith(jsonString.substring(index))) {
      index += 4;
      return null;
    }
    if (jsonString.substring(index, index + 4) === "true" || Allow.BOOL & allow && length - index < 4 && "true".startsWith(jsonString.substring(index))) {
      index += 4;
      return true;
    }
    if (jsonString.substring(index, index + 5) === "false" || Allow.BOOL & allow && length - index < 5 && "false".startsWith(jsonString.substring(index))) {
      index += 5;
      return false;
    }
    if (jsonString.substring(index, index + 8) === "Infinity" || Allow.INFINITY & allow && length - index < 8 && "Infinity".startsWith(jsonString.substring(index))) {
      index += 8;
      return Infinity;
    }
    if (jsonString.substring(index, index + 9) === "-Infinity" || Allow.MINUS_INFINITY & allow && 1 < length - index && length - index < 9 && "-Infinity".startsWith(jsonString.substring(index))) {
      index += 9;
      return -Infinity;
    }
    if (jsonString.substring(index, index + 3) === "NaN" || Allow.NAN & allow && length - index < 3 && "NaN".startsWith(jsonString.substring(index))) {
      index += 3;
      return NaN;
    }
    return parseNum();
  };
  const parseStr = () => {
    const start = index;
    let escape2 = false;
    index++;
    while (index < length && (jsonString[index] !== '"' || escape2 && jsonString[index - 1] === "\\")) {
      escape2 = jsonString[index] === "\\" ? !escape2 : false;
      index++;
    }
    if (jsonString.charAt(index) == '"') {
      try {
        return JSON.parse(jsonString.substring(start, ++index - Number(escape2)));
      } catch (e) {
        throwMalformedError(String(e));
      }
    } else if (Allow.STR & allow) {
      try {
        return JSON.parse(jsonString.substring(start, index - Number(escape2)) + '"');
      } catch (e) {
        return JSON.parse(jsonString.substring(start, jsonString.lastIndexOf("\\")) + '"');
      }
    }
    markPartialJSON("Unterminated string literal");
  };
  const parseObj = () => {
    index++;
    skipBlank();
    const obj = {};
    try {
      while (jsonString[index] !== "}") {
        skipBlank();
        if (index >= length && Allow.OBJ & allow)
          return obj;
        const key = parseStr();
        skipBlank();
        index++;
        try {
          const value = parseAny();
          Object.defineProperty(obj, key, { value, writable: true, enumerable: true, configurable: true });
        } catch (e) {
          if (Allow.OBJ & allow)
            return obj;
          else
            throw e;
        }
        skipBlank();
        if (jsonString[index] === ",")
          index++;
      }
    } catch (e) {
      if (Allow.OBJ & allow)
        return obj;
      else
        markPartialJSON("Expected '}' at end of object");
    }
    index++;
    return obj;
  };
  const parseArr = () => {
    index++;
    const arr = [];
    try {
      while (jsonString[index] !== "]") {
        arr.push(parseAny());
        skipBlank();
        if (jsonString[index] === ",") {
          index++;
        }
      }
    } catch (e) {
      if (Allow.ARR & allow) {
        return arr;
      }
      markPartialJSON("Expected ']' at end of array");
    }
    index++;
    return arr;
  };
  const parseNum = () => {
    if (index === 0) {
      if (jsonString === "-" && Allow.NUM & allow)
        markPartialJSON("Not sure what '-' is");
      try {
        return JSON.parse(jsonString);
      } catch (e) {
        if (Allow.NUM & allow) {
          try {
            if ("." === jsonString[jsonString.length - 1])
              return JSON.parse(jsonString.substring(0, jsonString.lastIndexOf(".")));
            return JSON.parse(jsonString.substring(0, jsonString.lastIndexOf("e")));
          } catch (e2) {
          }
        }
        throwMalformedError(String(e));
      }
    }
    const start = index;
    if (jsonString[index] === "-")
      index++;
    while (jsonString[index] && !",]}".includes(jsonString[index]))
      index++;
    if (index == length && !(Allow.NUM & allow))
      markPartialJSON("Unterminated number literal");
    try {
      return JSON.parse(jsonString.substring(start, index));
    } catch (e) {
      if (jsonString.substring(start, index) === "-" && Allow.NUM & allow)
        markPartialJSON("Not sure what '-' is");
      try {
        return JSON.parse(jsonString.substring(start, jsonString.lastIndexOf("e")));
      } catch (e2) {
        throwMalformedError(String(e2));
      }
    }
  };
  const skipBlank = () => {
    while (index < length && " \n\r	".includes(jsonString[index])) {
      index++;
    }
  };
  return parseAny();
};
var partialParse = (input) => parseJSON(input, Allow.ALL ^ Allow.NUM);

// ../../node_modules/openai/lib/ChatCompletionStream.mjs
var __classPrivateFieldSet4 = function(receiver, state, value, kind2, f) {
  if (kind2 === "m") throw new TypeError("Private method is not writable");
  if (kind2 === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind2 === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet6 = function(receiver, state, kind2, f) {
  if (kind2 === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind2 === "m" ? f : kind2 === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ChatCompletionStream_instances;
var _ChatCompletionStream_params;
var _ChatCompletionStream_choiceEventStates;
var _ChatCompletionStream_currentChatCompletionSnapshot;
var _ChatCompletionStream_beginRequest;
var _ChatCompletionStream_getChoiceEventState;
var _ChatCompletionStream_addChunk;
var _ChatCompletionStream_emitToolCallDoneEvent;
var _ChatCompletionStream_emitContentDoneEvents;
var _ChatCompletionStream_endRequest;
var _ChatCompletionStream_getAutoParseableResponseFormat;
var _ChatCompletionStream_accumulateChatCompletion;
var ChatCompletionStream = class _ChatCompletionStream extends AbstractChatCompletionRunner {
  constructor(params) {
    super();
    _ChatCompletionStream_instances.add(this);
    _ChatCompletionStream_params.set(this, void 0);
    _ChatCompletionStream_choiceEventStates.set(this, void 0);
    _ChatCompletionStream_currentChatCompletionSnapshot.set(this, void 0);
    __classPrivateFieldSet4(this, _ChatCompletionStream_params, params, "f");
    __classPrivateFieldSet4(this, _ChatCompletionStream_choiceEventStates, [], "f");
  }
  get currentChatCompletionSnapshot() {
    return __classPrivateFieldGet6(this, _ChatCompletionStream_currentChatCompletionSnapshot, "f");
  }
  /**
   * Intended for use on the frontend, consuming a stream produced with
   * `.toReadableStream()` on the backend.
   *
   * Note that messages sent to the model do not appear in `.on('message')`
   * in this context.
   */
  static fromReadableStream(stream) {
    const runner = new _ChatCompletionStream(null);
    runner._run(() => runner._fromReadableStream(stream));
    return runner;
  }
  static createChatCompletion(client, params, options) {
    const runner = new _ChatCompletionStream(params);
    runner._run(() => runner._runChatCompletion(client, { ...params, stream: true }, { ...options, headers: { ...options?.headers, "X-Stainless-Helper-Method": "stream" } }));
    return runner;
  }
  async _createChatCompletion(client, params, options) {
    super._createChatCompletion;
    const signal = options?.signal;
    if (signal) {
      if (signal.aborted)
        this.controller.abort();
      signal.addEventListener("abort", () => this.controller.abort());
    }
    __classPrivateFieldGet6(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_beginRequest).call(this);
    const stream = await client.chat.completions.create({ ...params, stream: true }, { ...options, signal: this.controller.signal });
    this._connected();
    for await (const chunk of stream) {
      __classPrivateFieldGet6(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_addChunk).call(this, chunk);
    }
    if (stream.controller.signal?.aborted) {
      throw new APIUserAbortError();
    }
    return this._addChatCompletion(__classPrivateFieldGet6(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_endRequest).call(this));
  }
  async _fromReadableStream(readableStream, options) {
    const signal = options?.signal;
    if (signal) {
      if (signal.aborted)
        this.controller.abort();
      signal.addEventListener("abort", () => this.controller.abort());
    }
    __classPrivateFieldGet6(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_beginRequest).call(this);
    this._connected();
    const stream = Stream.fromReadableStream(readableStream, this.controller);
    let chatId;
    for await (const chunk of stream) {
      if (chatId && chatId !== chunk.id) {
        this._addChatCompletion(__classPrivateFieldGet6(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_endRequest).call(this));
      }
      __classPrivateFieldGet6(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_addChunk).call(this, chunk);
      chatId = chunk.id;
    }
    if (stream.controller.signal?.aborted) {
      throw new APIUserAbortError();
    }
    return this._addChatCompletion(__classPrivateFieldGet6(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_endRequest).call(this));
  }
  [(_ChatCompletionStream_params = /* @__PURE__ */ new WeakMap(), _ChatCompletionStream_choiceEventStates = /* @__PURE__ */ new WeakMap(), _ChatCompletionStream_currentChatCompletionSnapshot = /* @__PURE__ */ new WeakMap(), _ChatCompletionStream_instances = /* @__PURE__ */ new WeakSet(), _ChatCompletionStream_beginRequest = function _ChatCompletionStream_beginRequest2() {
    if (this.ended)
      return;
    __classPrivateFieldSet4(this, _ChatCompletionStream_currentChatCompletionSnapshot, void 0, "f");
  }, _ChatCompletionStream_getChoiceEventState = function _ChatCompletionStream_getChoiceEventState2(choice) {
    let state = __classPrivateFieldGet6(this, _ChatCompletionStream_choiceEventStates, "f")[choice.index];
    if (state) {
      return state;
    }
    state = {
      content_done: false,
      refusal_done: false,
      logprobs_content_done: false,
      logprobs_refusal_done: false,
      done_tool_calls: /* @__PURE__ */ new Set(),
      current_tool_call_index: null
    };
    __classPrivateFieldGet6(this, _ChatCompletionStream_choiceEventStates, "f")[choice.index] = state;
    return state;
  }, _ChatCompletionStream_addChunk = function _ChatCompletionStream_addChunk2(chunk) {
    if (this.ended)
      return;
    const completion = __classPrivateFieldGet6(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_accumulateChatCompletion).call(this, chunk);
    this._emit("chunk", chunk, completion);
    for (const choice of chunk.choices) {
      const choiceSnapshot = completion.choices[choice.index];
      if (choice.delta.content != null && choiceSnapshot.message?.role === "assistant" && choiceSnapshot.message?.content) {
        this._emit("content", choice.delta.content, choiceSnapshot.message.content);
        this._emit("content.delta", {
          delta: choice.delta.content,
          snapshot: choiceSnapshot.message.content,
          parsed: choiceSnapshot.message.parsed
        });
      }
      if (choice.delta.refusal != null && choiceSnapshot.message?.role === "assistant" && choiceSnapshot.message?.refusal) {
        this._emit("refusal.delta", {
          delta: choice.delta.refusal,
          snapshot: choiceSnapshot.message.refusal
        });
      }
      if (choice.logprobs?.content != null && choiceSnapshot.message?.role === "assistant") {
        this._emit("logprobs.content.delta", {
          content: choice.logprobs?.content,
          snapshot: choiceSnapshot.logprobs?.content ?? []
        });
      }
      if (choice.logprobs?.refusal != null && choiceSnapshot.message?.role === "assistant") {
        this._emit("logprobs.refusal.delta", {
          refusal: choice.logprobs?.refusal,
          snapshot: choiceSnapshot.logprobs?.refusal ?? []
        });
      }
      const state = __classPrivateFieldGet6(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_getChoiceEventState).call(this, choiceSnapshot);
      if (choiceSnapshot.finish_reason) {
        __classPrivateFieldGet6(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_emitContentDoneEvents).call(this, choiceSnapshot);
        if (state.current_tool_call_index != null) {
          __classPrivateFieldGet6(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_emitToolCallDoneEvent).call(this, choiceSnapshot, state.current_tool_call_index);
        }
      }
      for (const toolCall of choice.delta.tool_calls ?? []) {
        if (state.current_tool_call_index !== toolCall.index) {
          __classPrivateFieldGet6(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_emitContentDoneEvents).call(this, choiceSnapshot);
          if (state.current_tool_call_index != null) {
            __classPrivateFieldGet6(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_emitToolCallDoneEvent).call(this, choiceSnapshot, state.current_tool_call_index);
          }
        }
        state.current_tool_call_index = toolCall.index;
      }
      for (const toolCallDelta of choice.delta.tool_calls ?? []) {
        const toolCallSnapshot = choiceSnapshot.message.tool_calls?.[toolCallDelta.index];
        if (!toolCallSnapshot?.type) {
          continue;
        }
        if (toolCallSnapshot?.type === "function") {
          this._emit("tool_calls.function.arguments.delta", {
            name: toolCallSnapshot.function?.name,
            index: toolCallDelta.index,
            arguments: toolCallSnapshot.function.arguments,
            parsed_arguments: toolCallSnapshot.function.parsed_arguments,
            arguments_delta: toolCallDelta.function?.arguments ?? ""
          });
        } else {
          assertNever(toolCallSnapshot?.type);
        }
      }
    }
  }, _ChatCompletionStream_emitToolCallDoneEvent = function _ChatCompletionStream_emitToolCallDoneEvent2(choiceSnapshot, toolCallIndex) {
    const state = __classPrivateFieldGet6(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_getChoiceEventState).call(this, choiceSnapshot);
    if (state.done_tool_calls.has(toolCallIndex)) {
      return;
    }
    const toolCallSnapshot = choiceSnapshot.message.tool_calls?.[toolCallIndex];
    if (!toolCallSnapshot) {
      throw new Error("no tool call snapshot");
    }
    if (!toolCallSnapshot.type) {
      throw new Error("tool call snapshot missing `type`");
    }
    if (toolCallSnapshot.type === "function") {
      const inputTool = __classPrivateFieldGet6(this, _ChatCompletionStream_params, "f")?.tools?.find((tool) => tool.type === "function" && tool.function.name === toolCallSnapshot.function.name);
      this._emit("tool_calls.function.arguments.done", {
        name: toolCallSnapshot.function.name,
        index: toolCallIndex,
        arguments: toolCallSnapshot.function.arguments,
        parsed_arguments: isAutoParsableTool(inputTool) ? inputTool.$parseRaw(toolCallSnapshot.function.arguments) : inputTool?.function.strict ? JSON.parse(toolCallSnapshot.function.arguments) : null
      });
    } else {
      assertNever(toolCallSnapshot.type);
    }
  }, _ChatCompletionStream_emitContentDoneEvents = function _ChatCompletionStream_emitContentDoneEvents2(choiceSnapshot) {
    const state = __classPrivateFieldGet6(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_getChoiceEventState).call(this, choiceSnapshot);
    if (choiceSnapshot.message.content && !state.content_done) {
      state.content_done = true;
      const responseFormat = __classPrivateFieldGet6(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_getAutoParseableResponseFormat).call(this);
      this._emit("content.done", {
        content: choiceSnapshot.message.content,
        parsed: responseFormat ? responseFormat.$parseRaw(choiceSnapshot.message.content) : null
      });
    }
    if (choiceSnapshot.message.refusal && !state.refusal_done) {
      state.refusal_done = true;
      this._emit("refusal.done", { refusal: choiceSnapshot.message.refusal });
    }
    if (choiceSnapshot.logprobs?.content && !state.logprobs_content_done) {
      state.logprobs_content_done = true;
      this._emit("logprobs.content.done", { content: choiceSnapshot.logprobs.content });
    }
    if (choiceSnapshot.logprobs?.refusal && !state.logprobs_refusal_done) {
      state.logprobs_refusal_done = true;
      this._emit("logprobs.refusal.done", { refusal: choiceSnapshot.logprobs.refusal });
    }
  }, _ChatCompletionStream_endRequest = function _ChatCompletionStream_endRequest2() {
    if (this.ended) {
      throw new OpenAIError(`stream has ended, this shouldn't happen`);
    }
    const snapshot = __classPrivateFieldGet6(this, _ChatCompletionStream_currentChatCompletionSnapshot, "f");
    if (!snapshot) {
      throw new OpenAIError(`request ended without sending any chunks`);
    }
    __classPrivateFieldSet4(this, _ChatCompletionStream_currentChatCompletionSnapshot, void 0, "f");
    __classPrivateFieldSet4(this, _ChatCompletionStream_choiceEventStates, [], "f");
    return finalizeChatCompletion(snapshot, __classPrivateFieldGet6(this, _ChatCompletionStream_params, "f"));
  }, _ChatCompletionStream_getAutoParseableResponseFormat = function _ChatCompletionStream_getAutoParseableResponseFormat2() {
    const responseFormat = __classPrivateFieldGet6(this, _ChatCompletionStream_params, "f")?.response_format;
    if (isAutoParsableResponseFormat(responseFormat)) {
      return responseFormat;
    }
    return null;
  }, _ChatCompletionStream_accumulateChatCompletion = function _ChatCompletionStream_accumulateChatCompletion2(chunk) {
    var _a2, _b, _c, _d;
    let snapshot = __classPrivateFieldGet6(this, _ChatCompletionStream_currentChatCompletionSnapshot, "f");
    const { choices, ...rest } = chunk;
    if (!snapshot) {
      snapshot = __classPrivateFieldSet4(this, _ChatCompletionStream_currentChatCompletionSnapshot, {
        ...rest,
        choices: []
      }, "f");
    } else {
      Object.assign(snapshot, rest);
    }
    for (const { delta, finish_reason, index, logprobs = null, ...other } of chunk.choices) {
      let choice = snapshot.choices[index];
      if (!choice) {
        choice = snapshot.choices[index] = { finish_reason, index, message: {}, logprobs, ...other };
      }
      if (logprobs) {
        if (!choice.logprobs) {
          choice.logprobs = Object.assign({}, logprobs);
        } else {
          const { content: content2, refusal: refusal2, ...rest3 } = logprobs;
          assertIsEmpty(rest3);
          Object.assign(choice.logprobs, rest3);
          if (content2) {
            (_a2 = choice.logprobs).content ?? (_a2.content = []);
            choice.logprobs.content.push(...content2);
          }
          if (refusal2) {
            (_b = choice.logprobs).refusal ?? (_b.refusal = []);
            choice.logprobs.refusal.push(...refusal2);
          }
        }
      }
      if (finish_reason) {
        choice.finish_reason = finish_reason;
        if (__classPrivateFieldGet6(this, _ChatCompletionStream_params, "f") && hasAutoParseableInput(__classPrivateFieldGet6(this, _ChatCompletionStream_params, "f"))) {
          if (finish_reason === "length") {
            throw new LengthFinishReasonError();
          }
          if (finish_reason === "content_filter") {
            throw new ContentFilterFinishReasonError();
          }
        }
      }
      Object.assign(choice, other);
      if (!delta)
        continue;
      const { content, refusal, function_call, role, tool_calls, ...rest2 } = delta;
      assertIsEmpty(rest2);
      Object.assign(choice.message, rest2);
      if (refusal) {
        choice.message.refusal = (choice.message.refusal || "") + refusal;
      }
      if (role)
        choice.message.role = role;
      if (function_call) {
        if (!choice.message.function_call) {
          choice.message.function_call = function_call;
        } else {
          if (function_call.name)
            choice.message.function_call.name = function_call.name;
          if (function_call.arguments) {
            (_c = choice.message.function_call).arguments ?? (_c.arguments = "");
            choice.message.function_call.arguments += function_call.arguments;
          }
        }
      }
      if (content) {
        choice.message.content = (choice.message.content || "") + content;
        if (!choice.message.refusal && __classPrivateFieldGet6(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_getAutoParseableResponseFormat).call(this)) {
          choice.message.parsed = partialParse(choice.message.content);
        }
      }
      if (tool_calls) {
        if (!choice.message.tool_calls)
          choice.message.tool_calls = [];
        for (const { index: index2, id, type, function: fn, ...rest3 } of tool_calls) {
          const tool_call = (_d = choice.message.tool_calls)[index2] ?? (_d[index2] = {});
          Object.assign(tool_call, rest3);
          if (id)
            tool_call.id = id;
          if (type)
            tool_call.type = type;
          if (fn)
            tool_call.function ?? (tool_call.function = { name: fn.name ?? "", arguments: "" });
          if (fn?.name)
            tool_call.function.name = fn.name;
          if (fn?.arguments) {
            tool_call.function.arguments += fn.arguments;
            if (shouldParseToolCall(__classPrivateFieldGet6(this, _ChatCompletionStream_params, "f"), tool_call)) {
              tool_call.function.parsed_arguments = partialParse(tool_call.function.arguments);
            }
          }
        }
      }
    }
    return snapshot;
  }, Symbol.asyncIterator)]() {
    const pushQueue = [];
    const readQueue = [];
    let done = false;
    this.on("chunk", (chunk) => {
      const reader = readQueue.shift();
      if (reader) {
        reader.resolve(chunk);
      } else {
        pushQueue.push(chunk);
      }
    });
    this.on("end", () => {
      done = true;
      for (const reader of readQueue) {
        reader.resolve(void 0);
      }
      readQueue.length = 0;
    });
    this.on("abort", (err) => {
      done = true;
      for (const reader of readQueue) {
        reader.reject(err);
      }
      readQueue.length = 0;
    });
    this.on("error", (err) => {
      done = true;
      for (const reader of readQueue) {
        reader.reject(err);
      }
      readQueue.length = 0;
    });
    return {
      next: async () => {
        if (!pushQueue.length) {
          if (done) {
            return { value: void 0, done: true };
          }
          return new Promise((resolve, reject) => readQueue.push({ resolve, reject })).then((chunk2) => chunk2 ? { value: chunk2, done: false } : { value: void 0, done: true });
        }
        const chunk = pushQueue.shift();
        return { value: chunk, done: false };
      },
      return: async () => {
        this.abort();
        return { value: void 0, done: true };
      }
    };
  }
  toReadableStream() {
    const stream = new Stream(this[Symbol.asyncIterator].bind(this), this.controller);
    return stream.toReadableStream();
  }
};
function finalizeChatCompletion(snapshot, params) {
  const { id, choices, created, model, system_fingerprint, ...rest } = snapshot;
  const completion = {
    ...rest,
    id,
    choices: choices.map(({ message, finish_reason, index, logprobs, ...choiceRest }) => {
      if (!finish_reason) {
        throw new OpenAIError(`missing finish_reason for choice ${index}`);
      }
      const { content = null, function_call, tool_calls, ...messageRest } = message;
      const role = message.role;
      if (!role) {
        throw new OpenAIError(`missing role for choice ${index}`);
      }
      if (function_call) {
        const { arguments: args, name } = function_call;
        if (args == null) {
          throw new OpenAIError(`missing function_call.arguments for choice ${index}`);
        }
        if (!name) {
          throw new OpenAIError(`missing function_call.name for choice ${index}`);
        }
        return {
          ...choiceRest,
          message: {
            content,
            function_call: { arguments: args, name },
            role,
            refusal: message.refusal ?? null
          },
          finish_reason,
          index,
          logprobs
        };
      }
      if (tool_calls) {
        return {
          ...choiceRest,
          index,
          finish_reason,
          logprobs,
          message: {
            ...messageRest,
            role,
            content,
            refusal: message.refusal ?? null,
            tool_calls: tool_calls.map((tool_call, i) => {
              const { function: fn, type, id: id2, ...toolRest } = tool_call;
              const { arguments: args, name, ...fnRest } = fn || {};
              if (id2 == null) {
                throw new OpenAIError(`missing choices[${index}].tool_calls[${i}].id
${str(snapshot)}`);
              }
              if (type == null) {
                throw new OpenAIError(`missing choices[${index}].tool_calls[${i}].type
${str(snapshot)}`);
              }
              if (name == null) {
                throw new OpenAIError(`missing choices[${index}].tool_calls[${i}].function.name
${str(snapshot)}`);
              }
              if (args == null) {
                throw new OpenAIError(`missing choices[${index}].tool_calls[${i}].function.arguments
${str(snapshot)}`);
              }
              return { ...toolRest, id: id2, type, function: { ...fnRest, name, arguments: args } };
            })
          }
        };
      }
      return {
        ...choiceRest,
        message: { ...messageRest, content, role, refusal: message.refusal ?? null },
        finish_reason,
        index,
        logprobs
      };
    }),
    created,
    model,
    object: "chat.completion",
    ...system_fingerprint ? { system_fingerprint } : {}
  };
  return maybeParseChatCompletion(completion, params);
}
function str(x) {
  return JSON.stringify(x);
}
function assertIsEmpty(obj) {
  return;
}
function assertNever(_x) {
}

// ../../node_modules/openai/lib/ChatCompletionStreamingRunner.mjs
var ChatCompletionStreamingRunner = class _ChatCompletionStreamingRunner extends ChatCompletionStream {
  static fromReadableStream(stream) {
    const runner = new _ChatCompletionStreamingRunner(null);
    runner._run(() => runner._fromReadableStream(stream));
    return runner;
  }
  /** @deprecated - please use `runTools` instead. */
  static runFunctions(client, params, options) {
    const runner = new _ChatCompletionStreamingRunner(null);
    const opts = {
      ...options,
      headers: { ...options?.headers, "X-Stainless-Helper-Method": "runFunctions" }
    };
    runner._run(() => runner._runFunctions(client, params, opts));
    return runner;
  }
  static runTools(client, params, options) {
    const runner = new _ChatCompletionStreamingRunner(
      // @ts-expect-error TODO these types are incompatible
      params
    );
    const opts = {
      ...options,
      headers: { ...options?.headers, "X-Stainless-Helper-Method": "runTools" }
    };
    runner._run(() => runner._runTools(client, params, opts));
    return runner;
  }
};

// ../../node_modules/openai/resources/beta/chat/completions.mjs
var Completions2 = class extends APIResource {
  parse(body, options) {
    validateInputTools(body.tools);
    return this._client.chat.completions.create(body, {
      ...options,
      headers: {
        ...options?.headers,
        "X-Stainless-Helper-Method": "beta.chat.completions.parse"
      }
    })._thenUnwrap((completion) => parseChatCompletion(completion, body));
  }
  runFunctions(body, options) {
    if (body.stream) {
      return ChatCompletionStreamingRunner.runFunctions(this._client, body, options);
    }
    return ChatCompletionRunner.runFunctions(this._client, body, options);
  }
  runTools(body, options) {
    if (body.stream) {
      return ChatCompletionStreamingRunner.runTools(this._client, body, options);
    }
    return ChatCompletionRunner.runTools(this._client, body, options);
  }
  /**
   * Creates a chat completion stream
   */
  stream(body, options) {
    return ChatCompletionStream.createChatCompletion(this._client, body, options);
  }
};

// ../../node_modules/openai/resources/beta/chat/chat.mjs
var Chat2 = class extends APIResource {
  constructor() {
    super(...arguments);
    this.completions = new Completions2(this._client);
  }
};
(function(Chat3) {
  Chat3.Completions = Completions2;
})(Chat2 || (Chat2 = {}));

// ../../node_modules/openai/lib/AssistantStream.mjs
var __classPrivateFieldGet7 = function(receiver, state, kind2, f) {
  if (kind2 === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind2 === "m" ? f : kind2 === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet5 = function(receiver, state, value, kind2, f) {
  if (kind2 === "m") throw new TypeError("Private method is not writable");
  if (kind2 === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind2 === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var _AssistantStream_instances;
var _AssistantStream_events;
var _AssistantStream_runStepSnapshots;
var _AssistantStream_messageSnapshots;
var _AssistantStream_messageSnapshot;
var _AssistantStream_finalRun;
var _AssistantStream_currentContentIndex;
var _AssistantStream_currentContent;
var _AssistantStream_currentToolCallIndex;
var _AssistantStream_currentToolCall;
var _AssistantStream_currentEvent;
var _AssistantStream_currentRunSnapshot;
var _AssistantStream_currentRunStepSnapshot;
var _AssistantStream_addEvent;
var _AssistantStream_endRequest;
var _AssistantStream_handleMessage;
var _AssistantStream_handleRunStep;
var _AssistantStream_handleEvent;
var _AssistantStream_accumulateRunStep;
var _AssistantStream_accumulateMessage;
var _AssistantStream_accumulateContent;
var _AssistantStream_handleRun;
var AssistantStream = class _AssistantStream extends EventStream {
  constructor() {
    super(...arguments);
    _AssistantStream_instances.add(this);
    _AssistantStream_events.set(this, []);
    _AssistantStream_runStepSnapshots.set(this, {});
    _AssistantStream_messageSnapshots.set(this, {});
    _AssistantStream_messageSnapshot.set(this, void 0);
    _AssistantStream_finalRun.set(this, void 0);
    _AssistantStream_currentContentIndex.set(this, void 0);
    _AssistantStream_currentContent.set(this, void 0);
    _AssistantStream_currentToolCallIndex.set(this, void 0);
    _AssistantStream_currentToolCall.set(this, void 0);
    _AssistantStream_currentEvent.set(this, void 0);
    _AssistantStream_currentRunSnapshot.set(this, void 0);
    _AssistantStream_currentRunStepSnapshot.set(this, void 0);
  }
  [(_AssistantStream_events = /* @__PURE__ */ new WeakMap(), _AssistantStream_runStepSnapshots = /* @__PURE__ */ new WeakMap(), _AssistantStream_messageSnapshots = /* @__PURE__ */ new WeakMap(), _AssistantStream_messageSnapshot = /* @__PURE__ */ new WeakMap(), _AssistantStream_finalRun = /* @__PURE__ */ new WeakMap(), _AssistantStream_currentContentIndex = /* @__PURE__ */ new WeakMap(), _AssistantStream_currentContent = /* @__PURE__ */ new WeakMap(), _AssistantStream_currentToolCallIndex = /* @__PURE__ */ new WeakMap(), _AssistantStream_currentToolCall = /* @__PURE__ */ new WeakMap(), _AssistantStream_currentEvent = /* @__PURE__ */ new WeakMap(), _AssistantStream_currentRunSnapshot = /* @__PURE__ */ new WeakMap(), _AssistantStream_currentRunStepSnapshot = /* @__PURE__ */ new WeakMap(), _AssistantStream_instances = /* @__PURE__ */ new WeakSet(), Symbol.asyncIterator)]() {
    const pushQueue = [];
    const readQueue = [];
    let done = false;
    this.on("event", (event) => {
      const reader = readQueue.shift();
      if (reader) {
        reader.resolve(event);
      } else {
        pushQueue.push(event);
      }
    });
    this.on("end", () => {
      done = true;
      for (const reader of readQueue) {
        reader.resolve(void 0);
      }
      readQueue.length = 0;
    });
    this.on("abort", (err) => {
      done = true;
      for (const reader of readQueue) {
        reader.reject(err);
      }
      readQueue.length = 0;
    });
    this.on("error", (err) => {
      done = true;
      for (const reader of readQueue) {
        reader.reject(err);
      }
      readQueue.length = 0;
    });
    return {
      next: async () => {
        if (!pushQueue.length) {
          if (done) {
            return { value: void 0, done: true };
          }
          return new Promise((resolve, reject) => readQueue.push({ resolve, reject })).then((chunk2) => chunk2 ? { value: chunk2, done: false } : { value: void 0, done: true });
        }
        const chunk = pushQueue.shift();
        return { value: chunk, done: false };
      },
      return: async () => {
        this.abort();
        return { value: void 0, done: true };
      }
    };
  }
  static fromReadableStream(stream) {
    const runner = new _AssistantStream();
    runner._run(() => runner._fromReadableStream(stream));
    return runner;
  }
  async _fromReadableStream(readableStream, options) {
    const signal = options?.signal;
    if (signal) {
      if (signal.aborted)
        this.controller.abort();
      signal.addEventListener("abort", () => this.controller.abort());
    }
    this._connected();
    const stream = Stream.fromReadableStream(readableStream, this.controller);
    for await (const event of stream) {
      __classPrivateFieldGet7(this, _AssistantStream_instances, "m", _AssistantStream_addEvent).call(this, event);
    }
    if (stream.controller.signal?.aborted) {
      throw new APIUserAbortError();
    }
    return this._addRun(__classPrivateFieldGet7(this, _AssistantStream_instances, "m", _AssistantStream_endRequest).call(this));
  }
  toReadableStream() {
    const stream = new Stream(this[Symbol.asyncIterator].bind(this), this.controller);
    return stream.toReadableStream();
  }
  static createToolAssistantStream(threadId, runId, runs, params, options) {
    const runner = new _AssistantStream();
    runner._run(() => runner._runToolAssistantStream(threadId, runId, runs, params, {
      ...options,
      headers: { ...options?.headers, "X-Stainless-Helper-Method": "stream" }
    }));
    return runner;
  }
  async _createToolAssistantStream(run, threadId, runId, params, options) {
    const signal = options?.signal;
    if (signal) {
      if (signal.aborted)
        this.controller.abort();
      signal.addEventListener("abort", () => this.controller.abort());
    }
    const body = { ...params, stream: true };
    const stream = await run.submitToolOutputs(threadId, runId, body, {
      ...options,
      signal: this.controller.signal
    });
    this._connected();
    for await (const event of stream) {
      __classPrivateFieldGet7(this, _AssistantStream_instances, "m", _AssistantStream_addEvent).call(this, event);
    }
    if (stream.controller.signal?.aborted) {
      throw new APIUserAbortError();
    }
    return this._addRun(__classPrivateFieldGet7(this, _AssistantStream_instances, "m", _AssistantStream_endRequest).call(this));
  }
  static createThreadAssistantStream(params, thread, options) {
    const runner = new _AssistantStream();
    runner._run(() => runner._threadAssistantStream(params, thread, {
      ...options,
      headers: { ...options?.headers, "X-Stainless-Helper-Method": "stream" }
    }));
    return runner;
  }
  static createAssistantStream(threadId, runs, params, options) {
    const runner = new _AssistantStream();
    runner._run(() => runner._runAssistantStream(threadId, runs, params, {
      ...options,
      headers: { ...options?.headers, "X-Stainless-Helper-Method": "stream" }
    }));
    return runner;
  }
  currentEvent() {
    return __classPrivateFieldGet7(this, _AssistantStream_currentEvent, "f");
  }
  currentRun() {
    return __classPrivateFieldGet7(this, _AssistantStream_currentRunSnapshot, "f");
  }
  currentMessageSnapshot() {
    return __classPrivateFieldGet7(this, _AssistantStream_messageSnapshot, "f");
  }
  currentRunStepSnapshot() {
    return __classPrivateFieldGet7(this, _AssistantStream_currentRunStepSnapshot, "f");
  }
  async finalRunSteps() {
    await this.done();
    return Object.values(__classPrivateFieldGet7(this, _AssistantStream_runStepSnapshots, "f"));
  }
  async finalMessages() {
    await this.done();
    return Object.values(__classPrivateFieldGet7(this, _AssistantStream_messageSnapshots, "f"));
  }
  async finalRun() {
    await this.done();
    if (!__classPrivateFieldGet7(this, _AssistantStream_finalRun, "f"))
      throw Error("Final run was not received.");
    return __classPrivateFieldGet7(this, _AssistantStream_finalRun, "f");
  }
  async _createThreadAssistantStream(thread, params, options) {
    const signal = options?.signal;
    if (signal) {
      if (signal.aborted)
        this.controller.abort();
      signal.addEventListener("abort", () => this.controller.abort());
    }
    const body = { ...params, stream: true };
    const stream = await thread.createAndRun(body, { ...options, signal: this.controller.signal });
    this._connected();
    for await (const event of stream) {
      __classPrivateFieldGet7(this, _AssistantStream_instances, "m", _AssistantStream_addEvent).call(this, event);
    }
    if (stream.controller.signal?.aborted) {
      throw new APIUserAbortError();
    }
    return this._addRun(__classPrivateFieldGet7(this, _AssistantStream_instances, "m", _AssistantStream_endRequest).call(this));
  }
  async _createAssistantStream(run, threadId, params, options) {
    const signal = options?.signal;
    if (signal) {
      if (signal.aborted)
        this.controller.abort();
      signal.addEventListener("abort", () => this.controller.abort());
    }
    const body = { ...params, stream: true };
    const stream = await run.create(threadId, body, { ...options, signal: this.controller.signal });
    this._connected();
    for await (const event of stream) {
      __classPrivateFieldGet7(this, _AssistantStream_instances, "m", _AssistantStream_addEvent).call(this, event);
    }
    if (stream.controller.signal?.aborted) {
      throw new APIUserAbortError();
    }
    return this._addRun(__classPrivateFieldGet7(this, _AssistantStream_instances, "m", _AssistantStream_endRequest).call(this));
  }
  static accumulateDelta(acc, delta) {
    for (const [key, deltaValue] of Object.entries(delta)) {
      if (!acc.hasOwnProperty(key)) {
        acc[key] = deltaValue;
        continue;
      }
      let accValue = acc[key];
      if (accValue === null || accValue === void 0) {
        acc[key] = deltaValue;
        continue;
      }
      if (key === "index" || key === "type") {
        acc[key] = deltaValue;
        continue;
      }
      if (typeof accValue === "string" && typeof deltaValue === "string") {
        accValue += deltaValue;
      } else if (typeof accValue === "number" && typeof deltaValue === "number") {
        accValue += deltaValue;
      } else if (isObj(accValue) && isObj(deltaValue)) {
        accValue = this.accumulateDelta(accValue, deltaValue);
      } else if (Array.isArray(accValue) && Array.isArray(deltaValue)) {
        if (accValue.every((x) => typeof x === "string" || typeof x === "number")) {
          accValue.push(...deltaValue);
          continue;
        }
        for (const deltaEntry of deltaValue) {
          if (!isObj(deltaEntry)) {
            throw new Error(`Expected array delta entry to be an object but got: ${deltaEntry}`);
          }
          const index = deltaEntry["index"];
          if (index == null) {
            console.error(deltaEntry);
            throw new Error("Expected array delta entry to have an `index` property");
          }
          if (typeof index !== "number") {
            throw new Error(`Expected array delta entry \`index\` property to be a number but got ${index}`);
          }
          const accEntry = accValue[index];
          if (accEntry == null) {
            accValue.push(deltaEntry);
          } else {
            accValue[index] = this.accumulateDelta(accEntry, deltaEntry);
          }
        }
        continue;
      } else {
        throw Error(`Unhandled record type: ${key}, deltaValue: ${deltaValue}, accValue: ${accValue}`);
      }
      acc[key] = accValue;
    }
    return acc;
  }
  _addRun(run) {
    return run;
  }
  async _threadAssistantStream(params, thread, options) {
    return await this._createThreadAssistantStream(thread, params, options);
  }
  async _runAssistantStream(threadId, runs, params, options) {
    return await this._createAssistantStream(runs, threadId, params, options);
  }
  async _runToolAssistantStream(threadId, runId, runs, params, options) {
    return await this._createToolAssistantStream(runs, threadId, runId, params, options);
  }
};
_AssistantStream_addEvent = function _AssistantStream_addEvent2(event) {
  if (this.ended)
    return;
  __classPrivateFieldSet5(this, _AssistantStream_currentEvent, event, "f");
  __classPrivateFieldGet7(this, _AssistantStream_instances, "m", _AssistantStream_handleEvent).call(this, event);
  switch (event.event) {
    case "thread.created":
      break;
    case "thread.run.created":
    case "thread.run.queued":
    case "thread.run.in_progress":
    case "thread.run.requires_action":
    case "thread.run.completed":
    case "thread.run.failed":
    case "thread.run.cancelling":
    case "thread.run.cancelled":
    case "thread.run.expired":
      __classPrivateFieldGet7(this, _AssistantStream_instances, "m", _AssistantStream_handleRun).call(this, event);
      break;
    case "thread.run.step.created":
    case "thread.run.step.in_progress":
    case "thread.run.step.delta":
    case "thread.run.step.completed":
    case "thread.run.step.failed":
    case "thread.run.step.cancelled":
    case "thread.run.step.expired":
      __classPrivateFieldGet7(this, _AssistantStream_instances, "m", _AssistantStream_handleRunStep).call(this, event);
      break;
    case "thread.message.created":
    case "thread.message.in_progress":
    case "thread.message.delta":
    case "thread.message.completed":
    case "thread.message.incomplete":
      __classPrivateFieldGet7(this, _AssistantStream_instances, "m", _AssistantStream_handleMessage).call(this, event);
      break;
    case "error":
      throw new Error("Encountered an error event in event processing - errors should be processed earlier");
  }
}, _AssistantStream_endRequest = function _AssistantStream_endRequest2() {
  if (this.ended) {
    throw new OpenAIError(`stream has ended, this shouldn't happen`);
  }
  if (!__classPrivateFieldGet7(this, _AssistantStream_finalRun, "f"))
    throw Error("Final run has not been received");
  return __classPrivateFieldGet7(this, _AssistantStream_finalRun, "f");
}, _AssistantStream_handleMessage = function _AssistantStream_handleMessage2(event) {
  const [accumulatedMessage, newContent] = __classPrivateFieldGet7(this, _AssistantStream_instances, "m", _AssistantStream_accumulateMessage).call(this, event, __classPrivateFieldGet7(this, _AssistantStream_messageSnapshot, "f"));
  __classPrivateFieldSet5(this, _AssistantStream_messageSnapshot, accumulatedMessage, "f");
  __classPrivateFieldGet7(this, _AssistantStream_messageSnapshots, "f")[accumulatedMessage.id] = accumulatedMessage;
  for (const content of newContent) {
    const snapshotContent = accumulatedMessage.content[content.index];
    if (snapshotContent?.type == "text") {
      this._emit("textCreated", snapshotContent.text);
    }
  }
  switch (event.event) {
    case "thread.message.created":
      this._emit("messageCreated", event.data);
      break;
    case "thread.message.in_progress":
      break;
    case "thread.message.delta":
      this._emit("messageDelta", event.data.delta, accumulatedMessage);
      if (event.data.delta.content) {
        for (const content of event.data.delta.content) {
          if (content.type == "text" && content.text) {
            let textDelta = content.text;
            let snapshot = accumulatedMessage.content[content.index];
            if (snapshot && snapshot.type == "text") {
              this._emit("textDelta", textDelta, snapshot.text);
            } else {
              throw Error("The snapshot associated with this text delta is not text or missing");
            }
          }
          if (content.index != __classPrivateFieldGet7(this, _AssistantStream_currentContentIndex, "f")) {
            if (__classPrivateFieldGet7(this, _AssistantStream_currentContent, "f")) {
              switch (__classPrivateFieldGet7(this, _AssistantStream_currentContent, "f").type) {
                case "text":
                  this._emit("textDone", __classPrivateFieldGet7(this, _AssistantStream_currentContent, "f").text, __classPrivateFieldGet7(this, _AssistantStream_messageSnapshot, "f"));
                  break;
                case "image_file":
                  this._emit("imageFileDone", __classPrivateFieldGet7(this, _AssistantStream_currentContent, "f").image_file, __classPrivateFieldGet7(this, _AssistantStream_messageSnapshot, "f"));
                  break;
              }
            }
            __classPrivateFieldSet5(this, _AssistantStream_currentContentIndex, content.index, "f");
          }
          __classPrivateFieldSet5(this, _AssistantStream_currentContent, accumulatedMessage.content[content.index], "f");
        }
      }
      break;
    case "thread.message.completed":
    case "thread.message.incomplete":
      if (__classPrivateFieldGet7(this, _AssistantStream_currentContentIndex, "f") !== void 0) {
        const currentContent = event.data.content[__classPrivateFieldGet7(this, _AssistantStream_currentContentIndex, "f")];
        if (currentContent) {
          switch (currentContent.type) {
            case "image_file":
              this._emit("imageFileDone", currentContent.image_file, __classPrivateFieldGet7(this, _AssistantStream_messageSnapshot, "f"));
              break;
            case "text":
              this._emit("textDone", currentContent.text, __classPrivateFieldGet7(this, _AssistantStream_messageSnapshot, "f"));
              break;
          }
        }
      }
      if (__classPrivateFieldGet7(this, _AssistantStream_messageSnapshot, "f")) {
        this._emit("messageDone", event.data);
      }
      __classPrivateFieldSet5(this, _AssistantStream_messageSnapshot, void 0, "f");
  }
}, _AssistantStream_handleRunStep = function _AssistantStream_handleRunStep2(event) {
  const accumulatedRunStep = __classPrivateFieldGet7(this, _AssistantStream_instances, "m", _AssistantStream_accumulateRunStep).call(this, event);
  __classPrivateFieldSet5(this, _AssistantStream_currentRunStepSnapshot, accumulatedRunStep, "f");
  switch (event.event) {
    case "thread.run.step.created":
      this._emit("runStepCreated", event.data);
      break;
    case "thread.run.step.delta":
      const delta = event.data.delta;
      if (delta.step_details && delta.step_details.type == "tool_calls" && delta.step_details.tool_calls && accumulatedRunStep.step_details.type == "tool_calls") {
        for (const toolCall of delta.step_details.tool_calls) {
          if (toolCall.index == __classPrivateFieldGet7(this, _AssistantStream_currentToolCallIndex, "f")) {
            this._emit("toolCallDelta", toolCall, accumulatedRunStep.step_details.tool_calls[toolCall.index]);
          } else {
            if (__classPrivateFieldGet7(this, _AssistantStream_currentToolCall, "f")) {
              this._emit("toolCallDone", __classPrivateFieldGet7(this, _AssistantStream_currentToolCall, "f"));
            }
            __classPrivateFieldSet5(this, _AssistantStream_currentToolCallIndex, toolCall.index, "f");
            __classPrivateFieldSet5(this, _AssistantStream_currentToolCall, accumulatedRunStep.step_details.tool_calls[toolCall.index], "f");
            if (__classPrivateFieldGet7(this, _AssistantStream_currentToolCall, "f"))
              this._emit("toolCallCreated", __classPrivateFieldGet7(this, _AssistantStream_currentToolCall, "f"));
          }
        }
      }
      this._emit("runStepDelta", event.data.delta, accumulatedRunStep);
      break;
    case "thread.run.step.completed":
    case "thread.run.step.failed":
    case "thread.run.step.cancelled":
    case "thread.run.step.expired":
      __classPrivateFieldSet5(this, _AssistantStream_currentRunStepSnapshot, void 0, "f");
      const details = event.data.step_details;
      if (details.type == "tool_calls") {
        if (__classPrivateFieldGet7(this, _AssistantStream_currentToolCall, "f")) {
          this._emit("toolCallDone", __classPrivateFieldGet7(this, _AssistantStream_currentToolCall, "f"));
          __classPrivateFieldSet5(this, _AssistantStream_currentToolCall, void 0, "f");
        }
      }
      this._emit("runStepDone", event.data, accumulatedRunStep);
      break;
    case "thread.run.step.in_progress":
      break;
  }
}, _AssistantStream_handleEvent = function _AssistantStream_handleEvent2(event) {
  __classPrivateFieldGet7(this, _AssistantStream_events, "f").push(event);
  this._emit("event", event);
}, _AssistantStream_accumulateRunStep = function _AssistantStream_accumulateRunStep2(event) {
  switch (event.event) {
    case "thread.run.step.created":
      __classPrivateFieldGet7(this, _AssistantStream_runStepSnapshots, "f")[event.data.id] = event.data;
      return event.data;
    case "thread.run.step.delta":
      let snapshot = __classPrivateFieldGet7(this, _AssistantStream_runStepSnapshots, "f")[event.data.id];
      if (!snapshot) {
        throw Error("Received a RunStepDelta before creation of a snapshot");
      }
      let data = event.data;
      if (data.delta) {
        const accumulated = AssistantStream.accumulateDelta(snapshot, data.delta);
        __classPrivateFieldGet7(this, _AssistantStream_runStepSnapshots, "f")[event.data.id] = accumulated;
      }
      return __classPrivateFieldGet7(this, _AssistantStream_runStepSnapshots, "f")[event.data.id];
    case "thread.run.step.completed":
    case "thread.run.step.failed":
    case "thread.run.step.cancelled":
    case "thread.run.step.expired":
    case "thread.run.step.in_progress":
      __classPrivateFieldGet7(this, _AssistantStream_runStepSnapshots, "f")[event.data.id] = event.data;
      break;
  }
  if (__classPrivateFieldGet7(this, _AssistantStream_runStepSnapshots, "f")[event.data.id])
    return __classPrivateFieldGet7(this, _AssistantStream_runStepSnapshots, "f")[event.data.id];
  throw new Error("No snapshot available");
}, _AssistantStream_accumulateMessage = function _AssistantStream_accumulateMessage2(event, snapshot) {
  let newContent = [];
  switch (event.event) {
    case "thread.message.created":
      return [event.data, newContent];
    case "thread.message.delta":
      if (!snapshot) {
        throw Error("Received a delta with no existing snapshot (there should be one from message creation)");
      }
      let data = event.data;
      if (data.delta.content) {
        for (const contentElement of data.delta.content) {
          if (contentElement.index in snapshot.content) {
            let currentContent = snapshot.content[contentElement.index];
            snapshot.content[contentElement.index] = __classPrivateFieldGet7(this, _AssistantStream_instances, "m", _AssistantStream_accumulateContent).call(this, contentElement, currentContent);
          } else {
            snapshot.content[contentElement.index] = contentElement;
            newContent.push(contentElement);
          }
        }
      }
      return [snapshot, newContent];
    case "thread.message.in_progress":
    case "thread.message.completed":
    case "thread.message.incomplete":
      if (snapshot) {
        return [snapshot, newContent];
      } else {
        throw Error("Received thread message event with no existing snapshot");
      }
  }
  throw Error("Tried to accumulate a non-message event");
}, _AssistantStream_accumulateContent = function _AssistantStream_accumulateContent2(contentElement, currentContent) {
  return AssistantStream.accumulateDelta(currentContent, contentElement);
}, _AssistantStream_handleRun = function _AssistantStream_handleRun2(event) {
  __classPrivateFieldSet5(this, _AssistantStream_currentRunSnapshot, event.data, "f");
  switch (event.event) {
    case "thread.run.created":
      break;
    case "thread.run.queued":
      break;
    case "thread.run.in_progress":
      break;
    case "thread.run.requires_action":
    case "thread.run.cancelled":
    case "thread.run.failed":
    case "thread.run.completed":
    case "thread.run.expired":
      __classPrivateFieldSet5(this, _AssistantStream_finalRun, event.data, "f");
      if (__classPrivateFieldGet7(this, _AssistantStream_currentToolCall, "f")) {
        this._emit("toolCallDone", __classPrivateFieldGet7(this, _AssistantStream_currentToolCall, "f"));
        __classPrivateFieldSet5(this, _AssistantStream_currentToolCall, void 0, "f");
      }
      break;
    case "thread.run.cancelling":
      break;
  }
};

// ../../node_modules/openai/resources/beta/threads/messages.mjs
var Messages = class extends APIResource {
  /**
   * Create a message.
   */
  create(threadId, body, options) {
    return this._client.post(`/threads/${threadId}/messages`, {
      body,
      ...options,
      headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
    });
  }
  /**
   * Retrieve a message.
   */
  retrieve(threadId, messageId, options) {
    return this._client.get(`/threads/${threadId}/messages/${messageId}`, {
      ...options,
      headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
    });
  }
  /**
   * Modifies a message.
   */
  update(threadId, messageId, body, options) {
    return this._client.post(`/threads/${threadId}/messages/${messageId}`, {
      body,
      ...options,
      headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
    });
  }
  list(threadId, query = {}, options) {
    if (isRequestOptions(query)) {
      return this.list(threadId, {}, query);
    }
    return this._client.getAPIList(`/threads/${threadId}/messages`, MessagesPage, {
      query,
      ...options,
      headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
    });
  }
  /**
   * Deletes a message.
   */
  del(threadId, messageId, options) {
    return this._client.delete(`/threads/${threadId}/messages/${messageId}`, {
      ...options,
      headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
    });
  }
};
var MessagesPage = class extends CursorPage {
};
Messages.MessagesPage = MessagesPage;

// ../../node_modules/openai/resources/beta/threads/runs/steps.mjs
var Steps = class extends APIResource {
  retrieve(threadId, runId, stepId, query = {}, options) {
    if (isRequestOptions(query)) {
      return this.retrieve(threadId, runId, stepId, {}, query);
    }
    return this._client.get(`/threads/${threadId}/runs/${runId}/steps/${stepId}`, {
      query,
      ...options,
      headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
    });
  }
  list(threadId, runId, query = {}, options) {
    if (isRequestOptions(query)) {
      return this.list(threadId, runId, {}, query);
    }
    return this._client.getAPIList(`/threads/${threadId}/runs/${runId}/steps`, RunStepsPage, {
      query,
      ...options,
      headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
    });
  }
};
var RunStepsPage = class extends CursorPage {
};
Steps.RunStepsPage = RunStepsPage;

// ../../node_modules/openai/resources/beta/threads/runs/runs.mjs
var Runs = class extends APIResource {
  constructor() {
    super(...arguments);
    this.steps = new Steps(this._client);
  }
  create(threadId, params, options) {
    const { include, ...body } = params;
    return this._client.post(`/threads/${threadId}/runs`, {
      query: { include },
      body,
      ...options,
      headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers },
      stream: params.stream ?? false
    });
  }
  /**
   * Retrieves a run.
   */
  retrieve(threadId, runId, options) {
    return this._client.get(`/threads/${threadId}/runs/${runId}`, {
      ...options,
      headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
    });
  }
  /**
   * Modifies a run.
   */
  update(threadId, runId, body, options) {
    return this._client.post(`/threads/${threadId}/runs/${runId}`, {
      body,
      ...options,
      headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
    });
  }
  list(threadId, query = {}, options) {
    if (isRequestOptions(query)) {
      return this.list(threadId, {}, query);
    }
    return this._client.getAPIList(`/threads/${threadId}/runs`, RunsPage, {
      query,
      ...options,
      headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
    });
  }
  /**
   * Cancels a run that is `in_progress`.
   */
  cancel(threadId, runId, options) {
    return this._client.post(`/threads/${threadId}/runs/${runId}/cancel`, {
      ...options,
      headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
    });
  }
  /**
   * A helper to create a run an poll for a terminal state. More information on Run
   * lifecycles can be found here:
   * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
   */
  async createAndPoll(threadId, body, options) {
    const run = await this.create(threadId, body, options);
    return await this.poll(threadId, run.id, options);
  }
  /**
   * Create a Run stream
   *
   * @deprecated use `stream` instead
   */
  createAndStream(threadId, body, options) {
    return AssistantStream.createAssistantStream(threadId, this._client.beta.threads.runs, body, options);
  }
  /**
   * A helper to poll a run status until it reaches a terminal state. More
   * information on Run lifecycles can be found here:
   * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
   */
  async poll(threadId, runId, options) {
    const headers = { ...options?.headers, "X-Stainless-Poll-Helper": "true" };
    if (options?.pollIntervalMs) {
      headers["X-Stainless-Custom-Poll-Interval"] = options.pollIntervalMs.toString();
    }
    while (true) {
      const { data: run, response } = await this.retrieve(threadId, runId, {
        ...options,
        headers: { ...options?.headers, ...headers }
      }).withResponse();
      switch (run.status) {
        //If we are in any sort of intermediate state we poll
        case "queued":
        case "in_progress":
        case "cancelling":
          let sleepInterval = 5e3;
          if (options?.pollIntervalMs) {
            sleepInterval = options.pollIntervalMs;
          } else {
            const headerInterval = response.headers.get("openai-poll-after-ms");
            if (headerInterval) {
              const headerIntervalMs = parseInt(headerInterval);
              if (!isNaN(headerIntervalMs)) {
                sleepInterval = headerIntervalMs;
              }
            }
          }
          await sleep(sleepInterval);
          break;
        //We return the run in any terminal state.
        case "requires_action":
        case "incomplete":
        case "cancelled":
        case "completed":
        case "failed":
        case "expired":
          return run;
      }
    }
  }
  /**
   * Create a Run stream
   */
  stream(threadId, body, options) {
    return AssistantStream.createAssistantStream(threadId, this._client.beta.threads.runs, body, options);
  }
  submitToolOutputs(threadId, runId, body, options) {
    return this._client.post(`/threads/${threadId}/runs/${runId}/submit_tool_outputs`, {
      body,
      ...options,
      headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers },
      stream: body.stream ?? false
    });
  }
  /**
   * A helper to submit a tool output to a run and poll for a terminal run state.
   * More information on Run lifecycles can be found here:
   * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
   */
  async submitToolOutputsAndPoll(threadId, runId, body, options) {
    const run = await this.submitToolOutputs(threadId, runId, body, options);
    return await this.poll(threadId, run.id, options);
  }
  /**
   * Submit the tool outputs from a previous run and stream the run to a terminal
   * state. More information on Run lifecycles can be found here:
   * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
   */
  submitToolOutputsStream(threadId, runId, body, options) {
    return AssistantStream.createToolAssistantStream(threadId, runId, this._client.beta.threads.runs, body, options);
  }
};
var RunsPage = class extends CursorPage {
};
Runs.RunsPage = RunsPage;
Runs.Steps = Steps;
Runs.RunStepsPage = RunStepsPage;

// ../../node_modules/openai/resources/beta/threads/threads.mjs
var Threads = class extends APIResource {
  constructor() {
    super(...arguments);
    this.runs = new Runs(this._client);
    this.messages = new Messages(this._client);
  }
  create(body = {}, options) {
    if (isRequestOptions(body)) {
      return this.create({}, body);
    }
    return this._client.post("/threads", {
      body,
      ...options,
      headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
    });
  }
  /**
   * Retrieves a thread.
   */
  retrieve(threadId, options) {
    return this._client.get(`/threads/${threadId}`, {
      ...options,
      headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
    });
  }
  /**
   * Modifies a thread.
   */
  update(threadId, body, options) {
    return this._client.post(`/threads/${threadId}`, {
      body,
      ...options,
      headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
    });
  }
  /**
   * Delete a thread.
   */
  del(threadId, options) {
    return this._client.delete(`/threads/${threadId}`, {
      ...options,
      headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
    });
  }
  createAndRun(body, options) {
    return this._client.post("/threads/runs", {
      body,
      ...options,
      headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers },
      stream: body.stream ?? false
    });
  }
  /**
   * A helper to create a thread, start a run and then poll for a terminal state.
   * More information on Run lifecycles can be found here:
   * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
   */
  async createAndRunPoll(body, options) {
    const run = await this.createAndRun(body, options);
    return await this.runs.poll(run.thread_id, run.id, options);
  }
  /**
   * Create a thread and stream the run back
   */
  createAndRunStream(body, options) {
    return AssistantStream.createThreadAssistantStream(body, this._client.beta.threads, options);
  }
};
Threads.Runs = Runs;
Threads.RunsPage = RunsPage;
Threads.Messages = Messages;
Threads.MessagesPage = MessagesPage;

// ../../node_modules/openai/lib/Util.mjs
var allSettledWithThrow = async (promises) => {
  const results = await Promise.allSettled(promises);
  const rejected = results.filter((result) => result.status === "rejected");
  if (rejected.length) {
    for (const result of rejected) {
      console.error(result.reason);
    }
    throw new Error(`${rejected.length} promise(s) failed - see the above errors`);
  }
  const values = [];
  for (const result of results) {
    if (result.status === "fulfilled") {
      values.push(result.value);
    }
  }
  return values;
};

// ../../node_modules/openai/resources/beta/vector-stores/files.mjs
var Files = class extends APIResource {
  /**
   * Create a vector store file by attaching a
   * [File](https://platform.openai.com/docs/api-reference/files) to a
   * [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object).
   */
  create(vectorStoreId, body, options) {
    return this._client.post(`/vector_stores/${vectorStoreId}/files`, {
      body,
      ...options,
      headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
    });
  }
  /**
   * Retrieves a vector store file.
   */
  retrieve(vectorStoreId, fileId, options) {
    return this._client.get(`/vector_stores/${vectorStoreId}/files/${fileId}`, {
      ...options,
      headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
    });
  }
  list(vectorStoreId, query = {}, options) {
    if (isRequestOptions(query)) {
      return this.list(vectorStoreId, {}, query);
    }
    return this._client.getAPIList(`/vector_stores/${vectorStoreId}/files`, VectorStoreFilesPage, {
      query,
      ...options,
      headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
    });
  }
  /**
   * Delete a vector store file. This will remove the file from the vector store but
   * the file itself will not be deleted. To delete the file, use the
   * [delete file](https://platform.openai.com/docs/api-reference/files/delete)
   * endpoint.
   */
  del(vectorStoreId, fileId, options) {
    return this._client.delete(`/vector_stores/${vectorStoreId}/files/${fileId}`, {
      ...options,
      headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
    });
  }
  /**
   * Attach a file to the given vector store and wait for it to be processed.
   */
  async createAndPoll(vectorStoreId, body, options) {
    const file = await this.create(vectorStoreId, body, options);
    return await this.poll(vectorStoreId, file.id, options);
  }
  /**
   * Wait for the vector store file to finish processing.
   *
   * Note: this will return even if the file failed to process, you need to check
   * file.last_error and file.status to handle these cases
   */
  async poll(vectorStoreId, fileId, options) {
    const headers = { ...options?.headers, "X-Stainless-Poll-Helper": "true" };
    if (options?.pollIntervalMs) {
      headers["X-Stainless-Custom-Poll-Interval"] = options.pollIntervalMs.toString();
    }
    while (true) {
      const fileResponse = await this.retrieve(vectorStoreId, fileId, {
        ...options,
        headers
      }).withResponse();
      const file = fileResponse.data;
      switch (file.status) {
        case "in_progress":
          let sleepInterval = 5e3;
          if (options?.pollIntervalMs) {
            sleepInterval = options.pollIntervalMs;
          } else {
            const headerInterval = fileResponse.response.headers.get("openai-poll-after-ms");
            if (headerInterval) {
              const headerIntervalMs = parseInt(headerInterval);
              if (!isNaN(headerIntervalMs)) {
                sleepInterval = headerIntervalMs;
              }
            }
          }
          await sleep(sleepInterval);
          break;
        case "failed":
        case "completed":
          return file;
      }
    }
  }
  /**
   * Upload a file to the `files` API and then attach it to the given vector store.
   *
   * Note the file will be asynchronously processed (you can use the alternative
   * polling helper method to wait for processing to complete).
   */
  async upload(vectorStoreId, file, options) {
    const fileInfo = await this._client.files.create({ file, purpose: "assistants" }, options);
    return this.create(vectorStoreId, { file_id: fileInfo.id }, options);
  }
  /**
   * Add a file to a vector store and poll until processing is complete.
   */
  async uploadAndPoll(vectorStoreId, file, options) {
    const fileInfo = await this.upload(vectorStoreId, file, options);
    return await this.poll(vectorStoreId, fileInfo.id, options);
  }
};
var VectorStoreFilesPage = class extends CursorPage {
};
Files.VectorStoreFilesPage = VectorStoreFilesPage;

// ../../node_modules/openai/resources/beta/vector-stores/file-batches.mjs
var FileBatches = class extends APIResource {
  /**
   * Create a vector store file batch.
   */
  create(vectorStoreId, body, options) {
    return this._client.post(`/vector_stores/${vectorStoreId}/file_batches`, {
      body,
      ...options,
      headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
    });
  }
  /**
   * Retrieves a vector store file batch.
   */
  retrieve(vectorStoreId, batchId, options) {
    return this._client.get(`/vector_stores/${vectorStoreId}/file_batches/${batchId}`, {
      ...options,
      headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
    });
  }
  /**
   * Cancel a vector store file batch. This attempts to cancel the processing of
   * files in this batch as soon as possible.
   */
  cancel(vectorStoreId, batchId, options) {
    return this._client.post(`/vector_stores/${vectorStoreId}/file_batches/${batchId}/cancel`, {
      ...options,
      headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
    });
  }
  /**
   * Create a vector store batch and poll until all files have been processed.
   */
  async createAndPoll(vectorStoreId, body, options) {
    const batch = await this.create(vectorStoreId, body);
    return await this.poll(vectorStoreId, batch.id, options);
  }
  listFiles(vectorStoreId, batchId, query = {}, options) {
    if (isRequestOptions(query)) {
      return this.listFiles(vectorStoreId, batchId, {}, query);
    }
    return this._client.getAPIList(`/vector_stores/${vectorStoreId}/file_batches/${batchId}/files`, VectorStoreFilesPage, { query, ...options, headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers } });
  }
  /**
   * Wait for the given file batch to be processed.
   *
   * Note: this will return even if one of the files failed to process, you need to
   * check batch.file_counts.failed_count to handle this case.
   */
  async poll(vectorStoreId, batchId, options) {
    const headers = { ...options?.headers, "X-Stainless-Poll-Helper": "true" };
    if (options?.pollIntervalMs) {
      headers["X-Stainless-Custom-Poll-Interval"] = options.pollIntervalMs.toString();
    }
    while (true) {
      const { data: batch, response } = await this.retrieve(vectorStoreId, batchId, {
        ...options,
        headers
      }).withResponse();
      switch (batch.status) {
        case "in_progress":
          let sleepInterval = 5e3;
          if (options?.pollIntervalMs) {
            sleepInterval = options.pollIntervalMs;
          } else {
            const headerInterval = response.headers.get("openai-poll-after-ms");
            if (headerInterval) {
              const headerIntervalMs = parseInt(headerInterval);
              if (!isNaN(headerIntervalMs)) {
                sleepInterval = headerIntervalMs;
              }
            }
          }
          await sleep(sleepInterval);
          break;
        case "failed":
        case "cancelled":
        case "completed":
          return batch;
      }
    }
  }
  /**
   * Uploads the given files concurrently and then creates a vector store file batch.
   *
   * The concurrency limit is configurable using the `maxConcurrency` parameter.
   */
  async uploadAndPoll(vectorStoreId, { files, fileIds = [] }, options) {
    if (files == null || files.length == 0) {
      throw new Error(`No \`files\` provided to process. If you've already uploaded files you should use \`.createAndPoll()\` instead`);
    }
    const configuredConcurrency = options?.maxConcurrency ?? 5;
    const concurrencyLimit = Math.min(configuredConcurrency, files.length);
    const client = this._client;
    const fileIterator = files.values();
    const allFileIds = [...fileIds];
    async function processFiles(iterator) {
      for (let item of iterator) {
        const fileObj = await client.files.create({ file: item, purpose: "assistants" }, options);
        allFileIds.push(fileObj.id);
      }
    }
    const workers = Array(concurrencyLimit).fill(fileIterator).map(processFiles);
    await allSettledWithThrow(workers);
    return await this.createAndPoll(vectorStoreId, {
      file_ids: allFileIds
    });
  }
};

// ../../node_modules/openai/resources/beta/vector-stores/vector-stores.mjs
var VectorStores = class extends APIResource {
  constructor() {
    super(...arguments);
    this.files = new Files(this._client);
    this.fileBatches = new FileBatches(this._client);
  }
  /**
   * Create a vector store.
   */
  create(body, options) {
    return this._client.post("/vector_stores", {
      body,
      ...options,
      headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
    });
  }
  /**
   * Retrieves a vector store.
   */
  retrieve(vectorStoreId, options) {
    return this._client.get(`/vector_stores/${vectorStoreId}`, {
      ...options,
      headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
    });
  }
  /**
   * Modifies a vector store.
   */
  update(vectorStoreId, body, options) {
    return this._client.post(`/vector_stores/${vectorStoreId}`, {
      body,
      ...options,
      headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
    });
  }
  list(query = {}, options) {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList("/vector_stores", VectorStoresPage, {
      query,
      ...options,
      headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
    });
  }
  /**
   * Delete a vector store.
   */
  del(vectorStoreId, options) {
    return this._client.delete(`/vector_stores/${vectorStoreId}`, {
      ...options,
      headers: { "OpenAI-Beta": "assistants=v2", ...options?.headers }
    });
  }
};
var VectorStoresPage = class extends CursorPage {
};
VectorStores.VectorStoresPage = VectorStoresPage;
VectorStores.Files = Files;
VectorStores.VectorStoreFilesPage = VectorStoreFilesPage;
VectorStores.FileBatches = FileBatches;

// ../../node_modules/openai/resources/beta/beta.mjs
var Beta = class extends APIResource {
  constructor() {
    super(...arguments);
    this.vectorStores = new VectorStores(this._client);
    this.chat = new Chat2(this._client);
    this.assistants = new Assistants(this._client);
    this.threads = new Threads(this._client);
  }
};
Beta.VectorStores = VectorStores;
Beta.VectorStoresPage = VectorStoresPage;
Beta.Assistants = Assistants;
Beta.AssistantsPage = AssistantsPage;
Beta.Threads = Threads;

// ../../node_modules/openai/resources/completions.mjs
var Completions3 = class extends APIResource {
  create(body, options) {
    return this._client.post("/completions", { body, ...options, stream: body.stream ?? false });
  }
};

// ../../node_modules/openai/resources/embeddings.mjs
var Embeddings = class extends APIResource {
  /**
   * Creates an embedding vector representing the input text.
   */
  create(body, options) {
    return this._client.post("/embeddings", { body, ...options });
  }
};

// ../../node_modules/openai/resources/files.mjs
var Files2 = class extends APIResource {
  /**
   * Upload a file that can be used across various endpoints. Individual files can be
   * up to 512 MB, and the size of all files uploaded by one organization can be up
   * to 100 GB.
   *
   * The Assistants API supports files up to 2 million tokens and of specific file
   * types. See the
   * [Assistants Tools guide](https://platform.openai.com/docs/assistants/tools) for
   * details.
   *
   * The Fine-tuning API only supports `.jsonl` files. The input also has certain
   * required formats for fine-tuning
   * [chat](https://platform.openai.com/docs/api-reference/fine-tuning/chat-input) or
   * [completions](https://platform.openai.com/docs/api-reference/fine-tuning/completions-input)
   * models.
   *
   * The Batch API only supports `.jsonl` files up to 200 MB in size. The input also
   * has a specific required
   * [format](https://platform.openai.com/docs/api-reference/batch/request-input).
   *
   * Please [contact us](https://help.openai.com/) if you need to increase these
   * storage limits.
   */
  create(body, options) {
    return this._client.post("/files", multipartFormRequestOptions({ body, ...options }));
  }
  /**
   * Returns information about a specific file.
   */
  retrieve(fileId, options) {
    return this._client.get(`/files/${fileId}`, options);
  }
  list(query = {}, options) {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList("/files", FileObjectsPage, { query, ...options });
  }
  /**
   * Delete a file.
   */
  del(fileId, options) {
    return this._client.delete(`/files/${fileId}`, options);
  }
  /**
   * Returns the contents of the specified file.
   */
  content(fileId, options) {
    return this._client.get(`/files/${fileId}/content`, { ...options, __binaryResponse: true });
  }
  /**
   * Returns the contents of the specified file.
   *
   * @deprecated The `.content()` method should be used instead
   */
  retrieveContent(fileId, options) {
    return this._client.get(`/files/${fileId}/content`, {
      ...options,
      headers: { Accept: "application/json", ...options?.headers }
    });
  }
  /**
   * Waits for the given file to be processed, default timeout is 30 mins.
   */
  async waitForProcessing(id, { pollInterval = 5e3, maxWait = 30 * 60 * 1e3 } = {}) {
    const TERMINAL_STATES = /* @__PURE__ */ new Set(["processed", "error", "deleted"]);
    const start = Date.now();
    let file = await this.retrieve(id);
    while (!file.status || !TERMINAL_STATES.has(file.status)) {
      await sleep(pollInterval);
      file = await this.retrieve(id);
      if (Date.now() - start > maxWait) {
        throw new APIConnectionTimeoutError({
          message: `Giving up on waiting for file ${id} to finish processing after ${maxWait} milliseconds.`
        });
      }
    }
    return file;
  }
};
var FileObjectsPage = class extends CursorPage {
};
Files2.FileObjectsPage = FileObjectsPage;

// ../../node_modules/openai/resources/fine-tuning/jobs/checkpoints.mjs
var Checkpoints = class extends APIResource {
  list(fineTuningJobId, query = {}, options) {
    if (isRequestOptions(query)) {
      return this.list(fineTuningJobId, {}, query);
    }
    return this._client.getAPIList(`/fine_tuning/jobs/${fineTuningJobId}/checkpoints`, FineTuningJobCheckpointsPage, { query, ...options });
  }
};
var FineTuningJobCheckpointsPage = class extends CursorPage {
};
Checkpoints.FineTuningJobCheckpointsPage = FineTuningJobCheckpointsPage;

// ../../node_modules/openai/resources/fine-tuning/jobs/jobs.mjs
var Jobs = class extends APIResource {
  constructor() {
    super(...arguments);
    this.checkpoints = new Checkpoints(this._client);
  }
  /**
   * Creates a fine-tuning job which begins the process of creating a new model from
   * a given dataset.
   *
   * Response includes details of the enqueued job including job status and the name
   * of the fine-tuned models once complete.
   *
   * [Learn more about fine-tuning](https://platform.openai.com/docs/guides/fine-tuning)
   */
  create(body, options) {
    return this._client.post("/fine_tuning/jobs", { body, ...options });
  }
  /**
   * Get info about a fine-tuning job.
   *
   * [Learn more about fine-tuning](https://platform.openai.com/docs/guides/fine-tuning)
   */
  retrieve(fineTuningJobId, options) {
    return this._client.get(`/fine_tuning/jobs/${fineTuningJobId}`, options);
  }
  list(query = {}, options) {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList("/fine_tuning/jobs", FineTuningJobsPage, { query, ...options });
  }
  /**
   * Immediately cancel a fine-tune job.
   */
  cancel(fineTuningJobId, options) {
    return this._client.post(`/fine_tuning/jobs/${fineTuningJobId}/cancel`, options);
  }
  listEvents(fineTuningJobId, query = {}, options) {
    if (isRequestOptions(query)) {
      return this.listEvents(fineTuningJobId, {}, query);
    }
    return this._client.getAPIList(`/fine_tuning/jobs/${fineTuningJobId}/events`, FineTuningJobEventsPage, {
      query,
      ...options
    });
  }
};
var FineTuningJobsPage = class extends CursorPage {
};
var FineTuningJobEventsPage = class extends CursorPage {
};
Jobs.FineTuningJobsPage = FineTuningJobsPage;
Jobs.FineTuningJobEventsPage = FineTuningJobEventsPage;
Jobs.Checkpoints = Checkpoints;
Jobs.FineTuningJobCheckpointsPage = FineTuningJobCheckpointsPage;

// ../../node_modules/openai/resources/fine-tuning/fine-tuning.mjs
var FineTuning = class extends APIResource {
  constructor() {
    super(...arguments);
    this.jobs = new Jobs(this._client);
  }
};
FineTuning.Jobs = Jobs;
FineTuning.FineTuningJobsPage = FineTuningJobsPage;
FineTuning.FineTuningJobEventsPage = FineTuningJobEventsPage;

// ../../node_modules/openai/resources/images.mjs
var Images = class extends APIResource {
  /**
   * Creates a variation of a given image.
   */
  createVariation(body, options) {
    return this._client.post("/images/variations", multipartFormRequestOptions({ body, ...options }));
  }
  /**
   * Creates an edited or extended image given an original image and a prompt.
   */
  edit(body, options) {
    return this._client.post("/images/edits", multipartFormRequestOptions({ body, ...options }));
  }
  /**
   * Creates an image given a prompt.
   */
  generate(body, options) {
    return this._client.post("/images/generations", { body, ...options });
  }
};

// ../../node_modules/openai/resources/models.mjs
var Models = class extends APIResource {
  /**
   * Retrieves a model instance, providing basic information about the model such as
   * the owner and permissioning.
   */
  retrieve(model, options) {
    return this._client.get(`/models/${model}`, options);
  }
  /**
   * Lists the currently available models, and provides basic information about each
   * one such as the owner and availability.
   */
  list(options) {
    return this._client.getAPIList("/models", ModelsPage, options);
  }
  /**
   * Delete a fine-tuned model. You must have the Owner role in your organization to
   * delete a model.
   */
  del(model, options) {
    return this._client.delete(`/models/${model}`, options);
  }
};
var ModelsPage = class extends Page {
};
Models.ModelsPage = ModelsPage;

// ../../node_modules/openai/resources/moderations.mjs
var Moderations = class extends APIResource {
  /**
   * Classifies if text and/or image inputs are potentially harmful. Learn more in
   * the [moderation guide](https://platform.openai.com/docs/guides/moderation).
   */
  create(body, options) {
    return this._client.post("/moderations", { body, ...options });
  }
};

// ../../node_modules/openai/resources/uploads/parts.mjs
var Parts = class extends APIResource {
  /**
   * Adds a
   * [Part](https://platform.openai.com/docs/api-reference/uploads/part-object) to an
   * [Upload](https://platform.openai.com/docs/api-reference/uploads/object) object.
   * A Part represents a chunk of bytes from the file you are trying to upload.
   *
   * Each Part can be at most 64 MB, and you can add Parts until you hit the Upload
   * maximum of 8 GB.
   *
   * It is possible to add multiple Parts in parallel. You can decide the intended
   * order of the Parts when you
   * [complete the Upload](https://platform.openai.com/docs/api-reference/uploads/complete).
   */
  create(uploadId, body, options) {
    return this._client.post(`/uploads/${uploadId}/parts`, multipartFormRequestOptions({ body, ...options }));
  }
};

// ../../node_modules/openai/resources/uploads/uploads.mjs
var Uploads = class extends APIResource {
  constructor() {
    super(...arguments);
    this.parts = new Parts(this._client);
  }
  /**
   * Creates an intermediate
   * [Upload](https://platform.openai.com/docs/api-reference/uploads/object) object
   * that you can add
   * [Parts](https://platform.openai.com/docs/api-reference/uploads/part-object) to.
   * Currently, an Upload can accept at most 8 GB in total and expires after an hour
   * after you create it.
   *
   * Once you complete the Upload, we will create a
   * [File](https://platform.openai.com/docs/api-reference/files/object) object that
   * contains all the parts you uploaded. This File is usable in the rest of our
   * platform as a regular File object.
   *
   * For certain `purpose`s, the correct `mime_type` must be specified. Please refer
   * to documentation for the supported MIME types for your use case:
   *
   * - [Assistants](https://platform.openai.com/docs/assistants/tools/file-search#supported-files)
   *
   * For guidance on the proper filename extensions for each purpose, please follow
   * the documentation on
   * [creating a File](https://platform.openai.com/docs/api-reference/files/create).
   */
  create(body, options) {
    return this._client.post("/uploads", { body, ...options });
  }
  /**
   * Cancels the Upload. No Parts may be added after an Upload is cancelled.
   */
  cancel(uploadId, options) {
    return this._client.post(`/uploads/${uploadId}/cancel`, options);
  }
  /**
   * Completes the
   * [Upload](https://platform.openai.com/docs/api-reference/uploads/object).
   *
   * Within the returned Upload object, there is a nested
   * [File](https://platform.openai.com/docs/api-reference/files/object) object that
   * is ready to use in the rest of the platform.
   *
   * You can specify the order of the Parts by passing in an ordered list of the Part
   * IDs.
   *
   * The number of bytes uploaded upon completion must match the number of bytes
   * initially specified when creating the Upload object. No Parts may be added after
   * an Upload is completed.
   */
  complete(uploadId, body, options) {
    return this._client.post(`/uploads/${uploadId}/complete`, { body, ...options });
  }
};
Uploads.Parts = Parts;

// ../../node_modules/openai/index.mjs
var _a;
var OpenAI = class extends APIClient {
  /**
   * API Client for interfacing with the OpenAI API.
   *
   * @param {string | undefined} [opts.apiKey=process.env['OPENAI_API_KEY'] ?? undefined]
   * @param {string | null | undefined} [opts.organization=process.env['OPENAI_ORG_ID'] ?? null]
   * @param {string | null | undefined} [opts.project=process.env['OPENAI_PROJECT_ID'] ?? null]
   * @param {string} [opts.baseURL=process.env['OPENAI_BASE_URL'] ?? https://api.openai.com/v1] - Override the default base URL for the API.
   * @param {number} [opts.timeout=10 minutes] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
   * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
   * @param {boolean} [opts.dangerouslyAllowBrowser=false] - By default, client-side use of this library is not allowed, as it risks exposing your secret API credentials to attackers.
   */
  constructor({ baseURL = readEnv("OPENAI_BASE_URL"), apiKey = readEnv("OPENAI_API_KEY"), organization = readEnv("OPENAI_ORG_ID") ?? null, project = readEnv("OPENAI_PROJECT_ID") ?? null, ...opts } = {}) {
    if (apiKey === void 0) {
      throw new OpenAIError("The OPENAI_API_KEY environment variable is missing or empty; either provide it, or instantiate the OpenAI client with an apiKey option, like new OpenAI({ apiKey: 'My API Key' }).");
    }
    const options = {
      apiKey,
      organization,
      project,
      ...opts,
      baseURL: baseURL || `https://api.openai.com/v1`
    };
    if (!options.dangerouslyAllowBrowser && isRunningInBrowser()) {
      throw new OpenAIError("It looks like you're running in a browser-like environment.\n\nThis is disabled by default, as it risks exposing your secret API credentials to attackers.\nIf you understand the risks and have appropriate mitigations in place,\nyou can set the `dangerouslyAllowBrowser` option to `true`, e.g.,\n\nnew OpenAI({ apiKey, dangerouslyAllowBrowser: true });\n\nhttps://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety\n");
    }
    super({
      baseURL: options.baseURL,
      timeout: options.timeout ?? 6e5,
      httpAgent: options.httpAgent,
      maxRetries: options.maxRetries,
      fetch: options.fetch
    });
    this.completions = new Completions3(this);
    this.chat = new Chat(this);
    this.embeddings = new Embeddings(this);
    this.files = new Files2(this);
    this.images = new Images(this);
    this.audio = new Audio(this);
    this.moderations = new Moderations(this);
    this.models = new Models(this);
    this.fineTuning = new FineTuning(this);
    this.beta = new Beta(this);
    this.batches = new Batches(this);
    this.uploads = new Uploads(this);
    this._options = options;
    this.apiKey = apiKey;
    this.organization = organization;
    this.project = project;
  }
  defaultQuery() {
    return this._options.defaultQuery;
  }
  defaultHeaders(opts) {
    return {
      ...super.defaultHeaders(opts),
      "OpenAI-Organization": this.organization,
      "OpenAI-Project": this.project,
      ...this._options.defaultHeaders
    };
  }
  authHeaders(opts) {
    return { Authorization: `Bearer ${this.apiKey}` };
  }
  stringifyQuery(query) {
    return stringify(query, { arrayFormat: "brackets" });
  }
};
_a = OpenAI;
OpenAI.OpenAI = _a;
OpenAI.DEFAULT_TIMEOUT = 6e5;
OpenAI.OpenAIError = OpenAIError;
OpenAI.APIError = APIError;
OpenAI.APIConnectionError = APIConnectionError;
OpenAI.APIConnectionTimeoutError = APIConnectionTimeoutError;
OpenAI.APIUserAbortError = APIUserAbortError;
OpenAI.NotFoundError = NotFoundError;
OpenAI.ConflictError = ConflictError;
OpenAI.RateLimitError = RateLimitError;
OpenAI.BadRequestError = BadRequestError;
OpenAI.AuthenticationError = AuthenticationError;
OpenAI.InternalServerError = InternalServerError;
OpenAI.PermissionDeniedError = PermissionDeniedError;
OpenAI.UnprocessableEntityError = UnprocessableEntityError;
OpenAI.toFile = toFile;
OpenAI.fileFromPath = fileFromPath;
OpenAI.Completions = Completions3;
OpenAI.Chat = Chat;
OpenAI.Embeddings = Embeddings;
OpenAI.Files = Files2;
OpenAI.FileObjectsPage = FileObjectsPage;
OpenAI.Images = Images;
OpenAI.Audio = Audio;
OpenAI.Moderations = Moderations;
OpenAI.Models = Models;
OpenAI.ModelsPage = ModelsPage;
OpenAI.FineTuning = FineTuning;
OpenAI.Beta = Beta;
OpenAI.Batches = Batches;
OpenAI.BatchesPage = BatchesPage;
OpenAI.Uploads = Uploads;
var openai_default = OpenAI;

// src/services/transcription.ts
import os from "os";
import path from "path";
import { fileURLToPath } from "url";
import { promisify } from "util";

// ../../node_modules/@deepgram/sdk/dist/module/lib/errors.js
var DeepgramError = class extends Error {
  constructor(message) {
    super(message);
    this.__dgError = true;
    this.name = "DeepgramError";
  }
};
function isDeepgramError(error) {
  return typeof error === "object" && error !== null && "__dgError" in error;
}
var DeepgramApiError = class extends DeepgramError {
  constructor(message, status) {
    super(message);
    this.name = "DeepgramApiError";
    this.status = status;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status
    };
  }
};
var DeepgramUnknownError = class extends DeepgramError {
  constructor(message, originalError) {
    super(message);
    this.name = "DeepgramUnknownError";
    this.originalError = originalError;
  }
};
var DeepgramVersionError = class extends DeepgramError {
  constructor() {
    super(`You are attempting to use an old format for a newer SDK version. Read more here: https://dpgr.am/js-v3`);
    this.name = "DeepgramVersionError";
  }
};

// ../../node_modules/@deepgram/sdk/dist/module/packages/AbstractClient.js
import { EventEmitter } from "events";

// ../../node_modules/@deepgram/sdk/dist/module/lib/helpers.js
var import_cross_fetch = __toESM(require_node_ponyfill());
var import_deepmerge = __toESM(require_cjs());
var isBrowser = () => BROWSER_AGENT !== "unknown";
var isNode = () => NODE_VERSION !== "unknown";
var isBun = () => BUN_VERSION !== "unknown";
function applyDefaults(options = {}, subordinate = {}) {
  return (0, import_deepmerge.default)(subordinate, options);
}
function appendSearchParams(searchParams, options) {
  Object.keys(options).forEach((i) => {
    if (Array.isArray(options[i])) {
      const arrayParams = options[i];
      arrayParams.forEach((param) => {
        searchParams.append(i, String(param));
      });
    } else {
      searchParams.append(i, String(options[i]));
    }
  });
}
var resolveHeadersConstructor = () => {
  if (typeof Headers === "undefined") {
    return import_cross_fetch.Headers;
  }
  return Headers;
};
var isUrlSource = (providedSource) => {
  if (providedSource.url)
    return true;
  return false;
};
var isTextSource = (providedSource) => {
  if (providedSource.text)
    return true;
  return false;
};
var isFileSource = (providedSource) => {
  if (isReadStreamSource(providedSource) || isBufferSource(providedSource))
    return true;
  return false;
};
var isBufferSource = (providedSource) => {
  if (providedSource)
    return true;
  return false;
};
var isReadStreamSource = (providedSource) => {
  if (providedSource)
    return true;
  return false;
};
var convertProtocolToWs = (url) => {
  const convert = (string) => string.toLowerCase().replace(/^http/, "ws");
  return convert(url);
};
var convertLegacyOptions = (optionsArg) => {
  var _a2, _b, _c, _d, _e, _f;
  const newOptions = {};
  if (optionsArg._experimentalCustomFetch) {
    newOptions.global = {
      fetch: {
        client: optionsArg._experimentalCustomFetch
      }
    };
  }
  optionsArg = (0, import_deepmerge.default)(optionsArg, newOptions);
  if ((_a2 = optionsArg.restProxy) === null || _a2 === void 0 ? void 0 : _a2.url) {
    newOptions.global = {
      fetch: {
        options: {
          proxy: {
            url: (_b = optionsArg.restProxy) === null || _b === void 0 ? void 0 : _b.url
          }
        }
      }
    };
  }
  optionsArg = (0, import_deepmerge.default)(optionsArg, newOptions);
  if ((_c = optionsArg.global) === null || _c === void 0 ? void 0 : _c.url) {
    newOptions.global = {
      fetch: {
        options: {
          url: optionsArg.global.url
        }
      },
      websocket: {
        options: {
          url: optionsArg.global.url
        }
      }
    };
  }
  optionsArg = (0, import_deepmerge.default)(optionsArg, newOptions);
  if ((_d = optionsArg.global) === null || _d === void 0 ? void 0 : _d.headers) {
    newOptions.global = {
      fetch: {
        options: {
          headers: (_e = optionsArg.global) === null || _e === void 0 ? void 0 : _e.headers
        }
      },
      websocket: {
        options: {
          _nodeOnlyHeaders: (_f = optionsArg.global) === null || _f === void 0 ? void 0 : _f.headers
        }
      }
    };
  }
  optionsArg = (0, import_deepmerge.default)(optionsArg, newOptions);
  return optionsArg;
};

// ../../node_modules/@deepgram/sdk/dist/module/lib/version.js
var version = "3.9.0";

// ../../node_modules/@deepgram/sdk/dist/module/lib/constants.js
var NODE_VERSION = typeof process !== "undefined" && process.versions && process.versions.node ? process.versions.node : "unknown";
var BUN_VERSION = typeof process !== "undefined" && process.versions && process.versions.bun ? process.versions.bun : "unknown";
var BROWSER_AGENT = typeof window !== "undefined" && window.navigator && window.navigator.userAgent ? window.navigator.userAgent : "unknown";
var getAgent = () => {
  if (isNode()) {
    return `node/${NODE_VERSION}`;
  } else if (isBun()) {
    return `bun/${BUN_VERSION}`;
  } else if (isBrowser()) {
    return `javascript ${BROWSER_AGENT}`;
  } else {
    return `unknown`;
  }
};
var DEFAULT_HEADERS = {
  "Content-Type": `application/json`,
  "X-Client-Info": `@deepgram/sdk; ${isBrowser() ? "browser" : "server"}; v${version}`,
  "User-Agent": `@deepgram/sdk/${version} ${getAgent()}`
};
var DEFAULT_URL = "https://api.deepgram.com";
var DEFAULT_GLOBAL_OPTIONS = {
  fetch: { options: { url: DEFAULT_URL, headers: DEFAULT_HEADERS } },
  websocket: {
    options: { url: convertProtocolToWs(DEFAULT_URL), _nodeOnlyHeaders: DEFAULT_HEADERS }
  }
};
var DEFAULT_OPTIONS = {
  global: DEFAULT_GLOBAL_OPTIONS
};
var SOCKET_STATES;
(function(SOCKET_STATES2) {
  SOCKET_STATES2[SOCKET_STATES2["connecting"] = 0] = "connecting";
  SOCKET_STATES2[SOCKET_STATES2["open"] = 1] = "open";
  SOCKET_STATES2[SOCKET_STATES2["closing"] = 2] = "closing";
  SOCKET_STATES2[SOCKET_STATES2["closed"] = 3] = "closed";
})(SOCKET_STATES || (SOCKET_STATES = {}));
var CONNECTION_STATE;
(function(CONNECTION_STATE2) {
  CONNECTION_STATE2["Connecting"] = "connecting";
  CONNECTION_STATE2["Open"] = "open";
  CONNECTION_STATE2["Closing"] = "closing";
  CONNECTION_STATE2["Closed"] = "closed";
})(CONNECTION_STATE || (CONNECTION_STATE = {}));

// ../../node_modules/@deepgram/sdk/dist/module/packages/AbstractClient.js
var noop = () => {
};
var AbstractClient = class extends EventEmitter {
  /**
   * Constructs a new instance of the DeepgramClient class with the provided options.
   *
   * @param options - The options to configure the DeepgramClient instance.
   * @param options.key - The Deepgram API key to use for authentication. If not provided, the `DEEPGRAM_API_KEY` environment variable will be used.
   * @param options.global - Global options that apply to all requests made by the DeepgramClient instance.
   * @param options.global.fetch - Options to configure the fetch requests made by the DeepgramClient instance.
   * @param options.global.fetch.options - Additional options to pass to the fetch function, such as `url` and `headers`.
   * @param options.namespace - Options specific to a particular namespace within the DeepgramClient instance.
   */
  constructor(options) {
    super();
    this.factory = void 0;
    this.namespace = "global";
    this.version = "v1";
    this.baseUrl = DEFAULT_URL;
    this.logger = noop;
    let key;
    if (typeof options.key === "function") {
      this.factory = options.key;
      key = this.factory();
    } else {
      key = options.key;
    }
    if (!key) {
      key = process.env.DEEPGRAM_API_KEY;
    }
    if (!key) {
      throw new DeepgramError("A deepgram API key is required.");
    }
    this.key = key;
    options = convertLegacyOptions(options);
    this.options = applyDefaults(options, DEFAULT_OPTIONS);
  }
  /**
   * Sets the version for the current instance of the Deepgram API and returns the instance.
   *
   * @param version - The version to set for the Deepgram API instance. Defaults to "v1" if not provided.
   * @returns The current instance of the AbstractClient with the updated version.
   */
  v(version2 = "v1") {
    this.version = version2;
    return this;
  }
  /**
   * Gets the namespace options for the current instance of the AbstractClient.
   * The namespace options include the default options merged with the global options,
   * and the API key for the current instance.
   *
   * @returns The namespace options for the current instance.
   */
  get namespaceOptions() {
    const defaults2 = applyDefaults(this.options[this.namespace], this.options.global);
    return Object.assign(Object.assign({}, defaults2), { key: this.key });
  }
  /**
   * Generates a URL for an API endpoint with optional query parameters and transcription options.
   *
   * @param endpoint - The API endpoint URL, which may contain placeholders for fields.
   * @param fields - An optional object containing key-value pairs to replace placeholders in the endpoint URL.
   * @param transcriptionOptions - Optional transcription options to include as query parameters in the URL.
   * @returns A URL object representing the constructed API request URL.
   */
  getRequestUrl(endpoint, fields = { version: this.version }, transcriptionOptions) {
    fields.version = this.version;
    endpoint = endpoint.replace(/:(\w+)/g, function(_, key) {
      return fields[key];
    });
    const url = new URL(endpoint, this.baseUrl);
    if (transcriptionOptions) {
      appendSearchParams(url.searchParams, transcriptionOptions);
    }
    return url;
  }
  /**
   * Logs the message.
   *
   * For customized logging, `this.logger` can be overridden.
   */
  log(kind2, msg, data) {
    this.logger(kind2, msg, data);
  }
};

// ../../node_modules/@deepgram/sdk/dist/module/packages/AbstractLiveClient.js
var __awaiter = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var NATIVE_WEBSOCKET_AVAILABLE = typeof WebSocket !== "undefined";
var AbstractLiveClient = class extends AbstractClient {
  constructor(options) {
    super(options);
    this.conn = null;
    this.sendBuffer = [];
    this.reconnect = noop;
    const { key, websocket: { options: websocketOptions, client } } = this.namespaceOptions;
    if (this.proxy) {
      this.baseUrl = websocketOptions.proxy.url;
    } else {
      this.baseUrl = websocketOptions.url;
    }
    if (client) {
      this.transport = client;
    } else {
      this.transport = null;
    }
    if (websocketOptions._nodeOnlyHeaders) {
      this.headers = websocketOptions._nodeOnlyHeaders;
    } else {
      this.headers = {};
    }
    if (!("Authorization" in this.headers)) {
      this.headers["Authorization"] = `Token ${key}`;
    }
  }
  /**
   * Connects the socket, unless already connected.
   *
   * @protected Can only be called from within the class.
   */
  connect(transcriptionOptions, endpoint) {
    if (this.conn) {
      return;
    }
    this.reconnect = (options = transcriptionOptions) => {
      this.connect(options, endpoint);
    };
    const requestUrl = this.getRequestUrl(endpoint, {}, transcriptionOptions);
    if (this.transport) {
      this.conn = new this.transport(requestUrl, void 0, {
        headers: this.headers
      });
      return;
    }
    if (isBun()) {
      import("./wrapper-RHWPOSWW.js").then(({ default: WS }) => {
        this.conn = new WS(requestUrl, {
          headers: this.headers
        });
        console.log(`Using WS package`);
        this.setupConnection();
      });
      return;
    }
    if (NATIVE_WEBSOCKET_AVAILABLE) {
      this.conn = new WebSocket(requestUrl, ["token", this.namespaceOptions.key]);
      this.setupConnection();
      return;
    }
    this.conn = new WSWebSocketDummy(requestUrl, void 0, {
      close: () => {
        this.conn = null;
      }
    });
    import("./wrapper-RHWPOSWW.js").then(({ default: WS }) => {
      this.conn = new WS(requestUrl, void 0, {
        headers: this.headers
      });
      this.setupConnection();
    });
  }
  /**
   * Disconnects the socket from the client.
   *
   * @param code A numeric status code to send on disconnect.
   * @param reason A custom reason for the disconnect.
   */
  disconnect(code, reason) {
    if (this.conn) {
      this.conn.onclose = function() {
      };
      if (code) {
        this.conn.close(code, reason !== null && reason !== void 0 ? reason : "");
      } else {
        this.conn.close();
      }
      this.conn = null;
    }
  }
  /**
   * Returns the current connection state of the WebSocket connection.
   *
   * @returns The current connection state of the WebSocket connection.
   */
  connectionState() {
    switch (this.conn && this.conn.readyState) {
      case SOCKET_STATES.connecting:
        return CONNECTION_STATE.Connecting;
      case SOCKET_STATES.open:
        return CONNECTION_STATE.Open;
      case SOCKET_STATES.closing:
        return CONNECTION_STATE.Closing;
      default:
        return CONNECTION_STATE.Closed;
    }
  }
  /**
   * Returns the current ready state of the WebSocket connection.
   *
   * @returns The current ready state of the WebSocket connection.
   */
  getReadyState() {
    var _a2, _b;
    return (_b = (_a2 = this.conn) === null || _a2 === void 0 ? void 0 : _a2.readyState) !== null && _b !== void 0 ? _b : SOCKET_STATES.closed;
  }
  /**
   * Returns `true` is the connection is open.
   */
  isConnected() {
    return this.connectionState() === CONNECTION_STATE.Open;
  }
  /**
   * Sends data to the Deepgram API via websocket connection
   * @param data Audio data to send to Deepgram
   *
   * Conforms to RFC #146 for Node.js - does not send an empty byte.
   * @see https://github.com/deepgram/deepgram-python-sdk/issues/146
   */
  send(data) {
    const callback = () => __awaiter(this, void 0, void 0, function* () {
      var _a2;
      if (data instanceof Blob) {
        if (data.size === 0) {
          this.log("warn", "skipping `send` for zero-byte blob", data);
          return;
        }
        data = yield data.arrayBuffer();
      }
      if (typeof data !== "string") {
        if (data.byteLength === 0) {
          this.log("warn", "skipping `send` for zero-byte blob", data);
          return;
        }
      }
      (_a2 = this.conn) === null || _a2 === void 0 ? void 0 : _a2.send(data);
    });
    if (this.isConnected()) {
      callback();
    } else {
      this.sendBuffer.push(callback);
    }
  }
  /**
   * Determines whether the current instance should proxy requests.
   * @returns {boolean} true if the current instance should proxy requests; otherwise, false
   */
  get proxy() {
    var _a2;
    return this.key === "proxy" && !!((_a2 = this.namespaceOptions.websocket.options.proxy) === null || _a2 === void 0 ? void 0 : _a2.url);
  }
};
var WSWebSocketDummy = class {
  constructor(address, _protocols, options) {
    this.binaryType = "arraybuffer";
    this.onclose = () => {
    };
    this.onerror = () => {
    };
    this.onmessage = () => {
    };
    this.onopen = () => {
    };
    this.readyState = SOCKET_STATES.connecting;
    this.send = () => {
    };
    this.url = null;
    this.url = address.toString();
    this.close = options.close;
  }
};

// ../../node_modules/@deepgram/sdk/dist/module/lib/fetch.js
var import_cross_fetch2 = __toESM(require_node_ponyfill());
var __awaiter2 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var resolveFetch = (customFetch) => {
  let _fetch;
  if (customFetch) {
    _fetch = customFetch;
  } else if (typeof fetch === "undefined") {
    _fetch = import_cross_fetch2.default;
  } else {
    _fetch = fetch;
  }
  return (...args) => _fetch(...args);
};
var fetchWithAuth = (apiKey, customFetch) => {
  const fetch3 = resolveFetch(customFetch);
  const HeadersConstructor = resolveHeadersConstructor();
  return (input, init) => __awaiter2(void 0, void 0, void 0, function* () {
    const headers = new HeadersConstructor(init === null || init === void 0 ? void 0 : init.headers);
    if (!headers.has("Authorization")) {
      headers.set("Authorization", `Token ${apiKey}`);
    }
    return fetch3(input, Object.assign(Object.assign({}, init), { headers }));
  });
};
var resolveResponse = () => __awaiter2(void 0, void 0, void 0, function* () {
  if (typeof Response === "undefined") {
    return (yield import("./node-ponyfill-DYLVY4S4.js")).Response;
  }
  return Response;
});

// ../../node_modules/@deepgram/sdk/dist/module/packages/AbstractRestClient.js
var import_deepmerge2 = __toESM(require_cjs());
var __awaiter3 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var AbstractRestClient = class extends AbstractClient {
  /**
   * Constructs a new instance of the `AbstractRestClient` class with the provided options.
   *
   * @param options - The client options to use for this instance.
   * @throws {DeepgramError} If the client is being used in a browser and no proxy is provided.
   */
  constructor(options) {
    super(options);
    if (isBrowser() && !this.proxy) {
      throw new DeepgramError("Due to CORS we are unable to support REST-based API calls to our API from the browser. Please consider using a proxy: https://dpgr.am/js-proxy for more information.");
    }
    this.fetch = fetchWithAuth(this.key, this.namespaceOptions.fetch.client);
    if (this.proxy) {
      this.baseUrl = this.namespaceOptions.fetch.options.proxy.url;
    } else {
      this.baseUrl = this.namespaceOptions.fetch.options.url;
    }
  }
  /**
   * Constructs an error message from the provided error object.
   *
   * @param err - The error object to extract the error message from.
   * @returns The constructed error message.
   */
  _getErrorMessage(err) {
    return err.msg || err.message || err.error_description || err.error || JSON.stringify(err);
  }
  /**
   * Handles an error that occurred during a request.
   *
   * @param error - The error that occurred during the request.
   * @param reject - The rejection function to call with the error.
   * @returns A Promise that resolves when the error has been handled.
   */
  _handleError(error, reject) {
    return __awaiter3(this, void 0, void 0, function* () {
      const Res = yield resolveResponse();
      if (error instanceof Res) {
        error.json().then((err) => {
          reject(new DeepgramApiError(this._getErrorMessage(err), error.status || 500));
        }).catch((err) => {
          reject(new DeepgramUnknownError(this._getErrorMessage(err), err));
        });
      } else {
        reject(new DeepgramUnknownError(this._getErrorMessage(error), error));
      }
    });
  }
  /**
   * Constructs the options object to be used for a fetch request.
   *
   * @param method - The HTTP method to use for the request, such as "GET", "POST", "PUT", "PATCH", or "DELETE".
   * @param bodyOrOptions - For "POST", "PUT", and "PATCH" requests, the request body as a string, Buffer, or Readable stream. For "GET" and "DELETE" requests, the fetch options to use.
   * @param options - Additional fetch options to use for the request.
   * @returns The constructed fetch options object.
   */
  _getRequestOptions(method, bodyOrOptions, options) {
    let reqOptions = { method };
    if (method === "GET" || method === "DELETE") {
      reqOptions = Object.assign(Object.assign({}, reqOptions), bodyOrOptions);
    } else {
      reqOptions = Object.assign(Object.assign({ duplex: "half", body: bodyOrOptions }, reqOptions), options);
    }
    return (0, import_deepmerge2.default)(this.namespaceOptions.fetch.options, reqOptions, { clone: false });
  }
  _handleRequest(method, url, bodyOrOptions, options) {
    return __awaiter3(this, void 0, void 0, function* () {
      return new Promise((resolve, reject) => {
        const fetcher = this.fetch;
        fetcher(url, this._getRequestOptions(method, bodyOrOptions, options)).then((result) => {
          if (!result.ok)
            throw result;
          resolve(result);
        }).catch((error) => this._handleError(error, reject));
      });
    });
  }
  /**
   * Handles an HTTP GET request using the provided URL and optional request options.
   *
   * @param url - The URL to send the GET request to.
   * @param options - Additional fetch options to use for the GET request.
   * @returns A Promise that resolves to the Response object for the GET request.
   */
  get(url, options) {
    return __awaiter3(this, void 0, void 0, function* () {
      return this._handleRequest("GET", url, options);
    });
  }
  /**
   * Handles an HTTP POST request using the provided URL, request body, and optional request options.
   *
   * @param url - The URL to send the POST request to.
   * @param body - The request body as a string, Buffer, or Readable stream.
   * @param options - Additional fetch options to use for the POST request.
   * @returns A Promise that resolves to the Response object for the POST request.
   */
  post(url, body, options) {
    return __awaiter3(this, void 0, void 0, function* () {
      return this._handleRequest("POST", url, body, options);
    });
  }
  /**
   * Handles an HTTP PUT request using the provided URL, request body, and optional request options.
   *
   * @param url - The URL to send the PUT request to.
   * @param body - The request body as a string, Buffer, or Readable stream.
   * @param options - Additional fetch options to use for the PUT request.
   * @returns A Promise that resolves to the Response object for the PUT request.
   */
  put(url, body, options) {
    return __awaiter3(this, void 0, void 0, function* () {
      return this._handleRequest("PUT", url, body, options);
    });
  }
  /**
   * Handles an HTTP PATCH request using the provided URL, request body, and optional request options.
   *
   * @param url - The URL to send the PATCH request to.
   * @param body - The request body as a string, Buffer, or Readable stream.
   * @param options - Additional fetch options to use for the PATCH request.
   * @returns A Promise that resolves to the Response object for the PATCH request.
   */
  patch(url, body, options) {
    return __awaiter3(this, void 0, void 0, function* () {
      return this._handleRequest("PATCH", url, body, options);
    });
  }
  /**
   * Handles an HTTP DELETE request using the provided URL and optional request options.
   *
   * @param url - The URL to send the DELETE request to.
   * @param options - Additional fetch options to use for the DELETE request.
   * @returns A Promise that resolves to the Response object for the DELETE request.
   */
  delete(url, options) {
    return __awaiter3(this, void 0, void 0, function* () {
      return this._handleRequest("DELETE", url, options);
    });
  }
  /**
   * Determines whether the current instance should proxy requests.
   * @returns {boolean} true if the current instance should proxy requests; otherwise, false
   */
  get proxy() {
    var _a2;
    return this.key === "proxy" && !!((_a2 = this.namespaceOptions.fetch.options.proxy) === null || _a2 === void 0 ? void 0 : _a2.url);
  }
};

// ../../node_modules/@deepgram/sdk/dist/module/lib/enums/LiveTranscriptionEvents.js
var LiveTranscriptionEvents;
(function(LiveTranscriptionEvents2) {
  LiveTranscriptionEvents2["Open"] = "open";
  LiveTranscriptionEvents2["Close"] = "close";
  LiveTranscriptionEvents2["Error"] = "error";
  LiveTranscriptionEvents2["Transcript"] = "Results";
  LiveTranscriptionEvents2["Metadata"] = "Metadata";
  LiveTranscriptionEvents2["UtteranceEnd"] = "UtteranceEnd";
  LiveTranscriptionEvents2["SpeechStarted"] = "SpeechStarted";
  LiveTranscriptionEvents2["Unhandled"] = "Unhandled";
})(LiveTranscriptionEvents || (LiveTranscriptionEvents = {}));

// ../../node_modules/@deepgram/sdk/dist/module/lib/enums/LiveTTSEvents.js
var LiveTTSEvents;
(function(LiveTTSEvents2) {
  LiveTTSEvents2["Open"] = "Open";
  LiveTTSEvents2["Close"] = "Close";
  LiveTTSEvents2["Error"] = "Error";
  LiveTTSEvents2["Metadata"] = "Metadata";
  LiveTTSEvents2["Flushed"] = "Flushed";
  LiveTTSEvents2["Warning"] = "Warning";
  LiveTTSEvents2["Audio"] = "Audio";
  LiveTTSEvents2["Unhandled"] = "Unhandled";
})(LiveTTSEvents || (LiveTTSEvents = {}));

// ../../node_modules/@deepgram/sdk/dist/module/packages/ListenLiveClient.js
var ListenLiveClient = class extends AbstractLiveClient {
  /**
   * Constructs a new `ListenLiveClient` instance with the provided options.
   *
   * @param options - The `DeepgramClientOptions` to use for the client connection.
   * @param transcriptionOptions - An optional `LiveSchema` object containing additional configuration options for the live transcription.
   * @param endpoint - An optional string representing the WebSocket endpoint to connect to. Defaults to `:version/listen`.
   */
  constructor(options, transcriptionOptions = {}, endpoint = ":version/listen") {
    super(options);
    this.namespace = "listen";
    this.connect(transcriptionOptions, endpoint);
  }
  /**
   * Sets up the connection event handlers.
   * This method is responsible for handling the various events that can occur on the WebSocket connection, such as opening, closing, and receiving messages.
   * - When the connection is opened, it emits the `LiveTranscriptionEvents.Open` event.
   * - When the connection is closed, it emits the `LiveTranscriptionEvents.Close` event.
   * - When an error occurs on the connection, it emits the `LiveTranscriptionEvents.Error` event.
   * - When a message is received, it parses the message and emits the appropriate event based on the message type, such as `LiveTranscriptionEvents.Metadata`, `LiveTranscriptionEvents.Transcript`, `LiveTranscriptionEvents.UtteranceEnd`, and `LiveTranscriptionEvents.SpeechStarted`.
   */
  setupConnection() {
    if (this.conn) {
      this.conn.onopen = () => {
        this.emit(LiveTranscriptionEvents.Open, this);
      };
      this.conn.onclose = (event) => {
        this.emit(LiveTranscriptionEvents.Close, event);
      };
      this.conn.onerror = (event) => {
        this.emit(LiveTranscriptionEvents.Error, event);
      };
      this.conn.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data.toString());
          if (data.type === LiveTranscriptionEvents.Metadata) {
            this.emit(LiveTranscriptionEvents.Metadata, data);
          } else if (data.type === LiveTranscriptionEvents.Transcript) {
            this.emit(LiveTranscriptionEvents.Transcript, data);
          } else if (data.type === LiveTranscriptionEvents.UtteranceEnd) {
            this.emit(LiveTranscriptionEvents.UtteranceEnd, data);
          } else if (data.type === LiveTranscriptionEvents.SpeechStarted) {
            this.emit(LiveTranscriptionEvents.SpeechStarted, data);
          } else {
            this.emit(LiveTranscriptionEvents.Unhandled, data);
          }
        } catch (error) {
          this.emit(LiveTranscriptionEvents.Error, {
            event,
            message: "Unable to parse `data` as JSON.",
            error
          });
        }
      };
    }
  }
  /**
   * Sends additional config to the connected session.
   *
   * @param config - The configuration options to apply to the LiveClient.
   * @param config.numerals - We currently only support numerals.
   */
  configure(config) {
    this.send(JSON.stringify({
      type: "Configure",
      processors: config
    }));
  }
  /**
   * Sends a "KeepAlive" message to the server to maintain the connection.
   */
  keepAlive() {
    this.send(JSON.stringify({
      type: "KeepAlive"
    }));
  }
  /**
   * Sends a "Finalize" message to flush any transcription sitting in the server's buffer.
   */
  finalize() {
    this.send(JSON.stringify({
      type: "Finalize"
    }));
  }
  /**
   * @deprecated Since version 3.4. Will be removed in version 4.0. Use `requestClose` instead.
   */
  finish() {
    this.requestClose();
  }
  /**
   * Requests the server close the connection.
   */
  requestClose() {
    this.send(JSON.stringify({
      type: "CloseStream"
    }));
  }
};

// ../../node_modules/@deepgram/sdk/dist/module/packages/ListenRestClient.js
var __awaiter4 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var ListenRestClient = class extends AbstractRestClient {
  constructor() {
    super(...arguments);
    this.namespace = "listen";
  }
  /**
   * Transcribes audio from a URL synchronously.
   *
   * @param source - The URL source object containing the audio URL to transcribe.
   * @param options - An optional `PrerecordedSchema` object containing additional options for the transcription.
   * @param endpoint - An optional endpoint string to use for the transcription request.
   * @returns A `DeepgramResponse` object containing the transcription result or an error.
   */
  transcribeUrl(source, options, endpoint = ":version/listen") {
    return __awaiter4(this, void 0, void 0, function* () {
      try {
        let body;
        if (isUrlSource(source)) {
          body = JSON.stringify(source);
        } else {
          throw new DeepgramError("Unknown transcription source type");
        }
        if (options !== void 0 && "callback" in options) {
          throw new DeepgramError("Callback cannot be provided as an option to a synchronous transcription. Use `transcribeUrlCallback` or `transcribeFileCallback` instead.");
        }
        const requestUrl = this.getRequestUrl(endpoint, {}, Object.assign({}, options));
        const result = yield this.post(requestUrl, body).then((result2) => result2.json());
        return { result, error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Transcribes audio from a file asynchronously.
   *
   * @param source - The file source object containing the audio file to transcribe.
   * @param options - An optional `PrerecordedSchema` object containing additional options for the transcription.
   * @param endpoint - An optional endpoint string to use for the transcription request.
   * @returns A `DeepgramResponse` object containing the transcription result or an error.
   */
  transcribeFile(source, options, endpoint = ":version/listen") {
    return __awaiter4(this, void 0, void 0, function* () {
      try {
        let body;
        if (isFileSource(source)) {
          body = source;
        } else {
          throw new DeepgramError("Unknown transcription source type");
        }
        if (options !== void 0 && "callback" in options) {
          throw new DeepgramError("Callback cannot be provided as an option to a synchronous transcription. Use `transcribeUrlCallback` or `transcribeFileCallback` instead.");
        }
        const requestUrl = this.getRequestUrl(endpoint, {}, Object.assign({}, options));
        const result = yield this.post(requestUrl, body, {
          headers: { "Content-Type": "deepgram/audio+video" }
        }).then((result2) => result2.json());
        return { result, error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Transcribes audio from a URL asynchronously.
   *
   * @param source - The URL source object containing the audio file to transcribe.
   * @param callback - The callback URL to receive the transcription result.
   * @param options - An optional `PrerecordedSchema` object containing additional options for the transcription.
   * @param endpoint - An optional endpoint string to use for the transcription request.
   * @returns A `DeepgramResponse` object containing the transcription result or an error.
   */
  transcribeUrlCallback(source, callback, options, endpoint = ":version/listen") {
    return __awaiter4(this, void 0, void 0, function* () {
      try {
        let body;
        if (isUrlSource(source)) {
          body = JSON.stringify(source);
        } else {
          throw new DeepgramError("Unknown transcription source type");
        }
        const requestUrl = this.getRequestUrl(endpoint, {}, Object.assign(Object.assign({}, options), { callback: callback.toString() }));
        const result = yield this.post(requestUrl, body).then((result2) => result2.json());
        return { result, error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Transcribes audio from a file asynchronously.
   *
   * @param source - The file source object containing the audio file to transcribe.
   * @param callback - The callback URL to receive the transcription result.
   * @param options - An optional `PrerecordedSchema` object containing additional options for the transcription.
   * @param endpoint - An optional endpoint string to use for the transcription request.
   * @returns A `DeepgramResponse` object containing the transcription result or an error.
   */
  transcribeFileCallback(source, callback, options, endpoint = ":version/listen") {
    return __awaiter4(this, void 0, void 0, function* () {
      try {
        let body;
        if (isFileSource(source)) {
          body = source;
        } else {
          throw new DeepgramError("Unknown transcription source type");
        }
        const requestUrl = this.getRequestUrl(endpoint, {}, Object.assign(Object.assign({}, options), { callback: callback.toString() }));
        const result = yield this.post(requestUrl, body, {
          headers: { "Content-Type": "deepgram/audio+video" }
        }).then((result2) => result2.json());
        return { result, error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
};

// ../../node_modules/@deepgram/sdk/dist/module/packages/ListenClient.js
var ListenClient = class extends AbstractClient {
  constructor() {
    super(...arguments);
    this.namespace = "listen";
  }
  /**
   * Returns a `ListenRestClient` instance for interacting with the prerecorded listen API.
   */
  get prerecorded() {
    return new ListenRestClient(this.options);
  }
  /**
   * Returns a `ListenLiveClient` instance for interacting with the live listen API, with the provided transcription options and endpoint.
   * @param {LiveSchema} [transcriptionOptions={}] - The transcription options to use for the live listen API.
   * @param {string} [endpoint=":version/listen"] - The endpoint to use for the live listen API.
   * @returns {ListenLiveClient} - A `ListenLiveClient` instance for interacting with the live listen API.
   */
  live(transcriptionOptions = {}, endpoint = ":version/listen") {
    return new ListenLiveClient(this.options, transcriptionOptions, endpoint);
  }
};

// ../../node_modules/@deepgram/sdk/dist/module/packages/ManageRestClient.js
var __awaiter5 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var ManageRestClient = class extends AbstractRestClient {
  constructor() {
    super(...arguments);
    this.namespace = "manage";
  }
  /**
   * Retrieves the details of the current authentication token.
   *
   * @returns A promise that resolves to an object containing the token details, or an error object if an error occurs.
   * @see https://developers.deepgram.com/docs/authenticating#test-request
   */
  getTokenDetails(endpoint = ":version/auth/token") {
    return __awaiter5(this, void 0, void 0, function* () {
      try {
        const requestUrl = this.getRequestUrl(endpoint);
        const result = yield this.get(requestUrl).then((result2) => result2.json());
        return { result, error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Retrieves a list of all projects associated with the authenticated user.
   *
   * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects".
   * @returns A promise that resolves to an object containing the list of projects, or an error object if an error occurs.
   * @see https://developers.deepgram.com/reference/get-projects
   */
  getProjects(endpoint = ":version/projects") {
    return __awaiter5(this, void 0, void 0, function* () {
      try {
        const requestUrl = this.getRequestUrl(endpoint);
        const result = yield this.get(requestUrl).then((result2) => result2.json());
        return { result, error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Retrieves the details of a specific project associated with the authenticated user.
   *
   * @param projectId - The ID of the project to retrieve.
   * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects/:projectId".
   * @returns A promise that resolves to an object containing the project details, or an error object if an error occurs.
   * @see https://developers.deepgram.com/reference/get-project
   */
  getProject(projectId, endpoint = ":version/projects/:projectId") {
    return __awaiter5(this, void 0, void 0, function* () {
      try {
        const requestUrl = this.getRequestUrl(endpoint, { projectId });
        const result = yield this.get(requestUrl).then((result2) => result2.json());
        return { result, error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Updates an existing project associated with the authenticated user.
   *
   * @param projectId - The ID of the project to update.
   * @param options - An object containing the updated project details.
   * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects/:projectId".
   * @returns A promise that resolves to an object containing the response message, or an error object if an error occurs.
   * @see https://developers.deepgram.com/reference/update-project
   */
  updateProject(projectId, options, endpoint = ":version/projects/:projectId") {
    return __awaiter5(this, void 0, void 0, function* () {
      try {
        const requestUrl = this.getRequestUrl(endpoint, { projectId }, options);
        const body = JSON.stringify(options);
        const result = yield this.patch(requestUrl, body).then((result2) => result2.json());
        return { result, error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Deletes an existing project associated with the authenticated user.
   *
   * @param projectId - The ID of the project to delete.
   * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects/:projectId".
   * @returns A promise that resolves to an object containing the response message, or an error object if an error occurs.
   * @see https://developers.deepgram.com/reference/delete-project
   */
  deleteProject(projectId, endpoint = ":version/projects/:projectId") {
    return __awaiter5(this, void 0, void 0, function* () {
      try {
        const requestUrl = this.getRequestUrl(endpoint, { projectId });
        yield this.delete(requestUrl);
        return { error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { error };
        }
        throw error;
      }
    });
  }
  /**
   * Retrieves a list of project keys associated with the specified project.
   *
   * @param projectId - The ID of the project to retrieve the keys for.
   * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects/:projectId/keys".
   * @returns A promise that resolves to an object containing the list of project keys, or an error object if an error occurs.
   * @see https://developers.deepgram.com/reference/list-keys
   */
  getProjectKeys(projectId, endpoint = ":version/projects/:projectId/keys") {
    return __awaiter5(this, void 0, void 0, function* () {
      try {
        const requestUrl = this.getRequestUrl(endpoint, { projectId });
        const result = yield this.get(requestUrl).then((result2) => result2.json());
        return { result, error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Retrieves a specific project key associated with the specified project.
   *
   * @param projectId - The ID of the project to retrieve the key for.
   * @param keyId - The ID of the project key to retrieve.
   * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects/:projectId/keys/:keyId".
   * @returns A promise that resolves to an object containing the project key, or an error object if an error occurs.
   * @see https://developers.deepgram.com/reference/get-key
   */
  getProjectKey(projectId, keyId, endpoint = ":version/projects/:projectId/keys/:keyId") {
    return __awaiter5(this, void 0, void 0, function* () {
      try {
        const requestUrl = this.getRequestUrl(endpoint, { projectId, keyId });
        const result = yield this.get(requestUrl).then((result2) => result2.json());
        return { result, error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Creates a new project key for the specified project.
   *
   * @param projectId - The ID of the project to create the key for.
   * @param options - An object containing the options for creating the project key.
   * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects/:projectId/keys".
   * @returns A promise that resolves to an object containing the created project key, or an error object if an error occurs.
   * @see https://developers.deepgram.com/reference/create-key
   */
  createProjectKey(projectId, options, endpoint = ":version/projects/:projectId/keys") {
    return __awaiter5(this, void 0, void 0, function* () {
      try {
        const requestUrl = this.getRequestUrl(endpoint, { projectId }, options);
        const body = JSON.stringify(options);
        const result = yield this.post(requestUrl, body).then((result2) => result2.json());
        return { result, error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Deletes the specified project key.
   *
   * @param projectId - The ID of the project the key belongs to.
   * @param keyId - The ID of the key to delete.
   * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects/:projectId/keys/:keyId".
   * @returns A promise that resolves to an object containing a null result and an error object if an error occurs.
   * @see https://developers.deepgram.com/reference/delete-key
   */
  deleteProjectKey(projectId, keyId, endpoint = ":version/projects/:projectId/keys/:keyId") {
    return __awaiter5(this, void 0, void 0, function* () {
      try {
        const requestUrl = this.getRequestUrl(endpoint, { projectId, keyId });
        yield this.delete(requestUrl);
        return { error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { error };
        }
        throw error;
      }
    });
  }
  /**
   * Retrieves the members of the specified project.
   *
   * @param projectId - The ID of the project to retrieve members for.
   * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects/:projectId/members".
   * @returns A promise that resolves to an object containing the project members and an error object if an error occurs.
   * @see https://developers.deepgram.com/reference/get-members
   */
  getProjectMembers(projectId, endpoint = ":version/projects/:projectId/members") {
    return __awaiter5(this, void 0, void 0, function* () {
      try {
        const requestUrl = this.getRequestUrl(endpoint, { projectId });
        const result = yield this.get(requestUrl).then((result2) => result2.json());
        return { result, error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Removes a member from the specified project.
   *
   * @param projectId - The ID of the project to remove the member from.
   * @param memberId - The ID of the member to remove.
   * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects/:projectId/members/:memberId".
   * @returns A promise that resolves to an object containing a null error if the operation was successful, or an error object if an error occurred.
   * @see https://developers.deepgram.com/reference/remove-member
   */
  removeProjectMember(projectId, memberId, endpoint = ":version/projects/:projectId/members/:memberId") {
    return __awaiter5(this, void 0, void 0, function* () {
      try {
        const requestUrl = this.getRequestUrl(endpoint, { projectId, memberId });
        yield this.delete(requestUrl);
        return { error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { error };
        }
        throw error;
      }
    });
  }
  /**
   * Retrieves the scopes for the specified project member.
   *
   * @param projectId - The ID of the project to retrieve the member scopes for.
   * @param memberId - The ID of the member to retrieve the scopes for.
   * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects/:projectId/members/:memberId/scopes".
   * @returns A promise that resolves to an object containing the retrieved scopes or an error object if an error occurred.
   * @see https://developers.deepgram.com/reference/get-member-scopes
   */
  getProjectMemberScopes(projectId, memberId, endpoint = ":version/projects/:projectId/members/:memberId/scopes") {
    return __awaiter5(this, void 0, void 0, function* () {
      try {
        const requestUrl = this.getRequestUrl(endpoint, { projectId, memberId });
        const result = yield this.get(requestUrl).then((result2) => result2.json());
        return { result, error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Updates the scopes for the specified project member.
   *
   * @param projectId - The ID of the project to update the member scopes for.
   * @param memberId - The ID of the member to update the scopes for.
   * @param options - An object containing the new scopes to apply to the member.
   * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects/:projectId/members/:memberId/scopes".
   * @returns A promise that resolves to an object containing the result of the update operation or an error object if an error occurred.
   * @see https://developers.deepgram.com/reference/update-scope
   */
  updateProjectMemberScope(projectId, memberId, options, endpoint = ":version/projects/:projectId/members/:memberId/scopes") {
    return __awaiter5(this, void 0, void 0, function* () {
      try {
        const requestUrl = this.getRequestUrl(endpoint, { projectId, memberId }, options);
        const body = JSON.stringify(options);
        const result = yield this.put(requestUrl, body).then((result2) => result2.json());
        return { result, error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Retrieves the project invites for the specified project.
   *
   * @param projectId - The ID of the project to retrieve the invites for.
   * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects/:projectId/invites".
   * @returns A promise that resolves to an object containing the result of the get operation or an error object if an error occurred.
   * @see https://developers.deepgram.com/reference/list-invites
   */
  getProjectInvites(projectId, endpoint = ":version/projects/:projectId/invites") {
    return __awaiter5(this, void 0, void 0, function* () {
      try {
        const requestUrl = this.getRequestUrl(endpoint, { projectId });
        const result = yield this.get(requestUrl).then((result2) => result2.json());
        return { result, error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Sends a project invite to the specified email addresses.
   *
   * @param projectId - The ID of the project to send the invite for.
   * @param options - An object containing the email addresses to invite and any additional options.
   * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects/:projectId/invites".
   * @returns A promise that resolves to an object containing the result of the post operation or an error object if an error occurred.
   * @see https://developers.deepgram.com/reference/send-invites
   */
  sendProjectInvite(projectId, options, endpoint = ":version/projects/:projectId/invites") {
    return __awaiter5(this, void 0, void 0, function* () {
      try {
        const requestUrl = this.getRequestUrl(endpoint, { projectId }, options);
        const body = JSON.stringify(options);
        const result = yield this.post(requestUrl, body).then((result2) => result2.json());
        return { result, error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Deletes a project invite for the specified email address.
   *
   * @param projectId - The ID of the project to delete the invite for.
   * @param email - The email address of the invite to delete.
   * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects/:projectId/invites/:email".
   * @returns A promise that resolves to an object containing a null result and an error object if an error occurred.
   * @see https://developers.deepgram.com/reference/delete-invite
   */
  deleteProjectInvite(projectId, email, endpoint = ":version/projects/:projectId/invites/:email") {
    return __awaiter5(this, void 0, void 0, function* () {
      try {
        const requestUrl = this.getRequestUrl(endpoint, { projectId, email });
        yield this.delete(requestUrl).then((result) => result.json());
        return { error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { error };
        }
        throw error;
      }
    });
  }
  /**
   * Leaves the specified project.
   *
   * @param projectId - The ID of the project to leave.
   * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects/:projectId/leave".
   * @returns A promise that resolves to an object containing a null result and an error object if an error occurred.
   * @see https://developers.deepgram.com/reference/leave-project
   */
  leaveProject(projectId, endpoint = ":version/projects/:projectId/leave") {
    return __awaiter5(this, void 0, void 0, function* () {
      try {
        const requestUrl = this.getRequestUrl(endpoint, { projectId });
        const result = yield this.delete(requestUrl).then((result2) => result2.json());
        return { result, error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Retrieves a list of usage requests for the specified project.
   *
   * @param projectId - The ID of the project to retrieve usage requests for.
   * @param options - An object containing options to filter the usage requests, such as pagination parameters.
   * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects/:projectId/requests".
   * @returns A promise that resolves to an object containing the list of usage requests and an error object if an error occurred.
   * @see https://developers.deepgram.com/reference/get-all-requests
   */
  getProjectUsageRequests(projectId, options, endpoint = ":version/projects/:projectId/requests") {
    return __awaiter5(this, void 0, void 0, function* () {
      try {
        const requestUrl = this.getRequestUrl(endpoint, { projectId }, options);
        const result = yield this.get(requestUrl).then((result2) => result2.json());
        return { result, error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Retrieves the details of a specific usage request for the specified project.
   *
   * @param projectId - The ID of the project to retrieve the usage request for.
   * @param requestId - The ID of the usage request to retrieve.
   * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects/:projectId/requests/:requestId".
   * @returns A promise that resolves to an object containing the usage request details and an error object if an error occurred.
   * @see https://developers.deepgram.com/reference/get-request
   */
  getProjectUsageRequest(projectId, requestId, endpoint = ":version/projects/:projectId/requests/:requestId") {
    return __awaiter5(this, void 0, void 0, function* () {
      try {
        const requestUrl = this.getRequestUrl(endpoint, { projectId, requestId });
        const result = yield this.get(requestUrl).then((result2) => result2.json());
        return { result, error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Retrieves the usage summary for the specified project.
   *
   * @param projectId - The ID of the project to retrieve the usage summary for.
   * @param options - An object containing optional parameters for the request, such as filters and pagination options.
   * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects/:projectId/usage".
   * @returns A promise that resolves to an object containing the usage summary and an error object if an error occurred.
   * @see https://developers.deepgram.com/reference/get-usage
   */
  getProjectUsageSummary(projectId, options, endpoint = ":version/projects/:projectId/usage") {
    return __awaiter5(this, void 0, void 0, function* () {
      try {
        const requestUrl = this.getRequestUrl(endpoint, { projectId }, options);
        const result = yield this.get(requestUrl).then((result2) => result2.json());
        return { result, error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Retrieves the usage fields for the specified project.
   *
   * @param projectId - The ID of the project to retrieve the usage fields for.
   * @param options - An object containing optional parameters for the request, such as filters and pagination options.
   * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects/:projectId/usage/fields".
   * @returns A promise that resolves to an object containing the usage fields and an error object if an error occurred.
   * @see https://developers.deepgram.com/reference/get-fields
   */
  getProjectUsageFields(projectId, options, endpoint = ":version/projects/:projectId/usage/fields") {
    return __awaiter5(this, void 0, void 0, function* () {
      try {
        const requestUrl = this.getRequestUrl(endpoint, { projectId }, options);
        const result = yield this.get(requestUrl).then((result2) => result2.json());
        return { result, error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Retrieves the balances for the specified project.
   *
   * @param projectId - The ID of the project to retrieve the balances for.
   * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects/:projectId/balances".
   * @returns A promise that resolves to an object containing the project balances and an error object if an error occurred.
   * @see https://developers.deepgram.com/reference/get-all-balances
   */
  getProjectBalances(projectId, endpoint = ":version/projects/:projectId/balances") {
    return __awaiter5(this, void 0, void 0, function* () {
      try {
        const requestUrl = this.getRequestUrl(endpoint, { projectId });
        const result = yield this.get(requestUrl).then((result2) => result2.json());
        return { result, error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Retrieves the balance for the specified project and balance ID.
   *
   * @param projectId - The ID of the project to retrieve the balance for.
   * @param balanceId - The ID of the balance to retrieve.
   * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects/:projectId/balances/:balanceId".
   * @returns A promise that resolves to an object containing the project balance and an error object if an error occurred.
   * @see https://developers.deepgram.com/reference/get-balance
   */
  getProjectBalance(projectId, balanceId, endpoint = ":version/projects/:projectId/balances/:balanceId") {
    return __awaiter5(this, void 0, void 0, function* () {
      try {
        const requestUrl = this.getRequestUrl(endpoint, { projectId, balanceId });
        const result = yield this.get(requestUrl).then((result2) => result2.json());
        return { result, error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Retrieves all models for a given project.
   *
   * @param projectId - The ID of the project.
   * @param endpoint - (optional) The endpoint URL for retrieving models. Defaults to ":version/projects/:projectId/models".
   * @returns A promise that resolves to a DeepgramResponse containing the GetModelsResponse.
   * @example
   * ```typescript
   * import { createClient } from "@deepgram/sdk";
   *
   * const deepgram = createClient(DEEPGRAM_API_KEY);
   * const { result: models, error } = deepgram.manage.getAllModels("projectId");
   *
   * if (error) {
   *   console.error(error);
   * } else {
   *   console.log(models);
   * }
   * ```
   */
  getAllModels(projectId, options = {}, endpoint = ":version/projects/:projectId/models") {
    return __awaiter5(this, void 0, void 0, function* () {
      try {
        const requestUrl = this.getRequestUrl(endpoint, { projectId }, options);
        const result = yield this.get(requestUrl).then((result2) => result2.json());
        return { result, error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Retrieves a model from the specified project.
   *
   * @param projectId - The ID of the project.
   * @param modelId - The ID of the model.
   * @param endpoint - (optional) The endpoint URL for the request. Default value is ":version/projects/:projectId/models/:modelId".
   * @returns A promise that resolves to a DeepgramResponse containing the GetModelResponse.
   * @example
   * ```typescript
   * import { createClient } from "@deepgram/sdk";
   *
   * const deepgram = createClient(DEEPGRAM_API_KEY);
   * const { result: model, error } = deepgram.models.getModel("projectId", "modelId");
   *
   * if (error) {
   *   console.error(error);
   * } else {
   *   console.log(model);
   * }
   * ```
   */
  getModel(projectId, modelId, endpoint = ":version/projects/:projectId/models/:modelId") {
    return __awaiter5(this, void 0, void 0, function* () {
      try {
        const requestUrl = this.getRequestUrl(endpoint, { projectId, modelId });
        const result = yield this.get(requestUrl).then((result2) => result2.json());
        return { result, error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
};

// ../../node_modules/@deepgram/sdk/dist/module/packages/ModelsRestClient.js
var __awaiter6 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var ModelsRestClient = class extends AbstractRestClient {
  constructor() {
    super(...arguments);
    this.namespace = "models";
  }
  /**
   * Retrieves a list of all available models.
   *
   * @param endpoint - (optional) The endpoint to request.
   * @returns A promise that resolves with the response from the Deepgram API.
   * @example
   * ```typescript
   * import { createClient } from "@deepgram/sdk";
   *
   * const deepgram = createClient(DEEPGRAM_API_KEY);
   * const { result: models, error } = deepgram.models.getAll();
   *
   * if (error) {
   *   console.error(error);
   * } else {
   *   console.log(models);
   * }
   * ```
   */
  getAll(endpoint = ":version/models", options = {}) {
    return __awaiter6(this, void 0, void 0, function* () {
      try {
        const requestUrl = this.getRequestUrl(endpoint, {}, options);
        const result = yield this.get(requestUrl).then((result2) => result2.json());
        return { result, error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Retrieves information about a specific model.
   *
   * @param modelId - The UUID of the model to retrieve.
   * @param endpoint - (optional) The endpoint to request.
   * @returns A promise that resolves with the response from the Deepgram API.
   * @example
   * ```typescript
   * import { createClient } from "@deepgram/sdk";
   *
   * const deepgram = createClient(DEEPGRAM_API_KEY);
   * const { result: model, error } = deepgram.models.getModel("modelId");
   *
   * if (error) {
   *   console.error(error);
   * } else {
   *   console.log(model);
   * }
   * ```
   */
  getModel(modelId, endpoint = ":version/models/:modelId") {
    return __awaiter6(this, void 0, void 0, function* () {
      try {
        const requestUrl = this.getRequestUrl(endpoint, { modelId });
        const result = yield this.get(requestUrl).then((result2) => result2.json());
        return { result, error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
};

// ../../node_modules/@deepgram/sdk/dist/module/packages/ReadRestClient.js
var __awaiter7 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var ReadRestClient = class extends AbstractRestClient {
  constructor() {
    super(...arguments);
    this.namespace = "read";
  }
  /**
   * Analyzes a URL-based audio source synchronously.
   *
   * @param source - The URL-based audio source to analyze.
   * @param options - Optional analysis options.
   * @param endpoint - The API endpoint to use for the analysis. Defaults to ":version/read".
   * @returns A promise that resolves to the analysis response, or an error if the analysis fails.
   */
  analyzeUrl(source, options, endpoint = ":version/read") {
    return __awaiter7(this, void 0, void 0, function* () {
      try {
        let body;
        if (isUrlSource(source)) {
          body = JSON.stringify(source);
        } else {
          throw new DeepgramError("Unknown source type");
        }
        if (options !== void 0 && "callback" in options) {
          throw new DeepgramError("Callback cannot be provided as an option to a synchronous transcription. Use `analyzeUrlCallback` or `analyzeTextCallback` instead.");
        }
        const requestUrl = this.getRequestUrl(endpoint, {}, Object.assign({}, options));
        const result = yield this.post(requestUrl, body).then((result2) => result2.json());
        return { result, error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Analyzes a text-based audio source synchronously.
   *
   * @param source - The text-based audio source to analyze.
   * @param options - Optional analysis options.
   * @param endpoint - The API endpoint to use for the analysis. Defaults to ":version/read".
   * @returns A promise that resolves to the analysis response, or an error if the analysis fails.
   */
  analyzeText(source, options, endpoint = ":version/read") {
    return __awaiter7(this, void 0, void 0, function* () {
      try {
        let body;
        if (isTextSource(source)) {
          body = JSON.stringify(source);
        } else {
          throw new DeepgramError("Unknown source type");
        }
        if (options !== void 0 && "callback" in options) {
          throw new DeepgramError("Callback cannot be provided as an option to a synchronous requests. Use `analyzeUrlCallback` or `analyzeTextCallback` instead.");
        }
        const requestUrl = this.getRequestUrl(endpoint, {}, Object.assign({}, options));
        const result = yield this.post(requestUrl, body).then((result2) => result2.json());
        return { result, error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Analyzes a URL-based audio source asynchronously.
   *
   * @param source - The URL-based audio source to analyze.
   * @param callback - The URL to call back with the analysis results.
   * @param options - Optional analysis options.
   * @param endpoint - The API endpoint to use for the analysis. Defaults to ":version/read".
   * @returns A promise that resolves to the analysis response, or an error if the analysis fails.
   */
  analyzeUrlCallback(source, callback, options, endpoint = ":version/read") {
    return __awaiter7(this, void 0, void 0, function* () {
      try {
        let body;
        if (isUrlSource(source)) {
          body = JSON.stringify(source);
        } else {
          throw new DeepgramError("Unknown source type");
        }
        const requestUrl = this.getRequestUrl(endpoint, {}, Object.assign(Object.assign({}, options), { callback: callback.toString() }));
        const result = yield this.post(requestUrl, body).then((result2) => result2.json());
        return { result, error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Analyzes a text-based audio source asynchronously.
   *
   * @param source - The text-based audio source to analyze.
   * @param callback - The URL to call back with the analysis results.
   * @param options - Optional analysis options.
   * @param endpoint - The API endpoint to use for the analysis. Defaults to ":version/read".
   * @returns A promise that resolves to the analysis response, or an error if the analysis fails.
   */
  analyzeTextCallback(source, callback, options, endpoint = ":version/read") {
    return __awaiter7(this, void 0, void 0, function* () {
      try {
        let body;
        if (isTextSource(source)) {
          body = JSON.stringify(source);
        } else {
          throw new DeepgramError("Unknown source type");
        }
        const requestUrl = this.getRequestUrl(endpoint, {}, Object.assign(Object.assign({}, options), { callback: callback.toString() }));
        const result = yield this.post(requestUrl, body, {
          headers: { "Content-Type": "deepgram/audio+video" }
        }).then((result2) => result2.json());
        return { result, error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
};

// ../../node_modules/@deepgram/sdk/dist/module/packages/SelfHostedRestClient.js
var __awaiter8 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var SelfHostedRestClient = class extends AbstractRestClient {
  constructor() {
    super(...arguments);
    this.namespace = "selfhosted";
  }
  /**
   * Lists the self-hosted credentials for a Deepgram project.
   *
   * @param projectId - The ID of the Deepgram project.
   * @returns A promise that resolves to an object containing the list of self-hosted credentials and any error that occurred.
   * @see https://developers.deepgram.com/reference/list-credentials
   */
  listCredentials(projectId, endpoint = ":version/projects/:projectId/onprem/distribution/credentials") {
    return __awaiter8(this, void 0, void 0, function* () {
      try {
        const requestUrl = this.getRequestUrl(endpoint, { projectId });
        const result = yield this.get(requestUrl).then((result2) => result2.json());
        return { result, error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Retrieves the self-hosted credentials for a specific Deepgram project and credentials ID.
   *
   * @param projectId - The ID of the Deepgram project.
   * @param credentialsId - The ID of the self-hosted credentials to retrieve.
   * @returns A promise that resolves to an object containing the self-hosted credentials and any error that occurred.
   * @see https://developers.deepgram.com/reference/get-credentials
   */
  getCredentials(projectId, credentialsId, endpoint = ":version/projects/:projectId/onprem/distribution/credentials/:credentialsId") {
    return __awaiter8(this, void 0, void 0, function* () {
      try {
        const requestUrl = this.getRequestUrl(endpoint, { projectId, credentialsId });
        const result = yield this.get(requestUrl).then((result2) => result2.json());
        return { result, error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Creates self-hosted credentials for a specific Deepgram project.
   *
   * @param projectId - The ID of the Deepgram project.
   * @param options - The options for creating the self-hosted credentials.
   * @returns A promise that resolves to an object containing the created self-hosted credentials and any error that occurred.
   * @see https://developers.deepgram.com/reference/create-credentials
   */
  createCredentials(projectId, options, endpoint = ":version/projects/:projectId/onprem/distribution/credentials") {
    return __awaiter8(this, void 0, void 0, function* () {
      try {
        const requestUrl = this.getRequestUrl(endpoint, { projectId });
        const body = JSON.stringify(options);
        const result = yield this.post(requestUrl, body).then((result2) => result2.json());
        return { result, error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Deletes self-hosted credentials for a specific Deepgram project.
   *
   * @param projectId - The ID of the Deepgram project.
   * @param credentialsId - The ID of the self-hosted credentials to delete.
   * @returns A promise that resolves to an object containing a message response and any error that occurred.
   * @see https://developers.deepgram.com/reference/delete-credentials
   */
  deleteCredentials(projectId, credentialsId, endpoint = ":version/projects/:projectId/onprem/distribution/credentials/:credentialsId") {
    return __awaiter8(this, void 0, void 0, function* () {
      try {
        const requestUrl = this.getRequestUrl(endpoint, { projectId, credentialsId });
        const result = yield this.delete(requestUrl).then((result2) => result2.json());
        return { result, error: null };
      } catch (error) {
        if (isDeepgramError(error)) {
          return { result: null, error };
        }
        throw error;
      }
    });
  }
};

// ../../node_modules/@deepgram/sdk/dist/module/packages/SpeakLiveClient.js
var SpeakLiveClient = class extends AbstractLiveClient {
  /**
   * Constructs a new `SpeakLiveClient` instance with the provided options.
   *
   * @param options - The `DeepgramClientOptions` to use for the client connection.
   * @param speakOptions - An optional `SpeakSchema` object containing additional configuration options for the text-to-speech.
   * @param endpoint - An optional string representing the WebSocket endpoint to connect to. Defaults to `:version/speak`.
   */
  constructor(options, speakOptions = {}, endpoint = ":version/speak") {
    super(options);
    this.namespace = "speak";
    this.connect(speakOptions, endpoint);
  }
  /**
   * Sets up the connection event handlers.
   * This method is responsible for handling the various events that can occur on the WebSocket connection, such as opening, closing, and receiving data.
   * - When the connection is opened, it emits the `LiveTTSEvents.Open` event.
   * - When the connection is closed, it emits the `LiveTTSEvents.Close` event.
   * - When an error occurs on the connection, it emits the `LiveTTSEvents.Error` event.
   * - When a message is received, it parses the message and emits the appropriate event based on the message type, such as `LiveTTSEvents.Metadata`, `LiveTTSEvents.Flushed`, and `LiveTTSEvents.Warning`.
   */
  setupConnection() {
    if (this.conn) {
      this.conn.onopen = () => {
        this.emit(LiveTTSEvents.Open, this);
      };
      this.conn.onclose = (event) => {
        this.emit(LiveTTSEvents.Close, event);
      };
      this.conn.onerror = (event) => {
        this.emit(LiveTTSEvents.Error, event);
      };
      this.conn.onmessage = (event) => {
        this.handleMessage(event);
      };
    }
  }
  /**
   * Handles text messages received from the WebSocket connection.
   * @param data - The parsed JSON data.
   */
  handleTextMessage(data) {
    if (data.type === LiveTTSEvents.Metadata) {
      this.emit(LiveTTSEvents.Metadata, data);
    } else if (data.type === LiveTTSEvents.Flushed) {
      this.emit(LiveTTSEvents.Flushed, data);
    } else if (data.type === LiveTTSEvents.Warning) {
      this.emit(LiveTTSEvents.Warning, data);
    } else {
      this.emit(LiveTTSEvents.Unhandled, data);
    }
  }
  /**
   * Handles binary messages received from the WebSocket connection.
   * @param data - The binary data.
   */
  handleBinaryMessage(data) {
    this.emit(LiveTTSEvents.Audio, data);
  }
  /**
   * Sends a text input message to the server.
   *
   * @param {string} text - The text to convert to speech.
   */
  sendText(text) {
    this.send(JSON.stringify({
      type: "Speak",
      text
    }));
  }
  /**
   * Requests the server flush the current buffer and return generated audio.
   */
  flush() {
    this.send(JSON.stringify({
      type: "Flush"
    }));
  }
  /**
   * Requests the server clear the current buffer.
   */
  clear() {
    this.send(JSON.stringify({
      type: "Clear"
    }));
  }
  /**
   * Requests the server close the connection.
   */
  requestClose() {
    this.send(JSON.stringify({
      type: "Close"
    }));
  }
  /**
   * Handles incoming messages from the WebSocket connection.
   * @param event - The MessageEvent object representing the received message.
   */
  handleMessage(event) {
    if (typeof event.data === "string") {
      try {
        const data = JSON.parse(event.data);
        this.handleTextMessage(data);
      } catch (error) {
        this.emit(LiveTTSEvents.Error, {
          event,
          message: "Unable to parse `data` as JSON.",
          error
        });
      }
    } else if (event.data instanceof Blob) {
      event.data.arrayBuffer().then((buffer) => {
        this.handleBinaryMessage(Buffer.from(buffer));
      });
    } else if (event.data instanceof ArrayBuffer) {
      this.handleBinaryMessage(Buffer.from(event.data));
    } else if (Buffer.isBuffer(event.data)) {
      this.handleBinaryMessage(event.data);
    } else {
      console.log("Received unknown data type", event.data);
      this.emit(LiveTTSEvents.Error, {
        event,
        message: "Received unknown data type."
      });
    }
  }
};

// ../../node_modules/@deepgram/sdk/dist/module/packages/SpeakRestClient.js
var __awaiter9 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var SpeakRestClient = class extends AbstractRestClient {
  constructor() {
    super(...arguments);
    this.namespace = "speak";
  }
  /**
   * Sends a request to the Deepgram Text-to-Speech API to generate audio from the provided text source.
   *
   * @param source - The text source to be converted to audio.
   * @param options - Optional configuration options for the text-to-speech request.
   * @param endpoint - The API endpoint to use for the request. Defaults to ":version/speak".
   * @returns A promise that resolves to the SpeakRestClient instance, which can be used to retrieve the response headers and body.
   * @throws {DeepgramError} If the text source type is unknown.
   * @throws {DeepgramUnknownError} If the request was made before a previous request completed.
   * @see https://developers.deepgram.com/reference/text-to-speech-api
   */
  request(source, options, endpoint = ":version/speak") {
    return __awaiter9(this, void 0, void 0, function* () {
      let body;
      if (isTextSource(source)) {
        body = JSON.stringify(source);
      } else {
        throw new DeepgramError("Unknown transcription source type");
      }
      const requestUrl = this.getRequestUrl(endpoint, {}, Object.assign({ model: "aura-asteria-en" }, options));
      this.result = yield this.post(requestUrl, body, {
        headers: { Accept: "audio/*", "Content-Type": "application/json" }
      });
      return this;
    });
  }
  /**
   * Retrieves the response body as a readable stream.
   *
   * @returns A promise that resolves to the response body as a readable stream, or `null` if no request has been made yet.
   * @throws {DeepgramUnknownError} If a request has not been made yet.
   */
  getStream() {
    return __awaiter9(this, void 0, void 0, function* () {
      if (!this.result)
        throw new DeepgramUnknownError("Tried to get stream before making request", "");
      return this.result.body;
    });
  }
  /**
   * Retrieves the response headers from the previous request.
   *
   * @returns A promise that resolves to the response headers, or throws a `DeepgramUnknownError` if no request has been made yet.
   */
  getHeaders() {
    return __awaiter9(this, void 0, void 0, function* () {
      if (!this.result)
        throw new DeepgramUnknownError("Tried to get headers before making request", "");
      return this.result.headers;
    });
  }
};

// ../../node_modules/@deepgram/sdk/dist/module/packages/SpeakClient.js
var SpeakClient = class extends AbstractClient {
  constructor() {
    super(...arguments);
    this.namespace = "speak";
  }
  /**
   * Returns a `SpeakRestClient` instance for interacting with the rest speak API.
   */
  request(source, options, endpoint = ":version/speak") {
    const client = new SpeakRestClient(this.options);
    return client.request(source, options, endpoint);
  }
  /**
   * Returns a `SpeakLiveClient` instance for interacting with the live speak API, with the provided TTS options and endpoint.
   * @param {SpeakSchema} [ttsOptions={}] - The TTS options to use for the live speak API.
   * @param {string} [endpoint=":version/speak"] - The endpoint to use for the live speak API.
   * @returns {SpeakLiveClient} - A `SpeakLiveClient` instance for interacting with the live speak API.
   */
  live(ttsOptions = {}, endpoint = ":version/speak") {
    return new SpeakLiveClient(this.options, ttsOptions, endpoint);
  }
};

// ../../node_modules/@deepgram/sdk/dist/module/DeepgramClient.js
var DeepgramClient = class extends AbstractClient {
  /**
   * Returns a new instance of the ListenClient, which provides access to the Deepgram API's listening functionality.
   *
   * @returns {ListenClient} A new instance of the ListenClient.
   */
  get listen() {
    return new ListenClient(this.options);
  }
  /**
   * Returns a new instance of the ManageClient, which provides access to the Deepgram API's management functionality.
   *
   * @returns {ManageClient} A new instance of the ManageClient.
   */
  get manage() {
    return new ManageRestClient(this.options);
  }
  /**
   * Returns a new instance of the ModelsRestClient, which provides access to the Deepgram API's model functionality.
   *
   * @returns {ModelsRestClient} A new instance of the ModelsRestClient.
   */
  get models() {
    return new ModelsRestClient(this.options);
  }
  /**
   * Returns a new instance of the SelfHostedRestClient, which provides access to the Deepgram API's self-hosted functionality.
   *
   * @returns {OnPremClient} A new instance of the SelfHostedRestClient named as OnPremClient.
   * @deprecated use selfhosted() instead
   */
  get onprem() {
    return this.selfhosted;
  }
  /**
   * Returns a new instance of the SelfHostedRestClient, which provides access to the Deepgram API's self-hosted functionality.
   *
   * @returns {SelfHostedRestClient} A new instance of the SelfHostedRestClient.
   */
  get selfhosted() {
    return new SelfHostedRestClient(this.options);
  }
  /**
   * Returns a new instance of the ReadClient, which provides access to the Deepgram API's reading functionality.
   *
   * @returns {ReadClient} A new instance of the ReadClient.
   */
  get read() {
    return new ReadRestClient(this.options);
  }
  /**
   * Returns a new instance of the SpeakClient, which provides access to the Deepgram API's speaking functionality.
   *
   * @returns {SpeakClient} A new instance of the SpeakClient.
   */
  get speak() {
    return new SpeakClient(this.options);
  }
  /**
   * @deprecated
   * @see https://dpgr.am/js-v3
   */
  get transcription() {
    throw new DeepgramVersionError();
  }
  /**
   * @deprecated
   * @see https://dpgr.am/js-v3
   */
  get projects() {
    throw new DeepgramVersionError();
  }
  /**
   * @deprecated
   * @see https://dpgr.am/js-v3
   */
  get keys() {
    throw new DeepgramVersionError();
  }
  /**
   * @deprecated
   * @see https://dpgr.am/js-v3
   */
  get members() {
    throw new DeepgramVersionError();
  }
  /**
   * @deprecated
   * @see https://dpgr.am/js-v3
   */
  get scopes() {
    throw new DeepgramVersionError();
  }
  /**
   * @deprecated
   * @see https://dpgr.am/js-v3
   */
  get invitation() {
    throw new DeepgramVersionError();
  }
  /**
   * @deprecated
   * @see https://dpgr.am/js-v3
   */
  get usage() {
    throw new DeepgramVersionError();
  }
  /**
   * @deprecated
   * @see https://dpgr.am/js-v3
   */
  get billing() {
    throw new DeepgramVersionError();
  }
};

// ../../node_modules/@deepgram/sdk/dist/module/index.js
function createClient(keyOrOptions, options) {
  let resolvedOptions = {};
  if (typeof keyOrOptions === "string" || typeof keyOrOptions === "function") {
    if (typeof options === "object") {
      resolvedOptions = options;
    }
    resolvedOptions.key = keyOrOptions;
  } else if (typeof keyOrOptions === "object") {
    resolvedOptions = keyOrOptions;
  }
  return new DeepgramClient(resolvedOptions);
}

// src/services/transcription.ts
var __filename = fileURLToPath(import.meta.url);
var __dirname2 = path.dirname(__filename);
var execAsync = promisify(exec);
var TranscriptionService = class extends Service2 {
  runtime = null;
  static serviceType = ServiceType2.TRANSCRIPTION;
  CONTENT_CACHE_DIR;
  DEBUG_AUDIO_DIR;
  TARGET_SAMPLE_RATE = 16e3;
  // Common sample rate for speech recognition
  isCudaAvailable = false;
  /**
   * CHANGED: We now use TranscriptionProvider instead of separate flags/strings.
   * This allows us to handle character settings, env variables, and fallback logic.
   */
  transcriptionProvider = null;
  deepgram = null;
  openai = null;
  /**
   * We keep the queue and processing logic as is.
   */
  queue = [];
  processing = false;
  /**
   * CHANGED: initialize() now checks:
   * 1) character.settings.transcription (if available and keys exist),
   * 2) then the .env TRANSCRIPTION_PROVIDER,
   * 3) then old fallback logic (Deepgram -> OpenAI -> local).
   */
  async initialize(_runtime) {
    this.runtime = _runtime;
    let chosenProvider = null;
    const charSetting = this.runtime.character?.settings?.transcription;
    if (charSetting === TranscriptionProvider.Deepgram) {
      const deepgramKey = this.runtime.getSetting("DEEPGRAM_API_KEY");
      if (deepgramKey) {
        this.deepgram = createClient(deepgramKey);
        chosenProvider = TranscriptionProvider.Deepgram;
      }
    } else if (charSetting === TranscriptionProvider.OpenAI) {
      const openaiKey = this.runtime.getSetting("OPENAI_API_KEY");
      if (openaiKey) {
        this.openai = new openai_default({ apiKey: openaiKey });
        chosenProvider = TranscriptionProvider.OpenAI;
      }
    } else if (charSetting === TranscriptionProvider.Local) {
      chosenProvider = TranscriptionProvider.Local;
    }
    if (!chosenProvider) {
      const envProvider = this.runtime.getSetting(
        "TRANSCRIPTION_PROVIDER"
      );
      if (envProvider) {
        switch (envProvider.toLowerCase()) {
          case "deepgram":
            {
              const dgKey = this.runtime.getSetting("DEEPGRAM_API_KEY");
              if (dgKey) {
                this.deepgram = createClient(dgKey);
                chosenProvider = TranscriptionProvider.Deepgram;
              }
            }
            break;
          case "openai":
            {
              const openaiKey = this.runtime.getSetting("OPENAI_API_KEY");
              if (openaiKey) {
                this.openai = new openai_default({ apiKey: openaiKey });
                chosenProvider = TranscriptionProvider.OpenAI;
              }
            }
            break;
          case "local":
            chosenProvider = TranscriptionProvider.Local;
            break;
        }
      }
    }
    if (!chosenProvider) {
      const deepgramKey = this.runtime.getSetting("DEEPGRAM_API_KEY");
      if (deepgramKey) {
        this.deepgram = createClient(deepgramKey);
        chosenProvider = TranscriptionProvider.Deepgram;
      } else {
        const openaiKey = this.runtime.getSetting("OPENAI_API_KEY");
        if (openaiKey) {
          this.openai = new openai_default({ apiKey: openaiKey });
          chosenProvider = TranscriptionProvider.OpenAI;
        } else {
          chosenProvider = TranscriptionProvider.Local;
        }
      }
    }
    this.transcriptionProvider = chosenProvider;
    this.detectCuda();
  }
  constructor() {
    super();
    const rootDir = path.resolve(__dirname2, "../../");
    this.CONTENT_CACHE_DIR = path.join(rootDir, "content_cache");
    this.DEBUG_AUDIO_DIR = path.join(rootDir, "debug_audio");
    this.ensureCacheDirectoryExists();
    this.ensureDebugDirectoryExists();
  }
  ensureCacheDirectoryExists() {
    if (!fs.existsSync(this.CONTENT_CACHE_DIR)) {
      fs.mkdirSync(this.CONTENT_CACHE_DIR, { recursive: true });
    }
  }
  ensureDebugDirectoryExists() {
    if (!fs.existsSync(this.DEBUG_AUDIO_DIR)) {
      fs.mkdirSync(this.DEBUG_AUDIO_DIR, { recursive: true });
    }
  }
  detectCuda() {
    const platform = os.platform();
    if (platform === "linux") {
      try {
        fs.accessSync("/usr/local/cuda/bin/nvcc", fs.constants.X_OK);
        this.isCudaAvailable = true;
        elizaLogger2.log(
          "CUDA detected. Transcription will use CUDA acceleration."
        );
      } catch (_error) {
        elizaLogger2.log(
          "CUDA not detected. Transcription will run on CPU."
        );
      }
    } else if (platform === "win32") {
      const cudaPath = path.join(
        settings.CUDA_PATH || "C:\\Program Files\\NVIDIA GPU Computing Toolkit\\CUDA\\v11.0",
        "bin",
        "nvcc.exe"
      );
      if (fs.existsSync(cudaPath)) {
        this.isCudaAvailable = true;
        elizaLogger2.log(
          "CUDA detected. Transcription will use CUDA acceleration."
        );
      } else {
        elizaLogger2.log(
          "CUDA not detected. Transcription will run on CPU."
        );
      }
    } else {
      elizaLogger2.log(
        "CUDA not supported on this platform. Transcription will run on CPU."
      );
    }
  }
  async convertAudio(inputBuffer) {
    const inputPath = path.join(
      this.CONTENT_CACHE_DIR,
      `input_${Date.now()}.wav`
    );
    const outputPath = path.join(
      this.CONTENT_CACHE_DIR,
      `output_${Date.now()}.wav`
    );
    fs.writeFileSync(inputPath, Buffer.from(inputBuffer));
    try {
      const { stdout } = await execAsync(
        `ffprobe -v error -show_entries stream=codec_name,sample_rate,channels -of json "${inputPath}"`
      );
      const probeResult = JSON.parse(stdout);
      const stream = probeResult.streams[0];
      elizaLogger2.log("Input audio info:", stream);
      let ffmpegCommand = `ffmpeg -i "${inputPath}" -ar ${this.TARGET_SAMPLE_RATE} -ac 1`;
      if (stream.codec_name === "pcm_f32le") {
        ffmpegCommand += " -acodec pcm_s16le";
      }
      ffmpegCommand += ` "${outputPath}"`;
      elizaLogger2.log("FFmpeg command:", ffmpegCommand);
      await execAsync(ffmpegCommand);
      const convertedBuffer = fs.readFileSync(outputPath);
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
      return convertedBuffer;
    } catch (error) {
      elizaLogger2.error("Error converting audio:", error);
      throw error;
    }
  }
  async saveDebugAudio(audioBuffer, prefix) {
    this.ensureDebugDirectoryExists();
    const filename = `${prefix}_${Date.now()}.wav`;
    const filePath = path.join(this.DEBUG_AUDIO_DIR, filename);
    fs.writeFileSync(filePath, Buffer.from(audioBuffer));
    elizaLogger2.log(`Debug audio saved: ${filePath}`);
  }
  async transcribeAttachment(audioBuffer) {
    return await this.transcribe(audioBuffer);
  }
  /**
   * If the audio buffer is too short, return null. Otherwise push to queue.
   */
  async transcribe(audioBuffer) {
    if (audioBuffer.byteLength < 0.2 * 16e3) {
      return null;
    }
    return new Promise((resolve) => {
      this.queue.push({ audioBuffer, resolve });
      if (!this.processing) {
        this.processQueue();
      }
    });
  }
  async transcribeAttachmentLocally(audioBuffer) {
    return this.transcribeLocally(audioBuffer);
  }
  /**
   * CHANGED: processQueue() uses the final transcriptionProvider enum set in initialize().
   */
  async processQueue() {
    if (this.processing || this.queue.length === 0) return;
    this.processing = true;
    while (this.queue.length > 0) {
      const { audioBuffer, resolve } = this.queue.shift();
      let result = null;
      switch (this.transcriptionProvider) {
        case TranscriptionProvider.Deepgram:
          result = await this.transcribeWithDeepgram(audioBuffer);
          break;
        case TranscriptionProvider.OpenAI:
          result = await this.transcribeWithOpenAI(audioBuffer);
          break;
        default:
          result = await this.transcribeLocally(audioBuffer);
      }
      resolve(result);
    }
    this.processing = false;
  }
  /**
   * Original logic from main is now handled by the final fallback in initialize().
   * We'll keep transcribeUsingDefaultLogic() if needed by other code references,
   * but it's no longer invoked in the new flow.
   */
  async transcribeUsingDefaultLogic(audioBuffer) {
    if (this.deepgram) {
      return await this.transcribeWithDeepgram(audioBuffer);
    } else if (this.openai) {
      return await this.transcribeWithOpenAI(audioBuffer);
    }
    return await this.transcribeLocally(audioBuffer);
  }
  async transcribeWithDeepgram(audioBuffer) {
    const buffer = Buffer.from(audioBuffer);
    const response = await this.deepgram.listen.prerecorded.transcribeFile(
      buffer,
      {
        model: "nova-2",
        language: "en-US",
        smart_format: true
      }
    );
    const result = response.result.results.channels[0].alternatives[0].transcript;
    return result;
  }
  async transcribeWithOpenAI(audioBuffer) {
    elizaLogger2.log("Transcribing audio with OpenAI...");
    try {
      await this.saveDebugAudio(audioBuffer, "openai_input_original");
      const arrayBuffer = new Uint8Array(audioBuffer).buffer;
      const convertedBuffer = Buffer.from(await this.convertAudio(arrayBuffer)).buffer;
      await this.saveDebugAudio(
        convertedBuffer,
        "openai_input_converted"
      );
      const file = new File([convertedBuffer], "audio.wav", {
        type: "audio/wav"
      });
      const result = await this.openai.audio.transcriptions.create({
        model: "whisper-1",
        language: "en",
        response_format: "text",
        file
      });
      const trimmedResult = result.trim();
      elizaLogger2.log(`OpenAI speech to text result: "${trimmedResult}"`);
      return trimmedResult;
    } catch (error) {
      elizaLogger2.error(
        "Error in OpenAI speech-to-text conversion:",
        error
      );
      if (error.response) {
        elizaLogger2.error("Response data:", error.response.data);
        elizaLogger2.error("Response status:", error.response.status);
        elizaLogger2.error("Response headers:", error.response.headers);
      } else if (error.request) {
        elizaLogger2.error("No response received:", error.request);
      } else {
        elizaLogger2.error("Error setting up request:", error.message);
      }
      return null;
    }
  }
  /**
   * Local transcription with nodejs-whisper. We keep it as it was,
   * just making sure to handle CUDA if available.
   */
  async transcribeLocally(audioBuffer) {
    try {
      elizaLogger2.log("Transcribing audio locally...");
      await this.saveDebugAudio(audioBuffer, "local_input_original");
      const arrayBuffer = new Uint8Array(audioBuffer).buffer;
      const convertedBuffer = Buffer.from(await this.convertAudio(arrayBuffer)).buffer;
      await this.saveDebugAudio(convertedBuffer, "local_input_converted");
      const tempWavFile = path.join(
        this.CONTENT_CACHE_DIR,
        `temp_${Date.now()}.wav`
      );
      const uint8Array = new Uint8Array(convertedBuffer);
      fs.writeFileSync(tempWavFile, uint8Array);
      elizaLogger2.debug(`Temporary WAV file created: ${tempWavFile}`);
      let output = await (0, import_nodejs_whisper.nodewhisper)(tempWavFile, {
        modelName: "base.en",
        autoDownloadModelName: "base.en",
        removeWavFileAfterTranscription: false,
        withCuda: this.isCudaAvailable,
        whisperOptions: {
          outputInText: true,
          outputInVtt: false,
          outputInSrt: false,
          outputInCsv: false,
          translateToEnglish: false,
          wordTimestamps: false,
          timestamps_length: 60
          // splitOnWord: true,
        }
      });
      output = output.split("\n").map((line) => {
        if (line.trim().startsWith("[")) {
          const endIndex = line.indexOf("]");
          return line.substring(endIndex + 1);
        }
        return line;
      }).join("\n");
      fs.unlinkSync(tempWavFile);
      if (!output || output.length < 5) {
        elizaLogger2.log("Output is null or too short, returning null");
        return null;
      }
      return output;
    } catch (error) {
      elizaLogger2.error(
        "Error in local speech-to-text conversion:",
        error
      );
      return null;
    }
  }
};

// src/actions/describe-image.ts
import {
  composeContext,
  generateObject,
  ModelClass,
  elizaLogger as elizaLogger3,
  ServiceType as ServiceType3
} from "@elizaos/core";

// src/templates.ts
var getFileLocationTemplate = `
{{recentMessages}}

extract the file location from the users message or the attachment in the message history that they are referring to.
your job is to infer the correct attachment based on the recent messages, the users most recent message, and the attachments in the message
image attachments are the result of the users uploads, or images you have created.
only respond with the file location, no other text.
typically the file location is in the form of a URL or a file path.

\`\`\`json
{
    "fileLocation": "file location text goes here"
}
\`\`\`
`;

// src/types.ts
import { z as z2 } from "zod";
var FileLocationResultSchema = z2.object({
  fileLocation: z2.string().min(1)
});
function isFileLocationResult(obj) {
  return FileLocationResultSchema.safeParse(obj).success;
}

// src/actions/describe-image.ts
var describeImage = {
  name: "DESCRIBE_IMAGE",
  similes: ["DESCRIBE_PICTURE", "EXPLAIN_PICTURE", "EXPLAIN_IMAGE"],
  validate: async (_runtime, _message) => {
    return true;
  },
  description: "Describe an image",
  handler: async (runtime, message, state, _options, callback) => {
    const getFileLocationContext = composeContext({
      state,
      template: getFileLocationTemplate
    });
    const fileLocationResultObject = await generateObject({
      runtime,
      context: getFileLocationContext,
      modelClass: ModelClass.SMALL,
      schema: FileLocationResultSchema,
      stop: ["\n"]
    });
    if (!isFileLocationResult(fileLocationResultObject?.object)) {
      elizaLogger3.error("Failed to generate file location");
      return false;
    }
    const { fileLocation } = fileLocationResultObject.object;
    const { description } = await runtime.getService(ServiceType3.IMAGE_DESCRIPTION).describeImage(fileLocation);
    runtime.messageManager.createMemory({
      userId: message.agentId,
      agentId: message.agentId,
      roomId: message.roomId,
      content: {
        text: description
      }
    });
    callback({
      text: description
    });
    return true;
  },
  examples: [
    [
      {
        user: "{{user1}}",
        content: {
          text: "Can you describe this image for me?"
        }
      },
      {
        user: "{{user2}}",
        content: {
          text: "Let me analyze this image for you...",
          action: "DESCRIBE_IMAGE"
        }
      },
      {
        user: "{{user2}}",
        content: {
          text: "I see an orange tabby cat sitting on a windowsill. The cat appears to be relaxed and looking out the window at birds flying by. The lighting suggests it's a sunny afternoon."
        }
      }
    ],
    [
      {
        user: "{{user1}}",
        content: {
          text: "What's in this picture?"
        }
      },
      {
        user: "{{user2}}",
        content: {
          text: "I'll take a look at that image...",
          action: "DESCRIBE_IMAGE"
        }
      },
      {
        user: "{{user2}}",
        content: {
          text: "The image shows a modern kitchen with stainless steel appliances. There's a large island counter in the center with marble countertops. The cabinets are white with sleek handles, and there's pendant lighting hanging above the island."
        }
      }
    ],
    [
      {
        user: "{{user1}}",
        content: {
          text: "Could you tell me what this image depicts?"
        }
      },
      {
        user: "{{user2}}",
        content: {
          text: "I'll describe this image for you...",
          action: "DESCRIBE_IMAGE"
        }
      },
      {
        user: "{{user2}}",
        content: {
          text: "This is a scenic mountain landscape at sunset. The peaks are snow-capped and reflected in a calm lake below. The sky is painted in vibrant oranges and purples, with a few wispy clouds catching the last rays of sunlight."
        }
      }
    ]
  ]
};

// src/index.ts
function createNodePlugin() {
  return {
    name: "default",
    description: "Default plugin, with basic actions and evaluators",
    services: [
      new SpeechService(),
      new TranscriptionService()
    ],
    actions: [describeImage]
  };
}
export {
  SpeechService,
  TranscriptionService,
  createNodePlugin
};
//# sourceMappingURL=index.js.map