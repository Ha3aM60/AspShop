import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import http from '../../../http';
import { useFormik } from 'formik';
import classNames from 'classnames';
import { IRegistration } from './types';


const RegisterPage = () => {
    const navigator = useNavigate();
    const initValues: IRegistration = {
        FirstName: "",
        LastName: "",
        Email: "",
        Password: "",
        ConfirmPassword: "",
        Image: null
    };


    const createSchema = yup.object({
        FirstName: yup.string().required("Enter name!"),
        Email: yup.string().required("Enter email!"),
        Password: yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters'),
        ConfirmPassword: yup.string()
            .oneOf([yup.ref('Password')], 'Passwords must match')
            .required('Confirm Password is required')
    })

    const onSubmitFormikData = (values: IRegistration) => {
        console.log("Formik send data", values);
        http.post("api/Auth/register", values, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then(resp => {
                console.log("Create date in server", resp);
                navigator("/");
            });
    }

    const formik = useFormik({
        initialValues: initValues,
        validationSchema: createSchema,
        onSubmit: onSubmitFormikData
    });

    const onImageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files != null) {
            const file = e.target.files[0];
            formik.setFieldValue(e.target.name, file);
        }
    };
    const { values, errors, touched, handleSubmit, handleChange } = formik;

    return (
        <>
            <h1 className="text-center">Register</h1>
            <form className="col-md-6 offset-md-3" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="FirstName" className="form-label">
                        First Name
                    </label>
                    <input
                        type="text"
                        className={classNames("form-control", { "is-invalid": errors.FirstName && touched.FirstName })}
                        id="FirstName"
                        name="FirstName"
                        value={values.FirstName}
                        onChange={handleChange}
                    />
                    {errors.FirstName && touched.FirstName && <div className="invalid-feedback">{errors.FirstName}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="LastName" className="form-label">
                        Last Name
                    </label>
                    <input
                        type="text"
                        className={classNames("form-control", { "is-invalid": errors.LastName && touched.LastName })}
                        id="LastName"
                        name="LastName"
                        value={values.LastName}
                        onChange={handleChange}
                    />
                    {errors.LastName && touched.LastName && <div className="invalid-feedback">{errors.LastName}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="Email" className="form-label">
                        Email
                    </label>
                    <input
                        type="text"
                        className={classNames("form-control", { "is-invalid": errors.Email && touched.Email })}
                        id="Email"
                        name="Email"
                        value={values.Email}
                        onChange={handleChange}
                    />
                    {errors.Email && touched.Email && <div className="invalid-feedback">{errors.Email}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="Password" className="form-label">
                        Password
                    </label>
                    <input
                        type="text"
                        className={classNames("form-control", { "is-invalid": errors.Password && touched.Password })}
                        id="Password"
                        name="Password"
                        value={values.Password}
                        onChange={handleChange}
                    />
                    {errors.Password && touched.Password && <div className="invalid-feedback">{errors.Password}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="ConfirmPassword" className="form-label">
                        Confirm Password
                    </label>
                    <input
                        type="text"
                        className={classNames("form-control", { "is-invalid": errors.ConfirmPassword && touched.ConfirmPassword })}
                        id="ConfirmPassword"
                        name="ConfirmPassword"
                        value={values.ConfirmPassword}
                        onChange={handleChange}
                    />
                    {errors.ConfirmPassword && touched.ConfirmPassword && <div className="invalid-feedback">{errors.ConfirmPassword}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="Image" className="form-label">
                        Image URL
                    </label>
                    <input
                        type="file"
                        className="form-control"
                        id="Image"
                        name="Image"
                        onChange={onImageChangeHandler}
                    />
                </div>


                <button type="submit" className="btn btn-primary">
                    Sign up
                </button>
            </form>
        </>
    );
}
export default RegisterPage;