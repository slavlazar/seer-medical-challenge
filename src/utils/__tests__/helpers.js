import { textFilesParser } from '../helpers';

describe('helpers', () => {
  describe('textFilesParser', () => {
    it.each([
      [undefined],
      [[]],
      ['there are no new lines here'],
      [
        `header
    new line`,
      ],
    ])('should return undefined for input of %o', (input) => {
      // Arrange
      const expected = undefined;

      // Act
      const actual = textFilesParser(input);

      // Assert
      expect(actual).toEqual(expected);
    });

    it.each([
      [
        [
          `header
        01 Mar 2020 11:00:00 GMT+1000, 300, 0001`,
        ],
        [
          {
            time: 1583024400000,
            duration: 18000000,
            userId: '0001',
          },
        ],
      ],
      [
        [
          `header,
        01 Mar 2020 11:00:00 GMT+1000, 300, 0001
        06 Mar 2020 03:00:00 GMT+1000, 480, 0002`,
        ],
        [
          { time: 1583024400000, duration: 18000000, userId: '0001' },
          { time: 1583427600000, duration: 28800000, userId: '0002' },
        ],
      ],
    ])('should return a valid result object for input of %o', (input, expected) => {
      // Act
      const actual = textFilesParser(input);

      // Assert
      expect(actual).toEqual(expected);
    });
  });
});
