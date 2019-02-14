import { SET_SIDEBAR_ACTIVE_MENU } from './types';

// Updates the sidebar active menu
export const setSidebarActiveMenu = (menuName) => {
  return {
    type: SET_SIDEBAR_ACTIVE_MENU,
    payload: menuName
  };
};