import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function templateReducer(state = initialState.templates, action) {
  switch(action.type) {
    case types.LOAD_TEMPLATES_SUCCESS:
      return Object.assign({}, action.templates);
    default:
      return state;
  }
}