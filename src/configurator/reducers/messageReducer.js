import * as types from '../actions/actionTypes';

export default function messageReducer(state = [], action) {
  switch (action.type) {
    case types.UPDATE_CONFIGURATOR_SUCCESS:
      return [...action.result.validationMessages];
    case types.SAVE_RECOVERABLE_FAILURE:
      return [...action.validationMessages];
  }
  return state;
}
