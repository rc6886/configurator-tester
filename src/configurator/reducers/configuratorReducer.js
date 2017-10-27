import * as types from '../actions/actionTypes';

function updateChoice() {
  return { groups: [] };
}

export default function configuratorReducer(state = { groups: [] }, action) {
  switch (action.type) {
    case types.CREATE_OPTION:
      return [...state, Object.assign({}, action.option)];

    case types.LOAD_OPTIONS_SUCCESS: {
      let configurator = {};

      configurator.groups = action.groups.map(function (g) {
        return {
          name: g.name,
          sequenceNumber: g.sequenceNumber
        };
      });

      configurator.options = action.groups.map(function (g) {
        return {
          groupName: g.name,
          sequenceNumber: g.sequenceNumber,
          options: g.options
        };
      }).reduce(function (o, g) {
        return o.concat(g.options.map(function (item) {
          let option = Object.assign({}, item, { groupName: g.groupName, groupSequence: g.sequenceNumber });

          option.choices = null;

          return option;
        }));
      }, []);

      configurator.choices = [];

      action.groups.forEach(function(group){
        group.options.forEach(function(option){
          option.choices.forEach(function(choice){
            if(action.userDefaults.hasOwnProperty(choice.internalName)){
              choice.isSelected = action.userDefaults[choice.internalName].isSelected;
              choice.value = action.userDefaults[choice.internalName].value;
            }
            choice.optionId = option.id;
            configurator.choices.push(choice);
          });
        });
      });

      return Object.assign({}, state, configurator);
    }
    case types.CHOICE_CHANGED_SUCCESS: {

      let choices = mapUpdatedChoice(state.choices, action.optionId, action.choiceId, action.choiceValue);

      return {
        choices: choices,
        options: [...state.options],
        groups: [...state.groups]
      };
    }
    default:
      return state;
  }
}

function mapUpdatedChoice(choices, optionId, choiceId, choiceValue) {
  let choicesForOption = choices.filter(function (item) {
    return item.optionId === optionId;
  }).map(function (item) {
    if (item.id === choiceId) {
      return Object.assign({}, item, { isSelected: item.id === choiceId, value: choiceValue });
    } else {
      return Object.assign({}, item, { isSelected: item.id === choiceId });
    }
  });

  let choicesNotForOption = choices.filter(function (item) {
    return item.optionId !== optionId;
  });

  return [...choicesForOption, ...choicesNotForOption];
}
