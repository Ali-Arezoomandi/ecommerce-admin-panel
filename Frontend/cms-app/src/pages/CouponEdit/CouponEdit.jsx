import React, { useState } from "react";
import "./CouponEdit.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";

export default function CouponEdit() {
    let location = useLocation();
    let { id, code, percent, status, expiration_date } = location.state;

    const [couponCode, setCouponCode] = useState(code);
    const [couponPercent, setCouponPercent] = useState(percent);
    const [couponStatus, setCouponStatus] = useState(status === 1 ? "در دسترس" : "منقضی شده");
    const [expirationDate, setExpirationData] = useState(expiration_date);

    let navigate = useNavigate();

    const submitHandler = (event) => {
        event.preventDefault();

        if (code && percent && status && expirationDate) {
            const formData = new FormData();
            formData.append("code", couponCode);
            formData.append("percent", couponPercent);
            formData.append("status", couponStatus === "در دسترس" ? 1 : 2);
            formData.append("expiration_date", expirationDate + ":00");

            fetch(`http://localhost:8000/api/products/coupon/${id}`, {
                method: "PATCH",
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((err) => console.error("Error fetching PATCH coupon: ", err));

            navigate("/coupons");
        }
    };

    const codeHandler = (event) => {
        setCouponCode(event.target.value);
    };

    const percentHandler = (event) => {
        setCouponPercent(event.target.value);
    };

    const statusHandler = (event) => {
        setCouponStatus(event.target.value);
    };

    const expirationDateHandler = (dateObject) => {
        if (!dateObject) {
            setExpirationData("");
            return;
        }
        const gregorianDate = dateObject.convert(gregorian);
        const formatted = gregorianDate.format("YYYY-MM-DDTHH:mm");
        setExpirationData(formatted);
    };

    return (
        <div className="coupons-card">
            <div className="page-heading">
                <div className="page-title">
                    <i className="fa-solid fa-user-plus"></i>
                    افزودن کد تخفیف جدید
                </div>
                <Link to="/coupons">
                    <button className="btn-back">
                        <i className="fa-solid fa-arrow-right"></i>
                        بازگشت به لیست کد های تخفیف
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
                            <i className="fa-solid fa-user"></i> کد تخفیف
                        </label>
                        <input
                            type="text"
                            id="code"
                            name="code"
                            className="form-control"
                            required
                            value={couponCode}
                            onChange={codeHandler}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName">
                            <i className="fa-solid fa-user"></i> درصد تخفیف
                        </label>
                        <input
                            type="number"
                            id="percent"
                            name="percent"
                            className="form-control"
                            value={couponPercent}
                            onChange={percentHandler}
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
                                value={couponStatus}
                                onChange={statusHandler}>
                                <option value="در دسترس">در دسترس</option>
                                <option value="منقضی شده">منقضی شده</option>
                            </select>
                            <i className="fa-solid fa-chevron-down select-arrow"></i>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="expiration">
                            <i className="fa-solid fa-clock"></i> تاریخ انقضا
                        </label>
                        <DatePicker
                            calendar={persian}
                            locale={persian_fa}
                            format="YYYY/MM/DD HH:mm"
                            plugins={[<TimePicker position="bottom" />]}
                            onChange={expirationDateHandler}
                            calendarPosition="bottom-right"
                            render={(value, openCalendar) => (
                                <input
                                    type="text"
                                    className="form-control"
                                    value={value}
                                    onFocus={openCalendar}
                                    onClick={openCalendar}
                                    readOnly
                                    required
                                    placeholder="انتخاب تاریخ و ساعت انقضا"
                                />
                            )}
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <Link to="/coupons">
                        <button type="button" className="btn-cancel">
                            انصراف
                        </button>
                    </Link>
                    <button type="submit" className="btn-save">
                        <i className="fa-solid fa-floppy-disk"></i>
                        ذخیره کاربر
                    </button>
                </div>
            </form>
        </div>
    );
}
