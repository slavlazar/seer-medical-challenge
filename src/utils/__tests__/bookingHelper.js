import {
  doBookingsConflict,
  convertLineToBookingData,
  sortBookings,
  generateHoursLabelArray,
  generateDayLabelForDate,
  generateDaysLabelForSortedArray,
  getPendingBookingsForUpload,
  addConflictVerification,
} from '../bookingHelper';

describe('bookingHelper', () => {
  describe('doBookingsConflict', () => {
    it.each([[undefined], [({}, {})]])('should return false for invalid input of %o', (input) => {
      // Arrange
      const expected = false;

      // Act
      const actual = doBookingsConflict(input);

      // Assert
      expect(actual).toEqual(expected);
    });

    it.each([
      [[new Date(), 18000000], [new Date(), 28800000], true],
      [
        [new Date('01 Mar 2020 11:00:00 GMT+1000'), 10800000],
        [new Date('01 Mar 2020 11:00:00 GMT+1000'), 18000000],
        true,
      ],
      [
        [new Date('01 Mar 2020 11:00:00 GMT+1000'), 10800000],
        [new Date('01 Mar 2020 09:00:00 GMT+1000'), 18000000],
        true,
      ],
      [
        [new Date('02 Mar 2020 11:00:00 GMT+1000'), 10800000],
        [new Date('02 Mar 2020 14:00:00 GMT+1000'), 18000000],
        false,
      ],
      [
        [new Date('03 Mar 2020 11:00:00 GMT+1000'), 10800000],
        [new Date('03 Mar 2020 16:00:00 GMT+1000'), 18000000],
        false,
      ],
    ])(
      'should return, for given inputs of "%o" and "%o", a value of %o',
      (input1Array, input2Array, expected) => {
        // Arrange
        const [time1, duration1] = input1Array;
        const [time2, duration2] = input2Array;

        // Act
        const actual = doBookingsConflict(
          {
            time: time1.getTime(),
            duration: duration1,
          },
          {
            time: time2.getTime(),
            duration: duration2,
          }
        );

        // Assert
        expect(actual).toEqual(expected);
      }
    );
  });

  describe('convertLineToBookingData', () => {
    it.each([[undefined], [[]], ['not an array']])(
      'should return an empty object of invalid data input "%s"',
      (input) => {
        // Arrange
        const expected = {};

        // Act
        const actual = convertLineToBookingData(input);

        // Assert
        expect(actual).toEqual(expected);
      }
    );

    it.each([
      [
        ['01 Mar 2020 11:00:00 GMT+1000', 300, '0001'],
        [1583024400000, 18000000, '0001'],
      ],
      [
        ['02 Mar 2020 14:00:00 GMT+1000', 300, ' 0001'],
        [1583121600000, 18000000, '0001'],
      ],
      [
        ['06 Mar 2020 03:00:00 GMT+1000', 480, '  0002   '],
        [1583427600000, 28800000, '0002'],
      ],
    ])('should return, given a valid input of "%o", a result of "%o"', (input, expectedArray) => {
      // Arrange
      const [time, duration, userId] = expectedArray;
      const expected = { time, duration, userId };

      // Act
      const actual = convertLineToBookingData(input);

      // Assert
      expect(actual).toEqual(expected);
    });
  });

  describe('sortBookings', () => {
    it.each([['not an array'], [{}]])(
      'should return the provided input of "%o" if cannot sort',
      (input) => {
        // Arrange
        const expected = input;

        // Act
        const actual = sortBookings(input);

        // Assert
        expect(actual).toEqual(expected);
      }
    );

    it.each([
      [
        [
          '01 Mar 2020 11:00:00 GMT+1000',
          '04 Mar 2020 11:00:00 GMT+1000',
          '02 Mar 2020 14:00:00 GMT+1000',
        ],
        [
          '01 Mar 2020 11:00:00 GMT+1000',
          '02 Mar 2020 14:00:00 GMT+1000',
          '04 Mar 2020 11:00:00 GMT+1000',
        ],
      ],
      [
        [
          '04 Mar 2020 11:00:00 GMT+1000',
          '06 Mar 2020 14:00:00 GMT+1000',
          '03 Mar 2020 16:00:00 GMT+1000',
          '06 Mar 2020 03:00:00 GMT+1000',
          '03 Mar 2020 06:00:00 GMT+1000',
        ],
        [
          '03 Mar 2020 06:00:00 GMT+1000',
          '03 Mar 2020 16:00:00 GMT+1000',
          '04 Mar 2020 11:00:00 GMT+1000',
          '06 Mar 2020 03:00:00 GMT+1000',
          '06 Mar 2020 14:00:00 GMT+1000',
        ],
      ],
    ])(
      'should return a sorted array given a valid array of arrays "%o"',
      (inputArray, expectedArray) => {
        // Arrange
        const convertToObject = (data) => {
          const date = new Date(data);

          return { time: date.getTime() };
        };

        const input = inputArray.map(convertToObject);
        const expected = expectedArray.map(convertToObject);

        // Act
        const actual = sortBookings(input);

        // Assert
        expect(actual).toEqual(expected);
      }
    );
  });

  describe('generateHoursLabelArray', () => {
    it.each([
      [25, 0],
      [24, 1],
      [0, 25],
    ])(
      'should return an empty array as total hours exceeds day; hoursToGenerate: "%d", startHour: "%d"',
      (hoursToGenerate, startHour) => {
        // Arrange
        const expected = [];

        // Act
        const actual = generateHoursLabelArray(hoursToGenerate, startHour);

        // Assert
        expect(actual).toEqual(expected);
      }
    );

    it('should generate a valid hours array for valid input', () => {
      // Arrange
      const expected = [
        '12:00am',
        '1:00am',
        '2:00am',
        '3:00am',
        '4:00am',
        '5:00am',
        '6:00am',
        '7:00am',
        '8:00am',
        '9:00am',
        '10:00am',
        '11:00am',
        '12:00pm',
        '1:00pm',
        '2:00pm',
        '3:00pm',
        '4:00pm',
        '5:00pm',
        '6:00pm',
        '7:00pm',
        '8:00pm',
        '9:00pm',
        '10:00pm',
        '11:00pm',
      ];

      // Act
      const actual = generateHoursLabelArray(24);

      // Assert
      expect(actual).toEqual(expected);
    });

    it('should generate a valid hours array given start hour is valid', () => {
      // Arrange
      const expected = ['5:00pm', '6:00pm', '7:00pm', '8:00pm', '9:00pm', '10:00pm', '11:00pm'];

      // Act
      const actual = generateHoursLabelArray(7, 17);

      // Assert
      expect(actual).toEqual(expected);
    });
  });

  describe('generateDayLabelForDate', () => {
    it.each([[undefined], ['']])(
      'should return an empty string for invalid input "%o%',
      (input) => {
        // Arrange
        const expected = '';

        // Act
        const actual = generateDayLabelForDate(input);

        // Assert
        expect(actual).toEqual(expected);
      }
    );

    it.each([
      ['01 Mar 2020 11:00:00 GMT+1000', '01/03/2020'],
      ['02 Mar 2020 14:00:00 GMT+1000', '02/03/2020'],
      ['03 Mar 2020 11:00:00 GMT+1000', '03/03/2020'],
      ['04 Mar 2020 11:00:00 GMT+1000', '04/03/2020'],
      ['06 Mar 2020 14:00:00 GMT+1000', '06/03/2020'],
      ['03 Mar 2020 16:00:00 GMT+1000', '03/03/2020'],
      ['06 Mar 2020 03:00:00 GMT+1000', '06/03/2020'],
      ['03 Mar 2020 06:00:00 GMT+1000', '03/03/2020'],
    ])(
      'should return, given an input date of "%s", should return "%s"',
      (inputDateString, expected) => {
        // Arrange
        const input = new Date(inputDateString);

        // Act
        const actual = generateDayLabelForDate(input);

        // Assert
        expect(actual).toEqual(expected);
      }
    );
  });

  describe('generateDaysLabelForSortedArray', () => {
    it.each([[undefined], [[]], ['not an array']])(
      'should return an empty array given invalid input of "%o"',
      (input) => {
        // Arrange
        const expected = [];

        // Act
        const actual = generateDaysLabelForSortedArray(input);

        // Assert
        expect(actual).toEqual(expected);
      }
    );

    it('should return the right labels for valid input', () => {
      // Arrange
      const allBookings = [
        { time: 1583024400000 },
        { time: 1583121600000 },
        { time: 1583179200000 },
        { time: 1583197200000 },
        { time: 1583215200000 },
        { time: 1583283600000 },
        { time: 1583427600000 },
        { time: 1583467200000 },
      ];
      const expected = [
        { date: expect.any(Date), label: '01/03/2020' },
        { date: expect.any(Date), label: '02/03/2020' },
        { date: expect.any(Date), label: '03/03/2020' },
        { date: expect.any(Date), label: '04/03/2020' },
        { date: expect.any(Date), label: '05/03/2020' },
        { date: expect.any(Date), label: '06/03/2020' },
      ];

      // Act
      const actual = generateDaysLabelForSortedArray(allBookings);

      // Assert
      expect(actual).toEqual(expected);
    });
  });

  describe('getPendingBookingsForUpload', () => {
    it.each([[null], ['not an array'], [{}]])(
      'should return an empty array for an invalid input of "%o"',
      (input) => {
        // Arrange
        const expected = [];

        // Act
        const actual = getPendingBookingsForUpload(input);

        // Assert
        expect(actual).toEqual(expected);
      }
    );

    it('should return array of non conflicting bookings', () => {
      // Arrange
      const input = [
        { time: 1234, conflict: false },
        { time: 2345, conflict: true },
        { time: 3456, conflict: true },
        { time: 4567, conflict: false },
      ];

      const expected = [
        { time: 1234, conflict: false },
        { time: 4567, conflict: false },
      ];

      // Act
      const actual = getPendingBookingsForUpload(input);

      // Assert
      expect(actual).toEqual(expected);
    });
  });

  describe('addConflictVerification', () => {
    it.each([[undefined], [{}]])('should return an empty array for invalid input %o', (input) => {
      // Arrange
      const expected = [];

      // Act
      const actual = addConflictVerification(input);

      // Assert
      expect(actual).toEqual(expected);
    });

    it('should return valid conflict for conflicting bookings', () => {
      // Arrange
      const pendings = [
        { time: 1583024400000, duration: 18000000 },
        { time: 1583121600000, duration: 18000000 },
        { time: 1583283600000, duration: 10800000 },
      ];
      const bookings = [
        { time: 1583024400000, duration: 10800000 },
        { time: 1583110800000, duration: 10800000 },
        { time: 1583283600000, duration: 10800000 },
      ];
      const expected = [
        { time: 1583024400000, duration: 18000000, conflict: true },
        { time: 1583121600000, duration: 18000000, conflict: false },
        { time: 1583283600000, duration: 10800000, conflict: true },
      ];

      // Act
      const actual = addConflictVerification(pendings, bookings);

      // Assert
      expect(actual).toEqual(expected);
    });
  });
});
