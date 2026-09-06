import React from "react";
import "./Chart.css";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export default function Chart({ grid, title, data, datakey }) {
    return (
        <section className="chart-card">
            <div className="chart-header">
                <button className="time-select">
                    <i className="fa-regular fa-calendar"></i> 7 روز اخیر
                    <i className="fa-solid fa-chevron-down"></i>
                </button>
                <div className="chart-title">
                    نمودار {title} <i className="fa-solid fa-chart-line"></i>
                </div>
            </div>
            <div className="chart-container">
                <ResponsiveContainer style={{ width: "1200px" }} width="100%" aspect={5}>
                    <LineChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                        <XAxis 
                            dataKey="name"
                            stroke="#2563eb"
                            reversed={true}
                            tick={{ dy: 10 }} />
                            
                        <YAxis 
                            dataKey="Sale"
                            stroke="#2563eb" 
                            tick={{ fontSize: 14, dx: 70 }} 
                            orientation="right" />

                        <Line type="monotone" dataKey={datakey} stroke="#2563eb" />
                        <Tooltip />
                        {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="3" />}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
}
