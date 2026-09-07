import React, { useState } from "react";
import "./ProductEdit.css";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function ProductEdit() {
    let location = useLocation();
    let { id, title, price, stock, img, status } = location.state;

    const [productTitle, setProductTitle] = useState(title);
    const [productPrice, setProductPrice] = useState(price);
    const [productStock, setProductStock] = useState(stock);
    const [image, setImage] = useState(img);
    const [imageFile, setImageFile] = useState(null);
    const [productStatus, setProductStatus] = useState(status === 1 ? "موجود" : "ناموجود");

    let navigate = useNavigate();

    const submitHandler = (event) => {
        event.preventDefault();

        if (productTitle && productPrice && productStock && productStatus) {
            const formData = new FormData();
            formData.append("title", productTitle);
            formData.append("price", productPrice);
            formData.append("stock", productStock);
            formData.append("status", productStatus === "موجود" ? 1 : 2);
            if (imageFile) {
                formData.append("img", imageFile);
            }

            fetch(`http://localhost:8000/api/products/${id}`, {
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
        setProductTitle(event.target.value);
    };

    const priceHandler = (event) => {
        setProductPrice(event.target.value);
    };

    const stockHandler = (event) => {
        setProductStock(event.target.value);
    };

    const imageHandler = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
            setImage(URL.createObjectURL(file));
        }
    };

    const statusHandler = (event) => {
        setProductStatus(event.target.value);
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
                            value={productTitle}
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
                            value={productPrice}
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
                            value={productStock}
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
                                value={productStatus}
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
