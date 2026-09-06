import React from "react";
import "./TableBoxDetail.css"

export default function tableBoxDetail({ title, icon, value }) {
    return (
        <div className="mini-stat-card">
            <div className="mini-stat-icon">{icon}</div>
            <div className="mini-stat-info">
                <span className="mini-stat-title">{title}</span>
                <span className="mini-stat-value">{value}</span>
            </div>
        </div>
    );
}
