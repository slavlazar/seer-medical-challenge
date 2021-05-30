import { convertLineToBookingData } from './bookingHelper';

export const textFilesParser = (textFilesStringArray = []) => {
  if (!textFilesStringArray || !textFilesStringArray.length) return;

  try {
    return textFilesStringArray
      .map((textFileString) => {
        // Disabling here as we are splicing the header from the data, and do not require it after
        // eslint-disable-next-line no-unused-vars
        const [_, ...data] = textFileString.trim().split('\n');

        return data.map((line) => convertLineToBookingData(line.trim().split(',')));
      })
      .flat();
  } catch (_) {
    return;
  }
};
