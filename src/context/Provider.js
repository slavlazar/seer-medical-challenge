import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

import reducer, { initialState } from '../reducers/bookings';

export const BookingContext = React.createContext(initialState);

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <BookingContext.Provider value={[state, dispatch]}>{children}</BookingContext.Provider>;
};

Provider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default Provider;
