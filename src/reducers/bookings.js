import { BOOKING_STATES } from '../utils/constants';

// Actions
const LOAD_BOOKINGS_START = 'challenge-booking-uploader/home/LOAD_BOOKINGS_START';
const LOAD_BOOKINGS_SUCCESS = 'challenge-booking-uploader/home/LOAD_BOOKINGS_SUCCESS';
const LOAD_BOOKINGS_ERROR = 'challenge-booking-uploader/home/LOAD_BOOKINGS_ERROR';
const LOAD_PENDING = 'challenge-booking-uploader/home/LOAD_PENDING';
const SAVE_PENDING_START = 'challenge-booking-uploader/home/SAVE_PENDING_START';
const SAVE_PENDING_SUCCESS = 'challenge-booking-uploader/home/SAVE_PENDING_SUCCESS';
const SAVE_PENDING_ERROR = 'challenge-booking-uploader/home/SAVE_PENDING_ERROR';

// Initial state
export const initialState = {
  bookings: [],
  pending: [],
  state: BOOKING_STATES.INITIAL,
  errors: [],
};

// Reducer
export default (state, { type, payload }) => {
  switch (type) {
    case LOAD_BOOKINGS_START:
      return {
        ...state,
        errors: [],
        state: BOOKING_STATES.LOADING,
      };
    case SAVE_PENDING_START:
      return {
        ...state,
        errors: [],
        state: BOOKING_STATES.LOADING_PENDING,
      };
    case LOAD_BOOKINGS_SUCCESS:
      return {
        ...state,
        bookings: [...payload],
        errors: [],
        state: BOOKING_STATES.SUCCESS,
      };
    case LOAD_BOOKINGS_ERROR:
    case SAVE_PENDING_ERROR:
      return {
        ...state,
        errors: [...payload],
        state: BOOKING_STATES.ERROR,
      };
    case LOAD_PENDING:
      return {
        ...state,
        pending: [...payload],
      };
    case SAVE_PENDING_SUCCESS:
      return {
        ...state,
        pending: [],
        state: BOOKING_STATES.PENDING_UPLOADED,
        errors: [],
      };
    default:
      return state;
  }
};

// Action creators
const generateErrorActionCreator = (type, payload) => ({
  type,
  payload: Array.isArray(payload) ? payload : [payload],
});

export const startLoadBookings = () => ({
  type: LOAD_BOOKINGS_START,
});

export const finishLoadBookings = (payload) => ({
  type: LOAD_BOOKINGS_SUCCESS,
  payload,
});

export const errorLoadBookings = (payload) =>
  generateErrorActionCreator(LOAD_BOOKINGS_ERROR, payload);

export const loadPending = (payload) => ({
  type: LOAD_PENDING,
  payload,
});

export const startSavePending = () => ({
  type: SAVE_PENDING_START,
});

export const finishSavePending = () => ({
  type: SAVE_PENDING_SUCCESS,
});

export const errorSavePending = (payload) =>
  generateErrorActionCreator(SAVE_PENDING_ERROR, payload);
