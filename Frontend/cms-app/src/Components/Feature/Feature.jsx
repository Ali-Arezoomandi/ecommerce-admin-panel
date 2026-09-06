import React from "react";
import "./Feature.css";

export default function Feature({ id, title, icon, value, subTitle, desc, descIcon }) {
    return (
        <div className="stat-card">
            <div className="stat-header">
                <span className="stat-title">{title}</span>
                <div className="stat-icon">
                    {icon}
                </div>
            </div>
            <div>
                <div className="stat-value">{value}</div>
                <div className="stat-unit">{subTitle}</div>
            </div>
            <div className="stat-change">
                {descIcon} {desc}
            </div>
        </div>
    );
}
