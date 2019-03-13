import React from 'react';
import axios from 'axios';
import {
  VictoryChart,
  VictoryAxis,
  VictoryBar
} from 'victory';

import { LIBM_URL } from '../../utils/utils';

const FilterButton = ({activeMenu, name, onClick}) => {
  const isActive = (activeMenu === name) ? true : false;
  return (
    <div className="filter-button-wrapper">
      <button
        className={"filter-button" + (isActive ? "-active": "")}
        onClick={() => onClick(name)}
      >
        {name}
      </button>
    </div>
  )
}

const SentimentCard = ({loading, data}) => {
  let sentimentData = [];
  data.forEach((val, index) => {
    sentimentData.push({
      x: index,
      y: val.sentiment
    })
  });

  return (
    <div className="card sentiment-card">
      <div className="card-body">
        <h5 className="card-title">Overall Sentiment</h5>

        <p className={"loading-" + (loading ? "show" : "hidden")}>Loading</p>

        <div className={"chart-" + (loading ? "hidden" : "show")}>
          <VictoryChart>
            <VictoryAxis
              style={{
                axis: { stroke: "none" },
                ticks: { stroke: "none" },
                tickLabels: { fill: "none" },
                grid: { stroke: "lightGray" }
              }}
            />
            <VictoryAxis dependentAxis
              style={{
                ticks: { stroke: "gray" },
                tickLabels: { fill: "gray", fontSize: 12 }
              }}
              crossAxis={false}
            />
            <VictoryBar
              style={{
                data: { fill: "#c43a31" }
              }}
              padding={{ left: 0, right: 0 }}
              data={sentimentData}
            />
          </VictoryChart>
        </div>
      </div>
    </div>
  )
}

const KeywordsCard = ({loading, data}) => {
  console.log(data);
  let sentimentData = [];
  data.forEach((val, index) => {
    sentimentData.push({
      x: index,
      y: val.sentiment
    })
  });

  return (
    <div className="card keywords-card">
      <div className="card-body">
        <h5 className="card-title">Top Keywords & Categories</h5>

        <p className={"loading-" + (loading ? "show" : "hidden")}>Loading</p>

        <div className={"chart-" + (loading ? "hidden" : "show")}>
          <VictoryChart>
            <VictoryAxis
              style={{
                axis: { stroke: "none" },
                ticks: { stroke: "none" },
                tickLabels: { fill: "none" },
                grid: { stroke: "lightGray" }
              }}
            />
            <VictoryAxis dependentAxis
              style={{
                ticks: { stroke: "gray" },
                tickLabels: { fill: "gray", fontSize: 12 }
              }}
              crossAxis={false}
            />
            <VictoryBar
              style={{
                data: { fill: "#c43a31" }
              }}
              padding={{ left: 0, right: 0 }}
              data={sentimentData}
            />
          </VictoryChart>
        </div>
      </div>
    </div>
  ) 
}

class Services extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeMenu: 'Transport',
      data: [],
      loading: true,
    }

    this.updateFilterSelected = this.updateFilterSelected.bind(this);
  }

  componentDidMount() {
    const { activeMenu } = this.state;
    this.getData(activeMenu);
  }

  componentDidUpdate(prevProps, prevState) {
    const { activeMenu, loading } = this.state;
    if (loading) {
      this.getData(activeMenu);
    }
  }

  getData(activeMenu) {
    const articlesURL = `${LIBM_URL}/services_news/nlp/${activeMenu}/Stoke-On-Trent`;
    this.getFromURL(articlesURL)
    .then((response) => {
      let data = [];
      console.log(response)
      response.forEach((r) => {
        data.push(r);
      });

      // Now get from GOV UK
      const govURL = `${LIBM_URL}/gov/search/${activeMenu}/Stoke-On-Trent`;
      this.getFromURL(govURL)
      .then((response) => {
        response.results.forEach((r) => {
          data.push(r);
        })  
        this.setState({
          data: data,
          loading: false,
        })
      })
      .catch((err) => {
        console.log(err);
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  async getFromURL(url) {
    const res = await axios.get(url);
    const { data } = await res;
    return data;
  }

  updateFilterSelected(name) {
    // We change active name and also reset both
    // the data and loading
    this.setState({
      activeMenu: name,
      data: [],
      loading: true,
    })
  }

  renderFilterBar() {
    const { activeMenu } = this.state;

    return (
      <div className="filter-bar text-center">
        <FilterButton 
          activeMenu={activeMenu}
          name="Health"
          onClick={this.updateFilterSelected}
        />
        <FilterButton 
          activeMenu={activeMenu}
          name="Education"
          onClick={this.updateFilterSelected}
        />
        <FilterButton 
          activeMenu={activeMenu}
          name="Transport"
          onClick={this.updateFilterSelected}
        />
      </div>
    )
  }

  render() {
    const { activeMenu, data, loading } = this.state;

    return (
      <div className="services-wrapper">
        <div className="row">

          {this.renderFilterBar()}
          
          <p className="name">{activeMenu}</p>

            <div className="col">
              <SentimentCard
                loading={loading}
                data={data}
              />
              { activeMenu === 'Education' ? (
                <div className="card">
                  <div className="card-body">
                    <iframe
                    title="education-streetcheck"
                    className="streetcheck-iframe" 
                    src="https://www.streetcheck.co.uk/embed/postcode/st39fa"
                    scrolling="no" 
                    frameBorder="0" 
                    allowTransparency="true" 
                    seamless="seamless"
                  >inHtml</iframe>
                  </div>
                </div>
                ) : (<></>)
              }
            </div>

            <div className="col">
              <KeywordsCard
                loading={loading}
                data={data}
              />
            </div>
        
        </div>
      </div>
    );
  }
}

export default Services;