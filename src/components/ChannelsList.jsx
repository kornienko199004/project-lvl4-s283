import React from 'react';
import cn from 'classnames';
import { Nav, NavItem, NavLink } from 'reactstrap';
import Octicon, { Pencil, Trashcan } from '@githubprimer/octicons-react';
import connect from '../connect';
import {
  userNameSelector, currentChannelIdSelector, channelsSelector,
} from '../selectors';

const mapStateToProps = (state) => {
  const props = {
    channels: channelsSelector(state),
    currentChannelId: currentChannelIdSelector(state),
    userName: userNameSelector(state),
  };
  return props;
};

@connect(mapStateToProps)
class ChannelsList extends React.Component {
  onClick = id => (e) => {
    e.preventDefault();
    const { channels, changeCurrentChannelId } = this.props;
    if (id !== channels.currentChannelId) {
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
    e.stopPropagation();
    const { modalOpen } = this.props;
    modalOpen({ name: 'remove channel', id, channelName });
  }

  renameChannel = (id, channelName) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { modalOpen } = this.props;
    modalOpen({ name: 'rename channel', id, channelName });
  }

  renderChannel = (name, removable, id, currentChannelId) => {
    let channelControl = null;
    const className = cn({
      'd-flex': true,
      'flex-nowrap': true,
      'justify-content-between': true,
      'border-top': true,
      'border-light': true,
    });
    if (removable) {
      channelControl = (
        <div className="d-flex justify-content-end">
          <button type="button" className="border-0 bg-transparent" onClick={this.renameChannel(id, name)}><Octicon icon={Pencil} /></button>
          <button type="button" className="border-0 bg-transparent" onClick={this.removeChannel(id, name)}><Octicon icon={Trashcan} /></button>
        </div>
      );
    }
    return (
      <NavLink onClick={this.onClick(id)} active={id === currentChannelId} href="#" className={className}>
        {name}
        {channelControl}
      </NavLink>
    );
  }

  render() {
    const { channels, userName, currentChannelId } = this.props;
    return (
      <div className="col-sm-3">
        <h4>{userName}</h4>
        <Nav vertical pills className="border-light border mb-5">
          {channels.map(({ id, name, removable }) => (
            <NavItem key={id}>
              {this.renderChannel(name, removable, id, currentChannelId)}
            </NavItem>
          ))}
        </Nav>
        <button type="button" className="btn btn-secondary" onClick={this.addChannel}>Add channel</button>
      </div>
    );
  }
}

export default ChannelsList;
