import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAllowRegistration, setDisabledBalanceOnAdd, setDisabledBalanceOnEdit } from '../../actions/settingsAction';

class Settings extends Component {
  disabledBalanceOnAddChange = () => {
    const { setDisabledBalanceOnAdd } = this.props;
    setDisabledBalanceOnAdd();
  }
  disabledBalanceOnEditChange = () => {
    const { setDisabledBalanceOnEdit } = this.props;
    setDisabledBalanceOnEdit();
  }
  allowRegistrationChange = () => {
    const { setAllowRegistration } = this.props;
    setAllowRegistration();
  }

  render() {
    const { disabledBalanceOnAdd, disabledBalanceOnEdit, allowRegistration } = this.props.settings;
    return (
      <Fragment>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left"></i> Back To Dashboard
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            Edit Settings
          </div>

          <div className="card-body">
            <form>
              <div className="form-group">
                <label>Allow Registration</label>{" "}
                <input type="checkbox" name="allowRegistration" checked={!!allowRegistration} onChange={this.allowRegistrationChange} />
              </div>
              <div className="form-group">
                <label>Disable Balance On Add</label>{" "}
                <input type="checkbox" name="disabledBalanceOnAdd" checked={!!disabledBalanceOnAdd} onChange={this.disabledBalanceOnAddChange} />
              </div>
              <div className="form-group">
                <label>Disable Balance On Change</label>{" "}
                <input type="checkbox" name="disabledBalanceOnEdit" checked={!!disabledBalanceOnEdit} onChange={this.disabledBalanceOnEditChange} />
              </div>
            </form>
          </div>
        </div>
      </Fragment>
    )
  }
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  setDisabledBalanceOnAdd: PropTypes.func.isRequired,
  setDisabledBalanceOnEdit: PropTypes.func.isRequired,
  setAllowRegistration: PropTypes.func.isRequired
}

export default connect((state, props) => ({
  auth: state.firebase.auth,
  settings: state.settings
}), { setAllowRegistration, setDisabledBalanceOnAdd, setDisabledBalanceOnEdit })(Settings);
