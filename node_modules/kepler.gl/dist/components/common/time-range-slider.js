"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = TimeRangeSliderFactory;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _moment = _interopRequireDefault(require("moment"));

var _window = require("global/window");

var _lodash = _interopRequireDefault(require("lodash.throttle"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reselect = require("reselect");

var _icons = require("./icons");

var _styledComponents2 = require("./styled-components");

var _rangeSlider = _interopRequireDefault(require("./range-slider"));

var _timeSliderMarker = _interopRequireDefault(require("./time-slider-marker"));

var _playbackControls = _interopRequireDefault(require("./animation-control/playback-controls"));

var _defaultSettings = require("../../constants/default-settings");

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  align-items: center;\n  font-size: 11px;\n  justify-content: ", ";\n\n  .horizontal-bar {\n    padding: 0 12px;\n    color: ", ";\n  }\n\n  .time-value {\n    display: flex;\n    flex-direction: ", ";\n    align-items: flex-start;\n\n    span {\n      color: ", ";\n    }\n  }\n\n  .time-value:last-child {\n    align-items: flex-end;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  align-items: flex-end;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n\n  .time-range-slider__control {\n    margin-bottom: 12px;\n    margin-right: 30px;\n  }\n\n  .playback-control-button {\n    padding: 9px 12px;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var animationControlWidth = 140;

var StyledSliderContainer = _styledComponents["default"].div(_templateObject());

TimeRangeSliderFactory.deps = [_playbackControls["default"]];

function TimeRangeSliderFactory(PlaybackControls) {
  var TimeRangeSlider =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2["default"])(TimeRangeSlider, _Component);

    function TimeRangeSlider(_props) {
      var _this;

      (0, _classCallCheck2["default"])(this, TimeRangeSlider);
      _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(TimeRangeSlider).call(this, _props));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "timeSelector", function (props) {
        return props.currentTime;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "formatSelector", function (props) {
        return props.format;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "displayTimeSelector", (0, _reselect.createSelector)(_this.timeSelector, _this.formatSelector, function (currentTime, format) {
        var groupTime = Array.isArray(currentTime) ? currentTime : [currentTime];
        return groupTime.reduce(function (accu, curr) {
          var displayDateTime = _moment["default"].utc(curr).format(format);

          var _displayDateTime$spli = displayDateTime.split(' '),
              _displayDateTime$spli2 = (0, _slicedToArray2["default"])(_displayDateTime$spli, 2),
              displayDate = _displayDateTime$spli2[0],
              displayTime = _displayDateTime$spli2[1];

          if (!accu.displayDate.includes(displayDate)) {
            accu.displayDate.push(displayDate);
          }

          accu.displayTime.push(displayTime);
          return accu;
        }, {
          displayDate: [],
          displayTime: []
        });
      }));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_sliderUpdate", function (args) {
        _this._sliderThrottle.cancel();

        _this._sliderThrottle(args);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_resetAnimation", function () {
        var _this$props = _this.props,
            domain = _this$props.domain,
            value = _this$props.value;
        var value0 = domain[0];
        var value1 = value0 + value[1] - value[0];

        _this.props.onChange([value0, value1]);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_startAnimation", function () {
        _this._pauseAnimation();

        _this.props.toggleAnimation();

        _this.setState({
          isAnimating: true
        });
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_pauseAnimation", function () {
        if (_this._animation) {
          (0, _window.cancelAnimationFrame)(_this._animation);

          _this.props.toggleAnimation();

          _this._animation = null;
        }

        _this.setState({
          isAnimating: false
        });
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_nextFrame", function () {
        _this._animation = null;
        var _this$props2 = _this.props,
            domain = _this$props2.domain,
            value = _this$props2.value;
        var speed = (domain[1] - domain[0]) / _defaultSettings.BASE_SPEED * _this.props.speed; // loop when reaches the end

        var value0 = value[1] + speed > domain[1] ? domain[0] : value[0] + speed;
        var value1 = value0 + value[1] - value[0];

        _this.props.onChange([value0, value1]);
      });
      _this.state = {
        isAnimating: false,
        width: 288
      };
      _this._animation = null;
      _this._sliderThrottle = (0, _lodash["default"])(function () {
        var _this$props3;

        return (_this$props3 = _this.props).onChange.apply(_this$props3, arguments);
      }, 20);
      return _this;
    }

    (0, _createClass2["default"])(TimeRangeSlider, [{
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        if (!this._animation && this.state.isAnimating) {
          this._animation = (0, _window.requestAnimationFrame)(this._nextFrame);
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props4 = this.props,
            domain = _this$props4.domain,
            value = _this$props4.value,
            isEnlarged = _this$props4.isEnlarged,
            hideTimeTitle = _this$props4.hideTimeTitle;
        var isAnimating = this.state.isAnimating;
        return _react["default"].createElement("div", {
          className: "time-range-slider"
        }, !hideTimeTitle ? _react["default"].createElement(TimeTitle, {
          timeFormat: this.props.timeFormat,
          value: value,
          isEnlarged: isEnlarged
        }) : null, _react["default"].createElement(StyledSliderContainer, {
          className: "time-range-slider__container",
          isEnlarged: isEnlarged
        }, isEnlarged ? _react["default"].createElement(PlaybackControls, {
          isAnimatable: this.props.isAnimatable,
          isEnlarged: isEnlarged,
          isAnimating: isAnimating,
          pauseAnimation: this._pauseAnimation,
          resetAnimation: this._resetAnimation,
          startAnimation: this._startAnimation,
          buttonHeight: "12px",
          buttonStyle: "secondary"
        }) : null, _react["default"].createElement("div", {
          style: {
            width: isEnlarged ? "calc(100% - ".concat(animationControlWidth, "px)") : '100%'
          }
        }, _react["default"].createElement(_rangeSlider["default"], {
          range: domain,
          value0: value[0],
          value1: value[1],
          histogram: this.props.histogram,
          lineChart: this.props.lineChart,
          plotType: this.props.plotType,
          isEnlarged: isEnlarged,
          showInput: false,
          step: this.props.step,
          onChange: this._sliderUpdate,
          xAxis: _timeSliderMarker["default"]
        }))));
      }
    }]);
    return TimeRangeSlider;
  }(_react.Component);

  (0, _defineProperty2["default"])(TimeRangeSlider, "propTypes", {
    onChange: _propTypes["default"].func.isRequired,
    domain: _propTypes["default"].arrayOf(_propTypes["default"].number).isRequired,
    value: _propTypes["default"].arrayOf(_propTypes["default"].number).isRequired,
    step: _propTypes["default"].number.isRequired,
    plotType: _propTypes["default"].string,
    histogram: _propTypes["default"].arrayOf(_propTypes["default"].any),
    lineChart: _propTypes["default"].object,
    toggleAnimation: _propTypes["default"].func.isRequired,
    isAnimatable: _propTypes["default"].bool,
    isEnlarged: _propTypes["default"].bool,
    speed: _propTypes["default"].number,
    timeFormat: _propTypes["default"].string,
    hideTimeTitle: _propTypes["default"].bool
  });
  TimeRangeSlider.defaultProps = {
    timeFormat: _defaultSettings.DEFAULT_TIME_FORMAT
  };
  return TimeRangeSlider;
}

var TimeValueWrapper = _styledComponents["default"].div(_templateObject2(), function (props) {
  return props.isEnlarged ? 'center' : 'space-between';
}, function (props) {
  return props.theme.titleTextColor;
}, function (props) {
  return props.isEnlarged ? 'row' : 'column';
}, function (props) {
  return props.theme.titleTextColor;
});

var TimeTitle = function TimeTitle(_ref) {
  var value = _ref.value,
      isEnlarged = _ref.isEnlarged,
      _ref$timeFormat = _ref.timeFormat,
      timeFormat = _ref$timeFormat === void 0 ? _defaultSettings.DEFAULT_TIME_FORMAT : _ref$timeFormat;
  return _react["default"].createElement(TimeValueWrapper, {
    isEnlarged: isEnlarged,
    className: "time-range-slider__time-title"
  }, _react["default"].createElement(TimeValue, {
    key: 0,
    value: _moment["default"].utc(value[0]).format(timeFormat),
    split: !isEnlarged
  }), isEnlarged ? _react["default"].createElement("div", {
    className: "horizontal-bar"
  }, _react["default"].createElement(_icons.Minus, {
    height: "12px"
  })) : null, _react["default"].createElement(TimeValue, {
    key: 1,
    value: _moment["default"].utc(value[1]).format(timeFormat),
    split: !isEnlarged
  }));
};

var TimeValue = function TimeValue(_ref2) {
  var value = _ref2.value,
      split = _ref2.split;
  return (// render two lines if not enlarged
    _react["default"].createElement("div", {
      className: "time-value"
    }, split ? value.split(' ').map(function (v, i) {
      return _react["default"].createElement("div", {
        key: i
      }, i === 0 ? _react["default"].createElement(_styledComponents2.SelectText, null, v) : _react["default"].createElement(_styledComponents2.SelectTextBold, null, v));
    }) : _react["default"].createElement(_styledComponents2.SelectTextBold, null, value))
  );
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi90aW1lLXJhbmdlLXNsaWRlci5qcyJdLCJuYW1lcyI6WyJhbmltYXRpb25Db250cm9sV2lkdGgiLCJTdHlsZWRTbGlkZXJDb250YWluZXIiLCJzdHlsZWQiLCJkaXYiLCJUaW1lUmFuZ2VTbGlkZXJGYWN0b3J5IiwiZGVwcyIsIlBsYXliYWNrQ29udHJvbHNGYWN0b3J5IiwiUGxheWJhY2tDb250cm9scyIsIlRpbWVSYW5nZVNsaWRlciIsInByb3BzIiwiY3VycmVudFRpbWUiLCJmb3JtYXQiLCJ0aW1lU2VsZWN0b3IiLCJmb3JtYXRTZWxlY3RvciIsImdyb3VwVGltZSIsIkFycmF5IiwiaXNBcnJheSIsInJlZHVjZSIsImFjY3UiLCJjdXJyIiwiZGlzcGxheURhdGVUaW1lIiwibW9tZW50IiwidXRjIiwic3BsaXQiLCJkaXNwbGF5RGF0ZSIsImRpc3BsYXlUaW1lIiwiaW5jbHVkZXMiLCJwdXNoIiwiYXJncyIsIl9zbGlkZXJUaHJvdHRsZSIsImNhbmNlbCIsImRvbWFpbiIsInZhbHVlIiwidmFsdWUwIiwidmFsdWUxIiwib25DaGFuZ2UiLCJfcGF1c2VBbmltYXRpb24iLCJ0b2dnbGVBbmltYXRpb24iLCJzZXRTdGF0ZSIsImlzQW5pbWF0aW5nIiwiX2FuaW1hdGlvbiIsInNwZWVkIiwiQkFTRV9TUEVFRCIsInN0YXRlIiwid2lkdGgiLCJfbmV4dEZyYW1lIiwiaXNFbmxhcmdlZCIsImhpZGVUaW1lVGl0bGUiLCJ0aW1lRm9ybWF0IiwiaXNBbmltYXRhYmxlIiwiX3Jlc2V0QW5pbWF0aW9uIiwiX3N0YXJ0QW5pbWF0aW9uIiwiaGlzdG9ncmFtIiwibGluZUNoYXJ0IiwicGxvdFR5cGUiLCJzdGVwIiwiX3NsaWRlclVwZGF0ZSIsIlRpbWVTbGlkZXJNYXJrZXIiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJmdW5jIiwiaXNSZXF1aXJlZCIsImFycmF5T2YiLCJudW1iZXIiLCJzdHJpbmciLCJhbnkiLCJvYmplY3QiLCJib29sIiwiZGVmYXVsdFByb3BzIiwiREVGQVVMVF9USU1FX0ZPUk1BVCIsIlRpbWVWYWx1ZVdyYXBwZXIiLCJ0aGVtZSIsInRpdGxlVGV4dENvbG9yIiwiVGltZVRpdGxlIiwiVGltZVZhbHVlIiwibWFwIiwidiIsImkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEscUJBQXFCLEdBQUcsR0FBOUI7O0FBRUEsSUFBTUMscUJBQXFCLEdBQUdDLDZCQUFPQyxHQUFWLG1CQUEzQjs7QUFnQkFDLHNCQUFzQixDQUFDQyxJQUF2QixHQUE4QixDQUFDQyw0QkFBRCxDQUE5Qjs7QUFFZSxTQUFTRixzQkFBVCxDQUFnQ0csZ0JBQWhDLEVBQWtEO0FBQUEsTUFDekRDLGVBRHlEO0FBQUE7QUFBQTtBQUFBOztBQWtCN0QsNkJBQVlDLE1BQVosRUFBbUI7QUFBQTs7QUFBQTtBQUNqQiw2SEFBTUEsTUFBTjtBQURpQix1R0FnQkosVUFBQUEsS0FBSztBQUFBLGVBQUlBLEtBQUssQ0FBQ0MsV0FBVjtBQUFBLE9BaEJEO0FBQUEseUdBaUJGLFVBQUFELEtBQUs7QUFBQSxlQUFJQSxLQUFLLENBQUNFLE1BQVY7QUFBQSxPQWpCSDtBQUFBLDhHQWtCRyw4QkFDcEIsTUFBS0MsWUFEZSxFQUVwQixNQUFLQyxjQUZlLEVBR3BCLFVBQUNILFdBQUQsRUFBY0MsTUFBZCxFQUF5QjtBQUN2QixZQUFNRyxTQUFTLEdBQUdDLEtBQUssQ0FBQ0MsT0FBTixDQUFjTixXQUFkLElBQTZCQSxXQUE3QixHQUEyQyxDQUFDQSxXQUFELENBQTdEO0FBQ0EsZUFBT0ksU0FBUyxDQUFDRyxNQUFWLENBQ0wsVUFBQ0MsSUFBRCxFQUFPQyxJQUFQLEVBQWdCO0FBQ2QsY0FBTUMsZUFBZSxHQUFHQyxt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LGFBQ0g7QUFBSyxRQUFBLEdBQUcsRUFBRUE7QUFBVixTQUNHQSxDQUFDLEtBQUssQ0FBTixHQUFVLGdDQUFDLDZCQUFELFFBQWFELENBQWIsQ0FBVixHQUF5QyxnQ0FBQyxpQ0FBRCxRQUFpQkEsQ0FBakIsQ0FENUMsQ0FERztBQUFBLEtBRlAsQ0FESSxHQVNKLGdDQUFDLGlDQUFELFFBQWlCNUMsS0FBakIsQ0FWSjtBQUZnQjtBQUFBLENBQWxCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIwIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHtyZXF1ZXN0QW5pbWF0aW9uRnJhbWUsIGNhbmNlbEFuaW1hdGlvbkZyYW1lfSBmcm9tICdnbG9iYWwvd2luZG93JztcbmltcG9ydCB0aHJvdHRsZSBmcm9tICdsb2Rhc2gudGhyb3R0bGUnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQge2NyZWF0ZVNlbGVjdG9yfSBmcm9tICdyZXNlbGVjdCc7XG5cbmltcG9ydCB7TWludXN9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2ljb25zJztcbmltcG9ydCB7U2VsZWN0VGV4dEJvbGQsIFNlbGVjdFRleHR9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBSYW5nZVNsaWRlciBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9yYW5nZS1zbGlkZXInO1xuaW1wb3J0IFRpbWVTbGlkZXJNYXJrZXIgZnJvbSAnY29tcG9uZW50cy9jb21tb24vdGltZS1zbGlkZXItbWFya2VyJztcbmltcG9ydCBQbGF5YmFja0NvbnRyb2xzRmFjdG9yeSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9hbmltYXRpb24tY29udHJvbC9wbGF5YmFjay1jb250cm9scyc7XG5pbXBvcnQge0JBU0VfU1BFRUQsIERFRkFVTFRfVElNRV9GT1JNQVR9IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcblxuY29uc3QgYW5pbWF0aW9uQ29udHJvbFdpZHRoID0gMTQwO1xuXG5jb25zdCBTdHlsZWRTbGlkZXJDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcblxuICAudGltZS1yYW5nZS1zbGlkZXJfX2NvbnRyb2wge1xuICAgIG1hcmdpbi1ib3R0b206IDEycHg7XG4gICAgbWFyZ2luLXJpZ2h0OiAzMHB4O1xuICB9XG5cbiAgLnBsYXliYWNrLWNvbnRyb2wtYnV0dG9uIHtcbiAgICBwYWRkaW5nOiA5cHggMTJweDtcbiAgfVxuYDtcblxuVGltZVJhbmdlU2xpZGVyRmFjdG9yeS5kZXBzID0gW1BsYXliYWNrQ29udHJvbHNGYWN0b3J5XTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVGltZVJhbmdlU2xpZGVyRmFjdG9yeShQbGF5YmFja0NvbnRyb2xzKSB7XG4gIGNsYXNzIFRpbWVSYW5nZVNsaWRlciBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgZG9tYWluOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMubnVtYmVyKS5pc1JlcXVpcmVkLFxuICAgICAgdmFsdWU6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5udW1iZXIpLmlzUmVxdWlyZWQsXG4gICAgICBzdGVwOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICBwbG90VHlwZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIGhpc3RvZ3JhbTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSksXG4gICAgICBsaW5lQ2hhcnQ6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICB0b2dnbGVBbmltYXRpb246IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICBpc0FuaW1hdGFibGU6IFByb3BUeXBlcy5ib29sLFxuICAgICAgaXNFbmxhcmdlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgICBzcGVlZDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIHRpbWVGb3JtYXQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBoaWRlVGltZVRpdGxlOiBQcm9wVHlwZXMuYm9vbFxuICAgIH07XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgaXNBbmltYXRpbmc6IGZhbHNlLFxuICAgICAgICB3aWR0aDogMjg4XG4gICAgICB9O1xuICAgICAgdGhpcy5fYW5pbWF0aW9uID0gbnVsbDtcbiAgICAgIHRoaXMuX3NsaWRlclRocm90dGxlID0gdGhyb3R0bGUoKC4uLnZhbHVlKSA9PiB0aGlzLnByb3BzLm9uQ2hhbmdlKC4uLnZhbHVlKSwgMjApO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgIGlmICghdGhpcy5fYW5pbWF0aW9uICYmIHRoaXMuc3RhdGUuaXNBbmltYXRpbmcpIHtcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuX25leHRGcmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGltZVNlbGVjdG9yID0gcHJvcHMgPT4gcHJvcHMuY3VycmVudFRpbWU7XG4gICAgZm9ybWF0U2VsZWN0b3IgPSBwcm9wcyA9PiBwcm9wcy5mb3JtYXQ7XG4gICAgZGlzcGxheVRpbWVTZWxlY3RvciA9IGNyZWF0ZVNlbGVjdG9yKFxuICAgICAgdGhpcy50aW1lU2VsZWN0b3IsXG4gICAgICB0aGlzLmZvcm1hdFNlbGVjdG9yLFxuICAgICAgKGN1cnJlbnRUaW1lLCBmb3JtYXQpID0+IHtcbiAgICAgICAgY29uc3QgZ3JvdXBUaW1lID0gQXJyYXkuaXNBcnJheShjdXJyZW50VGltZSkgPyBjdXJyZW50VGltZSA6IFtjdXJyZW50VGltZV07XG4gICAgICAgIHJldHVybiBncm91cFRpbWUucmVkdWNlKFxuICAgICAgICAgIChhY2N1LCBjdXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkaXNwbGF5RGF0ZVRpbWUgPSBtb21lbnQudXRjKGN1cnIpLmZvcm1hdChmb3JtYXQpO1xuICAgICAgICAgICAgY29uc3QgW2Rpc3BsYXlEYXRlLCBkaXNwbGF5VGltZV0gPSBkaXNwbGF5RGF0ZVRpbWUuc3BsaXQoJyAnKTtcblxuICAgICAgICAgICAgaWYgKCFhY2N1LmRpc3BsYXlEYXRlLmluY2x1ZGVzKGRpc3BsYXlEYXRlKSkge1xuICAgICAgICAgICAgICBhY2N1LmRpc3BsYXlEYXRlLnB1c2goZGlzcGxheURhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWNjdS5kaXNwbGF5VGltZS5wdXNoKGRpc3BsYXlUaW1lKTtcblxuICAgICAgICAgICAgcmV0dXJuIGFjY3U7XG4gICAgICAgICAgfSxcbiAgICAgICAgICB7ZGlzcGxheURhdGU6IFtdLCBkaXNwbGF5VGltZTogW119XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgKTtcblxuICAgIF9zbGlkZXJVcGRhdGUgPSBhcmdzID0+IHtcbiAgICAgIHRoaXMuX3NsaWRlclRocm90dGxlLmNhbmNlbCgpO1xuICAgICAgdGhpcy5fc2xpZGVyVGhyb3R0bGUoYXJncyk7XG4gICAgfTtcblxuICAgIF9yZXNldEFuaW1hdGlvbiA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHtkb21haW4sIHZhbHVlfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCB2YWx1ZTAgPSBkb21haW5bMF07XG4gICAgICBjb25zdCB2YWx1ZTEgPSB2YWx1ZTAgKyB2YWx1ZVsxXSAtIHZhbHVlWzBdO1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShbdmFsdWUwLCB2YWx1ZTFdKTtcbiAgICB9O1xuXG4gICAgX3N0YXJ0QW5pbWF0aW9uID0gKCkgPT4ge1xuICAgICAgdGhpcy5fcGF1c2VBbmltYXRpb24oKTtcbiAgICAgIHRoaXMucHJvcHMudG9nZ2xlQW5pbWF0aW9uKCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtpc0FuaW1hdGluZzogdHJ1ZX0pO1xuICAgIH07XG5cbiAgICBfcGF1c2VBbmltYXRpb24gPSAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5fYW5pbWF0aW9uKSB7XG4gICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuX2FuaW1hdGlvbik7XG4gICAgICAgIHRoaXMucHJvcHMudG9nZ2xlQW5pbWF0aW9uKCk7XG4gICAgICAgIHRoaXMuX2FuaW1hdGlvbiA9IG51bGw7XG4gICAgICB9XG4gICAgICB0aGlzLnNldFN0YXRlKHtpc0FuaW1hdGluZzogZmFsc2V9KTtcbiAgICB9O1xuXG4gICAgX25leHRGcmFtZSA9ICgpID0+IHtcbiAgICAgIHRoaXMuX2FuaW1hdGlvbiA9IG51bGw7XG5cbiAgICAgIGNvbnN0IHtkb21haW4sIHZhbHVlfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCBzcGVlZCA9ICgoZG9tYWluWzFdIC0gZG9tYWluWzBdKSAvIEJBU0VfU1BFRUQpICogdGhpcy5wcm9wcy5zcGVlZDtcblxuICAgICAgLy8gbG9vcCB3aGVuIHJlYWNoZXMgdGhlIGVuZFxuICAgICAgY29uc3QgdmFsdWUwID0gdmFsdWVbMV0gKyBzcGVlZCA+IGRvbWFpblsxXSA/IGRvbWFpblswXSA6IHZhbHVlWzBdICsgc3BlZWQ7XG4gICAgICBjb25zdCB2YWx1ZTEgPSB2YWx1ZTAgKyB2YWx1ZVsxXSAtIHZhbHVlWzBdO1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShbdmFsdWUwLCB2YWx1ZTFdKTtcbiAgICB9O1xuXG4gICAgcmVuZGVyKCkge1xuICAgICAgY29uc3Qge2RvbWFpbiwgdmFsdWUsIGlzRW5sYXJnZWQsIGhpZGVUaW1lVGl0bGV9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IHtpc0FuaW1hdGluZ30gPSB0aGlzLnN0YXRlO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWUtcmFuZ2Utc2xpZGVyXCI+XG4gICAgICAgICAgeyFoaWRlVGltZVRpdGxlID8gKFxuICAgICAgICAgICAgPFRpbWVUaXRsZSB0aW1lRm9ybWF0PXt0aGlzLnByb3BzLnRpbWVGb3JtYXR9IHZhbHVlPXt2YWx1ZX0gaXNFbmxhcmdlZD17aXNFbmxhcmdlZH0gLz5cbiAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICA8U3R5bGVkU2xpZGVyQ29udGFpbmVyIGNsYXNzTmFtZT1cInRpbWUtcmFuZ2Utc2xpZGVyX19jb250YWluZXJcIiBpc0VubGFyZ2VkPXtpc0VubGFyZ2VkfT5cbiAgICAgICAgICAgIHtpc0VubGFyZ2VkID8gKFxuICAgICAgICAgICAgICA8UGxheWJhY2tDb250cm9sc1xuICAgICAgICAgICAgICAgIGlzQW5pbWF0YWJsZT17dGhpcy5wcm9wcy5pc0FuaW1hdGFibGV9XG4gICAgICAgICAgICAgICAgaXNFbmxhcmdlZD17aXNFbmxhcmdlZH1cbiAgICAgICAgICAgICAgICBpc0FuaW1hdGluZz17aXNBbmltYXRpbmd9XG4gICAgICAgICAgICAgICAgcGF1c2VBbmltYXRpb249e3RoaXMuX3BhdXNlQW5pbWF0aW9ufVxuICAgICAgICAgICAgICAgIHJlc2V0QW5pbWF0aW9uPXt0aGlzLl9yZXNldEFuaW1hdGlvbn1cbiAgICAgICAgICAgICAgICBzdGFydEFuaW1hdGlvbj17dGhpcy5fc3RhcnRBbmltYXRpb259XG4gICAgICAgICAgICAgICAgYnV0dG9uSGVpZ2h0PVwiMTJweFwiXG4gICAgICAgICAgICAgICAgYnV0dG9uU3R5bGU9XCJzZWNvbmRhcnlcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgd2lkdGg6IGlzRW5sYXJnZWQgPyBgY2FsYygxMDAlIC0gJHthbmltYXRpb25Db250cm9sV2lkdGh9cHgpYCA6ICcxMDAlJ1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8UmFuZ2VTbGlkZXJcbiAgICAgICAgICAgICAgICByYW5nZT17ZG9tYWlufVxuICAgICAgICAgICAgICAgIHZhbHVlMD17dmFsdWVbMF19XG4gICAgICAgICAgICAgICAgdmFsdWUxPXt2YWx1ZVsxXX1cbiAgICAgICAgICAgICAgICBoaXN0b2dyYW09e3RoaXMucHJvcHMuaGlzdG9ncmFtfVxuICAgICAgICAgICAgICAgIGxpbmVDaGFydD17dGhpcy5wcm9wcy5saW5lQ2hhcnR9XG4gICAgICAgICAgICAgICAgcGxvdFR5cGU9e3RoaXMucHJvcHMucGxvdFR5cGV9XG4gICAgICAgICAgICAgICAgaXNFbmxhcmdlZD17aXNFbmxhcmdlZH1cbiAgICAgICAgICAgICAgICBzaG93SW5wdXQ9e2ZhbHNlfVxuICAgICAgICAgICAgICAgIHN0ZXA9e3RoaXMucHJvcHMuc3RlcH1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5fc2xpZGVyVXBkYXRlfVxuICAgICAgICAgICAgICAgIHhBeGlzPXtUaW1lU2xpZGVyTWFya2VyfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9TdHlsZWRTbGlkZXJDb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBUaW1lUmFuZ2VTbGlkZXIuZGVmYXVsdFByb3BzID0ge1xuICAgIHRpbWVGb3JtYXQ6IERFRkFVTFRfVElNRV9GT1JNQVRcbiAgfTtcblxuICByZXR1cm4gVGltZVJhbmdlU2xpZGVyO1xufVxuXG5jb25zdCBUaW1lVmFsdWVXcmFwcGVyID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZm9udC1zaXplOiAxMXB4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6ICR7cHJvcHMgPT4gKHByb3BzLmlzRW5sYXJnZWQgPyAnY2VudGVyJyA6ICdzcGFjZS1iZXR3ZWVuJyl9O1xuXG4gIC5ob3Jpem9udGFsLWJhciB7XG4gICAgcGFkZGluZzogMCAxMnB4O1xuICAgIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRpdGxlVGV4dENvbG9yfTtcbiAgfVxuXG4gIC50aW1lLXZhbHVlIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiAke3Byb3BzID0+IChwcm9wcy5pc0VubGFyZ2VkID8gJ3JvdycgOiAnY29sdW1uJyl9O1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuXG4gICAgc3BhbiB7XG4gICAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50aXRsZVRleHRDb2xvcn07XG4gICAgfVxuICB9XG5cbiAgLnRpbWUtdmFsdWU6bGFzdC1jaGlsZCB7XG4gICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xuICB9XG5gO1xuXG5jb25zdCBUaW1lVGl0bGUgPSAoe3ZhbHVlLCBpc0VubGFyZ2VkLCB0aW1lRm9ybWF0ID0gREVGQVVMVF9USU1FX0ZPUk1BVH0pID0+IChcbiAgPFRpbWVWYWx1ZVdyYXBwZXIgaXNFbmxhcmdlZD17aXNFbmxhcmdlZH0gY2xhc3NOYW1lPVwidGltZS1yYW5nZS1zbGlkZXJfX3RpbWUtdGl0bGVcIj5cbiAgICA8VGltZVZhbHVlIGtleT17MH0gdmFsdWU9e21vbWVudC51dGModmFsdWVbMF0pLmZvcm1hdCh0aW1lRm9ybWF0KX0gc3BsaXQ9eyFpc0VubGFyZ2VkfSAvPlxuICAgIHtpc0VubGFyZ2VkID8gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJob3Jpem9udGFsLWJhclwiPlxuICAgICAgICA8TWludXMgaGVpZ2h0PVwiMTJweFwiIC8+XG4gICAgICA8L2Rpdj5cbiAgICApIDogbnVsbH1cbiAgICA8VGltZVZhbHVlIGtleT17MX0gdmFsdWU9e21vbWVudC51dGModmFsdWVbMV0pLmZvcm1hdCh0aW1lRm9ybWF0KX0gc3BsaXQ9eyFpc0VubGFyZ2VkfSAvPlxuICA8L1RpbWVWYWx1ZVdyYXBwZXI+XG4pO1xuXG5jb25zdCBUaW1lVmFsdWUgPSAoe3ZhbHVlLCBzcGxpdH0pID0+IChcbiAgLy8gcmVuZGVyIHR3byBsaW5lcyBpZiBub3QgZW5sYXJnZWRcbiAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lLXZhbHVlXCI+XG4gICAge3NwbGl0ID8gKFxuICAgICAgdmFsdWVcbiAgICAgICAgLnNwbGl0KCcgJylcbiAgICAgICAgLm1hcCgodiwgaSkgPT4gKFxuICAgICAgICAgIDxkaXYga2V5PXtpfT5cbiAgICAgICAgICAgIHtpID09PSAwID8gPFNlbGVjdFRleHQ+e3Z9PC9TZWxlY3RUZXh0PiA6IDxTZWxlY3RUZXh0Qm9sZD57dn08L1NlbGVjdFRleHRCb2xkPn1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSlcbiAgICApIDogKFxuICAgICAgPFNlbGVjdFRleHRCb2xkPnt2YWx1ZX08L1NlbGVjdFRleHRCb2xkPlxuICAgICl9XG4gIDwvZGl2PlxuKTtcbiJdfQ==