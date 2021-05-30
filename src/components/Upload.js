import React, { useContext, useMemo } from 'react';

import { BookingContext } from '../context/Provider';
import { Wrapper, ConflictsContainer, SaveButton } from './ui/Upload';
import { startSavePending, finishSavePending, errorSavePending } from '../reducers/bookings';
import { getPendingBookingsForUpload } from '../utils/bookingHelper';
import { API_URL } from '../utils/constants';

const Upload = () => {
  const [{ pending }, dispatch] = useContext(BookingContext);
  const validBookings = useMemo(() => getPendingBookingsForUpload(pending), [pending]);

  if (!pending || !pending.length) {
    return null;
  }

  const handleOnSave = async (e) => {
    e.preventDefault();

    dispatch(startSavePending());

    try {
      // eslint-disable-next-line no-unused-vars
      const result = await fetch(`${API_URL}/bookings`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validBookings),
      });

      dispatch(finishSavePending(result));
    } catch (error) {
      dispatch(errorSavePending(error));
    }
  };

  return (
    <Wrapper>
      {validBookings.length !== pending.length && (
        <ConflictsContainer>
          Your booking requests contain conflicts with our current bookings.{'\n'}Please note, all
          conflicting bookings will not be saved!
        </ConflictsContainer>
      )}
      <SaveButton onClick={handleOnSave}>Save Bookings</SaveButton>
    </Wrapper>
  );
};

export default Upload;
