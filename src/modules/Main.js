import React, { useContext, useEffect, useCallback } from 'react';

import Dropzone from '../components/Dropzone';
import Bookings from '../components/Bookings';
import StatusResponse from '../components/StatusResponse';
import Upload from '../components/Upload';
import { GlobalStyle } from '../components/ui/GlobalStyle';
import { Wrapper, Header, Logo } from '../components/ui/Main';
import { BookingContext } from '../context/Provider';
import { textFilesParser } from '../utils/helpers';
import { API_URL, BOOKING_STATES } from '../utils/constants';
import {
  startLoadBookings,
  finishLoadBookings,
  errorLoadBookings,
  loadPending,
} from '../reducers/bookings';

const Main = () => {
  const [{ state: appState, errors }, dispatch] = useContext(BookingContext);

  useEffect(() => {
    const fetchData = async () => {
      if (BOOKING_STATES.INITIAL !== appState && BOOKING_STATES.PENDING_UPLOADED !== appState) {
        return;
      }

      dispatch(startLoadBookings());

      try {
        const results = await (await fetch(`${API_URL}/bookings`)).json();

        dispatch(finishLoadBookings(results));
      } catch (error) {
        dispatch(errorLoadBookings(error));
      }
    };

    fetchData();
  }, [dispatch, appState]);

  const onUploadedFiles = useCallback(
    (results) => {
      const parsedFiles = textFilesParser(results);

      dispatch(loadPending(parsedFiles));
    },
    [dispatch]
  );

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Header>
          <Logo href="#" title="Seer Medical">
            Seer Medical
          </Logo>
        </Header>
        <Dropzone onUploadedFiles={onUploadedFiles} accept=".csv" />
        <StatusResponse appState={appState} errors={errors} />
        <Bookings />
        <Upload />
      </Wrapper>
    </>
  );
};

export default Main;
