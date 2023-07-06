import { useEffect, useState } from "react";
import ProductFileInputGroup from "../common/ProductFileInputGroup";
import { IUploadImageResult } from "../common/types";
import ProductInputString from "./ProductInputString";
import http from "../../../../../../http";
import { IProductCreate } from "./types";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import CategoryParentSelect from "../../../../category/IProductParentSelect";

const ProductCreatePage = () => {
    const [images, setImages] = useState<IUploadImageResult[]>([]);
    // Функція, для оновлення масиву зображень
    const updateImages = (newImages: IUploadImageResult[]) => {
        setImages(newImages);
    };

    const updateParentID = (id: number) => {
        setFieldValue('categoryId', id);
    };

    const initValues: IProductCreate = {
        name: '',
        description: '',
        price: 0,
        categoryId: 0,
        imagesId: []
    }

    const createSchema = yup.object({
        name: yup.string().required("Вкажіть назву"),
        description: yup.string().required("Вкажіть опис"),
        price: yup.number().min(0.00001, 'Ціна повинна бути більше 0').required('Вкажіть ціну'),
    });

    const navigate = useNavigate();
    const onSubmitFormikData = (values: IProductCreate) => {
        console.log(values);

        http.post('api/products/addProduct', values, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then(resp => {
                console.log(values, resp);
                navigate("..");
            })
        navigate("..");
    }

    const formik = useFormik({
        initialValues: initValues,
        validationSchema: createSchema,
        onSubmit: onSubmitFormikData
    });
    const { values, errors, touched, handleSubmit, handleChange, setFieldValue } = formik;
    useEffect(() => {
        const updatedImagesId = images.map((image) => image.id);
        setFieldValue('imagesId', updatedImagesId);
    }, [images]);

    return (
        <>
            <form className="col-md-6 offset-md-3" onSubmit={handleSubmit} noValidate>
                <h1 className={"text-center"}>Добавлення продукта</h1>
                <ProductInputString values={values} errors={errors} touched={touched} handleChange={handleChange}></ProductInputString>
                <ProductFileInputGroup images={images} setImages={updateImages}></ProductFileInputGroup>
                <h6>Оберіть категорію товару</h6>
                <CategoryParentSelect setProductId={updateParentID}></CategoryParentSelect>
                <button className="btn btn-primary" type="submit">Додати товар</button>
            </form>
        </>
    );
}

export default ProductCreatePage;