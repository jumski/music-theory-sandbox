import React from 'react';

const CurrentUserContext = React.createContext(null);

export const withCurrentUser = Component => props => (
  <CurrentUserContext.Consumer>
    {currentUser => <Component {...props} currentUser={currentUser}/>}
  </CurrentUserContext.Consumer>
);

export default CurrentUserContext;
