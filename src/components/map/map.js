import React, { Component } from 'react';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';

import KeplerGl from 'kepler.gl';
import { addDataToMap } from 'kepler.gl/actions';
import Processors from 'kepler.gl/processors';

import ulEdges from '../../data/ul-data-ver1.csv.js';
import ulConfig from '../../data/ul-config';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZXJpa25zb24iLCJhIjoiY2pqanh2ZWYxNGE0ZjN3bzM4M3Azdzl6cSJ9.UO94WxxiSiHrAaztMgy_Yg'; // eslint-disable-line

const data = Processors.processCsvData(ulEdges);
const dataset = {
  data,
  info: {
    // Kopplar den att detta ID är till datan?
    id: 'fin7fpx0d',
  },
};

const sampleTripData = {
  fields: [
    { name: 'tpep_pickup_datetime', format: 'YYYY-M-D H:m:s', type: 'timestamp' },
    { name: 'pickup_longitude', format: '', type: 'real' },
    { name: 'pickup_latitude', format: '', type: 'real' },
  ],
  rows: [
    ['2015-01-15 19:05:39 +00:00', -73.99389648, 40.75011063],
    ['2015-01-15 19:05:39 +00:00', -73.97642517, 40.73981094],
    ['2015-01-15 19:05:40 +00:00', -73.96870422, 40.75424576],
  ],
};

const sampleConfig = {
  visState: {
    filters: [
      {
        id: 'me',
        dataId: 'test_trip_data',
        name: 'tpep_pickup_datetime',
        type: 'timeRange',
        enlarged: true,
      },
    ],
  },
};

class Map extends Component {
  componentDidMount() {
    console.log('Component did mount!');
  }
  /*addDataToMap({
      datasets: dataset,
      option: {
        centerMap: true,
        readOnly: false,
      },
      config: ulConfig
    });*/

  render() {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '70vh' }}>
        <AutoSizer>
          {({ height, width }) => (
            <KeplerGl appName='anomali' mapboxApiAccessToken={MAPBOX_TOKEN} id='map' width={width} height={height} />
          )}
        </AutoSizer>
      </div>
    );
  }
}

export default Map;
