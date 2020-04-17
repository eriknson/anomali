"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeFilters = mergeFilters;
exports.mergeLayers = mergeLayers;
exports.mergeInteractions = mergeInteractions;
exports.mergeSplitMaps = mergeSplitMaps;
exports.mergeInteractionTooltipConfig = mergeInteractionTooltipConfig;
exports.mergeLayerBlending = mergeLayerBlending;
exports.mergeAnimationConfig = mergeAnimationConfig;
exports.validateSavedLayerColumns = validateSavedLayerColumns;
exports.validateSavedTextLabel = validateSavedTextLabel;
exports.validateSavedVisualChannels = validateSavedVisualChannels;
exports.validateLayerWithData = validateLayerWithData;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _lodash = _interopRequireDefault(require("lodash.uniq"));

var _lodash2 = _interopRequireDefault(require("lodash.pick"));

var _lodash3 = _interopRequireDefault(require("lodash.isequal"));

var _lodash4 = _interopRequireDefault(require("lodash.flattendeep"));

var _utils = require("../utils/utils");

var _filterUtils = require("../utils/filter-utils");

var _splitMapUtils = require("../utils/split-map-utils");

var _gpuFilterUtils = require("../utils/gpu-filter-utils");

var _defaultSettings = require("../constants/default-settings");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Merge loaded filters with current state, if no fields or data are loaded
 * save it for later
 *
 * @param {Object} state
 * @param {Array<Object>} filtersToMerge
 * @return {Object} updatedState
 */
function mergeFilters(state, filtersToMerge) {
  var merged = [];
  var unmerged = [];
  var datasets = state.datasets;
  var updatedDatasets = datasets;

  if (!Array.isArray(filtersToMerge) || !filtersToMerge.length) {
    return state;
  } // merge filters


  filtersToMerge.forEach(function (filter) {
    // we can only look for datasets define in the filter dataId
    var datasetIds = (0, _utils.toArray)(filter.dataId); // we can merge a filter only if all datasets in filter.dataId are loaded

    if (datasetIds.every(function (d) {
      return datasets[d];
    })) {
      // all datasetIds in filter must be present the state datasets
      var _datasetIds$reduce = datasetIds.reduce(function (acc, datasetId) {
        var dataset = updatedDatasets[datasetId];
        var layers = state.layers.filter(function (l) {
          return l.config.dataId === dataset.id;
        });

        var _validateFilterWithDa = (0, _filterUtils.validateFilterWithData)(acc.augmentedDatasets[datasetId] || dataset, filter, layers),
            updatedFilter = _validateFilterWithDa.filter,
            updatedDataset = _validateFilterWithDa.dataset;

        if (updatedFilter) {
          return _objectSpread({}, acc, {
            // merge filter props
            filter: acc.filter ? _objectSpread({}, acc.filter, {}, (0, _filterUtils.mergeFilterDomainStep)(acc, updatedFilter)) : updatedFilter,
            applyToDatasets: [].concat((0, _toConsumableArray2["default"])(acc.applyToDatasets), [datasetId]),
            augmentedDatasets: _objectSpread({}, acc.augmentedDatasets, (0, _defineProperty2["default"])({}, datasetId, updatedDataset))
          });
        }

        return acc;
      }, {
        filter: null,
        applyToDatasets: [],
        augmentedDatasets: {}
      }),
          validatedFilter = _datasetIds$reduce.filter,
          applyToDatasets = _datasetIds$reduce.applyToDatasets,
          augmentedDatasets = _datasetIds$reduce.augmentedDatasets;

      if (validatedFilter && (0, _lodash3["default"])(datasetIds, applyToDatasets)) {
        merged.push(validatedFilter);
        updatedDatasets = _objectSpread({}, updatedDatasets, {}, augmentedDatasets);
      }
    } else {
      unmerged.push(filter);
    }
  }); // merge filter with existing

  var updatedFilters = [].concat((0, _toConsumableArray2["default"])(state.filters || []), merged);
  updatedFilters = (0, _gpuFilterUtils.resetFilterGpuMode)(updatedFilters);
  updatedFilters = (0, _gpuFilterUtils.assignGpuChannels)(updatedFilters); // filter data

  var datasetsToFilter = (0, _lodash["default"])((0, _lodash4["default"])(merged.map(function (f) {
    return f.dataId;
  })));
  var filtered = (0, _filterUtils.applyFiltersToDatasets)(datasetsToFilter, updatedDatasets, updatedFilters, state.layers);
  return _objectSpread({}, state, {
    filters: updatedFilters,
    datasets: filtered,
    filterToBeMerged: unmerged
  });
}
/**
 * Merge layers from de-serialized state, if no fields or data are loaded
 * save it for later
 *
 * @param {Object} state
 * @param {Array<Object>} layersToMerge
 * @return {Object} state
 */


function mergeLayers(state, layersToMerge) {
  var mergedLayer = [];
  var unmerged = [];
  var datasets = state.datasets;

  if (!Array.isArray(layersToMerge) || !layersToMerge.length) {
    return state;
  }

  layersToMerge.forEach(function (layer) {
    if (datasets[layer.config.dataId]) {
      // datasets are already loaded
      var validateLayer = validateLayerWithData(datasets[layer.config.dataId], layer, state.layerClasses);

      if (validateLayer) {
        mergedLayer.push(validateLayer);
      }
    } else {
      // datasets not yet loaded
      unmerged.push(layer);
    }
  });
  var layers = [].concat((0, _toConsumableArray2["default"])(state.layers), mergedLayer);
  var newLayerOrder = mergedLayer.map(function (_, i) {
    return state.layers.length + i;
  }); // put new layers in front of current layers

  var layerOrder = [].concat((0, _toConsumableArray2["default"])(newLayerOrder), (0, _toConsumableArray2["default"])(state.layerOrder));
  return _objectSpread({}, state, {
    layers: layers,
    layerOrder: layerOrder,
    layerToBeMerged: unmerged
  });
}
/**
 * Merge interactions with saved config
 *
 * @param {Object} state
 * @param {Object} interactionToBeMerged
 * @return {Object} mergedState
 */


function mergeInteractions(state, interactionToBeMerged) {
  var merged = {};
  var unmerged = {};

  if (interactionToBeMerged) {
    Object.keys(interactionToBeMerged).forEach(function (key) {
      if (!state.interactionConfig[key]) {
        return;
      }

      var currentConfig = state.interactionConfig[key].config;

      var _ref = interactionToBeMerged[key] || {},
          enabled = _ref.enabled,
          configSaved = (0, _objectWithoutProperties2["default"])(_ref, ["enabled"]);

      var configToMerge = configSaved;

      if (key === 'tooltip') {
        var _mergeInteractionTool = mergeInteractionTooltipConfig(state, configSaved),
            mergedTooltip = _mergeInteractionTool.mergedTooltip,
            unmergedTooltip = _mergeInteractionTool.unmergedTooltip; // merge new dataset tooltips with original dataset tooltips


        configToMerge = {
          fieldsToShow: _objectSpread({}, currentConfig.fieldsToShow, {}, mergedTooltip)
        };

        if (Object.keys(unmergedTooltip).length) {
          unmerged.tooltip = {
            fieldsToShow: unmergedTooltip,
            enabled: enabled
          };
        }
      }

      merged[key] = _objectSpread({}, state.interactionConfig[key], {
        enabled: enabled
      }, currentConfig ? {
        config: (0, _lodash2["default"])(_objectSpread({}, currentConfig, {}, configToMerge), Object.keys(currentConfig))
      } : {});
    });
  }

  return _objectSpread({}, state, {
    interactionConfig: _objectSpread({}, state.interactionConfig, {}, merged),
    interactionToBeMerged: unmerged
  });
}
/**
 * Merge splitMaps config with current visStete.
 * 1. if current map is split, but splitMap DOESNOT contain maps
 *    : don't merge anything
 * 2. if current map is NOT split, but splitMaps contain maps
 *    : add to splitMaps, and add current layers to splitMaps
 */


function mergeSplitMaps(state) {
  var splitMaps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var merged = (0, _toConsumableArray2["default"])(state.splitMaps);
  var unmerged = [];
  splitMaps.forEach(function (sm, i) {
    Object.entries(sm.layers).forEach(function (_ref2) {
      var _ref3 = (0, _slicedToArray2["default"])(_ref2, 2),
          id = _ref3[0],
          value = _ref3[1];

      // check if layer exists
      var pushTo = state.layers.find(function (l) {
        return l.id === id;
      }) ? merged : unmerged; // create map panel if current map is not split

      pushTo[i] = pushTo[i] || {
        layers: pushTo === merged ? (0, _splitMapUtils.getInitialMapLayersForSplitMap)(state.layers) : []
      };
      pushTo[i].layers = _objectSpread({}, pushTo[i].layers, (0, _defineProperty2["default"])({}, id, value));
    });
  });
  return _objectSpread({}, state, {
    splitMaps: merged,
    splitMapsToBeMerged: unmerged
  });
}
/**
 * Merge interactionConfig.tooltip with saved config,
 * validate fieldsToShow
 *
 * @param {string} state
 * @param {Object} tooltipConfig
 * @return {Object} - {mergedTooltip: {}, unmergedTooltip: {}}
 */


function mergeInteractionTooltipConfig(state) {
  var tooltipConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var unmergedTooltip = {};
  var mergedTooltip = {};

  if (!tooltipConfig.fieldsToShow || !Object.keys(tooltipConfig.fieldsToShow).length) {
    return {
      mergedTooltip: mergedTooltip,
      unmergedTooltip: unmergedTooltip
    };
  }

  for (var dataId in tooltipConfig.fieldsToShow) {
    if (!state.datasets[dataId]) {
      // is not yet loaded
      unmergedTooltip[dataId] = tooltipConfig.fieldsToShow[dataId];
    } else {
      (function () {
        // if dataset is loaded
        var allFields = state.datasets[dataId].fields.map(function (d) {
          return d.name;
        });
        var foundFieldsToShow = tooltipConfig.fieldsToShow[dataId].filter(function (name) {
          return allFields.includes(name);
        });
        mergedTooltip[dataId] = foundFieldsToShow;
      })();
    }
  }

  return {
    mergedTooltip: mergedTooltip,
    unmergedTooltip: unmergedTooltip
  };
}
/**
 * Merge layerBlending with saved
 *
 * @param {object} state
 * @param {string} layerBlending
 * @return {object} merged state
 */


function mergeLayerBlending(state, layerBlending) {
  if (layerBlending && _defaultSettings.LAYER_BLENDINGS[layerBlending]) {
    return _objectSpread({}, state, {
      layerBlending: layerBlending
    });
  }

  return state;
}
/**
 * Merge animation config
 * @param {Object} state
 * @param {Object} animation
 */


function mergeAnimationConfig(state, animation) {
  if (animation && animation.currentTime) {
    return _objectSpread({}, state, {
      animationConfig: _objectSpread({}, state.animationConfig, {}, animation, {
        domain: null
      })
    });
  }

  return state;
}
/**
 * Validate saved layer columns with new data,
 * update fieldIdx based on new fields
 *
 * @param {Array<Object>} fields
 * @param {Object} savedCols
 * @param {Object} emptyCols
 * @return {null | Object} - validated columns or null
 */


function validateSavedLayerColumns(fields, savedCols, emptyCols) {
  var colFound = {}; // find actual column fieldIdx, in case it has changed

  var allColFound = Object.keys(emptyCols).every(function (key) {
    var saved = savedCols[key];
    colFound[key] = _objectSpread({}, emptyCols[key]); // TODO: replace with new approach

    var fieldIdx = fields.findIndex(function (_ref4) {
      var name = _ref4.name;
      return name === saved;
    });

    if (fieldIdx > -1) {
      // update found columns
      colFound[key].fieldIdx = fieldIdx;
      colFound[key].value = saved;
      return true;
    } // if col is optional, allow null value


    return emptyCols[key].optional || false;
  });
  return allColFound && colFound;
}
/**
 * Validate saved text label config with new data
 * refer to vis-state-schema.js TextLabelSchemaV1
 *
 * @param {Array<Object>} fields
 * @param {Object} savedTextLabel
 * @return {Object} - validated textlabel
 */


function validateSavedTextLabel(fields, _ref5, savedTextLabel) {
  var _ref6 = (0, _slicedToArray2["default"])(_ref5, 1),
      layerTextLabel = _ref6[0];

  var savedTextLabels = Array.isArray(savedTextLabel) ? savedTextLabel : [savedTextLabel]; // validate field

  return savedTextLabels.map(function (textLabel) {
    var field = textLabel.field ? fields.find(function (fd) {
      return Object.keys(textLabel.field).every(function (key) {
        return textLabel.field[key] === fd[key];
      });
    }) : null;
    return Object.keys(layerTextLabel).reduce(function (accu, key) {
      return _objectSpread({}, accu, (0, _defineProperty2["default"])({}, key, key === 'field' ? field : textLabel[key] || layerTextLabel[key]));
    }, {});
  });
}
/**
 * Validate saved visual channels config with new data,
 * refer to vis-state-schema.js VisualChannelSchemaV1
 *
 * @param {Array<Object>} fields
 * @param {Object} newLayer
 * @param {Object} savedLayer
 * @return {Object} - newLayer
 */


function validateSavedVisualChannels(fields, newLayer, savedLayer) {
  Object.values(newLayer.visualChannels).forEach(function (_ref7) {
    var field = _ref7.field,
        scale = _ref7.scale,
        key = _ref7.key;
    var foundField;

    if (savedLayer.config[field]) {
      foundField = fields.find(function (fd) {
        return Object.keys(savedLayer.config[field]).every(function (prop) {
          return savedLayer.config[field][prop] === fd[prop];
        });
      });
    }

    var foundChannel = _objectSpread({}, foundField ? (0, _defineProperty2["default"])({}, field, foundField) : {}, {}, savedLayer.config[scale] ? (0, _defineProperty2["default"])({}, scale, savedLayer.config[scale]) : {});

    if (Object.keys(foundChannel).length) {
      newLayer.updateLayerConfig(foundChannel);
      newLayer.validateVisualChannel(key);
    }
  });
  return newLayer;
}
/**
 * Validate saved layer config with new data,
 * update fieldIdx based on new fields
 *
 * @param {Array<Object>} fields
 * @param {string} dataId
 * @param {Object} savedLayer
 * @param {Object} layerClasses
 * @return {null | Object} - validated layer or null
 */


function validateLayerWithData(_ref10, savedLayer, layerClasses) {
  var fields = _ref10.fields,
      dataId = _ref10.id;
  var type = savedLayer.type; // layer doesnt have a valid type

  if (!layerClasses.hasOwnProperty(type) || !savedLayer.config || !savedLayer.config.columns) {
    return null;
  }

  var newLayer = new layerClasses[type]({
    id: savedLayer.id,
    dataId: dataId,
    label: savedLayer.config.label,
    color: savedLayer.config.color,
    isVisible: savedLayer.config.isVisible
  }); // find column fieldIdx

  var columns = validateSavedLayerColumns(fields, savedLayer.config.columns, newLayer.getLayerColumns());

  if (!columns) {
    return null;
  } // visual channel field is saved to be {name, type}
  // find visual channel field by matching both name and type
  // refer to vis-state-schema.js VisualChannelSchemaV1


  newLayer = validateSavedVisualChannels(fields, newLayer, savedLayer);
  var textLabel = savedLayer.config.textLabel && newLayer.config.textLabel ? validateSavedTextLabel(fields, newLayer.config.textLabel, savedLayer.config.textLabel) : newLayer.config.textLabel; // copy visConfig over to emptyLayer to make sure it has all the props

  var visConfig = newLayer.copyLayerConfig(newLayer.config.visConfig, savedLayer.config.visConfig || {}, {
    shallowCopy: ['colorRange', 'strokeColorRange']
  });
  newLayer.updateLayerConfig({
    columns: columns,
    visConfig: visConfig,
    textLabel: textLabel
  });
  return newLayer;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy92aXMtc3RhdGUtbWVyZ2VyLmpzIl0sIm5hbWVzIjpbIm1lcmdlRmlsdGVycyIsInN0YXRlIiwiZmlsdGVyc1RvTWVyZ2UiLCJtZXJnZWQiLCJ1bm1lcmdlZCIsImRhdGFzZXRzIiwidXBkYXRlZERhdGFzZXRzIiwiQXJyYXkiLCJpc0FycmF5IiwibGVuZ3RoIiwiZm9yRWFjaCIsImZpbHRlciIsImRhdGFzZXRJZHMiLCJkYXRhSWQiLCJldmVyeSIsImQiLCJyZWR1Y2UiLCJhY2MiLCJkYXRhc2V0SWQiLCJkYXRhc2V0IiwibGF5ZXJzIiwibCIsImNvbmZpZyIsImlkIiwiYXVnbWVudGVkRGF0YXNldHMiLCJ1cGRhdGVkRmlsdGVyIiwidXBkYXRlZERhdGFzZXQiLCJhcHBseVRvRGF0YXNldHMiLCJ2YWxpZGF0ZWRGaWx0ZXIiLCJwdXNoIiwidXBkYXRlZEZpbHRlcnMiLCJmaWx0ZXJzIiwiZGF0YXNldHNUb0ZpbHRlciIsIm1hcCIsImYiLCJmaWx0ZXJlZCIsImZpbHRlclRvQmVNZXJnZWQiLCJtZXJnZUxheWVycyIsImxheWVyc1RvTWVyZ2UiLCJtZXJnZWRMYXllciIsImxheWVyIiwidmFsaWRhdGVMYXllciIsInZhbGlkYXRlTGF5ZXJXaXRoRGF0YSIsImxheWVyQ2xhc3NlcyIsIm5ld0xheWVyT3JkZXIiLCJfIiwiaSIsImxheWVyT3JkZXIiLCJsYXllclRvQmVNZXJnZWQiLCJtZXJnZUludGVyYWN0aW9ucyIsImludGVyYWN0aW9uVG9CZU1lcmdlZCIsIk9iamVjdCIsImtleXMiLCJrZXkiLCJpbnRlcmFjdGlvbkNvbmZpZyIsImN1cnJlbnRDb25maWciLCJlbmFibGVkIiwiY29uZmlnU2F2ZWQiLCJjb25maWdUb01lcmdlIiwibWVyZ2VJbnRlcmFjdGlvblRvb2x0aXBDb25maWciLCJtZXJnZWRUb29sdGlwIiwidW5tZXJnZWRUb29sdGlwIiwiZmllbGRzVG9TaG93IiwidG9vbHRpcCIsIm1lcmdlU3BsaXRNYXBzIiwic3BsaXRNYXBzIiwic20iLCJlbnRyaWVzIiwidmFsdWUiLCJwdXNoVG8iLCJmaW5kIiwic3BsaXRNYXBzVG9CZU1lcmdlZCIsInRvb2x0aXBDb25maWciLCJhbGxGaWVsZHMiLCJmaWVsZHMiLCJuYW1lIiwiZm91bmRGaWVsZHNUb1Nob3ciLCJpbmNsdWRlcyIsIm1lcmdlTGF5ZXJCbGVuZGluZyIsImxheWVyQmxlbmRpbmciLCJMQVlFUl9CTEVORElOR1MiLCJtZXJnZUFuaW1hdGlvbkNvbmZpZyIsImFuaW1hdGlvbiIsImN1cnJlbnRUaW1lIiwiYW5pbWF0aW9uQ29uZmlnIiwiZG9tYWluIiwidmFsaWRhdGVTYXZlZExheWVyQ29sdW1ucyIsInNhdmVkQ29scyIsImVtcHR5Q29scyIsImNvbEZvdW5kIiwiYWxsQ29sRm91bmQiLCJzYXZlZCIsImZpZWxkSWR4IiwiZmluZEluZGV4Iiwib3B0aW9uYWwiLCJ2YWxpZGF0ZVNhdmVkVGV4dExhYmVsIiwic2F2ZWRUZXh0TGFiZWwiLCJsYXllclRleHRMYWJlbCIsInNhdmVkVGV4dExhYmVscyIsInRleHRMYWJlbCIsImZpZWxkIiwiZmQiLCJhY2N1IiwidmFsaWRhdGVTYXZlZFZpc3VhbENoYW5uZWxzIiwibmV3TGF5ZXIiLCJzYXZlZExheWVyIiwidmFsdWVzIiwidmlzdWFsQ2hhbm5lbHMiLCJzY2FsZSIsImZvdW5kRmllbGQiLCJwcm9wIiwiZm91bmRDaGFubmVsIiwidXBkYXRlTGF5ZXJDb25maWciLCJ2YWxpZGF0ZVZpc3VhbENoYW5uZWwiLCJ0eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjb2x1bW5zIiwibGFiZWwiLCJjb2xvciIsImlzVmlzaWJsZSIsImdldExheWVyQ29sdW1ucyIsInZpc0NvbmZpZyIsImNvcHlMYXllckNvbmZpZyIsInNoYWxsb3dDb3B5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBRUE7O0FBQ0E7O0FBRUE7Ozs7OztB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QUFHekJ0QixJQUFBQSxTQUFTLEVBQVRBO0FBSHlCLEdBQTNCO0FBTUEsU0FBT0ssUUFBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIwIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHVuaXEgZnJvbSAnbG9kYXNoLnVuaXEnO1xuaW1wb3J0IHBpY2sgZnJvbSAnbG9kYXNoLnBpY2snO1xuaW1wb3J0IGlzRXF1YWwgZnJvbSAnbG9kYXNoLmlzZXF1YWwnO1xuaW1wb3J0IGZsYXR0ZW5EZWVwIGZyb20gJ2xvZGFzaC5mbGF0dGVuZGVlcCc7XG5pbXBvcnQge3RvQXJyYXl9IGZyb20gJ3V0aWxzL3V0aWxzJztcblxuaW1wb3J0IHthcHBseUZpbHRlcnNUb0RhdGFzZXRzLCB2YWxpZGF0ZUZpbHRlcldpdGhEYXRhfSBmcm9tICd1dGlscy9maWx0ZXItdXRpbHMnO1xuXG5pbXBvcnQge2dldEluaXRpYWxNYXBMYXllcnNGb3JTcGxpdE1hcH0gZnJvbSAndXRpbHMvc3BsaXQtbWFwLXV0aWxzJztcbmltcG9ydCB7cmVzZXRGaWx0ZXJHcHVNb2RlLCBhc3NpZ25HcHVDaGFubmVsc30gZnJvbSAndXRpbHMvZ3B1LWZpbHRlci11dGlscyc7XG5cbmltcG9ydCB7TEFZRVJfQkxFTkRJTkdTfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5pbXBvcnQge21lcmdlRmlsdGVyRG9tYWluU3RlcH0gZnJvbSAnLi4vdXRpbHMvZmlsdGVyLXV0aWxzJztcblxuLyoqXG4gKiBNZXJnZSBsb2FkZWQgZmlsdGVycyB3aXRoIGN1cnJlbnQgc3RhdGUsIGlmIG5vIGZpZWxkcyBvciBkYXRhIGFyZSBsb2FkZWRcbiAqIHNhdmUgaXQgZm9yIGxhdGVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlXG4gKiBAcGFyYW0ge0FycmF5PE9iamVjdD59IGZpbHRlcnNUb01lcmdlXG4gKiBAcmV0dXJuIHtPYmplY3R9IHVwZGF0ZWRTdGF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VGaWx0ZXJzKHN0YXRlLCBmaWx0ZXJzVG9NZXJnZSkge1xuICBjb25zdCBtZXJnZWQgPSBbXTtcbiAgY29uc3QgdW5tZXJnZWQgPSBbXTtcbiAgY29uc3Qge2RhdGFzZXRzfSA9IHN0YXRlO1xuICBsZXQgdXBkYXRlZERhdGFzZXRzID0gZGF0YXNldHM7XG5cbiAgaWYgKCFBcnJheS5pc0FycmF5KGZpbHRlcnNUb01lcmdlKSB8fCAhZmlsdGVyc1RvTWVyZ2UubGVuZ3RoKSB7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgLy8gbWVyZ2UgZmlsdGVyc1xuICBmaWx0ZXJzVG9NZXJnZS5mb3JFYWNoKGZpbHRlciA9PiB7XG4gICAgLy8gd2UgY2FuIG9ubHkgbG9vayBmb3IgZGF0YXNldHMgZGVmaW5lIGluIHRoZSBmaWx0ZXIgZGF0YUlkXG4gICAgY29uc3QgZGF0YXNldElkcyA9IHRvQXJyYXkoZmlsdGVyLmRhdGFJZCk7XG5cbiAgICAvLyB3ZSBjYW4gbWVyZ2UgYSBmaWx0ZXIgb25seSBpZiBhbGwgZGF0YXNldHMgaW4gZmlsdGVyLmRhdGFJZCBhcmUgbG9hZGVkXG4gICAgaWYgKGRhdGFzZXRJZHMuZXZlcnkoZCA9PiBkYXRhc2V0c1tkXSkpIHtcbiAgICAgIC8vIGFsbCBkYXRhc2V0SWRzIGluIGZpbHRlciBtdXN0IGJlIHByZXNlbnQgdGhlIHN0YXRlIGRhdGFzZXRzXG4gICAgICBjb25zdCB7ZmlsdGVyOiB2YWxpZGF0ZWRGaWx0ZXIsIGFwcGx5VG9EYXRhc2V0cywgYXVnbWVudGVkRGF0YXNldHN9ID0gZGF0YXNldElkcy5yZWR1Y2UoXG4gICAgICAgIChhY2MsIGRhdGFzZXRJZCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGRhdGFzZXQgPSB1cGRhdGVkRGF0YXNldHNbZGF0YXNldElkXTtcbiAgICAgICAgICBjb25zdCBsYXllcnMgPSBzdGF0ZS5sYXllcnMuZmlsdGVyKGwgPT4gbC5jb25maWcuZGF0YUlkID09PSBkYXRhc2V0LmlkKTtcbiAgICAgICAgICBjb25zdCB7ZmlsdGVyOiB1cGRhdGVkRmlsdGVyLCBkYXRhc2V0OiB1cGRhdGVkRGF0YXNldH0gPSB2YWxpZGF0ZUZpbHRlcldpdGhEYXRhKFxuICAgICAgICAgICAgYWNjLmF1Z21lbnRlZERhdGFzZXRzW2RhdGFzZXRJZF0gfHwgZGF0YXNldCxcbiAgICAgICAgICAgIGZpbHRlcixcbiAgICAgICAgICAgIGxheWVyc1xuICAgICAgICAgICk7XG5cbiAgICAgICAgICBpZiAodXBkYXRlZEZpbHRlcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgLi4uYWNjLFxuICAgICAgICAgICAgICAvLyBtZXJnZSBmaWx0ZXIgcHJvcHNcbiAgICAgICAgICAgICAgZmlsdGVyOiBhY2MuZmlsdGVyXG4gICAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAgIC4uLmFjYy5maWx0ZXIsXG4gICAgICAgICAgICAgICAgICAgIC4uLm1lcmdlRmlsdGVyRG9tYWluU3RlcChhY2MsIHVwZGF0ZWRGaWx0ZXIpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgOiB1cGRhdGVkRmlsdGVyLFxuXG4gICAgICAgICAgICAgIGFwcGx5VG9EYXRhc2V0czogWy4uLmFjYy5hcHBseVRvRGF0YXNldHMsIGRhdGFzZXRJZF0sXG5cbiAgICAgICAgICAgICAgYXVnbWVudGVkRGF0YXNldHM6IHtcbiAgICAgICAgICAgICAgICAuLi5hY2MuYXVnbWVudGVkRGF0YXNldHMsXG4gICAgICAgICAgICAgICAgW2RhdGFzZXRJZF06IHVwZGF0ZWREYXRhc2V0XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGZpbHRlcjogbnVsbCxcbiAgICAgICAgICBhcHBseVRvRGF0YXNldHM6IFtdLFxuICAgICAgICAgIGF1Z21lbnRlZERhdGFzZXRzOiB7fVxuICAgICAgICB9XG4gICAgICApO1xuXG4gICAgICBpZiAodmFsaWRhdGVkRmlsdGVyICYmIGlzRXF1YWwoZGF0YXNldElkcywgYXBwbHlUb0RhdGFzZXRzKSkge1xuICAgICAgICBtZXJnZWQucHVzaCh2YWxpZGF0ZWRGaWx0ZXIpO1xuICAgICAgICB1cGRhdGVkRGF0YXNldHMgPSB7XG4gICAgICAgICAgLi4udXBkYXRlZERhdGFzZXRzLFxuICAgICAgICAgIC4uLmF1Z21lbnRlZERhdGFzZXRzXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHVubWVyZ2VkLnB1c2goZmlsdGVyKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIG1lcmdlIGZpbHRlciB3aXRoIGV4aXN0aW5nXG4gIGxldCB1cGRhdGVkRmlsdGVycyA9IFsuLi4oc3RhdGUuZmlsdGVycyB8fCBbXSksIC4uLm1lcmdlZF07XG4gIHVwZGF0ZWRGaWx0ZXJzID0gcmVzZXRGaWx0ZXJHcHVNb2RlKHVwZGF0ZWRGaWx0ZXJzKTtcbiAgdXBkYXRlZEZpbHRlcnMgPSBhc3NpZ25HcHVDaGFubmVscyh1cGRhdGVkRmlsdGVycyk7XG4gIC8vIGZpbHRlciBkYXRhXG4gIGNvbnN0IGRhdGFzZXRzVG9GaWx0ZXIgPSB1bmlxKGZsYXR0ZW5EZWVwKG1lcmdlZC5tYXAoZiA9PiBmLmRhdGFJZCkpKTtcblxuICBjb25zdCBmaWx0ZXJlZCA9IGFwcGx5RmlsdGVyc1RvRGF0YXNldHMoXG4gICAgZGF0YXNldHNUb0ZpbHRlcixcbiAgICB1cGRhdGVkRGF0YXNldHMsXG4gICAgdXBkYXRlZEZpbHRlcnMsXG4gICAgc3RhdGUubGF5ZXJzXG4gICk7XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZSxcbiAgICBmaWx0ZXJzOiB1cGRhdGVkRmlsdGVycyxcbiAgICBkYXRhc2V0czogZmlsdGVyZWQsXG4gICAgZmlsdGVyVG9CZU1lcmdlZDogdW5tZXJnZWRcbiAgfTtcbn1cblxuLyoqXG4gKiBNZXJnZSBsYXllcnMgZnJvbSBkZS1zZXJpYWxpemVkIHN0YXRlLCBpZiBubyBmaWVsZHMgb3IgZGF0YSBhcmUgbG9hZGVkXG4gKiBzYXZlIGl0IGZvciBsYXRlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZVxuICogQHBhcmFtIHtBcnJheTxPYmplY3Q+fSBsYXllcnNUb01lcmdlXG4gKiBAcmV0dXJuIHtPYmplY3R9IHN0YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZUxheWVycyhzdGF0ZSwgbGF5ZXJzVG9NZXJnZSkge1xuICBjb25zdCBtZXJnZWRMYXllciA9IFtdO1xuICBjb25zdCB1bm1lcmdlZCA9IFtdO1xuXG4gIGNvbnN0IHtkYXRhc2V0c30gPSBzdGF0ZTtcblxuICBpZiAoIUFycmF5LmlzQXJyYXkobGF5ZXJzVG9NZXJnZSkgfHwgIWxheWVyc1RvTWVyZ2UubGVuZ3RoKSB7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgbGF5ZXJzVG9NZXJnZS5mb3JFYWNoKGxheWVyID0+IHtcbiAgICBpZiAoZGF0YXNldHNbbGF5ZXIuY29uZmlnLmRhdGFJZF0pIHtcbiAgICAgIC8vIGRhdGFzZXRzIGFyZSBhbHJlYWR5IGxvYWRlZFxuICAgICAgY29uc3QgdmFsaWRhdGVMYXllciA9IHZhbGlkYXRlTGF5ZXJXaXRoRGF0YShcbiAgICAgICAgZGF0YXNldHNbbGF5ZXIuY29uZmlnLmRhdGFJZF0sXG4gICAgICAgIGxheWVyLFxuICAgICAgICBzdGF0ZS5sYXllckNsYXNzZXNcbiAgICAgICk7XG5cbiAgICAgIGlmICh2YWxpZGF0ZUxheWVyKSB7XG4gICAgICAgIG1lcmdlZExheWVyLnB1c2godmFsaWRhdGVMYXllcik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGRhdGFzZXRzIG5vdCB5ZXQgbG9hZGVkXG4gICAgICB1bm1lcmdlZC5wdXNoKGxheWVyKTtcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IGxheWVycyA9IFsuLi5zdGF0ZS5sYXllcnMsIC4uLm1lcmdlZExheWVyXTtcbiAgY29uc3QgbmV3TGF5ZXJPcmRlciA9IG1lcmdlZExheWVyLm1hcCgoXywgaSkgPT4gc3RhdGUubGF5ZXJzLmxlbmd0aCArIGkpO1xuXG4gIC8vIHB1dCBuZXcgbGF5ZXJzIGluIGZyb250IG9mIGN1cnJlbnQgbGF5ZXJzXG4gIGNvbnN0IGxheWVyT3JkZXIgPSBbLi4ubmV3TGF5ZXJPcmRlciwgLi4uc3RhdGUubGF5ZXJPcmRlcl07XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZSxcbiAgICBsYXllcnMsXG4gICAgbGF5ZXJPcmRlcixcbiAgICBsYXllclRvQmVNZXJnZWQ6IHVubWVyZ2VkXG4gIH07XG59XG5cbi8qKlxuICogTWVyZ2UgaW50ZXJhY3Rpb25zIHdpdGggc2F2ZWQgY29uZmlnXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gaW50ZXJhY3Rpb25Ub0JlTWVyZ2VkXG4gKiBAcmV0dXJuIHtPYmplY3R9IG1lcmdlZFN0YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZUludGVyYWN0aW9ucyhzdGF0ZSwgaW50ZXJhY3Rpb25Ub0JlTWVyZ2VkKSB7XG4gIGNvbnN0IG1lcmdlZCA9IHt9O1xuICBjb25zdCB1bm1lcmdlZCA9IHt9O1xuXG4gIGlmIChpbnRlcmFjdGlvblRvQmVNZXJnZWQpIHtcbiAgICBPYmplY3Qua2V5cyhpbnRlcmFjdGlvblRvQmVNZXJnZWQpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmICghc3RhdGUuaW50ZXJhY3Rpb25Db25maWdba2V5XSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGN1cnJlbnRDb25maWcgPSBzdGF0ZS5pbnRlcmFjdGlvbkNvbmZpZ1trZXldLmNvbmZpZztcblxuICAgICAgY29uc3Qge2VuYWJsZWQsIC4uLmNvbmZpZ1NhdmVkfSA9IGludGVyYWN0aW9uVG9CZU1lcmdlZFtrZXldIHx8IHt9O1xuICAgICAgbGV0IGNvbmZpZ1RvTWVyZ2UgPSBjb25maWdTYXZlZDtcblxuICAgICAgaWYgKGtleSA9PT0gJ3Rvb2x0aXAnKSB7XG4gICAgICAgIGNvbnN0IHttZXJnZWRUb29sdGlwLCB1bm1lcmdlZFRvb2x0aXB9ID0gbWVyZ2VJbnRlcmFjdGlvblRvb2x0aXBDb25maWcoc3RhdGUsIGNvbmZpZ1NhdmVkKTtcblxuICAgICAgICAvLyBtZXJnZSBuZXcgZGF0YXNldCB0b29sdGlwcyB3aXRoIG9yaWdpbmFsIGRhdGFzZXQgdG9vbHRpcHNcbiAgICAgICAgY29uZmlnVG9NZXJnZSA9IHtcbiAgICAgICAgICBmaWVsZHNUb1Nob3c6IHtcbiAgICAgICAgICAgIC4uLmN1cnJlbnRDb25maWcuZmllbGRzVG9TaG93LFxuICAgICAgICAgICAgLi4ubWVyZ2VkVG9vbHRpcFxuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoT2JqZWN0LmtleXModW5tZXJnZWRUb29sdGlwKS5sZW5ndGgpIHtcbiAgICAgICAgICB1bm1lcmdlZC50b29sdGlwID0ge2ZpZWxkc1RvU2hvdzogdW5tZXJnZWRUb29sdGlwLCBlbmFibGVkfTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBtZXJnZWRba2V5XSA9IHtcbiAgICAgICAgLi4uc3RhdGUuaW50ZXJhY3Rpb25Db25maWdba2V5XSxcbiAgICAgICAgZW5hYmxlZCxcbiAgICAgICAgLi4uKGN1cnJlbnRDb25maWdcbiAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgY29uZmlnOiBwaWNrKFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIC4uLmN1cnJlbnRDb25maWcsXG4gICAgICAgICAgICAgICAgICAuLi5jb25maWdUb01lcmdlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhjdXJyZW50Q29uZmlnKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgOiB7fSlcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIC4uLnN0YXRlLFxuICAgIGludGVyYWN0aW9uQ29uZmlnOiB7XG4gICAgICAuLi5zdGF0ZS5pbnRlcmFjdGlvbkNvbmZpZyxcbiAgICAgIC4uLm1lcmdlZFxuICAgIH0sXG4gICAgaW50ZXJhY3Rpb25Ub0JlTWVyZ2VkOiB1bm1lcmdlZFxuICB9O1xufVxuXG4vKipcbiAqIE1lcmdlIHNwbGl0TWFwcyBjb25maWcgd2l0aCBjdXJyZW50IHZpc1N0ZXRlLlxuICogMS4gaWYgY3VycmVudCBtYXAgaXMgc3BsaXQsIGJ1dCBzcGxpdE1hcCBET0VTTk9UIGNvbnRhaW4gbWFwc1xuICogICAgOiBkb24ndCBtZXJnZSBhbnl0aGluZ1xuICogMi4gaWYgY3VycmVudCBtYXAgaXMgTk9UIHNwbGl0LCBidXQgc3BsaXRNYXBzIGNvbnRhaW4gbWFwc1xuICogICAgOiBhZGQgdG8gc3BsaXRNYXBzLCBhbmQgYWRkIGN1cnJlbnQgbGF5ZXJzIHRvIHNwbGl0TWFwc1xuICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VTcGxpdE1hcHMoc3RhdGUsIHNwbGl0TWFwcyA9IFtdKSB7XG4gIGNvbnN0IG1lcmdlZCA9IFsuLi5zdGF0ZS5zcGxpdE1hcHNdO1xuICBjb25zdCB1bm1lcmdlZCA9IFtdO1xuICBzcGxpdE1hcHMuZm9yRWFjaCgoc20sIGkpID0+IHtcbiAgICBPYmplY3QuZW50cmllcyhzbS5sYXllcnMpLmZvckVhY2goKFtpZCwgdmFsdWVdKSA9PiB7XG4gICAgICAvLyBjaGVjayBpZiBsYXllciBleGlzdHNcbiAgICAgIGNvbnN0IHB1c2hUbyA9IHN0YXRlLmxheWVycy5maW5kKGwgPT4gbC5pZCA9PT0gaWQpID8gbWVyZ2VkIDogdW5tZXJnZWQ7XG5cbiAgICAgIC8vIGNyZWF0ZSBtYXAgcGFuZWwgaWYgY3VycmVudCBtYXAgaXMgbm90IHNwbGl0XG4gICAgICBwdXNoVG9baV0gPSBwdXNoVG9baV0gfHwge1xuICAgICAgICBsYXllcnM6IHB1c2hUbyA9PT0gbWVyZ2VkID8gZ2V0SW5pdGlhbE1hcExheWVyc0ZvclNwbGl0TWFwKHN0YXRlLmxheWVycykgOiBbXVxuICAgICAgfTtcbiAgICAgIHB1c2hUb1tpXS5sYXllcnMgPSB7XG4gICAgICAgIC4uLnB1c2hUb1tpXS5sYXllcnMsXG4gICAgICAgIFtpZF06IHZhbHVlXG4gICAgICB9O1xuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4ge1xuICAgIC4uLnN0YXRlLFxuICAgIHNwbGl0TWFwczogbWVyZ2VkLFxuICAgIHNwbGl0TWFwc1RvQmVNZXJnZWQ6IHVubWVyZ2VkXG4gIH07XG59XG5cbi8qKlxuICogTWVyZ2UgaW50ZXJhY3Rpb25Db25maWcudG9vbHRpcCB3aXRoIHNhdmVkIGNvbmZpZyxcbiAqIHZhbGlkYXRlIGZpZWxkc1RvU2hvd1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHRvb2x0aXBDb25maWdcbiAqIEByZXR1cm4ge09iamVjdH0gLSB7bWVyZ2VkVG9vbHRpcDoge30sIHVubWVyZ2VkVG9vbHRpcDoge319XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZUludGVyYWN0aW9uVG9vbHRpcENvbmZpZyhzdGF0ZSwgdG9vbHRpcENvbmZpZyA9IHt9KSB7XG4gIGNvbnN0IHVubWVyZ2VkVG9vbHRpcCA9IHt9O1xuICBjb25zdCBtZXJnZWRUb29sdGlwID0ge307XG5cbiAgaWYgKCF0b29sdGlwQ29uZmlnLmZpZWxkc1RvU2hvdyB8fCAhT2JqZWN0LmtleXModG9vbHRpcENvbmZpZy5maWVsZHNUb1Nob3cpLmxlbmd0aCkge1xuICAgIHJldHVybiB7bWVyZ2VkVG9vbHRpcCwgdW5tZXJnZWRUb29sdGlwfTtcbiAgfVxuXG4gIGZvciAoY29uc3QgZGF0YUlkIGluIHRvb2x0aXBDb25maWcuZmllbGRzVG9TaG93KSB7XG4gICAgaWYgKCFzdGF0ZS5kYXRhc2V0c1tkYXRhSWRdKSB7XG4gICAgICAvLyBpcyBub3QgeWV0IGxvYWRlZFxuICAgICAgdW5tZXJnZWRUb29sdGlwW2RhdGFJZF0gPSB0b29sdGlwQ29uZmlnLmZpZWxkc1RvU2hvd1tkYXRhSWRdO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpZiBkYXRhc2V0IGlzIGxvYWRlZFxuICAgICAgY29uc3QgYWxsRmllbGRzID0gc3RhdGUuZGF0YXNldHNbZGF0YUlkXS5maWVsZHMubWFwKGQgPT4gZC5uYW1lKTtcbiAgICAgIGNvbnN0IGZvdW5kRmllbGRzVG9TaG93ID0gdG9vbHRpcENvbmZpZy5maWVsZHNUb1Nob3dbZGF0YUlkXS5maWx0ZXIobmFtZSA9PlxuICAgICAgICBhbGxGaWVsZHMuaW5jbHVkZXMobmFtZSlcbiAgICAgICk7XG5cbiAgICAgIG1lcmdlZFRvb2x0aXBbZGF0YUlkXSA9IGZvdW5kRmllbGRzVG9TaG93O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7bWVyZ2VkVG9vbHRpcCwgdW5tZXJnZWRUb29sdGlwfTtcbn1cbi8qKlxuICogTWVyZ2UgbGF5ZXJCbGVuZGluZyB3aXRoIHNhdmVkXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHN0YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gbGF5ZXJCbGVuZGluZ1xuICogQHJldHVybiB7b2JqZWN0fSBtZXJnZWQgc3RhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlTGF5ZXJCbGVuZGluZyhzdGF0ZSwgbGF5ZXJCbGVuZGluZykge1xuICBpZiAobGF5ZXJCbGVuZGluZyAmJiBMQVlFUl9CTEVORElOR1NbbGF5ZXJCbGVuZGluZ10pIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBsYXllckJsZW5kaW5nXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBzdGF0ZTtcbn1cblxuLyoqXG4gKiBNZXJnZSBhbmltYXRpb24gY29uZmlnXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBhbmltYXRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlQW5pbWF0aW9uQ29uZmlnKHN0YXRlLCBhbmltYXRpb24pIHtcbiAgaWYgKGFuaW1hdGlvbiAmJiBhbmltYXRpb24uY3VycmVudFRpbWUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBhbmltYXRpb25Db25maWc6IHtcbiAgICAgICAgLi4uc3RhdGUuYW5pbWF0aW9uQ29uZmlnLFxuICAgICAgICAuLi5hbmltYXRpb24sXG4gICAgICAgIGRvbWFpbjogbnVsbFxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICByZXR1cm4gc3RhdGU7XG59XG5cbi8qKlxuICogVmFsaWRhdGUgc2F2ZWQgbGF5ZXIgY29sdW1ucyB3aXRoIG5ldyBkYXRhLFxuICogdXBkYXRlIGZpZWxkSWR4IGJhc2VkIG9uIG5ldyBmaWVsZHNcbiAqXG4gKiBAcGFyYW0ge0FycmF5PE9iamVjdD59IGZpZWxkc1xuICogQHBhcmFtIHtPYmplY3R9IHNhdmVkQ29sc1xuICogQHBhcmFtIHtPYmplY3R9IGVtcHR5Q29sc1xuICogQHJldHVybiB7bnVsbCB8IE9iamVjdH0gLSB2YWxpZGF0ZWQgY29sdW1ucyBvciBudWxsXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlU2F2ZWRMYXllckNvbHVtbnMoZmllbGRzLCBzYXZlZENvbHMsIGVtcHR5Q29scykge1xuICBjb25zdCBjb2xGb3VuZCA9IHt9O1xuICAvLyBmaW5kIGFjdHVhbCBjb2x1bW4gZmllbGRJZHgsIGluIGNhc2UgaXQgaGFzIGNoYW5nZWRcbiAgY29uc3QgYWxsQ29sRm91bmQgPSBPYmplY3Qua2V5cyhlbXB0eUNvbHMpLmV2ZXJ5KGtleSA9PiB7XG4gICAgY29uc3Qgc2F2ZWQgPSBzYXZlZENvbHNba2V5XTtcbiAgICBjb2xGb3VuZFtrZXldID0gey4uLmVtcHR5Q29sc1trZXldfTtcblxuICAgIC8vIFRPRE86IHJlcGxhY2Ugd2l0aCBuZXcgYXBwcm9hY2hcbiAgICBjb25zdCBmaWVsZElkeCA9IGZpZWxkcy5maW5kSW5kZXgoKHtuYW1lfSkgPT4gbmFtZSA9PT0gc2F2ZWQpO1xuXG4gICAgaWYgKGZpZWxkSWR4ID4gLTEpIHtcbiAgICAgIC8vIHVwZGF0ZSBmb3VuZCBjb2x1bW5zXG4gICAgICBjb2xGb3VuZFtrZXldLmZpZWxkSWR4ID0gZmllbGRJZHg7XG4gICAgICBjb2xGb3VuZFtrZXldLnZhbHVlID0gc2F2ZWQ7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBpZiBjb2wgaXMgb3B0aW9uYWwsIGFsbG93IG51bGwgdmFsdWVcbiAgICByZXR1cm4gZW1wdHlDb2xzW2tleV0ub3B0aW9uYWwgfHwgZmFsc2U7XG4gIH0pO1xuXG4gIHJldHVybiBhbGxDb2xGb3VuZCAmJiBjb2xGb3VuZDtcbn1cblxuLyoqXG4gKiBWYWxpZGF0ZSBzYXZlZCB0ZXh0IGxhYmVsIGNvbmZpZyB3aXRoIG5ldyBkYXRhXG4gKiByZWZlciB0byB2aXMtc3RhdGUtc2NoZW1hLmpzIFRleHRMYWJlbFNjaGVtYVYxXG4gKlxuICogQHBhcmFtIHtBcnJheTxPYmplY3Q+fSBmaWVsZHNcbiAqIEBwYXJhbSB7T2JqZWN0fSBzYXZlZFRleHRMYWJlbFxuICogQHJldHVybiB7T2JqZWN0fSAtIHZhbGlkYXRlZCB0ZXh0bGFiZWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlU2F2ZWRUZXh0TGFiZWwoZmllbGRzLCBbbGF5ZXJUZXh0TGFiZWxdLCBzYXZlZFRleHRMYWJlbCkge1xuICBjb25zdCBzYXZlZFRleHRMYWJlbHMgPSBBcnJheS5pc0FycmF5KHNhdmVkVGV4dExhYmVsKSA/IHNhdmVkVGV4dExhYmVsIDogW3NhdmVkVGV4dExhYmVsXTtcblxuICAvLyB2YWxpZGF0ZSBmaWVsZFxuICByZXR1cm4gc2F2ZWRUZXh0TGFiZWxzLm1hcCh0ZXh0TGFiZWwgPT4ge1xuICAgIGNvbnN0IGZpZWxkID0gdGV4dExhYmVsLmZpZWxkXG4gICAgICA/IGZpZWxkcy5maW5kKGZkID0+XG4gICAgICAgICAgT2JqZWN0LmtleXModGV4dExhYmVsLmZpZWxkKS5ldmVyeShrZXkgPT4gdGV4dExhYmVsLmZpZWxkW2tleV0gPT09IGZkW2tleV0pXG4gICAgICAgIClcbiAgICAgIDogbnVsbDtcblxuICAgIHJldHVybiBPYmplY3Qua2V5cyhsYXllclRleHRMYWJlbCkucmVkdWNlKFxuICAgICAgKGFjY3UsIGtleSkgPT4gKHtcbiAgICAgICAgLi4uYWNjdSxcbiAgICAgICAgW2tleV06IGtleSA9PT0gJ2ZpZWxkJyA/IGZpZWxkIDogdGV4dExhYmVsW2tleV0gfHwgbGF5ZXJUZXh0TGFiZWxba2V5XVxuICAgICAgfSksXG4gICAgICB7fVxuICAgICk7XG4gIH0pO1xufVxuXG4vKipcbiAqIFZhbGlkYXRlIHNhdmVkIHZpc3VhbCBjaGFubmVscyBjb25maWcgd2l0aCBuZXcgZGF0YSxcbiAqIHJlZmVyIHRvIHZpcy1zdGF0ZS1zY2hlbWEuanMgVmlzdWFsQ2hhbm5lbFNjaGVtYVYxXG4gKlxuICogQHBhcmFtIHtBcnJheTxPYmplY3Q+fSBmaWVsZHNcbiAqIEBwYXJhbSB7T2JqZWN0fSBuZXdMYXllclxuICogQHBhcmFtIHtPYmplY3R9IHNhdmVkTGF5ZXJcbiAqIEByZXR1cm4ge09iamVjdH0gLSBuZXdMYXllclxuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVTYXZlZFZpc3VhbENoYW5uZWxzKGZpZWxkcywgbmV3TGF5ZXIsIHNhdmVkTGF5ZXIpIHtcbiAgT2JqZWN0LnZhbHVlcyhuZXdMYXllci52aXN1YWxDaGFubmVscykuZm9yRWFjaCgoe2ZpZWxkLCBzY2FsZSwga2V5fSkgPT4ge1xuICAgIGxldCBmb3VuZEZpZWxkO1xuICAgIGlmIChzYXZlZExheWVyLmNvbmZpZ1tmaWVsZF0pIHtcbiAgICAgIGZvdW5kRmllbGQgPSBmaWVsZHMuZmluZChmZCA9PlxuICAgICAgICBPYmplY3Qua2V5cyhzYXZlZExheWVyLmNvbmZpZ1tmaWVsZF0pLmV2ZXJ5KFxuICAgICAgICAgIHByb3AgPT4gc2F2ZWRMYXllci5jb25maWdbZmllbGRdW3Byb3BdID09PSBmZFtwcm9wXVxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IGZvdW5kQ2hhbm5lbCA9IHtcbiAgICAgIC4uLihmb3VuZEZpZWxkID8ge1tmaWVsZF06IGZvdW5kRmllbGR9IDoge30pLFxuICAgICAgLi4uKHNhdmVkTGF5ZXIuY29uZmlnW3NjYWxlXSA/IHtbc2NhbGVdOiBzYXZlZExheWVyLmNvbmZpZ1tzY2FsZV19IDoge30pXG4gICAgfTtcbiAgICBpZiAoT2JqZWN0LmtleXMoZm91bmRDaGFubmVsKS5sZW5ndGgpIHtcbiAgICAgIG5ld0xheWVyLnVwZGF0ZUxheWVyQ29uZmlnKGZvdW5kQ2hhbm5lbCk7XG4gICAgICBuZXdMYXllci52YWxpZGF0ZVZpc3VhbENoYW5uZWwoa2V5KTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gbmV3TGF5ZXI7XG59XG5cbi8qKlxuICogVmFsaWRhdGUgc2F2ZWQgbGF5ZXIgY29uZmlnIHdpdGggbmV3IGRhdGEsXG4gKiB1cGRhdGUgZmllbGRJZHggYmFzZWQgb24gbmV3IGZpZWxkc1xuICpcbiAqIEBwYXJhbSB7QXJyYXk8T2JqZWN0Pn0gZmllbGRzXG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0YUlkXG4gKiBAcGFyYW0ge09iamVjdH0gc2F2ZWRMYXllclxuICogQHBhcmFtIHtPYmplY3R9IGxheWVyQ2xhc3Nlc1xuICogQHJldHVybiB7bnVsbCB8IE9iamVjdH0gLSB2YWxpZGF0ZWQgbGF5ZXIgb3IgbnVsbFxuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVMYXllcldpdGhEYXRhKHtmaWVsZHMsIGlkOiBkYXRhSWR9LCBzYXZlZExheWVyLCBsYXllckNsYXNzZXMpIHtcbiAgY29uc3Qge3R5cGV9ID0gc2F2ZWRMYXllcjtcbiAgLy8gbGF5ZXIgZG9lc250IGhhdmUgYSB2YWxpZCB0eXBlXG4gIGlmICghbGF5ZXJDbGFzc2VzLmhhc093blByb3BlcnR5KHR5cGUpIHx8ICFzYXZlZExheWVyLmNvbmZpZyB8fCAhc2F2ZWRMYXllci5jb25maWcuY29sdW1ucykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgbGV0IG5ld0xheWVyID0gbmV3IGxheWVyQ2xhc3Nlc1t0eXBlXSh7XG4gICAgaWQ6IHNhdmVkTGF5ZXIuaWQsXG4gICAgZGF0YUlkLFxuICAgIGxhYmVsOiBzYXZlZExheWVyLmNvbmZpZy5sYWJlbCxcbiAgICBjb2xvcjogc2F2ZWRMYXllci5jb25maWcuY29sb3IsXG4gICAgaXNWaXNpYmxlOiBzYXZlZExheWVyLmNvbmZpZy5pc1Zpc2libGVcbiAgfSk7XG5cbiAgLy8gZmluZCBjb2x1bW4gZmllbGRJZHhcbiAgY29uc3QgY29sdW1ucyA9IHZhbGlkYXRlU2F2ZWRMYXllckNvbHVtbnMoXG4gICAgZmllbGRzLFxuICAgIHNhdmVkTGF5ZXIuY29uZmlnLmNvbHVtbnMsXG4gICAgbmV3TGF5ZXIuZ2V0TGF5ZXJDb2x1bW5zKClcbiAgKTtcblxuICBpZiAoIWNvbHVtbnMpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIHZpc3VhbCBjaGFubmVsIGZpZWxkIGlzIHNhdmVkIHRvIGJlIHtuYW1lLCB0eXBlfVxuICAvLyBmaW5kIHZpc3VhbCBjaGFubmVsIGZpZWxkIGJ5IG1hdGNoaW5nIGJvdGggbmFtZSBhbmQgdHlwZVxuICAvLyByZWZlciB0byB2aXMtc3RhdGUtc2NoZW1hLmpzIFZpc3VhbENoYW5uZWxTY2hlbWFWMVxuICBuZXdMYXllciA9IHZhbGlkYXRlU2F2ZWRWaXN1YWxDaGFubmVscyhmaWVsZHMsIG5ld0xheWVyLCBzYXZlZExheWVyKTtcblxuICBjb25zdCB0ZXh0TGFiZWwgPVxuICAgIHNhdmVkTGF5ZXIuY29uZmlnLnRleHRMYWJlbCAmJiBuZXdMYXllci5jb25maWcudGV4dExhYmVsXG4gICAgICA/IHZhbGlkYXRlU2F2ZWRUZXh0TGFiZWwoZmllbGRzLCBuZXdMYXllci5jb25maWcudGV4dExhYmVsLCBzYXZlZExheWVyLmNvbmZpZy50ZXh0TGFiZWwpXG4gICAgICA6IG5ld0xheWVyLmNvbmZpZy50ZXh0TGFiZWw7XG5cbiAgLy8gY29weSB2aXNDb25maWcgb3ZlciB0byBlbXB0eUxheWVyIHRvIG1ha2Ugc3VyZSBpdCBoYXMgYWxsIHRoZSBwcm9wc1xuICBjb25zdCB2aXNDb25maWcgPSBuZXdMYXllci5jb3B5TGF5ZXJDb25maWcoXG4gICAgbmV3TGF5ZXIuY29uZmlnLnZpc0NvbmZpZyxcbiAgICBzYXZlZExheWVyLmNvbmZpZy52aXNDb25maWcgfHwge30sXG4gICAge3NoYWxsb3dDb3B5OiBbJ2NvbG9yUmFuZ2UnLCAnc3Ryb2tlQ29sb3JSYW5nZSddfVxuICApO1xuXG4gIG5ld0xheWVyLnVwZGF0ZUxheWVyQ29uZmlnKHtcbiAgICBjb2x1bW5zLFxuICAgIHZpc0NvbmZpZyxcbiAgICB0ZXh0TGFiZWxcbiAgfSk7XG5cbiAgcmV0dXJuIG5ld0xheWVyO1xufVxuIl19