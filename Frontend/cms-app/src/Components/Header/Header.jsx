import React, { useContext } from "react";
import "./Header.css";
import ThemeContext from "../../Context/ThemeContext";

export default function Header() {

    let contextData = useContext(ThemeContext)

    return (
        <header className="main-header">
            <div className="user-profile">
                <div className="user-avatar">
                    <i className="fa-solid fa-user"></i>
                </div>
                <div className="user-title">
                    مدیر سایت <i className="fa-solid fa-chevron-down"></i>
                </div>
            </div>

            <div className="header-left">
                <div className="search-box">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="text" placeholder="جستجو کنید..." />
                </div>
                <button className="theme-toggle-btn" id="themeToggle" title="تغییر تم" onClick={contextData.toggleTheme}>
                    <i className={contextData.theme === "light" ? "fa-solid fa-moon" : "fa-solid fa-sun"}></i>
                </button>
            </div>
        </header>
    );
}
