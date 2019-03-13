import { 
  SET_SIDEBAR_ACTIVE_MENU,
  SET_MAP_VIEWPORT,
  SET_MAP_WIDTH_HEIGHT,
  SET_MAP_MINIMIZED
} from './types';

// Updates the sidebar active menu
export const setSidebarActiveMenu = (menuName) => {
  return {
    type: SET_SIDEBAR_ACTIVE_MENU,
    payload: menuName
  };
};

export const setMapViewport = (viewport) => {
  return {
    type: SET_MAP_VIEWPORT,
    payload: viewport,
  };
};

export const setMapWidthHeight = (width, height) => {
  return {
    type: SET_MAP_WIDTH_HEIGHT,
    payload: {
      width,
      height
    }
  };
};

export const setMapMinimized = (minimized) => {
  return {
    type: SET_MAP_MINIMIZED,
    payload: minimized,
  };
};