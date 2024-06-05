import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="progress">
                <p>Completed 1 of 52 Exercises:</p>
            </div>
            <ul className="nav">
                <li className="nav-item active">SQL Select</li>
                <li className="nav-item">SQL Where</li>
                <li className="nav-item">SQL Order By</li>
                {/* Add more nav items as needed */}
            </ul>
        </div>
    );
};

export default Sidebar;
