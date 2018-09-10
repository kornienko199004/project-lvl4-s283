import React from 'react';
import cn from 'classnames';
import Octicon, { Pencil, Trashcan } from '@githubprimer/octicons-react';
import connect from '../connect';
import {
  userNameSelector, currentChannelIdSelector, channelsSelector, modalWindowState,
} from '../selectors';

const mapStateToProps = (state) => {
  const props = {
    channels: channelsSelector(state),
    currentChannelId: currentChannelIdSelector(state),
    userName: userNameSelector(state),
    modalWindow: modalWindowState(state),
  };
  return props;
};

@connect(mapStateToProps)
class ChannelsList extends React.Component {
  onClick = id => (e) => {
    e.preventDefault();
    const { currentChannelId, changeCurrentChannelId } = this.props;
    if (id !== currentChannelId) {
      changeCurrentChannelId({ id });
    }
  }

  addChannel = (e) => {
    e.preventDefault();
    const { modalOpen } = this.props;
    modalOpen({ name: 'add channel' });
  }

  removeChannel = (id, channelName) => (e) => {
    e.preventDefault();
    const { modalOpen } = this.props;
    modalOpen({ name: 'remove channel', id, channelName });
  }

  renameChannel = (id, channelName) => (e) => {
    e.preventDefault();
    const { modalOpen } = this.props;
    modalOpen({ name: 'rename channel', id, channelName });
  }

  renderChannel = (name, removable, id) => {
    if (removable) {
      return (
        <div className="d-flex, p-0, justify-content-between, align-items-baseline">
          <button type="button" className="border-0 bg-transparent" onClick={this.renameChannel(id, name)}><Octicon icon={Pencil} /></button>
          <button type="button" className="border-0 bg-transparent" onClick={this.removeChannel(id, name)}><Octicon icon={Trashcan} /></button>
        </div>
      );
    }
    return null;
  }

  render() {
    const { channels, userName, currentChannelId } = this.props;
    return (
      <div className="col-sm-3">
        <h4>{userName}</h4>
        <ul className="list-group flex-column nav-pills mb-5 border rounded">
          {channels.map(({ id, name, removable }) => {
            const className = cn({
              'list-group-item': true,
              active: id === currentChannelId,
              'd-flex': true,
              'p-0': true,
              'justify-content-between': true,
              'align-items-baseline': true,
            });
            const buttonClassName = cn({
              btn: true,
              'btn-link': true,
              'text-light': id === currentChannelId,
              active: id === currentChannelId,
              'w-50': true,
              'p-2': true,
              'text-left': true,
            });
            return (
              <li key={id} className={className}>
                <button type="button" className={buttonClassName} onClick={this.onClick(id)}>{name}</button>
                {this.renderChannel(name, removable, id)}
              </li>
            );
          })}
        </ul>
        <button type="button" className="btn btn-secondary" onClick={this.addChannel}>Add channel</button>
      </div>
    );
  }
}

export default ChannelsList;
