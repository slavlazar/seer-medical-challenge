const convertDuration = (duration) => duration * 60 * 1000;

export const doBookingsConflict = (
  { time: oldBookingStartTimeMs, duration: oldBookingDurationMs } = {},
  { time: newBookingStartTimeMs, duration: newBookingDurationMs } = {}
) => {
  const oldBookingEndTimeMs = oldBookingStartTimeMs + oldBookingDurationMs;
  const newBookingEndTimeMs = newBookingStartTimeMs + newBookingDurationMs;

  return oldBookingStartTimeMs < newBookingEndTimeMs && oldBookingEndTimeMs > newBookingStartTimeMs;
};

export const convertLineToBookingData = (line = []) => {
  try {
    if (!Array.isArray(line)) {
      throw new Error('Invalid input');
    }

    const [time, duration, userId] = line;

    return {
      time: new Date(time).getTime(),
      duration: convertDuration(duration),
      userId: userId.trim(),
    };
  } catch (_) {
    return {};
  }
};

export const sortBookings = (bookings = []) => {
  try {
    return bookings.sort(({ time: aTime }, { time: bTime }) => aTime - bTime);
  } catch (_) {
    return bookings;
  }
};

export const generateHoursLabelArray = (hoursToGenerate, startHour = 0) => {
  try {
    if (hoursToGenerate + startHour > 24) {
      throw new Error('Can only generate 24 hours in a day!');
    }

    return Array(hoursToGenerate)
      .fill()
      .map((_, i) => {
        const hour = i + startHour;

        if (hour <= 23) {
          const date = new Date(`2020-01-01T${hour.toString().padStart(2, '0')}:00:00`);

          let hours = date.getHours();
          let minutes = date.getMinutes();
          const ampm = hours >= 12 ? 'pm' : 'am';
          hours = hours % 12;
          hours = hours ? hours : 12;
          minutes = minutes.toString().padStart(2, '0');
          return `${hours}:${minutes}${ampm}`;
        }
      });
  } catch (_) {
    return [];
  }
};

export const generateDayLabelForDate = (date) => {
  try {
    return date.toLocaleString('en-AU', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  } catch (_) {
    return '';
  }
};

export const generateDaysLabelForSortedArray = (allBookings = []) => {
  try {
    const { 0: firstDate, [allBookings.length - 1]: lastDate } = allBookings;

    const daysLabels = [];
    const startDate = new Date(firstDate.time);
    const endDate = new Date(lastDate.time);

    while (startDate <= endDate) {
      daysLabels.push({
        label: generateDayLabelForDate(startDate),
        date: new Date(startDate),
      });
      startDate.setDate(startDate.getDate() + 1);
    }

    return daysLabels;
  } catch (_) {
    return [];
  }
};

export const getPendingBookingsForUpload = (pendingArray = []) => {
  try {
    return pendingArray.filter(({ conflict }) => !conflict);
  } catch (_) {
    return [];
  }
};

export const addConflictVerification = (pendings = [], bookings = []) => {
  try {
    return pendings.map((pendingResult) => ({
      ...pendingResult,
      conflict: !!bookings.find((booking) => doBookingsConflict(pendingResult, booking)),
    }));
  } catch (_) {
    return [];
  }
};
