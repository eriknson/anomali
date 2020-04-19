"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._updateProperty = exports.forwardTo = exports._actionFor = exports.unwrap = exports.isForwardAction = exports.wrapTo = exports.getActionForwardAddress = exports.ADDRESS_PREFIX = exports.FORWARD = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _lodash = _interopRequireDefault(require("lodash.curry"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
var FORWARD = '@redux-forward/FORWARD';
exports.FORWARD = FORWARD;
var ADDRESS_PREFIX = '@@KG_';
exports.ADDRESS_PREFIX = ADDRESS_PREFIX;

var getActionForwardAddress = function getActionForwardAddress(id) {
  return "".concat(ADDRESS_PREFIX).concat(id.toUpperCase());
};
/**
 * Wrap an action into a forward action that only modify the state of a specific
 * kepler.gl instance. kepler.gl reducer will look for signatures in the action to
 * determine whether it needs to be forwarded to a specific instance reducer.
 *
 * wrapTo can be curried. You can create a curried action wrapper by only supply the `id` argument
 *
 * A forward action looks like this
 * ```js
 *  {
 *    type: "@@kepler.gl/LAYER_CONFIG_CHANGE",
 *    payload: {
 *      type: '@@kepler.gl/LAYER_CONFIG_CHANGE',
 *      payload: {},
 *      meta: {
 *       // id of instance
 *        _id_: id
 *       // other meta
 *      }
 *    },
 *    meta: {
 *      _forward_: '@redux-forward/FORWARD',
 *      _addr_: '@@KG_id'
 *    }
 *  };
 * ```
 *
 * @memberof forwardActions
 * @param {string} id - The id to forward to
 * @param {Object} action - the action object {type: string, payload: *}
 * @returns {{type: string, payload: {type: string: payload: *, meta: {_id_: string}, meta: {_forward_: string, _addr_: string}}}}
 * @public
 * @example
 *
 * import {wrapTo, togglePerspective} from 'kepler.gl/actions';
 *
 * // This action will only dispatch to the KeplerGl instance with `id: map_1`
 * this.props.dispatch(wrapTo('map_1', togglePerspective()));
 *
 * // You can also create a curried action for each instance
 * const wrapToMap1 = wrapTo('map_1');
 * this.props.dispatch(wrapToMap1(togglePerspective()));
 */


exports.getActionForwardAddress = getActionForwardAddress;
var wrapTo = (0, _lodash["default"])(function (id, action) {
  return {
    // keep original action.type
    type: action.type,
    // actual action
    payload: _objectSpread({}, action, {
      meta: _objectSpread({}, action.meta, {
        _id_: id
      })
    }),
    // add forward signature to meta
    meta: _objectSpread({}, action.meta || {}, {
      _forward_: FORWARD,
      _addr_: getActionForwardAddress(id)
    })
  };
});
/**
 * Whether an action is a forward action
 * @memberof forwardActions
 * @param {Object} action - the action object
 * @returns {boolean} boolean - whether the action is a forward action
 * @public
 */

exports.wrapTo = wrapTo;

var isForwardAction = function isForwardAction(action) {
  return Boolean(action && action.meta && action.meta._forward_ === FORWARD);
};
/**
 * Unwrap an action
 * @memberof forwardActions
 * @param {Object} action - the action object
 * @returns {Object} - unwrapped action
 * @public
 */


exports.isForwardAction = isForwardAction;

var unwrap = function unwrap(action) {
  return isForwardAction(action) ? unwrap(action.payload) : action;
};
/**
 * Given an id, returns the action for that id.
 * If the action is not a forward action, return the action
 * @memberof forwardActions
 * @param {String} id
 * @param {Object} action
 * @private
 */


exports.unwrap = unwrap;

var _actionFor = function _actionFor(id, action) {
  return isForwardAction(action) ? action.meta._addr_ === getActionForwardAddress(id) ? action.payload : {} : action;
};
/**
 * Returns an action dispatcher that wraps and forwards the actions to a specific instance
 * @memberof forwardActions
 * @param {string} id - instance id
 * @param {Function} dispatch - action dispatcher
 * @public
 * @example
 *
 * // action and forward dispatcher
 * import {toggleSplitMap, forwardTo} from 'kepler.gl/actions';
 * import {connect} from 'react-redux';
 *
 * const MapContainer = props => (
 *  <div>
 *   <button onClick={() => props.keplerGlDispatch(toggleSplitMap())}/>
 *  </div>
 * )
 *
 * const mapDispatchToProps = (dispatch, props) => ({
 *  dispatch,
 *  keplerGlDispatch: forwardTo(‘foo’, dispatch)
 * });
 *
 * export default connect(
 *  state => state,
 *  mapDispatchToProps
 * )(MapContainer);
 */


exports._actionFor = _actionFor;

var forwardTo = function forwardTo(id, dispatch) {
  return function (action) {
    return dispatch(wrapTo(id, action));
  };
};
/**
 * Update the state of a kepler.gl instance
 * @memberof forwardActions
 * @param {Object} state
 * @param {string} id
 * @param {Object} nextState
 * @private
 */


exports.forwardTo = forwardTo;

var _updateProperty = function _updateProperty(state, id, nextState) {
  return state[id] === nextState ? state : _objectSpread({}, state, (0, _defineProperty2["default"])({}, id, nextState));
};
/**
 * This declaration is needed to group actions in docs
 */

/**
 * A set of helpers to forward dispatch actions to a specific instance reducer
 * @public
 */

/* eslint-disable no-unused-vars */


exports._updateProperty = _updateProperty;
var forwardActions = null;
/* eslint-enable no-unused-vars */
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL2FjdGlvbi13cmFwcGVyLmpzIl0sIm5hbWVzIjpbIkZPUldBUkQiLCJBRERSRVNTX1BSRUZJWCIsImdldEFjdGlvbkZvcndhcmRBZGRyZXNzIiwiaWQiLCJ0b1VwcGVyQ2FzZSIsIndyYXBUbyIsImFjdGlvbiIsInR5cGUiLCJwYXlsb2FkIiwibWV0YSIsIl9pZF8iLCJfZm9yd2FyZF8iLCJfYWRkcl8iLCJpc0ZvcndhcmRBY3Rpb24iLCJCb29sZWFuIiwidW53cmFwIiwiX2FjdGlvbkZvciIsImZvcndhcmRUbyIsImRpc3BhdGNoIiwiX3VwZGF0ZVByb3BlcnR5Iiwic3RhdGUiLCJuZXh0U3RhdGUiLCJmb3J3YXJkQWN0aW9ucyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUF1QkE7Ozs7OztBQXZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVPLElBQU1BLE9BQU8sR0FBRyx3QkFBaEI7O0FBQ0EsSUFBTUMsY0FBYyxHQUFHLE9BQXZCOzs7QUFJQSxJQUFNQyx1QkFBdUIsR0FBRyxTQUExQkEsdUJBQTBCLENBQUFDLEVBQUU7QUFBQSxtQkFBT0YsY0FBUCxTQUF3QkUsRUFBRSxDQUFDQyxXQUFILEVBQXhCO0FBQUEsQ0FBbEM7QUFFUDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTJDTyxJQUFNQyxNQUFNLEdBQUcsd0JBQU0sVUFBQ0YsRUFBRCxFQUFLRyxNQUFMO0FBQUEsU0FBaUI7QUFDM0M7QUFDQUMsSUFBQUEsSUFBSSxFQUFFRCxNQUFNLENBQUNDLElBRjhCO0FBSTNDO0FBQ0FDLElBQUFBLE9BQU8sb0JBQ0ZGLE1BREU7QUFFTEcsTUFBQUEsSUFBSSxvQkFDQ0gsTUFBTSxDQUFDRyxJQURSO0FBRUZDLFFBQUFBLElBQUksRUFBRVA7QUFGSjtBQUZDLE1BTG9DO0FBYTNDO0FBQ0FNLElBQUFBLElBQUksb0JBQ0VILE1BQU0sQ0FBQ0csSUFBUCxJQUFlLEVBRGpCO0FBRUZFLE1BQUFBLFNBQVMsRUFBRVgsT0FGVDtBQUdGWSxNQUFBQSxNQUFNLEVBQUVWLHVCQUF1QixDQUFDQyxFQUFEO0FBSDdCO0FBZHVDLEdBQWpCO0FBQUEsQ0FBTixDQUFmO0FBcUJQOzs7Ozs7Ozs7O0FBT08sSUFBTVUsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixDQUFBUCxNQUFNLEVBQUk7QUFDdkMsU0FBT1EsT0FBTyxDQUFDUixNQUFNLElBQUlBLE1BQU0sQ0FBQ0csSUFBakIsSUFBeUJILE1BQU0sQ0FBQ0csSUFBUCxDQUFZRSxTQUFaLEtBQTBCWCxPQUFwRCxDQUFkO0FBQ0QsQ0FGTTtBQUlQOzs7Ozs7Ozs7OztBQU9PLElBQU1lLE1BQU0sR0FBRyxTQUFUQSxNQUFTLENBQUFULE1BQU07QUFBQSxTQUFLTyxlQUFlLENBQUNQLE1BQUQsQ0FBZixHQUEwQlMsTUFBTSxDQUFDVCxNQUFNLENBQUNFLE9BQVIsQ0FBaEMsR0FBbURGLE1BQXhEO0FBQUEsQ0FBckI7QUFFUDs7Ozs7Ozs7Ozs7O0FBUU8sSUFBTVUsVUFBVSxHQUFHLFNBQWJBLFVBQWEsQ0FBQ2IsRUFBRCxFQUFLRyxNQUFMO0FBQUEsU0FDeEJPLGVBQWUsQ0FBQ1AsTUFBRCxDQUFmLEdBQ0lBLE1BQU0sQ0FBQ0csSUFBUCxDQUFZRyxNQUFaLEtBQXVCVix1QkFBdUIsQ0FBQ0MsRUFBRCxDQUE5QyxHQUNFRyxNQUFNLENBQUNFLE9BRFQsR0FFRSxFQUhOLEdBSUlGLE1BTG9CO0FBQUEsQ0FBbkI7QUFPUDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE0Qk8sSUFBTVcsU0FBUyxHQUFHLFNBQVpBLFNBQVksQ0FBQ2QsRUFBRCxFQUFLZSxRQUFMO0FBQUEsU0FBa0IsVUFBQVosTUFBTTtBQUFBLFdBQUlZLFFBQVEsQ0FBQ2IsTUFBTSxDQUFDRixFQUFELEVBQUtHLE1BQUwsQ0FBUCxDQUFaO0FBQUEsR0FBeEI7QUFBQSxDQUFsQjtBQUVQOzs7Ozs7Ozs7Ozs7QUFRTyxJQUFNYSxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLENBQUNDLEtBQUQsRUFBUWpCLEVBQVIsRUFBWWtCLFNBQVo7QUFBQSxTQUM3QkQsS0FBSyxDQUFDakIsRUFBRCxDQUFMLEtBQWNrQixTQUFkLEdBQ0lELEtBREoscUJBR1NBLEtBSFQsdUNBSU9qQixFQUpQLEVBSVlrQixTQUpaLEVBRDZCO0FBQUEsQ0FBeEI7QUFRUDs7OztBQUdBOzs7OztBQUlBOzs7O0FBQ0EsSUFBTUMsY0FBYyxHQUFHLElBQXZCO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMjAgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5leHBvcnQgY29uc3QgRk9SV0FSRCA9ICdAcmVkdXgtZm9yd2FyZC9GT1JXQVJEJztcbmV4cG9ydCBjb25zdCBBRERSRVNTX1BSRUZJWCA9ICdAQEtHXyc7XG5cbmltcG9ydCBjdXJyeSBmcm9tICdsb2Rhc2guY3VycnknO1xuXG5leHBvcnQgY29uc3QgZ2V0QWN0aW9uRm9yd2FyZEFkZHJlc3MgPSBpZCA9PiBgJHtBRERSRVNTX1BSRUZJWH0ke2lkLnRvVXBwZXJDYXNlKCl9YDtcblxuLyoqXG4gKiBXcmFwIGFuIGFjdGlvbiBpbnRvIGEgZm9yd2FyZCBhY3Rpb24gdGhhdCBvbmx5IG1vZGlmeSB0aGUgc3RhdGUgb2YgYSBzcGVjaWZpY1xuICoga2VwbGVyLmdsIGluc3RhbmNlLiBrZXBsZXIuZ2wgcmVkdWNlciB3aWxsIGxvb2sgZm9yIHNpZ25hdHVyZXMgaW4gdGhlIGFjdGlvbiB0b1xuICogZGV0ZXJtaW5lIHdoZXRoZXIgaXQgbmVlZHMgdG8gYmUgZm9yd2FyZGVkIHRvIGEgc3BlY2lmaWMgaW5zdGFuY2UgcmVkdWNlci5cbiAqXG4gKiB3cmFwVG8gY2FuIGJlIGN1cnJpZWQuIFlvdSBjYW4gY3JlYXRlIGEgY3VycmllZCBhY3Rpb24gd3JhcHBlciBieSBvbmx5IHN1cHBseSB0aGUgYGlkYCBhcmd1bWVudFxuICpcbiAqIEEgZm9yd2FyZCBhY3Rpb24gbG9va3MgbGlrZSB0aGlzXG4gKiBgYGBqc1xuICogIHtcbiAqICAgIHR5cGU6IFwiQEBrZXBsZXIuZ2wvTEFZRVJfQ09ORklHX0NIQU5HRVwiLFxuICogICAgcGF5bG9hZDoge1xuICogICAgICB0eXBlOiAnQEBrZXBsZXIuZ2wvTEFZRVJfQ09ORklHX0NIQU5HRScsXG4gKiAgICAgIHBheWxvYWQ6IHt9LFxuICogICAgICBtZXRhOiB7XG4gKiAgICAgICAvLyBpZCBvZiBpbnN0YW5jZVxuICogICAgICAgIF9pZF86IGlkXG4gKiAgICAgICAvLyBvdGhlciBtZXRhXG4gKiAgICAgIH1cbiAqICAgIH0sXG4gKiAgICBtZXRhOiB7XG4gKiAgICAgIF9mb3J3YXJkXzogJ0ByZWR1eC1mb3J3YXJkL0ZPUldBUkQnLFxuICogICAgICBfYWRkcl86ICdAQEtHX2lkJ1xuICogICAgfVxuICogIH07XG4gKiBgYGBcbiAqXG4gKiBAbWVtYmVyb2YgZm9yd2FyZEFjdGlvbnNcbiAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIFRoZSBpZCB0byBmb3J3YXJkIHRvXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uIC0gdGhlIGFjdGlvbiBvYmplY3Qge3R5cGU6IHN0cmluZywgcGF5bG9hZDogKn1cbiAqIEByZXR1cm5zIHt7dHlwZTogc3RyaW5nLCBwYXlsb2FkOiB7dHlwZTogc3RyaW5nOiBwYXlsb2FkOiAqLCBtZXRhOiB7X2lkXzogc3RyaW5nfSwgbWV0YToge19mb3J3YXJkXzogc3RyaW5nLCBfYWRkcl86IHN0cmluZ319fX1cbiAqIEBwdWJsaWNcbiAqIEBleGFtcGxlXG4gKlxuICogaW1wb3J0IHt3cmFwVG8sIHRvZ2dsZVBlcnNwZWN0aXZlfSBmcm9tICdrZXBsZXIuZ2wvYWN0aW9ucyc7XG4gKlxuICogLy8gVGhpcyBhY3Rpb24gd2lsbCBvbmx5IGRpc3BhdGNoIHRvIHRoZSBLZXBsZXJHbCBpbnN0YW5jZSB3aXRoIGBpZDogbWFwXzFgXG4gKiB0aGlzLnByb3BzLmRpc3BhdGNoKHdyYXBUbygnbWFwXzEnLCB0b2dnbGVQZXJzcGVjdGl2ZSgpKSk7XG4gKlxuICogLy8gWW91IGNhbiBhbHNvIGNyZWF0ZSBhIGN1cnJpZWQgYWN0aW9uIGZvciBlYWNoIGluc3RhbmNlXG4gKiBjb25zdCB3cmFwVG9NYXAxID0gd3JhcFRvKCdtYXBfMScpO1xuICogdGhpcy5wcm9wcy5kaXNwYXRjaCh3cmFwVG9NYXAxKHRvZ2dsZVBlcnNwZWN0aXZlKCkpKTtcbiAqL1xuZXhwb3J0IGNvbnN0IHdyYXBUbyA9IGN1cnJ5KChpZCwgYWN0aW9uKSA9PiAoe1xuICAvLyBrZWVwIG9yaWdpbmFsIGFjdGlvbi50eXBlXG4gIHR5cGU6IGFjdGlvbi50eXBlLFxuXG4gIC8vIGFjdHVhbCBhY3Rpb25cbiAgcGF5bG9hZDoge1xuICAgIC4uLmFjdGlvbixcbiAgICBtZXRhOiB7XG4gICAgICAuLi5hY3Rpb24ubWV0YSxcbiAgICAgIF9pZF86IGlkXG4gICAgfVxuICB9LFxuXG4gIC8vIGFkZCBmb3J3YXJkIHNpZ25hdHVyZSB0byBtZXRhXG4gIG1ldGE6IHtcbiAgICAuLi4oYWN0aW9uLm1ldGEgfHwge30pLFxuICAgIF9mb3J3YXJkXzogRk9SV0FSRCxcbiAgICBfYWRkcl86IGdldEFjdGlvbkZvcndhcmRBZGRyZXNzKGlkKVxuICB9XG59KSk7XG5cbi8qKlxuICogV2hldGhlciBhbiBhY3Rpb24gaXMgYSBmb3J3YXJkIGFjdGlvblxuICogQG1lbWJlcm9mIGZvcndhcmRBY3Rpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uIC0gdGhlIGFjdGlvbiBvYmplY3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBib29sZWFuIC0gd2hldGhlciB0aGUgYWN0aW9uIGlzIGEgZm9yd2FyZCBhY3Rpb25cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IGlzRm9yd2FyZEFjdGlvbiA9IGFjdGlvbiA9PiB7XG4gIHJldHVybiBCb29sZWFuKGFjdGlvbiAmJiBhY3Rpb24ubWV0YSAmJiBhY3Rpb24ubWV0YS5fZm9yd2FyZF8gPT09IEZPUldBUkQpO1xufTtcblxuLyoqXG4gKiBVbndyYXAgYW4gYWN0aW9uXG4gKiBAbWVtYmVyb2YgZm9yd2FyZEFjdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24gLSB0aGUgYWN0aW9uIG9iamVjdFxuICogQHJldHVybnMge09iamVjdH0gLSB1bndyYXBwZWQgYWN0aW9uXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCB1bndyYXAgPSBhY3Rpb24gPT4gKGlzRm9yd2FyZEFjdGlvbihhY3Rpb24pID8gdW53cmFwKGFjdGlvbi5wYXlsb2FkKSA6IGFjdGlvbik7XG5cbi8qKlxuICogR2l2ZW4gYW4gaWQsIHJldHVybnMgdGhlIGFjdGlvbiBmb3IgdGhhdCBpZC5cbiAqIElmIHRoZSBhY3Rpb24gaXMgbm90IGEgZm9yd2FyZCBhY3Rpb24sIHJldHVybiB0aGUgYWN0aW9uXG4gKiBAbWVtYmVyb2YgZm9yd2FyZEFjdGlvbnNcbiAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvblxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGNvbnN0IF9hY3Rpb25Gb3IgPSAoaWQsIGFjdGlvbikgPT5cbiAgaXNGb3J3YXJkQWN0aW9uKGFjdGlvbilcbiAgICA/IGFjdGlvbi5tZXRhLl9hZGRyXyA9PT0gZ2V0QWN0aW9uRm9yd2FyZEFkZHJlc3MoaWQpXG4gICAgICA/IGFjdGlvbi5wYXlsb2FkXG4gICAgICA6IHt9XG4gICAgOiBhY3Rpb247XG5cbi8qKlxuICogUmV0dXJucyBhbiBhY3Rpb24gZGlzcGF0Y2hlciB0aGF0IHdyYXBzIGFuZCBmb3J3YXJkcyB0aGUgYWN0aW9ucyB0byBhIHNwZWNpZmljIGluc3RhbmNlXG4gKiBAbWVtYmVyb2YgZm9yd2FyZEFjdGlvbnNcbiAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIGluc3RhbmNlIGlkXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBkaXNwYXRjaCAtIGFjdGlvbiBkaXNwYXRjaGVyXG4gKiBAcHVibGljXG4gKiBAZXhhbXBsZVxuICpcbiAqIC8vIGFjdGlvbiBhbmQgZm9yd2FyZCBkaXNwYXRjaGVyXG4gKiBpbXBvcnQge3RvZ2dsZVNwbGl0TWFwLCBmb3J3YXJkVG99IGZyb20gJ2tlcGxlci5nbC9hY3Rpb25zJztcbiAqIGltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuICpcbiAqIGNvbnN0IE1hcENvbnRhaW5lciA9IHByb3BzID0+IChcbiAqICA8ZGl2PlxuICogICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHByb3BzLmtlcGxlckdsRGlzcGF0Y2godG9nZ2xlU3BsaXRNYXAoKSl9Lz5cbiAqICA8L2Rpdj5cbiAqIClcbiAqXG4gKiBjb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gsIHByb3BzKSA9PiAoe1xuICogIGRpc3BhdGNoLFxuICogIGtlcGxlckdsRGlzcGF0Y2g6IGZvcndhcmRUbyjigJhmb2/igJksIGRpc3BhdGNoKVxuICogfSk7XG4gKlxuICogZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcbiAqICBzdGF0ZSA9PiBzdGF0ZSxcbiAqICBtYXBEaXNwYXRjaFRvUHJvcHNcbiAqICkoTWFwQ29udGFpbmVyKTtcbiAqL1xuZXhwb3J0IGNvbnN0IGZvcndhcmRUbyA9IChpZCwgZGlzcGF0Y2gpID0+IGFjdGlvbiA9PiBkaXNwYXRjaCh3cmFwVG8oaWQsIGFjdGlvbikpO1xuXG4vKipcbiAqIFVwZGF0ZSB0aGUgc3RhdGUgb2YgYSBrZXBsZXIuZ2wgaW5zdGFuY2VcbiAqIEBtZW1iZXJvZiBmb3J3YXJkQWN0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBuZXh0U3RhdGVcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBjb25zdCBfdXBkYXRlUHJvcGVydHkgPSAoc3RhdGUsIGlkLCBuZXh0U3RhdGUpID0+XG4gIHN0YXRlW2lkXSA9PT0gbmV4dFN0YXRlXG4gICAgPyBzdGF0ZVxuICAgIDoge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgW2lkXTogbmV4dFN0YXRlXG4gICAgICB9O1xuXG4vKipcbiAqIFRoaXMgZGVjbGFyYXRpb24gaXMgbmVlZGVkIHRvIGdyb3VwIGFjdGlvbnMgaW4gZG9jc1xuICovXG4vKipcbiAqIEEgc2V0IG9mIGhlbHBlcnMgdG8gZm9yd2FyZCBkaXNwYXRjaCBhY3Rpb25zIHRvIGEgc3BlY2lmaWMgaW5zdGFuY2UgcmVkdWNlclxuICogQHB1YmxpY1xuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuY29uc3QgZm9yd2FyZEFjdGlvbnMgPSBudWxsO1xuLyogZXNsaW50LWVuYWJsZSBuby11bnVzZWQtdmFycyAqL1xuIl19