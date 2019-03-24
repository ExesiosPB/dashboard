import React from 'react';
import { connect } from 'react-redux';

import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';

// Pages
import Attractions from '../../pages/Attractions/Attractions';
import Services from '../../pages/Services/Services';
import Facilities from '../../pages/Facilities/Facilities';

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
    const sidebarActiveMenu = this.props.global.sidebar.activeMenu;
    let screenToRender;
    switch (sidebarActiveMenu) {
      case 'Attractions':
        screenToRender = <Attractions />;
        break;
      case 'Transport':
        // screenToRender = <Transport />;
        break;
      case 'Facilites':
        screenToRender = <Facilities />;
        break;
      case 'Services':
        screenToRender = <Services />;
        break;
      default:
        screenToRender = <Attractions />;
    }

    return (
      <div className='wrapper'>
        <Sidebar />

        <div className="main">
          <Navbar />
          {screenToRender}
        </div>
      </div>
    )
  }
}

// <button onClick={this.logout}>Logout</button>

const mapStateToProps = state => ({
  auth: state.auth,
  global: state.global,
});

export default connect(mapStateToProps, { clearCurrentUser })(Home);
