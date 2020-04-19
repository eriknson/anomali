"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renameEntry = exports.deleteEntry = exports.registerEntry = void 0;

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
 *
 * Add a new kepler.gl instance in `keplerGlReducer`. This action is called under-the-hood when a `KeplerGl` component is **mounted** to the dom.
 * Note that if you dispatch actions such as adding data to a kepler.gl instance before the React component is mounted, the action will not be
 * performed. Instance reducer can only handle actions when it is instantiated.
 * @memberof rootActions
 * @param {Object} payload
 * @param {string} payload.id - ***required** The id of the instance
 * @param {boolean} payload.mint - Whether to use a fresh empty state, when `mint: true` it will *always* load a fresh state when the component is re-mounted.
 * When `mint: false` it will register with existing instance state under the same `id`, when the component is unmounted then mounted again. Default: `true`
 * @param {string} payload.mapboxApiAccessToken - mapboxApiAccessToken to be saved in `map-style` reducer.
 * @param {string} payload.mapboxApiUrl - mapboxApiUrl to be saved in `map-style` reducer.
 * @param {Boolean} payload.mapStylesReplaceDefault - mapStylesReplaceDefault to be saved in `map-style` reducer.
 * @public
 */
var registerEntry = (0, _reduxActions.createAction)(_actionTypes["default"].REGISTER_ENTRY, function (_ref) {
  var id = _ref.id,
      mint = _ref.mint,
      mapboxApiAccessToken = _ref.mapboxApiAccessToken,
      mapboxApiUrl = _ref.mapboxApiUrl,
      mapStylesReplaceDefault = _ref.mapStylesReplaceDefault;
  return {
    id: id,
    mint: mint,
    mapboxApiAccessToken: mapboxApiAccessToken,
    mapboxApiUrl: mapboxApiUrl,
    mapStylesReplaceDefault: mapStylesReplaceDefault
  };
});
/**
 *
 * Delete an instance from `keplerGlReducer`. This action is called under-the-hood when a `KeplerGl` component is **un-mounted** to the dom.
 * If `mint` is set to be `true` in the component prop, the instance state will be deleted from the root reducer. Otherwise, the root reducer will keep
 * the instance state and later transfer it to a newly mounted component with the same `id`
 * @memberof rootActions
 * @param {string} id - the id of the instance to be deleted
 * @public
 */

exports.registerEntry = registerEntry;
var deleteEntry = (0, _reduxActions.createAction)(_actionTypes["default"].DELETE_ENTRY, function (id) {
  return id;
});
/**
 *
 * Rename an instance in the root reducer, keep its entire state
 *
 * @memberof rootActions
 * @param {string} oldId - ***required** old id
 * @param {string} newId - ***required** new id
 * @public
 */

exports.deleteEntry = deleteEntry;
var renameEntry = (0, _reduxActions.createAction)(_actionTypes["default"].RENAME_ENTRY, function (oldId, newId) {
  return {
    oldId: oldId,
    newId: newId
  };
});
/**
 * This declaration is needed to group actions in docs
 */

/**
 * Root actions managers adding and removing instances in root reducer.
 * Under-the-hood, when a `KeplerGl` component is mounted or unmounted,
 * it will automatically calls these actions to add itself to the root reducer.
 * However, sometimes the data is ready before the component is registered in the reducer,
 * in this case, you can manually call these actions or the corresponding updater to add it to the reducer.
 *
 * @public
 */

/* eslint-disable no-unused-vars */

exports.renameEntry = renameEntry;
var rootActions = null;
/* eslint-enable no-unused-vars */
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL2lkZW50aXR5LWFjdGlvbnMuanMiXSwibmFtZXMiOlsicmVnaXN0ZXJFbnRyeSIsIkFjdGlvblR5cGVzIiwiUkVHSVNURVJfRU5UUlkiLCJpZCIsIm1pbnQiLCJtYXBib3hBcGlBY2Nlc3NUb2tlbiIsIm1hcGJveEFwaVVybCIsIm1hcFN0eWxlc1JlcGxhY2VEZWZhdWx0IiwiZGVsZXRlRW50cnkiLCJERUxFVEVfRU5UUlkiLCJyZW5hbWVFbnRyeSIsIlJFTkFNRV9FTlRSWSIsIm9sZElkIiwibmV3SWQiLCJyb290QWN0aW9ucyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQXJCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFLQTs7Ozs7Ozs7Ozs7Ozs7O0FBZU8sSUFBTUEsYUFBYSxHQUFHLGdDQUMzQkMsd0JBQVlDLGNBRGUsRUFFM0I7QUFBQSxNQUFFQyxFQUFGLFFBQUVBLEVBQUY7QUFBQSxNQUFNQyxJQUFOLFFBQU1BLElBQU47QUFBQSxNQUFZQyxvQkFBWixRQUFZQSxvQkFBWjtBQUFBLE1BQWtDQyxZQUFsQyxRQUFrQ0EsWUFBbEM7QUFBQSxNQUFnREMsdUJBQWhELFFBQWdEQSx1QkFBaEQ7QUFBQSxTQUE4RTtBQUM1RUosSUFBQUEsRUFBRSxFQUFGQSxFQUQ0RTtBQUU1RUMsSUFBQUEsSUFBSSxFQUFKQSxJQUY0RTtBQUc1RUMsSUFBQUEsb0JBQW9CLEVBQXBCQSxvQkFINEU7QUFJNUVDLElBQUFBLFlBQVksRUFBWkEsWUFKNEU7QUFLNUVDLElBQUFBLHVCQUF1QixFQUF2QkE7QUFMNEUsR0FBOUU7QUFBQSxDQUYyQixDQUF0QjtBQVdQOzs7Ozs7Ozs7OztBQVNPLElBQU1DLFdBQVcsR0FBRyxnQ0FBYVAsd0JBQVlRLFlBQXpCLEVBQXVDLFVBQUFOLEVBQUU7QUFBQSxTQUFJQSxFQUFKO0FBQUEsQ0FBekMsQ0FBcEI7QUFFUDs7Ozs7Ozs7Ozs7QUFTTyxJQUFNTyxXQUFXLEdBQUcsZ0NBQWFULHdCQUFZVSxZQUF6QixFQUF1QyxVQUFDQyxLQUFELEVBQVFDLEtBQVI7QUFBQSxTQUFtQjtBQUNuRkQsSUFBQUEsS0FBSyxFQUFMQSxLQURtRjtBQUVuRkMsSUFBQUEsS0FBSyxFQUFMQTtBQUZtRixHQUFuQjtBQUFBLENBQXZDLENBQXBCO0FBS1A7Ozs7QUFHQTs7Ozs7Ozs7OztBQVNBOzs7QUFDQSxJQUFNQyxXQUFXLEdBQUcsSUFBcEI7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7Y3JlYXRlQWN0aW9ufSBmcm9tICdyZWR1eC1hY3Rpb25zJztcbmltcG9ydCBBY3Rpb25UeXBlcyBmcm9tICdjb25zdGFudHMvYWN0aW9uLXR5cGVzJztcblxuLyoqXG4gKlxuICogQWRkIGEgbmV3IGtlcGxlci5nbCBpbnN0YW5jZSBpbiBga2VwbGVyR2xSZWR1Y2VyYC4gVGhpcyBhY3Rpb24gaXMgY2FsbGVkIHVuZGVyLXRoZS1ob29kIHdoZW4gYSBgS2VwbGVyR2xgIGNvbXBvbmVudCBpcyAqKm1vdW50ZWQqKiB0byB0aGUgZG9tLlxuICogTm90ZSB0aGF0IGlmIHlvdSBkaXNwYXRjaCBhY3Rpb25zIHN1Y2ggYXMgYWRkaW5nIGRhdGEgdG8gYSBrZXBsZXIuZ2wgaW5zdGFuY2UgYmVmb3JlIHRoZSBSZWFjdCBjb21wb25lbnQgaXMgbW91bnRlZCwgdGhlIGFjdGlvbiB3aWxsIG5vdCBiZVxuICogcGVyZm9ybWVkLiBJbnN0YW5jZSByZWR1Y2VyIGNhbiBvbmx5IGhhbmRsZSBhY3Rpb25zIHdoZW4gaXQgaXMgaW5zdGFudGlhdGVkLlxuICogQG1lbWJlcm9mIHJvb3RBY3Rpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gcGF5bG9hZFxuICogQHBhcmFtIHtzdHJpbmd9IHBheWxvYWQuaWQgLSAqKipyZXF1aXJlZCoqIFRoZSBpZCBvZiB0aGUgaW5zdGFuY2VcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gcGF5bG9hZC5taW50IC0gV2hldGhlciB0byB1c2UgYSBmcmVzaCBlbXB0eSBzdGF0ZSwgd2hlbiBgbWludDogdHJ1ZWAgaXQgd2lsbCAqYWx3YXlzKiBsb2FkIGEgZnJlc2ggc3RhdGUgd2hlbiB0aGUgY29tcG9uZW50IGlzIHJlLW1vdW50ZWQuXG4gKiBXaGVuIGBtaW50OiBmYWxzZWAgaXQgd2lsbCByZWdpc3RlciB3aXRoIGV4aXN0aW5nIGluc3RhbmNlIHN0YXRlIHVuZGVyIHRoZSBzYW1lIGBpZGAsIHdoZW4gdGhlIGNvbXBvbmVudCBpcyB1bm1vdW50ZWQgdGhlbiBtb3VudGVkIGFnYWluLiBEZWZhdWx0OiBgdHJ1ZWBcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXlsb2FkLm1hcGJveEFwaUFjY2Vzc1Rva2VuIC0gbWFwYm94QXBpQWNjZXNzVG9rZW4gdG8gYmUgc2F2ZWQgaW4gYG1hcC1zdHlsZWAgcmVkdWNlci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXlsb2FkLm1hcGJveEFwaVVybCAtIG1hcGJveEFwaVVybCB0byBiZSBzYXZlZCBpbiBgbWFwLXN0eWxlYCByZWR1Y2VyLlxuICogQHBhcmFtIHtCb29sZWFufSBwYXlsb2FkLm1hcFN0eWxlc1JlcGxhY2VEZWZhdWx0IC0gbWFwU3R5bGVzUmVwbGFjZURlZmF1bHQgdG8gYmUgc2F2ZWQgaW4gYG1hcC1zdHlsZWAgcmVkdWNlci5cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyRW50cnkgPSBjcmVhdGVBY3Rpb24oXG4gIEFjdGlvblR5cGVzLlJFR0lTVEVSX0VOVFJZLFxuICAoe2lkLCBtaW50LCBtYXBib3hBcGlBY2Nlc3NUb2tlbiwgbWFwYm94QXBpVXJsLCBtYXBTdHlsZXNSZXBsYWNlRGVmYXVsdH0pID0+ICh7XG4gICAgaWQsXG4gICAgbWludCxcbiAgICBtYXBib3hBcGlBY2Nlc3NUb2tlbixcbiAgICBtYXBib3hBcGlVcmwsXG4gICAgbWFwU3R5bGVzUmVwbGFjZURlZmF1bHRcbiAgfSlcbik7XG5cbi8qKlxuICpcbiAqIERlbGV0ZSBhbiBpbnN0YW5jZSBmcm9tIGBrZXBsZXJHbFJlZHVjZXJgLiBUaGlzIGFjdGlvbiBpcyBjYWxsZWQgdW5kZXItdGhlLWhvb2Qgd2hlbiBhIGBLZXBsZXJHbGAgY29tcG9uZW50IGlzICoqdW4tbW91bnRlZCoqIHRvIHRoZSBkb20uXG4gKiBJZiBgbWludGAgaXMgc2V0IHRvIGJlIGB0cnVlYCBpbiB0aGUgY29tcG9uZW50IHByb3AsIHRoZSBpbnN0YW5jZSBzdGF0ZSB3aWxsIGJlIGRlbGV0ZWQgZnJvbSB0aGUgcm9vdCByZWR1Y2VyLiBPdGhlcndpc2UsIHRoZSByb290IHJlZHVjZXIgd2lsbCBrZWVwXG4gKiB0aGUgaW5zdGFuY2Ugc3RhdGUgYW5kIGxhdGVyIHRyYW5zZmVyIGl0IHRvIGEgbmV3bHkgbW91bnRlZCBjb21wb25lbnQgd2l0aCB0aGUgc2FtZSBgaWRgXG4gKiBAbWVtYmVyb2Ygcm9vdEFjdGlvbnNcbiAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIHRoZSBpZCBvZiB0aGUgaW5zdGFuY2UgdG8gYmUgZGVsZXRlZFxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgZGVsZXRlRW50cnkgPSBjcmVhdGVBY3Rpb24oQWN0aW9uVHlwZXMuREVMRVRFX0VOVFJZLCBpZCA9PiBpZCk7XG5cbi8qKlxuICpcbiAqIFJlbmFtZSBhbiBpbnN0YW5jZSBpbiB0aGUgcm9vdCByZWR1Y2VyLCBrZWVwIGl0cyBlbnRpcmUgc3RhdGVcbiAqXG4gKiBAbWVtYmVyb2Ygcm9vdEFjdGlvbnNcbiAqIEBwYXJhbSB7c3RyaW5nfSBvbGRJZCAtICoqKnJlcXVpcmVkKiogb2xkIGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gbmV3SWQgLSAqKipyZXF1aXJlZCoqIG5ldyBpZFxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgcmVuYW1lRW50cnkgPSBjcmVhdGVBY3Rpb24oQWN0aW9uVHlwZXMuUkVOQU1FX0VOVFJZLCAob2xkSWQsIG5ld0lkKSA9PiAoe1xuICBvbGRJZCxcbiAgbmV3SWRcbn0pKTtcblxuLyoqXG4gKiBUaGlzIGRlY2xhcmF0aW9uIGlzIG5lZWRlZCB0byBncm91cCBhY3Rpb25zIGluIGRvY3NcbiAqL1xuLyoqXG4gKiBSb290IGFjdGlvbnMgbWFuYWdlcnMgYWRkaW5nIGFuZCByZW1vdmluZyBpbnN0YW5jZXMgaW4gcm9vdCByZWR1Y2VyLlxuICogVW5kZXItdGhlLWhvb2QsIHdoZW4gYSBgS2VwbGVyR2xgIGNvbXBvbmVudCBpcyBtb3VudGVkIG9yIHVubW91bnRlZCxcbiAqIGl0IHdpbGwgYXV0b21hdGljYWxseSBjYWxscyB0aGVzZSBhY3Rpb25zIHRvIGFkZCBpdHNlbGYgdG8gdGhlIHJvb3QgcmVkdWNlci5cbiAqIEhvd2V2ZXIsIHNvbWV0aW1lcyB0aGUgZGF0YSBpcyByZWFkeSBiZWZvcmUgdGhlIGNvbXBvbmVudCBpcyByZWdpc3RlcmVkIGluIHRoZSByZWR1Y2VyLFxuICogaW4gdGhpcyBjYXNlLCB5b3UgY2FuIG1hbnVhbGx5IGNhbGwgdGhlc2UgYWN0aW9ucyBvciB0aGUgY29ycmVzcG9uZGluZyB1cGRhdGVyIHRvIGFkZCBpdCB0byB0aGUgcmVkdWNlci5cbiAqXG4gKiBAcHVibGljXG4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5jb25zdCByb290QWN0aW9ucyA9IG51bGw7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLXVudXNlZC12YXJzICovXG4iXX0=