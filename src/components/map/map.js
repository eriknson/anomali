// Copyright (c) 2018 Uber Technologies, Inc.
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
import { connect } from 'react-redux';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import KeplerGl from 'kepler.gl';

import { addDataToMap } from 'kepler.gl/actions';
import Processors from 'kepler.gl/processors';

import edgeIndexes from '../../data/ul-data-ver1.csv.js';
import ulConfig from '../../data/ul-config';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZXJpa25zb24iLCJhIjoiY2pqanh2ZWYxNGE0ZjN3bzM4M3Azdzl6cSJ9.UO94WxxiSiHrAaztMgy_Yg'; // eslint-disable-line

class App extends Component {
  componentDidMount() {
    // processCsvData to convert csv file into kepler.gl structure {fields, rows}
    const data = Processors.processCsvData(edgeIndexes);
    const dataset = {
      data,
      info: {
        id: 'fin7fpx0d',
      },
    };
    // addDataToMap to inject dataset into kepler.gl instance
    this.props.dispatch(
      addDataToMap({ datasets: dataset, config: ulConfig, options: { centerMap: true, readOnly: true } })
    );
  }

  render() {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '70vh' }}>
        <AutoSizer>
          {({ height, width }) => (
            <KeplerGl mapboxApiAccessToken={MAPBOX_TOKEN} id='map' width={width} height={height} />
          )}
        </AutoSizer>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;
const dispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, dispatchToProps)(App);
