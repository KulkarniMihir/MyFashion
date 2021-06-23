import React, {useState, useEffect} from 'react';
import { Link, Redirect } from 'react-router-dom';
import Base from '../core/Base'
import { isAuthenticated } from "../auth/helper";
import { getUserById, updateUser } from './helper/userapicalls';


const Profile = () => {

    const {user, token} = isAuthenticated();

    const userUpdate = () => {
        return (
            <div className="card mb-4">
                <h4 className="card-header">User Information</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">Firstname:</span> {user.name}
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">Lastname:</span> {user.lastname}
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">Email:</span> {user.email}
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">Purchases:</span> {user.purchases}
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-primary">User Area</span>
                    </li>
                </ul>
            </div>
        )
    }

    console.log(user);

    return (
        <Base 
            title="Welcome User" 
            description="Manage Profile"
            className="container bg-success p-4"
        >
            <h1>Profile Page</h1>
            {userUpdate()}
            <Link to="/user/dashboard" className="btn btn-md btn-dark mb-3">User Dashboard</Link>
        </Base>
    );
};

export default Profile;
