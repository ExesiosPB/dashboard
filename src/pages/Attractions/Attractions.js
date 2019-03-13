import React from 'react';
import { connect } from 'react-redux';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import axios from 'axios';

import {
  setMapViewport,
  setMapMinimized
} from '../../actions/globalActions';
import { 
  setAttractionsVenues,
  setAttractionsVenuesSelected,
} from '../../actions/attractionsActions';
import { LIBM_URL } from '../../utils/utils';
import MapPin from '../../components/MapPin/MapPin';
import AttractionsModal from '../../components/AttractionsModal/AttractionsModal';

class Attractions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      popupInfo: null,
      vizInfo: null,
    }
  }

  componentDidMount() {
    const venues = this.props.attractions.venues;
    let count = 0;
    Object.keys(venues).forEach((category, index) => {
      // Check if category venue array is empty
      if (venues[category].venues.length === 0) {
        const url = `${LIBM_URL}/social/yelp/cat_search/Stoke-On-Trent/cat/${category}`;
        
        this.getFromURL(url)
        .then((response) => {
          count += 1;
          this.props.updateAttractionsVenues(category, response.results);
          if (count === Object.keys(venues).length) this.setState({ loading: false });
        })
        .catch((err) => {
          count += 1;
          console.log(err);
        });
      }
    });
  }

  async getFromURL(url) {
    const res = await axios.get(url);
    const { data } = await res;
    return data;
  }

  updateViewport = (viewport) => {
    this.props.updateMapViewport(viewport);
  }

  renderModal() {
    const { modalInfo } = this.state;
    console.log(modalInfo);
    if (modalInfo) {
      return (
        <AttractionsModal 
          styles={{display: "block"}}
          onClose={() => this.setState({ modalInfo: null })}
          venue={modalInfo}
        />
      )
    }
  }

  renderViz() {
    const { vizInfo } = this.state;

    console.log(vizInfo);

    return (
      <div className="row">
        <div className="venue-information">
        
        </div>

        <div className="col">
        
        </div>

        <div className="col">

        </div>
      </div>
    );
  }

  renderVenueMarker = (venue, index) => {
    const { latitude, longitude } = venue.coordinates;
    const id = venue.id;
    return (
      <Marker 
        key={`marker-${id}-${index}`}
        longitude={longitude}
        latitude={latitude}
      >
        <MapPin onClick={() => this.setState({popupInfo: venue })} />
      </Marker>
    )
  }

  renderPopup() {
    const { popupInfo } = this.state;
    const { map } = this.props.global;
    if (popupInfo) {
      const { latitude, longitude } = popupInfo.coordinates;

      return (
        <Popup
          latitude={latitude}
          longitude={longitude}
          offsetLeft={10}
          closeOnClick={false}
          onClose={() => this.setState({ popupInfo: null })}
        >
          <p>{popupInfo.name}</p>

          <button 
            className="more-info-button" 
            type="button"
            onClick={() => {
              this.props.updateMapMinimized(!map.minimized);
              this.setState({ 
                vizInfo: popupInfo,
                popupInfo: null, 
              });
            }}
          >
            More Info
          </button>
        </Popup>
      );
    }
  }

  renderOverlay() {
    const { venues } = this.props.attractions;
    const { map } = this.props.global;
    const keys = [];
    Object.keys(venues).forEach((v) => { keys.push(v) });

    return (
      <div className="map-overlay">
        <div className="map-filter">
          <button className="button" type="button" data-toggle="dropdown">
            <i className="fas fa-sort-amount-down"></i>
            Filter
          </button>
          <div className="dropdown-menu">
            {keys.map(key => {
              const selected = venues[key].selected;
              return (
                <a 
                  className="dropdown-item" 
                  href="#pressed" 
                  onClick={() => {this.props.updateAttractionsVenuesSelected(key, !selected)}}
                >
                  {key}
                  { selected === true &&
                    <i className="fas fa-check selected"></i>
                  }
                </a>
              )
            })}
          </div>
        </div>

        <div className="map-expand">
            <button 
              className="button" 
              type="button"
              onClick={() => {this.props.updateMapMinimized(!map.minimized)}}
            >
              Expand
            </button>
        </div>
      </div>
    )
  }

  render() {
    const { map } = this.props.global;
    const { venues } = this.props.attractions;

    // Find out which ones to render
    let venuesToRender = [];
    Object.keys(venues).forEach((v) => {
      if (venues[v].selected) {
        venues[v].venues.forEach((vv) => {
          venuesToRender.push(vv);
        })
      }
    });

    return (
      this.state.loading
      ?
        <img alt="Loading Spinner" className="loading" src={require('../../assets/loading.gif')} />
      :
        <div className="attractions-wrapper">
          <div className={"viz-area " + (map.minimized ? "hidden" : "show")}>
            {this.renderViz()}
          </div>

          <div className={"map-" + (map.minimized ? "minimized" : "large")}>
            <ReactMapGL 
              {...map.viewport}
              width={map.width}
              height={map.height}
              onViewportChange={this.updateViewport}
              mapStyle='mapbox://styles/tobydrane/cjesnnyn40y7z2spc1r6s930d'
              mapboxApiAccessToken={map.token}>
              
              {this.renderOverlay()}
              {venuesToRender.map(this.renderVenueMarker)}
              {this.renderPopup()}

            </ReactMapGL>
          </div>

          {this.renderModal()}
        </div>
    )
  }
}

const mapStateToProps = state => ({
  global: state.global,
  attractions: state.attractions,
});

const mapDispatchToProps = dispatch => ({
  updateMapViewport: (viewport) => {
    dispatch(setMapViewport(viewport))
  },
  updateMapMinimized: (minimied) => {
    dispatch(setMapMinimized(minimied))
  },
  updateAttractionsVenues: (category, venues) => {
    dispatch(setAttractionsVenues(category, venues))
  },
  updateAttractionsVenuesSelected: (category, selected) => {
    dispatch(setAttractionsVenuesSelected(category, selected))
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Attractions);