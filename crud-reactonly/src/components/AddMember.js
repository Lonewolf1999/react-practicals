import React from 'react'
import { Link } from 'react-router-dom'
import '../css/MemberCss.css'
import Form from './Form'
import FormNewMemberHeader from './FormNewMemberHeader'

function AddMember() {

    return (
        <div>
            <Link to="/">
                <button type="button" className="btn btn-primary goToList">Back to Members list</button>
            </Link>
            <FormNewMemberHeader />
            <Form requestFrom={"addMember"} />
        </div>
    )
}

export default AddMember