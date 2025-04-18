// src/app/components/WagonWheelChart.tsx
"use client";

import React from 'react';
// Assuming types are defined in this path or imported globally

interface WagonWheelChartProps {
  wagonWheelData: WagonWheelEntry[] | undefined;
  // Optional: Add props for filtering by batter ID, etc. later
}

// --- Constants for Full Circle Drawing ---
const SVG_SIZE = 200; // Use a square viewBox for easier centering
// const CENTER_X = SVG_SIZE / 2; // Center X = 125
// const CENTER_Y = SVG_SIZE / 2; // Center Y = 125
// const FIELD_RADIUS = SVG_SIZE / 2 - 25; // Radius (100), leaving space for labels
// const LABEL_RADIUS = FIELD_RADIUS + 12; // Distance for labels outside the circle
// const STUMP_HEIGHT = 8; // Height of the stump representation

// --- Adjusted Constants for Drawing ---
const SVG_WIDTH = 200; // Increased width for side labels
const SVG_HEIGHT = 150; // Increased height for top labels/arc
const CENTER_X = SVG_WIDTH / 2; // 125
const CENTER_Y = SVG_HEIGHT - 90; // Position stumps lower down (130)
const FIELD_RADIUS = SVG_HEIGHT - 90; // Make radius smaller relative to height (110)
const LABEL_RADIUS = FIELD_RADIUS + 4; // Distance for labels (118)
const STUMP_HEIGHT = 10; // Height of the stump representation

// Function to convert cricket angle to SVG coords (center is now SVG center)
const getCoordinates = (angleDegrees: number, radius: number): { x: number; y: number } => {
    const svgAngleDegrees = angleDegrees - 90; // Map 0 degrees (straight) to -90 SVG (up)
    const radians = svgAngleDegrees * (Math.PI / 180);
    const x = CENTER_X + radius * Math.cos(radians);
    const y = CENTER_Y + radius * Math.sin(radians); // Y increases downwards
    return { x, y };
};

// Function to determine shot color (Matching the example image)
const getShotColor = (runs: number, isFour: number, isSix: number): string => {
    // Colors matching the provided legend
    if (isSix === 1) return 'hsl(0, 90%, 55%)';     // Red
    if (isFour === 1) return 'hsl(275, 70%, 55%)';   // Purple
    switch (runs) {
        case 0: return 'hsl(0, 0%, 50%)';       // Grey
        case 1: return 'hsl(210, 80%, 60%)';   // Blue
        case 2: return 'hsl(120, 60%, 50%)';   // Green
        case 3: return 'hsl(180, 60%, 50%)';   // Cyan/Teal
        default: return 'hsl(0, 0%, 40%)';     // Darker grey default
    }
};

const WagonWheelChart: React.FC<WagonWheelChartProps> = ({ wagonWheelData }) => {
    if (!wagonWheelData || wagonWheelData.length === 0) {
        return <p className="text-sm text-center text-gray-500 my-4">Wagon Wheel data not available.</p>;
    }

    // Define field zones (angles remain the same, offsets might need slight tweaks)
    const zones = [
        { name: 'Third Man', angle: 45, xOffset: 0, yOffset: -2 },
        { name: 'Point', angle: 80, xOffset: 2 },
        { name: 'Cover', angle: 110, xOffset: 5 },
        { name: 'Mid Off', angle: 145, xOffset: 5, yOffset: 3 },
        { name: 'Straight', angle: 180, yOffset: 5 }, // Added Straight
        { name: 'Mid On', angle: 215, xOffset: -5, yOffset: 3 },
        { name: 'Mid Wicket', angle: 250, xOffset: -5 },
        { name: 'Square Leg', angle: 280, xOffset: -2 },
        { name: 'Fine Leg', angle: 315, xOffset: 0, yOffset: -2 },
    ];

    return (
        <div className="flex flex-col items-center my-4" role="figure" aria-label="Wagon wheel chart showing shot placements">
            <svg
                width="100%"
                height="auto"
                viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`} // Use square viewBox
                preserveAspectRatio="xMidYMid meet" // Center the whole SVG
                className="max-w-xs sm:max-w-sm" // Control max size
            >
                {/* Field Outline - Use <circle> element */}
                <circle
                    cx={CENTER_X}
                    cy={CENTER_Y}
                    r={FIELD_RADIUS}
                    stroke="hsl(215, 20%, 88%)"
                    strokeWidth="1"
                    fill="hsl(210, 30%, 97%)" // Slightly adjusted field color
                />
                 {/* Pitch line (optional, subtle) */}
                 <rect x={CENTER_X - 15} y={CENTER_Y - 1.5} width="30" height="3" fill="hsl(30, 20%, 85%)" rx="1.5"/>

                {/* Zone Lines and Labels */}
                {zones.map(zone => {
                    const lineEndCoords = getCoordinates(zone.angle, FIELD_RADIUS); // Line ends at circle edge
                    const textCoords = getCoordinates(zone.angle, LABEL_RADIUS); // Text outside circle
                    let textAnchor = "middle";
                    // Adjust anchor based on position around the circle
                    if (zone.angle > 10 && zone.angle < 170) textAnchor = "start"; // Right side
                    if (zone.angle > 190 && zone.angle < 350) textAnchor = "end"; // Left side
                    // Fine-tune top/bottom anchors
                    if (zone.angle > 340 || zone.angle < 20) textAnchor = "middle"; // Near top
                    if (zone.angle > 160 && zone.angle < 200) textAnchor = "middle"; // Near bottom (Straight)


                    return (
                        <g key={zone.name}>
                            {/* Zone dividing line */}
                            <line
                                x1={CENTER_X}
                                y1={CENTER_Y}
                                x2={lineEndCoords.x}
                                y2={lineEndCoords.y}
                                stroke="hsl(215, 20%, 92%)" // Even lighter dash lines
                                strokeWidth="0.5"
                                strokeDasharray="3,3"
                            />
                            {/* Zone Label Text */}
                            <text
                                x={textCoords.x + (zone.xOffset || 0)}
                                y={textCoords.y + (zone.yOffset || 0)}
                                fontSize="7"
                                fill="hsl(215, 20%, 50%)"
                                textAnchor={textAnchor}
                                dominantBaseline="middle"
                            >
                                {zone.name}
                            </text>
                        </g>
                    );
                })}

                 {/* Stumps at the center */}
                 <g transform={`translate(${CENTER_X - 3}, ${CENTER_Y - STUMP_HEIGHT / 2})`}>
                    <rect x="0" y="0" width="1.5" height={STUMP_HEIGHT} fill="hsl(30, 40%, 70%)" />
                    <rect x="2.25" y="0" width="1.5" height={STUMP_HEIGHT} fill="hsl(30, 40%, 70%)" />
                    <rect x="4.5" y="0" width="1.5" height={STUMP_HEIGHT} fill="hsl(30, 40%, 70%)" />
                    {/* Simple bails */}
                    <rect x="0.5" y="-0.5" width="2" height="1" fill="hsl(30, 40%, 60%)" />
                    <rect x="3.5" y="-0.5" width="2" height="1" fill="hsl(30, 40%, 60%)" />
                 </g>

                {/* Shots Lines */}
                {wagonWheelData.map((shot) => {
                    const lengthRatio = (shot.FielderLengthRatio > 0.1 && shot.FielderLengthRatio < 1.5) ? shot.FielderLengthRatio : 0.7;
                    // For boundaries, ensure the line reaches or slightly passes the edge
                    const shotRadius = (shot.IsFour === 1 || shot.IsSix === 1)
                                        ? FIELD_RADIUS * 1.02
                                        : FIELD_RADIUS * Math.min(lengthRatio, 0.98); // Non-boundaries shorter
                    const { x, y } = getCoordinates(shot.FielderAngle, shotRadius);
                    const color = getShotColor(shot.Runs, shot.IsFour, shot.IsSix);

                    return (
                        <line
                            key={shot.BallID}
                            x1={CENTER_X} // Emanate from center
                            y1={CENTER_Y} // Emanate from center
                            x2={x}
                            y2={y}
                            stroke={color}
                            strokeWidth="1.2"
                            opacity={0.85}
                        />
                    );
                })}
            </svg>
            {/* Legend (remains the same) */}
            <div className="flex flex-wrap justify-center gap-x-3 text-xs lg:md:mt-[-120px] md:mt-[-120px]">
                <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full mr-1" style={{ backgroundColor: getShotColor(0, 0, 0) }}></span> Dot</span>
                <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full mr-1" style={{ backgroundColor: getShotColor(1, 0, 0) }}></span> 1</span>
                <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full mr-1" style={{ backgroundColor: getShotColor(2, 0, 0) }}></span> 2</span>
                <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full mr-1" style={{ backgroundColor: getShotColor(3, 0, 0) }}></span> 3</span>
                <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full mr-1" style={{ backgroundColor: getShotColor(4, 1, 0) }}></span> 4</span>
                <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full mr-1" style={{ backgroundColor: getShotColor(6, 0, 1) }}></span> 6</span>
            </div>
        </div>
    );
};

export default WagonWheelChart;