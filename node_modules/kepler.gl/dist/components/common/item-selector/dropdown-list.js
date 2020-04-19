"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ListItem = exports.classList = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  background-color: ", ";\n  border-top: 1px solid ", ";\n  ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var classList = {
  list: 'list-selector',
  listHeader: 'list__header',
  listSection: 'list__section',
  listItem: 'list__item',
  listItemAnchor: 'list__item__anchor'
};
exports.classList = classList;

var defaultDisplay = function defaultDisplay(d) {
  return d;
};

var ListItem = function ListItem(_ref) {
  var value = _ref.value,
      _ref$displayOption = _ref.displayOption,
      displayOption = _ref$displayOption === void 0 ? defaultDisplay : _ref$displayOption;
  return _react["default"].createElement("span", {
    className: classList.listItemAnchor
  }, displayOption(value));
};

exports.ListItem = ListItem;

var DropdownListWrapper = _styledComponents["default"].div(_templateObject(), function (props) {
  return props.light ? props.theme.dropdownListBgdLT : props.theme.dropdownListBgd;
}, function (props) {
  return props.theme.dropdownListBorderTop;
}, function (props) {
  return props.light ? props.theme.dropdownListLT : props.theme.dropdownList;
});

var DropdownList =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(DropdownList, _Component);

  function DropdownList() {
    (0, _classCallCheck2["default"])(this, DropdownList);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(DropdownList).apply(this, arguments));
  }

  (0, _createClass2["default"])(DropdownList, [{
    key: "_onClick",
    value: function _onClick(result, event) {
      event.preventDefault();
      this.props.onOptionSelected(result, event);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          fixedOptions = _this$props.fixedOptions,
          light = _this$props.light;
      var display = this.props.displayOption; // Don't render if there are no options to display

      if (!this.props.options.length && this.props.allowCustomValues <= 0) {
        return false;
      }

      var valueOffset = Array.isArray(fixedOptions) ? fixedOptions.length : 0; // For some reason onClick is not fired when clicked on an option
      // onMouseDown is used here as a workaround of #205 and other

      return _react["default"].createElement(DropdownListWrapper, {
        className: classList.list,
        light: light
      }, this.props.customListHeaderComponent ? _react["default"].createElement("div", {
        className: classList.listHeader
      }, _react["default"].createElement(this.props.customListHeaderComponent, null)) : null, valueOffset > 0 ? _react["default"].createElement("div", {
        className: classList.listSection
      }, fixedOptions.map(function (value, i) {
        return _react["default"].createElement("div", {
          className: (0, _classnames["default"])(classList.listItem, {
            hover: _this.props.selectionIndex === i,
            fixed: true
          }),
          key: "".concat(display(value), "_").concat(i),
          onMouseDown: function onMouseDown(e) {
            return _this._onClick(value, e);
          },
          onClick: function onClick(e) {
            return _this._onClick(value, e);
          }
        }, _react["default"].createElement(_this.props.customListItemComponent, {
          value: value,
          displayOption: display
        }));
      })) : null, this.props.options.map(function (value, i) {
        return _react["default"].createElement("div", {
          className: (0, _classnames["default"])(classList.listItem, {
            hover: _this.props.selectionIndex === i + valueOffset
          }),
          key: "".concat(display(value), "_").concat(i),
          onMouseDown: function onMouseDown(e) {
            return _this._onClick(value, e);
          },
          onClick: function onClick(e) {
            return _this._onClick(value, e);
          }
        }, _react["default"].createElement(_this.props.customListItemComponent, {
          value: value,
          displayOption: display
        }));
      }));
    }
  }]);
  return DropdownList;
}(_react.Component);

exports["default"] = DropdownList;
(0, _defineProperty2["default"])(DropdownList, "propTypes", {
  options: _propTypes["default"].arrayOf(_propTypes["default"].any),
  allowCustomValues: _propTypes["default"].number,
  customClasses: _propTypes["default"].object,
  customValues: _propTypes["default"].arrayOf(_propTypes["default"].any),
  customListItemComponent: _propTypes["default"].oneOfType([_propTypes["default"].element, _propTypes["default"].func]),
  customListHeaderComponent: _propTypes["default"].oneOfType([_propTypes["default"].element, _propTypes["default"].func]),
  selectionIndex: _propTypes["default"].number,
  onOptionSelected: _propTypes["default"].func,
  displayOption: _propTypes["default"].func.isRequired,
  defaultClassNames: _propTypes["default"].bool,
  areResultsTruncated: _propTypes["default"].bool,
  resultsTruncatedMessage: _propTypes["default"].string,
  listItemComponent: _propTypes["default"].func
});
(0, _defineProperty2["default"])(DropdownList, "defaultProps", {
  customClasses: {},
  customListItemComponent: ListItem,
  customListHeaderComponent: null,
  allowCustomValues: 0,
  customValues: [],
  displayOption: defaultDisplay,
  onOptionSelected: function onOptionSelected() {},
  defaultClassNames: true,
  selectionIndex: null
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9pdGVtLXNlbGVjdG9yL2Ryb3Bkb3duLWxpc3QuanMiXSwibmFtZXMiOlsiY2xhc3NMaXN0IiwibGlzdCIsImxpc3RIZWFkZXIiLCJsaXN0U2VjdGlvbiIsImxpc3RJdGVtIiwibGlzdEl0ZW1BbmNob3IiLCJkZWZhdWx0RGlzcGxheSIsImQiLCJMaXN0SXRlbSIsInZhbHVlIiwiZGlzcGxheU9wdGlvbiIsIkRyb3Bkb3duTGlzdFdyYXBwZXIiLCJzdHlsZWQiLCJkaXYiLCJwcm9wcyIsImxpZ2h0IiwidGhlbWUiLCJkcm9wZG93bkxpc3RCZ2RMVCIsImRyb3Bkb3duTGlzdEJnZCIsImRyb3Bkb3duTGlzdEJvcmRlclRvcCIsImRyb3Bkb3duTGlzdExUIiwiZHJvcGRvd25MaXN0IiwiRHJvcGRvd25MaXN0IiwicmVzdWx0IiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsIm9uT3B0aW9uU2VsZWN0ZWQiLCJmaXhlZE9wdGlvbnMiLCJkaXNwbGF5Iiwib3B0aW9ucyIsImxlbmd0aCIsImFsbG93Q3VzdG9tVmFsdWVzIiwidmFsdWVPZmZzZXQiLCJBcnJheSIsImlzQXJyYXkiLCJjdXN0b21MaXN0SGVhZGVyQ29tcG9uZW50IiwibWFwIiwiaSIsImhvdmVyIiwic2VsZWN0aW9uSW5kZXgiLCJmaXhlZCIsImUiLCJfb25DbGljayIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsImFycmF5T2YiLCJhbnkiLCJudW1iZXIiLCJjdXN0b21DbGFzc2VzIiwib2JqZWN0IiwiY3VzdG9tVmFsdWVzIiwiY3VzdG9tTGlzdEl0ZW1Db21wb25lbnQiLCJvbmVPZlR5cGUiLCJlbGVtZW50IiwiZnVuYyIsImlzUmVxdWlyZWQiLCJkZWZhdWx0Q2xhc3NOYW1lcyIsImJvb2wiLCJhcmVSZXN1bHRzVHJ1bmNhdGVkIiwicmVzdWx0c1RydW5jYXRlZE1lc3NhZ2UiLCJzdHJpbmciLCJsaXN0SXRlbUNvbXBvbmVudCJdLCJt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Qkc7QUFDcEIwQixFQUFBQSxhQUFhLEVBQUUsRUFESztBQUVwQkcsRUFBQUEsdUJBQXVCLEVBQUUzQyxRQUZMO0FBR3BCMkIsRUFBQUEseUJBQXlCLEVBQUUsSUFIUDtBQUlwQkosRUFBQUEsaUJBQWlCLEVBQUUsQ0FKQztBQUtwQm1CLEVBQUFBLFlBQVksRUFBRSxFQUxNO0FBTXBCeEMsRUFBQUEsYUFBYSxFQUFFSixjQU5LO0FBT3BCb0IsRUFBQUEsZ0JBQWdCLEVBQUUsNEJBQU0sQ0FBRSxDQVBOO0FBUXBCOEIsRUFBQUEsaUJBQWlCLEVBQUUsSUFSQztBQVNwQmpCLEVBQUFBLGNBQWMsRUFBRTtBQVRJLEMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMjAgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuXG5leHBvcnQgY29uc3QgY2xhc3NMaXN0ID0ge1xuICBsaXN0OiAnbGlzdC1zZWxlY3RvcicsXG4gIGxpc3RIZWFkZXI6ICdsaXN0X19oZWFkZXInLFxuICBsaXN0U2VjdGlvbjogJ2xpc3RfX3NlY3Rpb24nLFxuICBsaXN0SXRlbTogJ2xpc3RfX2l0ZW0nLFxuICBsaXN0SXRlbUFuY2hvcjogJ2xpc3RfX2l0ZW1fX2FuY2hvcidcbn07XG5cbmNvbnN0IGRlZmF1bHREaXNwbGF5ID0gZCA9PiBkO1xuZXhwb3J0IGNvbnN0IExpc3RJdGVtID0gKHt2YWx1ZSwgZGlzcGxheU9wdGlvbiA9IGRlZmF1bHREaXNwbGF5fSkgPT4gKFxuICA8c3BhbiBjbGFzc05hbWU9e2NsYXNzTGlzdC5saXN0SXRlbUFuY2hvcn0+e2Rpc3BsYXlPcHRpb24odmFsdWUpfTwvc3Bhbj5cbik7XG5cbmNvbnN0IERyb3Bkb3duTGlzdFdyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+XG4gICAgcHJvcHMubGlnaHQgPyBwcm9wcy50aGVtZS5kcm9wZG93bkxpc3RCZ2RMVCA6IHByb3BzLnRoZW1lLmRyb3Bkb3duTGlzdEJnZH07XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAke3Byb3BzID0+IHByb3BzLnRoZW1lLmRyb3Bkb3duTGlzdEJvcmRlclRvcH07XG4gICR7cHJvcHMgPT4gKHByb3BzLmxpZ2h0ID8gcHJvcHMudGhlbWUuZHJvcGRvd25MaXN0TFQgOiBwcm9wcy50aGVtZS5kcm9wZG93bkxpc3QpfTtcbmA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyb3Bkb3duTGlzdCBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgb3B0aW9uczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSksXG4gICAgYWxsb3dDdXN0b21WYWx1ZXM6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgY3VzdG9tQ2xhc3NlczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBjdXN0b21WYWx1ZXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLFxuICAgIGN1c3RvbUxpc3RJdGVtQ29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuZWxlbWVudCwgUHJvcFR5cGVzLmZ1bmNdKSxcbiAgICBjdXN0b21MaXN0SGVhZGVyQ29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuZWxlbWVudCwgUHJvcFR5cGVzLmZ1bmNdKSxcbiAgICBzZWxlY3Rpb25JbmRleDogUHJvcFR5cGVzLm51bWJlcixcbiAgICBvbk9wdGlvblNlbGVjdGVkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBkaXNwbGF5T3B0aW9uOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGRlZmF1bHRDbGFzc05hbWVzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBhcmVSZXN1bHRzVHJ1bmNhdGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICByZXN1bHRzVHJ1bmNhdGVkTWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBsaXN0SXRlbUNvbXBvbmVudDogUHJvcFR5cGVzLmZ1bmNcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGN1c3RvbUNsYXNzZXM6IHt9LFxuICAgIGN1c3RvbUxpc3RJdGVtQ29tcG9uZW50OiBMaXN0SXRlbSxcbiAgICBjdXN0b21MaXN0SGVhZGVyQ29tcG9uZW50OiBudWxsLFxuICAgIGFsbG93Q3VzdG9tVmFsdWVzOiAwLFxuICAgIGN1c3RvbVZhbHVlczogW10sXG4gICAgZGlzcGxheU9wdGlvbjogZGVmYXVsdERpc3BsYXksXG4gICAgb25PcHRpb25TZWxlY3RlZDogKCkgPT4ge30sXG4gICAgZGVmYXVsdENsYXNzTmFtZXM6IHRydWUsXG4gICAgc2VsZWN0aW9uSW5kZXg6IG51bGxcbiAgfTtcblxuICBfb25DbGljayhyZXN1bHQsIGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLnByb3BzLm9uT3B0aW9uU2VsZWN0ZWQocmVzdWx0LCBldmVudCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge2ZpeGVkT3B0aW9ucywgbGlnaHR9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBkaXNwbGF5ID0gdGhpcy5wcm9wcy5kaXNwbGF5T3B0aW9uO1xuXG4gICAgLy8gRG9uJ3QgcmVuZGVyIGlmIHRoZXJlIGFyZSBubyBvcHRpb25zIHRvIGRpc3BsYXlcbiAgICBpZiAoIXRoaXMucHJvcHMub3B0aW9ucy5sZW5ndGggJiYgdGhpcy5wcm9wcy5hbGxvd0N1c3RvbVZhbHVlcyA8PSAwKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgdmFsdWVPZmZzZXQgPSBBcnJheS5pc0FycmF5KGZpeGVkT3B0aW9ucykgPyBmaXhlZE9wdGlvbnMubGVuZ3RoIDogMDtcblxuICAgIC8vIEZvciBzb21lIHJlYXNvbiBvbkNsaWNrIGlzIG5vdCBmaXJlZCB3aGVuIGNsaWNrZWQgb24gYW4gb3B0aW9uXG4gICAgLy8gb25Nb3VzZURvd24gaXMgdXNlZCBoZXJlIGFzIGEgd29ya2Fyb3VuZCBvZiAjMjA1IGFuZCBvdGhlclxuICAgIHJldHVybiAoXG4gICAgICA8RHJvcGRvd25MaXN0V3JhcHBlciBjbGFzc05hbWU9e2NsYXNzTGlzdC5saXN0fSBsaWdodD17bGlnaHR9PlxuICAgICAgICB7dGhpcy5wcm9wcy5jdXN0b21MaXN0SGVhZGVyQ29tcG9uZW50ID8gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc0xpc3QubGlzdEhlYWRlcn0+XG4gICAgICAgICAgICA8dGhpcy5wcm9wcy5jdXN0b21MaXN0SGVhZGVyQ29tcG9uZW50IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiBudWxsfVxuXG4gICAgICAgIHt2YWx1ZU9mZnNldCA+IDAgPyAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTGlzdC5saXN0U2VjdGlvbn0+XG4gICAgICAgICAgICB7Zml4ZWRPcHRpb25zLm1hcCgodmFsdWUsIGkpID0+IChcbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhjbGFzc0xpc3QubGlzdEl0ZW0sIHtcbiAgICAgICAgICAgICAgICAgIGhvdmVyOiB0aGlzLnByb3BzLnNlbGVjdGlvbkluZGV4ID09PSBpLFxuICAgICAgICAgICAgICAgICAgZml4ZWQ6IHRydWVcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBrZXk9e2Ake2Rpc3BsYXkodmFsdWUpfV8ke2l9YH1cbiAgICAgICAgICAgICAgICBvbk1vdXNlRG93bj17ZSA9PiB0aGlzLl9vbkNsaWNrKHZhbHVlLCBlKX1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtlID0+IHRoaXMuX29uQ2xpY2sodmFsdWUsIGUpfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHRoaXMucHJvcHMuY3VzdG9tTGlzdEl0ZW1Db21wb25lbnQgdmFsdWU9e3ZhbHVlfSBkaXNwbGF5T3B0aW9uPXtkaXNwbGF5fSAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogbnVsbH1cblxuICAgICAgICB7dGhpcy5wcm9wcy5vcHRpb25zLm1hcCgodmFsdWUsIGkpID0+IChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoY2xhc3NMaXN0Lmxpc3RJdGVtLCB7XG4gICAgICAgICAgICAgIGhvdmVyOiB0aGlzLnByb3BzLnNlbGVjdGlvbkluZGV4ID09PSBpICsgdmFsdWVPZmZzZXRcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAga2V5PXtgJHtkaXNwbGF5KHZhbHVlKX1fJHtpfWB9XG4gICAgICAgICAgICBvbk1vdXNlRG93bj17ZSA9PiB0aGlzLl9vbkNsaWNrKHZhbHVlLCBlKX1cbiAgICAgICAgICAgIG9uQ2xpY2s9e2UgPT4gdGhpcy5fb25DbGljayh2YWx1ZSwgZSl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHRoaXMucHJvcHMuY3VzdG9tTGlzdEl0ZW1Db21wb25lbnQgdmFsdWU9e3ZhbHVlfSBkaXNwbGF5T3B0aW9uPXtkaXNwbGF5fSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApKX1cbiAgICAgIDwvRHJvcGRvd25MaXN0V3JhcHBlcj5cbiAgICApO1xuICB9XG59XG4iXX0=