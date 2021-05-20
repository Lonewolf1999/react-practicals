import React from 'react'
import { Link } from 'react-router-dom'
import NewForm from './NewForm'

function AddUser() {

    return (
        <div>
            <Link to="/">
                <button type="button" className="btn btn-primary goToList">Back to Users list</button>
            </Link>
            <h1 className="text-center">Add User</h1>
            <NewForm requestFrom={"addUser"} />
        </div>
    )
}

export default AddUser

// updated from local user