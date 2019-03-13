import React from 'react';
import { connect } from 'react-redux';
import ReactMapGL, { Marker } from 'react-map-gl';
import axios from 'axios';

import './Attractions.css';

import {
  setMapViewport,
  setMapWidthHeight,
  setMapSidebarOpen
} from '../../../../actions/globalActions';
import { setAttractionsVenues } from '../../../../actions/attractionsActions';
import MapSidebar from './components/MapSidebar';
import { LIBM_URL, HERE_BASE_URL } from '../../../../utils/utils';

import 'mapbox-gl/dist/mapbox-gl.css';

const getRequest = (lat, lng, category) => {
  const aid = 'nYEQjW3WrequOgHzvhmO';
  const acode = 'ZmHg-w-tGJJCJSlhrsp9oA';
  const url = `${HERE_BASE_URL}/places/v1/discover/explore?in=${lat},${lng};r=7000&size=100&cat=${category}&app_id=${aid}&app_code=${acode}`;

  return axios.get(url)
  .then((response) => {
    return response.data;
  })
  .catch((err) => {
    return `Error ${err}`;
  })
}

class Attractions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      filters: [
        { name: "Eat & Drink", on: false, venue: 'eat_drink' },
        { name: "Going Out", on: false, venue: 'going_out' },
        { name: "Sights & Museums", on: true, venue: 'sights_museums' },
        { name: "Transport", on: false, venue: 'transport' },
        { name: "Accomodation", on: false, venue: 'accommodation' },
        { name: "Shopping", on: false, venue: 'shopping' },
        { name: "Leisure & Outdoor", on: false, venue: 'leisure_outdoor' },
        { name: "Administrative Buildings", on: false, venue: 'administrative_areas_buildings' },
        { name: "Geographical", on: false, venue: 'natural_geographical' },
        { name: "Petrol Stations", on: false, venue: 'petrol_station' },
        { name: "ATM's", on: false, venue: 'atm_bank_exchange' },
        { name: "Toilets & Rest Areas", on: false, venue: 'toilet_rest_area' },
        { name: "Health Care", on: false, venue: 'hospital_health_care_facility' },
      ],
      currentSelected: {}
    }

    this.closeMapSidebar =  this.closeMapSidebar.bind(this);
  }

  componentDidMount() {
    this.handleAttractionsVenues();
  }

  handleAttractionsVenues() {
    const { attractions } = this.props;
    const { lat, lng } = attractions.search;

    // First check if all arrays are empty
    for (const venueType in attractions.venues) {
      const venueTypeVenues = attractions.venues[venueType];
      // Is empty
      if (venueTypeVenues.length === 0) {
        const re = new RegExp('_', 'g');
        const type = venueType;
        getRequest(lat, lng, type.replace(re, "-"))
        .then((data) => {
          const results = data.results;
          let venues;
          results.items.length === 0 ? venues = {} : venues = results.items;
          this.props.updateAttractionsVenues(venueType, venues);
        })
        .catch((err) => {
          console.log(err);
        })
      }
    }
  }
  
  updateViewport = (viewport) => {
    this.props.updateMapViewport(viewport);
  }

  closeMapSidebar() {
    this.props.updateMapSidebarOpen(false);
  }

  filterChange = (filters) => {
    this.setState({ filters: filters });
  }

  renderMapSidebar() {
    if (this.props.global.map.sidebarOpen) {
      return (
        <MapSidebar 
          closeMapSidebar={this.closeMapSidebar}
          filters={this.state.filters}
          filterChange={this.filterChange}
          currentSelected={this.state.currentSelected}
        />
      )
    } else {
      return (
        <button className="map-sidebar-open" onClick={() => this.props.updateMapSidebarOpen(true)}>
          <i className="fas fa-angle-left"></i>
        </button>
      )
    }
  }

  markerClick = (venue) => {
    // Update current selected, then open sidebar
    this.setState({ currentSelected: venue });
    this.props.updateMapSidebarOpen(true);
  }

  render() {
    const { map } = this.props.global;
    const filters = this.state.filters;

    let venues = [];
    filters.forEach((filter) => {
      if (filter.on) {
        const vs = this.props.attractions.venues[filter.venue];
        vs.map((v) => {
          return venues.push(v);
        });
      }
    });

    return (
      this.state.loading 
      ? 
        <p>Loading</p> 
      :
        <ReactMapGL 
          {...map.viewport}
          width={map.width}
          height={map.height}
          onViewportChange={this.updateViewport}
          mapStyle='mapbox://styles/tobydrane/cjs69b5jd08mr1gpcspkxm72w'
          mapboxApiAccessToken={map.token}>

          {this.renderMapSidebar()}
          {venues.map((venue, index) => {
            return (
              <Marker 
                className="marker"
                key={`marker-${index}`}
                latitude={venue.position[0]}
                longitude={venue.position[1]}
              >
                <img 
                  style={{width: 28, height: 28}} 
                  src={venue.icon} 
                  onClick={() => this.markerClick(venue)} 
                  alt="Maker Icon"/>
              </Marker>
            );
          })}

        </ReactMapGL>
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
  updateMapWidthHeight: (width, height) => {
    dispatch(setMapWidthHeight(width, height))
  },
  updateMapSidebarOpen: (open) => {
    dispatch(setMapSidebarOpen(open))
  },
  updateAttractionsVenues: (venueType, venues) => {
    dispatch(setAttractionsVenues(venueType, venues))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Attractions);