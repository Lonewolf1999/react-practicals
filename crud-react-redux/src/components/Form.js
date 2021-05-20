import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addNewMember, fetchTeams, updateMember, populateForm } from '../redux/dealWithAPI/apiActions'

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

    const history = useHistory()
    const dispatch = useDispatch()
    const data = useSelector(state => state.dealWithAPI)

    const onSubmit = () => {
        if (props.requestFrom === 'addMember') {
            dispatch(addNewMember(formik.values))
            history.push("/")
        }
        else if (props.requestFrom === 'editMember') {
            dispatch(updateMember(formik.values, props.memberId))
            history.push("/")
        }
    }

    useEffect(() => {

        dispatch(fetchTeams())

        if (props.requestFrom === 'editMember') {
            dispatch(populateForm(props.memberId))
        }
    }, [])

    const formik = useFormik({
        initialValues: (props.requestFrom === 'addMember' ? initialValues : data.formPopulation),
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
                            value={formik.values.firstName || ''}
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
                            value={formik.values.jobTitle || ''}
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
                            value={formik.values.lastName || ''}
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
                            <option disabled value=''> --Select your team-- </option>
                            {data.teamListLoading ? (
                                <option disabled>Loading</option>
                            ) : data.teamListError ? (
                                <option disabled>{data.teamListError}</option>
                            ) : (
                                <>
                                    {
                                        data &&
                                        data.teams &&
                                        data.teams.map(team => {
                                            return <option key={team.id} value={team.teamName}>{team.teamName}</option>
                                        })
                                    }
                                </>
                            )}
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
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Form