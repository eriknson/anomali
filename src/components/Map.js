import React, { Component } from "react";
import { connect } from "react-redux";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";

import KeplerGl from "kepler.gl";
import { addDataToMap } from "kepler.gl/actions";
import Processors from "kepler.gl/processors";

import "mapbox-gl/dist/mapbox-gl.css";

import {
  ulAggregatedEdgeIndex,
  ulMincutValues,
} from "../data/ul-aggregated_all-edges";
import ulConfig from "../data/ul-config.json";

class Map extends Component {
  state = {};

  componentDidMount() {
    const structuredEdgeData = Processors.processCsvData(ulAggregatedEdgeIndex);
    const structuredCutData = Processors.processCsvData(ulMincutValues);
    this.props.dispatch(
      addDataToMap({
        datasets: [
          {
            info: {
              id: "7b2ttp",
              label: "Uppsala Network – aggregated edge indexes",
            },
            data: structuredEdgeData,
          },
          {
            info: { id: "9jdgb8y7", label: "Uppsala Network – mincut values" },
            data: structuredCutData,
          },
        ],
        option: {
          centerMap: true,
          readOnly: true,
        },
        info: {
          title: "Anomali",
          description: "Mys",
        },
        config: ulConfig,
      })
    );
  }

  render() {
    return (
      <AutoSizer>
        {({ height, width }) => (
          <KeplerGl
            id="map"
            height={height}
            width={width}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          />
        )}
      </AutoSizer>
    );
  }
}

const mapStateToProps = (state) => state;
const dispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, dispatchToProps)(Map);
