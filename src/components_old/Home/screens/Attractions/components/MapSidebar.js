import React from 'react';
import { connect } from 'react-redux';
import { 
  AreaChart,
  ResponsiveContainer,
  CartesianGrid, 
  Area,
  XAxis,
  YAxis 
} from 'recharts';
import axios from 'axios';

import { LIBM_URL } from '../../../../../utils/utils';

class MapSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: this.props.filters,
      sentiment: {
        loading: true,
        data: []
      }
    }

    this.renderCurrentSelected = this.renderCurrentSelected.bind(this);
  }

  onFilterChange = (index) => {
    const filters = this.state.filters;
    filters[index].on = !filters[index].on;
    this.setState({ filters: filters });
  }

  renderFilter = (element, index) => {
    const { name, on } = element;
    return (
      <div className="filter">
        <input 
          checked={on} 
          type="checkbox" 
          id={name}
          key={name}
          onChange={() => this.onFilterChange(index)}
        />
        <label htmlFor={name}>{name}</label>
      </div>
    )
  }

  renderSentiment = (venue) => {
    const d = [];
    const place = venue.title;
    const url = `${LIBM_URL}/sentiment/twitter/${place}`;
    axios.get(url).then((response) => {
      response.data.map((j, index) => d.push({ id: index, sentiment: j.sentiment }));
        
    }).catch((err) => {
      console.log(err);
    });


    // console.log(venue);
    /** 
    const data = [
      {id: "0", sentiment: "-1.2"},
      {id: "1", sentiment: "0.2"},
      {id: "2", sentiment: "1.0"},
    ];*/
    const data = d;

    const getOffset = () => {
      const dataMax = Math.max(...data.map((i) => i.sentiment));
      const dataMin = Math.min(...data.map((i) => i.sentiment));
      if (dataMax <= 0) {
        return 0;
      } else if (dataMin >= 0) {
        return 1;
      } else {
        return dataMax / (dataMax - dataMin);
      }
    }
    const off = getOffset();

    return (
      <div className="sentiment">
        <ResponsiveContainer>
          <AreaChart
            data={data}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="id" />
            <YAxis />
            <defs>
              <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset={off} stopColor="green" stopOpacity="1" />  
                <stop offset={off} stopColor="red" stopOpacity="1" />  
              </linearGradient>          
            </defs>
            <Area type="monotone" dataKey="sentiment" stroke="#000" fill="url(#splitColor)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    )
  }

  renderCurrentSelected() {
    const venue = this.props.currentSelected;
    return (
      <div className="title-area">
        <h6 className="title">{venue.title}</h6>
        <p className="category">{venue.category.title}</p>

        {this.renderSentiment(venue)}
      </div>  
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="mapSidebar">
          <div className="container-fluid">
            <button className="open-filters" data-toggle="modal" data-target="#filtersModal">
              Filter Map
            </button>

            <section className="current-selected">
              {this.renderCurrentSelected()}
            </section>
          </div>
          <button className="map-sidebar-close" onClick={this.props.closeMapSidebar}>
            <i className="fas fa-angle-right"></i>
          </button>
        </div>


        <div className="modal fade" id="filtersModal" tabindex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">
                {this.state.filters.map(this.renderFilter)}
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  onClick={() => this.props.filterChange(this.state.filters)} 
                  className="save-filters"
                  data-dismiss="modal"
                >Filter</button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}


const mapStateToProps = state => ({
  attractions: state.attractions,
});

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(MapSidebar);
