import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, ErrorContainer, ErrorMessage } from './ui/Error';
import { Spinner } from './ui/Spinner';
import { BOOKING_STATES } from '../utils/constants';

const StatusResponse = ({ appState, errors = [] }) => {
  if (BOOKING_STATES.LOADING === appState || BOOKING_STATES.LOADING_PENDING === appState) {
    return <Spinner />;
  }

  if (BOOKING_STATES.ERROR !== appState) {
    return null;
  }

  return (
    <Wrapper>
      <ErrorContainer>
        An error has occurred!
        {errors.map((error, i) => (
          <ErrorMessage key={i}>{error.toString()}</ErrorMessage>
        ))}
      </ErrorContainer>
    </Wrapper>
  );
};

StatusResponse.propTypes = {
  appState: PropTypes.oneOf(Object.values(BOOKING_STATES)),
  errors: PropTypes.array,
};

export default StatusResponse;
