import React from "react";
import "./SideBar.css";
import { NavLink } from "react-router-dom";

export default function SideBar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-menu">
                <NavLink
                    to="/"
                    className={({ isActive }) => `nav-item has-tooltip ${isActive ? "active" : ""}`}
                    data-title="صفحه اصلی">
                    <i className="fa-solid fa-house"></i>
                </NavLink>
                <NavLink
                    to="/products"
                    className={({ isActive }) => `nav-item has-tooltip ${isActive ? "active" : ""}`}
                    data-title="محصولات">
                    <i className="fa-solid fa-box"></i>
                </NavLink>
                <NavLink
                    to="/coupons"
                    className={({ isActive }) => `nav-item has-tooltip ${isActive ? "active" : ""}`}
                    data-title="کد تخفیف‌ها">
                    <i className="fa-solid fa-percent"></i>
                </NavLink>
                <NavLink
                    to="/comments"
                    className={({ isActive }) => `nav-item has-tooltip ${isActive ? "active" : ""}`}
                    data-title="کامنت‌ها">
                    <i className="fa-regular fa-comment-dots"></i>
                </NavLink>
                <NavLink
                    to="/orders"
                    className={({ isActive }) => `nav-item has-tooltip ${isActive ? "active" : ""}`}
                    data-title="سفارشات">
                    <i className="fa-solid fa-bag-shopping"></i>
                </NavLink>
                <NavLink
                    to="/users"
                    className={({ isActive }) => `nav-item has-tooltip ${isActive ? "active" : ""}`}
                    data-title="کاربران">
                    <i className="fa-solid fa-users"></i>
                </NavLink>
            </div>
            <div className="sidebar-footer">
                <a href="#" className="nav-item has-tooltip" data-title="تنظیمات">
                    <i className="fa-solid fa-gear"></i>
                </a>
                <a href="#" className="nav-item has-tooltip" data-title="خروج">
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </a>
            </div>
        </aside>
    );
}
