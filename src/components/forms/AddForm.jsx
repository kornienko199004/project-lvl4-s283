import React from 'react';
import { Field, reduxForm } from 'redux-form';
import connect from '../../connect';
import { modalWindowState } from '../../selectors';

const mapStateToProps = (state) => {
  const props = {
    modalWindow: modalWindowState(state),
  };
  return props;
};

@connect(mapStateToProps)
class DeleteForm extends React.Component {
  addChannel = ({ newChannel }) => {
    const { addChannel } = this.props;
    addChannel({ name: newChannel });
  }

  render() {
    const { handleSubmit, modalWindow } = this.props;
    return (
      <form className="form" onSubmit={handleSubmit(this.addChannel)}>
        <div className="form-group d-flex justify-content-end flex-wrap">
          <Field name="newChannel" required component="input" type="text" className="form-control mb-5" rows="1" />
          <button type="submit" className="btn btn-primary btn-sm col-auto" disabled={!modalWindow.formDisable}>Add channel</button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'DeleteForm',
})(DeleteForm);
