"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.layerConfigChange = layerConfigChange;
exports.layerTextLabelChange = layerTextLabelChange;
exports.layerTypeChange = layerTypeChange;
exports.layerVisualChannelConfigChange = layerVisualChannelConfigChange;
exports.layerVisConfigChange = layerVisConfigChange;
exports.layerColorUIChange = layerColorUIChange;
exports.updateLayerBlending = updateLayerBlending;
exports.interactionConfigChange = interactionConfigChange;
exports.setFilter = setFilter;
exports.addFilter = addFilter;
exports.addLayer = addLayer;
exports.reorderLayer = reorderLayer;
exports.removeFilter = removeFilter;
exports.removeLayer = removeLayer;
exports.removeDataset = removeDataset;
exports.showDatasetTable = showDatasetTable;
exports.sortTableColumn = sortTableColumn;
exports.pinTableColumn = pinTableColumn;
exports.copyTableColumn = copyTableColumn;
exports.updateVisData = updateVisData;
exports.toggleFilterAnimation = toggleFilterAnimation;
exports.updateFilterAnimationSpeed = updateFilterAnimationSpeed;
exports.updateAnimationTime = updateAnimationTime;
exports.updateLayerAnimationSpeed = updateLayerAnimationSpeed;
exports.enlargeFilter = enlargeFilter;
exports.toggleFilterFeature = toggleFilterFeature;
exports.onLayerHover = onLayerHover;
exports.onLayerClick = onLayerClick;
exports.onMapClick = onMapClick;
exports.onMouseMove = onMouseMove;
exports.toggleLayerForMap = toggleLayerForMap;
exports.setFilterPlot = setFilterPlot;
exports.setMapInfo = setMapInfo;
exports.loadFiles = loadFiles;
exports.loadNextFile = loadNextFile;
exports.loadFileSuccess = loadFileSuccess;
exports.loadFilesErr = loadFilesErr;
exports.setFeatures = setFeatures;
exports.setPolygonFilterLayer = setPolygonFilterLayer;
exports.setSelectedFeature = setSelectedFeature;
exports.deleteFeature = deleteFeature;
exports.setEditorMode = setEditorMode;
exports.applyCPUFilter = applyCPUFilter;
exports.toggleEditorVisibility = toggleEditorVisibility;

var _actionTypes = _interopRequireDefault(require("../constants/action-types"));

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
// vis-state-reducer

/**
 * Update layer base config: dataId, label, column, isVisible
 * @memberof visStateActions
 * @param {Object} oldLayer - layer to be updated
 * @param {Object} newConfig - new config
 * @returns {{type: ActionTypes.LAYER_CONFIG_CHANGE, oldLayer: oldLayer, newConfig: newConfig}}
 * @public
 */
function layerConfigChange(oldLayer, newConfig) {
  return {
    type: _actionTypes["default"].LAYER_CONFIG_CHANGE,
    oldLayer: oldLayer,
    newConfig: newConfig
  };
}
/**
 * Update layer text label
 * @memberof visStateActions
 * @param {Object} oldLayer - layer to be updated
 * @param {Number} idx -`idx` of text label to be updated
 * @param {string} prop - `prop` of text label, e,g, `anchor`, `alignment`, `color`, `size`, `field`
 * @param {*} value - new value
 * @returns {{type: ActionTypes.LAYER_TEXT_LABEL_CHANGE, oldLayer: oldLayer, idx: idx, prop: prop, value:}}
 * @public
 */


function layerTextLabelChange(oldLayer, idx, prop, value) {
  return {
    type: _actionTypes["default"].LAYER_TEXT_LABEL_CHANGE,
    oldLayer: oldLayer,
    idx: idx,
    prop: prop,
    value: value
  };
}
/**
 * Update layer type. Previews layer config will be copied if applicable.
 * @memberof visStateActions
 * @param {Object} oldLayer - layer to be updated
 * @param {string} newType - new type
 * @returns {{type: ActionTypes.LAYER_TYPE_CHANGE, oldLayer: oldLayer, newType: newType}}
 * @public
 */


function layerTypeChange(oldLayer, newType) {
  return {
    type: _actionTypes["default"].LAYER_TYPE_CHANGE,
    oldLayer: oldLayer,
    newType: newType
  };
}
/**
 * Update layer visual channel
 * @memberof visStateActions
 * @param {Object} oldLayer - layer to be updated
 * @param {Object} newConfig - new visual channel config
 * @param {string} channel - channel to be updated
 * @returns {{type: ActionTypes.LAYER_VISUAL_CHANNEL_CHANGE, oldLayer: oldLayer, newConfig: newConfig, channel: channel}}
 * @public
 */


function layerVisualChannelConfigChange(oldLayer, newConfig, channel) {
  return {
    type: _actionTypes["default"].LAYER_VISUAL_CHANNEL_CHANGE,
    oldLayer: oldLayer,
    newConfig: newConfig,
    channel: channel
  };
}
/**
 * Update layer `visConfig`
 * @memberof visStateActions
 * @param {Object} oldLayer - layer to be updated
 * @param {Object} newVisConfig - new visConfig as a key value map: e.g. `{opacity: 0.8}`
 * @returns {{type: ActionTypes.LAYER_VIS_CONFIG_CHANGE, oldLayer: oldLayer, newVisConfig: newVisConfig}}
 * @public
 */


function layerVisConfigChange(oldLayer, newVisConfig) {
  return {
    type: _actionTypes["default"].LAYER_VIS_CONFIG_CHANGE,
    oldLayer: oldLayer,
    newVisConfig: newVisConfig
  };
}
/**
 * Set the color palette ui for layer color
 * @memberOf visStateActions
 * @param {Object} oldLayer - layer to be updated
 * @param {String} prop - which color prop
 * @param {object} newConfig - to be merged
 * @public
 */


function layerColorUIChange(oldLayer, prop, newConfig) {
  return {
    type: _actionTypes["default"].LAYER_COLOR_UI_CHANGE,
    oldLayer: oldLayer,
    prop: prop,
    newConfig: newConfig
  };
}
/**
 * Update layer blending mode
 * @memberof visStateActions
 * @param {string} mode one of `additive`, `normal` and `subtractive`
 * @returns {{type: ActionTypes.UPDATE_LAYER_BLENDING, mode: mode}}
 * @public
 */


function updateLayerBlending(mode) {
  return {
    type: _actionTypes["default"].UPDATE_LAYER_BLENDING,
    mode: mode
  };
}
/**
 * Update `interactionConfig`
 * @memberof visStateActions
 * @param {Object} config - new config as key value map: `{tooltip: {enabled: true}}`
 * @returns {{type: ActionTypes.INTERACTION_CONFIG_CHANGE, config: config}}
 * @public
 */


function interactionConfigChange(config) {
  return {
    type: _actionTypes["default"].INTERACTION_CONFIG_CHANGE,
    config: config
  };
}
/**
 * Update filter property
 * @memberof visStateActions
 * @param {Number} idx -`idx` of filter to be updated
 * @param {string} prop - `prop` of filter, e,g, `dataId`, `name`, `value`
 * @param {*} value - new value
 * @param {Number} valueIndex - array properties like dataset require index in order to improve performance
 * @returns {{type: ActionTypes.SET_FILTER, idx: idx, prop: prop, value: value}}
 * @public
 */


function setFilter(idx, prop, value, valueIndex) {
  return {
    type: _actionTypes["default"].SET_FILTER,
    idx: idx,
    prop: prop,
    value: value,
    valueIndex: valueIndex
  };
}
/**
 * Add a new filter
 * @memberof visStateActions
 * @param {string} dataId - dataset `id` this new filter is associated with
 * @returns {{type: ActionTypes.ADD_FILTER, dataId: dataId}}
 * @public
 */


function addFilter(dataId) {
  return {
    type: _actionTypes["default"].ADD_FILTER,
    dataId: dataId
  };
}
/**
 * Add a new layer
 * @memberof visStateActions
 * @param {Object} props - new layer props
 * @returns {{type: ActionTypes.ADD_LAYER, props: props}}
 * @public
 */


function addLayer(props) {
  return {
    type: _actionTypes["default"].ADD_LAYER,
    props: props
  };
}
/**
 * Reorder layer, order is an array of layer indexes, index 0 will be the one at the bottom
 * @memberof visStateActions
 * @param {Array<Number>} order an array of layer indexes
 * @returns {{type: ActionTypes.REORDER_LAYER, order: order}}
 * @public
 * @example
 *
 * // bring `layers[1]` below `layers[0]`, the sequence layers will be rendered is `1`, `0`, `2`, `3`.
 * // `1` will be at the bottom, `3` will be at the top.
 * this.props.dispatch(reorderLayer([1, 0, 2, 3]));
 */


function reorderLayer(order) {
  return {
    type: _actionTypes["default"].REORDER_LAYER,
    order: order
  };
}
/**
 * Remove a filter from `visState.filters`, once a filter is removed, data will be re-filtered and layer will be updated
 * @memberof visStateActions
 * @param {Number} idx idx of filter to be removed
 * @returns {{type: ActionTypes.REMOVE_FILTER, idx: idx}}
 * @public
 */


function removeFilter(idx) {
  return {
    type: _actionTypes["default"].REMOVE_FILTER,
    idx: idx
  };
}
/**
 * Remove a layer
 * @memberof visStateActions
 * @param {Number} idx idx of layer to be removed
 * @returns {{type: ActionTypes.REMOVE_LAYER, idx: idx}}
 * @public
 */


function removeLayer(idx) {
  return {
    type: _actionTypes["default"].REMOVE_LAYER,
    idx: idx
  };
}
/**
 * Remove a dataset and all layers, filters, tooltip configs that based on it
 * @memberof visStateActions
 * @param {string} key dataset id
 * @returns {{type: ActionTypes.REMOVE_DATASET, key: key}}
 * @public
 */


function removeDataset(key) {
  return {
    type: _actionTypes["default"].REMOVE_DATASET,
    key: key
  };
}
/**
 * Display dataset table in a modal
 * @memberof visStateActions
 * @param {string} dataId dataset id to show in table
 * @returns {{type: ActionTypes.SHOW_DATASET_TABLE, dataId: dataId}}
 * @public
 */


function showDatasetTable(dataId) {
  return {
    type: _actionTypes["default"].SHOW_DATASET_TABLE,
    dataId: dataId
  };
}
/**
 * Sort dataset column, for table display
 * @param {string} dataId
 * @param {string} column
 * @param {string} mode
 */


function sortTableColumn(dataId, column, mode) {
  return {
    type: _actionTypes["default"].SORT_TABLE_COLUMN,
    dataId: dataId,
    column: column,
    mode: mode
  };
}
/**
 * Pin dataset column, for table display
 * @param {string} dataId
 * @param {string} column
 */


function pinTableColumn(dataId, column) {
  return {
    type: _actionTypes["default"].PIN_TABLE_COLUMN,
    dataId: dataId,
    column: column
  };
}
/**
 * Copy column, for table display
 * @param {string} dataId
 * @param {string} column
 */


function copyTableColumn(dataId, column) {
  return {
    type: _actionTypes["default"].COPY_TABLE_COLUMN,
    dataId: dataId,
    column: column
  };
}
/**
 * Add new dataset to `visState`, with option to load a map config along with the datasets
 * @memberof visStateActions
 * @param {Array<Object>|Object} datasets - ***required** datasets can be a dataset or an array of datasets
 * Each dataset object needs to have `info` and `data` property.
 * @param {Object} datasets.info -info of a dataset
 * @param {string} datasets.info.id - id of this dataset. If config is defined, `id` should matches the `dataId` in config.
 * @param {string} datasets.info.label - A display name of this dataset
 * @param {Object} datasets.data - ***required** The data object, in a tabular format with 2 properties `fields` and `rows`
 * @param {Array<Object>} datasets.data.fields - ***required** Array of fields,
 * @param {string} datasets.data.fields.name - ***required** Name of the field,
 * @param {Array<Array>} datasets.data.rows - ***required** Array of rows, in a tabular format with `fields` and `rows`

 * @param {Object} options
 * @param {boolean} options.centerMap `default: true` if `centerMap` is set to `true` kepler.gl will
 * place the map view within the data points boundaries
 * @param {boolean} options.readOnly `default: false` if `readOnly` is set to `true`
 * the left setting panel will be hidden
 * @param {Object} config this object will contain the full kepler.gl instance configuration {mapState, mapStyle, visState}
 * @returns {{type: ActionTypes.UPDATE_VIS_DATA, datasets: datasets, options: options, config: config}}
 * @public
 */


function updateVisData(datasets, options, config) {
  return {
    type: _actionTypes["default"].UPDATE_VIS_DATA,
    datasets: datasets,
    options: options,
    config: config
  };
}
/**
 * Start and end filter animation
 * @memberof visStateActions
 * @param {Number} idx - idx of filter
 * @returns {{type: ActionTypes.TOGGLE_FILTER_ANIMATION, idx: idx}}
 * @public
 */


function toggleFilterAnimation(idx) {
  return {
    type: _actionTypes["default"].TOGGLE_FILTER_ANIMATION,
    idx: idx
  };
}
/**
 * Change filter animation speed
 * @memberof visStateActions
 * @param {Number} idx -  `idx` of filter
 * @param {Number} speed - `speed` to change it to. `speed` is a multiplier
 * @returns {{type: ActionTypes.UPDATE_FILTER_ANIMATION_SPEED, idx: idx, speed: speed}}
 * @public
 */


function updateFilterAnimationSpeed(idx, speed) {
  return {
    type: _actionTypes["default"].UPDATE_FILTER_ANIMATION_SPEED,
    idx: idx,
    speed: speed
  };
}
/**
 * Reset animation
 * @memberof visStateActions
 * @param {Number} value -  Current value of the slider
 * @returns {{type: ActionTypes.UPDATE_ANIMATION_TIME, value: value}}
 * @public
 */


function updateAnimationTime(value) {
  return {
    type: _actionTypes["default"].UPDATE_ANIMATION_TIME,
    value: value
  };
}
/**
 * update trip layer animation speed
 * @memberof visStateActions
 * @param {Number} speed - `speed` to change it to. `speed` is a multiplier
 * @returns {{type: ActionTypes.UPDATE_LAYER_ANIMATION_SPEED, speed: speed}}
 * @public
 */


function updateLayerAnimationSpeed(speed) {
  return {
    type: _actionTypes["default"].UPDATE_LAYER_ANIMATION_SPEED,
    speed: speed
  };
}
/**
 * Show larger time filter at bottom for time playback (apply to time filter only)
 * @memberof visStateActions
 * @param {Number} idx - index of filter to enlarge
 * @returns {{type: ActionTypes.ENLARGE_FILTER, idx: idx}}
 * @public
 */


function enlargeFilter(idx) {
  return {
    type: _actionTypes["default"].ENLARGE_FILTER,
    idx: idx
  };
}
/**
 * Show/hide filter feature on map
 * @memberof visStateActions
 * @param {Number} idx - index of filter feature to show/hide
 * @return {{type: ActionTypes.TOGGLE_FILTER_FEATURE, idx: idx}}
 */


function toggleFilterFeature(idx) {
  return {
    type: _actionTypes["default"].TOGGLE_FILTER_FEATURE,
    idx: idx
  };
}
/**
 * Trigger layer hover event with hovered object
 * @memberof visStateActions
 * @param {Object} info - Object hovered, returned by deck.gl
 * @returns {{type: ActionTypes.LAYER_HOVER, info: info}}
 * @public
 */


function onLayerHover(info) {
  return {
    type: _actionTypes["default"].LAYER_HOVER,
    info: info
  };
}
/**
 * Trigger layer click event with clicked object
 * @memberof visStateActions
 * @param {Object} info - Object clicked, returned by deck.gl
 * @returns {{type: ActionTypes.LAYER_CLICK, info: info}}
 * @public
 */


function onLayerClick(info) {
  return {
    type: _actionTypes["default"].LAYER_CLICK,
    info: info
  };
}
/**
 * Trigger map click event, unselect clicked object
 * @memberof visStateActions
 * @returns {{type: ActionTypes.MAP_CLICK}}
 * @public
 */


function onMapClick() {
  return {
    type: _actionTypes["default"].MAP_CLICK
  };
}
/**
 * Trigger map mouse moveevent, payload would be
 * React-map-gl PointerEvent
 * https://uber.github.io/react-map-gl/#/documentation/api-reference/pointer-event
 *
 * @memberof visStateActions
 * @param {Object} evt - PointerEvent
 * @returns {{type: ActionTypes.MAP_CLICK}}
 * @public
 */


function onMouseMove(evt) {
  return {
    type: _actionTypes["default"].MOUSE_MOVE,
    evt: evt
  };
}
/**
 * Toggle visibility of a layer in a split map
 * @memberof visStateActions
 * @param {Number} mapIndex - index of the split map
 * @param {string} layerId - id of the layer
 * @returns {{type: ActionTypes.TOGGLE_LAYER_FOR_MAP, mapIndex: *, layerId: *}}
 * @public
 */


function toggleLayerForMap(mapIndex, layerId) {
  return {
    type: _actionTypes["default"].TOGGLE_LAYER_FOR_MAP,
    mapIndex: mapIndex,
    layerId: layerId
  };
}
/**
 * Set the property of a filter plot
 * @memberof visStateActions
 * @param {Number} idx
 * @param {Object} newProp key value mapping of new prop `{yAxis: 'histogram'}`
 * @returns {{type: ActionTypes.SET_FILTER_PLOT, idx: *, newProp: *}}
 * @public
 */


function setFilterPlot(idx, newProp) {
  return {
    type: _actionTypes["default"].SET_FILTER_PLOT,
    idx: idx,
    newProp: newProp
  };
}
/**
 * Set the property of a filter plot
 * @memberof visStateActions
 * @param {Number} idx
 * @param {Object} newProp key value mapping of new prop `{yAxis: 'histogram'}`
 * @returns {{type: ActionTypes.SET_FILTER_PLOT, idx: *, newProp: *}}
 * @public
 */


function setMapInfo(info) {
  return {
    type: _actionTypes["default"].SET_MAP_INFO,
    info: info
  };
}
/**
 * Trigger file loading dispatch `addDataToMap` if succeed, or `loadFilesErr` if failed
 * @memberof visStateActions
 * @param {Array<Object>} files array of fileblob
 * @returns {{type: ActionTypes.LOAD_FILES, files: *}}
 * @public
 */


function loadFiles(files) {
  return {
    type: _actionTypes["default"].LOAD_FILES,
    files: files
  };
}
/**
 * called with next file to load
 * @param {object} payload
 * @param {Array<object>} payload.fileCache
 * @param {Array<object>} payload.filesToLoad
 * @param {number} payload.totalCount
 * @param {Function} payload.onFinish - action creator to execute when all files are loaded
 */


function loadNextFile(_ref) {
  var fileCache = _ref.fileCache,
      filesToLoad = _ref.filesToLoad,
      totalCount = _ref.totalCount,
      onFinish = _ref.onFinish;
  return {
    type: _actionTypes["default"].LOAD_NEXT_FILE,
    fileCache: fileCache,
    filesToLoad: filesToLoad,
    totalCount: totalCount,
    onFinish: onFinish
  };
}
/**
 * called when all files are processed and loaded
 * @param {Array<object>} result
 */


function loadFileSuccess(result) {
  return {
    type: _actionTypes["default"].LOAD_FILES_SUCCESS,
    result: result
  };
}
/**
 * Trigger loading file error
 * @memberof visStateActions
 * @param {*} error
 * @returns {{type: ActionTypes.LOAD_FILES_ERR, error: Object}}
 * @public
 */


function loadFilesErr(error) {
  return {
    type: _actionTypes["default"].LOAD_FILES_ERR,
    error: error
  };
}
/**
 * Store features to state
 * @memberof visStateActions
 * @param {Array<Object>} features
 * @returns {{type: ActionTypes.SET_FEATURES, features: Object}}
 */


function setFeatures(features) {
  return {
    type: _actionTypes["default"].SET_FEATURES,
    features: features
  };
}
/**
 * It will apply the provide feature as filter to the given layer.
 * If the given feature is already applied as filter to the layer, it will remove the layer from the filter
 * @memberof visStateActions
 * @param {Object} layer
 * @param {Object} feature
 * @return {{feature: *, type: ActionTypes.SET_POLYGON_FILTER_LAYER, layer: *}}
 */


function setPolygonFilterLayer(layer, feature) {
  return {
    type: _actionTypes["default"].SET_POLYGON_FILTER_LAYER,
    layer: layer,
    feature: feature
  };
}
/**
 * Set the current feature to be edited/deleted
 * @memberof visStateActions
 * @param {Object} feature
 * @return {{feature: feature, type: ActionTypes.SET_SELECTED_FEATURE}}
 */


function setSelectedFeature(feature) {
  return {
    type: _actionTypes["default"].SET_SELECTED_FEATURE,
    feature: feature
  };
}
/**
 * Delete the given feature
 * @memberof visStateActions
 * @param {Object} feature
 * @return {{type: ActionTypes.DELETE_FEATURE, feature: feature}}
 */


function deleteFeature(feature) {
  return {
    type: _actionTypes["default"].DELETE_FEATURE,
    feature: feature
  };
}
/** Set the map mode
 * @memberof visStateActions
 * @param {string} mode one of EDITOR_MODES
 * @return {{type: ActionTypes. SET_EDITOR_MODE, mode: *}}
 * @public
 * @example
 * import {setMapMode} from 'kepler.gl/actions';
 * import {EDITOR_MODES} from 'kepler.gl/constants';
 *
 * this.props.dispatch(setMapMode(EDITOR_MODES.DRAW_POLYGON));
 */


function setEditorMode(mode) {
  return {
    type: _actionTypes["default"].SET_EDITOR_MODE,
    mode: mode
  };
}
/**
 * Trigger CPU filter of selected dataset
 * @memberof visStateActions
 * @param {string | Arrary<string>} dataId - single dataId or an array of dataIds
 * @returns {{type: ActionTypes.APPLY_CPU_FILTER, dataId: string}}
 * @public
 */


function applyCPUFilter(dataId) {
  return {
    type: _actionTypes["default"].APPLY_CPU_FILTER,
    dataId: dataId
  };
}
/**

 * Toggle editor layer visibility
 * @memberof visStateActions
 * @return {{type: ActionTypes.TOGGLE_EDITOR_VISIBILITY}}
 */


function toggleEditorVisibility() {
  return {
    type: _actionTypes["default"].TOGGLE_EDITOR_VISIBILITY
  };
}
/**
 * This declaration is needed to group actions in docs
 */

/**
 * Actions handled mostly by `visState` reducer.
 * They manage how data is processed, filtered and displayed on the map by operates on layers,
 * filters and interaction settings.
 *
 * @public
 */

/* eslint-disable no-unused-vars */


var visStateActions = null;
/* eslint-enable no-unused-vars */
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL3Zpcy1zdGF0ZS1hY3Rpb25zLmpzIl0sIm5hbWVzIjpbImxheWVyQ29uZmlnQ2hhbmdlIiwib2xkTGF5ZXIiLCJuZXdDb25maWciLCJ0eXBlIiwiQWN0aW9uVHlwZXMiLCJMQVlFUl9DT05GSUdfQ0hBTkdFIiwibGF5ZXJUZXh0TGFiZWxDaGFuZ2UiLCJpZHgiLCJwcm9wIiwidmFsdWUiLCJMQVlFUl9URVhUX0xBQkVMX0NIQU5HRSIsImxheWVyVHlwZUNoYW5nZSIsIm5ld1R5cGUiLCJMQVlFUl9UWVBFX0NIQU5HRSIsImxheWVyVmlzdWFsQ2hhbm5lbENvbmZpZ0NoYW5nZSIsImNoYW5uZWwiLCJMQVlFUl9WSVNVQUxfQ0hBTk5FTF9DSEFOR0UiLCJsYXllclZpc0NvbmZpZ0NoYW5nZSIsIm5ld1Zpc0NvbmZpZyIsIkxBWUVSX1ZJU19DT05GSUdfQ0hBTkdFIiwibGF5ZXJDb2xvclVJQ2hhbmdlIiwiTEFZRVJfQ09MT1JfVUlfQ0hBTkdFIiwidXBkYXRlTGF5ZXJCbGVuZGluZyIsIm1vZGUiLCJVUERBVEVfTEFZRVJfQkxFTkRJTkciLCJpbnRlcmFjdGlvbkNvbmZpZ0NoYW5nZSIsImNvbmZpZyIsIklOVEVSQUNUSU9OX0NPTkZJR19DSEFOR0UiLCJzZXRGaWx0ZXIiLCJ2YWx1ZUluZGV4IiwiU0VUX0ZJTFRFUiIsImFkZEZpbHRlciIsImRhdGFJZCIsIkFERF9GSUxURVIiLCJhZGRMYXllciIsInByb3BzIiwiQUREX0xBWUVSIiwicmVvcmRlckxheWVyIiwib3JkZXIiLCJSRU9SREVSX0xBWUVSIiwicmVtb3ZlRmlsdGVyIiwiUkVNT1ZFX0ZJTFRFUiIsInJlbW92ZUxheWVyIiwiUkVNT1ZFX0xBWUVSIiwicmVtb3ZlRGF0YXNldCIsImtleSIsIlJFTU9WRV9EQVRBU0VUIiwic2hvd0RhdGFzZXRUYWJsZSIsIlNIT1dfREFUQVNFVF9UQUJMRSIsInNvcnRUYWJsZUNvbHVtbiIsImNvbHVtbiIsIlNPUlRfVEFCTEVfQ09MVU1OIiwicGluVGFibGVDb2x1bW4iLCJQSU5fVEFCTEVfQ09MVU1OIiwiY29weVRhYmxlQ29sdW1uIiwiQ09QWV9UQUJMRV9DT0xVTU4iLCJ1cGRhdGVWaXNEYXRhIiwiZGF0YXNldHMiLCJvcHRpb25zIiwiVVBEQVRFX1ZJU19EQVRBIiwidG9nZ2xlRmlsdGVyQW5pbWF0aW9uIiwiVE9HR0xFX0ZJTFRFUl9BTklNQVRJT04iLCJ1cGRhdGVGaWx0ZXJBbmltYXRpb25TcGVlZCIsInNwZWVkIiwiVVBEQVRFX0ZJTFRFUl9BTklNQVRJT05fU1BFRUQiLCJ1cGRhdGVBbmltYXRpb25UaW1lIiwiVVBEQVRFX0FOSU1BVElPTl9USU1FIiwidXBkYXRlTGF5ZXJBbmltYXRpb25TcGVlZCIsIlVQREFURV9MQVlFUl9BTklNQVRJT05fU1BFRUQiLCJlbmxhcmdlRmlsdGVyIiwiRU5MQVJHRV9GSUxURVIiLCJ0b2dnbGVGaWx0ZXJGZWF0dXJlIiwiVE9HR0xFX0ZJTFRFUl9GRUFUVVJFIiwib25MYXllckhvdmVyIiwiaW5mbyIsIkxBWUVSX0hPVkVSIiwib25MYXllckNsaWNrIiwiTEFZRVJfQ0xJQ0siLCJvbk1hcENsaWNrIiwiTUFQX0NMSUNLIiwib25Nb3VzZU1vdmUiLCJldnQiLCJNT1VTRV9NT1ZFIiwidG9nZ2xlTGF5ZXJGb3JNYXAiLCJtYXBJbmRleCIsImxheWVySWQiLCJUT0dHTEVfTEFZRVJfRk9SX01BUCIsInNldEZpbHRlclBsb3QiLCJuZXdQcm9wIiwiU0VUX0ZJTFRFUl9QTE9UIiwic2V0TWFwSW5mbyIsIlNFVF9NQVBfSU5GTyIsImxvYWRGaWxlcyIsImZpbGVzIiwiTE9BRF9GSUxFUyIsImxvYWROZXh0RmlsZSIsImZpbGVDYWNoZSIsImZpbGVzVG9Mb2FkIiwidG90YWxDb3VudCIsIm9uRmluaXNoIiwiTE9BRF9ORVhUX0ZJTEUiLCJsb2FkRmlsZVN1Y2Nlc3MiLCJyZXN1bHQiLCJMT0FEX0ZJTEVTX1NVQ0NFU1MiLCJsb2FkRmlsZXNFcnIiLCJlcnJvciIsIkxPQURfRklMRVNfRVJSIiwic2V0RmVhdHVyZXMiLCJmZWF0dXJlcyIsIlNFVF9GRUFUVVJFUyIsInNldFBvbHlnb25GaWx0ZXJMYXllciIsImxheWVyIiwiZmVhdHVyZSIsIlNFVF9QT0xZR09OX0ZJTFRFUl9MQVlFUiIsInNldFNlbGVjdGVkRmVhdHVyZSIsIlNFVF9TRUxFQ1RFRF9GRUFUVVJFIiwiZGVsZXRlRmVhdHVyZSIsIkRFTEVURV9GRUFUVVJFIiwic2V0RWRpdG9yTW9kZSIsIlNFVF9FRElUT1JfTU9ERSIsImFwcGx5Q1BVRmlsdGVyIiwiQVBQTFlfQ1BVX0ZJTFRFUiIsInRvZ2dsZUVkaXRvclZpc2liaWxpdHkiLCJUT0dHTEVfRURJVE9SX1ZJU0lCSUxJVFkiLCJ2aXNTdGF0ZUFjdGlvbnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQkE7O0FBckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBR0E7Ozs7Ozs7O0FBUU8sU0FBU0EsaUJBQVQsQ0FBMkJDLFFBQTNCLEVBQXFDQyxTQUFyQyxFQUFnRDtBQUNyRCxTQUFPO0FBQ0xDLElBQUFBLElBQUksRUFBRUMsd0JBQVlDLG1CQURiO0FBRUxKLElBQUFBLFFBQVEsRUFBUkEsUUFGSztBQUdMQyxJQUFBQSxTQUFTLEVBQVRBO0FBSEssR0FBUDtBQUtEO0FBRUQ7Ozs7Ozs7Ozs7OztBQVVPLFNBQVNJLG9CQUFULENBQThCTCxRQUE5QixFQUF3Q00sR0FBeEMsRUFBNkNDLElBQTdDLEVBQW1EQyxLQUFuRCxFQUEwRDtBQUMvRCxTQUFPO0FBQ0xOLElBQUFBLElBQUksRUFBRUMsd0JBQVlNLHVCQURiO0FBRUxULElBQUFBLFFBQVEsRUFBUkEsUUFGSztBQUdMTSxJQUFBQSxHQUFHLEVBQUhBLEdBSEs7QUFJTEMsSUFBQUEsSUFBSSxFQUFKQSxJQUpLO0FBS0xD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Ozs7Ozs7Ozs7O0FBV08sU0FBU00sYUFBVCxDQUF1Qi9GLElBQXZCLEVBQTZCO0FBQ2xDLFNBQU87QUFDTHBCLElBQUFBLElBQUksRUFBRUMsd0JBQVltSCxlQURiO0FBRUxoRyxJQUFBQSxJQUFJLEVBQUpBO0FBRkssR0FBUDtBQUlEO0FBRUQ7Ozs7Ozs7OztBQU9PLFNBQVNpRyxjQUFULENBQXdCeEYsTUFBeEIsRUFBZ0M7QUFDckMsU0FBTztBQUNMN0IsSUFBQUEsSUFBSSxFQUFFQyx3QkFBWXFILGdCQURiO0FBRUx6RixJQUFBQSxNQUFNLEVBQU5BO0FBRkssR0FBUDtBQUlEO0FBRUQ7Ozs7Ozs7O0FBTU8sU0FBUzBGLHNCQUFULEdBQWtDO0FBQ3ZDLFNBQU87QUFDTHZILElBQUFBLElBQUksRUFBRUMsd0JBQVl1SDtBQURiLEdBQVA7QUFHRDtBQUVEOzs7O0FBR0E7Ozs7Ozs7O0FBT0E7OztBQUNBLElBQU1DLGVBQWUsR0FBRyxJQUF4QjtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIwIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuLy8gdmlzLXN0YXRlLXJlZHVjZXJcbmltcG9ydCBBY3Rpb25UeXBlcyBmcm9tICdjb25zdGFudHMvYWN0aW9uLXR5cGVzJztcblxuLyoqXG4gKiBVcGRhdGUgbGF5ZXIgYmFzZSBjb25maWc6IGRhdGFJZCwgbGFiZWwsIGNvbHVtbiwgaXNWaXNpYmxlXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVBY3Rpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gb2xkTGF5ZXIgLSBsYXllciB0byBiZSB1cGRhdGVkXG4gKiBAcGFyYW0ge09iamVjdH0gbmV3Q29uZmlnIC0gbmV3IGNvbmZpZ1xuICogQHJldHVybnMge3t0eXBlOiBBY3Rpb25UeXBlcy5MQVlFUl9DT05GSUdfQ0hBTkdFLCBvbGRMYXllcjogb2xkTGF5ZXIsIG5ld0NvbmZpZzogbmV3Q29uZmlnfX1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxheWVyQ29uZmlnQ2hhbmdlKG9sZExheWVyLCBuZXdDb25maWcpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5MQVlFUl9DT05GSUdfQ0hBTkdFLFxuICAgIG9sZExheWVyLFxuICAgIG5ld0NvbmZpZ1xuICB9O1xufVxuXG4vKipcbiAqIFVwZGF0ZSBsYXllciB0ZXh0IGxhYmVsXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVBY3Rpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gb2xkTGF5ZXIgLSBsYXllciB0byBiZSB1cGRhdGVkXG4gKiBAcGFyYW0ge051bWJlcn0gaWR4IC1gaWR4YCBvZiB0ZXh0IGxhYmVsIHRvIGJlIHVwZGF0ZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wIC0gYHByb3BgIG9mIHRleHQgbGFiZWwsIGUsZywgYGFuY2hvcmAsIGBhbGlnbm1lbnRgLCBgY29sb3JgLCBgc2l6ZWAsIGBmaWVsZGBcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgLSBuZXcgdmFsdWVcbiAqIEByZXR1cm5zIHt7dHlwZTogQWN0aW9uVHlwZXMuTEFZRVJfVEVYVF9MQUJFTF9DSEFOR0UsIG9sZExheWVyOiBvbGRMYXllciwgaWR4OiBpZHgsIHByb3A6IHByb3AsIHZhbHVlOn19XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsYXllclRleHRMYWJlbENoYW5nZShvbGRMYXllciwgaWR4LCBwcm9wLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEFjdGlvblR5cGVzLkxBWUVSX1RFWFRfTEFCRUxfQ0hBTkdFLFxuICAgIG9sZExheWVyLFxuICAgIGlkeCxcbiAgICBwcm9wLFxuICAgIHZhbHVlXG4gIH07XG59XG5cbi8qKlxuICogVXBkYXRlIGxheWVyIHR5cGUuIFByZXZpZXdzIGxheWVyIGNvbmZpZyB3aWxsIGJlIGNvcGllZCBpZiBhcHBsaWNhYmxlLlxuICogQG1lbWJlcm9mIHZpc1N0YXRlQWN0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IG9sZExheWVyIC0gbGF5ZXIgdG8gYmUgdXBkYXRlZFxuICogQHBhcmFtIHtzdHJpbmd9IG5ld1R5cGUgLSBuZXcgdHlwZVxuICogQHJldHVybnMge3t0eXBlOiBBY3Rpb25UeXBlcy5MQVlFUl9UWVBFX0NIQU5HRSwgb2xkTGF5ZXI6IG9sZExheWVyLCBuZXdUeXBlOiBuZXdUeXBlfX1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxheWVyVHlwZUNoYW5nZShvbGRMYXllciwgbmV3VHlwZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEFjdGlvblR5cGVzLkxBWUVSX1RZUEVfQ0hBTkdFLFxuICAgIG9sZExheWVyLFxuICAgIG5ld1R5cGVcbiAgfTtcbn1cblxuLyoqXG4gKiBVcGRhdGUgbGF5ZXIgdmlzdWFsIGNoYW5uZWxcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZUFjdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBvbGRMYXllciAtIGxheWVyIHRvIGJlIHVwZGF0ZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBuZXdDb25maWcgLSBuZXcgdmlzdWFsIGNoYW5uZWwgY29uZmlnXG4gKiBAcGFyYW0ge3N0cmluZ30gY2hhbm5lbCAtIGNoYW5uZWwgdG8gYmUgdXBkYXRlZFxuICogQHJldHVybnMge3t0eXBlOiBBY3Rpb25UeXBlcy5MQVlFUl9WSVNVQUxfQ0hBTk5FTF9DSEFOR0UsIG9sZExheWVyOiBvbGRMYXllciwgbmV3Q29uZmlnOiBuZXdDb25maWcsIGNoYW5uZWw6IGNoYW5uZWx9fVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gbGF5ZXJWaXN1YWxDaGFubmVsQ29uZmlnQ2hhbmdlKG9sZExheWVyLCBuZXdDb25maWcsIGNoYW5uZWwpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5MQVlFUl9WSVNVQUxfQ0hBTk5FTF9DSEFOR0UsXG4gICAgb2xkTGF5ZXIsXG4gICAgbmV3Q29uZmlnLFxuICAgIGNoYW5uZWxcbiAgfTtcbn1cblxuLyoqXG4gKiBVcGRhdGUgbGF5ZXIgYHZpc0NvbmZpZ2BcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZUFjdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBvbGRMYXllciAtIGxheWVyIHRvIGJlIHVwZGF0ZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBuZXdWaXNDb25maWcgLSBuZXcgdmlzQ29uZmlnIGFzIGEga2V5IHZhbHVlIG1hcDogZS5nLiBge29wYWNpdHk6IDAuOH1gXG4gKiBAcmV0dXJucyB7e3R5cGU6IEFjdGlvblR5cGVzLkxBWUVSX1ZJU19DT05GSUdfQ0hBTkdFLCBvbGRMYXllcjogb2xkTGF5ZXIsIG5ld1Zpc0NvbmZpZzogbmV3VmlzQ29uZmlnfX1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxheWVyVmlzQ29uZmlnQ2hhbmdlKG9sZExheWVyLCBuZXdWaXNDb25maWcpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5MQVlFUl9WSVNfQ09ORklHX0NIQU5HRSxcbiAgICBvbGRMYXllcixcbiAgICBuZXdWaXNDb25maWdcbiAgfTtcbn1cblxuLyoqXG4gKiBTZXQgdGhlIGNvbG9yIHBhbGV0dGUgdWkgZm9yIGxheWVyIGNvbG9yXG4gKiBAbWVtYmVyT2YgdmlzU3RhdGVBY3Rpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gb2xkTGF5ZXIgLSBsYXllciB0byBiZSB1cGRhdGVkXG4gKiBAcGFyYW0ge1N0cmluZ30gcHJvcCAtIHdoaWNoIGNvbG9yIHByb3BcbiAqIEBwYXJhbSB7b2JqZWN0fSBuZXdDb25maWcgLSB0byBiZSBtZXJnZWRcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxheWVyQ29sb3JVSUNoYW5nZShvbGRMYXllciwgcHJvcCwgbmV3Q29uZmlnKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuTEFZRVJfQ09MT1JfVUlfQ0hBTkdFLFxuICAgIG9sZExheWVyLFxuICAgIHByb3AsXG4gICAgbmV3Q29uZmlnXG4gIH07XG59XG5cbi8qKlxuICogVXBkYXRlIGxheWVyIGJsZW5kaW5nIG1vZGVcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZUFjdGlvbnNcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlIG9uZSBvZiBgYWRkaXRpdmVgLCBgbm9ybWFsYCBhbmQgYHN1YnRyYWN0aXZlYFxuICogQHJldHVybnMge3t0eXBlOiBBY3Rpb25UeXBlcy5VUERBVEVfTEFZRVJfQkxFTkRJTkcsIG1vZGU6IG1vZGV9fVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlTGF5ZXJCbGVuZGluZyhtb2RlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuVVBEQVRFX0xBWUVSX0JMRU5ESU5HLFxuICAgIG1vZGVcbiAgfTtcbn1cblxuLyoqXG4gKiBVcGRhdGUgYGludGVyYWN0aW9uQ29uZmlnYFxuICogQG1lbWJlcm9mIHZpc1N0YXRlQWN0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyAtIG5ldyBjb25maWcgYXMga2V5IHZhbHVlIG1hcDogYHt0b29sdGlwOiB7ZW5hYmxlZDogdHJ1ZX19YFxuICogQHJldHVybnMge3t0eXBlOiBBY3Rpb25UeXBlcy5JTlRFUkFDVElPTl9DT05GSUdfQ0hBTkdFLCBjb25maWc6IGNvbmZpZ319XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbnRlcmFjdGlvbkNvbmZpZ0NoYW5nZShjb25maWcpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5JTlRFUkFDVElPTl9DT05GSUdfQ0hBTkdFLFxuICAgIGNvbmZpZ1xuICB9O1xufVxuXG4vKipcbiAqIFVwZGF0ZSBmaWx0ZXIgcHJvcGVydHlcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZUFjdGlvbnNcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZHggLWBpZHhgIG9mIGZpbHRlciB0byBiZSB1cGRhdGVkXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcCAtIGBwcm9wYCBvZiBmaWx0ZXIsIGUsZywgYGRhdGFJZGAsIGBuYW1lYCwgYHZhbHVlYFxuICogQHBhcmFtIHsqfSB2YWx1ZSAtIG5ldyB2YWx1ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlSW5kZXggLSBhcnJheSBwcm9wZXJ0aWVzIGxpa2UgZGF0YXNldCByZXF1aXJlIGluZGV4IGluIG9yZGVyIHRvIGltcHJvdmUgcGVyZm9ybWFuY2VcbiAqIEByZXR1cm5zIHt7dHlwZTogQWN0aW9uVHlwZXMuU0VUX0ZJTFRFUiwgaWR4OiBpZHgsIHByb3A6IHByb3AsIHZhbHVlOiB2YWx1ZX19XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRGaWx0ZXIoaWR4LCBwcm9wLCB2YWx1ZSwgdmFsdWVJbmRleCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEFjdGlvblR5cGVzLlNFVF9GSUxURVIsXG4gICAgaWR4LFxuICAgIHByb3AsXG4gICAgdmFsdWUsXG4gICAgdmFsdWVJbmRleFxuICB9O1xufVxuXG4vKipcbiAqIEFkZCBhIG5ldyBmaWx0ZXJcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZUFjdGlvbnNcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhSWQgLSBkYXRhc2V0IGBpZGAgdGhpcyBuZXcgZmlsdGVyIGlzIGFzc29jaWF0ZWQgd2l0aFxuICogQHJldHVybnMge3t0eXBlOiBBY3Rpb25UeXBlcy5BRERfRklMVEVSLCBkYXRhSWQ6IGRhdGFJZH19XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGRGaWx0ZXIoZGF0YUlkKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuQUREX0ZJTFRFUixcbiAgICBkYXRhSWRcbiAgfTtcbn1cblxuLyoqXG4gKiBBZGQgYSBuZXcgbGF5ZXJcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZUFjdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyAtIG5ldyBsYXllciBwcm9wc1xuICogQHJldHVybnMge3t0eXBlOiBBY3Rpb25UeXBlcy5BRERfTEFZRVIsIHByb3BzOiBwcm9wc319XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGRMYXllcihwcm9wcykge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEFjdGlvblR5cGVzLkFERF9MQVlFUixcbiAgICBwcm9wc1xuICB9O1xufVxuXG4vKipcbiAqIFJlb3JkZXIgbGF5ZXIsIG9yZGVyIGlzIGFuIGFycmF5IG9mIGxheWVyIGluZGV4ZXMsIGluZGV4IDAgd2lsbCBiZSB0aGUgb25lIGF0IHRoZSBib3R0b21cbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZUFjdGlvbnNcbiAqIEBwYXJhbSB7QXJyYXk8TnVtYmVyPn0gb3JkZXIgYW4gYXJyYXkgb2YgbGF5ZXIgaW5kZXhlc1xuICogQHJldHVybnMge3t0eXBlOiBBY3Rpb25UeXBlcy5SRU9SREVSX0xBWUVSLCBvcmRlcjogb3JkZXJ9fVxuICogQHB1YmxpY1xuICogQGV4YW1wbGVcbiAqXG4gKiAvLyBicmluZyBgbGF5ZXJzWzFdYCBiZWxvdyBgbGF5ZXJzWzBdYCwgdGhlIHNlcXVlbmNlIGxheWVycyB3aWxsIGJlIHJlbmRlcmVkIGlzIGAxYCwgYDBgLCBgMmAsIGAzYC5cbiAqIC8vIGAxYCB3aWxsIGJlIGF0IHRoZSBib3R0b20sIGAzYCB3aWxsIGJlIGF0IHRoZSB0b3AuXG4gKiB0aGlzLnByb3BzLmRpc3BhdGNoKHJlb3JkZXJMYXllcihbMSwgMCwgMiwgM10pKTtcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlb3JkZXJMYXllcihvcmRlcikge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEFjdGlvblR5cGVzLlJFT1JERVJfTEFZRVIsXG4gICAgb3JkZXJcbiAgfTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgYSBmaWx0ZXIgZnJvbSBgdmlzU3RhdGUuZmlsdGVyc2AsIG9uY2UgYSBmaWx0ZXIgaXMgcmVtb3ZlZCwgZGF0YSB3aWxsIGJlIHJlLWZpbHRlcmVkIGFuZCBsYXllciB3aWxsIGJlIHVwZGF0ZWRcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZUFjdGlvbnNcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZHggaWR4IG9mIGZpbHRlciB0byBiZSByZW1vdmVkXG4gKiBAcmV0dXJucyB7e3R5cGU6IEFjdGlvblR5cGVzLlJFTU9WRV9GSUxURVIsIGlkeDogaWR4fX1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUZpbHRlcihpZHgpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5SRU1PVkVfRklMVEVSLFxuICAgIGlkeFxuICB9O1xufVxuXG4vKipcbiAqIFJlbW92ZSBhIGxheWVyXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVBY3Rpb25zXG4gKiBAcGFyYW0ge051bWJlcn0gaWR4IGlkeCBvZiBsYXllciB0byBiZSByZW1vdmVkXG4gKiBAcmV0dXJucyB7e3R5cGU6IEFjdGlvblR5cGVzLlJFTU9WRV9MQVlFUiwgaWR4OiBpZHh9fVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlTGF5ZXIoaWR4KSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuUkVNT1ZFX0xBWUVSLFxuICAgIGlkeFxuICB9O1xufVxuXG4vKipcbiAqIFJlbW92ZSBhIGRhdGFzZXQgYW5kIGFsbCBsYXllcnMsIGZpbHRlcnMsIHRvb2x0aXAgY29uZmlncyB0aGF0IGJhc2VkIG9uIGl0XG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVBY3Rpb25zXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IGRhdGFzZXQgaWRcbiAqIEByZXR1cm5zIHt7dHlwZTogQWN0aW9uVHlwZXMuUkVNT1ZFX0RBVEFTRVQsIGtleToga2V5fX1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZURhdGFzZXQoa2V5KSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuUkVNT1ZFX0RBVEFTRVQsXG4gICAga2V5XG4gIH07XG59XG5cbi8qKlxuICogRGlzcGxheSBkYXRhc2V0IHRhYmxlIGluIGEgbW9kYWxcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZUFjdGlvbnNcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhSWQgZGF0YXNldCBpZCB0byBzaG93IGluIHRhYmxlXG4gKiBAcmV0dXJucyB7e3R5cGU6IEFjdGlvblR5cGVzLlNIT1dfREFUQVNFVF9UQUJMRSwgZGF0YUlkOiBkYXRhSWR9fVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gc2hvd0RhdGFzZXRUYWJsZShkYXRhSWQpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5TSE9XX0RBVEFTRVRfVEFCTEUsXG4gICAgZGF0YUlkXG4gIH07XG59XG5cbi8qKlxuICogU29ydCBkYXRhc2V0IGNvbHVtbiwgZm9yIHRhYmxlIGRpc3BsYXlcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhSWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb2x1bW5cbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzb3J0VGFibGVDb2x1bW4oZGF0YUlkLCBjb2x1bW4sIG1vZGUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5TT1JUX1RBQkxFX0NPTFVNTixcbiAgICBkYXRhSWQsXG4gICAgY29sdW1uLFxuICAgIG1vZGVcbiAgfTtcbn1cblxuLyoqXG4gKiBQaW4gZGF0YXNldCBjb2x1bW4sIGZvciB0YWJsZSBkaXNwbGF5XG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0YUlkXG4gKiBAcGFyYW0ge3N0cmluZ30gY29sdW1uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwaW5UYWJsZUNvbHVtbihkYXRhSWQsIGNvbHVtbikge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEFjdGlvblR5cGVzLlBJTl9UQUJMRV9DT0xVTU4sXG4gICAgZGF0YUlkLFxuICAgIGNvbHVtblxuICB9O1xufVxuXG4vKipcbiAqIENvcHkgY29sdW1uLCBmb3IgdGFibGUgZGlzcGxheVxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGFJZFxuICogQHBhcmFtIHtzdHJpbmd9IGNvbHVtblxuICovXG5leHBvcnQgZnVuY3Rpb24gY29weVRhYmxlQ29sdW1uKGRhdGFJZCwgY29sdW1uKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuQ09QWV9UQUJMRV9DT0xVTU4sXG4gICAgZGF0YUlkLFxuICAgIGNvbHVtblxuICB9O1xufVxuXG4vKipcbiAqIEFkZCBuZXcgZGF0YXNldCB0byBgdmlzU3RhdGVgLCB3aXRoIG9wdGlvbiB0byBsb2FkIGEgbWFwIGNvbmZpZyBhbG9uZyB3aXRoIHRoZSBkYXRhc2V0c1xuICogQG1lbWJlcm9mIHZpc1N0YXRlQWN0aW9uc1xuICogQHBhcmFtIHtBcnJheTxPYmplY3Q+fE9iamVjdH0gZGF0YXNldHMgLSAqKipyZXF1aXJlZCoqIGRhdGFzZXRzIGNhbiBiZSBhIGRhdGFzZXQgb3IgYW4gYXJyYXkgb2YgZGF0YXNldHNcbiAqIEVhY2ggZGF0YXNldCBvYmplY3QgbmVlZHMgdG8gaGF2ZSBgaW5mb2AgYW5kIGBkYXRhYCBwcm9wZXJ0eS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhc2V0cy5pbmZvIC1pbmZvIG9mIGEgZGF0YXNldFxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGFzZXRzLmluZm8uaWQgLSBpZCBvZiB0aGlzIGRhdGFzZXQuIElmIGNvbmZpZyBpcyBkZWZpbmVkLCBgaWRgIHNob3VsZCBtYXRjaGVzIHRoZSBgZGF0YUlkYCBpbiBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0YXNldHMuaW5mby5sYWJlbCAtIEEgZGlzcGxheSBuYW1lIG9mIHRoaXMgZGF0YXNldFxuICogQHBhcmFtIHtPYmplY3R9IGRhdGFzZXRzLmRhdGEgLSAqKipyZXF1aXJlZCoqIFRoZSBkYXRhIG9iamVjdCwgaW4gYSB0YWJ1bGFyIGZvcm1hdCB3aXRoIDIgcHJvcGVydGllcyBgZmllbGRzYCBhbmQgYHJvd3NgXG4gKiBAcGFyYW0ge0FycmF5PE9iamVjdD59IGRhdGFzZXRzLmRhdGEuZmllbGRzIC0gKioqcmVxdWlyZWQqKiBBcnJheSBvZiBmaWVsZHMsXG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0YXNldHMuZGF0YS5maWVsZHMubmFtZSAtICoqKnJlcXVpcmVkKiogTmFtZSBvZiB0aGUgZmllbGQsXG4gKiBAcGFyYW0ge0FycmF5PEFycmF5Pn0gZGF0YXNldHMuZGF0YS5yb3dzIC0gKioqcmVxdWlyZWQqKiBBcnJheSBvZiByb3dzLCBpbiBhIHRhYnVsYXIgZm9ybWF0IHdpdGggYGZpZWxkc2AgYW5kIGByb3dzYFxuXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLmNlbnRlck1hcCBgZGVmYXVsdDogdHJ1ZWAgaWYgYGNlbnRlck1hcGAgaXMgc2V0IHRvIGB0cnVlYCBrZXBsZXIuZ2wgd2lsbFxuICogcGxhY2UgdGhlIG1hcCB2aWV3IHdpdGhpbiB0aGUgZGF0YSBwb2ludHMgYm91bmRhcmllc1xuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnJlYWRPbmx5IGBkZWZhdWx0OiBmYWxzZWAgaWYgYHJlYWRPbmx5YCBpcyBzZXQgdG8gYHRydWVgXG4gKiB0aGUgbGVmdCBzZXR0aW5nIHBhbmVsIHdpbGwgYmUgaGlkZGVuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIHRoaXMgb2JqZWN0IHdpbGwgY29udGFpbiB0aGUgZnVsbCBrZXBsZXIuZ2wgaW5zdGFuY2UgY29uZmlndXJhdGlvbiB7bWFwU3RhdGUsIG1hcFN0eWxlLCB2aXNTdGF0ZX1cbiAqIEByZXR1cm5zIHt7dHlwZTogQWN0aW9uVHlwZXMuVVBEQVRFX1ZJU19EQVRBLCBkYXRhc2V0czogZGF0YXNldHMsIG9wdGlvbnM6IG9wdGlvbnMsIGNvbmZpZzogY29uZmlnfX1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVZpc0RhdGEoZGF0YXNldHMsIG9wdGlvbnMsIGNvbmZpZykge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEFjdGlvblR5cGVzLlVQREFURV9WSVNfREFUQSxcbiAgICBkYXRhc2V0cyxcbiAgICBvcHRpb25zLFxuICAgIGNvbmZpZ1xuICB9O1xufVxuXG4vKipcbiAqIFN0YXJ0IGFuZCBlbmQgZmlsdGVyIGFuaW1hdGlvblxuICogQG1lbWJlcm9mIHZpc1N0YXRlQWN0aW9uc1xuICogQHBhcmFtIHtOdW1iZXJ9IGlkeCAtIGlkeCBvZiBmaWx0ZXJcbiAqIEByZXR1cm5zIHt7dHlwZTogQWN0aW9uVHlwZXMuVE9HR0xFX0ZJTFRFUl9BTklNQVRJT04sIGlkeDogaWR4fX1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZUZpbHRlckFuaW1hdGlvbihpZHgpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5UT0dHTEVfRklMVEVSX0FOSU1BVElPTixcbiAgICBpZHhcbiAgfTtcbn1cblxuLyoqXG4gKiBDaGFuZ2UgZmlsdGVyIGFuaW1hdGlvbiBzcGVlZFxuICogQG1lbWJlcm9mIHZpc1N0YXRlQWN0aW9uc1xuICogQHBhcmFtIHtOdW1iZXJ9IGlkeCAtICBgaWR4YCBvZiBmaWx0ZXJcbiAqIEBwYXJhbSB7TnVtYmVyfSBzcGVlZCAtIGBzcGVlZGAgdG8gY2hhbmdlIGl0IHRvLiBgc3BlZWRgIGlzIGEgbXVsdGlwbGllclxuICogQHJldHVybnMge3t0eXBlOiBBY3Rpb25UeXBlcy5VUERBVEVfRklMVEVSX0FOSU1BVElPTl9TUEVFRCwgaWR4OiBpZHgsIHNwZWVkOiBzcGVlZH19XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVGaWx0ZXJBbmltYXRpb25TcGVlZChpZHgsIHNwZWVkKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuVVBEQVRFX0ZJTFRFUl9BTklNQVRJT05fU1BFRUQsXG4gICAgaWR4LFxuICAgIHNwZWVkXG4gIH07XG59XG5cbi8qKlxuICogUmVzZXQgYW5pbWF0aW9uXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVBY3Rpb25zXG4gKiBAcGFyYW0ge051bWJlcn0gdmFsdWUgLSAgQ3VycmVudCB2YWx1ZSBvZiB0aGUgc2xpZGVyXG4gKiBAcmV0dXJucyB7e3R5cGU6IEFjdGlvblR5cGVzLlVQREFURV9BTklNQVRJT05fVElNRSwgdmFsdWU6IHZhbHVlfX1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUFuaW1hdGlvblRpbWUodmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5VUERBVEVfQU5JTUFUSU9OX1RJTUUsXG4gICAgdmFsdWVcbiAgfTtcbn1cblxuLyoqXG4gKiB1cGRhdGUgdHJpcCBsYXllciBhbmltYXRpb24gc3BlZWRcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZUFjdGlvbnNcbiAqIEBwYXJhbSB7TnVtYmVyfSBzcGVlZCAtIGBzcGVlZGAgdG8gY2hhbmdlIGl0IHRvLiBgc3BlZWRgIGlzIGEgbXVsdGlwbGllclxuICogQHJldHVybnMge3t0eXBlOiBBY3Rpb25UeXBlcy5VUERBVEVfTEFZRVJfQU5JTUFUSU9OX1NQRUVELCBzcGVlZDogc3BlZWR9fVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlTGF5ZXJBbmltYXRpb25TcGVlZChzcGVlZCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEFjdGlvblR5cGVzLlVQREFURV9MQVlFUl9BTklNQVRJT05fU1BFRUQsXG4gICAgc3BlZWRcbiAgfTtcbn1cblxuLyoqXG4gKiBTaG93IGxhcmdlciB0aW1lIGZpbHRlciBhdCBib3R0b20gZm9yIHRpbWUgcGxheWJhY2sgKGFwcGx5IHRvIHRpbWUgZmlsdGVyIG9ubHkpXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVBY3Rpb25zXG4gKiBAcGFyYW0ge051bWJlcn0gaWR4IC0gaW5kZXggb2YgZmlsdGVyIHRvIGVubGFyZ2VcbiAqIEByZXR1cm5zIHt7dHlwZTogQWN0aW9uVHlwZXMuRU5MQVJHRV9GSUxURVIsIGlkeDogaWR4fX1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVubGFyZ2VGaWx0ZXIoaWR4KSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuRU5MQVJHRV9GSUxURVIsXG4gICAgaWR4XG4gIH07XG59XG5cbi8qKlxuICogU2hvdy9oaWRlIGZpbHRlciBmZWF0dXJlIG9uIG1hcFxuICogQG1lbWJlcm9mIHZpc1N0YXRlQWN0aW9uc1xuICogQHBhcmFtIHtOdW1iZXJ9IGlkeCAtIGluZGV4IG9mIGZpbHRlciBmZWF0dXJlIHRvIHNob3cvaGlkZVxuICogQHJldHVybiB7e3R5cGU6IEFjdGlvblR5cGVzLlRPR0dMRV9GSUxURVJfRkVBVFVSRSwgaWR4OiBpZHh9fVxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlRmlsdGVyRmVhdHVyZShpZHgpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5UT0dHTEVfRklMVEVSX0ZFQVRVUkUsXG4gICAgaWR4XG4gIH07XG59XG5cbi8qKlxuICogVHJpZ2dlciBsYXllciBob3ZlciBldmVudCB3aXRoIGhvdmVyZWQgb2JqZWN0XG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVBY3Rpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gaW5mbyAtIE9iamVjdCBob3ZlcmVkLCByZXR1cm5lZCBieSBkZWNrLmdsXG4gKiBAcmV0dXJucyB7e3R5cGU6IEFjdGlvblR5cGVzLkxBWUVSX0hPVkVSLCBpbmZvOiBpbmZvfX1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9uTGF5ZXJIb3ZlcihpbmZvKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuTEFZRVJfSE9WRVIsXG4gICAgaW5mb1xuICB9O1xufVxuXG4vKipcbiAqIFRyaWdnZXIgbGF5ZXIgY2xpY2sgZXZlbnQgd2l0aCBjbGlja2VkIG9iamVjdFxuICogQG1lbWJlcm9mIHZpc1N0YXRlQWN0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IGluZm8gLSBPYmplY3QgY2xpY2tlZCwgcmV0dXJuZWQgYnkgZGVjay5nbFxuICogQHJldHVybnMge3t0eXBlOiBBY3Rpb25UeXBlcy5MQVlFUl9DTElDSywgaW5mbzogaW5mb319XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvbkxheWVyQ2xpY2soaW5mbykge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEFjdGlvblR5cGVzLkxBWUVSX0NMSUNLLFxuICAgIGluZm9cbiAgfTtcbn1cblxuLyoqXG4gKiBUcmlnZ2VyIG1hcCBjbGljayBldmVudCwgdW5zZWxlY3QgY2xpY2tlZCBvYmplY3RcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZUFjdGlvbnNcbiAqIEByZXR1cm5zIHt7dHlwZTogQWN0aW9uVHlwZXMuTUFQX0NMSUNLfX1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9uTWFwQ2xpY2soKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuTUFQX0NMSUNLXG4gIH07XG59XG5cbi8qKlxuICogVHJpZ2dlciBtYXAgbW91c2UgbW92ZWV2ZW50LCBwYXlsb2FkIHdvdWxkIGJlXG4gKiBSZWFjdC1tYXAtZ2wgUG9pbnRlckV2ZW50XG4gKiBodHRwczovL3ViZXIuZ2l0aHViLmlvL3JlYWN0LW1hcC1nbC8jL2RvY3VtZW50YXRpb24vYXBpLXJlZmVyZW5jZS9wb2ludGVyLWV2ZW50XG4gKlxuICogQG1lbWJlcm9mIHZpc1N0YXRlQWN0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IGV2dCAtIFBvaW50ZXJFdmVudFxuICogQHJldHVybnMge3t0eXBlOiBBY3Rpb25UeXBlcy5NQVBfQ0xJQ0t9fVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gb25Nb3VzZU1vdmUoZXZ0KSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuTU9VU0VfTU9WRSxcbiAgICBldnRcbiAgfTtcbn1cblxuLyoqXG4gKiBUb2dnbGUgdmlzaWJpbGl0eSBvZiBhIGxheWVyIGluIGEgc3BsaXQgbWFwXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVBY3Rpb25zXG4gKiBAcGFyYW0ge051bWJlcn0gbWFwSW5kZXggLSBpbmRleCBvZiB0aGUgc3BsaXQgbWFwXG4gKiBAcGFyYW0ge3N0cmluZ30gbGF5ZXJJZCAtIGlkIG9mIHRoZSBsYXllclxuICogQHJldHVybnMge3t0eXBlOiBBY3Rpb25UeXBlcy5UT0dHTEVfTEFZRVJfRk9SX01BUCwgbWFwSW5kZXg6ICosIGxheWVySWQ6ICp9fVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlTGF5ZXJGb3JNYXAobWFwSW5kZXgsIGxheWVySWQpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5UT0dHTEVfTEFZRVJfRk9SX01BUCxcbiAgICBtYXBJbmRleCxcbiAgICBsYXllcklkXG4gIH07XG59XG5cbi8qKlxuICogU2V0IHRoZSBwcm9wZXJ0eSBvZiBhIGZpbHRlciBwbG90XG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVBY3Rpb25zXG4gKiBAcGFyYW0ge051bWJlcn0gaWR4XG4gKiBAcGFyYW0ge09iamVjdH0gbmV3UHJvcCBrZXkgdmFsdWUgbWFwcGluZyBvZiBuZXcgcHJvcCBge3lBeGlzOiAnaGlzdG9ncmFtJ31gXG4gKiBAcmV0dXJucyB7e3R5cGU6IEFjdGlvblR5cGVzLlNFVF9GSUxURVJfUExPVCwgaWR4OiAqLCBuZXdQcm9wOiAqfX1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldEZpbHRlclBsb3QoaWR4LCBuZXdQcm9wKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuU0VUX0ZJTFRFUl9QTE9ULFxuICAgIGlkeCxcbiAgICBuZXdQcm9wXG4gIH07XG59XG5cbi8qKlxuICogU2V0IHRoZSBwcm9wZXJ0eSBvZiBhIGZpbHRlciBwbG90XG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVBY3Rpb25zXG4gKiBAcGFyYW0ge051bWJlcn0gaWR4XG4gKiBAcGFyYW0ge09iamVjdH0gbmV3UHJvcCBrZXkgdmFsdWUgbWFwcGluZyBvZiBuZXcgcHJvcCBge3lBeGlzOiAnaGlzdG9ncmFtJ31gXG4gKiBAcmV0dXJucyB7e3R5cGU6IEFjdGlvblR5cGVzLlNFVF9GSUxURVJfUExPVCwgaWR4OiAqLCBuZXdQcm9wOiAqfX1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldE1hcEluZm8oaW5mbykge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEFjdGlvblR5cGVzLlNFVF9NQVBfSU5GTyxcbiAgICBpbmZvXG4gIH07XG59XG5cbi8qKlxuICogVHJpZ2dlciBmaWxlIGxvYWRpbmcgZGlzcGF0Y2ggYGFkZERhdGFUb01hcGAgaWYgc3VjY2VlZCwgb3IgYGxvYWRGaWxlc0VycmAgaWYgZmFpbGVkXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVBY3Rpb25zXG4gKiBAcGFyYW0ge0FycmF5PE9iamVjdD59IGZpbGVzIGFycmF5IG9mIGZpbGVibG9iXG4gKiBAcmV0dXJucyB7e3R5cGU6IEFjdGlvblR5cGVzLkxPQURfRklMRVMsIGZpbGVzOiAqfX1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxvYWRGaWxlcyhmaWxlcykge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEFjdGlvblR5cGVzLkxPQURfRklMRVMsXG4gICAgZmlsZXNcbiAgfTtcbn1cblxuLyoqXG4gKiBjYWxsZWQgd2l0aCBuZXh0IGZpbGUgdG8gbG9hZFxuICogQHBhcmFtIHtvYmplY3R9IHBheWxvYWRcbiAqIEBwYXJhbSB7QXJyYXk8b2JqZWN0Pn0gcGF5bG9hZC5maWxlQ2FjaGVcbiAqIEBwYXJhbSB7QXJyYXk8b2JqZWN0Pn0gcGF5bG9hZC5maWxlc1RvTG9hZFxuICogQHBhcmFtIHtudW1iZXJ9IHBheWxvYWQudG90YWxDb3VudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gcGF5bG9hZC5vbkZpbmlzaCAtIGFjdGlvbiBjcmVhdG9yIHRvIGV4ZWN1dGUgd2hlbiBhbGwgZmlsZXMgYXJlIGxvYWRlZFxuICovXG5leHBvcnQgZnVuY3Rpb24gbG9hZE5leHRGaWxlKHtmaWxlQ2FjaGUsIGZpbGVzVG9Mb2FkLCB0b3RhbENvdW50LCBvbkZpbmlzaH0pIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5MT0FEX05FWFRfRklMRSxcbiAgICBmaWxlQ2FjaGUsXG4gICAgZmlsZXNUb0xvYWQsXG4gICAgdG90YWxDb3VudCxcbiAgICBvbkZpbmlzaFxuICB9O1xufVxuXG4vKipcbiAqIGNhbGxlZCB3aGVuIGFsbCBmaWxlcyBhcmUgcHJvY2Vzc2VkIGFuZCBsb2FkZWRcbiAqIEBwYXJhbSB7QXJyYXk8b2JqZWN0Pn0gcmVzdWx0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsb2FkRmlsZVN1Y2Nlc3MocmVzdWx0KSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuTE9BRF9GSUxFU19TVUNDRVNTLFxuICAgIHJlc3VsdFxuICB9O1xufVxuXG4vKipcbiAqIFRyaWdnZXIgbG9hZGluZyBmaWxlIGVycm9yXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVBY3Rpb25zXG4gKiBAcGFyYW0geyp9IGVycm9yXG4gKiBAcmV0dXJucyB7e3R5cGU6IEFjdGlvblR5cGVzLkxPQURfRklMRVNfRVJSLCBlcnJvcjogT2JqZWN0fX1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxvYWRGaWxlc0VycihlcnJvcikge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEFjdGlvblR5cGVzLkxPQURfRklMRVNfRVJSLFxuICAgIGVycm9yXG4gIH07XG59XG5cbi8qKlxuICogU3RvcmUgZmVhdHVyZXMgdG8gc3RhdGVcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZUFjdGlvbnNcbiAqIEBwYXJhbSB7QXJyYXk8T2JqZWN0Pn0gZmVhdHVyZXNcbiAqIEByZXR1cm5zIHt7dHlwZTogQWN0aW9uVHlwZXMuU0VUX0ZFQVRVUkVTLCBmZWF0dXJlczogT2JqZWN0fX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldEZlYXR1cmVzKGZlYXR1cmVzKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuU0VUX0ZFQVRVUkVTLFxuICAgIGZlYXR1cmVzXG4gIH07XG59XG5cbi8qKlxuICogSXQgd2lsbCBhcHBseSB0aGUgcHJvdmlkZSBmZWF0dXJlIGFzIGZpbHRlciB0byB0aGUgZ2l2ZW4gbGF5ZXIuXG4gKiBJZiB0aGUgZ2l2ZW4gZmVhdHVyZSBpcyBhbHJlYWR5IGFwcGxpZWQgYXMgZmlsdGVyIHRvIHRoZSBsYXllciwgaXQgd2lsbCByZW1vdmUgdGhlIGxheWVyIGZyb20gdGhlIGZpbHRlclxuICogQG1lbWJlcm9mIHZpc1N0YXRlQWN0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IGxheWVyXG4gKiBAcGFyYW0ge09iamVjdH0gZmVhdHVyZVxuICogQHJldHVybiB7e2ZlYXR1cmU6ICosIHR5cGU6IEFjdGlvblR5cGVzLlNFVF9QT0xZR09OX0ZJTFRFUl9MQVlFUiwgbGF5ZXI6ICp9fVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0UG9seWdvbkZpbHRlckxheWVyKGxheWVyLCBmZWF0dXJlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuU0VUX1BPTFlHT05fRklMVEVSX0xBWUVSLFxuICAgIGxheWVyLFxuICAgIGZlYXR1cmVcbiAgfTtcbn1cblxuLyoqXG4gKiBTZXQgdGhlIGN1cnJlbnQgZmVhdHVyZSB0byBiZSBlZGl0ZWQvZGVsZXRlZFxuICogQG1lbWJlcm9mIHZpc1N0YXRlQWN0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IGZlYXR1cmVcbiAqIEByZXR1cm4ge3tmZWF0dXJlOiBmZWF0dXJlLCB0eXBlOiBBY3Rpb25UeXBlcy5TRVRfU0VMRUNURURfRkVBVFVSRX19XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRTZWxlY3RlZEZlYXR1cmUoZmVhdHVyZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEFjdGlvblR5cGVzLlNFVF9TRUxFQ1RFRF9GRUFUVVJFLFxuICAgIGZlYXR1cmVcbiAgfTtcbn1cblxuLyoqXG4gKiBEZWxldGUgdGhlIGdpdmVuIGZlYXR1cmVcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZUFjdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBmZWF0dXJlXG4gKiBAcmV0dXJuIHt7dHlwZTogQWN0aW9uVHlwZXMuREVMRVRFX0ZFQVRVUkUsIGZlYXR1cmU6IGZlYXR1cmV9fVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlRmVhdHVyZShmZWF0dXJlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuREVMRVRFX0ZFQVRVUkUsXG4gICAgZmVhdHVyZVxuICB9O1xufVxuXG4vKiogU2V0IHRoZSBtYXAgbW9kZVxuICogQG1lbWJlcm9mIHZpc1N0YXRlQWN0aW9uc1xuICogQHBhcmFtIHtzdHJpbmd9IG1vZGUgb25lIG9mIEVESVRPUl9NT0RFU1xuICogQHJldHVybiB7e3R5cGU6IEFjdGlvblR5cGVzLiBTRVRfRURJVE9SX01PREUsIG1vZGU6ICp9fVxuICogQHB1YmxpY1xuICogQGV4YW1wbGVcbiAqIGltcG9ydCB7c2V0TWFwTW9kZX0gZnJvbSAna2VwbGVyLmdsL2FjdGlvbnMnO1xuICogaW1wb3J0IHtFRElUT1JfTU9ERVN9IGZyb20gJ2tlcGxlci5nbC9jb25zdGFudHMnO1xuICpcbiAqIHRoaXMucHJvcHMuZGlzcGF0Y2goc2V0TWFwTW9kZShFRElUT1JfTU9ERVMuRFJBV19QT0xZR09OKSk7XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRFZGl0b3JNb2RlKG1vZGUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5TRVRfRURJVE9SX01PREUsXG4gICAgbW9kZVxuICB9O1xufVxuXG4vKipcbiAqIFRyaWdnZXIgQ1BVIGZpbHRlciBvZiBzZWxlY3RlZCBkYXRhc2V0XG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVBY3Rpb25zXG4gKiBAcGFyYW0ge3N0cmluZyB8IEFycmFyeTxzdHJpbmc+fSBkYXRhSWQgLSBzaW5nbGUgZGF0YUlkIG9yIGFuIGFycmF5IG9mIGRhdGFJZHNcbiAqIEByZXR1cm5zIHt7dHlwZTogQWN0aW9uVHlwZXMuQVBQTFlfQ1BVX0ZJTFRFUiwgZGF0YUlkOiBzdHJpbmd9fVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlDUFVGaWx0ZXIoZGF0YUlkKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuQVBQTFlfQ1BVX0ZJTFRFUixcbiAgICBkYXRhSWRcbiAgfTtcbn1cblxuLyoqXG5cbiAqIFRvZ2dsZSBlZGl0b3IgbGF5ZXIgdmlzaWJpbGl0eVxuICogQG1lbWJlcm9mIHZpc1N0YXRlQWN0aW9uc1xuICogQHJldHVybiB7e3R5cGU6IEFjdGlvblR5cGVzLlRPR0dMRV9FRElUT1JfVklTSUJJTElUWX19XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGVFZGl0b3JWaXNpYmlsaXR5KCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEFjdGlvblR5cGVzLlRPR0dMRV9FRElUT1JfVklTSUJJTElUWVxuICB9O1xufVxuXG4vKipcbiAqIFRoaXMgZGVjbGFyYXRpb24gaXMgbmVlZGVkIHRvIGdyb3VwIGFjdGlvbnMgaW4gZG9jc1xuICovXG4vKipcbiAqIEFjdGlvbnMgaGFuZGxlZCBtb3N0bHkgYnkgYHZpc1N0YXRlYCByZWR1Y2VyLlxuICogVGhleSBtYW5hZ2UgaG93IGRhdGEgaXMgcHJvY2Vzc2VkLCBmaWx0ZXJlZCBhbmQgZGlzcGxheWVkIG9uIHRoZSBtYXAgYnkgb3BlcmF0ZXMgb24gbGF5ZXJzLFxuICogZmlsdGVycyBhbmQgaW50ZXJhY3Rpb24gc2V0dGluZ3MuXG4gKlxuICogQHB1YmxpY1xuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuY29uc3QgdmlzU3RhdGVBY3Rpb25zID0gbnVsbDtcbi8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cbiJdfQ==