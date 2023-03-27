import React from 'react';

export const navigationRef = React.createRef(null);

export const customNavigate = (route, params) => {
  if (navigationRef.current) {
    navigationRef.current.navigate(route, params)
  }
}

