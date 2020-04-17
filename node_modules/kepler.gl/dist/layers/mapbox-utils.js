"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateMapboxLayers = generateMapboxLayers;
exports.updateMapboxLayers = updateMapboxLayers;
exports.geoJsonFromData = geoJsonFromData;
exports.gpuFilterToMapboxFilter = gpuFilterToMapboxFilter;
exports.prefixGpuField = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _baseLayer = require("./base-layer");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * This function will convert layers to mapbox layers
 * @param {Array<Object>} layers the layers to be converted
 * @param {Array<Object>} layerData extra layer information
 * @param {Array<Number>} layerOrder the order by which we should convert layers
 * @param {Object} layersToRender {[id]: true | false} object whether each layer should be rendered
 * @returns {Object} {[id]: layer}
 */
function generateMapboxLayers() {
  var layers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var layerData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var layerOrder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var layersToRender = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  if (layerData.length > 0) {
    return layerOrder.slice().reverse().filter(function (idx) {
      return layers[idx].overlayType === _baseLayer.OVERLAY_TYPE.mapboxgl && layersToRender[layers[idx].id];
    }).reduce(function (accu, index) {
      var layer = layers[index];
      return _objectSpread({}, accu, (0, _defineProperty2["default"])({}, layer.id, {
        id: layer.id,
        data: layerData[index].data,
        isVisible: layer.config.isVisible,
        config: layerData[index].config,
        sourceId: layerData[index].config.source
      }));
    }, {});
  }

  return {};
}
/**
 * Update mapbox layers on the given map
 * @param {Object} map
 * @param {Object} newLayers Map of new mapbox layers to be displayed
 * @param {Object} oldLayers Map of the old layers to be compare with the current ones to detect deleted layers
 *                  {layerId: sourceId}
 */


function updateMapboxLayers(map) {
  var newLayers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var oldLayers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  // delete no longer existed old layers
  if (oldLayers) {
    checkAndRemoveOldLayers(map, oldLayers, newLayers);
  } // insert or update new layer


  Object.values(newLayers).forEach(function (overlay) {
    var layerId = overlay.id,
        config = overlay.config,
        data = overlay.data,
        sourceId = overlay.sourceId,
        isVisible = overlay.isVisible;

    if (!data && !config) {
      return;
    }

    var _ref = oldLayers && oldLayers[layerId] || {},
        oldData = _ref.data,
        oldConfig = _ref.config;

    if (data && data !== oldData) {
      updateSourceData(map, sourceId, data);
    } // compare with previous configs


    if (oldConfig !== config) {
      updateLayerConfig(map, layerId, config, isVisible);
    }
  });
}

function checkAndRemoveOldLayers(map, oldLayers, newLayers) {
  Object.keys(oldLayers).forEach(function (layerId) {
    if (!newLayers[layerId]) {
      map.removeLayer(layerId);
    }
  });
}

function updateLayerConfig(map, layerId, config, isVisible) {
  var mapboxLayer = map.getLayer(layerId);

  if (mapboxLayer) {
    // check if layer already is set
    // remove it if exists
    map.removeLayer(layerId);
  }

  map.addLayer(config);
  map.setLayoutProperty(layerId, 'visibility', isVisible ? 'visible' : 'none');
}

function updateSourceData(map, sourceId, data) {
  var source = map.getSource(sourceId);

  if (!source) {
    map.addSource(sourceId, {
      type: 'geojson',
      data: data
    });
  } else {
    source.setData(data);
  }
}
/**
 *
 * @param points
 * @param columns {
 * lat: {fieldIdx},
 * lng: {fieldIdx},
 * alt: {fieldIdx}
 * }
 * @param properties [{label: {fieldIdx}]
 * @returns {{type: string, properties: {}, features: {type: string, properties: {}, geometry: {type: string, coordinates: *[]}}[]}}
 */


function geoJsonFromData() {
  var allData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var filteredIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var getGeometry = arguments.length > 2 ? arguments[2] : undefined;
  var getProperties = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function (d, i) {};
  var geojson = {
    type: 'FeatureCollection',
    features: []
  };

  for (var i = 0; i < filteredIndex.length; i++) {
    var index = filteredIndex[i];
    var point = allData[index];
    var geometry = getGeometry(point);

    if (geometry) {
      geojson.features.push({
        type: 'Feature',
        properties: _objectSpread({
          index: index
        }, getProperties(point, index)),
        geometry: geometry
      });
    }
  }

  return geojson;
}

var prefixGpuField = function prefixGpuField(name) {
  return "gpu:".concat(name);
};

exports.prefixGpuField = prefixGpuField;

function gpuFilterToMapboxFilter(gpuFilter) {
  var filterRange = gpuFilter.filterRange,
      filterValueUpdateTriggers = gpuFilter.filterValueUpdateTriggers;
  var hasFilter = Object.values(filterValueUpdateTriggers).filter(function (d) {
    return d;
  });

  if (!hasFilter.length) {
    return null;
  }

  var condition = ['all']; // [">=", key, value]
  // ["<=", key, value]

  var expressions = Object.values(filterValueUpdateTriggers).reduce(function (accu, name, i) {
    return name ? [].concat((0, _toConsumableArray2["default"])(accu), [['>=', prefixGpuField(name), filterRange[i][0]], ['<=', prefixGpuField(name), filterRange[i][1]]]) : accu;
  }, condition);
  return expressions;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sYXllcnMvbWFwYm94LXV0aWxzLmpzIl0sIm5hbWVzIjpbImdlbmVyYXRlTWFwYm94TGF5ZXJzIiwibGF5ZXJzIiwibGF5ZXJEYXRhIiwibGF5ZXJPcmRlciIsImxheWVyc1RvUmVuZGVyIiwibGVuZ3RoIiwic2xpY2UiLCJyZXZlcnNlIiwiZmlsdGVyIiwiaWR4Iiwib3ZlcmxheVR5cGUiLCJPVkVSTEFZX1RZUEUiLCJtYXBib3hnbCIsImlkIiwicmVkdWNlIiwiYWNjdSIsImluZGV4IiwibGF5ZXIiLCJkYXRhIiwiaXNWaXNpYmxlIiwiY29uZmlnIiwic291cmNlSWQiLCJzb3VyY2UiLCJ1cGRhdGVNYXBib3hMYXllcnMiLCJtYXAiLCJuZXdMYXllcnMiLCJvbGRMYXllcnMiLCJjaGVja0FuZFJlbW92ZU9sZExheWVycyIsIk9iamVjdCIsInZhbHVlcyIsImZvckVhY2giLCJvdmVybGF5IiwibGF5ZXJJZCIsIm9sZERhdGEiLCJvbGRDb25maWciLCJ1cGRhdGVTb3VyY2VEYXRhIiwidXBkYXRlTGF5ZXJDb25maWciLCJrZXlzIiwicmVtb3ZlTGF5ZXIiLCJtYXBib3hMYXllciIsImdldExheWVyIiwiYWRkTGF5ZXIiLCJzZXRMYXlvdXRQcm9wZXJ0eSIsImdldFNvdXJjZSIsImFkZFNvdXJjZSIsInR5cGUiLCJzZXREYXRhIiwiZ2VvSnNvbkZyb21EYXRhIiwiYWxsRGF0YSIsImZpbHRlcmVkSW5kZXgiLCJnZXRHZW9tZXRyeSIsImdldFByb3BlcnRpZXMiLCJkIiwiaSIsImdlb2pzb24iLCJmZWF0dXJlcyIsInBvaW50IiwiZ2VvbWV0cnkiLCJwdXNoIiwicHJvcGVydGllcyIsInByZWZpeEdwdUZpZWxkIiwibmFtZSIsImdwdUZpbHRlclRvTWFwYm94RmlsdGVyIiwiZ3B1RmlsdGVyIiwiZmlsdGVyUmFuZ2UiLCJmaWx0ZXJWYWx1ZVVwZGF0ZVRyaWdnZXJzIiwiaGFzRmlsdGVyIiwiY29uZGl0aW9uIiwiZXhwcmVzc2lvbnMiXSwi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LFdBRDBDLEdBQ0FELFNBREEsQ0FDMUNDLFdBRDBDO0FBQUEsTUFDN0JDLHlCQUQ2QixHQUNBRixTQURBLENBQzdCRSx5QkFENkI7QUFHakQsTUFBTUMsU0FBUyxHQUFHdEMsTUFBTSxDQUFDQyxNQUFQLENBQWNvQyx5QkFBZCxFQUF5Q3pELE1BQXpDLENBQWdELFVBQUE0QyxDQUFDO0FBQUEsV0FBSUEsQ0FBSjtBQUFBLEdBQWpELENBQWxCOztBQUVBLE1BQUksQ0FBQ2MsU0FBUyxDQUFDN0QsTUFBZixFQUF1QjtBQUNyQixXQUFPLElBQVA7QUFDRDs7QUFFRCxNQUFNOEQsU0FBUyxHQUFHLENBQUMsS0FBRCxDQUFsQixDQVRpRCxDQVdqRDtBQUNBOztBQUNBLE1BQU1DLFdBQVcsR0FBR3hDLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjb0MseUJBQWQsRUFBeUNuRCxNQUF6QyxDQUNsQixVQUFDQyxJQUFELEVBQU84QyxJQUFQLEVBQWFSLENBQWI7QUFBQSxXQUNFUSxJQUFJLGlEQUVLOUMsSUFGTCxJQUdFLENBQUMsSUFBRCxFQUFPNkMsY0FBYyxDQUFDQyxJQUFELENBQXJCLEVBQTZCRyxXQUFXLENBQUNYLENBQUQsQ0FBWCxDQUFlLENBQWYsQ0FBN0IsQ0FIRixFQUlFLENBQUMsSUFBRCxFQUFPTyxjQUFjLENBQUNDLElBQUQsQ0FBckIsRUFBNkJHLFdBQVcsQ0FBQ1gsQ0FBRCxDQUFYLENBQWUsQ0FBZixDQUE3QixDQUpGLEtBTUF0QyxJQVBOO0FBQUEsR0FEa0IsRUFTbEJvRCxTQVRrQixDQUFwQjtBQVlBLFNBQU9DLFdBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7T1ZFUkxBWV9UWVBFfSBmcm9tICcuL2Jhc2UtbGF5ZXInO1xuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gd2lsbCBjb252ZXJ0IGxheWVycyB0byBtYXBib3ggbGF5ZXJzXG4gKiBAcGFyYW0ge0FycmF5PE9iamVjdD59IGxheWVycyB0aGUgbGF5ZXJzIHRvIGJlIGNvbnZlcnRlZFxuICogQHBhcmFtIHtBcnJheTxPYmplY3Q+fSBsYXllckRhdGEgZXh0cmEgbGF5ZXIgaW5mb3JtYXRpb25cbiAqIEBwYXJhbSB7QXJyYXk8TnVtYmVyPn0gbGF5ZXJPcmRlciB0aGUgb3JkZXIgYnkgd2hpY2ggd2Ugc2hvdWxkIGNvbnZlcnQgbGF5ZXJzXG4gKiBAcGFyYW0ge09iamVjdH0gbGF5ZXJzVG9SZW5kZXIge1tpZF06IHRydWUgfCBmYWxzZX0gb2JqZWN0IHdoZXRoZXIgZWFjaCBsYXllciBzaG91bGQgYmUgcmVuZGVyZWRcbiAqIEByZXR1cm5zIHtPYmplY3R9IHtbaWRdOiBsYXllcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlTWFwYm94TGF5ZXJzKFxuICBsYXllcnMgPSBbXSxcbiAgbGF5ZXJEYXRhID0gW10sXG4gIGxheWVyT3JkZXIgPSBbXSxcbiAgbGF5ZXJzVG9SZW5kZXIgPSB7fVxuKSB7XG4gIGlmIChsYXllckRhdGEubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiBsYXllck9yZGVyXG4gICAgICAuc2xpY2UoKVxuICAgICAgLnJldmVyc2UoKVxuICAgICAgLmZpbHRlcihcbiAgICAgICAgaWR4ID0+IGxheWVyc1tpZHhdLm92ZXJsYXlUeXBlID09PSBPVkVSTEFZX1RZUEUubWFwYm94Z2wgJiYgbGF5ZXJzVG9SZW5kZXJbbGF5ZXJzW2lkeF0uaWRdXG4gICAgICApXG4gICAgICAucmVkdWNlKChhY2N1LCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBsYXllciA9IGxheWVyc1tpbmRleF07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uYWNjdSxcbiAgICAgICAgICBbbGF5ZXIuaWRdOiB7XG4gICAgICAgICAgICBpZDogbGF5ZXIuaWQsXG4gICAgICAgICAgICBkYXRhOiBsYXllckRhdGFbaW5kZXhdLmRhdGEsXG4gICAgICAgICAgICBpc1Zpc2libGU6IGxheWVyLmNvbmZpZy5pc1Zpc2libGUsXG4gICAgICAgICAgICBjb25maWc6IGxheWVyRGF0YVtpbmRleF0uY29uZmlnLFxuICAgICAgICAgICAgc291cmNlSWQ6IGxheWVyRGF0YVtpbmRleF0uY29uZmlnLnNvdXJjZVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0sIHt9KTtcbiAgfVxuXG4gIHJldHVybiB7fTtcbn1cblxuLyoqXG4gKiBVcGRhdGUgbWFwYm94IGxheWVycyBvbiB0aGUgZ2l2ZW4gbWFwXG4gKiBAcGFyYW0ge09iamVjdH0gbWFwXG4gKiBAcGFyYW0ge09iamVjdH0gbmV3TGF5ZXJzIE1hcCBvZiBuZXcgbWFwYm94IGxheWVycyB0byBiZSBkaXNwbGF5ZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBvbGRMYXllcnMgTWFwIG9mIHRoZSBvbGQgbGF5ZXJzIHRvIGJlIGNvbXBhcmUgd2l0aCB0aGUgY3VycmVudCBvbmVzIHRvIGRldGVjdCBkZWxldGVkIGxheWVyc1xuICogICAgICAgICAgICAgICAgICB7bGF5ZXJJZDogc291cmNlSWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVNYXBib3hMYXllcnMobWFwLCBuZXdMYXllcnMgPSB7fSwgb2xkTGF5ZXJzID0gbnVsbCkge1xuICAvLyBkZWxldGUgbm8gbG9uZ2VyIGV4aXN0ZWQgb2xkIGxheWVyc1xuICBpZiAob2xkTGF5ZXJzKSB7XG4gICAgY2hlY2tBbmRSZW1vdmVPbGRMYXllcnMobWFwLCBvbGRMYXllcnMsIG5ld0xheWVycyk7XG4gIH1cblxuICAvLyBpbnNlcnQgb3IgdXBkYXRlIG5ldyBsYXllclxuICBPYmplY3QudmFsdWVzKG5ld0xheWVycykuZm9yRWFjaChvdmVybGF5ID0+IHtcbiAgICBjb25zdCB7aWQ6IGxheWVySWQsIGNvbmZpZywgZGF0YSwgc291cmNlSWQsIGlzVmlzaWJsZX0gPSBvdmVybGF5O1xuICAgIGlmICghZGF0YSAmJiAhY29uZmlnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qge2RhdGE6IG9sZERhdGEsIGNvbmZpZzogb2xkQ29uZmlnfSA9IChvbGRMYXllcnMgJiYgb2xkTGF5ZXJzW2xheWVySWRdKSB8fCB7fTtcblxuICAgIGlmIChkYXRhICYmIGRhdGEgIT09IG9sZERhdGEpIHtcbiAgICAgIHVwZGF0ZVNvdXJjZURhdGEobWFwLCBzb3VyY2VJZCwgZGF0YSk7XG4gICAgfVxuXG4gICAgLy8gY29tcGFyZSB3aXRoIHByZXZpb3VzIGNvbmZpZ3NcbiAgICBpZiAob2xkQ29uZmlnICE9PSBjb25maWcpIHtcbiAgICAgIHVwZGF0ZUxheWVyQ29uZmlnKG1hcCwgbGF5ZXJJZCwgY29uZmlnLCBpc1Zpc2libGUpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNoZWNrQW5kUmVtb3ZlT2xkTGF5ZXJzKG1hcCwgb2xkTGF5ZXJzLCBuZXdMYXllcnMpIHtcbiAgT2JqZWN0LmtleXMob2xkTGF5ZXJzKS5mb3JFYWNoKGxheWVySWQgPT4ge1xuICAgIGlmICghbmV3TGF5ZXJzW2xheWVySWRdKSB7XG4gICAgICBtYXAucmVtb3ZlTGF5ZXIobGF5ZXJJZCk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlTGF5ZXJDb25maWcobWFwLCBsYXllcklkLCBjb25maWcsIGlzVmlzaWJsZSkge1xuICBjb25zdCBtYXBib3hMYXllciA9IG1hcC5nZXRMYXllcihsYXllcklkKTtcblxuICBpZiAobWFwYm94TGF5ZXIpIHtcbiAgICAvLyBjaGVjayBpZiBsYXllciBhbHJlYWR5IGlzIHNldFxuICAgIC8vIHJlbW92ZSBpdCBpZiBleGlzdHNcbiAgICBtYXAucmVtb3ZlTGF5ZXIobGF5ZXJJZCk7XG4gIH1cblxuICBtYXAuYWRkTGF5ZXIoY29uZmlnKTtcbiAgbWFwLnNldExheW91dFByb3BlcnR5KGxheWVySWQsICd2aXNpYmlsaXR5JywgaXNWaXNpYmxlID8gJ3Zpc2libGUnIDogJ25vbmUnKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlU291cmNlRGF0YShtYXAsIHNvdXJjZUlkLCBkYXRhKSB7XG4gIGNvbnN0IHNvdXJjZSA9IG1hcC5nZXRTb3VyY2Uoc291cmNlSWQpO1xuXG4gIGlmICghc291cmNlKSB7XG4gICAgbWFwLmFkZFNvdXJjZShzb3VyY2VJZCwge1xuICAgICAgdHlwZTogJ2dlb2pzb24nLFxuICAgICAgZGF0YVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHNvdXJjZS5zZXREYXRhKGRhdGEpO1xuICB9XG59XG4vKipcbiAqXG4gKiBAcGFyYW0gcG9pbnRzXG4gKiBAcGFyYW0gY29sdW1ucyB7XG4gKiBsYXQ6IHtmaWVsZElkeH0sXG4gKiBsbmc6IHtmaWVsZElkeH0sXG4gKiBhbHQ6IHtmaWVsZElkeH1cbiAqIH1cbiAqIEBwYXJhbSBwcm9wZXJ0aWVzIFt7bGFiZWw6IHtmaWVsZElkeH1dXG4gKiBAcmV0dXJucyB7e3R5cGU6IHN0cmluZywgcHJvcGVydGllczoge30sIGZlYXR1cmVzOiB7dHlwZTogc3RyaW5nLCBwcm9wZXJ0aWVzOiB7fSwgZ2VvbWV0cnk6IHt0eXBlOiBzdHJpbmcsIGNvb3JkaW5hdGVzOiAqW119fVtdfX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdlb0pzb25Gcm9tRGF0YShcbiAgYWxsRGF0YSA9IFtdLFxuICBmaWx0ZXJlZEluZGV4ID0gW10sXG4gIGdldEdlb21ldHJ5LFxuICBnZXRQcm9wZXJ0aWVzID0gKGQsIGkpID0+IHt9XG4pIHtcbiAgY29uc3QgZ2VvanNvbiA9IHtcbiAgICB0eXBlOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxuICAgIGZlYXR1cmVzOiBbXVxuICB9O1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsdGVyZWRJbmRleC5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGluZGV4ID0gZmlsdGVyZWRJbmRleFtpXTtcbiAgICBjb25zdCBwb2ludCA9IGFsbERhdGFbaW5kZXhdO1xuICAgIGNvbnN0IGdlb21ldHJ5ID0gZ2V0R2VvbWV0cnkocG9pbnQpO1xuXG4gICAgaWYgKGdlb21ldHJ5KSB7XG4gICAgICBnZW9qc29uLmZlYXR1cmVzLnB1c2goe1xuICAgICAgICB0eXBlOiAnRmVhdHVyZScsXG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICBpbmRleCxcbiAgICAgICAgICAuLi5nZXRQcm9wZXJ0aWVzKHBvaW50LCBpbmRleClcbiAgICAgICAgfSxcbiAgICAgICAgZ2VvbWV0cnlcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBnZW9qc29uO1xufVxuXG5leHBvcnQgY29uc3QgcHJlZml4R3B1RmllbGQgPSBuYW1lID0+IGBncHU6JHtuYW1lfWA7XG5cbmV4cG9ydCBmdW5jdGlvbiBncHVGaWx0ZXJUb01hcGJveEZpbHRlcihncHVGaWx0ZXIpIHtcbiAgY29uc3Qge2ZpbHRlclJhbmdlLCBmaWx0ZXJWYWx1ZVVwZGF0ZVRyaWdnZXJzfSA9IGdwdUZpbHRlcjtcblxuICBjb25zdCBoYXNGaWx0ZXIgPSBPYmplY3QudmFsdWVzKGZpbHRlclZhbHVlVXBkYXRlVHJpZ2dlcnMpLmZpbHRlcihkID0+IGQpO1xuXG4gIGlmICghaGFzRmlsdGVyLmxlbmd0aCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgY29uZGl0aW9uID0gWydhbGwnXTtcblxuICAvLyBbXCI+PVwiLCBrZXksIHZhbHVlXVxuICAvLyBbXCI8PVwiLCBrZXksIHZhbHVlXVxuICBjb25zdCBleHByZXNzaW9ucyA9IE9iamVjdC52YWx1ZXMoZmlsdGVyVmFsdWVVcGRhdGVUcmlnZ2VycykucmVkdWNlKFxuICAgIChhY2N1LCBuYW1lLCBpKSA9PlxuICAgICAgbmFtZVxuICAgICAgICA/IFtcbiAgICAgICAgICAgIC4uLmFjY3UsXG4gICAgICAgICAgICBbJz49JywgcHJlZml4R3B1RmllbGQobmFtZSksIGZpbHRlclJhbmdlW2ldWzBdXSxcbiAgICAgICAgICAgIFsnPD0nLCBwcmVmaXhHcHVGaWVsZChuYW1lKSwgZmlsdGVyUmFuZ2VbaV1bMV1dXG4gICAgICAgICAgXVxuICAgICAgICA6IGFjY3UsXG4gICAgY29uZGl0aW9uXG4gICk7XG5cbiAgcmV0dXJuIGV4cHJlc3Npb25zO1xufVxuIl19