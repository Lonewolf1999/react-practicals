import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import '../css/MemberList.css'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMember, fetchMembers } from '../redux/dealWithAPI/apiActions'

function MemberList() {

    let [parameterToRefreshCompo, setParameterToRefreshCompo] = useState()

    const dispatch = useDispatch()
    const membersData = useSelector(state => state.dealWithAPI)
    const history = useHistory()

    const deleteRecord = (id) => {
        dispatch(deleteMember(id))
        setParameterToRefreshCompo(parameterToRefreshCompo = id)
    }

    useEffect(() => {
        dispatch(fetchMembers())
        // history.go(1)
        setParameterToRefreshCompo(parameterToRefreshCompo = 0)
        console.log(`member list re-rendered.`)
        console.log(`useEffect memberlist:`, membersData.members)
    }, [parameterToRefreshCompo])

    console.log(`outside useEffect memberlist:`, membersData.members)

    return (
        <>
            <div className="addMember">
                <Link to="/add-member">
                    <button type="button" className="btn btn-primary mt-1">Add Member</button>
                </Link>
                <br />
                <br />
                {membersData.memberListLoading ? (
                    <h2 className="text-center">Loading</h2>
                ) : membersData.memberListError ? (
                    <h2 className="text-center">{membersData.memberListError}</h2>
                ) : (
                    <>
                        <table className="rowBorder">
                            <thead>
                                <tr>
                                    <th>Member ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Job Title</th>
                                    <th>Racing Team</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {membersData &&
                                    membersData.members &&
                                    membersData.members.map(member => {
                                        return <tr key={member.id}>
                                            <td>{member.id}</td>
                                            <td>{member.firstName}</td>
                                            <td>{member.lastName}</td>
                                            <td>{member.jobTitle}</td>
                                            <td>{member.team}</td>
                                            <td>{member.status}</td>
                                            <td>
                                                <Link to={`/edit-member/${member.id}`}>
                                                    <button className="btn btn-secondary">Edit</button>
                                                </Link>
                                                <button className="btn btn-secondary" onClick={() => { deleteRecord(member.id) }}>Delete</button></td>
                                        </tr>
                                    })}

                            </tbody>
                        </table>
                    </>
                )}

            </div>
        </>
    )
}

export default MemberList