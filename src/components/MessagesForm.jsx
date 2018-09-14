import React from 'react';
import { Field, reduxForm } from 'redux-form';
import connect from '../connect';
import { userNameSelector, currentChannelIdSelector } from '../selectors';

const mapStateToProps = (state) => {
  const props = {
    userName: userNameSelector(state),
    currentChannelId: currentChannelIdSelector(state),
  };
  return props;
};

@connect(mapStateToProps)
class MessagesForm extends React.Component {
  addMessage = ({ message }) => {
    const {
      addMessage, currentChannelId, userName,
    } = this.props;
    return addMessage({ id: currentChannelId, text: message, userName });
  }

  render() {
    const { handleSubmit, submitting, pristine } = this.props;
    return (
      <form className="form" onSubmit={handleSubmit(this.addMessage)}>
        <div className="form-group d-flex justify-content-end flex-wrap">
          <Field name="message" required component="textarea" type="text" className="form-control mb-4" rows="1" />
          <button type="submit" className="btn btn-primary btn-sm col-auto" disabled={submitting || pristine}>Send message</button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'MessagesForm',
})(MessagesForm);
