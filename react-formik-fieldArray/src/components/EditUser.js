import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import NewForm from './NewForm'

function EditUser() {
    const { pathname } = useLocation()
    const userId = parseInt(pathname.replace("/edit-user/", ""))
    return (
        <div>
            <Link to="/">
                <button type="button" className="btn btn-primary goToList">Back to Users list</button>
            </Link>
            <h1 className="text-center">Edit User</h1>
            <NewForm requestFrom={"editUser"} userId={userId} />
        </div>
    )
}

export default EditUser