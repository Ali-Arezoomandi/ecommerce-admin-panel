import React, { useState } from "react";
import "./Home.css";
import Feature from "../../Components/Feature/Feature";
import allFeatures from "../../data/features";
import Chart from "../../Components/Chart/Chart";
import xAxisData from "../../data/chart";

export default function Home() {
    const [features, setFeatures] = useState(allFeatures);

    return (
        <>
            <section className="stats-grid">
                {features.map((feature) => (
                    <Feature key={feature.id} {...feature} />
                ))}
            </section>

            <section className="chart-card">
                <Chart grid title="فروش" data={xAxisData} datakey="Sale" />
            </section>
        </>
    );
}
