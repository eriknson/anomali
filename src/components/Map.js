import React, { Component } from "react";
import { connect } from "react-redux";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";

import KeplerGl from "kepler.gl";
import { addDataToMap } from "kepler.gl/actions";
import Processors from "kepler.gl/processors";

import "mapbox-gl/dist/mapbox-gl.css";

import ulData from "../data/ul-edges-index.csv.js";
import ulConfig from "../data/ul-config.json";

class Map extends Component {
  state = {};

  componentDidMount() {
    const structuredData = Processors.processCsvData(ulData);
    this.props.dispatch(
      addDataToMap({
        datasets: {
          info: { id: "7b2ttp", label: "Uppsala Network (UL)" },
          data: structuredData,
        },
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
