"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processCsvData = processCsvData;
exports.parseRowsByFields = parseRowsByFields;
exports.getSampleForTypeAnalyze = getSampleForTypeAnalyze;
exports.parseCsvRowsByFieldType = parseCsvRowsByFieldType;
exports.getFieldsFromData = getFieldsFromData;
exports.renameDuplicateFields = renameDuplicateFields;
exports.analyzerTypeToFieldType = analyzerTypeToFieldType;
exports.processRowObject = processRowObject;
exports.processGeojson = processGeojson;
exports.formatCsv = formatCsv;
exports.validateInputData = validateInputData;
exports.processKeplerglJSON = processKeplerglJSON;
exports.processKeplerglDataset = processKeplerglDataset;
exports.Processors = exports.DATASET_HANDLERS = exports.PARSE_FIELD_VALUE_FROM_STRING = exports.ACCEPTED_ANALYZER_TYPES = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _d3Dsv = require("d3-dsv");

var _d3Array = require("d3-array");

var _window = require("global/window");

var _assert = _interopRequireDefault(require("assert"));

var _typeAnalyzer = require("type-analyzer");

var _geojsonNormalize = _interopRequireDefault(require("@mapbox/geojson-normalize"));

var _defaultSettings = require("../constants/default-settings");

var _dataUtils = require("../utils/data-utils");

var _schemas = _interopRequireDefault(require("../schemas"));

var _userGuides = require("../constants/user-guides");

var _utils = require("../utils/utils");

var _PARSE_FIELD_VALUE_FR, _DATASET_HANDLERS;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var ACCEPTED_ANALYZER_TYPES = [_typeAnalyzer.DATA_TYPES.DATE, _typeAnalyzer.DATA_TYPES.TIME, _typeAnalyzer.DATA_TYPES.DATETIME, _typeAnalyzer.DATA_TYPES.NUMBER, _typeAnalyzer.DATA_TYPES.INT, _typeAnalyzer.DATA_TYPES.FLOAT, _typeAnalyzer.DATA_TYPES.BOOLEAN, _typeAnalyzer.DATA_TYPES.STRING, _typeAnalyzer.DATA_TYPES.GEOMETRY, _typeAnalyzer.DATA_TYPES.GEOMETRY_FROM_STRING, _typeAnalyzer.DATA_TYPES.PAIR_GEOMETRY_FROM_STRING, _typeAnalyzer.DATA_TYPES.ZIPCODE, _typeAnalyzer.DATA_TYPES.ARRAY, _typeAnalyzer.DATA_TYPES.OBJECT]; // if any of these value occurs in csv, parse it to null;

exports.ACCEPTED_ANALYZER_TYPES = ACCEPTED_ANALYZER_TYPES;
var CSV_NULLS = ['', 'null', 'NULL', 'Null', 'NaN', '/N'];
var IGNORE_DATA_TYPES = Object.keys(_typeAnalyzer.DATA_TYPES).filter(function (type) {
  return !ACCEPTED_ANALYZER_TYPES.includes(type);
});
var PARSE_FIELD_VALUE_FROM_STRING = (_PARSE_FIELD_VALUE_FR = {}, (0, _defineProperty2["default"])(_PARSE_FIELD_VALUE_FR, _defaultSettings.ALL_FIELD_TYPES["boolean"], {
  valid: function valid(d) {
    return typeof d === 'boolean';
  },
  parse: function parse(d) {
    return d === 'true' || d === 'True' || d === '1';
  }
}), (0, _defineProperty2["default"])(_PARSE_FIELD_VALUE_FR, _defaultSettings.ALL_FIELD_TYPES.integer, {
  valid: function valid(d) {
    return parseInt(d, 10) === d;
  },
  parse: function parse(d) {
    return parseInt(d, 10);
  }
}), (0, _defineProperty2["default"])(_PARSE_FIELD_VALUE_FR, _defaultSettings.ALL_FIELD_TYPES.timestamp, {
  valid: function valid(d, field) {
    return ['x', 'X'].includes(field.format) ? typeof d === 'number' : typeof d === 'string';
  },
  parse: function parse(d, field) {
    return ['x', 'X'].includes(field.format) ? Number(d) : d;
  }
}), (0, _defineProperty2["default"])(_PARSE_FIELD_VALUE_FR, _defaultSettings.ALL_FIELD_TYPES.real, {
  valid: function valid(d) {
    return parseFloat(d) === d;
  },
  parse: parseFloat
}), _PARSE_FIELD_VALUE_FR);
/**
 * Process csv data, output a data object with `{fields: [], rows: []}`.
 * The data object can be wrapped in a `dataset` and pass to [`addDataToMap`](../actions/actions.md#adddatatomap)
 * @param {string} rawData raw csv string
 * @returns {Object} data object `{fields: [], rows: []}`
 * @public
 * @example
 * import {processCsvData} from 'kepler.gl/processors';
 *
 * const testData = `gps_data.utc_timestamp,gps_data.lat,gps_data.lng,gps_data.types,epoch,has_result,id,time,begintrip_ts_utc,begintrip_ts_local,date
 * 2016-09-17 00:09:55,29.9900937,31.2590542,driver_analytics,1472688000000,False,1,2016-09-23T00:00:00.000Z,2016-10-01 09:41:39+00:00,2016-10-01 09:41:39+00:00,2016-09-23
 * 2016-09-17 00:10:56,29.9927699,31.2461142,driver_analytics,1472688000000,False,2,2016-09-23T00:00:00.000Z,2016-10-01 09:46:37+00:00,2016-10-01 16:46:37+00:00,2016-09-23
 * 2016-09-17 00:11:56,29.9907261,31.2312742,driver_analytics,1472688000000,False,3,2016-09-23T00:00:00.000Z,,,2016-09-23
 * 2016-09-17 00:12:58,29.9870074,31.2175827,driver_analytics,1472688000000,False,4,2016-09-23T00:00:00.000Z,,,2016-09-23`
 *
 * const dataset = {
 *  info: {id: 'test_data', label: 'My Csv'},
 *  data: processCsvData(testData)
 * };
 *
 * dispatch(addDataToMap({
 *  datasets: [dataset],
 *  options: {centerMap: true, readOnly: true}
 * }));
 */

exports.PARSE_FIELD_VALUE_FROM_STRING = PARSE_FIELD_VALUE_FROM_STRING;

function processCsvData(rawData) {
  // here we assume the csv file that people uploaded will have first row
  // as name of the column
  // TODO: add a alert at upload csv to remind define first row
  var result = (0, _d3Dsv.csvParseRows)(rawData);

  if (!Array.isArray(result) || result.length < 2) {
    // looks like an empty file, throw error to be catch
    throw new Error('Read File Failed: CSV is empty');
  }

  var _result = (0, _toArray2["default"])(result),
      headerRow = _result[0],
      rows = _result.slice(1);

  cleanUpFalsyCsvValue(rows); // No need to run type detection on every data point
  // here we get a list of none null values to run analyze on

  var sample = getSampleForTypeAnalyze({
    fields: headerRow,
    allData: rows
  });
  var fields = getFieldsFromData(sample, headerRow);
  var parsedRows = parseRowsByFields(rows, fields);
  return {
    fields: fields,
    rows: parsedRows
  };
}
/**
 * Parse rows of csv by analyzed field types. So that `'1'` -> `1`, `'True'` -> `true`
 * @param {Array<Array>} rows
 * @param {Array<Object} fields
 */


function parseRowsByFields(rows, fields) {
  // Edit rows in place
  var geojsonFieldIdx = fields.findIndex(function (f) {
    return f.name === '_geojson';
  });
  fields.forEach(parseCsvRowsByFieldType.bind(null, rows, geojsonFieldIdx));
  return rows;
}
/**
 * Getting sample data for analyzing field type.
 *
 * @param {Array<string>} fields an array of field names
 * @param {Array<Array>} allData
 * @param {Array} sampleCount
 * @returns {Array} formatted fields
 */


function getSampleForTypeAnalyze(_ref) {
  var fields = _ref.fields,
      allData = _ref.allData,
      _ref$sampleCount = _ref.sampleCount,
      sampleCount = _ref$sampleCount === void 0 ? 50 : _ref$sampleCount;
  var total = Math.min(sampleCount, allData.length); // const fieldOrder = fields.map(f => f.name);

  var sample = (0, _d3Array.range)(0, total, 1).map(function (d) {
    return {};
  }); // collect sample data for each field

  fields.forEach(function (field, fieldIdx) {
    // data counter
    var i = 0; // sample counter

    var j = 0;

    while (j < total) {
      if (i >= allData.length) {
        // if depleted data pool
        sample[j][field] = null;
        j++;
      } else if ((0, _dataUtils.notNullorUndefined)(allData[i][fieldIdx])) {
        sample[j][field] = allData[i][fieldIdx];
        j++;
        i++;
      } else {
        i++;
      }
    }
  });
  return sample;
}
/**
 * Convert falsy value in csv including `'', 'null', 'NULL', 'Null', 'NaN'` to `null`,
 * so that type-analyzer won't detect it as string
 *
 * @param {Array<Array>} rows
 */


function cleanUpFalsyCsvValue(rows) {
  for (var i = 0; i < rows.length; i++) {
    for (var j = 0; j < rows[i].length; j++) {
      // analyzer will set any fields to 'string' if there are empty values
      // which will be parsed as '' by d3.csv
      // here we parse empty data as null
      // TODO: create warning when deltect `CSV_NULLS` in the data
      if (!rows[i][j] || CSV_NULLS.includes(rows[i][j])) {
        rows[i][j] = null;
      }
    }
  }
}
/**
 * Process uploaded csv file to parse value by field type
 *
 * @param {Array<Array>} rows
 * @param {Number} geo field index
 * @param {Object} field
 * @param {Number} i
 * @returns {void}
 */


function parseCsvRowsByFieldType(rows, geoFieldIdx, field, i) {
  var parser = PARSE_FIELD_VALUE_FROM_STRING[field.type];

  if (parser) {
    // check first not null value of it's already parsed
    var first = rows.find(function (r) {
      return (0, _dataUtils.notNullorUndefined)(r[i]);
    });

    if (!first || parser.valid(first[i], field)) {
      return;
    }

    rows.forEach(function (row) {
      // parse string value based on field type
      if (row[i] !== null) {
        row[i] = parser.parse(row[i], field);

        if (geoFieldIdx > -1 && row[geoFieldIdx] && row[geoFieldIdx].properties) {
          row[geoFieldIdx].properties[field.name] = row[i];
        }
      }
    });
  }
}
/**
 * Analyze field types from data in `string` format, e.g. uploaded csv.
 * Assign `type`, `tableFieldIndex` and `format` (timestamp only) to each field
 *
 * @param {Array<Object>} data array of row object
 * @param {Array} fieldOrder array of field names as string
 * @returns {Array<Object>} formatted fields
 * @public
 * @example
 *
 * import {getFieldsFromData} from 'kepler.gl/processors';
 * const data = [{
 *   time: '2016-09-17 00:09:55',
 *   value: '4',
 *   surge: '1.2',
 *   isTrip: 'true',
 *   zeroOnes: '0'
 * }, {
 *   time: '2016-09-17 00:30:08',
 *   value: '3',
 *   surge: null,
 *   isTrip: 'false',
 *   zeroOnes: '1'
 * }, {
 *   time: null,
 *   value: '2',
 *   surge: '1.3',
 *   isTrip: null,
 *   zeroOnes: '1'
 * }];
 *
 * const fieldOrder = ['time', 'value', 'surge', 'isTrip', 'zeroOnes'];
 * const fields = getFieldsFromData(data, fieldOrder);
 * // fields = [
 * // {name: 'time', format: 'YYYY-M-D H:m:s', tableFieldIndex: 1, type: 'timestamp'},
 * // {name: 'value', format: '', tableFieldIndex: 4, type: 'integer'},
 * // {name: 'surge', format: '', tableFieldIndex: 5, type: 'real'},
 * // {name: 'isTrip', format: '', tableFieldIndex: 6, type: 'boolean'},
 * // {name: 'zeroOnes', format: '', tableFieldIndex: 7, type: 'integer'}];
 *
 */


function getFieldsFromData(data, fieldOrder) {
  // add a check for epoch timestamp
  var metadata = _typeAnalyzer.Analyzer.computeColMeta(data, [{
    regex: /.*geojson|all_points/g,
    dataType: 'GEOMETRY'
  }], {
    ignoredDataTypes: IGNORE_DATA_TYPES
  });

  var _renameDuplicateField = renameDuplicateFields(fieldOrder),
      fieldByIndex = _renameDuplicateField.fieldByIndex;

  var result = fieldOrder.reduce(function (orderedArray, field, index) {
    var name = fieldByIndex[index];
    var fieldMeta = metadata.find(function (m) {
      return m.key === field;
    });

    var _ref2 = fieldMeta || {},
        type = _ref2.type,
        format = _ref2.format;

    orderedArray[index] = {
      name: name,
      format: format,
      tableFieldIndex: index + 1,
      type: analyzerTypeToFieldType(type),
      analyzerType: type
    };
    return orderedArray;
  }, []);
  return result;
}
/**
 * pass in an array of field names, rename duplicated one
 * and return a map from old field index to new name
 *
 * @param {Array} fieldOrder
 * @returns {Object} new field name by index
 */


function renameDuplicateFields(fieldOrder) {
  return fieldOrder.reduce(function (accu, field, i) {
    var allNames = accu.allNames;
    var fieldName = field; // add a counter to duplicated names

    if (allNames.includes(field)) {
      var counter = 0;

      while (allNames.includes("".concat(field, "-").concat(counter))) {
        counter++;
      }

      fieldName = "".concat(field, "-").concat(counter);
    }

    accu.fieldByIndex[i] = fieldName;
    accu.allNames.push(fieldName);
    return accu;
  }, {
    allNames: [],
    fieldByIndex: {}
  });
}
/**
 * Convert type-analyzer output to kepler.gl field types
 *
 * @param {string} aType
 * @returns {string} corresponding type in `ALL_FIELD_TYPES`
 */

/* eslint-disable complexity */


function analyzerTypeToFieldType(aType) {
  var DATE = _typeAnalyzer.DATA_TYPES.DATE,
      TIME = _typeAnalyzer.DATA_TYPES.TIME,
      DATETIME = _typeAnalyzer.DATA_TYPES.DATETIME,
      NUMBER = _typeAnalyzer.DATA_TYPES.NUMBER,
      INT = _typeAnalyzer.DATA_TYPES.INT,
      FLOAT = _typeAnalyzer.DATA_TYPES.FLOAT,
      BOOLEAN = _typeAnalyzer.DATA_TYPES.BOOLEAN,
      STRING = _typeAnalyzer.DATA_TYPES.STRING,
      GEOMETRY = _typeAnalyzer.DATA_TYPES.GEOMETRY,
      GEOMETRY_FROM_STRING = _typeAnalyzer.DATA_TYPES.GEOMETRY_FROM_STRING,
      PAIR_GEOMETRY_FROM_STRING = _typeAnalyzer.DATA_TYPES.PAIR_GEOMETRY_FROM_STRING,
      ZIPCODE = _typeAnalyzer.DATA_TYPES.ZIPCODE,
      ARRAY = _typeAnalyzer.DATA_TYPES.ARRAY,
      OBJECT = _typeAnalyzer.DATA_TYPES.OBJECT; // TODO: un recognized types
  // CURRENCY PERCENT NONE

  switch (aType) {
    case DATE:
      return _defaultSettings.ALL_FIELD_TYPES.date;

    case TIME:
    case DATETIME:
      return _defaultSettings.ALL_FIELD_TYPES.timestamp;

    case FLOAT:
      return _defaultSettings.ALL_FIELD_TYPES.real;

    case INT:
      return _defaultSettings.ALL_FIELD_TYPES.integer;

    case BOOLEAN:
      return _defaultSettings.ALL_FIELD_TYPES["boolean"];

    case GEOMETRY:
    case GEOMETRY_FROM_STRING:
    case PAIR_GEOMETRY_FROM_STRING:
    case ARRAY:
    case OBJECT:
      // TODO: create a new data type for objects and arrays
      return _defaultSettings.ALL_FIELD_TYPES.geojson;

    case NUMBER:
    case STRING:
    case ZIPCODE:
      return _defaultSettings.ALL_FIELD_TYPES.string;

    default:
      _window.console.warn("Unsupported analyzer type: ".concat(aType));

      return _defaultSettings.ALL_FIELD_TYPES.string;
  }
}
/* eslint-enable complexity */

/**
 * Process data where each row is an object, output can be passed to [`addDataToMap`](../actions/actions.md#adddatatomap)
 * @param {Array<Object>} rawData an array of row object, each object should have the same number of keys
 * @returns {Object} dataset containing `fields` and `rows`
 * @public
 * @example
 * import {addDataToMap} from 'kepler.gl/actions';
 * import {processRowObject} from 'kepler.gl/processors';
 *
 * const data = [
 *  {lat: 31.27, lng: 127.56, value: 3},
 *  {lat: 31.22, lng: 126.26, value: 1}
 * ];
 *
 * dispatch(addDataToMap({
 *  datasets: {
 *    info: {label: 'My Data', id: 'my_data'},
 *    data: processRowObject(data)
 *  }
 * }));
 */


function processRowObject(rawData) {
  if (!Array.isArray(rawData) || !rawData.length) {
    return null;
  }

  var keys = Object.keys(rawData[0]);
  var rows = rawData.map(function (d) {
    return keys.map(function (key) {
      return d[key];
    });
  }); // pick samples

  var sampleData = (0, _dataUtils.getSampleData)(rawData, 500);
  var fields = getFieldsFromData(sampleData, keys);
  var parsedRows = parseRowsByFields(rows, fields);
  return {
    fields: fields,
    rows: parsedRows
  };
}
/**
 * Process GeoJSON [`FeatureCollection`](http://wiki.geojson.org/GeoJSON_draft_version_6#FeatureCollection),
 * output a data object with `{fields: [], rows: []}`.
 * The data object can be wrapped in a `dataset` and pass to [`addDataToMap`](../actions/actions.md#adddatatomap)
 *
 * @param {Object} rawData raw geojson feature collection
 * @returns {Object} dataset containing `fields` and `rows`
 * @public
 * @example
 * import {addDataToMap} from 'kepler.gl/actions';
 * import {processGeojson} from 'kepler.gl/processors';
 *
 * const geojson = {
 * 	"type" : "FeatureCollection",
 * 	"features" : [{
 * 		"type" : "Feature",
 * 		"properties" : {
 * 			"capacity" : "10",
 * 			"type" : "U-Rack"
 * 		},
 * 		"geometry" : {
 * 			"type" : "Point",
 * 			"coordinates" : [ -71.073283, 42.417500 ]
 * 		}
 * 	}]
 * };
 *
 * dispatch(addDataToMap({
 *  datasets: {
 *    info: {
 *      label: 'Sample Taxi Trips in New York City',
 *      id: 'test_trip_data'
 *    },
 *    data: processGeojson(geojson)
 *  }
 * }));
 */


function processGeojson(rawData) {
  var normalizedGeojson = (0, _geojsonNormalize["default"])(rawData);

  if (!normalizedGeojson || !Array.isArray(normalizedGeojson.features)) {
    var error = new Error("Read File Failed: File is not a valid GeoJSON. Read more about [supported file format](".concat(_userGuides.GUIDES_FILE_FORMAT, ")"));
    throw error; // fail to normalize geojson
  } // getting all feature fields


  var allDataRows = [];

  for (var i = 0; i < normalizedGeojson.features.length; i++) {
    var f = normalizedGeojson.features[i];

    if (f.geometry) {
      allDataRows.push(_objectSpread({
        // add feature to _geojson field
        _geojson: f
      }, f.properties || {}));
    }
  } // get all the field


  var fields = allDataRows.reduce(function (prev, curr) {
    Object.keys(curr).forEach(function (key) {
      if (!prev.includes(key)) {
        prev.push(key);
      }
    });
    return prev;
  }, []); // make sure each feature has exact same fields

  allDataRows.forEach(function (d) {
    fields.forEach(function (f) {
      if (!(f in d)) {
        d[f] = null;
        d._geojson.properties[f] = null;
      }
    });
  });
  return processRowObject(allDataRows);
}
/**
 * On export data to csv
 * @param {Array<Array>} data `dataset.allData` or filtered data `dataset.data`
 * @param {Array<Object>} fields `dataset.fields`
 * @returns {string} csv string
 */


function formatCsv(data, fields) {
  var columns = fields.map(function (f) {
    return f.name;
  });
  var formattedData = [columns]; // parse geojson object as string

  data.forEach(function (row) {
    formattedData.push(row.map(function (d, i) {
      return (0, _dataUtils.parseFieldValue)(d, fields[i].type);
    }));
  });
  return (0, _d3Dsv.csvFormatRows)(formattedData);
}
/**
 * Validate input data, adding missing field types, rename duplicate columns
 * @param {Object} data dataset.data
 * @param {Array<Object>} data.fields an array of fields
 * @param {Array<Object>} data.rows an array of data rows
 * @returns {{allData: Array, fields: Array}}
 */


function validateInputData(data) {
  if (!(0, _utils.isPlainObject)(data)) {
    (0, _assert["default"])('addDataToMap Error: dataset.data cannot be null');
    return null;
  } else if (!Array.isArray(data.fields)) {
    (0, _assert["default"])('addDataToMap Error: expect dataset.data.fields to be an array');
    return null;
  } else if (!Array.isArray(data.rows)) {
    (0, _assert["default"])('addDataToMap Error: expect dataset.data.rows to be an array');
    return null;
  }

  var fields = data.fields,
      rows = data.rows; // check if all fields has name, format and type

  var allValid = fields.every(function (f, i) {
    if (!(0, _utils.isPlainObject)(f)) {
      (0, _assert["default"])("fields needs to be an array of object, but find ".concat((0, _typeof2["default"])(f)));
      fields[i] = {};
    }

    if (!f.name) {
      (0, _assert["default"])("field.name is required but missing in ".concat(JSON.stringify(f))); // assign a name

      fields[i].name = "column_".concat(i);
    }

    if (!_defaultSettings.ALL_FIELD_TYPES[f.type]) {
      (0, _assert["default"])("unknown field type ".concat(f.type));
      return false;
    }

    if (!fields.every(function (field) {
      return field.analyzerType;
    })) {
      (0, _assert["default"])('field missing analyzerType');
      return false;
    } // check time format is correct based on first 10 not empty element


    if (f.type === _defaultSettings.ALL_FIELD_TYPES.timestamp) {
      var sample = findNonEmptyRowsAtField(rows, i, 10).map(function (r) {
        return {
          ts: r[i]
        };
      });

      var analyzedType = _typeAnalyzer.Analyzer.computeColMeta(sample)[0];

      return analyzedType.category === 'TIME' && analyzedType.format === f.format;
    }

    return true;
  });

  if (allValid) {
    return {
      rows: rows,
      fields: fields
    };
  } // if any field has missing type, recalculate it for everyone
  // because we simply lost faith in humanity


  var sampleData = getSampleForTypeAnalyze({
    fields: fields.map(function (f) {
      return f.name;
    }),
    allData: rows
  });
  var fieldOrder = fields.map(function (f) {
    return f.name;
  });
  var meta = getFieldsFromData(sampleData, fieldOrder);
  var updatedFields = fields.map(function (f, i) {
    return _objectSpread({}, f, {
      type: meta[i].type,
      format: meta[i].format,
      analyzerType: meta[i].analyzerType
    });
  });
  return {
    fields: updatedFields,
    rows: rows
  };
}

function findNonEmptyRowsAtField(rows, fieldIdx, total) {
  var sample = [];
  var i = 0;

  while (sample.length < total && i < rows.length) {
    if ((0, _dataUtils.notNullorUndefined)(rows[i][fieldIdx])) {
      sample.push(rows[i]);
    }

    i++;
  }

  return sample;
}
/**
 * Process saved kepler.gl json to be pass to [`addDataToMap`](../actions/actions.md#adddatatomap).
 * The json object should contain `datasets` and `config`.
 * @param {Object} rawData
 * @param {Array} rawData.datasets
 * @param {Object} rawData.config
 * @returns {Object} datasets and config `{datasets: {}, config: {}}`
 * @public
 * @example
 * import {addDataToMap} from 'kepler.gl/actions';
 * import {processKeplerglJSON} from 'kepler.gl/processors';
 *
 * dispatch(addDataToMap(processKeplerglJSON(keplerGlJson)));
 */


function processKeplerglJSON(rawData) {
  return rawData ? _schemas["default"].load(rawData.datasets, rawData.config) : null;
}
/**
 * Parse a single or an array of datasets saved using kepler.gl schema
 * @param {Array | Array<Object>} rawData
 */


function processKeplerglDataset(rawData) {
  if (!rawData) {
    return null;
  }

  var results = _schemas["default"].parseSavedData((0, _utils.toArray)(rawData));

  return Array.isArray(rawData) ? results : results[0];
}

var DATASET_HANDLERS = (_DATASET_HANDLERS = {}, (0, _defineProperty2["default"])(_DATASET_HANDLERS, _defaultSettings.DATASET_FORMATS.row, processRowObject), (0, _defineProperty2["default"])(_DATASET_HANDLERS, _defaultSettings.DATASET_FORMATS.geojson, processGeojson), (0, _defineProperty2["default"])(_DATASET_HANDLERS, _defaultSettings.DATASET_FORMATS.csv, processCsvData), (0, _defineProperty2["default"])(_DATASET_HANDLERS, _defaultSettings.DATASET_FORMATS.keplergl, processKeplerglDataset), _DATASET_HANDLERS);
exports.DATASET_HANDLERS = DATASET_HANDLERS;
var Processors = {
  processGeojson: processGeojson,
  processCsvData: processCsvData,
  processRowObject: processRowObject,
  processKeplerglJSON: processKeplerglJSON,
  processKeplerglDataset: processKeplerglDataset,
  analyzerTypeToFieldType: analyzerTypeToFieldType,
  getFieldsFromData: getFieldsFromData,
  parseCsvRowsByFieldType: parseCsvRowsByFieldType,
  formatCsv: formatCsv
};
exports.Processors = Processors;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wcm9jZXNzb3JzL2RhdGEtcHJvY2Vzc29yLmpzIl0sIm5hbWVzIjpbIkFDQ0VQVEVEX0FOQUxZWkVSX1RZUEVTIiwiQW5hbHl6ZXJEQVRBX1RZUEVTIiwiREFURSIsIlRJTUUiLCJEQVRFVElNRSIsIk5VTUJFUiIsIklOVCIsIkZMT0FUIiwiQk9PTEVBTiIsIlNUUklORyIsIkdFT01FVFJZIiwiR0VPTUVUUllfRlJPTV9TVFJJTkciLCJQQUlSX0dFT01FVFJZX0ZST01fU1RSSU5HIiwiWklQQ09ERSIsIkFSUkFZIiwiT0JKRUNUIiwiQ1NWX05VTExTIiwiSUdOT1JFX0RBVEFfVFlQRVMiLCJPYmplY3QiLCJrZXlzIiwiZmlsdGVyIiwidHlwZSIsImluY2x1ZGVzIiwiUEFSU0VfRklFTERfVkFMVUVfRlJPTV9TVFJJTkciLCJBTExfRklFTERfVFlQRVMiLCJ2YWxpZCIsImQiLCJwYXJzZSIsImludGVnZXIiLCJwYXJzZUludCIsInRpbWVzdGFtcCIsImZpZWxkIiwiZm9ybWF0IiwiTnVtYmVyIiwicmVhbCIsInBhcnNlRmxvYXQiLCJwcm9jZXNzQ3N2RGF0YSIsInJhd0RhdGEiLCJyZXN1bHQiLCJBcnJheSIsImlzQXJyYXkiLCJsZW5ndGgiLCJFcnJvciIsImhlYWRlclJvdyIsInJvd3MiLCJjbGVhblVwRmFsc3lDc3ZWYWx1ZSIsInNhbXBsZSIsImdldFNhbXBsZUZvclR5cGVBbmFseXplIiwiZmllbGRzIiwiYWxsRGF0YSIsImdldEZpZWxkc0Zyb21EYXRhIiwicGFyc2VkUm93cyIsInBhcnNlUm93c0J5RmllbGRzIiwiZ2VvanNvbkZpZWxkSWR4IiwiZmluZEluZGV4IiwiZiIsIm5hbWUiLCJmb3JFYWNoIiwicGFyc2VDc3ZSb3dzQnlGaWVsZFR5cGUiLCJiaW5kIiwic2FtcGxlQ291bnQiLCJ0b3RhbCIsIk1hdGgiLCJtaW4iLCJtYXAiLCJmaWVsZElkeCIsImkiLCJqIiwiZ2VvRmllbGRJZHgiLCJwYXJzZXIiLCJmaXJzdCIsImZpbmQiLCJyIiwicm93IiwicHJvcGVydGllcyIsImRhdGEiLCJmaWVsZE9yZGVyIiwibWV0YWRhdGEiLCJBbmFseXplciIsImNvbXB1dGVDb2xNZXRhIiwicmVnZXgiLCJkYXRhVHlwZSIsImlnbm9yZWREYXRhVHlwZXMiLCJyZW5hbWVEdXBsaWNhdGVGaWVsZHMiLCJmaWVsZEJ5SW5kZXgiLCJyZWR1Y2UiLCJvcmRlcmVkQXJyYXkiLCJpbmRleCIsImZpZWxkTWV0YSIsIm0iLCJrZXkiLCJ0YWJsZUZpZWxkSW5kZXgiLCJhbmFseXplclR5cGVUb0ZpZWxkVHlwZSIsImFuYWx5emVyVHlwZSIsImFjY3UiLCJhbGxOYW1lcyIsImZpZWxkTmFtZSIsImNvdW50ZXIiLCJwdXNoIiwiYVR5cGUiLCJkYXRlIiwiZ2VvanNvbiIsInN0cmluZyIsImdsb2JhbENvbnNvbGUiLCJ3YXJuIiwicHJvY2Vzc1Jvd09iamVjdCIsInNhbXBsZURhdGEiLCJwcm9jZXNzR2VvanNvbiIsIm5vcm1hbGl6ZWRHZW9qc29uIiwiZmVhdHVyZXMiLCJlcnJvciIsIkdVSURFU19GSUxFX0ZPUk1BVCIsImFsbERhdGFSb3dzIiwiZ2VvbWV0cnkiLCJfZ2VvanNvbiIsInByZXYiLCJjdXJyIiwiZm9ybWF0Q3N2IiwiY29sdW1ucyIsImZvcm1hdHRlZERhdGEiLCJ2YWxpZGF0ZUlucHV0RGF0YSIsImFsbFZhbGlkIiwiZXZlcnkiLCJKU09OIiwic3RyaW5naWZ5IiwiZmluZE5vbkVtcHR5Um93c0F0RmllbGQiLCJ0cyIsImFuYWx5emVkVHlwZSIsImNhdGVnb3J5IiwibWV0YSIsInVwZGF0ZWRGaWVsZHMiLCJwcm9jZXNzS2VwbGVyZ2xKU09OIiwiS2VwbGVyR2xTY2hlbWEiLCJsb2FkIiwiZGF0YXNldHMiLCJjb25maWciLCJwcm9jZXNzS2VwbGVyZ2xEYXRhc2V0IiwicmVzdWx0cyIsInBhcnNlU2F2ZWREYXRhIiwiREFUQVNFVF9IQU5ETEVSUyIsIkRBVEFTRVRfRk9STUFUUyIsImNzdiIsImtlcGxlcmdsIiwiUHJvY2Vzc29ycyJd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QmlDLGlDQUFnQkMsR0FIVSxFQUdKekcsY0FISSx1REFJMUJ3RyxpQ0FBZ0JFLFFBSlUsRUFJQ04sc0JBSkQscUJBQXRCOztBQU9BLElBQU1PLFVBQVUsR0FBRztBQUN4QnBDLEVBQUFBLGNBQWMsRUFBZEEsY0FEd0I7QUFFeEJ2RSxFQUFBQSxjQUFjLEVBQWRBLGNBRndCO0FBR3hCcUUsRUFBQUEsZ0JBQWdCLEVBQWhCQSxnQkFId0I7QUFJeEIwQixFQUFBQSxtQkFBbUIsRUFBbkJBLG1CQUp3QjtBQUt4QkssRUFBQUEsc0JBQXNCLEVBQXRCQSxzQkFMd0I7QUFNeEI1QyxFQUFBQSx1QkFBdUIsRUFBdkJBLHVCQU53QjtBQU94QjFDLEVBQUFBLGlCQUFpQixFQUFqQkEsaUJBUHdCO0FBUXhCUSxFQUFBQSx1QkFBdUIsRUFBdkJBLHVCQVJ3QjtBQVN4QjJELEVBQUFBLFNBQVMsRUFBVEE7QUFUd0IsQ0FBbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMjAgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQge2NzdlBhcnNlUm93cywgY3N2Rm9ybWF0Um93c30gZnJvbSAnZDMtZHN2JztcbmltcG9ydCB7cmFuZ2V9IGZyb20gJ2QzLWFycmF5JztcbmltcG9ydCB7Y29uc29sZSBhcyBnbG9iYWxDb25zb2xlfSBmcm9tICdnbG9iYWwvd2luZG93JztcbmltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcbmltcG9ydCB7QW5hbHl6ZXIsIERBVEFfVFlQRVMgYXMgQW5hbHl6ZXJEQVRBX1RZUEVTfSBmcm9tICd0eXBlLWFuYWx5emVyJztcbmltcG9ydCBub3JtYWxpemUgZnJvbSAnQG1hcGJveC9nZW9qc29uLW5vcm1hbGl6ZSc7XG5pbXBvcnQge0FMTF9GSUVMRF9UWVBFUywgREFUQVNFVF9GT1JNQVRTfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5pbXBvcnQge25vdE51bGxvclVuZGVmaW5lZCwgcGFyc2VGaWVsZFZhbHVlLCBnZXRTYW1wbGVEYXRhfSBmcm9tICd1dGlscy9kYXRhLXV0aWxzJztcbmltcG9ydCBLZXBsZXJHbFNjaGVtYSBmcm9tICdzY2hlbWFzJztcbmltcG9ydCB7R1VJREVTX0ZJTEVfRk9STUFUfSBmcm9tICdjb25zdGFudHMvdXNlci1ndWlkZXMnO1xuaW1wb3J0IHtpc1BsYWluT2JqZWN0LCB0b0FycmF5fSBmcm9tICd1dGlscy91dGlscyc7XG5cbmV4cG9ydCBjb25zdCBBQ0NFUFRFRF9BTkFMWVpFUl9UWVBFUyA9IFtcbiAgQW5hbHl6ZXJEQVRBX1RZUEVTLkRBVEUsXG4gIEFuYWx5emVyREFUQV9UWVBFUy5USU1FLFxuICBBbmFseXplckRBVEFfVFlQRVMuREFURVRJTUUsXG4gIEFuYWx5emVyREFUQV9UWVBFUy5OVU1CRVIsXG4gIEFuYWx5emVyREFUQV9UWVBFUy5JTlQsXG4gIEFuYWx5emVyREFUQV9UWVBFUy5GTE9BVCxcbiAgQW5hbHl6ZXJEQVRBX1RZUEVTLkJPT0xFQU4sXG4gIEFuYWx5emVyREFUQV9UWVBFUy5TVFJJTkcsXG4gIEFuYWx5emVyREFUQV9UWVBFUy5HRU9NRVRSWSxcbiAgQW5hbHl6ZXJEQVRBX1RZUEVTLkdFT01FVFJZX0ZST01fU1RSSU5HLFxuICBBbmFseXplckRBVEFfVFlQRVMuUEFJUl9HRU9NRVRSWV9GUk9NX1NUUklORyxcbiAgQW5hbHl6ZXJEQVRBX1RZUEVTLlpJUENPREUsXG4gIEFuYWx5emVyREFUQV9UWVBFUy5BUlJBWSxcbiAgQW5hbHl6ZXJEQVRBX1RZUEVTLk9CSkVDVFxuXTtcblxuLy8gaWYgYW55IG9mIHRoZXNlIHZhbHVlIG9jY3VycyBpbiBjc3YsIHBhcnNlIGl0IHRvIG51bGw7XG5jb25zdCBDU1ZfTlVMTFMgPSBbJycsICdudWxsJywgJ05VTEwnLCAnTnVsbCcsICdOYU4nLCAnL04nXTtcblxuY29uc3QgSUdOT1JFX0RBVEFfVFlQRVMgPSBPYmplY3Qua2V5cyhBbmFseXplckRBVEFfVFlQRVMpLmZpbHRlcihcbiAgdHlwZSA9PiAhQUNDRVBURURfQU5BTFlaRVJfVFlQRVMuaW5jbHVkZXModHlwZSlcbik7XG5cbmV4cG9ydCBjb25zdCBQQVJTRV9GSUVMRF9WQUxVRV9GUk9NX1NUUklORyA9IHtcbiAgW0FMTF9GSUVMRF9UWVBFUy5ib29sZWFuXToge1xuICAgIHZhbGlkOiBkID0+IHR5cGVvZiBkID09PSAnYm9vbGVhbicsXG4gICAgcGFyc2U6IGQgPT4gZCA9PT0gJ3RydWUnIHx8IGQgPT09ICdUcnVlJyB8fCBkID09PSAnMSdcbiAgfSxcbiAgW0FMTF9GSUVMRF9UWVBFUy5pbnRlZ2VyXToge1xuICAgIHZhbGlkOiBkID0+IHBhcnNlSW50KGQsIDEwKSA9PT0gZCxcbiAgICBwYXJzZTogZCA9PiBwYXJzZUludChkLCAxMClcbiAgfSxcbiAgW0FMTF9GSUVMRF9UWVBFUy50aW1lc3RhbXBdOiB7XG4gICAgdmFsaWQ6IChkLCBmaWVsZCkgPT5cbiAgICAgIFsneCcsICdYJ10uaW5jbHVkZXMoZmllbGQuZm9ybWF0KSA/IHR5cGVvZiBkID09PSAnbnVtYmVyJyA6IHR5cGVvZiBkID09PSAnc3RyaW5nJyxcbiAgICBwYXJzZTogKGQsIGZpZWxkKSA9PiAoWyd4JywgJ1gnXS5pbmNsdWRlcyhmaWVsZC5mb3JtYXQpID8gTnVtYmVyKGQpIDogZClcbiAgfSxcbiAgW0FMTF9GSUVMRF9UWVBFUy5yZWFsXToge1xuICAgIHZhbGlkOiBkID0+IHBhcnNlRmxvYXQoZCkgPT09IGQsXG4gICAgcGFyc2U6IHBhcnNlRmxvYXRcbiAgfVxufTtcblxuLyoqXG4gKiBQcm9jZXNzIGNzdiBkYXRhLCBvdXRwdXQgYSBkYXRhIG9iamVjdCB3aXRoIGB7ZmllbGRzOiBbXSwgcm93czogW119YC5cbiAqIFRoZSBkYXRhIG9iamVjdCBjYW4gYmUgd3JhcHBlZCBpbiBhIGBkYXRhc2V0YCBhbmQgcGFzcyB0byBbYGFkZERhdGFUb01hcGBdKC4uL2FjdGlvbnMvYWN0aW9ucy5tZCNhZGRkYXRhdG9tYXApXG4gKiBAcGFyYW0ge3N0cmluZ30gcmF3RGF0YSByYXcgY3N2IHN0cmluZ1xuICogQHJldHVybnMge09iamVjdH0gZGF0YSBvYmplY3QgYHtmaWVsZHM6IFtdLCByb3dzOiBbXX1gXG4gKiBAcHVibGljXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0IHtwcm9jZXNzQ3N2RGF0YX0gZnJvbSAna2VwbGVyLmdsL3Byb2Nlc3NvcnMnO1xuICpcbiAqIGNvbnN0IHRlc3REYXRhID0gYGdwc19kYXRhLnV0Y190aW1lc3RhbXAsZ3BzX2RhdGEubGF0LGdwc19kYXRhLmxuZyxncHNfZGF0YS50eXBlcyxlcG9jaCxoYXNfcmVzdWx0LGlkLHRpbWUsYmVnaW50cmlwX3RzX3V0YyxiZWdpbnRyaXBfdHNfbG9jYWwsZGF0ZVxuICogMjAxNi0wOS0xNyAwMDowOTo1NSwyOS45OTAwOTM3LDMxLjI1OTA1NDIsZHJpdmVyX2FuYWx5dGljcywxNDcyNjg4MDAwMDAwLEZhbHNlLDEsMjAxNi0wOS0yM1QwMDowMDowMC4wMDBaLDIwMTYtMTAtMDEgMDk6NDE6MzkrMDA6MDAsMjAxNi0xMC0wMSAwOTo0MTozOSswMDowMCwyMDE2LTA5LTIzXG4gKiAyMDE2LTA5LTE3IDAwOjEwOjU2LDI5Ljk5Mjc2OTksMzEuMjQ2MTE0Mixkcml2ZXJfYW5hbHl0aWNzLDE0NzI2ODgwMDAwMDAsRmFsc2UsMiwyMDE2LTA5LTIzVDAwOjAwOjAwLjAwMFosMjAxNi0xMC0wMSAwOTo0NjozNyswMDowMCwyMDE2LTEwLTAxIDE2OjQ2OjM3KzAwOjAwLDIwMTYtMDktMjNcbiAqIDIwMTYtMDktMTcgMDA6MTE6NTYsMjkuOTkwNzI2MSwzMS4yMzEyNzQyLGRyaXZlcl9hbmFseXRpY3MsMTQ3MjY4ODAwMDAwMCxGYWxzZSwzLDIwMTYtMDktMjNUMDA6MDA6MDAuMDAwWiwsLDIwMTYtMDktMjNcbiAqIDIwMTYtMDktMTcgMDA6MTI6NTgsMjkuOTg3MDA3NCwzMS4yMTc1ODI3LGRyaXZlcl9hbmFseXRpY3MsMTQ3MjY4ODAwMDAwMCxGYWxzZSw0LDIwMTYtMDktMjNUMDA6MDA6MDAuMDAwWiwsLDIwMTYtMDktMjNgXG4gKlxuICogY29uc3QgZGF0YXNldCA9IHtcbiAqICBpbmZvOiB7aWQ6ICd0ZXN0X2RhdGEnLCBsYWJlbDogJ015IENzdid9LFxuICogIGRhdGE6IHByb2Nlc3NDc3ZEYXRhKHRlc3REYXRhKVxuICogfTtcbiAqXG4gKiBkaXNwYXRjaChhZGREYXRhVG9NYXAoe1xuICogIGRhdGFzZXRzOiBbZGF0YXNldF0sXG4gKiAgb3B0aW9uczoge2NlbnRlck1hcDogdHJ1ZSwgcmVhZE9ubHk6IHRydWV9XG4gKiB9KSk7XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzQ3N2RGF0YShyYXdEYXRhKSB7XG4gIC8vIGhlcmUgd2UgYXNzdW1lIHRoZSBjc3YgZmlsZSB0aGF0IHBlb3BsZSB1cGxvYWRlZCB3aWxsIGhhdmUgZmlyc3Qgcm93XG4gIC8vIGFzIG5hbWUgb2YgdGhlIGNvbHVtblxuICAvLyBUT0RPOiBhZGQgYSBhbGVydCBhdCB1cGxvYWQgY3N2IHRvIHJlbWluZCBkZWZpbmUgZmlyc3Qgcm93XG4gIGNvbnN0IHJlc3VsdCA9IGNzdlBhcnNlUm93cyhyYXdEYXRhKTtcbiAgaWYgKCFBcnJheS5pc0FycmF5KHJlc3VsdCkgfHwgcmVzdWx0Lmxlbmd0aCA8IDIpIHtcbiAgICAvLyBsb29rcyBsaWtlIGFuIGVtcHR5IGZpbGUsIHRocm93IGVycm9yIHRvIGJlIGNhdGNoXG4gICAgdGhyb3cgbmV3IEVycm9yKCdSZWFkIEZpbGUgRmFpbGVkOiBDU1YgaXMgZW1wdHknKTtcbiAgfVxuXG4gIGNvbnN0IFtoZWFkZXJSb3csIC4uLnJvd3NdID0gcmVzdWx0O1xuXG4gIGNsZWFuVXBGYWxzeUNzdlZhbHVlKHJvd3MpO1xuICAvLyBObyBuZWVkIHRvIHJ1biB0eXBlIGRldGVjdGlvbiBvbiBldmVyeSBkYXRhIHBvaW50XG4gIC8vIGhlcmUgd2UgZ2V0IGEgbGlzdCBvZiBub25lIG51bGwgdmFsdWVzIHRvIHJ1biBhbmFseXplIG9uXG4gIGNvbnN0IHNhbXBsZSA9IGdldFNhbXBsZUZvclR5cGVBbmFseXplKHtmaWVsZHM6IGhlYWRlclJvdywgYWxsRGF0YTogcm93c30pO1xuXG4gIGNvbnN0IGZpZWxkcyA9IGdldEZpZWxkc0Zyb21EYXRhKHNhbXBsZSwgaGVhZGVyUm93KTtcblxuICBjb25zdCBwYXJzZWRSb3dzID0gcGFyc2VSb3dzQnlGaWVsZHMocm93cywgZmllbGRzKTtcblxuICByZXR1cm4ge2ZpZWxkcywgcm93czogcGFyc2VkUm93c307XG59XG5cbi8qKlxuICogUGFyc2Ugcm93cyBvZiBjc3YgYnkgYW5hbHl6ZWQgZmllbGQgdHlwZXMuIFNvIHRoYXQgYCcxJ2AgLT4gYDFgLCBgJ1RydWUnYCAtPiBgdHJ1ZWBcbiAqIEBwYXJhbSB7QXJyYXk8QXJyYXk+fSByb3dzXG4gKiBAcGFyYW0ge0FycmF5PE9iamVjdH0gZmllbGRzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVJvd3NCeUZpZWxkcyhyb3dzLCBmaWVsZHMpIHtcbiAgLy8gRWRpdCByb3dzIGluIHBsYWNlXG4gIGNvbnN0IGdlb2pzb25GaWVsZElkeCA9IGZpZWxkcy5maW5kSW5kZXgoZiA9PiBmLm5hbWUgPT09ICdfZ2VvanNvbicpO1xuICBmaWVsZHMuZm9yRWFjaChwYXJzZUNzdlJvd3NCeUZpZWxkVHlwZS5iaW5kKG51bGwsIHJvd3MsIGdlb2pzb25GaWVsZElkeCkpO1xuXG4gIHJldHVybiByb3dzO1xufVxuLyoqXG4gKiBHZXR0aW5nIHNhbXBsZSBkYXRhIGZvciBhbmFseXppbmcgZmllbGQgdHlwZS5cbiAqXG4gKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IGZpZWxkcyBhbiBhcnJheSBvZiBmaWVsZCBuYW1lc1xuICogQHBhcmFtIHtBcnJheTxBcnJheT59IGFsbERhdGFcbiAqIEBwYXJhbSB7QXJyYXl9IHNhbXBsZUNvdW50XG4gKiBAcmV0dXJucyB7QXJyYXl9IGZvcm1hdHRlZCBmaWVsZHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNhbXBsZUZvclR5cGVBbmFseXplKHtmaWVsZHMsIGFsbERhdGEsIHNhbXBsZUNvdW50ID0gNTB9KSB7XG4gIGNvbnN0IHRvdGFsID0gTWF0aC5taW4oc2FtcGxlQ291bnQsIGFsbERhdGEubGVuZ3RoKTtcbiAgLy8gY29uc3QgZmllbGRPcmRlciA9IGZpZWxkcy5tYXAoZiA9PiBmLm5hbWUpO1xuICBjb25zdCBzYW1wbGUgPSByYW5nZSgwLCB0b3RhbCwgMSkubWFwKGQgPT4gKHt9KSk7XG5cbiAgLy8gY29sbGVjdCBzYW1wbGUgZGF0YSBmb3IgZWFjaCBmaWVsZFxuICBmaWVsZHMuZm9yRWFjaCgoZmllbGQsIGZpZWxkSWR4KSA9PiB7XG4gICAgLy8gZGF0YSBjb3VudGVyXG4gICAgbGV0IGkgPSAwO1xuICAgIC8vIHNhbXBsZSBjb3VudGVyXG4gICAgbGV0IGogPSAwO1xuXG4gICAgd2hpbGUgKGogPCB0b3RhbCkge1xuICAgICAgaWYgKGkgPj0gYWxsRGF0YS5sZW5ndGgpIHtcbiAgICAgICAgLy8gaWYgZGVwbGV0ZWQgZGF0YSBwb29sXG4gICAgICAgIHNhbXBsZVtqXVtmaWVsZF0gPSBudWxsO1xuICAgICAgICBqKys7XG4gICAgICB9IGVsc2UgaWYgKG5vdE51bGxvclVuZGVmaW5lZChhbGxEYXRhW2ldW2ZpZWxkSWR4XSkpIHtcbiAgICAgICAgc2FtcGxlW2pdW2ZpZWxkXSA9IGFsbERhdGFbaV1bZmllbGRJZHhdO1xuICAgICAgICBqKys7XG4gICAgICAgIGkrKztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGkrKztcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBzYW1wbGU7XG59XG5cbi8qKlxuICogQ29udmVydCBmYWxzeSB2YWx1ZSBpbiBjc3YgaW5jbHVkaW5nIGAnJywgJ251bGwnLCAnTlVMTCcsICdOdWxsJywgJ05hTidgIHRvIGBudWxsYCxcbiAqIHNvIHRoYXQgdHlwZS1hbmFseXplciB3b24ndCBkZXRlY3QgaXQgYXMgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtBcnJheTxBcnJheT59IHJvd3NcbiAqL1xuZnVuY3Rpb24gY2xlYW5VcEZhbHN5Q3N2VmFsdWUocm93cykge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd3MubGVuZ3RoOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJvd3NbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgIC8vIGFuYWx5emVyIHdpbGwgc2V0IGFueSBmaWVsZHMgdG8gJ3N0cmluZycgaWYgdGhlcmUgYXJlIGVtcHR5IHZhbHVlc1xuICAgICAgLy8gd2hpY2ggd2lsbCBiZSBwYXJzZWQgYXMgJycgYnkgZDMuY3N2XG4gICAgICAvLyBoZXJlIHdlIHBhcnNlIGVtcHR5IGRhdGEgYXMgbnVsbFxuICAgICAgLy8gVE9ETzogY3JlYXRlIHdhcm5pbmcgd2hlbiBkZWx0ZWN0IGBDU1ZfTlVMTFNgIGluIHRoZSBkYXRhXG4gICAgICBpZiAoIXJvd3NbaV1bal0gfHwgQ1NWX05VTExTLmluY2x1ZGVzKHJvd3NbaV1bal0pKSB7XG4gICAgICAgIHJvd3NbaV1bal0gPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFByb2Nlc3MgdXBsb2FkZWQgY3N2IGZpbGUgdG8gcGFyc2UgdmFsdWUgYnkgZmllbGQgdHlwZVxuICpcbiAqIEBwYXJhbSB7QXJyYXk8QXJyYXk+fSByb3dzXG4gKiBAcGFyYW0ge051bWJlcn0gZ2VvIGZpZWxkIGluZGV4XG4gKiBAcGFyYW0ge09iamVjdH0gZmllbGRcbiAqIEBwYXJhbSB7TnVtYmVyfSBpXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQ3N2Um93c0J5RmllbGRUeXBlKHJvd3MsIGdlb0ZpZWxkSWR4LCBmaWVsZCwgaSkge1xuICBjb25zdCBwYXJzZXIgPSBQQVJTRV9GSUVMRF9WQUxVRV9GUk9NX1NUUklOR1tmaWVsZC50eXBlXTtcbiAgaWYgKHBhcnNlcikge1xuICAgIC8vIGNoZWNrIGZpcnN0IG5vdCBudWxsIHZhbHVlIG9mIGl0J3MgYWxyZWFkeSBwYXJzZWRcbiAgICBjb25zdCBmaXJzdCA9IHJvd3MuZmluZChyID0+IG5vdE51bGxvclVuZGVmaW5lZChyW2ldKSk7XG4gICAgaWYgKCFmaXJzdCB8fCBwYXJzZXIudmFsaWQoZmlyc3RbaV0sIGZpZWxkKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByb3dzLmZvckVhY2gocm93ID0+IHtcbiAgICAgIC8vIHBhcnNlIHN0cmluZyB2YWx1ZSBiYXNlZCBvbiBmaWVsZCB0eXBlXG4gICAgICBpZiAocm93W2ldICE9PSBudWxsKSB7XG4gICAgICAgIHJvd1tpXSA9IHBhcnNlci5wYXJzZShyb3dbaV0sIGZpZWxkKTtcbiAgICAgICAgaWYgKGdlb0ZpZWxkSWR4ID4gLTEgJiYgcm93W2dlb0ZpZWxkSWR4XSAmJiByb3dbZ2VvRmllbGRJZHhdLnByb3BlcnRpZXMpIHtcbiAgICAgICAgICByb3dbZ2VvRmllbGRJZHhdLnByb3BlcnRpZXNbZmllbGQubmFtZV0gPSByb3dbaV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIEFuYWx5emUgZmllbGQgdHlwZXMgZnJvbSBkYXRhIGluIGBzdHJpbmdgIGZvcm1hdCwgZS5nLiB1cGxvYWRlZCBjc3YuXG4gKiBBc3NpZ24gYHR5cGVgLCBgdGFibGVGaWVsZEluZGV4YCBhbmQgYGZvcm1hdGAgKHRpbWVzdGFtcCBvbmx5KSB0byBlYWNoIGZpZWxkXG4gKlxuICogQHBhcmFtIHtBcnJheTxPYmplY3Q+fSBkYXRhIGFycmF5IG9mIHJvdyBvYmplY3RcbiAqIEBwYXJhbSB7QXJyYXl9IGZpZWxkT3JkZXIgYXJyYXkgb2YgZmllbGQgbmFtZXMgYXMgc3RyaW5nXG4gKiBAcmV0dXJucyB7QXJyYXk8T2JqZWN0Pn0gZm9ybWF0dGVkIGZpZWxkc1xuICogQHB1YmxpY1xuICogQGV4YW1wbGVcbiAqXG4gKiBpbXBvcnQge2dldEZpZWxkc0Zyb21EYXRhfSBmcm9tICdrZXBsZXIuZ2wvcHJvY2Vzc29ycyc7XG4gKiBjb25zdCBkYXRhID0gW3tcbiAqICAgdGltZTogJzIwMTYtMDktMTcgMDA6MDk6NTUnLFxuICogICB2YWx1ZTogJzQnLFxuICogICBzdXJnZTogJzEuMicsXG4gKiAgIGlzVHJpcDogJ3RydWUnLFxuICogICB6ZXJvT25lczogJzAnXG4gKiB9LCB7XG4gKiAgIHRpbWU6ICcyMDE2LTA5LTE3IDAwOjMwOjA4JyxcbiAqICAgdmFsdWU6ICczJyxcbiAqICAgc3VyZ2U6IG51bGwsXG4gKiAgIGlzVHJpcDogJ2ZhbHNlJyxcbiAqICAgemVyb09uZXM6ICcxJ1xuICogfSwge1xuICogICB0aW1lOiBudWxsLFxuICogICB2YWx1ZTogJzInLFxuICogICBzdXJnZTogJzEuMycsXG4gKiAgIGlzVHJpcDogbnVsbCxcbiAqICAgemVyb09uZXM6ICcxJ1xuICogfV07XG4gKlxuICogY29uc3QgZmllbGRPcmRlciA9IFsndGltZScsICd2YWx1ZScsICdzdXJnZScsICdpc1RyaXAnLCAnemVyb09uZXMnXTtcbiAqIGNvbnN0IGZpZWxkcyA9IGdldEZpZWxkc0Zyb21EYXRhKGRhdGEsIGZpZWxkT3JkZXIpO1xuICogLy8gZmllbGRzID0gW1xuICogLy8ge25hbWU6ICd0aW1lJywgZm9ybWF0OiAnWVlZWS1NLUQgSDptOnMnLCB0YWJsZUZpZWxkSW5kZXg6IDEsIHR5cGU6ICd0aW1lc3RhbXAnfSxcbiAqIC8vIHtuYW1lOiAndmFsdWUnLCBmb3JtYXQ6ICcnLCB0YWJsZUZpZWxkSW5kZXg6IDQsIHR5cGU6ICdpbnRlZ2VyJ30sXG4gKiAvLyB7bmFtZTogJ3N1cmdlJywgZm9ybWF0OiAnJywgdGFibGVGaWVsZEluZGV4OiA1LCB0eXBlOiAncmVhbCd9LFxuICogLy8ge25hbWU6ICdpc1RyaXAnLCBmb3JtYXQ6ICcnLCB0YWJsZUZpZWxkSW5kZXg6IDYsIHR5cGU6ICdib29sZWFuJ30sXG4gKiAvLyB7bmFtZTogJ3plcm9PbmVzJywgZm9ybWF0OiAnJywgdGFibGVGaWVsZEluZGV4OiA3LCB0eXBlOiAnaW50ZWdlcid9XTtcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRGaWVsZHNGcm9tRGF0YShkYXRhLCBmaWVsZE9yZGVyKSB7XG4gIC8vIGFkZCBhIGNoZWNrIGZvciBlcG9jaCB0aW1lc3RhbXBcbiAgY29uc3QgbWV0YWRhdGEgPSBBbmFseXplci5jb21wdXRlQ29sTWV0YShcbiAgICBkYXRhLFxuICAgIFt7cmVnZXg6IC8uKmdlb2pzb258YWxsX3BvaW50cy9nLCBkYXRhVHlwZTogJ0dFT01FVFJZJ31dLFxuICAgIHtpZ25vcmVkRGF0YVR5cGVzOiBJR05PUkVfREFUQV9UWVBFU31cbiAgKTtcblxuICBjb25zdCB7ZmllbGRCeUluZGV4fSA9IHJlbmFtZUR1cGxpY2F0ZUZpZWxkcyhmaWVsZE9yZGVyKTtcblxuICBjb25zdCByZXN1bHQgPSBmaWVsZE9yZGVyLnJlZHVjZSgob3JkZXJlZEFycmF5LCBmaWVsZCwgaW5kZXgpID0+IHtcbiAgICBjb25zdCBuYW1lID0gZmllbGRCeUluZGV4W2luZGV4XTtcblxuICAgIGNvbnN0IGZpZWxkTWV0YSA9IG1ldGFkYXRhLmZpbmQobSA9PiBtLmtleSA9PT0gZmllbGQpO1xuICAgIGNvbnN0IHt0eXBlLCBmb3JtYXR9ID0gZmllbGRNZXRhIHx8IHt9O1xuXG4gICAgb3JkZXJlZEFycmF5W2luZGV4XSA9IHtcbiAgICAgIG5hbWUsXG4gICAgICBmb3JtYXQsXG4gICAgICB0YWJsZUZpZWxkSW5kZXg6IGluZGV4ICsgMSxcbiAgICAgIHR5cGU6IGFuYWx5emVyVHlwZVRvRmllbGRUeXBlKHR5cGUpLFxuICAgICAgYW5hbHl6ZXJUeXBlOiB0eXBlXG4gICAgfTtcbiAgICByZXR1cm4gb3JkZXJlZEFycmF5O1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBwYXNzIGluIGFuIGFycmF5IG9mIGZpZWxkIG5hbWVzLCByZW5hbWUgZHVwbGljYXRlZCBvbmVcbiAqIGFuZCByZXR1cm4gYSBtYXAgZnJvbSBvbGQgZmllbGQgaW5kZXggdG8gbmV3IG5hbWVcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBmaWVsZE9yZGVyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBuZXcgZmllbGQgbmFtZSBieSBpbmRleFxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVuYW1lRHVwbGljYXRlRmllbGRzKGZpZWxkT3JkZXIpIHtcbiAgcmV0dXJuIGZpZWxkT3JkZXIucmVkdWNlKFxuICAgIChhY2N1LCBmaWVsZCwgaSkgPT4ge1xuICAgICAgY29uc3Qge2FsbE5hbWVzfSA9IGFjY3U7XG4gICAgICBsZXQgZmllbGROYW1lID0gZmllbGQ7XG5cbiAgICAgIC8vIGFkZCBhIGNvdW50ZXIgdG8gZHVwbGljYXRlZCBuYW1lc1xuICAgICAgaWYgKGFsbE5hbWVzLmluY2x1ZGVzKGZpZWxkKSkge1xuICAgICAgICBsZXQgY291bnRlciA9IDA7XG4gICAgICAgIHdoaWxlIChhbGxOYW1lcy5pbmNsdWRlcyhgJHtmaWVsZH0tJHtjb3VudGVyfWApKSB7XG4gICAgICAgICAgY291bnRlcisrO1xuICAgICAgICB9XG4gICAgICAgIGZpZWxkTmFtZSA9IGAke2ZpZWxkfS0ke2NvdW50ZXJ9YDtcbiAgICAgIH1cblxuICAgICAgYWNjdS5maWVsZEJ5SW5kZXhbaV0gPSBmaWVsZE5hbWU7XG4gICAgICBhY2N1LmFsbE5hbWVzLnB1c2goZmllbGROYW1lKTtcblxuICAgICAgcmV0dXJuIGFjY3U7XG4gICAgfSxcbiAgICB7YWxsTmFtZXM6IFtdLCBmaWVsZEJ5SW5kZXg6IHt9fVxuICApO1xufVxuXG4vKipcbiAqIENvbnZlcnQgdHlwZS1hbmFseXplciBvdXRwdXQgdG8ga2VwbGVyLmdsIGZpZWxkIHR5cGVzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGFUeXBlXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBjb3JyZXNwb25kaW5nIHR5cGUgaW4gYEFMTF9GSUVMRF9UWVBFU2BcbiAqL1xuLyogZXNsaW50LWRpc2FibGUgY29tcGxleGl0eSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFuYWx5emVyVHlwZVRvRmllbGRUeXBlKGFUeXBlKSB7XG4gIGNvbnN0IHtcbiAgICBEQVRFLFxuICAgIFRJTUUsXG4gICAgREFURVRJTUUsXG4gICAgTlVNQkVSLFxuICAgIElOVCxcbiAgICBGTE9BVCxcbiAgICBCT09MRUFOLFxuICAgIFNUUklORyxcbiAgICBHRU9NRVRSWSxcbiAgICBHRU9NRVRSWV9GUk9NX1NUUklORyxcbiAgICBQQUlSX0dFT01FVFJZX0ZST01fU1RSSU5HLFxuICAgIFpJUENPREUsXG4gICAgQVJSQVksXG4gICAgT0JKRUNUXG4gIH0gPSBBbmFseXplckRBVEFfVFlQRVM7XG5cbiAgLy8gVE9ETzogdW4gcmVjb2duaXplZCB0eXBlc1xuICAvLyBDVVJSRU5DWSBQRVJDRU5UIE5PTkVcbiAgc3dpdGNoIChhVHlwZSkge1xuICAgIGNhc2UgREFURTpcbiAgICAgIHJldHVybiBBTExfRklFTERfVFlQRVMuZGF0ZTtcbiAgICBjYXNlIFRJTUU6XG4gICAgY2FzZSBEQVRFVElNRTpcbiAgICAgIHJldHVybiBBTExfRklFTERfVFlQRVMudGltZXN0YW1wO1xuICAgIGNhc2UgRkxPQVQ6XG4gICAgICByZXR1cm4gQUxMX0ZJRUxEX1RZUEVTLnJlYWw7XG4gICAgY2FzZSBJTlQ6XG4gICAgICByZXR1cm4gQUxMX0ZJRUxEX1RZUEVTLmludGVnZXI7XG4gICAgY2FzZSBCT09MRUFOOlxuICAgICAgcmV0dXJuIEFMTF9GSUVMRF9UWVBFUy5ib29sZWFuO1xuICAgIGNhc2UgR0VPTUVUUlk6XG4gICAgY2FzZSBHRU9NRVRSWV9GUk9NX1NUUklORzpcbiAgICBjYXNlIFBBSVJfR0VPTUVUUllfRlJPTV9TVFJJTkc6XG4gICAgY2FzZSBBUlJBWTpcbiAgICBjYXNlIE9CSkVDVDpcbiAgICAgIC8vIFRPRE86IGNyZWF0ZSBhIG5ldyBkYXRhIHR5cGUgZm9yIG9iamVjdHMgYW5kIGFycmF5c1xuICAgICAgcmV0dXJuIEFMTF9GSUVMRF9UWVBFUy5nZW9qc29uO1xuICAgIGNhc2UgTlVNQkVSOlxuICAgIGNhc2UgU1RSSU5HOlxuICAgIGNhc2UgWklQQ09ERTpcbiAgICAgIHJldHVybiBBTExfRklFTERfVFlQRVMuc3RyaW5nO1xuICAgIGRlZmF1bHQ6XG4gICAgICBnbG9iYWxDb25zb2xlLndhcm4oYFVuc3VwcG9ydGVkIGFuYWx5emVyIHR5cGU6ICR7YVR5cGV9YCk7XG4gICAgICByZXR1cm4gQUxMX0ZJRUxEX1RZUEVTLnN0cmluZztcbiAgfVxufVxuLyogZXNsaW50LWVuYWJsZSBjb21wbGV4aXR5ICovXG5cbi8qKlxuICogUHJvY2VzcyBkYXRhIHdoZXJlIGVhY2ggcm93IGlzIGFuIG9iamVjdCwgb3V0cHV0IGNhbiBiZSBwYXNzZWQgdG8gW2BhZGREYXRhVG9NYXBgXSguLi9hY3Rpb25zL2FjdGlvbnMubWQjYWRkZGF0YXRvbWFwKVxuICogQHBhcmFtIHtBcnJheTxPYmplY3Q+fSByYXdEYXRhIGFuIGFycmF5IG9mIHJvdyBvYmplY3QsIGVhY2ggb2JqZWN0IHNob3VsZCBoYXZlIHRoZSBzYW1lIG51bWJlciBvZiBrZXlzXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBkYXRhc2V0IGNvbnRhaW5pbmcgYGZpZWxkc2AgYW5kIGByb3dzYFxuICogQHB1YmxpY1xuICogQGV4YW1wbGVcbiAqIGltcG9ydCB7YWRkRGF0YVRvTWFwfSBmcm9tICdrZXBsZXIuZ2wvYWN0aW9ucyc7XG4gKiBpbXBvcnQge3Byb2Nlc3NSb3dPYmplY3R9IGZyb20gJ2tlcGxlci5nbC9wcm9jZXNzb3JzJztcbiAqXG4gKiBjb25zdCBkYXRhID0gW1xuICogIHtsYXQ6IDMxLjI3LCBsbmc6IDEyNy41NiwgdmFsdWU6IDN9LFxuICogIHtsYXQ6IDMxLjIyLCBsbmc6IDEyNi4yNiwgdmFsdWU6IDF9XG4gKiBdO1xuICpcbiAqIGRpc3BhdGNoKGFkZERhdGFUb01hcCh7XG4gKiAgZGF0YXNldHM6IHtcbiAqICAgIGluZm86IHtsYWJlbDogJ015IERhdGEnLCBpZDogJ215X2RhdGEnfSxcbiAqICAgIGRhdGE6IHByb2Nlc3NSb3dPYmplY3QoZGF0YSlcbiAqICB9XG4gKiB9KSk7XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzUm93T2JqZWN0KHJhd0RhdGEpIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KHJhd0RhdGEpIHx8ICFyYXdEYXRhLmxlbmd0aCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHJhd0RhdGFbMF0pO1xuICBjb25zdCByb3dzID0gcmF3RGF0YS5tYXAoZCA9PiBrZXlzLm1hcChrZXkgPT4gZFtrZXldKSk7XG5cbiAgLy8gcGljayBzYW1wbGVzXG4gIGNvbnN0IHNhbXBsZURhdGEgPSBnZXRTYW1wbGVEYXRhKHJhd0RhdGEsIDUwMCk7XG4gIGNvbnN0IGZpZWxkcyA9IGdldEZpZWxkc0Zyb21EYXRhKHNhbXBsZURhdGEsIGtleXMpO1xuICBjb25zdCBwYXJzZWRSb3dzID0gcGFyc2VSb3dzQnlGaWVsZHMocm93cywgZmllbGRzKTtcblxuICByZXR1cm4ge1xuICAgIGZpZWxkcyxcbiAgICByb3dzOiBwYXJzZWRSb3dzXG4gIH07XG59XG5cbi8qKlxuICogUHJvY2VzcyBHZW9KU09OIFtgRmVhdHVyZUNvbGxlY3Rpb25gXShodHRwOi8vd2lraS5nZW9qc29uLm9yZy9HZW9KU09OX2RyYWZ0X3ZlcnNpb25fNiNGZWF0dXJlQ29sbGVjdGlvbiksXG4gKiBvdXRwdXQgYSBkYXRhIG9iamVjdCB3aXRoIGB7ZmllbGRzOiBbXSwgcm93czogW119YC5cbiAqIFRoZSBkYXRhIG9iamVjdCBjYW4gYmUgd3JhcHBlZCBpbiBhIGBkYXRhc2V0YCBhbmQgcGFzcyB0byBbYGFkZERhdGFUb01hcGBdKC4uL2FjdGlvbnMvYWN0aW9ucy5tZCNhZGRkYXRhdG9tYXApXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHJhd0RhdGEgcmF3IGdlb2pzb24gZmVhdHVyZSBjb2xsZWN0aW9uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBkYXRhc2V0IGNvbnRhaW5pbmcgYGZpZWxkc2AgYW5kIGByb3dzYFxuICogQHB1YmxpY1xuICogQGV4YW1wbGVcbiAqIGltcG9ydCB7YWRkRGF0YVRvTWFwfSBmcm9tICdrZXBsZXIuZ2wvYWN0aW9ucyc7XG4gKiBpbXBvcnQge3Byb2Nlc3NHZW9qc29ufSBmcm9tICdrZXBsZXIuZ2wvcHJvY2Vzc29ycyc7XG4gKlxuICogY29uc3QgZ2VvanNvbiA9IHtcbiAqIFx0XCJ0eXBlXCIgOiBcIkZlYXR1cmVDb2xsZWN0aW9uXCIsXG4gKiBcdFwiZmVhdHVyZXNcIiA6IFt7XG4gKiBcdFx0XCJ0eXBlXCIgOiBcIkZlYXR1cmVcIixcbiAqIFx0XHRcInByb3BlcnRpZXNcIiA6IHtcbiAqIFx0XHRcdFwiY2FwYWNpdHlcIiA6IFwiMTBcIixcbiAqIFx0XHRcdFwidHlwZVwiIDogXCJVLVJhY2tcIlxuICogXHRcdH0sXG4gKiBcdFx0XCJnZW9tZXRyeVwiIDoge1xuICogXHRcdFx0XCJ0eXBlXCIgOiBcIlBvaW50XCIsXG4gKiBcdFx0XHRcImNvb3JkaW5hdGVzXCIgOiBbIC03MS4wNzMyODMsIDQyLjQxNzUwMCBdXG4gKiBcdFx0fVxuICogXHR9XVxuICogfTtcbiAqXG4gKiBkaXNwYXRjaChhZGREYXRhVG9NYXAoe1xuICogIGRhdGFzZXRzOiB7XG4gKiAgICBpbmZvOiB7XG4gKiAgICAgIGxhYmVsOiAnU2FtcGxlIFRheGkgVHJpcHMgaW4gTmV3IFlvcmsgQ2l0eScsXG4gKiAgICAgIGlkOiAndGVzdF90cmlwX2RhdGEnXG4gKiAgICB9LFxuICogICAgZGF0YTogcHJvY2Vzc0dlb2pzb24oZ2VvanNvbilcbiAqICB9XG4gKiB9KSk7XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzR2VvanNvbihyYXdEYXRhKSB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRHZW9qc29uID0gbm9ybWFsaXplKHJhd0RhdGEpO1xuXG4gIGlmICghbm9ybWFsaXplZEdlb2pzb24gfHwgIUFycmF5LmlzQXJyYXkobm9ybWFsaXplZEdlb2pzb24uZmVhdHVyZXMpKSB7XG4gICAgY29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoXG4gICAgICBgUmVhZCBGaWxlIEZhaWxlZDogRmlsZSBpcyBub3QgYSB2YWxpZCBHZW9KU09OLiBSZWFkIG1vcmUgYWJvdXQgW3N1cHBvcnRlZCBmaWxlIGZvcm1hdF0oJHtHVUlERVNfRklMRV9GT1JNQVR9KWBcbiAgICApO1xuICAgIHRocm93IGVycm9yO1xuICAgIC8vIGZhaWwgdG8gbm9ybWFsaXplIGdlb2pzb25cbiAgfVxuXG4gIC8vIGdldHRpbmcgYWxsIGZlYXR1cmUgZmllbGRzXG4gIGNvbnN0IGFsbERhdGFSb3dzID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbm9ybWFsaXplZEdlb2pzb24uZmVhdHVyZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBmID0gbm9ybWFsaXplZEdlb2pzb24uZmVhdHVyZXNbaV07XG4gICAgaWYgKGYuZ2VvbWV0cnkpIHtcbiAgICAgIGFsbERhdGFSb3dzLnB1c2goe1xuICAgICAgICAvLyBhZGQgZmVhdHVyZSB0byBfZ2VvanNvbiBmaWVsZFxuICAgICAgICBfZ2VvanNvbjogZixcbiAgICAgICAgLi4uKGYucHJvcGVydGllcyB8fCB7fSlcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICAvLyBnZXQgYWxsIHRoZSBmaWVsZFxuICBjb25zdCBmaWVsZHMgPSBhbGxEYXRhUm93cy5yZWR1Y2UoKHByZXYsIGN1cnIpID0+IHtcbiAgICBPYmplY3Qua2V5cyhjdXJyKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZiAoIXByZXYuaW5jbHVkZXMoa2V5KSkge1xuICAgICAgICBwcmV2LnB1c2goa2V5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcHJldjtcbiAgfSwgW10pO1xuXG4gIC8vIG1ha2Ugc3VyZSBlYWNoIGZlYXR1cmUgaGFzIGV4YWN0IHNhbWUgZmllbGRzXG4gIGFsbERhdGFSb3dzLmZvckVhY2goZCA9PiB7XG4gICAgZmllbGRzLmZvckVhY2goZiA9PiB7XG4gICAgICBpZiAoIShmIGluIGQpKSB7XG4gICAgICAgIGRbZl0gPSBudWxsO1xuICAgICAgICBkLl9nZW9qc29uLnByb3BlcnRpZXNbZl0gPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gcHJvY2Vzc1Jvd09iamVjdChhbGxEYXRhUm93cyk7XG59XG5cbi8qKlxuICogT24gZXhwb3J0IGRhdGEgdG8gY3N2XG4gKiBAcGFyYW0ge0FycmF5PEFycmF5Pn0gZGF0YSBgZGF0YXNldC5hbGxEYXRhYCBvciBmaWx0ZXJlZCBkYXRhIGBkYXRhc2V0LmRhdGFgXG4gKiBAcGFyYW0ge0FycmF5PE9iamVjdD59IGZpZWxkcyBgZGF0YXNldC5maWVsZHNgXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBjc3Ygc3RyaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRDc3YoZGF0YSwgZmllbGRzKSB7XG4gIGNvbnN0IGNvbHVtbnMgPSBmaWVsZHMubWFwKGYgPT4gZi5uYW1lKTtcbiAgY29uc3QgZm9ybWF0dGVkRGF0YSA9IFtjb2x1bW5zXTtcblxuICAvLyBwYXJzZSBnZW9qc29uIG9iamVjdCBhcyBzdHJpbmdcbiAgZGF0YS5mb3JFYWNoKHJvdyA9PiB7XG4gICAgZm9ybWF0dGVkRGF0YS5wdXNoKHJvdy5tYXAoKGQsIGkpID0+IHBhcnNlRmllbGRWYWx1ZShkLCBmaWVsZHNbaV0udHlwZSkpKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNzdkZvcm1hdFJvd3MoZm9ybWF0dGVkRGF0YSk7XG59XG5cbi8qKlxuICogVmFsaWRhdGUgaW5wdXQgZGF0YSwgYWRkaW5nIG1pc3NpbmcgZmllbGQgdHlwZXMsIHJlbmFtZSBkdXBsaWNhdGUgY29sdW1uc1xuICogQHBhcmFtIHtPYmplY3R9IGRhdGEgZGF0YXNldC5kYXRhXG4gKiBAcGFyYW0ge0FycmF5PE9iamVjdD59IGRhdGEuZmllbGRzIGFuIGFycmF5IG9mIGZpZWxkc1xuICogQHBhcmFtIHtBcnJheTxPYmplY3Q+fSBkYXRhLnJvd3MgYW4gYXJyYXkgb2YgZGF0YSByb3dzXG4gKiBAcmV0dXJucyB7e2FsbERhdGE6IEFycmF5LCBmaWVsZHM6IEFycmF5fX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlSW5wdXREYXRhKGRhdGEpIHtcbiAgaWYgKCFpc1BsYWluT2JqZWN0KGRhdGEpKSB7XG4gICAgYXNzZXJ0KCdhZGREYXRhVG9NYXAgRXJyb3I6IGRhdGFzZXQuZGF0YSBjYW5ub3QgYmUgbnVsbCcpO1xuICAgIHJldHVybiBudWxsO1xuICB9IGVsc2UgaWYgKCFBcnJheS5pc0FycmF5KGRhdGEuZmllbGRzKSkge1xuICAgIGFzc2VydCgnYWRkRGF0YVRvTWFwIEVycm9yOiBleHBlY3QgZGF0YXNldC5kYXRhLmZpZWxkcyB0byBiZSBhbiBhcnJheScpO1xuICAgIHJldHVybiBudWxsO1xuICB9IGVsc2UgaWYgKCFBcnJheS5pc0FycmF5KGRhdGEucm93cykpIHtcbiAgICBhc3NlcnQoJ2FkZERhdGFUb01hcCBFcnJvcjogZXhwZWN0IGRhdGFzZXQuZGF0YS5yb3dzIHRvIGJlIGFuIGFycmF5Jyk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCB7ZmllbGRzLCByb3dzfSA9IGRhdGE7XG5cbiAgLy8gY2hlY2sgaWYgYWxsIGZpZWxkcyBoYXMgbmFtZSwgZm9ybWF0IGFuZCB0eXBlXG4gIGNvbnN0IGFsbFZhbGlkID0gZmllbGRzLmV2ZXJ5KChmLCBpKSA9PiB7XG4gICAgaWYgKCFpc1BsYWluT2JqZWN0KGYpKSB7XG4gICAgICBhc3NlcnQoYGZpZWxkcyBuZWVkcyB0byBiZSBhbiBhcnJheSBvZiBvYmplY3QsIGJ1dCBmaW5kICR7dHlwZW9mIGZ9YCk7XG4gICAgICBmaWVsZHNbaV0gPSB7fTtcbiAgICB9XG5cbiAgICBpZiAoIWYubmFtZSkge1xuICAgICAgYXNzZXJ0KGBmaWVsZC5uYW1lIGlzIHJlcXVpcmVkIGJ1dCBtaXNzaW5nIGluICR7SlNPTi5zdHJpbmdpZnkoZil9YCk7XG4gICAgICAvLyBhc3NpZ24gYSBuYW1lXG4gICAgICBmaWVsZHNbaV0ubmFtZSA9IGBjb2x1bW5fJHtpfWA7XG4gICAgfVxuXG4gICAgaWYgKCFBTExfRklFTERfVFlQRVNbZi50eXBlXSkge1xuICAgICAgYXNzZXJ0KGB1bmtub3duIGZpZWxkIHR5cGUgJHtmLnR5cGV9YCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKCFmaWVsZHMuZXZlcnkoZmllbGQgPT4gZmllbGQuYW5hbHl6ZXJUeXBlKSkge1xuICAgICAgYXNzZXJ0KCdmaWVsZCBtaXNzaW5nIGFuYWx5emVyVHlwZScpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIGNoZWNrIHRpbWUgZm9ybWF0IGlzIGNvcnJlY3QgYmFzZWQgb24gZmlyc3QgMTAgbm90IGVtcHR5IGVsZW1lbnRcbiAgICBpZiAoZi50eXBlID09PSBBTExfRklFTERfVFlQRVMudGltZXN0YW1wKSB7XG4gICAgICBjb25zdCBzYW1wbGUgPSBmaW5kTm9uRW1wdHlSb3dzQXRGaWVsZChyb3dzLCBpLCAxMCkubWFwKHIgPT4gKHt0czogcltpXX0pKTtcbiAgICAgIGNvbnN0IGFuYWx5emVkVHlwZSA9IEFuYWx5emVyLmNvbXB1dGVDb2xNZXRhKHNhbXBsZSlbMF07XG4gICAgICByZXR1cm4gYW5hbHl6ZWRUeXBlLmNhdGVnb3J5ID09PSAnVElNRScgJiYgYW5hbHl6ZWRUeXBlLmZvcm1hdCA9PT0gZi5mb3JtYXQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH0pO1xuXG4gIGlmIChhbGxWYWxpZCkge1xuICAgIHJldHVybiB7cm93cywgZmllbGRzfTtcbiAgfVxuXG4gIC8vIGlmIGFueSBmaWVsZCBoYXMgbWlzc2luZyB0eXBlLCByZWNhbGN1bGF0ZSBpdCBmb3IgZXZlcnlvbmVcbiAgLy8gYmVjYXVzZSB3ZSBzaW1wbHkgbG9zdCBmYWl0aCBpbiBodW1hbml0eVxuICBjb25zdCBzYW1wbGVEYXRhID0gZ2V0U2FtcGxlRm9yVHlwZUFuYWx5emUoe1xuICAgIGZpZWxkczogZmllbGRzLm1hcChmID0+IGYubmFtZSksXG4gICAgYWxsRGF0YTogcm93c1xuICB9KTtcbiAgY29uc3QgZmllbGRPcmRlciA9IGZpZWxkcy5tYXAoZiA9PiBmLm5hbWUpO1xuICBjb25zdCBtZXRhID0gZ2V0RmllbGRzRnJvbURhdGEoc2FtcGxlRGF0YSwgZmllbGRPcmRlcik7XG4gIGNvbnN0IHVwZGF0ZWRGaWVsZHMgPSBmaWVsZHMubWFwKChmLCBpKSA9PiAoe1xuICAgIC4uLmYsXG4gICAgdHlwZTogbWV0YVtpXS50eXBlLFxuICAgIGZvcm1hdDogbWV0YVtpXS5mb3JtYXQsXG4gICAgYW5hbHl6ZXJUeXBlOiBtZXRhW2ldLmFuYWx5emVyVHlwZVxuICB9KSk7XG5cbiAgcmV0dXJuIHtmaWVsZHM6IHVwZGF0ZWRGaWVsZHMsIHJvd3N9O1xufVxuXG5mdW5jdGlvbiBmaW5kTm9uRW1wdHlSb3dzQXRGaWVsZChyb3dzLCBmaWVsZElkeCwgdG90YWwpIHtcbiAgY29uc3Qgc2FtcGxlID0gW107XG4gIGxldCBpID0gMDtcbiAgd2hpbGUgKHNhbXBsZS5sZW5ndGggPCB0b3RhbCAmJiBpIDwgcm93cy5sZW5ndGgpIHtcbiAgICBpZiAobm90TnVsbG9yVW5kZWZpbmVkKHJvd3NbaV1bZmllbGRJZHhdKSkge1xuICAgICAgc2FtcGxlLnB1c2gocm93c1tpXSk7XG4gICAgfVxuICAgIGkrKztcbiAgfVxuICByZXR1cm4gc2FtcGxlO1xufVxuLyoqXG4gKiBQcm9jZXNzIHNhdmVkIGtlcGxlci5nbCBqc29uIHRvIGJlIHBhc3MgdG8gW2BhZGREYXRhVG9NYXBgXSguLi9hY3Rpb25zL2FjdGlvbnMubWQjYWRkZGF0YXRvbWFwKS5cbiAqIFRoZSBqc29uIG9iamVjdCBzaG91bGQgY29udGFpbiBgZGF0YXNldHNgIGFuZCBgY29uZmlnYC5cbiAqIEBwYXJhbSB7T2JqZWN0fSByYXdEYXRhXG4gKiBAcGFyYW0ge0FycmF5fSByYXdEYXRhLmRhdGFzZXRzXG4gKiBAcGFyYW0ge09iamVjdH0gcmF3RGF0YS5jb25maWdcbiAqIEByZXR1cm5zIHtPYmplY3R9IGRhdGFzZXRzIGFuZCBjb25maWcgYHtkYXRhc2V0czoge30sIGNvbmZpZzoge319YFxuICogQHB1YmxpY1xuICogQGV4YW1wbGVcbiAqIGltcG9ydCB7YWRkRGF0YVRvTWFwfSBmcm9tICdrZXBsZXIuZ2wvYWN0aW9ucyc7XG4gKiBpbXBvcnQge3Byb2Nlc3NLZXBsZXJnbEpTT059IGZyb20gJ2tlcGxlci5nbC9wcm9jZXNzb3JzJztcbiAqXG4gKiBkaXNwYXRjaChhZGREYXRhVG9NYXAocHJvY2Vzc0tlcGxlcmdsSlNPTihrZXBsZXJHbEpzb24pKSk7XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzS2VwbGVyZ2xKU09OKHJhd0RhdGEpIHtcbiAgcmV0dXJuIHJhd0RhdGEgPyBLZXBsZXJHbFNjaGVtYS5sb2FkKHJhd0RhdGEuZGF0YXNldHMsIHJhd0RhdGEuY29uZmlnKSA6IG51bGw7XG59XG5cbi8qKlxuICogUGFyc2UgYSBzaW5nbGUgb3IgYW4gYXJyYXkgb2YgZGF0YXNldHMgc2F2ZWQgdXNpbmcga2VwbGVyLmdsIHNjaGVtYVxuICogQHBhcmFtIHtBcnJheSB8IEFycmF5PE9iamVjdD59IHJhd0RhdGFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3NLZXBsZXJnbERhdGFzZXQocmF3RGF0YSkge1xuICBpZiAoIXJhd0RhdGEpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IHJlc3VsdHMgPSBLZXBsZXJHbFNjaGVtYS5wYXJzZVNhdmVkRGF0YSh0b0FycmF5KHJhd0RhdGEpKTtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkocmF3RGF0YSkgPyByZXN1bHRzIDogcmVzdWx0c1swXTtcbn1cblxuZXhwb3J0IGNvbnN0IERBVEFTRVRfSEFORExFUlMgPSB7XG4gIFtEQVRBU0VUX0ZPUk1BVFMucm93XTogcHJvY2Vzc1Jvd09iamVjdCxcbiAgW0RBVEFTRVRfRk9STUFUUy5nZW9qc29uXTogcHJvY2Vzc0dlb2pzb24sXG4gIFtEQVRBU0VUX0ZPUk1BVFMuY3N2XTogcHJvY2Vzc0NzdkRhdGEsXG4gIFtEQVRBU0VUX0ZPUk1BVFMua2VwbGVyZ2xdOiBwcm9jZXNzS2VwbGVyZ2xEYXRhc2V0XG59O1xuXG5leHBvcnQgY29uc3QgUHJvY2Vzc29ycyA9IHtcbiAgcHJvY2Vzc0dlb2pzb24sXG4gIHByb2Nlc3NDc3ZEYXRhLFxuICBwcm9jZXNzUm93T2JqZWN0LFxuICBwcm9jZXNzS2VwbGVyZ2xKU09OLFxuICBwcm9jZXNzS2VwbGVyZ2xEYXRhc2V0LFxuICBhbmFseXplclR5cGVUb0ZpZWxkVHlwZSxcbiAgZ2V0RmllbGRzRnJvbURhdGEsXG4gIHBhcnNlQ3N2Um93c0J5RmllbGRUeXBlLFxuICBmb3JtYXRDc3Zcbn07XG4iXX0=