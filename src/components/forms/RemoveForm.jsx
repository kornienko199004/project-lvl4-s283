import React from 'react';
import connect from '../../connect';
import { UiStateSelector, currentChannelIdSelector } from '../../selectors';

const mapStateToProps = (state) => {
  const props = {
    currentChannelId: currentChannelIdSelector(state),
    uiState: UiStateSelector(state),
  };
  return props;
};

@connect(mapStateToProps)
class RemoveForm extends React.Component {
  modalToggle = () => {
    const { modalToggle } = this.props;
    modalToggle();
  }

  removeChannel = id => () => {
    const { removeChannel } = this.props;
    removeChannel({ id });
  }

  render() {
    const { uiState } = this.props;
    const channelName = ` "${uiState.channelName}"`;
    return (
      <div>
        <div className="alert alert-danger" role="alert">
          Do you want to remove
          {channelName}
        </div>
        <div className="d-flex justify-content-around">
          <button type="submit" className="btn btn-danger" onClick={this.removeChannel(uiState.id)}>Remove channel</button>
          <button type="submit" className="btn btn-primary" onClick={this.modalToggle}>Cancel</button>
        </div>
      </div>
    );
  }
}

export default RemoveForm;
