import React, { Component } from "react";
import { connect } from "react-redux";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import { FlyToInterpolator } from "deck.gl";
import KeplerGl from "kepler.gl";
import { addDataToMap, updateMap, wrapTo } from "kepler.gl/actions";
import Processors from "kepler.gl/processors";
import "mapbox-gl/dist/mapbox-gl.css";

// import data and config for the Uppsala Network (UL)
import {
  ulAggregatedEdgeIndex,
  ulMincutValues,
} from "../data/ul-aggregated_all-edges";
import ulConfig from "../data/ul-config.json";

// structure and label data so kepler likes it
const structuredEdgeData = Processors.processCsvData(ulAggregatedEdgeIndex);
const structuredCutData = Processors.processCsvData(ulMincutValues);
const data = {
  datasets: [
    {
      info: {
        id: "7b2tp",
        label: "Uppsala Network – aggregated edge indexes",
      },
      data: structuredEdgeData,
    },
    {
      info: { id: "9jgb8y7", label: "Uppsala Network – mincut values" },
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
};

const INITIAL_STATE = {
  bearing: 10,
  latitude: 59.944134783108444,
  longitude: 17.411023752182338,
  pitch: 40,
  zoom: 6.5,
};
const TRANSITIONED_STATE = {
  bearing: 0,
  latitude: 59.844134783108444,
  longitude: 17.611023752182338,
  pitch: 100,
  zoom: 7,
};

class Map extends Component {
  state = {};
  counter = 0;

  componentDidMount() {
    this.props.dispatch(wrapTo("map", addDataToMap(data)));
    this.props.dispatch(
      wrapTo(
        "map",
        updateMap({
          ...INITIAL_STATE,
        })
      )
    );
    setTimeout(() => {
      this.props.dispatch(
        wrapTo(
          "map",
          updateMap({
            ...TRANSITIONED_STATE,
            transitionDuration: 20000,
            transitionInterpolator: new FlyToInterpolator(),
          })
        )
      );
    }, 500);
  }

  render() {
    return (
      <div style={{ height: "650px", width: "100%" }}>
        <AutoSizer>
          {({ height, width }) => (
            <KeplerGl
              appName="Anomali"
              id="map"
              onLoad={this._goToNextView}
              height={height}
              width={width}
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            />
          )}
        </AutoSizer>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;
const dispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, dispatchToProps)(Map);
