import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik';

// Redux
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';

// Components
import Card from '../Card';
import Input from '../Input';
import Icon from '../Icon';
import Spinner from '../Spinner';
import clsx from 'clsx';

const DetailsClient = ({ client, history, firestore }) => {
    const onSubmit = (values, { setSubmitting }) => {
        setTimeout(() => {
            firestore.add({ collection: 'clients' }, values).then(history.push('/'));
            setSubmitting(false);
        }, 400);
    }

    if (client) {
        return (
            <>
                <div className="row">
                    <div className="col-md-6">
                        <Link to="/" className="btn btn-link">
                            <Icon icon="arrow-circle-left" /> Back To Dashboard
                        </Link>
                    </div>
                    <div className="col-md-6">
                        <div className="btn-group float-right">
                            <Link to={`/client/edit/${client.id}`} className="btn btn-dark">
                                <Icon icon="arrow-circle-left" /> Edit
                        </Link>
                            <button className="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </div>
                <hr />
                <Card header={`${client.firstName} ${client.lastName}`}>
                    <div className="row">
                        <div className="col-md-8 col-sm-6">
                            <h4>
                                Client Id: {' '}
                                <span className="text-secondary">{client.id}</span>
                            </h4>
                        </div>
                        <div className="col-md-4 col-sm-6">
                            <h3 className="pull-right">
                                Balanace: 
                                    <span className={clsx({
                                        'text-danger': client.balance > 0,
                                        'text-success': client.balance === 0
                                    })}>
                                ${parseFloat(client.balance).toFixed(2)}
                                </span>
                            </h3>
                        </div>
                        <ul className="list-group">
                            <li className="list-group-item">
                                Contact Email: {client.email}
                            </li>
                            <li className="list-group-item">
                                Contact Phone: {client.phone}
                            </li>
                        </ul>
                    </div>
                </Card>
            </>
        )
    } else {
        return <Spinner />
    }
}

DetailsClient.propTypes = {
    client: PropTypes.object,
    firestore: PropTypes.object.isRequired,
    history: PropTypes.object
}

export default compose(
    firestoreConnect(props => [
        { collection: 'clients', storeAs: 'client', doc: props.match.params.id }
    ]),
    connect(({ firestore: { ordered } }, props) => ({
        client: ordered.client && ordered.client[0]
    })
    )
)(DetailsClient);

