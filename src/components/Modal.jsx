import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { reduxForm } from 'redux-form';
import AddForm from './forms/AddForm';
import RenameForm from './forms/RenameForm';
import RemoveForm from './forms/RemoveForm';
import connect from '../connect';
import { UiStateSelector, currentChannelIdSelector } from '../selectors';

const mapStateToProps = (state) => {
  const props = {
    currentChannelId: currentChannelIdSelector(state),
    UiState: UiStateSelector(state),
  };
  return props;
};

@connect(mapStateToProps)
class ModalWindow extends React.Component {
  modalToggle = () => {
    const { modalToggle } = this.props;
    modalToggle();
  }

  formChoose = (name) => {
    switch (name) {
      case 'add channel':
        return <AddForm />;
      case 'remove channel':
        return <RemoveForm />;
      case 'rename channel':
        return <RenameForm />;
      default:
        return null;
    }
  }

  render() {
    const { UiState } = this.props;

    return (
      <div>
        <Modal isOpen={UiState.open} toggle={this.modalToggle}>
          <ModalHeader toggle={this.modalToggle}>
            {UiState.name === 'add channel' ? UiState.name : UiState.channelName}
          </ModalHeader>
          <ModalBody>
            {this.formChoose(UiState.name, UiState.id, UiState.channelName)}
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default reduxForm({
  form: 'ChannelForm',
})(ModalWindow);
