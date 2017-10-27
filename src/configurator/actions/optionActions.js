import * as types from './actionTypes';
import axios from 'axios';
import * as choiceActions from './choiceActions';
import db from './../localstorage/dexieDB';

export function createOption(option) {
  return { type: types.CREATE_OPTION, option };
}

export function loadOptionsSuccess(options,userDefaults) {
  return { type: types.LOAD_OPTIONS_SUCCESS, groups: options.groups, userDefaults: userDefaults };
}

export function choiceChanged(optionId, choiceId, choiceValue) {
  return { type: types.CHOICE_CHANGED_SUCCESS, optionId: optionId, choiceId: choiceId, choiceValue: choiceValue };
}

export function updatePrice() {
  return (dispatch, getState) => {
    let options = getState().configurator.options;

    let selections = getState().configurator.choices
    .filter(function (item) { return item.isSelected; })
    .map(function (item) {
      return {
        optionId: item.optionId,
        choiceId: item.id,
        value: item.value,
        optionTags: options.find(o => o.id == item.optionId).tags
      };
    });

    document.dispatchEvent(new CustomEvent('price_changing'));

    getState().templates.getPricing(getState().settings, selections)
    .then(response => {
      document.dispatchEvent(new CustomEvent('price_changed',{
        detail: {
          price: response.data.price
        }
      }));
    });
  };
}


// thunks
export function loadOptions() {
  return (dispatch, getState) => {
    const settings = getState().settings;

    return axios({
      url: settings.getOptionsApi,
      method: 'GET',
      headers: {
        'Content-Type': "application/json"
      }
    }).then(response => {
      db.choices.get(window.location.pathname,function(res){
        let userDefaults = [];
        if(res){
          res.choices.forEach(function(choice){
            userDefaults[choice.internalName] = {isSelected:choice.isSelected,value:choice.value};
          });
        }
        dispatch(loadOptionsSuccess(response.data,userDefaults));
        dispatch(updatePrice());
      });
    });
  };
}
