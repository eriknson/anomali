"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _rangePlot = _interopRequireDefault(require("./range-plot"));

var _slider = _interopRequireDefault(require("./slider/slider"));

var _styledComponents2 = require("./styled-components");

var _dataUtils = require("../../utils/data-utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  margin-top: 6px;\n  display: flex;\n  justify-content: space-between;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  position: relative;\n  align-items: center;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  width: ", "px;\n  margin-left: ", "px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var SliderInput = (0, _styledComponents["default"])(_styledComponents2.Input)(_templateObject(), function (props) {
  return props.theme.sliderInputWidth;
}, function (props) {
  return props.flush ? 0 : props.size === 'tiny' ? 12 : 18;
});

var SliderWrapper = _styledComponents["default"].div(_templateObject2());

var RangeInputWrapper = _styledComponents["default"].div(_templateObject3());

var RangeSlider =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(RangeSlider, _Component);

  function RangeSlider() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, RangeSlider);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(RangeSlider)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      value0: 0,
      value1: 1,
      prevValue0: 0,
      prevValue1: 1,
      width: 288
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "sliderContainer", (0, _react.createRef)());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "inputValue0", (0, _react.createRef)());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "inputValue1", (0, _react.createRef)());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_isVal0InRange", function (val) {
      var _this$props = _this.props,
          value1 = _this$props.value1,
          range = _this$props.range;
      return Boolean(val >= range[0] && val <= value1);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_isVal1InRange", function (val) {
      var _this$props2 = _this.props,
          range = _this$props2.range,
          value0 = _this$props2.value0;
      return Boolean(val <= range[1] && val >= value0);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_roundValToStep", function (val) {
      var _this$props3 = _this.props,
          range = _this$props3.range,
          step = _this$props3.step;
      return (0, _dataUtils.roundValToStep)(range[0], step, val);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_setRangeVal1", function (val) {
      var _this$props4 = _this.props,
          value0 = _this$props4.value0,
          onChange = _this$props4.onChange;
      val = Number(val);

      if (_this._isVal1InRange(val)) {
        onChange([value0, _this._roundValToStep(val)]);
        return true;
      }

      return false;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_setRangeVal0", function (val) {
      var _this$props5 = _this.props,
          value1 = _this$props5.value1,
          onChange = _this$props5.onChange;
      var val0 = Number(val);

      if (_this._isVal0InRange(val0)) {
        onChange([_this._roundValToStep(val0), value1]);
        return true;
      }

      return false;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onChangeInput", function (key, e) {
      _this.setState((0, _defineProperty2["default"])({}, key, e.target.value));
    });
    return _this;
  }

  (0, _createClass2["default"])(RangeSlider, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._resize();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      this._resize();
    }
  }, {
    key: "_resize",
    value: function _resize() {
      var width = this.sliderContainer.current.offsetWidth;

      if (width !== this.state.width) {
        this.setState({
          width: width
        });
      }
    }
  }, {
    key: "_renderInput",
    value: function _renderInput(key) {
      var _this2 = this;

      var setRange = key === 'value0' ? this._setRangeVal0 : this._setRangeVal1;
      var ref = key === 'value0' ? this.inputValue0 : this.inputValue1;

      var update = function update(e) {
        if (!setRange(e.target.value)) {
          _this2.setState((0, _defineProperty2["default"])({}, key, _this2.state[key]));
        }
      };

      var onChange = this._onChangeInput.bind(this, key);

      return _react["default"].createElement(SliderInput, {
        className: "kg-range-slider__input",
        type: "number",
        ref: ref,
        id: "slider-input-".concat(key),
        key: key,
        value: this.state[key],
        onChange: onChange,
        onKeyPress: function onKeyPress(e) {
          if (e.key === 'Enter') {
            update(e);
            ref.current.blur();
          }
        },
        onBlur: update,
        flush: key === 'value0',
        size: this.props.inputSize,
        secondary: this.props.inputTheme === 'secondary'
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props6 = this.props,
          isRanged = _this$props6.isRanged,
          showInput = _this$props6.showInput,
          histogram = _this$props6.histogram,
          lineChart = _this$props6.lineChart,
          plotType = _this$props6.plotType,
          isEnlarged = _this$props6.isEnlarged,
          range = _this$props6.range,
          onChange = _this$props6.onChange,
          value0 = _this$props6.value0,
          value1 = _this$props6.value1,
          sliderHandleWidth = _this$props6.sliderHandleWidth,
          step = _this$props6.step;
      var height = isRanged && showInput ? '16px' : '24px';
      var width = this.state.width;
      var plotWidth = Math.max(width - sliderHandleWidth, 0);
      return _react["default"].createElement("div", {
        className: "kg-range-slider",
        style: {
          width: '100%',
          padding: "0 ".concat(sliderHandleWidth / 2, "px")
        },
        ref: this.sliderContainer
      }, histogram && histogram.length ? _react["default"].createElement(_rangePlot["default"], {
        histogram: histogram,
        lineChart: lineChart,
        plotType: plotType,
        isEnlarged: isEnlarged,
        onBrush: function onBrush(val0, val1) {
          onChange([_this3._roundValToStep(val0), _this3._roundValToStep(val1)]);
        },
        range: range,
        value: [value0, value1],
        width: plotWidth
      }) : null, _react["default"].createElement(SliderWrapper, {
        style: {
          height: height
        },
        className: "kg-range-slider__slider"
      }, this.props.xAxis ? _react["default"].createElement(this.props.xAxis, {
        width: plotWidth,
        domain: range
      }) : null, _react["default"].createElement(_slider["default"], {
        showValues: false,
        isRanged: isRanged,
        minValue: range[0],
        maxValue: range[1],
        value0: value0,
        value1: value1,
        step: step,
        handleWidth: sliderHandleWidth,
        onSlider0Change: this._setRangeVal0,
        onSlider1Change: this._setRangeVal1,
        onSliderBarChange: function onSliderBarChange(val0, val1) {
          onChange([val0, val1]);
        },
        enableBarDrag: true
      }), !isRanged && showInput ? this._renderInput('value1') : null), isRanged && showInput ? _react["default"].createElement(RangeInputWrapper, {
        className: "range-slider__input-group"
      }, this._renderInput('value0'), this._renderInput('value1')) : null);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var update = null;
      var value0 = props.value0,
          value1 = props.value1;

      if (props.value0 !== state.prevValue0 && !isNaN(value0)) {
        update = _objectSpread({}, update || {}, {
          value0: value0,
          prevValue0: value0
        });
      }

      if (props.value1 !== state.prevValue1 && !isNaN(value1)) {
        update = _objectSpread({}, update || {}, {
          value1: value1,
          prevValue1: value1
        });
      }

      return update;
    }
  }]);
  return RangeSlider;
}(_react.Component);

(0, _defineProperty2["default"])(RangeSlider, "propTypes", {
  range: _propTypes["default"].arrayOf(_propTypes["default"].number).isRequired,
  value0: _propTypes["default"].number.isRequired,
  value1: _propTypes["default"].number.isRequired,
  onChange: _propTypes["default"].func.isRequired,
  histogram: _propTypes["default"].arrayOf(_propTypes["default"].any),
  isRanged: _propTypes["default"].bool,
  isEnlarged: _propTypes["default"].bool,
  showInput: _propTypes["default"].bool,
  inputTheme: _propTypes["default"].string,
  inputSize: _propTypes["default"].string,
  step: _propTypes["default"].number,
  sliderHandleWidth: _propTypes["default"].number,
  xAxis: _propTypes["default"].func
});
(0, _defineProperty2["default"])(RangeSlider, "defaultProps", {
  isEnlarged: false,
  isRanged: true,
  showInput: true,
  sliderHandleWidth: 12,
  inputTheme: '',
  inputSize: 'small',
  onChange: function onChange() {}
});
(0, _reactLifecyclesCompat.polyfill)(RangeSlider);
var _default = RangeSlider;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9yYW5nZS1zbGlkZXIuanMiXSwibmFtZXMiOlsiU2xpZGVySW5wdXQiLCJJbnB1dCIsInByb3BzIiwidGhlbWUiLCJzbGlkZXJJbnB1dFdpZHRoIiwiZmx1c2giLCJzaXplIiwiU2xpZGVyV3JhcHBlciIsInN0eWxlZCIsImRpdiIsIlJhbmdlSW5wdXRXcmFwcGVyIiwiUmFuZ2VTbGlkZXIiLCJ2YWx1ZTAiLCJ2YWx1ZTEiLCJwcmV2VmFsdWUwIiwicHJldlZhbHVlMSIsIndpZHRoIiwidmFsIiwicmFuZ2UiLCJCb29sZWFuIiwic3RlcCIsIm9uQ2hhbmdlIiwiTnVtYmVyIiwiX2lzVmFsMUluUmFuZ2UiLCJfcm91bmRWYWxUb1N0ZXAiLCJ2YWwwIiwiX2lzVmFsMEluUmFuZ2UiLCJrZXkiLCJlIiwic2V0U3RhdGUiLCJ0YXJnZXQiLCJ2YWx1ZSIsIl9yZXNpemUiLCJwcmV2UHJvcHMiLCJwcmV2U3RhdGUiLCJzbGlkZXJDb250YWluZXIiLCJjdXJyZW50Iiwib2Zmc2V0V2lkdGgiLCJzdGF0ZSIsInNldFJhbmdlIiwiX3NldFJhbmdlVmFsMCIsIl9zZXRSYW5nZVZhbDEiLCJyZWYiLCJpbnB1dFZhbHVlMCIsImlucHV0VmFsdWUxIiwidXBkYXRlIiwiX29uQ2hhbmdlSW5wdXQiLCJiaW5kIiwiYmx1ciIsImlucHV0U2l6ZSIsImlucHV0VGhlbWUiLCJpc1JhbmdlZCIsInNob3dJbnB1dCIsImhpc3RvZ3JhbSIsImxpbmVDaGFydCIsInBsb3RUeXBlIiwiaXNFbmxhcmdlZCIsInNsaWRlckhhbmRsZVdpZHRoIiwiaGVpZ2h0IiwicGxvdFdpZHRoIiwiTWF0aCIsIm1heCIsInBhZGRpbmciLCJsZW5ndGgiLCJ2YWwxIiwieEF4aXMiLCJfcmVuZGVySW5wdXQiLCJpc05hTiIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsImFycmF5T2YiLCJudW1iZXIiLCJpc1JlcXVpcmVkIiwiZnVuYyIsImFueSIsImJv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QU1qQnZCLEVBQUFBLFFBQVEsRUFBRWtCLHNCQUFVTSxJQU5IO0FBT2pCbkIsRUFBQUEsVUFBVSxFQUFFYSxzQkFBVU0sSUFQTDtBQVFqQnZCLEVBQUFBLFNBQVMsRUFBRWlCLHNCQUFVTSxJQVJKO0FBU2pCekIsRUFBQUEsVUFBVSxFQUFFbUIsc0JBQVVPLE1BVEw7QUFVakIzQixFQUFBQSxTQUFTLEVBQUVvQixzQkFBVU8sTUFWSjtBQVdqQnhELEVBQUFBLElBQUksRUFBRWlELHNCQUFVRSxNQVhDO0FBWWpCZCxFQUFBQSxpQkFBaUIsRUFBRVksc0JBQVVFLE1BWlo7QUFhakJOLEVBQUFBLEtBQUssRUFBRUksc0JBQVVJO0FBYkEsQztpQ0FEZjlELFcsa0JBaUJrQjtBQUNwQjZDLEVBQUFBLFVBQVUsRUFBRSxLQURRO0FBRXBCTCxFQUFBQSxRQUFRLEVBQUUsSUFGVTtBQUdwQkMsRUFBQUEsU0FBUyxFQUFFLElBSFM7QUFJcEJLLEVBQUFBLGlCQUFpQixFQUFFLEVBSkM7QUFLcEJQLEVBQUFBLFVBQVUsRUFBRSxFQUxRO0FBTXBCRCxFQUFBQSxTQUFTLEVBQUUsT0FOUztBQU9wQjVCLEVBQUFBLFFBQVEsRUFBRSxvQkFBTSxDQUFFO0FBUEUsQztBQW9NeEIscUNBQVNWLFdBQVQ7ZUFFZUEsVyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgY3JlYXRlUmVmfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge3BvbHlmaWxsfSBmcm9tICdyZWFjdC1saWZlY3ljbGVzLWNvbXBhdCc7XG5cbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBSYW5nZVBsb3QgZnJvbSAnLi9yYW5nZS1wbG90JztcbmltcG9ydCBTbGlkZXIgZnJvbSAnY29tcG9uZW50cy9jb21tb24vc2xpZGVyL3NsaWRlcic7XG5pbXBvcnQge0lucHV0fSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCB7cm91bmRWYWxUb1N0ZXB9IGZyb20gJ3V0aWxzL2RhdGEtdXRpbHMnO1xuXG5jb25zdCBTbGlkZXJJbnB1dCA9IHN0eWxlZChJbnB1dClgXG4gIHdpZHRoOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNsaWRlcklucHV0V2lkdGh9cHg7XG4gIG1hcmdpbi1sZWZ0OiAke3Byb3BzID0+IChwcm9wcy5mbHVzaCA/IDAgOiBwcm9wcy5zaXplID09PSAndGlueScgPyAxMiA6IDE4KX1weDtcbmA7XG5cbmNvbnN0IFNsaWRlcldyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5gO1xuXG5jb25zdCBSYW5nZUlucHV0V3JhcHBlciA9IHN0eWxlZC5kaXZgXG4gIG1hcmdpbi10b3A6IDZweDtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuYDtcblxuY2xhc3MgUmFuZ2VTbGlkZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIHJhbmdlOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMubnVtYmVyKS5pc1JlcXVpcmVkLFxuICAgIHZhbHVlMDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIHZhbHVlMTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGhpc3RvZ3JhbTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSksXG4gICAgaXNSYW5nZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGlzRW5sYXJnZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dJbnB1dDogUHJvcFR5cGVzLmJvb2wsXG4gICAgaW5wdXRUaGVtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBpbnB1dFNpemU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgc3RlcDogUHJvcFR5cGVzLm51bWJlcixcbiAgICBzbGlkZXJIYW5kbGVXaWR0aDogUHJvcFR5cGVzLm51bWJlcixcbiAgICB4QXhpczogUHJvcFR5cGVzLmZ1bmNcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGlzRW5sYXJnZWQ6IGZhbHNlLFxuICAgIGlzUmFuZ2VkOiB0cnVlLFxuICAgIHNob3dJbnB1dDogdHJ1ZSxcbiAgICBzbGlkZXJIYW5kbGVXaWR0aDogMTIsXG4gICAgaW5wdXRUaGVtZTogJycsXG4gICAgaW5wdXRTaXplOiAnc21hbGwnLFxuICAgIG9uQ2hhbmdlOiAoKSA9PiB7fVxuICB9O1xuXG4gIHN0YXRpYyBnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMocHJvcHMsIHN0YXRlKSB7XG4gICAgbGV0IHVwZGF0ZSA9IG51bGw7XG4gICAgY29uc3Qge3ZhbHVlMCwgdmFsdWUxfSA9IHByb3BzO1xuICAgIGlmIChwcm9wcy52YWx1ZTAgIT09IHN0YXRlLnByZXZWYWx1ZTAgJiYgIWlzTmFOKHZhbHVlMCkpIHtcbiAgICAgIHVwZGF0ZSA9IHsuLi4odXBkYXRlIHx8IHt9KSwgdmFsdWUwLCBwcmV2VmFsdWUwOiB2YWx1ZTB9O1xuICAgIH1cbiAgICBpZiAocHJvcHMudmFsdWUxICE9PSBzdGF0ZS5wcmV2VmFsdWUxICYmICFpc05hTih2YWx1ZTEpKSB7XG4gICAgICB1cGRhdGUgPSB7Li4uKHVwZGF0ZSB8fCB7fSksIHZhbHVlMSwgcHJldlZhbHVlMTogdmFsdWUxfTtcbiAgICB9XG4gICAgcmV0dXJuIHVwZGF0ZTtcbiAgfVxuXG4gIHN0YXRlID0ge1xuICAgIHZhbHVlMDogMCxcbiAgICB2YWx1ZTE6IDEsXG4gICAgcHJldlZhbHVlMDogMCxcbiAgICBwcmV2VmFsdWUxOiAxLFxuICAgIHdpZHRoOiAyODhcbiAgfTtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLl9yZXNpemUoKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgIHRoaXMuX3Jlc2l6ZSgpO1xuICB9XG5cbiAgc2xpZGVyQ29udGFpbmVyID0gY3JlYXRlUmVmKCk7XG4gIGlucHV0VmFsdWUwID0gY3JlYXRlUmVmKCk7XG4gIGlucHV0VmFsdWUxID0gY3JlYXRlUmVmKCk7XG5cbiAgX2lzVmFsMEluUmFuZ2UgPSB2YWwgPT4ge1xuICAgIGNvbnN0IHt2YWx1ZTEsIHJhbmdlfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gQm9vbGVhbih2YWwgPj0gcmFuZ2VbMF0gJiYgdmFsIDw9IHZhbHVlMSk7XG4gIH07XG5cbiAgX2lzVmFsMUluUmFuZ2UgPSB2YWwgPT4ge1xuICAgIGNvbnN0IHtyYW5nZSwgdmFsdWUwfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gQm9vbGVhbih2YWwgPD0gcmFuZ2VbMV0gJiYgdmFsID49IHZhbHVlMCk7XG4gIH07XG5cbiAgX3JvdW5kVmFsVG9TdGVwID0gdmFsID0+IHtcbiAgICBjb25zdCB7cmFuZ2UsIHN0ZXB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiByb3VuZFZhbFRvU3RlcChyYW5nZVswXSwgc3RlcCwgdmFsKTtcbiAgfTtcblxuICBfc2V0UmFuZ2VWYWwxID0gdmFsID0+IHtcbiAgICBjb25zdCB7dmFsdWUwLCBvbkNoYW5nZX0gPSB0aGlzLnByb3BzO1xuICAgIHZhbCA9IE51bWJlcih2YWwpO1xuICAgIGlmICh0aGlzLl9pc1ZhbDFJblJhbmdlKHZhbCkpIHtcbiAgICAgIG9uQ2hhbmdlKFt2YWx1ZTAsIHRoaXMuX3JvdW5kVmFsVG9TdGVwKHZhbCldKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgX3NldFJhbmdlVmFsMCA9IHZhbCA9PiB7XG4gICAgY29uc3Qge3ZhbHVlMSwgb25DaGFuZ2V9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB2YWwwID0gTnVtYmVyKHZhbCk7XG5cbiAgICBpZiAodGhpcy5faXNWYWwwSW5SYW5nZSh2YWwwKSkge1xuICAgICAgb25DaGFuZ2UoW3RoaXMuX3JvdW5kVmFsVG9TdGVwKHZhbDApLCB2YWx1ZTFdKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgX3Jlc2l6ZSgpIHtcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuc2xpZGVyQ29udGFpbmVyLmN1cnJlbnQub2Zmc2V0V2lkdGg7XG4gICAgaWYgKHdpZHRoICE9PSB0aGlzLnN0YXRlLndpZHRoKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHt3aWR0aH0pO1xuICAgIH1cbiAgfVxuICBfb25DaGFuZ2VJbnB1dCA9IChrZXksIGUpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtba2V5XTogZS50YXJnZXQudmFsdWV9KTtcbiAgfTtcblxuICBfcmVuZGVySW5wdXQoa2V5KSB7XG4gICAgY29uc3Qgc2V0UmFuZ2UgPSBrZXkgPT09ICd2YWx1ZTAnID8gdGhpcy5fc2V0UmFuZ2VWYWwwIDogdGhpcy5fc2V0UmFuZ2VWYWwxO1xuICAgIGNvbnN0IHJlZiA9IGtleSA9PT0gJ3ZhbHVlMCcgPyB0aGlzLmlucHV0VmFsdWUwIDogdGhpcy5pbnB1dFZhbHVlMTtcbiAgICBjb25zdCB1cGRhdGUgPSBlID0+IHtcbiAgICAgIGlmICghc2V0UmFuZ2UoZS50YXJnZXQudmFsdWUpKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1trZXldOiB0aGlzLnN0YXRlW2tleV19KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgb25DaGFuZ2UgPSB0aGlzLl9vbkNoYW5nZUlucHV0LmJpbmQodGhpcywga2V5KTtcblxuICAgIHJldHVybiAoXG4gICAgICA8U2xpZGVySW5wdXRcbiAgICAgICAgY2xhc3NOYW1lPVwia2ctcmFuZ2Utc2xpZGVyX19pbnB1dFwiXG4gICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgaWQ9e2BzbGlkZXItaW5wdXQtJHtrZXl9YH1cbiAgICAgICAga2V5PXtrZXl9XG4gICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlW2tleV19XG4gICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgICAgb25LZXlQcmVzcz17ZSA9PiB7XG4gICAgICAgICAgaWYgKGUua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgICAgICB1cGRhdGUoZSk7XG4gICAgICAgICAgICByZWYuY3VycmVudC5ibHVyKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9fVxuICAgICAgICBvbkJsdXI9e3VwZGF0ZX1cbiAgICAgICAgZmx1c2g9e2tleSA9PT0gJ3ZhbHVlMCd9XG4gICAgICAgIHNpemU9e3RoaXMucHJvcHMuaW5wdXRTaXplfVxuICAgICAgICBzZWNvbmRhcnk9e3RoaXMucHJvcHMuaW5wdXRUaGVtZSA9PT0gJ3NlY29uZGFyeSd9XG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgaXNSYW5nZWQsXG4gICAgICBzaG93SW5wdXQsXG4gICAgICBoaXN0b2dyYW0sXG4gICAgICBsaW5lQ2hhcnQsXG4gICAgICBwbG90VHlwZSxcbiAgICAgIGlzRW5sYXJnZWQsXG4gICAgICByYW5nZSxcbiAgICAgIG9uQ2hhbmdlLFxuICAgICAgdmFsdWUwLFxuICAgICAgdmFsdWUxLFxuICAgICAgc2xpZGVySGFuZGxlV2lkdGgsXG4gICAgICBzdGVwXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBoZWlnaHQgPSBpc1JhbmdlZCAmJiBzaG93SW5wdXQgPyAnMTZweCcgOiAnMjRweCc7XG4gICAgY29uc3Qge3dpZHRofSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgcGxvdFdpZHRoID0gTWF0aC5tYXgod2lkdGggLSBzbGlkZXJIYW5kbGVXaWR0aCwgMCk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJrZy1yYW5nZS1zbGlkZXJcIlxuICAgICAgICBzdHlsZT17e3dpZHRoOiAnMTAwJScsIHBhZGRpbmc6IGAwICR7c2xpZGVySGFuZGxlV2lkdGggLyAyfXB4YH19XG4gICAgICAgIHJlZj17dGhpcy5zbGlkZXJDb250YWluZXJ9XG4gICAgICA+XG4gICAgICAgIHtoaXN0b2dyYW0gJiYgaGlzdG9ncmFtLmxlbmd0aCA/IChcbiAgICAgICAgICA8UmFuZ2VQbG90XG4gICAgICAgICAgICBoaXN0b2dyYW09e2hpc3RvZ3JhbX1cbiAgICAgICAgICAgIGxpbmVDaGFydD17bGluZUNoYXJ0fVxuICAgICAgICAgICAgcGxvdFR5cGU9e3Bsb3RUeXBlfVxuICAgICAgICAgICAgaXNFbmxhcmdlZD17aXNFbmxhcmdlZH1cbiAgICAgICAgICAgIG9uQnJ1c2g9eyh2YWwwLCB2YWwxKSA9PiB7XG4gICAgICAgICAgICAgIG9uQ2hhbmdlKFt0aGlzLl9yb3VuZFZhbFRvU3RlcCh2YWwwKSwgdGhpcy5fcm91bmRWYWxUb1N0ZXAodmFsMSldKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICByYW5nZT17cmFuZ2V9XG4gICAgICAgICAgICB2YWx1ZT17W3ZhbHVlMCwgdmFsdWUxXX1cbiAgICAgICAgICAgIHdpZHRoPXtwbG90V2lkdGh9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIDxTbGlkZXJXcmFwcGVyIHN0eWxlPXt7aGVpZ2h0fX0gY2xhc3NOYW1lPVwia2ctcmFuZ2Utc2xpZGVyX19zbGlkZXJcIj5cbiAgICAgICAgICB7dGhpcy5wcm9wcy54QXhpcyA/IDx0aGlzLnByb3BzLnhBeGlzIHdpZHRoPXtwbG90V2lkdGh9IGRvbWFpbj17cmFuZ2V9IC8+IDogbnVsbH1cbiAgICAgICAgICA8U2xpZGVyXG4gICAgICAgICAgICBzaG93VmFsdWVzPXtmYWxzZX1cbiAgICAgICAgICAgIGlzUmFuZ2VkPXtpc1JhbmdlZH1cbiAgICAgICAgICAgIG1pblZhbHVlPXtyYW5nZVswXX1cbiAgICAgICAgICAgIG1heFZhbHVlPXtyYW5nZVsxXX1cbiAgICAgICAgICAgIHZhbHVlMD17dmFsdWUwfVxuICAgICAgICAgICAgdmFsdWUxPXt2YWx1ZTF9XG4gICAgICAgICAgICBzdGVwPXtzdGVwfVxuICAgICAgICAgICAgaGFuZGxlV2lkdGg9e3NsaWRlckhhbmRsZVdpZHRofVxuICAgICAgICAgICAgb25TbGlkZXIwQ2hhbmdlPXt0aGlzLl9zZXRSYW5nZVZhbDB9XG4gICAgICAgICAgICBvblNsaWRlcjFDaGFuZ2U9e3RoaXMuX3NldFJhbmdlVmFsMX1cbiAgICAgICAgICAgIG9uU2xpZGVyQmFyQ2hhbmdlPXsodmFsMCwgdmFsMSkgPT4ge1xuICAgICAgICAgICAgICBvbkNoYW5nZShbdmFsMCwgdmFsMV0pO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGVuYWJsZUJhckRyYWdcbiAgICAgICAgICAvPlxuICAgICAgICAgIHshaXNSYW5nZWQgJiYgc2hvd0lucHV0ID8gdGhpcy5fcmVuZGVySW5wdXQoJ3ZhbHVlMScpIDogbnVsbH1cbiAgICAgICAgPC9TbGlkZXJXcmFwcGVyPlxuICAgICAgICB7aXNSYW5nZWQgJiYgc2hvd0lucHV0ID8gKFxuICAgICAgICAgIDxSYW5nZUlucHV0V3JhcHBlciBjbGFzc05hbWU9XCJyYW5nZS1zbGlkZXJfX2lucHV0LWdyb3VwXCI+XG4gICAgICAgICAgICB7dGhpcy5fcmVuZGVySW5wdXQoJ3ZhbHVlMCcpfVxuICAgICAgICAgICAge3RoaXMuX3JlbmRlcklucHV0KCd2YWx1ZTEnKX1cbiAgICAgICAgICA8L1JhbmdlSW5wdXRXcmFwcGVyPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxucG9seWZpbGwoUmFuZ2VTbGlkZXIpO1xuXG5leHBvcnQgZGVmYXVsdCBSYW5nZVNsaWRlcjtcbiJdfQ==