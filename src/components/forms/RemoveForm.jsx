import React from 'react';
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
class RemoveForm extends React.Component {
  modalClose = () => {
    const { modalClose } = this.props;
    modalClose();
  }

  removeChannel = id => () => {
    const { removeChannel } = this.props;
    removeChannel({ id });
  }

  render() {
    const { modalWindow } = this.props;
    const channelName = ` "${modalWindow.channelName}"`;
    return (
      <div>
        <div className="alert alert-danger" role="alert">
          Do you want to remove
          {channelName}
        </div>
        <div className="d-flex justify-content-around">
          <button type="submit" className="btn btn-danger" onClick={this.removeChannel(modalWindow.id)}>Remove channel</button>
          <button type="submit" className="btn btn-primary" onClick={this.modalClose}>Cancel</button>
        </div>
      </div>
    );
  }
}

export default RemoveForm;
