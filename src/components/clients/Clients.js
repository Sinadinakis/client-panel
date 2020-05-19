import React from 'react'
import { Link } from 'react-router-dom';
const Clients = () => {
    const clients = [{
        id: '232432432',
        firstName: 'John',
        lastName: 'Doe',
        email: 'jdoe@gmail.com',
        phone: '555-555-555',
        balance: '100.0'
    }
    ]

    if (clients) {
        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <i className="fas fa-users" /> Clients{' '}
                    </div>
                    <div className="col-md-6">
                    </div>
                </div>
                <table className="table table-striped">
                    <thead className="thead-inverse">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Balance</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {clients
                            && clients.map(client => (
                                <tr id={client.id}>
                                    <td>{client.firstName} {client.lastName}</td>
                                    <td>{client.email}</td>
                                    <td>{parseFloat(client.balance).toFixed(2)}</td>
                                    <td>
                                        <Link to={`/client/${client.id}`} className="btn btn-secondary btn-sm">
                                         <i class="fa fa-arrow-circle-right" aria-hidden="true"></i> Details
                                         </Link>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        )
    } else {
        return <h1>Loading..</h1>
    }
}

export default Clients;
