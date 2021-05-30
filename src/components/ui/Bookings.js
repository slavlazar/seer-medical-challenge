import styled from 'styled-components';
import { lighten, darken, rgba } from 'polished';

import { HOURS_TO_MS } from '../../utils/constants';
import { generateDayLabelForDate } from '../../utils/bookingHelper';

export const Wrapper = styled.section`
  background: transparent;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: ${(props) => props.theme.font.size.xxlarge};
  font-weight: ${(props) => props.theme.font.weight.normal};
  line-height: ${(props) => props.theme.lineHeight.header};
  text-align: center;
  padding: 1.6rem 0 0.5rem;
`;

const convertDayStringToRowTemplateName = (dateObject = new Date()) =>
  `day-${generateDayLabelForDate(dateObject).replace(/\//g, '-')}`;

const generateTemplateRows = (rows = []) =>
  rows.reduce(
    (accum, { date }) => `${accum} [${convertDayStringToRowTemplateName(date)}] 1fr`,
    '[header] auto'
  );

export const BookingsContainer = styled.div`
  padding: 1rem 0 0;
  display: grid;
  grid-template-columns: repeat(${(props) => (props.columns ? ++props.columns : 25)}, 1fr);
  grid-template-rows: ${(props) => generateTemplateRows(props.rows)};
`;

const DateTimeCell = styled.time`
  background-color: ${(props) => props.theme.colour.heading};
  border: 1px solid ${(props) => lighten(0.01, props.theme.colour.heading)};
  color: ${(props) => lighten(0.75, props.theme.colour.heading)};
  font-size: ${(props) => props.theme.font.size.xsmall};
  padding: 1.4rem 0.8rem;
`;

export const HourCell = styled(DateTimeCell)`
  align-self: flex-end;
  text-align: center;
  grid-column-start: ${(props) => props.index + 2};
  grid-row: header;
`;

export const DayCell = styled(DateTimeCell)`
  grid-row-start: ${(props) => (props.index ? props.index + 2 : 2)};
`;

const BaseBookingCell = styled.div`
  position: relative;
  border-radius: 2rem;
  margin: 0.5rem 0;
  grid-column: ${(props) => props.date.getHours() + 1} / span
    ${(props) => props.duration / HOURS_TO_MS};
  grid-row: ${(props) => convertDayStringToRowTemplateName(props.date)};
`;

export const BookingCell = styled(BaseBookingCell)`
  background-color: ${(props) => props.theme.colour.secondary};
  border: 1px solid ${(props) => darken(0.04, props.theme.colour.secondary)};
`;

const getPendingColour = ({ conflict, theme }) =>
  conflict ? theme.colour.primary : theme.colour.pending;

export const PendingCell = styled(BaseBookingCell)`
  background-color: ${(props) => rgba(getPendingColour(props), 0.75)};
  border: 1px solid ${(props) => darken(0.04, getPendingColour(props))};
  z-index: 2;
  color: ${(props) => lighten(0.5, getPendingColour(props))};
  font-size: ${(props) => props.theme.font.size.xxsmall};
  display: flex;
  align-items: center;
  justify-content: center;
`;
