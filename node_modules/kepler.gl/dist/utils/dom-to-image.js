"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _window = _interopRequireDefault(require("global/window"));

var _document = _interopRequireDefault(require("global/document"));

var _console = _interopRequireDefault(require("global/console"));

var _miniSvgDataUri = _interopRequireDefault(require("mini-svg-data-uri"));

var _userFeedbacks = require("../constants/user-feedbacks");

var _domUtils = require("./dom-utils");

// Copyright (c) 2020 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

/**
 * This file is copied from https://github.com/tsayen/dom-to-image
 * Modified by heshan0131 to allow loading external stylesheets and inline webfonts
 */
var inliner = newInliner();
var fontFaces = newFontFaces();
var images = newImages(); // Default impl options

var defaultOptions = {
  // Default is to fail on error, no placeholder
  imagePlaceholder: undefined,
  // Default cache bust is false, it will use the cache
  cacheBust: false
};
var domtoimage = {
  toSvg: toSvg,
  toPng: toPng,
  toJpeg: toJpeg,
  toBlob: toBlob,
  toPixelData: toPixelData,
  impl: {
    fontFaces: fontFaces,
    images: images,
    inliner: inliner,
    options: {}
  }
};
/**
   * @param {Node} node - The DOM Node object to render
   * @param {Object} options - Rendering options
   * @param {Function} options.filter - Should return true if passed node should be included in the output
   *          (excluding node means excluding it's children as well). Not called on the root node.
   * @param {String} options.bgcolor - color for the background, any valid CSS color value.
   * @param {Number} options.width - width to be applied to node before rendering.
   * @param {Number} options.height - height to be applied to node before rendering.
   * @param {Object} options.style - an object whose properties to be copied to node's style before rendering.
   * @param {Number} options.quality - a Number between 0 and 1 indicating image quality (applicable to JPEG only),
              defaults to 1.0.
    * @param {String} options.imagePlaceholder - dataURL to use as a placeholder for failed images, default behaviour is to fail fast on images we can't fetch
    * @param {Boolean} options.cacheBust - set to true to cache bust by appending the time to the request url
    * @return {Promise} - A promise that is fulfilled with a SVG image data URL
    * */

function toSvg(node, options) {
  options = options || {};
  copyOptions(options);
  return Promise.resolve(node).then(function (nd) {
    return cloneNode(nd, options.filter, true);
  }).then(embedFonts).then(inlineImages).then(applyOptions).then(function (clone) {
    return makeSvgDataUri(clone, options.width || (0, _domUtils.getWidth)(node), options.height || (0, _domUtils.getHeight)(node));
  });

  function applyOptions(clone) {
    if (options.bgcolor) clone.style.backgroundColor = options.bgcolor;
    if (options.width) clone.style.width = "".concat(options.width, "px");
    if (options.height) clone.style.height = "".concat(options.height, "px");
    if (options.style) Object.keys(options.style).forEach(function (property) {
      clone.style[property] = options.style[property];
    });
    return clone;
  }
}
/**
 * @param {Node} node - The DOM Node object to render
 * @param {Object} options - Rendering options, @see {@link toSvg}
 * @return {Promise} - A promise that is fulfilled with a Uint8Array containing RGBA pixel data.
 * */


function toPixelData(node, options) {
  return draw(node, options || {}).then(function (canvas) {
    return canvas.getContext('2d').getImageData(0, 0, (0, _domUtils.getWidth)(node), (0, _domUtils.getHeight)(node)).data;
  });
}
/**
 * @param {Node} node - The DOM Node object to render
 * @param {Object} options - Rendering options, @see {@link toSvg}
 * @return {Promise} - A promise that is fulfilled with a PNG image data URL
 * */


function toPng(node, options) {
  return draw(node, options || {}).then(function (canvas) {
    return canvas.toDataURL();
  });
}
/**
 * @param {Node} node - The DOM Node object to render
 * @param {Object} options - Rendering options, @see {@link toSvg}
 * @return {Promise} - A promise that is fulfilled with a JPEG image data URL
 * */


function toJpeg(node, options) {
  options = options || {};
  return draw(node, options).then(function (canvas) {
    return canvas.toDataURL('image/jpeg', options.quality || 1.0);
  });
}
/**
 * @param {Node} node - The DOM Node object to render
 * @param {Object} options - Rendering options, @see {@link toSvg}
 * @return {Promise} - A promise that is fulfilled with a PNG image blob
 * */


function toBlob(node, options) {
  return draw(node, options || {}).then(_domUtils.canvasToBlob);
}

function copyOptions(options) {
  // Copy options to impl options for use in impl
  if (typeof options.imagePlaceholder === 'undefined') {
    domtoimage.impl.options.imagePlaceholder = defaultOptions.imagePlaceholder;
  } else {
    domtoimage.impl.options.imagePlaceholder = options.imagePlaceholder;
  }

  if (typeof options.cacheBust === 'undefined') {
    domtoimage.impl.options.cacheBust = defaultOptions.cacheBust;
  } else {
    domtoimage.impl.options.cacheBust = options.cacheBust;
  }
}

function draw(domNode, options) {
  return toSvg(domNode, options).then(_domUtils.makeImage).then((0, _domUtils.delay)(100)).then(function (image) {
    var canvas = newCanvas(domNode);
    canvas.getContext('2d').drawImage(image, 0, 0);
    return canvas;
  });

  function newCanvas(dNode) {
    var canvas = _document["default"].createElement('canvas');

    canvas.width = options.width || (0, _domUtils.getWidth)(dNode);
    canvas.height = options.height || (0, _domUtils.getHeight)(dNode);

    if (options.bgcolor) {
      var ctx = canvas.getContext('2d');
      ctx.fillStyle = options.bgcolor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    return canvas;
  }
}

function cloneNode(node, filter, root) {
  if (!root && filter && !filter(node)) {
    return Promise.resolve();
  }

  return Promise.resolve(node).then(makeNodeCopy).then(function (clone) {
    return cloneChildren(node, clone, filter);
  }).then(function (clone) {
    return (0, _domUtils.processClone)(node, clone);
  });

  function makeNodeCopy(nd) {
    if (nd instanceof _window["default"].HTMLCanvasElement) {
      return (0, _domUtils.makeImage)(nd.toDataURL());
    }

    return nd.cloneNode(false);
  }

  function cloneChildrenInOrder(parent, arrChildren, flt) {
    var done = Promise.resolve();
    arrChildren.forEach(function (child) {
      done = done.then(function () {
        return cloneNode(child, flt);
      }).then(function (childClone) {
        if (childClone) {
          parent.appendChild(childClone);
        }
      });
    });
    return done;
  }

  function cloneChildren(original, clone, flt) {
    var children = original.childNodes;

    if (children.length === 0) {
      return Promise.resolve(clone);
    }

    return cloneChildrenInOrder(clone, (0, _domUtils.asArray)(children), flt).then(function () {
      return clone;
    });
  }
}

function embedFonts(node) {
  return fontFaces.resolveAll().then(function (cssText) {
    var styleNode = _document["default"].createElement('style');

    node.appendChild(styleNode);
    styleNode.appendChild(_document["default"].createTextNode(cssText));
    return node;
  });
}

function inlineImages(node) {
  return images.inlineAll(node).then(function () {
    return node;
  });
}

function makeSvgDataUri(node, width, height) {
  return Promise.resolve(node).then(function (nd) {
    nd.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
    var serializedString = new _window["default"].XMLSerializer().serializeToString(nd);
    var xhtml = (0, _domUtils.escapeXhtml)(serializedString);
    var foreignObject = "<foreignObject x=\"0\" y=\"0\" width=\"100%\" height=\"100%\">".concat(xhtml, "</foreignObject>");
    var svgStr = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"".concat(width, "\" height=\"").concat(height, "\">").concat(foreignObject, "</svg>"); // Optimizing SVGs in data URIs
    // see https://codepen.io/tigt/post/optimizing-svgs-in-data-uris
    // the best way of encoding SVG in a data: URI is data:image/svg+xml,[actual data].
    // We don’t need the ;charset=utf-8 parameter because the given SVG is ASCII.

    return (0, _miniSvgDataUri["default"])(svgStr);
  });
}

function newInliner() {
  var URL_REGEX = /url\(['"]?([^'"]+?)['"]?\)/g;
  return {
    inlineAll: inlineAll,
    shouldProcess: shouldProcess,
    impl: {
      readUrls: readUrls,
      inline: inline
    }
  };

  function shouldProcess(string) {
    return string.search(URL_REGEX) !== -1;
  }

  function readUrls(string) {
    var result = [];
    var match;

    while ((match = URL_REGEX.exec(string)) !== null) {
      result.push(match[1]);
    }

    return result.filter(function (url) {
      return !(0, _domUtils.isDataUrl)(url);
    });
  }

  function urlAsRegex(url0) {
    return new RegExp("(url\\(['\"]?)(".concat((0, _domUtils.escape)(url0), ")(['\"]?\\))"), 'g');
  }

  function inline(string, url, baseUrl, get) {
    return Promise.resolve(url).then(function (ul) {
      return baseUrl ? (0, _domUtils.resolveUrl)(ul, baseUrl) : ul;
    }).then(function (ul) {
      return typeof get === 'function' ? get(ul) : (0, _domUtils.getAndEncode)(ul, domtoimage.impl.options);
    }).then(function (data) {
      return (0, _domUtils.dataAsUrl)(data, (0, _domUtils.mimeType)(url));
    }).then(function (dataUrl) {
      return string.replace(urlAsRegex(url), "$1".concat(dataUrl, "$3"));
    });
  }

  function inlineAll(string, baseUrl, get) {
    if (!shouldProcess(string) || (0, _domUtils.isSrcAsDataUrl)(string)) {
      return Promise.resolve(string);
    }

    return Promise.resolve(string).then(readUrls).then(function (urls) {
      var done = Promise.resolve(string);
      urls.forEach(function (url) {
        done = done.then(function (str) {
          return inline(str, url, baseUrl, get);
        });
      });
      return done;
    });
  }
}

function newFontFaces() {
  return {
    resolveAll: resolveAll,
    impl: {
      readAll: readAll
    }
  };

  function resolveAll() {
    return readAll(_document["default"]).then(function (webFonts) {
      return Promise.all(webFonts.map(function (webFont) {
        return webFont.resolve();
      }));
    }).then(function (cssStrings) {
      return cssStrings.join('\n');
    });
  }

  function readAll() {
    return Promise.resolve((0, _domUtils.asArray)(_document["default"].styleSheets)).then(loadExternalStyleSheets).then(getCssRules).then(selectWebFontRules).then(function (rules) {
      return rules.map(newWebFont);
    });

    function selectWebFontRules(cssRules) {
      return cssRules.filter(function (rule) {
        return rule.type === _window["default"].CSSRule.FONT_FACE_RULE;
      }).filter(function (rule) {
        return inliner.shouldProcess(rule.style.getPropertyValue('src'));
      });
    }

    function loadExternalStyleSheets(styleSheets) {
      return Promise.all(styleSheets.map(function (sheet) {
        if (sheet.href) {
          // cloudfont doesn't have allow origin header properly set
          // error response will remain in cache
          var cache = sheet.href.includes('uber-fonts') ? 'no-cache' : 'default';
          return _window["default"].fetch(sheet.href, {
            credentials: 'omit',
            cache: cache
          }).then(function (response) {
            return response.text();
          }).then(setBaseHref(sheet.href)).then(toStyleSheet)["catch"](function (err) {
            // Handle any error that occurred in any of the previous
            // promises in the chain. stylesheet failed to load should not stop
            // the process, hence result in only a warning, instead of reject
            _console["default"].warn(_userFeedbacks.IMAGE_EXPORT_ERRORS.styleSheet, sheet.href);

            _console["default"].log(err);

            return;
          });
        }

        return Promise.resolve(sheet);
      }));

      function setBaseHref(base) {
        base = base.split('/');
        base.pop();
        base = base.join('/');

        function addBaseHrefToUrl(match, p1) {
          var url = /^http/i.test(p1) ? p1 : concatAndResolveUrl(base, p1);
          return "url('".concat(url, "')");
        } // Source: http://stackoverflow.com/a/2676231/3786856


        function concatAndResolveUrl(url, concat) {
          var url1 = url.split('/');
          var url2 = concat.split('/');
          var url3 = [];

          for (var i = 0, l = url1.length; i < l; i++) {
            if (url1[i] === '..') {
              url3.pop();
            } else if (url1[i] !== '.') {
              url3.push(url1[i]);
            }
          }

          for (var _i = 0, _l = url2.length; _i < _l; _i++) {
            if (url2[_i] === '..') {
              url3.pop();
            } else if (url2[_i] !== '.') {
              url3.push(url2[_i]);
            }
          }

          return url3.join('/');
        }

        return function (text) {
          return (0, _domUtils.isSrcAsDataUrl)(text) ? text : text.replace(/url\(['"]?([^'"]+?)['"]?\)/g, addBaseHrefToUrl);
        };
      }

      function toStyleSheet(text) {
        var doc = _document["default"].implementation.createHTMLDocument('');

        var styleElement = _document["default"].createElement('style');

        styleElement.textContent = text;
        doc.body.appendChild(styleElement);
        return styleElement.sheet;
      }
    }

    function getCssRules(styleSheets) {
      var cssRules = [];
      styleSheets.forEach(function (sheet) {
        // try...catch because browser may not able to enumerate rules for cross-domain sheets
        if (!sheet) {
          return;
        }

        var rules;

        try {
          rules = sheet.rules || sheet.cssRules;
        } catch (e) {
          _console["default"].log("'Can't read the css rules of: ".concat(sheet.href), e);

          return;
        }

        if (rules && (0, _typeof2["default"])(rules) === 'object') {
          try {
            (0, _domUtils.asArray)(rules || []).forEach(cssRules.push.bind(cssRules));
          } catch (e) {
            _console["default"].log("Error while reading CSS rules from ".concat(sheet.href), e);

            return;
          }
        } else {
          _console["default"].log('getCssRules can not find cssRules');

          return;
        }
      });
      return cssRules;
    }

    function newWebFont(webFontRule) {
      return {
        resolve: function resolve() {
          var baseUrl = (webFontRule.parentStyleSheet || {}).href;
          return inliner.inlineAll(webFontRule.cssText, baseUrl);
        },
        src: function src() {
          return webFontRule.style.getPropertyValue('src');
        }
      };
    }
  }
}

function newImages() {
  return {
    inlineAll: inlineAll,
    impl: {
      newImage: newImage
    }
  };

  function newImage(element) {
    function inline(get) {
      if (element.src) {
        return Promise.resolve();
      }

      return Promise.resolve(element.src).then(function (ul) {
        return typeof get === 'function' ? get(ul) : (0, _domUtils.getAndEncode)(ul, domtoimage.impl.options);
      }).then(function (data) {
        return (0, _domUtils.dataAsUrl)(data, (0, _domUtils.mimeType)(element.src));
      }).then(function (dataUrl) {
        return new Promise(function (resolve, reject) {
          element.onload = resolve;
          element.onerror = reject;
          element.src = dataUrl;
        });
      });
    }

    return {
      inline: inline
    };
  }

  function inlineAll(node) {
    if (!(node instanceof Element)) {
      return Promise.resolve(node);
    }

    return inlineBackground(node).then(function () {
      if (node instanceof HTMLImageElement) {
        return newImage(node).inline();
      }

      return Promise.all((0, _domUtils.asArray)(node.childNodes).map(function (child) {
        return inlineAll(child);
      }));
    });

    function inlineBackground(nd) {
      var background = nd.style.getPropertyValue('background');

      if (!background) {
        return Promise.resolve(nd);
      }

      return inliner.inlineAll(background).then(function (inlined) {
        nd.style.setProperty('background', inlined, nd.style.getPropertyPriority('background'));
      }).then(function () {
        return nd;
      });
    }
  }
}

var _default = domtoimage;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9kb20tdG8taW1hZ2UuanMiXSwibmFtZXMiOlsiaW5saW5lciIsIm5ld0lubGluZXIiLCJmb250RmFjZXMiLCJuZXdGb250RmFjZXMiLCJpbWFnZXMiLCJuZXdJbWFnZXMiLCJkZWZhdWx0T3B0aW9ucyIsImltYWdlUGxhY2Vob2xkZXIiLCJ1bmRlZmluZWQiLCJjYWNoZUJ1c3QiLCJkb210b2ltYWdlIiwidG9TdmciLCJ0b1BuZyIsInRvSnBlZyIsInRvQmxvYiIsInRvUGl4ZWxEYXRhIiwiaW1wbCIsIm9wdGlvbnMiLCJub2RlIiwiY29weU9wdGlvbnMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInRoZW4iLCJuZCIsImNsb25lTm9kZSIsImZpbHRlciIsImVtYmVkRm9udHMiLCJpbmxpbmVJbWFnZXMiLCJhcHBseU9wdGlvbnMiLCJjbG9uZSIsIm1ha2VTdmdEYXRhVXJpIiwid2lkdGgiLCJoZWlnaHQiLCJiZ2NvbG9yIiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsInByb3BlcnR5IiwiZHJhdyIsImNhbnZhcyIsImdldENvbnRleHQiLCJnZXRJbWFnZURhdGEiLCJkYXRhIiwidG9EYXRhVVJMIiwicXVhbGl0eSIsImNhbnZhc1RvQmxvYiIsImRvbU5vZGUiLCJtYWtlSW1hZ2UiLCJpbWFnZSIsIm5ld0NhbnZhcyIsImRyYXdJbWFnZSIsImROb2RlIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY3R4IiwiZmlsbFN0eWxlIiwiZmlsbFJlY3QiLCJyb290IiwibWFrZU5vZGVDb3B5IiwiY2xvbmVDaGlsZHJlbiIsIndpbmRvdyIsIkhUTUxDYW52YXNFbGVtZW50IiwiY2xvbmVDaGlsZHJlbkluT3JkZXIiLCJwYXJlbnQiLCJhcnJDaGlsZHJlbiIsImZsdCIsImRvbmUiLCJjaGlsZCIsImNoaWxkQ2xvbmUiLCJhcHBlbmRDaGlsZCIsIm9yaWdpbmFsIiwiY2hpbGRyZW4iLCJjaGlsZE5vZGVzIiwibGVuZ3RoIiwicmVzb2x2ZUFsbCIsImNzc1RleHQiLCJzdHlsZU5vZGUiLCJjcmVhdGVUZXh0Tm9kZSIsImlubGluZUFsbCIsInNldEF0dHJpYnV0ZSIsInNlcmlhbGl6ZWRTdHJpbmciLCJYTUxTZXJpYWxpemVyIiwic2VyaWFsaXplVG9TdHJpbmciLCJ4aHRtbCIsImZvcmVpZ25PYmplY3QiLCJzdmdTdHIiLCJVUkxfUkVHRVgiLCJzaG91bGRQcm9jZXNzIiwicmVhZFVybHMiLCJpbmxpbmUiLCJzdHJpbmciLCJzZWFyY2giLCJyZXN1bHQiLCJtYXRjaCIsImV4ZWMiLCJwdXNoIiwidXJsIiwidXJsQXNSZWdleCIsInVybDAiLCJSZWdFeHAiLCJiYXNlVXJsIiwiZ2V0IiwidWwiLCJkYXRhVXJsIiwicmVwbGFjZSIsInVybHMiLCJzdHIiLCJyZWFkQWxsIiwid2ViRm9udHMiLCJhbGwiLCJtYXAiLCJ3ZWJGb250IiwiY3NzU3RyaW5ncyIsImpvaW4iLCJzdHlsZVNoZWV0cyIsImxvYWRFeHRlcm5hbFN0eWxlU2hlZXRzIiwiZ2V0Q3NzUnVsZXMiLCJzZWxlY3RXZWJGb250UnVsZXMiLCJydWxlcyIsIm5ld1dlYkZvbnQiLCJjc3NSdWxlcyIsInJ1bGUiLCJ0eXBlIiwiQ1NTUnVsZSIsIkZPTlRfRkFDRV9SVUxFIiwiZ2V0UHJvcGVydHlWYWx1ZSIsInNoZWV0IiwiaHJlZiIsImNhY2hlIiwiaW5jbHVkZXMiLCJmZXRjaCIsImNyZWRlbnRpYWxzIiwicmVzcG9uc2UiLCJ0ZXh0Iiwic2V0QmFzZUhyZWYiLCJ0b1N0eWxlU2hlZXQiLCJlcnIiLCJjb25zb2xlIiwid2FybiIsIklNQUdFX0VYUE9SVF9FUlJPUlMiLCJzdHlsZVNoZWV0IiwibG9nIiwiYmFzZSIsInNwbGl0IiwicG9wIiwiYWRkQmFzZUhyZWZUb1VybCIsInAxIiwidGVzdCIsImNvbmNhdEFuZFJlc29sdmVVcmwiLCJjb25jYXQiLCJ1cmwxIiwidXJsMiIsInVybDMiLCJpIiwibCIsImRvYyIsImltcGxlbWVudGF0aW9uIiwiY3JlYXRlSFRNTERvY3VtZW50Iiwic3R5bGVFbGVtZW50IiwidGV4dENvbnRlbnQiLCJib2R5IiwiZSIsImJpbmQiLCJ3ZWJGb250UnVsZSIsInBhcmVudFN0eWxlU2hlZXQiLCJzcmMiLCJuZXdJbWFnZSIsImVsZW1lbnQiLCJyZWplY3QiLCJvbmxvYWQiLCJvbmVycm9yIiwiRWxlbWVudCIsImlubGluZUJhY2tncm91bmQiLCJIVE1MSW1hZ2VFbGVtZW50IiwiYmFja2dyb3VuZCIsImlubGluZWQiLCJzZXRQcm9wZXJ0eSIsImdldFByb3BlcnR5UHJpb3JpdHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBeUJBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQTlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7OztBQTRCQSxJQUFNQSxPQUFPLEdBQUdDLFVBQVUsRUFBMUI7QUFDQSxJQUFNQyxTQUFTLEdBQUdDLFlBQVksRUFBOUI7QUFDQSxJQUFNQyxNQUFNLEdBQUdDLFNBQVMsRUFBeEIsQyxDQUNBOztBQUNBLElBQU1DLGNBQWMsR0FBRztBQUNyQjtBQUNBQyxFQUFBQSxnQkFBZ0IsRUFBRUMsU0FGRztBQUdyQjtBQUNBQyxFQUFBQSxTQUFTLEVBQUU7QUFKVSxDQUF2QjtBQU9BLElBQU1DLFVBQVUsR0FBRztBQUNqQkMsRUFBQUEsS0FBSyxFQUFMQSxLQURpQjtBQUVqQkMsRUFBQUEsS0FBSyxFQUFMQSxLQUZpQjtBQUdqQkMsRUFBQUEsTUFBTSxFQUFOQSxNQUhpQjtBQUlqQkMsRUFBQUEsTUFBTSxFQUFOQSxNQUppQjtBQUtqQkMsRUFBQUEsV0FBVyxFQUFYQSxXQUxpQjtBQU1qQkMsRUFBQUEsSUFBSSxFQUFFO0FBQ0pkLElBQUFBLFNBQVMsRUFBVEEsU0FESTtBQUVKRSxJQUFBQSxNQUFNLEVBQU5BLE1BRkk7QUFHSkosSUFBQUEsT0FBTyxFQUFQQSxPQUhJO0FBSUppQixJQUFBQSxPQUFPLEVBQUU7QUFKTDtBQU5XLENBQW5CO0FBY0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlQSxTQUFTTixLQUFULENBQWVPLElBQWYsRUFBcUJELE9BQXJCLEVBQThCO0FBQzVCQSxFQUFBQSxPQUFPLEdBQUdBLE9BQU8sSUFBSSxFQUFyQjtBQUNBRSxFQUFBQSxXQUFXLENBQUNGLE9BQUQsQ0FBWDtBQUNBLFNBQU9HLE9BQU8sQ0FBQ0MsT0FBUixDQUFnQkgsSUFBaEIsRUFDSkksSUFESSxDQUNDLFVBQUFDLEVBQUU7QUFBQSxXQUFJQyxTQUFTLENBQUNELEVBQUQsRUFBS04sT0FBTyxDQUFDUSxNQUFiLEVBQXFCLElBQXJCLENBQWI7QUFBQSxHQURILEVBRUpILElBRkksQ0FFQ0ksVUFGRCxFQUdKSixJQUhJLENBR0NLLFlBSEQsRUFJSkwsSUFKSSxDQUlDTSxZQUpELEVBS0pOLElBTEksQ0FLQyxVQUFBTyxLQUFLO0FBQUEsV0FDVEMsY0FBYyxDQUFDRCxLQUFELEVBQVFaLE9BQU8sQ0FBQ2MsS0FBUixJQUFpQix3QkFBU2IsSUFBVCxDQUF6QixFQUF5Q0QsT0FBTyxDQUFDZSxNQUFSLElBQWtCLHlCQUFVZCxJQUFWLENBQTNELENBREw7QUFBQSxHQUxOLENBQVA7O0FBU0EsV0FBU1UsWUFBVCxDQUFzQkMsS0FBdEIsRUFBNkI7QUFDM0IsUUFBSVosT0FBTyxDQUFDZ0IsT0FBWixFQUFxQkosS0FBSyxDQUFDSyxLQUFOLENBQVlDLGVBQVosR0FBOEJsQixPQUFPLENBQUNnQixPQUF0QztBQUVyQixRQUFJaEIsT0FBTyxDQUFDYyxLQUFaLEVBQW1CRixLQUFLLENBQUNLLEtBQU4sQ0FBWUgsS0FBWixhQUF1QmQsT0FBTyxDQUFDYyxLQUEvQjtBQUNuQixRQUFJZCxPQUFPLENBQUNlLE1BQVosRUFBb0JILEtBQUssQ0FBQ0ssS0FBTixDQUFZRixNQUFaLGFBQXdCZixPQUFPLENBQUNlLE1BQWhDO0FBRXBCLFFBQUlmLE9BQU8sQ0FBQ2lCLEtBQVosRUFDRUUsTUFBTSxDQUFDQyxJQUFQLENBQVlwQixPQUFPLENBQUNpQixLQUFwQixFQUEyQkksT0FBM0IsQ0FBbUMsVUFBQUMsUUFBUSxFQUFJO0FBQzdDVixNQUFBQSxLQUFLLENBQUNLLEtBQU4sQ0FBWUssUUFBWixJQUF3QnRCLE9BQU8sQ0FBQ2lCLEtBQVIsQ0FBY0ssUUFBZCxDQUF4QjtBQUNELEtBRkQ7QUFJRixXQUFPVixLQUFQO0FBQ0Q7QUFDRjtBQUVEOzs7Ozs7O0FBS0EsU0FBU2QsV0FBVCxDQUFxQkcsSUFBckIsRUFBMkJELE9BQTNCLEVBQW9DO0FBQ2xDLFNBQU91QixJQUFJLENBQUN0QixJQUFELEVBQU9ELE9BQU8sSUFBSSxFQUFsQixDQUFKLENBQTBCSyxJQUExQixDQUNMLFVBQUFtQixNQUFNO0FBQUEsV0FBSUEsTUFBTSxDQUFDQyxVQUFQLENBQWtCLElBQWxCLEVBQXdCQyxZQUF4QixDQUFxQyxDQUFyQyxFQUF3QyxDQUF4QyxFQUEyQyx3QkFBU3pCLElBQVQsQ0FBM0MsRUFBMkQseUJBQVVBLElBQVYsQ0FBM0QsRUFBNEUwQixJQUFoRjtBQUFBLEdBREQsQ0FBUDtBQUdEO0FBRUQ7Ozs7Ozs7QUFLQSxTQUFTaEMsS0FBVCxDQUFlTSxJQUFmLEVBQXFCRCxPQUFyQixFQUE4QjtBQUM1QixTQUFPdUIsSUFBSSxDQUFDdEIsSUFBRCxFQUFPRCxPQUFPLElBQUksRUFBbEIsQ0FBSixDQUEwQkssSUFBMUIsQ0FBK0IsVUFBQW1CLE1BQU07QUFBQSxXQUFJQSxNQUFNLENBQUNJLFNBQVAsRUFBSjtBQUFBLEdBQXJDLENBQVA7QUFDRDtBQUVEOzs7Ozs7O0FBS0EsU0FBU2hDLE1BQVQsQ0FBZ0JLLElBQWhCLEVBQXNCRCxPQUF0QixFQUErQjtBQUM3QkEsRUFBQUEsT0FBTyxHQUFHQSxPQUFPLElBQUksRUFBckI7QUFDQSxTQUFPdUIsSUFBSSxDQUFDdEIsSUFBRCxFQUFPRCxPQUFQLENBQUosQ0FBb0JLLElBQXBCLENBQXlCLFVBQUFtQixNQUFNO0FBQUEsV0FBSUEsTUFBTSxDQUFDSSxTQUFQLENBQWlCLFlBQWpCLEVBQStCNUIsT0FBTyxDQUFDNkIsT0FBUixJQUFtQixHQUFsRCxDQUFKO0FBQUEsR0FBL0IsQ0FBUDtBQUNEO0FBRUQ7Ozs7Ozs7QUFLQSxTQUFTaEMsTUFBVCxDQUFnQkksSUFBaEIsRUFBc0JELE9BQXRCLEVBQStCO0FBQzdCLFNBQU91QixJQUFJLENBQUN0QixJQUFELEVBQU9ELE9BQU8sSUFBSSxFQUFsQixDQUFKLENBQTBCSyxJQUExQixDQUErQnlCLHNCQUEvQixDQUFQO0FBQ0Q7O0FBRUQsU0FBUzVCLFdBQVQsQ0FBcUJGLE9BQXJCLEVBQThCO0FBQzVCO0FBQ0EsTUFBSSxPQUFPQSxPQUFPLENBQUNWLGdCQUFmLEtBQW9DLFdBQXhDLEVBQXFEO0FBQ25ERyxJQUFBQSxVQUFVLENBQUNNLElBQVgsQ0FBZ0JDLE9BQWhCLENBQXdCVixnQkFBeEIsR0FBMkNELGNBQWMsQ0FBQ0MsZ0JBQTFEO0FBQ0QsR0FGRCxNQUVPO0FBQ0xHLElBQUFBLFVBQVUsQ0FBQ00sSUFBWCxDQUFnQkMsT0FBaEIsQ0FBd0JWLGdCQUF4QixHQUEyQ1UsT0FBTyxDQUFDVixnQkFBbkQ7QUFDRDs7QUFFRCxNQUFJLE9BQU9VLE9BQU8sQ0FBQ1IsU0FBZixLQUE2QixXQUFqQyxFQUE4QztBQUM1Q0MsSUFBQUEsVUFBVSxDQUFDTSxJQUFYLENBQWdCQyxPQUFoQixDQUF3QlIsU0FBeEIsR0FBb0NILGNBQWMsQ0FBQ0csU0FBbkQ7QUFDRCxHQUZELE1BRU87QUFDTEMsSUFBQUEsVUFBVSxDQUFDTSxJQUFYLENBQWdCQyxPQUFoQixDQUF3QlIsU0FBeEIsR0FBb0NRLE9BQU8sQ0FBQ1IsU0FBNUM7QUFDRDtBQUNGOztBQUVELFNBQVMrQixJQUFULENBQWNRLE9BQWQsRUFBdUIvQixPQUF2QixFQUFnQztBQUM5QixTQUFPTixLQUFLLENBQUNxQyxPQUFELEVBQVUvQixPQUFWLENBQUwsQ0FDSkssSUFESSxDQUNDMkIsbUJBREQsRUFFSjNCLElBRkksQ0FFQyxxQkFBTSxHQUFOLENBRkQsRUFHSkEsSUFISSxDQUdDLFVBQUE0QixLQUFLLEVBQUk7QUFDYixRQUFNVCxNQUFNLEdBQUdVLFNBQVMsQ0FBQ0gsT0FBRCxDQUF4QjtBQUNBUCxJQUFBQSxNQUFNLENBQUNDLFVBQVAsQ0FBa0IsSUFBbEIsRUFBd0JVLFNBQXhCLENBQWtDRixLQUFsQyxFQUF5QyxDQUF6QyxFQUE0QyxDQUE1QztBQUNBLFdBQU9ULE1BQVA7QUFDRCxHQVBJLENBQVA7O0FBU0EsV0FBU1UsU0FBVCxDQUFtQkUsS0FBbkIsRUFBMEI7QUFDeEIsUUFBTVosTUFBTSxHQUFHYSxxQkFBU0MsYUFBVCxDQUF1QixRQUF2QixDQUFmOztBQUNBZCxJQUFBQSxNQUFNLENBQUNWLEtBQVAsR0FBZWQsT0FBTyxDQUFDYyxLQUFSLElBQWlCLHdCQUFTc0IsS0FBVCxDQUFoQztBQUNBWixJQUFBQSxNQUFNLENBQUNULE1BQVAsR0FBZ0JmLE9BQU8sQ0FBQ2UsTUFBUixJQUFrQix5QkFBVXFCLEtBQVYsQ0FBbEM7O0FBRUEsUUFBSXBDLE9BQU8sQ0FBQ2dCLE9BQVosRUFBcUI7QUFDbkIsVUFBTXVCLEdBQUcsR0FBR2YsTUFBTSxDQUFDQyxVQUFQLENBQWtCLElBQWxCLENBQVo7QUFDQWMsTUFBQUEsR0FBRyxDQUFDQyxTQUFKLEdBQWdCeEMsT0FBTyxDQUFDZ0IsT0FBeEI7QUFDQXVCLE1BQUFBLEdBQUcsQ0FBQ0UsUUFBSixDQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUJqQixNQUFNLENBQUNWLEtBQTFCLEVBQWlDVSxNQUFNLENBQUNULE1BQXhDO0FBQ0Q7O0FBRUQsV0FBT1MsTUFBUDtBQUNEO0FBQ0Y7O0FBRUQsU0FBU2pCLFNBQVQsQ0FBbUJOLElBQW5CLEVBQXlCTyxNQUF6QixFQUFpQ2tDLElBQWpDLEVBQXVDO0FBQ3JDLE1BQUksQ0FBQ0EsSUFBRCxJQUFTbEMsTUFBVCxJQUFtQixDQUFDQSxNQUFNLENBQUNQLElBQUQsQ0FBOUIsRUFBc0M7QUFDcEMsV0FBT0UsT0FBTyxDQUFDQyxPQUFSLEVBQVA7QUFDRDs7QUFFRCxTQUFPRCxPQUFPLENBQUNDLE9BQVIsQ0FBZ0JILElBQWhCLEVBQ0pJLElBREksQ0FDQ3NDLFlBREQsRUFFSnRDLElBRkksQ0FFQyxVQUFBTyxLQUFLO0FBQUEsV0FBSWdDLGFBQWEsQ0FBQzNDLElBQUQsRUFBT1csS0FBUCxFQUFjSixNQUFkLENBQWpCO0FBQUEsR0FGTixFQUdKSCxJQUhJLENBR0MsVUFBQU8sS0FBSztBQUFBLFdBQUksNEJBQWFYLElBQWIsRUFBbUJXLEtBQW5CLENBQUo7QUFBQSxHQUhOLENBQVA7O0FBS0EsV0FBUytCLFlBQVQsQ0FBc0JyQyxFQUF0QixFQUEwQjtBQUN4QixRQUFJQSxFQUFFLFlBQVl1QyxtQkFBT0MsaUJBQXpCLEVBQTRDO0FBQzFDLGFBQU8seUJBQVV4QyxFQUFFLENBQUNzQixTQUFILEVBQVYsQ0FBUDtBQUNEOztBQUNELFdBQU90QixFQUFFLENBQUNDLFNBQUgsQ0FBYSxLQUFiLENBQVA7QUFDRDs7QUFFRCxXQUFTd0Msb0JBQVQsQ0FBOEJDLE1BQTlCLEVBQXNDQyxXQUF0QyxFQUFtREMsR0FBbkQsRUFBd0Q7QUFDdEQsUUFBSUMsSUFBSSxHQUFHaEQsT0FBTyxDQUFDQyxPQUFSLEVBQVg7QUFDQTZDLElBQUFBLFdBQVcsQ0FBQzVCLE9BQVosQ0FBb0IsVUFBQStCLEtBQUssRUFBSTtBQUMzQkQsTUFBQUEsSUFBSSxHQUFHQSxJQUFJLENBQ1I5QyxJQURJLENBQ0M7QUFBQSxlQUFNRSxTQUFTLENBQUM2QyxLQUFELEVBQVFGLEdBQVIsQ0FBZjtBQUFBLE9BREQsRUFFSjdDLElBRkksQ0FFQyxVQUFBZ0QsVUFBVSxFQUFJO0FBQ2xCLFlBQUlBLFVBQUosRUFBZ0I7QUFDZEwsVUFBQUEsTUFBTSxDQUFDTSxXQUFQLENBQW1CRCxVQUFuQjtBQUNEO0FBQ0YsT0FOSSxDQUFQO0FBT0QsS0FSRDtBQVNBLFdBQU9GLElBQVA7QUFDRDs7QUFFRCxXQUFTUCxhQUFULENBQXVCVyxRQUF2QixFQUFpQzNDLEtBQWpDLEVBQXdDc0MsR0FBeEMsRUFBNkM7QUFDM0MsUUFBTU0sUUFBUSxHQUFHRCxRQUFRLENBQUNFLFVBQTFCOztBQUNBLFFBQUlELFFBQVEsQ0FBQ0UsTUFBVCxLQUFvQixDQUF4QixFQUEyQjtBQUN6QixhQUFPdkQsT0FBTyxDQUFDQyxPQUFSLENBQWdCUSxLQUFoQixDQUFQO0FBQ0Q7O0FBRUQsV0FBT21DLG9CQUFvQixDQUFDbkMsS0FBRCxFQUFRLHVCQUFRNEMsUUFBUixDQUFSLEVBQTJCTixHQUEzQixDQUFwQixDQUFvRDdDLElBQXBELENBQXlEO0FBQUEsYUFBTU8sS0FBTjtBQUFBLEtBQXpELENBQVA7QUFDRDtBQUNGOztBQUVELFNBQVNILFVBQVQsQ0FBb0JSLElBQXBCLEVBQTBCO0FBQ3hCLFNBQU9oQixTQUFTLENBQUMwRSxVQUFWLEdBQXVCdEQsSUFBdkIsQ0FBNEIsVUFBQXVELE9BQU8sRUFBSTtBQUM1QyxRQUFNQyxTQUFTLEdBQUd4QixxQkFBU0MsYUFBVCxDQUF1QixPQUF2QixDQUFsQjs7QUFDQXJDLElBQUFBLElBQUksQ0FBQ3FELFdBQUwsQ0FBaUJPLFNBQWpCO0FBQ0FBLElBQUFBLFNBQVMsQ0FBQ1AsV0FBVixDQUFzQmpCLHFCQUFTeUIsY0FBVCxDQUF3QkYsT0FBeEIsQ0FBdEI7QUFDQSxXQUFPM0QsSUFBUDtBQUNELEdBTE0sQ0FBUDtBQU1EOztBQUVELFNBQVNTLFlBQVQsQ0FBc0JULElBQXRCLEVBQTRCO0FBQzFCLFNBQU9kLE1BQU0sQ0FBQzRFLFNBQVAsQ0FBaUI5RCxJQUFqQixFQUF1QkksSUFBdkIsQ0FBNEI7QUFBQSxXQUFNSixJQUFOO0FBQUEsR0FBNUIsQ0FBUDtBQUNEOztBQUVELFNBQVNZLGNBQVQsQ0FBd0JaLElBQXhCLEVBQThCYSxLQUE5QixFQUFxQ0MsTUFBckMsRUFBNkM7QUFDM0MsU0FBT1osT0FBTyxDQUFDQyxPQUFSLENBQWdCSCxJQUFoQixFQUFzQkksSUFBdEIsQ0FBMkIsVUFBQUMsRUFBRSxFQUFJO0FBQ3RDQSxJQUFBQSxFQUFFLENBQUMwRCxZQUFILENBQWdCLE9BQWhCLEVBQXlCLDhCQUF6QjtBQUNBLFFBQU1DLGdCQUFnQixHQUFHLElBQUlwQixtQkFBT3FCLGFBQVgsR0FBMkJDLGlCQUEzQixDQUE2QzdELEVBQTdDLENBQXpCO0FBRUEsUUFBTThELEtBQUssR0FBRywyQkFBWUgsZ0JBQVosQ0FBZDtBQUNBLFFBQU1JLGFBQWEsMkVBQTRERCxLQUE1RCxxQkFBbkI7QUFDQSxRQUFNRSxNQUFNLCtEQUFxRHhELEtBQXJELHlCQUF1RUMsTUFBdkUsZ0JBQWtGc0QsYUFBbEYsV0FBWixDQU5zQyxDQVF0QztBQUNBO0FBQ0E7QUFDQTs7QUFDQSxXQUFPLGdDQUFpQkMsTUFBakIsQ0FBUDtBQUNELEdBYk0sQ0FBUDtBQWNEOztBQUVELFNBQVN0RixVQUFULEdBQXNCO0FBQ3BCLE1BQU11RixTQUFTLEdBQUcsNkJBQWxCO0FBRUEsU0FBTztBQUNMUixJQUFBQSxTQUFTLEVBQVRBLFNBREs7QUFFTFMsSUFBQUEsYUFBYSxFQUFiQSxhQUZLO0FBR0x6RSxJQUFBQSxJQUFJLEVBQUU7QUFDSjBFLE1BQUFBLFFBQVEsRUFBUkEsUUFESTtBQUVKQyxNQUFBQSxNQUFNLEVBQU5BO0FBRkk7QUFIRCxHQUFQOztBQVNBLFdBQVNGLGFBQVQsQ0FBdUJHLE1BQXZCLEVBQStCO0FBQzdCLFdBQU9BLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjTCxTQUFkLE1BQTZCLENBQUMsQ0FBckM7QUFDRDs7QUFFRCxXQUFTRSxRQUFULENBQWtCRSxNQUFsQixFQUEwQjtBQUN4QixRQUFNRSxNQUFNLEdBQUcsRUFBZjtBQUNBLFFBQUlDLEtBQUo7O0FBQ0EsV0FBTyxDQUFDQSxLQUFLLEdBQUdQLFNBQVMsQ0FBQ1EsSUFBVixDQUFlSixNQUFmLENBQVQsTUFBcUMsSUFBNUMsRUFBa0Q7QUFDaERFLE1BQUFBLE1BQU0sQ0FBQ0csSUFBUCxDQUFZRixLQUFLLENBQUMsQ0FBRCxDQUFqQjtBQUNEOztBQUNELFdBQU9ELE1BQU0sQ0FBQ3JFLE1BQVAsQ0FBYyxVQUFBeUUsR0FBRyxFQUFJO0FBQzFCLGFBQU8sQ0FBQyx5QkFBVUEsR0FBVixDQUFSO0FBQ0QsS0FGTSxDQUFQO0FBR0Q7O0FBRUQsV0FBU0MsVUFBVCxDQUFvQkMsSUFBcEIsRUFBMEI7QUFDeEIsV0FBTyxJQUFJQyxNQUFKLDBCQUE2QixzQkFBT0QsSUFBUCxDQUE3QixtQkFBeUQsR0FBekQsQ0FBUDtBQUNEOztBQUVELFdBQVNULE1BQVQsQ0FBZ0JDLE1BQWhCLEVBQXdCTSxHQUF4QixFQUE2QkksT0FBN0IsRUFBc0NDLEdBQXRDLEVBQTJDO0FBQ3pDLFdBQU9uRixPQUFPLENBQUNDLE9BQVIsQ0FBZ0I2RSxHQUFoQixFQUNKNUUsSUFESSxDQUNDLFVBQUFrRixFQUFFO0FBQUEsYUFBS0YsT0FBTyxHQUFHLDBCQUFXRSxFQUFYLEVBQWVGLE9BQWYsQ0FBSCxHQUE2QkUsRUFBekM7QUFBQSxLQURILEVBRUpsRixJQUZJLENBRUMsVUFBQWtGLEVBQUU7QUFBQSxhQUFLLE9BQU9ELEdBQVAsS0FBZSxVQUFmLEdBQTRCQSxHQUFHLENBQUNDLEVBQUQsQ0FBL0IsR0FBc0MsNEJBQWFBLEVBQWIsRUFBaUI5RixVQUFVLENBQUNNLElBQVgsQ0FBZ0JDLE9BQWpDLENBQTNDO0FBQUEsS0FGSCxFQUdKSyxJQUhJLENBR0MsVUFBQXNCLElBQUk7QUFBQSxhQUFJLHlCQUFVQSxJQUFWLEVBQWdCLHdCQUFTc0QsR0FBVCxDQUFoQixDQUFKO0FBQUEsS0FITCxFQUlKNUUsSUFKSSxDQUlDLFVBQUFtRixPQUFPO0FBQUEsYUFBSWIsTUFBTSxDQUFDYyxPQUFQLENBQWVQLFVBQVUsQ0FBQ0QsR0FBRCxDQUF6QixjQUFxQ08sT0FBckMsUUFBSjtBQUFBLEtBSlIsQ0FBUDtBQUtEOztBQUVELFdBQVN6QixTQUFULENBQW1CWSxNQUFuQixFQUEyQlUsT0FBM0IsRUFBb0NDLEdBQXBDLEVBQXlDO0FBQ3ZDLFFBQUksQ0FBQ2QsYUFBYSxDQUFDRyxNQUFELENBQWQsSUFBMEIsOEJBQWVBLE1BQWYsQ0FBOUIsRUFBc0Q7QUFDcEQsYUFBT3hFLE9BQU8sQ0FBQ0MsT0FBUixDQUFnQnVFLE1BQWhCLENBQVA7QUFDRDs7QUFDRCxXQUFPeEUsT0FBTyxDQUFDQyxPQUFSLENBQWdCdUUsTUFBaEIsRUFDSnRFLElBREksQ0FDQ29FLFFBREQsRUFFSnBFLElBRkksQ0FFQyxVQUFBcUYsSUFBSSxFQUFJO0FBQ1osVUFBSXZDLElBQUksR0FBR2hELE9BQU8sQ0FBQ0MsT0FBUixDQUFnQnVFLE1BQWhCLENBQVg7QUFDQWUsTUFBQUEsSUFBSSxDQUFDckUsT0FBTCxDQUFhLFVBQUE0RCxHQUFHLEVBQUk7QUFDbEI5QixRQUFBQSxJQUFJLEdBQUdBLElBQUksQ0FBQzlDLElBQUwsQ0FBVSxVQUFBc0YsR0FBRztBQUFBLGlCQUFJakIsTUFBTSxDQUFDaUIsR0FBRCxFQUFNVixHQUFOLEVBQVdJLE9BQVgsRUFBb0JDLEdBQXBCLENBQVY7QUFBQSxTQUFiLENBQVA7QUFDRCxPQUZEO0FBR0EsYUFBT25DLElBQVA7QUFDRCxLQVJJLENBQVA7QUFTRDtBQUNGOztBQUVELFNBQVNqRSxZQUFULEdBQXdCO0FBQ3RCLFNBQU87QUFDTHlFLElBQUFBLFVBQVUsRUFBVkEsVUFESztBQUVMNUQsSUFBQUEsSUFBSSxFQUFFO0FBQUM2RixNQUFBQSxPQUFPLEVBQVBBO0FBQUQ7QUFGRCxHQUFQOztBQUtBLFdBQVNqQyxVQUFULEdBQXNCO0FBQ3BCLFdBQU9pQyxPQUFPLENBQUN2RCxvQkFBRCxDQUFQLENBQ0poQyxJQURJLENBQ0MsVUFBQXdGLFFBQVEsRUFBSTtBQUNoQixhQUFPMUYsT0FBTyxDQUFDMkYsR0FBUixDQUFZRCxRQUFRLENBQUNFLEdBQVQsQ0FBYSxVQUFBQyxPQUFPO0FBQUEsZUFBSUEsT0FBTyxDQUFDNUYsT0FBUixFQUFKO0FBQUEsT0FBcEIsQ0FBWixDQUFQO0FBQ0QsS0FISSxFQUlKQyxJQUpJLENBSUMsVUFBQTRGLFVBQVU7QUFBQSxhQUFJQSxVQUFVLENBQUNDLElBQVgsQ0FBZ0IsSUFBaEIsQ0FBSjtBQUFBLEtBSlgsQ0FBUDtBQUtEOztBQUVELFdBQVNOLE9BQVQsR0FBbUI7QUFDakIsV0FBT3pGLE9BQU8sQ0FBQ0MsT0FBUixDQUFnQix1QkFBUWlDLHFCQUFTOEQsV0FBakIsQ0FBaEIsRUFDSjlGLElBREksQ0FDQytGLHVCQURELEVBRUovRixJQUZJLENBRUNnRyxXQUZELEVBR0poRyxJQUhJLENBR0NpRyxrQkFIRCxFQUlKakcsSUFKSSxDQUlDLFVBQUFrRyxLQUFLO0FBQUEsYUFBSUEsS0FBSyxDQUFDUixHQUFOLENBQVVTLFVBQVYsQ0FBSjtBQUFBLEtBSk4sQ0FBUDs7QUFNQSxhQUFTRixrQkFBVCxDQUE0QkcsUUFBNUIsRUFBc0M7QUFDcEMsYUFBT0EsUUFBUSxDQUNaakcsTUFESSxDQUNHLFVBQUFrRyxJQUFJO0FBQUEsZUFBSUEsSUFBSSxDQUFDQyxJQUFMLEtBQWM5RCxtQkFBTytELE9BQVAsQ0FBZUMsY0FBakM7QUFBQSxPQURQLEVBRUpyRyxNQUZJLENBRUcsVUFBQWtHLElBQUk7QUFBQSxlQUFJM0gsT0FBTyxDQUFDeUYsYUFBUixDQUFzQmtDLElBQUksQ0FBQ3pGLEtBQUwsQ0FBVzZGLGdCQUFYLENBQTRCLEtBQTVCLENBQXRCLENBQUo7QUFBQSxPQUZQLENBQVA7QUFHRDs7QUFFRCxhQUFTVix1QkFBVCxDQUFpQ0QsV0FBakMsRUFBOEM7QUFDNUMsYUFBT2hHLE9BQU8sQ0FBQzJGLEdBQVIsQ0FDTEssV0FBVyxDQUFDSixHQUFaLENBQWdCLFVBQUFnQixLQUFLLEVBQUk7QUFDdkIsWUFBSUEsS0FBSyxDQUFDQyxJQUFWLEVBQWdCO0FBQ2Q7QUFDQTtBQUNBLGNBQU1DLEtBQUssR0FBR0YsS0FBSyxDQUFDQyxJQUFOLENBQVdFLFFBQVgsQ0FBb0IsWUFBcEIsSUFBb0MsVUFBcEMsR0FBaUQsU0FBL0Q7QUFDQSxpQkFBT3JFLG1CQUNKc0UsS0FESSxDQUNFSixLQUFLLENBQUNDLElBRFIsRUFDYztBQUFDSSxZQUFBQSxXQUFXLEVBQUUsTUFBZDtBQUFzQkgsWUFBQUEsS0FBSyxFQUFMQTtBQUF0QixXQURkLEVBRUo1RyxJQUZJLENBRUMsVUFBQWdILFFBQVE7QUFBQSxtQkFBSUEsUUFBUSxDQUFDQyxJQUFULEVBQUo7QUFBQSxXQUZULEVBR0pqSCxJQUhJLENBR0NrSCxXQUFXLENBQUNSLEtBQUssQ0FBQ0MsSUFBUCxDQUhaLEVBSUozRyxJQUpJLENBSUNtSCxZQUpELFdBS0UsVUFBQUMsR0FBRyxFQUFJO0FBQ1o7QUFDQTtBQUNBO0FBQ0FDLGdDQUFRQyxJQUFSLENBQWFDLG1DQUFvQkMsVUFBakMsRUFBNkNkLEtBQUssQ0FBQ0MsSUFBbkQ7O0FBQ0FVLGdDQUFRSSxHQUFSLENBQVlMLEdBQVo7O0FBQ0E7QUFDRCxXQVpJLENBQVA7QUFhRDs7QUFDRCxlQUFPdEgsT0FBTyxDQUFDQyxPQUFSLENBQWdCMkcsS0FBaEIsQ0FBUDtBQUNELE9BcEJELENBREssQ0FBUDs7QUF3QkEsZUFBU1EsV0FBVCxDQUFxQlEsSUFBckIsRUFBMkI7QUFDekJBLFFBQUFBLElBQUksR0FBR0EsSUFBSSxDQUFDQyxLQUFMLENBQVcsR0FBWCxDQUFQO0FBQ0FELFFBQUFBLElBQUksQ0FBQ0UsR0FBTDtBQUNBRixRQUFBQSxJQUFJLEdBQUdBLElBQUksQ0FBQzdCLElBQUwsQ0FBVSxHQUFWLENBQVA7O0FBRUEsaUJBQVNnQyxnQkFBVCxDQUEwQnBELEtBQTFCLEVBQWlDcUQsRUFBakMsRUFBcUM7QUFDbkMsY0FBTWxELEdBQUcsR0FBRyxTQUFTbUQsSUFBVCxDQUFjRCxFQUFkLElBQW9CQSxFQUFwQixHQUF5QkUsbUJBQW1CLENBQUNOLElBQUQsRUFBT0ksRUFBUCxDQUF4RDtBQUNBLGdDQUFlbEQsR0FBZjtBQUNELFNBUndCLENBVXpCOzs7QUFDQSxpQkFBU29ELG1CQUFULENBQTZCcEQsR0FBN0IsRUFBa0NxRCxNQUFsQyxFQUEwQztBQUN4QyxjQUFNQyxJQUFJLEdBQUd0RCxHQUFHLENBQUMrQyxLQUFKLENBQVUsR0FBVixDQUFiO0FBQ0EsY0FBTVEsSUFBSSxHQUFHRixNQUFNLENBQUNOLEtBQVAsQ0FBYSxHQUFiLENBQWI7QUFDQSxjQUFNUyxJQUFJLEdBQUcsRUFBYjs7QUFDQSxlQUFLLElBQUlDLENBQUMsR0FBRyxDQUFSLEVBQVdDLENBQUMsR0FBR0osSUFBSSxDQUFDN0UsTUFBekIsRUFBaUNnRixDQUFDLEdBQUdDLENBQXJDLEVBQXdDRCxDQUFDLEVBQXpDLEVBQTZDO0FBQzNDLGdCQUFJSCxJQUFJLENBQUNHLENBQUQsQ0FBSixLQUFZLElBQWhCLEVBQXNCO0FBQ3BCRCxjQUFBQSxJQUFJLENBQUNSLEdBQUw7QUFDRCxhQUZELE1BRU8sSUFBSU0sSUFBSSxDQUFDRyxDQUFELENBQUosS0FBWSxHQUFoQixFQUFxQjtBQUMxQkQsY0FBQUEsSUFBSSxDQUFDekQsSUFBTCxDQUFVdUQsSUFBSSxDQUFDRyxDQUFELENBQWQ7QUFDRDtBQUNGOztBQUNELGVBQUssSUFBSUEsRUFBQyxHQUFHLENBQVIsRUFBV0MsRUFBQyxHQUFHSCxJQUFJLENBQUM5RSxNQUF6QixFQUFpQ2dGLEVBQUMsR0FBR0MsRUFBckMsRUFBd0NELEVBQUMsRUFBekMsRUFBNkM7QUFDM0MsZ0JBQUlGLElBQUksQ0FBQ0UsRUFBRCxDQUFKLEtBQVksSUFBaEIsRUFBc0I7QUFDcEJELGNBQUFBLElBQUksQ0FBQ1IsR0FBTDtBQUNELGFBRkQsTUFFTyxJQUFJTyxJQUFJLENBQUNFLEVBQUQsQ0FBSixLQUFZLEdBQWhCLEVBQXFCO0FBQzFCRCxjQUFBQSxJQUFJLENBQUN6RCxJQUFMLENBQVV3RCxJQUFJLENBQUNFLEVBQUQsQ0FBZDtBQUNEO0FBQ0Y7O0FBQ0QsaUJBQU9ELElBQUksQ0FBQ3ZDLElBQUwsQ0FBVSxHQUFWLENBQVA7QUFDRDs7QUFFRCxlQUFPLFVBQUFvQixJQUFJLEVBQUk7QUFDYixpQkFBTyw4QkFBZUEsSUFBZixJQUNIQSxJQURHLEdBRUhBLElBQUksQ0FBQzdCLE9BQUwsQ0FBYSw2QkFBYixFQUE0Q3lDLGdCQUE1QyxDQUZKO0FBR0QsU0FKRDtBQUtEOztBQUVELGVBQVNWLFlBQVQsQ0FBc0JGLElBQXRCLEVBQTRCO0FBQzFCLFlBQU1zQixHQUFHLEdBQUd2RyxxQkFBU3dHLGNBQVQsQ0FBd0JDLGtCQUF4QixDQUEyQyxFQUEzQyxDQUFaOztBQUNBLFlBQU1DLFlBQVksR0FBRzFHLHFCQUFTQyxhQUFULENBQXVCLE9BQXZCLENBQXJCOztBQUVBeUcsUUFBQUEsWUFBWSxDQUFDQyxXQUFiLEdBQTJCMUIsSUFBM0I7QUFDQXNCLFFBQUFBLEdBQUcsQ0FBQ0ssSUFBSixDQUFTM0YsV0FBVCxDQUFxQnlGLFlBQXJCO0FBRUEsZUFBT0EsWUFBWSxDQUFDaEMsS0FBcEI7QUFDRDtBQUNGOztBQUVELGFBQVNWLFdBQVQsQ0FBcUJGLFdBQXJCLEVBQWtDO0FBQ2hDLFVBQU1NLFFBQVEsR0FBRyxFQUFqQjtBQUNBTixNQUFBQSxXQUFXLENBQUM5RSxPQUFaLENBQW9CLFVBQUEwRixLQUFLLEVBQUk7QUFDM0I7QUFDQSxZQUFJLENBQUNBLEtBQUwsRUFBWTtBQUNWO0FBQ0Q7O0FBQ0QsWUFBSVIsS0FBSjs7QUFDQSxZQUFJO0FBQ0ZBLFVBQUFBLEtBQUssR0FBR1EsS0FBSyxDQUFDUixLQUFOLElBQWVRLEtBQUssQ0FBQ04sUUFBN0I7QUFDRCxTQUZELENBRUUsT0FBT3lDLENBQVAsRUFBVTtBQUNWeEIsOEJBQVFJLEdBQVIseUNBQTZDZixLQUFLLENBQUNDLElBQW5ELEdBQTJEa0MsQ0FBM0Q7O0FBQ0E7QUFDRDs7QUFFRCxZQUFJM0MsS0FBSyxJQUFJLHlCQUFPQSxLQUFQLE1BQWlCLFFBQTlCLEVBQXdDO0FBQ3RDLGNBQUk7QUFDRixtQ0FBUUEsS0FBSyxJQUFJLEVBQWpCLEVBQXFCbEYsT0FBckIsQ0FBNkJvRixRQUFRLENBQUN6QixJQUFULENBQWNtRSxJQUFkLENBQW1CMUMsUUFBbkIsQ0FBN0I7QUFDRCxXQUZELENBRUUsT0FBT3lDLENBQVAsRUFBVTtBQUNWeEIsZ0NBQVFJLEdBQVIsOENBQWtEZixLQUFLLENBQUNDLElBQXhELEdBQWdFa0MsQ0FBaEU7O0FBQ0E7QUFDRDtBQUNGLFNBUEQsTUFPTztBQUNMeEIsOEJBQVFJLEdBQVIsQ0FBWSxtQ0FBWjs7QUFDQTtBQUNEO0FBQ0YsT0F4QkQ7QUEwQkEsYUFBT3JCLFFBQVA7QUFDRDs7QUFFRCxhQUFTRCxVQUFULENBQW9CNEMsV0FBcEIsRUFBaUM7QUFDL0IsYUFBTztBQUNMaEosUUFBQUEsT0FBTyxFQUFFLG1CQUFNO0FBQ2IsY0FBTWlGLE9BQU8sR0FBRyxDQUFDK0QsV0FBVyxDQUFDQyxnQkFBWixJQUFnQyxFQUFqQyxFQUFxQ3JDLElBQXJEO0FBQ0EsaUJBQU9qSSxPQUFPLENBQUNnRixTQUFSLENBQWtCcUYsV0FBVyxDQUFDeEYsT0FBOUIsRUFBdUN5QixPQUF2QyxDQUFQO0FBQ0QsU0FKSTtBQUtMaUUsUUFBQUEsR0FBRyxFQUFFO0FBQUEsaUJBQU1GLFdBQVcsQ0FBQ25JLEtBQVosQ0FBa0I2RixnQkFBbEIsQ0FBbUMsS0FBbkMsQ0FBTjtBQUFBO0FBTEEsT0FBUDtBQU9EO0FBQ0Y7QUFDRjs7QUFFRCxTQUFTMUgsU0FBVCxHQUFxQjtBQUNuQixTQUFPO0FBQ0wyRSxJQUFBQSxTQUFTLEVBQVRBLFNBREs7QUFFTGhFLElBQUFBLElBQUksRUFBRTtBQUNKd0osTUFBQUEsUUFBUSxFQUFSQTtBQURJO0FBRkQsR0FBUDs7QUFPQSxXQUFTQSxRQUFULENBQWtCQyxPQUFsQixFQUEyQjtBQUN6QixhQUFTOUUsTUFBVCxDQUFnQlksR0FBaEIsRUFBcUI7QUFDbkIsVUFBSWtFLE9BQU8sQ0FBQ0YsR0FBWixFQUFpQjtBQUNmLGVBQU9uSixPQUFPLENBQUNDLE9BQVIsRUFBUDtBQUNEOztBQUNELGFBQU9ELE9BQU8sQ0FBQ0MsT0FBUixDQUFnQm9KLE9BQU8sQ0FBQ0YsR0FBeEIsRUFDSmpKLElBREksQ0FDQyxVQUFBa0YsRUFBRTtBQUFBLGVBQ04sT0FBT0QsR0FBUCxLQUFlLFVBQWYsR0FBNEJBLEdBQUcsQ0FBQ0MsRUFBRCxDQUEvQixHQUFzQyw0QkFBYUEsRUFBYixFQUFpQjlGLFVBQVUsQ0FBQ00sSUFBWCxDQUFnQkMsT0FBakMsQ0FEaEM7QUFBQSxPQURILEVBSUpLLElBSkksQ0FJQyxVQUFBc0IsSUFBSTtBQUFBLGVBQUkseUJBQVVBLElBQVYsRUFBZ0Isd0JBQVM2SCxPQUFPLENBQUNGLEdBQWpCLENBQWhCLENBQUo7QUFBQSxPQUpMLEVBS0pqSixJQUxJLENBTUgsVUFBQW1GLE9BQU87QUFBQSxlQUNMLElBQUlyRixPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVcUosTUFBVixFQUFxQjtBQUMvQkQsVUFBQUEsT0FBTyxDQUFDRSxNQUFSLEdBQWlCdEosT0FBakI7QUFDQW9KLFVBQUFBLE9BQU8sQ0FBQ0csT0FBUixHQUFrQkYsTUFBbEI7QUFDQUQsVUFBQUEsT0FBTyxDQUFDRixHQUFSLEdBQWM5RCxPQUFkO0FBQ0QsU0FKRCxDQURLO0FBQUEsT0FOSixDQUFQO0FBYUQ7O0FBRUQsV0FBTztBQUNMZCxNQUFBQSxNQUFNLEVBQU5BO0FBREssS0FBUDtBQUdEOztBQUVELFdBQVNYLFNBQVQsQ0FBbUI5RCxJQUFuQixFQUF5QjtBQUN2QixRQUFJLEVBQUVBLElBQUksWUFBWTJKLE9BQWxCLENBQUosRUFBZ0M7QUFDOUIsYUFBT3pKLE9BQU8sQ0FBQ0MsT0FBUixDQUFnQkgsSUFBaEIsQ0FBUDtBQUNEOztBQUVELFdBQU80SixnQkFBZ0IsQ0FBQzVKLElBQUQsQ0FBaEIsQ0FBdUJJLElBQXZCLENBQTRCLFlBQU07QUFDdkMsVUFBSUosSUFBSSxZQUFZNkosZ0JBQXBCLEVBQXNDO0FBQ3BDLGVBQU9QLFFBQVEsQ0FBQ3RKLElBQUQsQ0FBUixDQUFleUUsTUFBZixFQUFQO0FBQ0Q7O0FBQ0QsYUFBT3ZFLE9BQU8sQ0FBQzJGLEdBQVIsQ0FBWSx1QkFBUTdGLElBQUksQ0FBQ3dELFVBQWIsRUFBeUJzQyxHQUF6QixDQUE2QixVQUFBM0MsS0FBSztBQUFBLGVBQUlXLFNBQVMsQ0FBQ1gsS0FBRCxDQUFiO0FBQUEsT0FBbEMsQ0FBWixDQUFQO0FBQ0QsS0FMTSxDQUFQOztBQU9BLGFBQVN5RyxnQkFBVCxDQUEwQnZKLEVBQTFCLEVBQThCO0FBQzVCLFVBQU15SixVQUFVLEdBQUd6SixFQUFFLENBQUNXLEtBQUgsQ0FBUzZGLGdCQUFULENBQTBCLFlBQTFCLENBQW5COztBQUVBLFVBQUksQ0FBQ2lELFVBQUwsRUFBaUI7QUFDZixlQUFPNUosT0FBTyxDQUFDQyxPQUFSLENBQWdCRSxFQUFoQixDQUFQO0FBQ0Q7O0FBRUQsYUFBT3ZCLE9BQU8sQ0FDWGdGLFNBREksQ0FDTWdHLFVBRE4sRUFFSjFKLElBRkksQ0FFQyxVQUFBMkosT0FBTyxFQUFJO0FBQ2YxSixRQUFBQSxFQUFFLENBQUNXLEtBQUgsQ0FBU2dKLFdBQVQsQ0FBcUIsWUFBckIsRUFBbUNELE9BQW5DLEVBQTRDMUosRUFBRSxDQUFDVyxLQUFILENBQVNpSixtQkFBVCxDQUE2QixZQUE3QixDQUE1QztBQUNELE9BSkksRUFLSjdKLElBTEksQ0FLQztBQUFBLGVBQU1DLEVBQU47QUFBQSxPQUxELENBQVA7QUFNRDtBQUNGO0FBQ0Y7O2VBRWNiLFUiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMjAgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG4vKipcbiAqIFRoaXMgZmlsZSBpcyBjb3BpZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vdHNheWVuL2RvbS10by1pbWFnZVxuICogTW9kaWZpZWQgYnkgaGVzaGFuMDEzMSB0byBhbGxvdyBsb2FkaW5nIGV4dGVybmFsIHN0eWxlc2hlZXRzIGFuZCBpbmxpbmUgd2ViZm9udHNcbiAqL1xuXG5pbXBvcnQgd2luZG93IGZyb20gJ2dsb2JhbC93aW5kb3cnO1xuaW1wb3J0IGRvY3VtZW50IGZyb20gJ2dsb2JhbC9kb2N1bWVudCc7XG5pbXBvcnQgY29uc29sZSBmcm9tICdnbG9iYWwvY29uc29sZSc7XG5pbXBvcnQgc3ZnVG9NaW5pRGF0YVVSSSBmcm9tICdtaW5pLXN2Zy1kYXRhLXVyaSc7XG5pbXBvcnQge0lNQUdFX0VYUE9SVF9FUlJPUlN9IGZyb20gJ2NvbnN0YW50cy91c2VyLWZlZWRiYWNrcyc7XG5pbXBvcnQge1xuICBjYW52YXNUb0Jsb2IsXG4gIGVzY2FwZSxcbiAgZXNjYXBlWGh0bWwsXG4gIGRlbGF5LFxuICBwcm9jZXNzQ2xvbmUsXG4gIGFzQXJyYXksXG4gIG1ha2VJbWFnZSxcbiAgbWltZVR5cGUsXG4gIGRhdGFBc1VybCxcbiAgaXNEYXRhVXJsLFxuICBpc1NyY0FzRGF0YVVybCxcbiAgcmVzb2x2ZVVybCxcbiAgZ2V0V2lkdGgsXG4gIGdldEhlaWdodCxcbiAgZ2V0QW5kRW5jb2RlXG59IGZyb20gJy4vZG9tLXV0aWxzJztcblxuY29uc3QgaW5saW5lciA9IG5ld0lubGluZXIoKTtcbmNvbnN0IGZvbnRGYWNlcyA9IG5ld0ZvbnRGYWNlcygpO1xuY29uc3QgaW1hZ2VzID0gbmV3SW1hZ2VzKCk7XG4vLyBEZWZhdWx0IGltcGwgb3B0aW9uc1xuY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XG4gIC8vIERlZmF1bHQgaXMgdG8gZmFpbCBvbiBlcnJvciwgbm8gcGxhY2Vob2xkZXJcbiAgaW1hZ2VQbGFjZWhvbGRlcjogdW5kZWZpbmVkLFxuICAvLyBEZWZhdWx0IGNhY2hlIGJ1c3QgaXMgZmFsc2UsIGl0IHdpbGwgdXNlIHRoZSBjYWNoZVxuICBjYWNoZUJ1c3Q6IGZhbHNlXG59O1xuXG5jb25zdCBkb210b2ltYWdlID0ge1xuICB0b1N2ZyxcbiAgdG9QbmcsXG4gIHRvSnBlZyxcbiAgdG9CbG9iLFxuICB0b1BpeGVsRGF0YSxcbiAgaW1wbDoge1xuICAgIGZvbnRGYWNlcyxcbiAgICBpbWFnZXMsXG4gICAgaW5saW5lcixcbiAgICBvcHRpb25zOiB7fVxuICB9XG59O1xuXG4vKipcbiAgICogQHBhcmFtIHtOb2RlfSBub2RlIC0gVGhlIERPTSBOb2RlIG9iamVjdCB0byByZW5kZXJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBSZW5kZXJpbmcgb3B0aW9uc1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLmZpbHRlciAtIFNob3VsZCByZXR1cm4gdHJ1ZSBpZiBwYXNzZWQgbm9kZSBzaG91bGQgYmUgaW5jbHVkZWQgaW4gdGhlIG91dHB1dFxuICAgKiAgICAgICAgICAoZXhjbHVkaW5nIG5vZGUgbWVhbnMgZXhjbHVkaW5nIGl0J3MgY2hpbGRyZW4gYXMgd2VsbCkuIE5vdCBjYWxsZWQgb24gdGhlIHJvb3Qgbm9kZS5cbiAgICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMuYmdjb2xvciAtIGNvbG9yIGZvciB0aGUgYmFja2dyb3VuZCwgYW55IHZhbGlkIENTUyBjb2xvciB2YWx1ZS5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMud2lkdGggLSB3aWR0aCB0byBiZSBhcHBsaWVkIHRvIG5vZGUgYmVmb3JlIHJlbmRlcmluZy5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMuaGVpZ2h0IC0gaGVpZ2h0IHRvIGJlIGFwcGxpZWQgdG8gbm9kZSBiZWZvcmUgcmVuZGVyaW5nLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5zdHlsZSAtIGFuIG9iamVjdCB3aG9zZSBwcm9wZXJ0aWVzIHRvIGJlIGNvcGllZCB0byBub2RlJ3Mgc3R5bGUgYmVmb3JlIHJlbmRlcmluZy5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMucXVhbGl0eSAtIGEgTnVtYmVyIGJldHdlZW4gMCBhbmQgMSBpbmRpY2F0aW5nIGltYWdlIHF1YWxpdHkgKGFwcGxpY2FibGUgdG8gSlBFRyBvbmx5KSxcbiAgICAgICAgICAgICAgZGVmYXVsdHMgdG8gMS4wLlxuICAgICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMuaW1hZ2VQbGFjZWhvbGRlciAtIGRhdGFVUkwgdG8gdXNlIGFzIGEgcGxhY2Vob2xkZXIgZm9yIGZhaWxlZCBpbWFnZXMsIGRlZmF1bHQgYmVoYXZpb3VyIGlzIHRvIGZhaWwgZmFzdCBvbiBpbWFnZXMgd2UgY2FuJ3QgZmV0Y2hcbiAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5jYWNoZUJ1c3QgLSBzZXQgdG8gdHJ1ZSB0byBjYWNoZSBidXN0IGJ5IGFwcGVuZGluZyB0aGUgdGltZSB0byB0aGUgcmVxdWVzdCB1cmxcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gQSBwcm9taXNlIHRoYXQgaXMgZnVsZmlsbGVkIHdpdGggYSBTVkcgaW1hZ2UgZGF0YSBVUkxcbiAgICAqICovXG5mdW5jdGlvbiB0b1N2Zyhub2RlLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBjb3B5T3B0aW9ucyhvcHRpb25zKTtcbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShub2RlKVxuICAgIC50aGVuKG5kID0+IGNsb25lTm9kZShuZCwgb3B0aW9ucy5maWx0ZXIsIHRydWUpKVxuICAgIC50aGVuKGVtYmVkRm9udHMpXG4gICAgLnRoZW4oaW5saW5lSW1hZ2VzKVxuICAgIC50aGVuKGFwcGx5T3B0aW9ucylcbiAgICAudGhlbihjbG9uZSA9PlxuICAgICAgbWFrZVN2Z0RhdGFVcmkoY2xvbmUsIG9wdGlvbnMud2lkdGggfHwgZ2V0V2lkdGgobm9kZSksIG9wdGlvbnMuaGVpZ2h0IHx8IGdldEhlaWdodChub2RlKSlcbiAgICApO1xuXG4gIGZ1bmN0aW9uIGFwcGx5T3B0aW9ucyhjbG9uZSkge1xuICAgIGlmIChvcHRpb25zLmJnY29sb3IpIGNsb25lLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IG9wdGlvbnMuYmdjb2xvcjtcblxuICAgIGlmIChvcHRpb25zLndpZHRoKSBjbG9uZS5zdHlsZS53aWR0aCA9IGAke29wdGlvbnMud2lkdGh9cHhgO1xuICAgIGlmIChvcHRpb25zLmhlaWdodCkgY2xvbmUuc3R5bGUuaGVpZ2h0ID0gYCR7b3B0aW9ucy5oZWlnaHR9cHhgO1xuXG4gICAgaWYgKG9wdGlvbnMuc3R5bGUpXG4gICAgICBPYmplY3Qua2V5cyhvcHRpb25zLnN0eWxlKS5mb3JFYWNoKHByb3BlcnR5ID0+IHtcbiAgICAgICAgY2xvbmUuc3R5bGVbcHJvcGVydHldID0gb3B0aW9ucy5zdHlsZVtwcm9wZXJ0eV07XG4gICAgICB9KTtcblxuICAgIHJldHVybiBjbG9uZTtcbiAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZSAtIFRoZSBET00gTm9kZSBvYmplY3QgdG8gcmVuZGVyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFJlbmRlcmluZyBvcHRpb25zLCBAc2VlIHtAbGluayB0b1N2Z31cbiAqIEByZXR1cm4ge1Byb21pc2V9IC0gQSBwcm9taXNlIHRoYXQgaXMgZnVsZmlsbGVkIHdpdGggYSBVaW50OEFycmF5IGNvbnRhaW5pbmcgUkdCQSBwaXhlbCBkYXRhLlxuICogKi9cbmZ1bmN0aW9uIHRvUGl4ZWxEYXRhKG5vZGUsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIGRyYXcobm9kZSwgb3B0aW9ucyB8fCB7fSkudGhlbihcbiAgICBjYW52YXMgPT4gY2FudmFzLmdldENvbnRleHQoJzJkJykuZ2V0SW1hZ2VEYXRhKDAsIDAsIGdldFdpZHRoKG5vZGUpLCBnZXRIZWlnaHQobm9kZSkpLmRhdGFcbiAgKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge05vZGV9IG5vZGUgLSBUaGUgRE9NIE5vZGUgb2JqZWN0IHRvIHJlbmRlclxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBSZW5kZXJpbmcgb3B0aW9ucywgQHNlZSB7QGxpbmsgdG9Tdmd9XG4gKiBAcmV0dXJuIHtQcm9taXNlfSAtIEEgcHJvbWlzZSB0aGF0IGlzIGZ1bGZpbGxlZCB3aXRoIGEgUE5HIGltYWdlIGRhdGEgVVJMXG4gKiAqL1xuZnVuY3Rpb24gdG9Qbmcobm9kZSwgb3B0aW9ucykge1xuICByZXR1cm4gZHJhdyhub2RlLCBvcHRpb25zIHx8IHt9KS50aGVuKGNhbnZhcyA9PiBjYW52YXMudG9EYXRhVVJMKCkpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZSAtIFRoZSBET00gTm9kZSBvYmplY3QgdG8gcmVuZGVyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFJlbmRlcmluZyBvcHRpb25zLCBAc2VlIHtAbGluayB0b1N2Z31cbiAqIEByZXR1cm4ge1Byb21pc2V9IC0gQSBwcm9taXNlIHRoYXQgaXMgZnVsZmlsbGVkIHdpdGggYSBKUEVHIGltYWdlIGRhdGEgVVJMXG4gKiAqL1xuZnVuY3Rpb24gdG9KcGVnKG5vZGUsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHJldHVybiBkcmF3KG5vZGUsIG9wdGlvbnMpLnRoZW4oY2FudmFzID0+IGNhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL2pwZWcnLCBvcHRpb25zLnF1YWxpdHkgfHwgMS4wKSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtOb2RlfSBub2RlIC0gVGhlIERPTSBOb2RlIG9iamVjdCB0byByZW5kZXJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gUmVuZGVyaW5nIG9wdGlvbnMsIEBzZWUge0BsaW5rIHRvU3ZnfVxuICogQHJldHVybiB7UHJvbWlzZX0gLSBBIHByb21pc2UgdGhhdCBpcyBmdWxmaWxsZWQgd2l0aCBhIFBORyBpbWFnZSBibG9iXG4gKiAqL1xuZnVuY3Rpb24gdG9CbG9iKG5vZGUsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIGRyYXcobm9kZSwgb3B0aW9ucyB8fCB7fSkudGhlbihjYW52YXNUb0Jsb2IpO1xufVxuXG5mdW5jdGlvbiBjb3B5T3B0aW9ucyhvcHRpb25zKSB7XG4gIC8vIENvcHkgb3B0aW9ucyB0byBpbXBsIG9wdGlvbnMgZm9yIHVzZSBpbiBpbXBsXG4gIGlmICh0eXBlb2Ygb3B0aW9ucy5pbWFnZVBsYWNlaG9sZGVyID09PSAndW5kZWZpbmVkJykge1xuICAgIGRvbXRvaW1hZ2UuaW1wbC5vcHRpb25zLmltYWdlUGxhY2Vob2xkZXIgPSBkZWZhdWx0T3B0aW9ucy5pbWFnZVBsYWNlaG9sZGVyO1xuICB9IGVsc2Uge1xuICAgIGRvbXRvaW1hZ2UuaW1wbC5vcHRpb25zLmltYWdlUGxhY2Vob2xkZXIgPSBvcHRpb25zLmltYWdlUGxhY2Vob2xkZXI7XG4gIH1cblxuICBpZiAodHlwZW9mIG9wdGlvbnMuY2FjaGVCdXN0ID09PSAndW5kZWZpbmVkJykge1xuICAgIGRvbXRvaW1hZ2UuaW1wbC5vcHRpb25zLmNhY2hlQnVzdCA9IGRlZmF1bHRPcHRpb25zLmNhY2hlQnVzdDtcbiAgfSBlbHNlIHtcbiAgICBkb210b2ltYWdlLmltcGwub3B0aW9ucy5jYWNoZUJ1c3QgPSBvcHRpb25zLmNhY2hlQnVzdDtcbiAgfVxufVxuXG5mdW5jdGlvbiBkcmF3KGRvbU5vZGUsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIHRvU3ZnKGRvbU5vZGUsIG9wdGlvbnMpXG4gICAgLnRoZW4obWFrZUltYWdlKVxuICAgIC50aGVuKGRlbGF5KDEwMCkpXG4gICAgLnRoZW4oaW1hZ2UgPT4ge1xuICAgICAgY29uc3QgY2FudmFzID0gbmV3Q2FudmFzKGRvbU5vZGUpO1xuICAgICAgY2FudmFzLmdldENvbnRleHQoJzJkJykuZHJhd0ltYWdlKGltYWdlLCAwLCAwKTtcbiAgICAgIHJldHVybiBjYW52YXM7XG4gICAgfSk7XG5cbiAgZnVuY3Rpb24gbmV3Q2FudmFzKGROb2RlKSB7XG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgY2FudmFzLndpZHRoID0gb3B0aW9ucy53aWR0aCB8fCBnZXRXaWR0aChkTm9kZSk7XG4gICAgY2FudmFzLmhlaWdodCA9IG9wdGlvbnMuaGVpZ2h0IHx8IGdldEhlaWdodChkTm9kZSk7XG5cbiAgICBpZiAob3B0aW9ucy5iZ2NvbG9yKSB7XG4gICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSBvcHRpb25zLmJnY29sb3I7XG4gICAgICBjdHguZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2FudmFzO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNsb25lTm9kZShub2RlLCBmaWx0ZXIsIHJvb3QpIHtcbiAgaWYgKCFyb290ICYmIGZpbHRlciAmJiAhZmlsdGVyKG5vZGUpKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShub2RlKVxuICAgIC50aGVuKG1ha2VOb2RlQ29weSlcbiAgICAudGhlbihjbG9uZSA9PiBjbG9uZUNoaWxkcmVuKG5vZGUsIGNsb25lLCBmaWx0ZXIpKVxuICAgIC50aGVuKGNsb25lID0+IHByb2Nlc3NDbG9uZShub2RlLCBjbG9uZSkpO1xuXG4gIGZ1bmN0aW9uIG1ha2VOb2RlQ29weShuZCkge1xuICAgIGlmIChuZCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MQ2FudmFzRWxlbWVudCkge1xuICAgICAgcmV0dXJuIG1ha2VJbWFnZShuZC50b0RhdGFVUkwoKSk7XG4gICAgfVxuICAgIHJldHVybiBuZC5jbG9uZU5vZGUoZmFsc2UpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2xvbmVDaGlsZHJlbkluT3JkZXIocGFyZW50LCBhcnJDaGlsZHJlbiwgZmx0KSB7XG4gICAgbGV0IGRvbmUgPSBQcm9taXNlLnJlc29sdmUoKTtcbiAgICBhcnJDaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgIGRvbmUgPSBkb25lXG4gICAgICAgIC50aGVuKCgpID0+IGNsb25lTm9kZShjaGlsZCwgZmx0KSlcbiAgICAgICAgLnRoZW4oY2hpbGRDbG9uZSA9PiB7XG4gICAgICAgICAgaWYgKGNoaWxkQ2xvbmUpIHtcbiAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChjaGlsZENsb25lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBkb25lO1xuICB9XG5cbiAgZnVuY3Rpb24gY2xvbmVDaGlsZHJlbihvcmlnaW5hbCwgY2xvbmUsIGZsdCkge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gb3JpZ2luYWwuY2hpbGROb2RlcztcbiAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNsb25lKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2xvbmVDaGlsZHJlbkluT3JkZXIoY2xvbmUsIGFzQXJyYXkoY2hpbGRyZW4pLCBmbHQpLnRoZW4oKCkgPT4gY2xvbmUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGVtYmVkRm9udHMobm9kZSkge1xuICByZXR1cm4gZm9udEZhY2VzLnJlc29sdmVBbGwoKS50aGVuKGNzc1RleHQgPT4ge1xuICAgIGNvbnN0IHN0eWxlTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgbm9kZS5hcHBlbmRDaGlsZChzdHlsZU5vZGUpO1xuICAgIHN0eWxlTm9kZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3NUZXh0KSk7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBpbmxpbmVJbWFnZXMobm9kZSkge1xuICByZXR1cm4gaW1hZ2VzLmlubGluZUFsbChub2RlKS50aGVuKCgpID0+IG5vZGUpO1xufVxuXG5mdW5jdGlvbiBtYWtlU3ZnRGF0YVVyaShub2RlLCB3aWR0aCwgaGVpZ2h0KSB7XG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUobm9kZSkudGhlbihuZCA9PiB7XG4gICAgbmQuc2V0QXR0cmlidXRlKCd4bWxucycsICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sJyk7XG4gICAgY29uc3Qgc2VyaWFsaXplZFN0cmluZyA9IG5ldyB3aW5kb3cuWE1MU2VyaWFsaXplcigpLnNlcmlhbGl6ZVRvU3RyaW5nKG5kKTtcblxuICAgIGNvbnN0IHhodG1sID0gZXNjYXBlWGh0bWwoc2VyaWFsaXplZFN0cmluZyk7XG4gICAgY29uc3QgZm9yZWlnbk9iamVjdCA9IGA8Zm9yZWlnbk9iamVjdCB4PVwiMFwiIHk9XCIwXCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiPiR7eGh0bWx9PC9mb3JlaWduT2JqZWN0PmA7XG4gICAgY29uc3Qgc3ZnU3RyID0gYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiJHt3aWR0aH1cIiBoZWlnaHQ9XCIke2hlaWdodH1cIj4ke2ZvcmVpZ25PYmplY3R9PC9zdmc+YDtcblxuICAgIC8vIE9wdGltaXppbmcgU1ZHcyBpbiBkYXRhIFVSSXNcbiAgICAvLyBzZWUgaHR0cHM6Ly9jb2RlcGVuLmlvL3RpZ3QvcG9zdC9vcHRpbWl6aW5nLXN2Z3MtaW4tZGF0YS11cmlzXG4gICAgLy8gdGhlIGJlc3Qgd2F5IG9mIGVuY29kaW5nIFNWRyBpbiBhIGRhdGE6IFVSSSBpcyBkYXRhOmltYWdlL3N2Zyt4bWwsW2FjdHVhbCBkYXRhXS5cbiAgICAvLyBXZSBkb27igJl0IG5lZWQgdGhlIDtjaGFyc2V0PXV0Zi04IHBhcmFtZXRlciBiZWNhdXNlIHRoZSBnaXZlbiBTVkcgaXMgQVNDSUkuXG4gICAgcmV0dXJuIHN2Z1RvTWluaURhdGFVUkkoc3ZnU3RyKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG5ld0lubGluZXIoKSB7XG4gIGNvbnN0IFVSTF9SRUdFWCA9IC91cmxcXChbJ1wiXT8oW14nXCJdKz8pWydcIl0/XFwpL2c7XG5cbiAgcmV0dXJuIHtcbiAgICBpbmxpbmVBbGwsXG4gICAgc2hvdWxkUHJvY2VzcyxcbiAgICBpbXBsOiB7XG4gICAgICByZWFkVXJscyxcbiAgICAgIGlubGluZVxuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiBzaG91bGRQcm9jZXNzKHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcuc2VhcmNoKFVSTF9SRUdFWCkgIT09IC0xO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVhZFVybHMoc3RyaW5nKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgbGV0IG1hdGNoO1xuICAgIHdoaWxlICgobWF0Y2ggPSBVUkxfUkVHRVguZXhlYyhzdHJpbmcpKSAhPT0gbnVsbCkge1xuICAgICAgcmVzdWx0LnB1c2gobWF0Y2hbMV0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0LmZpbHRlcih1cmwgPT4ge1xuICAgICAgcmV0dXJuICFpc0RhdGFVcmwodXJsKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVybEFzUmVnZXgodXJsMCkge1xuICAgIHJldHVybiBuZXcgUmVnRXhwKGAodXJsXFxcXChbXFwnXCJdPykoJHtlc2NhcGUodXJsMCl9KShbXFwnXCJdP1xcXFwpKWAsICdnJyk7XG4gIH1cblxuICBmdW5jdGlvbiBpbmxpbmUoc3RyaW5nLCB1cmwsIGJhc2VVcmwsIGdldCkge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodXJsKVxuICAgICAgLnRoZW4odWwgPT4gKGJhc2VVcmwgPyByZXNvbHZlVXJsKHVsLCBiYXNlVXJsKSA6IHVsKSlcbiAgICAgIC50aGVuKHVsID0+ICh0eXBlb2YgZ2V0ID09PSAnZnVuY3Rpb24nID8gZ2V0KHVsKSA6IGdldEFuZEVuY29kZSh1bCwgZG9tdG9pbWFnZS5pbXBsLm9wdGlvbnMpKSlcbiAgICAgIC50aGVuKGRhdGEgPT4gZGF0YUFzVXJsKGRhdGEsIG1pbWVUeXBlKHVybCkpKVxuICAgICAgLnRoZW4oZGF0YVVybCA9PiBzdHJpbmcucmVwbGFjZSh1cmxBc1JlZ2V4KHVybCksIGAkMSR7ZGF0YVVybH0kM2ApKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlubGluZUFsbChzdHJpbmcsIGJhc2VVcmwsIGdldCkge1xuICAgIGlmICghc2hvdWxkUHJvY2VzcyhzdHJpbmcpIHx8IGlzU3JjQXNEYXRhVXJsKHN0cmluZykpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoc3RyaW5nKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShzdHJpbmcpXG4gICAgICAudGhlbihyZWFkVXJscylcbiAgICAgIC50aGVuKHVybHMgPT4ge1xuICAgICAgICBsZXQgZG9uZSA9IFByb21pc2UucmVzb2x2ZShzdHJpbmcpO1xuICAgICAgICB1cmxzLmZvckVhY2godXJsID0+IHtcbiAgICAgICAgICBkb25lID0gZG9uZS50aGVuKHN0ciA9PiBpbmxpbmUoc3RyLCB1cmwsIGJhc2VVcmwsIGdldCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRvbmU7XG4gICAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBuZXdGb250RmFjZXMoKSB7XG4gIHJldHVybiB7XG4gICAgcmVzb2x2ZUFsbCxcbiAgICBpbXBsOiB7cmVhZEFsbH1cbiAgfTtcblxuICBmdW5jdGlvbiByZXNvbHZlQWxsKCkge1xuICAgIHJldHVybiByZWFkQWxsKGRvY3VtZW50KVxuICAgICAgLnRoZW4od2ViRm9udHMgPT4ge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwod2ViRm9udHMubWFwKHdlYkZvbnQgPT4gd2ViRm9udC5yZXNvbHZlKCkpKTtcbiAgICAgIH0pXG4gICAgICAudGhlbihjc3NTdHJpbmdzID0+IGNzc1N0cmluZ3Muam9pbignXFxuJykpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEFsbCgpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGFzQXJyYXkoZG9jdW1lbnQuc3R5bGVTaGVldHMpKVxuICAgICAgLnRoZW4obG9hZEV4dGVybmFsU3R5bGVTaGVldHMpXG4gICAgICAudGhlbihnZXRDc3NSdWxlcylcbiAgICAgIC50aGVuKHNlbGVjdFdlYkZvbnRSdWxlcylcbiAgICAgIC50aGVuKHJ1bGVzID0+IHJ1bGVzLm1hcChuZXdXZWJGb250KSk7XG5cbiAgICBmdW5jdGlvbiBzZWxlY3RXZWJGb250UnVsZXMoY3NzUnVsZXMpIHtcbiAgICAgIHJldHVybiBjc3NSdWxlc1xuICAgICAgICAuZmlsdGVyKHJ1bGUgPT4gcnVsZS50eXBlID09PSB3aW5kb3cuQ1NTUnVsZS5GT05UX0ZBQ0VfUlVMRSlcbiAgICAgICAgLmZpbHRlcihydWxlID0+IGlubGluZXIuc2hvdWxkUHJvY2VzcyhydWxlLnN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ3NyYycpKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9hZEV4dGVybmFsU3R5bGVTaGVldHMoc3R5bGVTaGVldHMpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChcbiAgICAgICAgc3R5bGVTaGVldHMubWFwKHNoZWV0ID0+IHtcbiAgICAgICAgICBpZiAoc2hlZXQuaHJlZikge1xuICAgICAgICAgICAgLy8gY2xvdWRmb250IGRvZXNuJ3QgaGF2ZSBhbGxvdyBvcmlnaW4gaGVhZGVyIHByb3Blcmx5IHNldFxuICAgICAgICAgICAgLy8gZXJyb3IgcmVzcG9uc2Ugd2lsbCByZW1haW4gaW4gY2FjaGVcbiAgICAgICAgICAgIGNvbnN0IGNhY2hlID0gc2hlZXQuaHJlZi5pbmNsdWRlcygndWJlci1mb250cycpID8gJ25vLWNhY2hlJyA6ICdkZWZhdWx0JztcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3dcbiAgICAgICAgICAgICAgLmZldGNoKHNoZWV0LmhyZWYsIHtjcmVkZW50aWFsczogJ29taXQnLCBjYWNoZX0pXG4gICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLnRleHQoKSlcbiAgICAgICAgICAgICAgLnRoZW4oc2V0QmFzZUhyZWYoc2hlZXQuaHJlZikpXG4gICAgICAgICAgICAgIC50aGVuKHRvU3R5bGVTaGVldClcbiAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgLy8gSGFuZGxlIGFueSBlcnJvciB0aGF0IG9jY3VycmVkIGluIGFueSBvZiB0aGUgcHJldmlvdXNcbiAgICAgICAgICAgICAgICAvLyBwcm9taXNlcyBpbiB0aGUgY2hhaW4uIHN0eWxlc2hlZXQgZmFpbGVkIHRvIGxvYWQgc2hvdWxkIG5vdCBzdG9wXG4gICAgICAgICAgICAgICAgLy8gdGhlIHByb2Nlc3MsIGhlbmNlIHJlc3VsdCBpbiBvbmx5IGEgd2FybmluZywgaW5zdGVhZCBvZiByZWplY3RcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oSU1BR0VfRVhQT1JUX0VSUk9SUy5zdHlsZVNoZWV0LCBzaGVldC5ocmVmKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoc2hlZXQpO1xuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgZnVuY3Rpb24gc2V0QmFzZUhyZWYoYmFzZSkge1xuICAgICAgICBiYXNlID0gYmFzZS5zcGxpdCgnLycpO1xuICAgICAgICBiYXNlLnBvcCgpO1xuICAgICAgICBiYXNlID0gYmFzZS5qb2luKCcvJyk7XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkQmFzZUhyZWZUb1VybChtYXRjaCwgcDEpIHtcbiAgICAgICAgICBjb25zdCB1cmwgPSAvXmh0dHAvaS50ZXN0KHAxKSA/IHAxIDogY29uY2F0QW5kUmVzb2x2ZVVybChiYXNlLCBwMSk7XG4gICAgICAgICAgcmV0dXJuIGB1cmwoJyR7dXJsfScpYDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNvdXJjZTogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY3NjIzMS8zNzg2ODU2XG4gICAgICAgIGZ1bmN0aW9uIGNvbmNhdEFuZFJlc29sdmVVcmwodXJsLCBjb25jYXQpIHtcbiAgICAgICAgICBjb25zdCB1cmwxID0gdXJsLnNwbGl0KCcvJyk7XG4gICAgICAgICAgY29uc3QgdXJsMiA9IGNvbmNhdC5zcGxpdCgnLycpO1xuICAgICAgICAgIGNvbnN0IHVybDMgPSBbXTtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IHVybDEubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodXJsMVtpXSA9PT0gJy4uJykge1xuICAgICAgICAgICAgICB1cmwzLnBvcCgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh1cmwxW2ldICE9PSAnLicpIHtcbiAgICAgICAgICAgICAgdXJsMy5wdXNoKHVybDFbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IHVybDIubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodXJsMltpXSA9PT0gJy4uJykge1xuICAgICAgICAgICAgICB1cmwzLnBvcCgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh1cmwyW2ldICE9PSAnLicpIHtcbiAgICAgICAgICAgICAgdXJsMy5wdXNoKHVybDJbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdXJsMy5qb2luKCcvJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGV4dCA9PiB7XG4gICAgICAgICAgcmV0dXJuIGlzU3JjQXNEYXRhVXJsKHRleHQpXG4gICAgICAgICAgICA/IHRleHRcbiAgICAgICAgICAgIDogdGV4dC5yZXBsYWNlKC91cmxcXChbJ1wiXT8oW14nXCJdKz8pWydcIl0/XFwpL2csIGFkZEJhc2VIcmVmVG9VcmwpO1xuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB0b1N0eWxlU2hlZXQodGV4dCkge1xuICAgICAgICBjb25zdCBkb2MgPSBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnQoJycpO1xuICAgICAgICBjb25zdCBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXG4gICAgICAgIHN0eWxlRWxlbWVudC50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgICAgIGRvYy5ib2R5LmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XG5cbiAgICAgICAgcmV0dXJuIHN0eWxlRWxlbWVudC5zaGVldDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRDc3NSdWxlcyhzdHlsZVNoZWV0cykge1xuICAgICAgY29uc3QgY3NzUnVsZXMgPSBbXTtcbiAgICAgIHN0eWxlU2hlZXRzLmZvckVhY2goc2hlZXQgPT4ge1xuICAgICAgICAvLyB0cnkuLi5jYXRjaCBiZWNhdXNlIGJyb3dzZXIgbWF5IG5vdCBhYmxlIHRvIGVudW1lcmF0ZSBydWxlcyBmb3IgY3Jvc3MtZG9tYWluIHNoZWV0c1xuICAgICAgICBpZiAoIXNoZWV0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBydWxlcztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBydWxlcyA9IHNoZWV0LnJ1bGVzIHx8IHNoZWV0LmNzc1J1bGVzO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coYCdDYW4ndCByZWFkIHRoZSBjc3MgcnVsZXMgb2Y6ICR7c2hlZXQuaHJlZn1gLCBlKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocnVsZXMgJiYgdHlwZW9mIHJ1bGVzID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhc0FycmF5KHJ1bGVzIHx8IFtdKS5mb3JFYWNoKGNzc1J1bGVzLnB1c2guYmluZChjc3NSdWxlcykpO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBFcnJvciB3aGlsZSByZWFkaW5nIENTUyBydWxlcyBmcm9tICR7c2hlZXQuaHJlZn1gLCBlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2dldENzc1J1bGVzIGNhbiBub3QgZmluZCBjc3NSdWxlcycpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBjc3NSdWxlcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBuZXdXZWJGb250KHdlYkZvbnRSdWxlKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZXNvbHZlOiAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgYmFzZVVybCA9ICh3ZWJGb250UnVsZS5wYXJlbnRTdHlsZVNoZWV0IHx8IHt9KS5ocmVmO1xuICAgICAgICAgIHJldHVybiBpbmxpbmVyLmlubGluZUFsbCh3ZWJGb250UnVsZS5jc3NUZXh0LCBiYXNlVXJsKTtcbiAgICAgICAgfSxcbiAgICAgICAgc3JjOiAoKSA9PiB3ZWJGb250UnVsZS5zdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCdzcmMnKVxuICAgICAgfTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gbmV3SW1hZ2VzKCkge1xuICByZXR1cm4ge1xuICAgIGlubGluZUFsbCxcbiAgICBpbXBsOiB7XG4gICAgICBuZXdJbWFnZVxuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiBuZXdJbWFnZShlbGVtZW50KSB7XG4gICAgZnVuY3Rpb24gaW5saW5lKGdldCkge1xuICAgICAgaWYgKGVsZW1lbnQuc3JjKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZWxlbWVudC5zcmMpXG4gICAgICAgIC50aGVuKHVsID0+XG4gICAgICAgICAgdHlwZW9mIGdldCA9PT0gJ2Z1bmN0aW9uJyA/IGdldCh1bCkgOiBnZXRBbmRFbmNvZGUodWwsIGRvbXRvaW1hZ2UuaW1wbC5vcHRpb25zKVxuICAgICAgICApXG4gICAgICAgIC50aGVuKGRhdGEgPT4gZGF0YUFzVXJsKGRhdGEsIG1pbWVUeXBlKGVsZW1lbnQuc3JjKSkpXG4gICAgICAgIC50aGVuKFxuICAgICAgICAgIGRhdGFVcmwgPT5cbiAgICAgICAgICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgZWxlbWVudC5vbmxvYWQgPSByZXNvbHZlO1xuICAgICAgICAgICAgICBlbGVtZW50Lm9uZXJyb3IgPSByZWplY3Q7XG4gICAgICAgICAgICAgIGVsZW1lbnQuc3JjID0gZGF0YVVybDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGlubGluZVxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBpbmxpbmVBbGwobm9kZSkge1xuICAgIGlmICghKG5vZGUgaW5zdGFuY2VvZiBFbGVtZW50KSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShub2RlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5saW5lQmFja2dyb3VuZChub2RlKS50aGVuKCgpID0+IHtcbiAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCkge1xuICAgICAgICByZXR1cm4gbmV3SW1hZ2Uobm9kZSkuaW5saW5lKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwoYXNBcnJheShub2RlLmNoaWxkTm9kZXMpLm1hcChjaGlsZCA9PiBpbmxpbmVBbGwoY2hpbGQpKSk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBpbmxpbmVCYWNrZ3JvdW5kKG5kKSB7XG4gICAgICBjb25zdCBiYWNrZ3JvdW5kID0gbmQuc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgnYmFja2dyb3VuZCcpO1xuXG4gICAgICBpZiAoIWJhY2tncm91bmQpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBpbmxpbmVyXG4gICAgICAgIC5pbmxpbmVBbGwoYmFja2dyb3VuZClcbiAgICAgICAgLnRoZW4oaW5saW5lZCA9PiB7XG4gICAgICAgICAgbmQuc3R5bGUuc2V0UHJvcGVydHkoJ2JhY2tncm91bmQnLCBpbmxpbmVkLCBuZC5zdHlsZS5nZXRQcm9wZXJ0eVByaW9yaXR5KCdiYWNrZ3JvdW5kJykpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoKSA9PiBuZCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRvbXRvaW1hZ2U7XG4iXX0=