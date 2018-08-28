import { connect } from 'react-redux';
import Component from '../components/MessagesForm';
import * as actionCreators from '../actions';
import { userNameSelector, currentChannelIdSelector } from '../selectors';

const mapStateToProps = (state) => {
  const props = {
    userName: userNameSelector(state),
    currentChannelId: currentChannelIdSelector(state),
  };
  return props;
};

const Container = connect(
  mapStateToProps,
  actionCreators,
)(Component);

export default Container;
