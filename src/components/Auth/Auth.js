import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import { setCurrentUser } from '../../actions/authActions';
import { ACCOUNTS_URL } from '../../utils/utils';

const authUser = (token) => (dispatch) => {
  axios.get(`${ACCOUNTS_URL}/token/${token}`)
  .then((response) => {
    if (response.status === 200) {
      const jwtToken = response.data.token;
      const decoded = jwtDecode(jwtToken);

      // Save the jwt token to local storage
      localStorage.setItem('jwtToken', jwtToken);
      dispatch(setCurrentUser(decoded));
    }
  })
  .catch((err) => {
    console.log('Error', err);
  })
};

class Auth extends React.Component {
  constructor(props) {
    super(props);

    const { token } = props.match.params;
    this.state = {
      token: token,
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    } else {
      const token = this.state.token;
      this.props.authUser(token);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.auth.isAuthenticated !== prevProps.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div>Loading...</div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { authUser })(withRouter(Auth));