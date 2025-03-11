import React from "react";

interface LabelProps {
    cx: number; cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index?: number;
}

const RenderCustomizedLabel: React.FC<LabelProps> = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export default RenderCustomizedLabel;