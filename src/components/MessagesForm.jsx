import React from 'react';
import { Field, reduxForm } from 'redux-form';
import connect from '../connect';
import { currentChannelIdSelector } from '../selectors';

const mapStateToProps = (state) => {
  const props = {
    currentChannelId: currentChannelIdSelector(state),
  };
  return props;
};

@connect(mapStateToProps)
@reduxForm({ form: 'MessagesForm' })
class MessagesForm extends React.Component {
  addMessage = ({ message }) => {
    const {
      addMessage, currentChannelId, userName, reset,
    } = this.props;
    return addMessage({
      id: currentChannelId, text: message, userName, reset,
    });
  }

  render() {
    const {
      handleSubmit, submitting, pristine,
    } = this.props;
    return (
      <form className="form" onSubmit={handleSubmit(this.addMessage)}>
        <div className="form-group d-flex justify-content-end flex-wrap">
          <Field name="message" required component="input" type="text" className="form-control mb-4" rows="1" />
          <button type="submit" className="btn btn-primary btn-sm col-auto" disabled={submitting || pristine}>Send message</button>
        </div>
      </form>
    );
  }
}

export default MessagesForm;
