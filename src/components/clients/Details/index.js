import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik';

// Redux
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';

// Components
import Icon from '../../Icon';
import Spinner from '../../Spinner';
import ClientInfo from './ClientInfo';

const ClientDetails = ({ client, history, firestore }) => {
    const [showBalanace, setShowBalanace] = useState(false);
    const [balanceAmmount, setBalanceAmmount] = useState('');
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
                                <Icon icon="edit" /> Edit
                            </Link>
                            <button className="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </div>
                <hr />
                <ClientInfo client={client} />
            </>
        )
    } else {
        return <Spinner />
    }
}

ClientDetails.propTypes = {
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
)(ClientDetails);

