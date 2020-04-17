"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _fuzzy = _interopRequireDefault(require("fuzzy"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _window = require("global/window");

var _accessor = _interopRequireDefault(require("./accessor"));

var _keyevent = _interopRequireDefault(require("./keyevent"));

var _dropdownList = _interopRequireWildcard(require("./dropdown-list"));

var _icons = require("../icons");

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  position: absolute;\n  right: 15px;\n  top: 14px;\n  color: ", ";\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ", " :hover {\n    cursor: pointer;\n    background-color: ", ";\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  padding: 8px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  flex-direction: column;\n  background-color: ", ";\n  box-shadow: ", ";\n\n  :focus {\n    outline: 0;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var DEFAULT_CLASS = 'typeahead';
/**
 * Copied mostly from 'react-typeahead', an auto-completing text input
 *
 * Renders an text input that shows options nearby that you can use the
 * keyboard or mouse to select.
 */

var TypeaheadWrapper = _styledComponents["default"].div(_templateObject(), function (props) {
  return props.theme.dropdownListBgd;
}, function (props) {
  return props.theme.dropdownListShadow;
});

var InputBox = _styledComponents["default"].div(_templateObject2());

var TypeaheadInput = _styledComponents["default"].input(_templateObject3(), function (props) {
  return props.theme.secondaryInput;
}, function (props) {
  return props.theme.secondaryInputBgd;
});

var InputIcon = _styledComponents["default"].div(_templateObject4(), function (props) {
  return props.theme.inputPlaceholderColor;
});

function generateSearchFunction(props) {
  var searchOptions = props.searchOptions,
      filterOption = props.filterOption;

  if (typeof searchOptions === 'function') {
    if (filterOption !== null) {
      _window.console.warn('searchOptions prop is being used, filterOption prop will be ignored');
    }

    return searchOptions;
  } else if (typeof filterOption === 'function') {
    // use custom filter option
    return function (value, options) {
      return options.filter(function (o) {
        return filterOption(value, o);
      });
    };
  }

  var mapper = typeof filterOption === 'string' ? _accessor["default"].generateAccessor(filterOption) : _accessor["default"].IDENTITY_FN;
  return function (value, options) {
    return _fuzzy["default"].filter(value, options, {
      extract: mapper
    }).map(function (res) {
      return options[res.index];
    });
  };
}

function getOptionsForValue(value, props, state) {
  var options = props.options,
      showOptionsWhenEmpty = props.showOptionsWhenEmpty;

  if (!props.searchable) {
    // directly pass through options if can not be searched
    return options;
  }

  if (shouldSkipSearch(value, state, showOptionsWhenEmpty)) {
    return options;
  }

  var searchOptions = generateSearchFunction(props);
  return searchOptions(value, options);
}

function shouldSkipSearch(input, state, showOptionsWhenEmpty) {
  var emptyValue = !input || input.trim().length === 0; // this.state must be checked because it may not be defined yet if this function
  // is called from within getInitialState

  var isFocused = state && state.isFocused;
  return !(showOptionsWhenEmpty && isFocused) && emptyValue;
}

var Typeahead =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(Typeahead, _Component);
  (0, _createClass2["default"])(Typeahead, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      //  invoked after a component is instantiated as well as before it is re-rendered
      var searchResults = getOptionsForValue(state.entryValue, props, state);
      return {
        searchResults: searchResults
      };
    }
  }]);

  function Typeahead(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Typeahead);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Typeahead).call(this, props));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "root", (0, _react.createRef)());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "entry", (0, _react.createRef)());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "focus", function () {
      if (_this.entry.current) {
        _this.entry.current.focus();
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_hasCustomValue", function () {
      return _this.props.allowCustomValues > 0 && _this.state.entryValue.length >= _this.props.allowCustomValues && _this.state.searchResults.indexOf(_this.state.entryValue) < 0;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_getCustomValue", function () {
      return _this._hasCustomValue() ? _this.state.entryValue : null;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onOptionSelected", function (option, event) {
      if (_this.props.searchable) {
        // reset entry input
        _this.setState({
          searchResults: getOptionsForValue('', _this.props, _this.state),
          selection: '',
          entryValue: ''
        });
      }

      return _this.props.onOptionSelected(option, event);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onTextEntryUpdated", function () {
      if (_this.props.searchable) {
        var value = _this.entry.current.value;

        _this.setState({
          searchResults: getOptionsForValue(value, _this.props, _this.state),
          selection: '',
          entryValue: value
        });
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onEnter", function (event) {
      var selection = _this.getSelection();

      if (!selection) {
        return _this.props.onKeyDown(event);
      }

      return _this._onOptionSelected(selection, event);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onEscape", function () {
      _this.setState({
        selectionIndex: null
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onTab", function (event) {
      var selection = _this.getSelection();

      var option = selection ? selection : _this.state.searchResults.length > 0 ? _this.state.searchResults[0] : null;

      if (option === null && _this._hasCustomValue()) {
        option = _this._getCustomValue();
      }

      if (option !== null) {
        return _this._onOptionSelected(option, event);
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "eventMap", function (event) {
      var events = {};
      events[_keyevent["default"].DOM_VK_UP] = _this.navUp;
      events[_keyevent["default"].DOM_VK_DOWN] = _this.navDown;
      events[_keyevent["default"].DOM_VK_RETURN] = events[_keyevent["default"].DOM_VK_ENTER] = _this._onEnter;
      events[_keyevent["default"].DOM_VK_ESCAPE] = _this._onEscape;
      events[_keyevent["default"].DOM_VK_TAB] = _this._onTab;
      return events;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_nav", function (delta) {
      if (!_this._hasHint()) {
        return;
      }

      var newIndex = _this.state.selectionIndex === null ? delta === 1 ? 0 : delta : _this.state.selectionIndex + delta;
      var length = _this.props.maxVisible ? _this.state.searchResults.slice(0, _this.props.maxVisible).length : _this.state.searchResults.length;

      if (_this._hasCustomValue()) {
        length += 1;
      }

      if (newIndex < 0) {
        newIndex += length;
      } else if (newIndex >= length) {
        newIndex -= length;
      }

      _this.setState({
        selectionIndex: newIndex
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "navDown", function () {
      _this._nav(1);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "navUp", function () {
      _this._nav(-1);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onChange", function (event) {
      if (_this.props.onChange) {
        _this.props.onChange(event);
      }

      _this._onTextEntryUpdated();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onKeyDown", function (event) {
      // If there are no visible elements, don't perform selector navigation.
      // Just pass this up to the upstream onKeydown handler.
      // Also skip if the user is pressing the shift key, since none of our handlers are looking for shift
      if (!_this._hasHint() || event.shiftKey) {
        return _this.props.onKeyDown(event);
      }

      var handler = _this.eventMap()[event.keyCode];

      if (handler) {
        handler(event);
      } else {
        return _this.props.onKeyDown(event);
      } // Don't propagate the keystroke back to the DOM/browser


      event.preventDefault();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onFocus", function (event) {
      _this.setState({
        isFocused: true
      });

      if (_this.props.onFocus) {
        return _this.props.onFocus(event);
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onBlur", function (event) {
      _this.setState({
        isFocused: false
      });

      if (_this.props.onBlur) {
        return _this.props.onBlur(event);
      }
    });
    _this.state = {
      searchResults: [],
      // This should be called something else, 'entryValue'
      entryValue: _this.props.value || _this.props.initialValue,
      // A valid typeahead value
      selection: _this.props.value,
      // Index of the selection
      selectionIndex: null,
      // Keep track of the focus state of the input element, to determine
      // whether to show options when empty (if showOptionsWhenEmpty is true)
      isFocused: false
    };
    return _this;
  }

  (0, _createClass2["default"])(Typeahead, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // call focus on entry or div to trigger key events listener
      if (this.entry.current) {
        this.entry.current.focus();
      } else {
        this.root.current.focus();
      }
    }
  }, {
    key: "_renderIncrementalSearchResults",
    value: function _renderIncrementalSearchResults() {
      return _react["default"].createElement(this.props.customListComponent, {
        fixedOptions: this.props.fixedOptions,
        options: this.props.maxVisible ? this.state.searchResults.slice(0, this.props.maxVisible) : this.state.searchResults,
        areResultsTruncated: this.props.maxVisible && this.state.searchResults.length > this.props.maxVisible,
        resultsTruncatedMessage: this.props.resultsTruncatedMessage,
        onOptionSelected: this._onOptionSelected,
        allowCustomValues: this.props.allowCustomValues,
        customValue: this._getCustomValue(),
        customClasses: this.props.customClasses,
        customListItemComponent: this.props.customListItemComponent,
        customListHeaderComponent: this.props.customListHeaderComponent,
        selectionIndex: this.state.selectionIndex,
        defaultClassNames: this.props.defaultClassNames,
        displayOption: this.props.displayOption,
        selectedItems: this.props.selectedItems
      });
    }
  }, {
    key: "getSelection",
    value: function getSelection() {
      var index = this.state.selectionIndex;

      if (this._hasCustomValue()) {
        if (index === 0) {
          return this.state.entryValue;
        }

        index--;
      }

      if (this._hasFixedOptions()) {
        return index < this.props.fixedOptions.length ? this.props.fixedOptions[index] : this.state.searchResults[index - this.props.fixedOptions.length];
      }

      return this.state.searchResults[index];
    }
  }, {
    key: "_renderHiddenInput",
    value: function _renderHiddenInput() {
      if (!this.props.name) {
        return null;
      }

      return _react["default"].createElement("input", {
        type: "hidden",
        name: this.props.name,
        value: this.state.selection
      });
    }
  }, {
    key: "_hasHint",
    value: function _hasHint() {
      return this.state.searchResults.length > 0 || this._hasCustomValue();
    }
  }, {
    key: "_hasFixedOptions",
    value: function _hasFixedOptions() {
      return Array.isArray(this.props.fixedOptions) && this.props.fixedOptions.length;
    }
  }, {
    key: "render",
    value: function render() {
      var inputClasses = {};
      inputClasses[this.props.customClasses.input] = Boolean(this.props.customClasses.input);
      var inputClassList = (0, _classnames["default"])(inputClasses);
      var classes = (0, _defineProperty2["default"])({}, DEFAULT_CLASS, this.props.defaultClassNames);
      classes[this.props.className] = Boolean(this.props.className);
      var classList = (0, _classnames["default"])(classes);
      return _react["default"].createElement(TypeaheadWrapper, {
        className: classList,
        ref: this.root,
        tabIndex: "0",
        onKeyDown: this._onKeyDown,
        onKeyPress: this.props.onKeyPress,
        onKeyUp: this.props.onKeyUp,
        onFocus: this._onFocus
      }, this._renderHiddenInput(), this.props.searchable ? _react["default"].createElement(InputBox, null, _react["default"].createElement(TypeaheadInput, (0, _extends2["default"])({
        ref: this.entry,
        type: "text",
        disabled: this.props.disabled
      }, this.props.inputProps, {
        placeholder: this.props.placeholder,
        className: inputClassList,
        value: this.state.entryValue,
        onChange: this._onChange,
        onBlur: this._onBlur
      })), _react["default"].createElement(InputIcon, null, _react["default"].createElement(_icons.Search, {
        height: "18px"
      }))) : null, this._renderIncrementalSearchResults());
    }
  }]);
  return Typeahead;
}(_react.Component);

(0, _defineProperty2["default"])(Typeahead, "propTypes", {
  name: _propTypes["default"].string,
  customClasses: _propTypes["default"].object,
  maxVisible: _propTypes["default"].number,
  resultsTruncatedMessage: _propTypes["default"].string,
  options: _propTypes["default"].arrayOf(_propTypes["default"].any),
  fixedOptions: _propTypes["default"].arrayOf(_propTypes["default"].any),
  allowCustomValues: _propTypes["default"].number,
  initialValue: _propTypes["default"].string,
  value: _propTypes["default"].string,
  placeholder: _propTypes["default"].string,
  disabled: _propTypes["default"].bool,
  textarea: _propTypes["default"].bool,
  inputProps: _propTypes["default"].object,
  onOptionSelected: _propTypes["default"].func,
  onChange: _propTypes["default"].func,
  onKeyDown: _propTypes["default"].func,
  onKeyPress: _propTypes["default"].func,
  onKeyUp: _propTypes["default"].func,
  onFocus: _propTypes["default"].func,
  onBlur: _propTypes["default"].func,
  filterOption: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
  searchOptions: _propTypes["default"].func,
  displayOption: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
  inputDisplayOption: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
  formInputOption: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
  defaultClassNames: _propTypes["default"].bool,
  customListComponent: _propTypes["default"].oneOfType([_propTypes["default"].element, _propTypes["default"].func]),
  customListItemComponent: _propTypes["default"].oneOfType([_propTypes["default"].element, _propTypes["default"].func]),
  customListHeaderComponent: _propTypes["default"].oneOfType([_propTypes["default"].element, _propTypes["default"].func]),
  showOptionsWhenEmpty: _propTypes["default"].bool,
  searchable: _propTypes["default"].bool
});
(0, _defineProperty2["default"])(Typeahead, "defaultProps", {
  options: [],
  customClasses: {},
  allowCustomValues: 0,
  initialValue: '',
  value: '',
  placeholder: '',
  disabled: false,
  textarea: false,
  inputProps: {},
  onOptionSelected: function onOptionSelected(option) {},
  onChange: function onChange(event) {},
  onKeyDown: function onKeyDown(event) {},
  onKeyPress: function onKeyPress(event) {},
  onKeyUp: function onKeyUp(event) {},
  onFocus: function onFocus(event) {},
  onBlur: function onBlur(event) {},
  filterOption: null,
  searchOptions: null,
  inputDisplayOption: null,
  defaultClassNames: true,
  customListComponent: _dropdownList["default"],
  customListItemComponent: _dropdownList.ListItem,
  customListHeaderComponent: null,
  showOptionsWhenEmpty: true,
  searchable: true,
  resultsTruncatedMessage: null
});
(0, _reactLifecyclesCompat.polyfill)(Typeahead);
var _default = Typeahead;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9pdGVtLXNlbGVjdG9yL3R5cGVhaGVhZC5qcyJdLCJuYW1lcyI6WyJERUZBVUxUX0NMQVNTIiwiVHlwZWFoZWFkV3JhcHBlciIsInN0eWxlZCIsImRpdiIsInByb3BzIiwidGhlbWUiLCJkcm9wZG93bkxpc3RCZ2QiLCJkcm9wZG93bkxpc3RTaGFkb3ciLCJJbnB1dEJveCIsIlR5cGVhaGVhZElucHV0IiwiaW5wdXQiLCJzZWNvbmRhcnlJbnB1dCIsInNlY29uZGFyeUlucHV0QmdkIiwiSW5wdXRJY29uIiwiaW5wdXRQbGFjZWhvbGRlckNvbG9yIiwiZ2VuZXJhdGVTZWFyY2hGdW5jdGlvbiIsInNlYXJjaE9wdGlvbnMiLCJmaWx0ZXJPcHRpb24iLCJDb25zb2xlIiwid2FybiIsInZhbHVlIiwib3B0aW9ucyIsImZpbHRlciIsIm8iLCJtYXBwZXIiLCJBY2Nlc3NvciIsImdlbmVyYXRlQWNjZXNzb3IiLCJJREVOVElUWV9GTiIsImZ1enp5IiwiZXh0cmFjdCIsIm1hcCIsInJlcyIsImluZGV4IiwiZ2V0T3B0aW9uc0ZvclZhbHVlIiwic3RhdGUiLCJzaG93T3B0aW9uc1doZW5FbXB0eSIsInNlYXJjaGFibGUiLCJzaG91bGRTa2lwU2VhcmNoIiwiZW1wdHlWYWx1ZSIsInRyaW0iLCJsZW5ndGgiLCJpc0ZvY3VzZWQiLCJUeXBlYWhlYWQiLCJzZWFyY2hSZXN1bHRzIiwiZW50cnlWYWx1ZSIsImVudHJ5IiwiY3VycmVudCIsImZvY3VzIiwiYWxsb3dDdXN0b21WYWx1ZXMiLCJpbmRleE9mIiwiX2hhc0N1c3RvbVZhbHVlIiwib3B0aW9uIiwiZXZlbnQiLCJzZXRTdGF0ZSIsInNlbGVjdGlvbiIsIm9uT3B0aW9uU2VsZWN0ZWQiLCJnZXRTZWxlY3Rpb24iLCJvbktleURvd24iLCJfb25PcHRpb25TZWxlY3RlZCIsInNlbGVjdGlvbkluZGV4IiwiX2dldEN1c3RvbVZhbHVlIiwiZXZlbnRzIiwiS2V5RXZlbnQiLCJET01fVktfVVAiLCJuYXZVcCIsIkRPTV9WS19ET1dOIiwibmF2RG93biIsIkRPTV9WS19SRVRVUk4iLCJET01fVktfRU5URVIiLCJfb25FbnRlciIsIkRPTV9WS19FU0NBUEUiLCJfb25Fc2NhcGUiLCJET01fVktfVEFCIiwiX29uVGFiIiwiZGVsdGEiLCJfaGFzSGludCIsIm5ld0luZGV4IiwibWF4VmlzaWJsZSIsInNsaWNlIiwiX25hdiIsIm9uQ2hhbmdlIiwiX29uVGV4dEVudHJ5VXBkYXRlZCIsInNoaWZ0S2V5IiwiaGFuZGxlciIsImV2ZW50TWFwIiwia2V5Q29kZSIsInByZXZlbnREZWZhdWx0Iiwib25Gb2N1cyIsIm9uQmx1ciIsImluaXRpYWxWYWx1ZSIsInJvb3QiLCJmaXhlZE9wdGlvbnMiLCJyZXN1bHRzVHJ1bmNhdGVkTWVzc2FnZSIsImN1c3RvbUNsYXNzZXMiLCJjdXN0b21MaXN0SXRlbUNvbXBvbmVudCIsImN1c3RvbUxpc3RIZWFkZXJDb21wb25lbnQiLCJkZWZhdWx0Q2xhc3NOYW1lcyIsImRpc3BsYXlPcHRpb24iLCJzZWxlY3RlZEl0ZW1zIiwiX2hhc0ZpeGVkT3B0aW9ucyIsIm5hbWUiLCJBcnJheSIsImlzQXJyYXkiLCJpbnB1dENsYXNzZXMiLCJCb29sZWFuIiwiaW5wdXRDbGFzc0xpc3QiLCJjbGFzc2VzIiwiY2xhc3NOYW1lIiwiY2xhc3NMaXN0IiwiX29uS2V5RG93biIsIm9uS2V5UHJlc3MiLCJvbktleVVwIiwiX29uRm9jdXMiLCJfcmVuZGVySGlkZGVuSW5wdXQiLCJkaXNhYmxlZCIsImlucHV0UHJvcHMiLCJwbGFjZWhvbGRlciIsIl9vbkNoYW5nZSIsIl9vbkJsdXIiLCJfcmVuZGVySW5jcmVtZW50YWxTZWFyY2hSZXN1bHRzIiwiQ29tcG9uZW50IiwiUHJvcFR5cGVzIiwic3RyaW5nIiwib2JqZWN0IiwibnVtYmVyIiwiYXJyYXlPZiIsImFueSIsImJvb2wiLCJ0ZXh0YXJlYSIsImZ1bmMiLCJvbmVPZlR5cGUiLCJpbnB1dERpc3BsYXlPcHRpb24iLCJmb3JtSW5wdXRPcHRpb24iLCJjdXN0b21MaXN0Q29tcG9uZW50IiwiZWxlbWVudCIsIkRyb3Bkb3duTGlzdCIsIkxpc3RJdGVtIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsYUFBYSxHQUFHLFdBQXRCO0FBQ0E7Ozs7Ozs7QUFPQSxJQUFNQyxnQkFBZ0IsR0FBR0MsNkJBQU9DLEdBQVYsb0JBR0EsVUFBQUMsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZQyxlQUFoQjtBQUFBLENBSEwsRUFJTixVQUFBRixLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlFLGtCQUFoQjtBQUFBLENBSkMsQ0FBdEI7O0FBV0EsSUFBTUMsUUFBUSxHQUFHTiw2QkFBT0MsR0FBVixvQkFBZDs7QUFJQSxJQUFNTSxjQUFjLEdBQUdQLDZCQUFPUSxLQUFWLHFCQUNoQixVQUFBTixLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlNLGNBQWhCO0FBQUEsQ0FEVyxFQUdJLFVBQUFQLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWU8saUJBQWhCO0FBQUEsQ0FIVCxDQUFwQjs7QUFPQSxJQUFNQyxTQUFTLEdBQUdYLDZCQUFPQyxHQUFWLHFCQUlKLFVBQUFDLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWVMscUJBQWhCO0FBQUEsQ0FKRCxDQUFmOztBQU9BLFNBQVNDLHNCQUFULENBQWdDWCxLQUFoQyxFQUF1QztBQUFBLE1BQzlCWSxhQUQ4QixHQUNDWixLQURELENBQzlCWSxhQUQ4QjtBQUFBLE1BQ2ZDLFlBRGUsR0FDQ2IsS0FERCxDQUNmYSxZQURlOztBQUVyQyxNQUFJLE9BQU9ELGFB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LEVBQUFBLFdBQVcsRUFBRSxFQU5PO0FBT3BCRixFQUFBQSxRQUFRLEVBQUUsS0FQVTtBQVFwQmMsRUFBQUEsUUFBUSxFQUFFLEtBUlU7QUFTcEJiLEVBQUFBLFVBQVUsRUFBRSxFQVRRO0FBVXBCNUQsRUFBQUEsZ0JBVm9CLDRCQVVISixNQVZHLEVBVUssQ0FBRSxDQVZQO0FBV3BCNkIsRUFBQUEsUUFYb0Isb0JBV1g1QixLQVhXLEVBV0osQ0FBRSxDQVhFO0FBWXBCSyxFQUFBQSxTQVpvQixxQkFZVkwsS0FaVSxFQVlILENBQUUsQ0FaQztBQWFwQjBELEVBQUFBLFVBYm9CLHNCQWFUMUQsS0FiUyxFQWFGLENBQUUsQ0FiQTtBQWNwQjJELEVBQUFBLE9BZG9CLG1CQWNaM0QsS0FkWSxFQWNMLENBQUUsQ0FkRztBQWVwQm1DLEVBQUFBLE9BZm9CLG1CQWVabkMsS0FmWSxFQWVMLENBQUUsQ0FmRztBQWdCcEJvQyxFQUFBQSxNQWhCb0Isa0JBZ0JicEMsS0FoQmEsRUFnQk4sQ0FBRSxDQWhCSTtBQWlCcEJuQyxFQUFBQSxZQUFZLEVBQUUsSUFqQk07QUFrQnBCRCxFQUFBQSxhQUFhLEVBQUUsSUFsQks7QUFtQnBCbUgsRUFBQUEsa0JBQWtCLEVBQUUsSUFuQkE7QUFvQnBCbkMsRUFBQUEsaUJBQWlCLEVBQUUsSUFwQkM7QUFxQnBCcUMsRUFBQUEsbUJBQW1CLEVBQUVFLHdCQXJCRDtBQXNCcEJ6QyxFQUFBQSx1QkFBdUIsRUFBRTBDLHNCQXRCTDtBQXVCcEJ6QyxFQUFBQSx5QkFBeUIsRUFBRSxJQXZCUDtBQXdCcEI1RCxFQUFBQSxvQkFBb0IsRUFBRSxJQXhCRjtBQXlCcEJDLEVBQUFBLFVBQVUsRUFBRSxJQXpCUTtBQTBCcEJ3RCxFQUFBQSx1QkFBdUIsRUFBRTtBQTFCTCxDO0FBaVZ4QixxQ0FBU2xELFNBQVQ7ZUFFZUEsUyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgY3JlYXRlUmVmfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge3BvbHlmaWxsfSBmcm9tICdyZWFjdC1saWZlY3ljbGVzLWNvbXBhdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGZ1enp5IGZyb20gJ2Z1enp5JztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQge2NvbnNvbGUgYXMgQ29uc29sZX0gZnJvbSAnZ2xvYmFsL3dpbmRvdyc7XG5cbmltcG9ydCBBY2Nlc3NvciBmcm9tICcuL2FjY2Vzc29yJztcbmltcG9ydCBLZXlFdmVudCBmcm9tICcuL2tleWV2ZW50JztcbmltcG9ydCBEcm9wZG93bkxpc3QsIHtMaXN0SXRlbX0gZnJvbSAnLi9kcm9wZG93bi1saXN0JztcbmltcG9ydCB7U2VhcmNofSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9pY29ucyc7XG5cbmNvbnN0IERFRkFVTFRfQ0xBU1MgPSAndHlwZWFoZWFkJztcbi8qKlxuICogQ29waWVkIG1vc3RseSBmcm9tICdyZWFjdC10eXBlYWhlYWQnLCBhbiBhdXRvLWNvbXBsZXRpbmcgdGV4dCBpbnB1dFxuICpcbiAqIFJlbmRlcnMgYW4gdGV4dCBpbnB1dCB0aGF0IHNob3dzIG9wdGlvbnMgbmVhcmJ5IHRoYXQgeW91IGNhbiB1c2UgdGhlXG4gKiBrZXlib2FyZCBvciBtb3VzZSB0byBzZWxlY3QuXG4gKi9cblxuY29uc3QgVHlwZWFoZWFkV3JhcHBlciA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZHJvcGRvd25MaXN0QmdkfTtcbiAgYm94LXNoYWRvdzogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5kcm9wZG93bkxpc3RTaGFkb3d9O1xuXG4gIDpmb2N1cyB7XG4gICAgb3V0bGluZTogMDtcbiAgfVxuYDtcblxuY29uc3QgSW5wdXRCb3ggPSBzdHlsZWQuZGl2YFxuICBwYWRkaW5nOiA4cHg7XG5gO1xuXG5jb25zdCBUeXBlYWhlYWRJbnB1dCA9IHN0eWxlZC5pbnB1dGBcbiAgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zZWNvbmRhcnlJbnB1dH0gOmhvdmVyIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zZWNvbmRhcnlJbnB1dEJnZH07XG4gIH1cbmA7XG5cbmNvbnN0IElucHV0SWNvbiA9IHN0eWxlZC5kaXZgXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IDE1cHg7XG4gIHRvcDogMTRweDtcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuaW5wdXRQbGFjZWhvbGRlckNvbG9yfTtcbmA7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlU2VhcmNoRnVuY3Rpb24ocHJvcHMpIHtcbiAgY29uc3Qge3NlYXJjaE9wdGlvbnMsIGZpbHRlck9wdGlvbn0gPSBwcm9wcztcbiAgaWYgKHR5cGVvZiBzZWFyY2hPcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgaWYgKGZpbHRlck9wdGlvbiAhPT0gbnVsbCkge1xuICAgICAgQ29uc29sZS53YXJuKCdzZWFyY2hPcHRpb25zIHByb3AgaXMgYmVpbmcgdXNlZCwgZmlsdGVyT3B0aW9uIHByb3Agd2lsbCBiZSBpZ25vcmVkJyk7XG4gICAgfVxuICAgIHJldHVybiBzZWFyY2hPcHRpb25zO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBmaWx0ZXJPcHRpb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyB1c2UgY3VzdG9tIGZpbHRlciBvcHRpb25cbiAgICByZXR1cm4gKHZhbHVlLCBvcHRpb25zKSA9PiBvcHRpb25zLmZpbHRlcihvID0+IGZpbHRlck9wdGlvbih2YWx1ZSwgbykpO1xuICB9XG5cbiAgY29uc3QgbWFwcGVyID1cbiAgICB0eXBlb2YgZmlsdGVyT3B0aW9uID09PSAnc3RyaW5nJ1xuICAgICAgPyBBY2Nlc3Nvci5nZW5lcmF0ZUFjY2Vzc29yKGZpbHRlck9wdGlvbilcbiAgICAgIDogQWNjZXNzb3IuSURFTlRJVFlfRk47XG5cbiAgcmV0dXJuICh2YWx1ZSwgb3B0aW9ucykgPT5cbiAgICBmdXp6eS5maWx0ZXIodmFsdWUsIG9wdGlvbnMsIHtleHRyYWN0OiBtYXBwZXJ9KS5tYXAocmVzID0+IG9wdGlvbnNbcmVzLmluZGV4XSk7XG59XG5cbmZ1bmN0aW9uIGdldE9wdGlvbnNGb3JWYWx1ZSh2YWx1ZSwgcHJvcHMsIHN0YXRlKSB7XG4gIGNvbnN0IHtvcHRpb25zLCBzaG93T3B0aW9uc1doZW5FbXB0eX0gPSBwcm9wcztcblxuICBpZiAoIXByb3BzLnNlYXJjaGFibGUpIHtcbiAgICAvLyBkaXJlY3RseSBwYXNzIHRocm91Z2ggb3B0aW9ucyBpZiBjYW4gbm90IGJlIHNlYXJjaGVkXG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH1cbiAgaWYgKHNob3VsZFNraXBTZWFyY2godmFsdWUsIHN0YXRlLCBzaG93T3B0aW9uc1doZW5FbXB0eSkpIHtcbiAgICByZXR1cm4gb3B0aW9ucztcbiAgfVxuXG4gIGNvbnN0IHNlYXJjaE9wdGlvbnMgPSBnZW5lcmF0ZVNlYXJjaEZ1bmN0aW9uKHByb3BzKTtcbiAgcmV0dXJuIHNlYXJjaE9wdGlvbnModmFsdWUsIG9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiBzaG91bGRTa2lwU2VhcmNoKGlucHV0LCBzdGF0ZSwgc2hvd09wdGlvbnNXaGVuRW1wdHkpIHtcbiAgY29uc3QgZW1wdHlWYWx1ZSA9ICFpbnB1dCB8fCBpbnB1dC50cmltKCkubGVuZ3RoID09PSAwO1xuXG4gIC8vIHRoaXMuc3RhdGUgbXVzdCBiZSBjaGVja2VkIGJlY2F1c2UgaXQgbWF5IG5vdCBiZSBkZWZpbmVkIHlldCBpZiB0aGlzIGZ1bmN0aW9uXG4gIC8vIGlzIGNhbGxlZCBmcm9tIHdpdGhpbiBnZXRJbml0aWFsU3RhdGVcbiAgY29uc3QgaXNGb2N1c2VkID0gc3RhdGUgJiYgc3RhdGUuaXNGb2N1c2VkO1xuICByZXR1cm4gIShzaG93T3B0aW9uc1doZW5FbXB0eSAmJiBpc0ZvY3VzZWQpICYmIGVtcHR5VmFsdWU7XG59XG5cbmNsYXNzIFR5cGVhaGVhZCBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjdXN0b21DbGFzc2VzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIG1heFZpc2libGU6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgcmVzdWx0c1RydW5jYXRlZE1lc3NhZ2U6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgb3B0aW9uczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSksXG4gICAgZml4ZWRPcHRpb25zOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KSxcbiAgICBhbGxvd0N1c3RvbVZhbHVlczogUHJvcFR5cGVzLm51bWJlcixcbiAgICBpbml0aWFsVmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcGxhY2Vob2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHRleHRhcmVhOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBpbnB1dFByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIG9uT3B0aW9uU2VsZWN0ZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uS2V5UHJlc3M6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uS2V5VXA6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uRm9jdXM6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uQmx1cjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZmlsdGVyT3B0aW9uOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZnVuY10pLFxuICAgIHNlYXJjaE9wdGlvbnM6IFByb3BUeXBlcy5mdW5jLFxuICAgIGRpc3BsYXlPcHRpb246IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5mdW5jXSksXG4gICAgaW5wdXREaXNwbGF5T3B0aW9uOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZnVuY10pLFxuICAgIGZvcm1JbnB1dE9wdGlvbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmZ1bmNdKSxcbiAgICBkZWZhdWx0Q2xhc3NOYW1lczogUHJvcFR5cGVzLmJvb2wsXG4gICAgY3VzdG9tTGlzdENvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmVsZW1lbnQsIFByb3BUeXBlcy5mdW5jXSksXG4gICAgY3VzdG9tTGlzdEl0ZW1Db21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5lbGVtZW50LCBQcm9wVHlwZXMuZnVuY10pLFxuICAgIGN1c3RvbUxpc3RIZWFkZXJDb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5lbGVtZW50LCBQcm9wVHlwZXMuZnVuY10pLFxuICAgIHNob3dPcHRpb25zV2hlbkVtcHR5OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzZWFyY2hhYmxlOiBQcm9wVHlwZXMuYm9vbFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgb3B0aW9uczogW10sXG4gICAgY3VzdG9tQ2xhc3Nlczoge30sXG4gICAgYWxsb3dDdXN0b21WYWx1ZXM6IDAsXG4gICAgaW5pdGlhbFZhbHVlOiAnJyxcbiAgICB2YWx1ZTogJycsXG4gICAgcGxhY2Vob2xkZXI6ICcnLFxuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICB0ZXh0YXJlYTogZmFsc2UsXG4gICAgaW5wdXRQcm9wczoge30sXG4gICAgb25PcHRpb25TZWxlY3RlZChvcHRpb24pIHt9LFxuICAgIG9uQ2hhbmdlKGV2ZW50KSB7fSxcbiAgICBvbktleURvd24oZXZlbnQpIHt9LFxuICAgIG9uS2V5UHJlc3MoZXZlbnQpIHt9LFxuICAgIG9uS2V5VXAoZXZlbnQpIHt9LFxuICAgIG9uRm9jdXMoZXZlbnQpIHt9LFxuICAgIG9uQmx1cihldmVudCkge30sXG4gICAgZmlsdGVyT3B0aW9uOiBudWxsLFxuICAgIHNlYXJjaE9wdGlvbnM6IG51bGwsXG4gICAgaW5wdXREaXNwbGF5T3B0aW9uOiBudWxsLFxuICAgIGRlZmF1bHRDbGFzc05hbWVzOiB0cnVlLFxuICAgIGN1c3RvbUxpc3RDb21wb25lbnQ6IERyb3Bkb3duTGlzdCxcbiAgICBjdXN0b21MaXN0SXRlbUNvbXBvbmVudDogTGlzdEl0ZW0sXG4gICAgY3VzdG9tTGlzdEhlYWRlckNvbXBvbmVudDogbnVsbCxcbiAgICBzaG93T3B0aW9uc1doZW5FbXB0eTogdHJ1ZSxcbiAgICBzZWFyY2hhYmxlOiB0cnVlLFxuICAgIHJlc3VsdHNUcnVuY2F0ZWRNZXNzYWdlOiBudWxsXG4gIH07XG5cbiAgc3RhdGljIGdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyhwcm9wcywgc3RhdGUpIHtcbiAgICAvLyAgaW52b2tlZCBhZnRlciBhIGNvbXBvbmVudCBpcyBpbnN0YW50aWF0ZWQgYXMgd2VsbCBhcyBiZWZvcmUgaXQgaXMgcmUtcmVuZGVyZWRcbiAgICBjb25zdCBzZWFyY2hSZXN1bHRzID0gZ2V0T3B0aW9uc0ZvclZhbHVlKHN0YXRlLmVudHJ5VmFsdWUsIHByb3BzLCBzdGF0ZSk7XG5cbiAgICByZXR1cm4ge3NlYXJjaFJlc3VsdHN9O1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc2VhcmNoUmVzdWx0czogW10sXG5cbiAgICAgIC8vIFRoaXMgc2hvdWxkIGJlIGNhbGxlZCBzb21ldGhpbmcgZWxzZSwgJ2VudHJ5VmFsdWUnXG4gICAgICBlbnRyeVZhbHVlOiB0aGlzLnByb3BzLnZhbHVlIHx8IHRoaXMucHJvcHMuaW5pdGlhbFZhbHVlLFxuXG4gICAgICAvLyBBIHZhbGlkIHR5cGVhaGVhZCB2YWx1ZVxuICAgICAgc2VsZWN0aW9uOiB0aGlzLnByb3BzLnZhbHVlLFxuXG4gICAgICAvLyBJbmRleCBvZiB0aGUgc2VsZWN0aW9uXG4gICAgICBzZWxlY3Rpb25JbmRleDogbnVsbCxcblxuICAgICAgLy8gS2VlcCB0cmFjayBvZiB0aGUgZm9jdXMgc3RhdGUgb2YgdGhlIGlucHV0IGVsZW1lbnQsIHRvIGRldGVybWluZVxuICAgICAgLy8gd2hldGhlciB0byBzaG93IG9wdGlvbnMgd2hlbiBlbXB0eSAoaWYgc2hvd09wdGlvbnNXaGVuRW1wdHkgaXMgdHJ1ZSlcbiAgICAgIGlzRm9jdXNlZDogZmFsc2VcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgLy8gY2FsbCBmb2N1cyBvbiBlbnRyeSBvciBkaXYgdG8gdHJpZ2dlciBrZXkgZXZlbnRzIGxpc3RlbmVyXG4gICAgaWYgKHRoaXMuZW50cnkuY3VycmVudCkge1xuICAgICAgdGhpcy5lbnRyeS5jdXJyZW50LmZvY3VzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucm9vdC5jdXJyZW50LmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgcm9vdCA9IGNyZWF0ZVJlZigpO1xuICBlbnRyeSA9IGNyZWF0ZVJlZigpO1xuXG4gIGZvY3VzID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLmVudHJ5LmN1cnJlbnQpIHtcbiAgICAgIHRoaXMuZW50cnkuY3VycmVudC5mb2N1cygpO1xuICAgIH1cbiAgfTtcblxuICBfaGFzQ3VzdG9tVmFsdWUgPSAoKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMucHJvcHMuYWxsb3dDdXN0b21WYWx1ZXMgPiAwICYmXG4gICAgICB0aGlzLnN0YXRlLmVudHJ5VmFsdWUubGVuZ3RoID49IHRoaXMucHJvcHMuYWxsb3dDdXN0b21WYWx1ZXMgJiZcbiAgICAgIHRoaXMuc3RhdGUuc2VhcmNoUmVzdWx0cy5pbmRleE9mKHRoaXMuc3RhdGUuZW50cnlWYWx1ZSkgPCAwXG4gICAgKTtcbiAgfTtcblxuICBfZ2V0Q3VzdG9tVmFsdWUgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMuX2hhc0N1c3RvbVZhbHVlKCkgPyB0aGlzLnN0YXRlLmVudHJ5VmFsdWUgOiBudWxsO1xuICB9O1xuXG4gIF9yZW5kZXJJbmNyZW1lbnRhbFNlYXJjaFJlc3VsdHMoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDx0aGlzLnByb3BzLmN1c3RvbUxpc3RDb21wb25lbnRcbiAgICAgICAgZml4ZWRPcHRpb25zPXt0aGlzLnByb3BzLmZpeGVkT3B0aW9uc31cbiAgICAgICAgb3B0aW9ucz17XG4gICAgICAgICAgdGhpcy5wcm9wcy5tYXhWaXNpYmxlXG4gICAgICAgICAgICA/IHRoaXMuc3RhdGUuc2VhcmNoUmVzdWx0cy5zbGljZSgwLCB0aGlzLnByb3BzLm1heFZpc2libGUpXG4gICAgICAgICAgICA6IHRoaXMuc3RhdGUuc2VhcmNoUmVzdWx0c1xuICAgICAgICB9XG4gICAgICAgIGFyZVJlc3VsdHNUcnVuY2F0ZWQ9e1xuICAgICAgICAgIHRoaXMucHJvcHMubWF4VmlzaWJsZSAmJiB0aGlzLnN0YXRlLnNlYXJjaFJlc3VsdHMubGVuZ3RoID4gdGhpcy5wcm9wcy5tYXhWaXNpYmxlXG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0c1RydW5jYXRlZE1lc3NhZ2U9e3RoaXMucHJvcHMucmVzdWx0c1RydW5jYXRlZE1lc3NhZ2V9XG4gICAgICAgIG9uT3B0aW9uU2VsZWN0ZWQ9e3RoaXMuX29uT3B0aW9uU2VsZWN0ZWR9XG4gICAgICAgIGFsbG93Q3VzdG9tVmFsdWVzPXt0aGlzLnByb3BzLmFsbG93Q3VzdG9tVmFsdWVzfVxuICAgICAgICBjdXN0b21WYWx1ZT17dGhpcy5fZ2V0Q3VzdG9tVmFsdWUoKX1cbiAgICAgICAgY3VzdG9tQ2xhc3Nlcz17dGhpcy5wcm9wcy5jdXN0b21DbGFzc2VzfVxuICAgICAgICBjdXN0b21MaXN0SXRlbUNvbXBvbmVudD17dGhpcy5wcm9wcy5jdXN0b21MaXN0SXRlbUNvbXBvbmVudH1cbiAgICAgICAgY3VzdG9tTGlzdEhlYWRlckNvbXBvbmVudD17dGhpcy5wcm9wcy5jdXN0b21MaXN0SGVhZGVyQ29tcG9uZW50fVxuICAgICAgICBzZWxlY3Rpb25JbmRleD17dGhpcy5zdGF0ZS5zZWxlY3Rpb25JbmRleH1cbiAgICAgICAgZGVmYXVsdENsYXNzTmFtZXM9e3RoaXMucHJvcHMuZGVmYXVsdENsYXNzTmFtZXN9XG4gICAgICAgIGRpc3BsYXlPcHRpb249e3RoaXMucHJvcHMuZGlzcGxheU9wdGlvbn1cbiAgICAgICAgc2VsZWN0ZWRJdGVtcz17dGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zfVxuICAgICAgLz5cbiAgICApO1xuICB9XG5cbiAgZ2V0U2VsZWN0aW9uKCkge1xuICAgIGxldCBpbmRleCA9IHRoaXMuc3RhdGUuc2VsZWN0aW9uSW5kZXg7XG5cbiAgICBpZiAodGhpcy5faGFzQ3VzdG9tVmFsdWUoKSkge1xuICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmVudHJ5VmFsdWU7XG4gICAgICB9XG4gICAgICBpbmRleC0tO1xuICAgIH1cbiAgICBpZiAodGhpcy5faGFzRml4ZWRPcHRpb25zKCkpIHtcbiAgICAgIHJldHVybiBpbmRleCA8IHRoaXMucHJvcHMuZml4ZWRPcHRpb25zLmxlbmd0aFxuICAgICAgICA/IHRoaXMucHJvcHMuZml4ZWRPcHRpb25zW2luZGV4XVxuICAgICAgICA6IHRoaXMuc3RhdGUuc2VhcmNoUmVzdWx0c1tpbmRleCAtIHRoaXMucHJvcHMuZml4ZWRPcHRpb25zLmxlbmd0aF07XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnN0YXRlLnNlYXJjaFJlc3VsdHNbaW5kZXhdO1xuICB9XG5cbiAgX29uT3B0aW9uU2VsZWN0ZWQgPSAob3B0aW9uLCBldmVudCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnNlYXJjaGFibGUpIHtcbiAgICAgIC8vIHJlc2V0IGVudHJ5IGlucHV0XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgc2VhcmNoUmVzdWx0czogZ2V0T3B0aW9uc0ZvclZhbHVlKCcnLCB0aGlzLnByb3BzLCB0aGlzLnN0YXRlKSxcbiAgICAgICAgc2VsZWN0aW9uOiAnJyxcbiAgICAgICAgZW50cnlWYWx1ZTogJydcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnByb3BzLm9uT3B0aW9uU2VsZWN0ZWQob3B0aW9uLCBldmVudCk7XG4gIH07XG5cbiAgLy8gdXNlICgpID0+IHt9IHRvIGF2b2lkIGJpbmRpbmcgJ3RoaXMnXG4gIF9vblRleHRFbnRyeVVwZGF0ZWQgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2VhcmNoYWJsZSkge1xuICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmVudHJ5LmN1cnJlbnQudmFsdWU7XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBzZWFyY2hSZXN1bHRzOiBnZXRPcHRpb25zRm9yVmFsdWUodmFsdWUsIHRoaXMucHJvcHMsIHRoaXMuc3RhdGUpLFxuICAgICAgICBzZWxlY3Rpb246ICcnLFxuICAgICAgICBlbnRyeVZhbHVlOiB2YWx1ZVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIF9vbkVudGVyID0gZXZlbnQgPT4ge1xuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHRoaXMuZ2V0U2VsZWN0aW9uKCk7XG4gICAgaWYgKCFzZWxlY3Rpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9vbk9wdGlvblNlbGVjdGVkKHNlbGVjdGlvbiwgZXZlbnQpO1xuICB9O1xuXG4gIF9vbkVzY2FwZSA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlbGVjdGlvbkluZGV4OiBudWxsXG4gICAgfSk7XG4gIH07XG5cbiAgX29uVGFiID0gZXZlbnQgPT4ge1xuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHRoaXMuZ2V0U2VsZWN0aW9uKCk7XG4gICAgbGV0IG9wdGlvbiA9IHNlbGVjdGlvblxuICAgICAgPyBzZWxlY3Rpb25cbiAgICAgIDogdGhpcy5zdGF0ZS5zZWFyY2hSZXN1bHRzLmxlbmd0aCA+IDBcbiAgICAgID8gdGhpcy5zdGF0ZS5zZWFyY2hSZXN1bHRzWzBdXG4gICAgICA6IG51bGw7XG5cbiAgICBpZiAob3B0aW9uID09PSBudWxsICYmIHRoaXMuX2hhc0N1c3RvbVZhbHVlKCkpIHtcbiAgICAgIG9wdGlvbiA9IHRoaXMuX2dldEN1c3RvbVZhbHVlKCk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbiAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRoaXMuX29uT3B0aW9uU2VsZWN0ZWQob3B0aW9uLCBldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIGV2ZW50TWFwID0gZXZlbnQgPT4ge1xuICAgIGNvbnN0IGV2ZW50cyA9IHt9O1xuXG4gICAgZXZlbnRzW0tleUV2ZW50LkRPTV9WS19VUF0gPSB0aGlzLm5hdlVwO1xuICAgIGV2ZW50c1tLZXlFdmVudC5ET01fVktfRE9XTl0gPSB0aGlzLm5hdkRvd247XG4gICAgZXZlbnRzW0tleUV2ZW50LkRPTV9WS19SRVRVUk5dID0gZXZlbnRzW0tleUV2ZW50LkRPTV9WS19FTlRFUl0gPSB0aGlzLl9vbkVudGVyO1xuICAgIGV2ZW50c1tLZXlFdmVudC5ET01fVktfRVNDQVBFXSA9IHRoaXMuX29uRXNjYXBlO1xuICAgIGV2ZW50c1tLZXlFdmVudC5ET01fVktfVEFCXSA9IHRoaXMuX29uVGFiO1xuXG4gICAgcmV0dXJuIGV2ZW50cztcbiAgfTtcblxuICBfbmF2ID0gZGVsdGEgPT4ge1xuICAgIGlmICghdGhpcy5faGFzSGludCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBuZXdJbmRleCA9XG4gICAgICB0aGlzLnN0YXRlLnNlbGVjdGlvbkluZGV4ID09PSBudWxsXG4gICAgICAgID8gZGVsdGEgPT09IDFcbiAgICAgICAgICA/IDBcbiAgICAgICAgICA6IGRlbHRhXG4gICAgICAgIDogdGhpcy5zdGF0ZS5zZWxlY3Rpb25JbmRleCArIGRlbHRhO1xuICAgIGxldCBsZW5ndGggPSB0aGlzLnByb3BzLm1heFZpc2libGVcbiAgICAgID8gdGhpcy5zdGF0ZS5zZWFyY2hSZXN1bHRzLnNsaWNlKDAsIHRoaXMucHJvcHMubWF4VmlzaWJsZSkubGVuZ3RoXG4gICAgICA6IHRoaXMuc3RhdGUuc2VhcmNoUmVzdWx0cy5sZW5ndGg7XG4gICAgaWYgKHRoaXMuX2hhc0N1c3RvbVZhbHVlKCkpIHtcbiAgICAgIGxlbmd0aCArPSAxO1xuICAgIH1cblxuICAgIGlmIChuZXdJbmRleCA8IDApIHtcbiAgICAgIG5ld0luZGV4ICs9IGxlbmd0aDtcbiAgICB9IGVsc2UgaWYgKG5ld0luZGV4ID49IGxlbmd0aCkge1xuICAgICAgbmV3SW5kZXggLT0gbGVuZ3RoO1xuICAgIH1cblxuICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGlvbkluZGV4OiBuZXdJbmRleH0pO1xuICB9O1xuXG4gIG5hdkRvd24gPSAoKSA9PiB7XG4gICAgdGhpcy5fbmF2KDEpO1xuICB9O1xuXG4gIG5hdlVwID0gKCkgPT4ge1xuICAgIHRoaXMuX25hdigtMSk7XG4gIH07XG5cbiAgX29uQ2hhbmdlID0gZXZlbnQgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uQ2hhbmdlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGV2ZW50KTtcbiAgICB9XG5cbiAgICB0aGlzLl9vblRleHRFbnRyeVVwZGF0ZWQoKTtcbiAgfTtcblxuICBfb25LZXlEb3duID0gZXZlbnQgPT4ge1xuICAgIC8vIElmIHRoZXJlIGFyZSBubyB2aXNpYmxlIGVsZW1lbnRzLCBkb24ndCBwZXJmb3JtIHNlbGVjdG9yIG5hdmlnYXRpb24uXG4gICAgLy8gSnVzdCBwYXNzIHRoaXMgdXAgdG8gdGhlIHVwc3RyZWFtIG9uS2V5ZG93biBoYW5kbGVyLlxuICAgIC8vIEFsc28gc2tpcCBpZiB0aGUgdXNlciBpcyBwcmVzc2luZyB0aGUgc2hpZnQga2V5LCBzaW5jZSBub25lIG9mIG91ciBoYW5kbGVycyBhcmUgbG9va2luZyBmb3Igc2hpZnRcbiAgICBpZiAoIXRoaXMuX2hhc0hpbnQoKSB8fCBldmVudC5zaGlmdEtleSkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICB9XG5cbiAgICBjb25zdCBoYW5kbGVyID0gdGhpcy5ldmVudE1hcCgpW2V2ZW50LmtleUNvZGVdO1xuXG4gICAgaWYgKGhhbmRsZXIpIHtcbiAgICAgIGhhbmRsZXIoZXZlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5vbktleURvd24oZXZlbnQpO1xuICAgIH1cbiAgICAvLyBEb24ndCBwcm9wYWdhdGUgdGhlIGtleXN0cm9rZSBiYWNrIHRvIHRoZSBET00vYnJvd3NlclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH07XG5cbiAgX29uRm9jdXMgPSBldmVudCA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7aXNGb2N1c2VkOiB0cnVlfSk7XG4gICAgaWYgKHRoaXMucHJvcHMub25Gb2N1cykge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMub25Gb2N1cyhldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIF9vbkJsdXIgPSBldmVudCA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7aXNGb2N1c2VkOiBmYWxzZX0pO1xuICAgIGlmICh0aGlzLnByb3BzLm9uQmx1cikge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMub25CbHVyKGV2ZW50KTtcbiAgICB9XG4gIH07XG5cbiAgX3JlbmRlckhpZGRlbklucHV0KCkge1xuICAgIGlmICghdGhpcy5wcm9wcy5uYW1lKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPXt0aGlzLnByb3BzLm5hbWV9IHZhbHVlPXt0aGlzLnN0YXRlLnNlbGVjdGlvbn0gLz47XG4gIH1cblxuICBfaGFzSGludCgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5zZWFyY2hSZXN1bHRzLmxlbmd0aCA+IDAgfHwgdGhpcy5faGFzQ3VzdG9tVmFsdWUoKTtcbiAgfVxuXG4gIF9oYXNGaXhlZE9wdGlvbnMoKSB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodGhpcy5wcm9wcy5maXhlZE9wdGlvbnMpICYmIHRoaXMucHJvcHMuZml4ZWRPcHRpb25zLmxlbmd0aDtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBpbnB1dENsYXNzZXMgPSB7fTtcbiAgICBpbnB1dENsYXNzZXNbdGhpcy5wcm9wcy5jdXN0b21DbGFzc2VzLmlucHV0XSA9IEJvb2xlYW4odGhpcy5wcm9wcy5jdXN0b21DbGFzc2VzLmlucHV0KTtcbiAgICBjb25zdCBpbnB1dENsYXNzTGlzdCA9IGNsYXNzTmFtZXMoaW5wdXRDbGFzc2VzKTtcblxuICAgIGNvbnN0IGNsYXNzZXMgPSB7XG4gICAgICBbREVGQVVMVF9DTEFTU106IHRoaXMucHJvcHMuZGVmYXVsdENsYXNzTmFtZXNcbiAgICB9O1xuICAgIGNsYXNzZXNbdGhpcy5wcm9wcy5jbGFzc05hbWVdID0gQm9vbGVhbih0aGlzLnByb3BzLmNsYXNzTmFtZSk7XG4gICAgY29uc3QgY2xhc3NMaXN0ID0gY2xhc3NOYW1lcyhjbGFzc2VzKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8VHlwZWFoZWFkV3JhcHBlclxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTGlzdH1cbiAgICAgICAgcmVmPXt0aGlzLnJvb3R9XG4gICAgICAgIHRhYkluZGV4PVwiMFwiXG4gICAgICAgIG9uS2V5RG93bj17dGhpcy5fb25LZXlEb3dufVxuICAgICAgICBvbktleVByZXNzPXt0aGlzLnByb3BzLm9uS2V5UHJlc3N9XG4gICAgICAgIG9uS2V5VXA9e3RoaXMucHJvcHMub25LZXlVcH1cbiAgICAgICAgb25Gb2N1cz17dGhpcy5fb25Gb2N1c31cbiAgICAgID5cbiAgICAgICAge3RoaXMuX3JlbmRlckhpZGRlbklucHV0KCl9XG4gICAgICAgIHt0aGlzLnByb3BzLnNlYXJjaGFibGUgPyAoXG4gICAgICAgICAgPElucHV0Qm94PlxuICAgICAgICAgICAgPFR5cGVhaGVhZElucHV0XG4gICAgICAgICAgICAgIHJlZj17dGhpcy5lbnRyeX1cbiAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5wcm9wcy5kaXNhYmxlZH1cbiAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuaW5wdXRQcm9wc31cbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3RoaXMucHJvcHMucGxhY2Vob2xkZXJ9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17aW5wdXRDbGFzc0xpc3R9XG4gICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLmVudHJ5VmFsdWV9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLl9vbkNoYW5nZX1cbiAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLl9vbkJsdXJ9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPElucHV0SWNvbj5cbiAgICAgICAgICAgICAgPFNlYXJjaCBoZWlnaHQ9XCIxOHB4XCIgLz5cbiAgICAgICAgICAgIDwvSW5wdXRJY29uPlxuICAgICAgICAgIDwvSW5wdXRCb3g+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICB7dGhpcy5fcmVuZGVySW5jcmVtZW50YWxTZWFyY2hSZXN1bHRzKCl9XG4gICAgICA8L1R5cGVhaGVhZFdyYXBwZXI+XG4gICAgKTtcbiAgfVxufVxuXG5wb2x5ZmlsbChUeXBlYWhlYWQpO1xuXG5leHBvcnQgZGVmYXVsdCBUeXBlYWhlYWQ7XG4iXX0=