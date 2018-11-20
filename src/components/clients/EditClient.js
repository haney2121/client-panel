import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';


class EditClient extends Component {
  constructor(props) {
    super(props);
    //create refs for updates
    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
    this.balanceInput = React.createRef();
  }
  onSubmit = e => {
    e.preventDefault();
    const { client, firestore, history } = this.props;

    //updated client 
    const updClient = {
      firstName: this.firstNameInput.current.value,
      lastName: this.lastNameInput.current.value,
      email: this.emailInput.current.value,
      phone: this.phoneInput.current.value,
      balance: this.balanceInput.current.value === '' ? 0 : this.balanceInput.current.value
    }
    //update client in firestore
    firestore.update({ collection: 'clients', doc: client.id }, updClient)
      .then(() => history.push("/"))
  }

  render() {
    const { client } = this.props;
    if (client) {
      return (
        <Fragment>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left"></i> Back to Dashboard
            </Link>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              Edit Client
          </div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input ref={this.firstNameInput} defaultValue={client.firstName} name="firstName" minLength="2" required type="text" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input ref={this.lastNameInput} defaultValue={client.lastName} name="lastName" minLength="2" required type="text" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">E-mail</label>
                  <input ref={this.emailInput} defaultValue={client.email} name="email" required type="email" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input ref={this.phoneInput} defaultValue={client.phone} name="phone" minLength="10" required type="tel" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="balance">Balance</label>
                  <input ref={this.balanceInput} defaultValue={client.balance} name="balance" type="text" className="form-control" />
                </div>
                <input type="submit" defaultValue="Submit" className="btn btn-primary btn-block" />
              </form>
            </div>
          </div>
        </Fragment>
      )
    } else {
      return <Spinner />
    }

  }
}

EditClient.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: 'clients', storeAs: 'client', doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(EditClient);