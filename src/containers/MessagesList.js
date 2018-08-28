import { connect } from 'react-redux';
import Component from '../components/MessagesList';
import * as actionCreators from '../actions';
import { messagesSelector, currentChannelIdSelector, channelsSelector } from '../selectors';

const mapStateToProps = (state) => {
  const props = {
    messages: messagesSelector(state),
    currentChannelId: currentChannelIdSelector(state),
    channels: channelsSelector(state),
  };
  return props;
};

const Container = connect(
  mapStateToProps,
  actionCreators,
)(Component);

export default Container;
