import { connect } from 'react-redux';
import Component from '../components/ChannelsList';
import * as actionCreators from '../actions';
import { userNameSelector, currentChannelIdSelector, channelsSelector } from '../selectors';

const mapStateToProps = (state) => {
  const props = {
    channels: channelsSelector(state),
    currentChannelId: currentChannelIdSelector(state),
    userName: userNameSelector(state),
  };
  return props;
};

const Container = connect(
  mapStateToProps,
  actionCreators,
)(Component);

export default Container;
