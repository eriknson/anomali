"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMapDimForSplitMap = getMapDimForSplitMap;
exports.toggleSplitMapUpdater = exports.receiveMapConfigUpdater = exports.resetMapConfigUpdater = exports.togglePerspectiveUpdater = exports.fitBoundsUpdater = exports.updateMapUpdater = exports.INITIAL_MAP_STATE = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _geoViewport = _interopRequireDefault(require("@mapbox/geo-viewport"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Updaters for `mapState` reducer. Can be used in your root reducer to directly modify kepler.gl's state.
 * Read more about [Using updaters](../advanced-usage/using-updaters.md)
 * @public
 * @example
 *
 * import keplerGlReducer, {mapStateUpdaters} from 'kepler.gl/reducers';
 * // Root Reducer
 * const reducers = combineReducers({
 *  keplerGl: keplerGlReducer,
 *  app: appReducer
 * });
 *
 * const composedReducer = (state, action) => {
 *  switch (action.type) {
 *    // click button to close side panel
 *    case 'CLICK_BUTTON':
 *      return {
 *        ...state,
 *        keplerGl: {
 *          ...state.keplerGl,
 *          foo: {
 *             ...state.keplerGl.foo,
 *             mapState: mapStateUpdaters.fitBoundsUpdater(
 *               mapState, {payload: [127.34, 31.09, 127.56, 31.59]]}
 *             )
 *          }
 *        }
 *      };
 *  }
 *  return reducers(state, action);
 * };
 *
 * export default composedReducer;
 */

/* eslint-disable no-unused-vars */
var mapStateUpdaters = null;
/* eslint-enable no-unused-vars */

/**
 * Default initial `mapState`
 * @memberof mapStateUpdaters
 * @constant
 * @property {number} pitch Default: `0`
 * @property {number} bearing Default: `0`
 * @property {number} latitude Default: `37.75043`
 * @property {number} longitude Default: `-122.34679`
 * @property {number} zoom Default: `9`
 * @property {boolean} dragRotate Default: `false`
 * @property {number} width Default: `800`
 * @property {number} height Default: `800`
 * @property {boolean} isSplit Default: `false`
 * @public
 */

var INITIAL_MAP_STATE = {
  pitch: 0,
  bearing: 0,
  latitude: 37.75043,
  longitude: -122.34679,
  zoom: 9,
  dragRotate: false,
  width: 800,
  height: 800,
  isSplit: false
};
/* Updaters */

/**
 * Update map viewport
 * @memberof mapStateUpdaters
 * @param {Object} state
 * @param {Object} action
 * @param {Object} action.payload - viewport
 * @returns {Object} nextState
 * @public
 */

exports.INITIAL_MAP_STATE = INITIAL_MAP_STATE;

var updateMapUpdater = function updateMapUpdater(state, action) {
  return _objectSpread({}, state, {}, action.payload || {});
};
/**
 * Fit map viewport to bounds
 * @memberof mapStateUpdaters
 * @param {Object} state
 * @param {Object} action
 * @param {number[]} action.payload - bounds as `[lngMin, latMin, lngMax, latMax]`
 * @returns {Object} nextState
 * @public
 */


exports.updateMapUpdater = updateMapUpdater;

var fitBoundsUpdater = function fitBoundsUpdater(state, action) {
  var bounds = action.payload;

  var _geoViewport$viewport = _geoViewport["default"].viewport(bounds, [state.width, state.height]),
      center = _geoViewport$viewport.center,
      zoom = _geoViewport$viewport.zoom;

  return _objectSpread({}, state, {
    latitude: center[1],
    longitude: center[0],
    zoom: zoom
  });
};
/**
 * Toggle between 3d and 2d map.
 * @memberof mapStateUpdaters
 * @param {Object} state
 * @returns {Object} nextState
 * @public
 */


exports.fitBoundsUpdater = fitBoundsUpdater;

var togglePerspectiveUpdater = function togglePerspectiveUpdater(state) {
  return _objectSpread({}, state, {}, {
    pitch: state.dragRotate ? 0 : 50,
    bearing: state.dragRotate ? 0 : 24
  }, {
    dragRotate: !state.dragRotate
  });
};
/**
 * reset mapState to initial State
 * @memberof mapStateUpdaters
 * @param {Object} state `mapState`
 * @returns {Object} nextState
 * @public
 */


exports.togglePerspectiveUpdater = togglePerspectiveUpdater;

var resetMapConfigUpdater = function resetMapConfigUpdater(state) {
  return _objectSpread({}, INITIAL_MAP_STATE, {}, state.initialState, {
    initialState: state.initialState
  });
}; // consider case where you have a split map and user wants to reset

/**
 * Update `mapState` to propagate a new config
 * @memberof mapStateUpdaters
 * @param {Object} state
 * @param {Object} action
 * @param {Object} action.payload - saved map config
 * @returns {Object} nextState
 * @public
 */


exports.resetMapConfigUpdater = resetMapConfigUpdater;

var receiveMapConfigUpdater = function receiveMapConfigUpdater(state, _ref) {
  var _ref$payload = _ref.payload,
      _ref$payload$config = _ref$payload.config,
      config = _ref$payload$config === void 0 ? {} : _ref$payload$config,
      _ref$payload$options = _ref$payload.options,
      options = _ref$payload$options === void 0 ? {} : _ref$payload$options,
      _ref$payload$bounds = _ref$payload.bounds,
      bounds = _ref$payload$bounds === void 0 ? null : _ref$payload$bounds;

  var _ref2 = config || {},
      mapState = _ref2.mapState; // merged received mapstate with previous state


  var mergedState = _objectSpread({}, state, {}, mapState); // if center map
  // center map will override mapState config


  if (options.centerMap && bounds) {
    mergedState = fitBoundsUpdater(mergedState, {
      payload: bounds
    });
  }

  return _objectSpread({}, mergedState, {}, getMapDimForSplitMap(mergedState.isSplit, state));
};
/**
 * Toggle between one or split maps
 * @memberof mapStateUpdaters
 * @param {Object} state
 * @returns {Object} nextState
 * @public
 */


exports.receiveMapConfigUpdater = receiveMapConfigUpdater;

var toggleSplitMapUpdater = function toggleSplitMapUpdater(state) {
  return _objectSpread({}, state, {
    isSplit: !state.isSplit
  }, getMapDimForSplitMap(!state.isSplit, state));
}; // Helpers


exports.toggleSplitMapUpdater = toggleSplitMapUpdater;

function getMapDimForSplitMap(isSplit, state) {
  // cases:
  // 1. state split: true - isSplit: true
  // do nothing
  // 2. state split: false - isSplit: false
  // do nothing
  if (state.isSplit === isSplit) {
    return {};
  }

  var width = state.isSplit && !isSplit ? // 3. state split: true - isSplit: false
  // double width
  state.width * 2 : // 4. state split: false - isSplit: true
  // split width
  state.width / 2;
  return {
    width: width
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy9tYXAtc3RhdGUtdXBkYXRlcnMuanMiXSwibmFtZXMiOlsibWFwU3RhdGVVcGRhdGVycyIsIklOSVRJQUxfTUFQX1NUQVRFIiwicGl0Y2giLCJiZWFyaW5nIiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJ6b29tIiwiZHJhZ1JvdGF0ZSIsIndpZHRoIiwiaGVpZ2h0IiwiaXNTcGxpdCIsInVwZGF0ZU1hcFVwZGF0ZXIiLCJzdGF0ZSIsImFjdGlvbiIsInBheWxvYWQiLCJmaXRCb3VuZHNVcGRhdGVyIiwiYm91bmRzIiwiZ2VvVmlld3BvcnQiLCJ2aWV3cG9ydCIsImNlbnRlciIsInRvZ2dsZVBlcnNwZWN0aXZlVXBkYXRlciIsInJlc2V0TWFwQ29uZmlnVXBkYXRlciIsImluaXRpYWxTdGF0ZSIsInJlY2VpdmVNYXBDb25maWdVcGRhdGVyIiwiY29uZmlnIiwib3B0aW9ucyIsIm1hcFN0YXRlIiwibWVyZ2VkU3RhdGUiLCJjZW50ZXJNYXAiLCJnZXRNYXBEaW1Gb3JTcGxpdE1hcCIsInRvZ2dsZVNwbGl0TWFwVXBkYXRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBb0JBOzs7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUNBO0FBQ0EsSUFBTUEsZ0JBQWdCLEdBQUcsSUFBekI7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztBQWVPLElBQU1DLGlCQUFpQixHQUFHO0FBQy9CQyxFQUFBQSxLQUFLLEVBQUUsQ0FEd0I7QUFFL0JDLEVBQUFBLE9BQU8sRUFBRSxDQUZzQjtBQUcvQkMsRUFBQUEsUUFBUSxFQUFFLFFBSHFCO0FBSS9CQyxFQUFBQSxTQUFTLEVBQUUsQ0FBQyxTQUptQjtBQUsvQkMsRUFBQUEsSUFBSSxFQUFFLENBTHlCO0FBTS9CQyxFQUFBQSxVQUFVLEVBQUUsS0FObUI7QUFPL0JDLEVBQUFBLEtBQUssRUFBRSxHQVB3QjtBQVEvQkMsRUFBQUEsTUFBTSxFQUFFLEdB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QUNqQixLQUFLLENBQUNGLE9BQVIsRUFBaUJFLEtBQWpCLENBSGlCO0FBQUEsQ0FBbkMsQyxDQU1QOzs7OztBQUNPLFNBQVNpQixvQkFBVCxDQUE4Qm5CLE9BQTlCLEVBQXVDRSxLQUF2QyxFQUE4QztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSUEsS0FBSyxDQUFDRixPQUFOLEtBQWtCQSxPQUF0QixFQUErQjtBQUM3QixXQUFPLEVBQVA7QUFDRDs7QUFFRCxNQUFNRixLQUFLLEdBQ1RJLEtBQUssQ0FBQ0YsT0FBTixJQUFpQixDQUFDQSxPQUFsQixHQUNJO0FBQ0E7QUFDQUUsRUFBQUEsS0FBSyxDQUFDSixLQUFOLEdBQWMsQ0FIbEIsR0FJSTtBQUNBO0FBQ0FJLEVBQUFBLEtBQUssQ0FBQ0osS0FBTixHQUFjLENBUHBCO0FBU0EsU0FBTztBQUNMQSxJQUFBQSxLQUFLLEVBQUxBO0FBREssR0FBUDtBQUdEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIwIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IGdlb1ZpZXdwb3J0IGZyb20gJ0BtYXBib3gvZ2VvLXZpZXdwb3J0JztcblxuLyoqXG4gKiBVcGRhdGVycyBmb3IgYG1hcFN0YXRlYCByZWR1Y2VyLiBDYW4gYmUgdXNlZCBpbiB5b3VyIHJvb3QgcmVkdWNlciB0byBkaXJlY3RseSBtb2RpZnkga2VwbGVyLmdsJ3Mgc3RhdGUuXG4gKiBSZWFkIG1vcmUgYWJvdXQgW1VzaW5nIHVwZGF0ZXJzXSguLi9hZHZhbmNlZC11c2FnZS91c2luZy11cGRhdGVycy5tZClcbiAqIEBwdWJsaWNcbiAqIEBleGFtcGxlXG4gKlxuICogaW1wb3J0IGtlcGxlckdsUmVkdWNlciwge21hcFN0YXRlVXBkYXRlcnN9IGZyb20gJ2tlcGxlci5nbC9yZWR1Y2Vycyc7XG4gKiAvLyBSb290IFJlZHVjZXJcbiAqIGNvbnN0IHJlZHVjZXJzID0gY29tYmluZVJlZHVjZXJzKHtcbiAqICBrZXBsZXJHbDoga2VwbGVyR2xSZWR1Y2VyLFxuICogIGFwcDogYXBwUmVkdWNlclxuICogfSk7XG4gKlxuICogY29uc3QgY29tcG9zZWRSZWR1Y2VyID0gKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAqICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gKiAgICAvLyBjbGljayBidXR0b24gdG8gY2xvc2Ugc2lkZSBwYW5lbFxuICogICAgY2FzZSAnQ0xJQ0tfQlVUVE9OJzpcbiAqICAgICAgcmV0dXJuIHtcbiAqICAgICAgICAuLi5zdGF0ZSxcbiAqICAgICAgICBrZXBsZXJHbDoge1xuICogICAgICAgICAgLi4uc3RhdGUua2VwbGVyR2wsXG4gKiAgICAgICAgICBmb286IHtcbiAqICAgICAgICAgICAgIC4uLnN0YXRlLmtlcGxlckdsLmZvbyxcbiAqICAgICAgICAgICAgIG1hcFN0YXRlOiBtYXBTdGF0ZVVwZGF0ZXJzLmZpdEJvdW5kc1VwZGF0ZXIoXG4gKiAgICAgICAgICAgICAgIG1hcFN0YXRlLCB7cGF5bG9hZDogWzEyNy4zNCwgMzEuMDksIDEyNy41NiwgMzEuNTldXX1cbiAqICAgICAgICAgICAgIClcbiAqICAgICAgICAgIH1cbiAqICAgICAgICB9XG4gKiAgICAgIH07XG4gKiAgfVxuICogIHJldHVybiByZWR1Y2VycyhzdGF0ZSwgYWN0aW9uKTtcbiAqIH07XG4gKlxuICogZXhwb3J0IGRlZmF1bHQgY29tcG9zZWRSZWR1Y2VyO1xuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuY29uc3QgbWFwU3RhdGVVcGRhdGVycyA9IG51bGw7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLXVudXNlZC12YXJzICovXG5cbi8qKlxuICogRGVmYXVsdCBpbml0aWFsIGBtYXBTdGF0ZWBcbiAqIEBtZW1iZXJvZiBtYXBTdGF0ZVVwZGF0ZXJzXG4gKiBAY29uc3RhbnRcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBwaXRjaCBEZWZhdWx0OiBgMGBcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBiZWFyaW5nIERlZmF1bHQ6IGAwYFxuICogQHByb3BlcnR5IHtudW1iZXJ9IGxhdGl0dWRlIERlZmF1bHQ6IGAzNy43NTA0M2BcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBsb25naXR1ZGUgRGVmYXVsdDogYC0xMjIuMzQ2NzlgXG4gKiBAcHJvcGVydHkge251bWJlcn0gem9vbSBEZWZhdWx0OiBgOWBcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gZHJhZ1JvdGF0ZSBEZWZhdWx0OiBgZmFsc2VgXG4gKiBAcHJvcGVydHkge251bWJlcn0gd2lkdGggRGVmYXVsdDogYDgwMGBcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBoZWlnaHQgRGVmYXVsdDogYDgwMGBcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaXNTcGxpdCBEZWZhdWx0OiBgZmFsc2VgXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBJTklUSUFMX01BUF9TVEFURSA9IHtcbiAgcGl0Y2g6IDAsXG4gIGJlYXJpbmc6IDAsXG4gIGxhdGl0dWRlOiAzNy43NTA0MyxcbiAgbG9uZ2l0dWRlOiAtMTIyLjM0Njc5LFxuICB6b29tOiA5LFxuICBkcmFnUm90YXRlOiBmYWxzZSxcbiAgd2lkdGg6IDgwMCxcbiAgaGVpZ2h0OiA4MDAsXG4gIGlzU3BsaXQ6IGZhbHNlXG59O1xuXG4vKiBVcGRhdGVycyAqL1xuLyoqXG4gKiBVcGRhdGUgbWFwIHZpZXdwb3J0XG4gKiBAbWVtYmVyb2YgbWFwU3RhdGVVcGRhdGVyc1xuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uLnBheWxvYWQgLSB2aWV3cG9ydFxuICogQHJldHVybnMge09iamVjdH0gbmV4dFN0YXRlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCB1cGRhdGVNYXBVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+ICh7XG4gIC4uLnN0YXRlLFxuICAuLi4oYWN0aW9uLnBheWxvYWQgfHwge30pXG59KTtcblxuLyoqXG4gKiBGaXQgbWFwIHZpZXdwb3J0IHRvIGJvdW5kc1xuICogQG1lbWJlcm9mIG1hcFN0YXRlVXBkYXRlcnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvblxuICogQHBhcmFtIHtudW1iZXJbXX0gYWN0aW9uLnBheWxvYWQgLSBib3VuZHMgYXMgYFtsbmdNaW4sIGxhdE1pbiwgbG5nTWF4LCBsYXRNYXhdYFxuICogQHJldHVybnMge09iamVjdH0gbmV4dFN0YXRlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBmaXRCb3VuZHNVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgY29uc3QgYm91bmRzID0gYWN0aW9uLnBheWxvYWQ7XG4gIGNvbnN0IHtjZW50ZXIsIHpvb219ID0gZ2VvVmlld3BvcnQudmlld3BvcnQoYm91bmRzLCBbc3RhdGUud2lkdGgsIHN0YXRlLmhlaWdodF0pO1xuXG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgbGF0aXR1ZGU6IGNlbnRlclsxXSxcbiAgICBsb25naXR1ZGU6IGNlbnRlclswXSxcbiAgICB6b29tXG4gIH07XG59O1xuXG4vKipcbiAqIFRvZ2dsZSBiZXR3ZWVuIDNkIGFuZCAyZCBtYXAuXG4gKiBAbWVtYmVyb2YgbWFwU3RhdGVVcGRhdGVyc1xuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBuZXh0U3RhdGVcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHRvZ2dsZVBlcnNwZWN0aXZlVXBkYXRlciA9IHN0YXRlID0+ICh7XG4gIC4uLnN0YXRlLFxuICAuLi57XG4gICAgcGl0Y2g6IHN0YXRlLmRyYWdSb3RhdGUgPyAwIDogNTAsXG4gICAgYmVhcmluZzogc3RhdGUuZHJhZ1JvdGF0ZSA/IDAgOiAyNFxuICB9LFxuICBkcmFnUm90YXRlOiAhc3RhdGUuZHJhZ1JvdGF0ZVxufSk7XG5cbi8qKlxuICogcmVzZXQgbWFwU3RhdGUgdG8gaW5pdGlhbCBTdGF0ZVxuICogQG1lbWJlcm9mIG1hcFN0YXRlVXBkYXRlcnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSBgbWFwU3RhdGVgXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBuZXh0U3RhdGVcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHJlc2V0TWFwQ29uZmlnVXBkYXRlciA9IHN0YXRlID0+ICh7XG4gIC4uLklOSVRJQUxfTUFQX1NUQVRFLFxuICAuLi5zdGF0ZS5pbml0aWFsU3RhdGUsXG4gIGluaXRpYWxTdGF0ZTogc3RhdGUuaW5pdGlhbFN0YXRlXG59KTtcblxuLy8gY29uc2lkZXIgY2FzZSB3aGVyZSB5b3UgaGF2ZSBhIHNwbGl0IG1hcCBhbmQgdXNlciB3YW50cyB0byByZXNldFxuLyoqXG4gKiBVcGRhdGUgYG1hcFN0YXRlYCB0byBwcm9wYWdhdGUgYSBuZXcgY29uZmlnXG4gKiBAbWVtYmVyb2YgbWFwU3RhdGVVcGRhdGVyc1xuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uLnBheWxvYWQgLSBzYXZlZCBtYXAgY29uZmlnXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBuZXh0U3RhdGVcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHJlY2VpdmVNYXBDb25maWdVcGRhdGVyID0gKFxuICBzdGF0ZSxcbiAge3BheWxvYWQ6IHtjb25maWcgPSB7fSwgb3B0aW9ucyA9IHt9LCBib3VuZHMgPSBudWxsfX1cbikgPT4ge1xuICBjb25zdCB7bWFwU3RhdGV9ID0gY29uZmlnIHx8IHt9O1xuXG4gIC8vIG1lcmdlZCByZWNlaXZlZCBtYXBzdGF0ZSB3aXRoIHByZXZpb3VzIHN0YXRlXG4gIGxldCBtZXJnZWRTdGF0ZSA9IHsuLi5zdGF0ZSwgLi4ubWFwU3RhdGV9O1xuXG4gIC8vIGlmIGNlbnRlciBtYXBcbiAgLy8gY2VudGVyIG1hcCB3aWxsIG92ZXJyaWRlIG1hcFN0YXRlIGNvbmZpZ1xuICBpZiAob3B0aW9ucy5jZW50ZXJNYXAgJiYgYm91bmRzKSB7XG4gICAgbWVyZ2VkU3RhdGUgPSBmaXRCb3VuZHNVcGRhdGVyKG1lcmdlZFN0YXRlLCB7XG4gICAgICBwYXlsb2FkOiBib3VuZHNcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgLi4ubWVyZ2VkU3RhdGUsXG4gICAgLy8gdXBkYXRlIHdpZHRoIGlmIGBpc1NwbGl0YCBoYXMgY2hhbmdlZFxuICAgIC4uLmdldE1hcERpbUZvclNwbGl0TWFwKG1lcmdlZFN0YXRlLmlzU3BsaXQsIHN0YXRlKVxuICB9O1xufTtcblxuLyoqXG4gKiBUb2dnbGUgYmV0d2VlbiBvbmUgb3Igc3BsaXQgbWFwc1xuICogQG1lbWJlcm9mIG1hcFN0YXRlVXBkYXRlcnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZVxuICogQHJldHVybnMge09iamVjdH0gbmV4dFN0YXRlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCB0b2dnbGVTcGxpdE1hcFVwZGF0ZXIgPSBzdGF0ZSA9PiAoe1xuICAuLi5zdGF0ZSxcbiAgaXNTcGxpdDogIXN0YXRlLmlzU3BsaXQsXG4gIC4uLmdldE1hcERpbUZvclNwbGl0TWFwKCFzdGF0ZS5pc1NwbGl0LCBzdGF0ZSlcbn0pO1xuXG4vLyBIZWxwZXJzXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWFwRGltRm9yU3BsaXRNYXAoaXNTcGxpdCwgc3RhdGUpIHtcbiAgLy8gY2FzZXM6XG4gIC8vIDEuIHN0YXRlIHNwbGl0OiB0cnVlIC0gaXNTcGxpdDogdHJ1ZVxuICAvLyBkbyBub3RoaW5nXG4gIC8vIDIuIHN0YXRlIHNwbGl0OiBmYWxzZSAtIGlzU3BsaXQ6IGZhbHNlXG4gIC8vIGRvIG5vdGhpbmdcbiAgaWYgKHN0YXRlLmlzU3BsaXQgPT09IGlzU3BsaXQpIHtcbiAgICByZXR1cm4ge307XG4gIH1cblxuICBjb25zdCB3aWR0aCA9XG4gICAgc3RhdGUuaXNTcGxpdCAmJiAhaXNTcGxpdFxuICAgICAgPyAvLyAzLiBzdGF0ZSBzcGxpdDogdHJ1ZSAtIGlzU3BsaXQ6IGZhbHNlXG4gICAgICAgIC8vIGRvdWJsZSB3aWR0aFxuICAgICAgICBzdGF0ZS53aWR0aCAqIDJcbiAgICAgIDogLy8gNC4gc3RhdGUgc3BsaXQ6IGZhbHNlIC0gaXNTcGxpdDogdHJ1ZVxuICAgICAgICAvLyBzcGxpdCB3aWR0aFxuICAgICAgICBzdGF0ZS53aWR0aCAvIDI7XG5cbiAgcmV0dXJuIHtcbiAgICB3aWR0aFxuICB9O1xufVxuIl19