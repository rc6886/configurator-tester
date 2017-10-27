import * as types from './actionTypes';

export function loadTemplates(templates) {
  return { type: types.LOAD_TEMPLATES_SUCCESS, templates};
}