import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as optionActions from '../../actions/optionActions';
import * as choiceActions from '../../actions/choiceActions';
import Summary from './Summary';

class ConfiguratorPage extends React.Component {
  constructor(props,context) {
    super(props, context);
    this.choiceChanged = this.choiceChanged.bind(this);
  }

  choiceChanged(optionId, choiceId, choiceValue) {
    this.props.actions.updateChoice(optionId, choiceId, choiceValue);
  }

  render() {
    return (
      <div>
        This is the GCC.Configurator.
        {
          this.props.configurator.groups.sort((a, b) => {
            a.sequenceNumber - b.sequenceNumber;
          })
          .map((g) => {
            let Og = this.props.templates.groups.find((fg) => fg.name === g.name).template;
            return (<Og key={g.sequenceNumber} group={g} onChange={this.choiceChanged} />);
          })
        }
      </div>
    );
  }
}

ConfiguratorPage.propTypes = {
  configurator: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  templates: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    configurator: state.configurator,
    templates: state.templates
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(choiceActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfiguratorPage);
