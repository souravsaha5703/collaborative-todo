import React from 'react';
import { cn } from "@/lib/utils";
import { NumberTicker } from "@/components/magicui/number-ticker";

interface CircularScoreRingProps {
    score: number
    maxScore?: number
    size?: number
    strokeWidth?: number
    className?: string
    ringColor?: string
    backgroundColor?: string
    animate?: boolean
}

const CircularScoreRing: React.FC<CircularScoreRingProps> = ({ score,
    maxScore = 100,
    size = 200,
    strokeWidth = 4,
    className,
    ringColor = "hsl(var(--primary))",
    backgroundColor = "hsl(var(--muted))",
    animate = true }) => {
    const normalizedScore = Math.min(Math.max(score, 0), maxScore);
    const percentage = (normalizedScore / maxScore) * 100;

    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const center = size / 2;

    return (
        <div className={cn("relative inline-flex items-center justify-center", className)}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="transparent"
                    stroke={backgroundColor}
                    strokeWidth={strokeWidth}
                />
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="transparent"
                    stroke={ringColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${center} ${center})`}
                    style={{
                        transition: animate ? "stroke-dashoffset 1s ease-in-out" : "none",
                    }}
                />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
                <NumberTicker value={Math.min(score, maxScore)} className="text-4xl font-semibold font-noto text-gray-900 dark:text-gray-100" />
                <span className="text-base font-noto text-muted-foreground">out of {maxScore}</span>
            </div>
        </div>
    )
}

export default CircularScoreRing;