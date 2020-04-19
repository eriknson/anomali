"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledFilterContent = exports.MapControlButton = exports.BottomWidgetInner = exports.WidgetContainer = exports.StyledType = exports.StyledFilteredOption = exports.StyledExportSection = exports.StyledMapContainer = exports.StyledModalInputFootnote = exports.StyledModalSection = exports.StyledModalVerticalPanel = exports.StyledModalContent = exports.Table = exports.SelectionButton = exports.DatasetSquare = exports.ButtonGroup = exports.StyledPanelDropdown = exports.StyledPanelHeader = exports.InlineInput = exports.TextAreaLight = exports.TextArea = exports.InputLight = exports.Input = exports.Button = exports.Tooltip = exports.SidePanelDivider = exports.SidePanelSection = exports.PanelContent = exports.PanelHeaderContent = exports.PanelHeaderTitle = exports.PanelLabelBold = exports.PanelLabelWrapper = exports.PanelLabel = exports.SBFlexboxItem = exports.SpaceBetweenFlexbox = exports.CenterVerticalFlexbox = exports.CenterFlexbox = exports.IconRoundSmall = exports.SelectTextBold = exports.SelectText = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactTooltip = _interopRequireDefault(require("react-tooltip"));

var _mediaBreakpoints = require("../../styles/media-breakpoints");

var _classnames = _interopRequireDefault(require("classnames"));

function _templateObject44() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  background-color: ", ";\n  padding: 12px;\n"]);

  _templateObject44 = function _templateObject44() {
    return data;
  };

  return data;
}

function _templateObject43() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.16);\n  height: 32px;\n  width: 32px;\n  padding: 0;\n  border-radius: 0;\n  background-color: ", ";\n  color: ", ";\n\n  :hover,\n  :focus,\n  :active,\n  &.active {\n    background-color: ", ";\n    color: ", ";\n  }\n  svg {\n    margin-right: 0;\n  }\n"]);

  _templateObject43 = function _templateObject43() {
    return data;
  };

  return data;
}

function _templateObject42() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  background-color: ", ";\n  padding: ", ";\n  position: relative;\n  margin-top: ", "px;\n"]);

  _templateObject42 = function _templateObject42() {
    return data;
  };

  return data;
}

function _templateObject41() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  z-index: 1;\n"]);

  _templateObject41 = function _templateObject41() {
    return data;
  };

  return data;
}

function _templateObject40() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  border-radius: 2px;\n  border: 1px solid\n    ", ";\n  color: ", ";\n  cursor: pointer;\n  font-weight: 500;\n  height: 100px;\n  margin: 4px;\n  padding: 6px 10px;\n  width: 100px;\n\n  :hover {\n    color: ", ";\n    border: 1px solid ", ";\n  }\n"]);

  _templateObject40 = function _templateObject40() {
    return data;
  };

  return data;
}

function _templateObject39() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  align-items: center;\n  border-radius: 2px;\n  border: 1px solid\n    ", ";\n  cursor: pointer;\n  display: flex;\n  flex-direction: column;\n  height: 60px;\n  justify-content: center;\n  margin: 4px;\n  padding: 8px 12px;\n  width: 140px;\n\n  :hover {\n    border: 1px solid ", ";\n  }\n\n  .filter-option-title {\n    color: ", ";\n    font-size: 12px;\n    font-weight: 500;\n  }\n  .filter-option-subtitle {\n    color: ", ";\n    font-size: 11px;\n  }\n"]);

  _templateObject39 = function _templateObject39() {
    return data;
  };

  return data;
}

function _templateObject38() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  flex-direction: row;\n  margin: 35px 0;\n  width: 100%;\n  color: ", ";\n  font-size: 12px;\n  opacity: ", ";\n  pointer-events: ", ";\n\n  .description {\n    width: 185px;\n    .title {\n      font-weight: 500;\n    }\n    .subtitle {\n      color: ", ";\n      font-size: 11px;\n    }\n  }\n  .warning {\n    color: ", ";\n    font-weight: 500;\n  }\n  .description.full {\n    width: 100%;\n  }\n  .selection {\n    display: flex;\n    flex-wrap: wrap;\n    flex: 1;\n    padding-left: 50px;\n\n    select {\n      background-color: white;\n      border-radius: 1px;\n      display: inline-block;\n      font: inherit;\n      line-height: 1.5em;\n      padding: 0.5em 3.5em 0.5em 1em;\n      margin: 0;\n      box-sizing: border-box;\n      appearance: none;\n      width: 250px;\n      height: 36px;\n\n      background-image: linear-gradient(45deg, transparent 50%, gray 50%),\n        linear-gradient(135deg, gray 50%, transparent 50%), linear-gradient(to right, #ccc, #ccc);\n      background-position: calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px),\n        calc(100% - 2.5em) 4.5em;\n      background-size: 5px 5px, 5px 5px, 1px 1.5em;\n      background-repeat: no-repeat;\n    }\n\n    select:focus {\n      background-image: linear-gradient(45deg, green 50%, transparent 50%),\n        linear-gradient(135deg, transparent 50%, green 50%), linear-gradient(to right, #ccc, #ccc);\n      background-position: calc(100% - 15px) 1em, calc(100% - 20px) 1em, calc(100% - 2.5em) 4.5em;\n      background-size: 5px 5px, 5px 5px, 1px 1.5em;\n      background-repeat: no-repeat;\n      border-color: green;\n      outline: 0;\n    }\n  }\n"]);

  _templateObject38 = function _templateObject38() {
    return data;
  };

  return data;
}

function _templateObject37() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  .mapboxgl-map .mapboxgl-missing-css {\n    display: none;\n  }\n"]);

  _templateObject37 = function _templateObject37() {
    return data;
  };

  return data;
}

function _templateObject36() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  justify-content: flex-end;\n  color: ", ";\n  font-size: 10px;\n"]);

  _templateObject36 = function _templateObject36() {
    return data;
  };

  return data;
}

function _templateObject35() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n    margin-bottom: 16px;\n  "]);

  _templateObject35 = function _templateObject35() {
    return data;
  };

  return data;
}

function _templateObject34() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n    margin-bottom: 24px;\n  "]);

  _templateObject34 = function _templateObject34() {
    return data;
  };

  return data;
}

function _templateObject33() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  margin-bottom: 32px;\n\n  .modal-section-title {\n    font-weight: 500;\n  }\n  .modal-section-subtitle {\n    color: ", ";\n  }\n\n  input {\n    margin-top: 8px;\n  }\n\n  ", ";\n  ", ";\n"]);

  _templateObject33 = function _templateObject33() {
    return data;
  };

  return data;
}

function _templateObject32() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n      margin-top: 0;\n    "]);

  _templateObject32 = function _templateObject32() {
    return data;
  };

  return data;
}

function _templateObject31() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  flex-direction: column;\n  justify-content: space-around;\n  font-size: 12px;\n\n  .modal-section:first-child {\n    margin-top: 24px;\n    ", ";\n  }\n\n  input {\n    margin-right: 8px;\n  }\n"]);

  _templateObject31 = function _templateObject31() {
    return data;
  };

  return data;
}

function _templateObject30() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n    flex-direction: column;\n    padding: 16px ", ";\n    margin: 0 -", ";\n  "]);

  _templateObject30 = function _templateObject30() {
    return data;
  };

  return data;
}

function _templateObject29() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  background: ", ";\n  color: ", ";\n  display: flex;\n  flex-direction: row;\n  font-size: 10px;\n  padding: 24px ", ";\n  margin: 0 -", ";\n  justify-content: space-between;\n  ", ";\n"]);

  _templateObject29 = function _templateObject29() {
    return data;
  };

  return data;
}

function _templateObject28() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  width: 100%;\n  border-spacing: 0;\n\n  thead {\n    tr th {\n      background: ", ";\n      color: ", ";\n      padding: 18px 12px;\n      text-align: start;\n    }\n  }\n\n  tbody {\n    tr td {\n      border-bottom: ", ";\n      padding: 12px;\n    }\n  }\n"]);

  _templateObject28 = function _templateObject28() {
    return data;
  };

  return data;
}

function _templateObject27() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  border-radius: 2px;\n  border: 1px solid\n    ", ";\n  color: ", ";\n  cursor: pointer;\n  font-weight: 500;\n  margin-right: 6px;\n  padding: 6px 10px;\n\n  :hover {\n    color: ", ";\n    border: 1px solid ", ";\n  }\n"]);

  _templateObject27 = function _templateObject27() {
    return data;
  };

  return data;
}

function _templateObject26() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: inline-block;\n  width: 8px;\n  height: 8px;\n  background-color: rgb(", ");\n  margin-right: 12px;\n"]);

  _templateObject26 = function _templateObject26() {
    return data;
  };

  return data;
}

function _templateObject25() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  .button {\n    border-radius: 0;\n    margin-left: 2px;\n  }\n  .button:first-child {\n    border-bottom-left-radius: ", ";\n    border-top-left-radius: ", ";\n    margin-left: 0;\n  }\n  .button:last-child {\n    border-bottom-right-radius: ", ";\n    border-top-right-radius: ", ";\n  }\n"]);

  _templateObject25 = function _templateObject25() {
    return data;
  };

  return data;
}

function _templateObject24() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ", "\n  background-color: ", ";\n  overflow-y: auto;\n  box-shadow: ", ";\n  border-radius: ", ";\n  margin-top: 2px;\n  max-height: 500px;\n  position: relative;\n  z-index: 999;\n"]);

  _templateObject24 = function _templateObject24() {
    return data;
  };

  return data;
}

function _templateObject23() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  background-color: ", ";\n  border-left: 3px solid\n    rgb(\n      ", "\n    );\n  padding: 0 10px 0 0;\n  height: ", "px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  transition: ", ";\n"]);

  _templateObject23 = function _templateObject23() {
    return data;
  };

  return data;
}

function _templateObject22() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ", ";\n"]);

  _templateObject22 = function _templateObject22() {
    return data;
  };

  return data;
}

function _templateObject21() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ", "\n  height: auto;\n  white-space: pre-wrap;\n"]);

  _templateObject21 = function _templateObject21() {
    return data;
  };

  return data;
}

function _templateObject20() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ", ";\n"]);

  _templateObject20 = function _templateObject20() {
    return data;
  };

  return data;
}

function _templateObject19() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ", "\n"]);

  _templateObject19 = function _templateObject19() {
    return data;
  };

  return data;
}

function _templateObject18() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ", ";\n"]);

  _templateObject18 = function _templateObject18() {
    return data;
  };

  return data;
}

function _templateObject17() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  align-items: center;\n  background-color: ", ";\n  border-radius: ", ";\n  color: ", ";\n  cursor: pointer;\n  display: inline-flex;\n  font-size: ", ";\n  font-weight: 500;\n  justify-content: center;\n  letter-spacing: 0.3px;\n  line-height: 14px;\n  outline: 0;\n  padding: ", ";\n  text-align: center;\n  transition: ", ";\n  vertical-align: middle;\n  width: ", ";\n  opacity: ", ";\n  pointer-events: ", ";\n\n  :hover,\n  :focus,\n  :active,\n  &.active {\n    background-color: ", ";\n    color: ", ";\n  }\n\n  svg {\n    margin-right: ", ";\n  }\n"]);

  _templateObject17 = function _templateObject17() {
    return data;
  };

  return data;
}

function _templateObject16() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  &.__react_component_tooltip {\n    font-size: 9.5px;\n    font-weight: 500;\n    padding: 7px 18px;\n\n    &.type-dark {\n      background-color: ", ";\n      color: ", ";\n      &.place-bottom {\n        :after {\n          border-bottom-color: ", ";\n        }\n      }\n\n      &.place-top {\n        :after {\n          border-top-color: ", ";\n        }\n      }\n\n      &.place-right {\n        :after {\n          border-right-color: ", ";\n        }\n      }\n\n      &.place-left {\n        :after {\n          border-left-color: ", ";\n        }\n      }\n    }\n  }\n"]);

  _templateObject16 = function _templateObject16() {
    return data;
  };

  return data;
}

function _templateObject15() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  border-bottom: 1px solid ", ";\n  height: 12px;\n  margin-bottom: 12px;\n"]);

  _templateObject15 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  margin-bottom: 12px;\n  opacity: ", ";\n  pointer-events: ", ";\n"]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  background-color: ", ";\n  padding: 12px;\n"]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  align-items: center;\n  color: ", ";\n  padding-left: 12px;\n\n  .icon {\n    color: ", ";\n    display: flex;\n    align-items: center;\n    margin-right: 12px;\n  }\n"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  color: ", ";\n  font-size: 13px;\n  letter-spacing: 0.43px;\n  text-transform: capitalize;\n"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  font-weight: 500;\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  align-items: self-start;\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  color: ", ";\n  display: inline-block;\n  font-size: 11px;\n  font-weight: 400;\n  margin-bottom: 4px;\n  text-transform: capitalize;\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  flex-grow: 1;\n  margin-left: 16px;\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  justify-content: space-between;\n  margin-left: -16px;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  align-items: center;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  width: 18px;\n  height: 18px;\n  border-radius: 9px;\n  background-color: ", "; // updated after checking sketch file\n  color: ", ";\n  align-items: center;\n  justify-content: center;\n\n  :hover {\n    cursor: pointer;\n    background-color: ", ";\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  color: ", ";\n  font-weight: 500;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  color: ", ";\n  font-size: ", ";\n  font-weight: 400;\n\n  i {\n    font-size: 13px;\n    margin-right: 6px;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var SelectText = _styledComponents["default"].span(_templateObject(), function (props) {
  return props.theme.labelColor;
}, function (props) {
  return props.theme.selectFontSize;
});

exports.SelectText = SelectText;
var SelectTextBold = (0, _styledComponents["default"])(SelectText)(_templateObject2(), function (props) {
  return props.theme.textColor;
});
exports.SelectTextBold = SelectTextBold;

var IconRoundSmall = _styledComponents["default"].div(_templateObject3(), function (props) {
  return props.theme.secondaryBtnBgdHover;
}, function (props) {
  return props.theme.secondaryBtnColor;
}, function (props) {
  return props.theme.secondaryBtnBgdHover;
});

exports.IconRoundSmall = IconRoundSmall;

var CenterFlexbox = _styledComponents["default"].div(_templateObject4());

exports.CenterFlexbox = CenterFlexbox;

var CenterVerticalFlexbox = _styledComponents["default"].div(_templateObject5());

exports.CenterVerticalFlexbox = CenterVerticalFlexbox;

var SpaceBetweenFlexbox = _styledComponents["default"].div(_templateObject6());

exports.SpaceBetweenFlexbox = SpaceBetweenFlexbox;

var SBFlexboxItem = _styledComponents["default"].div(_templateObject7());

exports.SBFlexboxItem = SBFlexboxItem;

var PanelLabel = _styledComponents["default"].label.attrs({
  className: 'side-panel-panel__label'
})(_templateObject8(), function (props) {
  return props.theme.labelColor;
});

exports.PanelLabel = PanelLabel;

var PanelLabelWrapper = _styledComponents["default"].div.attrs({
  className: 'side-panel-panel__label-wrapper'
})(_templateObject9());

exports.PanelLabelWrapper = PanelLabelWrapper;
var PanelLabelBold = (0, _styledComponents["default"])(PanelLabel)(_templateObject10());
exports.PanelLabelBold = PanelLabelBold;

var PanelHeaderTitle = _styledComponents["default"].span.attrs({
  className: 'side-panel-panel__header__title'
})(_templateObject11(), function (props) {
  return props.theme.textColor;
});

exports.PanelHeaderTitle = PanelHeaderTitle;

var PanelHeaderContent = _styledComponents["default"].div(_templateObject12(), function (props) {
  return props.theme.textColor;
}, function (props) {
  return props.theme.labelColor;
});

exports.PanelHeaderContent = PanelHeaderContent;

var PanelContent = _styledComponents["default"].div.attrs({
  className: 'side-panel-panel__content'
})(_templateObject13(), function (props) {
  return props.theme.panelBackground;
});

exports.PanelContent = PanelContent;

var SidePanelSection = _styledComponents["default"].div.attrs({
  className: 'side-panel-section'
})(_templateObject14(), function (props) {
  return props.disabled ? 0.4 : 1;
}, function (props) {
  return props.disabled ? 'none' : 'all';
});

exports.SidePanelSection = SidePanelSection;

var SidePanelDivider = _styledComponents["default"].div.attrs({
  className: 'side-panel-divider'
})(_templateObject15(), function (props) {
  return props.theme.panelBorderColor;
});

exports.SidePanelDivider = SidePanelDivider;
var Tooltip = (0, _styledComponents["default"])(_reactTooltip["default"])(_templateObject16(), function (props) {
  return props.theme.tooltipBg;
}, function (props) {
  return props.theme.tooltipColor;
}, function (props) {
  return props.theme.tooltipBg;
}, function (props) {
  return props.theme.tooltipBg;
}, function (props) {
  return props.theme.tooltipBg;
}, function (props) {
  return props.theme.tooltipBg;
});
exports.Tooltip = Tooltip;

var Button = _styledComponents["default"].div.attrs(function (props) {
  return {
    className: (0, _classnames["default"])('button', props.className)
  };
})(_templateObject17(), function (props) {
  return props.negative ? props.theme.negativeBtnBgd : props.secondary ? props.theme.secondaryBtnBgd : props.link ? props.theme.linkBtnBgd : props.floating ? props.theme.floatingBtnBgd : props.theme.primaryBtnBgd;
}, function (props) {
  return props.theme.primaryBtnRadius;
}, function (props) {
  return props.negative ? props.theme.negativeBtnColor : props.secondary ? props.theme.secondaryBtnColor : props.link ? props.theme.linkBtnColor : props.floating ? props.theme.floatingBtnColor : props.theme.primaryBtnColor;
}, function (props) {
  return props.large ? '14px' : props.small ? '10px' : '11px';
}, function (props) {
  return props.large ? '14px 32px' : props.small ? '6px 9px' : '9px 12px';
}, function (props) {
  return props.theme.transition;
}, function (props) {
  return props.width || 'auto';
}, function (props) {
  return props.disabled ? 0.4 : 1;
}, function (props) {
  return props.disabled ? 'none' : 'all';
}, function (props) {
  return props.negative ? props.theme.negativeBtnBgdHover : props.secondary ? props.theme.secondaryBtnBgdHover : props.link ? props.theme.linkBtnActBgdHover : props.floating ? props.theme.floatingBtnBgdHover : props.theme.primaryBtnBgdHover;
}, function (props) {
  return props.negative ? props.theme.negativeBtnActColor : props.secondary ? props.theme.secondaryBtnActColor : props.link ? props.theme.linkBtnActColor : props.floating ? props.theme.floatingBtnActColor : props.theme.primaryBtnActColor;
}, function (props) {
  return props.large ? '10px' : props.small ? '6px' : '8px';
});

exports.Button = Button;

var Input = _styledComponents["default"].input(_templateObject18(), function (props) {
  return props.secondary ? props.theme.secondaryInput : props.theme.input;
});

exports.Input = Input;

var InputLight = _styledComponents["default"].input(_templateObject19(), function (props) {
  return props.theme.inputLT;
});

exports.InputLight = InputLight;

var TextArea = _styledComponents["default"].textarea(_templateObject20(), function (props) {
  return props.secondary ? props.theme.secondaryInput : props.theme.input;
});

exports.TextArea = TextArea;

var TextAreaLight = _styledComponents["default"].textarea(_templateObject21(), function (props) {
  return props.theme.inputLT;
});

exports.TextAreaLight = TextAreaLight;
var InlineInput = (0, _styledComponents["default"])(Input)(_templateObject22(), function (props) {
  return props.theme.inlineInput;
});
exports.InlineInput = InlineInput;

var StyledPanelHeader = _styledComponents["default"].div(_templateObject23(), function (props) {
  return props.active ? props.theme.panelBackgroundHover : props.theme.panelBackground;
}, function (props) {
  return props.labelRCGColorValues ? props.labelRCGColorValues.join(',') : 'transparent';
}, function (props) {
  return props.theme.panelHeaderHeight;
}, function (props) {
  return props.theme.transition;
});

exports.StyledPanelHeader = StyledPanelHeader;

var StyledPanelDropdown = _styledComponents["default"].div(_templateObject24(), function (props) {
  return props.theme.panelDropdownScrollBar;
}, function (props) {
  return props.type === 'light' ? props.theme.modalDropdownBackground : props.theme.panelBackground;
}, function (props) {
  return props.theme.panelBoxShadow;
}, function (props) {
  return props.theme.panelBorderRadius;
});

exports.StyledPanelDropdown = StyledPanelDropdown;

var ButtonGroup = _styledComponents["default"].div(_templateObject25(), function (props) {
  return props.theme.primaryBtnRadius;
}, function (props) {
  return props.theme.primaryBtnRadius;
}, function (props) {
  return props.theme.primaryBtnRadius;
}, function (props) {
  return props.theme.primaryBtnRadius;
});

exports.ButtonGroup = ButtonGroup;

var DatasetSquare = _styledComponents["default"].div(_templateObject26(), function (props) {
  return props.color.join(',');
});

exports.DatasetSquare = DatasetSquare;

var SelectionButton = _styledComponents["default"].div(_templateObject27(), function (props) {
  return props.selected ? props.theme.primaryBtnBgd : props.theme.selectBorderColorLT;
}, function (props) {
  return props.selected ? props.theme.primaryBtnBgd : props.theme.selectBorderColorLT;
}, function (props) {
  return props.available && props.theme.primaryBtnBgd;
}, function (props) {
  return props.available && props.theme.primaryBtnBgd;
});

exports.SelectionButton = SelectionButton;

var Table = _styledComponents["default"].table(_templateObject28(), function (props) {
  return props.theme.panelBackgroundLT;
}, function (props) {
  return props.theme.titleColorLT;
}, function (props) {
  return props.theme.panelBorderLT;
});

exports.Table = Table;

var StyledModalContent = _styledComponents["default"].div(_templateObject29(), function (props) {
  return props.theme.panelBackgroundLT;
}, function (props) {
  return props.theme.textColorLT;
}, function (props) {
  return props.theme.modalLateralPadding;
}, function (props) {
  return props.theme.modalLateralPadding;
}, _mediaBreakpoints.media.portable(_templateObject30(), function (props) {
  return props.theme.modalPortableLateralPadding;
}, function (props) {
  return props.theme.modalPortableLateralPadding;
}));

exports.StyledModalContent = StyledModalContent;

var StyledModalVerticalPanel = _styledComponents["default"].div.attrs({
  className: 'modal-vertical-panel'
})(_templateObject31(), _mediaBreakpoints.media.palm(_templateObject32()));

exports.StyledModalVerticalPanel = StyledModalVerticalPanel;

var StyledModalSection = _styledComponents["default"].div.attrs({
  className: 'modal-section'
})(_templateObject33(), function (props) {
  return props.theme.subtextColorLT;
}, _mediaBreakpoints.media.portable(_templateObject34()), _mediaBreakpoints.media.palm(_templateObject35()));

exports.StyledModalSection = StyledModalSection;

var StyledModalInputFootnote = _styledComponents["default"].div.attrs({
  className: 'modal-input__footnote'
})(_templateObject36(), function (props) {
  return props.error ? props.theme.errorColor : props.theme.subtextColorLT;
});
/**
 * Newer versions of mapbox.gl display an error message banner on top of the map by default
 * which will cause the map to display points in the wrong locations
 * This workaround will hide the error banner.
 */


exports.StyledModalInputFootnote = StyledModalInputFootnote;

var StyledMapContainer = _styledComponents["default"].div(_templateObject37());

exports.StyledMapContainer = StyledMapContainer;

var StyledExportSection = _styledComponents["default"].div(_templateObject38(), function (props) {
  return props.theme.textColorLT;
}, function (props) {
  return props.disabled ? 0.3 : 1;
}, function (props) {
  return props.disabled ? 'none' : 'all';
}, function (props) {
  return props.theme.subtextColorLT;
}, function (props) {
  return props.theme.errorColor;
});

exports.StyledExportSection = StyledExportSection;

var StyledFilteredOption = _styledComponents["default"].div(_templateObject39(), function (props) {
  return props.selected ? props.theme.primaryBtnBgd : props.theme.selectBorderColorLT;
}, function (props) {
  return props.theme.primaryBtnBgd;
}, function (props) {
  return props.theme.textColorLT;
}, function (props) {
  return props.theme.textColor;
});

exports.StyledFilteredOption = StyledFilteredOption;

var StyledType = _styledComponents["default"].div(_templateObject40(), function (props) {
  return props.selected ? props.theme.primaryBtnBgdHover : props.theme.selectBorderColorLT;
}, function (props) {
  return props.selected ? props.theme.primaryBtnBgdHover : props.theme.selectBorderColorLT;
}, function (props) {
  return props.available && props.theme.primaryBtnBgd;
}, function (props) {
  return props.available && props.theme.primaryBtnBgd;
});

exports.StyledType = StyledType;

var WidgetContainer = _styledComponents["default"].div(_templateObject41());

exports.WidgetContainer = WidgetContainer;

var BottomWidgetInner = _styledComponents["default"].div(_templateObject42(), function (props) {
  return props.theme.panelBackground;
}, function (props) {
  return "".concat(props.theme.bottomInnerPdVert, "px ").concat(props.theme.bottomInnerPdSide, "px");
}, function (props) {
  return props.theme.bottomPanelGap;
});

exports.BottomWidgetInner = BottomWidgetInner;
var MapControlButton = (0, _styledComponents["default"])(Button).attrs({
  className: 'map-control-button'
})(_templateObject43(), function (props) {
  return props.active ? props.theme.floatingBtnBgdHover : props.theme.floatingBtnBgd;
}, function (props) {
  return props.active ? props.theme.floatingBtnActColor : props.theme.floatingBtnColor;
}, function (props) {
  return props.theme.floatingBtnBgdHover;
}, function (props) {
  return props.theme.floatingBtnActColor;
});
exports.MapControlButton = MapControlButton;

var StyledFilterContent = _styledComponents["default"].div(_templateObject44(), function (props) {
  return props.theme.panelBackground;
});

exports.StyledFilterContent = StyledFilterContent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cy5qcyJdLCJuYW1lcyI6WyJTZWxlY3RUZXh0Iiwic3R5bGVkIiwic3BhbiIsInByb3BzIiwidGhlbWUiLCJsYWJlbENvbG9yIiwic2VsZWN0Rm9udFNpemUiLCJTZWxlY3RUZXh0Qm9sZCIsInRleHRDb2xvciIsIkljb25Sb3VuZFNtYWxsIiwiZGl2Iiwic2Vjb25kYXJ5QnRuQmdkSG92ZXIiLCJzZWNvbmRhcnlCdG5Db2xvciIsIkNlbnRlckZsZXhib3giLCJDZW50ZXJWZXJ0aWNhbEZsZXhib3giLCJTcGFjZUJldHdlZW5GbGV4Ym94IiwiU0JGbGV4Ym94SXRlbSIsIlBhbmVsTGFiZWwiLCJsYWJlbCIsImF0dHJzIiwiY2xhc3NOYW1lIiwiUGFuZWxMYWJlbFdyYXBwZXIiLCJQYW5lbExhYmVsQm9sZCIsIlBhbmVsSGVhZGVyVGl0bGUiLCJQYW5lbEhlYWRlckNvbnRlbnQiLCJQYW5lbENvbnRlbnQiLCJwYW5lbEJhY2tncm91bmQiLCJTaWRlUGFuZWxTZWN0aW9uIiwiZGlzYWJsZWQiLCJTaWRlUGFuZWxEaXZpZGVyIiwicGFuZWxCb3JkZXJDb2xvciIsIlRvb2x0aXAiLCJSZWFjdFRvb2x0aXAiLCJ0b29sdGlwQmciLCJ0b29sdGlwQ29sb3IiLCJCdXR0b24iLCJuZWdhdGl2ZSIsIm5lZ2F0aXZlQnRuQmdkIiwic2Vjb25kYXJ5Iiwic2Vjb25kYXJ5QnRuQmdkIiwibGluayIsImxpbmtCdG5CZ2QiLCJmbG9hdGluZyIsImZsb2F0aW5nQnRuQmdkIiwicHJpbWFyeUJ0bkJnZCIsInByaW1hcnlCdG5SYWRpdXMiLCJuZWdhdGl2ZUJ0bkNvbG9yIiwibGlua0J0bkNvbG9yIiwiZmxvYXRpbmdCdG5Db2xvciIsInByaW1hcnlCdG5Db2xvciIsImxhcmdlIiwic21hbGwiLCJ0cmFuc2l0aW9uIiwid2lkdGgiLCJuZWdhdGl2ZUJ0bkJnZEhvdmVyIiwibGlua0J0bkFjdEJnZEhvdmVyIiwiZmxvYXRpbmdCdG5CZ2RIb3ZlciIsInByaW1hcnlCdG5CZ2RIb3ZlciIsIm5lZ2F0aXZlQnRuQWN0Q29sb3IiLCJzZWNvbmRhcnlCdG5BY3RDb2xvciIsImxpbmtCdG5BY3RDb2xvciIsImZsb2F0aW5nQnRuQWN0Q29sb3IiLCJwcmltYXJ5QnRuQWN0Q29sb3IiLCJJbnB1dCIsImlucHV0Iiwic2Vjb25kYXJ5SW5wdXQiLCJJbnB1dExpZ2h0IiwiaW5wdXRMVCIsIlRleHRBcmVhIiwidGV4dGFyZWEiLCJUZXh0QXJlYUxpZ2h0IiwiSW5saW5lSW5wdXQiLCJpbmxpbmVJbnB1dCIsIlN0eWxlZFBhbmVsSGVhZGVyIiwiYWN0aXZlIiwicGFuZWxCYWNrZ3JvdW5kSG92ZXIiLCJsYWJlbFJDR0NvbG9yVmFsdWVzIiwiam9pbiIsInBhbmVsSGVhZGVySGVpZ2h0IiwiU3R5bGVkUGFuZWxEcm9wZG93biIsInBhbmVsRHJvcGRvd25TY3JvbGxCYXIiLCJ0eXBlIiwibW9kYWxEcm9wZG93bkJhY2tncm91bmQiLCJwYW5lbEJveFNoYWRvdyIsInBhbmVsQm9yZGVyUmFkaXVzIiwiQnV0dG9uR3JvdXAiLCJEYXRhc2V0U3F1YXJlIiwiY29sb3IiLCJTZWxlY3Rpb25CdXR0b24iLCJzZWxlY3RlZCIsInNlbGVjdEJvcmRlckNvbG9yTFQiLCJhdmFpbGFibGUiLCJUYWJsZSIsInRhYmxlIiwicGFuZWxCYWNrZ3JvdW5kTFQiLCJ0aXRsZUNvbG9yTFQiLCJwYW5lbEJvcmRlckxUIiwiU3R5bGVkTW9kYWxDb250ZW50IiwidGV4dENvbG9yTFQiLCJtb2RhbExhdGVyYWxQYWRkaW5nIiwibWVkaWEiLCJwb3J0YWJsZSIsIm1vZGFsUG9ydGFibGVMYXRlcmFsUGFkZGluZyIsIlN0eWxlZE1vZGFsVmVydGljYWxQYW5lbCIsInBhbG0iLCJTdHlsZWRNb2RhbFNlY3Rpb24iLCJzdWJ0ZXh0Q29sb3JMVCIsIlN0eWxlZE1vZGFsSW5wdXRGb290bm90ZSIsImVycm9yIiwiZXJyb3JDb2xvciIsIlN0eWxlZE1hcENvbnRhaW5lciIsIlN0eWxlZEV4cG9ydFNlY3Rpb24iLCJTdHlsZWRGaWx0ZXJlZE9wdGlvbiIsIlN0eWxlZFR5cGUiLCJXaWRnZXRDb250YWluZXIiLCJCb3R0b21XaWRnZXRJbm5lciIsImJvdHRvbUlubmVyUGRWZXJ0IiwiYm90dG9tSW5uZXJQZFNpZGUiLCJib3R0b21QYW5lbEdhcCIsIk1hcENvbnRyb2xCdXR0b24iLCJTdHlsZWRGaWx0ZXJDb250ZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVPLElBQU1BLFVBQVUsR0FBR0MsNkJBQU9DLElBQVYsb0JBQ1osVUFBQUMsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZQyxVQUFoQjtBQUFBLENBRE8sRUFFUixVQUFBRixLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlFLGNBQWhCO0FBQUEsQ0FGRyxDQUFoQjs7O0FBV0EsSUFBTUMsY0FBYyxHQUFHLGtDQUFPUCxVQUFQLENBQUgscUJBQ2hCLFVBQUFHLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWUksU0FBaEI7QUFBQSxDQURXLENBQXBCOzs7QUFLQSxJQUFNQyxjQUFjLEdBQUdSLDZCQUFPUyxHQUFWLHFCQUtMLFVBQUFQLEtBQUs7QUFBQSxTQUN2QkEsS0FBSyxDQUFDQyxLQUFOLENBQVlPLG9CQURXO0FBQUEsQ0FMQSxFQU9oQixVQUFBUixLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlRLGlCQUFoQjtBQUFBLENBUFcsRUFhSCxVQUFBVCxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlPLG9CQUFoQjtBQUFBLENBYkYsQ0FBcEI7Ozs7QUFpQkEsSUFBTUUsYUFBYSxHQUFHWiw2QkFBT1MsR0FBVixvQkFBbkI7Ozs7QUFLQSxJQUFNSSxxQkFBcUIsR0FBR2IsNkJBQU9TLEdBQVYsb0JBQTNCOzs7O0FBTUEsSUFBTUssbUJBQW1CLEdBQUdkLDZCQUFPUyxHQUFWLG9CQUF6Qjs7OztBQU1BLElBQU1NLGFBQWEsR0FBR2YsNkJBQU9TLEdBQVYsb0JBQW5COzs7O0FBS0EsSUFBTU8sVUFBVSxHQUFHaEIsNkJBQU9pQixLQUFQLENBQWFDLEtBQWIsQ0FBbUI7QUFDM0NDLEVBQUFBLFNBQVMsRUFBRTtBQURnQyxDQUFuQixDQUFILHFCQUdaLFVBQUFqQixLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlDLFVBQWhCO0FBQUEsQ0FITyxDQUFoQjs7OztBQVdBLElBQU1nQixpQkFBaUIsR0FBR3BCLDZCQUFPUyxHQUFQLENBQVdTLEtBQVgsQ0FBaUI7QUFDaERDLEVBQUFBLFNBQVMsRUFBRTtBQURxQyxDQUFqQixDQUFILG9CQUF2Qjs7O0FBT0EsSUFBTUUsY0FBYyxHQUFHLGtDQUFPTCxVQUFQLENBQUgscUJBQXBCOzs7QUFJQSxJQUFNTSxnQkFBZ0IsR0FBR3RCLDZCQUFPQyxJQUFQLENBQVlpQixLQUFaLENBQWtCO0FBQ2hEQyxFQUFBQSxTQUFTLEVBQUU7QUFEcUMsQ0FBbEIsQ0FBSCxzQkFHbEIsVUFBQWpCLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWUksU0FBaEI7QUFBQSxDQUhhLENBQXRCOzs7O0FBU0EsSUFBTWdCLGtCQUFrQixHQUFHdkIsNkJBQU9TLEdBQVYsc0JBR3BCLFVBQUFQLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWUksU0FBaEI7QUFBQSxDQUhlLEVBT2xCLFVBQUFMLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWUMsVUFBaEI7QUFBQSxDQVBhLENBQXhCOzs7O0FBY0EsSUFBTW9CLFlBQVksR0FBR3hCLDZCQUFPUyxHQUFQLENBQVdTLEtBQVgsQ0FBaUI7QUFDM0NDLEVBQUFBLFNBQVMsRUFBRTtBQURnQyxDQUFqQixDQUFILHNCQUdILFVBQUFqQixLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlzQixlQUFoQjtBQUFBLENBSEYsQ0FBbEI7Ozs7QUFPQSxJQUFNQyxnQkFBZ0IsR0FBRzFCLDZCQUFPUyxHQUFQLENBQVdTLEtBQVgsQ0FBaUI7QUFDL0NDLEVBQUFBLFNBQVMsRUFBRTtBQURvQyxDQUFqQixDQUFILHNCQUloQixVQUFBakIsS0FBSztBQUFBLFNBQUtBLEtBQUssQ0FBQ3lCLFFBQU4sR0FBaUIsR0FBakIsR0FBdUIsQ0FBNUI7QUFBQSxDQUpXLEVBS1QsVUFBQXpCLEtBQUs7QUFBQSxTQUFLQSxLQUFLLENBQUN5QixRQUFOLEdBQWlCLE1BQWpCLEdBQTBCLEtBQS9CO0FBQUEsQ0FMSSxDQUF0Qjs7OztBQVFBLElBQU1DLGdCQUFnQixHQUFHNUIsNkJBQU9TLEdBQVAsQ0FBV1MsS0FBWCxDQUFpQjtBQUMvQ0MsRUFBQUEsU0FBUyxFQUFFO0FBRG9DLENBQWpCLENBQUgsc0JBR0EsVUFBQWpCLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWTBCLGdCQUFoQjtBQUFBLENBSEwsQ0FBdEI7OztBQVFBLElBQU1DLE9BQU8sR0FBRyxrQ0FBT0Msd0JBQVAsQ0FBSCxzQkFPTSxVQUFBN0IsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZNkIsU0FBaEI7QUFBQSxDQVBYLEVBUUwsVUFBQTlCLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWThCLFlBQWhCO0FBQUEsQ0FSQSxFQVdhLFVBQUEvQixLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVk2QixTQUFoQjtBQUFBLENBWGxCLEVBaUJVLFVBQUE5QixLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVk2QixTQUFoQjtBQUFBLENBakJmLEVBdUJZLFVBQUE5QixLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVk2QixTQUFoQjtBQUFBLENBdkJqQixFQTZCVyxVQUFBOUIsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZNkIsU0FBaEI7QUFBQSxDQTdCaEIsQ0FBYjs7O0FBb0NBLElBQU1FLE1BQU0sR0FBR2xDLDZCQUFPUyxHQUFQLENBQVdTLEtBQVgsQ0FBaUIsVUFBQWhCLEtBQUs7QUFBQSxTQUFLO0FBQy9DaUIsSUFBQUEsU0FBUyxFQUFFLDRCQUFXLFFBQVgsRUFBcUJqQixLQUFLLENBQUNpQixTQUEzQjtBQURvQyxHQUFMO0FBQUEsQ0FBdEIsQ0FBSCxzQkFJRyxVQUFBakIsS0FBSztBQUFBLFNBQ3ZCQSxLQUFLLENBQUNpQyxRQUFOLEdBQ0lqQyxLQUFLLENBQUNDLEtBQU4sQ0FBWWlDLGNBRGhCLEdBRUlsQyxLQUFLLENBQUNtQyxTQUFOLEdBQ0FuQyxLQUFLLENBQUNDLEtBQU4sQ0FBWW1DLGVBRFosR0FFQXBDLEtBQUssQ0FBQ3FDLElBQU4sR0FDQXJDLEtBQUssQ0FBQ0MsS0FBTixDQUFZcUMsVUFEWixHQUVBdEMsS0FBSyxDQUFDdUMsUUFBTixHQUNBdkMsS0FBSyxDQUFDQyxLQUFOLENBQVl1QyxjQURaLEdBRUF4QyxLQUFLLENBQUNDLEtBQU4sQ0FBWXdDLGFBVE87QUFBQSxDQUpSLEVBY0EsVUFBQXpDLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWXlDLGdCQUFoQjtBQUFBLENBZEwsRUFlUixVQUFBMUMsS0FBSztBQUFBLFNBQ1pBLEtBQUssQ0FBQ2lDLFFBQU4sR0FDSWpDLEtBQUssQ0FBQ0MsS0FBTixDQUFZMEMsZ0JBRGhCLEdBRUkzQyxLQUFLLENBQUNtQyxTQUFOLEdBQ0FuQyxLQUFLLENBQUNDLEtBQU4sQ0FBWVEsaUJBRFosR0FFQVQsS0FBSyxDQUFDcUMsSUFBTixHQUNBckMsS0FBSyxDQUFDQyxLQUFOLENBQVkyQyxZQURaLEdBRUE1QyxLQUFLLENBQUN1QyxRQUFOLEdBQ0F2QyxLQUFLLENBQUNDLEtBQU4sQ0FBWTRDLGdCQURaLEdBRUE3QyxLQUFLLENBQUNDLEtBQU4sQ0FBWTZDLGVBVEo7QUFBQSxDQWZHLEVBMkJKLFVBQUE5QyxLQUFLO0FBQUEsU0FBS0EsS0FBSyxDQUFDK0MsS0FBTixHQUFjLE1BQWQsR0FBdUIvQyxLQUFLLENBQUNnRCxLQUFOLEdBQWMsTUFBZCxHQUF1QixNQUFuRDtBQUFBLENBM0JELEVBaUNOLFVBQUFoRCxLQUFLO0FBQUEsU0FBS0EsS0FBSyxDQUFDK0MsS0FBTixHQUFjLFdBQWQsR0FBNEIvQyxLQUFLLENBQUNnRCxLQUFOLEdBQWMsU0FBZCxHQUEwQixVQUEzRDtBQUFBLENBakNDLEVBbUNILFVBQUFoRCxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlnRCxVQUFoQjtBQUFBLENBbkNGLEVBcUNSLFVBQUFqRCxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDa0QsS0FBTixJQUFlLE1BQW5CO0FBQUEsQ0FyQ0csRUFzQ04sVUFBQWxELEtBQUs7QUFBQSxTQUFLQSxLQUFLLENBQUN5QixRQUFOLEdBQWlCLEdBQWpCLEdBQXVCLENBQTVCO0FBQUEsQ0F0Q0MsRUF1Q0MsVUFBQXpCLEtBQUs7QUFBQSxTQUFLQSxLQUFLLENBQUN5QixRQUFOLEdBQWlCLE1BQWpCLEdBQTBCLEtBQS9CO0FBQUEsQ0F2Q04sRUE2Q0ssVUFBQXpCLEtBQUs7QUFBQSxTQUN2QkEsS0FBSyxDQUFDaUMsUUFBTixHQUNJakMsS0FBSyxDQUFDQyxLQUFOLENBQVlrRCxtQkFEaEIsR0FFSW5ELEtBQUssQ0FBQ21DLFNBQU4sR0FDQW5DLEtBQUssQ0FBQ0MsS0FBTixDQUFZTyxvQkFEWixHQUVBUixLQUFLLENBQUNxQyxJQUFOLEdBQ0FyQyxLQUFLLENBQUNDLEtBQU4sQ0FBWW1ELGtCQURaLEdBRUFwRCxLQUFLLENBQUN1QyxRQUFOLEdBQ0F2QyxLQUFLLENBQUNDLEtBQU4sQ0FBWW9ELG1CQURaLEdBRUFyRCxLQUFLLENBQUNDLEtBQU4sQ0FBWXFELGtCQVRPO0FBQUEsQ0E3Q1YsRUF1RE4sVUFBQXRELEtBQUs7QUFBQSxTQUNaQSxLQUFLLENBQUNpQyxRQUFOLEdBQ0lqQyxLQUFLLENBQUNDLEtBQU4sQ0FBWXNELG1CQURoQixHQUVJdkQsS0FBSyxDQUFDbUMsU0FBTixHQUNBbkMsS0FBSyxDQUFDQyxLQUFOLENBQVl1RCxvQkFEWixHQUVBeEQsS0FBSyxDQUFDcUMsSUFBTixHQUNBckMsS0FBSyxDQUFDQyxLQUFOLENBQVl3RCxlQURaLEdBRUF6RCxLQUFLLENBQUN1QyxRQUFOLEdBQ0F2QyxLQUFLLENBQUNDLEtBQU4sQ0FBWXlELG1CQURaLEdBRUExRCxLQUFLLENBQUNDLEtBQU4sQ0FBWTBELGtCQVRKO0FBQUEsQ0F2REMsRUFvRUMsVUFBQTNELEtBQUs7QUFBQSxTQUFLQSxLQUFLLENBQUMrQyxLQUFOLEdBQWMsTUFBZCxHQUF1Qi9DLEtBQUssQ0FBQ2dELEtBQU4sR0FBYyxLQUFkLEdBQXNCLEtBQWxEO0FBQUEsQ0FwRU4sQ0FBWjs7OztBQXdFQSxJQUFNWSxLQUFLLEdBQUc5RCw2QkFBTytELEtBQVYsc0JBQ2QsVUFBQTdELEtBQUs7QUFBQSxTQUFLQSxLQUFLLENBQUNtQyxTQUFOLEdBQWtCbkMsS0FBSyxDQUFDQyxLQUFOLENBQVk2RCxjQUE5QixHQUErQzlELEtBQUssQ0FBQ0MsS0FBTixDQUFZNEQsS0FBaEU7QUFBQSxDQURTLENBQVg7Ozs7QUFJQSxJQUFNRSxVQUFVLEdBQUdqRSw2QkFBTytELEtBQVYsc0JBQ25CLFVBQUE3RCxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVkrRCxPQUFoQjtBQUFBLENBRGMsQ0FBaEI7Ozs7QUFJQSxJQUFNQyxRQUFRLEdBQUduRSw2QkFBT29FLFFBQVYsc0JBQ2pCLFVBQUFsRSxLQUFLO0FBQUEsU0FBS0EsS0FBSyxDQUFDbUMsU0FBTixHQUFrQm5DLEtBQUssQ0FBQ0MsS0FBTixDQUFZNkQsY0FBOUIsR0FBK0M5RCxLQUFLLENBQUNDLEtBQU4sQ0FBWTRELEtBQWhFO0FBQUEsQ0FEWSxDQUFkOzs7O0FBR0EsSUFBTU0sYUFBYSxHQUFHckUsNkJBQU9vRSxRQUFWLHNCQUN0QixVQUFBbEUsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZK0QsT0FBaEI7QUFBQSxDQURpQixDQUFuQjs7O0FBTUEsSUFBTUksV0FBVyxHQUFHLGtDQUFPUixLQUFQLENBQUgsc0JBQ3BCLFVBQUE1RCxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlvRSxXQUFoQjtBQUFBLENBRGUsQ0FBakI7OztBQUlBLElBQU1DLGlCQUFpQixHQUFHeEUsNkJBQU9TLEdBQVYsc0JBQ1IsVUFBQVAsS0FBSztBQUFBLFNBQ3ZCQSxLQUFLLENBQUN1RSxNQUFOLEdBQWV2RSxLQUFLLENBQUNDLEtBQU4sQ0FBWXVFLG9CQUEzQixHQUFrRHhFLEtBQUssQ0FBQ0MsS0FBTixDQUFZc0IsZUFEdkM7QUFBQSxDQURHLEVBS3RCLFVBQUF2QixLQUFLO0FBQUEsU0FBS0EsS0FBSyxDQUFDeUUsbUJBQU4sR0FBNEJ6RSxLQUFLLENBQUN5RSxtQkFBTixDQUEwQkMsSUFBMUIsQ0FBK0IsR0FBL0IsQ0FBNUIsR0FBa0UsYUFBdkU7QUFBQSxDQUxpQixFQVFsQixVQUFBMUUsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZMEUsaUJBQWhCO0FBQUEsQ0FSYSxFQVlkLFVBQUEzRSxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlnRCxVQUFoQjtBQUFBLENBWlMsQ0FBdkI7Ozs7QUFlQSxJQUFNMkIsbUJBQW1CLEdBQUc5RSw2QkFBT1MsR0FBVixzQkFDNUIsVUFBQVAsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZNEUsc0JBQWhCO0FBQUEsQ0FEdUIsRUFFVixVQUFBN0UsS0FBSztBQUFBLFNBQ3ZCQSxLQUFLLENBQUM4RSxJQUFOLEtBQWUsT0FBZixHQUF5QjlFLEtBQUssQ0FBQ0MsS0FBTixDQUFZOEUsdUJBQXJDLEdBQStEL0UsS0FBSyxDQUFDQyxLQUFOLENBQVlzQixlQURwRDtBQUFBLENBRkssRUFLaEIsVUFBQXZCLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWStFLGNBQWhCO0FBQUEsQ0FMVyxFQU1iLFVBQUFoRixLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlnRixpQkFBaEI7QUFBQSxDQU5RLENBQXpCOzs7O0FBYUEsSUFBTUMsV0FBVyxHQUFHcEYsNkJBQU9TLEdBQVYsc0JBT1MsVUFBQVAsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZeUMsZ0JBQWhCO0FBQUEsQ0FQZCxFQVFNLFVBQUExQyxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVl5QyxnQkFBaEI7QUFBQSxDQVJYLEVBWVUsVUFBQTFDLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWXlDLGdCQUFoQjtBQUFBLENBWmYsRUFhTyxVQUFBMUMsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZeUMsZ0JBQWhCO0FBQUEsQ0FiWixDQUFqQjs7OztBQWlCQSxJQUFNeUMsYUFBYSxHQUFHckYsNkJBQU9TLEdBQVYsc0JBSUEsVUFBQVAsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ29GLEtBQU4sQ0FBWVYsSUFBWixDQUFpQixHQUFqQixDQUFKO0FBQUEsQ0FKTCxDQUFuQjs7OztBQVFBLElBQU1XLGVBQWUsR0FBR3ZGLDZCQUFPUyxHQUFWLHNCQUd0QixVQUFBUCxLQUFLO0FBQUEsU0FBS0EsS0FBSyxDQUFDc0YsUUFBTixHQUFpQnRGLEtBQUssQ0FBQ0MsS0FBTixDQUFZd0MsYUFBN0IsR0FBNkN6QyxLQUFLLENBQUNDLEtBQU4sQ0FBWXNGLG1CQUE5RDtBQUFBLENBSGlCLEVBSWpCLFVBQUF2RixLQUFLO0FBQUEsU0FBS0EsS0FBSyxDQUFDc0YsUUFBTixHQUFpQnRGLEtBQUssQ0FBQ0MsS0FBTixDQUFZd0MsYUFBN0IsR0FBNkN6QyxLQUFLLENBQUNDLEtBQU4sQ0FBWXNGLG1CQUE5RDtBQUFBLENBSlksRUFXZixVQUFBdkYsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ3dGLFNBQU4sSUFBbUJ4RixLQUFLLENBQUNDLEtBQU4sQ0FBWXdDLGFBQW5DO0FBQUEsQ0FYVSxFQVlKLFVBQUF6QyxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDd0YsU0FBTixJQUFtQnhGLEtBQUssQ0FBQ0MsS0FBTixDQUFZd0MsYUFBbkM7QUFBQSxDQVpELENBQXJCOzs7O0FBZ0JBLElBQU1nRCxLQUFLLEdBQUczRiw2QkFBTzRGLEtBQVYsc0JBTUUsVUFBQTFGLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWTBGLGlCQUFoQjtBQUFBLENBTlAsRUFPSCxVQUFBM0YsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZMkYsWUFBaEI7QUFBQSxDQVBGLEVBZUssVUFBQTVGLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWTRGLGFBQWhCO0FBQUEsQ0FmVixDQUFYOzs7O0FBcUJBLElBQU1DLGtCQUFrQixHQUFHaEcsNkJBQU9TLEdBQVYsc0JBQ2YsVUFBQVAsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZMEYsaUJBQWhCO0FBQUEsQ0FEVSxFQUVwQixVQUFBM0YsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZOEYsV0FBaEI7QUFBQSxDQUZlLEVBTWIsVUFBQS9GLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWStGLG1CQUFoQjtBQUFBLENBTlEsRUFPaEIsVUFBQWhHLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWStGLG1CQUFoQjtBQUFBLENBUFcsRUFTM0JDLHdCQUFNQyxRQVRxQixzQkFXWCxVQUFBbEcsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZa0csMkJBQWhCO0FBQUEsQ0FYTSxFQVlkLFVBQUFuRyxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlrRywyQkFBaEI7QUFBQSxDQVpTLEVBQXhCOzs7O0FBZ0JBLElBQU1DLHdCQUF3QixHQUFHdEcsNkJBQU9TLEdBQVAsQ0FBV1MsS0FBWCxDQUFpQjtBQUN2REMsRUFBQUEsU0FBUyxFQUFFO0FBRDRDLENBQWpCLENBQUgsc0JBVS9CZ0Ysd0JBQU1JLElBVnlCLHNCQUE5Qjs7OztBQW9CQSxJQUFNQyxrQkFBa0IsR0FBR3hHLDZCQUFPUyxHQUFQLENBQVdTLEtBQVgsQ0FBaUI7QUFDakRDLEVBQUFBLFNBQVMsRUFBRTtBQURzQyxDQUFqQixDQUFILHNCQVNsQixVQUFBakIsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZc0csY0FBaEI7QUFBQSxDQVRhLEVBZ0IzQk4sd0JBQU1DLFFBaEJxQix1QkFtQjNCRCx3QkFBTUksSUFuQnFCLHNCQUF4Qjs7OztBQXdCQSxJQUFNRyx3QkFBd0IsR0FBRzFHLDZCQUFPUyxHQUFQLENBQVdTLEtBQVgsQ0FBaUI7QUFDdkRDLEVBQUFBLFNBQVMsRUFBRTtBQUQ0QyxDQUFqQixDQUFILHNCQUsxQixVQUFBakIsS0FBSztBQUFBLFNBQUtBLEtBQUssQ0FBQ3lHLEtBQU4sR0FBY3pHLEtBQUssQ0FBQ0MsS0FBTixDQUFZeUcsVUFBMUIsR0FBdUMxRyxLQUFLLENBQUNDLEtBQU4sQ0FBWXNHLGNBQXhEO0FBQUEsQ0FMcUIsQ0FBOUI7QUFRUDs7Ozs7Ozs7O0FBS08sSUFBTUksa0JBQWtCLEdBQUc3Ryw2QkFBT1MsR0FBVixxQkFBeEI7Ozs7QUFNQSxJQUFNcUcsbUJBQW1CLEdBQUc5Ryw2QkFBT1MsR0FBVixzQkFLckIsVUFBQVAsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZOEYsV0FBaEI7QUFBQSxDQUxnQixFQU9uQixVQUFBL0YsS0FBSztBQUFBLFNBQUtBLEtBQUssQ0FBQ3lCLFFBQU4sR0FBaUIsR0FBakIsR0FBdUIsQ0FBNUI7QUFBQSxDQVBjLEVBUVosVUFBQXpCLEtBQUs7QUFBQSxTQUFLQSxLQUFLLENBQUN5QixRQUFOLEdBQWlCLE1BQWpCLEdBQTBCLEtBQS9CO0FBQUEsQ0FSTyxFQWdCakIsVUFBQXpCLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWXNHLGNBQWhCO0FBQUEsQ0FoQlksRUFxQm5CLFVBQUF2RyxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVl5RyxVQUFoQjtBQUFBLENBckJjLENBQXpCOzs7O0FBa0VBLElBQU1HLG9CQUFvQixHQUFHL0csNkJBQU9TLEdBQVYsc0JBSTNCLFVBQUFQLEtBQUs7QUFBQSxTQUFLQSxLQUFLLENBQUNzRixRQUFOLEdBQWlCdEYsS0FBSyxDQUFDQyxLQUFOLENBQVl3QyxhQUE3QixHQUE2Q3pDLEtBQUssQ0FBQ0MsS0FBTixDQUFZc0YsbUJBQTlEO0FBQUEsQ0FKc0IsRUFlVCxVQUFBdkYsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZd0MsYUFBaEI7QUFBQSxDQWZJLEVBbUJwQixVQUFBekMsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZOEYsV0FBaEI7QUFBQSxDQW5CZSxFQXdCcEIsVUFBQS9GLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWUksU0FBaEI7QUFBQSxDQXhCZSxDQUExQjs7OztBQTZCQSxJQUFNeUcsVUFBVSxHQUFHaEgsNkJBQU9TLEdBQVYsc0JBR2pCLFVBQUFQLEtBQUs7QUFBQSxTQUFLQSxLQUFLLENBQUNzRixRQUFOLEdBQWlCdEYsS0FBSyxDQUFDQyxLQUFOLENBQVlxRCxrQkFBN0IsR0FBa0R0RCxLQUFLLENBQUNDLEtBQU4sQ0FBWXNGLG1CQUFuRTtBQUFBLENBSFksRUFJWixVQUFBdkYsS0FBSztBQUFBLFNBQ1pBLEtBQUssQ0FBQ3NGLFFBQU4sR0FBaUJ0RixLQUFLLENBQUNDLEtBQU4sQ0FBWXFELGtCQUE3QixHQUFrRHRELEtBQUssQ0FBQ0MsS0FBTixDQUFZc0YsbUJBRGxEO0FBQUEsQ0FKTyxFQWNWLFVBQUF2RixLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDd0YsU0FBTixJQUFtQnhGLEtBQUssQ0FBQ0MsS0FBTixDQUFZd0MsYUFBbkM7QUFBQSxDQWRLLEVBZUMsVUFBQXpDLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUN3RixTQUFOLElBQW1CeEYsS0FBSyxDQUFDQyxLQUFOLENBQVl3QyxhQUFuQztBQUFBLENBZk4sQ0FBaEI7Ozs7QUFtQkEsSUFBTXNFLGVBQWUsR0FBR2pILDZCQUFPUyxHQUFWLHFCQUFyQjs7OztBQUlBLElBQU15RyxpQkFBaUIsR0FBR2xILDZCQUFPUyxHQUFWLHNCQUNSLFVBQUFQLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWXNCLGVBQWhCO0FBQUEsQ0FERyxFQUVqQixVQUFBdkIsS0FBSztBQUFBLG1CQUFPQSxLQUFLLENBQUNDLEtBQU4sQ0FBWWdILGlCQUFuQixnQkFBMENqSCxLQUFLLENBQUNDLEtBQU4sQ0FBWWlILGlCQUF0RDtBQUFBLENBRlksRUFJZCxVQUFBbEgsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZa0gsY0FBaEI7QUFBQSxDQUpTLENBQXZCOzs7QUFPQSxJQUFNQyxnQkFBZ0IsR0FBRyxrQ0FBT3BGLE1BQVAsRUFBZWhCLEtBQWYsQ0FBcUI7QUFDbkRDLEVBQUFBLFNBQVMsRUFBRTtBQUR3QyxDQUFyQixDQUFILHNCQVFQLFVBQUFqQixLQUFLO0FBQUEsU0FDdkJBLEtBQUssQ0FBQ3VFLE1BQU4sR0FBZXZFLEtBQUssQ0FBQ0MsS0FBTixDQUFZb0QsbUJBQTNCLEdBQWlEckQsS0FBSyxDQUFDQyxLQUFOLENBQVl1QyxjQUR0QztBQUFBLENBUkUsRUFVbEIsVUFBQXhDLEtBQUs7QUFBQSxTQUNaQSxLQUFLLENBQUN1RSxNQUFOLEdBQWV2RSxLQUFLLENBQUNDLEtBQU4sQ0FBWXlELG1CQUEzQixHQUFpRDFELEtBQUssQ0FBQ0MsS0FBTixDQUFZNEMsZ0JBRGpEO0FBQUEsQ0FWYSxFQWlCTCxVQUFBN0MsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZb0QsbUJBQWhCO0FBQUEsQ0FqQkEsRUFrQmhCLFVBQUFyRCxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVl5RCxtQkFBaEI7QUFBQSxDQWxCVyxDQUF0Qjs7O0FBeUJBLElBQU0yRCxtQkFBbUIsR0FBR3ZILDZCQUFPUyxHQUFWLHNCQUNWLFVBQUFQLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWXNCLGVBQWhCO0FBQUEsQ0FESyxDQUF6QiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAyMCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IFJlYWN0VG9vbHRpcCBmcm9tICdyZWFjdC10b29sdGlwJztcbmltcG9ydCB7bWVkaWF9IGZyb20gJ3N0eWxlcy9tZWRpYS1icmVha3BvaW50cyc7XG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuZXhwb3J0IGNvbnN0IFNlbGVjdFRleHQgPSBzdHlsZWQuc3BhbmBcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubGFiZWxDb2xvcn07XG4gIGZvbnQtc2l6ZTogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zZWxlY3RGb250U2l6ZX07XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG5cbiAgaSB7XG4gICAgZm9udC1zaXplOiAxM3B4O1xuICAgIG1hcmdpbi1yaWdodDogNnB4O1xuICB9XG5gO1xuXG5leHBvcnQgY29uc3QgU2VsZWN0VGV4dEJvbGQgPSBzdHlsZWQoU2VsZWN0VGV4dClgXG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvcn07XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG5gO1xuXG5leHBvcnQgY29uc3QgSWNvblJvdW5kU21hbGwgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICB3aWR0aDogMThweDtcbiAgaGVpZ2h0OiAxOHB4O1xuICBib3JkZXItcmFkaXVzOiA5cHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT5cbiAgICBwcm9wcy50aGVtZS5zZWNvbmRhcnlCdG5CZ2RIb3Zlcn07IC8vIHVwZGF0ZWQgYWZ0ZXIgY2hlY2tpbmcgc2tldGNoIGZpbGVcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2Vjb25kYXJ5QnRuQ29sb3J9O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblxuICA6aG92ZXIge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNlY29uZGFyeUJ0bkJnZEhvdmVyfTtcbiAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IENlbnRlckZsZXhib3ggPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuYDtcblxuZXhwb3J0IGNvbnN0IENlbnRlclZlcnRpY2FsRmxleGJveCA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5gO1xuXG5leHBvcnQgY29uc3QgU3BhY2VCZXR3ZWVuRmxleGJveCA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgbWFyZ2luLWxlZnQ6IC0xNnB4O1xuYDtcblxuZXhwb3J0IGNvbnN0IFNCRmxleGJveEl0ZW0gPSBzdHlsZWQuZGl2YFxuICBmbGV4LWdyb3c6IDE7XG4gIG1hcmdpbi1sZWZ0OiAxNnB4O1xuYDtcblxuZXhwb3J0IGNvbnN0IFBhbmVsTGFiZWwgPSBzdHlsZWQubGFiZWwuYXR0cnMoe1xuICBjbGFzc05hbWU6ICdzaWRlLXBhbmVsLXBhbmVsX19sYWJlbCdcbn0pYFxuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5sYWJlbENvbG9yfTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBmb250LXNpemU6IDExcHg7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIG1hcmdpbi1ib3R0b206IDRweDtcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG5gO1xuXG5leHBvcnQgY29uc3QgUGFuZWxMYWJlbFdyYXBwZXIgPSBzdHlsZWQuZGl2LmF0dHJzKHtcbiAgY2xhc3NOYW1lOiAnc2lkZS1wYW5lbC1wYW5lbF9fbGFiZWwtd3JhcHBlcidcbn0pYFxuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogc2VsZi1zdGFydDtcbmA7XG5cbmV4cG9ydCBjb25zdCBQYW5lbExhYmVsQm9sZCA9IHN0eWxlZChQYW5lbExhYmVsKWBcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbmA7XG5cbmV4cG9ydCBjb25zdCBQYW5lbEhlYWRlclRpdGxlID0gc3R5bGVkLnNwYW4uYXR0cnMoe1xuICBjbGFzc05hbWU6ICdzaWRlLXBhbmVsLXBhbmVsX19oZWFkZXJfX3RpdGxlJ1xufSlgXG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvcn07XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuNDNweDtcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG5gO1xuXG5leHBvcnQgY29uc3QgUGFuZWxIZWFkZXJDb250ZW50ID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9yfTtcbiAgcGFkZGluZy1sZWZ0OiAxMnB4O1xuXG4gIC5pY29uIHtcbiAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5sYWJlbENvbG9yfTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgbWFyZ2luLXJpZ2h0OiAxMnB4O1xuICB9XG5gO1xuXG5leHBvcnQgY29uc3QgUGFuZWxDb250ZW50ID0gc3R5bGVkLmRpdi5hdHRycyh7XG4gIGNsYXNzTmFtZTogJ3NpZGUtcGFuZWwtcGFuZWxfX2NvbnRlbnQnXG59KWBcbiAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wYW5lbEJhY2tncm91bmR9O1xuICBwYWRkaW5nOiAxMnB4O1xuYDtcblxuZXhwb3J0IGNvbnN0IFNpZGVQYW5lbFNlY3Rpb24gPSBzdHlsZWQuZGl2LmF0dHJzKHtcbiAgY2xhc3NOYW1lOiAnc2lkZS1wYW5lbC1zZWN0aW9uJ1xufSlgXG4gIG1hcmdpbi1ib3R0b206IDEycHg7XG4gIG9wYWNpdHk6ICR7cHJvcHMgPT4gKHByb3BzLmRpc2FibGVkID8gMC40IDogMSl9O1xuICBwb2ludGVyLWV2ZW50czogJHtwcm9wcyA9PiAocHJvcHMuZGlzYWJsZWQgPyAnbm9uZScgOiAnYWxsJyl9O1xuYDtcblxuZXhwb3J0IGNvbnN0IFNpZGVQYW5lbERpdmlkZXIgPSBzdHlsZWQuZGl2LmF0dHJzKHtcbiAgY2xhc3NOYW1lOiAnc2lkZS1wYW5lbC1kaXZpZGVyJ1xufSlgXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAke3Byb3BzID0+IHByb3BzLnRoZW1lLnBhbmVsQm9yZGVyQ29sb3J9O1xuICBoZWlnaHQ6IDEycHg7XG4gIG1hcmdpbi1ib3R0b206IDEycHg7XG5gO1xuXG5leHBvcnQgY29uc3QgVG9vbHRpcCA9IHN0eWxlZChSZWFjdFRvb2x0aXApYFxuICAmLl9fcmVhY3RfY29tcG9uZW50X3Rvb2x0aXAge1xuICAgIGZvbnQtc2l6ZTogOS41cHg7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICBwYWRkaW5nOiA3cHggMThweDtcblxuICAgICYudHlwZS1kYXJrIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudG9vbHRpcEJnfTtcbiAgICAgIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRvb2x0aXBDb2xvcn07XG4gICAgICAmLnBsYWNlLWJvdHRvbSB7XG4gICAgICAgIDphZnRlciB7XG4gICAgICAgICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50b29sdGlwQmd9O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgICYucGxhY2UtdG9wIHtcbiAgICAgICAgOmFmdGVyIHtcbiAgICAgICAgICBib3JkZXItdG9wLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRvb2x0aXBCZ307XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgJi5wbGFjZS1yaWdodCB7XG4gICAgICAgIDphZnRlciB7XG4gICAgICAgICAgYm9yZGVyLXJpZ2h0LWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRvb2x0aXBCZ307XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgJi5wbGFjZS1sZWZ0IHtcbiAgICAgICAgOmFmdGVyIHtcbiAgICAgICAgICBib3JkZXItbGVmdC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50b29sdGlwQmd9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5gO1xuXG5leHBvcnQgY29uc3QgQnV0dG9uID0gc3R5bGVkLmRpdi5hdHRycyhwcm9wcyA9PiAoe1xuICBjbGFzc05hbWU6IGNsYXNzbmFtZXMoJ2J1dHRvbicsIHByb3BzLmNsYXNzTmFtZSlcbn0pKWBcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PlxuICAgIHByb3BzLm5lZ2F0aXZlXG4gICAgICA/IHByb3BzLnRoZW1lLm5lZ2F0aXZlQnRuQmdkXG4gICAgICA6IHByb3BzLnNlY29uZGFyeVxuICAgICAgPyBwcm9wcy50aGVtZS5zZWNvbmRhcnlCdG5CZ2RcbiAgICAgIDogcHJvcHMubGlua1xuICAgICAgPyBwcm9wcy50aGVtZS5saW5rQnRuQmdkXG4gICAgICA6IHByb3BzLmZsb2F0aW5nXG4gICAgICA/IHByb3BzLnRoZW1lLmZsb2F0aW5nQnRuQmdkXG4gICAgICA6IHByb3BzLnRoZW1lLnByaW1hcnlCdG5CZ2R9O1xuICBib3JkZXItcmFkaXVzOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnByaW1hcnlCdG5SYWRpdXN9O1xuICBjb2xvcjogJHtwcm9wcyA9PlxuICAgIHByb3BzLm5lZ2F0aXZlXG4gICAgICA/IHByb3BzLnRoZW1lLm5lZ2F0aXZlQnRuQ29sb3JcbiAgICAgIDogcHJvcHMuc2Vjb25kYXJ5XG4gICAgICA/IHByb3BzLnRoZW1lLnNlY29uZGFyeUJ0bkNvbG9yXG4gICAgICA6IHByb3BzLmxpbmtcbiAgICAgID8gcHJvcHMudGhlbWUubGlua0J0bkNvbG9yXG4gICAgICA6IHByb3BzLmZsb2F0aW5nXG4gICAgICA/IHByb3BzLnRoZW1lLmZsb2F0aW5nQnRuQ29sb3JcbiAgICAgIDogcHJvcHMudGhlbWUucHJpbWFyeUJ0bkNvbG9yfTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgZm9udC1zaXplOiAke3Byb3BzID0+IChwcm9wcy5sYXJnZSA/ICcxNHB4JyA6IHByb3BzLnNtYWxsID8gJzEwcHgnIDogJzExcHgnKX07XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBsZXR0ZXItc3BhY2luZzogMC4zcHg7XG4gIGxpbmUtaGVpZ2h0OiAxNHB4O1xuICBvdXRsaW5lOiAwO1xuICBwYWRkaW5nOiAke3Byb3BzID0+IChwcm9wcy5sYXJnZSA/ICcxNHB4IDMycHgnIDogcHJvcHMuc21hbGwgPyAnNnB4IDlweCcgOiAnOXB4IDEycHgnKX07XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgdHJhbnNpdGlvbjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50cmFuc2l0aW9ufTtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgd2lkdGg6ICR7cHJvcHMgPT4gcHJvcHMud2lkdGggfHwgJ2F1dG8nfTtcbiAgb3BhY2l0eTogJHtwcm9wcyA9PiAocHJvcHMuZGlzYWJsZWQgPyAwLjQgOiAxKX07XG4gIHBvaW50ZXItZXZlbnRzOiAke3Byb3BzID0+IChwcm9wcy5kaXNhYmxlZCA/ICdub25lJyA6ICdhbGwnKX07XG5cbiAgOmhvdmVyLFxuICA6Zm9jdXMsXG4gIDphY3RpdmUsXG4gICYuYWN0aXZlIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+XG4gICAgICBwcm9wcy5uZWdhdGl2ZVxuICAgICAgICA/IHByb3BzLnRoZW1lLm5lZ2F0aXZlQnRuQmdkSG92ZXJcbiAgICAgICAgOiBwcm9wcy5zZWNvbmRhcnlcbiAgICAgICAgPyBwcm9wcy50aGVtZS5zZWNvbmRhcnlCdG5CZ2RIb3ZlclxuICAgICAgICA6IHByb3BzLmxpbmtcbiAgICAgICAgPyBwcm9wcy50aGVtZS5saW5rQnRuQWN0QmdkSG92ZXJcbiAgICAgICAgOiBwcm9wcy5mbG9hdGluZ1xuICAgICAgICA/IHByb3BzLnRoZW1lLmZsb2F0aW5nQnRuQmdkSG92ZXJcbiAgICAgICAgOiBwcm9wcy50aGVtZS5wcmltYXJ5QnRuQmdkSG92ZXJ9O1xuICAgIGNvbG9yOiAke3Byb3BzID0+XG4gICAgICBwcm9wcy5uZWdhdGl2ZVxuICAgICAgICA/IHByb3BzLnRoZW1lLm5lZ2F0aXZlQnRuQWN0Q29sb3JcbiAgICAgICAgOiBwcm9wcy5zZWNvbmRhcnlcbiAgICAgICAgPyBwcm9wcy50aGVtZS5zZWNvbmRhcnlCdG5BY3RDb2xvclxuICAgICAgICA6IHByb3BzLmxpbmtcbiAgICAgICAgPyBwcm9wcy50aGVtZS5saW5rQnRuQWN0Q29sb3JcbiAgICAgICAgOiBwcm9wcy5mbG9hdGluZ1xuICAgICAgICA/IHByb3BzLnRoZW1lLmZsb2F0aW5nQnRuQWN0Q29sb3JcbiAgICAgICAgOiBwcm9wcy50aGVtZS5wcmltYXJ5QnRuQWN0Q29sb3J9O1xuICB9XG5cbiAgc3ZnIHtcbiAgICBtYXJnaW4tcmlnaHQ6ICR7cHJvcHMgPT4gKHByb3BzLmxhcmdlID8gJzEwcHgnIDogcHJvcHMuc21hbGwgPyAnNnB4JyA6ICc4cHgnKX07XG4gIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBJbnB1dCA9IHN0eWxlZC5pbnB1dGBcbiAgJHtwcm9wcyA9PiAocHJvcHMuc2Vjb25kYXJ5ID8gcHJvcHMudGhlbWUuc2Vjb25kYXJ5SW5wdXQgOiBwcm9wcy50aGVtZS5pbnB1dCl9O1xuYDtcblxuZXhwb3J0IGNvbnN0IElucHV0TGlnaHQgPSBzdHlsZWQuaW5wdXRgXG4gICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuaW5wdXRMVH1cbmA7XG5cbmV4cG9ydCBjb25zdCBUZXh0QXJlYSA9IHN0eWxlZC50ZXh0YXJlYWBcbiAgJHtwcm9wcyA9PiAocHJvcHMuc2Vjb25kYXJ5ID8gcHJvcHMudGhlbWUuc2Vjb25kYXJ5SW5wdXQgOiBwcm9wcy50aGVtZS5pbnB1dCl9O1xuYDtcbmV4cG9ydCBjb25zdCBUZXh0QXJlYUxpZ2h0ID0gc3R5bGVkLnRleHRhcmVhYFxuICAke3Byb3BzID0+IHByb3BzLnRoZW1lLmlucHV0TFR9XG4gIGhlaWdodDogYXV0bztcbiAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xuYDtcblxuZXhwb3J0IGNvbnN0IElubGluZUlucHV0ID0gc3R5bGVkKElucHV0KWBcbiAgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5pbmxpbmVJbnB1dH07XG5gO1xuXG5leHBvcnQgY29uc3QgU3R5bGVkUGFuZWxIZWFkZXIgPSBzdHlsZWQuZGl2YFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+XG4gICAgcHJvcHMuYWN0aXZlID8gcHJvcHMudGhlbWUucGFuZWxCYWNrZ3JvdW5kSG92ZXIgOiBwcm9wcy50aGVtZS5wYW5lbEJhY2tncm91bmR9O1xuICBib3JkZXItbGVmdDogM3B4IHNvbGlkXG4gICAgcmdiKFxuICAgICAgJHtwcm9wcyA9PiAocHJvcHMubGFiZWxSQ0dDb2xvclZhbHVlcyA/IHByb3BzLmxhYmVsUkNHQ29sb3JWYWx1ZXMuam9pbignLCcpIDogJ3RyYW5zcGFyZW50Jyl9XG4gICAgKTtcbiAgcGFkZGluZzogMCAxMHB4IDAgMDtcbiAgaGVpZ2h0OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnBhbmVsSGVhZGVySGVpZ2h0fXB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHRyYW5zaXRpb246ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudHJhbnNpdGlvbn07XG5gO1xuXG5leHBvcnQgY29uc3QgU3R5bGVkUGFuZWxEcm9wZG93biA9IHN0eWxlZC5kaXZgXG4gICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucGFuZWxEcm9wZG93blNjcm9sbEJhcn1cbiAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PlxuICAgIHByb3BzLnR5cGUgPT09ICdsaWdodCcgPyBwcm9wcy50aGVtZS5tb2RhbERyb3Bkb3duQmFja2dyb3VuZCA6IHByb3BzLnRoZW1lLnBhbmVsQmFja2dyb3VuZH07XG4gIG92ZXJmbG93LXk6IGF1dG87XG4gIGJveC1zaGFkb3c6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucGFuZWxCb3hTaGFkb3d9O1xuICBib3JkZXItcmFkaXVzOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnBhbmVsQm9yZGVyUmFkaXVzfTtcbiAgbWFyZ2luLXRvcDogMnB4O1xuICBtYXgtaGVpZ2h0OiA1MDBweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB6LWluZGV4OiA5OTk7XG5gO1xuXG5leHBvcnQgY29uc3QgQnV0dG9uR3JvdXAgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICAuYnV0dG9uIHtcbiAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgIG1hcmdpbi1sZWZ0OiAycHg7XG4gIH1cbiAgLmJ1dHRvbjpmaXJzdC1jaGlsZCB7XG4gICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wcmltYXJ5QnRuUmFkaXVzfTtcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnByaW1hcnlCdG5SYWRpdXN9O1xuICAgIG1hcmdpbi1sZWZ0OiAwO1xuICB9XG4gIC5idXR0b246bGFzdC1jaGlsZCB7XG4gICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucHJpbWFyeUJ0blJhZGl1c307XG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucHJpbWFyeUJ0blJhZGl1c307XG4gIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBEYXRhc2V0U3F1YXJlID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB3aWR0aDogOHB4O1xuICBoZWlnaHQ6IDhweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKCR7cHJvcHMgPT4gcHJvcHMuY29sb3Iuam9pbignLCcpfSk7XG4gIG1hcmdpbi1yaWdodDogMTJweDtcbmA7XG5cbmV4cG9ydCBjb25zdCBTZWxlY3Rpb25CdXR0b24gPSBzdHlsZWQuZGl2YFxuICBib3JkZXItcmFkaXVzOiAycHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkXG4gICAgJHtwcm9wcyA9PiAocHJvcHMuc2VsZWN0ZWQgPyBwcm9wcy50aGVtZS5wcmltYXJ5QnRuQmdkIDogcHJvcHMudGhlbWUuc2VsZWN0Qm9yZGVyQ29sb3JMVCl9O1xuICBjb2xvcjogJHtwcm9wcyA9PiAocHJvcHMuc2VsZWN0ZWQgPyBwcm9wcy50aGVtZS5wcmltYXJ5QnRuQmdkIDogcHJvcHMudGhlbWUuc2VsZWN0Qm9yZGVyQ29sb3JMVCl9O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIG1hcmdpbi1yaWdodDogNnB4O1xuICBwYWRkaW5nOiA2cHggMTBweDtcblxuICA6aG92ZXIge1xuICAgIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLmF2YWlsYWJsZSAmJiBwcm9wcy50aGVtZS5wcmltYXJ5QnRuQmdkfTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAke3Byb3BzID0+IHByb3BzLmF2YWlsYWJsZSAmJiBwcm9wcy50aGVtZS5wcmltYXJ5QnRuQmdkfTtcbiAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFRhYmxlID0gc3R5bGVkLnRhYmxlYFxuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyLXNwYWNpbmc6IDA7XG5cbiAgdGhlYWQge1xuICAgIHRyIHRoIHtcbiAgICAgIGJhY2tncm91bmQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucGFuZWxCYWNrZ3JvdW5kTFR9O1xuICAgICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGl0bGVDb2xvckxUfTtcbiAgICAgIHBhZGRpbmc6IDE4cHggMTJweDtcbiAgICAgIHRleHQtYWxpZ246IHN0YXJ0O1xuICAgIH1cbiAgfVxuXG4gIHRib2R5IHtcbiAgICB0ciB0ZCB7XG4gICAgICBib3JkZXItYm90dG9tOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnBhbmVsQm9yZGVyTFR9O1xuICAgICAgcGFkZGluZzogMTJweDtcbiAgICB9XG4gIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBTdHlsZWRNb2RhbENvbnRlbnQgPSBzdHlsZWQuZGl2YFxuICBiYWNrZ3JvdW5kOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnBhbmVsQmFja2dyb3VuZExUfTtcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9yTFR9O1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBmb250LXNpemU6IDEwcHg7XG4gIHBhZGRpbmc6IDI0cHggJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5tb2RhbExhdGVyYWxQYWRkaW5nfTtcbiAgbWFyZ2luOiAwIC0ke3Byb3BzID0+IHByb3BzLnRoZW1lLm1vZGFsTGF0ZXJhbFBhZGRpbmd9O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICR7bWVkaWEucG9ydGFibGVgXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBwYWRkaW5nOiAxNnB4ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubW9kYWxQb3J0YWJsZUxhdGVyYWxQYWRkaW5nfTtcbiAgICBtYXJnaW46IDAgLSR7cHJvcHMgPT4gcHJvcHMudGhlbWUubW9kYWxQb3J0YWJsZUxhdGVyYWxQYWRkaW5nfTtcbiAgYH07XG5gO1xuXG5leHBvcnQgY29uc3QgU3R5bGVkTW9kYWxWZXJ0aWNhbFBhbmVsID0gc3R5bGVkLmRpdi5hdHRycyh7XG4gIGNsYXNzTmFtZTogJ21vZGFsLXZlcnRpY2FsLXBhbmVsJ1xufSlgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICBmb250LXNpemU6IDEycHg7XG5cbiAgLm1vZGFsLXNlY3Rpb246Zmlyc3QtY2hpbGQge1xuICAgIG1hcmdpbi10b3A6IDI0cHg7XG4gICAgJHttZWRpYS5wYWxtYFxuICAgICAgbWFyZ2luLXRvcDogMDtcbiAgICBgfTtcbiAgfVxuXG4gIGlucHV0IHtcbiAgICBtYXJnaW4tcmlnaHQ6IDhweDtcbiAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFN0eWxlZE1vZGFsU2VjdGlvbiA9IHN0eWxlZC5kaXYuYXR0cnMoe1xuICBjbGFzc05hbWU6ICdtb2RhbC1zZWN0aW9uJ1xufSlgXG4gIG1hcmdpbi1ib3R0b206IDMycHg7XG5cbiAgLm1vZGFsLXNlY3Rpb24tdGl0bGUge1xuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIH1cbiAgLm1vZGFsLXNlY3Rpb24tc3VidGl0bGUge1xuICAgIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnN1YnRleHRDb2xvckxUfTtcbiAgfVxuXG4gIGlucHV0IHtcbiAgICBtYXJnaW4tdG9wOiA4cHg7XG4gIH1cblxuICAke21lZGlhLnBvcnRhYmxlYFxuICAgIG1hcmdpbi1ib3R0b206IDI0cHg7XG4gIGB9O1xuICAke21lZGlhLnBhbG1gXG4gICAgbWFyZ2luLWJvdHRvbTogMTZweDtcbiAgYH07XG5gO1xuXG5leHBvcnQgY29uc3QgU3R5bGVkTW9kYWxJbnB1dEZvb3Rub3RlID0gc3R5bGVkLmRpdi5hdHRycyh7XG4gIGNsYXNzTmFtZTogJ21vZGFsLWlucHV0X19mb290bm90ZSdcbn0pYFxuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICBjb2xvcjogJHtwcm9wcyA9PiAocHJvcHMuZXJyb3IgPyBwcm9wcy50aGVtZS5lcnJvckNvbG9yIDogcHJvcHMudGhlbWUuc3VidGV4dENvbG9yTFQpfTtcbiAgZm9udC1zaXplOiAxMHB4O1xuYDtcbi8qKlxuICogTmV3ZXIgdmVyc2lvbnMgb2YgbWFwYm94LmdsIGRpc3BsYXkgYW4gZXJyb3IgbWVzc2FnZSBiYW5uZXIgb24gdG9wIG9mIHRoZSBtYXAgYnkgZGVmYXVsdFxuICogd2hpY2ggd2lsbCBjYXVzZSB0aGUgbWFwIHRvIGRpc3BsYXkgcG9pbnRzIGluIHRoZSB3cm9uZyBsb2NhdGlvbnNcbiAqIFRoaXMgd29ya2Fyb3VuZCB3aWxsIGhpZGUgdGhlIGVycm9yIGJhbm5lci5cbiAqL1xuZXhwb3J0IGNvbnN0IFN0eWxlZE1hcENvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIC5tYXBib3hnbC1tYXAgLm1hcGJveGdsLW1pc3NpbmctY3NzIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG5gO1xuXG5leHBvcnQgY29uc3QgU3R5bGVkRXhwb3J0U2VjdGlvbiA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIG1hcmdpbjogMzVweCAwO1xuICB3aWR0aDogMTAwJTtcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9yTFR9O1xuICBmb250LXNpemU6IDEycHg7XG4gIG9wYWNpdHk6ICR7cHJvcHMgPT4gKHByb3BzLmRpc2FibGVkID8gMC4zIDogMSl9O1xuICBwb2ludGVyLWV2ZW50czogJHtwcm9wcyA9PiAocHJvcHMuZGlzYWJsZWQgPyAnbm9uZScgOiAnYWxsJyl9O1xuXG4gIC5kZXNjcmlwdGlvbiB7XG4gICAgd2lkdGg6IDE4NXB4O1xuICAgIC50aXRsZSB7XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgIH1cbiAgICAuc3VidGl0bGUge1xuICAgICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc3VidGV4dENvbG9yTFR9O1xuICAgICAgZm9udC1zaXplOiAxMXB4O1xuICAgIH1cbiAgfVxuICAud2FybmluZyB7XG4gICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZXJyb3JDb2xvcn07XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgfVxuICAuZGVzY3JpcHRpb24uZnVsbCB7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cbiAgLnNlbGVjdGlvbiB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgZmxleDogMTtcbiAgICBwYWRkaW5nLWxlZnQ6IDUwcHg7XG5cbiAgICBzZWxlY3Qge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgICBib3JkZXItcmFkaXVzOiAxcHg7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICBmb250OiBpbmhlcml0O1xuICAgICAgbGluZS1oZWlnaHQ6IDEuNWVtO1xuICAgICAgcGFkZGluZzogMC41ZW0gMy41ZW0gMC41ZW0gMWVtO1xuICAgICAgbWFyZ2luOiAwO1xuICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgIGFwcGVhcmFuY2U6IG5vbmU7XG4gICAgICB3aWR0aDogMjUwcHg7XG4gICAgICBoZWlnaHQ6IDM2cHg7XG5cbiAgICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgdHJhbnNwYXJlbnQgNTAlLCBncmF5IDUwJSksXG4gICAgICAgIGxpbmVhci1ncmFkaWVudCgxMzVkZWcsIGdyYXkgNTAlLCB0cmFuc3BhcmVudCA1MCUpLCBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICNjY2MsICNjY2MpO1xuICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2FsYygxMDAlIC0gMjBweCkgY2FsYygxZW0gKyAycHgpLCBjYWxjKDEwMCUgLSAxNXB4KSBjYWxjKDFlbSArIDJweCksXG4gICAgICAgIGNhbGMoMTAwJSAtIDIuNWVtKSA0LjVlbTtcbiAgICAgIGJhY2tncm91bmQtc2l6ZTogNXB4IDVweCwgNXB4IDVweCwgMXB4IDEuNWVtO1xuICAgICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgICB9XG5cbiAgICBzZWxlY3Q6Zm9jdXMge1xuICAgICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCBncmVlbiA1MCUsIHRyYW5zcGFyZW50IDUwJSksXG4gICAgICAgIGxpbmVhci1ncmFkaWVudCgxMzVkZWcsIHRyYW5zcGFyZW50IDUwJSwgZ3JlZW4gNTAlKSwgbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCAjY2NjLCAjY2NjKTtcbiAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNhbGMoMTAwJSAtIDE1cHgpIDFlbSwgY2FsYygxMDAlIC0gMjBweCkgMWVtLCBjYWxjKDEwMCUgLSAyLjVlbSkgNC41ZW07XG4gICAgICBiYWNrZ3JvdW5kLXNpemU6IDVweCA1cHgsIDVweCA1cHgsIDFweCAxLjVlbTtcbiAgICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gICAgICBib3JkZXItY29sb3I6IGdyZWVuO1xuICAgICAgb3V0bGluZTogMDtcbiAgICB9XG4gIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBTdHlsZWRGaWx0ZXJlZE9wdGlvbiA9IHN0eWxlZC5kaXZgXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgYm9yZGVyOiAxcHggc29saWRcbiAgICAke3Byb3BzID0+IChwcm9wcy5zZWxlY3RlZCA/IHByb3BzLnRoZW1lLnByaW1hcnlCdG5CZ2QgOiBwcm9wcy50aGVtZS5zZWxlY3RCb3JkZXJDb2xvckxUKX07XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgaGVpZ2h0OiA2MHB4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgbWFyZ2luOiA0cHg7XG4gIHBhZGRpbmc6IDhweCAxMnB4O1xuICB3aWR0aDogMTQwcHg7XG5cbiAgOmhvdmVyIHtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAke3Byb3BzID0+IHByb3BzLnRoZW1lLnByaW1hcnlCdG5CZ2R9O1xuICB9XG5cbiAgLmZpbHRlci1vcHRpb24tdGl0bGUge1xuICAgIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvckxUfTtcbiAgICBmb250LXNpemU6IDEycHg7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgfVxuICAuZmlsdGVyLW9wdGlvbi1zdWJ0aXRsZSB7XG4gICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9yfTtcbiAgICBmb250LXNpemU6IDExcHg7XG4gIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBTdHlsZWRUeXBlID0gc3R5bGVkLmRpdmBcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xuICBib3JkZXI6IDFweCBzb2xpZFxuICAgICR7cHJvcHMgPT4gKHByb3BzLnNlbGVjdGVkID8gcHJvcHMudGhlbWUucHJpbWFyeUJ0bkJnZEhvdmVyIDogcHJvcHMudGhlbWUuc2VsZWN0Qm9yZGVyQ29sb3JMVCl9O1xuICBjb2xvcjogJHtwcm9wcyA9PlxuICAgIHByb3BzLnNlbGVjdGVkID8gcHJvcHMudGhlbWUucHJpbWFyeUJ0bkJnZEhvdmVyIDogcHJvcHMudGhlbWUuc2VsZWN0Qm9yZGVyQ29sb3JMVH07XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgaGVpZ2h0OiAxMDBweDtcbiAgbWFyZ2luOiA0cHg7XG4gIHBhZGRpbmc6IDZweCAxMHB4O1xuICB3aWR0aDogMTAwcHg7XG5cbiAgOmhvdmVyIHtcbiAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy5hdmFpbGFibGUgJiYgcHJvcHMudGhlbWUucHJpbWFyeUJ0bkJnZH07XG4gICAgYm9yZGVyOiAxcHggc29saWQgJHtwcm9wcyA9PiBwcm9wcy5hdmFpbGFibGUgJiYgcHJvcHMudGhlbWUucHJpbWFyeUJ0bkJnZH07XG4gIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBXaWRnZXRDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICB6LWluZGV4OiAxO1xuYDtcblxuZXhwb3J0IGNvbnN0IEJvdHRvbVdpZGdldElubmVyID0gc3R5bGVkLmRpdmBcbiAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wYW5lbEJhY2tncm91bmR9O1xuICBwYWRkaW5nOiAke3Byb3BzID0+IGAke3Byb3BzLnRoZW1lLmJvdHRvbUlubmVyUGRWZXJ0fXB4ICR7cHJvcHMudGhlbWUuYm90dG9tSW5uZXJQZFNpZGV9cHhgfTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBtYXJnaW4tdG9wOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmJvdHRvbVBhbmVsR2FwfXB4O1xuYDtcblxuZXhwb3J0IGNvbnN0IE1hcENvbnRyb2xCdXR0b24gPSBzdHlsZWQoQnV0dG9uKS5hdHRycyh7XG4gIGNsYXNzTmFtZTogJ21hcC1jb250cm9sLWJ1dHRvbidcbn0pYFxuICBib3gtc2hhZG93OiAwIDZweCAxMnB4IDAgcmdiYSgwLCAwLCAwLCAwLjE2KTtcbiAgaGVpZ2h0OiAzMnB4O1xuICB3aWR0aDogMzJweDtcbiAgcGFkZGluZzogMDtcbiAgYm9yZGVyLXJhZGl1czogMDtcbiAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PlxuICAgIHByb3BzLmFjdGl2ZSA/IHByb3BzLnRoZW1lLmZsb2F0aW5nQnRuQmdkSG92ZXIgOiBwcm9wcy50aGVtZS5mbG9hdGluZ0J0bkJnZH07XG4gIGNvbG9yOiAke3Byb3BzID0+XG4gICAgcHJvcHMuYWN0aXZlID8gcHJvcHMudGhlbWUuZmxvYXRpbmdCdG5BY3RDb2xvciA6IHByb3BzLnRoZW1lLmZsb2F0aW5nQnRuQ29sb3J9O1xuXG4gIDpob3ZlcixcbiAgOmZvY3VzLFxuICA6YWN0aXZlLFxuICAmLmFjdGl2ZSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5mbG9hdGluZ0J0bkJnZEhvdmVyfTtcbiAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5mbG9hdGluZ0J0bkFjdENvbG9yfTtcbiAgfVxuICBzdmcge1xuICAgIG1hcmdpbi1yaWdodDogMDtcbiAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFN0eWxlZEZpbHRlckNvbnRlbnQgPSBzdHlsZWQuZGl2YFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnBhbmVsQmFja2dyb3VuZH07XG4gIHBhZGRpbmc6IDEycHg7XG5gO1xuIl19