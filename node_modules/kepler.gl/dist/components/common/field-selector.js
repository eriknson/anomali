"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.FieldListItemFactory = void 0;

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

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reselect = require("reselect");

var _itemSelector = _interopRequireDefault(require("./item-selector/item-selector"));

var _fieldToken = _interopRequireDefault(require("../common/field-token"));

var _dropdownList = require("./item-selector/dropdown-list");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: inline-block;\n  margin: 0 4px 0 0;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var defaultDisplayOption = function defaultDisplayOption(d) {
  return d.name;
};

var StyledToken = _styledComponents["default"].div(_templateObject()); // custom list Item


var FieldListItemFactory = function FieldListItemFactory() {
  var showToken = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

  var FieldListItem = function FieldListItem(_ref) {
    var value = _ref.value,
        _ref$displayOption = _ref.displayOption,
        displayOption = _ref$displayOption === void 0 ? defaultDisplayOption : _ref$displayOption;
    return _react["default"].createElement("div", null, showToken ? _react["default"].createElement(StyledToken, null, _react["default"].createElement(_fieldToken["default"], {
      type: value.type
    })) : null, _react["default"].createElement("span", {
      className: _dropdownList.classList.listItemAnchor
    }, displayOption(value)));
  };

  return FieldListItem;
};

exports.FieldListItemFactory = FieldListItemFactory;

var SuggestedFieldHeader = function SuggestedFieldHeader() {
  return _react["default"].createElement("div", null, "Suggested Field");
};

var FieldType = _propTypes["default"].oneOfType([_propTypes["default"].arrayOf(_propTypes["default"].string), _propTypes["default"].string, _propTypes["default"].shape({
  format: _propTypes["default"].string,
  id: _propTypes["default"].string,
  name: _propTypes["default"].string,
  tableFieldIndex: _propTypes["default"].number,
  type: _propTypes["default"].number
})]);

var FieldSelector =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(FieldSelector, _Component);

  function FieldSelector() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, FieldSelector);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(FieldSelector)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "fieldsSelector", function (props) {
      return props.fields;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "valueSelector", function (props) {
      return props.value;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "filterFieldTypesSelector", function (props) {
      return props.filterFieldTypes;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "showTokenSelector", function (props) {
      return props.showToken;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "selectedItemsSelector", (0, _reselect.createSelector)(_this.fieldsSelector, _this.valueSelector, function (fields, value) {
      return fields.filter(function (f) {
        return (Array.isArray(value) ? value : [value]).includes(defaultDisplayOption(f));
      });
    }));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "fieldOptionsSelector", (0, _reselect.createSelector)(_this.fieldsSelector, _this.filterFieldTypesSelector, function (fields, filterFieldTypes) {
      if (!filterFieldTypes) {
        return fields;
      }

      var filters = Array.isArray(filterFieldTypes) ? filterFieldTypes : [filterFieldTypes];
      return fields.filter(function (f) {
        return filters.includes(f.type);
      });
    }));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "fieldListItemSelector", (0, _reselect.createSelector)(_this.showTokenSelector, FieldListItemFactory));
    return _this;
  }

  (0, _createClass2["default"])(FieldSelector, [{
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", {
        className: "field-selector"
      }, _react["default"].createElement(_itemSelector["default"], {
        getOptionValue: function getOptionValue(d) {
          return d;
        },
        closeOnSelect: this.props.closeOnSelect,
        displayOption: defaultDisplayOption,
        filterOption: 'id',
        fixedOptions: this.props.suggested,
        inputTheme: this.props.inputTheme,
        isError: this.props.error,
        selectedItems: this.selectedItemsSelector(this.props),
        erasable: this.props.erasable,
        options: this.fieldOptionsSelector(this.props),
        multiSelect: this.props.multiSelect,
        placeholder: this.props.placeholder,
        placement: this.props.placement,
        onChange: this.props.onSelect,
        DropDownLineItemRenderComponent: this.fieldListItemSelector(this.props),
        DropdownHeaderComponent: this.props.suggested ? SuggestedFieldHeader : null
      }));
    }
  }]);
  return FieldSelector;
}(_react.Component);

(0, _defineProperty2["default"])(FieldSelector, "propTypes", {
  fields: _propTypes["default"].oneOfType([_propTypes["default"].array, _propTypes["default"].arrayOf(FieldType)]),
  onSelect: _propTypes["default"].func.isRequired,
  placement: _propTypes["default"].string,
  value: FieldType,
  filterFieldTypes: _propTypes["default"].oneOfType([FieldType, _propTypes["default"].arrayOf(FieldType)]),
  inputTheme: _propTypes["default"].string,
  placeholder: _propTypes["default"].string,
  erasable: _propTypes["default"].bool,
  error: _propTypes["default"].bool,
  multiSelect: _propTypes["default"].bool,
  closeOnSelect: _propTypes["default"].bool,
  showToken: _propTypes["default"].bool,
  suggested: _propTypes["default"].arrayOf(_propTypes["default"].any)
});
(0, _defineProperty2["default"])(FieldSelector, "defaultProps", {
  erasable: true,
  error: false,
  fields: [],
  onSelect: function onSelect() {},
  placement: 'bottom',
  value: null,
  multiSelect: false,
  closeOnSelect: true,
  showToken: true,
  placeholder: 'placeholder.selectField'
});
var _default = FieldSelector;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9maWVsZC1zZWxlY3Rvci5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0RGlzcGxheU9wdGlvbiIsImQiLCJuYW1lIiwiU3R5bGVkVG9rZW4iLCJzdHlsZWQiLCJkaXYiLCJGaWVsZExpc3RJdGVtRmFjdG9yeSIsInNob3dUb2tlbiIsIkZpZWxkTGlzdEl0ZW0iLCJ2YWx1ZSIsImRpc3BsYXlPcHRpb24iLCJ0eXBlIiwiY2xhc3NMaXN0IiwibGlzdEl0ZW1BbmNob3IiLCJTdWdnZXN0ZWRGaWVsZEhlYWRlciIsIkZpZWxkVHlwZSIsIlByb3BUeXBlcyIsIm9uZU9mVHlwZSIsImFycmF5T2YiLCJzdHJpbmciLCJzaGFwZSIsImZvcm1hdCIsImlkIiwidGFibGVGaWVsZEluZGV4IiwibnVtYmVyIiwiRmllbGRTZWxlY3RvciIsInByb3BzIiwiZmllbGRzIiwiZmlsdGVyRmllbGRUeXBlcyIsImZpZWxkc1NlbGVjdG9yIiwidmFsdWVTZWxlY3RvciIsImZpbHRlciIsImYiLCJBcnJheSIsImlzQXJyYXkiLCJpbmNsdWRlcyIsImZpbHRlckZpZWxkVHlwZXNTZWxlY3RvciIsImZpbHRlcnMiLCJzaG93VG9rZW5TZWxlY3RvciIsImNsb3NlT25TZWxlY3QiLCJzdWdnZXN0ZWQiLCJpbnB1dFRoZW1lIiwiZXJyb3IiLCJzZWxlY3RlZEl0ZW1zU2VsZWN0b3IiLCJlcmFzYWJsZSIsImZpZWxkT3B0aW9uc1NlbGVjdG9yIiwibXVsdGlTZWxlY3QiLCJwbGFjZWhvbGRlciIsInBsYWNlbWVudCIsIm9uU2VsZWN0IiwiZmllbGRMaXN0SXRlbVNlbGVjdG9yIiwiQ29tcG9uZW50IiwiYXJyYXkiLCJmdW5jIiwiaXNSZXF1aXJlZCIsImJvb2wiLCJhbnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FB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QUUsS0FQTztBQVFwQlAsRUFBQUEsYUFBYSxFQUFFLElBUks7QUFTcEJoQyxFQUFBQSxTQUFTLEVBQUUsSUFUUztBQVVwQndDLEVBQUFBLFdBQVcsRUFBRTtBQVZPLEM7ZUE4RFR0QixhIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIwIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQge2NyZWF0ZVNlbGVjdG9yfSBmcm9tICdyZXNlbGVjdCc7XG5cbmltcG9ydCBJdGVtU2VsZWN0b3IgZnJvbSAnLi9pdGVtLXNlbGVjdG9yL2l0ZW0tc2VsZWN0b3InO1xuaW1wb3J0IEZpZWxkVG9rZW4gZnJvbSAnLi4vY29tbW9uL2ZpZWxkLXRva2VuJztcbmltcG9ydCB7Y2xhc3NMaXN0fSBmcm9tICcuL2l0ZW0tc2VsZWN0b3IvZHJvcGRvd24tbGlzdCc7XG5cbmNvbnN0IGRlZmF1bHREaXNwbGF5T3B0aW9uID0gZCA9PiBkLm5hbWU7XG5cbmNvbnN0IFN0eWxlZFRva2VuID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBtYXJnaW46IDAgNHB4IDAgMDtcbmA7XG4vLyBjdXN0b20gbGlzdCBJdGVtXG5leHBvcnQgY29uc3QgRmllbGRMaXN0SXRlbUZhY3RvcnkgPSAoc2hvd1Rva2VuID0gdHJ1ZSkgPT4ge1xuICBjb25zdCBGaWVsZExpc3RJdGVtID0gKHt2YWx1ZSwgZGlzcGxheU9wdGlvbiA9IGRlZmF1bHREaXNwbGF5T3B0aW9ufSkgPT4gKFxuICAgIDxkaXY+XG4gICAgICB7c2hvd1Rva2VuID8gKFxuICAgICAgICA8U3R5bGVkVG9rZW4+XG4gICAgICAgICAgPEZpZWxkVG9rZW4gdHlwZT17dmFsdWUudHlwZX0gLz5cbiAgICAgICAgPC9TdHlsZWRUb2tlbj5cbiAgICAgICkgOiBudWxsfVxuICAgICAgPHNwYW4gY2xhc3NOYW1lPXtjbGFzc0xpc3QubGlzdEl0ZW1BbmNob3J9PntkaXNwbGF5T3B0aW9uKHZhbHVlKX08L3NwYW4+XG4gICAgPC9kaXY+XG4gICk7XG5cbiAgcmV0dXJuIEZpZWxkTGlzdEl0ZW07XG59O1xuXG5jb25zdCBTdWdnZXN0ZWRGaWVsZEhlYWRlciA9ICgpID0+IDxkaXY+U3VnZ2VzdGVkIEZpZWxkPC9kaXY+O1xuXG5jb25zdCBGaWVsZFR5cGUgPSBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gIFByb3BUeXBlcy5zdHJpbmcsXG4gIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgZm9ybWF0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdGFibGVGaWVsZEluZGV4OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHR5cGU6IFByb3BUeXBlcy5udW1iZXJcbiAgfSlcbl0pO1xuXG5jbGFzcyBGaWVsZFNlbGVjdG9yIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBmaWVsZHM6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5hcnJheSwgUHJvcFR5cGVzLmFycmF5T2YoRmllbGRUeXBlKV0pLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHBsYWNlbWVudDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB2YWx1ZTogRmllbGRUeXBlLFxuICAgIGZpbHRlckZpZWxkVHlwZXM6IFByb3BUeXBlcy5vbmVPZlR5cGUoW0ZpZWxkVHlwZSwgUHJvcFR5cGVzLmFycmF5T2YoRmllbGRUeXBlKV0pLFxuICAgIGlucHV0VGhlbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcGxhY2Vob2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZXJhc2FibGU6IFByb3BUeXBlcy5ib29sLFxuICAgIGVycm9yOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBtdWx0aVNlbGVjdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgY2xvc2VPblNlbGVjdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1Rva2VuOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzdWdnZXN0ZWQ6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBlcmFzYWJsZTogdHJ1ZSxcbiAgICBlcnJvcjogZmFsc2UsXG4gICAgZmllbGRzOiBbXSxcbiAgICBvblNlbGVjdDogKCkgPT4ge30sXG4gICAgcGxhY2VtZW50OiAnYm90dG9tJyxcbiAgICB2YWx1ZTogbnVsbCxcbiAgICBtdWx0aVNlbGVjdDogZmFsc2UsXG4gICAgY2xvc2VPblNlbGVjdDogdHJ1ZSxcbiAgICBzaG93VG9rZW46IHRydWUsXG4gICAgcGxhY2Vob2xkZXI6ICdwbGFjZWhvbGRlci5zZWxlY3RGaWVsZCdcbiAgfTtcblxuICBmaWVsZHNTZWxlY3RvciA9IHByb3BzID0+IHByb3BzLmZpZWxkcztcbiAgdmFsdWVTZWxlY3RvciA9IHByb3BzID0+IHByb3BzLnZhbHVlO1xuICBmaWx0ZXJGaWVsZFR5cGVzU2VsZWN0b3IgPSBwcm9wcyA9PiBwcm9wcy5maWx0ZXJGaWVsZFR5cGVzO1xuICBzaG93VG9rZW5TZWxlY3RvciA9IHByb3BzID0+IHByb3BzLnNob3dUb2tlbjtcblxuICBzZWxlY3RlZEl0ZW1zU2VsZWN0b3IgPSBjcmVhdGVTZWxlY3Rvcih0aGlzLmZpZWxkc1NlbGVjdG9yLCB0aGlzLnZhbHVlU2VsZWN0b3IsIChmaWVsZHMsIHZhbHVlKSA9PlxuICAgIGZpZWxkcy5maWx0ZXIoZiA9PiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IFt2YWx1ZV0pLmluY2x1ZGVzKGRlZmF1bHREaXNwbGF5T3B0aW9uKGYpKSlcbiAgKTtcblxuICBmaWVsZE9wdGlvbnNTZWxlY3RvciA9IGNyZWF0ZVNlbGVjdG9yKFxuICAgIHRoaXMuZmllbGRzU2VsZWN0b3IsXG4gICAgdGhpcy5maWx0ZXJGaWVsZFR5cGVzU2VsZWN0b3IsXG4gICAgKGZpZWxkcywgZmlsdGVyRmllbGRUeXBlcykgPT4ge1xuICAgICAgaWYgKCFmaWx0ZXJGaWVsZFR5cGVzKSB7XG4gICAgICAgIHJldHVybiBmaWVsZHM7XG4gICAgICB9XG4gICAgICBjb25zdCBmaWx0ZXJzID0gQXJyYXkuaXNBcnJheShmaWx0ZXJGaWVsZFR5cGVzKSA/IGZpbHRlckZpZWxkVHlwZXMgOiBbZmlsdGVyRmllbGRUeXBlc107XG4gICAgICByZXR1cm4gZmllbGRzLmZpbHRlcihmID0+IGZpbHRlcnMuaW5jbHVkZXMoZi50eXBlKSk7XG4gICAgfVxuICApO1xuXG4gIGZpZWxkTGlzdEl0ZW1TZWxlY3RvciA9IGNyZWF0ZVNlbGVjdG9yKHRoaXMuc2hvd1Rva2VuU2VsZWN0b3IsIEZpZWxkTGlzdEl0ZW1GYWN0b3J5KTtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmllbGQtc2VsZWN0b3JcIj5cbiAgICAgICAgPEl0ZW1TZWxlY3RvclxuICAgICAgICAgIGdldE9wdGlvblZhbHVlPXtkID0+IGR9XG4gICAgICAgICAgY2xvc2VPblNlbGVjdD17dGhpcy5wcm9wcy5jbG9zZU9uU2VsZWN0fVxuICAgICAgICAgIGRpc3BsYXlPcHRpb249e2RlZmF1bHREaXNwbGF5T3B0aW9ufVxuICAgICAgICAgIGZpbHRlck9wdGlvbj17J2lkJ31cbiAgICAgICAgICBmaXhlZE9wdGlvbnM9e3RoaXMucHJvcHMuc3VnZ2VzdGVkfVxuICAgICAgICAgIGlucHV0VGhlbWU9e3RoaXMucHJvcHMuaW5wdXRUaGVtZX1cbiAgICAgICAgICBpc0Vycm9yPXt0aGlzLnByb3BzLmVycm9yfVxuICAgICAgICAgIHNlbGVjdGVkSXRlbXM9e3RoaXMuc2VsZWN0ZWRJdGVtc1NlbGVjdG9yKHRoaXMucHJvcHMpfVxuICAgICAgICAgIGVyYXNhYmxlPXt0aGlzLnByb3BzLmVyYXNhYmxlfVxuICAgICAgICAgIG9wdGlvbnM9e3RoaXMuZmllbGRPcHRpb25zU2VsZWN0b3IodGhpcy5wcm9wcyl9XG4gICAgICAgICAgbXVsdGlTZWxlY3Q9e3RoaXMucHJvcHMubXVsdGlTZWxlY3R9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9e3RoaXMucHJvcHMucGxhY2Vob2xkZXJ9XG4gICAgICAgICAgcGxhY2VtZW50PXt0aGlzLnByb3BzLnBsYWNlbWVudH1cbiAgICAgICAgICBvbkNoYW5nZT17dGhpcy5wcm9wcy5vblNlbGVjdH1cbiAgICAgICAgICBEcm9wRG93bkxpbmVJdGVtUmVuZGVyQ29tcG9uZW50PXt0aGlzLmZpZWxkTGlzdEl0ZW1TZWxlY3Rvcih0aGlzLnByb3BzKX1cbiAgICAgICAgICBEcm9wZG93bkhlYWRlckNvbXBvbmVudD17dGhpcy5wcm9wcy5zdWdnZXN0ZWQgPyBTdWdnZXN0ZWRGaWVsZEhlYWRlciA6IG51bGx9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEZpZWxkU2VsZWN0b3I7XG4iXX0=