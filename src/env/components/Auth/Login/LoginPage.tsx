import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { useFormik } from 'formik';
import classNames from 'classnames';
import { ILogin } from './types';
import http from '../../../../http';



const LoginPage = () => {
    const navigator = useNavigate();
    const initValues: ILogin = {
        Email: "",
        Password: ""
    };


    const createSchema = yup.object({
        Email: yup.string().required("Enter email!"),
        Password: yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
    })

    const onSubmitFormikData = (values: ILogin) => {
        console.log("Formik send data", values);
        http.post("api/Auth/login", values, {
            headers: {
                "Content-Type": "application/json",
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

    const { values, errors, touched, handleSubmit, handleChange } = formik;

    return (
        <>
            <h1 className="text-center">Login</h1>
            <form className="col-md-6 offset-md-3" onSubmit={handleSubmit}>
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

                <button type="submit" className="btn btn-primary">
                    Sign in
                </button>
            </form>
        </>
    );
}
export default LoginPage;