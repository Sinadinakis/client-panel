import React from 'react';
import { Link } from "react-router-dom";

const AppNavbar = () => {
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    Client Panel
                </Link>
                <button 
                    type="button" 
                    data-toggle="collapse" 
                    data-target="#navbarMain" 
                    className="navbar-toggler"
                >
                    <span className="navbar-toggle-icon"></span>
                </button>  
                <div className="collapse navbar-collapse" id="navbarMain">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Dashboard
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}


export default AppNavbar;
