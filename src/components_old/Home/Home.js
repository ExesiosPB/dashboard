import React from 'react';
import { connect } from 'react-redux';

import './Home.css';

import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Main/Main';
import { clearCurrentUser } from '../../actions/authActions';
import { ACCOUNTS_URL } from '../../utils/utils';

class Home extends React.Component {
  constructor(props) {
    super(props);
  
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    // User isn't logged in so send to accounts server /logout
    if (!this.props.auth.isAuthenticated) {
      window.location.href = `${ACCOUNTS_URL}/logout`;
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.auth.isAuthenticated !== prevProps.auth.isAuthenticated) {
      window.location.href = `${ACCOUNTS_URL}/logout`;
    }   
  }

  logout(e) {
    e.preventDefault();
    this.props.clearCurrentUser();
  }

  render() {
    return (
      <div className='wrapper'>
        <Sidebar onLogoutPress={this.logout} />
        <Main />
      </div>
    )
  }
}

// <button onClick={this.logout}>Logout</button>

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { clearCurrentUser })(Home);