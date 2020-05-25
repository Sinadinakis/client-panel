import React from 'react'
import PropTypes from 'prop-types'

const Icon = ({icon}) => {
    return (
        <i className={`fas fa-${icon}`} />
    )
}

Icon.propTypes = {
    icon: PropTypes.string.isRequired
}

export default Icon;

