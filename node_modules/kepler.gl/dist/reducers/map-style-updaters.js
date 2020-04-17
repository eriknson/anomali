"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMapStyles = getMapStyles;
exports.getInitialInputStyle = getInitialInputStyle;
exports.set3dBuildingColorUpdater = exports.addCustomMapStyleUpdater = exports.inputMapStyleUpdater = exports.loadCustomMapStyleUpdater = exports.resetMapConfigMapStyleUpdater = exports.receiveMapConfigUpdater = exports.requestMapStylesUpdater = exports.loadMapStyleErrUpdater = exports.loadMapStylesUpdater = exports.mapStyleChangeUpdater = exports.mapConfigChangeUpdater = exports.initMapStyleUpdater = exports.INITIAL_MAP_STYLE = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _tasks = _interopRequireWildcard(require("react-palm/tasks"));

var _lodash = _interopRequireDefault(require("lodash.clonedeep"));

var _mapboxGlStyleEditor = require("../utils/map-style-utils/mapbox-gl-style-editor");

var _defaultSettings = require("../constants/default-settings");

var _utils = require("../utils/utils");

var _tasks2 = require("../tasks/tasks");

var _mapStyleActions = require("../actions/map-style-actions");

var _d3Color = require("d3-color");

var _colorUtils = require("../utils/color-utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var DEFAULT_BLDG_COLOR = '#D1CEC7';

var getDefaultState = function getDefaultState() {
  var visibleLayerGroups = {};
  var styleType = 'dark';
  var topLayerGroups = {};
  return {
    styleType: styleType,
    visibleLayerGroups: visibleLayerGroups,
    topLayerGroups: topLayerGroups,
    mapStyles: _defaultSettings.DEFAULT_MAP_STYLES.reduce(function (accu, curr) {
      return _objectSpread({}, accu, (0, _defineProperty2["default"])({}, curr.id, curr));
    }, {}),
    // save mapbox access token
    mapboxApiAccessToken: null,
    mapboxApiUrl: _defaultSettings.DEFAULT_MAPBOX_API_URL,
    mapStylesReplaceDefault: false,
    inputStyle: getInitialInputStyle(),
    threeDBuildingColor: (0, _colorUtils.hexToRgb)(DEFAULT_BLDG_COLOR),
    custom3DBuildingColor: false
  };
};
/**
 * Updaters for `mapStyle`. Can be used in your root reducer to directly modify kepler.gl's state.
 * Read more about [Using updaters](../advanced-usage/using-updaters.md)
 * @public
 * @example
 *
 * import keplerGlReducer, {mapStyleUpdaters} from 'kepler.gl/reducers';
 * // Root Reducer
 * const reducers = combineReducers({
 *  keplerGl: keplerGlReducer,
 *  app: appReducer
 * });
 *
 * const composedReducer = (state, action) => {
 *  switch (action.type) {
 *    // click button to hide label from background map
 *    case 'CLICK_BUTTON':
 *      return {
 *        ...state,
 *        keplerGl: {
 *          ...state.keplerGl,
 *          foo: {
 *             ...state.keplerGl.foo,
 *             mapStyle: mapStyleUpdaters.mapConfigChangeUpdater(
 *               mapStyle,
 *               {payload: {visibleLayerGroups: {label: false, road: true, background: true}}}
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


var mapStyleUpdaters = null;
/* eslint-enable no-unused-vars */

/**
 * Default initial `mapStyle`
 * @memberof mapStyleUpdaters
 * @constant
 * @property {string} styleType - Default: `'dark'`
 * @property {Object} visibleLayerGroups - Default: `{}`
 * @property {Object} topLayerGroups - Default: `{}`
 * @property {Object} mapStyles - mapping from style key to style object
 * @property {string} mapboxApiAccessToken - Default: `null`
 * @Property {string} mapboxApiUrl - Default null
 * @Property {Boolean} mapStylesReplaceDefault - Default: `false`
 * @property {Object} inputStyle - Default: `{}`
 * @property {Array} threeDBuildingColor - Default: `[r, g, b]`
 * @public
 */

var INITIAL_MAP_STYLE = getDefaultState();
/**
 * Create two map styles from preset map style, one for top map one for bottom
 *
 * @param {string} styleType - current map style
 * @param {Object} visibleLayerGroups - visible layers of bottom map
 * @param {Object} topLayerGroups - visible layers of top map
 * @param {Object} mapStyles - a dictionary of all map styles
 * @returns {Object} bottomMapStyle | topMapStyle | isRaster
 */

exports.INITIAL_MAP_STYLE = INITIAL_MAP_STYLE;

function getMapStyles(_ref) {
  var styleType = _ref.styleType,
      visibleLayerGroups = _ref.visibleLayerGroups,
      topLayerGroups = _ref.topLayerGroups,
      mapStyles = _ref.mapStyles;
  var mapStyle = mapStyles[styleType]; // style might not be loaded yet

  if (!mapStyle || !mapStyle.style) {
    return {};
  }

  var editable = Object.keys(visibleLayerGroups).length;
  var bottomMapStyle = !editable ? mapStyle.style : (0, _mapboxGlStyleEditor.editBottomMapStyle)({
    id: styleType,
    mapStyle: mapStyle,
    visibleLayerGroups: visibleLayerGroups
  });
  var hasTopLayer = editable && Object.values(topLayerGroups).some(function (v) {
    return v;
  }); // mute top layer if not visible in bottom layer

  var topLayers = hasTopLayer && Object.keys(topLayerGroups).reduce(function (accu, key) {
    return _objectSpread({}, accu, (0, _defineProperty2["default"])({}, key, topLayerGroups[key] && visibleLayerGroups[key]));
  }, {});
  var topMapStyle = hasTopLayer ? (0, _mapboxGlStyleEditor.editTopMapStyle)({
    id: styleType,
    mapStyle: mapStyle,
    visibleLayerGroups: topLayers
  }) : null;
  return {
    bottomMapStyle: bottomMapStyle,
    topMapStyle: topMapStyle,
    editable: editable
  };
}

function findLayerFillColor(layer) {
  return layer && layer.paint && layer.paint['background-color'];
}

function get3DBuildingColor(style) {
  // set building color to be the same as the background color.
  if (!style.style) {
    return (0, _colorUtils.hexToRgb)(DEFAULT_BLDG_COLOR);
  }

  var backgroundLayer = (style.style.layers || []).find(function (_ref2) {
    var id = _ref2.id;
    return id === 'background';
  });
  var buildingLayer = (style.style.layers || []).find(function (_ref3) {
    var id = _ref3.id;
    return id.match(/building/);
  });
  var buildingColor = findLayerFillColor(buildingLayer) || findLayerFillColor(backgroundLayer) || DEFAULT_BLDG_COLOR; // brighten or darken building based on style

  var operation = style.id.match(/(?=(dark|night))/) ? 'brighter' : 'darker';
  var alpha = 0.2;
  var rgbObj = (0, _d3Color.rgb)(buildingColor)[operation]([alpha]);
  return [rgbObj.r, rgbObj.g, rgbObj.b];
}

function getLayerGroupsFromStyle(style) {
  return Array.isArray(style.layers) ? _defaultSettings.DEFAULT_LAYER_GROUPS.filter(function (lg) {
    return style.layers.filter(lg.filter).length;
  }) : [];
} // Updaters

/**
 * Propagate `mapStyle` reducer with `mapboxApiAccessToken` and `mapStylesReplaceDefault`.
 * if mapStylesReplaceDefault is true mapStyles is emptied; loadMapStylesUpdater() will
 * populate mapStyles.
 *
 * @memberof mapStyleUpdaters
 * @param {Object} state
 * @param {Object} action
 * @param {Object} action.payload
 * @param {string} action.payload.mapboxApiAccessToken
 * @returns {Object} nextState
 * @public
 */


var initMapStyleUpdater = function initMapStyleUpdater(state, action) {
  return _objectSpread({}, state, {
    // save mapbox access token to map style state
    mapboxApiAccessToken: (action.payload || {}).mapboxApiAccessToken,
    mapboxApiUrl: (action.payload || {}).mapboxApiUrl || state.mapboxApiUrl,
    mapStyles: action.payload && !action.payload.mapStylesReplaceDefault ? state.mapStyles : {},
    mapStylesReplaceDefault: action.payload.mapStylesReplaceDefault || false
  });
}; // });

/**
 * Update `visibleLayerGroups`to change layer group visibility
 * @memberof mapStyleUpdaters
 * @param {Object} state `mapStyle`
 * @param {Object} action
 * @param {Object} action.payload new config `{visibleLayerGroups: {label: false, road: true, background: true}}`
 * @returns {Object} nextState
 * @public
 */


exports.initMapStyleUpdater = initMapStyleUpdater;

var mapConfigChangeUpdater = function mapConfigChangeUpdater(state, action) {
  return _objectSpread({}, state, {}, action.payload, {}, getMapStyles(_objectSpread({}, state, {}, action.payload)));
};
/**
 * Change to another map style. The selected style should already been loaded into `mapStyle.mapStyles`
 * @memberof mapStyleUpdaters
 * @param {Object} state `mapStyle`
 * @param {Object} action
 * @param {string} action.payload
 * @returns {Object} nextState
 * @public
 */


exports.mapConfigChangeUpdater = mapConfigChangeUpdater;

var mapStyleChangeUpdater = function mapStyleChangeUpdater(state, _ref4) {
  var styleType = _ref4.payload;

  if (!state.mapStyles[styleType]) {
    // we might not have received the style yet
    return state;
  }

  var defaultLGVisibility = (0, _mapboxGlStyleEditor.getDefaultLayerGroupVisibility)(state.mapStyles[styleType]);
  var visibleLayerGroups = (0, _mapboxGlStyleEditor.mergeLayerGroupVisibility)(defaultLGVisibility, state.visibleLayerGroups);
  var threeDBuildingColor = state.custom3DBuildingColor ? state.threeDBuildingColor : get3DBuildingColor(state.mapStyles[styleType]);
  return _objectSpread({}, state, {
    styleType: styleType,
    visibleLayerGroups: visibleLayerGroups,
    threeDBuildingColor: threeDBuildingColor
  }, getMapStyles(_objectSpread({}, state, {
    visibleLayerGroups: visibleLayerGroups,
    styleType: styleType
  })));
};
/**
 * Callback when load map style success
 * @memberof mapStyleUpdaters
 * @param {Object} state `mapStyle`
 * @param {Object} action
 * @param {Object} action.payload a `{[id]: style}` mapping
 * @return {Object} nextState
 * @public
 */


exports.mapStyleChangeUpdater = mapStyleChangeUpdater;

var loadMapStylesUpdater = function loadMapStylesUpdater(state, action) {
  var newStyles = action.payload || {};
  var addLayerGroups = Object.keys(newStyles).reduce(function (accu, id) {
    return _objectSpread({}, accu, (0, _defineProperty2["default"])({}, id, _objectSpread({}, newStyles[id], {
      layerGroups: newStyles[id].layerGroups || getLayerGroupsFromStyle(newStyles[id].style)
    })));
  }, {}); // add new styles to state

  var newState = _objectSpread({}, state, {
    mapStyles: _objectSpread({}, state.mapStyles, {}, addLayerGroups)
  });

  return newStyles[state.styleType] ? mapStyleChangeUpdater(newState, {
    payload: state.styleType
  }) : newState;
};
/**
 * Callback when load map style error
 * @memberof mapStyleUpdaters
 * @param {Object} state `mapStyle`
 * @param {Object} action
 * @param {*} action.payload error
 * @returns {Object} nextState
 * @public
 */
// do nothing for now, if didn't load, skip it


exports.loadMapStylesUpdater = loadMapStylesUpdater;

var loadMapStyleErrUpdater = function loadMapStyleErrUpdater(state) {
  return state;
};

exports.loadMapStyleErrUpdater = loadMapStyleErrUpdater;

var requestMapStylesUpdater = function requestMapStylesUpdater(state, _ref5) {
  var mapStyles = _ref5.payload;
  var loadMapStyleTasks = getLoadMapStyleTasks(mapStyles, state.mapboxApiAccessToken, state.mapboxApiUrl);
  return (0, _tasks.withTask)(state, loadMapStyleTasks);
};
/**
 * Load map style object when pass in saved map config
 * @memberof mapStyleUpdaters
 * @param {Object} state `mapStyle`
 * @param {Object} action
 * @param {Object} action.payload saved map config `{mapStyle, visState, mapState}`
 * @returns {Object} nextState or `react-pam` tasks to load map style object
 */


exports.requestMapStylesUpdater = requestMapStylesUpdater;

var receiveMapConfigUpdater = function receiveMapConfigUpdater(state, _ref6) {
  var _ref6$payload$config = _ref6.payload.config,
      config = _ref6$payload$config === void 0 ? {} : _ref6$payload$config;

  var _ref7 = config || {},
      mapStyle = _ref7.mapStyle;

  if (!mapStyle) {
    return state;
  } // if saved custom mapStyles load the style object


  var loadMapStyleTasks = mapStyle.mapStyles ? getLoadMapStyleTasks(mapStyle.mapStyles, state.mapboxApiAccessToken, state.mapboxApiUrl) : null; // merge default mapStyles

  var merged = mapStyle.mapStyles ? _objectSpread({}, mapStyle, {
    mapStyles: _objectSpread({}, mapStyle.mapStyles, {}, state.mapStyles)
  }) : mapStyle; // set custom3DBuildingColor: true if mapStyle contains threeDBuildingColor

  merged.custom3DBuildingColor = Boolean(mapStyle.threeDBuildingColor) || merged.custom3DBuildingColor;
  var newState = mapConfigChangeUpdater(state, {
    payload: merged
  });
  return loadMapStyleTasks ? (0, _tasks.withTask)(newState, loadMapStyleTasks) : newState;
};

exports.receiveMapConfigUpdater = receiveMapConfigUpdater;

function getLoadMapStyleTasks(mapStyles, mapboxApiAccessToken, mapboxApiUrl) {
  return [_tasks["default"].all(Object.values(mapStyles).map(function (_ref8) {
    var id = _ref8.id,
        url = _ref8.url,
        accessToken = _ref8.accessToken;
    return {
      id: id,
      url: (0, _mapboxGlStyleEditor.isValidStyleUrl)(url) ? (0, _mapboxGlStyleEditor.getStyleDownloadUrl)(url, accessToken || mapboxApiAccessToken, mapboxApiUrl) : url
    };
  }).map(_tasks2.LOAD_MAP_STYLE_TASK)).bimap( // success
  function (results) {
    return (0, _mapStyleActions.loadMapStyles)(results.reduce(function (accu, _ref9) {
      var id = _ref9.id,
          style = _ref9.style;
      return _objectSpread({}, accu, (0, _defineProperty2["default"])({}, id, _objectSpread({}, mapStyles[id], {
        style: style
      })));
    }, {}));
  }, // error
  _mapStyleActions.loadMapStyleErr)];
}
/**
 * Reset map style config to initial state
 * @memberof mapStyleUpdaters
 * @param {Object} state `mapStyle`
 * @returns {Object} nextState
 * @public
 */


var resetMapConfigMapStyleUpdater = function resetMapConfigMapStyleUpdater(state) {
  var emptyConfig = _objectSpread({}, INITIAL_MAP_STYLE, {
    mapboxApiAccessToken: state.mapboxApiAccessToken,
    mapboxApiUrl: state.mapboxApiUrl,
    mapStylesReplaceDefault: state.mapStylesReplaceDefault
  }, state.initialState, {
    mapStyles: state.mapStyles,
    initialState: state.initialState
  });

  return mapStyleChangeUpdater(emptyConfig, {
    payload: emptyConfig.styleType
  });
};
/**
 * Callback when a custom map style object is received
 * @memberof mapStyleUpdaters
 * @param {Object} state `mapStyle`
 * @param {Object} action
 * @param {Object} action.payload
 * @param {string} action.payload.icon
 * @param {Object} action.payload.style
 * @param {*} action.payload.error
 * @returns {Object} nextState
 * @public
 */


exports.resetMapConfigMapStyleUpdater = resetMapConfigMapStyleUpdater;

var loadCustomMapStyleUpdater = function loadCustomMapStyleUpdater(state, _ref10) {
  var _ref10$payload = _ref10.payload,
      icon = _ref10$payload.icon,
      style = _ref10$payload.style,
      error = _ref10$payload.error;
  return _objectSpread({}, state, {
    inputStyle: _objectSpread({}, state.inputStyle, {}, style ? {
      id: style.id || (0, _utils.generateHashId)(),
      // make a copy of the style object
      style: (0, _lodash["default"])(style),
      label: style.name,
      // gathering layer group info from style json
      layerGroups: getLayerGroupsFromStyle(style)
    } : {}, {}, icon ? {
      icon: icon
    } : {}, {}, error !== undefined ? {
      error: error
    } : {})
  });
};
/**
 * Input a custom map style object
 * @memberof mapStyleUpdaters
 * @param {Object} state `mapStyle`
 * @param {Object} action action object
 * @param {Object} action.payload inputStyle
 * @param {string} action.payload.url style url e.g. `'mapbox://styles/heshan/xxxxxyyyyzzz'`
 * @param {string} action.payload.id style url e.g. `'custom_style_1'`
 * @param {Object} action.payload.style actual mapbox style json
 * @param {string} action.payload.name style name
 * @param {Object} action.payload.layerGroups layer groups that can be used to set map layer visibility
 * @param {Object} action.payload.icon icon image data url
 * @returns {Object} nextState
 * @public
 */


exports.loadCustomMapStyleUpdater = loadCustomMapStyleUpdater;

var inputMapStyleUpdater = function inputMapStyleUpdater(state, _ref11) {
  var _ref11$payload = _ref11.payload,
      inputStyle = _ref11$payload.inputStyle,
      mapState = _ref11$payload.mapState;

  var updated = _objectSpread({}, state.inputStyle, {}, inputStyle);

  var isValid = (0, _mapboxGlStyleEditor.isValidStyleUrl)(updated.url);
  var icon = isValid ? (0, _mapboxGlStyleEditor.getStyleImageIcon)({
    mapState: mapState,
    styleUrl: updated.url,
    mapboxApiAccessToken: updated.accessToken || state.mapboxApiAccessToken,
    mapboxApiUrl: state.mapboxApiUrl || _defaultSettings.DEFAULT_MAPBOX_API_URL
  }) : state.inputStyle.icon;
  return _objectSpread({}, state, {
    inputStyle: _objectSpread({}, updated, {
      isValid: isValid,
      icon: icon
    })
  });
};
/**
 * Add map style from user input to reducer and set it to current style
 * This action is called when user click confirm after putting in a valid style url in the custom map style dialog.
 * It should not be called from outside kepler.gl without a valid `inputStyle` in the `mapStyle` reducer.
 * @memberof mapStyleUpdaters
 * @param {Object} state `mapStyle`
 * @returns {Object} nextState
 */


exports.inputMapStyleUpdater = inputMapStyleUpdater;

var addCustomMapStyleUpdater = function addCustomMapStyleUpdater(state) {
  var styleId = state.inputStyle.id;

  var newState = _objectSpread({}, state, {
    mapStyles: _objectSpread({}, state.mapStyles, (0, _defineProperty2["default"])({}, styleId, state.inputStyle)),
    // set to default
    inputStyle: getInitialInputStyle()
  }); // set new style


  return mapStyleChangeUpdater(newState, {
    payload: styleId
  });
};
/**
 * Updates 3d building color
 * @memberof mapStyleUpdaters
 * @param state
 * @param color
 * @return {Object} nextState
 */


exports.addCustomMapStyleUpdater = addCustomMapStyleUpdater;

var set3dBuildingColorUpdater = function set3dBuildingColorUpdater(state, _ref12) {
  var color = _ref12.payload;
  return _objectSpread({}, state, {
    threeDBuildingColor: color,
    custom3DBuildingColor: true
  });
};
/**
 * Return the initial input style
 * @return Object
 */


exports.set3dBuildingColorUpdater = set3dBuildingColorUpdater;

function getInitialInputStyle() {
  return {
    accessToken: null,
    error: false,
    isValid: false,
    label: null,
    style: null,
    url: null,
    icon: null,
    custom: true
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy9tYXAtc3R5bGUtdXBkYXRlcnMuanMiXSwibmFtZXMiOlsiREVGQVVMVF9CTERHX0NPTE9SIiwiZ2V0RGVmYXVsdFN0YXRlIiwidmlzaWJsZUxheWVyR3JvdXBzIiwic3R5bGVUeXBlIiwidG9wTGF5ZXJHcm91cHMiLCJtYXBTdHlsZXMiLCJERUZBVUxUX01BUF9TVFlMRVMiLCJyZWR1Y2UiLCJhY2N1IiwiY3VyciIsImlkIiwibWFwYm94QXBpQWNjZXNzVG9rZW4iLCJtYXBib3hBcGlVcmwiLCJERUZBVUxUX01BUEJPWF9BUElfVVJMIiwibWFwU3R5bGVzUmVwbGFjZURlZmF1bHQiLCJpbnB1dFN0eWxlIiwiZ2V0SW5pdGlhbElucHV0U3R5bGUiLCJ0aHJlZURCdWlsZGluZ0NvbG9yIiwiY3VzdG9tM0RCdWlsZGluZ0NvbG9yIiwibWFwU3R5bGVVcGRhdGVycyIsIklOSVRJQUxfTUFQX1NUWUxFIiwiZ2V0TWFwU3R5bGVzIiwibWFwU3R5bGUiLCJzdHlsZSIsImVkaXRhYmxlIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsImJvdHRvbU1hcFN0eWxlIiwiaGFzVG9wTGF5ZXIiLCJ2YWx1ZXMiLCJzb21lIiwidiIsInRvcExheWVycyIsImtleSIsInRvcE1hcFN0eWxlIiwiZmluZExheWVyRmlsbENvbG9yIiwibGF5ZXIiLCJwYWludCIsImdldDNEQnVpbGRpbmdDb2xvciIsImJhY2tncm91bmRMYXllciIsImxheWVycyIsImZpbmQiLCJidWlsZGluZ0xheWVyIiwibWF0Y2giLCJidWlsZGluZ0NvbG9yIiwib3BlcmF0aW9uIiwiYWxwaGEiLCJyZ2JPYmoiLCJyIiwiZyIsImIiLCJnZXRMYXllckdyb3Vwc0Zyb21TdHlsZSIsIkFycmF5IiwiaXNBcnJheSIsIkRFRkFVTFRfTEFZRVJfR1JPVVBTIiwiZmlsdGVyIiwibGciLCJpbml0TWFwU3R5bGVVcGRhdGVyIiwic3RhdGUiLCJhY3Rpb24iLCJwYXlsb2FkIiwibWFwQ29uZmlnQ2hhbmdlVXBkYXRlciIsIm1hcFN0eWxlQ2hhbmdlVXBkYXRlciIsImRlZmF1bHRMR1Zpc2liaWxpdHkiLCJsb2FkTWFwU3R5bGVzVXBkYXRlciIsIm5ld1N0eWxlcyIsImFkZExheWVyR3JvdXBzIiwibGF5ZXJHcm91cHMiLCJuZXdTdGF0ZSIsImxvYWRNYXBTdHlsZUVyclVwZGF0ZXIiLCJyZXF1ZXN0TWFwU3R5bGVzVXBkYXRlciIsImxvYWRNYXBTdHlsZVRhc2tzIiwiZ2V0TG9hZE1hcFN0eWxlVGFza3MiLCJyZWNlaXZlTWFwQ29uZmlnVXBkYXRlciIsImNvbmZpZyIsIm1lcmdlZCIsIkJvb2xlYW4iLCJUYXNrIiwiYWxsIiwibWFwIiwidXJsIiwiYWNjZXNzVG9rZW4iLCJMT0FEX01BUF9TVFlMRV9UQVNLIiwiYmltYXAiLCJyZXN1bHRzIiwibG9hZE1hcFN0eWxlRXJyIiwicmVzZXRNYXBDb25maWdNYXBTdHlsZVVwZGF0ZXIiLCJlbXB0eUNvbmZpZyIsImluaXRpYWxTdGF0ZSIsImxvYWRDdXN0b21NYXBTdHlsZVVwZGF0ZXIiLCJpY29uIiwiZXJyb3IiLCJsYWJlbCIsIm5hbWUiLCJ1bmRlZmluZWQiLCJpbnB1dE1hcFN0eWxlVXBkYXRlciIsIm1hcFN0YXRlIiwidXBkYXRlZCIsImlzVmFsaWQiLCJzdHlsZVVybCIsImFkZEN1c3RvbU1hcFN0eWxlVXBkYXRlciIsInN0eWxlSWQiLCJzZXQzZEJ1aWxkaW5nQ29sb3JVcGRhdGVyIiwiY29sb3IiLCJjdXN0b20iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFHQTs7QUFTQTs7QUFLQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsa0JBQWtCLEdBQUcsU0FBM0I7O0FBRUEsSUFBTUMsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixHQUFNO0FBQzVCLE1BQU1DLGtCQUFrQixHQUFHLEVBQTNCO0FBQ0EsTUFBTUMsU0FBUyxHQUFHLE1BQWxCO0FBQ0EsTUFBTUMsY0FBYyxHQUFHLEVB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LEVBQVc7QUFBQ1IsSUFBQUEsT0FBTyxFQUFFeUM7QUFBVixHQUFYLENBQTVCO0FBQ0QsQ0FiTTtBQWVQOzs7Ozs7Ozs7OztBQU9PLElBQU1DLHlCQUF5QixHQUFHLFNBQTVCQSx5QkFBNEIsQ0FBQzVDLEtBQUQ7QUFBQSxNQUFrQjZDLEtBQWxCLFVBQVMzQyxPQUFUO0FBQUEsMkJBQ3BDRixLQURvQztBQUV2QzFDLElBQUFBLG1CQUFtQixFQUFFdUYsS0FGa0I7QUFHdkN0RixJQUFBQSxxQkFBcUIsRUFBRTtBQUhnQjtBQUFBLENBQWxDO0FBTVA7Ozs7Ozs7O0FBSU8sU0FBU0Ysb0JBQVQsR0FBZ0M7QUFDckMsU0FBTztBQUNMa0UsSUFBQUEsV0FBVyxFQUFFLElBRFI7QUFFTFUsSUFBQUEsS0FBSyxFQUFFLEtBRkY7QUFHTE8sSUFBQUEsT0FBTyxFQUFFLEtBSEo7QUFJTE4sSUFBQUEsS0FBSyxFQUFFLElBSkY7QUFLTHRFLElBQUFBLEtBQUssRUFBRSxJQUxGO0FBTUwwRCxJQUFBQSxHQUFHLEVBQUUsSUFOQTtBQU9MVSxJQUFBQSxJQUFJLEVBQUUsSUFQRDtBQVFMYyxJQUFBQSxNQUFNLEVBQUU7QUFSSCxHQUFQO0FBVUQiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMjAgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgVGFzaywge3dpdGhUYXNrfSBmcm9tICdyZWFjdC1wYWxtL3Rhc2tzJztcbmltcG9ydCBjbG9uZURlZXAgZnJvbSAnbG9kYXNoLmNsb25lZGVlcCc7XG5cbi8vIFV0aWxzXG5pbXBvcnQge1xuICBnZXREZWZhdWx0TGF5ZXJHcm91cFZpc2liaWxpdHksXG4gIGlzVmFsaWRTdHlsZVVybCxcbiAgZ2V0U3R5bGVEb3dubG9hZFVybCxcbiAgbWVyZ2VMYXllckdyb3VwVmlzaWJpbGl0eSxcbiAgZWRpdFRvcE1hcFN0eWxlLFxuICBlZGl0Qm90dG9tTWFwU3R5bGUsXG4gIGdldFN0eWxlSW1hZ2VJY29uXG59IGZyb20gJ3V0aWxzL21hcC1zdHlsZS11dGlscy9tYXBib3gtZ2wtc3R5bGUtZWRpdG9yJztcbmltcG9ydCB7XG4gIERFRkFVTFRfTUFQX1NUWUxFUyxcbiAgREVGQVVMVF9MQVlFUl9HUk9VUFMsXG4gIERFRkFVTFRfTUFQQk9YX0FQSV9VUkxcbn0gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuaW1wb3J0IHtnZW5lcmF0ZUhhc2hJZH0gZnJvbSAndXRpbHMvdXRpbHMnO1xuaW1wb3J0IHtMT0FEX01BUF9TVFlMRV9UQVNLfSBmcm9tICd0YXNrcy90YXNrcyc7XG5pbXBvcnQge2xvYWRNYXBTdHlsZXMsIGxvYWRNYXBTdHlsZUVycn0gZnJvbSAnYWN0aW9ucy9tYXAtc3R5bGUtYWN0aW9ucyc7XG5pbXBvcnQge3JnYn0gZnJvbSAnZDMtY29sb3InO1xuaW1wb3J0IHtoZXhUb1JnYn0gZnJvbSAndXRpbHMvY29sb3ItdXRpbHMnO1xuXG5jb25zdCBERUZBVUxUX0JMREdfQ09MT1IgPSAnI0QxQ0VDNyc7XG5cbmNvbnN0IGdldERlZmF1bHRTdGF0ZSA9ICgpID0+IHtcbiAgY29uc3QgdmlzaWJsZUxheWVyR3JvdXBzID0ge307XG4gIGNvbnN0IHN0eWxlVHlwZSA9ICdkYXJrJztcbiAgY29uc3QgdG9wTGF5ZXJHcm91cHMgPSB7fTtcblxuICByZXR1cm4ge1xuICAgIHN0eWxlVHlwZSxcbiAgICB2aXNpYmxlTGF5ZXJHcm91cHMsXG4gICAgdG9wTGF5ZXJHcm91cHMsXG4gICAgbWFwU3R5bGVzOiBERUZBVUxUX01BUF9TVFlMRVMucmVkdWNlKFxuICAgICAgKGFjY3UsIGN1cnIpID0+ICh7XG4gICAgICAgIC4uLmFjY3UsXG4gICAgICAgIFtjdXJyLmlkXTogY3VyclxuICAgICAgfSksXG4gICAgICB7fVxuICAgICksXG4gICAgLy8gc2F2ZSBtYXBib3ggYWNjZXNzIHRva2VuXG4gICAgbWFwYm94QXBpQWNjZXNzVG9rZW46IG51bGwsXG4gICAgbWFwYm94QXBpVXJsOiBERUZBVUxUX01BUEJPWF9BUElfVVJMLFxuICAgIG1hcFN0eWxlc1JlcGxhY2VEZWZhdWx0OiBmYWxzZSxcbiAgICBpbnB1dFN0eWxlOiBnZXRJbml0aWFsSW5wdXRTdHlsZSgpLFxuICAgIHRocmVlREJ1aWxkaW5nQ29sb3I6IGhleFRvUmdiKERFRkFVTFRfQkxER19DT0xPUiksXG4gICAgY3VzdG9tM0RCdWlsZGluZ0NvbG9yOiBmYWxzZVxuICB9O1xufTtcblxuLyoqXG4gKiBVcGRhdGVycyBmb3IgYG1hcFN0eWxlYC4gQ2FuIGJlIHVzZWQgaW4geW91ciByb290IHJlZHVjZXIgdG8gZGlyZWN0bHkgbW9kaWZ5IGtlcGxlci5nbCdzIHN0YXRlLlxuICogUmVhZCBtb3JlIGFib3V0IFtVc2luZyB1cGRhdGVyc10oLi4vYWR2YW5jZWQtdXNhZ2UvdXNpbmctdXBkYXRlcnMubWQpXG4gKiBAcHVibGljXG4gKiBAZXhhbXBsZVxuICpcbiAqIGltcG9ydCBrZXBsZXJHbFJlZHVjZXIsIHttYXBTdHlsZVVwZGF0ZXJzfSBmcm9tICdrZXBsZXIuZ2wvcmVkdWNlcnMnO1xuICogLy8gUm9vdCBSZWR1Y2VyXG4gKiBjb25zdCByZWR1Y2VycyA9IGNvbWJpbmVSZWR1Y2Vycyh7XG4gKiAga2VwbGVyR2w6IGtlcGxlckdsUmVkdWNlcixcbiAqICBhcHA6IGFwcFJlZHVjZXJcbiAqIH0pO1xuICpcbiAqIGNvbnN0IGNvbXBvc2VkUmVkdWNlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gKiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICogICAgLy8gY2xpY2sgYnV0dG9uIHRvIGhpZGUgbGFiZWwgZnJvbSBiYWNrZ3JvdW5kIG1hcFxuICogICAgY2FzZSAnQ0xJQ0tfQlVUVE9OJzpcbiAqICAgICAgcmV0dXJuIHtcbiAqICAgICAgICAuLi5zdGF0ZSxcbiAqICAgICAgICBrZXBsZXJHbDoge1xuICogICAgICAgICAgLi4uc3RhdGUua2VwbGVyR2wsXG4gKiAgICAgICAgICBmb286IHtcbiAqICAgICAgICAgICAgIC4uLnN0YXRlLmtlcGxlckdsLmZvbyxcbiAqICAgICAgICAgICAgIG1hcFN0eWxlOiBtYXBTdHlsZVVwZGF0ZXJzLm1hcENvbmZpZ0NoYW5nZVVwZGF0ZXIoXG4gKiAgICAgICAgICAgICAgIG1hcFN0eWxlLFxuICogICAgICAgICAgICAgICB7cGF5bG9hZDoge3Zpc2libGVMYXllckdyb3Vwczoge2xhYmVsOiBmYWxzZSwgcm9hZDogdHJ1ZSwgYmFja2dyb3VuZDogdHJ1ZX19fVxuICogICAgICAgICAgICAgKVxuICogICAgICAgICAgfVxuICogICAgICAgIH1cbiAqICAgICAgfTtcbiAqICB9XG4gKiAgcmV0dXJuIHJlZHVjZXJzKHN0YXRlLCBhY3Rpb24pO1xuICogfTtcbiAqXG4gKiBleHBvcnQgZGVmYXVsdCBjb21wb3NlZFJlZHVjZXI7XG4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5jb25zdCBtYXBTdHlsZVVwZGF0ZXJzID0gbnVsbDtcbi8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cbi8qKlxuICogRGVmYXVsdCBpbml0aWFsIGBtYXBTdHlsZWBcbiAqIEBtZW1iZXJvZiBtYXBTdHlsZVVwZGF0ZXJzXG4gKiBAY29uc3RhbnRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBzdHlsZVR5cGUgLSBEZWZhdWx0OiBgJ2RhcmsnYFxuICogQHByb3BlcnR5IHtPYmplY3R9IHZpc2libGVMYXllckdyb3VwcyAtIERlZmF1bHQ6IGB7fWBcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSB0b3BMYXllckdyb3VwcyAtIERlZmF1bHQ6IGB7fWBcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBtYXBTdHlsZXMgLSBtYXBwaW5nIGZyb20gc3R5bGUga2V5IHRvIHN0eWxlIG9iamVjdFxuICogQHByb3BlcnR5IHtzdHJpbmd9IG1hcGJveEFwaUFjY2Vzc1Rva2VuIC0gRGVmYXVsdDogYG51bGxgXG4gKiBAUHJvcGVydHkge3N0cmluZ30gbWFwYm94QXBpVXJsIC0gRGVmYXVsdCBudWxsXG4gKiBAUHJvcGVydHkge0Jvb2xlYW59IG1hcFN0eWxlc1JlcGxhY2VEZWZhdWx0IC0gRGVmYXVsdDogYGZhbHNlYFxuICogQHByb3BlcnR5IHtPYmplY3R9IGlucHV0U3R5bGUgLSBEZWZhdWx0OiBge31gXG4gKiBAcHJvcGVydHkge0FycmF5fSB0aHJlZURCdWlsZGluZ0NvbG9yIC0gRGVmYXVsdDogYFtyLCBnLCBiXWBcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IElOSVRJQUxfTUFQX1NUWUxFID0gZ2V0RGVmYXVsdFN0YXRlKCk7XG5cbi8qKlxuICogQ3JlYXRlIHR3byBtYXAgc3R5bGVzIGZyb20gcHJlc2V0IG1hcCBzdHlsZSwgb25lIGZvciB0b3AgbWFwIG9uZSBmb3IgYm90dG9tXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0eWxlVHlwZSAtIGN1cnJlbnQgbWFwIHN0eWxlXG4gKiBAcGFyYW0ge09iamVjdH0gdmlzaWJsZUxheWVyR3JvdXBzIC0gdmlzaWJsZSBsYXllcnMgb2YgYm90dG9tIG1hcFxuICogQHBhcmFtIHtPYmplY3R9IHRvcExheWVyR3JvdXBzIC0gdmlzaWJsZSBsYXllcnMgb2YgdG9wIG1hcFxuICogQHBhcmFtIHtPYmplY3R9IG1hcFN0eWxlcyAtIGEgZGljdGlvbmFyeSBvZiBhbGwgbWFwIHN0eWxlc1xuICogQHJldHVybnMge09iamVjdH0gYm90dG9tTWFwU3R5bGUgfCB0b3BNYXBTdHlsZSB8IGlzUmFzdGVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRNYXBTdHlsZXMoe3N0eWxlVHlwZSwgdmlzaWJsZUxheWVyR3JvdXBzLCB0b3BMYXllckdyb3VwcywgbWFwU3R5bGVzfSkge1xuICBjb25zdCBtYXBTdHlsZSA9IG1hcFN0eWxlc1tzdHlsZVR5cGVdO1xuXG4gIC8vIHN0eWxlIG1pZ2h0IG5vdCBiZSBsb2FkZWQgeWV0XG4gIGlmICghbWFwU3R5bGUgfHwgIW1hcFN0eWxlLnN0eWxlKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgY29uc3QgZWRpdGFibGUgPSBPYmplY3Qua2V5cyh2aXNpYmxlTGF5ZXJHcm91cHMpLmxlbmd0aDtcblxuICBjb25zdCBib3R0b21NYXBTdHlsZSA9ICFlZGl0YWJsZVxuICAgID8gbWFwU3R5bGUuc3R5bGVcbiAgICA6IGVkaXRCb3R0b21NYXBTdHlsZSh7XG4gICAgICAgIGlkOiBzdHlsZVR5cGUsXG4gICAgICAgIG1hcFN0eWxlLFxuICAgICAgICB2aXNpYmxlTGF5ZXJHcm91cHNcbiAgICAgIH0pO1xuXG4gIGNvbnN0IGhhc1RvcExheWVyID0gZWRpdGFibGUgJiYgT2JqZWN0LnZhbHVlcyh0b3BMYXllckdyb3Vwcykuc29tZSh2ID0+IHYpO1xuXG4gIC8vIG11dGUgdG9wIGxheWVyIGlmIG5vdCB2aXNpYmxlIGluIGJvdHRvbSBsYXllclxuICBjb25zdCB0b3BMYXllcnMgPVxuICAgIGhhc1RvcExheWVyICYmXG4gICAgT2JqZWN0LmtleXModG9wTGF5ZXJHcm91cHMpLnJlZHVjZShcbiAgICAgIChhY2N1LCBrZXkpID0+ICh7XG4gICAgICAgIC4uLmFjY3UsXG4gICAgICAgIFtrZXldOiB0b3BMYXllckdyb3Vwc1trZXldICYmIHZpc2libGVMYXllckdyb3Vwc1trZXldXG4gICAgICB9KSxcbiAgICAgIHt9XG4gICAgKTtcblxuICBjb25zdCB0b3BNYXBTdHlsZSA9IGhhc1RvcExheWVyXG4gICAgPyBlZGl0VG9wTWFwU3R5bGUoe1xuICAgICAgICBpZDogc3R5bGVUeXBlLFxuICAgICAgICBtYXBTdHlsZSxcbiAgICAgICAgdmlzaWJsZUxheWVyR3JvdXBzOiB0b3BMYXllcnNcbiAgICAgIH0pXG4gICAgOiBudWxsO1xuXG4gIHJldHVybiB7Ym90dG9tTWFwU3R5bGUsIHRvcE1hcFN0eWxlLCBlZGl0YWJsZX07XG59XG5cbmZ1bmN0aW9uIGZpbmRMYXllckZpbGxDb2xvcihsYXllcikge1xuICByZXR1cm4gbGF5ZXIgJiYgbGF5ZXIucGFpbnQgJiYgbGF5ZXIucGFpbnRbJ2JhY2tncm91bmQtY29sb3InXTtcbn1cblxuZnVuY3Rpb24gZ2V0M0RCdWlsZGluZ0NvbG9yKHN0eWxlKSB7XG4gIC8vIHNldCBidWlsZGluZyBjb2xvciB0byBiZSB0aGUgc2FtZSBhcyB0aGUgYmFja2dyb3VuZCBjb2xvci5cbiAgaWYgKCFzdHlsZS5zdHlsZSkge1xuICAgIHJldHVybiBoZXhUb1JnYihERUZBVUxUX0JMREdfQ09MT1IpO1xuICB9XG5cbiAgY29uc3QgYmFja2dyb3VuZExheWVyID0gKHN0eWxlLnN0eWxlLmxheWVycyB8fCBbXSkuZmluZCgoe2lkfSkgPT4gaWQgPT09ICdiYWNrZ3JvdW5kJyk7XG5cbiAgY29uc3QgYnVpbGRpbmdMYXllciA9IChzdHlsZS5zdHlsZS5sYXllcnMgfHwgW10pLmZpbmQoKHtpZH0pID0+IGlkLm1hdGNoKC9idWlsZGluZy8pKTtcblxuICBjb25zdCBidWlsZGluZ0NvbG9yID1cbiAgICBmaW5kTGF5ZXJGaWxsQ29sb3IoYnVpbGRpbmdMYXllcikgfHwgZmluZExheWVyRmlsbENvbG9yKGJhY2tncm91bmRMYXllcikgfHwgREVGQVVMVF9CTERHX0NPTE9SO1xuXG4gIC8vIGJyaWdodGVuIG9yIGRhcmtlbiBidWlsZGluZyBiYXNlZCBvbiBzdHlsZVxuICBjb25zdCBvcGVyYXRpb24gPSBzdHlsZS5pZC5tYXRjaCgvKD89KGRhcmt8bmlnaHQpKS8pID8gJ2JyaWdodGVyJyA6ICdkYXJrZXInO1xuXG4gIGNvbnN0IGFscGhhID0gMC4yO1xuICBjb25zdCByZ2JPYmogPSByZ2IoYnVpbGRpbmdDb2xvcilbb3BlcmF0aW9uXShbYWxwaGFdKTtcbiAgcmV0dXJuIFtyZ2JPYmouciwgcmdiT2JqLmcsIHJnYk9iai5iXTtcbn1cblxuZnVuY3Rpb24gZ2V0TGF5ZXJHcm91cHNGcm9tU3R5bGUoc3R5bGUpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoc3R5bGUubGF5ZXJzKVxuICAgID8gREVGQVVMVF9MQVlFUl9HUk9VUFMuZmlsdGVyKGxnID0+IHN0eWxlLmxheWVycy5maWx0ZXIobGcuZmlsdGVyKS5sZW5ndGgpXG4gICAgOiBbXTtcbn1cblxuLy8gVXBkYXRlcnNcbi8qKlxuICogUHJvcGFnYXRlIGBtYXBTdHlsZWAgcmVkdWNlciB3aXRoIGBtYXBib3hBcGlBY2Nlc3NUb2tlbmAgYW5kIGBtYXBTdHlsZXNSZXBsYWNlRGVmYXVsdGAuXG4gKiBpZiBtYXBTdHlsZXNSZXBsYWNlRGVmYXVsdCBpcyB0cnVlIG1hcFN0eWxlcyBpcyBlbXB0aWVkOyBsb2FkTWFwU3R5bGVzVXBkYXRlcigpIHdpbGxcbiAqIHBvcHVsYXRlIG1hcFN0eWxlcy5cbiAqXG4gKiBAbWVtYmVyb2YgbWFwU3R5bGVVcGRhdGVyc1xuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uLnBheWxvYWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBhY3Rpb24ucGF5bG9hZC5tYXBib3hBcGlBY2Nlc3NUb2tlblxuICogQHJldHVybnMge09iamVjdH0gbmV4dFN0YXRlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBpbml0TWFwU3R5bGVVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+ICh7XG4gIC4uLnN0YXRlLFxuICAvLyBzYXZlIG1hcGJveCBhY2Nlc3MgdG9rZW4gdG8gbWFwIHN0eWxlIHN0YXRlXG4gIG1hcGJveEFwaUFjY2Vzc1Rva2VuOiAoYWN0aW9uLnBheWxvYWQgfHwge30pLm1hcGJveEFwaUFjY2Vzc1Rva2VuLFxuICBtYXBib3hBcGlVcmw6IChhY3Rpb24ucGF5bG9hZCB8fCB7fSkubWFwYm94QXBpVXJsIHx8IHN0YXRlLm1hcGJveEFwaVVybCxcbiAgbWFwU3R5bGVzOiBhY3Rpb24ucGF5bG9hZCAmJiAhYWN0aW9uLnBheWxvYWQubWFwU3R5bGVzUmVwbGFjZURlZmF1bHQgPyBzdGF0ZS5tYXBTdHlsZXMgOiB7fSxcbiAgbWFwU3R5bGVzUmVwbGFjZURlZmF1bHQ6IGFjdGlvbi5wYXlsb2FkLm1hcFN0eWxlc1JlcGxhY2VEZWZhdWx0IHx8IGZhbHNlXG59KTtcbi8vIH0pO1xuXG4vKipcbiAqIFVwZGF0ZSBgdmlzaWJsZUxheWVyR3JvdXBzYHRvIGNoYW5nZSBsYXllciBncm91cCB2aXNpYmlsaXR5XG4gKiBAbWVtYmVyb2YgbWFwU3R5bGVVcGRhdGVyc1xuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIGBtYXBTdHlsZWBcbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24ucGF5bG9hZCBuZXcgY29uZmlnIGB7dmlzaWJsZUxheWVyR3JvdXBzOiB7bGFiZWw6IGZhbHNlLCByb2FkOiB0cnVlLCBiYWNrZ3JvdW5kOiB0cnVlfX1gXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBuZXh0U3RhdGVcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IG1hcENvbmZpZ0NoYW5nZVVwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIC4uLmFjdGlvbi5wYXlsb2FkLFxuICAuLi5nZXRNYXBTdHlsZXMoe1xuICAgIC4uLnN0YXRlLFxuICAgIC4uLmFjdGlvbi5wYXlsb2FkXG4gIH0pXG59KTtcblxuLyoqXG4gKiBDaGFuZ2UgdG8gYW5vdGhlciBtYXAgc3R5bGUuIFRoZSBzZWxlY3RlZCBzdHlsZSBzaG91bGQgYWxyZWFkeSBiZWVuIGxvYWRlZCBpbnRvIGBtYXBTdHlsZS5tYXBTdHlsZXNgXG4gKiBAbWVtYmVyb2YgbWFwU3R5bGVVcGRhdGVyc1xuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIGBtYXBTdHlsZWBcbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBhY3Rpb24ucGF5bG9hZFxuICogQHJldHVybnMge09iamVjdH0gbmV4dFN0YXRlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBtYXBTdHlsZUNoYW5nZVVwZGF0ZXIgPSAoc3RhdGUsIHtwYXlsb2FkOiBzdHlsZVR5cGV9KSA9PiB7XG4gIGlmICghc3RhdGUubWFwU3R5bGVzW3N0eWxlVHlwZV0pIHtcbiAgICAvLyB3ZSBtaWdodCBub3QgaGF2ZSByZWNlaXZlZCB0aGUgc3R5bGUgeWV0XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG4gIGNvbnN0IGRlZmF1bHRMR1Zpc2liaWxpdHkgPSBnZXREZWZhdWx0TGF5ZXJHcm91cFZpc2liaWxpdHkoc3RhdGUubWFwU3R5bGVzW3N0eWxlVHlwZV0pO1xuXG4gIGNvbnN0IHZpc2libGVMYXllckdyb3VwcyA9IG1lcmdlTGF5ZXJHcm91cFZpc2liaWxpdHkoXG4gICAgZGVmYXVsdExHVmlzaWJpbGl0eSxcbiAgICBzdGF0ZS52aXNpYmxlTGF5ZXJHcm91cHNcbiAgKTtcblxuICBjb25zdCB0aHJlZURCdWlsZGluZ0NvbG9yID0gc3RhdGUuY3VzdG9tM0RCdWlsZGluZ0NvbG9yXG4gICAgPyBzdGF0ZS50aHJlZURCdWlsZGluZ0NvbG9yXG4gICAgOiBnZXQzREJ1aWxkaW5nQ29sb3Ioc3RhdGUubWFwU3R5bGVzW3N0eWxlVHlwZV0pO1xuXG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgc3R5bGVUeXBlLFxuICAgIHZpc2libGVMYXllckdyb3VwcyxcbiAgICB0aHJlZURCdWlsZGluZ0NvbG9yLFxuICAgIC4uLmdldE1hcFN0eWxlcyh7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIHZpc2libGVMYXllckdyb3VwcyxcbiAgICAgIHN0eWxlVHlwZVxuICAgIH0pXG4gIH07XG59O1xuXG4vKipcbiAqIENhbGxiYWNrIHdoZW4gbG9hZCBtYXAgc3R5bGUgc3VjY2Vzc1xuICogQG1lbWJlcm9mIG1hcFN0eWxlVXBkYXRlcnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSBgbWFwU3R5bGVgXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uLnBheWxvYWQgYSBge1tpZF06IHN0eWxlfWAgbWFwcGluZ1xuICogQHJldHVybiB7T2JqZWN0fSBuZXh0U3RhdGVcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IGxvYWRNYXBTdHlsZXNVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgY29uc3QgbmV3U3R5bGVzID0gYWN0aW9uLnBheWxvYWQgfHwge307XG4gIGNvbnN0IGFkZExheWVyR3JvdXBzID0gT2JqZWN0LmtleXMobmV3U3R5bGVzKS5yZWR1Y2UoXG4gICAgKGFjY3UsIGlkKSA9PiAoe1xuICAgICAgLi4uYWNjdSxcbiAgICAgIFtpZF06IHtcbiAgICAgICAgLi4ubmV3U3R5bGVzW2lkXSxcbiAgICAgICAgbGF5ZXJHcm91cHM6IG5ld1N0eWxlc1tpZF0ubGF5ZXJHcm91cHMgfHwgZ2V0TGF5ZXJHcm91cHNGcm9tU3R5bGUobmV3U3R5bGVzW2lkXS5zdHlsZSlcbiAgICAgIH1cbiAgICB9KSxcbiAgICB7fVxuICApO1xuXG4gIC8vIGFkZCBuZXcgc3R5bGVzIHRvIHN0YXRlXG4gIGNvbnN0IG5ld1N0YXRlID0ge1xuICAgIC4uLnN0YXRlLFxuICAgIG1hcFN0eWxlczoge1xuICAgICAgLi4uc3RhdGUubWFwU3R5bGVzLFxuICAgICAgLi4uYWRkTGF5ZXJHcm91cHNcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIG5ld1N0eWxlc1tzdGF0ZS5zdHlsZVR5cGVdXG4gICAgPyBtYXBTdHlsZUNoYW5nZVVwZGF0ZXIobmV3U3RhdGUsIHtwYXlsb2FkOiBzdGF0ZS5zdHlsZVR5cGV9KVxuICAgIDogbmV3U3RhdGU7XG59O1xuXG4vKipcbiAqIENhbGxiYWNrIHdoZW4gbG9hZCBtYXAgc3R5bGUgZXJyb3JcbiAqIEBtZW1iZXJvZiBtYXBTdHlsZVVwZGF0ZXJzXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgYG1hcFN0eWxlYFxuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvblxuICogQHBhcmFtIHsqfSBhY3Rpb24ucGF5bG9hZCBlcnJvclxuICogQHJldHVybnMge09iamVjdH0gbmV4dFN0YXRlXG4gKiBAcHVibGljXG4gKi9cbi8vIGRvIG5vdGhpbmcgZm9yIG5vdywgaWYgZGlkbid0IGxvYWQsIHNraXAgaXRcbmV4cG9ydCBjb25zdCBsb2FkTWFwU3R5bGVFcnJVcGRhdGVyID0gc3RhdGUgPT4gc3RhdGU7XG5cbmV4cG9ydCBjb25zdCByZXF1ZXN0TWFwU3R5bGVzVXBkYXRlciA9IChzdGF0ZSwge3BheWxvYWQ6IG1hcFN0eWxlc30pID0+IHtcbiAgY29uc3QgbG9hZE1hcFN0eWxlVGFza3MgPSBnZXRMb2FkTWFwU3R5bGVUYXNrcyhcbiAgICBtYXBTdHlsZXMsXG4gICAgc3RhdGUubWFwYm94QXBpQWNjZXNzVG9rZW4sXG4gICAgc3RhdGUubWFwYm94QXBpVXJsXG4gICk7XG4gIHJldHVybiB3aXRoVGFzayhzdGF0ZSwgbG9hZE1hcFN0eWxlVGFza3MpO1xufTtcblxuLyoqXG4gKiBMb2FkIG1hcCBzdHlsZSBvYmplY3Qgd2hlbiBwYXNzIGluIHNhdmVkIG1hcCBjb25maWdcbiAqIEBtZW1iZXJvZiBtYXBTdHlsZVVwZGF0ZXJzXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgYG1hcFN0eWxlYFxuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvblxuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvbi5wYXlsb2FkIHNhdmVkIG1hcCBjb25maWcgYHttYXBTdHlsZSwgdmlzU3RhdGUsIG1hcFN0YXRlfWBcbiAqIEByZXR1cm5zIHtPYmplY3R9IG5leHRTdGF0ZSBvciBgcmVhY3QtcGFtYCB0YXNrcyB0byBsb2FkIG1hcCBzdHlsZSBvYmplY3RcbiAqL1xuZXhwb3J0IGNvbnN0IHJlY2VpdmVNYXBDb25maWdVcGRhdGVyID0gKHN0YXRlLCB7cGF5bG9hZDoge2NvbmZpZyA9IHt9fX0pID0+IHtcbiAgY29uc3Qge21hcFN0eWxlfSA9IGNvbmZpZyB8fCB7fTtcblxuICBpZiAoIW1hcFN0eWxlKSB7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgLy8gaWYgc2F2ZWQgY3VzdG9tIG1hcFN0eWxlcyBsb2FkIHRoZSBzdHlsZSBvYmplY3RcbiAgY29uc3QgbG9hZE1hcFN0eWxlVGFza3MgPSBtYXBTdHlsZS5tYXBTdHlsZXNcbiAgICA/IGdldExvYWRNYXBTdHlsZVRhc2tzKG1hcFN0eWxlLm1hcFN0eWxlcywgc3RhdGUubWFwYm94QXBpQWNjZXNzVG9rZW4sIHN0YXRlLm1hcGJveEFwaVVybClcbiAgICA6IG51bGw7XG5cbiAgLy8gbWVyZ2UgZGVmYXVsdCBtYXBTdHlsZXNcbiAgY29uc3QgbWVyZ2VkID0gbWFwU3R5bGUubWFwU3R5bGVzXG4gICAgPyB7XG4gICAgICAgIC4uLm1hcFN0eWxlLFxuICAgICAgICBtYXBTdHlsZXM6IHtcbiAgICAgICAgICAuLi5tYXBTdHlsZS5tYXBTdHlsZXMsXG4gICAgICAgICAgLi4uc3RhdGUubWFwU3R5bGVzXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICA6IG1hcFN0eWxlO1xuXG4gIC8vIHNldCBjdXN0b20zREJ1aWxkaW5nQ29sb3I6IHRydWUgaWYgbWFwU3R5bGUgY29udGFpbnMgdGhyZWVEQnVpbGRpbmdDb2xvclxuICBtZXJnZWQuY3VzdG9tM0RCdWlsZGluZ0NvbG9yID1cbiAgICBCb29sZWFuKG1hcFN0eWxlLnRocmVlREJ1aWxkaW5nQ29sb3IpIHx8IG1lcmdlZC5jdXN0b20zREJ1aWxkaW5nQ29sb3I7XG4gIGNvbnN0IG5ld1N0YXRlID0gbWFwQ29uZmlnQ2hhbmdlVXBkYXRlcihzdGF0ZSwge3BheWxvYWQ6IG1lcmdlZH0pO1xuXG4gIHJldHVybiBsb2FkTWFwU3R5bGVUYXNrcyA/IHdpdGhUYXNrKG5ld1N0YXRlLCBsb2FkTWFwU3R5bGVUYXNrcykgOiBuZXdTdGF0ZTtcbn07XG5cbmZ1bmN0aW9uIGdldExvYWRNYXBTdHlsZVRhc2tzKG1hcFN0eWxlcywgbWFwYm94QXBpQWNjZXNzVG9rZW4sIG1hcGJveEFwaVVybCkge1xuICByZXR1cm4gW1xuICAgIFRhc2suYWxsKFxuICAgICAgT2JqZWN0LnZhbHVlcyhtYXBTdHlsZXMpXG4gICAgICAgIC5tYXAoKHtpZCwgdXJsLCBhY2Nlc3NUb2tlbn0pID0+ICh7XG4gICAgICAgICAgaWQsXG4gICAgICAgICAgdXJsOiBpc1ZhbGlkU3R5bGVVcmwodXJsKVxuICAgICAgICAgICAgPyBnZXRTdHlsZURvd25sb2FkVXJsKHVybCwgYWNjZXNzVG9rZW4gfHwgbWFwYm94QXBpQWNjZXNzVG9rZW4sIG1hcGJveEFwaVVybClcbiAgICAgICAgICAgIDogdXJsXG4gICAgICAgIH0pKVxuICAgICAgICAubWFwKExPQURfTUFQX1NUWUxFX1RBU0spXG4gICAgKS5iaW1hcChcbiAgICAgIC8vIHN1Y2Nlc3NcbiAgICAgIHJlc3VsdHMgPT5cbiAgICAgICAgbG9hZE1hcFN0eWxlcyhcbiAgICAgICAgICByZXN1bHRzLnJlZHVjZShcbiAgICAgICAgICAgIChhY2N1LCB7aWQsIHN0eWxlfSkgPT4gKHtcbiAgICAgICAgICAgICAgLi4uYWNjdSxcbiAgICAgICAgICAgICAgW2lkXToge1xuICAgICAgICAgICAgICAgIC4uLm1hcFN0eWxlc1tpZF0sXG4gICAgICAgICAgICAgICAgc3R5bGVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB7fVxuICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICAgIC8vIGVycm9yXG4gICAgICBsb2FkTWFwU3R5bGVFcnJcbiAgICApXG4gIF07XG59XG4vKipcbiAqIFJlc2V0IG1hcCBzdHlsZSBjb25maWcgdG8gaW5pdGlhbCBzdGF0ZVxuICogQG1lbWJlcm9mIG1hcFN0eWxlVXBkYXRlcnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSBgbWFwU3R5bGVgXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBuZXh0U3RhdGVcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHJlc2V0TWFwQ29uZmlnTWFwU3R5bGVVcGRhdGVyID0gc3RhdGUgPT4ge1xuICBjb25zdCBlbXB0eUNvbmZpZyA9IHtcbiAgICAuLi5JTklUSUFMX01BUF9TVFlMRSxcbiAgICBtYXBib3hBcGlBY2Nlc3NUb2tlbjogc3RhdGUubWFwYm94QXBpQWNjZXNzVG9rZW4sXG4gICAgbWFwYm94QXBpVXJsOiBzdGF0ZS5tYXBib3hBcGlVcmwsXG4gICAgbWFwU3R5bGVzUmVwbGFjZURlZmF1bHQ6IHN0YXRlLm1hcFN0eWxlc1JlcGxhY2VEZWZhdWx0LFxuICAgIC4uLnN0YXRlLmluaXRpYWxTdGF0ZSxcbiAgICBtYXBTdHlsZXM6IHN0YXRlLm1hcFN0eWxlcyxcbiAgICBpbml0aWFsU3RhdGU6IHN0YXRlLmluaXRpYWxTdGF0ZVxuICB9O1xuXG4gIHJldHVybiBtYXBTdHlsZUNoYW5nZVVwZGF0ZXIoZW1wdHlDb25maWcsIHtwYXlsb2FkOiBlbXB0eUNvbmZpZy5zdHlsZVR5cGV9KTtcbn07XG5cbi8qKlxuICogQ2FsbGJhY2sgd2hlbiBhIGN1c3RvbSBtYXAgc3R5bGUgb2JqZWN0IGlzIHJlY2VpdmVkXG4gKiBAbWVtYmVyb2YgbWFwU3R5bGVVcGRhdGVyc1xuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIGBtYXBTdHlsZWBcbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24ucGF5bG9hZFxuICogQHBhcmFtIHtzdHJpbmd9IGFjdGlvbi5wYXlsb2FkLmljb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24ucGF5bG9hZC5zdHlsZVxuICogQHBhcmFtIHsqfSBhY3Rpb24ucGF5bG9hZC5lcnJvclxuICogQHJldHVybnMge09iamVjdH0gbmV4dFN0YXRlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBsb2FkQ3VzdG9tTWFwU3R5bGVVcGRhdGVyID0gKHN0YXRlLCB7cGF5bG9hZDoge2ljb24sIHN0eWxlLCBlcnJvcn19KSA9PiAoe1xuICAuLi5zdGF0ZSxcbiAgaW5wdXRTdHlsZToge1xuICAgIC4uLnN0YXRlLmlucHV0U3R5bGUsXG4gICAgLy8gc3R5bGUganNvbiBhbmQgaWNvbiB3aWxsIGxvYWQgYXN5bmNocm9ub3VzbHlcbiAgICAuLi4oc3R5bGVcbiAgICAgID8ge1xuICAgICAgICAgIGlkOiBzdHlsZS5pZCB8fCBnZW5lcmF0ZUhhc2hJZCgpLFxuICAgICAgICAgIC8vIG1ha2UgYSBjb3B5IG9mIHRoZSBzdHlsZSBvYmplY3RcbiAgICAgICAgICBzdHlsZTogY2xvbmVEZWVwKHN0eWxlKSxcbiAgICAgICAgICBsYWJlbDogc3R5bGUubmFtZSxcbiAgICAgICAgICAvLyBnYXRoZXJpbmcgbGF5ZXIgZ3JvdXAgaW5mbyBmcm9tIHN0eWxlIGpzb25cbiAgICAgICAgICBsYXllckdyb3VwczogZ2V0TGF5ZXJHcm91cHNGcm9tU3R5bGUoc3R5bGUpXG4gICAgICAgIH1cbiAgICAgIDoge30pLFxuICAgIC4uLihpY29uID8ge2ljb259IDoge30pLFxuICAgIC4uLihlcnJvciAhPT0gdW5kZWZpbmVkID8ge2Vycm9yfSA6IHt9KVxuICB9XG59KTtcblxuLyoqXG4gKiBJbnB1dCBhIGN1c3RvbSBtYXAgc3R5bGUgb2JqZWN0XG4gKiBAbWVtYmVyb2YgbWFwU3R5bGVVcGRhdGVyc1xuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIGBtYXBTdHlsZWBcbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24gYWN0aW9uIG9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvbi5wYXlsb2FkIGlucHV0U3R5bGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBhY3Rpb24ucGF5bG9hZC51cmwgc3R5bGUgdXJsIGUuZy4gYCdtYXBib3g6Ly9zdHlsZXMvaGVzaGFuL3h4eHh4eXl5eXp6eidgXG4gKiBAcGFyYW0ge3N0cmluZ30gYWN0aW9uLnBheWxvYWQuaWQgc3R5bGUgdXJsIGUuZy4gYCdjdXN0b21fc3R5bGVfMSdgXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uLnBheWxvYWQuc3R5bGUgYWN0dWFsIG1hcGJveCBzdHlsZSBqc29uXG4gKiBAcGFyYW0ge3N0cmluZ30gYWN0aW9uLnBheWxvYWQubmFtZSBzdHlsZSBuYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uLnBheWxvYWQubGF5ZXJHcm91cHMgbGF5ZXIgZ3JvdXBzIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2V0IG1hcCBsYXllciB2aXNpYmlsaXR5XG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uLnBheWxvYWQuaWNvbiBpY29uIGltYWdlIGRhdGEgdXJsXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBuZXh0U3RhdGVcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IGlucHV0TWFwU3R5bGVVcGRhdGVyID0gKHN0YXRlLCB7cGF5bG9hZDoge2lucHV0U3R5bGUsIG1hcFN0YXRlfX0pID0+IHtcbiAgY29uc3QgdXBkYXRlZCA9IHtcbiAgICAuLi5zdGF0ZS5pbnB1dFN0eWxlLFxuICAgIC4uLmlucHV0U3R5bGVcbiAgfTtcblxuICBjb25zdCBpc1ZhbGlkID0gaXNWYWxpZFN0eWxlVXJsKHVwZGF0ZWQudXJsKTtcbiAgY29uc3QgaWNvbiA9IGlzVmFsaWRcbiAgICA/IGdldFN0eWxlSW1hZ2VJY29uKHtcbiAgICAgICAgbWFwU3RhdGUsXG4gICAgICAgIHN0eWxlVXJsOiB1cGRhdGVkLnVybCxcbiAgICAgICAgbWFwYm94QXBpQWNjZXNzVG9rZW46IHVwZGF0ZWQuYWNjZXNzVG9rZW4gfHwgc3RhdGUubWFwYm94QXBpQWNjZXNzVG9rZW4sXG4gICAgICAgIG1hcGJveEFwaVVybDogc3RhdGUubWFwYm94QXBpVXJsIHx8IERFRkFVTFRfTUFQQk9YX0FQSV9VUkxcbiAgICAgIH0pXG4gICAgOiBzdGF0ZS5pbnB1dFN0eWxlLmljb247XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZSxcbiAgICBpbnB1dFN0eWxlOiB7XG4gICAgICAuLi51cGRhdGVkLFxuICAgICAgaXNWYWxpZCxcbiAgICAgIGljb25cbiAgICB9XG4gIH07XG59O1xuXG4vKipcbiAqIEFkZCBtYXAgc3R5bGUgZnJvbSB1c2VyIGlucHV0IHRvIHJlZHVjZXIgYW5kIHNldCBpdCB0byBjdXJyZW50IHN0eWxlXG4gKiBUaGlzIGFjdGlvbiBpcyBjYWxsZWQgd2hlbiB1c2VyIGNsaWNrIGNvbmZpcm0gYWZ0ZXIgcHV0dGluZyBpbiBhIHZhbGlkIHN0eWxlIHVybCBpbiB0aGUgY3VzdG9tIG1hcCBzdHlsZSBkaWFsb2cuXG4gKiBJdCBzaG91bGQgbm90IGJlIGNhbGxlZCBmcm9tIG91dHNpZGUga2VwbGVyLmdsIHdpdGhvdXQgYSB2YWxpZCBgaW5wdXRTdHlsZWAgaW4gdGhlIGBtYXBTdHlsZWAgcmVkdWNlci5cbiAqIEBtZW1iZXJvZiBtYXBTdHlsZVVwZGF0ZXJzXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgYG1hcFN0eWxlYFxuICogQHJldHVybnMge09iamVjdH0gbmV4dFN0YXRlXG4gKi9cbmV4cG9ydCBjb25zdCBhZGRDdXN0b21NYXBTdHlsZVVwZGF0ZXIgPSBzdGF0ZSA9PiB7XG4gIGNvbnN0IHN0eWxlSWQgPSBzdGF0ZS5pbnB1dFN0eWxlLmlkO1xuICBjb25zdCBuZXdTdGF0ZSA9IHtcbiAgICAuLi5zdGF0ZSxcbiAgICBtYXBTdHlsZXM6IHtcbiAgICAgIC4uLnN0YXRlLm1hcFN0eWxlcyxcbiAgICAgIFtzdHlsZUlkXTogc3RhdGUuaW5wdXRTdHlsZVxuICAgIH0sXG4gICAgLy8gc2V0IHRvIGRlZmF1bHRcbiAgICBpbnB1dFN0eWxlOiBnZXRJbml0aWFsSW5wdXRTdHlsZSgpXG4gIH07XG4gIC8vIHNldCBuZXcgc3R5bGVcbiAgcmV0dXJuIG1hcFN0eWxlQ2hhbmdlVXBkYXRlcihuZXdTdGF0ZSwge3BheWxvYWQ6IHN0eWxlSWR9KTtcbn07XG5cbi8qKlxuICogVXBkYXRlcyAzZCBidWlsZGluZyBjb2xvclxuICogQG1lbWJlcm9mIG1hcFN0eWxlVXBkYXRlcnNcbiAqIEBwYXJhbSBzdGF0ZVxuICogQHBhcmFtIGNvbG9yXG4gKiBAcmV0dXJuIHtPYmplY3R9IG5leHRTdGF0ZVxuICovXG5leHBvcnQgY29uc3Qgc2V0M2RCdWlsZGluZ0NvbG9yVXBkYXRlciA9IChzdGF0ZSwge3BheWxvYWQ6IGNvbG9yfSkgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIHRocmVlREJ1aWxkaW5nQ29sb3I6IGNvbG9yLFxuICBjdXN0b20zREJ1aWxkaW5nQ29sb3I6IHRydWVcbn0pO1xuXG4vKipcbiAqIFJldHVybiB0aGUgaW5pdGlhbCBpbnB1dCBzdHlsZVxuICogQHJldHVybiBPYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEluaXRpYWxJbnB1dFN0eWxlKCkge1xuICByZXR1cm4ge1xuICAgIGFjY2Vzc1Rva2VuOiBudWxsLFxuICAgIGVycm9yOiBmYWxzZSxcbiAgICBpc1ZhbGlkOiBmYWxzZSxcbiAgICBsYWJlbDogbnVsbCxcbiAgICBzdHlsZTogbnVsbCxcbiAgICB1cmw6IG51bGwsXG4gICAgaWNvbjogbnVsbCxcbiAgICBjdXN0b206IHRydWVcbiAgfTtcbn1cbiJdfQ==