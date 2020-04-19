"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = _interopRequireDefault(require("lodash.uniqby"));

var _reactOnclickoutside = _interopRequireDefault(require("react-onclickoutside"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _accessor = _interopRequireDefault(require("./accessor"));

var _chickletedInput = _interopRequireDefault(require("./chickleted-input"));

var _typeahead = _interopRequireDefault(require("./typeahead"));

var _icons = require("../icons");

var _dropdownList = _interopRequireWildcard(require("./dropdown-list"));

var _utils = require("../../../utils/utils");

var _reactIntl = require("react-intl");

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  border: 0;\n  width: 100%;\n  left: 0;\n  z-index: ", ";\n  position: absolute;\n  bottom: ", ";\n  margin-top: ", ";\n  margin-bottom: ", ";\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  margin-left: 6px;\n  display: flex;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  color: ", ";\n  overflow: hidden;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ", ";\n\n  .list__item__anchor {\n    ", ";\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var StyledDropdownSelect = _styledComponents["default"].div.attrs({
  className: 'item-selector__dropdown'
})(_templateObject(), function (props) {
  return props.inputTheme === 'secondary' ? props.theme.secondaryInput : props.theme.input;
}, function (props) {
  return props.theme.dropdownListAnchor;
});

var DropdownSelectValue = _styledComponents["default"].span(_templateObject2(), function (props) {
  return props.hasPlaceholder ? props.theme.selectColorPlaceHolder : props.theme.selectColor;
});

var DropdownSelectErase = _styledComponents["default"].div(_templateObject3());

var DropdownWrapper = _styledComponents["default"].div(_templateObject4(), function (props) {
  return props.theme.dropdownWrapperZ;
}, function (props) {
  return props.placement === 'top' ? props.theme.inputBoxHeight : 'auto';
}, function (props) {
  return props.placement === 'bottom' ? '4px' : 'auto';
}, function (props) {
  return props.placement === 'top' ? '4px' : 'auto';
});

var ItemSelector =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(ItemSelector, _Component);

  function ItemSelector() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, ItemSelector);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(ItemSelector)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      showTypeahead: false
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleClickOutside", function () {
      _this._hideTypeahead();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onBlur", function () {
      // note: chickleted input is not a real form element so we call onBlur()
      // when we feel the events are appropriate
      if (_this.props.onBlur) {
        _this.props.onBlur();
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_removeItem", function (item, e) {
      // only used when multiSelect = true
      e.preventDefault();
      e.stopPropagation();
      var selectedItems = _this.props.selectedItems;
      var index = selectedItems.findIndex(function (t) {
        return t === item;
      });

      if (index < 0) {
        return;
      }

      var items = [].concat((0, _toConsumableArray2["default"])(selectedItems.slice(0, index)), (0, _toConsumableArray2["default"])(selectedItems.slice(index + 1, selectedItems.length)));

      _this.props.onChange(items);

      if (_this.props.closeOnSelect) {
        _this.setState({
          showTypeahead: false
        });

        _this._onBlur();
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_selectItem", function (item) {
      var getValue = _accessor["default"].generateOptionToStringFor(_this.props.getOptionValue || _this.props.displayOption);

      var previousSelected = (0, _utils.toArray)(_this.props.selectedItems);

      if (_this.props.multiSelect) {
        var items = (0, _lodash["default"])(previousSelected.concat((0, _utils.toArray)(item)), getValue);

        _this.props.onChange(items);
      } else {
        _this.props.onChange(getValue(item));
      }

      if (_this.props.closeOnSelect) {
        _this.setState({
          showTypeahead: false
        });

        _this._onBlur();
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onErase", function (e) {
      e.stopPropagation();

      _this.props.onChange(null);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_showTypeahead", function () {
      if (!_this.props.disabled) {
        _this.setState({
          showTypeahead: true
        });
      }
    });
    return _this;
  }

  (0, _createClass2["default"])(ItemSelector, [{
    key: "_hideTypeahead",
    value: function _hideTypeahead() {
      this.setState({
        showTypeahead: false
      });

      this._onBlur();
    }
  }, {
    key: "_renderDropdown",
    value: function _renderDropdown(intl) {
      return _react["default"].createElement(DropdownWrapper, {
        placement: this.props.placement
      }, _react["default"].createElement(_typeahead["default"], {
        customClasses: {
          results: 'list-selector',
          input: 'typeahead__input',
          listItem: 'list__item',
          listAnchor: 'list__item__anchor'
        },
        options: this.props.options,
        filterOption: this.props.filterOption,
        fixedOptions: this.props.fixedOptions,
        placeholder: intl.formatMessage({
          id: 'placeholder.search'
        }),
        onOptionSelected: this._selectItem,
        customListComponent: this.props.DropDownRenderComponent,
        customListHeaderComponent: this.props.DropdownHeaderComponent,
        customListItemComponent: this.props.DropDownLineItemRenderComponent,
        displayOption: _accessor["default"].generateOptionToStringFor(this.props.displayOption),
        searchable: this.props.searchable,
        showOptionsWhenEmpty: true,
        selectedItems: (0, _utils.toArray)(this.props.selectedItems)
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var selected = (0, _utils.toArray)(this.props.selectedItems);
      var hasValue = selected.length;

      var displayOption = _accessor["default"].generateOptionToStringFor(this.props.displayOption);

      var dropdownSelectProps = {
        className: (0, _classnames["default"])({
          active: this.state.showTypeahead
        }),
        disabled: this.props.disabled,
        onClick: this._showTypeahead,
        onFocus: this._showPopover,
        error: this.props.isError,
        inputTheme: this.props.inputTheme
      };
      var intl = this.props.intl;
      return _react["default"].createElement("div", {
        className: "item-selector"
      }, _react["default"].createElement("div", {
        style: {
          position: 'relative'
        }
      }, this.props.multiSelect ? _react["default"].createElement(_chickletedInput["default"], (0, _extends2["default"])({}, dropdownSelectProps, {
        selectedItems: (0, _utils.toArray)(this.props.selectedItems),
        placeholder: this.props.placeholder,
        displayOption: displayOption,
        removeItem: this._removeItem
      })) : _react["default"].createElement(StyledDropdownSelect, dropdownSelectProps, _react["default"].createElement(DropdownSelectValue, {
        hasPlaceholder: !hasValue,
        className: "item-selector__dropdown__value"
      }, hasValue ? _react["default"].createElement(this.props.DropDownLineItemRenderComponent, {
        displayOption: displayOption,
        value: selected[0]
      }) : _react["default"].createElement(_reactIntl.FormattedMessage, {
        id: this.props.placeholder
      })), this.props.erasable && hasValue ? _react["default"].createElement(DropdownSelectErase, null, _react["default"].createElement(_icons.Delete, {
        height: "12px",
        onClick: this._onErase
      })) : null), this.state.showTypeahead && this._renderDropdown(intl)));
    }
  }]);
  return ItemSelector;
}(_react.Component);

(0, _defineProperty2["default"])(ItemSelector, "propTypes", {
  // required properties
  selectedItems: _propTypes["default"].oneOfType([_propTypes["default"].array, _propTypes["default"].string, _propTypes["default"].number, _propTypes["default"].bool, _propTypes["default"].object]),
  onChange: _propTypes["default"].func.isRequired,
  options: _propTypes["default"].arrayOf(_propTypes["default"].any).isRequired,
  // optional properties
  fixedOptions: _propTypes["default"].arrayOf(_propTypes["default"].any),
  erasable: _propTypes["default"].bool,
  displayOption: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
  getOptionValue: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
  filterOption: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
  placement: _propTypes["default"].string,
  disabled: _propTypes["default"].bool,
  isError: _propTypes["default"].bool,
  multiSelect: _propTypes["default"].bool,
  inputTheme: _propTypes["default"].string,
  onBlur: _propTypes["default"].func,
  placeholder: _propTypes["default"].string,
  closeOnSelect: _propTypes["default"].bool,
  DropdownHeaderComponent: _propTypes["default"].func,
  DropDownRenderComponent: _propTypes["default"].func,
  DropDownLineItemRenderComponent: _propTypes["default"].func
});
(0, _defineProperty2["default"])(ItemSelector, "defaultProps", {
  erasable: false,
  placement: 'bottom',
  selectedItems: [],
  displayOption: null,
  getOptionValue: null,
  filterOption: null,
  fixedOptions: null,
  inputTheme: 'primary',
  multiSelect: true,
  placeholder: 'placeholder.enterValue',
  closeOnSelect: true,
  searchable: true,
  dropdownHeader: null,
  DropdownHeaderComponent: null,
  DropDownRenderComponent: _dropdownList["default"],
  DropDownLineItemRenderComponent: _dropdownList.ListItem
});

var _default = (0, _reactIntl.injectIntl)((0, _reactOnclickoutside["default"])(ItemSelector));

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9pdGVtLXNlbGVjdG9yL2l0ZW0tc2VsZWN0b3IuanMiXSwibmFtZXMiOlsiU3R5bGVkRHJvcGRvd25TZWxlY3QiLCJzdHlsZWQiLCJkaXYiLCJhdHRycyIsImNsYXNzTmFtZSIsInByb3BzIiwiaW5wdXRUaGVtZSIsInRoZW1lIiwic2Vjb25kYXJ5SW5wdXQiLCJpbnB1dCIsImRyb3Bkb3duTGlzdEFuY2hvciIsIkRyb3Bkb3duU2VsZWN0VmFsdWUiLCJzcGFuIiwiaGFzUGxhY2Vob2xkZXIiLCJzZWxlY3RDb2xvclBsYWNlSG9sZGVyIiwic2VsZWN0Q29sb3IiLCJEcm9wZG93blNlbGVjdEVyYXNlIiwiRHJvcGRvd25XcmFwcGVyIiwiZHJvcGRvd25XcmFwcGVyWiIsInBsYWNlbWVudCIsImlucHV0Qm94SGVpZ2h0IiwiSXRlbVNlbGVjdG9yIiwic2hvd1R5cGVhaGVhZCIsIl9oaWRlVHlwZWFoZWFkIiwib25CbHVyIiwiaXRlbSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsInNlbGVjdGVkSXRlbXMiLCJpbmRleCIsImZpbmRJbmRleCIsInQiLCJpdGVtcyIsInNsaWNlIiwibGVuZ3RoIiwib25DaGFuZ2UiLCJjbG9zZU9uU2VsZWN0Iiwic2V0U3RhdGUiLCJfb25CbHVyIiwiZ2V0VmFsdWUiLCJBY2Nlc3NvciIsImdlbmVyYXRlT3B0aW9uVG9TdHJpbmdGb3IiLCJnZXRPcHRpb25WYWx1ZSIsImRpc3BsYXlPcHRpb24iLCJwcmV2aW91c1NlbGVjdGVkIiwibXVsdGlTZWxlY3QiLCJjb25jYXQiLCJkaXNhYmxlZCIsImludGwiLCJyZXN1bHRzIiwibGlzdEl0ZW0iLCJsaXN0QW5jaG9yIiwib3B0aW9ucyIsImZpbHRlck9wdGlvbiIsImZpeGVkT3B0aW9ucyIsImZvcm1hdE1lc3NhZ2UiLCJpZCIsIl9zZWxlY3RJdGVtIiwiRHJvcERvd25SZW5kZXJDb21wb25lbnQiLCJEcm9wZG93bkhlYWRlckNvbXBvbmVudCIsIkRyb3BEb3duTGluZUl0ZW1SZW5kZXJDb21wb25lbnQiLCJzZWFyY2hhYmxlIiwic2VsZWN0ZWQiLCJoYXNWYWx1ZSIsImRyb3Bkb3duU2VsZWN0UHJvcHMiLCJhY3RpdmUiLCJzdGF0ZSIsIm9uQ2xpY2siLCJfc2hvd1R5cGVhaGVhZCIsIm9uRm9jdXMiLCJfc2hvd1BvcG92ZXIiLCJlcnJvciIsImlzRXJyb3IiLCJwb3NpdGlvbiIsInBsYWNlaG9sZGVyIiwiX3JlbW92ZUl0ZW0iLCJlcmFzYWJsZSIsIl9vbkVyYXNlIiwiX3JlbmRlckRyb3Bkb3duIiwiQ29tcG9uZW50IiwiUHJvcFR5cGVzIiwib25lT2ZUeXBlIiwiYXJyYXkiLCJzdHJpbmciLCJudW1iZXIiLCJib29sIiwib2JqZWN0IiwiZnVuYyIsImlzUmVxdWlyZWQiLCJhcnJheU9mIiwiYW55IiwiZHJvcGRvd25IZWFkZXIiLCJEcm9wZG93bkxpc3QiLCJMaXN0SXRlbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsb0JBQW9CLEdBQUdDLDZCQUFPQyxHQUFQLENBQVdDLEtBQVgsQ0FBaUI7QUFDNUNDLEVBQUFBLFNBQVMsRUFBRTtBQURpQyxDQUFqQixDQUFILG9CQUd0QixVQUFBQyxLQUFLO0FBQUEsU0FBS0EsS0FBSyxDQUFDQyxVQUFOLEtBQXFCLFdBQXJCLEdBQW1DRCxLQUFLLENBQUNFLEtBQU4sQ0FBWUMsY0FBL0MsR0FBZ0VILEtBQUssQ0FBQ0UsS0FBTixDQUFZRSxLQUFqRjtBQUFBLENBSGlCLEVBTXBCLFVBQUFKLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNFLEtBQU4sQ0FBWUcsa0JBQWhCO0FBQUEsQ0FO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b2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB1bmlxQnkgZnJvbSAnbG9kYXNoLnVuaXFieSc7XG5pbXBvcnQgbGlzdGVuc1RvQ2xpY2tPdXRzaWRlIGZyb20gJ3JlYWN0LW9uY2xpY2tvdXRzaWRlJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuXG5pbXBvcnQgQWNjZXNzb3IgZnJvbSAnLi9hY2Nlc3Nvcic7XG5pbXBvcnQgQ2hpY2tsZXRlZElucHV0IGZyb20gJy4vY2hpY2tsZXRlZC1pbnB1dCc7XG5pbXBvcnQgVHlwZWFoZWFkIGZyb20gJy4vdHlwZWFoZWFkJztcbmltcG9ydCB7RGVsZXRlfSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9pY29ucyc7XG5pbXBvcnQgRHJvcGRvd25MaXN0LCB7TGlzdEl0ZW19IGZyb20gJy4vZHJvcGRvd24tbGlzdCc7XG5cbmltcG9ydCB7dG9BcnJheX0gZnJvbSAndXRpbHMvdXRpbHMnO1xuaW1wb3J0IHtGb3JtYXR0ZWRNZXNzYWdlLCBpbmplY3RJbnRsfSBmcm9tICdyZWFjdC1pbnRsJztcblxuY29uc3QgU3R5bGVkRHJvcGRvd25TZWxlY3QgPSBzdHlsZWQuZGl2LmF0dHJzKHtcbiAgY2xhc3NOYW1lOiAnaXRlbS1zZWxlY3Rvcl9fZHJvcGRvd24nXG59KWBcbiAgJHtwcm9wcyA9PiAocHJvcHMuaW5wdXRUaGVtZSA9PT0gJ3NlY29uZGFyeScgPyBwcm9wcy50aGVtZS5zZWNvbmRhcnlJbnB1dCA6IHByb3BzLnRoZW1lLmlucHV0KX07XG5cbiAgLmxpc3RfX2l0ZW1fX2FuY2hvciB7XG4gICAgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5kcm9wZG93bkxpc3RBbmNob3J9O1xuICB9XG5gO1xuXG5jb25zdCBEcm9wZG93blNlbGVjdFZhbHVlID0gc3R5bGVkLnNwYW5gXG4gIGNvbG9yOiAke3Byb3BzID0+XG4gICAgcHJvcHMuaGFzUGxhY2Vob2xkZXIgPyBwcm9wcy50aGVtZS5zZWxlY3RDb2xvclBsYWNlSG9sZGVyIDogcHJvcHMudGhlbWUuc2VsZWN0Q29sb3J9O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuYDtcblxuY29uc3QgRHJvcGRvd25TZWxlY3RFcmFzZSA9IHN0eWxlZC5kaXZgXG4gIG1hcmdpbi1sZWZ0OiA2cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG5gO1xuXG5jb25zdCBEcm9wZG93bldyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICBib3JkZXI6IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBsZWZ0OiAwO1xuICB6LWluZGV4OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmRyb3Bkb3duV3JhcHBlclp9O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvdHRvbTogJHtwcm9wcyA9PiAocHJvcHMucGxhY2VtZW50ID09PSAndG9wJyA/IHByb3BzLnRoZW1lLmlucHV0Qm94SGVpZ2h0IDogJ2F1dG8nKX07XG4gIG1hcmdpbi10b3A6ICR7cHJvcHMgPT4gKHByb3BzLnBsYWNlbWVudCA9PT0gJ2JvdHRvbScgPyAnNHB4JyA6ICdhdXRvJyl9O1xuICBtYXJnaW4tYm90dG9tOiAke3Byb3BzID0+IChwcm9wcy5wbGFjZW1lbnQgPT09ICd0b3AnID8gJzRweCcgOiAnYXV0bycpfTtcbmA7XG5cbmNsYXNzIEl0ZW1TZWxlY3RvciBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgLy8gcmVxdWlyZWQgcHJvcGVydGllc1xuICAgIHNlbGVjdGVkSXRlbXM6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLmFycmF5LFxuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5udW1iZXIsXG4gICAgICBQcm9wVHlwZXMuYm9vbCxcbiAgICAgIFByb3BUeXBlcy5vYmplY3RcbiAgICBdKSxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvcHRpb25zOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KS5pc1JlcXVpcmVkLFxuXG4gICAgLy8gb3B0aW9uYWwgcHJvcGVydGllc1xuICAgIGZpeGVkT3B0aW9uczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSksXG4gICAgZXJhc2FibGU6IFByb3BUeXBlcy5ib29sLFxuICAgIGRpc3BsYXlPcHRpb246IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5mdW5jXSksXG4gICAgZ2V0T3B0aW9uVmFsdWU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5mdW5jXSksXG4gICAgZmlsdGVyT3B0aW9uOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZnVuY10pLFxuICAgIHBsYWNlbWVudDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgaXNFcnJvcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgbXVsdGlTZWxlY3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIGlucHV0VGhlbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgb25CbHVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBwbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjbG9zZU9uU2VsZWN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBEcm9wZG93bkhlYWRlckNvbXBvbmVudDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgRHJvcERvd25SZW5kZXJDb21wb25lbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIERyb3BEb3duTGluZUl0ZW1SZW5kZXJDb21wb25lbnQ6IFByb3BUeXBlcy5mdW5jXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBlcmFzYWJsZTogZmFsc2UsXG4gICAgcGxhY2VtZW50OiAnYm90dG9tJyxcbiAgICBzZWxlY3RlZEl0ZW1zOiBbXSxcbiAgICBkaXNwbGF5T3B0aW9uOiBudWxsLFxuICAgIGdldE9wdGlvblZhbHVlOiBudWxsLFxuICAgIGZpbHRlck9wdGlvbjogbnVsbCxcbiAgICBmaXhlZE9wdGlvbnM6IG51bGwsXG4gICAgaW5wdXRUaGVtZTogJ3ByaW1hcnknLFxuICAgIG11bHRpU2VsZWN0OiB0cnVlLFxuICAgIHBsYWNlaG9sZGVyOiAncGxhY2Vob2xkZXIuZW50ZXJWYWx1ZScsXG4gICAgY2xvc2VPblNlbGVjdDogdHJ1ZSxcbiAgICBzZWFyY2hhYmxlOiB0cnVlLFxuICAgIGRyb3Bkb3duSGVhZGVyOiBudWxsLFxuICAgIERyb3Bkb3duSGVhZGVyQ29tcG9uZW50OiBudWxsLFxuICAgIERyb3BEb3duUmVuZGVyQ29tcG9uZW50OiBEcm9wZG93bkxpc3QsXG4gICAgRHJvcERvd25MaW5lSXRlbVJlbmRlckNvbXBvbmVudDogTGlzdEl0ZW1cbiAgfTtcblxuICBzdGF0ZSA9IHtcbiAgICBzaG93VHlwZWFoZWFkOiBmYWxzZVxuICB9O1xuXG4gIGhhbmRsZUNsaWNrT3V0c2lkZSA9ICgpID0+IHtcbiAgICB0aGlzLl9oaWRlVHlwZWFoZWFkKCk7XG4gIH07XG5cbiAgX2hpZGVUeXBlYWhlYWQoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7c2hvd1R5cGVhaGVhZDogZmFsc2V9KTtcbiAgICB0aGlzLl9vbkJsdXIoKTtcbiAgfVxuXG4gIF9vbkJsdXIgPSAoKSA9PiB7XG4gICAgLy8gbm90ZTogY2hpY2tsZXRlZCBpbnB1dCBpcyBub3QgYSByZWFsIGZvcm0gZWxlbWVudCBzbyB3ZSBjYWxsIG9uQmx1cigpXG4gICAgLy8gd2hlbiB3ZSBmZWVsIHRoZSBldmVudHMgYXJlIGFwcHJvcHJpYXRlXG4gICAgaWYgKHRoaXMucHJvcHMub25CbHVyKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQmx1cigpO1xuICAgIH1cbiAgfTtcblxuICBfcmVtb3ZlSXRlbSA9IChpdGVtLCBlKSA9PiB7XG4gICAgLy8gb25seSB1c2VkIHdoZW4gbXVsdGlTZWxlY3QgPSB0cnVlXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgY29uc3Qge3NlbGVjdGVkSXRlbXN9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBpbmRleCA9IHNlbGVjdGVkSXRlbXMuZmluZEluZGV4KHQgPT4gdCA9PT0gaXRlbSk7XG5cbiAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgaXRlbXMgPSBbXG4gICAgICAuLi5zZWxlY3RlZEl0ZW1zLnNsaWNlKDAsIGluZGV4KSxcbiAgICAgIC4uLnNlbGVjdGVkSXRlbXMuc2xpY2UoaW5kZXggKyAxLCBzZWxlY3RlZEl0ZW1zLmxlbmd0aClcbiAgICBdO1xuXG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZShpdGVtcyk7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5jbG9zZU9uU2VsZWN0KSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtzaG93VHlwZWFoZWFkOiBmYWxzZX0pO1xuICAgICAgdGhpcy5fb25CbHVyKCk7XG4gICAgfVxuICB9O1xuXG4gIF9zZWxlY3RJdGVtID0gaXRlbSA9PiB7XG4gICAgY29uc3QgZ2V0VmFsdWUgPSBBY2Nlc3Nvci5nZW5lcmF0ZU9wdGlvblRvU3RyaW5nRm9yKFxuICAgICAgdGhpcy5wcm9wcy5nZXRPcHRpb25WYWx1ZSB8fCB0aGlzLnByb3BzLmRpc3BsYXlPcHRpb25cbiAgICApO1xuXG4gICAgY29uc3QgcHJldmlvdXNTZWxlY3RlZCA9IHRvQXJyYXkodGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zKTtcblxuICAgIGlmICh0aGlzLnByb3BzLm11bHRpU2VsZWN0KSB7XG4gICAgICBjb25zdCBpdGVtcyA9IHVuaXFCeShwcmV2aW91c1NlbGVjdGVkLmNvbmNhdCh0b0FycmF5KGl0ZW0pKSwgZ2V0VmFsdWUpO1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShpdGVtcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UoZ2V0VmFsdWUoaXRlbSkpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLmNsb3NlT25TZWxlY3QpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe3Nob3dUeXBlYWhlYWQ6IGZhbHNlfSk7XG4gICAgICB0aGlzLl9vbkJsdXIoKTtcbiAgICB9XG4gIH07XG5cbiAgX29uRXJhc2UgPSBlID0+IHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMucHJvcHMub25DaGFuZ2UobnVsbCk7XG4gIH07XG5cbiAgX3Nob3dUeXBlYWhlYWQgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgc2hvd1R5cGVhaGVhZDogdHJ1ZVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIF9yZW5kZXJEcm9wZG93bihpbnRsKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxEcm9wZG93bldyYXBwZXIgcGxhY2VtZW50PXt0aGlzLnByb3BzLnBsYWNlbWVudH0+XG4gICAgICAgIDxUeXBlYWhlYWRcbiAgICAgICAgICBjdXN0b21DbGFzc2VzPXt7XG4gICAgICAgICAgICByZXN1bHRzOiAnbGlzdC1zZWxlY3RvcicsXG4gICAgICAgICAgICBpbnB1dDogJ3R5cGVhaGVhZF9faW5wdXQnLFxuICAgICAgICAgICAgbGlzdEl0ZW06ICdsaXN0X19pdGVtJyxcbiAgICAgICAgICAgIGxpc3RBbmNob3I6ICdsaXN0X19pdGVtX19hbmNob3InXG4gICAgICAgICAgfX1cbiAgICAgICAgICBvcHRpb25zPXt0aGlzLnByb3BzLm9wdGlvbnN9XG4gICAgICAgICAgZmlsdGVyT3B0aW9uPXt0aGlzLnByb3BzLmZpbHRlck9wdGlvbn1cbiAgICAgICAgICBmaXhlZE9wdGlvbnM9e3RoaXMucHJvcHMuZml4ZWRPcHRpb25zfVxuICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbnRsLmZvcm1hdE1lc3NhZ2Uoe2lkOiAncGxhY2Vob2xkZXIuc2VhcmNoJ30pfVxuICAgICAgICAgIG9uT3B0aW9uU2VsZWN0ZWQ9e3RoaXMuX3NlbGVjdEl0ZW19XG4gICAgICAgICAgY3VzdG9tTGlzdENvbXBvbmVudD17dGhpcy5wcm9wcy5Ecm9wRG93blJlbmRlckNvbXBvbmVudH1cbiAgICAgICAgICBjdXN0b21MaXN0SGVhZGVyQ29tcG9uZW50PXt0aGlzLnByb3BzLkRyb3Bkb3duSGVhZGVyQ29tcG9uZW50fVxuICAgICAgICAgIGN1c3RvbUxpc3RJdGVtQ29tcG9uZW50PXt0aGlzLnByb3BzLkRyb3BEb3duTGluZUl0ZW1SZW5kZXJDb21wb25lbnR9XG4gICAgICAgICAgZGlzcGxheU9wdGlvbj17QWNjZXNzb3IuZ2VuZXJhdGVPcHRpb25Ub1N0cmluZ0Zvcih0aGlzLnByb3BzLmRpc3BsYXlPcHRpb24pfVxuICAgICAgICAgIHNlYXJjaGFibGU9e3RoaXMucHJvcHMuc2VhcmNoYWJsZX1cbiAgICAgICAgICBzaG93T3B0aW9uc1doZW5FbXB0eVxuICAgICAgICAgIHNlbGVjdGVkSXRlbXM9e3RvQXJyYXkodGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zKX1cbiAgICAgICAgLz5cbiAgICAgIDwvRHJvcGRvd25XcmFwcGVyPlxuICAgICk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qgc2VsZWN0ZWQgPSB0b0FycmF5KHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcyk7XG4gICAgY29uc3QgaGFzVmFsdWUgPSBzZWxlY3RlZC5sZW5ndGg7XG4gICAgY29uc3QgZGlzcGxheU9wdGlvbiA9IEFjY2Vzc29yLmdlbmVyYXRlT3B0aW9uVG9TdHJpbmdGb3IodGhpcy5wcm9wcy5kaXNwbGF5T3B0aW9uKTtcblxuICAgIGNvbnN0IGRyb3Bkb3duU2VsZWN0UHJvcHMgPSB7XG4gICAgICBjbGFzc05hbWU6IGNsYXNzbmFtZXMoe1xuICAgICAgICBhY3RpdmU6IHRoaXMuc3RhdGUuc2hvd1R5cGVhaGVhZFxuICAgICAgfSksXG4gICAgICBkaXNhYmxlZDogdGhpcy5wcm9wcy5kaXNhYmxlZCxcbiAgICAgIG9uQ2xpY2s6IHRoaXMuX3Nob3dUeXBlYWhlYWQsXG4gICAgICBvbkZvY3VzOiB0aGlzLl9zaG93UG9wb3ZlcixcbiAgICAgIGVycm9yOiB0aGlzLnByb3BzLmlzRXJyb3IsXG4gICAgICBpbnB1dFRoZW1lOiB0aGlzLnByb3BzLmlucHV0VGhlbWVcbiAgICB9O1xuICAgIGNvbnN0IGludGwgPSB0aGlzLnByb3BzLmludGw7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJpdGVtLXNlbGVjdG9yXCI+XG4gICAgICAgIDxkaXYgc3R5bGU9e3twb3NpdGlvbjogJ3JlbGF0aXZlJ319PlxuICAgICAgICAgIHsvKiB0aGlzIHBhcnQgaXMgdXNlZCB0byBkaXNwbGF5IHRoZSBsYWJlbCAqL31cbiAgICAgICAgICB7dGhpcy5wcm9wcy5tdWx0aVNlbGVjdCA/IChcbiAgICAgICAgICAgIDxDaGlja2xldGVkSW5wdXRcbiAgICAgICAgICAgICAgey4uLmRyb3Bkb3duU2VsZWN0UHJvcHN9XG4gICAgICAgICAgICAgIHNlbGVjdGVkSXRlbXM9e3RvQXJyYXkodGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zKX1cbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3RoaXMucHJvcHMucGxhY2Vob2xkZXJ9XG4gICAgICAgICAgICAgIGRpc3BsYXlPcHRpb249e2Rpc3BsYXlPcHRpb259XG4gICAgICAgICAgICAgIHJlbW92ZUl0ZW09e3RoaXMuX3JlbW92ZUl0ZW19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8U3R5bGVkRHJvcGRvd25TZWxlY3Qgey4uLmRyb3Bkb3duU2VsZWN0UHJvcHN9PlxuICAgICAgICAgICAgICA8RHJvcGRvd25TZWxlY3RWYWx1ZVxuICAgICAgICAgICAgICAgIGhhc1BsYWNlaG9sZGVyPXshaGFzVmFsdWV9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaXRlbS1zZWxlY3Rvcl9fZHJvcGRvd25fX3ZhbHVlXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtoYXNWYWx1ZSA/IChcbiAgICAgICAgICAgICAgICAgIDx0aGlzLnByb3BzLkRyb3BEb3duTGluZUl0ZW1SZW5kZXJDb21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheU9wdGlvbj17ZGlzcGxheU9wdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3NlbGVjdGVkWzBdfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9e3RoaXMucHJvcHMucGxhY2Vob2xkZXJ9IC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9Ecm9wZG93blNlbGVjdFZhbHVlPlxuICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5lcmFzYWJsZSAmJiBoYXNWYWx1ZSA/IChcbiAgICAgICAgICAgICAgICA8RHJvcGRvd25TZWxlY3RFcmFzZT5cbiAgICAgICAgICAgICAgICAgIDxEZWxldGUgaGVpZ2h0PVwiMTJweFwiIG9uQ2xpY2s9e3RoaXMuX29uRXJhc2V9IC8+XG4gICAgICAgICAgICAgICAgPC9Ecm9wZG93blNlbGVjdEVyYXNlPlxuICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgIDwvU3R5bGVkRHJvcGRvd25TZWxlY3Q+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7LyogdGhpcyBwYXJ0IGlzIHVzZWQgdG8gYnVpbHQgdGhlIGxpc3QgKi99XG4gICAgICAgICAge3RoaXMuc3RhdGUuc2hvd1R5cGVhaGVhZCAmJiB0aGlzLl9yZW5kZXJEcm9wZG93bihpbnRsKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGluamVjdEludGwobGlzdGVuc1RvQ2xpY2tPdXRzaWRlKEl0ZW1TZWxlY3RvcikpO1xuIl19