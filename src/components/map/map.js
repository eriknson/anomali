import React, { Component } from 'react';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import KeplerGl from 'kepler.gl';

// Kepler.gl actions
import { addDataToMap } from 'kepler.gl/actions';
// Kepler.gl Data processing APIs
import Processors from 'kepler.gl/processors';

import ulEdges from '../../data/ul-data-ver1.csv.js';
import ulConfig from '../../data/ul-config';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZXJpa25zb24iLCJhIjoiY2pqanh2ZWYxNGE0ZjN3bzM4M3Azdzl6cSJ9.UO94WxxiSiHrAaztMgy_Yg'; // eslint-disable-line

class Map extends Component {
  componentDidMount() {
    // processCsvData helper to convert csv file into kepler.gl structure {fields, rows}
    const data = Processors.processCsvData(ulEdges);
    // Create dataset structure
    const dataset = {
      data,
      info: {
        id: 'fin7fpx0d',
      },
    };
    addDataToMap({ datasets: dataset, config: ulConfig });
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

export default Map;
