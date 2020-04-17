"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _d3Scale = require("d3-scale");

var _moment = _interopRequireDefault(require("moment"));

var _d3Array = require("d3-array");

var _reselect = require("reselect");

var _reactVis = require("react-vis");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _classnames = _interopRequireDefault(require("classnames"));

var _rangeBrush = _interopRequireDefault(require("./range-brush"));

var _filterUtils = require("../../utils/filter-utils");

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  background-color: #d3d8e0;\n  border-radius: 2px;\n  color: ", ";\n  font-size: 9px;\n  margin: 4px;\n  padding: 3px 6px;\n  pointer-events: none;\n  user-select: none;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  .histogram-bars {\n    rect {\n      fill: ", ";\n    }\n    rect.in-range {\n      fill: ", ";\n    }\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  .rv-xy-plot__inner path {\n    fill: none;\n    stroke-width: 1.5;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var chartMargin = {
  top: 8,
  bottom: 0,
  left: 0,
  right: 0
};
var chartH = 52;
var containerH = 68;
var histogramStyle = {
  highlightW: 0.7,
  unHighlightedW: 0.4
};

var RangePlot =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(RangePlot, _Component);

  function RangePlot() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, RangePlot);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(RangePlot)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      hoveredDP: null
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "domainSelector", function (props) {
      return props.lineChart && props.lineChart.xDomain;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "hintFormatter", (0, _reselect.createSelector)(_this.domainSelector, function (domain) {
      return (0, _filterUtils.getTimeWidgetHintFormatter)(domain);
    }));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onMouseMove", function (hoveredDP) {
      _this.setState({
        hoveredDP: hoveredDP
      });
    });
    return _this;
  }

  (0, _createClass2["default"])(RangePlot, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          onBrush = _this$props.onBrush,
          range = _this$props.range,
          value = _this$props.value,
          width = _this$props.width,
          plotType = _this$props.plotType,
          lineChart = _this$props.lineChart,
          histogram = _this$props.histogram;
      var domain = [histogram[0].x0, histogram[histogram.length - 1].x1];

      var brushComponent = _react["default"].createElement(_rangeBrush["default"], {
        domain: domain,
        onBrush: onBrush,
        range: range,
        value: value,
        width: width
      });

      return _react["default"].createElement("div", {
        style: {
          height: "".concat(containerH, "px"),
          position: 'relative'
        }
      }, plotType === 'lineChart' ? _react["default"].createElement(LineChart, {
        hoveredDP: this.state.hoveredDP,
        width: width,
        height: containerH,
        margin: chartMargin,
        children: brushComponent,
        onMouseMove: this.onMouseMove,
        yDomain: lineChart.yDomain,
        hintFormat: this.hintFormatter(this.props),
        data: lineChart.series
      }) : _react["default"].createElement(Histogram, {
        width: width,
        height: chartH,
        value: value,
        margin: chartMargin,
        histogram: histogram,
        brushComponent: brushComponent
      }));
    }
  }]);
  return RangePlot;
}(_react.Component);

exports["default"] = RangePlot;
(0, _defineProperty2["default"])(RangePlot, "propTypes", {
  value: _propTypes["default"].arrayOf(_propTypes["default"].number).isRequired,
  histogram: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    x0: _propTypes["default"].number,
    x1: _propTypes["default"].number
  })),
  lineChart: _propTypes["default"].object,
  plotType: _propTypes["default"].string,
  isEnlarged: _propTypes["default"].bool,
  onBlur: _propTypes["default"].func,
  width: _propTypes["default"].number.isRequired
});

var Histogram = function Histogram(_ref) {
  var width = _ref.width,
      height = _ref.height,
      margin = _ref.margin,
      histogram = _ref.histogram,
      value = _ref.value,
      brushComponent = _ref.brushComponent;
  var domain = [histogram[0].x0, histogram[histogram.length - 1].x1];
  var barWidth = width / histogram.length;
  var x = (0, _d3Scale.scaleLinear)().domain(domain).range([0, width]);
  var y = (0, _d3Scale.scaleLinear)().domain([0, (0, _d3Array.max)(histogram, function (d) {
    return d.count;
  })]).range([0, height]);
  return _react["default"].createElement(HistogramWrapper, {
    width: width,
    height: height,
    style: {
      marginTop: "".concat(margin.top, "px")
    }
  }, _react["default"].createElement("g", {
    className: "histogram-bars"
  }, histogram.map(function (bar) {
    var inRange = bar.x0 >= value[0] && bar.x1 <= value[1];
    var wRatio = inRange ? histogramStyle.highlightW : histogramStyle.unHighlightedW;
    return _react["default"].createElement("rect", {
      className: (0, _classnames["default"])({
        'in-range': inRange
      }),
      key: bar.x0,
      height: y(bar.count),
      width: barWidth * wRatio,
      x: x(bar.x0) + barWidth * (1 - wRatio) / 2,
      rx: 1,
      ry: 1,
      y: height - y(bar.count)
    });
  })), brushComponent);
};

var LineChartWrapper = _styledComponents["default"].div(_templateObject());

var HistogramWrapper = _styledComponents["default"].svg(_templateObject2(), function (props) {
  return props.theme.histogramFillOutRange;
}, function (props) {
  return props.theme.histogramFillInRange;
});

var LineChart = function LineChart(_ref2) {
  var width = _ref2.width,
      height = _ref2.height,
      yDomain = _ref2.yDomain,
      hintFormat = _ref2.hintFormat,
      hoveredDP = _ref2.hoveredDP,
      margin = _ref2.margin,
      color = _ref2.color,
      data = _ref2.data,
      onMouseMove = _ref2.onMouseMove,
      children = _ref2.children;
  var brushData = [{
    x: data[0].x,
    y: yDomain[1],
    customComponent: function customComponent() {
      return children;
    }
  }];
  return _react["default"].createElement(LineChartWrapper, null, _react["default"].createElement(_reactVis.XYPlot, {
    width: width,
    height: height,
    margin: _objectSpread({}, margin, {
      bottom: 12
    })
  }, _react["default"].createElement(_reactVis.LineSeries, {
    strokeWidth: 2,
    color: color,
    data: data,
    onNearestX: onMouseMove
  }), _react["default"].createElement(_reactVis.MarkSeries, {
    data: hoveredDP ? [hoveredDP] : [],
    color: color,
    size: 3
  }), _react["default"].createElement(_reactVis.CustomSVGSeries, {
    data: brushData
  }), hoveredDP ? _react["default"].createElement(_reactVis.Hint, {
    value: hoveredDP
  }, _react["default"].createElement(HintContent, (0, _extends2["default"])({}, hoveredDP, {
    format: function format(val) {
      return _moment["default"].utc(val).format(hintFormat);
    }
  }))) : null));
};

var StyledHint = _styledComponents["default"].div(_templateObject3(), function (props) {
  return props.theme.textColorLT;
});

var HintContent = function HintContent(_ref3) {
  var x = _ref3.x,
      y = _ref3.y,
      format = _ref3.format;
  return _react["default"].createElement(StyledHint, null, _react["default"].createElement("div", {
    className: "hint--x"
  }, format(x)), _react["default"].createElement("div", {
    className: "row"
  }, y));
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9yYW5nZS1wbG90LmpzIl0sIm5hbWVzIjpbImNoYXJ0TWFyZ2luIiwidG9wIiwiYm90dG9tIiwibGVmdCIsInJpZ2h0IiwiY2hhcnRIIiwiY29udGFpbmVySCIsImhpc3RvZ3JhbVN0eWxlIiwiaGlnaGxpZ2h0VyIsInVuSGlnaGxpZ2h0ZWRXIiwiUmFuZ2VQbG90IiwiaG92ZXJlZERQIiwicHJvcHMiLCJsaW5lQ2hhcnQiLCJ4RG9tYWluIiwiZG9tYWluU2VsZWN0b3IiLCJkb21haW4iLCJzZXRTdGF0ZSIsIm9uQnJ1c2giLCJyYW5nZSIsInZhbHVlIiwid2lkdGgiLCJwbG90VHlwZSIsImhpc3RvZ3JhbSIsIngwIiwibGVuZ3RoIiwieDEiLCJicnVzaENvbXBvbmVudCIsImhlaWdodCIsInBvc2l0aW9uIiwic3RhdGUiLCJvbk1vdXNlTW92ZSIsInlEb21haW4iLCJoaW50Rm9ybWF0dGVyIiwic2VyaWVzIiwiQ29tcG9uZW50IiwiUHJvcFR5cGVzIiwiYXJyYXlPZiIsIm51bWJlciIsImlzUmVxdWlyZWQiLCJzaGFwZSIsIm9iamVjdCIsInN0cmluZyIsImlzRW5sYXJnZWQiLCJib29sIiwib25CbHVyIiwiZnVuYyIsIkhpc3RvZ3JhbSIsIm1hcmdpbiIsImJhcldpZHRoIiwieCIsInkiLCJkIiwiY291bnQiLCJtYXJnaW5Ub3AiLCJtYXAiLCJiYXIiLCJpblJhbmdlIiwid1JhdGlvIiwiTGluZUNoYXJ0V3JhcHBlciIsInN0eWxlZCIsImRpdiIsIkhpc3RvZ3JhbVdyYXBwZXIiLCJzdmciLCJ0aGVtZSIsImhpc3RvZ3JhbUZpbGxPdXRSYW5nZSIsImhpc3RvZ3JhbUZpbGxJblJhbmdlIiwiTGluZUNoYXJ0IiwiaGludEZvcm1hdCIsImNvbG9yIiwiZGF0YSIsImNoaWxkcmVuIiwiYnJ1c2hEYXRhIiwiY3VzdG9tQ29tcG9uZW50IiwidmFsIiwibW9tZW50IiwidXRjIiwiZm9ybWF0IiwiU3R5bGVk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SU4sSUFSTixDQURGLENBREY7QUFjRCxDQTVCRDs7QUE4QkEsSUFBTVUsVUFBVSxHQUFHbEIsNkJBQU9DLEdBQVYscUJBR0wsVUFBQWpELEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNvRCxLQUFOLENBQVllLFdBQWhCO0FBQUEsQ0FIQSxDQUFoQjs7QUFVQSxJQUFNQyxXQUFXLEdBQUcsU0FBZEEsV0FBYztBQUFBLE1BQUU5QixDQUFGLFNBQUVBLENBQUY7QUFBQSxNQUFLQyxDQUFMLFNBQUtBLENBQUw7QUFBQSxNQUFRMEIsTUFBUixTQUFRQSxNQUFSO0FBQUEsU0FDbEIsZ0NBQUMsVUFBRCxRQUNFO0FBQUssSUFBQSxTQUFTLEVBQUM7QUFBZixLQUEwQkEsTUFBTSxDQUFDM0IsQ0FBRCxDQUFoQyxDQURGLEVBRUU7QUFBSyxJQUFBLFNBQVMsRUFBQztBQUFmLEtBQXNCQyxDQUF0QixDQUZGLENBRGtCO0FBQUEsQ0FBcEIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMjAgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQge3NjYWxlTGluZWFyfSBmcm9tICdkMy1zY2FsZSc7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQge21heH0gZnJvbSAnZDMtYXJyYXknO1xuaW1wb3J0IHtjcmVhdGVTZWxlY3Rvcn0gZnJvbSAncmVzZWxlY3QnO1xuaW1wb3J0IHtMaW5lU2VyaWVzLCBYWVBsb3QsIEN1c3RvbVNWR1NlcmllcywgSGludCwgTWFya1Nlcmllc30gZnJvbSAncmVhY3QtdmlzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCBSYW5nZUJydXNoIGZyb20gJy4vcmFuZ2UtYnJ1c2gnO1xuaW1wb3J0IHtnZXRUaW1lV2lkZ2V0SGludEZvcm1hdHRlcn0gZnJvbSAndXRpbHMvZmlsdGVyLXV0aWxzJztcblxuY29uc3QgY2hhcnRNYXJnaW4gPSB7dG9wOiA4LCBib3R0b206IDAsIGxlZnQ6IDAsIHJpZ2h0OiAwfTtcbmNvbnN0IGNoYXJ0SCA9IDUyO1xuY29uc3QgY29udGFpbmVySCA9IDY4O1xuY29uc3QgaGlzdG9ncmFtU3R5bGUgPSB7XG4gIGhpZ2hsaWdodFc6IDAuNyxcbiAgdW5IaWdobGlnaHRlZFc6IDAuNFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmFuZ2VQbG90IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICB2YWx1ZTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm51bWJlcikuaXNSZXF1aXJlZCxcbiAgICBoaXN0b2dyYW06IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgeDA6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIHgxOiBQcm9wVHlwZXMubnVtYmVyXG4gICAgICB9KVxuICAgICksXG4gICAgbGluZUNoYXJ0OiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIHBsb3RUeXBlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGlzRW5sYXJnZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIG9uQmx1cjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgd2lkdGg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZFxuICB9O1xuXG4gIHN0YXRlID0ge1xuICAgIGhvdmVyZWREUDogbnVsbFxuICB9O1xuXG4gIGRvbWFpblNlbGVjdG9yID0gcHJvcHMgPT4gcHJvcHMubGluZUNoYXJ0ICYmIHByb3BzLmxpbmVDaGFydC54RG9tYWluO1xuICBoaW50Rm9ybWF0dGVyID0gY3JlYXRlU2VsZWN0b3IodGhpcy5kb21haW5TZWxlY3RvciwgZG9tYWluID0+IGdldFRpbWVXaWRnZXRIaW50Rm9ybWF0dGVyKGRvbWFpbikpO1xuXG4gIG9uTW91c2VNb3ZlID0gaG92ZXJlZERQID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtob3ZlcmVkRFB9KTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge29uQnJ1c2gsIHJhbmdlLCB2YWx1ZSwgd2lkdGgsIHBsb3RUeXBlLCBsaW5lQ2hhcnQsIGhpc3RvZ3JhbX0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGRvbWFpbiA9IFtoaXN0b2dyYW1bMF0ueDAsIGhpc3RvZ3JhbVtoaXN0b2dyYW0ubGVuZ3RoIC0gMV0ueDFdO1xuXG4gICAgY29uc3QgYnJ1c2hDb21wb25lbnQgPSAoXG4gICAgICA8UmFuZ2VCcnVzaCBkb21haW49e2RvbWFpbn0gb25CcnVzaD17b25CcnVzaH0gcmFuZ2U9e3JhbmdlfSB2YWx1ZT17dmFsdWV9IHdpZHRoPXt3aWR0aH0gLz5cbiAgICApO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBoZWlnaHQ6IGAke2NvbnRhaW5lckh9cHhgLFxuICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIHtwbG90VHlwZSA9PT0gJ2xpbmVDaGFydCcgPyAoXG4gICAgICAgICAgPExpbmVDaGFydFxuICAgICAgICAgICAgaG92ZXJlZERQPXt0aGlzLnN0YXRlLmhvdmVyZWREUH1cbiAgICAgICAgICAgIHdpZHRoPXt3aWR0aH1cbiAgICAgICAgICAgIGhlaWdodD17Y29udGFpbmVySH1cbiAgICAgICAgICAgIG1hcmdpbj17Y2hhcnRNYXJnaW59XG4gICAgICAgICAgICBjaGlsZHJlbj17YnJ1c2hDb21wb25lbnR9XG4gICAgICAgICAgICBvbk1vdXNlTW92ZT17dGhpcy5vbk1vdXNlTW92ZX1cbiAgICAgICAgICAgIHlEb21haW49e2xpbmVDaGFydC55RG9tYWlufVxuICAgICAgICAgICAgaGludEZvcm1hdD17dGhpcy5oaW50Rm9ybWF0dGVyKHRoaXMucHJvcHMpfVxuICAgICAgICAgICAgZGF0YT17bGluZUNoYXJ0LnNlcmllc31cbiAgICAgICAgICAvPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxIaXN0b2dyYW1cbiAgICAgICAgICAgIHdpZHRoPXt3aWR0aH1cbiAgICAgICAgICAgIGhlaWdodD17Y2hhcnRIfVxuICAgICAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICAgICAgbWFyZ2luPXtjaGFydE1hcmdpbn1cbiAgICAgICAgICAgIGhpc3RvZ3JhbT17aGlzdG9ncmFtfVxuICAgICAgICAgICAgYnJ1c2hDb21wb25lbnQ9e2JydXNoQ29tcG9uZW50fVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmNvbnN0IEhpc3RvZ3JhbSA9ICh7d2lkdGgsIGhlaWdodCwgbWFyZ2luLCBoaXN0b2dyYW0sIHZhbHVlLCBicnVzaENvbXBvbmVudH0pID0+IHtcbiAgY29uc3QgZG9tYWluID0gW2hpc3RvZ3JhbVswXS54MCwgaGlzdG9ncmFtW2hpc3RvZ3JhbS5sZW5ndGggLSAxXS54MV07XG4gIGNvbnN0IGJhcldpZHRoID0gd2lkdGggLyBoaXN0b2dyYW0ubGVuZ3RoO1xuXG4gIGNvbnN0IHggPSBzY2FsZUxpbmVhcigpXG4gICAgLmRvbWFpbihkb21haW4pXG4gICAgLnJhbmdlKFswLCB3aWR0aF0pO1xuXG4gIGNvbnN0IHkgPSBzY2FsZUxpbmVhcigpXG4gICAgLmRvbWFpbihbMCwgbWF4KGhpc3RvZ3JhbSwgZCA9PiBkLmNvdW50KV0pXG4gICAgLnJhbmdlKFswLCBoZWlnaHRdKTtcblxuICByZXR1cm4gKFxuICAgIDxIaXN0b2dyYW1XcmFwcGVyIHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9IHN0eWxlPXt7bWFyZ2luVG9wOiBgJHttYXJnaW4udG9wfXB4YH19PlxuICAgICAgPGcgY2xhc3NOYW1lPVwiaGlzdG9ncmFtLWJhcnNcIj5cbiAgICAgICAge2hpc3RvZ3JhbS5tYXAoYmFyID0+IHtcbiAgICAgICAgICBjb25zdCBpblJhbmdlID0gYmFyLngwID49IHZhbHVlWzBdICYmIGJhci54MSA8PSB2YWx1ZVsxXTtcbiAgICAgICAgICBjb25zdCB3UmF0aW8gPSBpblJhbmdlID8gaGlzdG9ncmFtU3R5bGUuaGlnaGxpZ2h0VyA6IGhpc3RvZ3JhbVN0eWxlLnVuSGlnaGxpZ2h0ZWRXO1xuXG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxyZWN0XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyh7J2luLXJhbmdlJzogaW5SYW5nZX0pfVxuICAgICAgICAgICAgICBrZXk9e2Jhci54MH1cbiAgICAgICAgICAgICAgaGVpZ2h0PXt5KGJhci5jb3VudCl9XG4gICAgICAgICAgICAgIHdpZHRoPXtiYXJXaWR0aCAqIHdSYXRpb31cbiAgICAgICAgICAgICAgeD17eChiYXIueDApICsgKGJhcldpZHRoICogKDEgLSB3UmF0aW8pKSAvIDJ9XG4gICAgICAgICAgICAgIHJ4PXsxfVxuICAgICAgICAgICAgICByeT17MX1cbiAgICAgICAgICAgICAgeT17aGVpZ2h0IC0geShiYXIuY291bnQpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApO1xuICAgICAgICB9KX1cbiAgICAgIDwvZz5cbiAgICAgIHticnVzaENvbXBvbmVudH1cbiAgICA8L0hpc3RvZ3JhbVdyYXBwZXI+XG4gICk7XG59O1xuXG5jb25zdCBMaW5lQ2hhcnRXcmFwcGVyID0gc3R5bGVkLmRpdmBcbiAgLnJ2LXh5LXBsb3RfX2lubmVyIHBhdGgge1xuICAgIGZpbGw6IG5vbmU7XG4gICAgc3Ryb2tlLXdpZHRoOiAxLjU7XG4gIH1cbmA7XG5cbmNvbnN0IEhpc3RvZ3JhbVdyYXBwZXIgPSBzdHlsZWQuc3ZnYFxuICAuaGlzdG9ncmFtLWJhcnMge1xuICAgIHJlY3Qge1xuICAgICAgZmlsbDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5oaXN0b2dyYW1GaWxsT3V0UmFuZ2V9O1xuICAgIH1cbiAgICByZWN0LmluLXJhbmdlIHtcbiAgICAgIGZpbGw6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuaGlzdG9ncmFtRmlsbEluUmFuZ2V9O1xuICAgIH1cbiAgfVxuYDtcbmNvbnN0IExpbmVDaGFydCA9ICh7XG4gIHdpZHRoLFxuICBoZWlnaHQsXG4gIHlEb21haW4sXG4gIGhpbnRGb3JtYXQsXG4gIGhvdmVyZWREUCxcbiAgbWFyZ2luLFxuICBjb2xvcixcbiAgZGF0YSxcbiAgb25Nb3VzZU1vdmUsXG4gIGNoaWxkcmVuXG59KSA9PiB7XG4gIGNvbnN0IGJydXNoRGF0YSA9IFt7eDogZGF0YVswXS54LCB5OiB5RG9tYWluWzFdLCBjdXN0b21Db21wb25lbnQ6ICgpID0+IGNoaWxkcmVufV07XG5cbiAgcmV0dXJuIChcbiAgICA8TGluZUNoYXJ0V3JhcHBlcj5cbiAgICAgIDxYWVBsb3Qgd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0gbWFyZ2luPXt7Li4ubWFyZ2luLCBib3R0b206IDEyfX0+XG4gICAgICAgIDxMaW5lU2VyaWVzIHN0cm9rZVdpZHRoPXsyfSBjb2xvcj17Y29sb3J9IGRhdGE9e2RhdGF9IG9uTmVhcmVzdFg9e29uTW91c2VNb3ZlfSAvPlxuICAgICAgICA8TWFya1NlcmllcyBkYXRhPXtob3ZlcmVkRFAgPyBbaG92ZXJlZERQXSA6IFtdfSBjb2xvcj17Y29sb3J9IHNpemU9ezN9IC8+XG4gICAgICAgIDxDdXN0b21TVkdTZXJpZXMgZGF0YT17YnJ1c2hEYXRhfSAvPlxuICAgICAgICB7aG92ZXJlZERQID8gKFxuICAgICAgICAgIDxIaW50IHZhbHVlPXtob3ZlcmVkRFB9PlxuICAgICAgICAgICAgPEhpbnRDb250ZW50IHsuLi5ob3ZlcmVkRFB9IGZvcm1hdD17dmFsID0+IG1vbWVudC51dGModmFsKS5mb3JtYXQoaGludEZvcm1hdCl9IC8+XG4gICAgICAgICAgPC9IaW50PlxuICAgICAgICApIDogbnVsbH1cbiAgICAgIDwvWFlQbG90PlxuICAgIDwvTGluZUNoYXJ0V3JhcHBlcj5cbiAgKTtcbn07XG5cbmNvbnN0IFN0eWxlZEhpbnQgPSBzdHlsZWQuZGl2YFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDNkOGUwO1xuICBib3JkZXItcmFkaXVzOiAycHg7XG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvckxUfTtcbiAgZm9udC1zaXplOiA5cHg7XG4gIG1hcmdpbjogNHB4O1xuICBwYWRkaW5nOiAzcHggNnB4O1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG5gO1xuY29uc3QgSGludENvbnRlbnQgPSAoe3gsIHksIGZvcm1hdH0pID0+IChcbiAgPFN0eWxlZEhpbnQ+XG4gICAgPGRpdiBjbGFzc05hbWU9XCJoaW50LS14XCI+e2Zvcm1hdCh4KX08L2Rpdj5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPnt5fTwvZGl2PlxuICA8L1N0eWxlZEhpbnQ+XG4pO1xuIl19