import React from 'react';
import { Field, reduxForm } from 'redux-form';

class MessagesForm extends React.Component {
  addMessage = ({ message }) => {
    const {
      addMessage, currentChannelId, userName, reset,
    } = this.props;
    addMessage({ id: currentChannelId, text: message, userName });
    reset();
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form className="form" onSubmit={handleSubmit(this.addMessage)}>
        <div className="form-group d-flex justify-content-end flex-wrap">
          <Field name="message" required component="textarea" type="text" className="form-control mb-4" rows="1" />
          <button type="submit" className="btn btn-primary btn-sm col-auto">Send message</button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'newTask',
})(MessagesForm);
