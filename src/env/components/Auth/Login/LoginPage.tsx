import React, {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import * as yup from "yup";
import {useFormik} from "formik";
import classNames from "classnames";
import {ILogin, ILoginResult} from "./types";
import jwtDecode from "jwt-decode";
import {useDispatch} from "react-redux";
import http from "../../../../http";
import { AuthUserActionType, IUser } from "../AuthReducer/types";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const initValues: ILogin = {
        email: "",
        password: ""
    };

    const [error, setError]=useState<string>("");

    const createSchema = yup.object({
        email: yup.string().required("Enter email!"),
        password: yup
            .string()
            .required("password is required")
            .min(6, "password must be at least 6 characters"),
    });

    const onSubmitFormikData = async (values: ILogin) => {
        try {
            const resp = await http
                .post<ILoginResult>("api/Auth/login", values, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            const {token} = resp.data;
            const user = jwtDecode(token) as IUser;
            localStorage.token = token;
            http.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.token}`;
            dispatch({
                type: AuthUserActionType.LOGIN_USER,
                payload: {
                    email: user.email,
                    image: user.image,
                    roles: user.roles
                },
            });
            navigator("/");

        } catch {
          setError("Дані вказано не вірно!");
        }
    };

    const formik = useFormik({
        initialValues: initValues,
        validationSchema: createSchema,
        onSubmit: onSubmitFormikData,
    });

    const {values, errors, touched, handleSubmit, handleChange} = formik;

    return (
        <>
            <h1 className="text-center">Вхід</h1>
            <form className="col-md-6 offset-md-3" onSubmit={handleSubmit}>
              {   error &&
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
              }
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        email
                    </label>
                    <input
                        type="text"
                        className={classNames("form-control", {
                            "is-invalid": errors.email && touched.email,
                        })}
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                    />
                    {errors.email && touched.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        password
                    </label>
                    <input
                        type="password"
                        className={classNames("form-control", {
                            "is-invalid": errors.password && touched.password,
                        })}
                        id="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                    />
                    {errors.password && touched.password && (
                        <div className="invalid-feedback">{errors.password}</div>
                    )}
                </div>

                <button type="submit" className="btn btn-primary">
                    Вхід
                </button>
            </form>
        </>
    );
};
export default LoginPage;