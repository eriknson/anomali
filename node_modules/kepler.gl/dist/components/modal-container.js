"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ModalContainerFactory;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

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

var _styledComponents = require("styled-components");

var _reactDom = require("react-dom");

var _reselect = require("reselect");

var _lodash = _interopRequireDefault(require("lodash.get"));

var _modalDialog = _interopRequireDefault(require("./modals/modal-dialog"));

var _schemas = _interopRequireDefault(require("../schemas"));

var _exportUtils = require("../utils/export-utils");

var _mapInfoUtils = require("../utils/map-info-utils");

var _deleteDataModal = _interopRequireDefault(require("./modals/delete-data-modal"));

var _overwriteMapModal = _interopRequireDefault(require("./modals/overwrite-map-modal"));

var _dataTableModal = _interopRequireDefault(require("./modals/data-table-modal"));

var _loadDataModal = _interopRequireDefault(require("./modals/load-data-modal"));

var _exportImageModal = _interopRequireDefault(require("./modals/export-image-modal"));

var _exportDataModal = _interopRequireDefault(require("./modals/export-data-modal"));

var _exportMapModal = _interopRequireDefault(require("./modals/export-map-modal/export-map-modal"));

var _addMapStyleModal = _interopRequireDefault(require("./modals/add-map-style-modal"));

var _saveMapModal = _interopRequireDefault(require("./modals/save-map-modal"));

var _shareMapModal = _interopRequireDefault(require("./modals/share-map-modal"));

var _mediaBreakpoints = require("../styles/media-breakpoints");

var _defaultSettings = require("../constants/default-settings");

function _templateObject8() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n                width: ", "px;\n              "]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n              ", ";\n              ", "\n            "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  max-width: 960px;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  top: 60px;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  width: 40%;\n  padding: 40px 40px 32px 40px;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n    padding: 0;\n    margin: 0 auto;\n  "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n    padding: 0;\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  top: 80px;\n  padding: 32px 0 0 0;\n  width: 90vw;\n  max-width: 90vw;\n\n  ", "\n\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var DataTableModalStyle = (0, _styledComponents.css)(_templateObject(), _mediaBreakpoints.media.portable(_templateObject2()), _mediaBreakpoints.media.palm(_templateObject3()));
var smallModalCss = (0, _styledComponents.css)(_templateObject4());
var LoadDataModalStyle = (0, _styledComponents.css)(_templateObject5());
var DefaultStyle = (0, _styledComponents.css)(_templateObject6());
ModalContainerFactory.deps = [_deleteDataModal["default"], _overwriteMapModal["default"], _dataTableModal["default"], _loadDataModal["default"], _exportImageModal["default"], _exportDataModal["default"], _exportMapModal["default"], _addMapStyleModal["default"], _modalDialog["default"], _saveMapModal["default"], _shareMapModal["default"]];

function ModalContainerFactory(DeleteDatasetModal, OverWriteMapModal, DataTableModal, LoadDataModal, ExportImageModal, ExportDataModal, ExportMapModal, AddMapStyleModal, ModalDialog, SaveMapModal, ShareMapModal) {
  var ModalWrapper =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2["default"])(ModalWrapper, _Component);

    function ModalWrapper() {
      var _getPrototypeOf2;

      var _this;

      (0, _classCallCheck2["default"])(this, ModalWrapper);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(ModalWrapper)).call.apply(_getPrototypeOf2, [this].concat(args)));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "cloudProviders", function (props) {
        return props.cloudProviders;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "providerWithStorage", (0, _reselect.createSelector)(_this.cloudProviders, function (cloudProviders) {
        return cloudProviders.filter(function (p) {
          return p.hasPrivateStorage();
        });
      }));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "providerWithShare", (0, _reselect.createSelector)(_this.cloudProviders, function (cloudProviders) {
        return cloudProviders.filter(function (p) {
          return p.hasSharingUrl();
        });
      }));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_closeModal", function () {
        _this.props.uiStateActions.toggleModal(null);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_deleteDataset", function (key) {
        _this.props.visStateActions.removeDataset(key);

        _this._closeModal();
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onAddCustomMapStyle", function () {
        _this.props.mapStyleActions.addCustomMapStyle();

        _this._closeModal();
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onFileUpload", function (blob) {
        _this.props.visStateActions.loadFiles(blob);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onExportImage", function () {
        if (!_this.props.uiState.exportImage.exporting) {
          (0, _exportUtils.exportImage)(_this.props, _this.props.uiState.exportImage);

          _this.props.uiStateActions.cleanupExportImage();

          _this._closeModal();
        }
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onExportData", function () {
        (0, _exportUtils.exportData)(_this.props, _this.props.uiState.exportData);

        _this._closeModal();
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onExportMap", function () {
        var uiState = _this.props.uiState;
        var format = uiState.exportMap.format;
        (format === _defaultSettings.EXPORT_MAP_FORMATS.HTML ? _exportUtils.exportHtml : _exportUtils.exportJson)(_this.props, _this.props.uiState.exportMap[format] || {});

        _this._closeModal();
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_exportFileToCloud", function (_ref) {
        var provider = _ref.provider,
            isPublic = _ref.isPublic,
            overwrite = _ref.overwrite,
            closeModal = _ref.closeModal;
        var toSave = (0, _exportUtils.exportMap)(_this.props);

        _this.props.providerActions.exportFileToCloud({
          mapData: toSave,
          provider: provider,
          options: {
            isPublic: isPublic,
            overwrite: overwrite
          },
          closeModal: closeModal,
          onSuccess: _this.props.onExportToCloudSuccess,
          onError: _this.props.onExportToCloudError
        });
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onSaveMap", function () {
        var overwrite = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var currentProvider = _this.props.providerState.currentProvider;

        var provider = _this.props.cloudProviders.find(function (p) {
          return p.name === currentProvider;
        });

        _this._exportFileToCloud({
          provider: provider,
          isPublic: false,
          overwrite: overwrite,
          closeModal: true
        });
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onOverwriteMap", function () {
        _this._onSaveMap(true);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onShareMapUrl", function (provider) {
        _this._exportFileToCloud({
          provider: provider,
          isPublic: true,
          overwrite: false,
          closeModal: false
        });
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onCloseSaveMap", function () {
        _this.props.providerActions.resetProviderStatus();

        _this._closeModal();
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onLoadCloudMap", function (payload) {
        _this.props.providerActions.loadCloudMap(_objectSpread({}, payload, {
          onSuccess: _this.props.onLoadCloudMapSuccess,
          onError: _this.props.onLoadCloudMapError
        }));
      });
      return _this;
    }

    (0, _createClass2["default"])(ModalWrapper, [{
      key: "render",

      /* eslint-disable complexity */
      value: function render() {
        var _this2 = this;

        var _this$props = this.props,
            containerW = _this$props.containerW,
            containerH = _this$props.containerH,
            mapStyle = _this$props.mapStyle,
            mapState = _this$props.mapState,
            uiState = _this$props.uiState,
            visState = _this$props.visState,
            rootNode = _this$props.rootNode,
            visStateActions = _this$props.visStateActions,
            uiStateActions = _this$props.uiStateActions,
            providerState = _this$props.providerState;
        var currentModal = uiState.currentModal,
            datasetKeyToRemove = uiState.datasetKeyToRemove;
        var datasets = visState.datasets,
            layers = visState.layers,
            editingDataset = visState.editingDataset;
        var template = null;
        var modalProps = {};

        if (currentModal && currentModal.id && currentModal.template) {
          // if currentMdoal template is already provided
          // TODO: need to check whether template is valid
          template = _react["default"].createElement(currentModal.template, null);
          modalProps = currentModal.modalProps;
        } else {
          switch (currentModal) {
            case _defaultSettings.DATA_TABLE_ID:
              var width = containerW * 0.9;
              template = _react["default"].createElement(DataTableModal, {
                width: containerW * 0.9,
                height: containerH * 0.85,
                datasets: datasets,
                dataId: editingDataset,
                showDatasetTable: visStateActions.showDatasetTable,
                sortTableColumn: visStateActions.sortTableColumn,
                pinTableColumn: visStateActions.pinTableColumn,
                copyTableColumn: visStateActions.copyTableColumn
              }); // TODO: we need to make this width consistent with the css rule defined modal.js:32 max-width: 70vw

              modalProps.cssStyle = (0, _styledComponents.css)(_templateObject7(), DataTableModalStyle, _mediaBreakpoints.media.palm(_templateObject8(), width));
              break;

            case _defaultSettings.DELETE_DATA_ID:
              // validate options
              if (datasetKeyToRemove && datasets && datasets[datasetKeyToRemove]) {
                template = _react["default"].createElement(DeleteDatasetModal, {
                  dataset: datasets[datasetKeyToRemove],
                  layers: layers
                });
                modalProps = {
                  title: 'modal.title.deleteDataset',
                  cssStyle: smallModalCss,
                  footer: true,
                  onConfirm: function onConfirm() {
                    return _this2._deleteDataset(datasetKeyToRemove);
                  },
                  onCancel: this._closeModal,
                  confirmButton: {
                    negative: true,
                    large: true,
                    children: 'modal.button.delete'
                  }
                };
              }

              break;
            // in case we add a new case after this one

            case _defaultSettings.ADD_DATA_ID:
              template = _react["default"].createElement(LoadDataModal, (0, _extends2["default"])({}, providerState, {
                onClose: this._closeModal,
                onFileUpload: this._onFileUpload,
                onLoadCloudMap: this._onLoadCloudMap,
                cloudProviders: this.providerWithStorage(this.props),
                onSetCloudProvider: this.props.providerActions.setCloudProvider,
                getSavedMaps: this.props.providerActions.getSavedMaps,
                loadFiles: uiState.loadFiles
              }, uiState.loadFiles));
              modalProps = {
                title: 'modal.title.addDataToMap',
                cssStyle: LoadDataModalStyle,
                footer: false,
                onConfirm: this._closeModal
              };
              break;

            case _defaultSettings.EXPORT_IMAGE_ID:
              template = _react["default"].createElement(ExportImageModal, {
                exportImage: uiState.exportImage,
                mapW: containerW,
                mapH: containerH,
                onUpdateSetting: uiStateActions.setExportImageSetting
              });
              modalProps = {
                title: 'modal.title.exportImage',
                footer: true,
                onCancel: this._closeModal,
                onConfirm: this._onExportImage,
                confirmButton: {
                  large: true,
                  disabled: uiState.exportImage.exporting,
                  children: 'modal.button.download'
                }
              };
              break;

            case _defaultSettings.EXPORT_DATA_ID:
              template = _react["default"].createElement(ExportDataModal, (0, _extends2["default"])({}, uiState.exportData, {
                datasets: datasets,
                applyCPUFilter: this.props.visStateActions.applyCPUFilter,
                onClose: this._closeModal,
                onChangeExportDataType: uiStateActions.setExportDataType,
                onChangeExportSelectedDataset: uiStateActions.setExportSelectedDataset,
                onChangeExportFiltered: uiStateActions.setExportFiltered
              }));
              modalProps = {
                title: 'modal.title.exportData',
                footer: true,
                onCancel: this._closeModal,
                onConfirm: this._onExportData,
                confirmButton: {
                  large: true,
                  children: 'modal.button.export'
                }
              };
              break;

            case _defaultSettings.EXPORT_MAP_ID:
              var keplerGlConfig = _schemas["default"].getConfigToSave({
                mapStyle: mapStyle,
                visState: visState,
                mapState: mapState,
                uiState: uiState
              });

              template = _react["default"].createElement(ExportMapModal, {
                config: keplerGlConfig,
                options: uiState.exportMap,
                onChangeExportMapFormat: uiStateActions.setExportMapFormat,
                onEditUserMapboxAccessToken: uiStateActions.setUserMapboxAccessToken,
                onChangeExportMapHTMLMode: uiStateActions.setExportHTMLMapMode
              });
              modalProps = {
                title: 'modal.title.exportMap',
                footer: true,
                onCancel: this._closeModal,
                onConfirm: this._onExportMap,
                confirmButton: {
                  large: true,
                  children: 'modal.button.export'
                }
              };
              break;

            case _defaultSettings.ADD_MAP_STYLE_ID:
              template = _react["default"].createElement(AddMapStyleModal, {
                mapboxApiAccessToken: this.props.mapboxApiAccessToken,
                mapboxApiUrl: this.props.mapboxApiUrl,
                mapState: this.props.mapState,
                inputStyle: mapStyle.inputStyle,
                inputMapStyle: this.props.mapStyleActions.inputMapStyle,
                loadCustomMapStyle: this.props.mapStyleActions.loadCustomMapStyle
              });
              modalProps = {
                title: 'modal.title.addCustomMapboxStyle',
                footer: true,
                onCancel: this._closeModal,
                onConfirm: this._onAddCustomMapStyle,
                confirmButton: {
                  large: true,
                  disabled: !mapStyle.inputStyle.style,
                  children: 'modal.button.addStyle'
                }
              };
              break;

            case _defaultSettings.SAVE_MAP_ID:
              template = _react["default"].createElement(SaveMapModal, (0, _extends2["default"])({}, providerState, {
                exportImage: uiState.exportImage,
                mapInfo: visState.mapInfo,
                onSetMapInfo: visStateActions.setMapInfo,
                onUpdateImageSetting: uiStateActions.setExportImageSetting,
                cloudProviders: this.providerWithStorage(this.props),
                onSetCloudProvider: this.props.providerActions.setCloudProvider
              }));
              modalProps = {
                title: 'modal.title.saveMap',
                footer: true,
                onCancel: this._closeModal,
                onConfirm: function onConfirm() {
                  return _this2._onSaveMap(false);
                },
                confirmButton: {
                  large: true,
                  disabled: uiState.exportImage.exporting || !(0, _mapInfoUtils.isValidMapInfo)(visState.mapInfo) || !providerState.currentProvider,
                  children: 'modal.button.save'
                }
              };
              break;

            case _defaultSettings.OVERWRITE_MAP_ID:
              template = _react["default"].createElement(OverWriteMapModal, (0, _extends2["default"])({}, providerState, {
                cloudProviders: this.props.cloudProviders,
                title: (0, _lodash["default"])(visState, ['mapInfo', 'title']),
                onSetCloudProvider: this.props.providerActions.setCloudProvider,
                onUpdateImageSetting: uiStateActions.setExportImageSetting
              }));
              modalProps = {
                title: 'Overwrite Existing File?',
                cssStyle: smallModalCss,
                footer: true,
                onConfirm: this._onOverwriteMap,
                onCancel: this._closeModal,
                confirmButton: {
                  large: true,
                  children: 'Yes',
                  disabled: uiState.exportImage.exporting || !(0, _mapInfoUtils.isValidMapInfo)(visState.mapInfo) || !providerState.currentProvider
                }
              };
              break;

            case _defaultSettings.SHARE_MAP_ID:
              template = _react["default"].createElement(ShareMapModal, (0, _extends2["default"])({}, providerState, {
                isReady: !uiState.exportImage.exporting,
                cloudProviders: this.providerWithShare(this.props),
                onExport: this._onShareMapUrl,
                onSetCloudProvider: this.props.providerActions.setCloudProvider,
                onUpdateImageSetting: uiStateActions.setExportImageSetting
              }));
              modalProps = {
                title: 'modal.title.shareURL',
                onCancel: this._onCloseSaveMap
              };
              break;

            default:
              break;
          }
        }

        return this.props.rootNode ? _react["default"].createElement(ModalDialog, (0, _extends2["default"])({
          parentSelector: function parentSelector() {
            return (0, _reactDom.findDOMNode)(rootNode);
          },
          isOpen: Boolean(currentModal),
          onCancel: this._closeModal
        }, modalProps, {
          cssStyle: DefaultStyle.concat(modalProps.cssStyle || '')
        }), template) : null;
      }
      /* eslint-enable complexity */

    }]);
    return ModalWrapper;
  }(_react.Component);

  (0, _defineProperty2["default"])(ModalWrapper, "propTypes", {
    rootNode: _propTypes["default"].object,
    containerW: _propTypes["default"].number,
    containerH: _propTypes["default"].number,
    mapboxApiAccessToken: _propTypes["default"].string.isRequired,
    mapboxApiUrl: _propTypes["default"].string,
    mapState: _propTypes["default"].object.isRequired,
    mapStyle: _propTypes["default"].object.isRequired,
    uiState: _propTypes["default"].object.isRequired,
    visState: _propTypes["default"].object.isRequired,
    visStateActions: _propTypes["default"].object.isRequired,
    uiStateActions: _propTypes["default"].object.isRequired,
    mapStyleActions: _propTypes["default"].object.isRequired,
    onSaveToStorage: _propTypes["default"].func,
    cloudProviders: _propTypes["default"].arrayOf(_propTypes["default"].object)
  });
  return ModalWrapper;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL21vZGFsLWNvbnRhaW5lci5qcyJdLCJuYW1lcyI6WyJEYXRhVGFibGVNb2RhbFN0eWxlIiwiY3NzIiwibWVkaWEiLCJwb3J0YWJsZSIsInBhbG0iLCJzbWFsbE1vZGFsQ3NzIiwiTG9hZERhdGFNb2RhbFN0eWxlIiwiRGVmYXVsdFN0eWxlIiwiTW9kYWxDb250YWluZXJGYWN0b3J5IiwiZGVwcyIsIkRlbGV0ZURhdGFzZXRNb2RhbEZhY3RvcnkiLCJPdmVyV3JpdGVNYXBNb2RhbEZhY3RvcnkiLCJEYXRhVGFibGVNb2RhbEZhY3RvcnkiLCJMb2FkRGF0YU1vZGFsRmFjdG9yeSIsIkV4cG9ydEltYWdlTW9kYWxGYWN0b3J5IiwiRXhwb3J0RGF0YU1vZGFsRmFjdG9yeSIsIkV4cG9ydE1hcE1vZGFsRmFjdG9yeSIsIkFkZE1hcFN0eWxlTW9kYWxGYWN0b3J5IiwiTW9kYWxEaWFsb2dGYWN0b3J5IiwiU2F2ZU1hcE1vZGFsRmFjdG9yeSIsIlNoYXJlTWFwTW9kYWxGYWN0b3J5IiwiRGVsZXRlRGF0YXNldE1vZGFsIiwiT3ZlcldyaXRlTWFwTW9kYWwiLCJEYXRhVGFibGVNb2RhbCIsIkxvYWREYXRhTW9kYWwiLCJFeHBvcnRJbWFnZU1vZGFsIiwiRXhwb3J0RGF0YU1vZGFsIiwiRXhwb3J0TWFwTW9kYWwiLCJBZGRNYXBTdHlsZU1vZGFsIiwiTW9kYWxEaWFsb2ciLCJTYXZlTWFwTW9kYWwiLCJTaGFyZU1hcE1vZGFsIiwiTW9kYWxXcmFwcGVyIiwicHJvcHMiLCJjbG91ZFByb3ZpZGVycyIsImZpbHRlciIsInAiLCJoYXNQcml2YXRlU3RvcmFnZSIsImhhc1NoYXJpbmdVcmwiLCJ1aVN0YXRlQWN0aW9ucyIsInRvZ2dsZU1vZGFsIiwia2V5IiwidmlzU3RhdGVBY3Rpb25zIiwicmVtb3ZlRGF0YXNldCIsIl9jbG9zZU1vZGFsIiwibWFwU3R5bGVBY3Rpb25zIiwiYWRkQ3VzdG9tTWFwU3R5bGUiLCJibG9iIiwibG9hZEZpbGVzIiwidWlTdGF0ZSIsImV4cG9ydEltYWdlIiwiZXhwb3J0aW5nIiwiY2xlYW51cEV4cG9ydEltYWdlIiwiZXhwb3J0RGF0YSIsImZvcm1hdCIsImV4cG9ydE1hcCIsIkVYUE9SVF9NQVBfRk9STUFUUyIsIkhUTUwiLCJleHBvcnRIdG1sIiwiZXhwb3J0SnNvbiIsInByb3ZpZGVyIiwiaXNQdWJsaWMiLCJvdmVyd3JpdGUiLCJjbG9zZU1vZGFsIiwidG9TYXZlIiwicHJvdmlkZXJBY3Rpb25zIiwiZXhwb3J0RmlsZVRvQ2xvdWQiLCJtYXBEYXRhIiwib3B0aW9ucyIsIm9uU3VjY2VzcyIsIm9uRXhwb3J0VG9DbG91ZFN1Y2Nlc3MiLCJvbkVycm9yIiwib25FeHBvcnRUb0Nsb3VkRXJyb3IiLCJjdXJyZW50UHJvdmlkZXIiLCJwcm92aWRlclN0YXRlIiwiZmluZCIsIm5hbWUiLCJfZXhwb3J0RmlsZVRvQ2xvdWQiLCJfb25TYXZlTWFwIiwicmVzZXRQcm92aWRlclN0YXR1cyIsInBheWxvYWQiLCJsb2FkQ2xvdWRNYXAiLCJvbkxvYWRDbG91ZE1hcFN1Y2Nlc3MiLCJvbkxvYWRDbG91ZE1hcEVycm9yIiwiY29udGFpbmVyVyIsImNvbnRhaW5lckgiLCJtYXBTdHlsZSIsIm1hcFN0YXRlIiwidmlzU3RhdGUiLCJyb290Tm9kZSIsImN1cnJlbnRNb2RhbCIsImRhdGFzZXRLZXlUb1JlbW92ZSIsImRhdGFzZXRzIiwibGF5ZXJzIiwiZWRpdGluZ0RhdGFzZXQiLCJ0ZW1wbGF0ZSIsIm1vZGFsUHJvcHMiLCJpZCIsIkRBVEFfVEFCTEVfSUQiLCJ3aWR0aCIsInNob3dEYXRhc2V0VGFibGUiLCJzb3J0VGFibGVDb2x1bW4iLCJwaW5UYWJsZUNvbHVtbiIsImNvcHlUYWJsZUNvbHVtbiIsImNzc1N0eWxlIiwiREVMRVRFX0RBVEFfSUQiLCJ0aXRsZSIsImZvb3RlciIsIm9uQ29uZmlybSIsIl9kZWxldGVEYXRhc2V0Iiwib25DYW5jZWwiLCJjb25maXJtQnV0dG9uIiwibmVnYXRpdmUiLCJsYXJnZSIsImNoaWxkcmVuIiwiQUREX0RBVEFfSUQiLCJfb25GaWxlVXBsb2FkIiwiX29uTG9hZENsb3VkTWFwIiwicHJvdmlkZXJXaXRoU3RvcmFnZSIsInNldENsb3VkUHJvdmlkZXIiLCJnZXRTYXZlZE1hcHMiLCJFWFBPUlRfSU1BR0VfSUQiLCJzZXRFeHBvcnRJbWFnZVNldHRpbmciLCJfb25FeHBvcnRJbWFnZSIsImRpc2FibGVkIiwiRVhQT1JUX0RBVEFfSUQiLCJhcHBseUNQVUZpbHRlciIsInNldEV4cG9ydERhdGFUeXBlIiwic2V0RXhwb3J0U2VsZWN0ZWREYXRhc2V0Iiwic2V0RXhwb3J0RmlsdGVyZWQiLCJfb25FeHBvcnREYXRhIiwiRVhQT1JUX01BUF9JRCIsImtlcGxlckdsQ29uZmlnIiwiS2VwbGVyR2xTY2hlbWEiLCJnZXRDb25maWdUb1NhdmUiLCJzZXRFeHBvcnRNYXBGb3JtYXQiLCJzZXRVc2VyTWFwYm94QWNjZXNzVG9rZW4iLCJzZXRFeHBvcnRIVE1MTWFwTW9kZSIsIl9vbkV4cG9ydE1hcCIsIkFERF9NQVBfU1RZTEVfSUQiLCJtYXBib3hBcGlBY2Nlc3NUb2tlbiIsIm1hcGJveEFwaVVybCIsImlucHV0U3R5bGUiLCJpbnB1dE1hcFN0eWxlIiwibG9hZEN1c3RvbU1hcFN0eWxlIiwiX29uQWRkQ3VzdG9tTWFwU3R5bGUiLCJzdHlsZSIsIlNBVkVfTUFQX0lEIiwibWFwSW5mbyIsInNldE1hcEluZm8iLCJPVkVSV1JJVEVfTUFQX0lEIiwiX29uT3ZlcndyaXRlTWFwIiwiU0hBUkVfTUFQX0lEIiwicHJvdmlkZXJXaXRoU2hhcmUiLCJfb25TaGFyZU1hcFVybCIsIl9vbkNsb3NlU2F2ZU1hcCIsIkJvb2xlYW4iLCJjb25jYXQiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJvYmplY3QiLCJudW1iZXIiLCJzdHJpbmciLCJpc1JlcXVpcmVkIiwib25TYXZlVG9TdG9yYWdlIiwiZnVuYyIsImFycmF5T2YiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JB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QUFBLG1DQUNNOUgsWUFETixlQUVxQjtBQUNqQnlELElBQUFBLFFBQVEsRUFBRXNFLHNCQUFVQyxNQURIO0FBRWpCNUUsSUFBQUEsVUFBVSxFQUFFMkUsc0JBQVVFLE1BRkw7QUFHakI1RSxJQUFBQSxVQUFVLEVBQUUwRSxzQkFBVUUsTUFITDtBQUlqQnJCLElBQUFBLG9CQUFvQixFQUFFbUIsc0JBQVVHLE1BQVYsQ0FBaUJDLFVBSnRCO0FBS2pCdEIsSUFBQUEsWUFBWSxFQUFFa0Isc0JBQVVHLE1BTFA7QUFNakIzRSxJQUFBQSxRQUFRLEVBQUV3RSxzQkFBVUMsTUFBVixDQUFpQkcsVUFOVjtBQU9qQjdFLElBQUFBLFFBQVEsRUFBRXlFLHNCQUFVQyxNQUFWLENBQWlCRyxVQVBWO0FBUWpCbEgsSUFBQUEsT0FBTyxFQUFFOEcsc0JBQVVDLE1BQVYsQ0FBaUJHLFVBUlQ7QUFTakIzRSxJQUFBQSxRQUFRLEVBQUV1RSxzQkFBVUMsTUFBVixDQUFpQkcsVUFUVjtBQVVqQnpILElBQUFBLGVBQWUsRUFBRXFILHNCQUFVQyxNQUFWLENBQWlCRyxVQVZqQjtBQVdqQjVILElBQUFBLGNBQWMsRUFBRXdILHNCQUFVQyxNQUFWLENBQWlCRyxVQVhoQjtBQVlqQnRILElBQUFBLGVBQWUsRUFBRWtILHNCQUFVQyxNQUFWLENBQWlCRyxVQVpqQjtBQWFqQkMsSUFBQUEsZUFBZSxFQUFFTCxzQkFBVU0sSUFiVjtBQWNqQm5JLElBQUFBLGNBQWMsRUFBRTZILHNCQUFVTyxPQUFWLENBQWtCUCxzQkFBVUMsTUFBNUI7QUFkQyxHQUZyQjtBQXFZQSxTQUFPaEksWUFBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDIwIFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHtjc3N9IGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7ZmluZERPTU5vZGV9IGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQge2NyZWF0ZVNlbGVjdG9yfSBmcm9tICdyZXNlbGVjdCc7XG5pbXBvcnQgZ2V0IGZyb20gJ2xvZGFzaC5nZXQnO1xuXG5pbXBvcnQgTW9kYWxEaWFsb2dGYWN0b3J5IGZyb20gJy4vbW9kYWxzL21vZGFsLWRpYWxvZyc7XG5pbXBvcnQgS2VwbGVyR2xTY2hlbWEgZnJvbSAnc2NoZW1hcyc7XG5pbXBvcnQge2V4cG9ydEpzb24sIGV4cG9ydEh0bWwsIGV4cG9ydERhdGEsIGV4cG9ydEltYWdlLCBleHBvcnRNYXB9IGZyb20gJ3V0aWxzL2V4cG9ydC11dGlscyc7XG5pbXBvcnQge2lzVmFsaWRNYXBJbmZvfSBmcm9tICd1dGlscy9tYXAtaW5mby11dGlscyc7XG5cbi8vIG1vZGFsc1xuaW1wb3J0IERlbGV0ZURhdGFzZXRNb2RhbEZhY3RvcnkgZnJvbSAnLi9tb2RhbHMvZGVsZXRlLWRhdGEtbW9kYWwnO1xuaW1wb3J0IE92ZXJXcml0ZU1hcE1vZGFsRmFjdG9yeSBmcm9tICcuL21vZGFscy9vdmVyd3JpdGUtbWFwLW1vZGFsJztcbmltcG9ydCBEYXRhVGFibGVNb2RhbEZhY3RvcnkgZnJvbSAnLi9tb2RhbHMvZGF0YS10YWJsZS1tb2RhbCc7XG5pbXBvcnQgTG9hZERhdGFNb2RhbEZhY3RvcnkgZnJvbSAnLi9tb2RhbHMvbG9hZC1kYXRhLW1vZGFsJztcbmltcG9ydCBFeHBvcnRJbWFnZU1vZGFsRmFjdG9yeSBmcm9tICcuL21vZGFscy9leHBvcnQtaW1hZ2UtbW9kYWwnO1xuaW1wb3J0IEV4cG9ydERhdGFNb2RhbEZhY3RvcnkgZnJvbSAnLi9tb2RhbHMvZXhwb3J0LWRhdGEtbW9kYWwnO1xuaW1wb3J0IEV4cG9ydE1hcE1vZGFsRmFjdG9yeSBmcm9tICcuL21vZGFscy9leHBvcnQtbWFwLW1vZGFsL2V4cG9ydC1tYXAtbW9kYWwnO1xuaW1wb3J0IEFkZE1hcFN0eWxlTW9kYWxGYWN0b3J5IGZyb20gJy4vbW9kYWxzL2FkZC1tYXAtc3R5bGUtbW9kYWwnO1xuaW1wb3J0IFNhdmVNYXBNb2RhbEZhY3RvcnkgZnJvbSAnLi9tb2RhbHMvc2F2ZS1tYXAtbW9kYWwnO1xuaW1wb3J0IFNoYXJlTWFwTW9kYWxGYWN0b3J5IGZyb20gJy4vbW9kYWxzL3NoYXJlLW1hcC1tb2RhbCc7XG5cbi8vIEJyZWFrcG9pbnRzXG5pbXBvcnQge21lZGlhfSBmcm9tICdzdHlsZXMvbWVkaWEtYnJlYWtwb2ludHMnO1xuXG4vLyBUZW1wbGF0ZVxuaW1wb3J0IHtcbiAgQUREX0RBVEFfSUQsXG4gIERBVEFfVEFCTEVfSUQsXG4gIERFTEVURV9EQVRBX0lELFxuICBFWFBPUlRfREFUQV9JRCxcbiAgRVhQT1JUX0lNQUdFX0lELFxuICBFWFBPUlRfTUFQX0lELFxuICBBRERfTUFQX1NUWUxFX0lELFxuICBTQVZFX01BUF9JRCxcbiAgU0hBUkVfTUFQX0lELFxuICBPVkVSV1JJVEVfTUFQX0lEXG59IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcbmltcG9ydCB7RVhQT1JUX01BUF9GT1JNQVRTfSBmcm9tICcuLi9jb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5cbmNvbnN0IERhdGFUYWJsZU1vZGFsU3R5bGUgPSBjc3NgXG4gIHRvcDogODBweDtcbiAgcGFkZGluZzogMzJweCAwIDAgMDtcbiAgd2lkdGg6IDkwdnc7XG4gIG1heC13aWR0aDogOTB2dztcblxuICAke21lZGlhLnBvcnRhYmxlYFxuICAgIHBhZGRpbmc6IDA7XG4gIGB9XG5cbiAgJHttZWRpYS5wYWxtYFxuICAgIHBhZGRpbmc6IDA7XG4gICAgbWFyZ2luOiAwIGF1dG87XG4gIGB9XG5gO1xuY29uc3Qgc21hbGxNb2RhbENzcyA9IGNzc2BcbiAgd2lkdGg6IDQwJTtcbiAgcGFkZGluZzogNDBweCA0MHB4IDMycHggNDBweDtcbmA7XG5cbmNvbnN0IExvYWREYXRhTW9kYWxTdHlsZSA9IGNzc2BcbiAgdG9wOiA2MHB4O1xuYDtcblxuY29uc3QgRGVmYXVsdFN0eWxlID0gY3NzYFxuICBtYXgtd2lkdGg6IDk2MHB4O1xuYDtcblxuTW9kYWxDb250YWluZXJGYWN0b3J5LmRlcHMgPSBbXG4gIERlbGV0ZURhdGFzZXRNb2RhbEZhY3RvcnksXG4gIE92ZXJXcml0ZU1hcE1vZGFsRmFjdG9yeSxcbiAgRGF0YVRhYmxlTW9kYWxGYWN0b3J5LFxuICBMb2FkRGF0YU1vZGFsRmFjdG9yeSxcbiAgRXhwb3J0SW1hZ2VNb2RhbEZhY3RvcnksXG4gIEV4cG9ydERhdGFNb2RhbEZhY3RvcnksXG4gIEV4cG9ydE1hcE1vZGFsRmFjdG9yeSxcbiAgQWRkTWFwU3R5bGVNb2RhbEZhY3RvcnksXG4gIE1vZGFsRGlhbG9nRmFjdG9yeSxcbiAgU2F2ZU1hcE1vZGFsRmFjdG9yeSxcbiAgU2hhcmVNYXBNb2RhbEZhY3Rvcnlcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE1vZGFsQ29udGFpbmVyRmFjdG9yeShcbiAgRGVsZXRlRGF0YXNldE1vZGFsLFxuICBPdmVyV3JpdGVNYXBNb2RhbCxcbiAgRGF0YVRhYmxlTW9kYWwsXG4gIExvYWREYXRhTW9kYWwsXG4gIEV4cG9ydEltYWdlTW9kYWwsXG4gIEV4cG9ydERhdGFNb2RhbCxcbiAgRXhwb3J0TWFwTW9kYWwsXG4gIEFkZE1hcFN0eWxlTW9kYWwsXG4gIE1vZGFsRGlhbG9nLFxuICBTYXZlTWFwTW9kYWwsXG4gIFNoYXJlTWFwTW9kYWxcbikge1xuICBjbGFzcyBNb2RhbFdyYXBwZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICByb290Tm9kZTogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgIGNvbnRhaW5lclc6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICBjb250YWluZXJIOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgbWFwYm94QXBpQWNjZXNzVG9rZW46IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgIG1hcGJveEFwaVVybDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIG1hcFN0YXRlOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICBtYXBTdHlsZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgdWlTdGF0ZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgdmlzU3RhdGU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgIHZpc1N0YXRlQWN0aW9uczogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgdWlTdGF0ZUFjdGlvbnM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgIG1hcFN0eWxlQWN0aW9uczogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgb25TYXZlVG9TdG9yYWdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgIGNsb3VkUHJvdmlkZXJzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub2JqZWN0KVxuICAgIH07XG4gICAgY2xvdWRQcm92aWRlcnMgPSBwcm9wcyA9PiBwcm9wcy5jbG91ZFByb3ZpZGVycztcbiAgICBwcm92aWRlcldpdGhTdG9yYWdlID0gY3JlYXRlU2VsZWN0b3IodGhpcy5jbG91ZFByb3ZpZGVycywgY2xvdWRQcm92aWRlcnMgPT5cbiAgICAgIGNsb3VkUHJvdmlkZXJzLmZpbHRlcihwID0+IHAuaGFzUHJpdmF0ZVN0b3JhZ2UoKSlcbiAgICApO1xuICAgIHByb3ZpZGVyV2l0aFNoYXJlID0gY3JlYXRlU2VsZWN0b3IodGhpcy5jbG91ZFByb3ZpZGVycywgY2xvdWRQcm92aWRlcnMgPT5cbiAgICAgIGNsb3VkUHJvdmlkZXJzLmZpbHRlcihwID0+IHAuaGFzU2hhcmluZ1VybCgpKVxuICAgICk7XG4gICAgX2Nsb3NlTW9kYWwgPSAoKSA9PiB7XG4gICAgICB0aGlzLnByb3BzLnVpU3RhdGVBY3Rpb25zLnRvZ2dsZU1vZGFsKG51bGwpO1xuICAgIH07XG5cbiAgICBfZGVsZXRlRGF0YXNldCA9IGtleSA9PiB7XG4gICAgICB0aGlzLnByb3BzLnZpc1N0YXRlQWN0aW9ucy5yZW1vdmVEYXRhc2V0KGtleSk7XG4gICAgICB0aGlzLl9jbG9zZU1vZGFsKCk7XG4gICAgfTtcblxuICAgIF9vbkFkZEN1c3RvbU1hcFN0eWxlID0gKCkgPT4ge1xuICAgICAgdGhpcy5wcm9wcy5tYXBTdHlsZUFjdGlvbnMuYWRkQ3VzdG9tTWFwU3R5bGUoKTtcbiAgICAgIHRoaXMuX2Nsb3NlTW9kYWwoKTtcbiAgICB9O1xuXG4gICAgX29uRmlsZVVwbG9hZCA9IGJsb2IgPT4ge1xuICAgICAgdGhpcy5wcm9wcy52aXNTdGF0ZUFjdGlvbnMubG9hZEZpbGVzKGJsb2IpO1xuICAgIH07XG5cbiAgICBfb25FeHBvcnRJbWFnZSA9ICgpID0+IHtcbiAgICAgIGlmICghdGhpcy5wcm9wcy51aVN0YXRlLmV4cG9ydEltYWdlLmV4cG9ydGluZykge1xuICAgICAgICBleHBvcnRJbWFnZSh0aGlzLnByb3BzLCB0aGlzLnByb3BzLnVpU3RhdGUuZXhwb3J0SW1hZ2UpO1xuICAgICAgICB0aGlzLnByb3BzLnVpU3RhdGVBY3Rpb25zLmNsZWFudXBFeHBvcnRJbWFnZSgpO1xuICAgICAgICB0aGlzLl9jbG9zZU1vZGFsKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9vbkV4cG9ydERhdGEgPSAoKSA9PiB7XG4gICAgICBleHBvcnREYXRhKHRoaXMucHJvcHMsIHRoaXMucHJvcHMudWlTdGF0ZS5leHBvcnREYXRhKTtcbiAgICAgIHRoaXMuX2Nsb3NlTW9kYWwoKTtcbiAgICB9O1xuXG4gICAgX29uRXhwb3J0TWFwID0gKCkgPT4ge1xuICAgICAgY29uc3Qge3VpU3RhdGV9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IHtmb3JtYXR9ID0gdWlTdGF0ZS5leHBvcnRNYXA7XG4gICAgICAoZm9ybWF0ID09PSBFWFBPUlRfTUFQX0ZPUk1BVFMuSFRNTCA/IGV4cG9ydEh0bWwgOiBleHBvcnRKc29uKShcbiAgICAgICAgdGhpcy5wcm9wcyxcbiAgICAgICAgdGhpcy5wcm9wcy51aVN0YXRlLmV4cG9ydE1hcFtmb3JtYXRdIHx8IHt9XG4gICAgICApO1xuICAgICAgdGhpcy5fY2xvc2VNb2RhbCgpO1xuICAgIH07XG5cbiAgICBfZXhwb3J0RmlsZVRvQ2xvdWQgPSAoe3Byb3ZpZGVyLCBpc1B1YmxpYywgb3ZlcndyaXRlLCBjbG9zZU1vZGFsfSkgPT4ge1xuICAgICAgY29uc3QgdG9TYXZlID0gZXhwb3J0TWFwKHRoaXMucHJvcHMpO1xuXG4gICAgICB0aGlzLnByb3BzLnByb3ZpZGVyQWN0aW9ucy5leHBvcnRGaWxlVG9DbG91ZCh7XG4gICAgICAgIG1hcERhdGE6IHRvU2F2ZSxcbiAgICAgICAgcHJvdmlkZXIsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBpc1B1YmxpYyxcbiAgICAgICAgICBvdmVyd3JpdGVcbiAgICAgICAgfSxcbiAgICAgICAgY2xvc2VNb2RhbCxcbiAgICAgICAgb25TdWNjZXNzOiB0aGlzLnByb3BzLm9uRXhwb3J0VG9DbG91ZFN1Y2Nlc3MsXG4gICAgICAgIG9uRXJyb3I6IHRoaXMucHJvcHMub25FeHBvcnRUb0Nsb3VkRXJyb3JcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBfb25TYXZlTWFwID0gKG92ZXJ3cml0ZSA9IGZhbHNlKSA9PiB7XG4gICAgICBjb25zdCB7Y3VycmVudFByb3ZpZGVyfSA9IHRoaXMucHJvcHMucHJvdmlkZXJTdGF0ZTtcbiAgICAgIGNvbnN0IHByb3ZpZGVyID0gdGhpcy5wcm9wcy5jbG91ZFByb3ZpZGVycy5maW5kKHAgPT4gcC5uYW1lID09PSBjdXJyZW50UHJvdmlkZXIpO1xuICAgICAgdGhpcy5fZXhwb3J0RmlsZVRvQ2xvdWQoe1xuICAgICAgICBwcm92aWRlcixcbiAgICAgICAgaXNQdWJsaWM6IGZhbHNlLFxuICAgICAgICBvdmVyd3JpdGUsXG4gICAgICAgIGNsb3NlTW9kYWw6IHRydWVcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBfb25PdmVyd3JpdGVNYXAgPSAoKSA9PiB7XG4gICAgICB0aGlzLl9vblNhdmVNYXAodHJ1ZSk7XG4gICAgfTtcblxuICAgIF9vblNoYXJlTWFwVXJsID0gcHJvdmlkZXIgPT4ge1xuICAgICAgdGhpcy5fZXhwb3J0RmlsZVRvQ2xvdWQoe3Byb3ZpZGVyLCBpc1B1YmxpYzogdHJ1ZSwgb3ZlcndyaXRlOiBmYWxzZSwgY2xvc2VNb2RhbDogZmFsc2V9KTtcbiAgICB9O1xuXG4gICAgX29uQ2xvc2VTYXZlTWFwID0gKCkgPT4ge1xuICAgICAgdGhpcy5wcm9wcy5wcm92aWRlckFjdGlvbnMucmVzZXRQcm92aWRlclN0YXR1cygpO1xuICAgICAgdGhpcy5fY2xvc2VNb2RhbCgpO1xuICAgIH07XG5cbiAgICBfb25Mb2FkQ2xvdWRNYXAgPSBwYXlsb2FkID0+IHtcbiAgICAgIHRoaXMucHJvcHMucHJvdmlkZXJBY3Rpb25zLmxvYWRDbG91ZE1hcCh7XG4gICAgICAgIC4uLnBheWxvYWQsXG4gICAgICAgIG9uU3VjY2VzczogdGhpcy5wcm9wcy5vbkxvYWRDbG91ZE1hcFN1Y2Nlc3MsXG4gICAgICAgIG9uRXJyb3I6IHRoaXMucHJvcHMub25Mb2FkQ2xvdWRNYXBFcnJvclxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8qIGVzbGludC1kaXNhYmxlIGNvbXBsZXhpdHkgKi9cbiAgICByZW5kZXIoKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGNvbnRhaW5lclcsXG4gICAgICAgIGNvbnRhaW5lckgsXG4gICAgICAgIG1hcFN0eWxlLFxuICAgICAgICBtYXBTdGF0ZSxcbiAgICAgICAgdWlTdGF0ZSxcbiAgICAgICAgdmlzU3RhdGUsXG4gICAgICAgIHJvb3ROb2RlLFxuICAgICAgICB2aXNTdGF0ZUFjdGlvbnMsXG4gICAgICAgIHVpU3RhdGVBY3Rpb25zLFxuICAgICAgICBwcm92aWRlclN0YXRlXG4gICAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgICAgY29uc3Qge2N1cnJlbnRNb2RhbCwgZGF0YXNldEtleVRvUmVtb3ZlfSA9IHVpU3RhdGU7XG4gICAgICBjb25zdCB7ZGF0YXNldHMsIGxheWVycywgZWRpdGluZ0RhdGFzZXR9ID0gdmlzU3RhdGU7XG5cbiAgICAgIGxldCB0ZW1wbGF0ZSA9IG51bGw7XG4gICAgICBsZXQgbW9kYWxQcm9wcyA9IHt9O1xuXG4gICAgICBpZiAoY3VycmVudE1vZGFsICYmIGN1cnJlbnRNb2RhbC5pZCAmJiBjdXJyZW50TW9kYWwudGVtcGxhdGUpIHtcbiAgICAgICAgLy8gaWYgY3VycmVudE1kb2FsIHRlbXBsYXRlIGlzIGFscmVhZHkgcHJvdmlkZWRcbiAgICAgICAgLy8gVE9ETzogbmVlZCB0byBjaGVjayB3aGV0aGVyIHRlbXBsYXRlIGlzIHZhbGlkXG4gICAgICAgIHRlbXBsYXRlID0gPGN1cnJlbnRNb2RhbC50ZW1wbGF0ZSAvPjtcbiAgICAgICAgbW9kYWxQcm9wcyA9IGN1cnJlbnRNb2RhbC5tb2RhbFByb3BzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3dpdGNoIChjdXJyZW50TW9kYWwpIHtcbiAgICAgICAgICBjYXNlIERBVEFfVEFCTEVfSUQ6XG4gICAgICAgICAgICBjb25zdCB3aWR0aCA9IGNvbnRhaW5lclcgKiAwLjk7XG4gICAgICAgICAgICB0ZW1wbGF0ZSA9IChcbiAgICAgICAgICAgICAgPERhdGFUYWJsZU1vZGFsXG4gICAgICAgICAgICAgICAgd2lkdGg9e2NvbnRhaW5lclcgKiAwLjl9XG4gICAgICAgICAgICAgICAgaGVpZ2h0PXtjb250YWluZXJIICogMC44NX1cbiAgICAgICAgICAgICAgICBkYXRhc2V0cz17ZGF0YXNldHN9XG4gICAgICAgICAgICAgICAgZGF0YUlkPXtlZGl0aW5nRGF0YXNldH1cbiAgICAgICAgICAgICAgICBzaG93RGF0YXNldFRhYmxlPXt2aXNTdGF0ZUFjdGlvbnMuc2hvd0RhdGFzZXRUYWJsZX1cbiAgICAgICAgICAgICAgICBzb3J0VGFibGVDb2x1bW49e3Zpc1N0YXRlQWN0aW9ucy5zb3J0VGFibGVDb2x1bW59XG4gICAgICAgICAgICAgICAgcGluVGFibGVDb2x1bW49e3Zpc1N0YXRlQWN0aW9ucy5waW5UYWJsZUNvbHVtbn1cbiAgICAgICAgICAgICAgICBjb3B5VGFibGVDb2x1bW49e3Zpc1N0YXRlQWN0aW9ucy5jb3B5VGFibGVDb2x1bW59XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAvLyBUT0RPOiB3ZSBuZWVkIHRvIG1ha2UgdGhpcyB3aWR0aCBjb25zaXN0ZW50IHdpdGggdGhlIGNzcyBydWxlIGRlZmluZWQgbW9kYWwuanM6MzIgbWF4LXdpZHRoOiA3MHZ3XG4gICAgICAgICAgICBtb2RhbFByb3BzLmNzc1N0eWxlID0gY3NzYFxuICAgICAgICAgICAgICAke0RhdGFUYWJsZU1vZGFsU3R5bGV9O1xuICAgICAgICAgICAgICAke21lZGlhLnBhbG1gXG4gICAgICAgICAgICAgICAgd2lkdGg6ICR7d2lkdGh9cHg7XG4gICAgICAgICAgICAgIGB9XG4gICAgICAgICAgICBgO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBERUxFVEVfREFUQV9JRDpcbiAgICAgICAgICAgIC8vIHZhbGlkYXRlIG9wdGlvbnNcbiAgICAgICAgICAgIGlmIChkYXRhc2V0S2V5VG9SZW1vdmUgJiYgZGF0YXNldHMgJiYgZGF0YXNldHNbZGF0YXNldEtleVRvUmVtb3ZlXSkge1xuICAgICAgICAgICAgICB0ZW1wbGF0ZSA9IChcbiAgICAgICAgICAgICAgICA8RGVsZXRlRGF0YXNldE1vZGFsIGRhdGFzZXQ9e2RhdGFzZXRzW2RhdGFzZXRLZXlUb1JlbW92ZV19IGxheWVycz17bGF5ZXJzfSAvPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBtb2RhbFByb3BzID0ge1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnbW9kYWwudGl0bGUuZGVsZXRlRGF0YXNldCcsXG4gICAgICAgICAgICAgICAgY3NzU3R5bGU6IHNtYWxsTW9kYWxDc3MsXG4gICAgICAgICAgICAgICAgZm9vdGVyOiB0cnVlLFxuICAgICAgICAgICAgICAgIG9uQ29uZmlybTogKCkgPT4gdGhpcy5fZGVsZXRlRGF0YXNldChkYXRhc2V0S2V5VG9SZW1vdmUpLFxuICAgICAgICAgICAgICAgIG9uQ2FuY2VsOiB0aGlzLl9jbG9zZU1vZGFsLFxuICAgICAgICAgICAgICAgIGNvbmZpcm1CdXR0b246IHtcbiAgICAgICAgICAgICAgICAgIG5lZ2F0aXZlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgbGFyZ2U6IHRydWUsXG4gICAgICAgICAgICAgICAgICBjaGlsZHJlbjogJ21vZGFsLmJ1dHRvbi5kZWxldGUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7IC8vIGluIGNhc2Ugd2UgYWRkIGEgbmV3IGNhc2UgYWZ0ZXIgdGhpcyBvbmVcbiAgICAgICAgICBjYXNlIEFERF9EQVRBX0lEOlxuICAgICAgICAgICAgdGVtcGxhdGUgPSAoXG4gICAgICAgICAgICAgIDxMb2FkRGF0YU1vZGFsXG4gICAgICAgICAgICAgICAgey4uLnByb3ZpZGVyU3RhdGV9XG4gICAgICAgICAgICAgICAgb25DbG9zZT17dGhpcy5fY2xvc2VNb2RhbH1cbiAgICAgICAgICAgICAgICBvbkZpbGVVcGxvYWQ9e3RoaXMuX29uRmlsZVVwbG9hZH1cbiAgICAgICAgICAgICAgICBvbkxvYWRDbG91ZE1hcD17dGhpcy5fb25Mb2FkQ2xvdWRNYXB9XG4gICAgICAgICAgICAgICAgY2xvdWRQcm92aWRlcnM9e3RoaXMucHJvdmlkZXJXaXRoU3RvcmFnZSh0aGlzLnByb3BzKX1cbiAgICAgICAgICAgICAgICBvblNldENsb3VkUHJvdmlkZXI9e3RoaXMucHJvcHMucHJvdmlkZXJBY3Rpb25zLnNldENsb3VkUHJvdmlkZXJ9XG4gICAgICAgICAgICAgICAgZ2V0U2F2ZWRNYXBzPXt0aGlzLnByb3BzLnByb3ZpZGVyQWN0aW9ucy5nZXRTYXZlZE1hcHN9XG4gICAgICAgICAgICAgICAgbG9hZEZpbGVzPXt1aVN0YXRlLmxvYWRGaWxlc31cbiAgICAgICAgICAgICAgICB7Li4udWlTdGF0ZS5sb2FkRmlsZXN9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbW9kYWxQcm9wcyA9IHtcbiAgICAgICAgICAgICAgdGl0bGU6ICdtb2RhbC50aXRsZS5hZGREYXRhVG9NYXAnLFxuICAgICAgICAgICAgICBjc3NTdHlsZTogTG9hZERhdGFNb2RhbFN0eWxlLFxuICAgICAgICAgICAgICBmb290ZXI6IGZhbHNlLFxuICAgICAgICAgICAgICBvbkNvbmZpcm06IHRoaXMuX2Nsb3NlTW9kYWxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIEVYUE9SVF9JTUFHRV9JRDpcbiAgICAgICAgICAgIHRlbXBsYXRlID0gKFxuICAgICAgICAgICAgICA8RXhwb3J0SW1hZ2VNb2RhbFxuICAgICAgICAgICAgICAgIGV4cG9ydEltYWdlPXt1aVN0YXRlLmV4cG9ydEltYWdlfVxuICAgICAgICAgICAgICAgIG1hcFc9e2NvbnRhaW5lcld9XG4gICAgICAgICAgICAgICAgbWFwSD17Y29udGFpbmVySH1cbiAgICAgICAgICAgICAgICBvblVwZGF0ZVNldHRpbmc9e3VpU3RhdGVBY3Rpb25zLnNldEV4cG9ydEltYWdlU2V0dGluZ31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBtb2RhbFByb3BzID0ge1xuICAgICAgICAgICAgICB0aXRsZTogJ21vZGFsLnRpdGxlLmV4cG9ydEltYWdlJyxcbiAgICAgICAgICAgICAgZm9vdGVyOiB0cnVlLFxuICAgICAgICAgICAgICBvbkNhbmNlbDogdGhpcy5fY2xvc2VNb2RhbCxcbiAgICAgICAgICAgICAgb25Db25maXJtOiB0aGlzLl9vbkV4cG9ydEltYWdlLFxuICAgICAgICAgICAgICBjb25maXJtQnV0dG9uOiB7XG4gICAgICAgICAgICAgICAgbGFyZ2U6IHRydWUsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHVpU3RhdGUuZXhwb3J0SW1hZ2UuZXhwb3J0aW5nLFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiAnbW9kYWwuYnV0dG9uLmRvd25sb2FkJ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBFWFBPUlRfREFUQV9JRDpcbiAgICAgICAgICAgIHRlbXBsYXRlID0gKFxuICAgICAgICAgICAgICA8RXhwb3J0RGF0YU1vZGFsXG4gICAgICAgICAgICAgICAgey4uLnVpU3RhdGUuZXhwb3J0RGF0YX1cbiAgICAgICAgICAgICAgICBkYXRhc2V0cz17ZGF0YXNldHN9XG4gICAgICAgICAgICAgICAgYXBwbHlDUFVGaWx0ZXI9e3RoaXMucHJvcHMudmlzU3RhdGVBY3Rpb25zLmFwcGx5Q1BVRmlsdGVyfVxuICAgICAgICAgICAgICAgIG9uQ2xvc2U9e3RoaXMuX2Nsb3NlTW9kYWx9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2VFeHBvcnREYXRhVHlwZT17dWlTdGF0ZUFjdGlvbnMuc2V0RXhwb3J0RGF0YVR5cGV9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2VFeHBvcnRTZWxlY3RlZERhdGFzZXQ9e3VpU3RhdGVBY3Rpb25zLnNldEV4cG9ydFNlbGVjdGVkRGF0YXNldH1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZUV4cG9ydEZpbHRlcmVkPXt1aVN0YXRlQWN0aW9ucy5zZXRFeHBvcnRGaWx0ZXJlZH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBtb2RhbFByb3BzID0ge1xuICAgICAgICAgICAgICB0aXRsZTogJ21vZGFsLnRpdGxlLmV4cG9ydERhdGEnLFxuICAgICAgICAgICAgICBmb290ZXI6IHRydWUsXG4gICAgICAgICAgICAgIG9uQ2FuY2VsOiB0aGlzLl9jbG9zZU1vZGFsLFxuICAgICAgICAgICAgICBvbkNvbmZpcm06IHRoaXMuX29uRXhwb3J0RGF0YSxcbiAgICAgICAgICAgICAgY29uZmlybUJ1dHRvbjoge1xuICAgICAgICAgICAgICAgIGxhcmdlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiAnbW9kYWwuYnV0dG9uLmV4cG9ydCdcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgRVhQT1JUX01BUF9JRDpcbiAgICAgICAgICAgIGNvbnN0IGtlcGxlckdsQ29uZmlnID0gS2VwbGVyR2xTY2hlbWEuZ2V0Q29uZmlnVG9TYXZlKHtcbiAgICAgICAgICAgICAgbWFwU3R5bGUsXG4gICAgICAgICAgICAgIHZpc1N0YXRlLFxuICAgICAgICAgICAgICBtYXBTdGF0ZSxcbiAgICAgICAgICAgICAgdWlTdGF0ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0ZW1wbGF0ZSA9IChcbiAgICAgICAgICAgICAgPEV4cG9ydE1hcE1vZGFsXG4gICAgICAgICAgICAgICAgY29uZmlnPXtrZXBsZXJHbENvbmZpZ31cbiAgICAgICAgICAgICAgICBvcHRpb25zPXt1aVN0YXRlLmV4cG9ydE1hcH1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZUV4cG9ydE1hcEZvcm1hdD17dWlTdGF0ZUFjdGlvbnMuc2V0RXhwb3J0TWFwRm9ybWF0fVxuICAgICAgICAgICAgICAgIG9uRWRpdFVzZXJNYXBib3hBY2Nlc3NUb2tlbj17dWlTdGF0ZUFjdGlvbnMuc2V0VXNlck1hcGJveEFjY2Vzc1Rva2VufVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlRXhwb3J0TWFwSFRNTE1vZGU9e3VpU3RhdGVBY3Rpb25zLnNldEV4cG9ydEhUTUxNYXBNb2RlfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIG1vZGFsUHJvcHMgPSB7XG4gICAgICAgICAgICAgIHRpdGxlOiAnbW9kYWwudGl0bGUuZXhwb3J0TWFwJyxcbiAgICAgICAgICAgICAgZm9vdGVyOiB0cnVlLFxuICAgICAgICAgICAgICBvbkNhbmNlbDogdGhpcy5fY2xvc2VNb2RhbCxcbiAgICAgICAgICAgICAgb25Db25maXJtOiB0aGlzLl9vbkV4cG9ydE1hcCxcbiAgICAgICAgICAgICAgY29uZmlybUJ1dHRvbjoge1xuICAgICAgICAgICAgICAgIGxhcmdlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiAnbW9kYWwuYnV0dG9uLmV4cG9ydCdcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgQUREX01BUF9TVFlMRV9JRDpcbiAgICAgICAgICAgIHRlbXBsYXRlID0gKFxuICAgICAgICAgICAgICA8QWRkTWFwU3R5bGVNb2RhbFxuICAgICAgICAgICAgICAgIG1hcGJveEFwaUFjY2Vzc1Rva2VuPXt0aGlzLnByb3BzLm1hcGJveEFwaUFjY2Vzc1Rva2VufVxuICAgICAgICAgICAgICAgIG1hcGJveEFwaVVybD17dGhpcy5wcm9wcy5tYXBib3hBcGlVcmx9XG4gICAgICAgICAgICAgICAgbWFwU3RhdGU9e3RoaXMucHJvcHMubWFwU3RhdGV9XG4gICAgICAgICAgICAgICAgaW5wdXRTdHlsZT17bWFwU3R5bGUuaW5wdXRTdHlsZX1cbiAgICAgICAgICAgICAgICBpbnB1dE1hcFN0eWxlPXt0aGlzLnByb3BzLm1hcFN0eWxlQWN0aW9ucy5pbnB1dE1hcFN0eWxlfVxuICAgICAgICAgICAgICAgIGxvYWRDdXN0b21NYXBTdHlsZT17dGhpcy5wcm9wcy5tYXBTdHlsZUFjdGlvbnMubG9hZEN1c3RvbU1hcFN0eWxlfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIG1vZGFsUHJvcHMgPSB7XG4gICAgICAgICAgICAgIHRpdGxlOiAnbW9kYWwudGl0bGUuYWRkQ3VzdG9tTWFwYm94U3R5bGUnLFxuICAgICAgICAgICAgICBmb290ZXI6IHRydWUsXG4gICAgICAgICAgICAgIG9uQ2FuY2VsOiB0aGlzLl9jbG9zZU1vZGFsLFxuICAgICAgICAgICAgICBvbkNvbmZpcm06IHRoaXMuX29uQWRkQ3VzdG9tTWFwU3R5bGUsXG4gICAgICAgICAgICAgIGNvbmZpcm1CdXR0b246IHtcbiAgICAgICAgICAgICAgICBsYXJnZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogIW1hcFN0eWxlLmlucHV0U3R5bGUuc3R5bGUsXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46ICdtb2RhbC5idXR0b24uYWRkU3R5bGUnXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFNBVkVfTUFQX0lEOlxuICAgICAgICAgICAgdGVtcGxhdGUgPSAoXG4gICAgICAgICAgICAgIDxTYXZlTWFwTW9kYWxcbiAgICAgICAgICAgICAgICB7Li4ucHJvdmlkZXJTdGF0ZX1cbiAgICAgICAgICAgICAgICBleHBvcnRJbWFnZT17dWlTdGF0ZS5leHBvcnRJbWFnZX1cbiAgICAgICAgICAgICAgICBtYXBJbmZvPXt2aXNTdGF0ZS5tYXBJbmZvfVxuICAgICAgICAgICAgICAgIG9uU2V0TWFwSW5mbz17dmlzU3RhdGVBY3Rpb25zLnNldE1hcEluZm99XG4gICAgICAgICAgICAgICAgb25VcGRhdGVJbWFnZVNldHRpbmc9e3VpU3RhdGVBY3Rpb25zLnNldEV4cG9ydEltYWdlU2V0dGluZ31cbiAgICAgICAgICAgICAgICBjbG91ZFByb3ZpZGVycz17dGhpcy5wcm92aWRlcldpdGhTdG9yYWdlKHRoaXMucHJvcHMpfVxuICAgICAgICAgICAgICAgIG9uU2V0Q2xvdWRQcm92aWRlcj17dGhpcy5wcm9wcy5wcm92aWRlckFjdGlvbnMuc2V0Q2xvdWRQcm92aWRlcn1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBtb2RhbFByb3BzID0ge1xuICAgICAgICAgICAgICB0aXRsZTogJ21vZGFsLnRpdGxlLnNhdmVNYXAnLFxuICAgICAgICAgICAgICBmb290ZXI6IHRydWUsXG4gICAgICAgICAgICAgIG9uQ2FuY2VsOiB0aGlzLl9jbG9zZU1vZGFsLFxuICAgICAgICAgICAgICBvbkNvbmZpcm06ICgpID0+IHRoaXMuX29uU2F2ZU1hcChmYWxzZSksXG4gICAgICAgICAgICAgIGNvbmZpcm1CdXR0b246IHtcbiAgICAgICAgICAgICAgICBsYXJnZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDpcbiAgICAgICAgICAgICAgICAgIHVpU3RhdGUuZXhwb3J0SW1hZ2UuZXhwb3J0aW5nIHx8XG4gICAgICAgICAgICAgICAgICAhaXNWYWxpZE1hcEluZm8odmlzU3RhdGUubWFwSW5mbykgfHxcbiAgICAgICAgICAgICAgICAgICFwcm92aWRlclN0YXRlLmN1cnJlbnRQcm92aWRlcixcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogJ21vZGFsLmJ1dHRvbi5zYXZlJ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBPVkVSV1JJVEVfTUFQX0lEOlxuICAgICAgICAgICAgdGVtcGxhdGUgPSAoXG4gICAgICAgICAgICAgIDxPdmVyV3JpdGVNYXBNb2RhbFxuICAgICAgICAgICAgICAgIHsuLi5wcm92aWRlclN0YXRlfVxuICAgICAgICAgICAgICAgIGNsb3VkUHJvdmlkZXJzPXt0aGlzLnByb3BzLmNsb3VkUHJvdmlkZXJzfVxuICAgICAgICAgICAgICAgIHRpdGxlPXtnZXQodmlzU3RhdGUsIFsnbWFwSW5mbycsICd0aXRsZSddKX1cbiAgICAgICAgICAgICAgICBvblNldENsb3VkUHJvdmlkZXI9e3RoaXMucHJvcHMucHJvdmlkZXJBY3Rpb25zLnNldENsb3VkUHJvdmlkZXJ9XG4gICAgICAgICAgICAgICAgb25VcGRhdGVJbWFnZVNldHRpbmc9e3VpU3RhdGVBY3Rpb25zLnNldEV4cG9ydEltYWdlU2V0dGluZ31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBtb2RhbFByb3BzID0ge1xuICAgICAgICAgICAgICB0aXRsZTogJ092ZXJ3cml0ZSBFeGlzdGluZyBGaWxlPycsXG4gICAgICAgICAgICAgIGNzc1N0eWxlOiBzbWFsbE1vZGFsQ3NzLFxuICAgICAgICAgICAgICBmb290ZXI6IHRydWUsXG4gICAgICAgICAgICAgIG9uQ29uZmlybTogdGhpcy5fb25PdmVyd3JpdGVNYXAsXG4gICAgICAgICAgICAgIG9uQ2FuY2VsOiB0aGlzLl9jbG9zZU1vZGFsLFxuICAgICAgICAgICAgICBjb25maXJtQnV0dG9uOiB7XG4gICAgICAgICAgICAgICAgbGFyZ2U6IHRydWUsXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46ICdZZXMnLFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOlxuICAgICAgICAgICAgICAgICAgdWlTdGF0ZS5leHBvcnRJbWFnZS5leHBvcnRpbmcgfHxcbiAgICAgICAgICAgICAgICAgICFpc1ZhbGlkTWFwSW5mbyh2aXNTdGF0ZS5tYXBJbmZvKSB8fFxuICAgICAgICAgICAgICAgICAgIXByb3ZpZGVyU3RhdGUuY3VycmVudFByb3ZpZGVyXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFNIQVJFX01BUF9JRDpcbiAgICAgICAgICAgIHRlbXBsYXRlID0gKFxuICAgICAgICAgICAgICA8U2hhcmVNYXBNb2RhbFxuICAgICAgICAgICAgICAgIHsuLi5wcm92aWRlclN0YXRlfVxuICAgICAgICAgICAgICAgIGlzUmVhZHk9eyF1aVN0YXRlLmV4cG9ydEltYWdlLmV4cG9ydGluZ31cbiAgICAgICAgICAgICAgICBjbG91ZFByb3ZpZGVycz17dGhpcy5wcm92aWRlcldpdGhTaGFyZSh0aGlzLnByb3BzKX1cbiAgICAgICAgICAgICAgICBvbkV4cG9ydD17dGhpcy5fb25TaGFyZU1hcFVybH1cbiAgICAgICAgICAgICAgICBvblNldENsb3VkUHJvdmlkZXI9e3RoaXMucHJvcHMucHJvdmlkZXJBY3Rpb25zLnNldENsb3VkUHJvdmlkZXJ9XG4gICAgICAgICAgICAgICAgb25VcGRhdGVJbWFnZVNldHRpbmc9e3VpU3RhdGVBY3Rpb25zLnNldEV4cG9ydEltYWdlU2V0dGluZ31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBtb2RhbFByb3BzID0ge1xuICAgICAgICAgICAgICB0aXRsZTogJ21vZGFsLnRpdGxlLnNoYXJlVVJMJyxcbiAgICAgICAgICAgICAgb25DYW5jZWw6IHRoaXMuX29uQ2xvc2VTYXZlTWFwXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnByb3BzLnJvb3ROb2RlID8gKFxuICAgICAgICA8TW9kYWxEaWFsb2dcbiAgICAgICAgICBwYXJlbnRTZWxlY3Rvcj17KCkgPT4gZmluZERPTU5vZGUocm9vdE5vZGUpfVxuICAgICAgICAgIGlzT3Blbj17Qm9vbGVhbihjdXJyZW50TW9kYWwpfVxuICAgICAgICAgIG9uQ2FuY2VsPXt0aGlzLl9jbG9zZU1vZGFsfVxuICAgICAgICAgIHsuLi5tb2RhbFByb3BzfVxuICAgICAgICAgIGNzc1N0eWxlPXtEZWZhdWx0U3R5bGUuY29uY2F0KG1vZGFsUHJvcHMuY3NzU3R5bGUgfHwgJycpfVxuICAgICAgICA+XG4gICAgICAgICAge3RlbXBsYXRlfVxuICAgICAgICA8L01vZGFsRGlhbG9nPlxuICAgICAgKSA6IG51bGw7XG4gICAgfVxuICAgIC8qIGVzbGludC1lbmFibGUgY29tcGxleGl0eSAqL1xuICB9XG5cbiAgcmV0dXJuIE1vZGFsV3JhcHBlcjtcbn1cbiJdfQ==