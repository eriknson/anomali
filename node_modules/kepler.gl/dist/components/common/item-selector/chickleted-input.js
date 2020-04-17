"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _delete = _interopRequireDefault(require("../icons/delete"));

var _reactIntl = require("react-intl");

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ", "\n\n  color: ", ";\n  overflow: hidden;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  margin-right: 10px;\n  text-overflow: ellipsis;\n  width: 100%;\n  overflow: hidden;\n\n  :hover {\n    overflow: visible;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  background: ", ";\n  border-radius: 1px;\n  color: ", ";\n  font-size: 11px;\n  line-height: 20px;\n  margin: 4px 10px 4px 3px;\n  padding: 2px 6px;\n  display: flex;\n  align-items: center;\n  max-width: calc(100% - 8px);\n\n  :hover {\n    color: ", ";\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var propTypes = {
  // required properties
  onClick: _propTypes["default"].func.isRequired,
  removeItem: _propTypes["default"].func.isRequired,
  // optional properties
  selectedItems: _propTypes["default"].arrayOf(_propTypes["default"].any),
  disabled: _propTypes["default"].bool,
  displayOption: _propTypes["default"].func,
  focus: _propTypes["default"].bool,
  error: _propTypes["default"].bool,
  placeholder: _propTypes["default"].string,
  inputTheme: _propTypes["default"].string
};

var ChickletButton = _styledComponents["default"].div(_templateObject(), function (props) {
  return props.theme.panelActiveBg;
}, function (props) {
  return props.theme.textColor;
}, function (props) {
  return props.theme.textColorHl;
});

var ChickletTag = _styledComponents["default"].span(_templateObject2());

var Chicklet = function Chicklet(_ref) {
  var disabled = _ref.disabled,
      name = _ref.name,
      remove = _ref.remove;
  return _react["default"].createElement(ChickletButton, null, _react["default"].createElement(ChickletTag, null, name), _react["default"].createElement(_delete["default"], {
    height: "10px",
    onClick: disabled ? null : remove
  }));
};

var ChickletedInputContainer = _styledComponents["default"].div(_templateObject3(), function (props) {
  return props.inputTheme === 'secondary' ? props.theme.secondaryChickletedInput : props.theme.chickletedInput;
}, function (props) {
  return props.hasPlaceholder ? props.theme.selectColorPlaceHolder : props.theme.selectColor;
});

var ChickletedInput = function ChickletedInput(_ref2) {
  var focus = _ref2.focus,
      disabled = _ref2.disabled,
      error = _ref2.error,
      onClick = _ref2.onClick,
      className = _ref2.className,
      _ref2$selectedItems = _ref2.selectedItems,
      selectedItems = _ref2$selectedItems === void 0 ? [] : _ref2$selectedItems,
      _ref2$placeholder = _ref2.placeholder,
      placeholder = _ref2$placeholder === void 0 ? '' : _ref2$placeholder,
      removeItem = _ref2.removeItem,
      _ref2$displayOption = _ref2.displayOption,
      displayOption = _ref2$displayOption === void 0 ? function (d) {
    return d;
  } : _ref2$displayOption,
      inputTheme = _ref2.inputTheme;
  return _react["default"].createElement(ChickletedInputContainer, {
    className: "".concat(className, " chickleted-input"),
    focus: focus,
    disabled: disabled,
    error: error,
    onClick: onClick,
    inputTheme: inputTheme,
    hasPlaceholder: !selectedItems || !selectedItems.length
  }, selectedItems.length > 0 ? selectedItems.map(function (item, i) {
    return _react["default"].createElement(Chicklet, {
      disabled: disabled,
      key: "".concat(displayOption(item), "_").concat(i),
      name: displayOption(item),
      remove: function remove(e) {
        return removeItem(item, e);
      }
    });
  }) : _react["default"].createElement("span", {
    className: "".concat(className, " chickleted-input__placeholder")
  }, _react["default"].createElement(_reactIntl.FormattedMessage, {
    id: placeholder
  })));
};

ChickletedInput.propTypes = propTypes;
var _default = ChickletedInput;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9pdGVtLXNlbGVjdG9yL2NoaWNrbGV0ZWQtaW5wdXQuanMiXSwibmFtZXMiOlsicHJvcFR5cGVzIiwib25DbGljayIsIlByb3BUeXBlcyIsImZ1bmMiLCJpc1JlcXVpcmVkIiwicmVtb3ZlSXRlbSIsInNlbGVjdGVkSXRlbXMiLCJhcnJheU9mIiwiYW55IiwiZGlzYWJsZWQiLCJib29sIiwiZGlzcGxheU9wdGlvbiIsImZvY3VzIiwiZXJyb3IiLCJwbGFjZWhvbGRlciIsInN0cmluZyIsImlucHV0VGhlbWUiLCJDaGlja2xldEJ1dHRvbiIsInN0eWxlZCIsImRpdiIsInByb3BzIiwidGhlbWUiLCJwYW5lbEFjdGl2ZUJnIiwidGV4dENvbG9yIiwidGV4dENvbG9ySGwiLCJDaGlja2xldFRhZyIsInNwYW4iLCJDaGlja2xldCIsIm5hbWUiLCJyZW1vdmUiLCJDaGlja2xldGVkSW5wdXRDb250YWluZXIiLCJzZWNvbmRhcnlDaGlja2xldGVkSW5wdXQiLCJjaGlja2xldGVkSW5wdXQiLCJoYXNQbGFjZWhvbGRlciIsInNlbGVjdENvbG9yUGxhY2VIb2xkZXIiLCJzZWxlY3RDb2xvciIsIkNoaWNrbGV0ZWRJbnB1dCIsImNsYXNzTmFtZSIsImQiLCJsZW5ndGgiLCJtYXAiLCJpdGVtIiwiaSIsImUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFNBQVMsR0FBRztBQUNoQjtBQUNBQyxFQUFBQSxPQUFPLEVBQUVDLHNCQUFVQyxJQUFWLENBQWVDLFVBRlI7QUFHaEJDLEVBQUFBLFVBQVUsRUFBRUgsc0JBQVVDLElBQVYsQ0FBZUMsVUFIWDtBQUtoQjtBQUNBRSxFQUFBQSxhQUFhLEVBQUVKLHNCQUFVSyxPQUFWLENBQWtCTCxzQkFBVU0sR0FBNUIsQ0FOQztBQU9oQkMsRUFB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R0FDQ2pDLGFBQWEsQ0FBQ2tDLEdBQWQsQ0FBa0IsVUFBQ0MsSUFBRCxFQUFPQyxDQUFQO0FBQUEsV0FDaEIsZ0NBQUMsUUFBRDtBQUNFLE1BQUEsUUFBUSxFQUFFakMsUUFEWjtBQUVFLE1BQUEsR0FBRyxZQUFLRSxhQUFhLENBQUM4QixJQUFELENBQWxCLGNBQTRCQyxDQUE1QixDQUZMO0FBR0UsTUFBQSxJQUFJLEVBQUUvQixhQUFhLENBQUM4QixJQUFELENBSHJCO0FBSUUsTUFBQSxNQUFNLEVBQUUsZ0JBQUFFLENBQUM7QUFBQSxlQUFJdEMsVUFBVSxDQUFDb0MsSUFBRCxFQUFPRSxDQUFQLENBQWQ7QUFBQTtBQUpYLE1BRGdCO0FBQUEsR0FBbEIsQ0FERCxHQVVDO0FBQU0sSUFBQSxTQUFTLFlBQUtOLFNBQUw7QUFBZixLQUNFLGdDQUFDLDJCQUFEO0FBQWtCLElBQUEsRUFBRSxFQUFFdkI7QUFBdEIsSUFERixDQW5CSixDQVpzQjtBQUFBLENBQXhCOztBQXNDQXNCLGVBQWUsQ0FBQ3BDLFNBQWhCLEdBQTRCQSxTQUE1QjtlQUVlb0MsZSIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBEZWxldGUgZnJvbSAnLi4vaWNvbnMvZGVsZXRlJztcbmltcG9ydCB7Rm9ybWF0dGVkTWVzc2FnZX0gZnJvbSAncmVhY3QtaW50bCc7XG5cbmNvbnN0IHByb3BUeXBlcyA9IHtcbiAgLy8gcmVxdWlyZWQgcHJvcGVydGllc1xuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICByZW1vdmVJdGVtOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXG4gIC8vIG9wdGlvbmFsIHByb3BlcnRpZXNcbiAgc2VsZWN0ZWRJdGVtczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSksXG4gIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgZGlzcGxheU9wdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG4gIGZvY3VzOiBQcm9wVHlwZXMuYm9vbCxcbiAgZXJyb3I6IFByb3BUeXBlcy5ib29sLFxuICBwbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgaW5wdXRUaGVtZTogUHJvcFR5cGVzLnN0cmluZ1xufTtcblxuY29uc3QgQ2hpY2tsZXRCdXR0b24gPSBzdHlsZWQuZGl2YFxuICBiYWNrZ3JvdW5kOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnBhbmVsQWN0aXZlQmd9O1xuICBib3JkZXItcmFkaXVzOiAxcHg7XG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvcn07XG4gIGZvbnQtc2l6ZTogMTFweDtcbiAgbGluZS1oZWlnaHQ6IDIwcHg7XG4gIG1hcmdpbjogNHB4IDEwcHggNHB4IDNweDtcbiAgcGFkZGluZzogMnB4IDZweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbWF4LXdpZHRoOiBjYWxjKDEwMCUgLSA4cHgpO1xuXG4gIDpob3ZlciB7XG4gICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9ySGx9O1xuICB9XG5gO1xuXG5jb25zdCBDaGlja2xldFRhZyA9IHN0eWxlZC5zcGFuYFxuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICB3aWR0aDogMTAwJTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcblxuICA6aG92ZXIge1xuICAgIG92ZXJmbG93OiB2aXNpYmxlO1xuICB9XG5gO1xuXG5jb25zdCBDaGlja2xldCA9ICh7ZGlzYWJsZWQsIG5hbWUsIHJlbW92ZX0pID0+IChcbiAgPENoaWNrbGV0QnV0dG9uPlxuICAgIDxDaGlja2xldFRhZz57bmFtZX08L0NoaWNrbGV0VGFnPlxuICAgIDxEZWxldGUgaGVpZ2h0PVwiMTBweFwiIG9uQ2xpY2s9e2Rpc2FibGVkID8gbnVsbCA6IHJlbW92ZX0gLz5cbiAgPC9DaGlja2xldEJ1dHRvbj5cbik7XG5cbmNvbnN0IENoaWNrbGV0ZWRJbnB1dENvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gICR7cHJvcHMgPT5cbiAgICBwcm9wcy5pbnB1dFRoZW1lID09PSAnc2Vjb25kYXJ5J1xuICAgICAgPyBwcm9wcy50aGVtZS5zZWNvbmRhcnlDaGlja2xldGVkSW5wdXRcbiAgICAgIDogcHJvcHMudGhlbWUuY2hpY2tsZXRlZElucHV0fVxuXG4gIGNvbG9yOiAke3Byb3BzID0+XG4gICAgcHJvcHMuaGFzUGxhY2Vob2xkZXIgPyBwcm9wcy50aGVtZS5zZWxlY3RDb2xvclBsYWNlSG9sZGVyIDogcHJvcHMudGhlbWUuc2VsZWN0Q29sb3J9O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuYDtcblxuY29uc3QgQ2hpY2tsZXRlZElucHV0ID0gKHtcbiAgZm9jdXMsXG4gIGRpc2FibGVkLFxuICBlcnJvcixcbiAgb25DbGljayxcbiAgY2xhc3NOYW1lLFxuICBzZWxlY3RlZEl0ZW1zID0gW10sXG4gIHBsYWNlaG9sZGVyID0gJycsXG4gIHJlbW92ZUl0ZW0sXG4gIGRpc3BsYXlPcHRpb24gPSBkID0+IGQsXG4gIGlucHV0VGhlbWVcbn0pID0+IChcbiAgPENoaWNrbGV0ZWRJbnB1dENvbnRhaW5lclxuICAgIGNsYXNzTmFtZT17YCR7Y2xhc3NOYW1lfSBjaGlja2xldGVkLWlucHV0YH1cbiAgICBmb2N1cz17Zm9jdXN9XG4gICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgIGVycm9yPXtlcnJvcn1cbiAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICAgIGlucHV0VGhlbWU9e2lucHV0VGhlbWV9XG4gICAgaGFzUGxhY2Vob2xkZXI9eyFzZWxlY3RlZEl0ZW1zIHx8ICFzZWxlY3RlZEl0ZW1zLmxlbmd0aH1cbiAgPlxuICAgIHtzZWxlY3RlZEl0ZW1zLmxlbmd0aCA+IDAgPyAoXG4gICAgICBzZWxlY3RlZEl0ZW1zLm1hcCgoaXRlbSwgaSkgPT4gKFxuICAgICAgICA8Q2hpY2tsZXRcbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAga2V5PXtgJHtkaXNwbGF5T3B0aW9uKGl0ZW0pfV8ke2l9YH1cbiAgICAgICAgICBuYW1lPXtkaXNwbGF5T3B0aW9uKGl0ZW0pfVxuICAgICAgICAgIHJlbW92ZT17ZSA9PiByZW1vdmVJdGVtKGl0ZW0sIGUpfVxuICAgICAgICAvPlxuICAgICAgKSlcbiAgICApIDogKFxuICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgJHtjbGFzc05hbWV9IGNoaWNrbGV0ZWQtaW5wdXRfX3BsYWNlaG9sZGVyYH0+XG4gICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPXtwbGFjZWhvbGRlcn0gLz5cbiAgICAgIDwvc3Bhbj5cbiAgICApfVxuICA8L0NoaWNrbGV0ZWRJbnB1dENvbnRhaW5lcj5cbik7XG5cbkNoaWNrbGV0ZWRJbnB1dC5wcm9wVHlwZXMgPSBwcm9wVHlwZXM7XG5cbmV4cG9ydCBkZWZhdWx0IENoaWNrbGV0ZWRJbnB1dDtcbiJdfQ==