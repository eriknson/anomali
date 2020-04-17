"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set3dBuildingColor = exports.loadCustomMapStyle = exports.mapStyleChange = exports.loadMapStyleErr = exports.loadMapStyles = exports.requestMapStyles = exports.mapConfigChange = exports.inputMapStyle = exports.addCustomMapStyle = void 0;

var _reduxActions = require("redux-actions");

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

/**
 * Add map style from user input to reducer and set it to current style
 * This action is called when user click confirm after putting in a valid style url in the custom map style dialog.
 * It should not be called from outside kepler.gl without a valid `inputStyle` in the `mapStyle` reducer.
 * param {void}
 * @memberof mapStyleActions
 * @public
 */
var addCustomMapStyle = (0, _reduxActions.createAction)(_actionTypes["default"].ADD_CUSTOM_MAP_STYLE);
/**
 * Input a custom map style object
 * @memberof mapStyleActions
 * @param {Object} inputStyle
 * @param {string} inputStyle.url - style url e.g. `'mapbox://styles/heshan/xxxxxyyyyzzz'`
 * @param {string} inputStyle.id - style url e.g. `'custom_style_1'`
 * @param {Object} inputStyle.style - actual mapbox style json
 * @param {string} inputStyle.name - style name
 * @param {Object} inputStyle.layerGroups - layer groups that can be used to set map layer visibility
 * @param {Object} inputStyle.icon - icon image data url
 * @param {Object} mapState - mapState is optional
 * @public
 */

exports.addCustomMapStyle = addCustomMapStyle;
var inputMapStyle = (0, _reduxActions.createAction)(_actionTypes["default"].INPUT_MAP_STYLE, function (inputStyle, mapState) {
  return {
    inputStyle: inputStyle,
    mapState: mapState
  };
});
/**
 * Update `visibleLayerGroups`to change layer group visibility
 * @memberof mapStyleActions
 * @param {Object} mapStyle new config `{visibleLayerGroups: {label: false, road: true, background: true}}`
 * @public
 */

exports.inputMapStyle = inputMapStyle;
var mapConfigChange = (0, _reduxActions.createAction)(_actionTypes["default"].MAP_CONFIG_CHANGE, function (mapStyle) {
  return mapStyle;
});
/**
 * Request map style style object based on style.url.
 * @memberof mapStyleActions
 * @param {Array<Object>} mapStyles
 * @public
 */

exports.mapConfigChange = mapConfigChange;
var requestMapStyles = (0, _reduxActions.createAction)(_actionTypes["default"].REQUEST_MAP_STYLES, function (mapStyles) {
  return mapStyles;
});
/**
 * Callback when load map style success
 * @memberof mapStyleActions
 * @param {Object} newStyles a `{[id]: style}` mapping
 * @public
 */

exports.requestMapStyles = requestMapStyles;
var loadMapStyles = (0, _reduxActions.createAction)(_actionTypes["default"].LOAD_MAP_STYLES, function (newStyles) {
  return newStyles;
});
/**
 * Callback when load map style error
 * @memberof mapStyleActions
 * @param {*} error
 * @public
 */

exports.loadMapStyles = loadMapStyles;
var loadMapStyleErr = (0, _reduxActions.createAction)(_actionTypes["default"].LOAD_MAP_STYLE_ERR, function (error) {
  return error;
});
/**
 * Change to another map style. The selected style should already been loaded into `mapStyle.mapStyles`
 * @memberof mapStyleActions
 * @param {string} styleType the style to change to
 * @public
 */

exports.loadMapStyleErr = loadMapStyleErr;
var mapStyleChange = (0, _reduxActions.createAction)(_actionTypes["default"].MAP_STYLE_CHANGE, function (styleType) {
  return styleType;
});
/**
 * Callback when a custom map style object is received
 * @memberof mapStyleActions
 * @param {Object} customMapStyle
 * @param {string} customMapStyle.icon
 * @param {Object} customMapStyle.style
 * @param {*} customMapStyle.error
 * @public
 */

exports.mapStyleChange = mapStyleChange;
var loadCustomMapStyle = (0, _reduxActions.createAction)(_actionTypes["default"].LOAD_CUSTOM_MAP_STYLE, function (customMapStyle) {
  return customMapStyle;
}); // SET_3D_BUILDING_COLOR

/**
 * Set 3d building layer group color
 * @memberof mapStyleActions
 * @param {Array} color - [r, g, b]
 * @public
 */

exports.loadCustomMapStyle = loadCustomMapStyle;
var set3dBuildingColor = (0, _reduxActions.createAction)(_actionTypes["default"].SET_3D_BUILDING_COLOR, function (color) {
  return color;
});
/**
 * Actions handled mostly by  `mapStyle` reducer.
 * They manage the display of base map, such as loading and receiving base map styles,
 * hiding and showing map layers, user input of custom map style url.
 *
 * @public
 */

/* eslint-disable no-unused-vars */

exports.set3dBuildingColor = set3dBuildingColor;
var mapStyleActions = null;
/* eslint-enable no-unused-vars */
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL21hcC1zdHlsZS1hY3Rpb25zLmpzIl0sIm5hbWVzIjpbImFkZEN1c3RvbU1hcFN0eWxlIiwiQWN0aW9uVHlwZXMiLCJBRERfQ1VTVE9NX01BUF9TVFlMRSIsImlucHV0TWFwU3R5bGUiLCJJTlBVVF9NQVBfU1RZTEUiLCJpbnB1dFN0eWxlIiwibWFwU3RhdGUiLCJtYXBDb25maWdDaGFuZ2UiLCJNQVBfQ09ORklHX0NIQU5HRSIsIm1hcFN0eWxlIiwicmVxdWVzdE1hcFN0eWxlcyIsIlJFUVVFU1RfTUFQX1NUWUxFUyIsIm1hcFN0eWxlcyIsImxvYWRNYXBTdHlsZXMiLCJMT0FEX01BUF9TVFlMRVMiLCJuZXdTdHlsZXMiLCJsb2FkTWFwU3R5bGVFcnIiLCJMT0FEX01BUF9TVFlMRV9FUlIiLCJlcnJvciIsIm1hcFN0eWxlQ2hhbmdlIiwiTUFQX1NUWUxFX0NIQU5HRSIsInN0eWxlVHlwZSIsImxvYWRDdXN0b21NYXBTdHlsZSIsIkxPQURfQ1VTVE9NX01BUF9TVFlMRSIsImN1c3RvbU1hcFN0eWxlIiwic2V0M2RCdWlsZGluZ0NvbG9yIiwiU0VUXzNEX0JVSUxESU5HX0NPTE9SIiwiY29sb3IiLCJtYXBTdHlsZUFjdGlvbnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBS0E7Ozs7Ozs7O0FBUU8sSUFBTUEsaUJBQWlCLEdBQUcsZ0NBQWFDLHdCQUFZQyxvQkFBekIsQ0FBMUI7QUFFUDs7Ozs7Ozs7Ozs7Ozs7O0FBYU8sSUFBTUMsYUFBYSxHQUFHLGdDQUFhRix3QkFBWUcsZUFBekIsRUFBMEMsVUFBQ0MsVUFBRCxFQUFhQyxRQUFiO0FBQUEsU0FBMkI7QUFDaEdELElBQUFBLFVBQVUsRUFBVkEsVUFEZ0c7QUFFaEdDLElBQUFBLFFBQVEsRUFBUkE7QUFGZ0csR0FBM0I7QUFBQSxDQUExQyxDQUF0QjtBQUtQOzs7Ozs7OztBQU1PLElBQU1DLGVBQWUsR0FBRyxnQ0FBYU4sd0JBQVlPLGlCQUF6QixFQUE0QyxVQUFBQyxRQUFRO0FBQUEsU0FBSUEsUUFBSjtBQUFBLENBQXBELENBQXhCO0FBRVA7Ozs7Ozs7O0FBTU8sSUFBTUMsZ0JBQWdCLEdBQUcsZ0NBQzlCVCx3QkFBWVUsa0JBRGtCLEVBRTlCLFVBQUFDLFNBQVM7QUFBQSxTQUFJQSxTQUFKO0FBQUEsQ0FGcUIsQ0FBekI7QUFJUDs7Ozs7Ozs7QUFNTyxJQUFNQyxhQUFhLEdBQUcsZ0NBQWFaLHdCQUFZYSxlQUF6QixFQUEwQyxVQUFBQyxTQUFTO0FBQUEsU0FBSUEsU0FBSjtBQUFBLENBQW5ELENBQXRCO0FBRVA7Ozs7Ozs7O0FBTU8sSUFBTUMsZUFBZSxHQUFHLGdDQUFhZix3QkFBWWdCLGtCQUF6QixFQUE2QyxVQUFBQyxLQUFLO0FBQUEsU0FBSUEsS0FBSjtBQUFBLENBQWxELENBQXhCO0FBRVA7Ozs7Ozs7O0FBTU8sSUFBTUMsY0FBYyxHQUFHLGdDQUFhbEIsd0JBQVltQixnQkFBekIsRUFBMkMsVUFBQUMsU0FBUztBQUFBLFNBQUlBLFNBQUo7QUFBQSxDQUFwRCxDQUF2QjtBQUVQOzs7Ozs7Ozs7OztBQVNPLElBQU1DLGtCQUFrQixHQUFHLGdDQUNoQ3JCLHdCQUFZc0IscUJBRG9CLEVBRWhDLFVBQUFDLGNBQWM7QUFBQSxTQUFJQSxjQUFKO0FBQUEsQ0FGa0IsQ0FBM0IsQyxDQUtQOztBQUNBOzs7Ozs7OztBQU1PLElBQU1DLGtCQUFrQixHQUFHLGdDQUFheEIsd0JBQVl5QixxQkFBekIsRUFBZ0QsVUFBQUMsS0FBSztBQUFBLFNBQUlBLEtBQUo7QUFBQSxDQUFyRCxDQUEzQjtBQUVQOzs7Ozs7OztBQU9BOzs7QUFDQSxJQUFNQyxlQUFlLEdBQUcsSUFBeEI7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7Y3JlYXRlQWN0aW9ufSBmcm9tICdyZWR1eC1hY3Rpb25zJztcbmltcG9ydCBBY3Rpb25UeXBlcyBmcm9tICdjb25zdGFudHMvYWN0aW9uLXR5cGVzJztcblxuLyoqXG4gKiBBZGQgbWFwIHN0eWxlIGZyb20gdXNlciBpbnB1dCB0byByZWR1Y2VyIGFuZCBzZXQgaXQgdG8gY3VycmVudCBzdHlsZVxuICogVGhpcyBhY3Rpb24gaXMgY2FsbGVkIHdoZW4gdXNlciBjbGljayBjb25maXJtIGFmdGVyIHB1dHRpbmcgaW4gYSB2YWxpZCBzdHlsZSB1cmwgaW4gdGhlIGN1c3RvbSBtYXAgc3R5bGUgZGlhbG9nLlxuICogSXQgc2hvdWxkIG5vdCBiZSBjYWxsZWQgZnJvbSBvdXRzaWRlIGtlcGxlci5nbCB3aXRob3V0IGEgdmFsaWQgYGlucHV0U3R5bGVgIGluIHRoZSBgbWFwU3R5bGVgIHJlZHVjZXIuXG4gKiBwYXJhbSB7dm9pZH1cbiAqIEBtZW1iZXJvZiBtYXBTdHlsZUFjdGlvbnNcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IGFkZEN1c3RvbU1hcFN0eWxlID0gY3JlYXRlQWN0aW9uKEFjdGlvblR5cGVzLkFERF9DVVNUT01fTUFQX1NUWUxFKTtcblxuLyoqXG4gKiBJbnB1dCBhIGN1c3RvbSBtYXAgc3R5bGUgb2JqZWN0XG4gKiBAbWVtYmVyb2YgbWFwU3R5bGVBY3Rpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gaW5wdXRTdHlsZVxuICogQHBhcmFtIHtzdHJpbmd9IGlucHV0U3R5bGUudXJsIC0gc3R5bGUgdXJsIGUuZy4gYCdtYXBib3g6Ly9zdHlsZXMvaGVzaGFuL3h4eHh4eXl5eXp6eidgXG4gKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRTdHlsZS5pZCAtIHN0eWxlIHVybCBlLmcuIGAnY3VzdG9tX3N0eWxlXzEnYFxuICogQHBhcmFtIHtPYmplY3R9IGlucHV0U3R5bGUuc3R5bGUgLSBhY3R1YWwgbWFwYm94IHN0eWxlIGpzb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBpbnB1dFN0eWxlLm5hbWUgLSBzdHlsZSBuYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gaW5wdXRTdHlsZS5sYXllckdyb3VwcyAtIGxheWVyIGdyb3VwcyB0aGF0IGNhbiBiZSB1c2VkIHRvIHNldCBtYXAgbGF5ZXIgdmlzaWJpbGl0eVxuICogQHBhcmFtIHtPYmplY3R9IGlucHV0U3R5bGUuaWNvbiAtIGljb24gaW1hZ2UgZGF0YSB1cmxcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXBTdGF0ZSAtIG1hcFN0YXRlIGlzIG9wdGlvbmFsXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBpbnB1dE1hcFN0eWxlID0gY3JlYXRlQWN0aW9uKEFjdGlvblR5cGVzLklOUFVUX01BUF9TVFlMRSwgKGlucHV0U3R5bGUsIG1hcFN0YXRlKSA9PiAoe1xuICBpbnB1dFN0eWxlLFxuICBtYXBTdGF0ZVxufSkpO1xuXG4vKipcbiAqIFVwZGF0ZSBgdmlzaWJsZUxheWVyR3JvdXBzYHRvIGNoYW5nZSBsYXllciBncm91cCB2aXNpYmlsaXR5XG4gKiBAbWVtYmVyb2YgbWFwU3R5bGVBY3Rpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gbWFwU3R5bGUgbmV3IGNvbmZpZyBge3Zpc2libGVMYXllckdyb3Vwczoge2xhYmVsOiBmYWxzZSwgcm9hZDogdHJ1ZSwgYmFja2dyb3VuZDogdHJ1ZX19YFxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgbWFwQ29uZmlnQ2hhbmdlID0gY3JlYXRlQWN0aW9uKEFjdGlvblR5cGVzLk1BUF9DT05GSUdfQ0hBTkdFLCBtYXBTdHlsZSA9PiBtYXBTdHlsZSk7XG5cbi8qKlxuICogUmVxdWVzdCBtYXAgc3R5bGUgc3R5bGUgb2JqZWN0IGJhc2VkIG9uIHN0eWxlLnVybC5cbiAqIEBtZW1iZXJvZiBtYXBTdHlsZUFjdGlvbnNcbiAqIEBwYXJhbSB7QXJyYXk8T2JqZWN0Pn0gbWFwU3R5bGVzXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCByZXF1ZXN0TWFwU3R5bGVzID0gY3JlYXRlQWN0aW9uKFxuICBBY3Rpb25UeXBlcy5SRVFVRVNUX01BUF9TVFlMRVMsXG4gIG1hcFN0eWxlcyA9PiBtYXBTdHlsZXNcbik7XG4vKipcbiAqIENhbGxiYWNrIHdoZW4gbG9hZCBtYXAgc3R5bGUgc3VjY2Vzc1xuICogQG1lbWJlcm9mIG1hcFN0eWxlQWN0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IG5ld1N0eWxlcyBhIGB7W2lkXTogc3R5bGV9YCBtYXBwaW5nXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBsb2FkTWFwU3R5bGVzID0gY3JlYXRlQWN0aW9uKEFjdGlvblR5cGVzLkxPQURfTUFQX1NUWUxFUywgbmV3U3R5bGVzID0+IG5ld1N0eWxlcyk7XG5cbi8qKlxuICogQ2FsbGJhY2sgd2hlbiBsb2FkIG1hcCBzdHlsZSBlcnJvclxuICogQG1lbWJlcm9mIG1hcFN0eWxlQWN0aW9uc1xuICogQHBhcmFtIHsqfSBlcnJvclxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgbG9hZE1hcFN0eWxlRXJyID0gY3JlYXRlQWN0aW9uKEFjdGlvblR5cGVzLkxPQURfTUFQX1NUWUxFX0VSUiwgZXJyb3IgPT4gZXJyb3IpO1xuXG4vKipcbiAqIENoYW5nZSB0byBhbm90aGVyIG1hcCBzdHlsZS4gVGhlIHNlbGVjdGVkIHN0eWxlIHNob3VsZCBhbHJlYWR5IGJlZW4gbG9hZGVkIGludG8gYG1hcFN0eWxlLm1hcFN0eWxlc2BcbiAqIEBtZW1iZXJvZiBtYXBTdHlsZUFjdGlvbnNcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHlsZVR5cGUgdGhlIHN0eWxlIHRvIGNoYW5nZSB0b1xuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgbWFwU3R5bGVDaGFuZ2UgPSBjcmVhdGVBY3Rpb24oQWN0aW9uVHlwZXMuTUFQX1NUWUxFX0NIQU5HRSwgc3R5bGVUeXBlID0+IHN0eWxlVHlwZSk7XG5cbi8qKlxuICogQ2FsbGJhY2sgd2hlbiBhIGN1c3RvbSBtYXAgc3R5bGUgb2JqZWN0IGlzIHJlY2VpdmVkXG4gKiBAbWVtYmVyb2YgbWFwU3R5bGVBY3Rpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gY3VzdG9tTWFwU3R5bGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBjdXN0b21NYXBTdHlsZS5pY29uXG4gKiBAcGFyYW0ge09iamVjdH0gY3VzdG9tTWFwU3R5bGUuc3R5bGVcbiAqIEBwYXJhbSB7Kn0gY3VzdG9tTWFwU3R5bGUuZXJyb3JcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IGxvYWRDdXN0b21NYXBTdHlsZSA9IGNyZWF0ZUFjdGlvbihcbiAgQWN0aW9uVHlwZXMuTE9BRF9DVVNUT01fTUFQX1NUWUxFLFxuICBjdXN0b21NYXBTdHlsZSA9PiBjdXN0b21NYXBTdHlsZVxuKTtcblxuLy8gU0VUXzNEX0JVSUxESU5HX0NPTE9SXG4vKipcbiAqIFNldCAzZCBidWlsZGluZyBsYXllciBncm91cCBjb2xvclxuICogQG1lbWJlcm9mIG1hcFN0eWxlQWN0aW9uc1xuICogQHBhcmFtIHtBcnJheX0gY29sb3IgLSBbciwgZywgYl1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHNldDNkQnVpbGRpbmdDb2xvciA9IGNyZWF0ZUFjdGlvbihBY3Rpb25UeXBlcy5TRVRfM0RfQlVJTERJTkdfQ09MT1IsIGNvbG9yID0+IGNvbG9yKTtcblxuLyoqXG4gKiBBY3Rpb25zIGhhbmRsZWQgbW9zdGx5IGJ5ICBgbWFwU3R5bGVgIHJlZHVjZXIuXG4gKiBUaGV5IG1hbmFnZSB0aGUgZGlzcGxheSBvZiBiYXNlIG1hcCwgc3VjaCBhcyBsb2FkaW5nIGFuZCByZWNlaXZpbmcgYmFzZSBtYXAgc3R5bGVzLFxuICogaGlkaW5nIGFuZCBzaG93aW5nIG1hcCBsYXllcnMsIHVzZXIgaW5wdXQgb2YgY3VzdG9tIG1hcCBzdHlsZSB1cmwuXG4gKlxuICogQHB1YmxpY1xuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuY29uc3QgbWFwU3R5bGVBY3Rpb25zID0gbnVsbDtcbi8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cbiJdfQ==