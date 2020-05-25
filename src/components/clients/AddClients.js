import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik';

// Redux
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';

// Components
import Card from '../Card';
import Input from '../Input';
import Icon from '../Icon';

const AddClients = ({ firestore, history }) => {
    const onSubmit = (values, { setSubmitting }) => {
        setTimeout(() => {
            firestore.add({ collection: 'clients' }, values).then(history.push('/'));
            setSubmitting(false);
        }, 400);
    }

    return (
        <>
            <div className="row">
                <div className="col-md-6">
                    <Link to="/" className="btn btn-link">
                        <Icon icon="arrow-circle-left" /> Back To Dashboard
                    </Link>
                </div>
            </div>

            <Card header="Add Client">
                <Formik
                    initialValues={{ firstName: '', lastName: '', email: '', phone: '', balanace: 0 }}
                    onSubmit={onSubmit}
                >
                    {({ handleChange, handleSubmit, isSubmitting }) => (
                        <form onSubmit={handleSubmit}>
                            <Input
                                label="First Name"
                                name="firstName"
                                onChange={handleChange}
                                minLength="2"
                                required
                            />
                            <Input
                                label="Last Name"
                                name="lastName"
                                onChange={handleChange}
                                minLength="2"
                                required
                            />
                            <Input
                                type="email"
                                label="Email"
                                name="email"
                                onChange={handleChange}
                            />
                            <Input
                                label="Phone"
                                name="phone"
                                onChange={handleChange}
                                minLength="2"
                                required
                            />
                            <Input
                                label="Balance"
                                name="balance"
                                onChange={handleChange}
                            /> 
                            <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-block">
                                Submit
                                </button>
                        </form>
                    )}
                </Formik>
            </Card>
        </>
    )
}

AddClients.propTypes = {
    firestore: PropTypes.object.isRequired,
    history: PropTypes.object
}

export default firestoreConnect()(AddClients);

