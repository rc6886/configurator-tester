import * as types from './actionTypes';
import db from './../localstorage/dexieDB';

function updateChoiceSuccess(result, optionId, choiceId, choiceValue) {
  return {
    type: types.CHOICE_CHANGED_SUCCESS,
    result: result,
    optionId: optionId,
    choiceId: choiceId,
    choiceValue: choiceValue
  };
}

function updateConfiguratorSuccess(result) {
  return {
    type: types.UPDATE_CONFIGURATOR_SUCCESS,
    result: result
  };
}

export function updateChoice(optionId, choiceId, choiceValue) {

    window.sessionStorage.setItem('lastChoice', choiceValue);
    return (dispatch, getState) => {
        let options = getState().configurator.options;
        let selections = getState().configurator.choices
            .filter(function (item) { return item.isSelected && item.optionId !== optionId; })
            .map(function (item) {
                return {
                    optionId: item.optionId,
                    choiceId: item.id,
                    value: item.value,
                    optionTags: options.find(o => o.id == item.optionId).tags
                };
            });

        let option = getState().configurator.options.find(o => o.id === optionId);
                selections.push({
                    optionId: optionId,
                    choiceId: choiceId,
                    value: choiceValue,
                    optionTags: option.tags
                });
        
                window.console.log("Choice updated: [" + (option ? option.shortLabel : "no option found") + " " + optionId + "|" + choiceId + "|" + choiceValue + "|" + option.tags.join(',') + "]");

                dispatch(updateChoiceSuccess({}, optionId, choiceId, choiceValue));

                document.dispatchEvent(new CustomEvent('price_changing'));

                setTimeout(function () {
                if (window.sessionStorage.getItem('lastChoice') == choiceValue) {
                    getState().templates.getPricing(getState().settings, selections)
                        .then(response => {
                            dispatch(updateConfiguratorSuccess(response.data));
                            db.choices.put({
                                url: window.location.pathname,
                                choices: getState().configurator.choices
                            });
                            if (window.sessionStorage.getItem('lastChoice') == choiceValue) {
                                document.dispatchEvent(new CustomEvent('price_changed', {
                                    detail: {
                                        price: response.data.price
                                    }
                                }));
                            }

                        }).catch(error => {
                            console.log(error);
                            db.choices.put({
                                url: window.location.pathname,
                                choices: getState().configurator.choices
                            });
                        });
                }
                }, 300);   
        };
    }


