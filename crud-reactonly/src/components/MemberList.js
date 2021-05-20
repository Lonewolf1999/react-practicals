import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../css/MemberList.css'
import axios from 'axios'

function MemberList() {

    let [presentList, setPresentList] = useState([])
    let [id, setId] = useState()

    const deleteRecord = (id) => {
        axios.delete(`http://localhost:8000/members/${id}`)
            .then(() => {
                setId(id = id)
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/members`)
            .then(response => {
                const res = response.data
                setPresentList(presentList = res.map(element => {
                    return <tr key={element.id}>
                        <td>{element.id}</td>
                        <td>{element.firstName}</td>
                        <td>{element.lastName}</td>
                        <td>{element.jobTitle}</td>
                        <td>{element.team}</td>
                        <td>{element.status}</td>
                        <td>
                            <Link to={`/edit-member/${element.id}`}>
                                <button className="btn btn-secondary">Edit</button>
                            </Link>
                            <button className="btn btn-secondary" onClick={() => { deleteRecord(element.id) }}>Delete</button></td>
                    </tr>
                }))
            })
            .catch(error => {
                setPresentList(presentList = <h1>{error.message}</h1>)
            })
    }, [id])

    return (
        <>
            <div className="addMember">
                <Link to="/add-member">
                    <button type="button" className="btn btn-primary mt-1">Add Member</button>
                </Link>
                <br />
                <br />
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
                        {presentList}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default MemberList