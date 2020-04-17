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

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _rangeSlider = _interopRequireDefault(require("../range-slider"));

var _reactOnclickoutside = _interopRequireDefault(require("react-onclickoutside"));

var _defaultSettings = require("../../../constants/default-settings");

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  position: absolute;\n  bottom: 50px;\n  right: calc(0% - 32px);\n  width: 180px;\n  padding: 2px 8px 2px 12px;\n  background-color: ", ";\n  box-shadow: -2px -2px 0 0 rgba(0, 0, 0, 0.1);\n  .kg-range-slider__input {\n    width: 36px;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  position: relative;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var SliderWrapper = _styledComponents["default"].div(_templateObject());

var SpeedSliderContainer = _styledComponents["default"].div(_templateObject2(), function (props) {
  return props.theme.panelBackground;
});

var AnimationSpeedSlider =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(AnimationSpeedSlider, _Component);

  function AnimationSpeedSlider() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, AnimationSpeedSlider);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(AnimationSpeedSlider)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleClickOutside", function (e) {
      _this.props.onHide();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onChange", function (v) {
      return _this.props.updateAnimationSpeed(v[1]);
    });
    return _this;
  }

  (0, _createClass2["default"])(AnimationSpeedSlider, [{
    key: "render",
    value: function render() {
      return _react["default"].createElement(SpeedSliderContainer, {
        className: "animation-control__speed-slider"
      }, _react["default"].createElement(SliderWrapper, null, _react["default"].createElement(_rangeSlider["default"], {
        range: _defaultSettings.SPEED_CONTROL_RANGE,
        step: 0.01,
        value0: 0,
        value1: this.props.speed,
        onChange: this._onChange,
        isRanged: false,
        showTooltip: true,
        showInput: true,
        inputTheme: "secondary",
        inputSize: "tiny"
      })));
    }
  }]);
  return AnimationSpeedSlider;
}(_react.Component);

var _default = (0, _reactOnclickoutside["default"])(AnimationSpeedSlider);

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9hbmltYXRpb24tY29udHJvbC9hbmltYXRpb24tc3BlZWQtc2xpZGVyLmpzIl0sIm5hbWVzIjpbIlNsaWRlcldyYXBwZXIiLCJzdHlsZWQiLCJkaXYiLCJTcGVlZFNsaWRlckNvbnRhaW5lciIsInByb3BzIiwidGhlbWUiLCJwYW5lbEJhY2tncm91bmQiLCJBbmltYXRpb25TcGVlZFNsaWRlciIsImUiLCJvbkhpZGUiLCJ2IiwidXBkYXRlQW5pbWF0aW9uU3BlZWQiLCJTUEVFRF9DT05UUk9MX1JBTkdFIiwic3BlZWQiLCJfb25DaGFuZ2UiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLGFBQWEsR0FBR0MsNkJBQU9DLEdBQVYsbUJBQW5COztBQUlBLElBQU1DLG9CQUFvQixHQUFHRiw2QkFBT0MsR0FBVixxQkFNSixVQUFBRSxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlDLGVBQWhCO0FBQUEsQ0FORCxDQUExQjs7SUFhTUMsb0I7Ozs7Ozs7Ozs7Ozs7Ozs7OzJHQUNpQixVQUFBQyxDQUFDLEVBQUk7QUFDeEIsWUFBS0osS0FBTCxDQUFXSyxNQUFYO0FBQ0QsSztrR0FFVyxVQUFBQyxDQUFDO0FBQUEsYUFBSSxNQUFLTixLQUFMLENBQVdPLG9CQUFYLENBQWdDRCxDQUFDLENBQUMsQ0FBRCxDQUFqQyxDQUFKO0FBQUEsSzs7Ozs7OzZCQUVKO0FBQ1AsYUFDRSxnQ0FBQyxvQkFBRDtBQUFzQixRQUFBLFNBQVMsRUFBQztBQUFoQyxTQUNFLGdDQUFDLGFBQUQsUUFDRSxnQ0FBQyx1QkFBRDtBQUNFLFFBQUEsS0FBSyxFQUFFRSxvQ0FEVDtBQUVFLFFBQUEsSUFBSSxFQUFFLElBRlI7QUFHRSxRQUFBLE1BQU0sRUFBRSxDQUhWO0FBSUUsUUFBQSxNQUFNLEVBQUUsS0FBS1IsS0FBTCxDQUFXUyxLQUpyQjtBQUtFLFFBQUEsUUFBUSxFQUFFLEtBQUtDLFNBTGpCO0FBTUUsUUFBQSxRQUFRLEVBQUUsS0FOWjtBQU9FLFFBQUEsV0FBVyxNQVBiO0FBUUUsUUFBQSxTQUFTLE1BUlg7QUFTRSxRQUFBLFVBQVUsRUFBQyxXQVRiO0FBVUUsUUFBQSxTQUFTLEVBQUM7QUFWWixRQURGLENBREYsQ0FERjtBQWtCRDs7O0VBMUJnQ0MsZ0I7O2VBNkJwQixxQ0FBZVIsb0JBQWYsQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgUmFuZ2VTbGlkZXIgZnJvbSAnY29tcG9uZW50cy9jb21tb24vcmFuZ2Utc2xpZGVyJztcbmltcG9ydCBvbkNsaWNrT3V0c2lkZSBmcm9tICdyZWFjdC1vbmNsaWNrb3V0c2lkZSc7XG5pbXBvcnQge1NQRUVEX0NPTlRST0xfUkFOR0V9IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcblxuY29uc3QgU2xpZGVyV3JhcHBlciA9IHN0eWxlZC5kaXZgXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbmA7XG5cbmNvbnN0IFNwZWVkU2xpZGVyQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IDUwcHg7XG4gIHJpZ2h0OiBjYWxjKDAlIC0gMzJweCk7XG4gIHdpZHRoOiAxODBweDtcbiAgcGFkZGluZzogMnB4IDhweCAycHggMTJweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wYW5lbEJhY2tncm91bmR9O1xuICBib3gtc2hhZG93OiAtMnB4IC0ycHggMCAwIHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgLmtnLXJhbmdlLXNsaWRlcl9faW5wdXQge1xuICAgIHdpZHRoOiAzNnB4O1xuICB9XG5gO1xuXG5jbGFzcyBBbmltYXRpb25TcGVlZFNsaWRlciBleHRlbmRzIENvbXBvbmVudCB7XG4gIGhhbmRsZUNsaWNrT3V0c2lkZSA9IGUgPT4ge1xuICAgIHRoaXMucHJvcHMub25IaWRlKCk7XG4gIH07XG5cbiAgX29uQ2hhbmdlID0gdiA9PiB0aGlzLnByb3BzLnVwZGF0ZUFuaW1hdGlvblNwZWVkKHZbMV0pO1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPFNwZWVkU2xpZGVyQ29udGFpbmVyIGNsYXNzTmFtZT1cImFuaW1hdGlvbi1jb250cm9sX19zcGVlZC1zbGlkZXJcIj5cbiAgICAgICAgPFNsaWRlcldyYXBwZXI+XG4gICAgICAgICAgPFJhbmdlU2xpZGVyXG4gICAgICAgICAgICByYW5nZT17U1BFRURfQ09OVFJPTF9SQU5HRX1cbiAgICAgICAgICAgIHN0ZXA9ezAuMDF9XG4gICAgICAgICAgICB2YWx1ZTA9ezB9XG4gICAgICAgICAgICB2YWx1ZTE9e3RoaXMucHJvcHMuc3BlZWR9XG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5fb25DaGFuZ2V9XG4gICAgICAgICAgICBpc1JhbmdlZD17ZmFsc2V9XG4gICAgICAgICAgICBzaG93VG9vbHRpcFxuICAgICAgICAgICAgc2hvd0lucHV0XG4gICAgICAgICAgICBpbnB1dFRoZW1lPVwic2Vjb25kYXJ5XCJcbiAgICAgICAgICAgIGlucHV0U2l6ZT1cInRpbnlcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvU2xpZGVyV3JhcHBlcj5cbiAgICAgIDwvU3BlZWRTbGlkZXJDb250YWluZXI+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBvbkNsaWNrT3V0c2lkZShBbmltYXRpb25TcGVlZFNsaWRlcik7XG4iXX0=