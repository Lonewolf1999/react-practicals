import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import '../css/usersList.css'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, fetchUsers, populateForm } from '../redux/actions/actions'

function UsersList() {

    let [parameterToRefreshCompo, setParameterToRefreshCompo] = useState()

    const dispatch = useDispatch()
    const usersData = useSelector(state => state.dealWithAPI)
    const history = useHistory()

    const deleteRecord = (id) => {
        dispatch(deleteUser(id))
        setParameterToRefreshCompo(parameterToRefreshCompo = id)
    }

    useEffect(() => {
        dispatch(fetchUsers())
        // history.go(1)
        setParameterToRefreshCompo(parameterToRefreshCompo = 0)
        console.log(`member list re-rendered.`)
    }, [parameterToRefreshCompo])

    return (
        <>
            <div className="addUser">
                <Link to="/add-user">
                    <button type="button" className="btn btn-primary mt-1 float-right">Add User</button>
                </Link>
                <br />
                <br />
                <br />
                {usersData.userInfoListLoading ? (
                    <h2 className="text-center">Loading</h2>
                ) : usersData.userInfoListError ? (
                    <h2 className="text-center">{usersData.userInfoListError}</h2>
                ) : (
                    <>
                        <table className="rowBorder">
                            <thead>
                                <tr>
                                    <th>First name</th>
                                    <th>Last name</th>
                                    <th>Email ID</th>
                                    <th>Gender</th>
                                    <th>Activity</th>
                                    <th>Emergency Contact</th>
                                    <th>Addresses</th>
                                    <th>&nbsp;&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usersData &&
                                    usersData.users &&
                                    usersData.users.map(user => {
                                        return <tr key={user.id}>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.email}</td>
                                            <td>{user.gender}</td>
                                            <td>{user.isActive}</td>
                                            <td><b>First name:</b> {user.emergencyContact.firstName}<br />
                                                <b>Last name:</b> {user.emergencyContact.lastName}<br />
                                                <b>Email ID:</b> {user.emergencyContact.email}<br />
                                                <b>Mobile no.:</b> {user.emergencyContact.mobileNo}<br />
                                            </td>
                                            <td>
                                            {user.addresses.map(address => {
                                                return <>
                                                    <hr />
                                                    <b>First address:</b> {address.firstAddress}<br/>
                                                    <b>Second address:</b> {address.secondAddress}<br />
                                                    <b>City:</b> {address.city}<br />
                                                    <b>State:</b> {address.state}<br />
                                                    <b>Country:</b> {address.country}<br />
                                                    <b>zip code:</b> {address.zip}<br />
                                                    <hr />
                                                </>
                                            })}
                                            </td>
                                            <td>&nbsp;&nbsp;
                                                <Link to={`/edit-user/${user.id}`}>
                                                    <button className="btn btn-secondary">Edit</button>
                                                </Link>&nbsp;&nbsp;
                                                <button className="btn btn-secondary" onClick={() => { deleteRecord(user.id) }}>Delete</button>
                                            </td>
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

export default UsersList