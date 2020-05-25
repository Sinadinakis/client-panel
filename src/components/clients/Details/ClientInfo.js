import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx';
import { Formik } from 'formik';
import { firestoreConnect } from 'react-redux-firebase';

// Components
import Card from '../../Card';
import Icon from '../../Icon';
import Input from '../../Input';

const ClientInfo = ({ client,firestore }) => {
    const [showBalanace, setShowBalanace] = useState(false);
    const [balanceAmmount, setBalanceAmmount] = useState('');
    let balanceForm = null;
    const onSubmit = (values, { setSubmitting }) => {
        console.log(balanceAmmount)
        let clientUpdate = {
            balance: parseFloat(balanceAmmount)
        }
        setTimeout(() => {
            firestore.update({ collection: 'clients', doc: client.id }, clientUpdate);
            setSubmitting(false);
        }, 400);
    }
    if(showBalanace) {
        balanceForm = (
            <Formik
            initialValues={{ balanceAmmount: '' }}
            onSubmit={onSubmit}
            >            
                {({ values, handleChange, handleSubmit }) => {
                    return (
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                             <Input
                                name="balance"
                                placeholder="Add New Balance"
                                className="form-control"
                                onChange={e => setBalanceAmmount(e.target.value)}
                                minLength="2"
                                required
                            />
                        </div>
                        <div className="input-group-append">
                            <input type="submit" value="Update" className="btn btn-outline-dark"/> 
                        </div>
                    </form>
                )}}
            </Formik>
        )
    } 

    return (
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
                    <span className={
                        clsx({
                            'text-danger': client.balance > 0,
                            'text-success': client.balance === 0
                        })}
                    >
                        ${parseFloat(client.balance).toFixed(2)}
                    </span>
                    <small>
                        {' '}<a href="#!" onClick={() => setShowBalanace(!showBalanace)}>
                            <Icon icon="pencil-alt" />
                        </a> 
                    </small>
                </h3>
                {balanceForm}
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
    )
}

ClientInfo.propTypes = {
    client: PropTypes.object.isRequired
}

export default firestoreConnect()(ClientInfo);

