import React from 'react';
import { Modal } from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import AddForm from './forms/AddForm';
import RenameForm from './forms/RenameForm';
import RemoveForm from './forms/RemoveForm';
import connect from '../connect';
import { modalWindowState, currentChannelIdSelector } from '../selectors';

const mapStateToProps = (state) => {
  const props = {
    currentChannelId: currentChannelIdSelector(state),
    modalWindow: modalWindowState(state),
  };
  return props;
};

@connect(mapStateToProps)
class ModalWindow extends React.Component {
  modalClose = () => {
    const { modalClose } = this.props;
    modalClose();
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
    const { modalWindow } = this.props;

    return (
      <div>
        <Modal show={modalWindow.open} onHide={this.modalClose}>
          <Modal.Header closeButton>
            <Modal.Title>{modalWindow.name === 'add channel' ? modalWindow.name : modalWindow.channelName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.formChoose(modalWindow.name, modalWindow.id, modalWindow.channelName)}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default reduxForm({
  form: 'ChannelForm',
})(ModalWindow);
