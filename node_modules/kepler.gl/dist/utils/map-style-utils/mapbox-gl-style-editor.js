"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefaultLayerGroupVisibility = getDefaultLayerGroupVisibility;
exports.isValidStyleUrl = isValidStyleUrl;
exports.getStyleDownloadUrl = getStyleDownloadUrl;
exports.getStyleImageIcon = getStyleImageIcon;
exports.scaleMapStyleByResolution = scaleMapStyleByResolution;
exports.mergeLayerGroupVisibility = mergeLayerGroupVisibility;
exports.editBottomMapStyle = exports.editTopMapStyle = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _lodash = _interopRequireDefault(require("lodash.memoize"));

var _lodash2 = _interopRequireDefault(require("lodash.clonedeep"));

var _defaultSettings = require("../../constants/default-settings");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var mapUrlRg = /^mapbox:\/\/styles\/[-a-z0-9]{2,256}\/[-a-z0-9]{2,256}/;
var httpRg = /^(?=(http:|https:))/;

function getDefaultLayerGroupVisibility(_ref) {
  var _ref$layerGroups = _ref.layerGroups,
      layerGroups = _ref$layerGroups === void 0 ? [] : _ref$layerGroups;
  return layerGroups.reduce(function (accu, layer) {
    return _objectSpread({}, accu, (0, _defineProperty2["default"])({}, layer.slug, layer.defaultVisibility));
  }, {});
}

var resolver = function resolver(_ref2) {
  var id = _ref2.id,
      mapStyle = _ref2.mapStyle,
      _ref2$visibleLayerGro = _ref2.visibleLayerGroups,
      visibleLayerGroups = _ref2$visibleLayerGro === void 0 ? {} : _ref2$visibleLayerGro;
  return "".concat(id, ":").concat(Object.keys(visibleLayerGroups).filter(function (d) {
    return visibleLayerGroups[d];
  }).sort().join('-'));
};
/**
 * Edit preset map style to keep only visible layers
 *
 * @param {Object} mapStyle - preset map style
 * @param {Object} visibleLayerGroups - visible layers of top map
 * @returns {Object} top map style
 */


var editTopMapStyle = (0, _lodash["default"])(function (_ref3) {
  var id = _ref3.id,
      mapStyle = _ref3.mapStyle,
      visibleLayerGroups = _ref3.visibleLayerGroups;
  var visibleFilters = (mapStyle.layerGroups || []).filter(function (lg) {
    return visibleLayerGroups[lg.slug];
  }).map(function (lg) {
    return lg.filter;
  }); // if top map
  // keep only visible layers

  var filteredLayers = mapStyle.style.layers.filter(function (layer) {
    return visibleFilters.some(function (match) {
      return match(layer);
    });
  });
  return _objectSpread({}, mapStyle.style, {
    layers: filteredLayers
  });
}, resolver);
/**
 * Edit preset map style to filter out invisible layers
 *
 * @param {Object} mapStyle - preset map style
 * @param {Object} visibleLayerGroups - visible layers of bottom map
 * @returns {Object} bottom map style
 */

exports.editTopMapStyle = editTopMapStyle;
var editBottomMapStyle = (0, _lodash["default"])(function (_ref4) {
  var id = _ref4.id,
      mapStyle = _ref4.mapStyle,
      visibleLayerGroups = _ref4.visibleLayerGroups;
  var invisibleFilters = (mapStyle.layerGroups || []).filter(function (lg) {
    return !visibleLayerGroups[lg.slug];
  }).map(function (lg) {
    return lg.filter;
  }); // if bottom map
  // filter out invisible layers

  var filteredLayers = mapStyle.style.layers.filter(function (layer) {
    return invisibleFilters.every(function (match) {
      return !match(layer);
    });
  });
  return _objectSpread({}, mapStyle.style, {
    layers: filteredLayers
  });
}, resolver); // valid style url
// mapbox://styles/uberdata/cjfyl03kp1tul2smf5v2tbdd4
// lowercase letters, numbers and dashes only.

exports.editBottomMapStyle = editBottomMapStyle;

function isValidStyleUrl(url) {
  return typeof url === 'string' && Boolean(url.match(mapUrlRg) || url.match(httpRg));
}

function getStyleDownloadUrl(styleUrl, accessToken, mapboxApiUrl) {
  if (styleUrl.startsWith('http')) {
    return styleUrl;
  } // mapbox://styles/jckr/cjhcl0lxv13di2rpfoytdbdyj


  if (styleUrl.startsWith('mapbox://styles')) {
    var styleId = styleUrl.replace('mapbox://styles/', ''); // https://api.mapbox.com/styles/v1/heshan0131/cjg1bfumo1cwm2rlrjxkinfgw?pluginName=Keplergl&access_token=<token>

    return "".concat(mapboxApiUrl || _defaultSettings.DEFAULT_MAPBOX_API_URL, "/styles/v1/").concat(styleId, "?pluginName=Keplergl&access_token=").concat(accessToken);
  } // style url not recognized


  return null;
}
/**
 * Generate static map image from style Url to be used as icon
 * @param {Object} param
 * @param {string} param.styleUrl
 * @param {string} param.mapboxApiAccessToken
 * @param {string} param.mapboxApiUrl
 * @param {Object} param.mapState
 * @param {numbers} param.mapW
 * @param {numbers} param.mapH
 */


function getStyleImageIcon(_ref5) {
  var styleUrl = _ref5.styleUrl,
      mapboxApiAccessToken = _ref5.mapboxApiAccessToken,
      _ref5$mapboxApiUrl = _ref5.mapboxApiUrl,
      mapboxApiUrl = _ref5$mapboxApiUrl === void 0 ? _defaultSettings.DEFAULT_MAPBOX_API_URL : _ref5$mapboxApiUrl,
      _ref5$mapState = _ref5.mapState,
      mapState = _ref5$mapState === void 0 ? {
    longitude: -122.3391,
    latitude: 37.7922,
    zoom: 9
  } : _ref5$mapState,
      _ref5$mapW = _ref5.mapW,
      mapW = _ref5$mapW === void 0 ? 400 : _ref5$mapW,
      _ref5$mapH = _ref5.mapH,
      mapH = _ref5$mapH === void 0 ? 300 : _ref5$mapH;
  var styleId = styleUrl.replace('mapbox://styles/', '');
  return "".concat(mapboxApiUrl, "/styles/v1/").concat(styleId, "/static/") + "".concat(mapState.longitude, ",").concat(mapState.latitude, ",").concat(mapState.zoom, ",0,0/") + "".concat(mapW, "x").concat(mapH) + "?access_token=".concat(mapboxApiAccessToken, "&logo=false&attribution=false");
}

function scaleMapStyleByResolution(mapboxStyle, scale) {
  if (scale !== 1 && mapboxStyle) {
    var labelLayerGroup = _defaultSettings.DEFAULT_LAYER_GROUPS.find(function (lg) {
      return lg.slug === 'label';
    });

    var labelLayerFilter = labelLayerGroup.filter;
    var zoomOffset = Math.log2(scale);
    var copyStyle = (0, _lodash2["default"])(mapboxStyle);
    (copyStyle.layers || []).forEach(function (d) {
      // edit minzoom and maxzoom
      if (d.maxzoom) {
        d.maxzoom = Math.max(d.maxzoom + zoomOffset, 1);
      }

      if (d.minzoom) {
        d.minzoom = Math.max(d.minzoom + zoomOffset, 1);
      } // edit text size


      if (labelLayerFilter(d)) {
        if (d.layout && d.layout['text-size'] && Array.isArray(d.layout['text-size'].stops)) {
          d.layout['text-size'].stops.forEach(function (stop) {
            // zoom
            stop[0] = Math.max(stop[0] + zoomOffset, 1); // size

            stop[1] *= scale;
          });
        }
      }
    });
    return copyStyle;
  }

  return mapboxStyle;
}
/**
 * When switch to a new style, try to keep current layer group visibility
 * by merging default and current
 * @param {Object} defaultLayerGroup
 * @param {Object} currentLayerGroup
 * @return {Object} mergedLayerGroups
 */


function mergeLayerGroupVisibility(defaultLayerGroup, currentLayerGroup) {
  return Object.keys(currentLayerGroup).reduce(function (accu, key) {
    return _objectSpread({}, accu, {}, defaultLayerGroup.hasOwnProperty(key) ? (0, _defineProperty2["default"])({}, key, currentLayerGroup[key]) : {});
  }, defaultLayerGroup);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9tYXAtc3R5bGUtdXRpbHMvbWFwYm94LWdsLXN0eWxlLWVkaXRvci5qcyJdLCJuYW1lcyI6WyJtYXBVcmxSZyIsImh0dHBSZyIsImdldERlZmF1bHRMYXllckdyb3VwVmlzaWJpbGl0eSIsImxheWVyR3JvdXBzIiwicmVkdWNlIiwiYWNjdSIsImxheWVyIiwic2x1ZyIsImRlZmF1bHRWaXNpYmlsaXR5IiwicmVzb2x2ZXIiLCJpZCIsIm1hcFN0eWxlIiwidmlzaWJsZUxheWVyR3JvdXBzIiwiT2JqZWN0Iiwia2V5cyIsImZpbHRlciIsImQiLCJzb3J0Iiwiam9pbiIsImVkaXRUb3BNYXBTdHlsZSIsInZpc2libGVGaWx0ZXJzIiwibGciLCJtYXAiLCJmaWx0ZXJlZExheWVycyIsInN0eWxlIiwibGF5ZXJzIiwic29tZSIsIm1hdGNoIiwiZWRpdEJvdHRvbU1hcFN0eWxlIiwiaW52aXNpYmxlRmlsdGVycyIsImV2ZXJ5IiwiaXNWYWxpZFN0eWxlVXJsIiwidXJsIiwiQm9vbGVhbiIsImdldFN0eWxlRG93bmxvYWRVcmwiLCJzdHlsZVVybCIsImFjY2Vzc1Rva2VuIiwibWFwYm94QXBpVXJsIiwic3RhcnRzV2l0aCIsInN0eWxlSWQiLCJyZXBsYWNlIiwiREVGQVVMVF9NQVBCT1hfQVBJX1VSTCIsImdldFN0eWxlSW1hZ2VJY29uIiwibWFwYm94QXBpQWNjZXNzVG9rZW4iLCJtYXBTdGF0ZSIsImxvbmdpdHVkZSIsImxhdGl0dWRlIiwiem9vbSIsIm1hcFciLCJtYXBIIiwic2NhbGVNYXBTdHlsZUJ5UmVzb2x1dGlvbiIsIm1hcGJveFN0eWxlIiwic2NhbGUiLCJsYWJlbExheWVyR3JvdXAiLCJERUZBVUxUX0xBWUVSX0dST1VQUyIsImZpbmQiLCJsYWJlbExheWVyRmlsdGVyIiwiem9vbU9mZnNldCIsIk1hdGgiLCJsb2cyIiwiY29weVN0eWxlIiwiZm9yRWFjaCIsIm1heHpvb20iLCJtYXgiLCJtaW56b29tIiwibGF5b3V0IiwiQXJyYXkiLCJpc0FycmF5Iiwic3RvcHMiLCJzdG9wIiwibWVyZ2VMYXllckdyb3VwVmlzaWJpbGl0eSIsImRlZmF1bHRMYXllckdyb3VwIiwiY3VycmVudExheWVyR3JvdXAiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLFFBQVEsR0FBRyx3REFBakI7QUFDQSxJQUFNQyxNQUFNLEdBQUcscUJBQWY7O0FBRU8sU0FBU0MsOEJBQVQsT0FBNEQ7QUFBQSw4QkFBbkJDLFdBQW1CO0FBQUEsTUFBbkJBLFdBQW1CLGlDQUFMLEVBQUs7QUFDakUsU0FBT0EsV0FBVyxDQUFDQyxNQUFaLENBQ0wsVUFBQ0MsSUFBRCxFQUFPQyxLQUFQO0FBQUEsNkJBQ0tELElBREwsdUNBRUdDLEtBQUssQ0FBQ0MsSUFGVCxFQUVnQkQsS0FBSyxDQUFDRSxpQkFGdEI7QUFBQSxHQURLLEVBS0wsRUFMSyxDQUFQO0FBT0Q7O0FBRUQsSUFBTUMsUUFBUSxHQUFHLFNBQVhBLFFBQVc7QUFBQSxNQUFFQyxFQUFGLFNBQUVBLEVBQUY7QUFBQSxNQUFNQyxRQUFOLFNBQU1BLFFBQU47QUFBQSxvQ0FBZ0JDLGtCQUFoQjtBQUFBLE1BQWdCQSxrQkFBaEIsc0NBQXFDLEVBQXJDO0FBQUEsbUJBQ1pGLEVBRFksY0FDTkcsTUFBTSxDQUFDQyxJQUFQLENBQVlGLGtCQUFaLEVBQ05HLE1BRE0sQ0FDQyxVQUFBQyxDQUFDO0FBQUEsV0FBSUosa0JBQWtCLENBQUNJLENBQUQsQ0FBdEI7QUFBQSxHQURGLEVBRU5DLElBRk0sR0FHTkMsSUFITSxDQUdELEdBSEMsQ0FETTtBQUFBLENBQWpCO0FBTUE7Ozs7Ozs7OztBQU9PLElBQU1DLGVBQWUsR0FBRyx3QkFBUSxpQkFBd0M7QUFBQSxNQUF0Q1QsRUFBc0MsU0FBdENBLEVBQXNDO0FBQUEsTUFBbENDLFFBQWtDLFNBQWxDQSxRQUFrQztBQUFBLE1BQXhCQyxrQkFBd0IsU0FBeEJB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Q0Q7QUFFRDs7Ozs7Ozs7O0FBT08sU0FBU21CLHlCQUFULENBQW1DQyxpQkFBbkMsRUFBc0RDLGlCQUF0RCxFQUF5RTtBQUM5RSxTQUFPM0QsTUFBTSxDQUFDQyxJQUFQLENBQVkwRCxpQkFBWixFQUErQnBFLE1BQS9CLENBQ0wsVUFBQ0MsSUFBRCxFQUFPb0UsR0FBUDtBQUFBLDZCQUNLcEUsSUFETCxNQUVNa0UsaUJBQWlCLENBQUNHLGNBQWxCLENBQWlDRCxHQUFqQyx5Q0FBMENBLEdBQTFDLEVBQWdERCxpQkFBaUIsQ0FBQ0MsR0FBRCxDQUFqRSxJQUEwRSxFQUZoRjtBQUFBLEdBREssRUFLTEYsaUJBTEssQ0FBUDtBQU9EIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIwIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IG1lbW9pemUgZnJvbSAnbG9kYXNoLm1lbW9pemUnO1xuaW1wb3J0IGNsb25kRGVlcCBmcm9tICdsb2Rhc2guY2xvbmVkZWVwJztcbmltcG9ydCB7REVGQVVMVF9MQVlFUl9HUk9VUFMsIERFRkFVTFRfTUFQQk9YX0FQSV9VUkx9IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcblxuY29uc3QgbWFwVXJsUmcgPSAvXm1hcGJveDpcXC9cXC9zdHlsZXNcXC9bLWEtejAtOV17MiwyNTZ9XFwvWy1hLXowLTldezIsMjU2fS87XG5jb25zdCBodHRwUmcgPSAvXig/PShodHRwOnxodHRwczopKS87XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREZWZhdWx0TGF5ZXJHcm91cFZpc2liaWxpdHkoe2xheWVyR3JvdXBzID0gW119KSB7XG4gIHJldHVybiBsYXllckdyb3Vwcy5yZWR1Y2UoXG4gICAgKGFjY3UsIGxheWVyKSA9PiAoe1xuICAgICAgLi4uYWNjdSxcbiAgICAgIFtsYXllci5zbHVnXTogbGF5ZXIuZGVmYXVsdFZpc2liaWxpdHlcbiAgICB9KSxcbiAgICB7fVxuICApO1xufVxuXG5jb25zdCByZXNvbHZlciA9ICh7aWQsIG1hcFN0eWxlLCB2aXNpYmxlTGF5ZXJHcm91cHMgPSB7fX0pID0+XG4gIGAke2lkfToke09iamVjdC5rZXlzKHZpc2libGVMYXllckdyb3VwcylcbiAgICAuZmlsdGVyKGQgPT4gdmlzaWJsZUxheWVyR3JvdXBzW2RdKVxuICAgIC5zb3J0KClcbiAgICAuam9pbignLScpfWA7XG5cbi8qKlxuICogRWRpdCBwcmVzZXQgbWFwIHN0eWxlIHRvIGtlZXAgb25seSB2aXNpYmxlIGxheWVyc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXBTdHlsZSAtIHByZXNldCBtYXAgc3R5bGVcbiAqIEBwYXJhbSB7T2JqZWN0fSB2aXNpYmxlTGF5ZXJHcm91cHMgLSB2aXNpYmxlIGxheWVycyBvZiB0b3AgbWFwXG4gKiBAcmV0dXJucyB7T2JqZWN0fSB0b3AgbWFwIHN0eWxlXG4gKi9cbmV4cG9ydCBjb25zdCBlZGl0VG9wTWFwU3R5bGUgPSBtZW1vaXplKCh7aWQsIG1hcFN0eWxlLCB2aXNpYmxlTGF5ZXJHcm91cHN9KSA9PiB7XG4gIGNvbnN0IHZpc2libGVGaWx0ZXJzID0gKG1hcFN0eWxlLmxheWVyR3JvdXBzIHx8IFtdKVxuICAgIC5maWx0ZXIobGcgPT4gdmlzaWJsZUxheWVyR3JvdXBzW2xnLnNsdWddKVxuICAgIC5tYXAobGcgPT4gbGcuZmlsdGVyKTtcblxuICAvLyBpZiB0b3AgbWFwXG4gIC8vIGtlZXAgb25seSB2aXNpYmxlIGxheWVyc1xuICBjb25zdCBmaWx0ZXJlZExheWVycyA9IG1hcFN0eWxlLnN0eWxlLmxheWVycy5maWx0ZXIobGF5ZXIgPT5cbiAgICB2aXNpYmxlRmlsdGVycy5zb21lKG1hdGNoID0+IG1hdGNoKGxheWVyKSlcbiAgKTtcblxuICByZXR1cm4ge1xuICAgIC4uLm1hcFN0eWxlLnN0eWxlLFxuICAgIGxheWVyczogZmlsdGVyZWRMYXllcnNcbiAgfTtcbn0sIHJlc29sdmVyKTtcblxuLyoqXG4gKiBFZGl0IHByZXNldCBtYXAgc3R5bGUgdG8gZmlsdGVyIG91dCBpbnZpc2libGUgbGF5ZXJzXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG1hcFN0eWxlIC0gcHJlc2V0IG1hcCBzdHlsZVxuICogQHBhcmFtIHtPYmplY3R9IHZpc2libGVMYXllckdyb3VwcyAtIHZpc2libGUgbGF5ZXJzIG9mIGJvdHRvbSBtYXBcbiAqIEByZXR1cm5zIHtPYmplY3R9IGJvdHRvbSBtYXAgc3R5bGVcbiAqL1xuZXhwb3J0IGNvbnN0IGVkaXRCb3R0b21NYXBTdHlsZSA9IG1lbW9pemUoKHtpZCwgbWFwU3R5bGUsIHZpc2libGVMYXllckdyb3Vwc30pID0+IHtcbiAgY29uc3QgaW52aXNpYmxlRmlsdGVycyA9IChtYXBTdHlsZS5sYXllckdyb3VwcyB8fCBbXSlcbiAgICAuZmlsdGVyKGxnID0+ICF2aXNpYmxlTGF5ZXJHcm91cHNbbGcuc2x1Z10pXG4gICAgLm1hcChsZyA9PiBsZy5maWx0ZXIpO1xuXG4gIC8vIGlmIGJvdHRvbSBtYXBcbiAgLy8gZmlsdGVyIG91dCBpbnZpc2libGUgbGF5ZXJzXG4gIGNvbnN0IGZpbHRlcmVkTGF5ZXJzID0gbWFwU3R5bGUuc3R5bGUubGF5ZXJzLmZpbHRlcihsYXllciA9PlxuICAgIGludmlzaWJsZUZpbHRlcnMuZXZlcnkobWF0Y2ggPT4gIW1hdGNoKGxheWVyKSlcbiAgKTtcblxuICByZXR1cm4ge1xuICAgIC4uLm1hcFN0eWxlLnN0eWxlLFxuICAgIGxheWVyczogZmlsdGVyZWRMYXllcnNcbiAgfTtcbn0sIHJlc29sdmVyKTtcblxuLy8gdmFsaWQgc3R5bGUgdXJsXG4vLyBtYXBib3g6Ly9zdHlsZXMvdWJlcmRhdGEvY2pmeWwwM2twMXR1bDJzbWY1djJ0YmRkNFxuLy8gbG93ZXJjYXNlIGxldHRlcnMsIG51bWJlcnMgYW5kIGRhc2hlcyBvbmx5LlxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWRTdHlsZVVybCh1cmwpIHtcbiAgcmV0dXJuIHR5cGVvZiB1cmwgPT09ICdzdHJpbmcnICYmIEJvb2xlYW4odXJsLm1hdGNoKG1hcFVybFJnKSB8fCB1cmwubWF0Y2goaHR0cFJnKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdHlsZURvd25sb2FkVXJsKHN0eWxlVXJsLCBhY2Nlc3NUb2tlbiwgbWFwYm94QXBpVXJsKSB7XG4gIGlmIChzdHlsZVVybC5zdGFydHNXaXRoKCdodHRwJykpIHtcbiAgICByZXR1cm4gc3R5bGVVcmw7XG4gIH1cblxuICAvLyBtYXBib3g6Ly9zdHlsZXMvamNrci9jamhjbDBseHYxM2RpMnJwZm95dGRiZHlqXG4gIGlmIChzdHlsZVVybC5zdGFydHNXaXRoKCdtYXBib3g6Ly9zdHlsZXMnKSkge1xuICAgIGNvbnN0IHN0eWxlSWQgPSBzdHlsZVVybC5yZXBsYWNlKCdtYXBib3g6Ly9zdHlsZXMvJywgJycpO1xuXG4gICAgLy8gaHR0cHM6Ly9hcGkubWFwYm94LmNvbS9zdHlsZXMvdjEvaGVzaGFuMDEzMS9jamcxYmZ1bW8xY3dtMnJscmp4a2luZmd3P3BsdWdpbk5hbWU9S2VwbGVyZ2wmYWNjZXNzX3Rva2VuPTx0b2tlbj5cbiAgICByZXR1cm4gYCR7bWFwYm94QXBpVXJsIHx8XG4gICAgICBERUZBVUxUX01BUEJPWF9BUElfVVJMfS9zdHlsZXMvdjEvJHtzdHlsZUlkfT9wbHVnaW5OYW1lPUtlcGxlcmdsJmFjY2Vzc190b2tlbj0ke2FjY2Vzc1Rva2VufWA7XG4gIH1cblxuICAvLyBzdHlsZSB1cmwgbm90IHJlY29nbml6ZWRcbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKlxuICogR2VuZXJhdGUgc3RhdGljIG1hcCBpbWFnZSBmcm9tIHN0eWxlIFVybCB0byBiZSB1c2VkIGFzIGljb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbVxuICogQHBhcmFtIHtzdHJpbmd9IHBhcmFtLnN0eWxlVXJsXG4gKiBAcGFyYW0ge3N0cmluZ30gcGFyYW0ubWFwYm94QXBpQWNjZXNzVG9rZW5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXJhbS5tYXBib3hBcGlVcmxcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbS5tYXBTdGF0ZVxuICogQHBhcmFtIHtudW1iZXJzfSBwYXJhbS5tYXBXXG4gKiBAcGFyYW0ge251bWJlcnN9IHBhcmFtLm1hcEhcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFN0eWxlSW1hZ2VJY29uKHtcbiAgc3R5bGVVcmwsXG4gIG1hcGJveEFwaUFjY2Vzc1Rva2VuLFxuICBtYXBib3hBcGlVcmwgPSBERUZBVUxUX01BUEJPWF9BUElfVVJMLFxuICBtYXBTdGF0ZSA9IHtcbiAgICBsb25naXR1ZGU6IC0xMjIuMzM5MSxcbiAgICBsYXRpdHVkZTogMzcuNzkyMixcbiAgICB6b29tOiA5XG4gIH0sXG4gIG1hcFcgPSA0MDAsXG4gIG1hcEggPSAzMDBcbn0pIHtcbiAgY29uc3Qgc3R5bGVJZCA9IHN0eWxlVXJsLnJlcGxhY2UoJ21hcGJveDovL3N0eWxlcy8nLCAnJyk7XG5cbiAgcmV0dXJuIChcbiAgICBgJHttYXBib3hBcGlVcmx9L3N0eWxlcy92MS8ke3N0eWxlSWR9L3N0YXRpYy9gICtcbiAgICBgJHttYXBTdGF0ZS5sb25naXR1ZGV9LCR7bWFwU3RhdGUubGF0aXR1ZGV9LCR7bWFwU3RhdGUuem9vbX0sMCwwL2AgK1xuICAgIGAke21hcFd9eCR7bWFwSH1gICtcbiAgICBgP2FjY2Vzc190b2tlbj0ke21hcGJveEFwaUFjY2Vzc1Rva2VufSZsb2dvPWZhbHNlJmF0dHJpYnV0aW9uPWZhbHNlYFxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2NhbGVNYXBTdHlsZUJ5UmVzb2x1dGlvbihtYXBib3hTdHlsZSwgc2NhbGUpIHtcbiAgaWYgKHNjYWxlICE9PSAxICYmIG1hcGJveFN0eWxlKSB7XG4gICAgY29uc3QgbGFiZWxMYXllckdyb3VwID0gREVGQVVMVF9MQVlFUl9HUk9VUFMuZmluZChsZyA9PiBsZy5zbHVnID09PSAnbGFiZWwnKTtcbiAgICBjb25zdCB7ZmlsdGVyOiBsYWJlbExheWVyRmlsdGVyfSA9IGxhYmVsTGF5ZXJHcm91cDtcbiAgICBjb25zdCB6b29tT2Zmc2V0ID0gTWF0aC5sb2cyKHNjYWxlKTtcblxuICAgIGNvbnN0IGNvcHlTdHlsZSA9IGNsb25kRGVlcChtYXBib3hTdHlsZSk7XG4gICAgKGNvcHlTdHlsZS5sYXllcnMgfHwgW10pLmZvckVhY2goZCA9PiB7XG4gICAgICAvLyBlZGl0IG1pbnpvb20gYW5kIG1heHpvb21cbiAgICAgIGlmIChkLm1heHpvb20pIHtcbiAgICAgICAgZC5tYXh6b29tID0gTWF0aC5tYXgoZC5tYXh6b29tICsgem9vbU9mZnNldCwgMSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChkLm1pbnpvb20pIHtcbiAgICAgICAgZC5taW56b29tID0gTWF0aC5tYXgoZC5taW56b29tICsgem9vbU9mZnNldCwgMSk7XG4gICAgICB9XG5cbiAgICAgIC8vIGVkaXQgdGV4dCBzaXplXG4gICAgICBpZiAobGFiZWxMYXllckZpbHRlcihkKSkge1xuICAgICAgICBpZiAoZC5sYXlvdXQgJiYgZC5sYXlvdXRbJ3RleHQtc2l6ZSddICYmIEFycmF5LmlzQXJyYXkoZC5sYXlvdXRbJ3RleHQtc2l6ZSddLnN0b3BzKSkge1xuICAgICAgICAgIGQubGF5b3V0Wyd0ZXh0LXNpemUnXS5zdG9wcy5mb3JFYWNoKHN0b3AgPT4ge1xuICAgICAgICAgICAgLy8gem9vbVxuICAgICAgICAgICAgc3RvcFswXSA9IE1hdGgubWF4KHN0b3BbMF0gKyB6b29tT2Zmc2V0LCAxKTtcbiAgICAgICAgICAgIC8vIHNpemVcbiAgICAgICAgICAgIHN0b3BbMV0gKj0gc2NhbGU7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBjb3B5U3R5bGU7XG4gIH1cblxuICByZXR1cm4gbWFwYm94U3R5bGU7XG59XG5cbi8qKlxuICogV2hlbiBzd2l0Y2ggdG8gYSBuZXcgc3R5bGUsIHRyeSB0byBrZWVwIGN1cnJlbnQgbGF5ZXIgZ3JvdXAgdmlzaWJpbGl0eVxuICogYnkgbWVyZ2luZyBkZWZhdWx0IGFuZCBjdXJyZW50XG4gKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdExheWVyR3JvdXBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjdXJyZW50TGF5ZXJHcm91cFxuICogQHJldHVybiB7T2JqZWN0fSBtZXJnZWRMYXllckdyb3Vwc1xuICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VMYXllckdyb3VwVmlzaWJpbGl0eShkZWZhdWx0TGF5ZXJHcm91cCwgY3VycmVudExheWVyR3JvdXApIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKGN1cnJlbnRMYXllckdyb3VwKS5yZWR1Y2UoXG4gICAgKGFjY3UsIGtleSkgPT4gKHtcbiAgICAgIC4uLmFjY3UsXG4gICAgICAuLi4oZGVmYXVsdExheWVyR3JvdXAuaGFzT3duUHJvcGVydHkoa2V5KSA/IHtba2V5XTogY3VycmVudExheWVyR3JvdXBba2V5XX0gOiB7fSlcbiAgICB9KSxcbiAgICBkZWZhdWx0TGF5ZXJHcm91cFxuICApO1xufVxuIl19