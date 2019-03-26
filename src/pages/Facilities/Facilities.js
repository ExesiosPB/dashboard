import React from 'react';
import axios from 'axios';
import { render } from 'react-dom';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';

import {
  VictoryChart,
  VictoryAxis,
  VictoryBar
} from 'victory';

import { LIBM_URL, LIBM_OTHER_URL } from '../../utils/utils';

let data = []

const FilterButton = ({activeMenu, name, onClick}) => {
  const isActive = (activeMenu === name) ? true : false;
  return (
    <div className="filter-button-wrapper">
      <button
        className={"filter-button" + (isActive ? "-active": "")}
        onClick={() => onClick(activeMenu)}
      >
        {activeMenu}
      </button>
    </div>
  )
}

const ShowFlikr = ({loading, data}) => {
  let flikrData = [];
  console.log(data)
  console.log(loading)

  data.forEach((val, index) => {
    flikrData.push({
      src: val.imageurl
    })
  });
  console.log(flikrData)

    return (
      <div>
      <Gallery photos={flikrData}/>
      </div>
    )

}

// Have a placeholder when it loads, will be replaced when the new photos are gotten
let photos = [
  { src: 'https://farm8.staticflickr.com/7863/33574306728_ce9501f6f5_m.jpg' },
  { src: 'https://farm8.staticflickr.com/7885/33565551078_875241b5b8_m.jpg'},
];

class Services extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeMenu: 'Stoke',
      data: [],
      loading: true,
      lightboxIsOpen: false,
			currentImage: 0,
      value: '',
    }
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);

    this.addValue = this.addValue.bind(this);
    this.updateInput = this.updateInput.bind(this);

    this.updateFilterSelected = this.updateFilterSelected.bind(this);
  }

  openLightbox (index, event) {
		event.preventDefault();
		this.setState({
			currentImage: index,
			lightboxIsOpen: true,
		});
	}
	closeLightbox () {
		this.setState({
			currentImage: 0,
			lightboxIsOpen: false,
		});
	}
	gotoPrevious () {
		this.setState({
			currentImage: this.state.currentImage - 1,
		});
	}
	gotoNext () {
		this.setState({
			currentImage: this.state.currentImage + 1,
		});
	}
	gotoImage (index) {
		this.setState({
			currentImage: index,
		});
	}
	handleClickImage () {
		if (this.state.currentImage === this.props.images.length - 1) return;

		this.gotoNext();
	}

  addValue(evt)
  {
    evt.preventDefault();
    if(this.state.value !=undefined)
    {
      alert('Your input value is: ' + this.state.value)
    }
  }
  updateInput(evt){
    this.state={value: evt.target.value};
    // this.setState({
    //   activeMenu: evt.target.value,
    // })
    // this.state={value: evt.target.value};
  }

  componentDidMount() {
    const { activeMenu } = this.state;
    console.log(this.state)
    this.getData(activeMenu);
  }

  componentDidUpdate(prevProps, prevState) {
    const { activeMenu, data, loading } = this.state;
    console.log(this.state)
    if (loading) {
      this.getData(activeMenu);
    }
  }

  getData(activeMenu) {

    const place = activeMenu
    const articlesURL = `${LIBM_OTHER_URL}/social/flikr/` + place;
    const data = [];
    this.getFromURL(articlesURL)
    .then((response) => {
      console.log(response)
      console.log(response.photos.photo)
      response.photos.photo.forEach((r) => {
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
    console.log(data)

  }


  async getFromURL(url) {
    const res = await axios.get(url);
    const { data } = await res;
    return data;
  }


  updateFilterSelected(name) {
    const articlesURL = `${LIBM_OTHER_URL}/social/flikr/` + name;
    // let data = []
    const place = name
    this.getFromURL(articlesURL)
    .then((response) => {
      let data = [];
      console.log(response)
      console.log(response.photos.photo)
      response.photos.photo.forEach((r) => {
        data.push(r);
      });
    })
    this.setState({
      activeMenu: name,
      data: data,
      loading: true,
    })

    console.log(this.state.data)
    console.log(data)

    return (
      <div>
      <Gallery
        photos={photos}
        onClick={this.openLightbox} />
      <Lightbox photos={photos}
        onClose={this.closeLightbox}
        onClickPrev={this.gotoPrevious}
        onClickNext={this.gotoNext}
        currentImage={this.state.currentImage}
        isOpen={this.state.lightboxIsOpen}
      />
        </div>
    )
  }

  renderFilterBar() {
    const { activeMenu, value } = this.state;
    console.log(data)

    return (
      <div className="filter-bar text-center">
      <input type="text" /><br/><br/>
        <FilterButton
          activeMenu={activeMenu}
          name="Load images"
          onClick={this.updateFilterSelected}
        />
        <FilterButton
          activeMenu={activeMenu}
          name="stoke"
          onClick={this.updateFilterSelected}
        />
        <FilterButton
          activeMenu={activeMenu}
          name="london"
          onClick={this.updateFilterSelected}
        />
      </div>
    )
  }

  render() {
    const { activeMenu, data, loading, lightboxIsOpen, currentImage, images, value } = this.state;



    return (
      <div className="services-wrapper">
        <div className="row">



        {this.renderFilterBar()}

          <p className="name">{activeMenu}</p>

            <div className="col">
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
              <div className="2asdf">
              {loading}
              </div>
              <div>
                <ShowFlikr
                  loading={loading}
                  data={data}

                />
              </div>


              <div className="col">

              </div>





        </div>
      </div>
    );
  }
}

export default Services;
