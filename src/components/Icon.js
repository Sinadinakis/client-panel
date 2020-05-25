import React from 'react'
import PropTypes from 'prop-types'

const Icon = ({ icon, rest }) => {
    return (
        <i className={`fas fa-${icon}`} {...rest}/>
    )
}

Icon.propTypes = {
    icon: PropTypes.string.isRequired
}

export default Icon;

