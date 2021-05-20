import React, { useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import * as yup from 'yup'
import '../css/css.css'
import { useDispatch, useSelector } from 'react-redux'
import { addNewUser, populateForm, updateUser } from '../redux/actions/actions'
import { useHistory } from 'react-router-dom'

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    isActive: '',
    emergencyContact: {
        firstName: '',
        lastName: '',
        email: '',
        mobileNo: ''
    },
    addresses: [
        {
            firstAddress: '',
            secondAddress: '',
            city: '',
            state: '',
            country: '',
            zip: ''
        }
    ]
}



const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = yup.object().shape({
    firstName: yup.string()
        .min(3, 'Too short!')
        .max(20, 'Too long!')
        .required('*Required'),
    lastName: yup.string()
        .min(3, 'Too short!')
        .max(20, 'Too long!')
        .required('*Required'),
    email: yup.string()
        .email('Invalid email ID')
        .required('*Required'),
    gender: yup.string()
        .required('*Required'),
    isActive: yup.string()
        .required('*Required'),
    emergencyContact: yup.object().shape({
        firstName: yup.string()
            .min(3, 'Too short!')
            .max(20, 'Too long!')
            .required('*Required'),
        lastName: yup.string()
            .min(3, 'Too short!')
            .max(20, 'Too long!')
            .required('*Required'),
        email: yup.string()
            .email('Invalid email ID')
            .required('*Required'),
        mobileNo: yup.string()
            .required('*Required')
            .matches(phoneRegExp, 'Mobile number is not valid!')
            .min(8, 'Too short!')
            .max(20, 'Too long!')
    }),
    addresses: yup.array().of(
        yup.object().shape({
            firstAddress: yup.string()
                .required('*Required')
                .min(1, 'Too short!')
                .max(200, 'Too long!'),
            secondAddress: yup.string()
                .required('*Required')
                .min(1, 'Too short!')
                .max(200, 'Too long!'),
            city: yup.string()
                .required('*Required')
                .min(2, 'Too short!')
                .max(50, 'Too long!'),
            state: yup.string()
                .required('*Required')
                .min(2, 'Too short!')
                .max(50, 'Too long!'),
            country: yup.string()
                .required('*Required')
                .min(2, 'Too short!')
                .max(50, 'Too long!'),
            zip: yup.string()
                .required('*Required')
                .min(2, 'Too short!')
                .max(15, 'Too long!')
        })
    )
})

function NewForm(props) {

    const history = useHistory()
    const dispatch = useDispatch()
    const usersData = useSelector(state => state.dealWithAPI)

    useEffect(() => {
        console.log('useEffect', props.requestFrom)
        if (props.requestFrom === 'editUser') {
            console.log(props.requestFrom)
            dispatch(populateForm(props.userId))
        }
        if (props.requestFrom === 'addUser') {
            console.log(props.requestFrom)
        }
    }, [])

    console.log(usersData.formPopulation)

    const onSubmit = (values) => {
        if (props.requestFrom === 'addUser') {
            console.log(values)
            dispatch(addNewUser(values))
            history.push("/")
        }
        if (props.requestFrom === 'editUser') {
            console.log(values)
            dispatch(updateUser(values, props.userId))
            history.push("/")
        }

    }

    console.log(usersData)

    return (
        <Formik
            initialValues={props.requestFrom === "addUser" ? initialValues : usersData.formPopulation}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => onSubmit(values)}
            enableReinitialize
            render={({ values }) => (
                <div className="container">
                    <br />
                    <Form>
                        <div className="row">
                            <div className="col-md-12">
                                <h6>User Details:</h6>
                            </div>
                        </div>
                        <div className="border border-light rounded p-3">
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="firstname" className="form-label" >First name:</label>
                                    <Field type='text' id='firstName' name='firstName' className="form-control" />
                                    <ErrorMessage name="firstName" >
                                        {msg => <span className="error">{msg}</span>}
                                    </ErrorMessage>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="lastname" className="form-label" >last name:</label>
                                    <Field type='text' id='lastName' name='lastName' className="form-control" />
                                    <ErrorMessage name="lastName" >
                                        {msg => <span className="error">{msg}</span>}
                                    </ErrorMessage>
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-md-12">
                                    <label htmlFor="email" className="form-label" >Email ID:</label>
                                    <Field type='text' id='email' name='email' className="form-control" />
                                    <ErrorMessage name="email" >
                                        {msg => <span className="error">{msg}</span>}
                                    </ErrorMessage>
                                </div>
                            </div>
                            <br />
                            <div className="row p-10px">
                                <div className="col-md-6">
                                    <div className="form-check form-check-inline">
                                        <label htmlFor="gender" className="form-label" >Gender:&nbsp;</label>
                                        <Field as="select" name="gender" className="form-control">
                                            <option value="" disabled>Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </Field>
                                    </div>
                                    <ErrorMessage name="gender" >
                                        {msg => <span className="error">{msg}</span>}
                                    </ErrorMessage>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-check-label" htmlFor="activity">is Active:&nbsp;&nbsp;</label>
                                    <div className="form-check form-check-inline">
                                        <Field type="radio" name="isActive" value="Active" className="form-check-input" />
                                        <label className="form-check-label" htmlFor="Active">Active</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <Field type="radio" name="isActive" value="Inactive" className="form-check-input" />
                                        <label className="form-check-label" htmlFor="Inactive">Inactive</label>
                                    </div>
                                    <ErrorMessage name="isActive" >
                                        {msg => <span className="error">{msg}</span>}
                                    </ErrorMessage>
                                </div>
                            </div>
                            <br />
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-12">
                                <h6>Emergency contact:</h6>
                            </div>
                        </div>
                        <div className="border border-light rounded p-3">
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="firstname" className="form-label" >First name:</label>
                                    <Field type='text' id='emergencyContact.firstName' name='emergencyContact.firstName' className="form-control" />
                                    <ErrorMessage name="emergencyContact.firstName" >
                                        {msg => <span className="error">{msg}</span>}
                                    </ErrorMessage>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="lastname" className="form-label" >last name:</label>
                                    <Field type='text' id='emergencyContact.lastName' name='emergencyContact.lastName' className="form-control" />
                                    <ErrorMessage name="emergencyContact.lastName" >
                                        {msg => <span className="error">{msg}</span>}
                                    </ErrorMessage>
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="email" className="form-label" >Email ID:</label>
                                    <Field type='text' id='emergencyContact.email' name='emergencyContact.email' className="form-control" />
                                    <ErrorMessage name="emergencyContact.email" >
                                        {msg => <span className="error">{msg}</span>}
                                    </ErrorMessage>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="mobileNo" className="form-label" >Mobile No.:</label>
                                    <Field type='text' id='emergencyContact.mobileNo' name='emergencyContact.mobileNo' className="form-control" />
                                    <ErrorMessage name="emergencyContact.mobileNo" >
                                        {msg => <span className="error">{msg}</span>}
                                    </ErrorMessage>
                                </div>
                            </div>
                            <br />
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-12">
                                <h6>Provide address(es):</h6>
                            </div>
                        </div>
                        <div className="border border-light rounded p-3">
                            <FieldArray
                                name="addresses"
                                render={arrayHelpers => {
                                    const addresses = values.addresses;
                                    return (
                                        <div>
                                            <button type='button' className="btn btn-primary float-right" onClick={() => arrayHelpers.push({
                                                firstAddress: '',
                                                secondAddress: '',
                                                city: '',
                                                state: '',
                                                country: '',
                                                zip: ''
                                            })}>
                                                Add address
                                        </button>
                                            <br />
                                            <br />
                                            {addresses && addresses.length > 0
                                                ? addresses.map((address, index) => (
                                                    <div key={index}>
                                                        <div className="row">
                                                            <div className="col-md-4">
                                                                <label htmlFor="firstAddress" className="form-label" > First address:</label>
                                                                <Field name={`addresses.${index}.firstAddress`} className="form-control" />
                                                                <ErrorMessage name={`addresses.${index}.firstAddress`} >
                                                                    {msg => <span className="error">{msg}</span>}
                                                                </ErrorMessage>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <label htmlFor="secondAddress" className="form-label" > Second address:</label>
                                                                <Field name={`addresses.${index}.secondAddress`} className="form-control" />
                                                                <ErrorMessage name={`addresses.${index}.secondAddress`} >
                                                                    {msg => <span className="error">{msg}</span>}
                                                                </ErrorMessage>
                                                            </div>
                                                            <div className="col-md-4 my-auto">
                                                                <button type='button' disabled={addresses.length === 1} className="btn btn-outline-danger float-right delete-btn" onClick={() => arrayHelpers.remove(index)}>
                                                                    Delete
                                                                    </button>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-2">
                                                                <label htmlFor="city" className="form-label" >City:</label>
                                                                <Field name={`addresses.${index}.city`} className="form-control" />
                                                                <ErrorMessage name={`addresses.${index}.city`} >
                                                                    {msg => <span className="error">{msg}</span>}
                                                                </ErrorMessage>
                                                            </div>
                                                            <div className="col-md-2">
                                                                <label htmlFor="state" className="form-label" >State:</label>
                                                                <Field name={`addresses.${index}.state`} className="form-control" />
                                                                <ErrorMessage name={`addresses.${index}.state`} >
                                                                    {msg => <span className="error">{msg}</span>}
                                                                </ErrorMessage>
                                                            </div>
                                                            <div className="col-md-2">
                                                                <label htmlFor="country" className="form-label" >Country:</label>
                                                                <Field name={`addresses.${index}.country`} className="form-control" />
                                                                <ErrorMessage name={`addresses.${index}.country`} >
                                                                    {msg => <span className="error">{msg}</span>}
                                                                </ErrorMessage>
                                                            </div>
                                                            <div className="col-md-2">
                                                                <label htmlFor="zip" className="form-label" >ZIP code:</label>
                                                                <Field name={`addresses.${index}.zip`} className="form-control" />
                                                                <ErrorMessage name={`addresses.${index}.zip`} >
                                                                    {msg => <span className="error">{msg}</span>}
                                                                </ErrorMessage>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )) : null}
                                        </div>
                                    );
                                }}
                            />
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-12">
                                <button type="submit" className="btn btn-primary float-right" >Submit</button>
                            </div>
                        </div>
                        <br />
                    </Form>
                </div>
            )}
        />
    )
}

export default NewForm