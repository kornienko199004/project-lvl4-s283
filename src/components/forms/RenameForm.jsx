import React from 'react';
import { Field, reduxForm } from 'redux-form';
import connect from '../../connect';
import { modalWindowState, currentChannelIdSelector } from '../../selectors';

const mapStateToProps = (state) => {
  const props = {
    currentChannelId: currentChannelIdSelector(state),
    modalWindow: modalWindowState(state),
  };
  return props;
};

@connect(mapStateToProps)
class RenameForm extends React.Component {
  componentWillMount() {
    const { initialize, modalWindow } = this.props;
    initialize({ channelName: modalWindow.channelName });
  }

  modalClose = () => {
    const { modalClose } = this.props;
    modalClose();
  }

  renameChannel = id => ({ channelName }) => {
    const { renameChannel } = this.props;
    renameChannel({ id, name: channelName });
  }

  onChange = (e) => {
    const { makeFormEnable, modalWindow, makeFormDisable } = this.props;
    if (e.target.value === modalWindow.channelName || e.target.value.length === 0) {
      makeFormDisable();
    } else {
      makeFormEnable();
    }
  }

  render() {
    const { handleSubmit, modalWindow } = this.props;
    return (
      <form className="form" onSubmit={handleSubmit(this.renameChannel(modalWindow.id))}>
        <div className="form-group d-flex justify-content-around flex-wrap">
          <Field name="channelName" required component="input" type="text" className="form-control mb-3" rows="1" onChange={this.onChange} />
          <div className="alert alert-warning w-100" role="alert">
            Do you want to rename channel?
          </div>
          <div className="d-flex justify-content-around w-100">
            <button type="submit" className="btn btn-danger btn-sm col-auto" disabled={modalWindow.formDisable}>Rename channel</button>
            <button type="button" className="btn btn-primary" onClick={this.modalClose}>Cancel</button>
          </div>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'RenameForm',
})(RenameForm);
