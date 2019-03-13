import React from 'react';
import axios from 'axios';

import { LIBM_URL } from '../../utils/utils';

const DisplayInformation = (props) => {
  const {
    phone,
    location,
    name,
    rating,
    url
  } = props;

  let displayLocation = "";
  location.display_address.forEach((part) => {
    displayLocation += `${part}, `
  });

  return (
    <section className="display-information">
      <p className="name">{name}</p>
      <p className="location">{displayLocation}</p>
      
      <div className="rating">
        <p className="rating-figure">{rating}</p>
        <div className="icon">
          <i class="fas fa-star"></i>
        </div>
      </div>
    
      <p className="phone">{phone}</p>
    </section>
  )
}

const ReviewsCard = (props) => {
  const { loading, data } = props;

  console.log(data);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Reviews</h5>

        { loading 
          ? <p>Loading</p> 
          : data.map((review) => {
            return (
              <div className="review">
                <p>{review.text}</p>
              </div>
            )
          })
        }

      </div>
    </div>
  )
}

class AttractionsModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: {
        loading: true,
        data: []
      },
      sentimentLoading: true,
      imagesLoading: true,
    }
  }

  componentDidMount() {
    const { venue } = this.props;
    
    // We get reviews
    const reviewsURL = `${LIBM_URL}/social/yelp/reviews/${venue.id}`;
    this.getFromURL(reviewsURL)
    .then((response) => {
      this.setState({
        reviews: {
          loading: false,
          data: response.reviews,
        }
      });
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

  render () {
    const { styles, onClose, venue} = this.props;

    console.log(venue);

    return (
      <div className="modal" id="attractionsModal" tabIndex="-1" role="dialog" style={styles}>
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">

            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" onClick={onClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <div className="row">
                <div className="col">

                  <DisplayInformation
                    phone={venue.display_phone}
                    location={venue.location}
                    name={venue.name}
                    rating={venue.rating}
                    url={venue.url}
                  />

                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Sentiment</h5>
                    </div>
                  </div>

                  <ReviewsCard
                    loading={this.state.reviews.loading}
                    data={this.state.reviews.data}
                  />

                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Images</h5>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default AttractionsModal;