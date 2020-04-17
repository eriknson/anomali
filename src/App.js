// Copyright (c) 2020 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React, { Component } from 'react';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import styled, { ThemeProvider } from 'styled-components';
import window from 'global/window';
import { connect } from 'react-redux';
import { theme } from 'kepler.gl/styles';
import { replaceLoadDataModal } from './factories/load-data-modal';
import { replaceMapControl } from './factories/map-control';
import { replacePanelHeader } from './factories/panel-header';
import { AUTH_TOKENS } from './constants/default-settings';
import { onExportFileSuccess, onLoadCloudMapSuccess, onLoadCloudMapError } from './actions';
import { CLOUD_PROVIDERS } from './cloud-providers';

import { ulDataConfig, ulCsvEdgeData } from './data/ul-data.js';
import { addDataToMap } from 'kepler.gl/actions';
import { processCsvData } from 'kepler.gl/processors';

const keplerGlGetState = (state) => state.demo.keplerGl;
const KeplerGl = require('kepler.gl/components').injectComponents([
  replaceLoadDataModal(),
  replaceMapControl(),
  replacePanelHeader(),
]);

const GlobalStyle = styled.div`
  font-family: ff-clan-web-pro, 'Helvetica Neue', Helvetica, sans-serif;
  font-weight: 400;
  font-size: 0.875em;
  line-height: 1.71429;

  *,
  *:before,
  *:after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  li {
    margin: 0;
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.labelColor};
  }
`;

class app extends Component {
  state = {
    width: window.innerWidth,
    height: '800px',
  };

  componentDidMount() {
    this._loadSampleData();
  }

  _loadSampleData() {
    const dataset = processCsvData(ulCsvEdgeData);

    this.props.dispatch(
      addDataToMap({
        datasets: {
          info: {
            label: 'Uppsala Network (UL)',
            id: 'ul_data',
          },
          data: dataset,
        },
        options: {
          centerMap: true,
          readOnly: false,
        },
        config: ulDataConfig,
      })
    );
  }

  render() {
    const { showBanner } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle
          ref={(node) => {
            node ? (this.root = node) : null;
          }}
        >
          <div
            style={{
              transition: 'margin 1s, height 1s',
              position: 'absolute',
              width: '100%',
              height: '800px',
            }}
          >
            <AutoSizer>
              {({ height, width }) => (
                <KeplerGl
                  mapboxApiAccessToken='pk.eyJ1IjoiZXJpa25zb24iLCJhIjoiY2pqanh2ZWYxNGE0ZjN3bzM4M3Azdzl6cSJ9.UO94WxxiSiHrAaztMgy_Yg'
                  id='map'
                  getState={keplerGlGetState}
                  width={width}
                  height={height}
                  cloudProviders={CLOUD_PROVIDERS}
                  onExportToCloudSuccess={onExportFileSuccess}
                  onLoadCloudMapSuccess={onLoadCloudMapSuccess}
                  onLoadCloudMapError={onLoadCloudMapError}
                />
              )}
            </AutoSizer>
          </div>
        </GlobalStyle>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state) => state;
const dispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, dispatchToProps)(app);
