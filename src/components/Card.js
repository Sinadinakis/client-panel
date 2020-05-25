import React from 'react'
import PropTypes from 'prop-types'

const Card = ({header, children}) => {
    return (
        <div className="card">
            <div className="card-header">{header}</div>
            <div className="card-body">
                {children}
            </div>
        </div>
    )
}

Card.propTypes = {
    header: PropTypes.string,
    children: PropTypes.node
}

export default Card;

