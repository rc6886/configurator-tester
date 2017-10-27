import * as types from './actionTypes';

export function createOption(option) {
  return { type: types.CREATE_OPTION, option};
}

export function loadOptionsSuccess(options) {
  return { type: types.LOAD_OPTIONS_SUCCESS, groups : options.groups};
}

export function choiceChanged(optionId, choiceId, choiceValue) {
  return { type: types.CHOICE_CHANGED_SUCCESS, optionId: optionId, choiceId: choiceId, choiceValue: choiceValue};
}

//http://stackoverflow.com/questions/783818/how-do-i-create-a-custom-error-in-javascript
function LoadSettingsError(name) {
  
  this.name = "LoadSettingsError";
  this.message = `Missing setting '${name}'`;
}

LoadSettingsError.prototype = Error.prototype;

function ensureSettingExists(config, name) {
  if (!config || !name) { throw `Error verifying settings: must provide both a settings object and a setting name. Settings: ${config} Setting Name:'${name}'`; }
  if (config[name] === undefined) { throw new LoadSettingsError(name); }
}

// thunks
export function loadSettings(config) {
  ensureSettingExists(config, "configuratorMode");
  ensureSettingExists(config, "siteId");
  ensureSettingExists(config, "productId");
  ensureSettingExists(config, "updateConfiguratorApi");
  ensureSettingExists(config, "getOptionsApi");

  return { 
    type: types.LOAD_SETTINGS,
    config
  };
}
