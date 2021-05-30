import React, { useContext } from 'react';

import { BookingContext } from '../context/Provider';
import {
  Wrapper,
  BookingsContainer,
  Title,
  HourCell,
  DayCell,
  BookingCell,
  PendingCell,
} from './ui/Bookings';
import {
  sortBookings,
  generateHoursLabelArray,
  generateDaysLabelForSortedArray,
  addConflictVerification,
} from '../utils/bookingHelper';
import { BOOKINGS_GRID_COLUMNS } from '../utils/constants';

const hoursHeaderArray = generateHoursLabelArray(BOOKINGS_GRID_COLUMNS);

const Bookings = () => {
  const [{ bookings, pending }] = useContext(BookingContext);

  const sortedBookings = sortBookings([...bookings, ...pending]);
  const daysLabels = generateDaysLabelForSortedArray(sortedBookings);
  const pendingBookings = addConflictVerification(pending, bookings);

  return (
    <Wrapper>
      <Title>Bookings</Title>
      <BookingsContainer columns={BOOKINGS_GRID_COLUMNS} rows={daysLabels}>
        {hoursHeaderArray.map((hour, i) => (
          <HourCell key={i} index={i}>
            {hour}
          </HourCell>
        ))}
        {daysLabels.map((dayLabel, i) => (
          <DayCell key={i} index={i}>
            {dayLabel.label}
          </DayCell>
        ))}
        {bookings.map((booking, i) => {
          return <BookingCell key={i} date={new Date(booking.time)} duration={booking.duration} />;
        })}
        {pendingBookings.map((pending, i) => {
          return (
            <PendingCell
              key={i}
              date={new Date(pending.time)}
              duration={pending.duration}
              conflict={pending.conflict}
              data-conflict={pending.conflict}>
              {pending.conflict && 'Booking Conflict'}
            </PendingCell>
          );
        })}
      </BookingsContainer>
    </Wrapper>
  );
};

export default Bookings;
