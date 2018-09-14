import React from 'react';
import { Field, reduxForm } from 'redux-form';
import connect from '../../connect';

@connect()
class AddForm extends React.Component {
  addChannel = ({ newChannel }) => {
    const { addChannel } = this.props;
    return addChannel({ name: newChannel });
  }

  render() {
    const {
      handleSubmit, submitting, pristine,
    } = this.props;
    return (
      <form className="form" onSubmit={handleSubmit(this.addChannel)}>
        <div className="form-group d-flex justify-content-end flex-wrap">
          <Field name="newChannel" required component="input" type="text" className="form-control mb-5" rows="1" />
          <button type="submit" className="btn btn-primary btn-sm col-auto" disabled={submitting || pristine}>Add channel</button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'DeleteForm',
})(AddForm);
