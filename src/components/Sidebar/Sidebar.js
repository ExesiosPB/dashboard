import React from 'react';
import { connect } from 'react-redux';

import { setSidebarActiveMenu } from '../../actions/globalActions';

const NavItem = ({sidebarActiveMenu, name, onClick}) => {
  const isActive = (sidebarActiveMenu === name) ? true : false;
  return (
    <li className={isActive ? 'nav-item active' : 'nav-item'}>
      <a onClick={() => onClick(name)} value={name} className='nav-link'>{name}</a>
    </li>
  )
};

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.sidebarMenuClick = this.sidebarMenuClick.bind(this);
  }

  sidebarMenuClick(name) {
    this.props.updateSidebarActiveMenu(name);
  }

  render() {
    const activeMenu = this.props.global.sidebar.activeMenu;
    return (
      <div className="sidebar">
        <div className="sidebar-wrapper">
          
          <div className="brand">
          </div>

          <ul className="nav">
            <NavItem 
              sidebarActiveMenu={activeMenu}
              name="Attractions"
              onClick={this.sidebarMenuClick}
            />
            <NavItem 
              sidebarActiveMenu={activeMenu}
              name="Transport"
              onClick={this.sidebarMenuClick}
            />
            <NavItem 
              sidebarActiveMenu={activeMenu}
              name="Facilites"
              onClick={this.sidebarMenuClick}
            />
            <NavItem 
              sidebarActiveMenu={activeMenu}
              name="Services"
              onClick={this.sidebarMenuClick}
            />
          </ul>

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  global: state.global,
})

const mapDispatchToProps = dispatch => ({
  updateSidebarActiveMenu: (name) => {
    dispatch(setSidebarActiveMenu(name))
  },
})


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);