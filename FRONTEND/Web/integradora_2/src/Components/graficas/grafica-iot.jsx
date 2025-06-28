// components/SampleChart.jsx
import React from "react";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Registrar los módulos
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const SampleChart = () => {
    const data = {
        labels: ["Enero", "Febrero", "Marzo", "Abril"],
        datasets: [
        {
            label: "Ventas",
            data: [150, 200, 170, 220],
            backgroundColor: "rgb(255, 193, 92)",
        },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
        legend: {
            position: "top",
        },
        },
    };

    return <Bar data={data} options={options} />;
};

export default SampleChart;
