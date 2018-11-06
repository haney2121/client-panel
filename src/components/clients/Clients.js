import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

class Clients extends Component {
  render() {
    const clients = [
      {
        id: "1",
        firstName: "Justin",
        lastName: "Haney",
        email: "haney21@gmail.com",
        phone: "555-555-4444",
        balance: "30"
      },
      {
        id: "2",
        firstName: "Shana",
        lastName: "Haney",
        email: "shaney@gmail.com",
        phone: "555-555-5555",
        balance: "110"
      }
    ];
    if (clients) {
      return (
        <Fragment>
          <div className="row">
            <div className="col-md-6">
              <h2>
                <i className="fas fa-users" /> Clients
              </h2>
            </div>
            <div className="col-md-6" />
            <table className="table table-striped">
              <thead className="thead-inverse">
                <tr>
                  <th>Name</th>
                  <th>E-mail</th>
                  <th>Balance</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {clients.map(client => (
                  <tr key={client.id}>
                    <td>
                      {client.firstName} {client.lastName}
                    </td>
                    <td>{client.email}</td>
                    <td>${parseFloat(client.balance).toFixed(2)}</td>
                    <td>
                      <Link
                        to={`/client/${client.id}`}
                        className="btn btn-secondary btn-sm"
                      >
                        <i className="fas fa-arrow-circle-right" /> Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Fragment>
      );
    } else {
      return <h1>Loading..</h1>;
    }
  }
}
export default Clients;
