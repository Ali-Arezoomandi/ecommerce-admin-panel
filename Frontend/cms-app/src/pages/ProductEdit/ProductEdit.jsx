import React, { useState, useEffect } from "react";
import "./ProductEdit.css";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function ProductEdit() {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [image, setImage] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [status, setStatus] = useState("");

    let params = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8000/api/products/${params.productId}`)
            .then((response) => response.json())
            .then((data) => {
                setTitle(data.title);
                setPrice(data.price);
                setStock(data.stock);
                setImage(data.img);
                setStatus(data.status === 1 ? "موجود" : "ناموجود");
            })
            .catch((err) => console.error("Error to fetching product detail: ", err));
    }, [params.productId]);

    const submitHandler = (event) => {
        event.preventDefault();

        if (title && price && stock && status) {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("price", price);
            formData.append("stock", stock);
            formData.append("status", status === "موجود" ? 1 : 2);
            if (imageFile) {
                formData.append("img", imageFile);
            }

            fetch(`http://localhost:8000/api/products/${params.productId}`, {
                method: "PATCH",
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((err) => console.error("Error fetching Patch product: ", err));

            navigate("/products");
        }
    };

    const titleHandler = (event) => {
        setTitle(event.target.value);
    };

    const priceHandler = (event) => {
        setPrice(event.target.value);
    };

    const stockHandler = (event) => {
        setStock(event.target.value);
    };

    const imageHandler = (event) => {        
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
            setImage(URL.createObjectURL(file));
        }
    };

    const statusHandler = (event) => {
        setStatus(event.target.value);
    };

    return (
        <div className="products-card">
            <div className="page-heading">
                <div className="page-title">
                    <i className="fa-solid fa-user-plus"></i>
                    افزودن محصول جدید
                </div>
                <Link to="/products">
                    <button className="btn-back">
                        <i className="fa-solid fa-arrow-right"></i>
                        بازگشت به لیست محصولات
                    </button>
                </Link>
            </div>

            <form className="form-card" id="addUserForm" onSubmit={submitHandler}>
                <div className="form-section-title">
                    <i className="fa-solid fa-id-card"></i>
                    اطلاعات هویتی و تماس
                </div>

                <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="firstName">
                            <i className="fa-solid fa-user"></i> نام محصول
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="form-control"
                            required
                            value={title}
                            onChange={titleHandler}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName">
                            <i className="fa-solid fa-user"></i> قیمت محصول
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            className="form-control"
                            value={price}
                            onChange={priceHandler}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">
                            <i className="fa-solid fa-phone"></i> موجودی
                        </label>
                        <input
                            type="number"
                            id="stock"
                            name="stock"
                            className="form-control"
                            value={stock}
                            onChange={stockHandler}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="city">
                            <i className="fa-solid fa-city"></i> وضعیت
                        </label>
                        <div className="select-wrapper">
                            <select
                                name="status"
                                id="status"
                                className="form-control"
                                value={status}
                                onChange={statusHandler}>
                                <option value="موجود">موجود</option>
                                <option value="ناموجود">ناموجود</option>
                            </select>
                            <i className="fa-solid fa-chevron-down select-arrow"></i>
                        </div>
                    </div>

                    <div className="form-group full-width">
                        <label htmlFor="image">
                            <i className="fa-solid fa-image"></i> تصویر محصول
                        </label>
                        <div className="image-upload-box">
                            <div className="image-preview">
                                {image ? (
                                    <img src={image} alt="پیش‌ نمایش محصول" />
                                ) : (
                                    <i className="fa-solid fa-image placeholder-icon"></i>
                                )}
                            </div>
                            <div className="image-upload-actions">
                                <label htmlFor="image" className="btn-upload">
                                    <i className="fa-solid fa-upload"></i>
                                    انتخاب تصویر جدید
                                </label>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    accept="image/*"
                                    onChange={imageHandler}
                                    style={{ display: "none" }}
                                />
                                <span className="upload-hint">فرمت مجاز: JPG, PNG - حداکثر ۲ مگابایت</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-actions">
                    <button type="button" className="btn-cancel">
                        انصراف
                    </button>
                    <button type="submit" className="btn-save">
                        <i className="fa-solid fa-floppy-disk"></i>
                        ذخیره کاربر
                    </button>
                </div>
            </form>
        </div>
    );
}
