import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Input = ({ name,value, label, type, placeholder, className, ...rest }) => {
    return (
        <div className="form-group">
            {label && <label htmlFor={value}>{label}</label>}
            <input
                type={type}
                placeholder={placeholder}
                className={`form-control ${className}`}
                name={name}
                {...rest}
            />
        </div>
    )
}

Input.defaultProps = {
    type:'text'
}

export default Input;

