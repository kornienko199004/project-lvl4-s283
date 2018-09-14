import React from 'react';
import { Field, reduxForm } from 'redux-form';
import connect from '../../connect';
import { UiStateSelector } from '../../selectors';

const mapStateToProps = (state) => {
  const props = {
    uiState: UiStateSelector(state),
  };
  return props;
};

@connect(mapStateToProps)
class RenameForm extends React.Component {
  componentWillMount() {
    const { initialize, uiState } = this.props;
    initialize({ channelName: uiState.channelName });
  }

  modalToggle = () => {
    const { modalToggle } = this.props;
    modalToggle();
  }

  renameChannel = id => ({ channelName }) => {
    const { renameChannel } = this.props;
    return renameChannel({ id, name: channelName });
  }

  render() {
    const {
      handleSubmit, uiState, submitting, pristine,
    } = this.props;
    return (
      <form className="form" onSubmit={handleSubmit(this.renameChannel(uiState.id))}>
        <div className="form-group d-flex justify-content-around flex-wrap">
          <Field name="channelName" required component="input" type="text" className="form-control mb-3" rows="1" />
          <div className="alert alert-warning w-100" role="alert">
            Do you want to rename channel?
          </div>
          <div className="d-flex justify-content-around w-100">
            <button type="submit" className="btn btn-danger btn-sm col-auto" disabled={submitting || pristine}>Rename channel</button>
            <button type="button" className="btn btn-primary" onClick={this.modalToggle}>Cancel</button>
          </div>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'RenameForm',
})(RenameForm);
