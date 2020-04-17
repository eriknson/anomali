"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefaultFilter = getDefaultFilter;
exports.shouldApplyFilter = shouldApplyFilter;
exports.validatePolygonFilter = validatePolygonFilter;
exports.validateFilter = validateFilter;
exports.validateFilterWithData = validateFilterWithData;
exports.getFilterProps = getFilterProps;
exports.getFieldDomain = getFieldDomain;
exports.getFilterFunction = getFilterFunction;
exports.updateFilterDataId = updateFilterDataId;
exports.filterDataset = filterDataset;
exports.getFilterRecord = getFilterRecord;
exports.diffFilters = diffFilters;
exports.adjustValueToFilterDomain = adjustValueToFilterDomain;
exports.getNumericFieldDomain = getNumericFieldDomain;
exports.getNumericStepSize = getNumericStepSize;
exports.getTimestampFieldDomain = getTimestampFieldDomain;
exports.histogramConstruct = histogramConstruct;
exports.getHistogram = getHistogram;
exports.formatNumberByStep = formatNumberByStep;
exports.isInRange = isInRange;
exports.isInPolygon = isInPolygon;
exports.getTimeWidgetTitleFormatter = getTimeWidgetTitleFormatter;
exports.getTimeWidgetHintFormatter = getTimeWidgetHintFormatter;
exports.isValidFilterValue = isValidFilterValue;
exports.getFilterPlot = getFilterPlot;
exports.getDefaultFilterPlotType = getDefaultFilterPlotType;
exports.applyFiltersToDatasets = applyFiltersToDatasets;
exports.applyFilterFieldName = applyFilterFieldName;
exports.mergeFilterDomainStep = mergeFilterDomainStep;
exports.generatePolygonFilter = generatePolygonFilter;
exports.filterDatasetCPU = filterDatasetCPU;
exports.getFilterIdInFeature = exports.featureToFilterValue = exports.getPolygonFilterFunctor = exports.LAYER_FILTERS = exports.FILTER_ID_LENGTH = exports.DEFAULT_FILTER_STRUCTURE = exports.FILTER_COMPONENTS = exports.LIMITED_FILTER_EFFECT_PROPS = exports.FILTER_UPDATER_PROPS = exports.PLOT_TYPES = exports.enlargedHistogramBins = exports.histogramBins = exports.TimestampStepMap = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _d3Array = require("d3-array");

var _keymirror = _interopRequireDefault(require("keymirror"));

var _lodash = _interopRequireDefault(require("lodash.get"));

var _booleanWithin = _interopRequireDefault(require("@turf/boolean-within"));

var _helpers = require("@turf/helpers");

var _decimal = require("decimal.js");

var _defaultSettings = require("../constants/default-settings");

var _dataUtils = require("./data-utils");

var ScaleUtils = _interopRequireWildcard(require("./data-scale-utils"));

var _constants = require("../constants");

var _utils = require("./utils");

var _gpuFilterUtils = require("./gpu-filter-utils");

var _FILTER_TYPES$timeRan, _FILTER_TYPES$range, _SupportedPlotType, _FILTER_COMPONENTS;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var TimestampStepMap = [{
  max: 1,
  step: 0.05
}, {
  max: 10,
  step: 0.1
}, {
  max: 100,
  step: 1
}, {
  max: 500,
  step: 5
}, {
  max: 1000,
  step: 10
}, {
  max: 5000,
  step: 50
}, {
  max: Number.POSITIVE_INFINITY,
  step: 1000
}];
exports.TimestampStepMap = TimestampStepMap;
var histogramBins = 30;
exports.histogramBins = histogramBins;
var enlargedHistogramBins = 100;
exports.enlargedHistogramBins = enlargedHistogramBins;
var durationSecond = 1000;
var durationMinute = durationSecond * 60;
var durationHour = durationMinute * 60;
var durationDay = durationHour * 24;
var durationWeek = durationDay * 7;
var durationYear = durationDay * 365;
var PLOT_TYPES = (0, _keymirror["default"])({
  histogram: null,
  lineChart: null
});
exports.PLOT_TYPES = PLOT_TYPES;
var FILTER_UPDATER_PROPS = (0, _keymirror["default"])({
  dataId: null,
  name: null,
  layerId: null
});
exports.FILTER_UPDATER_PROPS = FILTER_UPDATER_PROPS;
var LIMITED_FILTER_EFFECT_PROPS = (0, _keymirror["default"])((0, _defineProperty2["default"])({}, FILTER_UPDATER_PROPS.name, null));
/**
 * Max number of filter value buffers that deck.gl provides
 */

exports.LIMITED_FILTER_EFFECT_PROPS = LIMITED_FILTER_EFFECT_PROPS;
var SupportedPlotType = (_SupportedPlotType = {}, (0, _defineProperty2["default"])(_SupportedPlotType, _defaultSettings.FILTER_TYPES.timeRange, (_FILTER_TYPES$timeRan = {
  "default": 'histogram'
}, (0, _defineProperty2["default"])(_FILTER_TYPES$timeRan, _defaultSettings.ALL_FIELD_TYPES.integer, 'lineChart'), (0, _defineProperty2["default"])(_FILTER_TYPES$timeRan, _defaultSettings.ALL_FIELD_TYPES.real, 'lineChart'), _FILTER_TYPES$timeRan)), (0, _defineProperty2["default"])(_SupportedPlotType, _defaultSettings.FILTER_TYPES.range, (_FILTER_TYPES$range = {
  "default": 'histogram'
}, (0, _defineProperty2["default"])(_FILTER_TYPES$range, _defaultSettings.ALL_FIELD_TYPES.integer, 'lineChart'), (0, _defineProperty2["default"])(_FILTER_TYPES$range, _defaultSettings.ALL_FIELD_TYPES.real, 'lineChart'), _FILTER_TYPES$range)), _SupportedPlotType);
var FILTER_COMPONENTS = (_FILTER_COMPONENTS = {}, (0, _defineProperty2["default"])(_FILTER_COMPONENTS, _defaultSettings.FILTER_TYPES.select, 'SingleSelectFilter'), (0, _defineProperty2["default"])(_FILTER_COMPONENTS, _defaultSettings.FILTER_TYPES.multiSelect, 'MultiSelectFilter'), (0, _defineProperty2["default"])(_FILTER_COMPONENTS, _defaultSettings.FILTER_TYPES.timeRange, 'TimeRangeFilter'), (0, _defineProperty2["default"])(_FILTER_COMPONENTS, _defaultSettings.FILTER_TYPES.range, 'RangeFilter'), (0, _defineProperty2["default"])(_FILTER_COMPONENTS, _defaultSettings.FILTER_TYPES.polygon, 'PolygonFilter'), _FILTER_COMPONENTS);
exports.FILTER_COMPONENTS = FILTER_COMPONENTS;
var DEFAULT_FILTER_STRUCTURE = {
  dataId: [],
  // [string]
  freeze: false,
  id: null,
  // time range filter specific
  fixedDomain: false,
  enlarged: false,
  isAnimating: false,
  speed: 1,
  // field specific
  name: [],
  // string
  type: null,
  fieldIdx: [],
  // [integer]
  domain: null,
  value: null,
  // plot
  plotType: PLOT_TYPES.histogram,
  yAxis: null,
  interval: null,
  // mode
  gpu: false
};
exports.DEFAULT_FILTER_STRUCTURE = DEFAULT_FILTER_STRUCTURE;
var FILTER_ID_LENGTH = 4;
exports.FILTER_ID_LENGTH = FILTER_ID_LENGTH;
var LAYER_FILTERS = [_defaultSettings.FILTER_TYPES.polygon];
/**
 * Generates a filter with a dataset id as dataId
 * @param {[string]} dataId
 * @return {object} filter
 */

exports.LAYER_FILTERS = LAYER_FILTERS;

function getDefaultFilter(dataId) {
  return _objectSpread({}, DEFAULT_FILTER_STRUCTURE, {
    // store it as dataId and it could be one or many
    dataId: (0, _utils.toArray)(dataId),
    id: (0, _utils.generateHashId)(FILTER_ID_LENGTH)
  });
}
/**
 * Check if a filter is valid based on the given dataId
 * @param {object} filter to validate
 * @param {string} dataset id to validate filter against
 * @return {boolean} true if a filter is valid, false otherwise
 */


function shouldApplyFilter(filter, datasetId) {
  var dataIds = (0, _utils.toArray)(filter.dataId);
  return dataIds.includes(datasetId) && filter.value !== null;
}
/**
 * Validates and modifies polygon filter structure
 * @param dataset
 * @param filter
 * @param layers
 * @return {object}
 */


function validatePolygonFilter(dataset, filter, layers) {
  var failed = {
    dataset: dataset,
    filter: null
  };
  var value = filter.value,
      layerId = filter.layerId,
      type = filter.type,
      dataId = filter.dataId;

  if (!layerId || !isValidFilterValue(type, value)) {
    return failed;
  }

  var isValidDataset = dataId.includes(dataset.id);

  if (!isValidDataset) {
    return failed;
  }

  var layer = layers.find(function (l) {
    return layerId.includes(l.id);
  });

  if (!layer) {
    return failed;
  }

  return {
    filter: _objectSpread({}, filter, {
      freeze: true,
      fieldIdx: []
    }),
    dataset: dataset
  };
}
/**
 * Custom filter validators
 * @type {Function}
 */


var filterValidators = (0, _defineProperty2["default"])({}, _defaultSettings.FILTER_TYPES.polygon, validatePolygonFilter);
/**
 * Default validate filter function
 * @param dataset
 * @param filter
 * @return {*}
 */

function validateFilter(dataset, filter) {
  // match filter.dataId
  var failed = {
    dataset: dataset,
    filter: null
  };
  var filterDataId = (0, _utils.toArray)(filter.dataId);
  var filterDatasetIndex = filterDataId.indexOf(dataset.id);

  if (filterDatasetIndex < 0) {
    // the current filter is not mapped against the current dataset
    return failed;
  }

  var initializeFilter = _objectSpread({}, getDefaultFilter(filter.dataId), {}, filter, {
    dataId: filterDataId,
    name: (0, _utils.toArray)(filter.name)
  });

  var fieldName = initializeFilter.name[filterDatasetIndex];

  var _applyFilterFieldName = applyFilterFieldName(initializeFilter, dataset, fieldName, filterDatasetIndex, {
    mergeDomain: true
  }),
      updatedFilter = _applyFilterFieldName.filter,
      updatedDataset = _applyFilterFieldName.dataset;

  if (!updatedFilter) {
    return failed;
  }

  updatedFilter.value = adjustValueToFilterDomain(filter.value, updatedFilter);

  if (updatedFilter.value === null) {
    // cannot adjust saved value to filter
    return failed;
  }

  return {
    filter: validateFilterYAxis(updatedFilter, updatedDataset),
    dataset: updatedDataset
  };
}
/**
 * Validate saved filter config with new data,
 * calculate domain and fieldIdx based new fields and data
 *
 * @param {Object} dataset
 * @param {Object} filter - filter to be validate
 * @return {Object | null} - validated filter
 */


function validateFilterWithData(dataset, filter, layers) {
  return filterValidators.hasOwnProperty(filter.type) ? filterValidators[filter.type](dataset, filter, layers) : validateFilter(dataset, filter);
}
/**
 * Validate YAxis
 * @param filter
 * @param dataset
 * @return {*}
 */


function validateFilterYAxis(filter, dataset) {
  // TODO: validate yAxis against other datasets
  var fields = dataset.fields,
      allData = dataset.allData;
  var _filter = filter,
      yAxis = _filter.yAxis; // TODO: validate yAxis against other datasets

  if (yAxis) {
    var matchedAxis = fields.find(function (_ref) {
      var name = _ref.name,
          type = _ref.type;
      return name === yAxis.name && type === yAxis.type;
    });
    filter = matchedAxis ? _objectSpread({}, filter, {
      yAxis: matchedAxis
    }, getFilterPlot(_objectSpread({}, filter, {
      yAxis: matchedAxis
    }), allData)) : filter;
  }

  return filter;
}
/**
 * Get default filter prop based on field type
 *
 * @param {Array<Array>} allData
 * @param {Object} field
 * @returns {Object} default filter
 */


function getFilterProps(allData, field) {
  var filterProps = _objectSpread({}, getFieldDomain(allData, field), {
    fieldType: field.type
  });

  switch (field.type) {
    case _defaultSettings.ALL_FIELD_TYPES.real:
    case _defaultSettings.ALL_FIELD_TYPES.integer:
      return _objectSpread({}, filterProps, {
        value: filterProps.domain,
        type: _defaultSettings.FILTER_TYPES.range,
        typeOptions: [_defaultSettings.FILTER_TYPES.range],
        gpu: true
      });

    case _defaultSettings.ALL_FIELD_TYPES["boolean"]:
      return _objectSpread({}, filterProps, {
        type: _defaultSettings.FILTER_TYPES.select,
        value: true,
        gpu: false
      });

    case _defaultSettings.ALL_FIELD_TYPES.string:
    case _defaultSettings.ALL_FIELD_TYPES.date:
      return _objectSpread({}, filterProps, {
        type: _defaultSettings.FILTER_TYPES.multiSelect,
        value: [],
        gpu: false
      });

    case _defaultSettings.ALL_FIELD_TYPES.timestamp:
      return _objectSpread({}, filterProps, {
        type: _defaultSettings.FILTER_TYPES.timeRange,
        enlarged: true,
        fixedDomain: true,
        value: filterProps.domain,
        gpu: true
      });

    default:
      return {};
  }
}
/**
 * Calculate field domain based on field type and data
 *
 * @param {Array<Array>} allData
 * @param {Object} field
 * @returns {Object} with domain as key
 */


function getFieldDomain(allData, field) {
  var fieldIdx = field.tableFieldIndex - 1;
  var isTime = field.type === _defaultSettings.ALL_FIELD_TYPES.timestamp;

  var valueAccessor = _dataUtils.maybeToDate.bind(null, isTime, fieldIdx, field.format);

  var domain;

  switch (field.type) {
    case _defaultSettings.ALL_FIELD_TYPES.real:
    case _defaultSettings.ALL_FIELD_TYPES.integer:
      // calculate domain and step
      return getNumericFieldDomain(allData, valueAccessor);

    case _defaultSettings.ALL_FIELD_TYPES["boolean"]:
      return {
        domain: [true, false]
      };

    case _defaultSettings.ALL_FIELD_TYPES.string:
    case _defaultSettings.ALL_FIELD_TYPES.date:
      domain = ScaleUtils.getOrdinalDomain(allData, valueAccessor);
      return {
        domain: domain
      };

    case _defaultSettings.ALL_FIELD_TYPES.timestamp:
      return getTimestampFieldDomain(allData, valueAccessor);

    default:
      return {
        domain: ScaleUtils.getOrdinalDomain(allData, valueAccessor)
      };
  }
}

var getPolygonFilterFunctor = function getPolygonFilterFunctor(layer, filter) {
  var getPosition = layer.getPositionAccessor();

  switch (layer.type) {
    case _constants.LAYER_TYPES.point:
    case _constants.LAYER_TYPES.icon:
      return function (data) {
        var pos = getPosition({
          data: data
        });
        return pos.every(Number.isFinite) && isInPolygon(pos, filter.value);
      };

    case _constants.LAYER_TYPES.arc:
    case _constants.LAYER_TYPES.line:
      return function (data) {
        var pos = getPosition({
          data: data
        });
        return pos.every(Number.isFinite) && [[pos[0], pos[1]], [pos[3], pos[4]]].every(function (point) {
          return isInPolygon(point, filter.value);
        });
      };

    default:
      return function () {
        return true;
      };
  }
};
/**
 * @param field dataset Field
 * @param dataId Dataset id
 * @param filter Filter object
 * @param layers list of layers to filter upon
 * @return {*}
 */


exports.getPolygonFilterFunctor = getPolygonFilterFunctor;

function getFilterFunction(field, dataId, filter, layers) {
  // field could be null
  var valueAccessor = function valueAccessor(data) {
    return field ? data[field.tableFieldIndex - 1] : null;
  };

  switch (filter.type) {
    case _defaultSettings.FILTER_TYPES.range:
      return function (data) {
        return isInRange(valueAccessor(data), filter.value);
      };

    case _defaultSettings.FILTER_TYPES.multiSelect:
      return function (data) {
        return filter.value.includes(valueAccessor(data));
      };

    case _defaultSettings.FILTER_TYPES.select:
      return function (data) {
        return valueAccessor(data) === filter.value;
      };

    case _defaultSettings.FILTER_TYPES.timeRange:
      var mappedValue = (0, _lodash["default"])(field, ['filterProps', 'mappedValue']);
      var accessor = Array.isArray(mappedValue) ? function (data, index) {
        return mappedValue[index];
      } : function (data) {
        return (0, _dataUtils.timeToUnixMilli)(valueAccessor(data), field.format);
      };
      return function (data, index) {
        return isInRange(accessor(data, index), filter.value);
      };

    case _defaultSettings.FILTER_TYPES.polygon:
      if (!layers || !layers.length) {
        return function () {
          return true;
        };
      }

      var layerFilterFunctions = filter.layerId.map(function (id) {
        return layers.find(function (l) {
          return l.id === id;
        });
      }).filter(function (l) {
        return l && l.config.dataId === dataId;
      }).map(function (layer) {
        return getPolygonFilterFunctor(layer, filter);
      });
      return function (data) {
        return layerFilterFunctions.every(function (filterFunc) {
          return filterFunc(data);
        });
      };

    default:
      return function () {
        return true;
      };
  }
}

function updateFilterDataId(dataId) {
  return getDefaultFilter(dataId);
}
/**
 * Filter data based on an array of filters
 *
 * @param {Object} dataset
 * @param {Array<Object>} filters
 * @param {Object} opt
 * @param {Object} opt.cpuOnly only allow cpu filtering
 * @param {Object} opt.ignoreDomain ignore filter for domain calculation
 * @returns {Object} dataset
 * @returns {Array<Number>} dataset.filteredIndex
 * @returns {Array<Number>} dataset.filteredIndexForDomain
 */


function filterDataset(dataset, filters, layers) {
  var opt = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var allData = dataset.allData,
      dataId = dataset.id,
      oldFilterRecord = dataset.filterRecord,
      fields = dataset.fields; // if there is no filters

  var filterRecord = getFilterRecord(dataId, filters, opt);
  var newDataset = (0, _utils.set)(['filterRecord'], filterRecord, dataset);

  if (!filters.length) {
    return _objectSpread({}, newDataset, {
      gpuFilter: (0, _gpuFilterUtils.getGpuFilterProps)(filters, dataId, fields),
      filteredIndex: dataset.allIndexes,
      filteredIndexForDomain: dataset.allIndexes
    });
  }

  var changedFilters = diffFilters(filterRecord, oldFilterRecord); // generate 2 sets of filter result
  // filteredIndex used to calculate layer data
  // filteredIndexForDomain used to calculate layer Domain

  var shouldCalDomain = Boolean(changedFilters.dynamicDomain);
  var shouldCalIndex = Boolean(changedFilters.cpu);
  var filterResult = {};

  if (shouldCalDomain || shouldCalIndex) {
    var dynamicDomainFilters = shouldCalDomain ? filterRecord.dynamicDomain : null;
    var cpuFilters = shouldCalIndex ? filterRecord.cpu : null;
    var filterFuncs = filters.reduce(function (acc, filter) {
      var fieldIndex = (0, _gpuFilterUtils.getDatasetFieldIndexForFilter)(dataset.id, filter);
      var field = fieldIndex !== -1 ? fields[fieldIndex] : null;
      return _objectSpread({}, acc, (0, _defineProperty2["default"])({}, filter.id, getFilterFunction(field, dataset.id, filter, layers)));
    }, {});
    filterResult = filterDataByFilterTypes({
      dynamicDomainFilters: dynamicDomainFilters,
      cpuFilters: cpuFilters,
      filterFuncs: filterFuncs
    }, allData);
  }

  return _objectSpread({}, newDataset, {}, filterResult, {
    gpuFilter: (0, _gpuFilterUtils.getGpuFilterProps)(filters, dataId, fields)
  });
}
/**
 *
 * @param {Object} filters
 * @param {Array|null} filters.dynamicDomainFilters
 * @param {Array|null} filters.cpuFilters
 * @param {Object} filters.filterFuncs
 * @returns {{filteredIndex: Array, filteredIndexForDomain: Array}} filteredIndex and filteredIndexForDomain
 */


function filterDataByFilterTypes(_ref2, allData) {
  var dynamicDomainFilters = _ref2.dynamicDomainFilters,
      cpuFilters = _ref2.cpuFilters,
      filterFuncs = _ref2.filterFuncs;

  var result = _objectSpread({}, dynamicDomainFilters ? {
    filteredIndexForDomain: []
  } : {}, {}, cpuFilters ? {
    filteredIndex: []
  } : {});

  var _loop = function _loop(i) {
    var d = allData[i];
    var matchForDomain = dynamicDomainFilters && dynamicDomainFilters.every(function (filter) {
      return filterFuncs[filter.id](d, i);
    });

    if (matchForDomain) {
      result.filteredIndexForDomain.push(i);
    }

    var matchForRender = cpuFilters && cpuFilters.every(function (filter) {
      return filterFuncs[filter.id](d, i);
    });

    if (matchForRender) {
      result.filteredIndex.push(i);
    }
  };

  for (var i = 0; i < allData.length; i++) {
    _loop(i);
  }

  return result;
}
/**
 * Get a record of filters based on domain type and gpu / cpu
 * @param {string} dataId
 * @param {Array<Object>} filters
 * @param {Object} opt.cpuOnly only allow cpu filtering
 * @param {Object} opt.ignoreDomain ignore filter for domain calculation
 * @returns {{dynamicDomain: Array, fixedDomain: Array, cpu: Array, gpu: Array}} filterRecord
 */


function getFilterRecord(dataId, filters) {
  var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var filterRecord = {
    dynamicDomain: [],
    fixedDomain: [],
    cpu: [],
    gpu: []
  };
  filters.forEach(function (f) {
    if (isValidFilterValue(f.type, f.value) && (0, _utils.toArray)(f.dataId).includes(dataId)) {
      (f.fixedDomain || opt.ignoreDomain ? filterRecord.fixedDomain : filterRecord.dynamicDomain).push(f);
      (f.gpu && !opt.cpuOnly ? filterRecord.gpu : filterRecord.cpu).push(f);
    }
  });
  return filterRecord;
}
/**
 * Compare filter records to get what has changed
 * @param {Object} filterRecord
 * @param {Object} oldFilterRecord
 * @returns {{dynamicDomain: Object, fixedDomain: Object, cpu: Object, gpu: Object}} changed filters based on type
 */


function diffFilters(filterRecord) {
  var oldFilterRecord = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var filterChanged = {};
  Object.entries(filterRecord).forEach(function (_ref3) {
    var _ref4 = (0, _slicedToArray2["default"])(_ref3, 2),
        record = _ref4[0],
        items = _ref4[1];

    items.forEach(function (filter) {
      var oldFilter = (oldFilterRecord[record] || []).find(function (f) {
        return f.id === filter.id;
      });

      if (!oldFilter) {
        // added
        filterChanged = (0, _utils.set)([record, filter.id], 'added', filterChanged);
      } else {
        // check  what has changed
        ['name', 'value', 'dataId'].forEach(function (prop) {
          if (filter[prop] !== oldFilter[prop]) {
            filterChanged = (0, _utils.set)([record, filter.id], "".concat(prop, "_changed"), filterChanged);
          }
        });
      }
    });
    (oldFilterRecord[record] || []).forEach(function (oldFilter) {
      // deleted
      if (!items.find(function (f) {
        return f.id === oldFilter.id;
      })) {
        filterChanged = (0, _utils.set)([record, oldFilter.id], 'deleted', filterChanged);
      }
    });

    if (!filterChanged[record]) {
      filterChanged[record] = null;
    }
  });
  return filterChanged;
}
/**
 * Call by parsing filters from URL
 * Check if value of filter within filter domain, if not adjust it to match
 * filter domain
 *
 * @param {Array<string> | string | Number | Array<Number>} value
 * @param {Array} filter.domain
 * @param {String} filter.type
 * @returns {*} - adjusted value to match filter or null to remove filter
 */

/* eslint-disable complexity */


function adjustValueToFilterDomain(value, _ref5) {
  var domain = _ref5.domain,
      type = _ref5.type;

  if (!domain || !type) {
    return false;
  }

  switch (type) {
    case _defaultSettings.FILTER_TYPES.range:
    case _defaultSettings.FILTER_TYPES.timeRange:
      if (!Array.isArray(value) || value.length !== 2) {
        return domain.map(function (d) {
          return d;
        });
      }

      return value.map(function (d, i) {
        return (0, _dataUtils.notNullorUndefined)(d) && isInRange(d, domain) ? d : domain[i];
      });

    case _defaultSettings.FILTER_TYPES.multiSelect:
      if (!Array.isArray(value)) {
        return [];
      }

      var filteredValue = value.filter(function (d) {
        return domain.includes(d);
      });
      return filteredValue.length ? filteredValue : [];

    case _defaultSettings.FILTER_TYPES.select:
      return domain.includes(value) ? value : true;

    default:
      return null;
  }
}
/* eslint-enable complexity */

/**
 * Calculate numeric domain and suitable step
 *
 * @param {Object[]} data
 * @param {function} valueAccessor
 * @returns {object} domain and step
 */


function getNumericFieldDomain(data, valueAccessor) {
  var domain = [0, 1];
  var step = 0.1;
  var mappedValue = Array.isArray(data) ? data.map(valueAccessor) : [];

  if (Array.isArray(data) && data.length > 1) {
    domain = ScaleUtils.getLinearDomain(mappedValue);
    var diff = domain[1] - domain[0]; // in case equal domain, [96, 96], which will break quantize scale

    if (!diff) {
      domain[1] = domain[0] + 1;
    }

    step = getNumericStepSize(diff) || step;
    domain[0] = formatNumberByStep(domain[0], step, 'floor');
    domain[1] = formatNumberByStep(domain[1], step, 'ceil');
  }

  var _getHistogram = getHistogram(domain, mappedValue),
      histogram = _getHistogram.histogram,
      enlargedHistogram = _getHistogram.enlargedHistogram;

  return {
    domain: domain,
    step: step,
    histogram: histogram,
    enlargedHistogram: enlargedHistogram
  };
}

function getNumericStepSize(diff) {
  diff = Math.abs(diff);

  if (diff > 100) {
    return 1;
  } else if (diff > 3) {
    return 0.01;
  } else if (diff > 1) {
    return 0.001;
  } else if (diff <= 1) {
    // Try to get at least 1000 steps - and keep the step size below that of
    // the (diff > 1) case.
    var x = diff / 1000; // Find the exponent and truncate to 10 to the power of that exponent

    var exponentialForm = x.toExponential();
    var exponent = parseFloat(exponentialForm.split('e')[1]); // Getting ready for node 12
    // this is why we need decimal.js
    // Math.pow(10, -5) = 0.000009999999999999999
    //  the above result shows in browser and node 10
    //  node 12 behaves correctly

    return new _decimal.Decimal(10).pow(exponent).toNumber();
  }
}
/**
 * Calculate timestamp domain and suitable step
 *
 * @param {Array<Array>} data
 * @param {Function} valueAccessor
 * @returns {{
 *  domain: Array<Number>,
 *  step: Number,
 *  mappedValue: Array<Number>,
 *  histogram: Array<Object>,
 *  enlargedHistogram: Array<Object>
 * }} timestamp field domain
 */


function getTimestampFieldDomain(data, valueAccessor) {
  // to avoid converting string format time to epoch
  // every time we compare we store a value mapped to int in filter domain
  var mappedValue = Array.isArray(data) ? data.map(valueAccessor) : [];
  var domain = ScaleUtils.getLinearDomain(mappedValue);
  var step = 0.01;
  var diff = domain[1] - domain[0];
  var entry = TimestampStepMap.find(function (f) {
    return f.max >= diff;
  });

  if (entry) {
    step = entry.step;
  }

  var _getHistogram2 = getHistogram(domain, mappedValue),
      histogram = _getHistogram2.histogram,
      enlargedHistogram = _getHistogram2.enlargedHistogram;

  return {
    domain: domain,
    step: step,
    mappedValue: mappedValue,
    histogram: histogram,
    enlargedHistogram: enlargedHistogram
  };
}
/**
 *
 * @param {Array<Number>} domain
 * @param {Array<Number>} mappedValue
 * @param {Number} bins
 * @returns {Array<{count: Number, x0: Number, x1: number}>} histogram
 */


function histogramConstruct(domain, mappedValue, bins) {
  return (0, _d3Array.histogram)().thresholds((0, _d3Array.ticks)(domain[0], domain[1], bins)).domain(domain)(mappedValue).map(function (bin) {
    return {
      count: bin.length,
      x0: bin.x0,
      x1: bin.x1
    };
  });
}
/**
 * Calculate histogram from domain and array of values
 *
 * @param {Array<Number>} domain
 * @param {Array<Object>} mappedValue
 * @returns {{histogram: Array<Object>, enlargedHistogram: Array<Object>}} 2 sets of histogram
 */


function getHistogram(domain, mappedValue) {
  var histogram = histogramConstruct(domain, mappedValue, histogramBins);
  var enlargedHistogram = histogramConstruct(domain, mappedValue, enlargedHistogramBins);
  return {
    histogram: histogram,
    enlargedHistogram: enlargedHistogram
  };
}
/**
 * round number based on step
 *
 * @param {Number} val
 * @param {Number} step
 * @param {string} bound
 * @returns {Number} rounded number
 */


function formatNumberByStep(val, step, bound) {
  if (bound === 'floor') {
    return Math.floor(val * (1 / step)) / (1 / step);
  }

  return Math.ceil(val * (1 / step)) / (1 / step);
}

function isInRange(val, domain) {
  if (!Array.isArray(domain)) {
    return false;
  }

  return val >= domain[0] && val <= domain[1];
}
/**
 * Determines whether a point is within the provided polygon
 *
 * @param point as input search [lat, lng]
 * @param polygon Points must be within these (Multi)Polygon(s)
 * @return {boolean}
 */


function isInPolygon(point, polygon) {
  return (0, _booleanWithin["default"])((0, _helpers.point)(point), polygon);
}

function getTimeWidgetTitleFormatter(domain) {
  if (!Array.isArray(domain)) {
    return null;
  }

  var diff = domain[1] - domain[0];
  return diff > durationYear ? 'MM/DD/YY' : diff > durationDay ? 'MM/DD/YY hh:mma' : 'MM/DD/YY hh:mm:ssa';
}

function getTimeWidgetHintFormatter(domain) {
  if (!Array.isArray(domain)) {
    return null;
  }

  var diff = domain[1] - domain[0];
  return diff > durationYear ? 'MM/DD/YY' : diff > durationWeek ? 'MM/DD' : diff > durationDay ? 'MM/DD hha' : diff > durationHour ? 'hh:mma' : 'hh:mm:ssa';
}
/**
 * Sanity check on filters to prepare for save
 * @param {String} type - filter type
 * @param {*} value - filter value
 * @returns {boolean} whether filter is value
 */

/* eslint-disable complexity */


function isValidFilterValue(type, value) {
  if (!type) {
    return false;
  }

  switch (type) {
    case _defaultSettings.FILTER_TYPES.select:
      return value === true || value === false;

    case _defaultSettings.FILTER_TYPES.range:
    case _defaultSettings.FILTER_TYPES.timeRange:
      return Array.isArray(value) && value.every(function (v) {
        return v !== null && !isNaN(v);
      });

    case _defaultSettings.FILTER_TYPES.multiSelect:
      return Array.isArray(value) && Boolean(value.length);

    case _defaultSettings.FILTER_TYPES.input:
      return Boolean(value.length);

    case _defaultSettings.FILTER_TYPES.polygon:
      var coordinates = (0, _lodash["default"])(value, ['geometry', 'coordinates']);
      return Boolean(value && value.id && coordinates);

    default:
      return true;
  }
}

function getFilterPlot(filter, allData) {
  if (filter.plotType === PLOT_TYPES.histogram || !filter.yAxis) {
    // histogram should be calculated when create filter
    return {};
  }

  var mappedValue = filter.mappedValue;
  var yAxis = filter.yAxis; // return lineChart

  var series = allData.map(function (d, i) {
    return {
      x: mappedValue[i],
      y: d[yAxis.tableFieldIndex - 1]
    };
  }).filter(function (_ref6) {
    var x = _ref6.x,
        y = _ref6.y;
    return Number.isFinite(x) && Number.isFinite(y);
  }).sort(function (a, b) {
    return (0, _d3Array.ascending)(a.x, b.x);
  });
  var yDomain = (0, _d3Array.extent)(series, function (d) {
    return d.y;
  });
  var xDomain = [series[0].x, series[series.length - 1].x];
  return {
    lineChart: {
      series: series,
      yDomain: yDomain,
      xDomain: xDomain
    },
    yAxis: yAxis
  };
}

function getDefaultFilterPlotType(filter) {
  var filterPlotTypes = SupportedPlotType[filter.type];

  if (!filterPlotTypes) {
    return null;
  }

  if (!filter.yAxis) {
    return filterPlotTypes["default"];
  }

  return filterPlotTypes[filter.yAxis.type] || null;
}
/**
 *
 * @param datasetIds list of dataset ids to be filtered
 * @param datasets all datasets
 * @param filters all filters to be applied to datasets
 * @return {{[datasetId: string]: Object}} datasets - new updated datasets
 */


function applyFiltersToDatasets(datasetIds, datasets, filters, layers) {
  var dataIds = (0, _utils.toArray)(datasetIds);
  return dataIds.reduce(function (acc, dataId) {
    var layersToFilter = (layers || []).filter(function (l) {
      return l.config.dataId === dataId;
    });
    var appliedFilters = filters.filter(function (d) {
      return shouldApplyFilter(d, dataId);
    });
    return _objectSpread({}, acc, (0, _defineProperty2["default"])({}, dataId, filterDataset(datasets[dataId], appliedFilters, layersToFilter)));
  }, datasets);
}
/**
 * Applies a new field name value to fielter and update both filter and dataset
 * @param {Object} filter - to be applied the new field name on
 * @param {Object} dataset - dataset the field belongs to
 * @param {string} fieldName - field.name
 * @param {Number} filterDatasetIndex - field.name
 * @param {Number} filters - current
 * @param {Object} option
 * @return {Object} {filter, datasets}
 */


function applyFilterFieldName(filter, dataset, fieldName) {
  var filterDatasetIndex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  var _ref7 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {},
      _ref7$mergeDomain = _ref7.mergeDomain,
      mergeDomain = _ref7$mergeDomain === void 0 ? false : _ref7$mergeDomain;

  // using filterDatasetIndex we can filter only the specified dataset
  var fields = dataset.fields,
      allData = dataset.allData;
  var fieldIndex = fields.findIndex(function (f) {
    return f.name === fieldName;
  }); // if no field with same name is found, move to the next datasets

  if (fieldIndex === -1) {
    // throw new Error(`fieldIndex not found. Dataset must contain a property with name: ${fieldName}`);
    return {
      filter: null,
      dataset: dataset
    };
  } // TODO: validate field type


  var field = fields[fieldIndex];
  var filterProps = field.hasOwnProperty('filterProps') ? field.filterProps : getFilterProps(allData, field);

  var newFilter = _objectSpread({}, mergeDomain ? mergeFilterDomainStep(filter, filterProps) : _objectSpread({}, filter, {}, filterProps), {
    name: Object.assign([].concat(filter.name), (0, _defineProperty2["default"])({}, filterDatasetIndex, field.name)),
    fieldIdx: Object.assign([].concat(filter.fieldIdx), (0, _defineProperty2["default"])({}, filterDatasetIndex, field.tableFieldIndex - 1)),
    // TODO, since we allow to add multiple fields to a filter we can no longer freeze the filter
    freeze: true
  });

  var fieldWithFilterProps = _objectSpread({}, field, {
    filterProps: filterProps
  });

  var newFields = Object.assign([].concat(fields), (0, _defineProperty2["default"])({}, fieldIndex, fieldWithFilterProps));
  return {
    filter: newFilter,
    dataset: _objectSpread({}, dataset, {
      fields: newFields
    })
  };
}
/**
 * Merge one filter with other filter prop domain
 * @param filter
 * @param filterProps
 * @param fieldIndex
 * @param datasetIndex
 * @return {*}
 */

/* eslint-disable complexity */


function mergeFilterDomainStep(filter, filterProps) {
  if (!filter) {
    return null;
  }

  if (!filterProps) {
    return filter;
  }

  if (filter.fieldType && filter.fieldType !== filterProps.fieldType || !filterProps.domain) {
    return filter;
  }

  var combinedDomain = !filter.domain ? filterProps.domain : [].concat((0, _toConsumableArray2["default"])(filter.domain || []), (0, _toConsumableArray2["default"])(filterProps.domain || [])).sort(function (a, b) {
    return a - b;
  });

  var newFilter = _objectSpread({}, filter, {}, filterProps, {
    domain: [combinedDomain[0], combinedDomain[combinedDomain.length - 1]]
  });

  switch (filterProps.fieldType) {
    case _defaultSettings.ALL_FIELD_TYPES.string:
    case _defaultSettings.ALL_FIELD_TYPES.date:
      return _objectSpread({}, newFilter, {
        domain: (0, _dataUtils.unique)(combinedDomain).sort()
      });

    case _defaultSettings.ALL_FIELD_TYPES.timestamp:
      var step = filter.step < filterProps.step ? filter.step : filterProps.step;
      return _objectSpread({}, newFilter, {
        step: step
      });

    case _defaultSettings.ALL_FIELD_TYPES.real:
    case _defaultSettings.ALL_FIELD_TYPES.integer:
    default:
      return newFilter;
  }
}
/* eslint-enable complexity */


var featureToFilterValue = function featureToFilterValue(feature, filterId) {
  var properties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _objectSpread({}, feature, {
    id: feature.id,
    properties: _objectSpread({}, feature.properties, {}, properties, {
      filterId: filterId
    })
  });
};

exports.featureToFilterValue = featureToFilterValue;

var getFilterIdInFeature = function getFilterIdInFeature(f) {
  return (0, _lodash["default"])(f, ['properties', 'filterId']);
};
/**
 * Generates polygon filter
 * @param layers array of layers
 * @param feature polygon to use
 * @return {object} filter
 */


exports.getFilterIdInFeature = getFilterIdInFeature;

function generatePolygonFilter(layers, feature) {
  var _layers$reduce = layers.reduce(function (acc, layer) {
    return _objectSpread({}, acc, {
      dataId: [].concat((0, _toConsumableArray2["default"])(acc.dataId), [layer.config.dataId]),
      layerId: [].concat((0, _toConsumableArray2["default"])(acc.layerId), [layer.id]),
      name: [].concat((0, _toConsumableArray2["default"])(acc.name), [layer.config.label])
    });
  }, {
    dataId: [],
    layerId: [],
    name: []
  }),
      dataId = _layers$reduce.dataId,
      layerId = _layers$reduce.layerId,
      name = _layers$reduce.name;

  var filter = getDefaultFilter(dataId);
  return _objectSpread({}, filter, {
    fixedDomain: true,
    type: _defaultSettings.FILTER_TYPES.polygon,
    name: name,
    layerId: layerId,
    value: featureToFilterValue(feature, filter.id, {
      isVisible: true
    })
  });
}
/**
 * Run filter entirely on CPU
 * @param {Object} state - visState
 * @param {string} dataId
 * @return {Object} state state with updated datasets
 */


function filterDatasetCPU(state, dataId) {
  var datasetFilters = state.filters.filter(function (f) {
    return f.dataId.includes(dataId);
  });
  var selectedDataset = state.datasets[dataId];

  if (!selectedDataset) {
    return state;
  }

  var opt = {
    cpuOnly: true,
    ignoreDomain: true
  };

  if (!datasetFilters.length) {
    // no filter
    var _filtered = _objectSpread({}, selectedDataset, {
      filteredIdxCPU: selectedDataset.allIndexes,
      filterRecordCPU: getFilterRecord(dataId, state.filters, opt)
    });

    return (0, _utils.set)(['datasets', dataId], _filtered, state);
  } // no gpu filter


  if (!datasetFilters.find(function (f) {
    return f.gpu;
  })) {
    var _filtered2 = _objectSpread({}, selectedDataset, {
      filteredIdxCPU: selectedDataset.filteredIndex,
      filterRecordCPU: getFilterRecord(dataId, state.filters, opt)
    });

    return (0, _utils.set)(['datasets', dataId], _filtered2, state);
  } // make a copy for cpu filtering


  var copied = _objectSpread({}, selectedDataset, {
    filterRecord: selectedDataset.filterRecordCPU,
    filteredIndex: selectedDataset.filteredIdxCPU
  });

  var filtered = filterDataset(copied, state.filters, state.layers, opt);

  var cpuFilteredDataset = _objectSpread({}, selectedDataset, {
    filteredIdxCPU: filtered.filteredIndex,
    filterRecordCPU: filtered.filterRecord
  });

  return (0, _utils.set)(['datasets', dataId], cpuFilteredDataset, state);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9maWx0ZXItdXRpbHMuanMiXSwibmFtZXMiOlsiVGltZXN0YW1wU3RlcE1hcCIsIm1heCIsInN0ZXAiLCJOdW1iZXIiLCJQT1NJVElWRV9JTkZJTklUWSIsImhpc3RvZ3JhbUJpbnMiLCJlbmxhcmdlZEhpc3RvZ3JhbUJpbnMiLCJkdXJhdGlvblNlY29uZCIsImR1cmF0aW9uTWludXRlIiwiZHVyYXRpb25Ib3VyIiwiZHVyYXRpb25EYXkiLCJkdXJhdGlvbldlZWsiLCJkdXJhdGlvblllYXIiLCJQTE9UX1RZUEVTIiwiaGlzdG9ncmFtIiwibGluZUNoYXJ0IiwiRklMVEVSX1VQREFURVJfUFJPUFMiLCJkYXRhSWQiLCJuYW1lIiwibGF5ZXJJZCIsIkxJTUlURURfRklMVEVSX0VGRkVDVF9QUk9QUyIsIlN1cHBvcnRlZFBsb3RUeXBlIiwiRklMVEVSX1RZUEVTIiwidGltZVJhbmdlIiwiQUxMX0ZJRUxEX1RZUEVTIiwiaW50ZWdlciIsInJlYWwiLCJyYW5nZSIsIkZJTFRFUl9DT01QT05FTlRTIiwic2VsZWN0IiwibXVsdGlTZWxlY3QiLCJwb2x5Z29uIiwiREVGQVVMVF9GSUxURVJfU1RSVUNUVVJFIiwiZnJlZXplIiwiaWQiLCJmaXhlZERvbWFpbiIsImVubGFyZ2VkIiwiaXNBbmltYXRpbmciLCJzcGVlZCIsInR5cGUiLCJmaWVsZElkeCIsImRvbWFpbiIsInZhbHVlIiwicGxvdFR5cGUiLCJ5QXhpcyIsImludGVydmFsIiwiZ3B1IiwiRklMVEVSX0lEX0xFTkdUSCIsIkxBWUVSX0ZJTFRFUlMiLCJnZXREZWZhdWx0RmlsdGVyIiwic2hvdWxkQXBwbHlGaWx0ZXIiLCJmaWx0ZXIiLCJkYXRhc2V0SWQiLCJkYXRhSWRzIiwiaW5jbHVkZXMiLCJ2YWxpZGF0ZVBvbHlnb25GaWx0ZXIiLCJkYXRhc2V0IiwibGF5ZXJzIiwiZmFpbGVkIiwiaXNWYWxpZEZpbHRlclZhbHVlIiwiaXNWYWxpZERhdGFzZXQiLCJsYXllciIsImZpbmQiLCJsIiwiZmlsdGVyVmFsaWRhdG9ycyIsInZhbGlkYXRlRmlsdGVyIiwiZmlsdGVyRGF0YUlkIiwiZmlsdGVyRGF0YXNldEluZGV4IiwiaW5kZXhPZiIsImluaXRpYWxpemVGaWx0ZXIiLCJmaWVsZE5hbWUiLCJhcHBseUZpbHRlckZpZWxkTmFtZSIsIm1lcmdlRG9tYWluIiwidXBkYXRlZEZpbHRlciIsInVwZGF0ZWREYXRhc2V0IiwiYWRqdXN0VmFsdWVUb0ZpbHRlckRvbWFpbiIsInZhbGlkYXRlRmlsdGVyWUF4aXMiLCJ2YWxpZGF0ZUZpbHRlcldpdGhEYXRhIiwiaGFzT3duUHJvcGVydHkiLCJmaWVsZHMiLCJhbGxEYXRhIiwibWF0Y2hlZEF4aXMiLCJnZXRGaWx0ZXJQbG90IiwiZ2V0RmlsdGVyUHJvcHMiLCJmaWVsZCIsImZpbHRlclByb3BzIiwiZ2V0RmllbGREb21haW4iLCJmaWVsZFR5cGUiLCJ0eXBlT3B0aW9ucyIsInN0cmluZyIsImRhdGUiLCJ0aW1lc3RhbXAiLCJ0YWJsZUZpZWxkSW5kZXgiLCJpc1RpbWUiLCJ2YWx1ZUFjY2Vzc29yIiwibWF5YmVUb0RhdGUiLCJiaW5kIiwiZm9ybWF0IiwiZ2V0TnVtZXJpY0ZpZWxkRG9tYWluIiwiU2NhbGVVdGlscyIsImdldE9yZGluYWxEb21haW4iLCJnZXRUaW1lc3RhbXBGaWVsZERvbWFpbiIsImdldFBvbHlnb25GaWx0ZXJGdW5jdG9yIiwiZ2V0UG9zaXRpb24iLCJnZXRQb3NpdGlvbkFjY2Vzc29yIiwiTEFZRVJfVFlQRVMiLCJwb2ludCIsImljb24iLCJkYXRhIiwicG9zIiwiZXZlcnkiLCJpc0Zpbml0ZSIsImlzSW5Qb2x5Z29uIiwiYXJjIiwibGluZSIsImdldEZpbHRlckZ1bmN0aW9uIiwiaXNJblJhbmdlIiwibWFwcGVkVmFsdWUiLCJhY2Nlc3NvciIsIkFycmF5IiwiaXNBcnJheSIsImluZGV4IiwibGVuZ3RoIiwibGF5ZXJGaWx0ZXJGdW5jdGlvbnMiLCJtYXAiLCJjb25maWciLCJmaWx0ZXJGdW5jIiwidXBkYXRlRmlsdGVyRGF0YUlkIiwiZmlsdGVyRGF0YXNldCIsImZpbHRlcnMiLCJvcHQiLCJvbGRGaWx0ZXJSZWNvcmQiLCJmaWx0ZXJSZWNvcmQiLCJnZXRGaWx0ZXJSZWNvcmQiLCJuZXdEYXRhc2V0IiwiZ3B1RmlsdGVyIiwiZmlsdGVyZWRJbmRleCIsImFsbEluZGV4ZXMiLCJmaWx0ZXJlZEluZGV4Rm9yRG9tYWluIiwiY2hhbmdlZEZpbHRlcnMiLCJkaWZmRmlsdGVycyIsInNob3VsZENhbERvbWFpbiIsIkJvb2xlYW4iLCJkeW5hbWljRG9tYWluIiwic2hvdWxkQ2FsSW5kZXgiLCJjcHUiLCJmaWx0ZXJSZXN1bHQiLCJkeW5hbWljRG9tYWluRmlsdGVycyIsImNwdUZpbHRlcnMiLCJmaWx0ZXJGdW5jcyIsInJlZHVjZSIsImFjYyIsImZpZWxkSW5kZXgiLCJmaWx0ZXJEYXRhQnlGaWx0ZXJUeXBlcyIsInJlc3VsdCIsImkiLCJkIiwibWF0Y2hGb3JEb21haW4iLCJwdXNoIiwibWF0Y2hGb3JSZW5kZXIiLCJmb3JFYWNoIiwiZiIsImlnbm9yZURvbWFpbiIsImNwdU9ubHkiLCJmaWx0ZXJDaGFuZ2VkIiwiT2JqZWN0IiwiZW50cmllcyIsInJlY29yZCIsIml0ZW1zIiwib2xkRmlsdGVyIiwicHJvcCIsImZpbHRlcmVkVmFsdWUiLCJnZXRMaW5lYXJEb21haW4iLCJkaWZmIiwiZ2V0TnVtZXJpY1N0ZXBTaXplIiwiZm9ybWF0TnVtYmVyQnlTdGVwIiwiZ2V0SGlzdG9ncmFtIiwiZW5sYXJnZWRIaXN0b2dyYW0iLCJNYXRoIiwiYWJzIiwieCIsImV4cG9uZW50aWFsRm9ybSIsInRvRXhwb25lbnRpYWwiLCJleHBvbmVudCIsInBhcnNlRmxvYXQiLCJzcGxpdCIsIkRlY2ltYWwiLCJwb3ciLCJ0b051bWJlciIsImVudHJ5IiwiaGlzdG9ncmFtQ29uc3RydWN0IiwiYmlucyIsInRocmVzaG9sZHMiLCJiaW4iLCJjb3VudCIsIngwIiwieDEiLCJ2YWwiLCJib3VuZCIsImZsb29yIiwiY2VpbCIsImdldFRpbWVXaWRnZXRUaXRsZUZvcm1hdHRlciIsImdldFRpbWVXaWRnZXRIaW50Rm9ybWF0dGVyIiwidiIsImlzTmFOIiwiaW5wdXQiLCJjb29yZGluYXRlcyIsInNlcmllcyIsInkiLCJzb3J0IiwiYSIsImIiLCJ5RG9tYWluIiwieERvbWFpbiIsImdldERlZmF1bHRGaWx0ZXJQbG90VHlwZSIsImZpbHRlclBsb3RUeXBlcyIsImFwcGx5RmlsdGVyc1RvRGF0YXNldHMiLCJkYXRhc2V0SWRzIiwiZGF0YXNldHMiLCJsYXllcnNUb0ZpbHRlciIsImFwcGxpZWRGaWx0ZXJzIiwiZmluZEluZGV4IiwibmV3RmlsdGVyIiwibWVyZ2VGaWx0ZXJEb21haW5TdGVwIiwiYXNzaWduIiwiY29uY2F0IiwiZmllbGRXaXRoRmlsdGVyUHJvcHMiLCJuZXdGaWVsZHMiLCJjb21iaW5lZERvbWFpbiIsImZlYXR1cmVUb0ZpbHRlclZhbHVlIiwiZmVhdHVyZSIsImZpbHRlcklkIiwicHJvcGVydGllcyIsImdldEZpbHRlcklkSW5GZWF0dXJlIiwiZ2VuZXJhdGVQb2x5Z29uRmlsdGVyIiwibGFiZWwiLCJpc1Zpc2libGUiLCJmaWx0ZXJEYXRhc2V0Q1BVIiwic3RhdGUiLCJkYXRhc2V0RmlsdGVycyIsInNlbGVjdGVkRGF0YXNldCIsImZpbHRlcmVkIiwiZmlsdGVyZWRJZHhDUFUiLCJmaWx0ZXJSZWNvcmRDUFUiLCJjb3BpZWQiLCJjcHVGaWx0ZXJlZERhdGFzZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFFTyxJQUFNQSxnQkFBZ0IsR0FBRyxDQUM5QjtBQUFDQyxFQUFBQSxHQUFHLEVBQUUsQ0FBTjtBQUFTQyxFQUFBQSxJQUFJLEVBQUU7QUFBZixDQUQ4QixFQUU5QjtBQUFDRCxFQUFBQSxHQUFHLEVBQUUsRUFBTjtBQUFV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QUFZLEVBQUU0RyxlQUFlLENBQUNHLGVBRnBCO0FBR1YzRyxJQUFBQSxhQUFhLEVBQUV3RyxlQUFlLENBQUNFO0FBSHJCLElBQVo7O0FBTUEsTUFBTUQsUUFBUSxHQUFHakgsYUFBYSxDQUFDb0gsTUFBRCxFQUFTTixLQUFLLENBQUM3RyxPQUFmLEVBQXdCNkcsS0FBSyxDQUFDckwsTUFBOUIsRUFBc0N5RSxHQUF0QyxDQUE5Qjs7QUFFQSxNQUFNbUgsa0JBQWtCLHFCQUNuQkwsZUFEbUI7QUFFdEJFLElBQUFBLGNBQWMsRUFBRUQsUUFBUSxDQUFDekcsYUFGSDtBQUd0QjJHLElBQUFBLGVBQWUsRUFBRUYsUUFBUSxDQUFDN0c7QUFISixJQUF4Qjs7QUFNQSxTQUFPLGdCQUFJLENBQUMsVUFBRCxFQUFhbkgsTUFBYixDQUFKLEVBQTBCb08sa0JBQTFCLEVBQThDUCxLQUE5QyxDQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMjAgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQge2FzY2VuZGluZywgZXh0ZW50LCBoaXN0b2dyYW0gYXMgZDNIaXN0b2dyYW0sIHRpY2tzfSBmcm9tICdkMy1hcnJheSc7XG5pbXBvcnQga2V5TWlycm9yIGZyb20gJ2tleW1pcnJvcic7XG5pbXBvcnQgZ2V0IGZyb20gJ2xvZGFzaC5nZXQnO1xuaW1wb3J0IGJvb2xlYW5XaXRoaW4gZnJvbSAnQHR1cmYvYm9vbGVhbi13aXRoaW4nO1xuaW1wb3J0IHtwb2ludCBhcyB0dXJmUG9pbnR9IGZyb20gJ0B0dXJmL2hlbHBlcnMnO1xuaW1wb3J0IHtEZWNpbWFsfSBmcm9tICdkZWNpbWFsLmpzJztcbmltcG9ydCB7QUxMX0ZJRUxEX1RZUEVTLCBGSUxURVJfVFlQRVN9IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcbmltcG9ydCB7bWF5YmVUb0RhdGUsIG5vdE51bGxvclVuZGVmaW5lZCwgdW5pcXVlLCB0aW1lVG9Vbml4TWlsbGl9IGZyb20gJy4vZGF0YS11dGlscyc7XG5pbXBvcnQgKiBhcyBTY2FsZVV0aWxzIGZyb20gJy4vZGF0YS1zY2FsZS11dGlscyc7XG5pbXBvcnQge0xBWUVSX1RZUEVTfSBmcm9tICcuLi9jb25zdGFudHMnO1xuaW1wb3J0IHtnZW5lcmF0ZUhhc2hJZCwgc2V0LCB0b0FycmF5fSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7Z2V0R3B1RmlsdGVyUHJvcHMsIGdldERhdGFzZXRGaWVsZEluZGV4Rm9yRmlsdGVyfSBmcm9tICcuL2dwdS1maWx0ZXItdXRpbHMnO1xuXG5leHBvcnQgY29uc3QgVGltZXN0YW1wU3RlcE1hcCA9IFtcbiAge21heDogMSwgc3RlcDogMC4wNX0sXG4gIHttYXg6IDEwLCBzdGVwOiAwLjF9LFxuICB7bWF4OiAxMDAsIHN0ZXA6IDF9LFxuICB7bWF4OiA1MDAsIHN0ZXA6IDV9LFxuICB7bWF4OiAxMDAwLCBzdGVwOiAxMH0sXG4gIHttYXg6IDUwMDAsIHN0ZXA6IDUwfSxcbiAge21heDogTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZLCBzdGVwOiAxMDAwfVxuXTtcblxuZXhwb3J0IGNvbnN0IGhpc3RvZ3JhbUJpbnMgPSAzMDtcbmV4cG9ydCBjb25zdCBlbmxhcmdlZEhpc3RvZ3JhbUJpbnMgPSAxMDA7XG5cbmNvbnN0IGR1cmF0aW9uU2Vjb25kID0gMTAwMDtcbmNvbnN0IGR1cmF0aW9uTWludXRlID0gZHVyYXRpb25TZWNvbmQgKiA2MDtcbmNvbnN0IGR1cmF0aW9uSG91ciA9IGR1cmF0aW9uTWludXRlICogNjA7XG5jb25zdCBkdXJhdGlvbkRheSA9IGR1cmF0aW9uSG91ciAqIDI0O1xuY29uc3QgZHVyYXRpb25XZWVrID0gZHVyYXRpb25EYXkgKiA3O1xuY29uc3QgZHVyYXRpb25ZZWFyID0gZHVyYXRpb25EYXkgKiAzNjU7XG5cbmV4cG9ydCBjb25zdCBQTE9UX1RZUEVTID0ga2V5TWlycm9yKHtcbiAgaGlzdG9ncmFtOiBudWxsLFxuICBsaW5lQ2hhcnQ6IG51bGxcbn0pO1xuXG5leHBvcnQgY29uc3QgRklMVEVSX1VQREFURVJfUFJPUFMgPSBrZXlNaXJyb3Ioe1xuICBkYXRhSWQ6IG51bGwsXG4gIG5hbWU6IG51bGwsXG4gIGxheWVySWQ6IG51bGxcbn0pO1xuXG5leHBvcnQgY29uc3QgTElNSVRFRF9GSUxURVJfRUZGRUNUX1BST1BTID0ga2V5TWlycm9yKHtcbiAgW0ZJTFRFUl9VUERBVEVSX1BST1BTLm5hbWVdOiBudWxsXG59KTtcbi8qKlxuICogTWF4IG51bWJlciBvZiBmaWx0ZXIgdmFsdWUgYnVmZmVycyB0aGF0IGRlY2suZ2wgcHJvdmlkZXNcbiAqL1xuXG5jb25zdCBTdXBwb3J0ZWRQbG90VHlwZSA9IHtcbiAgW0ZJTFRFUl9UWVBFUy50aW1lUmFuZ2VdOiB7XG4gICAgZGVmYXVsdDogJ2hpc3RvZ3JhbScsXG4gICAgW0FMTF9GSUVMRF9UWVBFUy5pbnRlZ2VyXTogJ2xpbmVDaGFydCcsXG4gICAgW0FMTF9GSUVMRF9UWVBFUy5yZWFsXTogJ2xpbmVDaGFydCdcbiAgfSxcbiAgW0ZJTFRFUl9UWVBFUy5yYW5nZV06IHtcbiAgICBkZWZhdWx0OiAnaGlzdG9ncmFtJyxcbiAgICBbQUxMX0ZJRUxEX1RZUEVTLmludGVnZXJdOiAnbGluZUNoYXJ0JyxcbiAgICBbQUxMX0ZJRUxEX1RZUEVTLnJlYWxdOiAnbGluZUNoYXJ0J1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgRklMVEVSX0NPTVBPTkVOVFMgPSB7XG4gIFtGSUxURVJfVFlQRVMuc2VsZWN0XTogJ1NpbmdsZVNlbGVjdEZpbHRlcicsXG4gIFtGSUxURVJfVFlQRVMubXVsdGlTZWxlY3RdOiAnTXVsdGlTZWxlY3RGaWx0ZXInLFxuICBbRklMVEVSX1RZUEVTLnRpbWVSYW5nZV06ICdUaW1lUmFuZ2VGaWx0ZXInLFxuICBbRklMVEVSX1RZUEVTLnJhbmdlXTogJ1JhbmdlRmlsdGVyJyxcbiAgW0ZJTFRFUl9UWVBFUy5wb2x5Z29uXTogJ1BvbHlnb25GaWx0ZXInXG59O1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9GSUxURVJfU1RSVUNUVVJFID0ge1xuICBkYXRhSWQ6IFtdLCAvLyBbc3RyaW5nXVxuICBmcmVlemU6IGZhbHNlLFxuICBpZDogbnVsbCxcblxuICAvLyB0aW1lIHJhbmdlIGZpbHRlciBzcGVjaWZpY1xuICBmaXhlZERvbWFpbjogZmFsc2UsXG4gIGVubGFyZ2VkOiBmYWxzZSxcbiAgaXNBbmltYXRpbmc6IGZhbHNlLFxuICBzcGVlZDogMSxcblxuICAvLyBmaWVsZCBzcGVjaWZpY1xuICBuYW1lOiBbXSwgLy8gc3RyaW5nXG4gIHR5cGU6IG51bGwsXG4gIGZpZWxkSWR4OiBbXSwgLy8gW2ludGVnZXJdXG4gIGRvbWFpbjogbnVsbCxcbiAgdmFsdWU6IG51bGwsXG5cbiAgLy8gcGxvdFxuICBwbG90VHlwZTogUExPVF9UWVBFUy5oaXN0b2dyYW0sXG4gIHlBeGlzOiBudWxsLFxuICBpbnRlcnZhbDogbnVsbCxcblxuICAvLyBtb2RlXG4gIGdwdTogZmFsc2Vcbn07XG5cbmV4cG9ydCBjb25zdCBGSUxURVJfSURfTEVOR1RIID0gNDtcblxuZXhwb3J0IGNvbnN0IExBWUVSX0ZJTFRFUlMgPSBbRklMVEVSX1RZUEVTLnBvbHlnb25dO1xuXG4vKipcbiAqIEdlbmVyYXRlcyBhIGZpbHRlciB3aXRoIGEgZGF0YXNldCBpZCBhcyBkYXRhSWRcbiAqIEBwYXJhbSB7W3N0cmluZ119IGRhdGFJZFxuICogQHJldHVybiB7b2JqZWN0fSBmaWx0ZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldERlZmF1bHRGaWx0ZXIoZGF0YUlkKSB7XG4gIHJldHVybiB7XG4gICAgLi4uREVGQVVMVF9GSUxURVJfU1RSVUNUVVJFLFxuICAgIC8vIHN0b3JlIGl0IGFzIGRhdGFJZCBhbmQgaXQgY291bGQgYmUgb25lIG9yIG1hbnlcbiAgICBkYXRhSWQ6IHRvQXJyYXkoZGF0YUlkKSxcbiAgICBpZDogZ2VuZXJhdGVIYXNoSWQoRklMVEVSX0lEX0xFTkdUSClcbiAgfTtcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBhIGZpbHRlciBpcyB2YWxpZCBiYXNlZCBvbiB0aGUgZ2l2ZW4gZGF0YUlkXG4gKiBAcGFyYW0ge29iamVjdH0gZmlsdGVyIHRvIHZhbGlkYXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0YXNldCBpZCB0byB2YWxpZGF0ZSBmaWx0ZXIgYWdhaW5zdFxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiBhIGZpbHRlciBpcyB2YWxpZCwgZmFsc2Ugb3RoZXJ3aXNlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaG91bGRBcHBseUZpbHRlcihmaWx0ZXIsIGRhdGFzZXRJZCkge1xuICBjb25zdCBkYXRhSWRzID0gdG9BcnJheShmaWx0ZXIuZGF0YUlkKTtcbiAgcmV0dXJuIGRhdGFJZHMuaW5jbHVkZXMoZGF0YXNldElkKSAmJiBmaWx0ZXIudmFsdWUgIT09IG51bGw7XG59XG5cbi8qKlxuICogVmFsaWRhdGVzIGFuZCBtb2RpZmllcyBwb2x5Z29uIGZpbHRlciBzdHJ1Y3R1cmVcbiAqIEBwYXJhbSBkYXRhc2V0XG4gKiBAcGFyYW0gZmlsdGVyXG4gKiBAcGFyYW0gbGF5ZXJzXG4gKiBAcmV0dXJuIHtvYmplY3R9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZVBvbHlnb25GaWx0ZXIoZGF0YXNldCwgZmlsdGVyLCBsYXllcnMpIHtcbiAgY29uc3QgZmFpbGVkID0ge2RhdGFzZXQsIGZpbHRlcjogbnVsbH07XG4gIGNvbnN0IHt2YWx1ZSwgbGF5ZXJJZCwgdHlwZSwgZGF0YUlkfSA9IGZpbHRlcjtcblxuICBpZiAoIWxheWVySWQgfHwgIWlzVmFsaWRGaWx0ZXJWYWx1ZSh0eXBlLCB2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFpbGVkO1xuICB9XG5cbiAgY29uc3QgaXNWYWxpZERhdGFzZXQgPSBkYXRhSWQuaW5jbHVkZXMoZGF0YXNldC5pZCk7XG5cbiAgaWYgKCFpc1ZhbGlkRGF0YXNldCkge1xuICAgIHJldHVybiBmYWlsZWQ7XG4gIH1cblxuICBjb25zdCBsYXllciA9IGxheWVycy5maW5kKGwgPT4gbGF5ZXJJZC5pbmNsdWRlcyhsLmlkKSk7XG5cbiAgaWYgKCFsYXllcikge1xuICAgIHJldHVybiBmYWlsZWQ7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGZpbHRlcjoge1xuICAgICAgLi4uZmlsdGVyLFxuICAgICAgZnJlZXplOiB0cnVlLFxuICAgICAgZmllbGRJZHg6IFtdXG4gICAgfSxcbiAgICBkYXRhc2V0XG4gIH07XG59XG5cbi8qKlxuICogQ3VzdG9tIGZpbHRlciB2YWxpZGF0b3JzXG4gKiBAdHlwZSB7RnVuY3Rpb259XG4gKi9cbmNvbnN0IGZpbHRlclZhbGlkYXRvcnMgPSB7XG4gIFtGSUxURVJfVFlQRVMucG9seWdvbl06IHZhbGlkYXRlUG9seWdvbkZpbHRlclxufTtcblxuLyoqXG4gKiBEZWZhdWx0IHZhbGlkYXRlIGZpbHRlciBmdW5jdGlvblxuICogQHBhcmFtIGRhdGFzZXRcbiAqIEBwYXJhbSBmaWx0ZXJcbiAqIEByZXR1cm4geyp9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUZpbHRlcihkYXRhc2V0LCBmaWx0ZXIpIHtcbiAgLy8gbWF0Y2ggZmlsdGVyLmRhdGFJZFxuICBjb25zdCBmYWlsZWQgPSB7ZGF0YXNldCwgZmlsdGVyOiBudWxsfTtcbiAgY29uc3QgZmlsdGVyRGF0YUlkID0gdG9BcnJheShmaWx0ZXIuZGF0YUlkKTtcblxuICBjb25zdCBmaWx0ZXJEYXRhc2V0SW5kZXggPSBmaWx0ZXJEYXRhSWQuaW5kZXhPZihkYXRhc2V0LmlkKTtcbiAgaWYgKGZpbHRlckRhdGFzZXRJbmRleCA8IDApIHtcbiAgICAvLyB0aGUgY3VycmVudCBmaWx0ZXIgaXMgbm90IG1hcHBlZCBhZ2FpbnN0IHRoZSBjdXJyZW50IGRhdGFzZXRcbiAgICByZXR1cm4gZmFpbGVkO1xuICB9XG5cbiAgY29uc3QgaW5pdGlhbGl6ZUZpbHRlciA9IHtcbiAgICAuLi5nZXREZWZhdWx0RmlsdGVyKGZpbHRlci5kYXRhSWQpLFxuICAgIC4uLmZpbHRlcixcbiAgICBkYXRhSWQ6IGZpbHRlckRhdGFJZCxcbiAgICBuYW1lOiB0b0FycmF5KGZpbHRlci5uYW1lKVxuICB9O1xuXG4gIGNvbnN0IGZpZWxkTmFtZSA9IGluaXRpYWxpemVGaWx0ZXIubmFtZVtmaWx0ZXJEYXRhc2V0SW5kZXhdO1xuICBjb25zdCB7ZmlsdGVyOiB1cGRhdGVkRmlsdGVyLCBkYXRhc2V0OiB1cGRhdGVkRGF0YXNldH0gPSBhcHBseUZpbHRlckZpZWxkTmFtZShcbiAgICBpbml0aWFsaXplRmlsdGVyLFxuICAgIGRhdGFzZXQsXG4gICAgZmllbGROYW1lLFxuICAgIGZpbHRlckRhdGFzZXRJbmRleCxcbiAgICB7bWVyZ2VEb21haW46IHRydWV9XG4gICk7XG5cbiAgaWYgKCF1cGRhdGVkRmlsdGVyKSB7XG4gICAgcmV0dXJuIGZhaWxlZDtcbiAgfVxuXG4gIHVwZGF0ZWRGaWx0ZXIudmFsdWUgPSBhZGp1c3RWYWx1ZVRvRmlsdGVyRG9tYWluKGZpbHRlci52YWx1ZSwgdXBkYXRlZEZpbHRlcik7XG4gIGlmICh1cGRhdGVkRmlsdGVyLnZhbHVlID09PSBudWxsKSB7XG4gICAgLy8gY2Fubm90IGFkanVzdCBzYXZlZCB2YWx1ZSB0byBmaWx0ZXJcbiAgICByZXR1cm4gZmFpbGVkO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBmaWx0ZXI6IHZhbGlkYXRlRmlsdGVyWUF4aXModXBkYXRlZEZpbHRlciwgdXBkYXRlZERhdGFzZXQpLFxuICAgIGRhdGFzZXQ6IHVwZGF0ZWREYXRhc2V0XG4gIH07XG59XG5cbi8qKlxuICogVmFsaWRhdGUgc2F2ZWQgZmlsdGVyIGNvbmZpZyB3aXRoIG5ldyBkYXRhLFxuICogY2FsY3VsYXRlIGRvbWFpbiBhbmQgZmllbGRJZHggYmFzZWQgbmV3IGZpZWxkcyBhbmQgZGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhc2V0XG4gKiBAcGFyYW0ge09iamVjdH0gZmlsdGVyIC0gZmlsdGVyIHRvIGJlIHZhbGlkYXRlXG4gKiBAcmV0dXJuIHtPYmplY3QgfCBudWxsfSAtIHZhbGlkYXRlZCBmaWx0ZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlRmlsdGVyV2l0aERhdGEoZGF0YXNldCwgZmlsdGVyLCBsYXllcnMpIHtcbiAgcmV0dXJuIGZpbHRlclZhbGlkYXRvcnMuaGFzT3duUHJvcGVydHkoZmlsdGVyLnR5cGUpXG4gICAgPyBmaWx0ZXJWYWxpZGF0b3JzW2ZpbHRlci50eXBlXShkYXRhc2V0LCBmaWx0ZXIsIGxheWVycylcbiAgICA6IHZhbGlkYXRlRmlsdGVyKGRhdGFzZXQsIGZpbHRlcik7XG59XG5cbi8qKlxuICogVmFsaWRhdGUgWUF4aXNcbiAqIEBwYXJhbSBmaWx0ZXJcbiAqIEBwYXJhbSBkYXRhc2V0XG4gKiBAcmV0dXJuIHsqfVxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZUZpbHRlcllBeGlzKGZpbHRlciwgZGF0YXNldCkge1xuICAvLyBUT0RPOiB2YWxpZGF0ZSB5QXhpcyBhZ2FpbnN0IG90aGVyIGRhdGFzZXRzXG5cbiAgY29uc3Qge2ZpZWxkcywgYWxsRGF0YX0gPSBkYXRhc2V0O1xuICBjb25zdCB7eUF4aXN9ID0gZmlsdGVyO1xuICAvLyBUT0RPOiB2YWxpZGF0ZSB5QXhpcyBhZ2FpbnN0IG90aGVyIGRhdGFzZXRzXG4gIGlmICh5QXhpcykge1xuICAgIGNvbnN0IG1hdGNoZWRBeGlzID0gZmllbGRzLmZpbmQoKHtuYW1lLCB0eXBlfSkgPT4gbmFtZSA9PT0geUF4aXMubmFtZSAmJiB0eXBlID09PSB5QXhpcy50eXBlKTtcblxuICAgIGZpbHRlciA9IG1hdGNoZWRBeGlzXG4gICAgICA/IHtcbiAgICAgICAgICAuLi5maWx0ZXIsXG4gICAgICAgICAgeUF4aXM6IG1hdGNoZWRBeGlzLFxuICAgICAgICAgIC4uLmdldEZpbHRlclBsb3Qoey4uLmZpbHRlciwgeUF4aXM6IG1hdGNoZWRBeGlzfSwgYWxsRGF0YSlcbiAgICAgICAgfVxuICAgICAgOiBmaWx0ZXI7XG4gIH1cblxuICByZXR1cm4gZmlsdGVyO1xufVxuXG4vKipcbiAqIEdldCBkZWZhdWx0IGZpbHRlciBwcm9wIGJhc2VkIG9uIGZpZWxkIHR5cGVcbiAqXG4gKiBAcGFyYW0ge0FycmF5PEFycmF5Pn0gYWxsRGF0YVxuICogQHBhcmFtIHtPYmplY3R9IGZpZWxkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBkZWZhdWx0IGZpbHRlclxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmlsdGVyUHJvcHMoYWxsRGF0YSwgZmllbGQpIHtcbiAgY29uc3QgZmlsdGVyUHJvcHMgPSB7XG4gICAgLi4uZ2V0RmllbGREb21haW4oYWxsRGF0YSwgZmllbGQpLFxuICAgIGZpZWxkVHlwZTogZmllbGQudHlwZVxuICB9O1xuXG4gIHN3aXRjaCAoZmllbGQudHlwZSkge1xuICAgIGNhc2UgQUxMX0ZJRUxEX1RZUEVTLnJlYWw6XG4gICAgY2FzZSBBTExfRklFTERfVFlQRVMuaW50ZWdlcjpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmZpbHRlclByb3BzLFxuICAgICAgICB2YWx1ZTogZmlsdGVyUHJvcHMuZG9tYWluLFxuICAgICAgICB0eXBlOiBGSUxURVJfVFlQRVMucmFuZ2UsXG4gICAgICAgIHR5cGVPcHRpb25zOiBbRklMVEVSX1RZUEVTLnJhbmdlXSxcbiAgICAgICAgZ3B1OiB0cnVlXG4gICAgICB9O1xuXG4gICAgY2FzZSBBTExfRklFTERfVFlQRVMuYm9vbGVhbjpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmZpbHRlclByb3BzLFxuICAgICAgICB0eXBlOiBGSUxURVJfVFlQRVMuc2VsZWN0LFxuICAgICAgICB2YWx1ZTogdHJ1ZSxcbiAgICAgICAgZ3B1OiBmYWxzZVxuICAgICAgfTtcblxuICAgIGNhc2UgQUxMX0ZJRUxEX1RZUEVTLnN0cmluZzpcbiAgICBjYXNlIEFMTF9GSUVMRF9UWVBFUy5kYXRlOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uZmlsdGVyUHJvcHMsXG4gICAgICAgIHR5cGU6IEZJTFRFUl9UWVBFUy5tdWx0aVNlbGVjdCxcbiAgICAgICAgdmFsdWU6IFtdLFxuICAgICAgICBncHU6IGZhbHNlXG4gICAgICB9O1xuXG4gICAgY2FzZSBBTExfRklFTERfVFlQRVMudGltZXN0YW1wOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uZmlsdGVyUHJvcHMsXG4gICAgICAgIHR5cGU6IEZJTFRFUl9UWVBFUy50aW1lUmFuZ2UsXG4gICAgICAgIGVubGFyZ2VkOiB0cnVlLFxuICAgICAgICBmaXhlZERvbWFpbjogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IGZpbHRlclByb3BzLmRvbWFpbixcbiAgICAgICAgZ3B1OiB0cnVlXG4gICAgICB9O1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB7fTtcbiAgfVxufVxuXG4vKipcbiAqIENhbGN1bGF0ZSBmaWVsZCBkb21haW4gYmFzZWQgb24gZmllbGQgdHlwZSBhbmQgZGF0YVxuICpcbiAqIEBwYXJhbSB7QXJyYXk8QXJyYXk+fSBhbGxEYXRhXG4gKiBAcGFyYW0ge09iamVjdH0gZmllbGRcbiAqIEByZXR1cm5zIHtPYmplY3R9IHdpdGggZG9tYWluIGFzIGtleVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmllbGREb21haW4oYWxsRGF0YSwgZmllbGQpIHtcbiAgY29uc3QgZmllbGRJZHggPSBmaWVsZC50YWJsZUZpZWxkSW5kZXggLSAxO1xuICBjb25zdCBpc1RpbWUgPSBmaWVsZC50eXBlID09PSBBTExfRklFTERfVFlQRVMudGltZXN0YW1wO1xuICBjb25zdCB2YWx1ZUFjY2Vzc29yID0gbWF5YmVUb0RhdGUuYmluZChudWxsLCBpc1RpbWUsIGZpZWxkSWR4LCBmaWVsZC5mb3JtYXQpO1xuICBsZXQgZG9tYWluO1xuXG4gIHN3aXRjaCAoZmllbGQudHlwZSkge1xuICAgIGNhc2UgQUxMX0ZJRUxEX1RZUEVTLnJlYWw6XG4gICAgY2FzZSBBTExfRklFTERfVFlQRVMuaW50ZWdlcjpcbiAgICAgIC8vIGNhbGN1bGF0ZSBkb21haW4gYW5kIHN0ZXBcbiAgICAgIHJldHVybiBnZXROdW1lcmljRmllbGREb21haW4oYWxsRGF0YSwgdmFsdWVBY2Nlc3Nvcik7XG5cbiAgICBjYXNlIEFMTF9GSUVMRF9UWVBFUy5ib29sZWFuOlxuICAgICAgcmV0dXJuIHtkb21haW46IFt0cnVlLCBmYWxzZV19O1xuXG4gICAgY2FzZSBBTExfRklFTERfVFlQRVMuc3RyaW5nOlxuICAgIGNhc2UgQUxMX0ZJRUxEX1RZUEVTLmRhdGU6XG4gICAgICBkb21haW4gPSBTY2FsZVV0aWxzLmdldE9yZGluYWxEb21haW4oYWxsRGF0YSwgdmFsdWVBY2Nlc3Nvcik7XG4gICAgICByZXR1cm4ge2RvbWFpbn07XG5cbiAgICBjYXNlIEFMTF9GSUVMRF9UWVBFUy50aW1lc3RhbXA6XG4gICAgICByZXR1cm4gZ2V0VGltZXN0YW1wRmllbGREb21haW4oYWxsRGF0YSwgdmFsdWVBY2Nlc3Nvcik7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHtkb21haW46IFNjYWxlVXRpbHMuZ2V0T3JkaW5hbERvbWFpbihhbGxEYXRhLCB2YWx1ZUFjY2Vzc29yKX07XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGdldFBvbHlnb25GaWx0ZXJGdW5jdG9yID0gKGxheWVyLCBmaWx0ZXIpID0+IHtcbiAgY29uc3QgZ2V0UG9zaXRpb24gPSBsYXllci5nZXRQb3NpdGlvbkFjY2Vzc29yKCk7XG5cbiAgc3dpdGNoIChsYXllci50eXBlKSB7XG4gICAgY2FzZSBMQVlFUl9UWVBFUy5wb2ludDpcbiAgICBjYXNlIExBWUVSX1RZUEVTLmljb246XG4gICAgICByZXR1cm4gZGF0YSA9PiB7XG4gICAgICAgIGNvbnN0IHBvcyA9IGdldFBvc2l0aW9uKHtkYXRhfSk7XG4gICAgICAgIHJldHVybiBwb3MuZXZlcnkoTnVtYmVyLmlzRmluaXRlKSAmJiBpc0luUG9seWdvbihwb3MsIGZpbHRlci52YWx1ZSk7XG4gICAgICB9O1xuICAgIGNhc2UgTEFZRVJfVFlQRVMuYXJjOlxuICAgIGNhc2UgTEFZRVJfVFlQRVMubGluZTpcbiAgICAgIHJldHVybiBkYXRhID0+IHtcbiAgICAgICAgY29uc3QgcG9zID0gZ2V0UG9zaXRpb24oe2RhdGF9KTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICBwb3MuZXZlcnkoTnVtYmVyLmlzRmluaXRlKSAmJlxuICAgICAgICAgIFtcbiAgICAgICAgICAgIFtwb3NbMF0sIHBvc1sxXV0sXG4gICAgICAgICAgICBbcG9zWzNdLCBwb3NbNF1dXG4gICAgICAgICAgXS5ldmVyeShwb2ludCA9PiBpc0luUG9seWdvbihwb2ludCwgZmlsdGVyLnZhbHVlKSlcbiAgICAgICAgKTtcbiAgICAgIH07XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAoKSA9PiB0cnVlO1xuICB9XG59O1xuXG4vKipcbiAqIEBwYXJhbSBmaWVsZCBkYXRhc2V0IEZpZWxkXG4gKiBAcGFyYW0gZGF0YUlkIERhdGFzZXQgaWRcbiAqIEBwYXJhbSBmaWx0ZXIgRmlsdGVyIG9iamVjdFxuICogQHBhcmFtIGxheWVycyBsaXN0IG9mIGxheWVycyB0byBmaWx0ZXIgdXBvblxuICogQHJldHVybiB7Kn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEZpbHRlckZ1bmN0aW9uKGZpZWxkLCBkYXRhSWQsIGZpbHRlciwgbGF5ZXJzKSB7XG4gIC8vIGZpZWxkIGNvdWxkIGJlIG51bGxcbiAgY29uc3QgdmFsdWVBY2Nlc3NvciA9IGRhdGEgPT4gKGZpZWxkID8gZGF0YVtmaWVsZC50YWJsZUZpZWxkSW5kZXggLSAxXSA6IG51bGwpO1xuXG4gIHN3aXRjaCAoZmlsdGVyLnR5cGUpIHtcbiAgICBjYXNlIEZJTFRFUl9UWVBFUy5yYW5nZTpcbiAgICAgIHJldHVybiBkYXRhID0+IGlzSW5SYW5nZSh2YWx1ZUFjY2Vzc29yKGRhdGEpLCBmaWx0ZXIudmFsdWUpO1xuICAgIGNhc2UgRklMVEVSX1RZUEVTLm11bHRpU2VsZWN0OlxuICAgICAgcmV0dXJuIGRhdGEgPT4gZmlsdGVyLnZhbHVlLmluY2x1ZGVzKHZhbHVlQWNjZXNzb3IoZGF0YSkpO1xuICAgIGNhc2UgRklMVEVSX1RZUEVTLnNlbGVjdDpcbiAgICAgIHJldHVybiBkYXRhID0+IHZhbHVlQWNjZXNzb3IoZGF0YSkgPT09IGZpbHRlci52YWx1ZTtcbiAgICBjYXNlIEZJTFRFUl9UWVBFUy50aW1lUmFuZ2U6XG4gICAgICBjb25zdCBtYXBwZWRWYWx1ZSA9IGdldChmaWVsZCwgWydmaWx0ZXJQcm9wcycsICdtYXBwZWRWYWx1ZSddKTtcbiAgICAgIGNvbnN0IGFjY2Vzc29yID0gQXJyYXkuaXNBcnJheShtYXBwZWRWYWx1ZSlcbiAgICAgICAgPyAoZGF0YSwgaW5kZXgpID0+IG1hcHBlZFZhbHVlW2luZGV4XVxuICAgICAgICA6IGRhdGEgPT4gdGltZVRvVW5peE1pbGxpKHZhbHVlQWNjZXNzb3IoZGF0YSksIGZpZWxkLmZvcm1hdCk7XG4gICAgICByZXR1cm4gKGRhdGEsIGluZGV4KSA9PiBpc0luUmFuZ2UoYWNjZXNzb3IoZGF0YSwgaW5kZXgpLCBmaWx0ZXIudmFsdWUpO1xuICAgIGNhc2UgRklMVEVSX1RZUEVTLnBvbHlnb246XG4gICAgICBpZiAoIWxheWVycyB8fCAhbGF5ZXJzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gKCkgPT4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbGF5ZXJGaWx0ZXJGdW5jdGlvbnMgPSBmaWx0ZXIubGF5ZXJJZFxuICAgICAgICAubWFwKGlkID0+IGxheWVycy5maW5kKGwgPT4gbC5pZCA9PT0gaWQpKVxuICAgICAgICAuZmlsdGVyKGwgPT4gbCAmJiBsLmNvbmZpZy5kYXRhSWQgPT09IGRhdGFJZClcbiAgICAgICAgLm1hcChsYXllciA9PiBnZXRQb2x5Z29uRmlsdGVyRnVuY3RvcihsYXllciwgZmlsdGVyKSk7XG5cbiAgICAgIHJldHVybiBkYXRhID0+IGxheWVyRmlsdGVyRnVuY3Rpb25zLmV2ZXJ5KGZpbHRlckZ1bmMgPT4gZmlsdGVyRnVuYyhkYXRhKSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAoKSA9PiB0cnVlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVGaWx0ZXJEYXRhSWQoZGF0YUlkKSB7XG4gIHJldHVybiBnZXREZWZhdWx0RmlsdGVyKGRhdGFJZCk7XG59XG5cbi8qKlxuICogRmlsdGVyIGRhdGEgYmFzZWQgb24gYW4gYXJyYXkgb2YgZmlsdGVyc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhc2V0XG4gKiBAcGFyYW0ge0FycmF5PE9iamVjdD59IGZpbHRlcnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHQuY3B1T25seSBvbmx5IGFsbG93IGNwdSBmaWx0ZXJpbmdcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHQuaWdub3JlRG9tYWluIGlnbm9yZSBmaWx0ZXIgZm9yIGRvbWFpbiBjYWxjdWxhdGlvblxuICogQHJldHVybnMge09iamVjdH0gZGF0YXNldFxuICogQHJldHVybnMge0FycmF5PE51bWJlcj59IGRhdGFzZXQuZmlsdGVyZWRJbmRleFxuICogQHJldHVybnMge0FycmF5PE51bWJlcj59IGRhdGFzZXQuZmlsdGVyZWRJbmRleEZvckRvbWFpblxuICovXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyRGF0YXNldChkYXRhc2V0LCBmaWx0ZXJzLCBsYXllcnMsIG9wdCA9IHt9KSB7XG4gIGNvbnN0IHthbGxEYXRhLCBpZDogZGF0YUlkLCBmaWx0ZXJSZWNvcmQ6IG9sZEZpbHRlclJlY29yZCwgZmllbGRzfSA9IGRhdGFzZXQ7XG5cbiAgLy8gaWYgdGhlcmUgaXMgbm8gZmlsdGVyc1xuICBjb25zdCBmaWx0ZXJSZWNvcmQgPSBnZXRGaWx0ZXJSZWNvcmQoZGF0YUlkLCBmaWx0ZXJzLCBvcHQpO1xuXG4gIGNvbnN0IG5ld0RhdGFzZXQgPSBzZXQoWydmaWx0ZXJSZWNvcmQnXSwgZmlsdGVyUmVjb3JkLCBkYXRhc2V0KTtcblxuICBpZiAoIWZpbHRlcnMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLm5ld0RhdGFzZXQsXG4gICAgICBncHVGaWx0ZXI6IGdldEdwdUZpbHRlclByb3BzKGZpbHRlcnMsIGRhdGFJZCwgZmllbGRzKSxcbiAgICAgIGZpbHRlcmVkSW5kZXg6IGRhdGFzZXQuYWxsSW5kZXhlcyxcbiAgICAgIGZpbHRlcmVkSW5kZXhGb3JEb21haW46IGRhdGFzZXQuYWxsSW5kZXhlc1xuICAgIH07XG4gIH1cblxuICBjb25zdCBjaGFuZ2VkRmlsdGVycyA9IGRpZmZGaWx0ZXJzKGZpbHRlclJlY29yZCwgb2xkRmlsdGVyUmVjb3JkKTtcblxuICAvLyBnZW5lcmF0ZSAyIHNldHMgb2YgZmlsdGVyIHJlc3VsdFxuICAvLyBmaWx0ZXJlZEluZGV4IHVzZWQgdG8gY2FsY3VsYXRlIGxheWVyIGRhdGFcbiAgLy8gZmlsdGVyZWRJbmRleEZvckRvbWFpbiB1c2VkIHRvIGNhbGN1bGF0ZSBsYXllciBEb21haW5cbiAgY29uc3Qgc2hvdWxkQ2FsRG9tYWluID0gQm9vbGVhbihjaGFuZ2VkRmlsdGVycy5keW5hbWljRG9tYWluKTtcbiAgY29uc3Qgc2hvdWxkQ2FsSW5kZXggPSBCb29sZWFuKGNoYW5nZWRGaWx0ZXJzLmNwdSk7XG5cbiAgbGV0IGZpbHRlclJlc3VsdCA9IHt9O1xuICBpZiAoc2hvdWxkQ2FsRG9tYWluIHx8IHNob3VsZENhbEluZGV4KSB7XG4gICAgY29uc3QgZHluYW1pY0RvbWFpbkZpbHRlcnMgPSBzaG91bGRDYWxEb21haW4gPyBmaWx0ZXJSZWNvcmQuZHluYW1pY0RvbWFpbiA6IG51bGw7XG4gICAgY29uc3QgY3B1RmlsdGVycyA9IHNob3VsZENhbEluZGV4ID8gZmlsdGVyUmVjb3JkLmNwdSA6IG51bGw7XG5cbiAgICBjb25zdCBmaWx0ZXJGdW5jcyA9IGZpbHRlcnMucmVkdWNlKChhY2MsIGZpbHRlcikgPT4ge1xuICAgICAgY29uc3QgZmllbGRJbmRleCA9IGdldERhdGFzZXRGaWVsZEluZGV4Rm9yRmlsdGVyKGRhdGFzZXQuaWQsIGZpbHRlcik7XG4gICAgICBjb25zdCBmaWVsZCA9IGZpZWxkSW5kZXggIT09IC0xID8gZmllbGRzW2ZpZWxkSW5kZXhdIDogbnVsbDtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uYWNjLFxuICAgICAgICBbZmlsdGVyLmlkXTogZ2V0RmlsdGVyRnVuY3Rpb24oZmllbGQsIGRhdGFzZXQuaWQsIGZpbHRlciwgbGF5ZXJzKVxuICAgICAgfTtcbiAgICB9LCB7fSk7XG5cbiAgICBmaWx0ZXJSZXN1bHQgPSBmaWx0ZXJEYXRhQnlGaWx0ZXJUeXBlcyhcbiAgICAgIHtkeW5hbWljRG9tYWluRmlsdGVycywgY3B1RmlsdGVycywgZmlsdGVyRnVuY3N9LFxuICAgICAgYWxsRGF0YVxuICAgICk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIC4uLm5ld0RhdGFzZXQsXG4gICAgLi4uZmlsdGVyUmVzdWx0LFxuICAgIGdwdUZpbHRlcjogZ2V0R3B1RmlsdGVyUHJvcHMoZmlsdGVycywgZGF0YUlkLCBmaWVsZHMpXG4gIH07XG59XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBmaWx0ZXJzXG4gKiBAcGFyYW0ge0FycmF5fG51bGx9IGZpbHRlcnMuZHluYW1pY0RvbWFpbkZpbHRlcnNcbiAqIEBwYXJhbSB7QXJyYXl8bnVsbH0gZmlsdGVycy5jcHVGaWx0ZXJzXG4gKiBAcGFyYW0ge09iamVjdH0gZmlsdGVycy5maWx0ZXJGdW5jc1xuICogQHJldHVybnMge3tmaWx0ZXJlZEluZGV4OiBBcnJheSwgZmlsdGVyZWRJbmRleEZvckRvbWFpbjogQXJyYXl9fSBmaWx0ZXJlZEluZGV4IGFuZCBmaWx0ZXJlZEluZGV4Rm9yRG9tYWluXG4gKi9cbmZ1bmN0aW9uIGZpbHRlckRhdGFCeUZpbHRlclR5cGVzKHtkeW5hbWljRG9tYWluRmlsdGVycywgY3B1RmlsdGVycywgZmlsdGVyRnVuY3N9LCBhbGxEYXRhKSB7XG4gIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAuLi4oZHluYW1pY0RvbWFpbkZpbHRlcnMgPyB7ZmlsdGVyZWRJbmRleEZvckRvbWFpbjogW119IDoge30pLFxuICAgIC4uLihjcHVGaWx0ZXJzID8ge2ZpbHRlcmVkSW5kZXg6IFtdfSA6IHt9KVxuICB9O1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsRGF0YS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGQgPSBhbGxEYXRhW2ldO1xuXG4gICAgY29uc3QgbWF0Y2hGb3JEb21haW4gPVxuICAgICAgZHluYW1pY0RvbWFpbkZpbHRlcnMgJiYgZHluYW1pY0RvbWFpbkZpbHRlcnMuZXZlcnkoZmlsdGVyID0+IGZpbHRlckZ1bmNzW2ZpbHRlci5pZF0oZCwgaSkpO1xuXG4gICAgaWYgKG1hdGNoRm9yRG9tYWluKSB7XG4gICAgICByZXN1bHQuZmlsdGVyZWRJbmRleEZvckRvbWFpbi5wdXNoKGkpO1xuICAgIH1cblxuICAgIGNvbnN0IG1hdGNoRm9yUmVuZGVyID0gY3B1RmlsdGVycyAmJiBjcHVGaWx0ZXJzLmV2ZXJ5KGZpbHRlciA9PiBmaWx0ZXJGdW5jc1tmaWx0ZXIuaWRdKGQsIGkpKTtcblxuICAgIGlmIChtYXRjaEZvclJlbmRlcikge1xuICAgICAgcmVzdWx0LmZpbHRlcmVkSW5kZXgucHVzaChpKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEdldCBhIHJlY29yZCBvZiBmaWx0ZXJzIGJhc2VkIG9uIGRvbWFpbiB0eXBlIGFuZCBncHUgLyBjcHVcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhSWRcbiAqIEBwYXJhbSB7QXJyYXk8T2JqZWN0Pn0gZmlsdGVyc1xuICogQHBhcmFtIHtPYmplY3R9IG9wdC5jcHVPbmx5IG9ubHkgYWxsb3cgY3B1IGZpbHRlcmluZ1xuICogQHBhcmFtIHtPYmplY3R9IG9wdC5pZ25vcmVEb21haW4gaWdub3JlIGZpbHRlciBmb3IgZG9tYWluIGNhbGN1bGF0aW9uXG4gKiBAcmV0dXJucyB7e2R5bmFtaWNEb21haW46IEFycmF5LCBmaXhlZERvbWFpbjogQXJyYXksIGNwdTogQXJyYXksIGdwdTogQXJyYXl9fSBmaWx0ZXJSZWNvcmRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEZpbHRlclJlY29yZChkYXRhSWQsIGZpbHRlcnMsIG9wdCA9IHt9KSB7XG4gIGNvbnN0IGZpbHRlclJlY29yZCA9IHtcbiAgICBkeW5hbWljRG9tYWluOiBbXSxcbiAgICBmaXhlZERvbWFpbjogW10sXG4gICAgY3B1OiBbXSxcbiAgICBncHU6IFtdXG4gIH07XG5cbiAgZmlsdGVycy5mb3JFYWNoKGYgPT4ge1xuICAgIGlmIChpc1ZhbGlkRmlsdGVyVmFsdWUoZi50eXBlLCBmLnZhbHVlKSAmJiB0b0FycmF5KGYuZGF0YUlkKS5pbmNsdWRlcyhkYXRhSWQpKSB7XG4gICAgICAoZi5maXhlZERvbWFpbiB8fCBvcHQuaWdub3JlRG9tYWluXG4gICAgICAgID8gZmlsdGVyUmVjb3JkLmZpeGVkRG9tYWluXG4gICAgICAgIDogZmlsdGVyUmVjb3JkLmR5bmFtaWNEb21haW5cbiAgICAgICkucHVzaChmKTtcblxuICAgICAgKGYuZ3B1ICYmICFvcHQuY3B1T25seSA/IGZpbHRlclJlY29yZC5ncHUgOiBmaWx0ZXJSZWNvcmQuY3B1KS5wdXNoKGYpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGZpbHRlclJlY29yZDtcbn1cblxuLyoqXG4gKiBDb21wYXJlIGZpbHRlciByZWNvcmRzIHRvIGdldCB3aGF0IGhhcyBjaGFuZ2VkXG4gKiBAcGFyYW0ge09iamVjdH0gZmlsdGVyUmVjb3JkXG4gKiBAcGFyYW0ge09iamVjdH0gb2xkRmlsdGVyUmVjb3JkXG4gKiBAcmV0dXJucyB7e2R5bmFtaWNEb21haW46IE9iamVjdCwgZml4ZWREb21haW46IE9iamVjdCwgY3B1OiBPYmplY3QsIGdwdTogT2JqZWN0fX0gY2hhbmdlZCBmaWx0ZXJzIGJhc2VkIG9uIHR5cGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpZmZGaWx0ZXJzKGZpbHRlclJlY29yZCwgb2xkRmlsdGVyUmVjb3JkID0ge30pIHtcbiAgbGV0IGZpbHRlckNoYW5nZWQgPSB7fTtcblxuICBPYmplY3QuZW50cmllcyhmaWx0ZXJSZWNvcmQpLmZvckVhY2goKFtyZWNvcmQsIGl0ZW1zXSkgPT4ge1xuICAgIGl0ZW1zLmZvckVhY2goZmlsdGVyID0+IHtcbiAgICAgIGNvbnN0IG9sZEZpbHRlciA9IChvbGRGaWx0ZXJSZWNvcmRbcmVjb3JkXSB8fCBbXSkuZmluZChmID0+IGYuaWQgPT09IGZpbHRlci5pZCk7XG5cbiAgICAgIGlmICghb2xkRmlsdGVyKSB7XG4gICAgICAgIC8vIGFkZGVkXG4gICAgICAgIGZpbHRlckNoYW5nZWQgPSBzZXQoW3JlY29yZCwgZmlsdGVyLmlkXSwgJ2FkZGVkJywgZmlsdGVyQ2hhbmdlZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBjaGVjayAgd2hhdCBoYXMgY2hhbmdlZFxuICAgICAgICBbJ25hbWUnLCAndmFsdWUnLCAnZGF0YUlkJ10uZm9yRWFjaChwcm9wID0+IHtcbiAgICAgICAgICBpZiAoZmlsdGVyW3Byb3BdICE9PSBvbGRGaWx0ZXJbcHJvcF0pIHtcbiAgICAgICAgICAgIGZpbHRlckNoYW5nZWQgPSBzZXQoW3JlY29yZCwgZmlsdGVyLmlkXSwgYCR7cHJvcH1fY2hhbmdlZGAsIGZpbHRlckNoYW5nZWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAob2xkRmlsdGVyUmVjb3JkW3JlY29yZF0gfHwgW10pLmZvckVhY2gob2xkRmlsdGVyID0+IHtcbiAgICAgIC8vIGRlbGV0ZWRcbiAgICAgIGlmICghaXRlbXMuZmluZChmID0+IGYuaWQgPT09IG9sZEZpbHRlci5pZCkpIHtcbiAgICAgICAgZmlsdGVyQ2hhbmdlZCA9IHNldChbcmVjb3JkLCBvbGRGaWx0ZXIuaWRdLCAnZGVsZXRlZCcsIGZpbHRlckNoYW5nZWQpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKCFmaWx0ZXJDaGFuZ2VkW3JlY29yZF0pIHtcbiAgICAgIGZpbHRlckNoYW5nZWRbcmVjb3JkXSA9IG51bGw7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gZmlsdGVyQ2hhbmdlZDtcbn1cbi8qKlxuICogQ2FsbCBieSBwYXJzaW5nIGZpbHRlcnMgZnJvbSBVUkxcbiAqIENoZWNrIGlmIHZhbHVlIG9mIGZpbHRlciB3aXRoaW4gZmlsdGVyIGRvbWFpbiwgaWYgbm90IGFkanVzdCBpdCB0byBtYXRjaFxuICogZmlsdGVyIGRvbWFpblxuICpcbiAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPiB8IHN0cmluZyB8IE51bWJlciB8IEFycmF5PE51bWJlcj59IHZhbHVlXG4gKiBAcGFyYW0ge0FycmF5fSBmaWx0ZXIuZG9tYWluXG4gKiBAcGFyYW0ge1N0cmluZ30gZmlsdGVyLnR5cGVcbiAqIEByZXR1cm5zIHsqfSAtIGFkanVzdGVkIHZhbHVlIHRvIG1hdGNoIGZpbHRlciBvciBudWxsIHRvIHJlbW92ZSBmaWx0ZXJcbiAqL1xuLyogZXNsaW50LWRpc2FibGUgY29tcGxleGl0eSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkanVzdFZhbHVlVG9GaWx0ZXJEb21haW4odmFsdWUsIHtkb21haW4sIHR5cGV9KSB7XG4gIGlmICghZG9tYWluIHx8ICF0eXBlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSBGSUxURVJfVFlQRVMucmFuZ2U6XG4gICAgY2FzZSBGSUxURVJfVFlQRVMudGltZVJhbmdlOlxuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSB8fCB2YWx1ZS5sZW5ndGggIT09IDIpIHtcbiAgICAgICAgcmV0dXJuIGRvbWFpbi5tYXAoZCA9PiBkKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHZhbHVlLm1hcCgoZCwgaSkgPT4gKG5vdE51bGxvclVuZGVmaW5lZChkKSAmJiBpc0luUmFuZ2UoZCwgZG9tYWluKSA/IGQgOiBkb21haW5baV0pKTtcblxuICAgIGNhc2UgRklMVEVSX1RZUEVTLm11bHRpU2VsZWN0OlxuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG4gICAgICBjb25zdCBmaWx0ZXJlZFZhbHVlID0gdmFsdWUuZmlsdGVyKGQgPT4gZG9tYWluLmluY2x1ZGVzKGQpKTtcbiAgICAgIHJldHVybiBmaWx0ZXJlZFZhbHVlLmxlbmd0aCA/IGZpbHRlcmVkVmFsdWUgOiBbXTtcblxuICAgIGNhc2UgRklMVEVSX1RZUEVTLnNlbGVjdDpcbiAgICAgIHJldHVybiBkb21haW4uaW5jbHVkZXModmFsdWUpID8gdmFsdWUgOiB0cnVlO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBudWxsO1xuICB9XG59XG4vKiBlc2xpbnQtZW5hYmxlIGNvbXBsZXhpdHkgKi9cblxuLyoqXG4gKiBDYWxjdWxhdGUgbnVtZXJpYyBkb21haW4gYW5kIHN1aXRhYmxlIHN0ZXBcbiAqXG4gKiBAcGFyYW0ge09iamVjdFtdfSBkYXRhXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSB2YWx1ZUFjY2Vzc29yXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBkb21haW4gYW5kIHN0ZXBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE51bWVyaWNGaWVsZERvbWFpbihkYXRhLCB2YWx1ZUFjY2Vzc29yKSB7XG4gIGxldCBkb21haW4gPSBbMCwgMV07XG4gIGxldCBzdGVwID0gMC4xO1xuXG4gIGNvbnN0IG1hcHBlZFZhbHVlID0gQXJyYXkuaXNBcnJheShkYXRhKSA/IGRhdGEubWFwKHZhbHVlQWNjZXNzb3IpIDogW107XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkgJiYgZGF0YS5sZW5ndGggPiAxKSB7XG4gICAgZG9tYWluID0gU2NhbGVVdGlscy5nZXRMaW5lYXJEb21haW4obWFwcGVkVmFsdWUpO1xuICAgIGNvbnN0IGRpZmYgPSBkb21haW5bMV0gLSBkb21haW5bMF07XG5cbiAgICAvLyBpbiBjYXNlIGVxdWFsIGRvbWFpbiwgWzk2LCA5Nl0sIHdoaWNoIHdpbGwgYnJlYWsgcXVhbnRpemUgc2NhbGVcbiAgICBpZiAoIWRpZmYpIHtcbiAgICAgIGRvbWFpblsxXSA9IGRvbWFpblswXSArIDE7XG4gICAgfVxuXG4gICAgc3RlcCA9IGdldE51bWVyaWNTdGVwU2l6ZShkaWZmKSB8fCBzdGVwO1xuICAgIGRvbWFpblswXSA9IGZvcm1hdE51bWJlckJ5U3RlcChkb21haW5bMF0sIHN0ZXAsICdmbG9vcicpO1xuICAgIGRvbWFpblsxXSA9IGZvcm1hdE51bWJlckJ5U3RlcChkb21haW5bMV0sIHN0ZXAsICdjZWlsJyk7XG4gIH1cblxuICBjb25zdCB7aGlzdG9ncmFtLCBlbmxhcmdlZEhpc3RvZ3JhbX0gPSBnZXRIaXN0b2dyYW0oZG9tYWluLCBtYXBwZWRWYWx1ZSk7XG5cbiAgcmV0dXJuIHtkb21haW4sIHN0ZXAsIGhpc3RvZ3JhbSwgZW5sYXJnZWRIaXN0b2dyYW19O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TnVtZXJpY1N0ZXBTaXplKGRpZmYpIHtcbiAgZGlmZiA9IE1hdGguYWJzKGRpZmYpO1xuXG4gIGlmIChkaWZmID4gMTAwKSB7XG4gICAgcmV0dXJuIDE7XG4gIH0gZWxzZSBpZiAoZGlmZiA+IDMpIHtcbiAgICByZXR1cm4gMC4wMTtcbiAgfSBlbHNlIGlmIChkaWZmID4gMSkge1xuICAgIHJldHVybiAwLjAwMTtcbiAgfSBlbHNlIGlmIChkaWZmIDw9IDEpIHtcbiAgICAvLyBUcnkgdG8gZ2V0IGF0IGxlYXN0IDEwMDAgc3RlcHMgLSBhbmQga2VlcCB0aGUgc3RlcCBzaXplIGJlbG93IHRoYXQgb2ZcbiAgICAvLyB0aGUgKGRpZmYgPiAxKSBjYXNlLlxuICAgIGNvbnN0IHggPSBkaWZmIC8gMTAwMDtcbiAgICAvLyBGaW5kIHRoZSBleHBvbmVudCBhbmQgdHJ1bmNhdGUgdG8gMTAgdG8gdGhlIHBvd2VyIG9mIHRoYXQgZXhwb25lbnRcblxuICAgIGNvbnN0IGV4cG9uZW50aWFsRm9ybSA9IHgudG9FeHBvbmVudGlhbCgpO1xuICAgIGNvbnN0IGV4cG9uZW50ID0gcGFyc2VGbG9hdChleHBvbmVudGlhbEZvcm0uc3BsaXQoJ2UnKVsxXSk7XG5cbiAgICAvLyBHZXR0aW5nIHJlYWR5IGZvciBub2RlIDEyXG4gICAgLy8gdGhpcyBpcyB3aHkgd2UgbmVlZCBkZWNpbWFsLmpzXG4gICAgLy8gTWF0aC5wb3coMTAsIC01KSA9IDAuMDAwMDA5OTk5OTk5OTk5OTk5OTk5XG4gICAgLy8gIHRoZSBhYm92ZSByZXN1bHQgc2hvd3MgaW4gYnJvd3NlciBhbmQgbm9kZSAxMFxuICAgIC8vICBub2RlIDEyIGJlaGF2ZXMgY29ycmVjdGx5XG5cbiAgICByZXR1cm4gbmV3IERlY2ltYWwoMTApLnBvdyhleHBvbmVudCkudG9OdW1iZXIoKTtcbiAgfVxufVxuXG4vKipcbiAqIENhbGN1bGF0ZSB0aW1lc3RhbXAgZG9tYWluIGFuZCBzdWl0YWJsZSBzdGVwXG4gKlxuICogQHBhcmFtIHtBcnJheTxBcnJheT59IGRhdGFcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHZhbHVlQWNjZXNzb3JcbiAqIEByZXR1cm5zIHt7XG4gKiAgZG9tYWluOiBBcnJheTxOdW1iZXI+LFxuICogIHN0ZXA6IE51bWJlcixcbiAqICBtYXBwZWRWYWx1ZTogQXJyYXk8TnVtYmVyPixcbiAqICBoaXN0b2dyYW06IEFycmF5PE9iamVjdD4sXG4gKiAgZW5sYXJnZWRIaXN0b2dyYW06IEFycmF5PE9iamVjdD5cbiAqIH19IHRpbWVzdGFtcCBmaWVsZCBkb21haW5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFRpbWVzdGFtcEZpZWxkRG9tYWluKGRhdGEsIHZhbHVlQWNjZXNzb3IpIHtcbiAgLy8gdG8gYXZvaWQgY29udmVydGluZyBzdHJpbmcgZm9ybWF0IHRpbWUgdG8gZXBvY2hcbiAgLy8gZXZlcnkgdGltZSB3ZSBjb21wYXJlIHdlIHN0b3JlIGEgdmFsdWUgbWFwcGVkIHRvIGludCBpbiBmaWx0ZXIgZG9tYWluXG5cbiAgY29uc3QgbWFwcGVkVmFsdWUgPSBBcnJheS5pc0FycmF5KGRhdGEpID8gZGF0YS5tYXAodmFsdWVBY2Nlc3NvcikgOiBbXTtcbiAgY29uc3QgZG9tYWluID0gU2NhbGVVdGlscy5nZXRMaW5lYXJEb21haW4obWFwcGVkVmFsdWUpO1xuICBsZXQgc3RlcCA9IDAuMDE7XG5cbiAgY29uc3QgZGlmZiA9IGRvbWFpblsxXSAtIGRvbWFpblswXTtcbiAgY29uc3QgZW50cnkgPSBUaW1lc3RhbXBTdGVwTWFwLmZpbmQoZiA9PiBmLm1heCA+PSBkaWZmKTtcbiAgaWYgKGVudHJ5KSB7XG4gICAgc3RlcCA9IGVudHJ5LnN0ZXA7XG4gIH1cblxuICBjb25zdCB7aGlzdG9ncmFtLCBlbmxhcmdlZEhpc3RvZ3JhbX0gPSBnZXRIaXN0b2dyYW0oZG9tYWluLCBtYXBwZWRWYWx1ZSk7XG5cbiAgcmV0dXJuIHtkb21haW4sIHN0ZXAsIG1hcHBlZFZhbHVlLCBoaXN0b2dyYW0sIGVubGFyZ2VkSGlzdG9ncmFtfTtcbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIHtBcnJheTxOdW1iZXI+fSBkb21haW5cbiAqIEBwYXJhbSB7QXJyYXk8TnVtYmVyPn0gbWFwcGVkVmFsdWVcbiAqIEBwYXJhbSB7TnVtYmVyfSBiaW5zXG4gKiBAcmV0dXJucyB7QXJyYXk8e2NvdW50OiBOdW1iZXIsIHgwOiBOdW1iZXIsIHgxOiBudW1iZXJ9Pn0gaGlzdG9ncmFtXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoaXN0b2dyYW1Db25zdHJ1Y3QoZG9tYWluLCBtYXBwZWRWYWx1ZSwgYmlucykge1xuICByZXR1cm4gZDNIaXN0b2dyYW0oKVxuICAgIC50aHJlc2hvbGRzKHRpY2tzKGRvbWFpblswXSwgZG9tYWluWzFdLCBiaW5zKSlcbiAgICAuZG9tYWluKGRvbWFpbikobWFwcGVkVmFsdWUpXG4gICAgLm1hcChiaW4gPT4gKHtcbiAgICAgIGNvdW50OiBiaW4ubGVuZ3RoLFxuICAgICAgeDA6IGJpbi54MCxcbiAgICAgIHgxOiBiaW4ueDFcbiAgICB9KSk7XG59XG4vKipcbiAqIENhbGN1bGF0ZSBoaXN0b2dyYW0gZnJvbSBkb21haW4gYW5kIGFycmF5IG9mIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7QXJyYXk8TnVtYmVyPn0gZG9tYWluXG4gKiBAcGFyYW0ge0FycmF5PE9iamVjdD59IG1hcHBlZFZhbHVlXG4gKiBAcmV0dXJucyB7e2hpc3RvZ3JhbTogQXJyYXk8T2JqZWN0PiwgZW5sYXJnZWRIaXN0b2dyYW06IEFycmF5PE9iamVjdD59fSAyIHNldHMgb2YgaGlzdG9ncmFtXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRIaXN0b2dyYW0oZG9tYWluLCBtYXBwZWRWYWx1ZSkge1xuICBjb25zdCBoaXN0b2dyYW0gPSBoaXN0b2dyYW1Db25zdHJ1Y3QoZG9tYWluLCBtYXBwZWRWYWx1ZSwgaGlzdG9ncmFtQmlucyk7XG4gIGNvbnN0IGVubGFyZ2VkSGlzdG9ncmFtID0gaGlzdG9ncmFtQ29uc3RydWN0KGRvbWFpbiwgbWFwcGVkVmFsdWUsIGVubGFyZ2VkSGlzdG9ncmFtQmlucyk7XG5cbiAgcmV0dXJuIHtoaXN0b2dyYW0sIGVubGFyZ2VkSGlzdG9ncmFtfTtcbn1cblxuLyoqXG4gKiByb3VuZCBudW1iZXIgYmFzZWQgb24gc3RlcFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSB2YWxcbiAqIEBwYXJhbSB7TnVtYmVyfSBzdGVwXG4gKiBAcGFyYW0ge3N0cmluZ30gYm91bmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHJvdW5kZWQgbnVtYmVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXROdW1iZXJCeVN0ZXAodmFsLCBzdGVwLCBib3VuZCkge1xuICBpZiAoYm91bmQgPT09ICdmbG9vcicpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcih2YWwgKiAoMSAvIHN0ZXApKSAvICgxIC8gc3RlcCk7XG4gIH1cblxuICByZXR1cm4gTWF0aC5jZWlsKHZhbCAqICgxIC8gc3RlcCkpIC8gKDEgLyBzdGVwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzSW5SYW5nZSh2YWwsIGRvbWFpbikge1xuICBpZiAoIUFycmF5LmlzQXJyYXkoZG9tYWluKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB2YWwgPj0gZG9tYWluWzBdICYmIHZhbCA8PSBkb21haW5bMV07XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIGEgcG9pbnQgaXMgd2l0aGluIHRoZSBwcm92aWRlZCBwb2x5Z29uXG4gKlxuICogQHBhcmFtIHBvaW50IGFzIGlucHV0IHNlYXJjaCBbbGF0LCBsbmddXG4gKiBAcGFyYW0gcG9seWdvbiBQb2ludHMgbXVzdCBiZSB3aXRoaW4gdGhlc2UgKE11bHRpKVBvbHlnb24ocylcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0luUG9seWdvbihwb2ludCwgcG9seWdvbikge1xuICByZXR1cm4gYm9vbGVhbldpdGhpbih0dXJmUG9pbnQocG9pbnQpLCBwb2x5Z29uKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRpbWVXaWRnZXRUaXRsZUZvcm1hdHRlcihkb21haW4pIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGRvbWFpbikpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IGRpZmYgPSBkb21haW5bMV0gLSBkb21haW5bMF07XG4gIHJldHVybiBkaWZmID4gZHVyYXRpb25ZZWFyXG4gICAgPyAnTU0vREQvWVknXG4gICAgOiBkaWZmID4gZHVyYXRpb25EYXlcbiAgICA/ICdNTS9ERC9ZWSBoaDptbWEnXG4gICAgOiAnTU0vREQvWVkgaGg6bW06c3NhJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRpbWVXaWRnZXRIaW50Rm9ybWF0dGVyKGRvbWFpbikge1xuICBpZiAoIUFycmF5LmlzQXJyYXkoZG9tYWluKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgZGlmZiA9IGRvbWFpblsxXSAtIGRvbWFpblswXTtcbiAgcmV0dXJuIGRpZmYgPiBkdXJhdGlvblllYXJcbiAgICA/ICdNTS9ERC9ZWSdcbiAgICA6IGRpZmYgPiBkdXJhdGlvbldlZWtcbiAgICA/ICdNTS9ERCdcbiAgICA6IGRpZmYgPiBkdXJhdGlvbkRheVxuICAgID8gJ01NL0REIGhoYSdcbiAgICA6IGRpZmYgPiBkdXJhdGlvbkhvdXJcbiAgICA/ICdoaDptbWEnXG4gICAgOiAnaGg6bW06c3NhJztcbn1cblxuLyoqXG4gKiBTYW5pdHkgY2hlY2sgb24gZmlsdGVycyB0byBwcmVwYXJlIGZvciBzYXZlXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIGZpbHRlciB0eXBlXG4gKiBAcGFyYW0geyp9IHZhbHVlIC0gZmlsdGVyIHZhbHVlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gd2hldGhlciBmaWx0ZXIgaXMgdmFsdWVcbiAqL1xuLyogZXNsaW50LWRpc2FibGUgY29tcGxleGl0eSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWRGaWx0ZXJWYWx1ZSh0eXBlLCB2YWx1ZSkge1xuICBpZiAoIXR5cGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSBGSUxURVJfVFlQRVMuc2VsZWN0OlxuICAgICAgcmV0dXJuIHZhbHVlID09PSB0cnVlIHx8IHZhbHVlID09PSBmYWxzZTtcblxuICAgIGNhc2UgRklMVEVSX1RZUEVTLnJhbmdlOlxuICAgIGNhc2UgRklMVEVSX1RZUEVTLnRpbWVSYW5nZTpcbiAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5ldmVyeSh2ID0+IHYgIT09IG51bGwgJiYgIWlzTmFOKHYpKTtcblxuICAgIGNhc2UgRklMVEVSX1RZUEVTLm11bHRpU2VsZWN0OlxuICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpICYmIEJvb2xlYW4odmFsdWUubGVuZ3RoKTtcblxuICAgIGNhc2UgRklMVEVSX1RZUEVTLmlucHV0OlxuICAgICAgcmV0dXJuIEJvb2xlYW4odmFsdWUubGVuZ3RoKTtcblxuICAgIGNhc2UgRklMVEVSX1RZUEVTLnBvbHlnb246XG4gICAgICBjb25zdCBjb29yZGluYXRlcyA9IGdldCh2YWx1ZSwgWydnZW9tZXRyeScsICdjb29yZGluYXRlcyddKTtcbiAgICAgIHJldHVybiBCb29sZWFuKHZhbHVlICYmIHZhbHVlLmlkICYmIGNvb3JkaW5hdGVzKTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmlsdGVyUGxvdChmaWx0ZXIsIGFsbERhdGEpIHtcbiAgaWYgKGZpbHRlci5wbG90VHlwZSA9PT0gUExPVF9UWVBFUy5oaXN0b2dyYW0gfHwgIWZpbHRlci55QXhpcykge1xuICAgIC8vIGhpc3RvZ3JhbSBzaG91bGQgYmUgY2FsY3VsYXRlZCB3aGVuIGNyZWF0ZSBmaWx0ZXJcbiAgICByZXR1cm4ge307XG4gIH1cblxuICBjb25zdCB7bWFwcGVkVmFsdWV9ID0gZmlsdGVyO1xuICBjb25zdCB7eUF4aXN9ID0gZmlsdGVyO1xuXG4gIC8vIHJldHVybiBsaW5lQ2hhcnRcbiAgY29uc3Qgc2VyaWVzID0gYWxsRGF0YVxuICAgIC5tYXAoKGQsIGkpID0+ICh7XG4gICAgICB4OiBtYXBwZWRWYWx1ZVtpXSxcbiAgICAgIHk6IGRbeUF4aXMudGFibGVGaWVsZEluZGV4IC0gMV1cbiAgICB9KSlcbiAgICAuZmlsdGVyKCh7eCwgeX0pID0+IE51bWJlci5pc0Zpbml0ZSh4KSAmJiBOdW1iZXIuaXNGaW5pdGUoeSkpXG4gICAgLnNvcnQoKGEsIGIpID0+IGFzY2VuZGluZyhhLngsIGIueCkpO1xuXG4gIGNvbnN0IHlEb21haW4gPSBleHRlbnQoc2VyaWVzLCBkID0+IGQueSk7XG4gIGNvbnN0IHhEb21haW4gPSBbc2VyaWVzWzBdLngsIHNlcmllc1tzZXJpZXMubGVuZ3RoIC0gMV0ueF07XG5cbiAgcmV0dXJuIHtsaW5lQ2hhcnQ6IHtzZXJpZXMsIHlEb21haW4sIHhEb21haW59LCB5QXhpc307XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREZWZhdWx0RmlsdGVyUGxvdFR5cGUoZmlsdGVyKSB7XG4gIGNvbnN0IGZpbHRlclBsb3RUeXBlcyA9IFN1cHBvcnRlZFBsb3RUeXBlW2ZpbHRlci50eXBlXTtcbiAgaWYgKCFmaWx0ZXJQbG90VHlwZXMpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmICghZmlsdGVyLnlBeGlzKSB7XG4gICAgcmV0dXJuIGZpbHRlclBsb3RUeXBlcy5kZWZhdWx0O1xuICB9XG5cbiAgcmV0dXJuIGZpbHRlclBsb3RUeXBlc1tmaWx0ZXIueUF4aXMudHlwZV0gfHwgbnVsbDtcbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIGRhdGFzZXRJZHMgbGlzdCBvZiBkYXRhc2V0IGlkcyB0byBiZSBmaWx0ZXJlZFxuICogQHBhcmFtIGRhdGFzZXRzIGFsbCBkYXRhc2V0c1xuICogQHBhcmFtIGZpbHRlcnMgYWxsIGZpbHRlcnMgdG8gYmUgYXBwbGllZCB0byBkYXRhc2V0c1xuICogQHJldHVybiB7e1tkYXRhc2V0SWQ6IHN0cmluZ106IE9iamVjdH19IGRhdGFzZXRzIC0gbmV3IHVwZGF0ZWQgZGF0YXNldHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5RmlsdGVyc1RvRGF0YXNldHMoZGF0YXNldElkcywgZGF0YXNldHMsIGZpbHRlcnMsIGxheWVycykge1xuICBjb25zdCBkYXRhSWRzID0gdG9BcnJheShkYXRhc2V0SWRzKTtcbiAgcmV0dXJuIGRhdGFJZHMucmVkdWNlKChhY2MsIGRhdGFJZCkgPT4ge1xuICAgIGNvbnN0IGxheWVyc1RvRmlsdGVyID0gKGxheWVycyB8fCBbXSkuZmlsdGVyKGwgPT4gbC5jb25maWcuZGF0YUlkID09PSBkYXRhSWQpO1xuICAgIGNvbnN0IGFwcGxpZWRGaWx0ZXJzID0gZmlsdGVycy5maWx0ZXIoZCA9PiBzaG91bGRBcHBseUZpbHRlcihkLCBkYXRhSWQpKTtcblxuICAgIHJldHVybiB7XG4gICAgICAuLi5hY2MsXG4gICAgICBbZGF0YUlkXTogZmlsdGVyRGF0YXNldChkYXRhc2V0c1tkYXRhSWRdLCBhcHBsaWVkRmlsdGVycywgbGF5ZXJzVG9GaWx0ZXIpXG4gICAgfTtcbiAgfSwgZGF0YXNldHMpO1xufVxuXG4vKipcbiAqIEFwcGxpZXMgYSBuZXcgZmllbGQgbmFtZSB2YWx1ZSB0byBmaWVsdGVyIGFuZCB1cGRhdGUgYm90aCBmaWx0ZXIgYW5kIGRhdGFzZXRcbiAqIEBwYXJhbSB7T2JqZWN0fSBmaWx0ZXIgLSB0byBiZSBhcHBsaWVkIHRoZSBuZXcgZmllbGQgbmFtZSBvblxuICogQHBhcmFtIHtPYmplY3R9IGRhdGFzZXQgLSBkYXRhc2V0IHRoZSBmaWVsZCBiZWxvbmdzIHRvXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lIC0gZmllbGQubmFtZVxuICogQHBhcmFtIHtOdW1iZXJ9IGZpbHRlckRhdGFzZXRJbmRleCAtIGZpZWxkLm5hbWVcbiAqIEBwYXJhbSB7TnVtYmVyfSBmaWx0ZXJzIC0gY3VycmVudFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvblxuICogQHJldHVybiB7T2JqZWN0fSB7ZmlsdGVyLCBkYXRhc2V0c31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5RmlsdGVyRmllbGROYW1lKFxuICBmaWx0ZXIsXG4gIGRhdGFzZXQsXG4gIGZpZWxkTmFtZSxcbiAgZmlsdGVyRGF0YXNldEluZGV4ID0gMCxcbiAge21lcmdlRG9tYWluID0gZmFsc2V9ID0ge31cbikge1xuICAvLyB1c2luZyBmaWx0ZXJEYXRhc2V0SW5kZXggd2UgY2FuIGZpbHRlciBvbmx5IHRoZSBzcGVjaWZpZWQgZGF0YXNldFxuICBjb25zdCB7ZmllbGRzLCBhbGxEYXRhfSA9IGRhdGFzZXQ7XG5cbiAgY29uc3QgZmllbGRJbmRleCA9IGZpZWxkcy5maW5kSW5kZXgoZiA9PiBmLm5hbWUgPT09IGZpZWxkTmFtZSk7XG4gIC8vIGlmIG5vIGZpZWxkIHdpdGggc2FtZSBuYW1lIGlzIGZvdW5kLCBtb3ZlIHRvIHRoZSBuZXh0IGRhdGFzZXRzXG4gIGlmIChmaWVsZEluZGV4ID09PSAtMSkge1xuICAgIC8vIHRocm93IG5ldyBFcnJvcihgZmllbGRJbmRleCBub3QgZm91bmQuIERhdGFzZXQgbXVzdCBjb250YWluIGEgcHJvcGVydHkgd2l0aCBuYW1lOiAke2ZpZWxkTmFtZX1gKTtcbiAgICByZXR1cm4ge2ZpbHRlcjogbnVsbCwgZGF0YXNldH07XG4gIH1cblxuICAvLyBUT0RPOiB2YWxpZGF0ZSBmaWVsZCB0eXBlXG4gIGNvbnN0IGZpZWxkID0gZmllbGRzW2ZpZWxkSW5kZXhdO1xuICBjb25zdCBmaWx0ZXJQcm9wcyA9IGZpZWxkLmhhc093blByb3BlcnR5KCdmaWx0ZXJQcm9wcycpXG4gICAgPyBmaWVsZC5maWx0ZXJQcm9wc1xuICAgIDogZ2V0RmlsdGVyUHJvcHMoYWxsRGF0YSwgZmllbGQpO1xuXG4gIGNvbnN0IG5ld0ZpbHRlciA9IHtcbiAgICAuLi4obWVyZ2VEb21haW4gPyBtZXJnZUZpbHRlckRvbWFpblN0ZXAoZmlsdGVyLCBmaWx0ZXJQcm9wcykgOiB7Li4uZmlsdGVyLCAuLi5maWx0ZXJQcm9wc30pLFxuICAgIG5hbWU6IE9iamVjdC5hc3NpZ24oW10uY29uY2F0KGZpbHRlci5uYW1lKSwge1tmaWx0ZXJEYXRhc2V0SW5kZXhdOiBmaWVsZC5uYW1lfSksXG4gICAgZmllbGRJZHg6IE9iamVjdC5hc3NpZ24oW10uY29uY2F0KGZpbHRlci5maWVsZElkeCksIHtcbiAgICAgIFtmaWx0ZXJEYXRhc2V0SW5kZXhdOiBmaWVsZC50YWJsZUZpZWxkSW5kZXggLSAxXG4gICAgfSksXG4gICAgLy8gVE9ETywgc2luY2Ugd2UgYWxsb3cgdG8gYWRkIG11bHRpcGxlIGZpZWxkcyB0byBhIGZpbHRlciB3ZSBjYW4gbm8gbG9uZ2VyIGZyZWV6ZSB0aGUgZmlsdGVyXG4gICAgZnJlZXplOiB0cnVlXG4gIH07XG5cbiAgY29uc3QgZmllbGRXaXRoRmlsdGVyUHJvcHMgPSB7XG4gICAgLi4uZmllbGQsXG4gICAgZmlsdGVyUHJvcHNcbiAgfTtcblxuICBjb25zdCBuZXdGaWVsZHMgPSBPYmplY3QuYXNzaWduKFtdLmNvbmNhdChmaWVsZHMpLCB7W2ZpZWxkSW5kZXhdOiBmaWVsZFdpdGhGaWx0ZXJQcm9wc30pO1xuXG4gIHJldHVybiB7XG4gICAgZmlsdGVyOiBuZXdGaWx0ZXIsXG4gICAgZGF0YXNldDoge1xuICAgICAgLi4uZGF0YXNldCxcbiAgICAgIGZpZWxkczogbmV3RmllbGRzXG4gICAgfVxuICB9O1xufVxuXG4vKipcbiAqIE1lcmdlIG9uZSBmaWx0ZXIgd2l0aCBvdGhlciBmaWx0ZXIgcHJvcCBkb21haW5cbiAqIEBwYXJhbSBmaWx0ZXJcbiAqIEBwYXJhbSBmaWx0ZXJQcm9wc1xuICogQHBhcmFtIGZpZWxkSW5kZXhcbiAqIEBwYXJhbSBkYXRhc2V0SW5kZXhcbiAqIEByZXR1cm4geyp9XG4gKi9cbi8qIGVzbGludC1kaXNhYmxlIGNvbXBsZXhpdHkgKi9cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZUZpbHRlckRvbWFpblN0ZXAoZmlsdGVyLCBmaWx0ZXJQcm9wcykge1xuICBpZiAoIWZpbHRlcikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgaWYgKCFmaWx0ZXJQcm9wcykge1xuICAgIHJldHVybiBmaWx0ZXI7XG4gIH1cblxuICBpZiAoKGZpbHRlci5maWVsZFR5cGUgJiYgZmlsdGVyLmZpZWxkVHlwZSAhPT0gZmlsdGVyUHJvcHMuZmllbGRUeXBlKSB8fCAhZmlsdGVyUHJvcHMuZG9tYWluKSB7XG4gICAgcmV0dXJuIGZpbHRlcjtcbiAgfVxuXG4gIGNvbnN0IGNvbWJpbmVkRG9tYWluID0gIWZpbHRlci5kb21haW5cbiAgICA/IGZpbHRlclByb3BzLmRvbWFpblxuICAgIDogWy4uLihmaWx0ZXIuZG9tYWluIHx8IFtdKSwgLi4uKGZpbHRlclByb3BzLmRvbWFpbiB8fCBbXSldLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcblxuICBjb25zdCBuZXdGaWx0ZXIgPSB7XG4gICAgLi4uZmlsdGVyLFxuICAgIC4uLmZpbHRlclByb3BzLFxuICAgIGRvbWFpbjogW2NvbWJpbmVkRG9tYWluWzBdLCBjb21iaW5lZERvbWFpbltjb21iaW5lZERvbWFpbi5sZW5ndGggLSAxXV1cbiAgfTtcblxuICBzd2l0Y2ggKGZpbHRlclByb3BzLmZpZWxkVHlwZSkge1xuICAgIGNhc2UgQUxMX0ZJRUxEX1RZUEVTLnN0cmluZzpcbiAgICBjYXNlIEFMTF9GSUVMRF9UWVBFUy5kYXRlOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4ubmV3RmlsdGVyLFxuICAgICAgICBkb21haW46IHVuaXF1ZShjb21iaW5lZERvbWFpbikuc29ydCgpXG4gICAgICB9O1xuXG4gICAgY2FzZSBBTExfRklFTERfVFlQRVMudGltZXN0YW1wOlxuICAgICAgY29uc3Qgc3RlcCA9IGZpbHRlci5zdGVwIDwgZmlsdGVyUHJvcHMuc3RlcCA/IGZpbHRlci5zdGVwIDogZmlsdGVyUHJvcHMuc3RlcDtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4ubmV3RmlsdGVyLFxuICAgICAgICBzdGVwXG4gICAgICB9O1xuICAgIGNhc2UgQUxMX0ZJRUxEX1RZUEVTLnJlYWw6XG4gICAgY2FzZSBBTExfRklFTERfVFlQRVMuaW50ZWdlcjpcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG5ld0ZpbHRlcjtcbiAgfVxufVxuLyogZXNsaW50LWVuYWJsZSBjb21wbGV4aXR5ICovXG5cbmV4cG9ydCBjb25zdCBmZWF0dXJlVG9GaWx0ZXJWYWx1ZSA9IChmZWF0dXJlLCBmaWx0ZXJJZCwgcHJvcGVydGllcyA9IHt9KSA9PiAoe1xuICAuLi5mZWF0dXJlLFxuICBpZDogZmVhdHVyZS5pZCxcbiAgcHJvcGVydGllczoge1xuICAgIC4uLmZlYXR1cmUucHJvcGVydGllcyxcbiAgICAuLi5wcm9wZXJ0aWVzLFxuICAgIGZpbHRlcklkXG4gIH1cbn0pO1xuXG5leHBvcnQgY29uc3QgZ2V0RmlsdGVySWRJbkZlYXR1cmUgPSBmID0+IGdldChmLCBbJ3Byb3BlcnRpZXMnLCAnZmlsdGVySWQnXSk7XG5cbi8qKlxuICogR2VuZXJhdGVzIHBvbHlnb24gZmlsdGVyXG4gKiBAcGFyYW0gbGF5ZXJzIGFycmF5IG9mIGxheWVyc1xuICogQHBhcmFtIGZlYXR1cmUgcG9seWdvbiB0byB1c2VcbiAqIEByZXR1cm4ge29iamVjdH0gZmlsdGVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVBvbHlnb25GaWx0ZXIobGF5ZXJzLCBmZWF0dXJlKSB7XG4gIGNvbnN0IHtkYXRhSWQsIGxheWVySWQsIG5hbWV9ID0gbGF5ZXJzLnJlZHVjZShcbiAgICAoYWNjLCBsYXllcikgPT4gKHtcbiAgICAgIC4uLmFjYyxcbiAgICAgIGRhdGFJZDogWy4uLmFjYy5kYXRhSWQsIGxheWVyLmNvbmZpZy5kYXRhSWRdLFxuICAgICAgbGF5ZXJJZDogWy4uLmFjYy5sYXllcklkLCBsYXllci5pZF0sXG4gICAgICBuYW1lOiBbLi4uYWNjLm5hbWUsIGxheWVyLmNvbmZpZy5sYWJlbF1cbiAgICB9KSxcbiAgICB7XG4gICAgICBkYXRhSWQ6IFtdLFxuICAgICAgbGF5ZXJJZDogW10sXG4gICAgICBuYW1lOiBbXVxuICAgIH1cbiAgKTtcblxuICBjb25zdCBmaWx0ZXIgPSBnZXREZWZhdWx0RmlsdGVyKGRhdGFJZCk7XG4gIHJldHVybiB7XG4gICAgLi4uZmlsdGVyLFxuICAgIGZpeGVkRG9tYWluOiB0cnVlLFxuICAgIHR5cGU6IEZJTFRFUl9UWVBFUy5wb2x5Z29uLFxuICAgIG5hbWUsXG4gICAgbGF5ZXJJZCxcbiAgICB2YWx1ZTogZmVhdHVyZVRvRmlsdGVyVmFsdWUoZmVhdHVyZSwgZmlsdGVyLmlkLCB7aXNWaXNpYmxlOiB0cnVlfSlcbiAgfTtcbn1cblxuLyoqXG4gKiBSdW4gZmlsdGVyIGVudGlyZWx5IG9uIENQVVxuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIC0gdmlzU3RhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhSWRcbiAqIEByZXR1cm4ge09iamVjdH0gc3RhdGUgc3RhdGUgd2l0aCB1cGRhdGVkIGRhdGFzZXRzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXJEYXRhc2V0Q1BVKHN0YXRlLCBkYXRhSWQpIHtcbiAgY29uc3QgZGF0YXNldEZpbHRlcnMgPSBzdGF0ZS5maWx0ZXJzLmZpbHRlcihmID0+IGYuZGF0YUlkLmluY2x1ZGVzKGRhdGFJZCkpO1xuICBjb25zdCBzZWxlY3RlZERhdGFzZXQgPSBzdGF0ZS5kYXRhc2V0c1tkYXRhSWRdO1xuXG4gIGlmICghc2VsZWN0ZWREYXRhc2V0KSB7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgY29uc3Qgb3B0ID0ge1xuICAgIGNwdU9ubHk6IHRydWUsXG4gICAgaWdub3JlRG9tYWluOiB0cnVlXG4gIH07XG5cbiAgaWYgKCFkYXRhc2V0RmlsdGVycy5sZW5ndGgpIHtcbiAgICAvLyBubyBmaWx0ZXJcbiAgICBjb25zdCBmaWx0ZXJlZCA9IHtcbiAgICAgIC4uLnNlbGVjdGVkRGF0YXNldCxcbiAgICAgIGZpbHRlcmVkSWR4Q1BVOiBzZWxlY3RlZERhdGFzZXQuYWxsSW5kZXhlcyxcbiAgICAgIGZpbHRlclJlY29yZENQVTogZ2V0RmlsdGVyUmVjb3JkKGRhdGFJZCwgc3RhdGUuZmlsdGVycywgb3B0KVxuICAgIH07XG5cbiAgICByZXR1cm4gc2V0KFsnZGF0YXNldHMnLCBkYXRhSWRdLCBmaWx0ZXJlZCwgc3RhdGUpO1xuICB9XG5cbiAgLy8gbm8gZ3B1IGZpbHRlclxuICBpZiAoIWRhdGFzZXRGaWx0ZXJzLmZpbmQoZiA9PiBmLmdwdSkpIHtcbiAgICBjb25zdCBmaWx0ZXJlZCA9IHtcbiAgICAgIC4uLnNlbGVjdGVkRGF0YXNldCxcbiAgICAgIGZpbHRlcmVkSWR4Q1BVOiBzZWxlY3RlZERhdGFzZXQuZmlsdGVyZWRJbmRleCxcbiAgICAgIGZpbHRlclJlY29yZENQVTogZ2V0RmlsdGVyUmVjb3JkKGRhdGFJZCwgc3RhdGUuZmlsdGVycywgb3B0KVxuICAgIH07XG4gICAgcmV0dXJuIHNldChbJ2RhdGFzZXRzJywgZGF0YUlkXSwgZmlsdGVyZWQsIHN0YXRlKTtcbiAgfVxuXG4gIC8vIG1ha2UgYSBjb3B5IGZvciBjcHUgZmlsdGVyaW5nXG4gIGNvbnN0IGNvcGllZCA9IHtcbiAgICAuLi5zZWxlY3RlZERhdGFzZXQsXG4gICAgZmlsdGVyUmVjb3JkOiBzZWxlY3RlZERhdGFzZXQuZmlsdGVyUmVjb3JkQ1BVLFxuICAgIGZpbHRlcmVkSW5kZXg6IHNlbGVjdGVkRGF0YXNldC5maWx0ZXJlZElkeENQVVxuICB9O1xuXG4gIGNvbnN0IGZpbHRlcmVkID0gZmlsdGVyRGF0YXNldChjb3BpZWQsIHN0YXRlLmZpbHRlcnMsIHN0YXRlLmxheWVycywgb3B0KTtcblxuICBjb25zdCBjcHVGaWx0ZXJlZERhdGFzZXQgPSB7XG4gICAgLi4uc2VsZWN0ZWREYXRhc2V0LFxuICAgIGZpbHRlcmVkSWR4Q1BVOiBmaWx0ZXJlZC5maWx0ZXJlZEluZGV4LFxuICAgIGZpbHRlclJlY29yZENQVTogZmlsdGVyZWQuZmlsdGVyUmVjb3JkXG4gIH07XG5cbiAgcmV0dXJuIHNldChbJ2RhdGFzZXRzJywgZGF0YUlkXSwgY3B1RmlsdGVyZWREYXRhc2V0LCBzdGF0ZSk7XG59XG4iXX0=