import * as types from './actionTypes';
import fetch from 'isomorphic-fetch';

//http://stackoverflow.com/questions/783818/how-do-i-create-a-custom-error-in-javascript
function SaveError(message, validationErrors) {
  if (!message) {
    throw "Cannot create a SaveError: an error message is required";
  }

  this.name = "SaveError";
  this.message = message;
  this.validationErrors = validationErrors ? validationErrors : [];
}

SaveError.prototype = Error.prototype;


function getSelections(configurator) {
  return configurator.choices
    .filter(x => x.isSelected === true)
    .map(function (item) {
      const option = configurator.options.find(option => {
        return option.id === item.optionId;
      });

      if (option === null) {
        throw "Error building selections: can't find option with ID:" + item.optionId;
      }

      return {
        optionId: item.optionId,
        choiceId: item.id,
        value: item.value,
        optionTags: option.tags
      };
    });
}

function _createParams(body) {
  return {
    credentials: "same-origin", //this is necessary for cookies to work - http://stackoverflow.com/a/39233628
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(body)
  };
}

function saveRecoverableFailure(validationErrors) {
  return {
    type: types.SAVE_RECOVERABLE_FAILURE,
    validationMessages: validationErrors
  };
}

// I employed a wonky way to report successes and failures. Here is why:
// 1. We have to use old-fashioned callbacks because the Configurator will be used by who-knows-what, and
//    we can't rely on the presence of ES6+ Promises.
// 2. fetch is ES6 Promise-oriented
// 3. To get fetch running a failure callback in EVERY situation an error could occur, I had to make
//    every known failure throw a JS Error, so that at the very end, we could handle all known + unknown failures together.
export function saveConfiguration(successCallback, failureCallback) {
  return (dispatch, getState) => {
    const selections = getSelections(getState().configurator);
    const settings = getState().settings;

    const params = _createParams({
      storeNum: window.getStoreNum(),
      siteId: settings.siteId,
      productId: settings.productId,
      selections: selections
    });

    return fetch(settings.saveApi, params)
      .then(response => {
        if (!response.ok) {
          throw new Error("An error occurred while saving: " + response.statusText);
        }

        return response;
      })
      .then(response => response.json())
      .then(result => {
        if(result.hasValidationErrors && result.validationMessages) {
          throw new SaveError("Error: please fix your selections and try again.", result.validationMessages);
        }

        successCallback({ configurationGuid: result.configurationGuid });
      })
      .catch(error => {
        if (error.name && error.name === "SaveError") {
          dispatch(saveRecoverableFailure(error.validationErrors));
          failureCallback(true, error.message);
        } else {
          failureCallback(false, "An unexpected error has occurred while attempting to save a configuration: " + error.stack);
        }
      });
  };
}
