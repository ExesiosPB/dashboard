import React from 'react';
import { connect } from 'react-redux';

import Navbar from '../Navbar/Navbar';
import Attractions from '../../screens/Attractions/Attractions';
import Transport from '../../screens/Transport/Transport';
import Facilites from '../../screens/Facilites/Facilites';
import Services from '../../screens/Services/Services';

import './Main.css';

class Main extends React.Component {
  render() {
    const sidebarActiveMenu = this.props.global.sidebar.activeMenu;
    let screenToRender;
    switch (sidebarActiveMenu) {
      case 'Attractions':
        screenToRender = <Attractions />;
        break;
      case 'Transport':
        screenToRender = <Transport />;
        break;
      case 'Facilites':
        screenToRender = <Facilites />;
        break;
      case 'Services':
        screenToRender = <Services />;
        break;
      default:
        screenToRender = <Attractions />;
    }

    return (
      <div className="main-panel">
        <Navbar />

        <div className="content">

            {screenToRender}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  global: state.global,
});

export default connect(mapStateToProps)(Main);