import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect} from 'react-redux-firebase';

// Components
import Spinner from '../Spinner';

const Clients = ({ clients}) => {
    const [totalScore, setTotalScore] = useState(0);

    useEffect(
        () => {
            if(clients) {
                const total = clients.reduce((total, client) => {
                    return total + parseFloat(client.balance.toString())
                }, 0)

                setTotalScore(total)
            }
        }, [clients]
    )

    if (clients) {
        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <i className="fas fa-users" /> Clients{' '}
                    </div>
                    <div className="col-md-6">
                        <h5 className="text-right text-secondary">
                            Total Balance {' '}
                            <span className="text-primary">
                                ${parseFloat(totalScore.toFixed(2))}
                            </span>
                        </h5>
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
                                <tr key={client.id} id={client.id}>
                                    <td>{client.firstName} {client.lastName}</td>
                                    <td>{client.email}</td>
                                    <td>{parseFloat(client.balance).toFixed(2)}</td>
                                    <td>
                                        <Link to={`/client/${client.id}`} className="btn btn-secondary btn-sm">
                                         <i className="fa fa-arrow-circle-right" aria-hidden="true"></i> Details
                                         </Link>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        )
    } else {
        return <Spinner />
    }
}

Clients.propTypes = {
    firestore: PropTypes.object.isRequired,
    clients: PropTypes.array
}

export default compose(
    firestoreConnect([{ collection: 'clients'}]),
    connect((state,props) => ({
        clients: state.firestore.ordered.clients
    })
    )
)(Clients);
