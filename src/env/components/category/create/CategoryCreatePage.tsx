import { useNavigate } from "react-router-dom";
import http from "../../../../http";
import { ICategoryCreate } from "./types";
import * as yup from "yup";
import { useFormik } from "formik";
import { ChangeEvent } from "react";
import classNames from "classnames";

const CategoryCreatePage = () => {

    const navigator = useNavigate();
    const initValues: ICategoryCreate = {
        name: "",
        priority: 0,
        image: null,
        description: "",
        parentid: 0
    };

    const createSchema = yup.object({
        name: yup.string().required("Enter name!"),
        description: yup.string().required("Enter description!"),
        parentid: yup.string().required("Enter parent ID!")
    })

    const onSubmitFormikData = (values: ICategoryCreate) => {
        console.log("Formik send data", values);
        http.post("api/Categories/create", values, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
          .then(resp => {
            //console.log("Create date in server", resp);
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
          const file =  e.target.files[0];
          formik.setFieldValue(e.target.name, file);
        }
      };
      const { values, errors, touched, handleSubmit, handleChange } = formik;

      return (
        <>
          <h1 className="text-center">Add category</h1>
          <form className="col-md-6 offset-md-3" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className={classNames("form-control", { "is-invalid": errors.name && touched.name })}
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
              />
              {errors.name && touched.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="priority" className="form-label">
                Priority
              </label>
              <input
                type="number"
                className={classNames("form-control", { "is-invalid": errors.priority && touched.priority })}
                id="priority"
                name="priority"
                value={values.priority}
                onChange={handleChange}
              />
              {errors.priority && touched.priority && <div className="invalid-feedback">{errors.priority}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="parentid" className="form-label">
                Parent Id
              </label>
              <input
                type="number"
                className={classNames("form-control", { "is-invalid": errors.parentid && touched.parentid })}
                id="parentid"
                name="parentid"
                value={values.parentid}
                onChange={handleChange}
              />
              {errors.parentid && touched.parentid && <div className="invalid-feedback">{errors.parentid}</div>}
            </div>
      
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image URL
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
                name="image"
                onChange={onImageChangeHandler}
              />
            </div>
      
            <div className="form-floating mb-3">
              <textarea
                className={classNames("form-control", { "is-invalid": errors.description && touched.description })}
                placeholder="Description"
                id="description"
                name="description"
                style={{ height: "100px" }}
                value={values.description}
                onChange={handleChange}
              ></textarea>
              {errors.description && touched.description && <div className="invalid-feedback">{errors.description}</div>}
              <label htmlFor="description">Description</label>
            </div>
      
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </form>
        </>
      );



};
export default CategoryCreatePage;