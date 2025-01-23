import {
  require_node_ponyfill
} from "./chunk-WNHUUMDV.js";
import {
  __commonJS,
  __require,
  __toESM
} from "./chunk-PLDDJCW6.js";

// ../../node_modules/capsolver-npm/node_modules/axios/lib/helpers/bind.js
var require_bind = __commonJS({
  "../../node_modules/capsolver-npm/node_modules/axios/lib/helpers/bind.js"(exports, module) {
    "use strict";
    module.exports = function bind(fn, thisArg) {
      return function wrap() {
        var args = new Array(arguments.length);
        for (var i2 = 0; i2 < args.length; i2++) {
          args[i2] = arguments[i2];
        }
        return fn.apply(thisArg, args);
      };
    };
  }
});

// ../../node_modules/capsolver-npm/node_modules/axios/lib/utils.js
var require_utils = __commonJS({
  "../../node_modules/capsolver-npm/node_modules/axios/lib/utils.js"(exports, module) {
    "use strict";
    var bind = require_bind();
    var toString = Object.prototype.toString;
    var kindOf = /* @__PURE__ */ function(cache) {
      return function(thing) {
        var str = toString.call(thing);
        return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
      };
    }(/* @__PURE__ */ Object.create(null));
    function kindOfTest(type) {
      type = type.toLowerCase();
      return function isKindOf(thing) {
        return kindOf(thing) === type;
      };
    }
    function isArray(val) {
      return Array.isArray(val);
    }
    function isUndefined(val) {
      return typeof val === "undefined";
    }
    function isBuffer(val) {
      return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
    }
    var isArrayBuffer = kindOfTest("ArrayBuffer");
    function isArrayBufferView(val) {
      var result;
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        result = ArrayBuffer.isView(val);
      } else {
        result = val && val.buffer && isArrayBuffer(val.buffer);
      }
      return result;
    }
    function isString(val) {
      return typeof val === "string";
    }
    function isNumber(val) {
      return typeof val === "number";
    }
    function isObject(val) {
      return val !== null && typeof val === "object";
    }
    function isPlainObject(val) {
      if (kindOf(val) !== "object") {
        return false;
      }
      var prototype = Object.getPrototypeOf(val);
      return prototype === null || prototype === Object.prototype;
    }
    var isDate = kindOfTest("Date");
    var isFile2 = kindOfTest("File");
    var isBlob2 = kindOfTest("Blob");
    var isFileList = kindOfTest("FileList");
    function isFunction2(val) {
      return toString.call(val) === "[object Function]";
    }
    function isStream(val) {
      return isObject(val) && isFunction2(val.pipe);
    }
    function isFormData(thing) {
      var pattern = "[object FormData]";
      return thing && (typeof FormData === "function" && thing instanceof FormData || toString.call(thing) === pattern || isFunction2(thing.toString) && thing.toString() === pattern);
    }
    var isURLSearchParams = kindOfTest("URLSearchParams");
    function trim(str) {
      return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
    }
    function isStandardBrowserEnv() {
      if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
        return false;
      }
      return typeof window !== "undefined" && typeof document !== "undefined";
    }
    function forEach(obj, fn) {
      if (obj === null || typeof obj === "undefined") {
        return;
      }
      if (typeof obj !== "object") {
        obj = [obj];
      }
      if (isArray(obj)) {
        for (var i2 = 0, l2 = obj.length; i2 < l2; i2++) {
          fn.call(null, obj[i2], i2, obj);
        }
      } else {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            fn.call(null, obj[key], key, obj);
          }
        }
      }
    }
    function merge3() {
      var result = {};
      function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
          result[key] = merge3(result[key], val);
        } else if (isPlainObject(val)) {
          result[key] = merge3({}, val);
        } else if (isArray(val)) {
          result[key] = val.slice();
        } else {
          result[key] = val;
        }
      }
      for (var i2 = 0, l2 = arguments.length; i2 < l2; i2++) {
        forEach(arguments[i2], assignValue);
      }
      return result;
    }
    function extend(a2, b2, thisArg) {
      forEach(b2, function assignValue(val, key) {
        if (thisArg && typeof val === "function") {
          a2[key] = bind(val, thisArg);
        } else {
          a2[key] = val;
        }
      });
      return a2;
    }
    function stripBOM(content) {
      if (content.charCodeAt(0) === 65279) {
        content = content.slice(1);
      }
      return content;
    }
    function inherits(constructor, superConstructor, props, descriptors) {
      constructor.prototype = Object.create(superConstructor.prototype, descriptors);
      constructor.prototype.constructor = constructor;
      props && Object.assign(constructor.prototype, props);
    }
    function toFlatObject(sourceObj, destObj, filter) {
      var props;
      var i2;
      var prop;
      var merged = {};
      destObj = destObj || {};
      do {
        props = Object.getOwnPropertyNames(sourceObj);
        i2 = props.length;
        while (i2-- > 0) {
          prop = props[i2];
          if (!merged[prop]) {
            destObj[prop] = sourceObj[prop];
            merged[prop] = true;
          }
        }
        sourceObj = Object.getPrototypeOf(sourceObj);
      } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
      return destObj;
    }
    function endsWith(str, searchString, position) {
      str = String(str);
      if (position === void 0 || position > str.length) {
        position = str.length;
      }
      position -= searchString.length;
      var lastIndex = str.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
    }
    function toArray(thing) {
      if (!thing) return null;
      var i2 = thing.length;
      if (isUndefined(i2)) return null;
      var arr = new Array(i2);
      while (i2-- > 0) {
        arr[i2] = thing[i2];
      }
      return arr;
    }
    var isTypedArray = /* @__PURE__ */ function(TypedArray) {
      return function(thing) {
        return TypedArray && thing instanceof TypedArray;
      };
    }(typeof Uint8Array !== "undefined" && Object.getPrototypeOf(Uint8Array));
    module.exports = {
      isArray,
      isArrayBuffer,
      isBuffer,
      isFormData,
      isArrayBufferView,
      isString,
      isNumber,
      isObject,
      isPlainObject,
      isUndefined,
      isDate,
      isFile: isFile2,
      isBlob: isBlob2,
      isFunction: isFunction2,
      isStream,
      isURLSearchParams,
      isStandardBrowserEnv,
      forEach,
      merge: merge3,
      extend,
      trim,
      stripBOM,
      inherits,
      toFlatObject,
      kindOf,
      kindOfTest,
      endsWith,
      toArray,
      isTypedArray,
      isFileList
    };
  }
});

// ../../node_modules/capsolver-npm/node_modules/axios/lib/helpers/buildURL.js
var require_buildURL = __commonJS({
  "../../node_modules/capsolver-npm/node_modules/axios/lib/helpers/buildURL.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    function encode(val) {
      return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
    }
    module.exports = function buildURL(url, params, paramsSerializer) {
      if (!params) {
        return url;
      }
      var serializedParams;
      if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
      } else if (utils.isURLSearchParams(params)) {
        serializedParams = params.toString();
      } else {
        var parts = [];
        utils.forEach(params, function serialize(val, key) {
          if (val === null || typeof val === "undefined") {
            return;
          }
          if (utils.isArray(val)) {
            key = key + "[]";
          } else {
            val = [val];
          }
          utils.forEach(val, function parseValue(v2) {
            if (utils.isDate(v2)) {
              v2 = v2.toISOString();
            } else if (utils.isObject(v2)) {
              v2 = JSON.stringify(v2);
            }
            parts.push(encode(key) + "=" + encode(v2));
          });
        });
        serializedParams = parts.join("&");
      }
      if (serializedParams) {
        var hashmarkIndex = url.indexOf("#");
        if (hashmarkIndex !== -1) {
          url = url.slice(0, hashmarkIndex);
        }
        url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
      }
      return url;
    };
  }
});

// ../../node_modules/capsolver-npm/node_modules/axios/lib/core/InterceptorManager.js
var require_InterceptorManager = __commonJS({
  "../../node_modules/capsolver-npm/node_modules/axios/lib/core/InterceptorManager.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    function InterceptorManager() {
      this.handlers = [];
    }
    InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
      this.handlers.push({
        fulfilled,
        rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null
      });
      return this.handlers.length - 1;
    };
    InterceptorManager.prototype.eject = function eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    };
    InterceptorManager.prototype.forEach = function forEach(fn) {
      utils.forEach(this.handlers, function forEachHandler(h2) {
        if (h2 !== null) {
          fn(h2);
        }
      });
    };
    module.exports = InterceptorManager;
  }
});

// ../../node_modules/capsolver-npm/node_modules/axios/lib/helpers/normalizeHeaderName.js
var require_normalizeHeaderName = __commonJS({
  "../../node_modules/capsolver-npm/node_modules/axios/lib/helpers/normalizeHeaderName.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    module.exports = function normalizeHeaderName(headers, normalizedName) {
      utils.forEach(headers, function processHeader(value, name) {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
          headers[normalizedName] = value;
          delete headers[name];
        }
      });
    };
  }
});

// ../../node_modules/capsolver-npm/node_modules/axios/lib/core/AxiosError.js
var require_AxiosError = __commonJS({
  "../../node_modules/capsolver-npm/node_modules/axios/lib/core/AxiosError.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    function AxiosError(message, code, config2, request, response) {
      Error.call(this);
      this.message = message;
      this.name = "AxiosError";
      code && (this.code = code);
      config2 && (this.config = config2);
      request && (this.request = request);
      response && (this.response = response);
    }
    utils.inherits(AxiosError, Error, {
      toJSON: function toJSON() {
        return {
          // Standard
          message: this.message,
          name: this.name,
          // Microsoft
          description: this.description,
          number: this.number,
          // Mozilla
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          // Axios
          config: this.config,
          code: this.code,
          status: this.response && this.response.status ? this.response.status : null
        };
      }
    });
    var prototype = AxiosError.prototype;
    var descriptors = {};
    [
      "ERR_BAD_OPTION_VALUE",
      "ERR_BAD_OPTION",
      "ECONNABORTED",
      "ETIMEDOUT",
      "ERR_NETWORK",
      "ERR_FR_TOO_MANY_REDIRECTS",
      "ERR_DEPRECATED",
      "ERR_BAD_RESPONSE",
      "ERR_BAD_REQUEST",
      "ERR_CANCELED"
      // eslint-disable-next-line func-names
    ].forEach(function(code) {
      descriptors[code] = { value: code };
    });
    Object.defineProperties(AxiosError, descriptors);
    Object.defineProperty(prototype, "isAxiosError", { value: true });
    AxiosError.from = function(error, code, config2, request, response, customProps) {
      var axiosError = Object.create(prototype);
      utils.toFlatObject(error, axiosError, function filter(obj) {
        return obj !== Error.prototype;
      });
      AxiosError.call(axiosError, error.message, code, config2, request, response);
      axiosError.name = error.name;
      customProps && Object.assign(axiosError, customProps);
      return axiosError;
    };
    module.exports = AxiosError;
  }
});

// ../../node_modules/capsolver-npm/node_modules/axios/lib/defaults/transitional.js
var require_transitional = __commonJS({
  "../../node_modules/capsolver-npm/node_modules/axios/lib/defaults/transitional.js"(exports, module) {
    "use strict";
    module.exports = {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false
    };
  }
});

// ../../node_modules/capsolver-npm/node_modules/axios/lib/helpers/toFormData.js
var require_toFormData = __commonJS({
  "../../node_modules/capsolver-npm/node_modules/axios/lib/helpers/toFormData.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    function toFormData(obj, formData) {
      formData = formData || new FormData();
      var stack = [];
      function convertValue(value) {
        if (value === null) return "";
        if (utils.isDate(value)) {
          return value.toISOString();
        }
        if (utils.isArrayBuffer(value) || utils.isTypedArray(value)) {
          return typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
        }
        return value;
      }
      function build(data, parentKey) {
        if (utils.isPlainObject(data) || utils.isArray(data)) {
          if (stack.indexOf(data) !== -1) {
            throw Error("Circular reference detected in " + parentKey);
          }
          stack.push(data);
          utils.forEach(data, function each(value, key) {
            if (utils.isUndefined(value)) return;
            var fullKey = parentKey ? parentKey + "." + key : key;
            var arr;
            if (value && !parentKey && typeof value === "object") {
              if (utils.endsWith(key, "{}")) {
                value = JSON.stringify(value);
              } else if (utils.endsWith(key, "[]") && (arr = utils.toArray(value))) {
                arr.forEach(function(el) {
                  !utils.isUndefined(el) && formData.append(fullKey, convertValue(el));
                });
                return;
              }
            }
            build(value, fullKey);
          });
          stack.pop();
        } else {
          formData.append(parentKey, convertValue(data));
        }
      }
      build(obj);
      return formData;
    }
    module.exports = toFormData;
  }
});

// ../../node_modules/capsolver-npm/node_modules/axios/lib/core/settle.js
var require_settle = __commonJS({
  "../../node_modules/capsolver-npm/node_modules/axios/lib/core/settle.js"(exports, module) {
    "use strict";
    var AxiosError = require_AxiosError();
    module.exports = function settle(resolve, reject, response) {
      var validateStatus = response.config.validateStatus;
      if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(new AxiosError(
          "Request failed with status code " + response.status,
          [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
          response.config,
          response.request,
          response
        ));
      }
    };
  }
});

// ../../node_modules/capsolver-npm/node_modules/axios/lib/helpers/cookies.js
var require_cookies = __commonJS({
  "../../node_modules/capsolver-npm/node_modules/axios/lib/helpers/cookies.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    module.exports = utils.isStandardBrowserEnv() ? (
      // Standard browser envs support document.cookie
      /* @__PURE__ */ function standardBrowserEnv() {
        return {
          write: function write(name, value, expires, path2, domain, secure) {
            var cookie = [];
            cookie.push(name + "=" + encodeURIComponent(value));
            if (utils.isNumber(expires)) {
              cookie.push("expires=" + new Date(expires).toGMTString());
            }
            if (utils.isString(path2)) {
              cookie.push("path=" + path2);
            }
            if (utils.isString(domain)) {
              cookie.push("domain=" + domain);
            }
            if (secure === true) {
              cookie.push("secure");
            }
            document.cookie = cookie.join("; ");
          },
          read: function read(name) {
            var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
            return match ? decodeURIComponent(match[3]) : null;
          },
          remove: function remove(name) {
            this.write(name, "", Date.now() - 864e5);
          }
        };
      }()
    ) : (
      // Non standard browser env (web workers, react-native) lack needed support.
      /* @__PURE__ */ function nonStandardBrowserEnv() {
        return {
          write: function write() {
          },
          read: function read() {
            return null;
          },
          remove: function remove() {
          }
        };
      }()
    );
  }
});

// ../../node_modules/capsolver-npm/node_modules/axios/lib/helpers/isAbsoluteURL.js
var require_isAbsoluteURL = __commonJS({
  "../../node_modules/capsolver-npm/node_modules/axios/lib/helpers/isAbsoluteURL.js"(exports, module) {
    "use strict";
    module.exports = function isAbsoluteURL(url) {
      return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
    };
  }
});

// ../../node_modules/capsolver-npm/node_modules/axios/lib/helpers/combineURLs.js
var require_combineURLs = __commonJS({
  "../../node_modules/capsolver-npm/node_modules/axios/lib/helpers/combineURLs.js"(exports, module) {
    "use strict";
    module.exports = function combineURLs(baseURL, relativeURL) {
      return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
    };
  }
});

// ../../node_modules/capsolver-npm/node_modules/axios/lib/core/buildFullPath.js
var require_buildFullPath = __commonJS({
  "../../node_modules/capsolver-npm/node_modules/axios/lib/core/buildFullPath.js"(exports, module) {
    "use strict";
    var isAbsoluteURL = require_isAbsoluteURL();
    var combineURLs = require_combineURLs();
    module.exports = function buildFullPath(baseURL, requestedURL) {
      if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
      }
      return requestedURL;
    };
  }
});

// ../../node_modules/capsolver-npm/node_modules/axios/lib/helpers/parseHeaders.js
var require_parseHeaders = __commonJS({
  "../../node_modules/capsolver-npm/node_modules/axios/lib/helpers/parseHeaders.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var ignoreDuplicateOf = [
      "age",
      "authorization",
      "content-length",
      "content-type",
      "etag",
      "expires",
      "from",
      "host",
      "if-modified-since",
      "if-unmodified-since",
      "last-modified",
      "location",
      "max-forwards",
      "proxy-authorization",
      "referer",
      "retry-after",
      "user-agent"
    ];
    module.exports = function parseHeaders(headers) {
      var parsed = {};
      var key;
      var val;
      var i2;
      if (!headers) {
        return parsed;
      }
      utils.forEach(headers.split("\n"), function parser(line) {
        i2 = line.indexOf(":");
        key = utils.trim(line.substr(0, i2)).toLowerCase();
        val = utils.trim(line.substr(i2 + 1));
        if (key) {
          if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
            return;
          }
          if (key === "set-cookie") {
            parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
          } else {
            parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
          }
        }
      });
      return parsed;
    };
  }
});

// ../../node_modules/capsolver-npm/node_modules/axios/lib/helpers/isURLSameOrigin.js
var require_isURLSameOrigin = __commonJS({
  "../../node_modules/capsolver-npm/node_modules/axios/lib/helpers/isURLSameOrigin.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    module.exports = utils.isStandardBrowserEnv() ? (
      // Standard browser envs have full support of the APIs needed to test
      // whether the request URL is of the same origin as current location.
      function standardBrowserEnv() {
        var msie = /(msie|trident)/i.test(navigator.userAgent);
        var urlParsingNode = document.createElement("a");
        var originURL;
        function resolveURL(url) {
          var href = url;
          if (msie) {
            urlParsingNode.setAttribute("href", href);
            href = urlParsingNode.href;
          }
          urlParsingNode.setAttribute("href", href);
          return {
            href: urlParsingNode.href,
            protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
            host: urlParsingNode.host,
            search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
            hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
            hostname: urlParsingNode.hostname,
            port: urlParsingNode.port,
            pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
          };
        }
        originURL = resolveURL(window.location.href);
        return function isURLSameOrigin(requestURL) {
          var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
          return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
        };
      }()
    ) : (
      // Non standard browser envs (web workers, react-native) lack needed support.
      /* @__PURE__ */ function nonStandardBrowserEnv() {
        return function isURLSameOrigin() {
          return true;
        };
      }()
    );
  }
});

// ../../node_modules/capsolver-npm/node_modules/axios/lib/cancel/CanceledError.js
var require_CanceledError = __commonJS({
  "../../node_modules/capsolver-npm/node_modules/axios/lib/cancel/CanceledError.js"(exports, module) {
    "use strict";
    var AxiosError = require_AxiosError();
    var utils = require_utils();
    function CanceledError(message) {
      AxiosError.call(this, message == null ? "canceled" : message, AxiosError.ERR_CANCELED);
      this.name = "CanceledError";
    }
    utils.inherits(CanceledError, AxiosError, {
      __CANCEL__: true
    });
    module.exports = CanceledError;
  }
});

// ../../node_modules/capsolver-npm/node_modules/axios/lib/helpers/parseProtocol.js
var require_parseProtocol = __commonJS({
  "../../node_modules/capsolver-npm/node_modules/axios/lib/helpers/parseProtocol.js"(exports, module) {
    "use strict";
    module.exports = function parseProtocol(url) {
      var match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
      return match && match[1] || "";
    };
  }
});

// ../../node_modules/capsolver-npm/node_modules/axios/lib/adapters/xhr.js
var require_xhr = __commonJS({
  "../../node_modules/capsolver-npm/node_modules/axios/lib/adapters/xhr.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var settle = require_settle();
    var cookies = require_cookies();
    var buildURL = require_buildURL();
    var buildFullPath = require_buildFullPath();
    var parseHeaders = require_parseHeaders();
    var isURLSameOrigin = require_isURLSameOrigin();
    var transitionalDefaults = require_transitional();
    var AxiosError = require_AxiosError();
    var CanceledError = require_CanceledError();
    var parseProtocol = require_parseProtocol();
    module.exports = function xhrAdapter(config2) {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        var requestData = config2.data;
        var requestHeaders = config2.headers;
        var responseType = config2.responseType;
        var onCanceled;
        function done() {
          if (config2.cancelToken) {
            config2.cancelToken.unsubscribe(onCanceled);
          }
          if (config2.signal) {
            config2.signal.removeEventListener("abort", onCanceled);
          }
        }
        if (utils.isFormData(requestData) && utils.isStandardBrowserEnv()) {
          delete requestHeaders["Content-Type"];
        }
        var request = new XMLHttpRequest();
        if (config2.auth) {
          var username = config2.auth.username || "";
          var password = config2.auth.password ? unescape(encodeURIComponent(config2.auth.password)) : "";
          requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
        }
        var fullPath = buildFullPath(config2.baseURL, config2.url);
        request.open(config2.method.toUpperCase(), buildURL(fullPath, config2.params, config2.paramsSerializer), true);
        request.timeout = config2.timeout;
        function onloadend() {
          if (!request) {
            return;
          }
          var responseHeaders = "getAllResponseHeaders" in request ? parseHeaders(request.getAllResponseHeaders()) : null;
          var responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
          var response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config: config2,
            request
          };
          settle(function _resolve(value) {
            resolve(value);
            done();
          }, function _reject(err) {
            reject(err);
            done();
          }, response);
          request = null;
        }
        if ("onloadend" in request) {
          request.onloadend = onloadend;
        } else {
          request.onreadystatechange = function handleLoad() {
            if (!request || request.readyState !== 4) {
              return;
            }
            if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
              return;
            }
            setTimeout(onloadend);
          };
        }
        request.onabort = function handleAbort() {
          if (!request) {
            return;
          }
          reject(new AxiosError("Request aborted", AxiosError.ECONNABORTED, config2, request));
          request = null;
        };
        request.onerror = function handleError() {
          reject(new AxiosError("Network Error", AxiosError.ERR_NETWORK, config2, request, request));
          request = null;
        };
        request.ontimeout = function handleTimeout() {
          var timeoutErrorMessage = config2.timeout ? "timeout of " + config2.timeout + "ms exceeded" : "timeout exceeded";
          var transitional = config2.transitional || transitionalDefaults;
          if (config2.timeoutErrorMessage) {
            timeoutErrorMessage = config2.timeoutErrorMessage;
          }
          reject(new AxiosError(
            timeoutErrorMessage,
            transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
            config2,
            request
          ));
          request = null;
        };
        if (utils.isStandardBrowserEnv()) {
          var xsrfValue = (config2.withCredentials || isURLSameOrigin(fullPath)) && config2.xsrfCookieName ? cookies.read(config2.xsrfCookieName) : void 0;
          if (xsrfValue) {
            requestHeaders[config2.xsrfHeaderName] = xsrfValue;
          }
        }
        if ("setRequestHeader" in request) {
          utils.forEach(requestHeaders, function setRequestHeader(val, key) {
            if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
              delete requestHeaders[key];
            } else {
              request.setRequestHeader(key, val);
            }
          });
        }
        if (!utils.isUndefined(config2.withCredentials)) {
          request.withCredentials = !!config2.withCredentials;
        }
        if (responseType && responseType !== "json") {
          request.responseType = config2.responseType;
        }
        if (typeof config2.onDownloadProgress === "function") {
          request.addEventListener("progress", config2.onDownloadProgress);
        }
        if (typeof config2.onUploadProgress === "function" && request.upload) {
          request.upload.addEventListener("progress", config2.onUploadProgress);
        }
        if (config2.cancelToken || config2.signal) {
          onCanceled = function(cancel) {
            if (!request) {
              return;
            }
            reject(!cancel || cancel && cancel.type ? new CanceledError() : cancel);
            request.abort();
            request = null;
          };
          config2.cancelToken && config2.cancelToken.subscribe(onCanceled);
          if (config2.signal) {
            config2.signal.aborted ? onCanceled() : config2.signal.addEventListener("abort", onCanceled);
          }
        }
        if (!requestData) {
          requestData = null;
        }
        var protocol = parseProtocol(fullPath);
        if (protocol && ["http", "https", "file"].indexOf(protocol) === -1) {
          reject(new AxiosError("Unsupported protocol " + protocol + ":", AxiosError.ERR_BAD_REQUEST, config2));
          return;
        }
        request.send(requestData);
      });
    };
  }
});

// ../../node_modules/ms/index.js
var require_ms = __commonJS({
  "../../node_modules/ms/index.js"(exports, module) {
    var s2 = 1e3;
    var m2 = s2 * 60;
    var h2 = m2 * 60;
    var d2 = h2 * 24;
    var w2 = d2 * 7;
    var y2 = d2 * 365.25;
    module.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n2 = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n2 * y2;
        case "weeks":
        case "week":
        case "w":
          return n2 * w2;
        case "days":
        case "day":
        case "d":
          return n2 * d2;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n2 * h2;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n2 * m2;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n2 * s2;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n2;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d2) {
        return Math.round(ms / d2) + "d";
      }
      if (msAbs >= h2) {
        return Math.round(ms / h2) + "h";
      }
      if (msAbs >= m2) {
        return Math.round(ms / m2) + "m";
      }
      if (msAbs >= s2) {
        return Math.round(ms / s2) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d2) {
        return plural(ms, msAbs, d2, "day");
      }
      if (msAbs >= h2) {
        return plural(ms, msAbs, h2, "hour");
      }
      if (msAbs >= m2) {
        return plural(ms, msAbs, m2, "minute");
      }
      if (msAbs >= s2) {
        return plural(ms, msAbs, s2, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n2, name) {
      var isPlural = msAbs >= n2 * 1.5;
      return Math.round(ms / n2) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// ../../node_modules/debug/src/common.js
var require_common = __commonJS({
  "../../node_modules/debug/src/common.js"(exports, module) {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i2 = 0; i2 < namespace.length; i2++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i2);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
          if (!debug.enabled) {
            return;
          }
          const self = debug;
          const curr = Number(/* @__PURE__ */ new Date());
          const ms = curr - (prevTime || curr);
          self.diff = ms;
          self.prev = prevTime;
          self.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self, args);
          const logFn = self.log || createDebug.log;
          logFn.apply(self, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy;
        Object.defineProperty(debug, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v2) => {
            enableOverride = v2;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        return debug;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        const split = (typeof namespaces === "string" ? namespaces : "").trim().replace(" ", ",").split(",").filter(Boolean);
        for (const ns of split) {
          if (ns[0] === "-") {
            createDebug.skips.push(ns.slice(1));
          } else {
            createDebug.names.push(ns);
          }
        }
      }
      function matchesTemplate(search, template) {
        let searchIndex = 0;
        let templateIndex = 0;
        let starIndex = -1;
        let matchIndex = 0;
        while (searchIndex < search.length) {
          if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*")) {
            if (template[templateIndex] === "*") {
              starIndex = templateIndex;
              matchIndex = searchIndex;
              templateIndex++;
            } else {
              searchIndex++;
              templateIndex++;
            }
          } else if (starIndex !== -1) {
            templateIndex = starIndex + 1;
            matchIndex++;
            searchIndex = matchIndex;
          } else {
            return false;
          }
        }
        while (templateIndex < template.length && template[templateIndex] === "*") {
          templateIndex++;
        }
        return templateIndex === template.length;
      }
      function disable() {
        const namespaces = [
          ...createDebug.names,
          ...createDebug.skips.map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        for (const skip of createDebug.skips) {
          if (matchesTemplate(name, skip)) {
            return false;
          }
        }
        for (const ns of createDebug.names) {
          if (matchesTemplate(name, ns)) {
            return true;
          }
        }
        return false;
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module.exports = setup;
  }
});

// ../../node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "../../node_modules/debug/src/browser.js"(exports, module) {
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = /* @__PURE__ */ (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      let m2;
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && (m2 = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m2[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c2 = "color: " + this.color;
      args.splice(1, 0, c2, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c2);
    }
    exports.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r2;
      try {
        r2 = exports.storage.getItem("debug");
      } catch (error) {
      }
      if (!r2 && typeof process !== "undefined" && "env" in process) {
        r2 = process.env.DEBUG;
      }
      return r2;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module.exports = require_common()(exports);
    var { formatters } = module.exports;
    formatters.j = function(v2) {
      try {
        return JSON.stringify(v2);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// ../../node_modules/debug/node_modules/has-flag/index.js
var require_has_flag = __commonJS({
  "../../node_modules/debug/node_modules/has-flag/index.js"(exports, module) {
    "use strict";
    module.exports = (flag, argv) => {
      argv = argv || process.argv;
      const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
      const pos = argv.indexOf(prefix + flag);
      const terminatorPos = argv.indexOf("--");
      return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
    };
  }
});

// ../../node_modules/debug/node_modules/supports-color/index.js
var require_supports_color = __commonJS({
  "../../node_modules/debug/node_modules/supports-color/index.js"(exports, module) {
    "use strict";
    var os2 = __require("os");
    var hasFlag = require_has_flag();
    var env = process.env;
    var forceColor;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false")) {
      forceColor = false;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      forceColor = true;
    }
    if ("FORCE_COLOR" in env) {
      forceColor = env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0;
    }
    function translateLevel(level) {
      if (level === 0) {
        return false;
      }
      return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
      };
    }
    function supportsColor(stream) {
      if (forceColor === false) {
        return 0;
      }
      if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
        return 3;
      }
      if (hasFlag("color=256")) {
        return 2;
      }
      if (stream && !stream.isTTY && forceColor !== true) {
        return 0;
      }
      const min = forceColor ? 1 : 0;
      if (process.platform === "win32") {
        const osRelease = os2.release().split(".");
        if (Number(process.versions.node.split(".")[0]) >= 8 && Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
          return 1;
        }
        return min;
      }
      if ("TEAMCITY_VERSION" in env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
      }
      if (env.COLORTERM === "truecolor") {
        return 3;
      }
      if ("TERM_PROGRAM" in env) {
        const version2 = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env.TERM_PROGRAM) {
          case "iTerm.app":
            return version2 >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env.TERM)) {
        return 2;
      }
      if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return 1;
      }
      if ("COLORTERM" in env) {
        return 1;
      }
      if (env.TERM === "dumb") {
        return min;
      }
      return min;
    }
    function getSupportLevel(stream) {
      const level = supportsColor(stream);
      return translateLevel(level);
    }
    module.exports = {
      supportsColor: getSupportLevel,
      stdout: getSupportLevel(process.stdout),
      stderr: getSupportLevel(process.stderr)
    };
  }
});

// ../../node_modules/debug/src/node.js
var require_node = __commonJS({
  "../../node_modules/debug/src/node.js"(exports, module) {
    var tty = __require("tty");
    var util = __require("util");
    exports.init = init;
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.destroy = util.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    );
    exports.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor = require_supports_color();
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (error) {
    }
    exports.inspectOpts = Object.keys(process.env).filter((key) => {
      return /^debug_/i.test(key);
    }).reduce((obj, key) => {
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_2, k2) => {
        return k2.toUpperCase();
      });
      let val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }
    function formatArgs(args) {
      const { namespace: name, useColors: useColors2 } = this;
      if (useColors2) {
        const c2 = this.color;
        const colorCode = "\x1B[3" + (c2 < 8 ? c2 : "8;5;" + c2);
        const prefix = `  ${colorCode};1m${name} \x1B[0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module.exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = getDate() + name + " " + args[0];
      }
    }
    function getDate() {
      if (exports.inspectOpts.hideDate) {
        return "";
      }
      return (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function log(...args) {
      return process.stderr.write(util.formatWithOptions(exports.inspectOpts, ...args) + "\n");
    }
    function save(namespaces) {
      if (namespaces) {
        process.env.DEBUG = namespaces;
      } else {
        delete process.env.DEBUG;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init(debug) {
      debug.inspectOpts = {};
      const keys = Object.keys(exports.inspectOpts);
      for (let i2 = 0; i2 < keys.length; i2++) {
        debug.inspectOpts[keys[i2]] = exports.inspectOpts[keys[i2]];
      }
    }
    module.exports = require_common()(exports);
    var { formatters } = module.exports;
    formatters.o = function(v2) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v2, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v2) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v2, this.inspectOpts);
    };
  }
});

// ../../node_modules/debug/src/index.js
var require_src = __commonJS({
  "../../node_modules/debug/src/index.js"(exports, module) {
    if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
      module.exports = require_browser();
    } else {
      module.exports = require_node();
    }
  }
});

// ../../node_modules/follow-redirects/debug.js
var require_debug = __commonJS({
  "../../node_modules/follow-redirects/debug.js"(exports, module) {
    var debug;
    module.exports = function() {
      if (!debug) {
        try {
          debug = require_src()("follow-redirects");
        } catch (error) {
        }
        if (typeof debug !== "function") {
          debug = function() {
          };
        }
      }
      debug.apply(null, arguments);
    };
  }
});

// ../../node_modules/follow-redirects/index.js
var require_follow_redirects = __commonJS({
  "../../node_modules/follow-redirects/index.js"(exports, module) {
    var url = __require("url");
    var URL2 = url.URL;
    var http = __require("http");
    var https = __require("https");
    var Writable = __require("stream").Writable;
    var assert = __require("assert");
    var debug = require_debug();
    (function detectUnsupportedEnvironment() {
      var looksLikeNode = typeof process !== "undefined";
      var looksLikeBrowser = typeof window !== "undefined" && typeof document !== "undefined";
      var looksLikeV8 = isFunction2(Error.captureStackTrace);
      if (!looksLikeNode && (looksLikeBrowser || !looksLikeV8)) {
        console.warn("The follow-redirects package should be excluded from browser builds.");
      }
    })();
    var useNativeURL = false;
    try {
      assert(new URL2(""));
    } catch (error) {
      useNativeURL = error.code === "ERR_INVALID_URL";
    }
    var preservedUrlFields = [
      "auth",
      "host",
      "hostname",
      "href",
      "path",
      "pathname",
      "port",
      "protocol",
      "query",
      "search",
      "hash"
    ];
    var events = ["abort", "aborted", "connect", "error", "socket", "timeout"];
    var eventHandlers = /* @__PURE__ */ Object.create(null);
    events.forEach(function(event) {
      eventHandlers[event] = function(arg1, arg2, arg3) {
        this._redirectable.emit(event, arg1, arg2, arg3);
      };
    });
    var InvalidUrlError = createErrorType(
      "ERR_INVALID_URL",
      "Invalid URL",
      TypeError
    );
    var RedirectionError = createErrorType(
      "ERR_FR_REDIRECTION_FAILURE",
      "Redirected request failed"
    );
    var TooManyRedirectsError = createErrorType(
      "ERR_FR_TOO_MANY_REDIRECTS",
      "Maximum number of redirects exceeded",
      RedirectionError
    );
    var MaxBodyLengthExceededError = createErrorType(
      "ERR_FR_MAX_BODY_LENGTH_EXCEEDED",
      "Request body larger than maxBodyLength limit"
    );
    var WriteAfterEndError = createErrorType(
      "ERR_STREAM_WRITE_AFTER_END",
      "write after end"
    );
    var destroy = Writable.prototype.destroy || noop2;
    function RedirectableRequest(options, responseCallback) {
      Writable.call(this);
      this._sanitizeOptions(options);
      this._options = options;
      this._ended = false;
      this._ending = false;
      this._redirectCount = 0;
      this._redirects = [];
      this._requestBodyLength = 0;
      this._requestBodyBuffers = [];
      if (responseCallback) {
        this.on("response", responseCallback);
      }
      var self = this;
      this._onNativeResponse = function(response) {
        try {
          self._processResponse(response);
        } catch (cause) {
          self.emit("error", cause instanceof RedirectionError ? cause : new RedirectionError({ cause }));
        }
      };
      this._performRequest();
    }
    RedirectableRequest.prototype = Object.create(Writable.prototype);
    RedirectableRequest.prototype.abort = function() {
      destroyRequest(this._currentRequest);
      this._currentRequest.abort();
      this.emit("abort");
    };
    RedirectableRequest.prototype.destroy = function(error) {
      destroyRequest(this._currentRequest, error);
      destroy.call(this, error);
      return this;
    };
    RedirectableRequest.prototype.write = function(data, encoding, callback) {
      if (this._ending) {
        throw new WriteAfterEndError();
      }
      if (!isString(data) && !isBuffer(data)) {
        throw new TypeError("data should be a string, Buffer or Uint8Array");
      }
      if (isFunction2(encoding)) {
        callback = encoding;
        encoding = null;
      }
      if (data.length === 0) {
        if (callback) {
          callback();
        }
        return;
      }
      if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
        this._requestBodyLength += data.length;
        this._requestBodyBuffers.push({ data, encoding });
        this._currentRequest.write(data, encoding, callback);
      } else {
        this.emit("error", new MaxBodyLengthExceededError());
        this.abort();
      }
    };
    RedirectableRequest.prototype.end = function(data, encoding, callback) {
      if (isFunction2(data)) {
        callback = data;
        data = encoding = null;
      } else if (isFunction2(encoding)) {
        callback = encoding;
        encoding = null;
      }
      if (!data) {
        this._ended = this._ending = true;
        this._currentRequest.end(null, null, callback);
      } else {
        var self = this;
        var currentRequest = this._currentRequest;
        this.write(data, encoding, function() {
          self._ended = true;
          currentRequest.end(null, null, callback);
        });
        this._ending = true;
      }
    };
    RedirectableRequest.prototype.setHeader = function(name, value) {
      this._options.headers[name] = value;
      this._currentRequest.setHeader(name, value);
    };
    RedirectableRequest.prototype.removeHeader = function(name) {
      delete this._options.headers[name];
      this._currentRequest.removeHeader(name);
    };
    RedirectableRequest.prototype.setTimeout = function(msecs, callback) {
      var self = this;
      function destroyOnTimeout(socket) {
        socket.setTimeout(msecs);
        socket.removeListener("timeout", socket.destroy);
        socket.addListener("timeout", socket.destroy);
      }
      function startTimer(socket) {
        if (self._timeout) {
          clearTimeout(self._timeout);
        }
        self._timeout = setTimeout(function() {
          self.emit("timeout");
          clearTimer();
        }, msecs);
        destroyOnTimeout(socket);
      }
      function clearTimer() {
        if (self._timeout) {
          clearTimeout(self._timeout);
          self._timeout = null;
        }
        self.removeListener("abort", clearTimer);
        self.removeListener("error", clearTimer);
        self.removeListener("response", clearTimer);
        self.removeListener("close", clearTimer);
        if (callback) {
          self.removeListener("timeout", callback);
        }
        if (!self.socket) {
          self._currentRequest.removeListener("socket", startTimer);
        }
      }
      if (callback) {
        this.on("timeout", callback);
      }
      if (this.socket) {
        startTimer(this.socket);
      } else {
        this._currentRequest.once("socket", startTimer);
      }
      this.on("socket", destroyOnTimeout);
      this.on("abort", clearTimer);
      this.on("error", clearTimer);
      this.on("response", clearTimer);
      this.on("close", clearTimer);
      return this;
    };
    [
      "flushHeaders",
      "getHeader",
      "setNoDelay",
      "setSocketKeepAlive"
    ].forEach(function(method) {
      RedirectableRequest.prototype[method] = function(a2, b2) {
        return this._currentRequest[method](a2, b2);
      };
    });
    ["aborted", "connection", "socket"].forEach(function(property) {
      Object.defineProperty(RedirectableRequest.prototype, property, {
        get: function() {
          return this._currentRequest[property];
        }
      });
    });
    RedirectableRequest.prototype._sanitizeOptions = function(options) {
      if (!options.headers) {
        options.headers = {};
      }
      if (options.host) {
        if (!options.hostname) {
          options.hostname = options.host;
        }
        delete options.host;
      }
      if (!options.pathname && options.path) {
        var searchPos = options.path.indexOf("?");
        if (searchPos < 0) {
          options.pathname = options.path;
        } else {
          options.pathname = options.path.substring(0, searchPos);
          options.search = options.path.substring(searchPos);
        }
      }
    };
    RedirectableRequest.prototype._performRequest = function() {
      var protocol = this._options.protocol;
      var nativeProtocol = this._options.nativeProtocols[protocol];
      if (!nativeProtocol) {
        throw new TypeError("Unsupported protocol " + protocol);
      }
      if (this._options.agents) {
        var scheme = protocol.slice(0, -1);
        this._options.agent = this._options.agents[scheme];
      }
      var request = this._currentRequest = nativeProtocol.request(this._options, this._onNativeResponse);
      request._redirectable = this;
      for (var event of events) {
        request.on(event, eventHandlers[event]);
      }
      this._currentUrl = /^\//.test(this._options.path) ? url.format(this._options) : (
        // When making a request to a proxy, […]
        // a client MUST send the target URI in absolute-form […].
        this._options.path
      );
      if (this._isRedirect) {
        var i2 = 0;
        var self = this;
        var buffers = this._requestBodyBuffers;
        (function writeNext(error) {
          if (request === self._currentRequest) {
            if (error) {
              self.emit("error", error);
            } else if (i2 < buffers.length) {
              var buffer = buffers[i2++];
              if (!request.finished) {
                request.write(buffer.data, buffer.encoding, writeNext);
              }
            } else if (self._ended) {
              request.end();
            }
          }
        })();
      }
    };
    RedirectableRequest.prototype._processResponse = function(response) {
      var statusCode = response.statusCode;
      if (this._options.trackRedirects) {
        this._redirects.push({
          url: this._currentUrl,
          headers: response.headers,
          statusCode
        });
      }
      var location = response.headers.location;
      if (!location || this._options.followRedirects === false || statusCode < 300 || statusCode >= 400) {
        response.responseUrl = this._currentUrl;
        response.redirects = this._redirects;
        this.emit("response", response);
        this._requestBodyBuffers = [];
        return;
      }
      destroyRequest(this._currentRequest);
      response.destroy();
      if (++this._redirectCount > this._options.maxRedirects) {
        throw new TooManyRedirectsError();
      }
      var requestHeaders;
      var beforeRedirect = this._options.beforeRedirect;
      if (beforeRedirect) {
        requestHeaders = Object.assign({
          // The Host header was set by nativeProtocol.request
          Host: response.req.getHeader("host")
        }, this._options.headers);
      }
      var method = this._options.method;
      if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" || // RFC7231§6.4.4: The 303 (See Other) status code indicates that
      // the server is redirecting the user agent to a different resource […]
      // A user agent can perform a retrieval request targeting that URI
      // (a GET or HEAD request if using HTTP) […]
      statusCode === 303 && !/^(?:GET|HEAD)$/.test(this._options.method)) {
        this._options.method = "GET";
        this._requestBodyBuffers = [];
        removeMatchingHeaders(/^content-/i, this._options.headers);
      }
      var currentHostHeader = removeMatchingHeaders(/^host$/i, this._options.headers);
      var currentUrlParts = parseUrl(this._currentUrl);
      var currentHost = currentHostHeader || currentUrlParts.host;
      var currentUrl = /^\w+:/.test(location) ? this._currentUrl : url.format(Object.assign(currentUrlParts, { host: currentHost }));
      var redirectUrl = resolveUrl(location, currentUrl);
      debug("redirecting to", redirectUrl.href);
      this._isRedirect = true;
      spreadUrlObject(redirectUrl, this._options);
      if (redirectUrl.protocol !== currentUrlParts.protocol && redirectUrl.protocol !== "https:" || redirectUrl.host !== currentHost && !isSubdomain(redirectUrl.host, currentHost)) {
        removeMatchingHeaders(/^(?:(?:proxy-)?authorization|cookie)$/i, this._options.headers);
      }
      if (isFunction2(beforeRedirect)) {
        var responseDetails = {
          headers: response.headers,
          statusCode
        };
        var requestDetails = {
          url: currentUrl,
          method,
          headers: requestHeaders
        };
        beforeRedirect(this._options, responseDetails, requestDetails);
        this._sanitizeOptions(this._options);
      }
      this._performRequest();
    };
    function wrap(protocols) {
      var exports2 = {
        maxRedirects: 21,
        maxBodyLength: 10 * 1024 * 1024
      };
      var nativeProtocols = {};
      Object.keys(protocols).forEach(function(scheme) {
        var protocol = scheme + ":";
        var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
        var wrappedProtocol = exports2[scheme] = Object.create(nativeProtocol);
        function request(input, options, callback) {
          if (isURL(input)) {
            input = spreadUrlObject(input);
          } else if (isString(input)) {
            input = spreadUrlObject(parseUrl(input));
          } else {
            callback = options;
            options = validateUrl(input);
            input = { protocol };
          }
          if (isFunction2(options)) {
            callback = options;
            options = null;
          }
          options = Object.assign({
            maxRedirects: exports2.maxRedirects,
            maxBodyLength: exports2.maxBodyLength
          }, input, options);
          options.nativeProtocols = nativeProtocols;
          if (!isString(options.host) && !isString(options.hostname)) {
            options.hostname = "::1";
          }
          assert.equal(options.protocol, protocol, "protocol mismatch");
          debug("options", options);
          return new RedirectableRequest(options, callback);
        }
        function get(input, options, callback) {
          var wrappedRequest = wrappedProtocol.request(input, options, callback);
          wrappedRequest.end();
          return wrappedRequest;
        }
        Object.defineProperties(wrappedProtocol, {
          request: { value: request, configurable: true, enumerable: true, writable: true },
          get: { value: get, configurable: true, enumerable: true, writable: true }
        });
      });
      return exports2;
    }
    function noop2() {
    }
    function parseUrl(input) {
      var parsed;
      if (useNativeURL) {
        parsed = new URL2(input);
      } else {
        parsed = validateUrl(url.parse(input));
        if (!isString(parsed.protocol)) {
          throw new InvalidUrlError({ input });
        }
      }
      return parsed;
    }
    function resolveUrl(relative, base) {
      return useNativeURL ? new URL2(relative, base) : parseUrl(url.resolve(base, relative));
    }
    function validateUrl(input) {
      if (/^\[/.test(input.hostname) && !/^\[[:0-9a-f]+\]$/i.test(input.hostname)) {
        throw new InvalidUrlError({ input: input.href || input });
      }
      if (/^\[/.test(input.host) && !/^\[[:0-9a-f]+\](:\d+)?$/i.test(input.host)) {
        throw new InvalidUrlError({ input: input.href || input });
      }
      return input;
    }
    function spreadUrlObject(urlObject, target) {
      var spread = target || {};
      for (var key of preservedUrlFields) {
        spread[key] = urlObject[key];
      }
      if (spread.hostname.startsWith("[")) {
        spread.hostname = spread.hostname.slice(1, -1);
      }
      if (spread.port !== "") {
        spread.port = Number(spread.port);
      }
      spread.path = spread.search ? spread.pathname + spread.search : spread.pathname;
      return spread;
    }
    function removeMatchingHeaders(regex, headers) {
      var lastValue;
      for (var header in headers) {
        if (regex.test(header)) {
          lastValue = headers[header];
          delete headers[header];
        }
      }
      return lastValue === null || typeof lastValue === "undefined" ? void 0 : String(lastValue).trim();
    }
    function createErrorType(code, message, baseClass) {
      function CustomError(properties) {
        if (isFunction2(Error.captureStackTrace)) {
          Error.captureStackTrace(this, this.constructor);
        }
        Object.assign(this, properties || {});
        this.code = code;
        this.message = this.cause ? message + ": " + this.cause.message : message;
      }
      CustomError.prototype = new (baseClass || Error)();
      Object.defineProperties(CustomError.prototype, {
        constructor: {
          value: CustomError,
          enumerable: false
        },
        name: {
          value: "Error [" + code + "]",
          enumerable: false
        }
      });
      return CustomError;
    }
    function destroyRequest(request, error) {
      for (var event of events) {
        request.removeListener(event, eventHandlers[event]);
      }
      request.on("error", noop2);
      request.destroy(error);
    }
    function isSubdomain(subdomain, domain) {
      assert(isString(subdomain) && isString(domain));
      var dot = subdomain.length - domain.length - 1;
      return dot > 0 && subdomain[dot] === "." && subdomain.endsWith(domain);
    }
    function isString(value) {
      return typeof value === "string" || value instanceof String;
    }
    function isFunction2(value) {
      return typeof value === "function";
    }
    function isBuffer(value) {
      return typeof value === "object" && "length" in value;
    }
    function isURL(value) {
      return URL2 && value instanceof URL2;
    }
    module.exports = wrap({ http, https });
    module.exports.wrap = wrap;
  }
});

// ../../node_modules/capsolver-npm/node_modules/axios/lib/env/data.js
var require_data = __commonJS({
  "../../node_modules/capsolver-npm/node_modules/axios/lib/env/data.js"(exports, module) {
    module.exports = {
      "version": "0.27.2"
    };
  }
});

// ../../node_modules/capsolver-npm/node_modules/axios/lib/adapters/http.js
var require_http = __commonJS({
  "../../node_modules/capsolver-npm/node_modules/axios/lib/adapters/http.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var settle = require_settle();
    var buildFullPath = require_buildFullPath();
    var buildURL = require_buildURL();
    var http = __require("http");
    var https = __require("https");
    var httpFollow = require_follow_redirects().http;
    var httpsFollow = require_follow_redirects().https;
    var url = __require("url");
    var zlib = __require("zlib");
    var VERSION = require_data().version;
    var transitionalDefaults = require_transitional();
    var AxiosError = require_AxiosError();
    var CanceledError = require_CanceledError();
    var isHttps = /https:?/;
    var supportedProtocols = ["http:", "https:", "file:"];
    function setProxy(options, proxy, location) {
      options.hostname = proxy.host;
      options.host = proxy.host;
      options.port = proxy.port;
      options.path = location;
      if (proxy.auth) {
        var base64 = Buffer.from(proxy.auth.username + ":" + proxy.auth.password, "utf8").toString("base64");
        options.headers["Proxy-Authorization"] = "Basic " + base64;
      }
      options.beforeRedirect = function beforeRedirect(redirection) {
        redirection.headers.host = redirection.host;
        setProxy(redirection, proxy, redirection.href);
      };
    }
    module.exports = function httpAdapter(config2) {
      return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
        var onCanceled;
        function done() {
          if (config2.cancelToken) {
            config2.cancelToken.unsubscribe(onCanceled);
          }
          if (config2.signal) {
            config2.signal.removeEventListener("abort", onCanceled);
          }
        }
        var resolve = function resolve2(value) {
          done();
          resolvePromise(value);
        };
        var rejected = false;
        var reject = function reject2(value) {
          done();
          rejected = true;
          rejectPromise(value);
        };
        var data = config2.data;
        var headers = config2.headers;
        var headerNames = {};
        Object.keys(headers).forEach(function storeLowerName(name) {
          headerNames[name.toLowerCase()] = name;
        });
        if ("user-agent" in headerNames) {
          if (!headers[headerNames["user-agent"]]) {
            delete headers[headerNames["user-agent"]];
          }
        } else {
          headers["User-Agent"] = "axios/" + VERSION;
        }
        if (utils.isFormData(data) && utils.isFunction(data.getHeaders)) {
          Object.assign(headers, data.getHeaders());
        } else if (data && !utils.isStream(data)) {
          if (Buffer.isBuffer(data)) {
          } else if (utils.isArrayBuffer(data)) {
            data = Buffer.from(new Uint8Array(data));
          } else if (utils.isString(data)) {
            data = Buffer.from(data, "utf-8");
          } else {
            return reject(new AxiosError(
              "Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream",
              AxiosError.ERR_BAD_REQUEST,
              config2
            ));
          }
          if (config2.maxBodyLength > -1 && data.length > config2.maxBodyLength) {
            return reject(new AxiosError(
              "Request body larger than maxBodyLength limit",
              AxiosError.ERR_BAD_REQUEST,
              config2
            ));
          }
          if (!headerNames["content-length"]) {
            headers["Content-Length"] = data.length;
          }
        }
        var auth = void 0;
        if (config2.auth) {
          var username = config2.auth.username || "";
          var password = config2.auth.password || "";
          auth = username + ":" + password;
        }
        var fullPath = buildFullPath(config2.baseURL, config2.url);
        var parsed = url.parse(fullPath);
        var protocol = parsed.protocol || supportedProtocols[0];
        if (supportedProtocols.indexOf(protocol) === -1) {
          return reject(new AxiosError(
            "Unsupported protocol " + protocol,
            AxiosError.ERR_BAD_REQUEST,
            config2
          ));
        }
        if (!auth && parsed.auth) {
          var urlAuth = parsed.auth.split(":");
          var urlUsername = urlAuth[0] || "";
          var urlPassword = urlAuth[1] || "";
          auth = urlUsername + ":" + urlPassword;
        }
        if (auth && headerNames.authorization) {
          delete headers[headerNames.authorization];
        }
        var isHttpsRequest = isHttps.test(protocol);
        var agent = isHttpsRequest ? config2.httpsAgent : config2.httpAgent;
        try {
          buildURL(parsed.path, config2.params, config2.paramsSerializer).replace(/^\?/, "");
        } catch (err) {
          var customErr = new Error(err.message);
          customErr.config = config2;
          customErr.url = config2.url;
          customErr.exists = true;
          reject(customErr);
        }
        var options = {
          path: buildURL(parsed.path, config2.params, config2.paramsSerializer).replace(/^\?/, ""),
          method: config2.method.toUpperCase(),
          headers,
          agent,
          agents: { http: config2.httpAgent, https: config2.httpsAgent },
          auth
        };
        if (config2.socketPath) {
          options.socketPath = config2.socketPath;
        } else {
          options.hostname = parsed.hostname;
          options.port = parsed.port;
        }
        var proxy = config2.proxy;
        if (!proxy && proxy !== false) {
          var proxyEnv = protocol.slice(0, -1) + "_proxy";
          var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
          if (proxyUrl) {
            var parsedProxyUrl = url.parse(proxyUrl);
            var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
            var shouldProxy = true;
            if (noProxyEnv) {
              var noProxy = noProxyEnv.split(",").map(function trim(s2) {
                return s2.trim();
              });
              shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
                if (!proxyElement) {
                  return false;
                }
                if (proxyElement === "*") {
                  return true;
                }
                if (proxyElement[0] === "." && parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement) {
                  return true;
                }
                return parsed.hostname === proxyElement;
              });
            }
            if (shouldProxy) {
              proxy = {
                host: parsedProxyUrl.hostname,
                port: parsedProxyUrl.port,
                protocol: parsedProxyUrl.protocol
              };
              if (parsedProxyUrl.auth) {
                var proxyUrlAuth = parsedProxyUrl.auth.split(":");
                proxy.auth = {
                  username: proxyUrlAuth[0],
                  password: proxyUrlAuth[1]
                };
              }
            }
          }
        }
        if (proxy) {
          options.headers.host = parsed.hostname + (parsed.port ? ":" + parsed.port : "");
          setProxy(options, proxy, protocol + "//" + parsed.hostname + (parsed.port ? ":" + parsed.port : "") + options.path);
        }
        var transport;
        var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
        if (config2.transport) {
          transport = config2.transport;
        } else if (config2.maxRedirects === 0) {
          transport = isHttpsProxy ? https : http;
        } else {
          if (config2.maxRedirects) {
            options.maxRedirects = config2.maxRedirects;
          }
          if (config2.beforeRedirect) {
            options.beforeRedirect = config2.beforeRedirect;
          }
          transport = isHttpsProxy ? httpsFollow : httpFollow;
        }
        if (config2.maxBodyLength > -1) {
          options.maxBodyLength = config2.maxBodyLength;
        }
        if (config2.insecureHTTPParser) {
          options.insecureHTTPParser = config2.insecureHTTPParser;
        }
        var req = transport.request(options, function handleResponse(res) {
          if (req.aborted) return;
          var stream = res;
          var lastRequest = res.req || req;
          if (res.statusCode !== 204 && lastRequest.method !== "HEAD" && config2.decompress !== false) {
            switch (res.headers["content-encoding"]) {
              /*eslint default-case:0*/
              case "gzip":
              case "compress":
              case "deflate":
                stream = stream.pipe(zlib.createUnzip());
                delete res.headers["content-encoding"];
                break;
            }
          }
          var response = {
            status: res.statusCode,
            statusText: res.statusMessage,
            headers: res.headers,
            config: config2,
            request: lastRequest
          };
          if (config2.responseType === "stream") {
            response.data = stream;
            settle(resolve, reject, response);
          } else {
            var responseBuffer = [];
            var totalResponseBytes = 0;
            stream.on("data", function handleStreamData(chunk) {
              responseBuffer.push(chunk);
              totalResponseBytes += chunk.length;
              if (config2.maxContentLength > -1 && totalResponseBytes > config2.maxContentLength) {
                rejected = true;
                stream.destroy();
                reject(new AxiosError(
                  "maxContentLength size of " + config2.maxContentLength + " exceeded",
                  AxiosError.ERR_BAD_RESPONSE,
                  config2,
                  lastRequest
                ));
              }
            });
            stream.on("aborted", function handlerStreamAborted() {
              if (rejected) {
                return;
              }
              stream.destroy();
              reject(new AxiosError(
                "maxContentLength size of " + config2.maxContentLength + " exceeded",
                AxiosError.ERR_BAD_RESPONSE,
                config2,
                lastRequest
              ));
            });
            stream.on("error", function handleStreamError(err) {
              if (req.aborted) return;
              reject(AxiosError.from(err, null, config2, lastRequest));
            });
            stream.on("end", function handleStreamEnd() {
              try {
                var responseData = responseBuffer.length === 1 ? responseBuffer[0] : Buffer.concat(responseBuffer);
                if (config2.responseType !== "arraybuffer") {
                  responseData = responseData.toString(config2.responseEncoding);
                  if (!config2.responseEncoding || config2.responseEncoding === "utf8") {
                    responseData = utils.stripBOM(responseData);
                  }
                }
                response.data = responseData;
              } catch (err) {
                reject(AxiosError.from(err, null, config2, response.request, response));
              }
              settle(resolve, reject, response);
            });
          }
        });
        req.on("error", function handleRequestError(err) {
          reject(AxiosError.from(err, null, config2, req));
        });
        req.on("socket", function handleRequestSocket(socket) {
          socket.setKeepAlive(true, 1e3 * 60);
        });
        if (config2.timeout) {
          var timeout = parseInt(config2.timeout, 10);
          if (isNaN(timeout)) {
            reject(new AxiosError(
              "error trying to parse `config.timeout` to int",
              AxiosError.ERR_BAD_OPTION_VALUE,
              config2,
              req
            ));
            return;
          }
          req.setTimeout(timeout, function handleRequestTimeout() {
            req.abort();
            var transitional = config2.transitional || transitionalDefaults;
            reject(new AxiosError(
              "timeout of " + timeout + "ms exceeded",
              transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
              config2,
              req
            ));
          });
        }
        if (config2.cancelToken || config2.signal) {
          onCanceled = function(cancel) {
            if (req.aborted) return;
            req.abort();
            reject(!cancel || cancel && cancel.type ? new CanceledError() : cancel);
          };
          config2.cancelToken && config2.cancelToken.subscribe(onCanceled);
          if (config2.signal) {
            config2.signal.aborted ? onCanceled() : config2.signal.addEventListener("abort", onCanceled);
          }
        }
        if (utils.isStream(data)) {
          data.on("error", function handleStreamError(err) {
            reject(AxiosError.from(err, config2, null, req));
          }).pipe(req);
        } else {
          req.end(data);
        }
      });
    };
  }
});

// ../../node_modules/delayed-stream/lib/delayed_stream.js
var require_delayed_stream = __commonJS({
  "../../node_modules/delayed-stream/lib/delayed_stream.js"(exports, module) {
    var Stream = __require("stream").Stream;
    var util = __require("util");
    module.exports = DelayedStream;
    function DelayedStream() {
      this.source = null;
      this.dataSize = 0;
      this.maxDataSize = 1024 * 1024;
      this.pauseStream = true;
      this._maxDataSizeExceeded = false;
      this._released = false;
      this._bufferedEvents = [];
    }
    util.inherits(DelayedStream, Stream);
    DelayedStream.create = function(source, options) {
      var delayedStream = new this();
      options = options || {};
      for (var option in options) {
        delayedStream[option] = options[option];
      }
      delayedStream.source = source;
      var realEmit = source.emit;
      source.emit = function() {
        delayedStream._handleEmit(arguments);
        return realEmit.apply(source, arguments);
      };
      source.on("error", function() {
      });
      if (delayedStream.pauseStream) {
        source.pause();
      }
      return delayedStream;
    };
    Object.defineProperty(DelayedStream.prototype, "readable", {
      configurable: true,
      enumerable: true,
      get: function() {
        return this.source.readable;
      }
    });
    DelayedStream.prototype.setEncoding = function() {
      return this.source.setEncoding.apply(this.source, arguments);
    };
    DelayedStream.prototype.resume = function() {
      if (!this._released) {
        this.release();
      }
      this.source.resume();
    };
    DelayedStream.prototype.pause = function() {
      this.source.pause();
    };
    DelayedStream.prototype.release = function() {
      this._released = true;
      this._bufferedEvents.forEach(function(args) {
        this.emit.apply(this, args);
      }.bind(this));
      this._bufferedEvents = [];
    };
    DelayedStream.prototype.pipe = function() {
      var r2 = Stream.prototype.pipe.apply(this, arguments);
      this.resume();
      return r2;
    };
    DelayedStream.prototype._handleEmit = function(args) {
      if (this._released) {
        this.emit.apply(this, args);
        return;
      }
      if (args[0] === "data") {
        this.dataSize += args[1].length;
        this._checkIfMaxDataSizeExceeded();
      }
      this._bufferedEvents.push(args);
    };
    DelayedStream.prototype._checkIfMaxDataSizeExceeded = function() {
      if (this._maxDataSizeExceeded) {
        return;
      }
      if (this.dataSize <= this.maxDataSize) {
        return;
      }
      this._maxDataSizeExceeded = true;
      var message = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
      this.emit("error", new Error(message));
    };
  }
});

// ../../node_modules/combined-stream/lib/combined_stream.js
var require_combined_stream = __commonJS({
  "../../node_modules/combined-stream/lib/combined_stream.js"(exports, module) {
    var util = __require("util");
    var Stream = __require("stream").Stream;
    var DelayedStream = require_delayed_stream();
    module.exports = CombinedStream;
    function CombinedStream() {
      this.writable = false;
      this.readable = true;
      this.dataSize = 0;
      this.maxDataSize = 2 * 1024 * 1024;
      this.pauseStreams = true;
      this._released = false;
      this._streams = [];
      this._currentStream = null;
      this._insideLoop = false;
      this._pendingNext = false;
    }
    util.inherits(CombinedStream, Stream);
    CombinedStream.create = function(options) {
      var combinedStream = new this();
      options = options || {};
      for (var option in options) {
        combinedStream[option] = options[option];
      }
      return combinedStream;
    };
    CombinedStream.isStreamLike = function(stream) {
      return typeof stream !== "function" && typeof stream !== "string" && typeof stream !== "boolean" && typeof stream !== "number" && !Buffer.isBuffer(stream);
    };
    CombinedStream.prototype.append = function(stream) {
      var isStreamLike = CombinedStream.isStreamLike(stream);
      if (isStreamLike) {
        if (!(stream instanceof DelayedStream)) {
          var newStream = DelayedStream.create(stream, {
            maxDataSize: Infinity,
            pauseStream: this.pauseStreams
          });
          stream.on("data", this._checkDataSize.bind(this));
          stream = newStream;
        }
        this._handleErrors(stream);
        if (this.pauseStreams) {
          stream.pause();
        }
      }
      this._streams.push(stream);
      return this;
    };
    CombinedStream.prototype.pipe = function(dest, options) {
      Stream.prototype.pipe.call(this, dest, options);
      this.resume();
      return dest;
    };
    CombinedStream.prototype._getNext = function() {
      this._currentStream = null;
      if (this._insideLoop) {
        this._pendingNext = true;
        return;
      }
      this._insideLoop = true;
      try {
        do {
          this._pendingNext = false;
          this._realGetNext();
        } while (this._pendingNext);
      } finally {
        this._insideLoop = false;
      }
    };
    CombinedStream.prototype._realGetNext = function() {
      var stream = this._streams.shift();
      if (typeof stream == "undefined") {
        this.end();
        return;
      }
      if (typeof stream !== "function") {
        this._pipeNext(stream);
        return;
      }
      var getStream = stream;
      getStream(function(stream2) {
        var isStreamLike = CombinedStream.isStreamLike(stream2);
        if (isStreamLike) {
          stream2.on("data", this._checkDataSize.bind(this));
          this._handleErrors(stream2);
        }
        this._pipeNext(stream2);
      }.bind(this));
    };
    CombinedStream.prototype._pipeNext = function(stream) {
      this._currentStream = stream;
      var isStreamLike = CombinedStream.isStreamLike(stream);
      if (isStreamLike) {
        stream.on("end", this._getNext.bind(this));
        stream.pipe(this, { end: false });
        return;
      }
      var value = stream;
      this.write(value);
      this._getNext();
    };
    CombinedStream.prototype._handleErrors = function(stream) {
      var self = this;
      stream.on("error", function(err) {
        self._emitError(err);
      });
    };
    CombinedStream.prototype.write = function(data) {
      this.emit("data", data);
    };
    CombinedStream.prototype.pause = function() {
      if (!this.pauseStreams) {
        return;
      }
      if (this.pauseStreams && this._currentStream && typeof this._currentStream.pause == "function") this._currentStream.pause();
      this.emit("pause");
    };
    CombinedStream.prototype.resume = function() {
      if (!this._released) {
        this._released = true;
        this.writable = true;
        this._getNext();
      }
      if (this.pauseStreams && this._currentStream && typeof this._currentStream.resume == "function") this._currentStream.resume();
      this.emit("resume");
    };
    CombinedStream.prototype.end = function() {
      this._reset();
      this.emit("end");
    };
    CombinedStream.prototype.destroy = function() {
      this._reset();
      this.emit("close");
    };
    CombinedStream.prototype._reset = function() {
      this.writable = false;
      this._streams = [];
      this._currentStream = null;
    };
    CombinedStream.prototype._checkDataSize = function() {
      this._updateDataSize();
      if (this.dataSize <= this.maxDataSize) {
        return;
      }
      var message = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
      this._emitError(new Error(message));
    };
    CombinedStream.prototype._updateDataSize = function() {
      this.dataSize = 0;
      var self = this;
      this._streams.forEach(function(stream) {
        if (!stream.dataSize) {
          return;
        }
        self.dataSize += stream.dataSize;
      });
      if (this._currentStream && this._currentStream.dataSize) {
        this.dataSize += this._currentStream.dataSize;
      }
    };
    CombinedStream.prototype._emitError = function(err) {
      this._reset();
      this.emit("error", err);
    };
  }
});

// ../../node_modules/mime-db/db.json
var require_db = __commonJS({
  "../../node_modules/mime-db/db.json"(exports, module) {
    module.exports = {
      "application/1d-interleaved-parityfec": {
        source: "iana"
      },
      "application/3gpdash-qoe-report+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/3gpp-ims+xml": {
        source: "iana",
        compressible: true
      },
      "application/3gpphal+json": {
        source: "iana",
        compressible: true
      },
      "application/3gpphalforms+json": {
        source: "iana",
        compressible: true
      },
      "application/a2l": {
        source: "iana"
      },
      "application/ace+cbor": {
        source: "iana"
      },
      "application/activemessage": {
        source: "iana"
      },
      "application/activity+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-costmap+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-costmapfilter+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-directory+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointcost+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointcostparams+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointprop+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointpropparams+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-error+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-networkmap+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-networkmapfilter+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-updatestreamcontrol+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-updatestreamparams+json": {
        source: "iana",
        compressible: true
      },
      "application/aml": {
        source: "iana"
      },
      "application/andrew-inset": {
        source: "iana",
        extensions: ["ez"]
      },
      "application/applefile": {
        source: "iana"
      },
      "application/applixware": {
        source: "apache",
        extensions: ["aw"]
      },
      "application/at+jwt": {
        source: "iana"
      },
      "application/atf": {
        source: "iana"
      },
      "application/atfx": {
        source: "iana"
      },
      "application/atom+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atom"]
      },
      "application/atomcat+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomcat"]
      },
      "application/atomdeleted+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomdeleted"]
      },
      "application/atomicmail": {
        source: "iana"
      },
      "application/atomsvc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomsvc"]
      },
      "application/atsc-dwd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dwd"]
      },
      "application/atsc-dynamic-event-message": {
        source: "iana"
      },
      "application/atsc-held+xml": {
        source: "iana",
        compressible: true,
        extensions: ["held"]
      },
      "application/atsc-rdt+json": {
        source: "iana",
        compressible: true
      },
      "application/atsc-rsat+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rsat"]
      },
      "application/atxml": {
        source: "iana"
      },
      "application/auth-policy+xml": {
        source: "iana",
        compressible: true
      },
      "application/bacnet-xdd+zip": {
        source: "iana",
        compressible: false
      },
      "application/batch-smtp": {
        source: "iana"
      },
      "application/bdoc": {
        compressible: false,
        extensions: ["bdoc"]
      },
      "application/beep+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/calendar+json": {
        source: "iana",
        compressible: true
      },
      "application/calendar+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xcs"]
      },
      "application/call-completion": {
        source: "iana"
      },
      "application/cals-1840": {
        source: "iana"
      },
      "application/captive+json": {
        source: "iana",
        compressible: true
      },
      "application/cbor": {
        source: "iana"
      },
      "application/cbor-seq": {
        source: "iana"
      },
      "application/cccex": {
        source: "iana"
      },
      "application/ccmp+xml": {
        source: "iana",
        compressible: true
      },
      "application/ccxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ccxml"]
      },
      "application/cdfx+xml": {
        source: "iana",
        compressible: true,
        extensions: ["cdfx"]
      },
      "application/cdmi-capability": {
        source: "iana",
        extensions: ["cdmia"]
      },
      "application/cdmi-container": {
        source: "iana",
        extensions: ["cdmic"]
      },
      "application/cdmi-domain": {
        source: "iana",
        extensions: ["cdmid"]
      },
      "application/cdmi-object": {
        source: "iana",
        extensions: ["cdmio"]
      },
      "application/cdmi-queue": {
        source: "iana",
        extensions: ["cdmiq"]
      },
      "application/cdni": {
        source: "iana"
      },
      "application/cea": {
        source: "iana"
      },
      "application/cea-2018+xml": {
        source: "iana",
        compressible: true
      },
      "application/cellml+xml": {
        source: "iana",
        compressible: true
      },
      "application/cfw": {
        source: "iana"
      },
      "application/city+json": {
        source: "iana",
        compressible: true
      },
      "application/clr": {
        source: "iana"
      },
      "application/clue+xml": {
        source: "iana",
        compressible: true
      },
      "application/clue_info+xml": {
        source: "iana",
        compressible: true
      },
      "application/cms": {
        source: "iana"
      },
      "application/cnrp+xml": {
        source: "iana",
        compressible: true
      },
      "application/coap-group+json": {
        source: "iana",
        compressible: true
      },
      "application/coap-payload": {
        source: "iana"
      },
      "application/commonground": {
        source: "iana"
      },
      "application/conference-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/cose": {
        source: "iana"
      },
      "application/cose-key": {
        source: "iana"
      },
      "application/cose-key-set": {
        source: "iana"
      },
      "application/cpl+xml": {
        source: "iana",
        compressible: true,
        extensions: ["cpl"]
      },
      "application/csrattrs": {
        source: "iana"
      },
      "application/csta+xml": {
        source: "iana",
        compressible: true
      },
      "application/cstadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/csvm+json": {
        source: "iana",
        compressible: true
      },
      "application/cu-seeme": {
        source: "apache",
        extensions: ["cu"]
      },
      "application/cwt": {
        source: "iana"
      },
      "application/cybercash": {
        source: "iana"
      },
      "application/dart": {
        compressible: true
      },
      "application/dash+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpd"]
      },
      "application/dash-patch+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpp"]
      },
      "application/dashdelta": {
        source: "iana"
      },
      "application/davmount+xml": {
        source: "iana",
        compressible: true,
        extensions: ["davmount"]
      },
      "application/dca-rft": {
        source: "iana"
      },
      "application/dcd": {
        source: "iana"
      },
      "application/dec-dx": {
        source: "iana"
      },
      "application/dialog-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/dicom": {
        source: "iana"
      },
      "application/dicom+json": {
        source: "iana",
        compressible: true
      },
      "application/dicom+xml": {
        source: "iana",
        compressible: true
      },
      "application/dii": {
        source: "iana"
      },
      "application/dit": {
        source: "iana"
      },
      "application/dns": {
        source: "iana"
      },
      "application/dns+json": {
        source: "iana",
        compressible: true
      },
      "application/dns-message": {
        source: "iana"
      },
      "application/docbook+xml": {
        source: "apache",
        compressible: true,
        extensions: ["dbk"]
      },
      "application/dots+cbor": {
        source: "iana"
      },
      "application/dskpp+xml": {
        source: "iana",
        compressible: true
      },
      "application/dssc+der": {
        source: "iana",
        extensions: ["dssc"]
      },
      "application/dssc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdssc"]
      },
      "application/dvcs": {
        source: "iana"
      },
      "application/ecmascript": {
        source: "iana",
        compressible: true,
        extensions: ["es", "ecma"]
      },
      "application/edi-consent": {
        source: "iana"
      },
      "application/edi-x12": {
        source: "iana",
        compressible: false
      },
      "application/edifact": {
        source: "iana",
        compressible: false
      },
      "application/efi": {
        source: "iana"
      },
      "application/elm+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/elm+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.cap+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/emergencycalldata.comment+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.control+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.deviceinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.ecall.msd": {
        source: "iana"
      },
      "application/emergencycalldata.providerinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.serviceinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.subscriberinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.veds+xml": {
        source: "iana",
        compressible: true
      },
      "application/emma+xml": {
        source: "iana",
        compressible: true,
        extensions: ["emma"]
      },
      "application/emotionml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["emotionml"]
      },
      "application/encaprtp": {
        source: "iana"
      },
      "application/epp+xml": {
        source: "iana",
        compressible: true
      },
      "application/epub+zip": {
        source: "iana",
        compressible: false,
        extensions: ["epub"]
      },
      "application/eshop": {
        source: "iana"
      },
      "application/exi": {
        source: "iana",
        extensions: ["exi"]
      },
      "application/expect-ct-report+json": {
        source: "iana",
        compressible: true
      },
      "application/express": {
        source: "iana",
        extensions: ["exp"]
      },
      "application/fastinfoset": {
        source: "iana"
      },
      "application/fastsoap": {
        source: "iana"
      },
      "application/fdt+xml": {
        source: "iana",
        compressible: true,
        extensions: ["fdt"]
      },
      "application/fhir+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/fhir+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/fido.trusted-apps+json": {
        compressible: true
      },
      "application/fits": {
        source: "iana"
      },
      "application/flexfec": {
        source: "iana"
      },
      "application/font-sfnt": {
        source: "iana"
      },
      "application/font-tdpfr": {
        source: "iana",
        extensions: ["pfr"]
      },
      "application/font-woff": {
        source: "iana",
        compressible: false
      },
      "application/framework-attributes+xml": {
        source: "iana",
        compressible: true
      },
      "application/geo+json": {
        source: "iana",
        compressible: true,
        extensions: ["geojson"]
      },
      "application/geo+json-seq": {
        source: "iana"
      },
      "application/geopackage+sqlite3": {
        source: "iana"
      },
      "application/geoxacml+xml": {
        source: "iana",
        compressible: true
      },
      "application/gltf-buffer": {
        source: "iana"
      },
      "application/gml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["gml"]
      },
      "application/gpx+xml": {
        source: "apache",
        compressible: true,
        extensions: ["gpx"]
      },
      "application/gxf": {
        source: "apache",
        extensions: ["gxf"]
      },
      "application/gzip": {
        source: "iana",
        compressible: false,
        extensions: ["gz"]
      },
      "application/h224": {
        source: "iana"
      },
      "application/held+xml": {
        source: "iana",
        compressible: true
      },
      "application/hjson": {
        extensions: ["hjson"]
      },
      "application/http": {
        source: "iana"
      },
      "application/hyperstudio": {
        source: "iana",
        extensions: ["stk"]
      },
      "application/ibe-key-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/ibe-pkg-reply+xml": {
        source: "iana",
        compressible: true
      },
      "application/ibe-pp-data": {
        source: "iana"
      },
      "application/iges": {
        source: "iana"
      },
      "application/im-iscomposing+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/index": {
        source: "iana"
      },
      "application/index.cmd": {
        source: "iana"
      },
      "application/index.obj": {
        source: "iana"
      },
      "application/index.response": {
        source: "iana"
      },
      "application/index.vnd": {
        source: "iana"
      },
      "application/inkml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ink", "inkml"]
      },
      "application/iotp": {
        source: "iana"
      },
      "application/ipfix": {
        source: "iana",
        extensions: ["ipfix"]
      },
      "application/ipp": {
        source: "iana"
      },
      "application/isup": {
        source: "iana"
      },
      "application/its+xml": {
        source: "iana",
        compressible: true,
        extensions: ["its"]
      },
      "application/java-archive": {
        source: "apache",
        compressible: false,
        extensions: ["jar", "war", "ear"]
      },
      "application/java-serialized-object": {
        source: "apache",
        compressible: false,
        extensions: ["ser"]
      },
      "application/java-vm": {
        source: "apache",
        compressible: false,
        extensions: ["class"]
      },
      "application/javascript": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["js", "mjs"]
      },
      "application/jf2feed+json": {
        source: "iana",
        compressible: true
      },
      "application/jose": {
        source: "iana"
      },
      "application/jose+json": {
        source: "iana",
        compressible: true
      },
      "application/jrd+json": {
        source: "iana",
        compressible: true
      },
      "application/jscalendar+json": {
        source: "iana",
        compressible: true
      },
      "application/json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["json", "map"]
      },
      "application/json-patch+json": {
        source: "iana",
        compressible: true
      },
      "application/json-seq": {
        source: "iana"
      },
      "application/json5": {
        extensions: ["json5"]
      },
      "application/jsonml+json": {
        source: "apache",
        compressible: true,
        extensions: ["jsonml"]
      },
      "application/jwk+json": {
        source: "iana",
        compressible: true
      },
      "application/jwk-set+json": {
        source: "iana",
        compressible: true
      },
      "application/jwt": {
        source: "iana"
      },
      "application/kpml-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/kpml-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/ld+json": {
        source: "iana",
        compressible: true,
        extensions: ["jsonld"]
      },
      "application/lgr+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lgr"]
      },
      "application/link-format": {
        source: "iana"
      },
      "application/load-control+xml": {
        source: "iana",
        compressible: true
      },
      "application/lost+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lostxml"]
      },
      "application/lostsync+xml": {
        source: "iana",
        compressible: true
      },
      "application/lpf+zip": {
        source: "iana",
        compressible: false
      },
      "application/lxf": {
        source: "iana"
      },
      "application/mac-binhex40": {
        source: "iana",
        extensions: ["hqx"]
      },
      "application/mac-compactpro": {
        source: "apache",
        extensions: ["cpt"]
      },
      "application/macwriteii": {
        source: "iana"
      },
      "application/mads+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mads"]
      },
      "application/manifest+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["webmanifest"]
      },
      "application/marc": {
        source: "iana",
        extensions: ["mrc"]
      },
      "application/marcxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mrcx"]
      },
      "application/mathematica": {
        source: "iana",
        extensions: ["ma", "nb", "mb"]
      },
      "application/mathml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mathml"]
      },
      "application/mathml-content+xml": {
        source: "iana",
        compressible: true
      },
      "application/mathml-presentation+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-associated-procedure-description+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-deregister+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-envelope+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-msk+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-msk-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-protection-description+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-reception-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-register+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-register-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-schedule+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-user-service-description+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbox": {
        source: "iana",
        extensions: ["mbox"]
      },
      "application/media-policy-dataset+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpf"]
      },
      "application/media_control+xml": {
        source: "iana",
        compressible: true
      },
      "application/mediaservercontrol+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mscml"]
      },
      "application/merge-patch+json": {
        source: "iana",
        compressible: true
      },
      "application/metalink+xml": {
        source: "apache",
        compressible: true,
        extensions: ["metalink"]
      },
      "application/metalink4+xml": {
        source: "iana",
        compressible: true,
        extensions: ["meta4"]
      },
      "application/mets+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mets"]
      },
      "application/mf4": {
        source: "iana"
      },
      "application/mikey": {
        source: "iana"
      },
      "application/mipc": {
        source: "iana"
      },
      "application/missing-blocks+cbor-seq": {
        source: "iana"
      },
      "application/mmt-aei+xml": {
        source: "iana",
        compressible: true,
        extensions: ["maei"]
      },
      "application/mmt-usd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["musd"]
      },
      "application/mods+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mods"]
      },
      "application/moss-keys": {
        source: "iana"
      },
      "application/moss-signature": {
        source: "iana"
      },
      "application/mosskey-data": {
        source: "iana"
      },
      "application/mosskey-request": {
        source: "iana"
      },
      "application/mp21": {
        source: "iana",
        extensions: ["m21", "mp21"]
      },
      "application/mp4": {
        source: "iana",
        extensions: ["mp4s", "m4p"]
      },
      "application/mpeg4-generic": {
        source: "iana"
      },
      "application/mpeg4-iod": {
        source: "iana"
      },
      "application/mpeg4-iod-xmt": {
        source: "iana"
      },
      "application/mrb-consumer+xml": {
        source: "iana",
        compressible: true
      },
      "application/mrb-publish+xml": {
        source: "iana",
        compressible: true
      },
      "application/msc-ivr+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/msc-mixer+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/msword": {
        source: "iana",
        compressible: false,
        extensions: ["doc", "dot"]
      },
      "application/mud+json": {
        source: "iana",
        compressible: true
      },
      "application/multipart-core": {
        source: "iana"
      },
      "application/mxf": {
        source: "iana",
        extensions: ["mxf"]
      },
      "application/n-quads": {
        source: "iana",
        extensions: ["nq"]
      },
      "application/n-triples": {
        source: "iana",
        extensions: ["nt"]
      },
      "application/nasdata": {
        source: "iana"
      },
      "application/news-checkgroups": {
        source: "iana",
        charset: "US-ASCII"
      },
      "application/news-groupinfo": {
        source: "iana",
        charset: "US-ASCII"
      },
      "application/news-transmission": {
        source: "iana"
      },
      "application/nlsml+xml": {
        source: "iana",
        compressible: true
      },
      "application/node": {
        source: "iana",
        extensions: ["cjs"]
      },
      "application/nss": {
        source: "iana"
      },
      "application/oauth-authz-req+jwt": {
        source: "iana"
      },
      "application/oblivious-dns-message": {
        source: "iana"
      },
      "application/ocsp-request": {
        source: "iana"
      },
      "application/ocsp-response": {
        source: "iana"
      },
      "application/octet-stream": {
        source: "iana",
        compressible: false,
        extensions: ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"]
      },
      "application/oda": {
        source: "iana",
        extensions: ["oda"]
      },
      "application/odm+xml": {
        source: "iana",
        compressible: true
      },
      "application/odx": {
        source: "iana"
      },
      "application/oebps-package+xml": {
        source: "iana",
        compressible: true,
        extensions: ["opf"]
      },
      "application/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["ogx"]
      },
      "application/omdoc+xml": {
        source: "apache",
        compressible: true,
        extensions: ["omdoc"]
      },
      "application/onenote": {
        source: "apache",
        extensions: ["onetoc", "onetoc2", "onetmp", "onepkg"]
      },
      "application/opc-nodeset+xml": {
        source: "iana",
        compressible: true
      },
      "application/oscore": {
        source: "iana"
      },
      "application/oxps": {
        source: "iana",
        extensions: ["oxps"]
      },
      "application/p21": {
        source: "iana"
      },
      "application/p21+zip": {
        source: "iana",
        compressible: false
      },
      "application/p2p-overlay+xml": {
        source: "iana",
        compressible: true,
        extensions: ["relo"]
      },
      "application/parityfec": {
        source: "iana"
      },
      "application/passport": {
        source: "iana"
      },
      "application/patch-ops-error+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xer"]
      },
      "application/pdf": {
        source: "iana",
        compressible: false,
        extensions: ["pdf"]
      },
      "application/pdx": {
        source: "iana"
      },
      "application/pem-certificate-chain": {
        source: "iana"
      },
      "application/pgp-encrypted": {
        source: "iana",
        compressible: false,
        extensions: ["pgp"]
      },
      "application/pgp-keys": {
        source: "iana",
        extensions: ["asc"]
      },
      "application/pgp-signature": {
        source: "iana",
        extensions: ["asc", "sig"]
      },
      "application/pics-rules": {
        source: "apache",
        extensions: ["prf"]
      },
      "application/pidf+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/pidf-diff+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/pkcs10": {
        source: "iana",
        extensions: ["p10"]
      },
      "application/pkcs12": {
        source: "iana"
      },
      "application/pkcs7-mime": {
        source: "iana",
        extensions: ["p7m", "p7c"]
      },
      "application/pkcs7-signature": {
        source: "iana",
        extensions: ["p7s"]
      },
      "application/pkcs8": {
        source: "iana",
        extensions: ["p8"]
      },
      "application/pkcs8-encrypted": {
        source: "iana"
      },
      "application/pkix-attr-cert": {
        source: "iana",
        extensions: ["ac"]
      },
      "application/pkix-cert": {
        source: "iana",
        extensions: ["cer"]
      },
      "application/pkix-crl": {
        source: "iana",
        extensions: ["crl"]
      },
      "application/pkix-pkipath": {
        source: "iana",
        extensions: ["pkipath"]
      },
      "application/pkixcmp": {
        source: "iana",
        extensions: ["pki"]
      },
      "application/pls+xml": {
        source: "iana",
        compressible: true,
        extensions: ["pls"]
      },
      "application/poc-settings+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/postscript": {
        source: "iana",
        compressible: true,
        extensions: ["ai", "eps", "ps"]
      },
      "application/ppsp-tracker+json": {
        source: "iana",
        compressible: true
      },
      "application/problem+json": {
        source: "iana",
        compressible: true
      },
      "application/problem+xml": {
        source: "iana",
        compressible: true
      },
      "application/provenance+xml": {
        source: "iana",
        compressible: true,
        extensions: ["provx"]
      },
      "application/prs.alvestrand.titrax-sheet": {
        source: "iana"
      },
      "application/prs.cww": {
        source: "iana",
        extensions: ["cww"]
      },
      "application/prs.cyn": {
        source: "iana",
        charset: "7-BIT"
      },
      "application/prs.hpub+zip": {
        source: "iana",
        compressible: false
      },
      "application/prs.nprend": {
        source: "iana"
      },
      "application/prs.plucker": {
        source: "iana"
      },
      "application/prs.rdf-xml-crypt": {
        source: "iana"
      },
      "application/prs.xsf+xml": {
        source: "iana",
        compressible: true
      },
      "application/pskc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["pskcxml"]
      },
      "application/pvd+json": {
        source: "iana",
        compressible: true
      },
      "application/qsig": {
        source: "iana"
      },
      "application/raml+yaml": {
        compressible: true,
        extensions: ["raml"]
      },
      "application/raptorfec": {
        source: "iana"
      },
      "application/rdap+json": {
        source: "iana",
        compressible: true
      },
      "application/rdf+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rdf", "owl"]
      },
      "application/reginfo+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rif"]
      },
      "application/relax-ng-compact-syntax": {
        source: "iana",
        extensions: ["rnc"]
      },
      "application/remote-printing": {
        source: "iana"
      },
      "application/reputon+json": {
        source: "iana",
        compressible: true
      },
      "application/resource-lists+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rl"]
      },
      "application/resource-lists-diff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rld"]
      },
      "application/rfc+xml": {
        source: "iana",
        compressible: true
      },
      "application/riscos": {
        source: "iana"
      },
      "application/rlmi+xml": {
        source: "iana",
        compressible: true
      },
      "application/rls-services+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rs"]
      },
      "application/route-apd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rapd"]
      },
      "application/route-s-tsid+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sls"]
      },
      "application/route-usd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rusd"]
      },
      "application/rpki-ghostbusters": {
        source: "iana",
        extensions: ["gbr"]
      },
      "application/rpki-manifest": {
        source: "iana",
        extensions: ["mft"]
      },
      "application/rpki-publication": {
        source: "iana"
      },
      "application/rpki-roa": {
        source: "iana",
        extensions: ["roa"]
      },
      "application/rpki-updown": {
        source: "iana"
      },
      "application/rsd+xml": {
        source: "apache",
        compressible: true,
        extensions: ["rsd"]
      },
      "application/rss+xml": {
        source: "apache",
        compressible: true,
        extensions: ["rss"]
      },
      "application/rtf": {
        source: "iana",
        compressible: true,
        extensions: ["rtf"]
      },
      "application/rtploopback": {
        source: "iana"
      },
      "application/rtx": {
        source: "iana"
      },
      "application/samlassertion+xml": {
        source: "iana",
        compressible: true
      },
      "application/samlmetadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/sarif+json": {
        source: "iana",
        compressible: true
      },
      "application/sarif-external-properties+json": {
        source: "iana",
        compressible: true
      },
      "application/sbe": {
        source: "iana"
      },
      "application/sbml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sbml"]
      },
      "application/scaip+xml": {
        source: "iana",
        compressible: true
      },
      "application/scim+json": {
        source: "iana",
        compressible: true
      },
      "application/scvp-cv-request": {
        source: "iana",
        extensions: ["scq"]
      },
      "application/scvp-cv-response": {
        source: "iana",
        extensions: ["scs"]
      },
      "application/scvp-vp-request": {
        source: "iana",
        extensions: ["spq"]
      },
      "application/scvp-vp-response": {
        source: "iana",
        extensions: ["spp"]
      },
      "application/sdp": {
        source: "iana",
        extensions: ["sdp"]
      },
      "application/secevent+jwt": {
        source: "iana"
      },
      "application/senml+cbor": {
        source: "iana"
      },
      "application/senml+json": {
        source: "iana",
        compressible: true
      },
      "application/senml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["senmlx"]
      },
      "application/senml-etch+cbor": {
        source: "iana"
      },
      "application/senml-etch+json": {
        source: "iana",
        compressible: true
      },
      "application/senml-exi": {
        source: "iana"
      },
      "application/sensml+cbor": {
        source: "iana"
      },
      "application/sensml+json": {
        source: "iana",
        compressible: true
      },
      "application/sensml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sensmlx"]
      },
      "application/sensml-exi": {
        source: "iana"
      },
      "application/sep+xml": {
        source: "iana",
        compressible: true
      },
      "application/sep-exi": {
        source: "iana"
      },
      "application/session-info": {
        source: "iana"
      },
      "application/set-payment": {
        source: "iana"
      },
      "application/set-payment-initiation": {
        source: "iana",
        extensions: ["setpay"]
      },
      "application/set-registration": {
        source: "iana"
      },
      "application/set-registration-initiation": {
        source: "iana",
        extensions: ["setreg"]
      },
      "application/sgml": {
        source: "iana"
      },
      "application/sgml-open-catalog": {
        source: "iana"
      },
      "application/shf+xml": {
        source: "iana",
        compressible: true,
        extensions: ["shf"]
      },
      "application/sieve": {
        source: "iana",
        extensions: ["siv", "sieve"]
      },
      "application/simple-filter+xml": {
        source: "iana",
        compressible: true
      },
      "application/simple-message-summary": {
        source: "iana"
      },
      "application/simplesymbolcontainer": {
        source: "iana"
      },
      "application/sipc": {
        source: "iana"
      },
      "application/slate": {
        source: "iana"
      },
      "application/smil": {
        source: "iana"
      },
      "application/smil+xml": {
        source: "iana",
        compressible: true,
        extensions: ["smi", "smil"]
      },
      "application/smpte336m": {
        source: "iana"
      },
      "application/soap+fastinfoset": {
        source: "iana"
      },
      "application/soap+xml": {
        source: "iana",
        compressible: true
      },
      "application/sparql-query": {
        source: "iana",
        extensions: ["rq"]
      },
      "application/sparql-results+xml": {
        source: "iana",
        compressible: true,
        extensions: ["srx"]
      },
      "application/spdx+json": {
        source: "iana",
        compressible: true
      },
      "application/spirits-event+xml": {
        source: "iana",
        compressible: true
      },
      "application/sql": {
        source: "iana"
      },
      "application/srgs": {
        source: "iana",
        extensions: ["gram"]
      },
      "application/srgs+xml": {
        source: "iana",
        compressible: true,
        extensions: ["grxml"]
      },
      "application/sru+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sru"]
      },
      "application/ssdl+xml": {
        source: "apache",
        compressible: true,
        extensions: ["ssdl"]
      },
      "application/ssml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ssml"]
      },
      "application/stix+json": {
        source: "iana",
        compressible: true
      },
      "application/swid+xml": {
        source: "iana",
        compressible: true,
        extensions: ["swidtag"]
      },
      "application/tamp-apex-update": {
        source: "iana"
      },
      "application/tamp-apex-update-confirm": {
        source: "iana"
      },
      "application/tamp-community-update": {
        source: "iana"
      },
      "application/tamp-community-update-confirm": {
        source: "iana"
      },
      "application/tamp-error": {
        source: "iana"
      },
      "application/tamp-sequence-adjust": {
        source: "iana"
      },
      "application/tamp-sequence-adjust-confirm": {
        source: "iana"
      },
      "application/tamp-status-query": {
        source: "iana"
      },
      "application/tamp-status-response": {
        source: "iana"
      },
      "application/tamp-update": {
        source: "iana"
      },
      "application/tamp-update-confirm": {
        source: "iana"
      },
      "application/tar": {
        compressible: true
      },
      "application/taxii+json": {
        source: "iana",
        compressible: true
      },
      "application/td+json": {
        source: "iana",
        compressible: true
      },
      "application/tei+xml": {
        source: "iana",
        compressible: true,
        extensions: ["tei", "teicorpus"]
      },
      "application/tetra_isi": {
        source: "iana"
      },
      "application/thraud+xml": {
        source: "iana",
        compressible: true,
        extensions: ["tfi"]
      },
      "application/timestamp-query": {
        source: "iana"
      },
      "application/timestamp-reply": {
        source: "iana"
      },
      "application/timestamped-data": {
        source: "iana",
        extensions: ["tsd"]
      },
      "application/tlsrpt+gzip": {
        source: "iana"
      },
      "application/tlsrpt+json": {
        source: "iana",
        compressible: true
      },
      "application/tnauthlist": {
        source: "iana"
      },
      "application/token-introspection+jwt": {
        source: "iana"
      },
      "application/toml": {
        compressible: true,
        extensions: ["toml"]
      },
      "application/trickle-ice-sdpfrag": {
        source: "iana"
      },
      "application/trig": {
        source: "iana",
        extensions: ["trig"]
      },
      "application/ttml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ttml"]
      },
      "application/tve-trigger": {
        source: "iana"
      },
      "application/tzif": {
        source: "iana"
      },
      "application/tzif-leap": {
        source: "iana"
      },
      "application/ubjson": {
        compressible: false,
        extensions: ["ubj"]
      },
      "application/ulpfec": {
        source: "iana"
      },
      "application/urc-grpsheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/urc-ressheet+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rsheet"]
      },
      "application/urc-targetdesc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["td"]
      },
      "application/urc-uisocketdesc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vcard+json": {
        source: "iana",
        compressible: true
      },
      "application/vcard+xml": {
        source: "iana",
        compressible: true
      },
      "application/vemmi": {
        source: "iana"
      },
      "application/vividence.scriptfile": {
        source: "apache"
      },
      "application/vnd.1000minds.decision-model+xml": {
        source: "iana",
        compressible: true,
        extensions: ["1km"]
      },
      "application/vnd.3gpp-prose+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp-prose-pc3ch+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp-v2x-local-service-information": {
        source: "iana"
      },
      "application/vnd.3gpp.5gnas": {
        source: "iana"
      },
      "application/vnd.3gpp.access-transfer-events+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.bsf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.gmop+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.gtpc": {
        source: "iana"
      },
      "application/vnd.3gpp.interworking-data": {
        source: "iana"
      },
      "application/vnd.3gpp.lpp": {
        source: "iana"
      },
      "application/vnd.3gpp.mc-signalling-ear": {
        source: "iana"
      },
      "application/vnd.3gpp.mcdata-affiliation-command+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-payload": {
        source: "iana"
      },
      "application/vnd.3gpp.mcdata-service-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-signalling": {
        source: "iana"
      },
      "application/vnd.3gpp.mcdata-ue-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-user-profile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-affiliation-command+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-floor-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-location-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-mbms-usage-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-service-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-signed+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-ue-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-ue-init-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-user-profile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-affiliation-command+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-affiliation-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-location-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-mbms-usage-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-service-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-transmission-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-ue-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-user-profile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mid-call+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.ngap": {
        source: "iana"
      },
      "application/vnd.3gpp.pfcp": {
        source: "iana"
      },
      "application/vnd.3gpp.pic-bw-large": {
        source: "iana",
        extensions: ["plb"]
      },
      "application/vnd.3gpp.pic-bw-small": {
        source: "iana",
        extensions: ["psb"]
      },
      "application/vnd.3gpp.pic-bw-var": {
        source: "iana",
        extensions: ["pvb"]
      },
      "application/vnd.3gpp.s1ap": {
        source: "iana"
      },
      "application/vnd.3gpp.sms": {
        source: "iana"
      },
      "application/vnd.3gpp.sms+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.srvcc-ext+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.srvcc-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.state-and-event-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.ussd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp2.bcmcsinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp2.sms": {
        source: "iana"
      },
      "application/vnd.3gpp2.tcap": {
        source: "iana",
        extensions: ["tcap"]
      },
      "application/vnd.3lightssoftware.imagescal": {
        source: "iana"
      },
      "application/vnd.3m.post-it-notes": {
        source: "iana",
        extensions: ["pwn"]
      },
      "application/vnd.accpac.simply.aso": {
        source: "iana",
        extensions: ["aso"]
      },
      "application/vnd.accpac.simply.imp": {
        source: "iana",
        extensions: ["imp"]
      },
      "application/vnd.acucobol": {
        source: "iana",
        extensions: ["acu"]
      },
      "application/vnd.acucorp": {
        source: "iana",
        extensions: ["atc", "acutc"]
      },
      "application/vnd.adobe.air-application-installer-package+zip": {
        source: "apache",
        compressible: false,
        extensions: ["air"]
      },
      "application/vnd.adobe.flash.movie": {
        source: "iana"
      },
      "application/vnd.adobe.formscentral.fcdt": {
        source: "iana",
        extensions: ["fcdt"]
      },
      "application/vnd.adobe.fxp": {
        source: "iana",
        extensions: ["fxp", "fxpl"]
      },
      "application/vnd.adobe.partial-upload": {
        source: "iana"
      },
      "application/vnd.adobe.xdp+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdp"]
      },
      "application/vnd.adobe.xfdf": {
        source: "iana",
        extensions: ["xfdf"]
      },
      "application/vnd.aether.imp": {
        source: "iana"
      },
      "application/vnd.afpc.afplinedata": {
        source: "iana"
      },
      "application/vnd.afpc.afplinedata-pagedef": {
        source: "iana"
      },
      "application/vnd.afpc.cmoca-cmresource": {
        source: "iana"
      },
      "application/vnd.afpc.foca-charset": {
        source: "iana"
      },
      "application/vnd.afpc.foca-codedfont": {
        source: "iana"
      },
      "application/vnd.afpc.foca-codepage": {
        source: "iana"
      },
      "application/vnd.afpc.modca": {
        source: "iana"
      },
      "application/vnd.afpc.modca-cmtable": {
        source: "iana"
      },
      "application/vnd.afpc.modca-formdef": {
        source: "iana"
      },
      "application/vnd.afpc.modca-mediummap": {
        source: "iana"
      },
      "application/vnd.afpc.modca-objectcontainer": {
        source: "iana"
      },
      "application/vnd.afpc.modca-overlay": {
        source: "iana"
      },
      "application/vnd.afpc.modca-pagesegment": {
        source: "iana"
      },
      "application/vnd.age": {
        source: "iana",
        extensions: ["age"]
      },
      "application/vnd.ah-barcode": {
        source: "iana"
      },
      "application/vnd.ahead.space": {
        source: "iana",
        extensions: ["ahead"]
      },
      "application/vnd.airzip.filesecure.azf": {
        source: "iana",
        extensions: ["azf"]
      },
      "application/vnd.airzip.filesecure.azs": {
        source: "iana",
        extensions: ["azs"]
      },
      "application/vnd.amadeus+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.amazon.ebook": {
        source: "apache",
        extensions: ["azw"]
      },
      "application/vnd.amazon.mobi8-ebook": {
        source: "iana"
      },
      "application/vnd.americandynamics.acc": {
        source: "iana",
        extensions: ["acc"]
      },
      "application/vnd.amiga.ami": {
        source: "iana",
        extensions: ["ami"]
      },
      "application/vnd.amundsen.maze+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.android.ota": {
        source: "iana"
      },
      "application/vnd.android.package-archive": {
        source: "apache",
        compressible: false,
        extensions: ["apk"]
      },
      "application/vnd.anki": {
        source: "iana"
      },
      "application/vnd.anser-web-certificate-issue-initiation": {
        source: "iana",
        extensions: ["cii"]
      },
      "application/vnd.anser-web-funds-transfer-initiation": {
        source: "apache",
        extensions: ["fti"]
      },
      "application/vnd.antix.game-component": {
        source: "iana",
        extensions: ["atx"]
      },
      "application/vnd.apache.arrow.file": {
        source: "iana"
      },
      "application/vnd.apache.arrow.stream": {
        source: "iana"
      },
      "application/vnd.apache.thrift.binary": {
        source: "iana"
      },
      "application/vnd.apache.thrift.compact": {
        source: "iana"
      },
      "application/vnd.apache.thrift.json": {
        source: "iana"
      },
      "application/vnd.api+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.aplextor.warrp+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.apothekende.reservation+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.apple.installer+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpkg"]
      },
      "application/vnd.apple.keynote": {
        source: "iana",
        extensions: ["key"]
      },
      "application/vnd.apple.mpegurl": {
        source: "iana",
        extensions: ["m3u8"]
      },
      "application/vnd.apple.numbers": {
        source: "iana",
        extensions: ["numbers"]
      },
      "application/vnd.apple.pages": {
        source: "iana",
        extensions: ["pages"]
      },
      "application/vnd.apple.pkpass": {
        compressible: false,
        extensions: ["pkpass"]
      },
      "application/vnd.arastra.swi": {
        source: "iana"
      },
      "application/vnd.aristanetworks.swi": {
        source: "iana",
        extensions: ["swi"]
      },
      "application/vnd.artisan+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.artsquare": {
        source: "iana"
      },
      "application/vnd.astraea-software.iota": {
        source: "iana",
        extensions: ["iota"]
      },
      "application/vnd.audiograph": {
        source: "iana",
        extensions: ["aep"]
      },
      "application/vnd.autopackage": {
        source: "iana"
      },
      "application/vnd.avalon+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.avistar+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.balsamiq.bmml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["bmml"]
      },
      "application/vnd.balsamiq.bmpr": {
        source: "iana"
      },
      "application/vnd.banana-accounting": {
        source: "iana"
      },
      "application/vnd.bbf.usp.error": {
        source: "iana"
      },
      "application/vnd.bbf.usp.msg": {
        source: "iana"
      },
      "application/vnd.bbf.usp.msg+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.bekitzur-stech+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.bint.med-content": {
        source: "iana"
      },
      "application/vnd.biopax.rdf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.blink-idb-value-wrapper": {
        source: "iana"
      },
      "application/vnd.blueice.multipass": {
        source: "iana",
        extensions: ["mpm"]
      },
      "application/vnd.bluetooth.ep.oob": {
        source: "iana"
      },
      "application/vnd.bluetooth.le.oob": {
        source: "iana"
      },
      "application/vnd.bmi": {
        source: "iana",
        extensions: ["bmi"]
      },
      "application/vnd.bpf": {
        source: "iana"
      },
      "application/vnd.bpf3": {
        source: "iana"
      },
      "application/vnd.businessobjects": {
        source: "iana",
        extensions: ["rep"]
      },
      "application/vnd.byu.uapi+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cab-jscript": {
        source: "iana"
      },
      "application/vnd.canon-cpdl": {
        source: "iana"
      },
      "application/vnd.canon-lips": {
        source: "iana"
      },
      "application/vnd.capasystems-pg+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cendio.thinlinc.clientconf": {
        source: "iana"
      },
      "application/vnd.century-systems.tcp_stream": {
        source: "iana"
      },
      "application/vnd.chemdraw+xml": {
        source: "iana",
        compressible: true,
        extensions: ["cdxml"]
      },
      "application/vnd.chess-pgn": {
        source: "iana"
      },
      "application/vnd.chipnuts.karaoke-mmd": {
        source: "iana",
        extensions: ["mmd"]
      },
      "application/vnd.ciedi": {
        source: "iana"
      },
      "application/vnd.cinderella": {
        source: "iana",
        extensions: ["cdy"]
      },
      "application/vnd.cirpack.isdn-ext": {
        source: "iana"
      },
      "application/vnd.citationstyles.style+xml": {
        source: "iana",
        compressible: true,
        extensions: ["csl"]
      },
      "application/vnd.claymore": {
        source: "iana",
        extensions: ["cla"]
      },
      "application/vnd.cloanto.rp9": {
        source: "iana",
        extensions: ["rp9"]
      },
      "application/vnd.clonk.c4group": {
        source: "iana",
        extensions: ["c4g", "c4d", "c4f", "c4p", "c4u"]
      },
      "application/vnd.cluetrust.cartomobile-config": {
        source: "iana",
        extensions: ["c11amc"]
      },
      "application/vnd.cluetrust.cartomobile-config-pkg": {
        source: "iana",
        extensions: ["c11amz"]
      },
      "application/vnd.coffeescript": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.document": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.document-template": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.presentation": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.presentation-template": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.spreadsheet": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.spreadsheet-template": {
        source: "iana"
      },
      "application/vnd.collection+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.collection.doc+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.collection.next+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.comicbook+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.comicbook-rar": {
        source: "iana"
      },
      "application/vnd.commerce-battelle": {
        source: "iana"
      },
      "application/vnd.commonspace": {
        source: "iana",
        extensions: ["csp"]
      },
      "application/vnd.contact.cmsg": {
        source: "iana",
        extensions: ["cdbcmsg"]
      },
      "application/vnd.coreos.ignition+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cosmocaller": {
        source: "iana",
        extensions: ["cmc"]
      },
      "application/vnd.crick.clicker": {
        source: "iana",
        extensions: ["clkx"]
      },
      "application/vnd.crick.clicker.keyboard": {
        source: "iana",
        extensions: ["clkk"]
      },
      "application/vnd.crick.clicker.palette": {
        source: "iana",
        extensions: ["clkp"]
      },
      "application/vnd.crick.clicker.template": {
        source: "iana",
        extensions: ["clkt"]
      },
      "application/vnd.crick.clicker.wordbank": {
        source: "iana",
        extensions: ["clkw"]
      },
      "application/vnd.criticaltools.wbs+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wbs"]
      },
      "application/vnd.cryptii.pipe+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.crypto-shade-file": {
        source: "iana"
      },
      "application/vnd.cryptomator.encrypted": {
        source: "iana"
      },
      "application/vnd.cryptomator.vault": {
        source: "iana"
      },
      "application/vnd.ctc-posml": {
        source: "iana",
        extensions: ["pml"]
      },
      "application/vnd.ctct.ws+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cups-pdf": {
        source: "iana"
      },
      "application/vnd.cups-postscript": {
        source: "iana"
      },
      "application/vnd.cups-ppd": {
        source: "iana",
        extensions: ["ppd"]
      },
      "application/vnd.cups-raster": {
        source: "iana"
      },
      "application/vnd.cups-raw": {
        source: "iana"
      },
      "application/vnd.curl": {
        source: "iana"
      },
      "application/vnd.curl.car": {
        source: "apache",
        extensions: ["car"]
      },
      "application/vnd.curl.pcurl": {
        source: "apache",
        extensions: ["pcurl"]
      },
      "application/vnd.cyan.dean.root+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cybank": {
        source: "iana"
      },
      "application/vnd.cyclonedx+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cyclonedx+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.d2l.coursepackage1p0+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.d3m-dataset": {
        source: "iana"
      },
      "application/vnd.d3m-problem": {
        source: "iana"
      },
      "application/vnd.dart": {
        source: "iana",
        compressible: true,
        extensions: ["dart"]
      },
      "application/vnd.data-vision.rdz": {
        source: "iana",
        extensions: ["rdz"]
      },
      "application/vnd.datapackage+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dataresource+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dbf": {
        source: "iana",
        extensions: ["dbf"]
      },
      "application/vnd.debian.binary-package": {
        source: "iana"
      },
      "application/vnd.dece.data": {
        source: "iana",
        extensions: ["uvf", "uvvf", "uvd", "uvvd"]
      },
      "application/vnd.dece.ttml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["uvt", "uvvt"]
      },
      "application/vnd.dece.unspecified": {
        source: "iana",
        extensions: ["uvx", "uvvx"]
      },
      "application/vnd.dece.zip": {
        source: "iana",
        extensions: ["uvz", "uvvz"]
      },
      "application/vnd.denovo.fcselayout-link": {
        source: "iana",
        extensions: ["fe_launch"]
      },
      "application/vnd.desmume.movie": {
        source: "iana"
      },
      "application/vnd.dir-bi.plate-dl-nosuffix": {
        source: "iana"
      },
      "application/vnd.dm.delegation+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dna": {
        source: "iana",
        extensions: ["dna"]
      },
      "application/vnd.document+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dolby.mlp": {
        source: "apache",
        extensions: ["mlp"]
      },
      "application/vnd.dolby.mobile.1": {
        source: "iana"
      },
      "application/vnd.dolby.mobile.2": {
        source: "iana"
      },
      "application/vnd.doremir.scorecloud-binary-document": {
        source: "iana"
      },
      "application/vnd.dpgraph": {
        source: "iana",
        extensions: ["dpg"]
      },
      "application/vnd.dreamfactory": {
        source: "iana",
        extensions: ["dfac"]
      },
      "application/vnd.drive+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ds-keypoint": {
        source: "apache",
        extensions: ["kpxx"]
      },
      "application/vnd.dtg.local": {
        source: "iana"
      },
      "application/vnd.dtg.local.flash": {
        source: "iana"
      },
      "application/vnd.dtg.local.html": {
        source: "iana"
      },
      "application/vnd.dvb.ait": {
        source: "iana",
        extensions: ["ait"]
      },
      "application/vnd.dvb.dvbisl+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.dvbj": {
        source: "iana"
      },
      "application/vnd.dvb.esgcontainer": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcdftnotifaccess": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcesgaccess": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcesgaccess2": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcesgpdd": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcroaming": {
        source: "iana"
      },
      "application/vnd.dvb.iptv.alfec-base": {
        source: "iana"
      },
      "application/vnd.dvb.iptv.alfec-enhancement": {
        source: "iana"
      },
      "application/vnd.dvb.notif-aggregate-root+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-container+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-generic+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-ia-msglist+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-ia-registration-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-ia-registration-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-init+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.pfr": {
        source: "iana"
      },
      "application/vnd.dvb.service": {
        source: "iana",
        extensions: ["svc"]
      },
      "application/vnd.dxr": {
        source: "iana"
      },
      "application/vnd.dynageo": {
        source: "iana",
        extensions: ["geo"]
      },
      "application/vnd.dzr": {
        source: "iana"
      },
      "application/vnd.easykaraoke.cdgdownload": {
        source: "iana"
      },
      "application/vnd.ecdis-update": {
        source: "iana"
      },
      "application/vnd.ecip.rlp": {
        source: "iana"
      },
      "application/vnd.eclipse.ditto+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ecowin.chart": {
        source: "iana",
        extensions: ["mag"]
      },
      "application/vnd.ecowin.filerequest": {
        source: "iana"
      },
      "application/vnd.ecowin.fileupdate": {
        source: "iana"
      },
      "application/vnd.ecowin.series": {
        source: "iana"
      },
      "application/vnd.ecowin.seriesrequest": {
        source: "iana"
      },
      "application/vnd.ecowin.seriesupdate": {
        source: "iana"
      },
      "application/vnd.efi.img": {
        source: "iana"
      },
      "application/vnd.efi.iso": {
        source: "iana"
      },
      "application/vnd.emclient.accessrequest+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.enliven": {
        source: "iana",
        extensions: ["nml"]
      },
      "application/vnd.enphase.envoy": {
        source: "iana"
      },
      "application/vnd.eprints.data+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.epson.esf": {
        source: "iana",
        extensions: ["esf"]
      },
      "application/vnd.epson.msf": {
        source: "iana",
        extensions: ["msf"]
      },
      "application/vnd.epson.quickanime": {
        source: "iana",
        extensions: ["qam"]
      },
      "application/vnd.epson.salt": {
        source: "iana",
        extensions: ["slt"]
      },
      "application/vnd.epson.ssf": {
        source: "iana",
        extensions: ["ssf"]
      },
      "application/vnd.ericsson.quickcall": {
        source: "iana"
      },
      "application/vnd.espass-espass+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.eszigno3+xml": {
        source: "iana",
        compressible: true,
        extensions: ["es3", "et3"]
      },
      "application/vnd.etsi.aoc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.asic-e+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.etsi.asic-s+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.etsi.cug+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvcommand+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvdiscovery+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsad-bc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsad-cod+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsad-npvr+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvservice+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsync+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvueprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.mcid+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.mheg5": {
        source: "iana"
      },
      "application/vnd.etsi.overload-control-policy-dataset+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.pstn+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.sci+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.simservs+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.timestamp-token": {
        source: "iana"
      },
      "application/vnd.etsi.tsl+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.tsl.der": {
        source: "iana"
      },
      "application/vnd.eu.kasparian.car+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.eudora.data": {
        source: "iana"
      },
      "application/vnd.evolv.ecig.profile": {
        source: "iana"
      },
      "application/vnd.evolv.ecig.settings": {
        source: "iana"
      },
      "application/vnd.evolv.ecig.theme": {
        source: "iana"
      },
      "application/vnd.exstream-empower+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.exstream-package": {
        source: "iana"
      },
      "application/vnd.ezpix-album": {
        source: "iana",
        extensions: ["ez2"]
      },
      "application/vnd.ezpix-package": {
        source: "iana",
        extensions: ["ez3"]
      },
      "application/vnd.f-secure.mobile": {
        source: "iana"
      },
      "application/vnd.familysearch.gedcom+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.fastcopy-disk-image": {
        source: "iana"
      },
      "application/vnd.fdf": {
        source: "iana",
        extensions: ["fdf"]
      },
      "application/vnd.fdsn.mseed": {
        source: "iana",
        extensions: ["mseed"]
      },
      "application/vnd.fdsn.seed": {
        source: "iana",
        extensions: ["seed", "dataless"]
      },
      "application/vnd.ffsns": {
        source: "iana"
      },
      "application/vnd.ficlab.flb+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.filmit.zfc": {
        source: "iana"
      },
      "application/vnd.fints": {
        source: "iana"
      },
      "application/vnd.firemonkeys.cloudcell": {
        source: "iana"
      },
      "application/vnd.flographit": {
        source: "iana",
        extensions: ["gph"]
      },
      "application/vnd.fluxtime.clip": {
        source: "iana",
        extensions: ["ftc"]
      },
      "application/vnd.font-fontforge-sfd": {
        source: "iana"
      },
      "application/vnd.framemaker": {
        source: "iana",
        extensions: ["fm", "frame", "maker", "book"]
      },
      "application/vnd.frogans.fnc": {
        source: "iana",
        extensions: ["fnc"]
      },
      "application/vnd.frogans.ltf": {
        source: "iana",
        extensions: ["ltf"]
      },
      "application/vnd.fsc.weblaunch": {
        source: "iana",
        extensions: ["fsc"]
      },
      "application/vnd.fujifilm.fb.docuworks": {
        source: "iana"
      },
      "application/vnd.fujifilm.fb.docuworks.binder": {
        source: "iana"
      },
      "application/vnd.fujifilm.fb.docuworks.container": {
        source: "iana"
      },
      "application/vnd.fujifilm.fb.jfi+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.fujitsu.oasys": {
        source: "iana",
        extensions: ["oas"]
      },
      "application/vnd.fujitsu.oasys2": {
        source: "iana",
        extensions: ["oa2"]
      },
      "application/vnd.fujitsu.oasys3": {
        source: "iana",
        extensions: ["oa3"]
      },
      "application/vnd.fujitsu.oasysgp": {
        source: "iana",
        extensions: ["fg5"]
      },
      "application/vnd.fujitsu.oasysprs": {
        source: "iana",
        extensions: ["bh2"]
      },
      "application/vnd.fujixerox.art-ex": {
        source: "iana"
      },
      "application/vnd.fujixerox.art4": {
        source: "iana"
      },
      "application/vnd.fujixerox.ddd": {
        source: "iana",
        extensions: ["ddd"]
      },
      "application/vnd.fujixerox.docuworks": {
        source: "iana",
        extensions: ["xdw"]
      },
      "application/vnd.fujixerox.docuworks.binder": {
        source: "iana",
        extensions: ["xbd"]
      },
      "application/vnd.fujixerox.docuworks.container": {
        source: "iana"
      },
      "application/vnd.fujixerox.hbpl": {
        source: "iana"
      },
      "application/vnd.fut-misnet": {
        source: "iana"
      },
      "application/vnd.futoin+cbor": {
        source: "iana"
      },
      "application/vnd.futoin+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.fuzzysheet": {
        source: "iana",
        extensions: ["fzs"]
      },
      "application/vnd.genomatix.tuxedo": {
        source: "iana",
        extensions: ["txd"]
      },
      "application/vnd.gentics.grd+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.geo+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.geocube+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.geogebra.file": {
        source: "iana",
        extensions: ["ggb"]
      },
      "application/vnd.geogebra.slides": {
        source: "iana"
      },
      "application/vnd.geogebra.tool": {
        source: "iana",
        extensions: ["ggt"]
      },
      "application/vnd.geometry-explorer": {
        source: "iana",
        extensions: ["gex", "gre"]
      },
      "application/vnd.geonext": {
        source: "iana",
        extensions: ["gxt"]
      },
      "application/vnd.geoplan": {
        source: "iana",
        extensions: ["g2w"]
      },
      "application/vnd.geospace": {
        source: "iana",
        extensions: ["g3w"]
      },
      "application/vnd.gerber": {
        source: "iana"
      },
      "application/vnd.globalplatform.card-content-mgt": {
        source: "iana"
      },
      "application/vnd.globalplatform.card-content-mgt-response": {
        source: "iana"
      },
      "application/vnd.gmx": {
        source: "iana",
        extensions: ["gmx"]
      },
      "application/vnd.google-apps.document": {
        compressible: false,
        extensions: ["gdoc"]
      },
      "application/vnd.google-apps.presentation": {
        compressible: false,
        extensions: ["gslides"]
      },
      "application/vnd.google-apps.spreadsheet": {
        compressible: false,
        extensions: ["gsheet"]
      },
      "application/vnd.google-earth.kml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["kml"]
      },
      "application/vnd.google-earth.kmz": {
        source: "iana",
        compressible: false,
        extensions: ["kmz"]
      },
      "application/vnd.gov.sk.e-form+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.gov.sk.e-form+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.gov.sk.xmldatacontainer+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.grafeq": {
        source: "iana",
        extensions: ["gqf", "gqs"]
      },
      "application/vnd.gridmp": {
        source: "iana"
      },
      "application/vnd.groove-account": {
        source: "iana",
        extensions: ["gac"]
      },
      "application/vnd.groove-help": {
        source: "iana",
        extensions: ["ghf"]
      },
      "application/vnd.groove-identity-message": {
        source: "iana",
        extensions: ["gim"]
      },
      "application/vnd.groove-injector": {
        source: "iana",
        extensions: ["grv"]
      },
      "application/vnd.groove-tool-message": {
        source: "iana",
        extensions: ["gtm"]
      },
      "application/vnd.groove-tool-template": {
        source: "iana",
        extensions: ["tpl"]
      },
      "application/vnd.groove-vcard": {
        source: "iana",
        extensions: ["vcg"]
      },
      "application/vnd.hal+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hal+xml": {
        source: "iana",
        compressible: true,
        extensions: ["hal"]
      },
      "application/vnd.handheld-entertainment+xml": {
        source: "iana",
        compressible: true,
        extensions: ["zmm"]
      },
      "application/vnd.hbci": {
        source: "iana",
        extensions: ["hbci"]
      },
      "application/vnd.hc+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hcl-bireports": {
        source: "iana"
      },
      "application/vnd.hdt": {
        source: "iana"
      },
      "application/vnd.heroku+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hhe.lesson-player": {
        source: "iana",
        extensions: ["les"]
      },
      "application/vnd.hl7cda+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.hl7v2+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.hp-hpgl": {
        source: "iana",
        extensions: ["hpgl"]
      },
      "application/vnd.hp-hpid": {
        source: "iana",
        extensions: ["hpid"]
      },
      "application/vnd.hp-hps": {
        source: "iana",
        extensions: ["hps"]
      },
      "application/vnd.hp-jlyt": {
        source: "iana",
        extensions: ["jlt"]
      },
      "application/vnd.hp-pcl": {
        source: "iana",
        extensions: ["pcl"]
      },
      "application/vnd.hp-pclxl": {
        source: "iana",
        extensions: ["pclxl"]
      },
      "application/vnd.httphone": {
        source: "iana"
      },
      "application/vnd.hydrostatix.sof-data": {
        source: "iana",
        extensions: ["sfd-hdstx"]
      },
      "application/vnd.hyper+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hyper-item+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hyperdrive+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hzn-3d-crossword": {
        source: "iana"
      },
      "application/vnd.ibm.afplinedata": {
        source: "iana"
      },
      "application/vnd.ibm.electronic-media": {
        source: "iana"
      },
      "application/vnd.ibm.minipay": {
        source: "iana",
        extensions: ["mpy"]
      },
      "application/vnd.ibm.modcap": {
        source: "iana",
        extensions: ["afp", "listafp", "list3820"]
      },
      "application/vnd.ibm.rights-management": {
        source: "iana",
        extensions: ["irm"]
      },
      "application/vnd.ibm.secure-container": {
        source: "iana",
        extensions: ["sc"]
      },
      "application/vnd.iccprofile": {
        source: "iana",
        extensions: ["icc", "icm"]
      },
      "application/vnd.ieee.1905": {
        source: "iana"
      },
      "application/vnd.igloader": {
        source: "iana",
        extensions: ["igl"]
      },
      "application/vnd.imagemeter.folder+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.imagemeter.image+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.immervision-ivp": {
        source: "iana",
        extensions: ["ivp"]
      },
      "application/vnd.immervision-ivu": {
        source: "iana",
        extensions: ["ivu"]
      },
      "application/vnd.ims.imsccv1p1": {
        source: "iana"
      },
      "application/vnd.ims.imsccv1p2": {
        source: "iana"
      },
      "application/vnd.ims.imsccv1p3": {
        source: "iana"
      },
      "application/vnd.ims.lis.v2.result+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolconsumerprofile+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolproxy+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolproxy.id+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolsettings+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolsettings.simple+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.informedcontrol.rms+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.informix-visionary": {
        source: "iana"
      },
      "application/vnd.infotech.project": {
        source: "iana"
      },
      "application/vnd.infotech.project+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.innopath.wamp.notification": {
        source: "iana"
      },
      "application/vnd.insors.igm": {
        source: "iana",
        extensions: ["igm"]
      },
      "application/vnd.intercon.formnet": {
        source: "iana",
        extensions: ["xpw", "xpx"]
      },
      "application/vnd.intergeo": {
        source: "iana",
        extensions: ["i2g"]
      },
      "application/vnd.intertrust.digibox": {
        source: "iana"
      },
      "application/vnd.intertrust.nncp": {
        source: "iana"
      },
      "application/vnd.intu.qbo": {
        source: "iana",
        extensions: ["qbo"]
      },
      "application/vnd.intu.qfx": {
        source: "iana",
        extensions: ["qfx"]
      },
      "application/vnd.iptc.g2.catalogitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.conceptitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.knowledgeitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.newsitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.newsmessage+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.packageitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.planningitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ipunplugged.rcprofile": {
        source: "iana",
        extensions: ["rcprofile"]
      },
      "application/vnd.irepository.package+xml": {
        source: "iana",
        compressible: true,
        extensions: ["irp"]
      },
      "application/vnd.is-xpr": {
        source: "iana",
        extensions: ["xpr"]
      },
      "application/vnd.isac.fcs": {
        source: "iana",
        extensions: ["fcs"]
      },
      "application/vnd.iso11783-10+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.jam": {
        source: "iana",
        extensions: ["jam"]
      },
      "application/vnd.japannet-directory-service": {
        source: "iana"
      },
      "application/vnd.japannet-jpnstore-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-payment-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-registration": {
        source: "iana"
      },
      "application/vnd.japannet-registration-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-setstore-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-verification": {
        source: "iana"
      },
      "application/vnd.japannet-verification-wakeup": {
        source: "iana"
      },
      "application/vnd.jcp.javame.midlet-rms": {
        source: "iana",
        extensions: ["rms"]
      },
      "application/vnd.jisp": {
        source: "iana",
        extensions: ["jisp"]
      },
      "application/vnd.joost.joda-archive": {
        source: "iana",
        extensions: ["joda"]
      },
      "application/vnd.jsk.isdn-ngn": {
        source: "iana"
      },
      "application/vnd.kahootz": {
        source: "iana",
        extensions: ["ktz", "ktr"]
      },
      "application/vnd.kde.karbon": {
        source: "iana",
        extensions: ["karbon"]
      },
      "application/vnd.kde.kchart": {
        source: "iana",
        extensions: ["chrt"]
      },
      "application/vnd.kde.kformula": {
        source: "iana",
        extensions: ["kfo"]
      },
      "application/vnd.kde.kivio": {
        source: "iana",
        extensions: ["flw"]
      },
      "application/vnd.kde.kontour": {
        source: "iana",
        extensions: ["kon"]
      },
      "application/vnd.kde.kpresenter": {
        source: "iana",
        extensions: ["kpr", "kpt"]
      },
      "application/vnd.kde.kspread": {
        source: "iana",
        extensions: ["ksp"]
      },
      "application/vnd.kde.kword": {
        source: "iana",
        extensions: ["kwd", "kwt"]
      },
      "application/vnd.kenameaapp": {
        source: "iana",
        extensions: ["htke"]
      },
      "application/vnd.kidspiration": {
        source: "iana",
        extensions: ["kia"]
      },
      "application/vnd.kinar": {
        source: "iana",
        extensions: ["kne", "knp"]
      },
      "application/vnd.koan": {
        source: "iana",
        extensions: ["skp", "skd", "skt", "skm"]
      },
      "application/vnd.kodak-descriptor": {
        source: "iana",
        extensions: ["sse"]
      },
      "application/vnd.las": {
        source: "iana"
      },
      "application/vnd.las.las+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.las.las+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lasxml"]
      },
      "application/vnd.laszip": {
        source: "iana"
      },
      "application/vnd.leap+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.liberty-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.llamagraphics.life-balance.desktop": {
        source: "iana",
        extensions: ["lbd"]
      },
      "application/vnd.llamagraphics.life-balance.exchange+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lbe"]
      },
      "application/vnd.logipipe.circuit+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.loom": {
        source: "iana"
      },
      "application/vnd.lotus-1-2-3": {
        source: "iana",
        extensions: ["123"]
      },
      "application/vnd.lotus-approach": {
        source: "iana",
        extensions: ["apr"]
      },
      "application/vnd.lotus-freelance": {
        source: "iana",
        extensions: ["pre"]
      },
      "application/vnd.lotus-notes": {
        source: "iana",
        extensions: ["nsf"]
      },
      "application/vnd.lotus-organizer": {
        source: "iana",
        extensions: ["org"]
      },
      "application/vnd.lotus-screencam": {
        source: "iana",
        extensions: ["scm"]
      },
      "application/vnd.lotus-wordpro": {
        source: "iana",
        extensions: ["lwp"]
      },
      "application/vnd.macports.portpkg": {
        source: "iana",
        extensions: ["portpkg"]
      },
      "application/vnd.mapbox-vector-tile": {
        source: "iana",
        extensions: ["mvt"]
      },
      "application/vnd.marlin.drm.actiontoken+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.marlin.drm.conftoken+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.marlin.drm.license+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.marlin.drm.mdcf": {
        source: "iana"
      },
      "application/vnd.mason+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.maxar.archive.3tz+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.maxmind.maxmind-db": {
        source: "iana"
      },
      "application/vnd.mcd": {
        source: "iana",
        extensions: ["mcd"]
      },
      "application/vnd.medcalcdata": {
        source: "iana",
        extensions: ["mc1"]
      },
      "application/vnd.mediastation.cdkey": {
        source: "iana",
        extensions: ["cdkey"]
      },
      "application/vnd.meridian-slingshot": {
        source: "iana"
      },
      "application/vnd.mfer": {
        source: "iana",
        extensions: ["mwf"]
      },
      "application/vnd.mfmp": {
        source: "iana",
        extensions: ["mfm"]
      },
      "application/vnd.micro+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.micrografx.flo": {
        source: "iana",
        extensions: ["flo"]
      },
      "application/vnd.micrografx.igx": {
        source: "iana",
        extensions: ["igx"]
      },
      "application/vnd.microsoft.portable-executable": {
        source: "iana"
      },
      "application/vnd.microsoft.windows.thumbnail-cache": {
        source: "iana"
      },
      "application/vnd.miele+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.mif": {
        source: "iana",
        extensions: ["mif"]
      },
      "application/vnd.minisoft-hp3000-save": {
        source: "iana"
      },
      "application/vnd.mitsubishi.misty-guard.trustweb": {
        source: "iana"
      },
      "application/vnd.mobius.daf": {
        source: "iana",
        extensions: ["daf"]
      },
      "application/vnd.mobius.dis": {
        source: "iana",
        extensions: ["dis"]
      },
      "application/vnd.mobius.mbk": {
        source: "iana",
        extensions: ["mbk"]
      },
      "application/vnd.mobius.mqy": {
        source: "iana",
        extensions: ["mqy"]
      },
      "application/vnd.mobius.msl": {
        source: "iana",
        extensions: ["msl"]
      },
      "application/vnd.mobius.plc": {
        source: "iana",
        extensions: ["plc"]
      },
      "application/vnd.mobius.txf": {
        source: "iana",
        extensions: ["txf"]
      },
      "application/vnd.mophun.application": {
        source: "iana",
        extensions: ["mpn"]
      },
      "application/vnd.mophun.certificate": {
        source: "iana",
        extensions: ["mpc"]
      },
      "application/vnd.motorola.flexsuite": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.adsi": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.fis": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.gotap": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.kmr": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.ttc": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.wem": {
        source: "iana"
      },
      "application/vnd.motorola.iprm": {
        source: "iana"
      },
      "application/vnd.mozilla.xul+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xul"]
      },
      "application/vnd.ms-3mfdocument": {
        source: "iana"
      },
      "application/vnd.ms-artgalry": {
        source: "iana",
        extensions: ["cil"]
      },
      "application/vnd.ms-asf": {
        source: "iana"
      },
      "application/vnd.ms-cab-compressed": {
        source: "iana",
        extensions: ["cab"]
      },
      "application/vnd.ms-color.iccprofile": {
        source: "apache"
      },
      "application/vnd.ms-excel": {
        source: "iana",
        compressible: false,
        extensions: ["xls", "xlm", "xla", "xlc", "xlt", "xlw"]
      },
      "application/vnd.ms-excel.addin.macroenabled.12": {
        source: "iana",
        extensions: ["xlam"]
      },
      "application/vnd.ms-excel.sheet.binary.macroenabled.12": {
        source: "iana",
        extensions: ["xlsb"]
      },
      "application/vnd.ms-excel.sheet.macroenabled.12": {
        source: "iana",
        extensions: ["xlsm"]
      },
      "application/vnd.ms-excel.template.macroenabled.12": {
        source: "iana",
        extensions: ["xltm"]
      },
      "application/vnd.ms-fontobject": {
        source: "iana",
        compressible: true,
        extensions: ["eot"]
      },
      "application/vnd.ms-htmlhelp": {
        source: "iana",
        extensions: ["chm"]
      },
      "application/vnd.ms-ims": {
        source: "iana",
        extensions: ["ims"]
      },
      "application/vnd.ms-lrm": {
        source: "iana",
        extensions: ["lrm"]
      },
      "application/vnd.ms-office.activex+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-officetheme": {
        source: "iana",
        extensions: ["thmx"]
      },
      "application/vnd.ms-opentype": {
        source: "apache",
        compressible: true
      },
      "application/vnd.ms-outlook": {
        compressible: false,
        extensions: ["msg"]
      },
      "application/vnd.ms-package.obfuscated-opentype": {
        source: "apache"
      },
      "application/vnd.ms-pki.seccat": {
        source: "apache",
        extensions: ["cat"]
      },
      "application/vnd.ms-pki.stl": {
        source: "apache",
        extensions: ["stl"]
      },
      "application/vnd.ms-playready.initiator+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-powerpoint": {
        source: "iana",
        compressible: false,
        extensions: ["ppt", "pps", "pot"]
      },
      "application/vnd.ms-powerpoint.addin.macroenabled.12": {
        source: "iana",
        extensions: ["ppam"]
      },
      "application/vnd.ms-powerpoint.presentation.macroenabled.12": {
        source: "iana",
        extensions: ["pptm"]
      },
      "application/vnd.ms-powerpoint.slide.macroenabled.12": {
        source: "iana",
        extensions: ["sldm"]
      },
      "application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
        source: "iana",
        extensions: ["ppsm"]
      },
      "application/vnd.ms-powerpoint.template.macroenabled.12": {
        source: "iana",
        extensions: ["potm"]
      },
      "application/vnd.ms-printdevicecapabilities+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-printing.printticket+xml": {
        source: "apache",
        compressible: true
      },
      "application/vnd.ms-printschematicket+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-project": {
        source: "iana",
        extensions: ["mpp", "mpt"]
      },
      "application/vnd.ms-tnef": {
        source: "iana"
      },
      "application/vnd.ms-windows.devicepairing": {
        source: "iana"
      },
      "application/vnd.ms-windows.nwprinting.oob": {
        source: "iana"
      },
      "application/vnd.ms-windows.printerpairing": {
        source: "iana"
      },
      "application/vnd.ms-windows.wsd.oob": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.lic-chlg-req": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.lic-resp": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.meter-chlg-req": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.meter-resp": {
        source: "iana"
      },
      "application/vnd.ms-word.document.macroenabled.12": {
        source: "iana",
        extensions: ["docm"]
      },
      "application/vnd.ms-word.template.macroenabled.12": {
        source: "iana",
        extensions: ["dotm"]
      },
      "application/vnd.ms-works": {
        source: "iana",
        extensions: ["wps", "wks", "wcm", "wdb"]
      },
      "application/vnd.ms-wpl": {
        source: "iana",
        extensions: ["wpl"]
      },
      "application/vnd.ms-xpsdocument": {
        source: "iana",
        compressible: false,
        extensions: ["xps"]
      },
      "application/vnd.msa-disk-image": {
        source: "iana"
      },
      "application/vnd.mseq": {
        source: "iana",
        extensions: ["mseq"]
      },
      "application/vnd.msign": {
        source: "iana"
      },
      "application/vnd.multiad.creator": {
        source: "iana"
      },
      "application/vnd.multiad.creator.cif": {
        source: "iana"
      },
      "application/vnd.music-niff": {
        source: "iana"
      },
      "application/vnd.musician": {
        source: "iana",
        extensions: ["mus"]
      },
      "application/vnd.muvee.style": {
        source: "iana",
        extensions: ["msty"]
      },
      "application/vnd.mynfc": {
        source: "iana",
        extensions: ["taglet"]
      },
      "application/vnd.nacamar.ybrid+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ncd.control": {
        source: "iana"
      },
      "application/vnd.ncd.reference": {
        source: "iana"
      },
      "application/vnd.nearst.inv+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nebumind.line": {
        source: "iana"
      },
      "application/vnd.nervana": {
        source: "iana"
      },
      "application/vnd.netfpx": {
        source: "iana"
      },
      "application/vnd.neurolanguage.nlu": {
        source: "iana",
        extensions: ["nlu"]
      },
      "application/vnd.nimn": {
        source: "iana"
      },
      "application/vnd.nintendo.nitro.rom": {
        source: "iana"
      },
      "application/vnd.nintendo.snes.rom": {
        source: "iana"
      },
      "application/vnd.nitf": {
        source: "iana",
        extensions: ["ntf", "nitf"]
      },
      "application/vnd.noblenet-directory": {
        source: "iana",
        extensions: ["nnd"]
      },
      "application/vnd.noblenet-sealer": {
        source: "iana",
        extensions: ["nns"]
      },
      "application/vnd.noblenet-web": {
        source: "iana",
        extensions: ["nnw"]
      },
      "application/vnd.nokia.catalogs": {
        source: "iana"
      },
      "application/vnd.nokia.conml+wbxml": {
        source: "iana"
      },
      "application/vnd.nokia.conml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.iptv.config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.isds-radio-presets": {
        source: "iana"
      },
      "application/vnd.nokia.landmark+wbxml": {
        source: "iana"
      },
      "application/vnd.nokia.landmark+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.landmarkcollection+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.n-gage.ac+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ac"]
      },
      "application/vnd.nokia.n-gage.data": {
        source: "iana",
        extensions: ["ngdat"]
      },
      "application/vnd.nokia.n-gage.symbian.install": {
        source: "iana",
        extensions: ["n-gage"]
      },
      "application/vnd.nokia.ncd": {
        source: "iana"
      },
      "application/vnd.nokia.pcd+wbxml": {
        source: "iana"
      },
      "application/vnd.nokia.pcd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.radio-preset": {
        source: "iana",
        extensions: ["rpst"]
      },
      "application/vnd.nokia.radio-presets": {
        source: "iana",
        extensions: ["rpss"]
      },
      "application/vnd.novadigm.edm": {
        source: "iana",
        extensions: ["edm"]
      },
      "application/vnd.novadigm.edx": {
        source: "iana",
        extensions: ["edx"]
      },
      "application/vnd.novadigm.ext": {
        source: "iana",
        extensions: ["ext"]
      },
      "application/vnd.ntt-local.content-share": {
        source: "iana"
      },
      "application/vnd.ntt-local.file-transfer": {
        source: "iana"
      },
      "application/vnd.ntt-local.ogw_remote-access": {
        source: "iana"
      },
      "application/vnd.ntt-local.sip-ta_remote": {
        source: "iana"
      },
      "application/vnd.ntt-local.sip-ta_tcp_stream": {
        source: "iana"
      },
      "application/vnd.oasis.opendocument.chart": {
        source: "iana",
        extensions: ["odc"]
      },
      "application/vnd.oasis.opendocument.chart-template": {
        source: "iana",
        extensions: ["otc"]
      },
      "application/vnd.oasis.opendocument.database": {
        source: "iana",
        extensions: ["odb"]
      },
      "application/vnd.oasis.opendocument.formula": {
        source: "iana",
        extensions: ["odf"]
      },
      "application/vnd.oasis.opendocument.formula-template": {
        source: "iana",
        extensions: ["odft"]
      },
      "application/vnd.oasis.opendocument.graphics": {
        source: "iana",
        compressible: false,
        extensions: ["odg"]
      },
      "application/vnd.oasis.opendocument.graphics-template": {
        source: "iana",
        extensions: ["otg"]
      },
      "application/vnd.oasis.opendocument.image": {
        source: "iana",
        extensions: ["odi"]
      },
      "application/vnd.oasis.opendocument.image-template": {
        source: "iana",
        extensions: ["oti"]
      },
      "application/vnd.oasis.opendocument.presentation": {
        source: "iana",
        compressible: false,
        extensions: ["odp"]
      },
      "application/vnd.oasis.opendocument.presentation-template": {
        source: "iana",
        extensions: ["otp"]
      },
      "application/vnd.oasis.opendocument.spreadsheet": {
        source: "iana",
        compressible: false,
        extensions: ["ods"]
      },
      "application/vnd.oasis.opendocument.spreadsheet-template": {
        source: "iana",
        extensions: ["ots"]
      },
      "application/vnd.oasis.opendocument.text": {
        source: "iana",
        compressible: false,
        extensions: ["odt"]
      },
      "application/vnd.oasis.opendocument.text-master": {
        source: "iana",
        extensions: ["odm"]
      },
      "application/vnd.oasis.opendocument.text-template": {
        source: "iana",
        extensions: ["ott"]
      },
      "application/vnd.oasis.opendocument.text-web": {
        source: "iana",
        extensions: ["oth"]
      },
      "application/vnd.obn": {
        source: "iana"
      },
      "application/vnd.ocf+cbor": {
        source: "iana"
      },
      "application/vnd.oci.image.manifest.v1+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oftn.l10n+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.contentaccessdownload+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.contentaccessstreaming+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.cspg-hexbinary": {
        source: "iana"
      },
      "application/vnd.oipf.dae.svg+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.dae.xhtml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.mippvcontrolmessage+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.pae.gem": {
        source: "iana"
      },
      "application/vnd.oipf.spdiscovery+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.spdlist+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.ueprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.userprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.olpc-sugar": {
        source: "iana",
        extensions: ["xo"]
      },
      "application/vnd.oma-scws-config": {
        source: "iana"
      },
      "application/vnd.oma-scws-http-request": {
        source: "iana"
      },
      "application/vnd.oma-scws-http-response": {
        source: "iana"
      },
      "application/vnd.oma.bcast.associated-procedure-parameter+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.drm-trigger+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.imd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.ltkm": {
        source: "iana"
      },
      "application/vnd.oma.bcast.notification+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.provisioningtrigger": {
        source: "iana"
      },
      "application/vnd.oma.bcast.sgboot": {
        source: "iana"
      },
      "application/vnd.oma.bcast.sgdd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.sgdu": {
        source: "iana"
      },
      "application/vnd.oma.bcast.simple-symbol-container": {
        source: "iana"
      },
      "application/vnd.oma.bcast.smartcard-trigger+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.sprov+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.stkm": {
        source: "iana"
      },
      "application/vnd.oma.cab-address-book+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-feature-handler+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-pcc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-subs-invite+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-user-prefs+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.dcd": {
        source: "iana"
      },
      "application/vnd.oma.dcdc": {
        source: "iana"
      },
      "application/vnd.oma.dd2+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dd2"]
      },
      "application/vnd.oma.drm.risd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.group-usage-list+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.lwm2m+cbor": {
        source: "iana"
      },
      "application/vnd.oma.lwm2m+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.lwm2m+tlv": {
        source: "iana"
      },
      "application/vnd.oma.pal+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.detailed-progress-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.final-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.groups+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.invocation-descriptor+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.optimized-progress-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.push": {
        source: "iana"
      },
      "application/vnd.oma.scidm.messages+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.xcap-directory+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.omads-email+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.omads-file+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.omads-folder+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.omaloc-supl-init": {
        source: "iana"
      },
      "application/vnd.onepager": {
        source: "iana"
      },
      "application/vnd.onepagertamp": {
        source: "iana"
      },
      "application/vnd.onepagertamx": {
        source: "iana"
      },
      "application/vnd.onepagertat": {
        source: "iana"
      },
      "application/vnd.onepagertatp": {
        source: "iana"
      },
      "application/vnd.onepagertatx": {
        source: "iana"
      },
      "application/vnd.openblox.game+xml": {
        source: "iana",
        compressible: true,
        extensions: ["obgx"]
      },
      "application/vnd.openblox.game-binary": {
        source: "iana"
      },
      "application/vnd.openeye.oeb": {
        source: "iana"
      },
      "application/vnd.openofficeorg.extension": {
        source: "apache",
        extensions: ["oxt"]
      },
      "application/vnd.openstreetmap.data+xml": {
        source: "iana",
        compressible: true,
        extensions: ["osm"]
      },
      "application/vnd.opentimestamps.ots": {
        source: "iana"
      },
      "application/vnd.openxmlformats-officedocument.custom-properties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawing+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.extended-properties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
        source: "iana",
        compressible: false,
        extensions: ["pptx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slide": {
        source: "iana",
        extensions: ["sldx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
        source: "iana",
        extensions: ["ppsx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.template": {
        source: "iana",
        extensions: ["potx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
        source: "iana",
        compressible: false,
        extensions: ["xlsx"]
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
        source: "iana",
        extensions: ["xltx"]
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.theme+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.themeoverride+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.vmldrawing": {
        source: "iana"
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
        source: "iana",
        compressible: false,
        extensions: ["docx"]
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
        source: "iana",
        extensions: ["dotx"]
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-package.core-properties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-package.relationships+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oracle.resource+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.orange.indata": {
        source: "iana"
      },
      "application/vnd.osa.netdeploy": {
        source: "iana"
      },
      "application/vnd.osgeo.mapguide.package": {
        source: "iana",
        extensions: ["mgp"]
      },
      "application/vnd.osgi.bundle": {
        source: "iana"
      },
      "application/vnd.osgi.dp": {
        source: "iana",
        extensions: ["dp"]
      },
      "application/vnd.osgi.subsystem": {
        source: "iana",
        extensions: ["esa"]
      },
      "application/vnd.otps.ct-kip+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oxli.countgraph": {
        source: "iana"
      },
      "application/vnd.pagerduty+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.palm": {
        source: "iana",
        extensions: ["pdb", "pqa", "oprc"]
      },
      "application/vnd.panoply": {
        source: "iana"
      },
      "application/vnd.paos.xml": {
        source: "iana"
      },
      "application/vnd.patentdive": {
        source: "iana"
      },
      "application/vnd.patientecommsdoc": {
        source: "iana"
      },
      "application/vnd.pawaafile": {
        source: "iana",
        extensions: ["paw"]
      },
      "application/vnd.pcos": {
        source: "iana"
      },
      "application/vnd.pg.format": {
        source: "iana",
        extensions: ["str"]
      },
      "application/vnd.pg.osasli": {
        source: "iana",
        extensions: ["ei6"]
      },
      "application/vnd.piaccess.application-licence": {
        source: "iana"
      },
      "application/vnd.picsel": {
        source: "iana",
        extensions: ["efif"]
      },
      "application/vnd.pmi.widget": {
        source: "iana",
        extensions: ["wg"]
      },
      "application/vnd.poc.group-advertisement+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.pocketlearn": {
        source: "iana",
        extensions: ["plf"]
      },
      "application/vnd.powerbuilder6": {
        source: "iana",
        extensions: ["pbd"]
      },
      "application/vnd.powerbuilder6-s": {
        source: "iana"
      },
      "application/vnd.powerbuilder7": {
        source: "iana"
      },
      "application/vnd.powerbuilder7-s": {
        source: "iana"
      },
      "application/vnd.powerbuilder75": {
        source: "iana"
      },
      "application/vnd.powerbuilder75-s": {
        source: "iana"
      },
      "application/vnd.preminet": {
        source: "iana"
      },
      "application/vnd.previewsystems.box": {
        source: "iana",
        extensions: ["box"]
      },
      "application/vnd.proteus.magazine": {
        source: "iana",
        extensions: ["mgz"]
      },
      "application/vnd.psfs": {
        source: "iana"
      },
      "application/vnd.publishare-delta-tree": {
        source: "iana",
        extensions: ["qps"]
      },
      "application/vnd.pvi.ptid1": {
        source: "iana",
        extensions: ["ptid"]
      },
      "application/vnd.pwg-multiplexed": {
        source: "iana"
      },
      "application/vnd.pwg-xhtml-print+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.qualcomm.brew-app-res": {
        source: "iana"
      },
      "application/vnd.quarantainenet": {
        source: "iana"
      },
      "application/vnd.quark.quarkxpress": {
        source: "iana",
        extensions: ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"]
      },
      "application/vnd.quobject-quoxdocument": {
        source: "iana"
      },
      "application/vnd.radisys.moml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-conf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-conn+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-dialog+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-stream+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-conf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-base+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-fax-detect+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-group+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-speech+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-transform+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.rainstor.data": {
        source: "iana"
      },
      "application/vnd.rapid": {
        source: "iana"
      },
      "application/vnd.rar": {
        source: "iana",
        extensions: ["rar"]
      },
      "application/vnd.realvnc.bed": {
        source: "iana",
        extensions: ["bed"]
      },
      "application/vnd.recordare.musicxml": {
        source: "iana",
        extensions: ["mxl"]
      },
      "application/vnd.recordare.musicxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["musicxml"]
      },
      "application/vnd.renlearn.rlprint": {
        source: "iana"
      },
      "application/vnd.resilient.logic": {
        source: "iana"
      },
      "application/vnd.restful+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.rig.cryptonote": {
        source: "iana",
        extensions: ["cryptonote"]
      },
      "application/vnd.rim.cod": {
        source: "apache",
        extensions: ["cod"]
      },
      "application/vnd.rn-realmedia": {
        source: "apache",
        extensions: ["rm"]
      },
      "application/vnd.rn-realmedia-vbr": {
        source: "apache",
        extensions: ["rmvb"]
      },
      "application/vnd.route66.link66+xml": {
        source: "iana",
        compressible: true,
        extensions: ["link66"]
      },
      "application/vnd.rs-274x": {
        source: "iana"
      },
      "application/vnd.ruckus.download": {
        source: "iana"
      },
      "application/vnd.s3sms": {
        source: "iana"
      },
      "application/vnd.sailingtracker.track": {
        source: "iana",
        extensions: ["st"]
      },
      "application/vnd.sar": {
        source: "iana"
      },
      "application/vnd.sbm.cid": {
        source: "iana"
      },
      "application/vnd.sbm.mid2": {
        source: "iana"
      },
      "application/vnd.scribus": {
        source: "iana"
      },
      "application/vnd.sealed.3df": {
        source: "iana"
      },
      "application/vnd.sealed.csf": {
        source: "iana"
      },
      "application/vnd.sealed.doc": {
        source: "iana"
      },
      "application/vnd.sealed.eml": {
        source: "iana"
      },
      "application/vnd.sealed.mht": {
        source: "iana"
      },
      "application/vnd.sealed.net": {
        source: "iana"
      },
      "application/vnd.sealed.ppt": {
        source: "iana"
      },
      "application/vnd.sealed.tiff": {
        source: "iana"
      },
      "application/vnd.sealed.xls": {
        source: "iana"
      },
      "application/vnd.sealedmedia.softseal.html": {
        source: "iana"
      },
      "application/vnd.sealedmedia.softseal.pdf": {
        source: "iana"
      },
      "application/vnd.seemail": {
        source: "iana",
        extensions: ["see"]
      },
      "application/vnd.seis+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.sema": {
        source: "iana",
        extensions: ["sema"]
      },
      "application/vnd.semd": {
        source: "iana",
        extensions: ["semd"]
      },
      "application/vnd.semf": {
        source: "iana",
        extensions: ["semf"]
      },
      "application/vnd.shade-save-file": {
        source: "iana"
      },
      "application/vnd.shana.informed.formdata": {
        source: "iana",
        extensions: ["ifm"]
      },
      "application/vnd.shana.informed.formtemplate": {
        source: "iana",
        extensions: ["itp"]
      },
      "application/vnd.shana.informed.interchange": {
        source: "iana",
        extensions: ["iif"]
      },
      "application/vnd.shana.informed.package": {
        source: "iana",
        extensions: ["ipk"]
      },
      "application/vnd.shootproof+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.shopkick+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.shp": {
        source: "iana"
      },
      "application/vnd.shx": {
        source: "iana"
      },
      "application/vnd.sigrok.session": {
        source: "iana"
      },
      "application/vnd.simtech-mindmapper": {
        source: "iana",
        extensions: ["twd", "twds"]
      },
      "application/vnd.siren+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.smaf": {
        source: "iana",
        extensions: ["mmf"]
      },
      "application/vnd.smart.notebook": {
        source: "iana"
      },
      "application/vnd.smart.teacher": {
        source: "iana",
        extensions: ["teacher"]
      },
      "application/vnd.snesdev-page-table": {
        source: "iana"
      },
      "application/vnd.software602.filler.form+xml": {
        source: "iana",
        compressible: true,
        extensions: ["fo"]
      },
      "application/vnd.software602.filler.form-xml-zip": {
        source: "iana"
      },
      "application/vnd.solent.sdkm+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sdkm", "sdkd"]
      },
      "application/vnd.spotfire.dxp": {
        source: "iana",
        extensions: ["dxp"]
      },
      "application/vnd.spotfire.sfs": {
        source: "iana",
        extensions: ["sfs"]
      },
      "application/vnd.sqlite3": {
        source: "iana"
      },
      "application/vnd.sss-cod": {
        source: "iana"
      },
      "application/vnd.sss-dtf": {
        source: "iana"
      },
      "application/vnd.sss-ntf": {
        source: "iana"
      },
      "application/vnd.stardivision.calc": {
        source: "apache",
        extensions: ["sdc"]
      },
      "application/vnd.stardivision.draw": {
        source: "apache",
        extensions: ["sda"]
      },
      "application/vnd.stardivision.impress": {
        source: "apache",
        extensions: ["sdd"]
      },
      "application/vnd.stardivision.math": {
        source: "apache",
        extensions: ["smf"]
      },
      "application/vnd.stardivision.writer": {
        source: "apache",
        extensions: ["sdw", "vor"]
      },
      "application/vnd.stardivision.writer-global": {
        source: "apache",
        extensions: ["sgl"]
      },
      "application/vnd.stepmania.package": {
        source: "iana",
        extensions: ["smzip"]
      },
      "application/vnd.stepmania.stepchart": {
        source: "iana",
        extensions: ["sm"]
      },
      "application/vnd.street-stream": {
        source: "iana"
      },
      "application/vnd.sun.wadl+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wadl"]
      },
      "application/vnd.sun.xml.calc": {
        source: "apache",
        extensions: ["sxc"]
      },
      "application/vnd.sun.xml.calc.template": {
        source: "apache",
        extensions: ["stc"]
      },
      "application/vnd.sun.xml.draw": {
        source: "apache",
        extensions: ["sxd"]
      },
      "application/vnd.sun.xml.draw.template": {
        source: "apache",
        extensions: ["std"]
      },
      "application/vnd.sun.xml.impress": {
        source: "apache",
        extensions: ["sxi"]
      },
      "application/vnd.sun.xml.impress.template": {
        source: "apache",
        extensions: ["sti"]
      },
      "application/vnd.sun.xml.math": {
        source: "apache",
        extensions: ["sxm"]
      },
      "application/vnd.sun.xml.writer": {
        source: "apache",
        extensions: ["sxw"]
      },
      "application/vnd.sun.xml.writer.global": {
        source: "apache",
        extensions: ["sxg"]
      },
      "application/vnd.sun.xml.writer.template": {
        source: "apache",
        extensions: ["stw"]
      },
      "application/vnd.sus-calendar": {
        source: "iana",
        extensions: ["sus", "susp"]
      },
      "application/vnd.svd": {
        source: "iana",
        extensions: ["svd"]
      },
      "application/vnd.swiftview-ics": {
        source: "iana"
      },
      "application/vnd.sycle+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.syft+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.symbian.install": {
        source: "apache",
        extensions: ["sis", "sisx"]
      },
      "application/vnd.syncml+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["xsm"]
      },
      "application/vnd.syncml.dm+wbxml": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["bdm"]
      },
      "application/vnd.syncml.dm+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["xdm"]
      },
      "application/vnd.syncml.dm.notification": {
        source: "iana"
      },
      "application/vnd.syncml.dmddf+wbxml": {
        source: "iana"
      },
      "application/vnd.syncml.dmddf+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["ddf"]
      },
      "application/vnd.syncml.dmtnds+wbxml": {
        source: "iana"
      },
      "application/vnd.syncml.dmtnds+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.syncml.ds.notification": {
        source: "iana"
      },
      "application/vnd.tableschema+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.tao.intent-module-archive": {
        source: "iana",
        extensions: ["tao"]
      },
      "application/vnd.tcpdump.pcap": {
        source: "iana",
        extensions: ["pcap", "cap", "dmp"]
      },
      "application/vnd.think-cell.ppttc+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.tmd.mediaflex.api+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.tml": {
        source: "iana"
      },
      "application/vnd.tmobile-livetv": {
        source: "iana",
        extensions: ["tmo"]
      },
      "application/vnd.tri.onesource": {
        source: "iana"
      },
      "application/vnd.trid.tpt": {
        source: "iana",
        extensions: ["tpt"]
      },
      "application/vnd.triscape.mxs": {
        source: "iana",
        extensions: ["mxs"]
      },
      "application/vnd.trueapp": {
        source: "iana",
        extensions: ["tra"]
      },
      "application/vnd.truedoc": {
        source: "iana"
      },
      "application/vnd.ubisoft.webplayer": {
        source: "iana"
      },
      "application/vnd.ufdl": {
        source: "iana",
        extensions: ["ufd", "ufdl"]
      },
      "application/vnd.uiq.theme": {
        source: "iana",
        extensions: ["utz"]
      },
      "application/vnd.umajin": {
        source: "iana",
        extensions: ["umj"]
      },
      "application/vnd.unity": {
        source: "iana",
        extensions: ["unityweb"]
      },
      "application/vnd.uoml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["uoml"]
      },
      "application/vnd.uplanet.alert": {
        source: "iana"
      },
      "application/vnd.uplanet.alert-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.bearer-choice": {
        source: "iana"
      },
      "application/vnd.uplanet.bearer-choice-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.cacheop": {
        source: "iana"
      },
      "application/vnd.uplanet.cacheop-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.channel": {
        source: "iana"
      },
      "application/vnd.uplanet.channel-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.list": {
        source: "iana"
      },
      "application/vnd.uplanet.list-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.listcmd": {
        source: "iana"
      },
      "application/vnd.uplanet.listcmd-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.signal": {
        source: "iana"
      },
      "application/vnd.uri-map": {
        source: "iana"
      },
      "application/vnd.valve.source.material": {
        source: "iana"
      },
      "application/vnd.vcx": {
        source: "iana",
        extensions: ["vcx"]
      },
      "application/vnd.vd-study": {
        source: "iana"
      },
      "application/vnd.vectorworks": {
        source: "iana"
      },
      "application/vnd.vel+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.verimatrix.vcas": {
        source: "iana"
      },
      "application/vnd.veritone.aion+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.veryant.thin": {
        source: "iana"
      },
      "application/vnd.ves.encrypted": {
        source: "iana"
      },
      "application/vnd.vidsoft.vidconference": {
        source: "iana"
      },
      "application/vnd.visio": {
        source: "iana",
        extensions: ["vsd", "vst", "vss", "vsw"]
      },
      "application/vnd.visionary": {
        source: "iana",
        extensions: ["vis"]
      },
      "application/vnd.vividence.scriptfile": {
        source: "iana"
      },
      "application/vnd.vsf": {
        source: "iana",
        extensions: ["vsf"]
      },
      "application/vnd.wap.sic": {
        source: "iana"
      },
      "application/vnd.wap.slc": {
        source: "iana"
      },
      "application/vnd.wap.wbxml": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["wbxml"]
      },
      "application/vnd.wap.wmlc": {
        source: "iana",
        extensions: ["wmlc"]
      },
      "application/vnd.wap.wmlscriptc": {
        source: "iana",
        extensions: ["wmlsc"]
      },
      "application/vnd.webturbo": {
        source: "iana",
        extensions: ["wtb"]
      },
      "application/vnd.wfa.dpp": {
        source: "iana"
      },
      "application/vnd.wfa.p2p": {
        source: "iana"
      },
      "application/vnd.wfa.wsc": {
        source: "iana"
      },
      "application/vnd.windows.devicepairing": {
        source: "iana"
      },
      "application/vnd.wmc": {
        source: "iana"
      },
      "application/vnd.wmf.bootstrap": {
        source: "iana"
      },
      "application/vnd.wolfram.mathematica": {
        source: "iana"
      },
      "application/vnd.wolfram.mathematica.package": {
        source: "iana"
      },
      "application/vnd.wolfram.player": {
        source: "iana",
        extensions: ["nbp"]
      },
      "application/vnd.wordperfect": {
        source: "iana",
        extensions: ["wpd"]
      },
      "application/vnd.wqd": {
        source: "iana",
        extensions: ["wqd"]
      },
      "application/vnd.wrq-hp3000-labelled": {
        source: "iana"
      },
      "application/vnd.wt.stf": {
        source: "iana",
        extensions: ["stf"]
      },
      "application/vnd.wv.csp+wbxml": {
        source: "iana"
      },
      "application/vnd.wv.csp+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.wv.ssp+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.xacml+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.xara": {
        source: "iana",
        extensions: ["xar"]
      },
      "application/vnd.xfdl": {
        source: "iana",
        extensions: ["xfdl"]
      },
      "application/vnd.xfdl.webform": {
        source: "iana"
      },
      "application/vnd.xmi+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.xmpie.cpkg": {
        source: "iana"
      },
      "application/vnd.xmpie.dpkg": {
        source: "iana"
      },
      "application/vnd.xmpie.plan": {
        source: "iana"
      },
      "application/vnd.xmpie.ppkg": {
        source: "iana"
      },
      "application/vnd.xmpie.xlim": {
        source: "iana"
      },
      "application/vnd.yamaha.hv-dic": {
        source: "iana",
        extensions: ["hvd"]
      },
      "application/vnd.yamaha.hv-script": {
        source: "iana",
        extensions: ["hvs"]
      },
      "application/vnd.yamaha.hv-voice": {
        source: "iana",
        extensions: ["hvp"]
      },
      "application/vnd.yamaha.openscoreformat": {
        source: "iana",
        extensions: ["osf"]
      },
      "application/vnd.yamaha.openscoreformat.osfpvg+xml": {
        source: "iana",
        compressible: true,
        extensions: ["osfpvg"]
      },
      "application/vnd.yamaha.remote-setup": {
        source: "iana"
      },
      "application/vnd.yamaha.smaf-audio": {
        source: "iana",
        extensions: ["saf"]
      },
      "application/vnd.yamaha.smaf-phrase": {
        source: "iana",
        extensions: ["spf"]
      },
      "application/vnd.yamaha.through-ngn": {
        source: "iana"
      },
      "application/vnd.yamaha.tunnel-udpencap": {
        source: "iana"
      },
      "application/vnd.yaoweme": {
        source: "iana"
      },
      "application/vnd.yellowriver-custom-menu": {
        source: "iana",
        extensions: ["cmp"]
      },
      "application/vnd.youtube.yt": {
        source: "iana"
      },
      "application/vnd.zul": {
        source: "iana",
        extensions: ["zir", "zirz"]
      },
      "application/vnd.zzazz.deck+xml": {
        source: "iana",
        compressible: true,
        extensions: ["zaz"]
      },
      "application/voicexml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["vxml"]
      },
      "application/voucher-cms+json": {
        source: "iana",
        compressible: true
      },
      "application/vq-rtcpxr": {
        source: "iana"
      },
      "application/wasm": {
        source: "iana",
        compressible: true,
        extensions: ["wasm"]
      },
      "application/watcherinfo+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wif"]
      },
      "application/webpush-options+json": {
        source: "iana",
        compressible: true
      },
      "application/whoispp-query": {
        source: "iana"
      },
      "application/whoispp-response": {
        source: "iana"
      },
      "application/widget": {
        source: "iana",
        extensions: ["wgt"]
      },
      "application/winhlp": {
        source: "apache",
        extensions: ["hlp"]
      },
      "application/wita": {
        source: "iana"
      },
      "application/wordperfect5.1": {
        source: "iana"
      },
      "application/wsdl+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wsdl"]
      },
      "application/wspolicy+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wspolicy"]
      },
      "application/x-7z-compressed": {
        source: "apache",
        compressible: false,
        extensions: ["7z"]
      },
      "application/x-abiword": {
        source: "apache",
        extensions: ["abw"]
      },
      "application/x-ace-compressed": {
        source: "apache",
        extensions: ["ace"]
      },
      "application/x-amf": {
        source: "apache"
      },
      "application/x-apple-diskimage": {
        source: "apache",
        extensions: ["dmg"]
      },
      "application/x-arj": {
        compressible: false,
        extensions: ["arj"]
      },
      "application/x-authorware-bin": {
        source: "apache",
        extensions: ["aab", "x32", "u32", "vox"]
      },
      "application/x-authorware-map": {
        source: "apache",
        extensions: ["aam"]
      },
      "application/x-authorware-seg": {
        source: "apache",
        extensions: ["aas"]
      },
      "application/x-bcpio": {
        source: "apache",
        extensions: ["bcpio"]
      },
      "application/x-bdoc": {
        compressible: false,
        extensions: ["bdoc"]
      },
      "application/x-bittorrent": {
        source: "apache",
        extensions: ["torrent"]
      },
      "application/x-blorb": {
        source: "apache",
        extensions: ["blb", "blorb"]
      },
      "application/x-bzip": {
        source: "apache",
        compressible: false,
        extensions: ["bz"]
      },
      "application/x-bzip2": {
        source: "apache",
        compressible: false,
        extensions: ["bz2", "boz"]
      },
      "application/x-cbr": {
        source: "apache",
        extensions: ["cbr", "cba", "cbt", "cbz", "cb7"]
      },
      "application/x-cdlink": {
        source: "apache",
        extensions: ["vcd"]
      },
      "application/x-cfs-compressed": {
        source: "apache",
        extensions: ["cfs"]
      },
      "application/x-chat": {
        source: "apache",
        extensions: ["chat"]
      },
      "application/x-chess-pgn": {
        source: "apache",
        extensions: ["pgn"]
      },
      "application/x-chrome-extension": {
        extensions: ["crx"]
      },
      "application/x-cocoa": {
        source: "nginx",
        extensions: ["cco"]
      },
      "application/x-compress": {
        source: "apache"
      },
      "application/x-conference": {
        source: "apache",
        extensions: ["nsc"]
      },
      "application/x-cpio": {
        source: "apache",
        extensions: ["cpio"]
      },
      "application/x-csh": {
        source: "apache",
        extensions: ["csh"]
      },
      "application/x-deb": {
        compressible: false
      },
      "application/x-debian-package": {
        source: "apache",
        extensions: ["deb", "udeb"]
      },
      "application/x-dgc-compressed": {
        source: "apache",
        extensions: ["dgc"]
      },
      "application/x-director": {
        source: "apache",
        extensions: ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"]
      },
      "application/x-doom": {
        source: "apache",
        extensions: ["wad"]
      },
      "application/x-dtbncx+xml": {
        source: "apache",
        compressible: true,
        extensions: ["ncx"]
      },
      "application/x-dtbook+xml": {
        source: "apache",
        compressible: true,
        extensions: ["dtb"]
      },
      "application/x-dtbresource+xml": {
        source: "apache",
        compressible: true,
        extensions: ["res"]
      },
      "application/x-dvi": {
        source: "apache",
        compressible: false,
        extensions: ["dvi"]
      },
      "application/x-envoy": {
        source: "apache",
        extensions: ["evy"]
      },
      "application/x-eva": {
        source: "apache",
        extensions: ["eva"]
      },
      "application/x-font-bdf": {
        source: "apache",
        extensions: ["bdf"]
      },
      "application/x-font-dos": {
        source: "apache"
      },
      "application/x-font-framemaker": {
        source: "apache"
      },
      "application/x-font-ghostscript": {
        source: "apache",
        extensions: ["gsf"]
      },
      "application/x-font-libgrx": {
        source: "apache"
      },
      "application/x-font-linux-psf": {
        source: "apache",
        extensions: ["psf"]
      },
      "application/x-font-pcf": {
        source: "apache",
        extensions: ["pcf"]
      },
      "application/x-font-snf": {
        source: "apache",
        extensions: ["snf"]
      },
      "application/x-font-speedo": {
        source: "apache"
      },
      "application/x-font-sunos-news": {
        source: "apache"
      },
      "application/x-font-type1": {
        source: "apache",
        extensions: ["pfa", "pfb", "pfm", "afm"]
      },
      "application/x-font-vfont": {
        source: "apache"
      },
      "application/x-freearc": {
        source: "apache",
        extensions: ["arc"]
      },
      "application/x-futuresplash": {
        source: "apache",
        extensions: ["spl"]
      },
      "application/x-gca-compressed": {
        source: "apache",
        extensions: ["gca"]
      },
      "application/x-glulx": {
        source: "apache",
        extensions: ["ulx"]
      },
      "application/x-gnumeric": {
        source: "apache",
        extensions: ["gnumeric"]
      },
      "application/x-gramps-xml": {
        source: "apache",
        extensions: ["gramps"]
      },
      "application/x-gtar": {
        source: "apache",
        extensions: ["gtar"]
      },
      "application/x-gzip": {
        source: "apache"
      },
      "application/x-hdf": {
        source: "apache",
        extensions: ["hdf"]
      },
      "application/x-httpd-php": {
        compressible: true,
        extensions: ["php"]
      },
      "application/x-install-instructions": {
        source: "apache",
        extensions: ["install"]
      },
      "application/x-iso9660-image": {
        source: "apache",
        extensions: ["iso"]
      },
      "application/x-iwork-keynote-sffkey": {
        extensions: ["key"]
      },
      "application/x-iwork-numbers-sffnumbers": {
        extensions: ["numbers"]
      },
      "application/x-iwork-pages-sffpages": {
        extensions: ["pages"]
      },
      "application/x-java-archive-diff": {
        source: "nginx",
        extensions: ["jardiff"]
      },
      "application/x-java-jnlp-file": {
        source: "apache",
        compressible: false,
        extensions: ["jnlp"]
      },
      "application/x-javascript": {
        compressible: true
      },
      "application/x-keepass2": {
        extensions: ["kdbx"]
      },
      "application/x-latex": {
        source: "apache",
        compressible: false,
        extensions: ["latex"]
      },
      "application/x-lua-bytecode": {
        extensions: ["luac"]
      },
      "application/x-lzh-compressed": {
        source: "apache",
        extensions: ["lzh", "lha"]
      },
      "application/x-makeself": {
        source: "nginx",
        extensions: ["run"]
      },
      "application/x-mie": {
        source: "apache",
        extensions: ["mie"]
      },
      "application/x-mobipocket-ebook": {
        source: "apache",
        extensions: ["prc", "mobi"]
      },
      "application/x-mpegurl": {
        compressible: false
      },
      "application/x-ms-application": {
        source: "apache",
        extensions: ["application"]
      },
      "application/x-ms-shortcut": {
        source: "apache",
        extensions: ["lnk"]
      },
      "application/x-ms-wmd": {
        source: "apache",
        extensions: ["wmd"]
      },
      "application/x-ms-wmz": {
        source: "apache",
        extensions: ["wmz"]
      },
      "application/x-ms-xbap": {
        source: "apache",
        extensions: ["xbap"]
      },
      "application/x-msaccess": {
        source: "apache",
        extensions: ["mdb"]
      },
      "application/x-msbinder": {
        source: "apache",
        extensions: ["obd"]
      },
      "application/x-mscardfile": {
        source: "apache",
        extensions: ["crd"]
      },
      "application/x-msclip": {
        source: "apache",
        extensions: ["clp"]
      },
      "application/x-msdos-program": {
        extensions: ["exe"]
      },
      "application/x-msdownload": {
        source: "apache",
        extensions: ["exe", "dll", "com", "bat", "msi"]
      },
      "application/x-msmediaview": {
        source: "apache",
        extensions: ["mvb", "m13", "m14"]
      },
      "application/x-msmetafile": {
        source: "apache",
        extensions: ["wmf", "wmz", "emf", "emz"]
      },
      "application/x-msmoney": {
        source: "apache",
        extensions: ["mny"]
      },
      "application/x-mspublisher": {
        source: "apache",
        extensions: ["pub"]
      },
      "application/x-msschedule": {
        source: "apache",
        extensions: ["scd"]
      },
      "application/x-msterminal": {
        source: "apache",
        extensions: ["trm"]
      },
      "application/x-mswrite": {
        source: "apache",
        extensions: ["wri"]
      },
      "application/x-netcdf": {
        source: "apache",
        extensions: ["nc", "cdf"]
      },
      "application/x-ns-proxy-autoconfig": {
        compressible: true,
        extensions: ["pac"]
      },
      "application/x-nzb": {
        source: "apache",
        extensions: ["nzb"]
      },
      "application/x-perl": {
        source: "nginx",
        extensions: ["pl", "pm"]
      },
      "application/x-pilot": {
        source: "nginx",
        extensions: ["prc", "pdb"]
      },
      "application/x-pkcs12": {
        source: "apache",
        compressible: false,
        extensions: ["p12", "pfx"]
      },
      "application/x-pkcs7-certificates": {
        source: "apache",
        extensions: ["p7b", "spc"]
      },
      "application/x-pkcs7-certreqresp": {
        source: "apache",
        extensions: ["p7r"]
      },
      "application/x-pki-message": {
        source: "iana"
      },
      "application/x-rar-compressed": {
        source: "apache",
        compressible: false,
        extensions: ["rar"]
      },
      "application/x-redhat-package-manager": {
        source: "nginx",
        extensions: ["rpm"]
      },
      "application/x-research-info-systems": {
        source: "apache",
        extensions: ["ris"]
      },
      "application/x-sea": {
        source: "nginx",
        extensions: ["sea"]
      },
      "application/x-sh": {
        source: "apache",
        compressible: true,
        extensions: ["sh"]
      },
      "application/x-shar": {
        source: "apache",
        extensions: ["shar"]
      },
      "application/x-shockwave-flash": {
        source: "apache",
        compressible: false,
        extensions: ["swf"]
      },
      "application/x-silverlight-app": {
        source: "apache",
        extensions: ["xap"]
      },
      "application/x-sql": {
        source: "apache",
        extensions: ["sql"]
      },
      "application/x-stuffit": {
        source: "apache",
        compressible: false,
        extensions: ["sit"]
      },
      "application/x-stuffitx": {
        source: "apache",
        extensions: ["sitx"]
      },
      "application/x-subrip": {
        source: "apache",
        extensions: ["srt"]
      },
      "application/x-sv4cpio": {
        source: "apache",
        extensions: ["sv4cpio"]
      },
      "application/x-sv4crc": {
        source: "apache",
        extensions: ["sv4crc"]
      },
      "application/x-t3vm-image": {
        source: "apache",
        extensions: ["t3"]
      },
      "application/x-tads": {
        source: "apache",
        extensions: ["gam"]
      },
      "application/x-tar": {
        source: "apache",
        compressible: true,
        extensions: ["tar"]
      },
      "application/x-tcl": {
        source: "apache",
        extensions: ["tcl", "tk"]
      },
      "application/x-tex": {
        source: "apache",
        extensions: ["tex"]
      },
      "application/x-tex-tfm": {
        source: "apache",
        extensions: ["tfm"]
      },
      "application/x-texinfo": {
        source: "apache",
        extensions: ["texinfo", "texi"]
      },
      "application/x-tgif": {
        source: "apache",
        extensions: ["obj"]
      },
      "application/x-ustar": {
        source: "apache",
        extensions: ["ustar"]
      },
      "application/x-virtualbox-hdd": {
        compressible: true,
        extensions: ["hdd"]
      },
      "application/x-virtualbox-ova": {
        compressible: true,
        extensions: ["ova"]
      },
      "application/x-virtualbox-ovf": {
        compressible: true,
        extensions: ["ovf"]
      },
      "application/x-virtualbox-vbox": {
        compressible: true,
        extensions: ["vbox"]
      },
      "application/x-virtualbox-vbox-extpack": {
        compressible: false,
        extensions: ["vbox-extpack"]
      },
      "application/x-virtualbox-vdi": {
        compressible: true,
        extensions: ["vdi"]
      },
      "application/x-virtualbox-vhd": {
        compressible: true,
        extensions: ["vhd"]
      },
      "application/x-virtualbox-vmdk": {
        compressible: true,
        extensions: ["vmdk"]
      },
      "application/x-wais-source": {
        source: "apache",
        extensions: ["src"]
      },
      "application/x-web-app-manifest+json": {
        compressible: true,
        extensions: ["webapp"]
      },
      "application/x-www-form-urlencoded": {
        source: "iana",
        compressible: true
      },
      "application/x-x509-ca-cert": {
        source: "iana",
        extensions: ["der", "crt", "pem"]
      },
      "application/x-x509-ca-ra-cert": {
        source: "iana"
      },
      "application/x-x509-next-ca-cert": {
        source: "iana"
      },
      "application/x-xfig": {
        source: "apache",
        extensions: ["fig"]
      },
      "application/x-xliff+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xlf"]
      },
      "application/x-xpinstall": {
        source: "apache",
        compressible: false,
        extensions: ["xpi"]
      },
      "application/x-xz": {
        source: "apache",
        extensions: ["xz"]
      },
      "application/x-zmachine": {
        source: "apache",
        extensions: ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"]
      },
      "application/x400-bp": {
        source: "iana"
      },
      "application/xacml+xml": {
        source: "iana",
        compressible: true
      },
      "application/xaml+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xaml"]
      },
      "application/xcap-att+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xav"]
      },
      "application/xcap-caps+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xca"]
      },
      "application/xcap-diff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdf"]
      },
      "application/xcap-el+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xel"]
      },
      "application/xcap-error+xml": {
        source: "iana",
        compressible: true
      },
      "application/xcap-ns+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xns"]
      },
      "application/xcon-conference-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/xcon-conference-info-diff+xml": {
        source: "iana",
        compressible: true
      },
      "application/xenc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xenc"]
      },
      "application/xhtml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xhtml", "xht"]
      },
      "application/xhtml-voice+xml": {
        source: "apache",
        compressible: true
      },
      "application/xliff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xlf"]
      },
      "application/xml": {
        source: "iana",
        compressible: true,
        extensions: ["xml", "xsl", "xsd", "rng"]
      },
      "application/xml-dtd": {
        source: "iana",
        compressible: true,
        extensions: ["dtd"]
      },
      "application/xml-external-parsed-entity": {
        source: "iana"
      },
      "application/xml-patch+xml": {
        source: "iana",
        compressible: true
      },
      "application/xmpp+xml": {
        source: "iana",
        compressible: true
      },
      "application/xop+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xop"]
      },
      "application/xproc+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xpl"]
      },
      "application/xslt+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xsl", "xslt"]
      },
      "application/xspf+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xspf"]
      },
      "application/xv+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mxml", "xhvml", "xvml", "xvm"]
      },
      "application/yang": {
        source: "iana",
        extensions: ["yang"]
      },
      "application/yang-data+json": {
        source: "iana",
        compressible: true
      },
      "application/yang-data+xml": {
        source: "iana",
        compressible: true
      },
      "application/yang-patch+json": {
        source: "iana",
        compressible: true
      },
      "application/yang-patch+xml": {
        source: "iana",
        compressible: true
      },
      "application/yin+xml": {
        source: "iana",
        compressible: true,
        extensions: ["yin"]
      },
      "application/zip": {
        source: "iana",
        compressible: false,
        extensions: ["zip"]
      },
      "application/zlib": {
        source: "iana"
      },
      "application/zstd": {
        source: "iana"
      },
      "audio/1d-interleaved-parityfec": {
        source: "iana"
      },
      "audio/32kadpcm": {
        source: "iana"
      },
      "audio/3gpp": {
        source: "iana",
        compressible: false,
        extensions: ["3gpp"]
      },
      "audio/3gpp2": {
        source: "iana"
      },
      "audio/aac": {
        source: "iana"
      },
      "audio/ac3": {
        source: "iana"
      },
      "audio/adpcm": {
        source: "apache",
        extensions: ["adp"]
      },
      "audio/amr": {
        source: "iana",
        extensions: ["amr"]
      },
      "audio/amr-wb": {
        source: "iana"
      },
      "audio/amr-wb+": {
        source: "iana"
      },
      "audio/aptx": {
        source: "iana"
      },
      "audio/asc": {
        source: "iana"
      },
      "audio/atrac-advanced-lossless": {
        source: "iana"
      },
      "audio/atrac-x": {
        source: "iana"
      },
      "audio/atrac3": {
        source: "iana"
      },
      "audio/basic": {
        source: "iana",
        compressible: false,
        extensions: ["au", "snd"]
      },
      "audio/bv16": {
        source: "iana"
      },
      "audio/bv32": {
        source: "iana"
      },
      "audio/clearmode": {
        source: "iana"
      },
      "audio/cn": {
        source: "iana"
      },
      "audio/dat12": {
        source: "iana"
      },
      "audio/dls": {
        source: "iana"
      },
      "audio/dsr-es201108": {
        source: "iana"
      },
      "audio/dsr-es202050": {
        source: "iana"
      },
      "audio/dsr-es202211": {
        source: "iana"
      },
      "audio/dsr-es202212": {
        source: "iana"
      },
      "audio/dv": {
        source: "iana"
      },
      "audio/dvi4": {
        source: "iana"
      },
      "audio/eac3": {
        source: "iana"
      },
      "audio/encaprtp": {
        source: "iana"
      },
      "audio/evrc": {
        source: "iana"
      },
      "audio/evrc-qcp": {
        source: "iana"
      },
      "audio/evrc0": {
        source: "iana"
      },
      "audio/evrc1": {
        source: "iana"
      },
      "audio/evrcb": {
        source: "iana"
      },
      "audio/evrcb0": {
        source: "iana"
      },
      "audio/evrcb1": {
        source: "iana"
      },
      "audio/evrcnw": {
        source: "iana"
      },
      "audio/evrcnw0": {
        source: "iana"
      },
      "audio/evrcnw1": {
        source: "iana"
      },
      "audio/evrcwb": {
        source: "iana"
      },
      "audio/evrcwb0": {
        source: "iana"
      },
      "audio/evrcwb1": {
        source: "iana"
      },
      "audio/evs": {
        source: "iana"
      },
      "audio/flexfec": {
        source: "iana"
      },
      "audio/fwdred": {
        source: "iana"
      },
      "audio/g711-0": {
        source: "iana"
      },
      "audio/g719": {
        source: "iana"
      },
      "audio/g722": {
        source: "iana"
      },
      "audio/g7221": {
        source: "iana"
      },
      "audio/g723": {
        source: "iana"
      },
      "audio/g726-16": {
        source: "iana"
      },
      "audio/g726-24": {
        source: "iana"
      },
      "audio/g726-32": {
        source: "iana"
      },
      "audio/g726-40": {
        source: "iana"
      },
      "audio/g728": {
        source: "iana"
      },
      "audio/g729": {
        source: "iana"
      },
      "audio/g7291": {
        source: "iana"
      },
      "audio/g729d": {
        source: "iana"
      },
      "audio/g729e": {
        source: "iana"
      },
      "audio/gsm": {
        source: "iana"
      },
      "audio/gsm-efr": {
        source: "iana"
      },
      "audio/gsm-hr-08": {
        source: "iana"
      },
      "audio/ilbc": {
        source: "iana"
      },
      "audio/ip-mr_v2.5": {
        source: "iana"
      },
      "audio/isac": {
        source: "apache"
      },
      "audio/l16": {
        source: "iana"
      },
      "audio/l20": {
        source: "iana"
      },
      "audio/l24": {
        source: "iana",
        compressible: false
      },
      "audio/l8": {
        source: "iana"
      },
      "audio/lpc": {
        source: "iana"
      },
      "audio/melp": {
        source: "iana"
      },
      "audio/melp1200": {
        source: "iana"
      },
      "audio/melp2400": {
        source: "iana"
      },
      "audio/melp600": {
        source: "iana"
      },
      "audio/mhas": {
        source: "iana"
      },
      "audio/midi": {
        source: "apache",
        extensions: ["mid", "midi", "kar", "rmi"]
      },
      "audio/mobile-xmf": {
        source: "iana",
        extensions: ["mxmf"]
      },
      "audio/mp3": {
        compressible: false,
        extensions: ["mp3"]
      },
      "audio/mp4": {
        source: "iana",
        compressible: false,
        extensions: ["m4a", "mp4a"]
      },
      "audio/mp4a-latm": {
        source: "iana"
      },
      "audio/mpa": {
        source: "iana"
      },
      "audio/mpa-robust": {
        source: "iana"
      },
      "audio/mpeg": {
        source: "iana",
        compressible: false,
        extensions: ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"]
      },
      "audio/mpeg4-generic": {
        source: "iana"
      },
      "audio/musepack": {
        source: "apache"
      },
      "audio/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["oga", "ogg", "spx", "opus"]
      },
      "audio/opus": {
        source: "iana"
      },
      "audio/parityfec": {
        source: "iana"
      },
      "audio/pcma": {
        source: "iana"
      },
      "audio/pcma-wb": {
        source: "iana"
      },
      "audio/pcmu": {
        source: "iana"
      },
      "audio/pcmu-wb": {
        source: "iana"
      },
      "audio/prs.sid": {
        source: "iana"
      },
      "audio/qcelp": {
        source: "iana"
      },
      "audio/raptorfec": {
        source: "iana"
      },
      "audio/red": {
        source: "iana"
      },
      "audio/rtp-enc-aescm128": {
        source: "iana"
      },
      "audio/rtp-midi": {
        source: "iana"
      },
      "audio/rtploopback": {
        source: "iana"
      },
      "audio/rtx": {
        source: "iana"
      },
      "audio/s3m": {
        source: "apache",
        extensions: ["s3m"]
      },
      "audio/scip": {
        source: "iana"
      },
      "audio/silk": {
        source: "apache",
        extensions: ["sil"]
      },
      "audio/smv": {
        source: "iana"
      },
      "audio/smv-qcp": {
        source: "iana"
      },
      "audio/smv0": {
        source: "iana"
      },
      "audio/sofa": {
        source: "iana"
      },
      "audio/sp-midi": {
        source: "iana"
      },
      "audio/speex": {
        source: "iana"
      },
      "audio/t140c": {
        source: "iana"
      },
      "audio/t38": {
        source: "iana"
      },
      "audio/telephone-event": {
        source: "iana"
      },
      "audio/tetra_acelp": {
        source: "iana"
      },
      "audio/tetra_acelp_bb": {
        source: "iana"
      },
      "audio/tone": {
        source: "iana"
      },
      "audio/tsvcis": {
        source: "iana"
      },
      "audio/uemclip": {
        source: "iana"
      },
      "audio/ulpfec": {
        source: "iana"
      },
      "audio/usac": {
        source: "iana"
      },
      "audio/vdvi": {
        source: "iana"
      },
      "audio/vmr-wb": {
        source: "iana"
      },
      "audio/vnd.3gpp.iufp": {
        source: "iana"
      },
      "audio/vnd.4sb": {
        source: "iana"
      },
      "audio/vnd.audiokoz": {
        source: "iana"
      },
      "audio/vnd.celp": {
        source: "iana"
      },
      "audio/vnd.cisco.nse": {
        source: "iana"
      },
      "audio/vnd.cmles.radio-events": {
        source: "iana"
      },
      "audio/vnd.cns.anp1": {
        source: "iana"
      },
      "audio/vnd.cns.inf1": {
        source: "iana"
      },
      "audio/vnd.dece.audio": {
        source: "iana",
        extensions: ["uva", "uvva"]
      },
      "audio/vnd.digital-winds": {
        source: "iana",
        extensions: ["eol"]
      },
      "audio/vnd.dlna.adts": {
        source: "iana"
      },
      "audio/vnd.dolby.heaac.1": {
        source: "iana"
      },
      "audio/vnd.dolby.heaac.2": {
        source: "iana"
      },
      "audio/vnd.dolby.mlp": {
        source: "iana"
      },
      "audio/vnd.dolby.mps": {
        source: "iana"
      },
      "audio/vnd.dolby.pl2": {
        source: "iana"
      },
      "audio/vnd.dolby.pl2x": {
        source: "iana"
      },
      "audio/vnd.dolby.pl2z": {
        source: "iana"
      },
      "audio/vnd.dolby.pulse.1": {
        source: "iana"
      },
      "audio/vnd.dra": {
        source: "iana",
        extensions: ["dra"]
      },
      "audio/vnd.dts": {
        source: "iana",
        extensions: ["dts"]
      },
      "audio/vnd.dts.hd": {
        source: "iana",
        extensions: ["dtshd"]
      },
      "audio/vnd.dts.uhd": {
        source: "iana"
      },
      "audio/vnd.dvb.file": {
        source: "iana"
      },
      "audio/vnd.everad.plj": {
        source: "iana"
      },
      "audio/vnd.hns.audio": {
        source: "iana"
      },
      "audio/vnd.lucent.voice": {
        source: "iana",
        extensions: ["lvp"]
      },
      "audio/vnd.ms-playready.media.pya": {
        source: "iana",
        extensions: ["pya"]
      },
      "audio/vnd.nokia.mobile-xmf": {
        source: "iana"
      },
      "audio/vnd.nortel.vbk": {
        source: "iana"
      },
      "audio/vnd.nuera.ecelp4800": {
        source: "iana",
        extensions: ["ecelp4800"]
      },
      "audio/vnd.nuera.ecelp7470": {
        source: "iana",
        extensions: ["ecelp7470"]
      },
      "audio/vnd.nuera.ecelp9600": {
        source: "iana",
        extensions: ["ecelp9600"]
      },
      "audio/vnd.octel.sbc": {
        source: "iana"
      },
      "audio/vnd.presonus.multitrack": {
        source: "iana"
      },
      "audio/vnd.qcelp": {
        source: "iana"
      },
      "audio/vnd.rhetorex.32kadpcm": {
        source: "iana"
      },
      "audio/vnd.rip": {
        source: "iana",
        extensions: ["rip"]
      },
      "audio/vnd.rn-realaudio": {
        compressible: false
      },
      "audio/vnd.sealedmedia.softseal.mpeg": {
        source: "iana"
      },
      "audio/vnd.vmx.cvsd": {
        source: "iana"
      },
      "audio/vnd.wave": {
        compressible: false
      },
      "audio/vorbis": {
        source: "iana",
        compressible: false
      },
      "audio/vorbis-config": {
        source: "iana"
      },
      "audio/wav": {
        compressible: false,
        extensions: ["wav"]
      },
      "audio/wave": {
        compressible: false,
        extensions: ["wav"]
      },
      "audio/webm": {
        source: "apache",
        compressible: false,
        extensions: ["weba"]
      },
      "audio/x-aac": {
        source: "apache",
        compressible: false,
        extensions: ["aac"]
      },
      "audio/x-aiff": {
        source: "apache",
        extensions: ["aif", "aiff", "aifc"]
      },
      "audio/x-caf": {
        source: "apache",
        compressible: false,
        extensions: ["caf"]
      },
      "audio/x-flac": {
        source: "apache",
        extensions: ["flac"]
      },
      "audio/x-m4a": {
        source: "nginx",
        extensions: ["m4a"]
      },
      "audio/x-matroska": {
        source: "apache",
        extensions: ["mka"]
      },
      "audio/x-mpegurl": {
        source: "apache",
        extensions: ["m3u"]
      },
      "audio/x-ms-wax": {
        source: "apache",
        extensions: ["wax"]
      },
      "audio/x-ms-wma": {
        source: "apache",
        extensions: ["wma"]
      },
      "audio/x-pn-realaudio": {
        source: "apache",
        extensions: ["ram", "ra"]
      },
      "audio/x-pn-realaudio-plugin": {
        source: "apache",
        extensions: ["rmp"]
      },
      "audio/x-realaudio": {
        source: "nginx",
        extensions: ["ra"]
      },
      "audio/x-tta": {
        source: "apache"
      },
      "audio/x-wav": {
        source: "apache",
        extensions: ["wav"]
      },
      "audio/xm": {
        source: "apache",
        extensions: ["xm"]
      },
      "chemical/x-cdx": {
        source: "apache",
        extensions: ["cdx"]
      },
      "chemical/x-cif": {
        source: "apache",
        extensions: ["cif"]
      },
      "chemical/x-cmdf": {
        source: "apache",
        extensions: ["cmdf"]
      },
      "chemical/x-cml": {
        source: "apache",
        extensions: ["cml"]
      },
      "chemical/x-csml": {
        source: "apache",
        extensions: ["csml"]
      },
      "chemical/x-pdb": {
        source: "apache"
      },
      "chemical/x-xyz": {
        source: "apache",
        extensions: ["xyz"]
      },
      "font/collection": {
        source: "iana",
        extensions: ["ttc"]
      },
      "font/otf": {
        source: "iana",
        compressible: true,
        extensions: ["otf"]
      },
      "font/sfnt": {
        source: "iana"
      },
      "font/ttf": {
        source: "iana",
        compressible: true,
        extensions: ["ttf"]
      },
      "font/woff": {
        source: "iana",
        extensions: ["woff"]
      },
      "font/woff2": {
        source: "iana",
        extensions: ["woff2"]
      },
      "image/aces": {
        source: "iana",
        extensions: ["exr"]
      },
      "image/apng": {
        compressible: false,
        extensions: ["apng"]
      },
      "image/avci": {
        source: "iana",
        extensions: ["avci"]
      },
      "image/avcs": {
        source: "iana",
        extensions: ["avcs"]
      },
      "image/avif": {
        source: "iana",
        compressible: false,
        extensions: ["avif"]
      },
      "image/bmp": {
        source: "iana",
        compressible: true,
        extensions: ["bmp"]
      },
      "image/cgm": {
        source: "iana",
        extensions: ["cgm"]
      },
      "image/dicom-rle": {
        source: "iana",
        extensions: ["drle"]
      },
      "image/emf": {
        source: "iana",
        extensions: ["emf"]
      },
      "image/fits": {
        source: "iana",
        extensions: ["fits"]
      },
      "image/g3fax": {
        source: "iana",
        extensions: ["g3"]
      },
      "image/gif": {
        source: "iana",
        compressible: false,
        extensions: ["gif"]
      },
      "image/heic": {
        source: "iana",
        extensions: ["heic"]
      },
      "image/heic-sequence": {
        source: "iana",
        extensions: ["heics"]
      },
      "image/heif": {
        source: "iana",
        extensions: ["heif"]
      },
      "image/heif-sequence": {
        source: "iana",
        extensions: ["heifs"]
      },
      "image/hej2k": {
        source: "iana",
        extensions: ["hej2"]
      },
      "image/hsj2": {
        source: "iana",
        extensions: ["hsj2"]
      },
      "image/ief": {
        source: "iana",
        extensions: ["ief"]
      },
      "image/jls": {
        source: "iana",
        extensions: ["jls"]
      },
      "image/jp2": {
        source: "iana",
        compressible: false,
        extensions: ["jp2", "jpg2"]
      },
      "image/jpeg": {
        source: "iana",
        compressible: false,
        extensions: ["jpeg", "jpg", "jpe"]
      },
      "image/jph": {
        source: "iana",
        extensions: ["jph"]
      },
      "image/jphc": {
        source: "iana",
        extensions: ["jhc"]
      },
      "image/jpm": {
        source: "iana",
        compressible: false,
        extensions: ["jpm"]
      },
      "image/jpx": {
        source: "iana",
        compressible: false,
        extensions: ["jpx", "jpf"]
      },
      "image/jxr": {
        source: "iana",
        extensions: ["jxr"]
      },
      "image/jxra": {
        source: "iana",
        extensions: ["jxra"]
      },
      "image/jxrs": {
        source: "iana",
        extensions: ["jxrs"]
      },
      "image/jxs": {
        source: "iana",
        extensions: ["jxs"]
      },
      "image/jxsc": {
        source: "iana",
        extensions: ["jxsc"]
      },
      "image/jxsi": {
        source: "iana",
        extensions: ["jxsi"]
      },
      "image/jxss": {
        source: "iana",
        extensions: ["jxss"]
      },
      "image/ktx": {
        source: "iana",
        extensions: ["ktx"]
      },
      "image/ktx2": {
        source: "iana",
        extensions: ["ktx2"]
      },
      "image/naplps": {
        source: "iana"
      },
      "image/pjpeg": {
        compressible: false
      },
      "image/png": {
        source: "iana",
        compressible: false,
        extensions: ["png"]
      },
      "image/prs.btif": {
        source: "iana",
        extensions: ["btif"]
      },
      "image/prs.pti": {
        source: "iana",
        extensions: ["pti"]
      },
      "image/pwg-raster": {
        source: "iana"
      },
      "image/sgi": {
        source: "apache",
        extensions: ["sgi"]
      },
      "image/svg+xml": {
        source: "iana",
        compressible: true,
        extensions: ["svg", "svgz"]
      },
      "image/t38": {
        source: "iana",
        extensions: ["t38"]
      },
      "image/tiff": {
        source: "iana",
        compressible: false,
        extensions: ["tif", "tiff"]
      },
      "image/tiff-fx": {
        source: "iana",
        extensions: ["tfx"]
      },
      "image/vnd.adobe.photoshop": {
        source: "iana",
        compressible: true,
        extensions: ["psd"]
      },
      "image/vnd.airzip.accelerator.azv": {
        source: "iana",
        extensions: ["azv"]
      },
      "image/vnd.cns.inf2": {
        source: "iana"
      },
      "image/vnd.dece.graphic": {
        source: "iana",
        extensions: ["uvi", "uvvi", "uvg", "uvvg"]
      },
      "image/vnd.djvu": {
        source: "iana",
        extensions: ["djvu", "djv"]
      },
      "image/vnd.dvb.subtitle": {
        source: "iana",
        extensions: ["sub"]
      },
      "image/vnd.dwg": {
        source: "iana",
        extensions: ["dwg"]
      },
      "image/vnd.dxf": {
        source: "iana",
        extensions: ["dxf"]
      },
      "image/vnd.fastbidsheet": {
        source: "iana",
        extensions: ["fbs"]
      },
      "image/vnd.fpx": {
        source: "iana",
        extensions: ["fpx"]
      },
      "image/vnd.fst": {
        source: "iana",
        extensions: ["fst"]
      },
      "image/vnd.fujixerox.edmics-mmr": {
        source: "iana",
        extensions: ["mmr"]
      },
      "image/vnd.fujixerox.edmics-rlc": {
        source: "iana",
        extensions: ["rlc"]
      },
      "image/vnd.globalgraphics.pgb": {
        source: "iana"
      },
      "image/vnd.microsoft.icon": {
        source: "iana",
        compressible: true,
        extensions: ["ico"]
      },
      "image/vnd.mix": {
        source: "iana"
      },
      "image/vnd.mozilla.apng": {
        source: "iana"
      },
      "image/vnd.ms-dds": {
        compressible: true,
        extensions: ["dds"]
      },
      "image/vnd.ms-modi": {
        source: "iana",
        extensions: ["mdi"]
      },
      "image/vnd.ms-photo": {
        source: "apache",
        extensions: ["wdp"]
      },
      "image/vnd.net-fpx": {
        source: "iana",
        extensions: ["npx"]
      },
      "image/vnd.pco.b16": {
        source: "iana",
        extensions: ["b16"]
      },
      "image/vnd.radiance": {
        source: "iana"
      },
      "image/vnd.sealed.png": {
        source: "iana"
      },
      "image/vnd.sealedmedia.softseal.gif": {
        source: "iana"
      },
      "image/vnd.sealedmedia.softseal.jpg": {
        source: "iana"
      },
      "image/vnd.svf": {
        source: "iana"
      },
      "image/vnd.tencent.tap": {
        source: "iana",
        extensions: ["tap"]
      },
      "image/vnd.valve.source.texture": {
        source: "iana",
        extensions: ["vtf"]
      },
      "image/vnd.wap.wbmp": {
        source: "iana",
        extensions: ["wbmp"]
      },
      "image/vnd.xiff": {
        source: "iana",
        extensions: ["xif"]
      },
      "image/vnd.zbrush.pcx": {
        source: "iana",
        extensions: ["pcx"]
      },
      "image/webp": {
        source: "apache",
        extensions: ["webp"]
      },
      "image/wmf": {
        source: "iana",
        extensions: ["wmf"]
      },
      "image/x-3ds": {
        source: "apache",
        extensions: ["3ds"]
      },
      "image/x-cmu-raster": {
        source: "apache",
        extensions: ["ras"]
      },
      "image/x-cmx": {
        source: "apache",
        extensions: ["cmx"]
      },
      "image/x-freehand": {
        source: "apache",
        extensions: ["fh", "fhc", "fh4", "fh5", "fh7"]
      },
      "image/x-icon": {
        source: "apache",
        compressible: true,
        extensions: ["ico"]
      },
      "image/x-jng": {
        source: "nginx",
        extensions: ["jng"]
      },
      "image/x-mrsid-image": {
        source: "apache",
        extensions: ["sid"]
      },
      "image/x-ms-bmp": {
        source: "nginx",
        compressible: true,
        extensions: ["bmp"]
      },
      "image/x-pcx": {
        source: "apache",
        extensions: ["pcx"]
      },
      "image/x-pict": {
        source: "apache",
        extensions: ["pic", "pct"]
      },
      "image/x-portable-anymap": {
        source: "apache",
        extensions: ["pnm"]
      },
      "image/x-portable-bitmap": {
        source: "apache",
        extensions: ["pbm"]
      },
      "image/x-portable-graymap": {
        source: "apache",
        extensions: ["pgm"]
      },
      "image/x-portable-pixmap": {
        source: "apache",
        extensions: ["ppm"]
      },
      "image/x-rgb": {
        source: "apache",
        extensions: ["rgb"]
      },
      "image/x-tga": {
        source: "apache",
        extensions: ["tga"]
      },
      "image/x-xbitmap": {
        source: "apache",
        extensions: ["xbm"]
      },
      "image/x-xcf": {
        compressible: false
      },
      "image/x-xpixmap": {
        source: "apache",
        extensions: ["xpm"]
      },
      "image/x-xwindowdump": {
        source: "apache",
        extensions: ["xwd"]
      },
      "message/cpim": {
        source: "iana"
      },
      "message/delivery-status": {
        source: "iana"
      },
      "message/disposition-notification": {
        source: "iana",
        extensions: [
          "disposition-notification"
        ]
      },
      "message/external-body": {
        source: "iana"
      },
      "message/feedback-report": {
        source: "iana"
      },
      "message/global": {
        source: "iana",
        extensions: ["u8msg"]
      },
      "message/global-delivery-status": {
        source: "iana",
        extensions: ["u8dsn"]
      },
      "message/global-disposition-notification": {
        source: "iana",
        extensions: ["u8mdn"]
      },
      "message/global-headers": {
        source: "iana",
        extensions: ["u8hdr"]
      },
      "message/http": {
        source: "iana",
        compressible: false
      },
      "message/imdn+xml": {
        source: "iana",
        compressible: true
      },
      "message/news": {
        source: "iana"
      },
      "message/partial": {
        source: "iana",
        compressible: false
      },
      "message/rfc822": {
        source: "iana",
        compressible: true,
        extensions: ["eml", "mime"]
      },
      "message/s-http": {
        source: "iana"
      },
      "message/sip": {
        source: "iana"
      },
      "message/sipfrag": {
        source: "iana"
      },
      "message/tracking-status": {
        source: "iana"
      },
      "message/vnd.si.simp": {
        source: "iana"
      },
      "message/vnd.wfa.wsc": {
        source: "iana",
        extensions: ["wsc"]
      },
      "model/3mf": {
        source: "iana",
        extensions: ["3mf"]
      },
      "model/e57": {
        source: "iana"
      },
      "model/gltf+json": {
        source: "iana",
        compressible: true,
        extensions: ["gltf"]
      },
      "model/gltf-binary": {
        source: "iana",
        compressible: true,
        extensions: ["glb"]
      },
      "model/iges": {
        source: "iana",
        compressible: false,
        extensions: ["igs", "iges"]
      },
      "model/mesh": {
        source: "iana",
        compressible: false,
        extensions: ["msh", "mesh", "silo"]
      },
      "model/mtl": {
        source: "iana",
        extensions: ["mtl"]
      },
      "model/obj": {
        source: "iana",
        extensions: ["obj"]
      },
      "model/step": {
        source: "iana"
      },
      "model/step+xml": {
        source: "iana",
        compressible: true,
        extensions: ["stpx"]
      },
      "model/step+zip": {
        source: "iana",
        compressible: false,
        extensions: ["stpz"]
      },
      "model/step-xml+zip": {
        source: "iana",
        compressible: false,
        extensions: ["stpxz"]
      },
      "model/stl": {
        source: "iana",
        extensions: ["stl"]
      },
      "model/vnd.collada+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dae"]
      },
      "model/vnd.dwf": {
        source: "iana",
        extensions: ["dwf"]
      },
      "model/vnd.flatland.3dml": {
        source: "iana"
      },
      "model/vnd.gdl": {
        source: "iana",
        extensions: ["gdl"]
      },
      "model/vnd.gs-gdl": {
        source: "apache"
      },
      "model/vnd.gs.gdl": {
        source: "iana"
      },
      "model/vnd.gtw": {
        source: "iana",
        extensions: ["gtw"]
      },
      "model/vnd.moml+xml": {
        source: "iana",
        compressible: true
      },
      "model/vnd.mts": {
        source: "iana",
        extensions: ["mts"]
      },
      "model/vnd.opengex": {
        source: "iana",
        extensions: ["ogex"]
      },
      "model/vnd.parasolid.transmit.binary": {
        source: "iana",
        extensions: ["x_b"]
      },
      "model/vnd.parasolid.transmit.text": {
        source: "iana",
        extensions: ["x_t"]
      },
      "model/vnd.pytha.pyox": {
        source: "iana"
      },
      "model/vnd.rosette.annotated-data-model": {
        source: "iana"
      },
      "model/vnd.sap.vds": {
        source: "iana",
        extensions: ["vds"]
      },
      "model/vnd.usdz+zip": {
        source: "iana",
        compressible: false,
        extensions: ["usdz"]
      },
      "model/vnd.valve.source.compiled-map": {
        source: "iana",
        extensions: ["bsp"]
      },
      "model/vnd.vtu": {
        source: "iana",
        extensions: ["vtu"]
      },
      "model/vrml": {
        source: "iana",
        compressible: false,
        extensions: ["wrl", "vrml"]
      },
      "model/x3d+binary": {
        source: "apache",
        compressible: false,
        extensions: ["x3db", "x3dbz"]
      },
      "model/x3d+fastinfoset": {
        source: "iana",
        extensions: ["x3db"]
      },
      "model/x3d+vrml": {
        source: "apache",
        compressible: false,
        extensions: ["x3dv", "x3dvz"]
      },
      "model/x3d+xml": {
        source: "iana",
        compressible: true,
        extensions: ["x3d", "x3dz"]
      },
      "model/x3d-vrml": {
        source: "iana",
        extensions: ["x3dv"]
      },
      "multipart/alternative": {
        source: "iana",
        compressible: false
      },
      "multipart/appledouble": {
        source: "iana"
      },
      "multipart/byteranges": {
        source: "iana"
      },
      "multipart/digest": {
        source: "iana"
      },
      "multipart/encrypted": {
        source: "iana",
        compressible: false
      },
      "multipart/form-data": {
        source: "iana",
        compressible: false
      },
      "multipart/header-set": {
        source: "iana"
      },
      "multipart/mixed": {
        source: "iana"
      },
      "multipart/multilingual": {
        source: "iana"
      },
      "multipart/parallel": {
        source: "iana"
      },
      "multipart/related": {
        source: "iana",
        compressible: false
      },
      "multipart/report": {
        source: "iana"
      },
      "multipart/signed": {
        source: "iana",
        compressible: false
      },
      "multipart/vnd.bint.med-plus": {
        source: "iana"
      },
      "multipart/voice-message": {
        source: "iana"
      },
      "multipart/x-mixed-replace": {
        source: "iana"
      },
      "text/1d-interleaved-parityfec": {
        source: "iana"
      },
      "text/cache-manifest": {
        source: "iana",
        compressible: true,
        extensions: ["appcache", "manifest"]
      },
      "text/calendar": {
        source: "iana",
        extensions: ["ics", "ifb"]
      },
      "text/calender": {
        compressible: true
      },
      "text/cmd": {
        compressible: true
      },
      "text/coffeescript": {
        extensions: ["coffee", "litcoffee"]
      },
      "text/cql": {
        source: "iana"
      },
      "text/cql-expression": {
        source: "iana"
      },
      "text/cql-identifier": {
        source: "iana"
      },
      "text/css": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["css"]
      },
      "text/csv": {
        source: "iana",
        compressible: true,
        extensions: ["csv"]
      },
      "text/csv-schema": {
        source: "iana"
      },
      "text/directory": {
        source: "iana"
      },
      "text/dns": {
        source: "iana"
      },
      "text/ecmascript": {
        source: "iana"
      },
      "text/encaprtp": {
        source: "iana"
      },
      "text/enriched": {
        source: "iana"
      },
      "text/fhirpath": {
        source: "iana"
      },
      "text/flexfec": {
        source: "iana"
      },
      "text/fwdred": {
        source: "iana"
      },
      "text/gff3": {
        source: "iana"
      },
      "text/grammar-ref-list": {
        source: "iana"
      },
      "text/html": {
        source: "iana",
        compressible: true,
        extensions: ["html", "htm", "shtml"]
      },
      "text/jade": {
        extensions: ["jade"]
      },
      "text/javascript": {
        source: "iana",
        compressible: true
      },
      "text/jcr-cnd": {
        source: "iana"
      },
      "text/jsx": {
        compressible: true,
        extensions: ["jsx"]
      },
      "text/less": {
        compressible: true,
        extensions: ["less"]
      },
      "text/markdown": {
        source: "iana",
        compressible: true,
        extensions: ["markdown", "md"]
      },
      "text/mathml": {
        source: "nginx",
        extensions: ["mml"]
      },
      "text/mdx": {
        compressible: true,
        extensions: ["mdx"]
      },
      "text/mizar": {
        source: "iana"
      },
      "text/n3": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["n3"]
      },
      "text/parameters": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/parityfec": {
        source: "iana"
      },
      "text/plain": {
        source: "iana",
        compressible: true,
        extensions: ["txt", "text", "conf", "def", "list", "log", "in", "ini"]
      },
      "text/provenance-notation": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/prs.fallenstein.rst": {
        source: "iana"
      },
      "text/prs.lines.tag": {
        source: "iana",
        extensions: ["dsc"]
      },
      "text/prs.prop.logic": {
        source: "iana"
      },
      "text/raptorfec": {
        source: "iana"
      },
      "text/red": {
        source: "iana"
      },
      "text/rfc822-headers": {
        source: "iana"
      },
      "text/richtext": {
        source: "iana",
        compressible: true,
        extensions: ["rtx"]
      },
      "text/rtf": {
        source: "iana",
        compressible: true,
        extensions: ["rtf"]
      },
      "text/rtp-enc-aescm128": {
        source: "iana"
      },
      "text/rtploopback": {
        source: "iana"
      },
      "text/rtx": {
        source: "iana"
      },
      "text/sgml": {
        source: "iana",
        extensions: ["sgml", "sgm"]
      },
      "text/shaclc": {
        source: "iana"
      },
      "text/shex": {
        source: "iana",
        extensions: ["shex"]
      },
      "text/slim": {
        extensions: ["slim", "slm"]
      },
      "text/spdx": {
        source: "iana",
        extensions: ["spdx"]
      },
      "text/strings": {
        source: "iana"
      },
      "text/stylus": {
        extensions: ["stylus", "styl"]
      },
      "text/t140": {
        source: "iana"
      },
      "text/tab-separated-values": {
        source: "iana",
        compressible: true,
        extensions: ["tsv"]
      },
      "text/troff": {
        source: "iana",
        extensions: ["t", "tr", "roff", "man", "me", "ms"]
      },
      "text/turtle": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["ttl"]
      },
      "text/ulpfec": {
        source: "iana"
      },
      "text/uri-list": {
        source: "iana",
        compressible: true,
        extensions: ["uri", "uris", "urls"]
      },
      "text/vcard": {
        source: "iana",
        compressible: true,
        extensions: ["vcard"]
      },
      "text/vnd.a": {
        source: "iana"
      },
      "text/vnd.abc": {
        source: "iana"
      },
      "text/vnd.ascii-art": {
        source: "iana"
      },
      "text/vnd.curl": {
        source: "iana",
        extensions: ["curl"]
      },
      "text/vnd.curl.dcurl": {
        source: "apache",
        extensions: ["dcurl"]
      },
      "text/vnd.curl.mcurl": {
        source: "apache",
        extensions: ["mcurl"]
      },
      "text/vnd.curl.scurl": {
        source: "apache",
        extensions: ["scurl"]
      },
      "text/vnd.debian.copyright": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/vnd.dmclientscript": {
        source: "iana"
      },
      "text/vnd.dvb.subtitle": {
        source: "iana",
        extensions: ["sub"]
      },
      "text/vnd.esmertec.theme-descriptor": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/vnd.familysearch.gedcom": {
        source: "iana",
        extensions: ["ged"]
      },
      "text/vnd.ficlab.flt": {
        source: "iana"
      },
      "text/vnd.fly": {
        source: "iana",
        extensions: ["fly"]
      },
      "text/vnd.fmi.flexstor": {
        source: "iana",
        extensions: ["flx"]
      },
      "text/vnd.gml": {
        source: "iana"
      },
      "text/vnd.graphviz": {
        source: "iana",
        extensions: ["gv"]
      },
      "text/vnd.hans": {
        source: "iana"
      },
      "text/vnd.hgl": {
        source: "iana"
      },
      "text/vnd.in3d.3dml": {
        source: "iana",
        extensions: ["3dml"]
      },
      "text/vnd.in3d.spot": {
        source: "iana",
        extensions: ["spot"]
      },
      "text/vnd.iptc.newsml": {
        source: "iana"
      },
      "text/vnd.iptc.nitf": {
        source: "iana"
      },
      "text/vnd.latex-z": {
        source: "iana"
      },
      "text/vnd.motorola.reflex": {
        source: "iana"
      },
      "text/vnd.ms-mediapackage": {
        source: "iana"
      },
      "text/vnd.net2phone.commcenter.command": {
        source: "iana"
      },
      "text/vnd.radisys.msml-basic-layout": {
        source: "iana"
      },
      "text/vnd.senx.warpscript": {
        source: "iana"
      },
      "text/vnd.si.uricatalogue": {
        source: "iana"
      },
      "text/vnd.sosi": {
        source: "iana"
      },
      "text/vnd.sun.j2me.app-descriptor": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["jad"]
      },
      "text/vnd.trolltech.linguist": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/vnd.wap.si": {
        source: "iana"
      },
      "text/vnd.wap.sl": {
        source: "iana"
      },
      "text/vnd.wap.wml": {
        source: "iana",
        extensions: ["wml"]
      },
      "text/vnd.wap.wmlscript": {
        source: "iana",
        extensions: ["wmls"]
      },
      "text/vtt": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["vtt"]
      },
      "text/x-asm": {
        source: "apache",
        extensions: ["s", "asm"]
      },
      "text/x-c": {
        source: "apache",
        extensions: ["c", "cc", "cxx", "cpp", "h", "hh", "dic"]
      },
      "text/x-component": {
        source: "nginx",
        extensions: ["htc"]
      },
      "text/x-fortran": {
        source: "apache",
        extensions: ["f", "for", "f77", "f90"]
      },
      "text/x-gwt-rpc": {
        compressible: true
      },
      "text/x-handlebars-template": {
        extensions: ["hbs"]
      },
      "text/x-java-source": {
        source: "apache",
        extensions: ["java"]
      },
      "text/x-jquery-tmpl": {
        compressible: true
      },
      "text/x-lua": {
        extensions: ["lua"]
      },
      "text/x-markdown": {
        compressible: true,
        extensions: ["mkd"]
      },
      "text/x-nfo": {
        source: "apache",
        extensions: ["nfo"]
      },
      "text/x-opml": {
        source: "apache",
        extensions: ["opml"]
      },
      "text/x-org": {
        compressible: true,
        extensions: ["org"]
      },
      "text/x-pascal": {
        source: "apache",
        extensions: ["p", "pas"]
      },
      "text/x-processing": {
        compressible: true,
        extensions: ["pde"]
      },
      "text/x-sass": {
        extensions: ["sass"]
      },
      "text/x-scss": {
        extensions: ["scss"]
      },
      "text/x-setext": {
        source: "apache",
        extensions: ["etx"]
      },
      "text/x-sfv": {
        source: "apache",
        extensions: ["sfv"]
      },
      "text/x-suse-ymp": {
        compressible: true,
        extensions: ["ymp"]
      },
      "text/x-uuencode": {
        source: "apache",
        extensions: ["uu"]
      },
      "text/x-vcalendar": {
        source: "apache",
        extensions: ["vcs"]
      },
      "text/x-vcard": {
        source: "apache",
        extensions: ["vcf"]
      },
      "text/xml": {
        source: "iana",
        compressible: true,
        extensions: ["xml"]
      },
      "text/xml-external-parsed-entity": {
        source: "iana"
      },
      "text/yaml": {
        compressible: true,
        extensions: ["yaml", "yml"]
      },
      "video/1d-interleaved-parityfec": {
        source: "iana"
      },
      "video/3gpp": {
        source: "iana",
        extensions: ["3gp", "3gpp"]
      },
      "video/3gpp-tt": {
        source: "iana"
      },
      "video/3gpp2": {
        source: "iana",
        extensions: ["3g2"]
      },
      "video/av1": {
        source: "iana"
      },
      "video/bmpeg": {
        source: "iana"
      },
      "video/bt656": {
        source: "iana"
      },
      "video/celb": {
        source: "iana"
      },
      "video/dv": {
        source: "iana"
      },
      "video/encaprtp": {
        source: "iana"
      },
      "video/ffv1": {
        source: "iana"
      },
      "video/flexfec": {
        source: "iana"
      },
      "video/h261": {
        source: "iana",
        extensions: ["h261"]
      },
      "video/h263": {
        source: "iana",
        extensions: ["h263"]
      },
      "video/h263-1998": {
        source: "iana"
      },
      "video/h263-2000": {
        source: "iana"
      },
      "video/h264": {
        source: "iana",
        extensions: ["h264"]
      },
      "video/h264-rcdo": {
        source: "iana"
      },
      "video/h264-svc": {
        source: "iana"
      },
      "video/h265": {
        source: "iana"
      },
      "video/iso.segment": {
        source: "iana",
        extensions: ["m4s"]
      },
      "video/jpeg": {
        source: "iana",
        extensions: ["jpgv"]
      },
      "video/jpeg2000": {
        source: "iana"
      },
      "video/jpm": {
        source: "apache",
        extensions: ["jpm", "jpgm"]
      },
      "video/jxsv": {
        source: "iana"
      },
      "video/mj2": {
        source: "iana",
        extensions: ["mj2", "mjp2"]
      },
      "video/mp1s": {
        source: "iana"
      },
      "video/mp2p": {
        source: "iana"
      },
      "video/mp2t": {
        source: "iana",
        extensions: ["ts"]
      },
      "video/mp4": {
        source: "iana",
        compressible: false,
        extensions: ["mp4", "mp4v", "mpg4"]
      },
      "video/mp4v-es": {
        source: "iana"
      },
      "video/mpeg": {
        source: "iana",
        compressible: false,
        extensions: ["mpeg", "mpg", "mpe", "m1v", "m2v"]
      },
      "video/mpeg4-generic": {
        source: "iana"
      },
      "video/mpv": {
        source: "iana"
      },
      "video/nv": {
        source: "iana"
      },
      "video/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["ogv"]
      },
      "video/parityfec": {
        source: "iana"
      },
      "video/pointer": {
        source: "iana"
      },
      "video/quicktime": {
        source: "iana",
        compressible: false,
        extensions: ["qt", "mov"]
      },
      "video/raptorfec": {
        source: "iana"
      },
      "video/raw": {
        source: "iana"
      },
      "video/rtp-enc-aescm128": {
        source: "iana"
      },
      "video/rtploopback": {
        source: "iana"
      },
      "video/rtx": {
        source: "iana"
      },
      "video/scip": {
        source: "iana"
      },
      "video/smpte291": {
        source: "iana"
      },
      "video/smpte292m": {
        source: "iana"
      },
      "video/ulpfec": {
        source: "iana"
      },
      "video/vc1": {
        source: "iana"
      },
      "video/vc2": {
        source: "iana"
      },
      "video/vnd.cctv": {
        source: "iana"
      },
      "video/vnd.dece.hd": {
        source: "iana",
        extensions: ["uvh", "uvvh"]
      },
      "video/vnd.dece.mobile": {
        source: "iana",
        extensions: ["uvm", "uvvm"]
      },
      "video/vnd.dece.mp4": {
        source: "iana"
      },
      "video/vnd.dece.pd": {
        source: "iana",
        extensions: ["uvp", "uvvp"]
      },
      "video/vnd.dece.sd": {
        source: "iana",
        extensions: ["uvs", "uvvs"]
      },
      "video/vnd.dece.video": {
        source: "iana",
        extensions: ["uvv", "uvvv"]
      },
      "video/vnd.directv.mpeg": {
        source: "iana"
      },
      "video/vnd.directv.mpeg-tts": {
        source: "iana"
      },
      "video/vnd.dlna.mpeg-tts": {
        source: "iana"
      },
      "video/vnd.dvb.file": {
        source: "iana",
        extensions: ["dvb"]
      },
      "video/vnd.fvt": {
        source: "iana",
        extensions: ["fvt"]
      },
      "video/vnd.hns.video": {
        source: "iana"
      },
      "video/vnd.iptvforum.1dparityfec-1010": {
        source: "iana"
      },
      "video/vnd.iptvforum.1dparityfec-2005": {
        source: "iana"
      },
      "video/vnd.iptvforum.2dparityfec-1010": {
        source: "iana"
      },
      "video/vnd.iptvforum.2dparityfec-2005": {
        source: "iana"
      },
      "video/vnd.iptvforum.ttsavc": {
        source: "iana"
      },
      "video/vnd.iptvforum.ttsmpeg2": {
        source: "iana"
      },
      "video/vnd.motorola.video": {
        source: "iana"
      },
      "video/vnd.motorola.videop": {
        source: "iana"
      },
      "video/vnd.mpegurl": {
        source: "iana",
        extensions: ["mxu", "m4u"]
      },
      "video/vnd.ms-playready.media.pyv": {
        source: "iana",
        extensions: ["pyv"]
      },
      "video/vnd.nokia.interleaved-multimedia": {
        source: "iana"
      },
      "video/vnd.nokia.mp4vr": {
        source: "iana"
      },
      "video/vnd.nokia.videovoip": {
        source: "iana"
      },
      "video/vnd.objectvideo": {
        source: "iana"
      },
      "video/vnd.radgamettools.bink": {
        source: "iana"
      },
      "video/vnd.radgamettools.smacker": {
        source: "iana"
      },
      "video/vnd.sealed.mpeg1": {
        source: "iana"
      },
      "video/vnd.sealed.mpeg4": {
        source: "iana"
      },
      "video/vnd.sealed.swf": {
        source: "iana"
      },
      "video/vnd.sealedmedia.softseal.mov": {
        source: "iana"
      },
      "video/vnd.uvvu.mp4": {
        source: "iana",
        extensions: ["uvu", "uvvu"]
      },
      "video/vnd.vivo": {
        source: "iana",
        extensions: ["viv"]
      },
      "video/vnd.youtube.yt": {
        source: "iana"
      },
      "video/vp8": {
        source: "iana"
      },
      "video/vp9": {
        source: "iana"
      },
      "video/webm": {
        source: "apache",
        compressible: false,
        extensions: ["webm"]
      },
      "video/x-f4v": {
        source: "apache",
        extensions: ["f4v"]
      },
      "video/x-fli": {
        source: "apache",
        extensions: ["fli"]
      },
      "video/x-flv": {
        source: "apache",
        compressible: false,
        extensions: ["flv"]
      },
      "video/x-m4v": {
        source: "apache",
        extensions: ["m4v"]
      },
      "video/x-matroska": {
        source: "apache",
        compressible: false,
        extensions: ["mkv", "mk3d", "mks"]
      },
      "video/x-mng": {
        source: "apache",
        extensions: ["mng"]
      },
      "video/x-ms-asf": {
        source: "apache",
        extensions: ["asf", "asx"]
      },
      "video/x-ms-vob": {
        source: "apache",
        extensions: ["vob"]
      },
      "video/x-ms-wm": {
        source: "apache",
        extensions: ["wm"]
      },
      "video/x-ms-wmv": {
        source: "apache",
        compressible: false,
        extensions: ["wmv"]
      },
      "video/x-ms-wmx": {
        source: "apache",
        extensions: ["wmx"]
      },
      "video/x-ms-wvx": {
        source: "apache",
        extensions: ["wvx"]
      },
      "video/x-msvideo": {
        source: "apache",
        extensions: ["avi"]
      },
      "video/x-sgi-movie": {
        source: "apache",
        extensions: ["movie"]
      },
      "video/x-smv": {
        source: "apache",
        extensions: ["smv"]
      },
      "x-conference/x-cooltalk": {
        source: "apache",
        extensions: ["ice"]
      },
      "x-shader/x-fragment": {
        compressible: true
      },
      "x-shader/x-vertex": {
        compressible: true
      }
    };
  }
});

// ../../node_modules/mime-db/index.js
var require_mime_db = __commonJS({
  "../../node_modules/mime-db/index.js"(exports, module) {
    module.exports = require_db();
  }
});

// ../../node_modules/mime-types/index.js
var require_mime_types = __commonJS({
  "../../node_modules/mime-types/index.js"(exports) {
    "use strict";
    var db = require_mime_db();
    var extname = __require("path").extname;
    var EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/;
    var TEXT_TYPE_REGEXP = /^text\//i;
    exports.charset = charset;
    exports.charsets = { lookup: charset };
    exports.contentType = contentType;
    exports.extension = extension;
    exports.extensions = /* @__PURE__ */ Object.create(null);
    exports.lookup = lookup;
    exports.types = /* @__PURE__ */ Object.create(null);
    populateMaps(exports.extensions, exports.types);
    function charset(type) {
      if (!type || typeof type !== "string") {
        return false;
      }
      var match = EXTRACT_TYPE_REGEXP.exec(type);
      var mime = match && db[match[1].toLowerCase()];
      if (mime && mime.charset) {
        return mime.charset;
      }
      if (match && TEXT_TYPE_REGEXP.test(match[1])) {
        return "UTF-8";
      }
      return false;
    }
    function contentType(str) {
      if (!str || typeof str !== "string") {
        return false;
      }
      var mime = str.indexOf("/") === -1 ? exports.lookup(str) : str;
      if (!mime) {
        return false;
      }
      if (mime.indexOf("charset") === -1) {
        var charset2 = exports.charset(mime);
        if (charset2) mime += "; charset=" + charset2.toLowerCase();
      }
      return mime;
    }
    function extension(type) {
      if (!type || typeof type !== "string") {
        return false;
      }
      var match = EXTRACT_TYPE_REGEXP.exec(type);
      var exts = match && exports.extensions[match[1].toLowerCase()];
      if (!exts || !exts.length) {
        return false;
      }
      return exts[0];
    }
    function lookup(path2) {
      if (!path2 || typeof path2 !== "string") {
        return false;
      }
      var extension2 = extname("x." + path2).toLowerCase().substr(1);
      if (!extension2) {
        return false;
      }
      return exports.types[extension2] || false;
    }
    function populateMaps(extensions, types) {
      var preference = ["nginx", "apache", void 0, "iana"];
      Object.keys(db).forEach(function forEachMimeType(type) {
        var mime = db[type];
        var exts = mime.extensions;
        if (!exts || !exts.length) {
          return;
        }
        extensions[type] = exts;
        for (var i2 = 0; i2 < exts.length; i2++) {
          var extension2 = exts[i2];
          if (types[extension2]) {
            var from = preference.indexOf(db[types[extension2]].source);
            var to = preference.indexOf(mime.source);
            if (types[extension2] !== "application/octet-stream" && (from > to || from === to && types[extension2].substr(0, 12) === "application/")) {
              continue;
            }
          }
          types[extension2] = type;
        }
      });
    }
  }
});

// ../../node_modules/asynckit/lib/defer.js
var require_defer = __commonJS({
  "../../node_modules/asynckit/lib/defer.js"(exports, module) {
    module.exports = defer;
    function defer(fn) {
      var nextTick = typeof setImmediate == "function" ? setImmediate : typeof process == "object" && typeof process.nextTick == "function" ? process.nextTick : null;
      if (nextTick) {
        nextTick(fn);
      } else {
        setTimeout(fn, 0);
      }
    }
  }
});

// ../../node_modules/asynckit/lib/async.js
var require_async = __commonJS({
  "../../node_modules/asynckit/lib/async.js"(exports, module) {
    var defer = require_defer();
    module.exports = async;
    function async(callback) {
      var isAsync = false;
      defer(function() {
        isAsync = true;
      });
      return function async_callback(err, result) {
        if (isAsync) {
          callback(err, result);
        } else {
          defer(function nextTick_callback() {
            callback(err, result);
          });
        }
      };
    }
  }
});

// ../../node_modules/asynckit/lib/abort.js
var require_abort = __commonJS({
  "../../node_modules/asynckit/lib/abort.js"(exports, module) {
    module.exports = abort;
    function abort(state) {
      Object.keys(state.jobs).forEach(clean.bind(state));
      state.jobs = {};
    }
    function clean(key) {
      if (typeof this.jobs[key] == "function") {
        this.jobs[key]();
      }
    }
  }
});

// ../../node_modules/asynckit/lib/iterate.js
var require_iterate = __commonJS({
  "../../node_modules/asynckit/lib/iterate.js"(exports, module) {
    var async = require_async();
    var abort = require_abort();
    module.exports = iterate;
    function iterate(list, iterator, state, callback) {
      var key = state["keyedList"] ? state["keyedList"][state.index] : state.index;
      state.jobs[key] = runJob(iterator, key, list[key], function(error, output) {
        if (!(key in state.jobs)) {
          return;
        }
        delete state.jobs[key];
        if (error) {
          abort(state);
        } else {
          state.results[key] = output;
        }
        callback(error, state.results);
      });
    }
    function runJob(iterator, key, item, callback) {
      var aborter;
      if (iterator.length == 2) {
        aborter = iterator(item, async(callback));
      } else {
        aborter = iterator(item, key, async(callback));
      }
      return aborter;
    }
  }
});

// ../../node_modules/asynckit/lib/state.js
var require_state = __commonJS({
  "../../node_modules/asynckit/lib/state.js"(exports, module) {
    module.exports = state;
    function state(list, sortMethod) {
      var isNamedList = !Array.isArray(list), initState = {
        index: 0,
        keyedList: isNamedList || sortMethod ? Object.keys(list) : null,
        jobs: {},
        results: isNamedList ? {} : [],
        size: isNamedList ? Object.keys(list).length : list.length
      };
      if (sortMethod) {
        initState.keyedList.sort(isNamedList ? sortMethod : function(a2, b2) {
          return sortMethod(list[a2], list[b2]);
        });
      }
      return initState;
    }
  }
});

// ../../node_modules/asynckit/lib/terminator.js
var require_terminator = __commonJS({
  "../../node_modules/asynckit/lib/terminator.js"(exports, module) {
    var abort = require_abort();
    var async = require_async();
    module.exports = terminator;
    function terminator(callback) {
      if (!Object.keys(this.jobs).length) {
        return;
      }
      this.index = this.size;
      abort(this);
      async(callback)(null, this.results);
    }
  }
});

// ../../node_modules/asynckit/parallel.js
var require_parallel = __commonJS({
  "../../node_modules/asynckit/parallel.js"(exports, module) {
    var iterate = require_iterate();
    var initState = require_state();
    var terminator = require_terminator();
    module.exports = parallel;
    function parallel(list, iterator, callback) {
      var state = initState(list);
      while (state.index < (state["keyedList"] || list).length) {
        iterate(list, iterator, state, function(error, result) {
          if (error) {
            callback(error, result);
            return;
          }
          if (Object.keys(state.jobs).length === 0) {
            callback(null, state.results);
            return;
          }
        });
        state.index++;
      }
      return terminator.bind(state, callback);
    }
  }
});

// ../../node_modules/asynckit/serialOrdered.js
var require_serialOrdered = __commonJS({
  "../../node_modules/asynckit/serialOrdered.js"(exports, module) {
    var iterate = require_iterate();
    var initState = require_state();
    var terminator = require_terminator();
    module.exports = serialOrdered;
    module.exports.ascending = ascending;
    module.exports.descending = descending;
    function serialOrdered(list, iterator, sortMethod, callback) {
      var state = initState(list, sortMethod);
      iterate(list, iterator, state, function iteratorHandler(error, result) {
        if (error) {
          callback(error, result);
          return;
        }
        state.index++;
        if (state.index < (state["keyedList"] || list).length) {
          iterate(list, iterator, state, iteratorHandler);
          return;
        }
        callback(null, state.results);
      });
      return terminator.bind(state, callback);
    }
    function ascending(a2, b2) {
      return a2 < b2 ? -1 : a2 > b2 ? 1 : 0;
    }
    function descending(a2, b2) {
      return -1 * ascending(a2, b2);
    }
  }
});

// ../../node_modules/asynckit/serial.js
var require_serial = __commonJS({
  "../../node_modules/asynckit/serial.js"(exports, module) {
    var serialOrdered = require_serialOrdered();
    module.exports = serial;
    function serial(list, iterator, callback) {
      return serialOrdered(list, iterator, null, callback);
    }
  }
});

// ../../node_modules/asynckit/index.js
var require_asynckit = __commonJS({
  "../../node_modules/asynckit/index.js"(exports, module) {
    module.exports = {
      parallel: require_parallel(),
      serial: require_serial(),
      serialOrdered: require_serialOrdered()
    };
  }
});

// ../../node_modules/form-data/lib/populate.js
var require_populate = __commonJS({
  "../../node_modules/form-data/lib/populate.js"(exports, module) {
    module.exports = function(dst, src) {
      Object.keys(src).forEach(function(prop) {
        dst[prop] = dst[prop] || src[prop];
      });
      return dst;
    };
  }
});

// ../../node_modules/form-data/lib/form_data.js
var require_form_data = __commonJS({
  "../../node_modules/form-data/lib/form_data.js"(exports, module) {
    var CombinedStream = require_combined_stream();
    var util = __require("util");
    var path2 = __require("path");
    var http = __require("http");
    var https = __require("https");
    var parseUrl = __require("url").parse;
    var fs2 = __require("fs");
    var Stream = __require("stream").Stream;
    var mime = require_mime_types();
    var asynckit = require_asynckit();
    var populate = require_populate();
    module.exports = FormData3;
    util.inherits(FormData3, CombinedStream);
    function FormData3(options) {
      if (!(this instanceof FormData3)) {
        return new FormData3(options);
      }
      this._overheadLength = 0;
      this._valueLength = 0;
      this._valuesToMeasure = [];
      CombinedStream.call(this);
      options = options || {};
      for (var option in options) {
        this[option] = options[option];
      }
    }
    FormData3.LINE_BREAK = "\r\n";
    FormData3.DEFAULT_CONTENT_TYPE = "application/octet-stream";
    FormData3.prototype.append = function(field, value, options) {
      options = options || {};
      if (typeof options == "string") {
        options = { filename: options };
      }
      var append = CombinedStream.prototype.append.bind(this);
      if (typeof value == "number") {
        value = "" + value;
      }
      if (Array.isArray(value)) {
        this._error(new Error("Arrays are not supported."));
        return;
      }
      var header = this._multiPartHeader(field, value, options);
      var footer = this._multiPartFooter();
      append(header);
      append(value);
      append(footer);
      this._trackLength(header, value, options);
    };
    FormData3.prototype._trackLength = function(header, value, options) {
      var valueLength = 0;
      if (options.knownLength != null) {
        valueLength += +options.knownLength;
      } else if (Buffer.isBuffer(value)) {
        valueLength = value.length;
      } else if (typeof value === "string") {
        valueLength = Buffer.byteLength(value);
      }
      this._valueLength += valueLength;
      this._overheadLength += Buffer.byteLength(header) + FormData3.LINE_BREAK.length;
      if (!value || !value.path && !(value.readable && value.hasOwnProperty("httpVersion")) && !(value instanceof Stream)) {
        return;
      }
      if (!options.knownLength) {
        this._valuesToMeasure.push(value);
      }
    };
    FormData3.prototype._lengthRetriever = function(value, callback) {
      if (value.hasOwnProperty("fd")) {
        if (value.end != void 0 && value.end != Infinity && value.start != void 0) {
          callback(null, value.end + 1 - (value.start ? value.start : 0));
        } else {
          fs2.stat(value.path, function(err, stat) {
            var fileSize;
            if (err) {
              callback(err);
              return;
            }
            fileSize = stat.size - (value.start ? value.start : 0);
            callback(null, fileSize);
          });
        }
      } else if (value.hasOwnProperty("httpVersion")) {
        callback(null, +value.headers["content-length"]);
      } else if (value.hasOwnProperty("httpModule")) {
        value.on("response", function(response) {
          value.pause();
          callback(null, +response.headers["content-length"]);
        });
        value.resume();
      } else {
        callback("Unknown stream");
      }
    };
    FormData3.prototype._multiPartHeader = function(field, value, options) {
      if (typeof options.header == "string") {
        return options.header;
      }
      var contentDisposition = this._getContentDisposition(value, options);
      var contentType = this._getContentType(value, options);
      var contents = "";
      var headers = {
        // add custom disposition as third element or keep it two elements if not
        "Content-Disposition": ["form-data", 'name="' + field + '"'].concat(contentDisposition || []),
        // if no content type. allow it to be empty array
        "Content-Type": [].concat(contentType || [])
      };
      if (typeof options.header == "object") {
        populate(headers, options.header);
      }
      var header;
      for (var prop in headers) {
        if (!headers.hasOwnProperty(prop)) continue;
        header = headers[prop];
        if (header == null) {
          continue;
        }
        if (!Array.isArray(header)) {
          header = [header];
        }
        if (header.length) {
          contents += prop + ": " + header.join("; ") + FormData3.LINE_BREAK;
        }
      }
      return "--" + this.getBoundary() + FormData3.LINE_BREAK + contents + FormData3.LINE_BREAK;
    };
    FormData3.prototype._getContentDisposition = function(value, options) {
      var filename, contentDisposition;
      if (typeof options.filepath === "string") {
        filename = path2.normalize(options.filepath).replace(/\\/g, "/");
      } else if (options.filename || value.name || value.path) {
        filename = path2.basename(options.filename || value.name || value.path);
      } else if (value.readable && value.hasOwnProperty("httpVersion")) {
        filename = path2.basename(value.client._httpMessage.path || "");
      }
      if (filename) {
        contentDisposition = 'filename="' + filename + '"';
      }
      return contentDisposition;
    };
    FormData3.prototype._getContentType = function(value, options) {
      var contentType = options.contentType;
      if (!contentType && value.name) {
        contentType = mime.lookup(value.name);
      }
      if (!contentType && value.path) {
        contentType = mime.lookup(value.path);
      }
      if (!contentType && value.readable && value.hasOwnProperty("httpVersion")) {
        contentType = value.headers["content-type"];
      }
      if (!contentType && (options.filepath || options.filename)) {
        contentType = mime.lookup(options.filepath || options.filename);
      }
      if (!contentType && typeof value == "object") {
        contentType = FormData3.DEFAULT_CONTENT_TYPE;
      }
      return contentType;
    };
    FormData3.prototype._multiPartFooter = function() {
      return function(next) {
        var footer = FormData3.LINE_BREAK;
        var lastPart = this._streams.length === 0;
        if (lastPart) {
          footer += this._lastBoundary();
        }
        next(footer);
      }.bind(this);
    };
    FormData3.prototype._lastBoundary = function() {
      return "--" + this.getBoundary() + "--" + FormData3.LINE_BREAK;
    };
    FormData3.prototype.getHeaders = function(userHeaders) {
      var header;
      var formHeaders = {
        "content-type": "multipart/form-data; boundary=" + this.getBoundary()
      };
      for (header in userHeaders) {
        if (userHeaders.hasOwnProperty(header)) {
          formHeaders[header.toLowerCase()] = userHeaders[header];
        }
      }
      return formHeaders;
    };
    FormData3.prototype.setBoundary = function(boundary) {
      this._boundary = boundary;
    };
    FormData3.prototype.getBoundary = function() {
      if (!this._boundary) {
        this._generateBoundary();
      }
      return this._boundary;
    };
    FormData3.prototype.getBuffer = function() {
      var dataBuffer = new Buffer.alloc(0);
      var boundary = this.getBoundary();
      for (var i2 = 0, len = this._streams.length; i2 < len; i2++) {
        if (typeof this._streams[i2] !== "function") {
          if (Buffer.isBuffer(this._streams[i2])) {
            dataBuffer = Buffer.concat([dataBuffer, this._streams[i2]]);
          } else {
            dataBuffer = Buffer.concat([dataBuffer, Buffer.from(this._streams[i2])]);
          }
          if (typeof this._streams[i2] !== "string" || this._streams[i2].substring(2, boundary.length + 2) !== boundary) {
            dataBuffer = Buffer.concat([dataBuffer, Buffer.from(FormData3.LINE_BREAK)]);
          }
        }
      }
      return Buffer.concat([dataBuffer, Buffer.from(this._lastBoundary())]);
    };
    FormData3.prototype._generateBoundary = function() {
      var boundary = "--------------------------";
      for (var i2 = 0; i2 < 24; i2++) {
        boundary += Math.floor(Math.random() * 10).toString(16);
      }
      this._boundary = boundary;
    };
    FormData3.prototype.getLengthSync = function() {
      var knownLength = this._overheadLength + this._valueLength;
      if (this._streams.length) {
        knownLength += this._lastBoundary().length;
      }
      if (!this.hasKnownLength()) {
        this._error(new Error("Cannot calculate proper length in synchronous way."));
      }
      return knownLength;
    };
    FormData3.prototype.hasKnownLength = function() {
      var hasKnownLength = true;
      if (this._valuesToMeasure.length) {
        hasKnownLength = false;
      }
      return hasKnownLength;
    };
    FormData3.prototype.getLength = function(cb) {
      var knownLength = this._overheadLength + this._valueLength;
      if (this._streams.length) {
        knownLength += this._lastBoundary().length;
      }
      if (!this._valuesToMeasure.length) {
        process.nextTick(cb.bind(this, null, knownLength));
        return;
      }
      asynckit.parallel(this._valuesToMeasure, this._lengthRetriever, function(err, values) {
        if (err) {
          cb(err);
          return;
        }
        values.forEach(function(length) {
          knownLength += length;
        });
        cb(null, knownLength);
      });
    };
    FormData3.prototype.submit = function(params, cb) {
      var request, options, defaults = { method: "post" };
      if (typeof params == "string") {
        params = parseUrl(params);
        options = populate({
          port: params.port,
          path: params.pathname,
          host: params.hostname,
          protocol: params.protocol
        }, defaults);
      } else {
        options = populate(params, defaults);
        if (!options.port) {
          options.port = options.protocol == "https:" ? 443 : 80;
        }
      }
      options.headers = this.getHeaders(params.headers);
      if (options.protocol == "https:") {
        request = https.request(options);
      } else {
        request = http.request(options);
      }
      this.getLength(function(err, length) {
        if (err && err !== "Unknown stream") {
          this._error(err);
          return;
        }
        if (length) {
          request.setHeader("Content-Length", length);
        }
        this.pipe(request);
        if (cb) {
          var onResponse;
          var callback = function(error, responce) {
            request.removeListener("error", callback);
            request.removeListener("response", onResponse);
            return cb.call(this, error, responce);
          };
          onResponse = callback.bind(this, null);
          request.on("error", callback);
          request.on("response", onResponse);
        }
      }.bind(this));
      return request;
    };
    FormData3.prototype._error = function(err) {
      if (!this.error) {
        this.error = err;
        this.pause();
        this.emit("error", err);
      }
    };
    FormData3.prototype.toString = function() {
      return "[object FormData]";
    };
  }
});

// ../../node_modules/capsolver-npm/node_modules/axios/lib/defaults/env/FormData.js
var require_FormData = __commonJS({
  "../../node_modules/capsolver-npm/node_modules/axios/lib/defaults/env/FormData.js"(exports, module) {
    module.exports = require_form_data();
  }
});

// ../../node_modules/capsolver-npm/node_modules/axios/lib/defaults/index.js
var require_defaults = __commonJS({
  "../../node_modules/capsolver-npm/node_modules/axios/lib/defaults/index.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var normalizeHeaderName = require_normalizeHeaderName();
    var AxiosError = require_AxiosError();
    var transitionalDefaults = require_transitional();
    var toFormData = require_toFormData();
    var DEFAULT_CONTENT_TYPE = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    function setContentTypeIfUnset(headers, value) {
      if (!utils.isUndefined(headers) && utils.isUndefined(headers["Content-Type"])) {
        headers["Content-Type"] = value;
      }
    }
    function getDefaultAdapter() {
      var adapter;
      if (typeof XMLHttpRequest !== "undefined") {
        adapter = require_xhr();
      } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
        adapter = require_http();
      }
      return adapter;
    }
    function stringifySafely(rawValue, parser, encoder) {
      if (utils.isString(rawValue)) {
        try {
          (parser || JSON.parse)(rawValue);
          return utils.trim(rawValue);
        } catch (e2) {
          if (e2.name !== "SyntaxError") {
            throw e2;
          }
        }
      }
      return (encoder || JSON.stringify)(rawValue);
    }
    var defaults = {
      transitional: transitionalDefaults,
      adapter: getDefaultAdapter(),
      transformRequest: [function transformRequest(data, headers) {
        normalizeHeaderName(headers, "Accept");
        normalizeHeaderName(headers, "Content-Type");
        if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
          return data;
        }
        if (utils.isArrayBufferView(data)) {
          return data.buffer;
        }
        if (utils.isURLSearchParams(data)) {
          setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
          return data.toString();
        }
        var isObjectPayload = utils.isObject(data);
        var contentType = headers && headers["Content-Type"];
        var isFileList;
        if ((isFileList = utils.isFileList(data)) || isObjectPayload && contentType === "multipart/form-data") {
          var _FormData = this.env && this.env.FormData;
          return toFormData(isFileList ? { "files[]": data } : data, _FormData && new _FormData());
        } else if (isObjectPayload || contentType === "application/json") {
          setContentTypeIfUnset(headers, "application/json");
          return stringifySafely(data);
        }
        return data;
      }],
      transformResponse: [function transformResponse(data) {
        var transitional = this.transitional || defaults.transitional;
        var silentJSONParsing = transitional && transitional.silentJSONParsing;
        var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
        var strictJSONParsing = !silentJSONParsing && this.responseType === "json";
        if (strictJSONParsing || forcedJSONParsing && utils.isString(data) && data.length) {
          try {
            return JSON.parse(data);
          } catch (e2) {
            if (strictJSONParsing) {
              if (e2.name === "SyntaxError") {
                throw AxiosError.from(e2, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
              }
              throw e2;
            }
          }
        }
        return data;
      }],
      /**
       * A timeout in milliseconds to abort a request. If set to 0 (default) a
       * timeout is not created.
       */
      timeout: 0,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      maxContentLength: -1,
      maxBodyLength: -1,
      env: {
        FormData: require_FormData()
      },
      validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
      },
      headers: {
        common: {
          "Accept": "application/json, text/plain, */*"
        }
      }
    };
    utils.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
      defaults.headers[method] = {};
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
    });
    module.exports = defaults;
  }
});

// ../../node_modules/capsolver-npm/node_modules/axios/lib/core/transformData.js
var require_transformData = __commonJS({
  "../../node_modules/capsolver-npm/node_modules/axios/lib/core/transformData.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var defaults = require_defaults();
    module.exports = function transformData(data, headers, fns) {
      var context = this || defaults;
      utils.forEach(fns, function transform(fn) {
        data = fn.call(context, data, headers);
      });
      return data;
    };
  }
});

// ../../node_modules/capsolver-npm/node_modules/axios/lib/cancel/isCancel.js
var require_isCancel = __commonJS({
  "../../node_modules/capsolver-npm/node_modules/axios/lib/cancel/isCancel.js"(exports, module) {
    "use strict";
    module.exports = function isCancel(value) {
      return !!(value && value.__CANCEL__);
    };
  }
});

// ../../node_modules/capsolver-npm/node_modules/axios/lib/core/dispatchRequest.js
var require_dispatchRequest = __commonJS({
  "../../node_modules/capsolver-npm/node_modules/axios/lib/core/dispatchRequest.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var transformData = require_transformData();
    var isCancel = require_isCancel();
    var defaults = require_defaults();
    var CanceledError = require_CanceledError();
    function throwIfCancellationRequested(config2) {
      if (config2.cancelToken) {
        config2.cancelToken.throwIfRequested();
      }
      if (config2.signal && config2.signal.aborted) {
        throw new CanceledError();
      }
    }
    module.exports = function dispatchRequest(config2) {
      throwIfCancellationRequested(config2);
      config2.headers = config2.headers || {};
      config2.data = transformData.call(
        config2,
        config2.data,
        config2.headers,
        config2.transformRequest
      );
      config2.headers = utils.merge(
        config2.headers.common || {},
        config2.headers[config2.method] || {},
        config2.headers
      );
      utils.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        function cleanHeaderConfig(method) {
          delete config2.headers[method];
        }
      );
      var adapter = config2.adapter || defaults.adapter;
      return adapter(config2).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config2);
        response.data = transformData.call(
          config2,
          response.data,
          response.headers,
          config2.transformResponse
        );
        return response;
      }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
          throwIfCancellationRequested(config2);
          if (reason && reason.response) {
            reason.response.data = transformData.call(
              config2,
              reason.response.data,
              reason.response.headers,
              config2.transformResponse
            );
          }
        }
        return Promise.reject(reason);
      });
    };
  }
});

// ../../node_modules/capsolver-npm/node_modules/axios/lib/core/mergeConfig.js
var require_mergeConfig = __commonJS({
  "../../node_modules/capsolver-npm/node_modules/axios/lib/core/mergeConfig.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    module.exports = function mergeConfig(config1, config2) {
      config2 = config2 || {};
      var config3 = {};
      function getMergedValue(target, source) {
        if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
          return utils.merge(target, source);
        } else if (utils.isPlainObject(source)) {
          return utils.merge({}, source);
        } else if (utils.isArray(source)) {
          return source.slice();
        }
        return source;
      }
      function mergeDeepProperties(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(config1[prop], config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      function valueFromConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(void 0, config2[prop]);
        }
      }
      function defaultToConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(void 0, config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      function mergeDirectKeys(prop) {
        if (prop in config2) {
          return getMergedValue(config1[prop], config2[prop]);
        } else if (prop in config1) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      var mergeMap = {
        "url": valueFromConfig2,
        "method": valueFromConfig2,
        "data": valueFromConfig2,
        "baseURL": defaultToConfig2,
        "transformRequest": defaultToConfig2,
        "transformResponse": defaultToConfig2,
        "paramsSerializer": defaultToConfig2,
        "timeout": defaultToConfig2,
        "timeoutMessage": defaultToConfig2,
        "withCredentials": defaultToConfig2,
        "adapter": defaultToConfig2,
        "responseType": defaultToConfig2,
        "xsrfCookieName": defaultToConfig2,
        "xsrfHeaderName": defaultToConfig2,
        "onUploadProgress": defaultToConfig2,
        "onDownloadProgress": defaultToConfig2,
        "decompress": defaultToConfig2,
        "maxContentLength": defaultToConfig2,
        "maxBodyLength": defaultToConfig2,
        "beforeRedirect": defaultToConfig2,
        "transport": defaultToConfig2,
        "httpAgent": defaultToConfig2,
        "httpsAgent": defaultToConfig2,
        "cancelToken": defaultToConfig2,
        "socketPath": defaultToConfig2,
        "responseEncoding": defaultToConfig2,
        "validateStatus": mergeDirectKeys
      };
      utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
        var merge3 = mergeMap[prop] || mergeDeepProperties;
        var configValue = merge3(prop);
        utils.isUndefined(configValue) && merge3 !== mergeDirectKeys || (config3[prop] = configValue);
      });
      return config3;
    };
  }
});

// ../../node_modules/capsolver-npm/node_modules/axios/lib/helpers/validator.js
var require_validator = __commonJS({
  "../../node_modules/capsolver-npm/node_modules/axios/lib/helpers/validator.js"(exports, module) {
    "use strict";
    var VERSION = require_data().version;
    var AxiosError = require_AxiosError();
    var validators = {};
    ["object", "boolean", "number", "function", "string", "symbol"].forEach(function(type, i2) {
      validators[type] = function validator(thing) {
        return typeof thing === type || "a" + (i2 < 1 ? "n " : " ") + type;
      };
    });
    var deprecatedWarnings = {};
    validators.transitional = function transitional(validator, version2, message) {
      function formatMessage(opt, desc) {
        return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
      }
      return function(value, opt, opts) {
        if (validator === false) {
          throw new AxiosError(
            formatMessage(opt, " has been removed" + (version2 ? " in " + version2 : "")),
            AxiosError.ERR_DEPRECATED
          );
        }
        if (version2 && !deprecatedWarnings[opt]) {
          deprecatedWarnings[opt] = true;
          console.warn(
            formatMessage(
              opt,
              " has been deprecated since v" + version2 + " and will be removed in the near future"
            )
          );
        }
        return validator ? validator(value, opt, opts) : true;
      };
    };
    function assertOptions(options, schema, allowUnknown) {
      if (typeof options !== "object") {
        throw new AxiosError("options must be an object", AxiosError.ERR_BAD_OPTION_VALUE);
      }
      var keys = Object.keys(options);
      var i2 = keys.length;
      while (i2-- > 0) {
        var opt = keys[i2];
        var validator = schema[opt];
        if (validator) {
          var value = options[opt];
          var result = value === void 0 || validator(value, opt, options);
          if (result !== true) {
            throw new AxiosError("option " + opt + " must be " + result, AxiosError.ERR_BAD_OPTION_VALUE);
          }
          continue;
        }
        if (allowUnknown !== true) {
          throw new AxiosError("Unknown option " + opt, AxiosError.ERR_BAD_OPTION);
        }
      }
    }
    module.exports = {
      assertOptions,
      validators
    };
  }
});

// ../../node_modules/capsolver-npm/node_modules/axios/lib/core/Axios.js
var require_Axios = __commonJS({
  "../../node_modules/capsolver-npm/node_modules/axios/lib/core/Axios.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var buildURL = require_buildURL();
    var InterceptorManager = require_InterceptorManager();
    var dispatchRequest = require_dispatchRequest();
    var mergeConfig = require_mergeConfig();
    var buildFullPath = require_buildFullPath();
    var validator = require_validator();
    var validators = validator.validators;
    function Axios(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
      };
    }
    Axios.prototype.request = function request(configOrUrl, config2) {
      if (typeof configOrUrl === "string") {
        config2 = config2 || {};
        config2.url = configOrUrl;
      } else {
        config2 = configOrUrl || {};
      }
      config2 = mergeConfig(this.defaults, config2);
      if (config2.method) {
        config2.method = config2.method.toLowerCase();
      } else if (this.defaults.method) {
        config2.method = this.defaults.method.toLowerCase();
      } else {
        config2.method = "get";
      }
      var transitional = config2.transitional;
      if (transitional !== void 0) {
        validator.assertOptions(transitional, {
          silentJSONParsing: validators.transitional(validators.boolean),
          forcedJSONParsing: validators.transitional(validators.boolean),
          clarifyTimeoutError: validators.transitional(validators.boolean)
        }, false);
      }
      var requestInterceptorChain = [];
      var synchronousRequestInterceptors = true;
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config2) === false) {
          return;
        }
        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      var responseInterceptorChain = [];
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      });
      var promise;
      if (!synchronousRequestInterceptors) {
        var chain = [dispatchRequest, void 0];
        Array.prototype.unshift.apply(chain, requestInterceptorChain);
        chain = chain.concat(responseInterceptorChain);
        promise = Promise.resolve(config2);
        while (chain.length) {
          promise = promise.then(chain.shift(), chain.shift());
        }
        return promise;
      }
      var newConfig = config2;
      while (requestInterceptorChain.length) {
        var onFulfilled = requestInterceptorChain.shift();
        var onRejected = requestInterceptorChain.shift();
        try {
          newConfig = onFulfilled(newConfig);
        } catch (error) {
          onRejected(error);
          break;
        }
      }
      try {
        promise = dispatchRequest(newConfig);
      } catch (error) {
        return Promise.reject(error);
      }
      while (responseInterceptorChain.length) {
        promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
      }
      return promise;
    };
    Axios.prototype.getUri = function getUri(config2) {
      config2 = mergeConfig(this.defaults, config2);
      var fullPath = buildFullPath(config2.baseURL, config2.url);
      return buildURL(fullPath, config2.params, config2.paramsSerializer);
    };
    utils.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
      Axios.prototype[method] = function(url, config2) {
        return this.request(mergeConfig(config2 || {}, {
          method,
          url,
          data: (config2 || {}).data
        }));
      };
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      function generateHTTPMethod(isForm) {
        return function httpMethod(url, data, config2) {
          return this.request(mergeConfig(config2 || {}, {
            method,
            headers: isForm ? {
              "Content-Type": "multipart/form-data"
            } : {},
            url,
            data
          }));
        };
      }
      Axios.prototype[method] = generateHTTPMethod();
      Axios.prototype[method + "Form"] = generateHTTPMethod(true);
    });
    module.exports = Axios;
  }
});

// ../../node_modules/capsolver-npm/node_modules/axios/lib/cancel/CancelToken.js
var require_CancelToken = __commonJS({
  "../../node_modules/capsolver-npm/node_modules/axios/lib/cancel/CancelToken.js"(exports, module) {
    "use strict";
    var CanceledError = require_CanceledError();
    function CancelToken(executor) {
      if (typeof executor !== "function") {
        throw new TypeError("executor must be a function.");
      }
      var resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });
      var token = this;
      this.promise.then(function(cancel) {
        if (!token._listeners) return;
        var i2;
        var l2 = token._listeners.length;
        for (i2 = 0; i2 < l2; i2++) {
          token._listeners[i2](cancel);
        }
        token._listeners = null;
      });
      this.promise.then = function(onfulfilled) {
        var _resolve;
        var promise = new Promise(function(resolve) {
          token.subscribe(resolve);
          _resolve = resolve;
        }).then(onfulfilled);
        promise.cancel = function reject() {
          token.unsubscribe(_resolve);
        };
        return promise;
      };
      executor(function cancel(message) {
        if (token.reason) {
          return;
        }
        token.reason = new CanceledError(message);
        resolvePromise(token.reason);
      });
    }
    CancelToken.prototype.throwIfRequested = function throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    };
    CancelToken.prototype.subscribe = function subscribe(listener) {
      if (this.reason) {
        listener(this.reason);
        return;
      }
      if (this._listeners) {
        this._listeners.push(listener);
      } else {
        this._listeners = [listener];
      }
    };
    CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
      if (!this._listeners) {
        return;
      }
      var index = this._listeners.indexOf(listener);
      if (index !== -1) {
        this._listeners.splice(index, 1);
      }
    };
    CancelToken.source = function source() {
      var cancel;
      var token = new CancelToken(function executor(c2) {
        cancel = c2;
      });
      return {
        token,
        cancel
      };
    };
    module.exports = CancelToken;
  }
});

// ../../node_modules/capsolver-npm/node_modules/axios/lib/helpers/spread.js
var require_spread = __commonJS({
  "../../node_modules/capsolver-npm/node_modules/axios/lib/helpers/spread.js"(exports, module) {
    "use strict";
    module.exports = function spread(callback) {
      return function wrap(arr) {
        return callback.apply(null, arr);
      };
    };
  }
});

// ../../node_modules/capsolver-npm/node_modules/axios/lib/helpers/isAxiosError.js
var require_isAxiosError = __commonJS({
  "../../node_modules/capsolver-npm/node_modules/axios/lib/helpers/isAxiosError.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    module.exports = function isAxiosError(payload) {
      return utils.isObject(payload) && payload.isAxiosError === true;
    };
  }
});

// ../../node_modules/capsolver-npm/node_modules/axios/lib/axios.js
var require_axios = __commonJS({
  "../../node_modules/capsolver-npm/node_modules/axios/lib/axios.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var bind = require_bind();
    var Axios = require_Axios();
    var mergeConfig = require_mergeConfig();
    var defaults = require_defaults();
    function createInstance(defaultConfig) {
      var context = new Axios(defaultConfig);
      var instance = bind(Axios.prototype.request, context);
      utils.extend(instance, Axios.prototype, context);
      utils.extend(instance, context);
      instance.create = function create(instanceConfig) {
        return createInstance(mergeConfig(defaultConfig, instanceConfig));
      };
      return instance;
    }
    var axios = createInstance(defaults);
    axios.Axios = Axios;
    axios.CanceledError = require_CanceledError();
    axios.CancelToken = require_CancelToken();
    axios.isCancel = require_isCancel();
    axios.VERSION = require_data().version;
    axios.toFormData = require_toFormData();
    axios.AxiosError = require_AxiosError();
    axios.Cancel = axios.CanceledError;
    axios.all = function all(promises) {
      return Promise.all(promises);
    };
    axios.spread = require_spread();
    axios.isAxiosError = require_isAxiosError();
    module.exports = axios;
    module.exports.default = axios;
  }
});

// ../../node_modules/capsolver-npm/node_modules/axios/index.js
var require_axios2 = __commonJS({
  "../../node_modules/capsolver-npm/node_modules/axios/index.js"(exports, module) {
    module.exports = require_axios();
  }
});

// ../../node_modules/capsolver-npm/src/Exception.js
var require_Exception = __commonJS({
  "../../node_modules/capsolver-npm/src/Exception.js"(exports, module) {
    var TaskException = class extends Error {
      constructor(message, errorResponse) {
        super(message);
        this.code = errorResponse.errorCode ?? null;
        this.description = errorResponse.errorDescription ?? null;
      }
    };
    module.exports = { TaskException };
  }
});

// ../../node_modules/capsolver-npm/src/Validation.js
var require_Validation = __commonJS({
  "../../node_modules/capsolver-npm/src/Validation.js"(exports, module) {
    var parameters = {
      ImageToTextTask: [
        { name: "body", required: false, type: "string" },
        { name: "module", required: false, type: "string" },
        { name: "score", required: false, type: "number" },
        { name: "case", required: false, type: "boolean" }
      ],
      AwsWafClassification: [
        { name: "images", required: false, type: "object" },
        { name: "question", required: false, type: "string" },
        { name: "score", required: false, type: "number" },
        { name: "case", required: false, type: "boolean" }
      ],
      BinanceCaptchaTask: [
        { name: "websiteURL", required: false, type: "string" },
        { name: "websiteKey", required: false, type: "string" },
        { name: "validateId", required: false, type: "string" },
        { name: "proxy", required: false, type: "string" },
        { name: "proxyPassword", required: false, type: "string" }
      ],
      MtCaptchaTask: [
        { name: "websiteURL", required: false, type: "string" },
        { name: "websiteKey", required: false, type: "string" },
        { name: "proxy", required: false, type: "string" },
        { name: "proxyPassword", required: false, type: "string" }
      ],
      MtCaptchaTaskProxyLess: [
        { name: "websiteURL", required: false, type: "string" },
        { name: "websiteKey", required: false, type: "string" }
      ],
      HCaptchaTask: [
        { name: "websiteURL", required: false, type: "string" },
        { name: "websiteKey", required: false, type: "string" },
        { name: "proxy", required: false, type: "string" },
        { name: "isInvisible", required: false, type: "boolean" },
        { name: "enterprisePayload", required: false, type: "object" },
        { name: "userAgent", required: false, type: "string" }
      ],
      HCaptchaTaskProxyLess: [
        { name: "websiteURL", required: false, type: "string" },
        { name: "websiteKey", required: false, type: "string" },
        { name: "isInvisible", required: false, type: "boolean" },
        { name: "enterprisePayload", required: false, type: "object" },
        { name: "userAgent", required: false, type: "string" }
      ],
      HCaptchaEnterpriseTask: [
        { name: "websiteURL", required: false, type: "string" },
        { name: "websiteKey", required: false, type: "string" },
        { name: "proxy", required: false, type: "string" },
        { name: "isInvisible", required: false, type: "boolean" },
        { name: "isEnterprise", required: false, type: "boolean" },
        { name: "enterprisePayload", required: false, type: "object" },
        { name: "userAgent", required: false, type: "string" }
      ],
      HCaptchaEnterpriseTaskProxyLess: [
        { name: "websiteURL", required: false, type: "string" },
        { name: "websiteKey", required: false, type: "string" },
        { name: "isInvisible", required: false, type: "boolean" },
        { name: "isEnterprise", required: false, type: "boolean" },
        { name: "enterprisePayload", required: false, type: "object" },
        { name: "userAgent", required: false, type: "string" }
      ],
      HCaptchaTurboTask: [
        { name: "websiteURL", required: false, type: "string" },
        { name: "websiteKey", required: false, type: "string" },
        { name: "proxy", required: false, type: "string" },
        { name: "isInvisible", required: false, type: "boolean" },
        { name: "isEnterprise", required: false, type: "boolean" },
        { name: "enterprisePayload", required: false, type: "object" },
        { name: "userAgent", required: false, type: "string" }
      ],
      HCaptchaClassification: [
        { name: "question", required: false, type: "string" },
        { name: "queries", required: false, type: "object" }
      ],
      RecaptchaV2Task: [
        { name: "websiteURL", required: false, type: "string" },
        { name: "websiteKey", required: false, type: "string" },
        { name: "userAgent", required: false, type: "string" },
        { name: "isInvisible", required: false, type: "boolean" },
        { name: "recaptchaDataSValue", required: false, type: "string" },
        { name: "cookies", required: false, type: "string" },
        { name: "proxy", required: false, type: "string" }
      ],
      RecaptchaV2TaskProxyless: [
        { name: "websiteURL", required: false, type: "string" },
        { name: "websiteKey", required: false, type: "string" },
        { name: "userAgent", required: false, type: "string" },
        { name: "isInvisible", required: false, type: "boolean" },
        { name: "recaptchaDataSValue", required: false, type: "string" },
        { name: "cookies", required: false, type: "string" }
      ],
      RecaptchaV2EnterpriseTask: [
        { name: "websiteURL", required: false, type: "string" },
        { name: "websiteKey", required: false, type: "string" },
        { name: "userAgent", required: false, type: "string" },
        { name: "enterprisePayload", required: false, type: "object" },
        { name: "apiDomain", required: false, type: "string" },
        { name: "cookies", required: false, type: "string" },
        { name: "proxy", required: false, type: "string" }
      ],
      RecaptchaV2EnterpriseTaskProxyless: [
        { name: "websiteURL", required: false, type: "string" },
        { name: "websiteKey", required: false, type: "string" },
        { name: "userAgent", required: false, type: "string" },
        { name: "enterprisePayload", required: false, type: "object" },
        { name: "apiDomain", required: false, type: "string" },
        { name: "cookies", required: false, type: "string" }
      ],
      RecaptchaV3Task: [
        { name: "websiteURL", required: false, type: "string" },
        { name: "websiteKey", required: false, type: "string" },
        { name: "pageAction", required: false, type: "string" },
        { name: "minScore", required: false, type: "number" },
        { name: "proxy", required: false, type: "string" }
      ],
      RecaptchaV3TaskProxyless: [
        { name: "websiteURL", required: false, type: "string" },
        { name: "websiteKey", required: false, type: "string" },
        { name: "pageAction", required: false, type: "string" },
        { name: "minScore", required: false, type: "number" }
      ],
      ReCaptchaV2Classification: [
        { name: "question", required: false, type: "string" },
        { name: "image", required: false, type: "string" }
      ],
      GeeTestTask: [
        { name: "websiteURL", required: false, type: "string" },
        { name: "gt", required: false, type: "string" },
        { name: "challenge", required: false, type: "string" },
        { name: "geetestApiServerSubdomain", required: false, type: "string" },
        { name: "userAgent", required: false, type: "string" },
        { name: "captchaId", required: false, type: "string" },
        { name: "proxy", required: false, type: "string" }
      ],
      GeeTestTaskProxyless: [
        { name: "websiteURL", required: false, type: "string" },
        { name: "gt", required: false, type: "string" },
        { name: "challenge", required: false, type: "string" },
        { name: "geetestApiServerSubdomain", required: false, type: "string" },
        { name: "userAgent", required: false, type: "string" },
        { name: "captchaId", required: false, type: "string" }
      ],
      DataDomeSliderTask: [
        { name: "websiteURL", required: false, type: "string" },
        { name: "captchaUrl", required: false, type: "string" },
        { name: "userAgent", required: false, type: "string" },
        { name: "proxy", required: false, type: "string" },
        { name: "proxyPassword", required: false, type: "string" }
      ],
      FunCaptchaTask: [
        { name: "websiteURL", required: false, type: "string" },
        { name: "websitePublicKey", required: false, type: "string" },
        { name: "funcaptchaApiJSSubdomain", required: false, type: "string" },
        { name: "data", required: false, type: "string" },
        { name: "userAgent", required: false, type: "string" },
        { name: "proxy", required: false, type: "string" }
      ],
      FunCaptchaClassification: [
        { name: "image", required: false, type: "string" },
        { name: "question", required: false, type: "string" }
      ],
      FunCaptchaTaskProxyless: [
        { name: "websiteURL", required: false, type: "string" },
        { name: "websitePublicKey", required: false, type: "string" },
        { name: "funcaptchaApiJSSubdomain", required: false, type: "string" },
        { name: "data", required: false, type: "string" },
        { name: "userAgent", required: false, type: "string" }
      ],
      AntiCloudflareTask: [
        { name: "websiteURL", required: false, type: "string" },
        { name: "websiteKey", required: false, type: "string" },
        { name: "metadata", required: false, type: "object" },
        { name: "proxy", required: false, type: "string" }
      ]
    };
    module.exports = parameters;
  }
});

// ../../node_modules/capsolver-npm/src/Handler.js
var require_Handler = __commonJS({
  "../../node_modules/capsolver-npm/src/Handler.js"(exports, module) {
    var axios = require_axios2();
    var sleep = (ms) => new Promise((r2) => setTimeout(r2, ms));
    var { TaskException } = require_Exception();
    var Handler = class {
      constructor({ task, apiKey, verbose, mustPoll = true }) {
        this.task = task;
        this.apiKey = apiKey;
        this.verbose = verbose;
        this.mustPoll = mustPoll;
        this.parameters = require_Validation();
      }
      validate(task) {
        const parameters = Object.keys(this.parameters).reduce((acc, key) => {
          acc[key.toLowerCase()] = this.parameters[key];
          return acc;
        }, {});
        const typeParams = parameters[task.type.toLowerCase()];
        if (typeParams) {
          typeParams.forEach((param) => {
            const value = task[param.name];
            if (param.required && (!value || typeof value !== param.type)) {
              throw new TypeError(`${param.name} must be of type ${param.type} and not empty.`);
            }
          });
        } else if (this.verbose !== 0) {
          console.log(`capsolver-npm: running not recognized task ${task.type}]`);
        }
        return true;
      }
      async execute(rqDelay) {
        return new Promise(async (resolve, reject) => {
          try {
            if (this.mustPoll) {
              await this.create().then(async (data) => {
                resolve(await this.pollSolution(data.taskId, rqDelay));
              });
            } else {
              resolve((await this.create()).solution);
            }
          } catch (error) {
            reject(error);
          }
        });
      }
      async create() {
        return new Promise(async (resolve, reject) => {
          this.validate(this.task);
          await axios({
            url: "https://api.capsolver.com/createTask",
            method: "POST",
            data: { clientKey: this.apiKey, appId: "AF0F28E5-8245-49FD-A3FD-43D576C0E9B3", task: this.task }
          }).then((res) => {
            if (res.data.errorId !== 0) {
              reject(new TaskException("Failed to create task", res.data));
            }
            resolve(res.data);
          }).catch((e2) => {
            reject(new TaskException("Failed to create task", e2.response ? e2.response.data : { errorCode: e2.message }));
          });
        });
      }
      async pollSolution(taskId, rqDelay) {
        return new Promise(async (resolve, reject) => {
          const req = { method: "post", url: "https://api.capsolver.com/getTaskResult", data: { clientKey: this.apiKey, taskId } };
          let threshold = 0;
          while (threshold <= 10) {
            await sleep(rqDelay);
            try {
              const res = await axios(req);
              if (res.data.errorId !== 0) {
                reject(new TaskException("Failed to retrieve task result", res.data));
                break;
              }
              if (this.verbose !== 0) console.log(`capsolver-npm: { "id" : "${taskId}", "status": "${res.data.status}" }`);
              if (res.data.status === "ready") {
                resolve(res.data.solution ? res.data.solution : res.data);
                break;
              }
            } catch (error) {
              threshold++;
            }
          }
          reject(new TaskException("Failed to retrieve task result", { code: "unknown", description: "Contact at https://github.com/0qwertyy/capsolver-npm/issues" }));
        });
      }
    };
    module.exports = Handler;
  }
});

// ../../node_modules/capsolver-npm/src/Solver.js
var require_Solver = __commonJS({
  "../../node_modules/capsolver-npm/src/Solver.js"(exports, module) {
    __require("dotenv").config();
    var axios = require_axios2();
    var Handler = require_Handler();
    var TaskException = require_Exception();
    var Solver = class {
      constructor(apiKey = process.env.APIKEY ?? "", verbose = 0, rqDelay = 1700) {
        this.apiKey = apiKey;
        this.verbose = verbose;
        this.rqDelay = rqDelay;
      }
      async balance() {
        try {
          let res = await axios.post("https://api.capsolver.com/getBalance", { clientKey: this.apiKey });
          let data = res.data;
          if (data["errorId"] !== 0) {
            throw new TaskException("Failed to retrieve balance", data);
          }
          return data.balance ? parseFloat(data.balance) : data;
        } catch (error) {
          console.error(error);
          throw error;
        }
      }
      async runCustomTaskType({
        task,
        mustPoll = true
      }) {
        return new Promise((resolve, reject) => {
          if (task.hasOwnProperty("type")) {
            let handler = new Handler({
              task,
              apiKey: this.apiKey,
              verbose: this.verbose,
              mustPoll
            });
            resolve(handler.execute());
          } else {
            reject(new TypeError(`Type of task is required. Usage: await handler.runAnyTask({ "type": "AntiTurnstileTaskProxyLess", ... })`));
          }
        });
      }
      async mtcaptcha({ websiteURL, websiteKey, proxy }) {
        return await new Handler({
          task: {
            type: "MTCaptchaTask",
            websiteURL,
            websiteKey,
            proxy
          },
          apiKey: this.apiKey,
          verbose: this.verbose,
          mustPoll: true
        }).execute(this.rqDelay);
      }
      async image2text({ websiteURL = null, body, module: module2 = null, score = null, caseSensitive = null }) {
        return await new Handler({
          task: {
            type: "ImageToTextTask",
            websiteURL,
            body,
            module: module2,
            score,
            case: caseSensitive
          },
          apiKey: this.apiKey,
          verbose: this.verbose,
          mustPoll: false
        }).execute(this.rqDelay);
      }
      async hcaptchaclassification({ websiteURL = null, websiteKey = null, queries, question }) {
        return await new Handler({
          task: {
            type: "HCaptchaClassification",
            websiteURL,
            websiteKey,
            queries,
            question
          },
          apiKey: this.apiKey,
          verbose: this.verbose,
          mustPoll: false
        }).execute(this.rqDelay);
      }
      async hcaptcha({ websiteURL, websiteKey, proxy, isInvisible = null, enterprisePayload = null, userAgent = null }) {
        return await new Handler({
          task: {
            type: "HCaptchaTask",
            websiteURL,
            websiteKey,
            proxy,
            userAgent,
            isInvisible,
            enterprisePayload
          },
          apiKey: this.apiKey,
          verbose: this.verbose,
          mustPoll: true
        }).execute(this.rqDelay);
      }
      async hcaptchaproxyless({ websiteURL, websiteKey, isInvisible = null, enterprisePayload = null, userAgent = null }) {
        return await new Handler({
          task: {
            type: "HCaptchaTask",
            websiteURL,
            websiteKey,
            userAgent,
            isInvisible,
            enterprisePayload
          },
          apiKey: this.apiKey,
          verbose: this.verbose,
          mustPoll: true
        }).execute(this.rqDelay);
      }
      async recaptchav2({ websiteURL, websiteKey, proxy, pageAction = null, enterprisePayload = null, isInvisible = false, apiDomain = null, userAgent = null, cookie = null }) {
        return await new Handler({
          task: {
            type: "ReCaptchaV2Task",
            websiteURL,
            websiteKey,
            proxy,
            pageAction,
            enterprisePayload,
            isInvisible,
            apiDomain,
            userAgent,
            cookie
          },
          apiKey: this.apiKey,
          verbose: this.verbose,
          mustPoll: true
        }).execute(this.rqDelay);
      }
      async recaptchav2proxyless({ websiteURL, websiteKey, pageAction = null, enterprisePayload = null, isInvisible = false, apiDomain = null, userAgent = null, cookie = null }) {
        return await new Handler({
          task: {
            type: "ReCaptchaV2TaskProxyLess",
            websiteURL,
            websiteKey,
            pageAction,
            enterprisePayload,
            isInvisible,
            apiDomain,
            userAgent,
            cookie
          },
          apiKey: this.apiKey,
          verbose: this.verbose,
          mustPoll: true
        }).execute(this.rqDelay);
      }
      async recaptchav2enterprise({ websiteURL, websiteKey, proxy, pageAction = null, enterprisePayload = null, isInvisible = false, apiDomain = null, userAgent = null, cookie = null }) {
        return await new Handler({
          task: {
            type: "ReCaptchaV2EnterpriseTask",
            websiteURL,
            websiteKey,
            proxy,
            pageAction,
            enterprisePayload,
            isInvisible,
            apiDomain,
            userAgent,
            cookie
          },
          apiKey: this.apiKey,
          verbose: this.verbose,
          mustPoll: true
        }).execute(this.rqDelay);
      }
      async recaptchav2enterpriseproxyless({ websiteURL, websiteKey, pageAction = null, enterprisePayload = null, isInvisible = false, apiDomain = null, userAgent = null, cookie = null }) {
        return await new Handler({
          task: {
            type: "ReCaptchaV2EnterpriseTaskProxyLess",
            websiteURL,
            websiteKey,
            pageAction,
            enterprisePayload,
            isInvisible,
            apiDomain,
            userAgent,
            cookie
          },
          apiKey: this.apiKey,
          verbose: this.verbose,
          mustPoll: true
        }).execute(this.rqDelay);
      }
      async recaptchav3({ websiteURL, websiteKey, proxy, pageAction, enterprisePayload = null, apiDomain = null, userAgent = null, cookies = null }) {
        return await new Handler({
          task: {
            type: "ReCaptchaV3Task",
            websiteURL,
            websiteKey,
            proxy,
            pageAction,
            enterprisePayload,
            apiDomain,
            userAgent,
            cookies
          },
          apiKey: this.apiKey,
          verbose: this.verbose,
          mustPoll: true
        }).execute(this.rqDelay);
      }
      async recaptchav3proxyless({ websiteURL, websiteKey, pageAction, enterprisePayload = null, apiDomain = null, userAgent = null, cookies = null }) {
        return await new Handler({
          task: {
            type: "ReCaptchaV3TaskProxyLess",
            websiteURL,
            websiteKey,
            pageAction,
            enterprisePayload,
            apiDomain,
            userAgent,
            cookies
          },
          apiKey: this.apiKey,
          verbose: this.verbose,
          mustPoll: true
        }).execute(this.rqDelay);
      }
      async recaptchav3enterprise({ websiteURL, websiteKey, proxy, pageAction, enterprisePayload = null, apiDomain = null, userAgent = null, cookies = null }) {
        return await new Handler({
          task: {
            type: "ReCaptchaV3EnterpriseTask",
            websiteURL,
            websiteKey,
            proxy,
            pageAction,
            enterprisePayload,
            apiDomain,
            userAgent,
            cookies
          },
          apiKey: this.apiKey,
          verbose: this.verbose,
          mustPoll: true
        }).execute(this.rqDelay);
      }
      async recaptchav3enterpriseproxyless({ websiteURL, websiteKey, pageAction, enterprisePayload = null, apiDomain = null, userAgent = null, cookies = null }) {
        return await new Handler({
          task: {
            type: "ReCaptchaV3EnterpriseTaskProxyLess",
            websiteURL,
            websiteKey,
            pageAction,
            enterprisePayload,
            apiDomain,
            userAgent,
            cookies
          },
          apiKey: this.apiKey,
          verbose: this.verbose,
          mustPoll: true
        }).execute(this.rqDelay);
      }
      async datadome({ websiteURL, userAgent, captchaUrl, proxy }) {
        return await new Handler({
          task: {
            type: "DatadomeSliderTask",
            websiteURL,
            userAgent,
            captchaUrl,
            proxy
          },
          apiKey: this.apiKey,
          verbose: this.verbose,
          mustPoll: true
        }).execute(this.rqDelay);
      }
      async funcaptcha({ websiteURL, websitePublicKey, data = null, userAgent = null, proxy }) {
        return await new Handler({
          task: {
            type: "FunCaptchaTask",
            websiteURL,
            websitePublicKey,
            data,
            userAgent,
            proxy
          },
          apiKey: this.apiKey,
          verbose: this.verbose,
          mustPoll: true
        }).execute(this.rqDelay);
      }
      async funcaptchaproxyless({ websiteURL, websitePublicKey, data = null, userAgent = null }) {
        return await new Handler({
          task: {
            type: "FunCaptchaTaskProxyLess",
            websiteURL,
            websitePublicKey,
            data,
            userAgent
          },
          apiKey: this.apiKey,
          verbose: this.verbose,
          mustPoll: true
        }).execute(this.rqDelay);
      }
      async funcaptchaclassification({ websiteURL = null, websiteKey = null, images, module: module2 = null, question }) {
        return await new Handler({
          task: {
            type: "FunCaptchaClassification",
            websiteURL,
            websiteKey,
            images,
            module: module2,
            question
          },
          apiKey: this.apiKey,
          verbose: this.verbose,
          mustPoll: false
        }).execute(this.rqDelay);
      }
      async geetest({ websiteURL, gt: gt2 = null, challenge = null, proxy, geetestApiServerSubdomain = null, captchaId = null }) {
        return await new Handler({
          task: {
            type: "GeeTestTaskProxyLess",
            websiteURL,
            proxy,
            gt: gt2,
            // for geetestv3
            challenge,
            // for geetestv3
            captchaId,
            // for geetestv4
            geetestApiServerSubdomain
          },
          apiKey: this.apiKey,
          verbose: this.verbose,
          mustPoll: true
        }).execute(this.rqDelay);
      }
      async geetestproxyless({ websiteURL, gt: gt2 = null, challenge = null, captchaId = null, geetestApiServerSubdomain = null }) {
        return await new Handler({
          task: {
            type: "GeeTestTaskProxyLess",
            websiteURL,
            gt: gt2,
            // for geetestv3
            challenge,
            // for geetestv3
            captchaId,
            // for geetestv4
            geetestApiServerSubdomain
          },
          apiKey: this.apiKey,
          verbose: this.verbose,
          mustPoll: true
        }).execute(this.rqDelay);
      }
      async antiturnstile({ websiteURL, websiteKey, metadata = null }) {
        return await new Handler({
          task: {
            type: "AntiTurnstileTaskProxyLess",
            websiteURL,
            websiteKey,
            metadata
          },
          apiKey: this.apiKey,
          verbose: this.verbose,
          mustPoll: true
        }).execute(this.rqDelay);
      }
      async anticloudflare({ websiteURL, proxy, metadata = null, html = null }) {
        return await new Handler({
          task: {
            type: "AntiCloudflareTask",
            websiteURL,
            proxy,
            metadata,
            html
          },
          apiKey: this.apiKey,
          verbose: this.verbose,
          mustPoll: true
        }).execute(this.rqDelay);
      }
    };
    module.exports = Solver;
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
      } catch (_2) {
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

// src/index.ts
import * as dotenv from "dotenv";

// src/services/browser.ts
var import_capsolver_npm = __toESM(require_Solver(), 1);
import { generateText, trimTokens } from "@elizaos/core";
import { parseJSONObjectFromText } from "@elizaos/core";
import { Service } from "@elizaos/core";
import { settings } from "@elizaos/core";
import { ModelClass, ServiceType } from "@elizaos/core";
import { stringToUuid } from "@elizaos/core";
import { PlaywrightBlocker } from "@cliqz/adblocker-playwright";
import { chromium } from "playwright";
import { elizaLogger } from "@elizaos/core";
async function generateSummary(runtime, text) {
  text = await trimTokens(text, 1e5, runtime);
  const prompt = `Please generate a concise summary for the following text:

  Text: """
  ${text}
  """

  Respond with a JSON object in the following format:
  \`\`\`json
  {
    "title": "Generated Title",
    "summary": "Generated summary and/or description of the text"
  }
  \`\`\``;
  const response = await generateText({
    runtime,
    context: prompt,
    modelClass: ModelClass.SMALL
  });
  const parsedResponse = parseJSONObjectFromText(response);
  if (parsedResponse) {
    return {
      title: parsedResponse.title,
      description: parsedResponse.summary
    };
  }
  return {
    title: "",
    description: ""
  };
}
var BrowserService = class _BrowserService extends Service {
  browser;
  context;
  blocker;
  captchaSolver;
  cacheKey = "content/browser";
  static serviceType = ServiceType.BROWSER;
  static register(runtime) {
    return runtime;
  }
  getInstance() {
    return _BrowserService.getInstance();
  }
  constructor() {
    super();
    this.browser = void 0;
    this.context = void 0;
    this.blocker = void 0;
    this.captchaSolver = new import_capsolver_npm.default(
      settings.CAPSOLVER_API_KEY || ""
    );
  }
  async initialize() {
  }
  async initializeBrowser() {
    if (!this.browser) {
      this.browser = await chromium.launch({
        headless: true,
        args: [
          "--disable-dev-shm-usage",
          // Uses /tmp instead of /dev/shm. Prevents memory issues on low-memory systems
          "--block-new-web-contents"
          // Prevents creation of new windows/tabs
        ]
      });
      const platform = process.platform;
      let userAgent = "";
      switch (platform) {
        case "darwin":
          userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";
          break;
        case "win32":
          userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";
          break;
        case "linux":
          userAgent = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";
          break;
        default:
          userAgent = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";
      }
      this.context = await this.browser.newContext({
        userAgent,
        acceptDownloads: false
      });
      this.blocker = await PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch);
    }
  }
  async closeBrowser() {
    if (this.context) {
      await this.context.close();
      this.context = void 0;
    }
    if (this.browser) {
      await this.browser.close();
      this.browser = void 0;
    }
  }
  async getPageContent(url, runtime) {
    await this.initializeBrowser();
    return await this.fetchPageContent(url, runtime);
  }
  getCacheKey(url) {
    return stringToUuid(url);
  }
  async fetchPageContent(url, runtime) {
    const cacheKey = this.getCacheKey(url);
    const cached = await runtime.cacheManager.get(`${this.cacheKey}/${cacheKey}`);
    if (cached) {
      return cached.content;
    }
    let page;
    try {
      if (!this.context) {
        elizaLogger.log(
          "Browser context not initialized. Call initializeBrowser() first."
        );
      }
      page = await this.context.newPage();
      await page.setExtraHTTPHeaders({
        "Accept-Language": "en-US,en;q=0.9"
      });
      if (this.blocker) {
        await this.blocker.enableBlockingInPage(page);
      }
      const response = await page.goto(url, { waitUntil: "networkidle" });
      if (!response) {
        elizaLogger.error("Failed to load the page");
      }
      if (response.status() === 403 || response.status() === 404) {
        return await this.tryAlternativeSources(url, runtime);
      }
      const captchaDetected = await this.detectCaptcha(page);
      if (captchaDetected) {
        await this.solveCaptcha(page, url);
      }
      const documentTitle = await page.evaluate(() => document.title);
      const bodyContent = await page.evaluate(
        () => document.body.innerText
      );
      const { title: parsedTitle, description } = await generateSummary(
        runtime,
        documentTitle + "\n" + bodyContent
      );
      const content = { title: parsedTitle, description, bodyContent };
      await runtime.cacheManager.set(`${this.cacheKey}/${cacheKey}`, {
        url,
        content
      });
      return content;
    } catch (error) {
      elizaLogger.error("Error:", error);
      return {
        title: url,
        description: "Error, could not fetch content",
        bodyContent: ""
      };
    } finally {
      if (page) {
        await page.close();
      }
    }
  }
  async detectCaptcha(page) {
    const captchaSelectors = [
      'iframe[src*="captcha"]',
      'div[class*="captcha"]',
      "#captcha",
      ".g-recaptcha",
      ".h-captcha"
    ];
    for (const selector of captchaSelectors) {
      const element = await page.$(selector);
      if (element) return true;
    }
    return false;
  }
  async solveCaptcha(page, url) {
    try {
      const hcaptchaKey = await this.getHCaptchaWebsiteKey(page);
      if (hcaptchaKey) {
        const solution = await this.captchaSolver.hcaptchaProxyless({
          websiteURL: url,
          websiteKey: hcaptchaKey
        });
        await page.evaluate((token) => {
          window.hcaptcha.setResponse(token);
        }, solution.gRecaptchaResponse);
        return;
      }
      const recaptchaKey = await this.getReCaptchaWebsiteKey(page);
      if (recaptchaKey) {
        const solution = await this.captchaSolver.recaptchaV2Proxyless({
          websiteURL: url,
          websiteKey: recaptchaKey
        });
        await page.evaluate((token) => {
          document.getElementById("g-recaptcha-response").innerHTML = token;
        }, solution.gRecaptchaResponse);
      }
    } catch (error) {
      elizaLogger.error("Error solving CAPTCHA:", error);
    }
  }
  async getHCaptchaWebsiteKey(page) {
    return page.evaluate(() => {
      const hcaptchaIframe = document.querySelector(
        'iframe[src*="hcaptcha.com"]'
      );
      if (hcaptchaIframe) {
        const src = hcaptchaIframe.getAttribute("src");
        const match = src?.match(/sitekey=([^&]*)/);
        return match ? match[1] : "";
      }
      return "";
    });
  }
  async getReCaptchaWebsiteKey(page) {
    return page.evaluate(() => {
      const recaptchaElement = document.querySelector(".g-recaptcha");
      return recaptchaElement ? recaptchaElement.getAttribute("data-sitekey") || "" : "";
    });
  }
  async tryAlternativeSources(url, runtime) {
    const archiveUrl = `https://web.archive.org/web/${url}`;
    try {
      return await this.fetchPageContent(archiveUrl, runtime);
    } catch (error) {
      elizaLogger.error("Error fetching from Internet Archive:", error);
    }
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
    try {
      return await this.fetchPageContent(googleSearchUrl, runtime);
    } catch (error) {
      elizaLogger.error("Error fetching from Google Search:", error);
      elizaLogger.error(
        "Failed to fetch content from alternative sources"
      );
      return {
        title: url,
        description: "Error, could not fetch content from alternative sources",
        bodyContent: ""
      };
    }
  }
};

// src/services/speech.ts
import { PassThrough } from "stream";
import { Readable } from "node:stream";
import { ReadableStream } from "node:stream/web";
import { ServiceType as ServiceType2 } from "@elizaos/core";

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
import { Service as Service2 } from "@elizaos/core";

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
    const config2 = {
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
    return nodeEnvSchema.parse(config2);
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
import { elizaLogger as elizaLogger2 } from "@elizaos/core";
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
  elizaLogger2.debug("Voice settings:", {
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
        elizaLogger2.log(
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
        elizaLogger2.log("audio is a buffer");
        wavStream = Readable.from(audio);
      } else if ("audioChannels" in audio && "sampleRate" in audio) {
        elizaLogger2.log("audio is a RawAudio");
        const floatBuffer = Buffer.from(audio.audioChannels[0].buffer);
        elizaLogger2.log("buffer length: ", floatBuffer.length);
        const sampleRate = audio.sampleRate;
        const floatArray = new Float32Array(floatBuffer.buffer);
        const pcmBuffer = new Int16Array(floatArray.length);
        for (let i2 = 0; i2 < floatArray.length; i2++) {
          pcmBuffer[i2] = Math.round(floatArray[i2] * 32767);
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
    elizaLogger2.log("audio is a buffer");
    wavStream = Readable.from(audio);
  } else if ("audioChannels" in audio && "sampleRate" in audio) {
    elizaLogger2.log("audio is a RawAudio");
    const floatBuffer = Buffer.from(audio.audioChannels[0].buffer);
    elizaLogger2.log("buffer length: ", floatBuffer.length);
    const sampleRate = audio.sampleRate;
    const floatArray = new Float32Array(floatBuffer.buffer);
    const pcmBuffer = new Int16Array(floatArray.length);
    for (let i2 = 0; i2 < floatArray.length; i2++) {
      pcmBuffer[i2] = Math.round(floatArray[i2] * 32767);
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
var SpeechService = class _SpeechService extends Service2 {
  static serviceType = ServiceType2.SPEECH_GENERATION;
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
  elizaLogger as elizaLogger3,
  settings as settings2,
  TranscriptionProvider
} from "@elizaos/core";
import { Service as Service3, ServiceType as ServiceType3 } from "@elizaos/core";
import { exec } from "child_process";

// ../../node_modules/formdata-node/lib/esm/FormData.js
import { inspect } from "util";

// ../../node_modules/web-streams-polyfill/dist/ponyfill.mjs
var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? Symbol : (e2) => `Symbol(${e2})`;
function t() {
}
function r(e2) {
  return "object" == typeof e2 && null !== e2 || "function" == typeof e2;
}
var o = t;
function n(e2, t2) {
  try {
    Object.defineProperty(e2, "name", { value: t2, configurable: true });
  } catch (e3) {
  }
}
var a = Promise;
var i = Promise.prototype.then;
var l = Promise.resolve.bind(a);
var s = Promise.reject.bind(a);
function u(e2) {
  return new a(e2);
}
function c(e2) {
  return l(e2);
}
function d(e2) {
  return s(e2);
}
function f(e2, t2, r2) {
  return i.call(e2, t2, r2);
}
function b(e2, t2, r2) {
  f(f(e2, t2, r2), void 0, o);
}
function h(e2, t2) {
  b(e2, t2);
}
function _(e2, t2) {
  b(e2, void 0, t2);
}
function p(e2, t2, r2) {
  return f(e2, t2, r2);
}
function m(e2) {
  f(e2, void 0, o);
}
var y = (e2) => {
  if ("function" == typeof queueMicrotask) y = queueMicrotask;
  else {
    const e3 = c(void 0);
    y = (t2) => f(e3, t2);
  }
  return y(e2);
};
function g(e2, t2, r2) {
  if ("function" != typeof e2) throw new TypeError("Argument is not a function");
  return Function.prototype.apply.call(e2, t2, r2);
}
function w(e2, t2, r2) {
  try {
    return c(g(e2, t2, r2));
  } catch (e3) {
    return d(e3);
  }
}
var S = class {
  constructor() {
    this._cursor = 0, this._size = 0, this._front = { _elements: [], _next: void 0 }, this._back = this._front, this._cursor = 0, this._size = 0;
  }
  get length() {
    return this._size;
  }
  push(e2) {
    const t2 = this._back;
    let r2 = t2;
    16383 === t2._elements.length && (r2 = { _elements: [], _next: void 0 }), t2._elements.push(e2), r2 !== t2 && (this._back = r2, t2._next = r2), ++this._size;
  }
  shift() {
    const e2 = this._front;
    let t2 = e2;
    const r2 = this._cursor;
    let o2 = r2 + 1;
    const n2 = e2._elements, a2 = n2[r2];
    return 16384 === o2 && (t2 = e2._next, o2 = 0), --this._size, this._cursor = o2, e2 !== t2 && (this._front = t2), n2[r2] = void 0, a2;
  }
  forEach(e2) {
    let t2 = this._cursor, r2 = this._front, o2 = r2._elements;
    for (; !(t2 === o2.length && void 0 === r2._next || t2 === o2.length && (r2 = r2._next, o2 = r2._elements, t2 = 0, 0 === o2.length)); ) e2(o2[t2]), ++t2;
  }
  peek() {
    const e2 = this._front, t2 = this._cursor;
    return e2._elements[t2];
  }
};
var v = e("[[AbortSteps]]");
var R = e("[[ErrorSteps]]");
var T = e("[[CancelSteps]]");
var q = e("[[PullSteps]]");
var C = e("[[ReleaseSteps]]");
function E(e2, t2) {
  e2._ownerReadableStream = t2, t2._reader = e2, "readable" === t2._state ? O(e2) : "closed" === t2._state ? function(e3) {
    O(e3), j(e3);
  }(e2) : B(e2, t2._storedError);
}
function P(e2, t2) {
  return Gt(e2._ownerReadableStream, t2);
}
function W(e2) {
  const t2 = e2._ownerReadableStream;
  "readable" === t2._state ? A(e2, new TypeError("Reader was released and can no longer be used to monitor the stream's closedness")) : function(e3, t3) {
    B(e3, t3);
  }(e2, new TypeError("Reader was released and can no longer be used to monitor the stream's closedness")), t2._readableStreamController[C](), t2._reader = void 0, e2._ownerReadableStream = void 0;
}
function k(e2) {
  return new TypeError("Cannot " + e2 + " a stream using a released reader");
}
function O(e2) {
  e2._closedPromise = u((t2, r2) => {
    e2._closedPromise_resolve = t2, e2._closedPromise_reject = r2;
  });
}
function B(e2, t2) {
  O(e2), A(e2, t2);
}
function A(e2, t2) {
  void 0 !== e2._closedPromise_reject && (m(e2._closedPromise), e2._closedPromise_reject(t2), e2._closedPromise_resolve = void 0, e2._closedPromise_reject = void 0);
}
function j(e2) {
  void 0 !== e2._closedPromise_resolve && (e2._closedPromise_resolve(void 0), e2._closedPromise_resolve = void 0, e2._closedPromise_reject = void 0);
}
var z2 = Number.isFinite || function(e2) {
  return "number" == typeof e2 && isFinite(e2);
};
var L = Math.trunc || function(e2) {
  return e2 < 0 ? Math.ceil(e2) : Math.floor(e2);
};
function F(e2, t2) {
  if (void 0 !== e2 && ("object" != typeof (r2 = e2) && "function" != typeof r2)) throw new TypeError(`${t2} is not an object.`);
  var r2;
}
function I(e2, t2) {
  if ("function" != typeof e2) throw new TypeError(`${t2} is not a function.`);
}
function D(e2, t2) {
  if (!/* @__PURE__ */ function(e3) {
    return "object" == typeof e3 && null !== e3 || "function" == typeof e3;
  }(e2)) throw new TypeError(`${t2} is not an object.`);
}
function $(e2, t2, r2) {
  if (void 0 === e2) throw new TypeError(`Parameter ${t2} is required in '${r2}'.`);
}
function M(e2, t2, r2) {
  if (void 0 === e2) throw new TypeError(`${t2} is required in '${r2}'.`);
}
function Y(e2) {
  return Number(e2);
}
function Q(e2) {
  return 0 === e2 ? 0 : e2;
}
function N(e2, t2) {
  const r2 = Number.MAX_SAFE_INTEGER;
  let o2 = Number(e2);
  if (o2 = Q(o2), !z2(o2)) throw new TypeError(`${t2} is not a finite number`);
  if (o2 = function(e3) {
    return Q(L(e3));
  }(o2), o2 < 0 || o2 > r2) throw new TypeError(`${t2} is outside the accepted range of 0 to ${r2}, inclusive`);
  return z2(o2) && 0 !== o2 ? o2 : 0;
}
function H(e2) {
  if (!r(e2)) return false;
  if ("function" != typeof e2.getReader) return false;
  try {
    return "boolean" == typeof e2.locked;
  } catch (e3) {
    return false;
  }
}
function x(e2) {
  if (!r(e2)) return false;
  if ("function" != typeof e2.getWriter) return false;
  try {
    return "boolean" == typeof e2.locked;
  } catch (e3) {
    return false;
  }
}
function V(e2, t2) {
  if (!Vt(e2)) throw new TypeError(`${t2} is not a ReadableStream.`);
}
function U(e2, t2) {
  e2._reader._readRequests.push(t2);
}
function G(e2, t2, r2) {
  const o2 = e2._reader._readRequests.shift();
  r2 ? o2._closeSteps() : o2._chunkSteps(t2);
}
function X(e2) {
  return e2._reader._readRequests.length;
}
function J(e2) {
  const t2 = e2._reader;
  return void 0 !== t2 && !!K(t2);
}
var ReadableStreamDefaultReader = class {
  constructor(e2) {
    if ($(e2, 1, "ReadableStreamDefaultReader"), V(e2, "First parameter"), Ut(e2)) throw new TypeError("This stream has already been locked for exclusive reading by another reader");
    E(this, e2), this._readRequests = new S();
  }
  get closed() {
    return K(this) ? this._closedPromise : d(ee("closed"));
  }
  cancel(e2) {
    return K(this) ? void 0 === this._ownerReadableStream ? d(k("cancel")) : P(this, e2) : d(ee("cancel"));
  }
  read() {
    if (!K(this)) return d(ee("read"));
    if (void 0 === this._ownerReadableStream) return d(k("read from"));
    let e2, t2;
    const r2 = u((r3, o2) => {
      e2 = r3, t2 = o2;
    });
    return function(e3, t3) {
      const r3 = e3._ownerReadableStream;
      r3._disturbed = true, "closed" === r3._state ? t3._closeSteps() : "errored" === r3._state ? t3._errorSteps(r3._storedError) : r3._readableStreamController[q](t3);
    }(this, { _chunkSteps: (t3) => e2({ value: t3, done: false }), _closeSteps: () => e2({ value: void 0, done: true }), _errorSteps: (e3) => t2(e3) }), r2;
  }
  releaseLock() {
    if (!K(this)) throw ee("releaseLock");
    void 0 !== this._ownerReadableStream && function(e2) {
      W(e2);
      const t2 = new TypeError("Reader was released");
      Z(e2, t2);
    }(this);
  }
};
function K(e2) {
  return !!r(e2) && (!!Object.prototype.hasOwnProperty.call(e2, "_readRequests") && e2 instanceof ReadableStreamDefaultReader);
}
function Z(e2, t2) {
  const r2 = e2._readRequests;
  e2._readRequests = new S(), r2.forEach((e3) => {
    e3._errorSteps(t2);
  });
}
function ee(e2) {
  return new TypeError(`ReadableStreamDefaultReader.prototype.${e2} can only be used on a ReadableStreamDefaultReader`);
}
Object.defineProperties(ReadableStreamDefaultReader.prototype, { cancel: { enumerable: true }, read: { enumerable: true }, releaseLock: { enumerable: true }, closed: { enumerable: true } }), n(ReadableStreamDefaultReader.prototype.cancel, "cancel"), n(ReadableStreamDefaultReader.prototype.read, "read"), n(ReadableStreamDefaultReader.prototype.releaseLock, "releaseLock"), "symbol" == typeof e.toStringTag && Object.defineProperty(ReadableStreamDefaultReader.prototype, e.toStringTag, { value: "ReadableStreamDefaultReader", configurable: true });
var te = class {
  constructor(e2, t2) {
    this._ongoingPromise = void 0, this._isFinished = false, this._reader = e2, this._preventCancel = t2;
  }
  next() {
    const e2 = () => this._nextSteps();
    return this._ongoingPromise = this._ongoingPromise ? p(this._ongoingPromise, e2, e2) : e2(), this._ongoingPromise;
  }
  return(e2) {
    const t2 = () => this._returnSteps(e2);
    return this._ongoingPromise ? p(this._ongoingPromise, t2, t2) : t2();
  }
  _nextSteps() {
    if (this._isFinished) return Promise.resolve({ value: void 0, done: true });
    const e2 = this._reader;
    return void 0 === e2 ? d(k("iterate")) : f(e2.read(), (e3) => {
      var t2;
      return this._ongoingPromise = void 0, e3.done && (this._isFinished = true, null === (t2 = this._reader) || void 0 === t2 || t2.releaseLock(), this._reader = void 0), e3;
    }, (e3) => {
      var t2;
      throw this._ongoingPromise = void 0, this._isFinished = true, null === (t2 = this._reader) || void 0 === t2 || t2.releaseLock(), this._reader = void 0, e3;
    });
  }
  _returnSteps(e2) {
    if (this._isFinished) return Promise.resolve({ value: e2, done: true });
    this._isFinished = true;
    const t2 = this._reader;
    if (void 0 === t2) return d(k("finish iterating"));
    if (this._reader = void 0, !this._preventCancel) {
      const r2 = t2.cancel(e2);
      return t2.releaseLock(), p(r2, () => ({ value: e2, done: true }));
    }
    return t2.releaseLock(), c({ value: e2, done: true });
  }
};
var re = { next() {
  return oe(this) ? this._asyncIteratorImpl.next() : d(ne("next"));
}, return(e2) {
  return oe(this) ? this._asyncIteratorImpl.return(e2) : d(ne("return"));
} };
function oe(e2) {
  if (!r(e2)) return false;
  if (!Object.prototype.hasOwnProperty.call(e2, "_asyncIteratorImpl")) return false;
  try {
    return e2._asyncIteratorImpl instanceof te;
  } catch (e3) {
    return false;
  }
}
function ne(e2) {
  return new TypeError(`ReadableStreamAsyncIterator.${e2} can only be used on a ReadableSteamAsyncIterator`);
}
"symbol" == typeof e.asyncIterator && Object.defineProperty(re, e.asyncIterator, { value() {
  return this;
}, writable: true, configurable: true });
var ae = Number.isNaN || function(e2) {
  return e2 != e2;
};
function ie(e2, t2, r2, o2, n2) {
  new Uint8Array(e2).set(new Uint8Array(r2, o2, n2), t2);
}
function le(e2) {
  const t2 = function(e3, t3, r2) {
    if (e3.slice) return e3.slice(t3, r2);
    const o2 = r2 - t3, n2 = new ArrayBuffer(o2);
    return ie(n2, 0, e3, t3, o2), n2;
  }(e2.buffer, e2.byteOffset, e2.byteOffset + e2.byteLength);
  return new Uint8Array(t2);
}
function se(e2) {
  const t2 = e2._queue.shift();
  return e2._queueTotalSize -= t2.size, e2._queueTotalSize < 0 && (e2._queueTotalSize = 0), t2.value;
}
function ue(e2, t2, r2) {
  if ("number" != typeof (o2 = r2) || ae(o2) || o2 < 0 || r2 === 1 / 0) throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
  var o2;
  e2._queue.push({ value: t2, size: r2 }), e2._queueTotalSize += r2;
}
function ce(e2) {
  e2._queue = new S(), e2._queueTotalSize = 0;
}
var ReadableStreamBYOBRequest = class {
  constructor() {
    throw new TypeError("Illegal constructor");
  }
  get view() {
    if (!fe(this)) throw Be("view");
    return this._view;
  }
  respond(e2) {
    if (!fe(this)) throw Be("respond");
    if ($(e2, 1, "respond"), e2 = N(e2, "First parameter"), void 0 === this._associatedReadableByteStreamController) throw new TypeError("This BYOB request has been invalidated");
    this._view.buffer, function(e3, t2) {
      const r2 = e3._pendingPullIntos.peek();
      if ("closed" === e3._controlledReadableByteStream._state) {
        if (0 !== t2) throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
      } else {
        if (0 === t2) throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
        if (r2.bytesFilled + t2 > r2.byteLength) throw new RangeError("bytesWritten out of range");
      }
      r2.buffer = r2.buffer, qe(e3, t2);
    }(this._associatedReadableByteStreamController, e2);
  }
  respondWithNewView(e2) {
    if (!fe(this)) throw Be("respondWithNewView");
    if ($(e2, 1, "respondWithNewView"), !ArrayBuffer.isView(e2)) throw new TypeError("You can only respond with array buffer views");
    if (void 0 === this._associatedReadableByteStreamController) throw new TypeError("This BYOB request has been invalidated");
    e2.buffer, function(e3, t2) {
      const r2 = e3._pendingPullIntos.peek();
      if ("closed" === e3._controlledReadableByteStream._state) {
        if (0 !== t2.byteLength) throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
      } else if (0 === t2.byteLength) throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
      if (r2.byteOffset + r2.bytesFilled !== t2.byteOffset) throw new RangeError("The region specified by view does not match byobRequest");
      if (r2.bufferByteLength !== t2.buffer.byteLength) throw new RangeError("The buffer of view has different capacity than byobRequest");
      if (r2.bytesFilled + t2.byteLength > r2.byteLength) throw new RangeError("The region specified by view is larger than byobRequest");
      const o2 = t2.byteLength;
      r2.buffer = t2.buffer, qe(e3, o2);
    }(this._associatedReadableByteStreamController, e2);
  }
};
Object.defineProperties(ReadableStreamBYOBRequest.prototype, { respond: { enumerable: true }, respondWithNewView: { enumerable: true }, view: { enumerable: true } }), n(ReadableStreamBYOBRequest.prototype.respond, "respond"), n(ReadableStreamBYOBRequest.prototype.respondWithNewView, "respondWithNewView"), "symbol" == typeof e.toStringTag && Object.defineProperty(ReadableStreamBYOBRequest.prototype, e.toStringTag, { value: "ReadableStreamBYOBRequest", configurable: true });
var ReadableByteStreamController = class {
  constructor() {
    throw new TypeError("Illegal constructor");
  }
  get byobRequest() {
    if (!de(this)) throw Ae("byobRequest");
    return function(e2) {
      if (null === e2._byobRequest && e2._pendingPullIntos.length > 0) {
        const t2 = e2._pendingPullIntos.peek(), r2 = new Uint8Array(t2.buffer, t2.byteOffset + t2.bytesFilled, t2.byteLength - t2.bytesFilled), o2 = Object.create(ReadableStreamBYOBRequest.prototype);
        !function(e3, t3, r3) {
          e3._associatedReadableByteStreamController = t3, e3._view = r3;
        }(o2, e2, r2), e2._byobRequest = o2;
      }
      return e2._byobRequest;
    }(this);
  }
  get desiredSize() {
    if (!de(this)) throw Ae("desiredSize");
    return ke(this);
  }
  close() {
    if (!de(this)) throw Ae("close");
    if (this._closeRequested) throw new TypeError("The stream has already been closed; do not close it again!");
    const e2 = this._controlledReadableByteStream._state;
    if ("readable" !== e2) throw new TypeError(`The stream (in ${e2} state) is not in the readable state and cannot be closed`);
    !function(e3) {
      const t2 = e3._controlledReadableByteStream;
      if (e3._closeRequested || "readable" !== t2._state) return;
      if (e3._queueTotalSize > 0) return void (e3._closeRequested = true);
      if (e3._pendingPullIntos.length > 0) {
        if (e3._pendingPullIntos.peek().bytesFilled > 0) {
          const t3 = new TypeError("Insufficient bytes to fill elements in the given buffer");
          throw Pe(e3, t3), t3;
        }
      }
      Ee(e3), Xt(t2);
    }(this);
  }
  enqueue(e2) {
    if (!de(this)) throw Ae("enqueue");
    if ($(e2, 1, "enqueue"), !ArrayBuffer.isView(e2)) throw new TypeError("chunk must be an array buffer view");
    if (0 === e2.byteLength) throw new TypeError("chunk must have non-zero byteLength");
    if (0 === e2.buffer.byteLength) throw new TypeError("chunk's buffer must have non-zero byteLength");
    if (this._closeRequested) throw new TypeError("stream is closed or draining");
    const t2 = this._controlledReadableByteStream._state;
    if ("readable" !== t2) throw new TypeError(`The stream (in ${t2} state) is not in the readable state and cannot be enqueued to`);
    !function(e3, t3) {
      const r2 = e3._controlledReadableByteStream;
      if (e3._closeRequested || "readable" !== r2._state) return;
      const o2 = t3.buffer, n2 = t3.byteOffset, a2 = t3.byteLength, i2 = o2;
      if (e3._pendingPullIntos.length > 0) {
        const t4 = e3._pendingPullIntos.peek();
        t4.buffer, 0, Re(e3), t4.buffer = t4.buffer, "none" === t4.readerType && ge(e3, t4);
      }
      if (J(r2)) if (function(e4) {
        const t4 = e4._controlledReadableByteStream._reader;
        for (; t4._readRequests.length > 0; ) {
          if (0 === e4._queueTotalSize) return;
          We(e4, t4._readRequests.shift());
        }
      }(e3), 0 === X(r2)) me(e3, i2, n2, a2);
      else {
        e3._pendingPullIntos.length > 0 && Ce(e3);
        G(r2, new Uint8Array(i2, n2, a2), false);
      }
      else Le(r2) ? (me(e3, i2, n2, a2), Te(e3)) : me(e3, i2, n2, a2);
      be(e3);
    }(this, e2);
  }
  error(e2) {
    if (!de(this)) throw Ae("error");
    Pe(this, e2);
  }
  [T](e2) {
    he(this), ce(this);
    const t2 = this._cancelAlgorithm(e2);
    return Ee(this), t2;
  }
  [q](e2) {
    const t2 = this._controlledReadableByteStream;
    if (this._queueTotalSize > 0) return void We(this, e2);
    const r2 = this._autoAllocateChunkSize;
    if (void 0 !== r2) {
      let t3;
      try {
        t3 = new ArrayBuffer(r2);
      } catch (t4) {
        return void e2._errorSteps(t4);
      }
      const o2 = { buffer: t3, bufferByteLength: r2, byteOffset: 0, byteLength: r2, bytesFilled: 0, elementSize: 1, viewConstructor: Uint8Array, readerType: "default" };
      this._pendingPullIntos.push(o2);
    }
    U(t2, e2), be(this);
  }
  [C]() {
    if (this._pendingPullIntos.length > 0) {
      const e2 = this._pendingPullIntos.peek();
      e2.readerType = "none", this._pendingPullIntos = new S(), this._pendingPullIntos.push(e2);
    }
  }
};
function de(e2) {
  return !!r(e2) && (!!Object.prototype.hasOwnProperty.call(e2, "_controlledReadableByteStream") && e2 instanceof ReadableByteStreamController);
}
function fe(e2) {
  return !!r(e2) && (!!Object.prototype.hasOwnProperty.call(e2, "_associatedReadableByteStreamController") && e2 instanceof ReadableStreamBYOBRequest);
}
function be(e2) {
  const t2 = function(e3) {
    const t3 = e3._controlledReadableByteStream;
    if ("readable" !== t3._state) return false;
    if (e3._closeRequested) return false;
    if (!e3._started) return false;
    if (J(t3) && X(t3) > 0) return true;
    if (Le(t3) && ze(t3) > 0) return true;
    if (ke(e3) > 0) return true;
    return false;
  }(e2);
  if (!t2) return;
  if (e2._pulling) return void (e2._pullAgain = true);
  e2._pulling = true;
  b(e2._pullAlgorithm(), () => (e2._pulling = false, e2._pullAgain && (e2._pullAgain = false, be(e2)), null), (t3) => (Pe(e2, t3), null));
}
function he(e2) {
  Re(e2), e2._pendingPullIntos = new S();
}
function _e(e2, t2) {
  let r2 = false;
  "closed" === e2._state && (r2 = true);
  const o2 = pe(t2);
  "default" === t2.readerType ? G(e2, o2, r2) : function(e3, t3, r3) {
    const o3 = e3._reader._readIntoRequests.shift();
    r3 ? o3._closeSteps(t3) : o3._chunkSteps(t3);
  }(e2, o2, r2);
}
function pe(e2) {
  const t2 = e2.bytesFilled, r2 = e2.elementSize;
  return new e2.viewConstructor(e2.buffer, e2.byteOffset, t2 / r2);
}
function me(e2, t2, r2, o2) {
  e2._queue.push({ buffer: t2, byteOffset: r2, byteLength: o2 }), e2._queueTotalSize += o2;
}
function ye(e2, t2, r2, o2) {
  let n2;
  try {
    n2 = t2.slice(r2, r2 + o2);
  } catch (t3) {
    throw Pe(e2, t3), t3;
  }
  me(e2, n2, 0, o2);
}
function ge(e2, t2) {
  t2.bytesFilled > 0 && ye(e2, t2.buffer, t2.byteOffset, t2.bytesFilled), Ce(e2);
}
function we(e2, t2) {
  const r2 = t2.elementSize, o2 = t2.bytesFilled - t2.bytesFilled % r2, n2 = Math.min(e2._queueTotalSize, t2.byteLength - t2.bytesFilled), a2 = t2.bytesFilled + n2, i2 = a2 - a2 % r2;
  let l2 = n2, s2 = false;
  i2 > o2 && (l2 = i2 - t2.bytesFilled, s2 = true);
  const u2 = e2._queue;
  for (; l2 > 0; ) {
    const r3 = u2.peek(), o3 = Math.min(l2, r3.byteLength), n3 = t2.byteOffset + t2.bytesFilled;
    ie(t2.buffer, n3, r3.buffer, r3.byteOffset, o3), r3.byteLength === o3 ? u2.shift() : (r3.byteOffset += o3, r3.byteLength -= o3), e2._queueTotalSize -= o3, Se(e2, o3, t2), l2 -= o3;
  }
  return s2;
}
function Se(e2, t2, r2) {
  r2.bytesFilled += t2;
}
function ve(e2) {
  0 === e2._queueTotalSize && e2._closeRequested ? (Ee(e2), Xt(e2._controlledReadableByteStream)) : be(e2);
}
function Re(e2) {
  null !== e2._byobRequest && (e2._byobRequest._associatedReadableByteStreamController = void 0, e2._byobRequest._view = null, e2._byobRequest = null);
}
function Te(e2) {
  for (; e2._pendingPullIntos.length > 0; ) {
    if (0 === e2._queueTotalSize) return;
    const t2 = e2._pendingPullIntos.peek();
    we(e2, t2) && (Ce(e2), _e(e2._controlledReadableByteStream, t2));
  }
}
function qe(e2, t2) {
  const r2 = e2._pendingPullIntos.peek();
  Re(e2);
  "closed" === e2._controlledReadableByteStream._state ? function(e3, t3) {
    "none" === t3.readerType && Ce(e3);
    const r3 = e3._controlledReadableByteStream;
    if (Le(r3)) for (; ze(r3) > 0; ) _e(r3, Ce(e3));
  }(e2, r2) : function(e3, t3, r3) {
    if (Se(0, t3, r3), "none" === r3.readerType) return ge(e3, r3), void Te(e3);
    if (r3.bytesFilled < r3.elementSize) return;
    Ce(e3);
    const o2 = r3.bytesFilled % r3.elementSize;
    if (o2 > 0) {
      const t4 = r3.byteOffset + r3.bytesFilled;
      ye(e3, r3.buffer, t4 - o2, o2);
    }
    r3.bytesFilled -= o2, _e(e3._controlledReadableByteStream, r3), Te(e3);
  }(e2, t2, r2), be(e2);
}
function Ce(e2) {
  return e2._pendingPullIntos.shift();
}
function Ee(e2) {
  e2._pullAlgorithm = void 0, e2._cancelAlgorithm = void 0;
}
function Pe(e2, t2) {
  const r2 = e2._controlledReadableByteStream;
  "readable" === r2._state && (he(e2), ce(e2), Ee(e2), Jt(r2, t2));
}
function We(e2, t2) {
  const r2 = e2._queue.shift();
  e2._queueTotalSize -= r2.byteLength, ve(e2);
  const o2 = new Uint8Array(r2.buffer, r2.byteOffset, r2.byteLength);
  t2._chunkSteps(o2);
}
function ke(e2) {
  const t2 = e2._controlledReadableByteStream._state;
  return "errored" === t2 ? null : "closed" === t2 ? 0 : e2._strategyHWM - e2._queueTotalSize;
}
function Oe(e2, t2, r2) {
  const o2 = Object.create(ReadableByteStreamController.prototype);
  let n2, a2, i2;
  n2 = void 0 !== t2.start ? () => t2.start(o2) : () => {
  }, a2 = void 0 !== t2.pull ? () => t2.pull(o2) : () => c(void 0), i2 = void 0 !== t2.cancel ? (e3) => t2.cancel(e3) : () => c(void 0);
  const l2 = t2.autoAllocateChunkSize;
  if (0 === l2) throw new TypeError("autoAllocateChunkSize must be greater than 0");
  !function(e3, t3, r3, o3, n3, a3, i3) {
    t3._controlledReadableByteStream = e3, t3._pullAgain = false, t3._pulling = false, t3._byobRequest = null, t3._queue = t3._queueTotalSize = void 0, ce(t3), t3._closeRequested = false, t3._started = false, t3._strategyHWM = a3, t3._pullAlgorithm = o3, t3._cancelAlgorithm = n3, t3._autoAllocateChunkSize = i3, t3._pendingPullIntos = new S(), e3._readableStreamController = t3, b(c(r3()), () => (t3._started = true, be(t3), null), (e4) => (Pe(t3, e4), null));
  }(e2, o2, n2, a2, i2, r2, l2);
}
function Be(e2) {
  return new TypeError(`ReadableStreamBYOBRequest.prototype.${e2} can only be used on a ReadableStreamBYOBRequest`);
}
function Ae(e2) {
  return new TypeError(`ReadableByteStreamController.prototype.${e2} can only be used on a ReadableByteStreamController`);
}
function je(e2, t2) {
  e2._reader._readIntoRequests.push(t2);
}
function ze(e2) {
  return e2._reader._readIntoRequests.length;
}
function Le(e2) {
  const t2 = e2._reader;
  return void 0 !== t2 && !!Fe(t2);
}
Object.defineProperties(ReadableByteStreamController.prototype, { close: { enumerable: true }, enqueue: { enumerable: true }, error: { enumerable: true }, byobRequest: { enumerable: true }, desiredSize: { enumerable: true } }), n(ReadableByteStreamController.prototype.close, "close"), n(ReadableByteStreamController.prototype.enqueue, "enqueue"), n(ReadableByteStreamController.prototype.error, "error"), "symbol" == typeof e.toStringTag && Object.defineProperty(ReadableByteStreamController.prototype, e.toStringTag, { value: "ReadableByteStreamController", configurable: true });
var ReadableStreamBYOBReader = class {
  constructor(e2) {
    if ($(e2, 1, "ReadableStreamBYOBReader"), V(e2, "First parameter"), Ut(e2)) throw new TypeError("This stream has already been locked for exclusive reading by another reader");
    if (!de(e2._readableStreamController)) throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
    E(this, e2), this._readIntoRequests = new S();
  }
  get closed() {
    return Fe(this) ? this._closedPromise : d(De("closed"));
  }
  cancel(e2) {
    return Fe(this) ? void 0 === this._ownerReadableStream ? d(k("cancel")) : P(this, e2) : d(De("cancel"));
  }
  read(e2) {
    if (!Fe(this)) return d(De("read"));
    if (!ArrayBuffer.isView(e2)) return d(new TypeError("view must be an array buffer view"));
    if (0 === e2.byteLength) return d(new TypeError("view must have non-zero byteLength"));
    if (0 === e2.buffer.byteLength) return d(new TypeError("view's buffer must have non-zero byteLength"));
    if (e2.buffer, void 0 === this._ownerReadableStream) return d(k("read from"));
    let t2, r2;
    const o2 = u((e3, o3) => {
      t2 = e3, r2 = o3;
    });
    return function(e3, t3, r3) {
      const o3 = e3._ownerReadableStream;
      o3._disturbed = true, "errored" === o3._state ? r3._errorSteps(o3._storedError) : function(e4, t4, r4) {
        const o4 = e4._controlledReadableByteStream;
        let n2 = 1;
        t4.constructor !== DataView && (n2 = t4.constructor.BYTES_PER_ELEMENT);
        const a2 = t4.constructor, i2 = t4.buffer, l2 = { buffer: i2, bufferByteLength: i2.byteLength, byteOffset: t4.byteOffset, byteLength: t4.byteLength, bytesFilled: 0, elementSize: n2, viewConstructor: a2, readerType: "byob" };
        if (e4._pendingPullIntos.length > 0) return e4._pendingPullIntos.push(l2), void je(o4, r4);
        if ("closed" !== o4._state) {
          if (e4._queueTotalSize > 0) {
            if (we(e4, l2)) {
              const t5 = pe(l2);
              return ve(e4), void r4._chunkSteps(t5);
            }
            if (e4._closeRequested) {
              const t5 = new TypeError("Insufficient bytes to fill elements in the given buffer");
              return Pe(e4, t5), void r4._errorSteps(t5);
            }
          }
          e4._pendingPullIntos.push(l2), je(o4, r4), be(e4);
        } else {
          const e5 = new a2(l2.buffer, l2.byteOffset, 0);
          r4._closeSteps(e5);
        }
      }(o3._readableStreamController, t3, r3);
    }(this, e2, { _chunkSteps: (e3) => t2({ value: e3, done: false }), _closeSteps: (e3) => t2({ value: e3, done: true }), _errorSteps: (e3) => r2(e3) }), o2;
  }
  releaseLock() {
    if (!Fe(this)) throw De("releaseLock");
    void 0 !== this._ownerReadableStream && function(e2) {
      W(e2);
      const t2 = new TypeError("Reader was released");
      Ie(e2, t2);
    }(this);
  }
};
function Fe(e2) {
  return !!r(e2) && (!!Object.prototype.hasOwnProperty.call(e2, "_readIntoRequests") && e2 instanceof ReadableStreamBYOBReader);
}
function Ie(e2, t2) {
  const r2 = e2._readIntoRequests;
  e2._readIntoRequests = new S(), r2.forEach((e3) => {
    e3._errorSteps(t2);
  });
}
function De(e2) {
  return new TypeError(`ReadableStreamBYOBReader.prototype.${e2} can only be used on a ReadableStreamBYOBReader`);
}
function $e(e2, t2) {
  const { highWaterMark: r2 } = e2;
  if (void 0 === r2) return t2;
  if (ae(r2) || r2 < 0) throw new RangeError("Invalid highWaterMark");
  return r2;
}
function Me(e2) {
  const { size: t2 } = e2;
  return t2 || (() => 1);
}
function Ye(e2, t2) {
  F(e2, t2);
  const r2 = null == e2 ? void 0 : e2.highWaterMark, o2 = null == e2 ? void 0 : e2.size;
  return { highWaterMark: void 0 === r2 ? void 0 : Y(r2), size: void 0 === o2 ? void 0 : Qe(o2, `${t2} has member 'size' that`) };
}
function Qe(e2, t2) {
  return I(e2, t2), (t3) => Y(e2(t3));
}
function Ne(e2, t2, r2) {
  return I(e2, r2), (r3) => w(e2, t2, [r3]);
}
function He(e2, t2, r2) {
  return I(e2, r2), () => w(e2, t2, []);
}
function xe(e2, t2, r2) {
  return I(e2, r2), (r3) => g(e2, t2, [r3]);
}
function Ve(e2, t2, r2) {
  return I(e2, r2), (r3, o2) => w(e2, t2, [r3, o2]);
}
Object.defineProperties(ReadableStreamBYOBReader.prototype, { cancel: { enumerable: true }, read: { enumerable: true }, releaseLock: { enumerable: true }, closed: { enumerable: true } }), n(ReadableStreamBYOBReader.prototype.cancel, "cancel"), n(ReadableStreamBYOBReader.prototype.read, "read"), n(ReadableStreamBYOBReader.prototype.releaseLock, "releaseLock"), "symbol" == typeof e.toStringTag && Object.defineProperty(ReadableStreamBYOBReader.prototype, e.toStringTag, { value: "ReadableStreamBYOBReader", configurable: true });
var Ue = "function" == typeof AbortController;
var WritableStream = class {
  constructor(e2 = {}, t2 = {}) {
    void 0 === e2 ? e2 = null : D(e2, "First parameter");
    const r2 = Ye(t2, "Second parameter"), o2 = function(e3, t3) {
      F(e3, t3);
      const r3 = null == e3 ? void 0 : e3.abort, o3 = null == e3 ? void 0 : e3.close, n3 = null == e3 ? void 0 : e3.start, a3 = null == e3 ? void 0 : e3.type, i2 = null == e3 ? void 0 : e3.write;
      return { abort: void 0 === r3 ? void 0 : Ne(r3, e3, `${t3} has member 'abort' that`), close: void 0 === o3 ? void 0 : He(o3, e3, `${t3} has member 'close' that`), start: void 0 === n3 ? void 0 : xe(n3, e3, `${t3} has member 'start' that`), write: void 0 === i2 ? void 0 : Ve(i2, e3, `${t3} has member 'write' that`), type: a3 };
    }(e2, "First parameter");
    var n2;
    (n2 = this)._state = "writable", n2._storedError = void 0, n2._writer = void 0, n2._writableStreamController = void 0, n2._writeRequests = new S(), n2._inFlightWriteRequest = void 0, n2._closeRequest = void 0, n2._inFlightCloseRequest = void 0, n2._pendingAbortRequest = void 0, n2._backpressure = false;
    if (void 0 !== o2.type) throw new RangeError("Invalid type is specified");
    const a2 = Me(r2);
    !function(e3, t3, r3, o3) {
      const n3 = Object.create(WritableStreamDefaultController.prototype);
      let a3, i2, l2, s2;
      a3 = void 0 !== t3.start ? () => t3.start(n3) : () => {
      };
      i2 = void 0 !== t3.write ? (e4) => t3.write(e4, n3) : () => c(void 0);
      l2 = void 0 !== t3.close ? () => t3.close() : () => c(void 0);
      s2 = void 0 !== t3.abort ? (e4) => t3.abort(e4) : () => c(void 0);
      !function(e4, t4, r4, o4, n4, a4, i3, l3) {
        t4._controlledWritableStream = e4, e4._writableStreamController = t4, t4._queue = void 0, t4._queueTotalSize = void 0, ce(t4), t4._abortReason = void 0, t4._abortController = function() {
          if (Ue) return new AbortController();
        }(), t4._started = false, t4._strategySizeAlgorithm = l3, t4._strategyHWM = i3, t4._writeAlgorithm = o4, t4._closeAlgorithm = n4, t4._abortAlgorithm = a4;
        const s3 = bt(t4);
        nt(e4, s3);
        const u2 = r4();
        b(c(u2), () => (t4._started = true, dt(t4), null), (r5) => (t4._started = true, Ze(e4, r5), null));
      }(e3, n3, a3, i2, l2, s2, r3, o3);
    }(this, o2, $e(r2, 1), a2);
  }
  get locked() {
    if (!Ge(this)) throw _t("locked");
    return Xe(this);
  }
  abort(e2) {
    return Ge(this) ? Xe(this) ? d(new TypeError("Cannot abort a stream that already has a writer")) : Je(this, e2) : d(_t("abort"));
  }
  close() {
    return Ge(this) ? Xe(this) ? d(new TypeError("Cannot close a stream that already has a writer")) : rt(this) ? d(new TypeError("Cannot close an already-closing stream")) : Ke(this) : d(_t("close"));
  }
  getWriter() {
    if (!Ge(this)) throw _t("getWriter");
    return new WritableStreamDefaultWriter(this);
  }
};
function Ge(e2) {
  return !!r(e2) && (!!Object.prototype.hasOwnProperty.call(e2, "_writableStreamController") && e2 instanceof WritableStream);
}
function Xe(e2) {
  return void 0 !== e2._writer;
}
function Je(e2, t2) {
  var r2;
  if ("closed" === e2._state || "errored" === e2._state) return c(void 0);
  e2._writableStreamController._abortReason = t2, null === (r2 = e2._writableStreamController._abortController) || void 0 === r2 || r2.abort(t2);
  const o2 = e2._state;
  if ("closed" === o2 || "errored" === o2) return c(void 0);
  if (void 0 !== e2._pendingAbortRequest) return e2._pendingAbortRequest._promise;
  let n2 = false;
  "erroring" === o2 && (n2 = true, t2 = void 0);
  const a2 = u((r3, o3) => {
    e2._pendingAbortRequest = { _promise: void 0, _resolve: r3, _reject: o3, _reason: t2, _wasAlreadyErroring: n2 };
  });
  return e2._pendingAbortRequest._promise = a2, n2 || et(e2, t2), a2;
}
function Ke(e2) {
  const t2 = e2._state;
  if ("closed" === t2 || "errored" === t2) return d(new TypeError(`The stream (in ${t2} state) is not in the writable state and cannot be closed`));
  const r2 = u((t3, r3) => {
    const o3 = { _resolve: t3, _reject: r3 };
    e2._closeRequest = o3;
  }), o2 = e2._writer;
  var n2;
  return void 0 !== o2 && e2._backpressure && "writable" === t2 && Et(o2), ue(n2 = e2._writableStreamController, lt, 0), dt(n2), r2;
}
function Ze(e2, t2) {
  "writable" !== e2._state ? tt(e2) : et(e2, t2);
}
function et(e2, t2) {
  const r2 = e2._writableStreamController;
  e2._state = "erroring", e2._storedError = t2;
  const o2 = e2._writer;
  void 0 !== o2 && it(o2, t2), !function(e3) {
    if (void 0 === e3._inFlightWriteRequest && void 0 === e3._inFlightCloseRequest) return false;
    return true;
  }(e2) && r2._started && tt(e2);
}
function tt(e2) {
  e2._state = "errored", e2._writableStreamController[R]();
  const t2 = e2._storedError;
  if (e2._writeRequests.forEach((e3) => {
    e3._reject(t2);
  }), e2._writeRequests = new S(), void 0 === e2._pendingAbortRequest) return void ot(e2);
  const r2 = e2._pendingAbortRequest;
  if (e2._pendingAbortRequest = void 0, r2._wasAlreadyErroring) return r2._reject(t2), void ot(e2);
  b(e2._writableStreamController[v](r2._reason), () => (r2._resolve(), ot(e2), null), (t3) => (r2._reject(t3), ot(e2), null));
}
function rt(e2) {
  return void 0 !== e2._closeRequest || void 0 !== e2._inFlightCloseRequest;
}
function ot(e2) {
  void 0 !== e2._closeRequest && (e2._closeRequest._reject(e2._storedError), e2._closeRequest = void 0);
  const t2 = e2._writer;
  void 0 !== t2 && St(t2, e2._storedError);
}
function nt(e2, t2) {
  const r2 = e2._writer;
  void 0 !== r2 && t2 !== e2._backpressure && (t2 ? function(e3) {
    Rt(e3);
  }(r2) : Et(r2)), e2._backpressure = t2;
}
Object.defineProperties(WritableStream.prototype, { abort: { enumerable: true }, close: { enumerable: true }, getWriter: { enumerable: true }, locked: { enumerable: true } }), n(WritableStream.prototype.abort, "abort"), n(WritableStream.prototype.close, "close"), n(WritableStream.prototype.getWriter, "getWriter"), "symbol" == typeof e.toStringTag && Object.defineProperty(WritableStream.prototype, e.toStringTag, { value: "WritableStream", configurable: true });
var WritableStreamDefaultWriter = class {
  constructor(e2) {
    if ($(e2, 1, "WritableStreamDefaultWriter"), function(e3, t3) {
      if (!Ge(e3)) throw new TypeError(`${t3} is not a WritableStream.`);
    }(e2, "First parameter"), Xe(e2)) throw new TypeError("This stream has already been locked for exclusive writing by another writer");
    this._ownerWritableStream = e2, e2._writer = this;
    const t2 = e2._state;
    if ("writable" === t2) !rt(e2) && e2._backpressure ? Rt(this) : qt(this), gt(this);
    else if ("erroring" === t2) Tt(this, e2._storedError), gt(this);
    else if ("closed" === t2) qt(this), gt(r2 = this), vt(r2);
    else {
      const t3 = e2._storedError;
      Tt(this, t3), wt(this, t3);
    }
    var r2;
  }
  get closed() {
    return at(this) ? this._closedPromise : d(mt("closed"));
  }
  get desiredSize() {
    if (!at(this)) throw mt("desiredSize");
    if (void 0 === this._ownerWritableStream) throw yt("desiredSize");
    return function(e2) {
      const t2 = e2._ownerWritableStream, r2 = t2._state;
      if ("errored" === r2 || "erroring" === r2) return null;
      if ("closed" === r2) return 0;
      return ct(t2._writableStreamController);
    }(this);
  }
  get ready() {
    return at(this) ? this._readyPromise : d(mt("ready"));
  }
  abort(e2) {
    return at(this) ? void 0 === this._ownerWritableStream ? d(yt("abort")) : function(e3, t2) {
      return Je(e3._ownerWritableStream, t2);
    }(this, e2) : d(mt("abort"));
  }
  close() {
    if (!at(this)) return d(mt("close"));
    const e2 = this._ownerWritableStream;
    return void 0 === e2 ? d(yt("close")) : rt(e2) ? d(new TypeError("Cannot close an already-closing stream")) : Ke(this._ownerWritableStream);
  }
  releaseLock() {
    if (!at(this)) throw mt("releaseLock");
    void 0 !== this._ownerWritableStream && function(e2) {
      const t2 = e2._ownerWritableStream, r2 = new TypeError("Writer was released and can no longer be used to monitor the stream's closedness");
      it(e2, r2), function(e3, t3) {
        "pending" === e3._closedPromiseState ? St(e3, t3) : function(e4, t4) {
          wt(e4, t4);
        }(e3, t3);
      }(e2, r2), t2._writer = void 0, e2._ownerWritableStream = void 0;
    }(this);
  }
  write(e2) {
    return at(this) ? void 0 === this._ownerWritableStream ? d(yt("write to")) : function(e3, t2) {
      const r2 = e3._ownerWritableStream, o2 = r2._writableStreamController, n2 = function(e4, t3) {
        try {
          return e4._strategySizeAlgorithm(t3);
        } catch (t4) {
          return ft(e4, t4), 1;
        }
      }(o2, t2);
      if (r2 !== e3._ownerWritableStream) return d(yt("write to"));
      const a2 = r2._state;
      if ("errored" === a2) return d(r2._storedError);
      if (rt(r2) || "closed" === a2) return d(new TypeError("The stream is closing or closed and cannot be written to"));
      if ("erroring" === a2) return d(r2._storedError);
      const i2 = function(e4) {
        return u((t3, r3) => {
          const o3 = { _resolve: t3, _reject: r3 };
          e4._writeRequests.push(o3);
        });
      }(r2);
      return function(e4, t3, r3) {
        try {
          ue(e4, t3, r3);
        } catch (t4) {
          return void ft(e4, t4);
        }
        const o3 = e4._controlledWritableStream;
        if (!rt(o3) && "writable" === o3._state) {
          nt(o3, bt(e4));
        }
        dt(e4);
      }(o2, t2, n2), i2;
    }(this, e2) : d(mt("write"));
  }
};
function at(e2) {
  return !!r(e2) && (!!Object.prototype.hasOwnProperty.call(e2, "_ownerWritableStream") && e2 instanceof WritableStreamDefaultWriter);
}
function it(e2, t2) {
  "pending" === e2._readyPromiseState ? Ct(e2, t2) : function(e3, t3) {
    Tt(e3, t3);
  }(e2, t2);
}
Object.defineProperties(WritableStreamDefaultWriter.prototype, { abort: { enumerable: true }, close: { enumerable: true }, releaseLock: { enumerable: true }, write: { enumerable: true }, closed: { enumerable: true }, desiredSize: { enumerable: true }, ready: { enumerable: true } }), n(WritableStreamDefaultWriter.prototype.abort, "abort"), n(WritableStreamDefaultWriter.prototype.close, "close"), n(WritableStreamDefaultWriter.prototype.releaseLock, "releaseLock"), n(WritableStreamDefaultWriter.prototype.write, "write"), "symbol" == typeof e.toStringTag && Object.defineProperty(WritableStreamDefaultWriter.prototype, e.toStringTag, { value: "WritableStreamDefaultWriter", configurable: true });
var lt = {};
var WritableStreamDefaultController = class {
  constructor() {
    throw new TypeError("Illegal constructor");
  }
  get abortReason() {
    if (!st(this)) throw pt("abortReason");
    return this._abortReason;
  }
  get signal() {
    if (!st(this)) throw pt("signal");
    if (void 0 === this._abortController) throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
    return this._abortController.signal;
  }
  error(e2) {
    if (!st(this)) throw pt("error");
    "writable" === this._controlledWritableStream._state && ht(this, e2);
  }
  [v](e2) {
    const t2 = this._abortAlgorithm(e2);
    return ut(this), t2;
  }
  [R]() {
    ce(this);
  }
};
function st(e2) {
  return !!r(e2) && (!!Object.prototype.hasOwnProperty.call(e2, "_controlledWritableStream") && e2 instanceof WritableStreamDefaultController);
}
function ut(e2) {
  e2._writeAlgorithm = void 0, e2._closeAlgorithm = void 0, e2._abortAlgorithm = void 0, e2._strategySizeAlgorithm = void 0;
}
function ct(e2) {
  return e2._strategyHWM - e2._queueTotalSize;
}
function dt(e2) {
  const t2 = e2._controlledWritableStream;
  if (!e2._started) return;
  if (void 0 !== t2._inFlightWriteRequest) return;
  if ("erroring" === t2._state) return void tt(t2);
  if (0 === e2._queue.length) return;
  const r2 = e2._queue.peek().value;
  r2 === lt ? function(e3) {
    const t3 = e3._controlledWritableStream;
    (function(e4) {
      e4._inFlightCloseRequest = e4._closeRequest, e4._closeRequest = void 0;
    })(t3), se(e3);
    const r3 = e3._closeAlgorithm();
    ut(e3), b(r3, () => (function(e4) {
      e4._inFlightCloseRequest._resolve(void 0), e4._inFlightCloseRequest = void 0, "erroring" === e4._state && (e4._storedError = void 0, void 0 !== e4._pendingAbortRequest && (e4._pendingAbortRequest._resolve(), e4._pendingAbortRequest = void 0)), e4._state = "closed";
      const t4 = e4._writer;
      void 0 !== t4 && vt(t4);
    }(t3), null), (e4) => (function(e5, t4) {
      e5._inFlightCloseRequest._reject(t4), e5._inFlightCloseRequest = void 0, void 0 !== e5._pendingAbortRequest && (e5._pendingAbortRequest._reject(t4), e5._pendingAbortRequest = void 0), Ze(e5, t4);
    }(t3, e4), null));
  }(e2) : function(e3, t3) {
    const r3 = e3._controlledWritableStream;
    !function(e4) {
      e4._inFlightWriteRequest = e4._writeRequests.shift();
    }(r3);
    b(e3._writeAlgorithm(t3), () => {
      !function(e4) {
        e4._inFlightWriteRequest._resolve(void 0), e4._inFlightWriteRequest = void 0;
      }(r3);
      const t4 = r3._state;
      if (se(e3), !rt(r3) && "writable" === t4) {
        const t5 = bt(e3);
        nt(r3, t5);
      }
      return dt(e3), null;
    }, (t4) => ("writable" === r3._state && ut(e3), function(e4, t5) {
      e4._inFlightWriteRequest._reject(t5), e4._inFlightWriteRequest = void 0, Ze(e4, t5);
    }(r3, t4), null));
  }(e2, r2);
}
function ft(e2, t2) {
  "writable" === e2._controlledWritableStream._state && ht(e2, t2);
}
function bt(e2) {
  return ct(e2) <= 0;
}
function ht(e2, t2) {
  const r2 = e2._controlledWritableStream;
  ut(e2), et(r2, t2);
}
function _t(e2) {
  return new TypeError(`WritableStream.prototype.${e2} can only be used on a WritableStream`);
}
function pt(e2) {
  return new TypeError(`WritableStreamDefaultController.prototype.${e2} can only be used on a WritableStreamDefaultController`);
}
function mt(e2) {
  return new TypeError(`WritableStreamDefaultWriter.prototype.${e2} can only be used on a WritableStreamDefaultWriter`);
}
function yt(e2) {
  return new TypeError("Cannot " + e2 + " a stream using a released writer");
}
function gt(e2) {
  e2._closedPromise = u((t2, r2) => {
    e2._closedPromise_resolve = t2, e2._closedPromise_reject = r2, e2._closedPromiseState = "pending";
  });
}
function wt(e2, t2) {
  gt(e2), St(e2, t2);
}
function St(e2, t2) {
  void 0 !== e2._closedPromise_reject && (m(e2._closedPromise), e2._closedPromise_reject(t2), e2._closedPromise_resolve = void 0, e2._closedPromise_reject = void 0, e2._closedPromiseState = "rejected");
}
function vt(e2) {
  void 0 !== e2._closedPromise_resolve && (e2._closedPromise_resolve(void 0), e2._closedPromise_resolve = void 0, e2._closedPromise_reject = void 0, e2._closedPromiseState = "resolved");
}
function Rt(e2) {
  e2._readyPromise = u((t2, r2) => {
    e2._readyPromise_resolve = t2, e2._readyPromise_reject = r2;
  }), e2._readyPromiseState = "pending";
}
function Tt(e2, t2) {
  Rt(e2), Ct(e2, t2);
}
function qt(e2) {
  Rt(e2), Et(e2);
}
function Ct(e2, t2) {
  void 0 !== e2._readyPromise_reject && (m(e2._readyPromise), e2._readyPromise_reject(t2), e2._readyPromise_resolve = void 0, e2._readyPromise_reject = void 0, e2._readyPromiseState = "rejected");
}
function Et(e2) {
  void 0 !== e2._readyPromise_resolve && (e2._readyPromise_resolve(void 0), e2._readyPromise_resolve = void 0, e2._readyPromise_reject = void 0, e2._readyPromiseState = "fulfilled");
}
Object.defineProperties(WritableStreamDefaultController.prototype, { abortReason: { enumerable: true }, signal: { enumerable: true }, error: { enumerable: true } }), "symbol" == typeof e.toStringTag && Object.defineProperty(WritableStreamDefaultController.prototype, e.toStringTag, { value: "WritableStreamDefaultController", configurable: true });
var Pt = "undefined" != typeof DOMException ? DOMException : void 0;
var Wt = function(e2) {
  if ("function" != typeof e2 && "object" != typeof e2) return false;
  try {
    return new e2(), true;
  } catch (e3) {
    return false;
  }
}(Pt) ? Pt : function() {
  const e2 = function(e3, t2) {
    this.message = e3 || "", this.name = t2 || "Error", Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
  };
  return e2.prototype = Object.create(Error.prototype), Object.defineProperty(e2.prototype, "constructor", { value: e2, writable: true, configurable: true }), e2;
}();
function kt(e2, t2, r2, o2, n2, a2) {
  const i2 = e2.getReader(), l2 = t2.getWriter();
  Vt(e2) && (e2._disturbed = true);
  let s2, _2, g2, w2 = false, S2 = false, v2 = "readable", R2 = "writable", T2 = false, q2 = false;
  const C2 = u((e3) => {
    g2 = e3;
  });
  let E2 = Promise.resolve(void 0);
  return u((P2, W2) => {
    let k2;
    function O2() {
      if (w2) return;
      const e3 = u((e4, t3) => {
        !function r3(o3) {
          o3 ? e4() : f(function() {
            if (w2) return c(true);
            return f(l2.ready, () => f(i2.read(), (e5) => !!e5.done || (E2 = l2.write(e5.value), m(E2), false)));
          }(), r3, t3);
        }(false);
      });
      m(e3);
    }
    function B2() {
      return v2 = "closed", r2 ? L2() : z4(() => (Ge(t2) && (T2 = rt(t2), R2 = t2._state), T2 || "closed" === R2 ? c(void 0) : "erroring" === R2 || "errored" === R2 ? d(_2) : (T2 = true, l2.close())), false, void 0), null;
    }
    function A2(e3) {
      return w2 || (v2 = "errored", s2 = e3, o2 ? L2(true, e3) : z4(() => l2.abort(e3), true, e3)), null;
    }
    function j2(e3) {
      return S2 || (R2 = "errored", _2 = e3, n2 ? L2(true, e3) : z4(() => i2.cancel(e3), true, e3)), null;
    }
    if (void 0 !== a2 && (k2 = () => {
      const e3 = void 0 !== a2.reason ? a2.reason : new Wt("Aborted", "AbortError"), t3 = [];
      o2 || t3.push(() => "writable" === R2 ? l2.abort(e3) : c(void 0)), n2 || t3.push(() => "readable" === v2 ? i2.cancel(e3) : c(void 0)), z4(() => Promise.all(t3.map((e4) => e4())), true, e3);
    }, a2.aborted ? k2() : a2.addEventListener("abort", k2)), Vt(e2) && (v2 = e2._state, s2 = e2._storedError), Ge(t2) && (R2 = t2._state, _2 = t2._storedError, T2 = rt(t2)), Vt(e2) && Ge(t2) && (q2 = true, g2()), "errored" === v2) A2(s2);
    else if ("erroring" === R2 || "errored" === R2) j2(_2);
    else if ("closed" === v2) B2();
    else if (T2 || "closed" === R2) {
      const e3 = new TypeError("the destination writable stream closed before all data could be piped to it");
      n2 ? L2(true, e3) : z4(() => i2.cancel(e3), true, e3);
    }
    function z4(e3, t3, r3) {
      function o3() {
        return "writable" !== R2 || T2 ? n3() : h(function() {
          let e4;
          return c(function t4() {
            if (e4 !== E2) return e4 = E2, p(E2, t4, t4);
          }());
        }(), n3), null;
      }
      function n3() {
        return e3 ? b(e3(), () => F2(t3, r3), (e4) => F2(true, e4)) : F2(t3, r3), null;
      }
      w2 || (w2 = true, q2 ? o3() : h(C2, o3));
    }
    function L2(e3, t3) {
      z4(void 0, e3, t3);
    }
    function F2(e3, t3) {
      return S2 = true, l2.releaseLock(), i2.releaseLock(), void 0 !== a2 && a2.removeEventListener("abort", k2), e3 ? W2(t3) : P2(void 0), null;
    }
    w2 || (b(i2.closed, B2, A2), b(l2.closed, function() {
      return S2 || (R2 = "closed"), null;
    }, j2)), q2 ? O2() : y(() => {
      q2 = true, g2(), O2();
    });
  });
}
function Ot(e2, t2) {
  return function(e3) {
    try {
      return e3.getReader({ mode: "byob" }).releaseLock(), true;
    } catch (e4) {
      return false;
    }
  }(e2) ? function(e3) {
    let t3, r2, o2, n2, a2, i2 = e3.getReader(), l2 = false, s2 = false, d2 = false, f2 = false, h2 = false, p2 = false;
    const m2 = u((e4) => {
      a2 = e4;
    });
    function y2(e4) {
      _(e4.closed, (t4) => (e4 !== i2 || (o2.error(t4), n2.error(t4), h2 && p2 || a2(void 0)), null));
    }
    function g2() {
      l2 && (i2.releaseLock(), i2 = e3.getReader(), y2(i2), l2 = false), b(i2.read(), (e4) => {
        var t4, r3;
        if (d2 = false, f2 = false, e4.done) return h2 || o2.close(), p2 || n2.close(), null === (t4 = o2.byobRequest) || void 0 === t4 || t4.respond(0), null === (r3 = n2.byobRequest) || void 0 === r3 || r3.respond(0), h2 && p2 || a2(void 0), null;
        const l3 = e4.value, u2 = l3;
        let c2 = l3;
        if (!h2 && !p2) try {
          c2 = le(l3);
        } catch (e5) {
          return o2.error(e5), n2.error(e5), a2(i2.cancel(e5)), null;
        }
        return h2 || o2.enqueue(u2), p2 || n2.enqueue(c2), s2 = false, d2 ? S2() : f2 && v2(), null;
      }, () => (s2 = false, null));
    }
    function w2(t4, r3) {
      l2 || (i2.releaseLock(), i2 = e3.getReader({ mode: "byob" }), y2(i2), l2 = true);
      const u2 = r3 ? n2 : o2, c2 = r3 ? o2 : n2;
      b(i2.read(t4), (e4) => {
        var t5;
        d2 = false, f2 = false;
        const o3 = r3 ? p2 : h2, n3 = r3 ? h2 : p2;
        if (e4.done) {
          o3 || u2.close(), n3 || c2.close();
          const r4 = e4.value;
          return void 0 !== r4 && (o3 || u2.byobRequest.respondWithNewView(r4), n3 || null === (t5 = c2.byobRequest) || void 0 === t5 || t5.respond(0)), o3 && n3 || a2(void 0), null;
        }
        const l3 = e4.value;
        if (n3) o3 || u2.byobRequest.respondWithNewView(l3);
        else {
          let e5;
          try {
            e5 = le(l3);
          } catch (e6) {
            return u2.error(e6), c2.error(e6), a2(i2.cancel(e6)), null;
          }
          o3 || u2.byobRequest.respondWithNewView(l3), c2.enqueue(e5);
        }
        return s2 = false, d2 ? S2() : f2 && v2(), null;
      }, () => (s2 = false, null));
    }
    function S2() {
      if (s2) return d2 = true, c(void 0);
      s2 = true;
      const e4 = o2.byobRequest;
      return null === e4 ? g2() : w2(e4.view, false), c(void 0);
    }
    function v2() {
      if (s2) return f2 = true, c(void 0);
      s2 = true;
      const e4 = n2.byobRequest;
      return null === e4 ? g2() : w2(e4.view, true), c(void 0);
    }
    function R2(e4) {
      if (h2 = true, t3 = e4, p2) {
        const e5 = [t3, r2], o3 = i2.cancel(e5);
        a2(o3);
      }
      return m2;
    }
    function T2(e4) {
      if (p2 = true, r2 = e4, h2) {
        const e5 = [t3, r2], o3 = i2.cancel(e5);
        a2(o3);
      }
      return m2;
    }
    const q2 = new ReadableStream2({ type: "bytes", start(e4) {
      o2 = e4;
    }, pull: S2, cancel: R2 }), C2 = new ReadableStream2({ type: "bytes", start(e4) {
      n2 = e4;
    }, pull: v2, cancel: T2 });
    return y2(i2), [q2, C2];
  }(e2) : function(e3, t3) {
    const r2 = e3.getReader();
    let o2, n2, a2, i2, l2, s2 = false, d2 = false, f2 = false, h2 = false;
    const p2 = u((e4) => {
      l2 = e4;
    });
    function m2() {
      return s2 ? (d2 = true, c(void 0)) : (s2 = true, b(r2.read(), (e4) => {
        if (d2 = false, e4.done) return f2 || a2.close(), h2 || i2.close(), f2 && h2 || l2(void 0), null;
        const t4 = e4.value, r3 = t4, o3 = t4;
        return f2 || a2.enqueue(r3), h2 || i2.enqueue(o3), s2 = false, d2 && m2(), null;
      }, () => (s2 = false, null)), c(void 0));
    }
    function y2(e4) {
      if (f2 = true, o2 = e4, h2) {
        const e5 = [o2, n2], t4 = r2.cancel(e5);
        l2(t4);
      }
      return p2;
    }
    function g2(e4) {
      if (h2 = true, n2 = e4, f2) {
        const e5 = [o2, n2], t4 = r2.cancel(e5);
        l2(t4);
      }
      return p2;
    }
    const w2 = new ReadableStream2({ start(e4) {
      a2 = e4;
    }, pull: m2, cancel: y2 }), S2 = new ReadableStream2({ start(e4) {
      i2 = e4;
    }, pull: m2, cancel: g2 });
    return _(r2.closed, (e4) => (a2.error(e4), i2.error(e4), f2 && h2 || l2(void 0), null)), [w2, S2];
  }(e2);
}
var ReadableStreamDefaultController = class {
  constructor() {
    throw new TypeError("Illegal constructor");
  }
  get desiredSize() {
    if (!Bt(this)) throw Dt("desiredSize");
    return Lt(this);
  }
  close() {
    if (!Bt(this)) throw Dt("close");
    if (!Ft(this)) throw new TypeError("The stream is not in a state that permits close");
    !function(e2) {
      if (!Ft(e2)) return;
      const t2 = e2._controlledReadableStream;
      e2._closeRequested = true, 0 === e2._queue.length && (jt(e2), Xt(t2));
    }(this);
  }
  enqueue(e2) {
    if (!Bt(this)) throw Dt("enqueue");
    if (!Ft(this)) throw new TypeError("The stream is not in a state that permits enqueue");
    return function(e3, t2) {
      if (!Ft(e3)) return;
      const r2 = e3._controlledReadableStream;
      if (Ut(r2) && X(r2) > 0) G(r2, t2, false);
      else {
        let r3;
        try {
          r3 = e3._strategySizeAlgorithm(t2);
        } catch (t3) {
          throw zt(e3, t3), t3;
        }
        try {
          ue(e3, t2, r3);
        } catch (t3) {
          throw zt(e3, t3), t3;
        }
      }
      At(e3);
    }(this, e2);
  }
  error(e2) {
    if (!Bt(this)) throw Dt("error");
    zt(this, e2);
  }
  [T](e2) {
    ce(this);
    const t2 = this._cancelAlgorithm(e2);
    return jt(this), t2;
  }
  [q](e2) {
    const t2 = this._controlledReadableStream;
    if (this._queue.length > 0) {
      const r2 = se(this);
      this._closeRequested && 0 === this._queue.length ? (jt(this), Xt(t2)) : At(this), e2._chunkSteps(r2);
    } else U(t2, e2), At(this);
  }
  [C]() {
  }
};
function Bt(e2) {
  return !!r(e2) && (!!Object.prototype.hasOwnProperty.call(e2, "_controlledReadableStream") && e2 instanceof ReadableStreamDefaultController);
}
function At(e2) {
  const t2 = function(e3) {
    const t3 = e3._controlledReadableStream;
    if (!Ft(e3)) return false;
    if (!e3._started) return false;
    if (Ut(t3) && X(t3) > 0) return true;
    if (Lt(e3) > 0) return true;
    return false;
  }(e2);
  if (!t2) return;
  if (e2._pulling) return void (e2._pullAgain = true);
  e2._pulling = true;
  b(e2._pullAlgorithm(), () => (e2._pulling = false, e2._pullAgain && (e2._pullAgain = false, At(e2)), null), (t3) => (zt(e2, t3), null));
}
function jt(e2) {
  e2._pullAlgorithm = void 0, e2._cancelAlgorithm = void 0, e2._strategySizeAlgorithm = void 0;
}
function zt(e2, t2) {
  const r2 = e2._controlledReadableStream;
  "readable" === r2._state && (ce(e2), jt(e2), Jt(r2, t2));
}
function Lt(e2) {
  const t2 = e2._controlledReadableStream._state;
  return "errored" === t2 ? null : "closed" === t2 ? 0 : e2._strategyHWM - e2._queueTotalSize;
}
function Ft(e2) {
  return !e2._closeRequested && "readable" === e2._controlledReadableStream._state;
}
function It(e2, t2, r2, o2) {
  const n2 = Object.create(ReadableStreamDefaultController.prototype);
  let a2, i2, l2;
  a2 = void 0 !== t2.start ? () => t2.start(n2) : () => {
  }, i2 = void 0 !== t2.pull ? () => t2.pull(n2) : () => c(void 0), l2 = void 0 !== t2.cancel ? (e3) => t2.cancel(e3) : () => c(void 0), function(e3, t3, r3, o3, n3, a3, i3) {
    t3._controlledReadableStream = e3, t3._queue = void 0, t3._queueTotalSize = void 0, ce(t3), t3._started = false, t3._closeRequested = false, t3._pullAgain = false, t3._pulling = false, t3._strategySizeAlgorithm = i3, t3._strategyHWM = a3, t3._pullAlgorithm = o3, t3._cancelAlgorithm = n3, e3._readableStreamController = t3, b(c(r3()), () => (t3._started = true, At(t3), null), (e4) => (zt(t3, e4), null));
  }(e2, n2, a2, i2, l2, r2, o2);
}
function Dt(e2) {
  return new TypeError(`ReadableStreamDefaultController.prototype.${e2} can only be used on a ReadableStreamDefaultController`);
}
function $t(e2, t2, r2) {
  return I(e2, r2), (r3) => w(e2, t2, [r3]);
}
function Mt(e2, t2, r2) {
  return I(e2, r2), (r3) => w(e2, t2, [r3]);
}
function Yt(e2, t2, r2) {
  return I(e2, r2), (r3) => g(e2, t2, [r3]);
}
function Qt(e2, t2) {
  if ("bytes" !== (e2 = `${e2}`)) throw new TypeError(`${t2} '${e2}' is not a valid enumeration value for ReadableStreamType`);
  return e2;
}
function Nt(e2, t2) {
  if ("byob" !== (e2 = `${e2}`)) throw new TypeError(`${t2} '${e2}' is not a valid enumeration value for ReadableStreamReaderMode`);
  return e2;
}
function Ht(e2, t2) {
  F(e2, t2);
  const r2 = null == e2 ? void 0 : e2.preventAbort, o2 = null == e2 ? void 0 : e2.preventCancel, n2 = null == e2 ? void 0 : e2.preventClose, a2 = null == e2 ? void 0 : e2.signal;
  return void 0 !== a2 && function(e3, t3) {
    if (!function(e4) {
      if ("object" != typeof e4 || null === e4) return false;
      try {
        return "boolean" == typeof e4.aborted;
      } catch (e5) {
        return false;
      }
    }(e3)) throw new TypeError(`${t3} is not an AbortSignal.`);
  }(a2, `${t2} has member 'signal' that`), { preventAbort: Boolean(r2), preventCancel: Boolean(o2), preventClose: Boolean(n2), signal: a2 };
}
function xt(e2, t2) {
  F(e2, t2);
  const r2 = null == e2 ? void 0 : e2.readable;
  M(r2, "readable", "ReadableWritablePair"), function(e3, t3) {
    if (!H(e3)) throw new TypeError(`${t3} is not a ReadableStream.`);
  }(r2, `${t2} has member 'readable' that`);
  const o2 = null == e2 ? void 0 : e2.writable;
  return M(o2, "writable", "ReadableWritablePair"), function(e3, t3) {
    if (!x(e3)) throw new TypeError(`${t3} is not a WritableStream.`);
  }(o2, `${t2} has member 'writable' that`), { readable: r2, writable: o2 };
}
Object.defineProperties(ReadableStreamDefaultController.prototype, { close: { enumerable: true }, enqueue: { enumerable: true }, error: { enumerable: true }, desiredSize: { enumerable: true } }), n(ReadableStreamDefaultController.prototype.close, "close"), n(ReadableStreamDefaultController.prototype.enqueue, "enqueue"), n(ReadableStreamDefaultController.prototype.error, "error"), "symbol" == typeof e.toStringTag && Object.defineProperty(ReadableStreamDefaultController.prototype, e.toStringTag, { value: "ReadableStreamDefaultController", configurable: true });
var ReadableStream2 = class {
  constructor(e2 = {}, t2 = {}) {
    void 0 === e2 ? e2 = null : D(e2, "First parameter");
    const r2 = Ye(t2, "Second parameter"), o2 = function(e3, t3) {
      F(e3, t3);
      const r3 = e3, o3 = null == r3 ? void 0 : r3.autoAllocateChunkSize, n3 = null == r3 ? void 0 : r3.cancel, a2 = null == r3 ? void 0 : r3.pull, i2 = null == r3 ? void 0 : r3.start, l2 = null == r3 ? void 0 : r3.type;
      return { autoAllocateChunkSize: void 0 === o3 ? void 0 : N(o3, `${t3} has member 'autoAllocateChunkSize' that`), cancel: void 0 === n3 ? void 0 : $t(n3, r3, `${t3} has member 'cancel' that`), pull: void 0 === a2 ? void 0 : Mt(a2, r3, `${t3} has member 'pull' that`), start: void 0 === i2 ? void 0 : Yt(i2, r3, `${t3} has member 'start' that`), type: void 0 === l2 ? void 0 : Qt(l2, `${t3} has member 'type' that`) };
    }(e2, "First parameter");
    var n2;
    if ((n2 = this)._state = "readable", n2._reader = void 0, n2._storedError = void 0, n2._disturbed = false, "bytes" === o2.type) {
      if (void 0 !== r2.size) throw new RangeError("The strategy for a byte stream cannot have a size function");
      Oe(this, o2, $e(r2, 0));
    } else {
      const e3 = Me(r2);
      It(this, o2, $e(r2, 1), e3);
    }
  }
  get locked() {
    if (!Vt(this)) throw Kt("locked");
    return Ut(this);
  }
  cancel(e2) {
    return Vt(this) ? Ut(this) ? d(new TypeError("Cannot cancel a stream that already has a reader")) : Gt(this, e2) : d(Kt("cancel"));
  }
  getReader(e2) {
    if (!Vt(this)) throw Kt("getReader");
    return void 0 === function(e3, t2) {
      F(e3, t2);
      const r2 = null == e3 ? void 0 : e3.mode;
      return { mode: void 0 === r2 ? void 0 : Nt(r2, `${t2} has member 'mode' that`) };
    }(e2, "First parameter").mode ? new ReadableStreamDefaultReader(this) : function(e3) {
      return new ReadableStreamBYOBReader(e3);
    }(this);
  }
  pipeThrough(e2, t2 = {}) {
    if (!H(this)) throw Kt("pipeThrough");
    $(e2, 1, "pipeThrough");
    const r2 = xt(e2, "First parameter"), o2 = Ht(t2, "Second parameter");
    if (this.locked) throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
    if (r2.writable.locked) throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
    return m(kt(this, r2.writable, o2.preventClose, o2.preventAbort, o2.preventCancel, o2.signal)), r2.readable;
  }
  pipeTo(e2, t2 = {}) {
    if (!H(this)) return d(Kt("pipeTo"));
    if (void 0 === e2) return d("Parameter 1 is required in 'pipeTo'.");
    if (!x(e2)) return d(new TypeError("ReadableStream.prototype.pipeTo's first argument must be a WritableStream"));
    let r2;
    try {
      r2 = Ht(t2, "Second parameter");
    } catch (e3) {
      return d(e3);
    }
    return this.locked ? d(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream")) : e2.locked ? d(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream")) : kt(this, e2, r2.preventClose, r2.preventAbort, r2.preventCancel, r2.signal);
  }
  tee() {
    if (!H(this)) throw Kt("tee");
    if (this.locked) throw new TypeError("Cannot tee a stream that already has a reader");
    return Ot(this);
  }
  values(e2) {
    if (!H(this)) throw Kt("values");
    return function(e3, t2) {
      const r2 = e3.getReader(), o2 = new te(r2, t2), n2 = Object.create(re);
      return n2._asyncIteratorImpl = o2, n2;
    }(this, function(e3, t2) {
      F(e3, t2);
      const r2 = null == e3 ? void 0 : e3.preventCancel;
      return { preventCancel: Boolean(r2) };
    }(e2, "First parameter").preventCancel);
  }
};
function Vt(e2) {
  return !!r(e2) && (!!Object.prototype.hasOwnProperty.call(e2, "_readableStreamController") && e2 instanceof ReadableStream2);
}
function Ut(e2) {
  return void 0 !== e2._reader;
}
function Gt(e2, r2) {
  if (e2._disturbed = true, "closed" === e2._state) return c(void 0);
  if ("errored" === e2._state) return d(e2._storedError);
  Xt(e2);
  const o2 = e2._reader;
  if (void 0 !== o2 && Fe(o2)) {
    const e3 = o2._readIntoRequests;
    o2._readIntoRequests = new S(), e3.forEach((e4) => {
      e4._closeSteps(void 0);
    });
  }
  return p(e2._readableStreamController[T](r2), t);
}
function Xt(e2) {
  e2._state = "closed";
  const t2 = e2._reader;
  if (void 0 !== t2 && (j(t2), K(t2))) {
    const e3 = t2._readRequests;
    t2._readRequests = new S(), e3.forEach((e4) => {
      e4._closeSteps();
    });
  }
}
function Jt(e2, t2) {
  e2._state = "errored", e2._storedError = t2;
  const r2 = e2._reader;
  void 0 !== r2 && (A(r2, t2), K(r2) ? Z(r2, t2) : Ie(r2, t2));
}
function Kt(e2) {
  return new TypeError(`ReadableStream.prototype.${e2} can only be used on a ReadableStream`);
}
function Zt(e2, t2) {
  F(e2, t2);
  const r2 = null == e2 ? void 0 : e2.highWaterMark;
  return M(r2, "highWaterMark", "QueuingStrategyInit"), { highWaterMark: Y(r2) };
}
Object.defineProperties(ReadableStream2.prototype, { cancel: { enumerable: true }, getReader: { enumerable: true }, pipeThrough: { enumerable: true }, pipeTo: { enumerable: true }, tee: { enumerable: true }, values: { enumerable: true }, locked: { enumerable: true } }), n(ReadableStream2.prototype.cancel, "cancel"), n(ReadableStream2.prototype.getReader, "getReader"), n(ReadableStream2.prototype.pipeThrough, "pipeThrough"), n(ReadableStream2.prototype.pipeTo, "pipeTo"), n(ReadableStream2.prototype.tee, "tee"), n(ReadableStream2.prototype.values, "values"), "symbol" == typeof e.toStringTag && Object.defineProperty(ReadableStream2.prototype, e.toStringTag, { value: "ReadableStream", configurable: true }), "symbol" == typeof e.asyncIterator && Object.defineProperty(ReadableStream2.prototype, e.asyncIterator, { value: ReadableStream2.prototype.values, writable: true, configurable: true });
var er = (e2) => e2.byteLength;
n(er, "size");
var ByteLengthQueuingStrategy = class {
  constructor(e2) {
    $(e2, 1, "ByteLengthQueuingStrategy"), e2 = Zt(e2, "First parameter"), this._byteLengthQueuingStrategyHighWaterMark = e2.highWaterMark;
  }
  get highWaterMark() {
    if (!rr(this)) throw tr("highWaterMark");
    return this._byteLengthQueuingStrategyHighWaterMark;
  }
  get size() {
    if (!rr(this)) throw tr("size");
    return er;
  }
};
function tr(e2) {
  return new TypeError(`ByteLengthQueuingStrategy.prototype.${e2} can only be used on a ByteLengthQueuingStrategy`);
}
function rr(e2) {
  return !!r(e2) && (!!Object.prototype.hasOwnProperty.call(e2, "_byteLengthQueuingStrategyHighWaterMark") && e2 instanceof ByteLengthQueuingStrategy);
}
Object.defineProperties(ByteLengthQueuingStrategy.prototype, { highWaterMark: { enumerable: true }, size: { enumerable: true } }), "symbol" == typeof e.toStringTag && Object.defineProperty(ByteLengthQueuingStrategy.prototype, e.toStringTag, { value: "ByteLengthQueuingStrategy", configurable: true });
var or = () => 1;
n(or, "size");
var CountQueuingStrategy = class {
  constructor(e2) {
    $(e2, 1, "CountQueuingStrategy"), e2 = Zt(e2, "First parameter"), this._countQueuingStrategyHighWaterMark = e2.highWaterMark;
  }
  get highWaterMark() {
    if (!ar(this)) throw nr("highWaterMark");
    return this._countQueuingStrategyHighWaterMark;
  }
  get size() {
    if (!ar(this)) throw nr("size");
    return or;
  }
};
function nr(e2) {
  return new TypeError(`CountQueuingStrategy.prototype.${e2} can only be used on a CountQueuingStrategy`);
}
function ar(e2) {
  return !!r(e2) && (!!Object.prototype.hasOwnProperty.call(e2, "_countQueuingStrategyHighWaterMark") && e2 instanceof CountQueuingStrategy);
}
function ir(e2, t2, r2) {
  return I(e2, r2), (r3) => w(e2, t2, [r3]);
}
function lr(e2, t2, r2) {
  return I(e2, r2), (r3) => g(e2, t2, [r3]);
}
function sr(e2, t2, r2) {
  return I(e2, r2), (r3, o2) => w(e2, t2, [r3, o2]);
}
Object.defineProperties(CountQueuingStrategy.prototype, { highWaterMark: { enumerable: true }, size: { enumerable: true } }), "symbol" == typeof e.toStringTag && Object.defineProperty(CountQueuingStrategy.prototype, e.toStringTag, { value: "CountQueuingStrategy", configurable: true });
var TransformStream = class {
  constructor(e2 = {}, t2 = {}, r2 = {}) {
    void 0 === e2 && (e2 = null);
    const o2 = Ye(t2, "Second parameter"), n2 = Ye(r2, "Third parameter"), a2 = function(e3, t3) {
      F(e3, t3);
      const r3 = null == e3 ? void 0 : e3.flush, o3 = null == e3 ? void 0 : e3.readableType, n3 = null == e3 ? void 0 : e3.start, a3 = null == e3 ? void 0 : e3.transform, i3 = null == e3 ? void 0 : e3.writableType;
      return { flush: void 0 === r3 ? void 0 : ir(r3, e3, `${t3} has member 'flush' that`), readableType: o3, start: void 0 === n3 ? void 0 : lr(n3, e3, `${t3} has member 'start' that`), transform: void 0 === a3 ? void 0 : sr(a3, e3, `${t3} has member 'transform' that`), writableType: i3 };
    }(e2, "First parameter");
    if (void 0 !== a2.readableType) throw new RangeError("Invalid readableType specified");
    if (void 0 !== a2.writableType) throw new RangeError("Invalid writableType specified");
    const i2 = $e(n2, 0), l2 = Me(n2), s2 = $e(o2, 1), f2 = Me(o2);
    let b2;
    !function(e3, t3, r3, o3, n3, a3) {
      function i3() {
        return t3;
      }
      function l3(t4) {
        return function(e4, t5) {
          const r4 = e4._transformStreamController;
          if (e4._backpressure) {
            return p(e4._backpressureChangePromise, () => {
              if ("erroring" === (Ge(e4._writable) ? e4._writable._state : e4._writableState)) throw Ge(e4._writable) ? e4._writable._storedError : e4._writableStoredError;
              return pr(r4, t5);
            });
          }
          return pr(r4, t5);
        }(e3, t4);
      }
      function s3(t4) {
        return function(e4, t5) {
          return cr(e4, t5), c(void 0);
        }(e3, t4);
      }
      function u2() {
        return function(e4) {
          const t4 = e4._transformStreamController, r4 = t4._flushAlgorithm();
          return hr(t4), p(r4, () => {
            if ("errored" === e4._readableState) throw e4._readableStoredError;
            gr(e4) && wr(e4);
          }, (t5) => {
            throw cr(e4, t5), e4._readableStoredError;
          });
        }(e3);
      }
      function d2() {
        return function(e4) {
          return fr(e4, false), e4._backpressureChangePromise;
        }(e3);
      }
      function f3(t4) {
        return dr(e3, t4), c(void 0);
      }
      e3._writableState = "writable", e3._writableStoredError = void 0, e3._writableHasInFlightOperation = false, e3._writableStarted = false, e3._writable = function(e4, t4, r4, o4, n4, a4, i4) {
        return new WritableStream({ start(r5) {
          e4._writableController = r5;
          try {
            const t5 = r5.signal;
            void 0 !== t5 && t5.addEventListener("abort", () => {
              "writable" === e4._writableState && (e4._writableState = "erroring", t5.reason && (e4._writableStoredError = t5.reason));
            });
          } catch (e5) {
          }
          return p(t4(), () => (e4._writableStarted = true, Cr(e4), null), (t5) => {
            throw e4._writableStarted = true, Rr(e4, t5), t5;
          });
        }, write: (t5) => (function(e5) {
          e5._writableHasInFlightOperation = true;
        }(e4), p(r4(t5), () => (function(e5) {
          e5._writableHasInFlightOperation = false;
        }(e4), Cr(e4), null), (t6) => {
          throw function(e5, t7) {
            e5._writableHasInFlightOperation = false, Rr(e5, t7);
          }(e4, t6), t6;
        })), close: () => (function(e5) {
          e5._writableHasInFlightOperation = true;
        }(e4), p(o4(), () => (function(e5) {
          e5._writableHasInFlightOperation = false;
          "erroring" === e5._writableState && (e5._writableStoredError = void 0);
          e5._writableState = "closed";
        }(e4), null), (t5) => {
          throw function(e5, t6) {
            e5._writableHasInFlightOperation = false, e5._writableState, Rr(e5, t6);
          }(e4, t5), t5;
        })), abort: (t5) => (e4._writableState = "errored", e4._writableStoredError = t5, n4(t5)) }, { highWaterMark: a4, size: i4 });
      }(e3, i3, l3, u2, s3, r3, o3), e3._readableState = "readable", e3._readableStoredError = void 0, e3._readableCloseRequested = false, e3._readablePulling = false, e3._readable = function(e4, t4, r4, o4, n4, a4) {
        return new ReadableStream2({ start: (r5) => (e4._readableController = r5, t4().catch((t5) => {
          Sr(e4, t5);
        })), pull: () => (e4._readablePulling = true, r4().catch((t5) => {
          Sr(e4, t5);
        })), cancel: (t5) => (e4._readableState = "closed", o4(t5)) }, { highWaterMark: n4, size: a4 });
      }(e3, i3, d2, f3, n3, a3), e3._backpressure = void 0, e3._backpressureChangePromise = void 0, e3._backpressureChangePromise_resolve = void 0, fr(e3, true), e3._transformStreamController = void 0;
    }(this, u((e3) => {
      b2 = e3;
    }), s2, f2, i2, l2), function(e3, t3) {
      const r3 = Object.create(TransformStreamDefaultController.prototype);
      let o3, n3;
      o3 = void 0 !== t3.transform ? (e4) => t3.transform(e4, r3) : (e4) => {
        try {
          return _r(r3, e4), c(void 0);
        } catch (e5) {
          return d(e5);
        }
      };
      n3 = void 0 !== t3.flush ? () => t3.flush(r3) : () => c(void 0);
      !function(e4, t4, r4, o4) {
        t4._controlledTransformStream = e4, e4._transformStreamController = t4, t4._transformAlgorithm = r4, t4._flushAlgorithm = o4;
      }(e3, r3, o3, n3);
    }(this, a2), void 0 !== a2.start ? b2(a2.start(this._transformStreamController)) : b2(void 0);
  }
  get readable() {
    if (!ur(this)) throw yr("readable");
    return this._readable;
  }
  get writable() {
    if (!ur(this)) throw yr("writable");
    return this._writable;
  }
};
function ur(e2) {
  return !!r(e2) && (!!Object.prototype.hasOwnProperty.call(e2, "_transformStreamController") && e2 instanceof TransformStream);
}
function cr(e2, t2) {
  Sr(e2, t2), dr(e2, t2);
}
function dr(e2, t2) {
  hr(e2._transformStreamController), function(e3, t3) {
    e3._writableController.error(t3);
    "writable" === e3._writableState && Tr(e3, t3);
  }(e2, t2), e2._backpressure && fr(e2, false);
}
function fr(e2, t2) {
  void 0 !== e2._backpressureChangePromise && e2._backpressureChangePromise_resolve(), e2._backpressureChangePromise = u((t3) => {
    e2._backpressureChangePromise_resolve = t3;
  }), e2._backpressure = t2;
}
Object.defineProperties(TransformStream.prototype, { readable: { enumerable: true }, writable: { enumerable: true } }), "symbol" == typeof e.toStringTag && Object.defineProperty(TransformStream.prototype, e.toStringTag, { value: "TransformStream", configurable: true });
var TransformStreamDefaultController = class {
  constructor() {
    throw new TypeError("Illegal constructor");
  }
  get desiredSize() {
    if (!br(this)) throw mr("desiredSize");
    return vr(this._controlledTransformStream);
  }
  enqueue(e2) {
    if (!br(this)) throw mr("enqueue");
    _r(this, e2);
  }
  error(e2) {
    if (!br(this)) throw mr("error");
    var t2;
    t2 = e2, cr(this._controlledTransformStream, t2);
  }
  terminate() {
    if (!br(this)) throw mr("terminate");
    !function(e2) {
      const t2 = e2._controlledTransformStream;
      gr(t2) && wr(t2);
      const r2 = new TypeError("TransformStream terminated");
      dr(t2, r2);
    }(this);
  }
};
function br(e2) {
  return !!r(e2) && (!!Object.prototype.hasOwnProperty.call(e2, "_controlledTransformStream") && e2 instanceof TransformStreamDefaultController);
}
function hr(e2) {
  e2._transformAlgorithm = void 0, e2._flushAlgorithm = void 0;
}
function _r(e2, t2) {
  const r2 = e2._controlledTransformStream;
  if (!gr(r2)) throw new TypeError("Readable side is not in a state that permits enqueue");
  try {
    !function(e3, t3) {
      e3._readablePulling = false;
      try {
        e3._readableController.enqueue(t3);
      } catch (t4) {
        throw Sr(e3, t4), t4;
      }
    }(r2, t2);
  } catch (e3) {
    throw dr(r2, e3), r2._readableStoredError;
  }
  const o2 = function(e3) {
    return !function(e4) {
      if (!gr(e4)) return false;
      if (e4._readablePulling) return true;
      if (vr(e4) > 0) return true;
      return false;
    }(e3);
  }(r2);
  o2 !== r2._backpressure && fr(r2, true);
}
function pr(e2, t2) {
  return p(e2._transformAlgorithm(t2), void 0, (t3) => {
    throw cr(e2._controlledTransformStream, t3), t3;
  });
}
function mr(e2) {
  return new TypeError(`TransformStreamDefaultController.prototype.${e2} can only be used on a TransformStreamDefaultController`);
}
function yr(e2) {
  return new TypeError(`TransformStream.prototype.${e2} can only be used on a TransformStream`);
}
function gr(e2) {
  return !e2._readableCloseRequested && "readable" === e2._readableState;
}
function wr(e2) {
  e2._readableState = "closed", e2._readableCloseRequested = true, e2._readableController.close();
}
function Sr(e2, t2) {
  "readable" === e2._readableState && (e2._readableState = "errored", e2._readableStoredError = t2), e2._readableController.error(t2);
}
function vr(e2) {
  return e2._readableController.desiredSize;
}
function Rr(e2, t2) {
  "writable" !== e2._writableState ? qr(e2) : Tr(e2, t2);
}
function Tr(e2, t2) {
  e2._writableState = "erroring", e2._writableStoredError = t2, !function(e3) {
    return e3._writableHasInFlightOperation;
  }(e2) && e2._writableStarted && qr(e2);
}
function qr(e2) {
  e2._writableState = "errored";
}
function Cr(e2) {
  "erroring" === e2._writableState && qr(e2);
}
Object.defineProperties(TransformStreamDefaultController.prototype, { enqueue: { enumerable: true }, error: { enumerable: true }, terminate: { enumerable: true }, desiredSize: { enumerable: true } }), n(TransformStreamDefaultController.prototype.enqueue, "enqueue"), n(TransformStreamDefaultController.prototype.error, "error"), n(TransformStreamDefaultController.prototype.terminate, "terminate"), "symbol" == typeof e.toStringTag && Object.defineProperty(TransformStreamDefaultController.prototype, e.toStringTag, { value: "TransformStreamDefaultController", configurable: true });

// ../../node_modules/formdata-node/lib/esm/isFunction.js
var isFunction = (value) => typeof value === "function";

// ../../node_modules/formdata-node/lib/esm/blobHelpers.js
var CHUNK_SIZE = 65536;
async function* clonePart(part) {
  const end = part.byteOffset + part.byteLength;
  let position = part.byteOffset;
  while (position !== end) {
    const size = Math.min(end - position, CHUNK_SIZE);
    const chunk = part.buffer.slice(position, position + size);
    position += chunk.byteLength;
    yield new Uint8Array(chunk);
  }
}
async function* consumeNodeBlob(blob) {
  let position = 0;
  while (position !== blob.size) {
    const chunk = blob.slice(position, Math.min(blob.size, position + CHUNK_SIZE));
    const buffer = await chunk.arrayBuffer();
    position += buffer.byteLength;
    yield new Uint8Array(buffer);
  }
}
async function* consumeBlobParts(parts, clone = false) {
  for (const part of parts) {
    if (ArrayBuffer.isView(part)) {
      if (clone) {
        yield* clonePart(part);
      } else {
        yield part;
      }
    } else if (isFunction(part.stream)) {
      yield* part.stream();
    } else {
      yield* consumeNodeBlob(part);
    }
  }
}
function* sliceBlob(blobParts, blobSize, start = 0, end) {
  end !== null && end !== void 0 ? end : end = blobSize;
  let relativeStart = start < 0 ? Math.max(blobSize + start, 0) : Math.min(start, blobSize);
  let relativeEnd = end < 0 ? Math.max(blobSize + end, 0) : Math.min(end, blobSize);
  const span = Math.max(relativeEnd - relativeStart, 0);
  let added = 0;
  for (const part of blobParts) {
    if (added >= span) {
      break;
    }
    const partSize = ArrayBuffer.isView(part) ? part.byteLength : part.size;
    if (relativeStart && partSize <= relativeStart) {
      relativeStart -= partSize;
      relativeEnd -= partSize;
    } else {
      let chunk;
      if (ArrayBuffer.isView(part)) {
        chunk = part.subarray(relativeStart, Math.min(partSize, relativeEnd));
        added += chunk.byteLength;
      } else {
        chunk = part.slice(relativeStart, Math.min(partSize, relativeEnd));
        added += chunk.size;
      }
      relativeEnd -= partSize;
      relativeStart = 0;
      yield chunk;
    }
  }
}

// ../../node_modules/formdata-node/lib/esm/Blob.js
var __classPrivateFieldGet = function(receiver, state, kind, f2) {
  if (kind === "a" && !f2) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f2 : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f2 : kind === "a" ? f2.call(receiver) : f2 ? f2.value : state.get(receiver);
};
var __classPrivateFieldSet = function(receiver, state, value, kind, f2) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f2) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f2 : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f2.call(receiver, value) : f2 ? f2.value = value : state.set(receiver, value), value;
};
var _Blob_parts;
var _Blob_type;
var _Blob_size;
var Blob2 = class _Blob {
  constructor(blobParts = [], options = {}) {
    _Blob_parts.set(this, []);
    _Blob_type.set(this, "");
    _Blob_size.set(this, 0);
    options !== null && options !== void 0 ? options : options = {};
    if (typeof blobParts !== "object" || blobParts === null) {
      throw new TypeError("Failed to construct 'Blob': The provided value cannot be converted to a sequence.");
    }
    if (!isFunction(blobParts[Symbol.iterator])) {
      throw new TypeError("Failed to construct 'Blob': The object must have a callable @@iterator property.");
    }
    if (typeof options !== "object" && !isFunction(options)) {
      throw new TypeError("Failed to construct 'Blob': parameter 2 cannot convert to dictionary.");
    }
    const encoder = new TextEncoder();
    for (const raw of blobParts) {
      let part;
      if (ArrayBuffer.isView(raw)) {
        part = new Uint8Array(raw.buffer.slice(raw.byteOffset, raw.byteOffset + raw.byteLength));
      } else if (raw instanceof ArrayBuffer) {
        part = new Uint8Array(raw.slice(0));
      } else if (raw instanceof _Blob) {
        part = raw;
      } else {
        part = encoder.encode(String(raw));
      }
      __classPrivateFieldSet(this, _Blob_size, __classPrivateFieldGet(this, _Blob_size, "f") + (ArrayBuffer.isView(part) ? part.byteLength : part.size), "f");
      __classPrivateFieldGet(this, _Blob_parts, "f").push(part);
    }
    const type = options.type === void 0 ? "" : String(options.type);
    __classPrivateFieldSet(this, _Blob_type, /^[\x20-\x7E]*$/.test(type) ? type : "", "f");
  }
  static [(_Blob_parts = /* @__PURE__ */ new WeakMap(), _Blob_type = /* @__PURE__ */ new WeakMap(), _Blob_size = /* @__PURE__ */ new WeakMap(), Symbol.hasInstance)](value) {
    return Boolean(value && typeof value === "object" && isFunction(value.constructor) && (isFunction(value.stream) || isFunction(value.arrayBuffer)) && /^(Blob|File)$/.test(value[Symbol.toStringTag]));
  }
  get type() {
    return __classPrivateFieldGet(this, _Blob_type, "f");
  }
  get size() {
    return __classPrivateFieldGet(this, _Blob_size, "f");
  }
  slice(start, end, contentType) {
    return new _Blob(sliceBlob(__classPrivateFieldGet(this, _Blob_parts, "f"), this.size, start, end), {
      type: contentType
    });
  }
  async text() {
    const decoder = new TextDecoder();
    let result = "";
    for await (const chunk of consumeBlobParts(__classPrivateFieldGet(this, _Blob_parts, "f"))) {
      result += decoder.decode(chunk, { stream: true });
    }
    result += decoder.decode();
    return result;
  }
  async arrayBuffer() {
    const view = new Uint8Array(this.size);
    let offset = 0;
    for await (const chunk of consumeBlobParts(__classPrivateFieldGet(this, _Blob_parts, "f"))) {
      view.set(chunk, offset);
      offset += chunk.length;
    }
    return view.buffer;
  }
  stream() {
    const iterator = consumeBlobParts(__classPrivateFieldGet(this, _Blob_parts, "f"), true);
    return new ReadableStream2({
      async pull(controller) {
        const { value, done } = await iterator.next();
        if (done) {
          return queueMicrotask(() => controller.close());
        }
        controller.enqueue(value);
      },
      async cancel() {
        await iterator.return();
      }
    });
  }
  get [Symbol.toStringTag]() {
    return "Blob";
  }
};
Object.defineProperties(Blob2.prototype, {
  type: { enumerable: true },
  size: { enumerable: true },
  slice: { enumerable: true },
  stream: { enumerable: true },
  text: { enumerable: true },
  arrayBuffer: { enumerable: true }
});

// ../../node_modules/formdata-node/lib/esm/File.js
var __classPrivateFieldSet2 = function(receiver, state, value, kind, f2) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f2) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f2 : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f2.call(receiver, value) : f2 ? f2.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet2 = function(receiver, state, kind, f2) {
  if (kind === "a" && !f2) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f2 : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f2 : kind === "a" ? f2.call(receiver) : f2 ? f2.value : state.get(receiver);
};
var _File_name;
var _File_lastModified;
var File = class extends Blob2 {
  constructor(fileBits, name, options = {}) {
    super(fileBits, options);
    _File_name.set(this, void 0);
    _File_lastModified.set(this, 0);
    if (arguments.length < 2) {
      throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`);
    }
    __classPrivateFieldSet2(this, _File_name, String(name), "f");
    const lastModified = options.lastModified === void 0 ? Date.now() : Number(options.lastModified);
    if (!Number.isNaN(lastModified)) {
      __classPrivateFieldSet2(this, _File_lastModified, lastModified, "f");
    }
  }
  static [(_File_name = /* @__PURE__ */ new WeakMap(), _File_lastModified = /* @__PURE__ */ new WeakMap(), Symbol.hasInstance)](value) {
    return value instanceof Blob2 && value[Symbol.toStringTag] === "File" && typeof value.name === "string";
  }
  get name() {
    return __classPrivateFieldGet2(this, _File_name, "f");
  }
  get lastModified() {
    return __classPrivateFieldGet2(this, _File_lastModified, "f");
  }
  get webkitRelativePath() {
    return "";
  }
  get [Symbol.toStringTag]() {
    return "File";
  }
};

// ../../node_modules/formdata-node/lib/esm/isFile.js
var isFile = (value) => value instanceof File;

// ../../node_modules/formdata-node/lib/esm/isBlob.js
var isBlob = (value) => value instanceof Blob2;

// ../../node_modules/formdata-node/lib/esm/deprecateConstructorEntries.js
import { deprecate } from "util";
var deprecateConstructorEntries = deprecate(() => {
}, 'Constructor "entries" argument is not spec-compliant and will be removed in next major release.');

// ../../node_modules/formdata-node/lib/esm/FormData.js
var __classPrivateFieldGet3 = function(receiver, state, kind, f2) {
  if (kind === "a" && !f2) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f2 : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f2 : kind === "a" ? f2.call(receiver) : f2 ? f2.value : state.get(receiver);
};
var _FormData_instances;
var _FormData_entries;
var _FormData_setEntry;
var FormData2 = class {
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
    __classPrivateFieldGet3(this, _FormData_instances, "m", _FormData_setEntry).call(this, {
      name,
      fileName,
      append: true,
      rawValue: value,
      argsLength: arguments.length
    });
  }
  set(name, value, fileName) {
    __classPrivateFieldGet3(this, _FormData_instances, "m", _FormData_setEntry).call(this, {
      name,
      fileName,
      append: false,
      rawValue: value,
      argsLength: arguments.length
    });
  }
  get(name) {
    const field = __classPrivateFieldGet3(this, _FormData_entries, "f").get(String(name));
    if (!field) {
      return null;
    }
    return field[0];
  }
  getAll(name) {
    const field = __classPrivateFieldGet3(this, _FormData_entries, "f").get(String(name));
    if (!field) {
      return [];
    }
    return field.slice();
  }
  has(name) {
    return __classPrivateFieldGet3(this, _FormData_entries, "f").has(String(name));
  }
  delete(name) {
    __classPrivateFieldGet3(this, _FormData_entries, "f").delete(String(name));
  }
  *keys() {
    for (const key of __classPrivateFieldGet3(this, _FormData_entries, "f").keys()) {
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
    const values = __classPrivateFieldGet3(this, _FormData_entries, "f").get(name);
    if (!values) {
      return void __classPrivateFieldGet3(this, _FormData_entries, "f").set(name, [value]);
    }
    if (!append) {
      return void __classPrivateFieldGet3(this, _FormData_entries, "f").set(name, [value]);
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
import fs from "fs";
import { nodewhisper } from "nodejs-whisper";
import OpenAI from "openai";
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
  Object.keys(options).forEach((i2) => {
    if (Array.isArray(options[i2])) {
      const arrayParams = options[i2];
      arrayParams.forEach((param) => {
        searchParams.append(i2, String(param));
      });
    } else {
      searchParams.append(i2, String(options[i2]));
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
  var _a, _b, _c, _d, _e2, _f;
  const newOptions = {};
  if (optionsArg._experimentalCustomFetch) {
    newOptions.global = {
      fetch: {
        client: optionsArg._experimentalCustomFetch
      }
    };
  }
  optionsArg = (0, import_deepmerge.default)(optionsArg, newOptions);
  if ((_a = optionsArg.restProxy) === null || _a === void 0 ? void 0 : _a.url) {
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
          headers: (_e2 = optionsArg.global) === null || _e2 === void 0 ? void 0 : _e2.headers
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
    const defaults = applyDefaults(this.options[this.namespace], this.options.global);
    return Object.assign(Object.assign({}, defaults), { key: this.key });
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
    endpoint = endpoint.replace(/:(\w+)/g, function(_2, key) {
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
  log(kind, msg, data) {
    this.logger(kind, msg, data);
  }
};

// ../../node_modules/@deepgram/sdk/dist/module/packages/AbstractLiveClient.js
var __awaiter = function(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
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
      import("./wrapper-IANJ3KLP.js").then(({ default: WS }) => {
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
    import("./wrapper-IANJ3KLP.js").then(({ default: WS }) => {
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
    var _a, _b;
    return (_b = (_a = this.conn) === null || _a === void 0 ? void 0 : _a.readyState) !== null && _b !== void 0 ? _b : SOCKET_STATES.closed;
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
      var _a;
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
      (_a = this.conn) === null || _a === void 0 ? void 0 : _a.send(data);
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
    var _a;
    return this.key === "proxy" && !!((_a = this.namespaceOptions.websocket.options.proxy) === null || _a === void 0 ? void 0 : _a.url);
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
var __awaiter2 = function(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
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
  const fetch2 = resolveFetch(customFetch);
  const HeadersConstructor = resolveHeadersConstructor();
  return (input, init) => __awaiter2(void 0, void 0, void 0, function* () {
    const headers = new HeadersConstructor(init === null || init === void 0 ? void 0 : init.headers);
    if (!headers.has("Authorization")) {
      headers.set("Authorization", `Token ${apiKey}`);
    }
    return fetch2(input, Object.assign(Object.assign({}, init), { headers }));
  });
};
var resolveResponse = () => __awaiter2(void 0, void 0, void 0, function* () {
  if (typeof Response === "undefined") {
    return (yield import("./node-ponyfill-SD3BQ5BM.js")).Response;
  }
  return Response;
});

// ../../node_modules/@deepgram/sdk/dist/module/packages/AbstractRestClient.js
var import_deepmerge2 = __toESM(require_cjs());
var __awaiter3 = function(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
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
    var _a;
    return this.key === "proxy" && !!((_a = this.namespaceOptions.fetch.options.proxy) === null || _a === void 0 ? void 0 : _a.url);
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
  configure(config2) {
    this.send(JSON.stringify({
      type: "Configure",
      processors: config2
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
var __awaiter4 = function(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
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
var __awaiter5 = function(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
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
var __awaiter6 = function(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
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
var __awaiter7 = function(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
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
var __awaiter8 = function(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
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
var __awaiter9 = function(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
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
var __dirname = path.dirname(__filename);
var execAsync = promisify(exec);
var TranscriptionService = class extends Service3 {
  runtime = null;
  static serviceType = ServiceType3.TRANSCRIPTION;
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
        this.openai = new OpenAI({ apiKey: openaiKey });
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
                this.openai = new OpenAI({ apiKey: openaiKey });
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
          this.openai = new OpenAI({ apiKey: openaiKey });
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
    const rootDir = path.resolve(__dirname, "../../");
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
        elizaLogger3.log(
          "CUDA detected. Transcription will use CUDA acceleration."
        );
      } catch (_error) {
        elizaLogger3.log(
          "CUDA not detected. Transcription will run on CPU."
        );
      }
    } else if (platform === "win32") {
      const cudaPath = path.join(
        settings2.CUDA_PATH || "C:\\Program Files\\NVIDIA GPU Computing Toolkit\\CUDA\\v11.0",
        "bin",
        "nvcc.exe"
      );
      if (fs.existsSync(cudaPath)) {
        this.isCudaAvailable = true;
        elizaLogger3.log(
          "CUDA detected. Transcription will use CUDA acceleration."
        );
      } else {
        elizaLogger3.log(
          "CUDA not detected. Transcription will run on CPU."
        );
      }
    } else {
      elizaLogger3.log(
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
      elizaLogger3.log("Input audio info:", stream);
      let ffmpegCommand = `ffmpeg -i "${inputPath}" -ar ${this.TARGET_SAMPLE_RATE} -ac 1`;
      if (stream.codec_name === "pcm_f32le") {
        ffmpegCommand += " -acodec pcm_s16le";
      }
      ffmpegCommand += ` "${outputPath}"`;
      elizaLogger3.log("FFmpeg command:", ffmpegCommand);
      await execAsync(ffmpegCommand);
      const convertedBuffer = fs.readFileSync(outputPath);
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
      return convertedBuffer;
    } catch (error) {
      elizaLogger3.error("Error converting audio:", error);
      throw error;
    }
  }
  async saveDebugAudio(audioBuffer, prefix) {
    this.ensureDebugDirectoryExists();
    const filename = `${prefix}_${Date.now()}.wav`;
    const filePath = path.join(this.DEBUG_AUDIO_DIR, filename);
    fs.writeFileSync(filePath, Buffer.from(audioBuffer));
    elizaLogger3.log(`Debug audio saved: ${filePath}`);
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
    elizaLogger3.log("Transcribing audio with OpenAI...");
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
      elizaLogger3.log(`OpenAI speech to text result: "${trimmedResult}"`);
      return trimmedResult;
    } catch (error) {
      elizaLogger3.error(
        "Error in OpenAI speech-to-text conversion:",
        error
      );
      if (error.response) {
        elizaLogger3.error("Response data:", error.response.data);
        elizaLogger3.error("Response status:", error.response.status);
        elizaLogger3.error("Response headers:", error.response.headers);
      } else if (error.request) {
        elizaLogger3.error("No response received:", error.request);
      } else {
        elizaLogger3.error("Error setting up request:", error.message);
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
      elizaLogger3.log("Transcribing audio locally...");
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
      elizaLogger3.debug(`Temporary WAV file created: ${tempWavFile}`);
      let output = await nodewhisper(tempWavFile, {
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
        elizaLogger3.log("Output is null or too short, returning null");
        return null;
      }
      return output;
    } catch (error) {
      elizaLogger3.error(
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
  ModelClass as ModelClass2,
  elizaLogger as elizaLogger4,
  ServiceType as ServiceType4
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
import { z as z3 } from "zod";
var FileLocationResultSchema = z3.object({
  fileLocation: z3.string().min(1)
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
      modelClass: ModelClass2.SMALL,
      schema: FileLocationResultSchema,
      stop: ["\n"]
    });
    if (!isFileLocationResult(fileLocationResultObject?.object)) {
      elizaLogger4.error("Failed to generate file location");
      return false;
    }
    const { fileLocation } = fileLocationResultObject.object;
    const { description } = await runtime.getService(ServiceType4.IMAGE_DESCRIPTION).describeImage(fileLocation);
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
dotenv.config();
function createNodePlugin() {
  return {
    name: "default",
    description: "Default plugin, with basic actions and evaluators",
    services: [
      new BrowserService(),
      new SpeechService(),
      new TranscriptionService()
    ],
    actions: [describeImage]
  };
}
export {
  BrowserService,
  SpeechService,
  TranscriptionService,
  createNodePlugin
};
/*! Bundled license information:

mime-db/index.js:
  (*!
   * mime-db
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2015-2022 Douglas Christopher Wilson
   * MIT Licensed
   *)

mime-types/index.js:
  (*!
   * mime-types
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)

web-streams-polyfill/dist/ponyfill.mjs:
  (**
   * @license
   * web-streams-polyfill v4.0.0-beta.3
   * Copyright 2021 Mattias Buelens, Diwank Singh Tomer and other contributors.
   * This code is released under the MIT license.
   * SPDX-License-Identifier: MIT
   *)

formdata-node/lib/esm/blobHelpers.js:
  (*! Based on fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> & David Frank *)

formdata-node/lib/esm/Blob.js:
  (*! Based on fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> & David Frank *)
*/
//# sourceMappingURL=index.js.map