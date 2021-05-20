import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'

let initialValues = {
    firstName: '',
    lastName: '',
    jobTitle: '',
    status: '',
    team: ''
}

const validationSchema = Yup.object({
    firstName: Yup.string().required('*Enter your first name.'),
    lastName: Yup.string().required('*Enter your last name.'),
    jobTitle: Yup.string().required('*Enter your job title.'),
    status: Yup.string().required('*Select your current status.'),
    team: Yup.string().required('*Select your current team.')
})

function Form(props) {

    let [presentTeamList, setPresentTeamList] = useState([])
    let [formData, setFormData] = useState(null)
    let [showError, setShowError] = useState(null)

    let history = useHistory()

    const onSubmit = () => {
        if (props.requestFrom === 'addMember') {
            axios.post(`http://localhost:8000/members`, formik.values)
                .then(() => {
                    history.push("/")
                })
                .catch((error) => {
                    setShowError(showError = <h6 className="error">{error.message}</h6>)
                })
        }
        else if (props.requestFrom === 'editMember') {
            axios.put(`http://localhost:8000/members/${props.memberId}`, formik.values)
                .then(() => {
                    history.push("/")
                })
                .catch((error) => {
                    setShowError(showError = <h6 className="error">{error.message}</h6>)
                })
                
        }
        
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/teams`)
            .then(response => {
                const res = response.data
                setPresentTeamList(presentTeamList = res.map(element => {
                    return <option key={element.id} id={`option${element.id}`} value={element.teamName}>{element.teamName}</option>
                }))
            })
            .catch(error => {
                setPresentTeamList(presentTeamList = <h1>{error.message}</h1>)
            })

        if (props.requestFrom === 'editMember') {
            axios.get(`http://localhost:8000/members/${props.memberId}`)
                .then((response) => {
                    setFormData( formData = response.data)
                })
                .catch((error) => {
                    console.log(error.message)
                })
        }
    }, [])

    const formik = useFormik({
        initialValues: formData || initialValues,
        onSubmit,
        validationSchema,
        enableReinitialize: true
    })

    return (
        <form>
            <div className="enterNewMemberData">
                <div className="flex-container pad-20-top">
                    <div className="divMargin select-width-input">
                        <label>First Name </label><br />
                        <input
                            type="text"
                            id='firstName'
                            name='firstName'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstName}
                            className="form-control"
                            placeholder="Please enter your first name"
                        />
                        {formik.errors.firstName ? (
                            <div className='error'>{formik.errors.firstName}</div>
                        ) : null}
                        <br />
                        <label>Job Title </label><br />
                        <input
                            type="text"
                            id='jobTitle'
                            name='jobTitle'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.jobTitle}
                            className="form-control"
                            placeholder="Please enter your job title"
                        />
                        {formik.touched.jobTitle && formik.errors.jobTitle ? (
                            <div className='error'>{formik.errors.jobTitle}</div>
                        ) : null}
                        <br />
                    </div>
                    <div className="divMargin select-width-input">
                        <label>Last Name </label><br />
                        <input
                            type="text"
                            id='lastName'
                            name='lastName'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lastName}
                            className="form-control"
                            placeholder="Please enter your last name"
                        />
                        {formik.touched.lastName && formik.errors.lastName ? (
                            <div className='error'>{formik.errors.lastName}</div>
                        ) : null}
                        <br />
                        <label>Please select your status </label><br />
                        <label className="form-check-label">
                            <input
                                type="radio"
                                id="Active"
                                name="status"
                                value="Active"
                                checked={formik.values.status === "Active"}
                                onChange={formik.handleChange}
                            />
                            &nbsp;Active</label>
                        <span>&nbsp;&nbsp;&nbsp;</span>
                        <label className="form-check-label">
                            <input
                                type="radio"
                                id="Inactive"
                                name="status"
                                value="Inactive"
                                checked={formik.values.status === "Inactive"}
                                onChange={formik.handleChange}
                            />
                            &nbsp;Inactive</label>
                        {formik.touched.status && formik.errors.status ? (
                            <div className='error'>{formik.errors.status}</div>
                        ) : null}
                        <br />
                    </div>
                </div>
                <div className="flex-container">
                    <div className="divMargin select-width">
                        <label>Please specify your need </label><br />
                        <select className="form-control" value={formik.values.team} name="team" onChange={formik.handleChange}>
                            <option disabled value=''>--Select your team--</option>
                            {presentTeamList}
                        </select>
                        {formik.touched.team && formik.errors.team ? (
                            <div className='error'>{formik.errors.team}</div>
                        ) : null}
                    </div>
                </div>
                <div className="flex-container pad-10-bottom">
                    <div className="divMargin select-width">
                        <br />
                        <button type="button" onClick={formik.handleSubmit} className="btn btn-success btn-lg btn-block">SEND MESSAGE</button>
                        <br />
                        {showError}
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Form