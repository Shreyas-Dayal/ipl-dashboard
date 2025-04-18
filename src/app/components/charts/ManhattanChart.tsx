"use client";

import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell,
  Label,
  TooltipProps
} from 'recharts';
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';


const WicketLabel = (props: WicketLabelProps) => {
  const { x = 0, y = 0, width = 0, payload } = props;

  if (payload?.wickets && payload.wickets > 0) {
    const wickets = payload.wickets;
    const cx = x + width / 2;
    const cy = y - 8; 

    return (
      <g>
        <circle
          cx={cx}
          cy={cy}
          r={5}
          fill="hsl(0, 80%, 50%)" 
          stroke="#fff"
          strokeWidth={1}
        />
        {wickets > 1 && (
          <text x={cx} y={cy} dy={3} fill="#fff" fontSize="8px" textAnchor="middle">
            {wickets}
          </text>
        )}
      </g>
    );
  }
  return null;
};

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as ManhattanChartDataPoint;

    return (
      <div className="bg-white/90 p-2 border border-gray-300 rounded shadow-md text-xs">
        <p className="font-bold mb-1">Over: {label}</p>
        <p>Runs: <span className="font-semibold">{data.runs ?? '-'}</span></p>
        {data.wickets > 0 && (
          <p className="text-red-600">Wickets: <span className="font-semibold">{data.wickets}</span></p>
        )}
        {data.bowler && <p>Bowler: <span className="font-semibold">{data.bowler}</span></p>}
      </div>
    );
  }
  return null;
};


const ManhattanChart: React.FC<ManhattanChartProps> = ({ manhattanData, teamColor = 'hsl(221, 83%, 53%)' }) => {

  const processedData: ManhattanChartDataPoint[] = useMemo(() => {
    if (!manhattanData) return [];
    return manhattanData
        .sort((a, b) => a.OverNo - b.OverNo)
        .map(entry => ({
            over: entry.OverNo + 1,
            runs: entry.OverRuns ?? 0, 
            wickets: entry.Wickets ?? 0,
            bowler: entry.Bowler || undefined,
        }));
  }, [manhattanData]);


  if (!processedData || processedData.length === 0) {
    return <p className="text-sm text-center text-gray-500 my-4">Manhattan chart data not available.</p>;
  }

  const maxYValue = Math.max(...processedData.map(d => d.runs), 0);
  const yAxisMax = Math.ceil((maxYValue + 3) / 5) * 5;


  return (
    <div style={{ width: '100%', height: 300 }} className="my-4" role="figure" aria-label="Manhattan chart showing runs per over">
      <ResponsiveContainer>
        <BarChart
          data={processedData}
          margin={{
            top: 20,
            right: 20, 
            left: 10,
            bottom: 20,
          }}
          barCategoryGap="20%"
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(215, 20%, 90%)" />
          <XAxis
             dataKey="over"
             tick={{ fontSize: 10, fill: 'hsl(215, 15%, 45%)' }}
             axisLine={{ stroke: 'hsl(215, 20%, 90%)' }}
             tickLine={{ stroke: 'hsl(215, 20%, 90%)' }}
             interval={processedData.length > 20 ? Math.floor(processedData.length / 10) -1 : 0}
             height={30} 
           >
             {/* --- Add X-Axis Label --- */}
             <Label value="Over Number" offset={0} position="insideBottom" fill="hsl(215, 15%, 45%)" fontSize={11} />
           </XAxis>
          <YAxis
             tick={{ fontSize: 10, fill: 'hsl(215, 15%, 45%)' }}
             axisLine={{ stroke: 'hsl(215, 20%, 90%)' }}
             tickLine={{ stroke: 'hsl(215, 20%, 90%)' }}
             domain={[0, yAxisMax]}
             allowDataOverflow={false}
             width={40} 
           >
              {/* --- Add Y-Axis Label --- */}
              <Label value="Runs Scored" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} fill="hsl(215, 15%, 45%)" fontSize={11}/>
            </YAxis>
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(200, 200, 200, 0.2)' }} />
          <Bar dataKey="runs" radius={[2, 2, 0, 0]} >
             {processedData.map((entry, index) => (
                 <Cell key={`cell-${index}`} fill={teamColor} />
             ))}
             <LabelList dataKey="wickets" content={<WicketLabel />} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ManhattanChart;