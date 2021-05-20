import React from 'react'
import Form from './Form'
import { Link, useLocation } from 'react-router-dom'
import FormUpdateMemberHeader from './FormUpdateMemberHeader'

function EditMember() {
    const { pathname } = useLocation()
    const userId = parseInt(pathname.replace("/edit-member/", ""))

    return (
        <div>
            <Link to="/">
                <button type="button" className="btn btn-primary goToList">Back to Members list</button>
            </Link>
            <FormUpdateMemberHeader />
            <Form requestFrom={"editMember"} memberId={userId} />
        </div>
    )
}

export default EditMember