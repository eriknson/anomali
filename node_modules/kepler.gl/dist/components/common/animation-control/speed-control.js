"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _animationSpeedSlider = _interopRequireDefault(require("./animation-speed-slider"));

var _styledComponents2 = require("../styled-components");

var _icons = require("../icons");

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: inline-block;\n  width: 24px;\n  text-align: left;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  flex-grow: 0;\n  color: ", ";\n  position: relative;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var StyledSpeedToggle = _styledComponents["default"].div(_templateObject(), function (props) {
  return props.theme.textColor;
});

var StyledSpeedText = _styledComponents["default"].div(_templateObject2());

function SpeedControlFactory() {
  var SpeedControl = function SpeedControl(_ref) {
    var onClick = _ref.onClick,
        updateAnimationSpeed = _ref.updateAnimationSpeed,
        speed = _ref.speed,
        showSpeedControl = _ref.showSpeedControl,
        _ref$buttonHeight = _ref.buttonHeight,
        buttonHeight = _ref$buttonHeight === void 0 ? '18px' : _ref$buttonHeight;
    return _react["default"].createElement(StyledSpeedToggle, {
      className: "animation-control__speed-control"
    }, _react["default"].createElement(_styledComponents2.Button, {
      link: true,
      width: "80px",
      onClick: onClick
    }, _react["default"].createElement(_styledComponents2.CenterFlexbox, {
      className: "bottom-widget__icon speed"
    }, _react["default"].createElement(_icons.Rocket, {
      height: buttonHeight
    })), _react["default"].createElement(StyledSpeedText, {
      style: {
        visibility: !showSpeedControl ? 'visible' : 'hidden'
      }
    }, speed, "x")), showSpeedControl ? _react["default"].createElement(_animationSpeedSlider["default"], {
      onHide: onClick,
      updateAnimationSpeed: updateAnimationSpeed,
      speed: speed
    }) : null);
  };

  return SpeedControl;
}

var _default = SpeedControlFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9hbmltYXRpb24tY29udHJvbC9zcGVlZC1jb250cm9sLmpzIl0sIm5hbWVzIjpbIlN0eWxlZFNwZWVkVG9nZ2xlIiwic3R5bGVkIiwiZGl2IiwicHJvcHMiLCJ0aGVtZSIsInRleHRDb2xvciIsIlN0eWxlZFNwZWVkVGV4dCIsIlNwZWVkQ29udHJvbEZhY3RvcnkiLCJTcGVlZENvbnRyb2wiLCJvbkNsaWNrIiwidXBkYXRlQW5pbWF0aW9uU3BlZWQiLCJzcGVlZCIsInNob3dTcGVlZENvbnRyb2wiLCJidXR0b25IZWlnaHQiLCJ2aXNpYmlsaXR5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLGlCQUFpQixHQUFHQyw2QkFBT0MsR0FBVixvQkFHWixVQUFBQyxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlDLFNBQWhCO0FBQUEsQ0FITyxDQUF2Qjs7QUFPQSxJQUFNQyxlQUFlLEdBQUdMLDZCQUFPQyxHQUFWLG9CQUFyQjs7QUFNQSxTQUFTSyxtQkFBVCxHQUErQjtBQUM3QixNQUFNQyxZQUFZLEdBQUcsU0FBZkEsWUFBZTtBQUFBLFFBQ25CQyxPQURtQixRQUNuQkEsT0FEbUI7QUFBQSxRQUVuQkMsb0JBRm1CLFFBRW5CQSxvQkFGbUI7QUFBQSxRQUduQkMsS0FIbUIsUUFHbkJBLEtBSG1CO0FBQUEsUUFJbkJDLGdCQUptQixRQUluQkEsZ0JBSm1CO0FBQUEsaUNBS25CQyxZQUxtQjtBQUFBLFFBS25CQSxZQUxtQixrQ0FLSixNQUxJO0FBQUEsV0FPbkIsZ0NBQUMsaUJBQUQ7QUFBbUIsTUFBQSxTQUFTLEVBQUM7QUFBN0IsT0FDRSxnQ0FBQyx5QkFBRDtBQUFRLE1BQUEsSUFBSSxNQUFaO0FBQWEsTUFBQSxLQUFLLEVBQUMsTUFBbkI7QUFBMEIsTUFBQSxPQUFPLEVBQUVKO0FBQW5DLE9BQ0UsZ0NBQUMsZ0NBQUQ7QUFBZSxNQUFBLFNBQVMsRUFBQztBQUF6QixPQUNFLGdDQUFDLGFBQUQ7QUFBUSxNQUFBLE1BQU0sRUFBRUk7QUFBaEIsTUFERixDQURGLEVBSUUsZ0NBQUMsZUFBRDtBQUFpQixNQUFBLEtBQUssRUFBRTtBQUFDQyxRQUFBQSxVQUFVLEVBQUUsQ0FBQ0YsZ0JBQUQsR0FBb0IsU0FBcEIsR0FBZ0M7QUFBN0M7QUFBeEIsT0FDR0QsS0FESCxNQUpGLENBREYsRUFTR0MsZ0JBQWdCLEdBQ2YsZ0NBQUMsZ0NBQUQ7QUFDRSxNQUFBLE1BQU0sRUFBRUgsT0FEVjtBQUVFLE1BQUEsb0JBQW9CLEVBQUVDLG9CQUZ4QjtBQUdFLE1BQUEsS0FBSyxFQUFFQztBQUhULE1BRGUsR0FNYixJQWZOLENBUG1CO0FBQUEsR0FBckI7O0FBeUJBLFNBQU9ILFlBQVA7QUFDRDs7ZUFDY0QsbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMjAgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgQW5pbWF0aW9uU3BlZWRTbGlkZXIgZnJvbSAnLi9hbmltYXRpb24tc3BlZWQtc2xpZGVyJztcbmltcG9ydCB7QnV0dG9uLCBDZW50ZXJGbGV4Ym94fSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQge1JvY2tldH0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vaWNvbnMnO1xuXG5jb25zdCBTdHlsZWRTcGVlZFRvZ2dsZSA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZ3JvdzogMDtcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9yfTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuYDtcblxuY29uc3QgU3R5bGVkU3BlZWRUZXh0ID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB3aWR0aDogMjRweDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbmA7XG5cbmZ1bmN0aW9uIFNwZWVkQ29udHJvbEZhY3RvcnkoKSB7XG4gIGNvbnN0IFNwZWVkQ29udHJvbCA9ICh7XG4gICAgb25DbGljayxcbiAgICB1cGRhdGVBbmltYXRpb25TcGVlZCxcbiAgICBzcGVlZCxcbiAgICBzaG93U3BlZWRDb250cm9sLFxuICAgIGJ1dHRvbkhlaWdodCA9ICcxOHB4J1xuICB9KSA9PiAoXG4gICAgPFN0eWxlZFNwZWVkVG9nZ2xlIGNsYXNzTmFtZT1cImFuaW1hdGlvbi1jb250cm9sX19zcGVlZC1jb250cm9sXCI+XG4gICAgICA8QnV0dG9uIGxpbmsgd2lkdGg9XCI4MHB4XCIgb25DbGljaz17b25DbGlja30+XG4gICAgICAgIDxDZW50ZXJGbGV4Ym94IGNsYXNzTmFtZT1cImJvdHRvbS13aWRnZXRfX2ljb24gc3BlZWRcIj5cbiAgICAgICAgICA8Um9ja2V0IGhlaWdodD17YnV0dG9uSGVpZ2h0fSAvPlxuICAgICAgICA8L0NlbnRlckZsZXhib3g+XG4gICAgICAgIDxTdHlsZWRTcGVlZFRleHQgc3R5bGU9e3t2aXNpYmlsaXR5OiAhc2hvd1NwZWVkQ29udHJvbCA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nfX0+XG4gICAgICAgICAge3NwZWVkfXhcbiAgICAgICAgPC9TdHlsZWRTcGVlZFRleHQ+XG4gICAgICA8L0J1dHRvbj5cbiAgICAgIHtzaG93U3BlZWRDb250cm9sID8gKFxuICAgICAgICA8QW5pbWF0aW9uU3BlZWRTbGlkZXJcbiAgICAgICAgICBvbkhpZGU9e29uQ2xpY2t9XG4gICAgICAgICAgdXBkYXRlQW5pbWF0aW9uU3BlZWQ9e3VwZGF0ZUFuaW1hdGlvblNwZWVkfVxuICAgICAgICAgIHNwZWVkPXtzcGVlZH1cbiAgICAgICAgLz5cbiAgICAgICkgOiBudWxsfVxuICAgIDwvU3R5bGVkU3BlZWRUb2dnbGU+XG4gICk7XG4gIHJldHVybiBTcGVlZENvbnRyb2w7XG59XG5leHBvcnQgZGVmYXVsdCBTcGVlZENvbnRyb2xGYWN0b3J5O1xuIl19