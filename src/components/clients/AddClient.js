import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
// import { compose } from "redux";
// import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

class AddClient extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: ""
  }

  onSubmit = (e) => {
    e.preventDefault();
    const newClient = this.state;
    const { firestore, history } = this.props;

    //No Balance, make 0
    if (newClient.balance === '') {
      newClient.balance = 0;
    }
    firestore.add({ collection: 'clients' }, newClient)
      .then(() => history.push('/'));
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }



  render() {
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
            Add Client
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input onChange={this.onChange} value={this.state.firstName} name="firstName" minLength="2" required type="text" className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input onChange={this.onChange} value={this.state.lastName} name="lastName" minLength="2" required type="text" className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input onChange={this.onChange} value={this.state.email} name="email" required type="email" className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input onChange={this.onChange} value={this.state.phone} name="phone" minLength="10" required type="tel" className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="balance">Balance</label>
                <input onChange={this.onChange} value={this.state.balance} name="balance" type="text" className="form-control" />
              </div>
              <input type="submit" value="Submit" className="btn btn-primary btn-block" />
            </form>
          </div>
        </div>
      </Fragment>
    )
  }
}

AddClient.propTypes = {
  firestore: PropTypes.object.isRequired
}


export default firestoreConnect()(AddClient);