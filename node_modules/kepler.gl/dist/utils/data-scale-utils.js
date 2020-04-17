"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getQuantileDomain = getQuantileDomain;
exports.getOrdinalDomain = getOrdinalDomain;
exports.getLinearDomain = getLinearDomain;
exports.getLogDomain = getLogDomain;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _dataUtils = require("./data-utils");

var _d3Array = require("d3-array");

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
 * return quantile domain for an array of data
 * @param {array} data
 * @param {function | undefined} valueAccessor
 * @param {function | undefined} sortFunc
 * @returns {array} domain
 */
function getQuantileDomain(data, valueAccessor, sortFunc) {
  var values = typeof valueAccessor === 'function' ? data.map(valueAccessor) : data;
  return values.filter(_dataUtils.notNullorUndefined).sort(sortFunc);
}
/**
 * return ordinal domain for an array of data
 * @param {array} data
 * @param {function} valueAccessor
 * @returns {array} domain
 */


function getOrdinalDomain(data, valueAccessor) {
  var values = typeof valueAccessor === 'function' ? data.map(valueAccessor) : data;
  return (0, _dataUtils.unique)(values).filter(_dataUtils.notNullorUndefined).sort();
}
/**
 * return linear domain for an array of data
 * @param {Array} data
 * @param {function} valueAccessor
 * @returns {Array} domain
 */


function getLinearDomain(data) {
  var valueAccessor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var range = typeof valueAccessor === 'function' ? (0, _d3Array.extent)(data, valueAccessor) : (0, _d3Array.extent)(data);
  return range.map(function (d, i) {
    return d === undefined ? i : d;
  });
}
/**
 * return linear domain for an array of data. A log scale domain cannot contain 0
 * @param {Array} data
 * @param {function} valueAccessor
 * @returns {Array} domain
 */


function getLogDomain(data, valueAccessor) {
  var _getLinearDomain = getLinearDomain(data, valueAccessor),
      _getLinearDomain2 = (0, _slicedToArray2["default"])(_getLinearDomain, 2),
      d0 = _getLinearDomain2[0],
      d1 = _getLinearDomain2[1];

  return [d0 === 0 ? 1e-5 : d0, d1];
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9kYXRhLXNjYWxlLXV0aWxzLmpzIl0sIm5hbWVzIjpbImdldFF1YW50aWxlRG9tYWluIiwiZGF0YSIsInZhbHVlQWNjZXNzb3IiLCJzb3J0RnVuYyIsInZhbHVlcyIsIm1hcCIsImZpbHRlciIsIm5vdE51bGxvclVuZGVmaW5lZCIsInNvcnQiLCJnZXRPcmRpbmFsRG9tYWluIiwiZ2V0TGluZWFyRG9tYWluIiwicmFuZ2UiLCJkIiwiaSIsInVuZGVmaW5lZCIsImdldExvZ0RvbWFpbiIsImQwIiwiZDEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQXJCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFLQTs7Ozs7OztBQU9PLFNBQVNBLGlCQUFULENBQTJCQyxJQUEzQixFQUFpQ0MsYUFBakMsRUFBZ0RDLFFBQWhELEVBQTBEO0FBQy9ELE1BQU1DLE1BQU0sR0FBRyxPQUFPRixhQUFQLEtBQXlCLFVBQXpCLEdBQXNDRCxJQUFJLENBQUNJLEdBQUwsQ0FBU0gsYUFBVCxDQUF0QyxHQUFnRUQsSUFBL0U7QUFFQSxTQUFPRyxNQUFNLENBQUNFLE1BQVAsQ0FBY0MsNkJBQWQsRUFBa0NDLElBQWxDLENBQXVDTCxRQUF2QyxDQUFQO0FBQ0Q7QUFFRDs7Ozs7Ozs7QUFNTyxTQUFTTSxnQkFBVCxDQUEwQlIsSUFBMUIsRUFBZ0NDLGFBQWhDLEVBQStDO0FBQ3BELE1BQU1FLE1BQU0sR0FBRyxPQUFPRixhQUFQLEtBQXlCLFVBQXpCLEdBQXNDRCxJQUFJLENBQUNJLEdBQUwsQ0FBU0gsYUFBVCxDQUF0QyxHQUFnRUQsSUFBL0U7QUFFQSxTQUFPLHVCQUFPRyxNQUFQLEVBQ0pFLE1BREksQ0FDR0MsNkJBREgsRUFFSkMsSUFGSSxFQUFQO0FBR0Q7QUFFRDs7Ozs7Ozs7QUFNTyxTQUFTRSxlQUFULENBQXlCVCxJQUF6QixFQUFxRDtBQUFBLE1BQXRCQyxhQUFzQix1RUFBTixJQUFNO0FBQzFELE1BQU1TLEtBQUssR0FBRyxPQUFPVCxhQUFQLEtBQXlCLFVBQXpCLEdBQXNDLHFCQUFPRCxJQUFQLEVBQWFDLGFBQWIsQ0FBdEMsR0FBb0UscUJBQU9ELElBQVAsQ0FBbEY7QUFFQSxTQUFPVSxLQUFLLENBQUNOLEdBQU4sQ0FBVSxVQUFDTyxDQUFELEVBQUlDLENBQUo7QUFBQSxXQUFXRCxDQUFDLEtBQUtFLFNBQU4sR0FBa0JELENBQWxCLEdBQXNCRCxDQUFqQztBQUFBLEdBQVYsQ0FBUDtBQUNEO0FBRUQ7Ozs7Ozs7O0FBTU8sU0FBU0csWUFBVCxDQUFzQmQsSUFBdEIsRUFBNEJDLGFBQTVCLEVBQTJDO0FBQUEseUJBQy9CUSxlQUFlLENBQUNULElBQUQsRUFBT0MsYUFBUCxDQURnQjtBQUFBO0FBQUEsTUFDekNjLEVBRHlDO0FBQUEsTUFDckNDLEVBRHFDOztBQUdoRCxTQUFPLENBQUNELEVBQUUsS0FBSyxDQUFQLEdBQVcsSUFBWCxHQUFrQkEsRUFBbkIsRUFBdUJDLEVBQXZCLENBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7bm90TnVsbG9yVW5kZWZpbmVkLCB1bmlxdWV9IGZyb20gJy4vZGF0YS11dGlscyc7XG5pbXBvcnQge2V4dGVudH0gZnJvbSAnZDMtYXJyYXknO1xuXG4vKipcbiAqIHJldHVybiBxdWFudGlsZSBkb21haW4gZm9yIGFuIGFycmF5IG9mIGRhdGFcbiAqIEBwYXJhbSB7YXJyYXl9IGRhdGFcbiAqIEBwYXJhbSB7ZnVuY3Rpb24gfCB1bmRlZmluZWR9IHZhbHVlQWNjZXNzb3JcbiAqIEBwYXJhbSB7ZnVuY3Rpb24gfCB1bmRlZmluZWR9IHNvcnRGdW5jXG4gKiBAcmV0dXJucyB7YXJyYXl9IGRvbWFpblxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0UXVhbnRpbGVEb21haW4oZGF0YSwgdmFsdWVBY2Nlc3Nvciwgc29ydEZ1bmMpIHtcbiAgY29uc3QgdmFsdWVzID0gdHlwZW9mIHZhbHVlQWNjZXNzb3IgPT09ICdmdW5jdGlvbicgPyBkYXRhLm1hcCh2YWx1ZUFjY2Vzc29yKSA6IGRhdGE7XG5cbiAgcmV0dXJuIHZhbHVlcy5maWx0ZXIobm90TnVsbG9yVW5kZWZpbmVkKS5zb3J0KHNvcnRGdW5jKTtcbn1cblxuLyoqXG4gKiByZXR1cm4gb3JkaW5hbCBkb21haW4gZm9yIGFuIGFycmF5IG9mIGRhdGFcbiAqIEBwYXJhbSB7YXJyYXl9IGRhdGFcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHZhbHVlQWNjZXNzb3JcbiAqIEByZXR1cm5zIHthcnJheX0gZG9tYWluXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRPcmRpbmFsRG9tYWluKGRhdGEsIHZhbHVlQWNjZXNzb3IpIHtcbiAgY29uc3QgdmFsdWVzID0gdHlwZW9mIHZhbHVlQWNjZXNzb3IgPT09ICdmdW5jdGlvbicgPyBkYXRhLm1hcCh2YWx1ZUFjY2Vzc29yKSA6IGRhdGE7XG5cbiAgcmV0dXJuIHVuaXF1ZSh2YWx1ZXMpXG4gICAgLmZpbHRlcihub3ROdWxsb3JVbmRlZmluZWQpXG4gICAgLnNvcnQoKTtcbn1cblxuLyoqXG4gKiByZXR1cm4gbGluZWFyIGRvbWFpbiBmb3IgYW4gYXJyYXkgb2YgZGF0YVxuICogQHBhcmFtIHtBcnJheX0gZGF0YVxuICogQHBhcmFtIHtmdW5jdGlvbn0gdmFsdWVBY2Nlc3NvclxuICogQHJldHVybnMge0FycmF5fSBkb21haW5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldExpbmVhckRvbWFpbihkYXRhLCB2YWx1ZUFjY2Vzc29yID0gbnVsbCkge1xuICBjb25zdCByYW5nZSA9IHR5cGVvZiB2YWx1ZUFjY2Vzc29yID09PSAnZnVuY3Rpb24nID8gZXh0ZW50KGRhdGEsIHZhbHVlQWNjZXNzb3IpIDogZXh0ZW50KGRhdGEpO1xuXG4gIHJldHVybiByYW5nZS5tYXAoKGQsIGkpID0+IChkID09PSB1bmRlZmluZWQgPyBpIDogZCkpO1xufVxuXG4vKipcbiAqIHJldHVybiBsaW5lYXIgZG9tYWluIGZvciBhbiBhcnJheSBvZiBkYXRhLiBBIGxvZyBzY2FsZSBkb21haW4gY2Fubm90IGNvbnRhaW4gMFxuICogQHBhcmFtIHtBcnJheX0gZGF0YVxuICogQHBhcmFtIHtmdW5jdGlvbn0gdmFsdWVBY2Nlc3NvclxuICogQHJldHVybnMge0FycmF5fSBkb21haW5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldExvZ0RvbWFpbihkYXRhLCB2YWx1ZUFjY2Vzc29yKSB7XG4gIGNvbnN0IFtkMCwgZDFdID0gZ2V0TGluZWFyRG9tYWluKGRhdGEsIHZhbHVlQWNjZXNzb3IpO1xuXG4gIHJldHVybiBbZDAgPT09IDAgPyAxZS01IDogZDAsIGQxXTtcbn1cbiJdfQ==