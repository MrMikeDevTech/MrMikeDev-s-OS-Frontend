import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import { Network, ArrowDown, ArrowUp } from "lucide-react";

export default function NetworkCard({
    netCurrent,
    chartData
}: {
    netCurrent: MetricsData["network"];
    chartData: ChartData;
}) {
    return (
        <div className="flex h-83 flex-col overflow-hidden rounded-2xl border border-white/5 bg-[#0a0a0c] p-5 ring-1 ring-white/5">
            <div className="z-10 mb-2 flex items-start justify-between">
                <div className="flex items-center gap-2 text-sm font-medium text-rose-500">
                    <Network size={16} />
                    <span>Red</span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                    <div className="flex items-center gap-1 text-cyan-500">
                        <ArrowDown size={14} />
                        {netCurrent?.download_mbps.toFixed(1)} MB/s
                    </div>
                    <div className="flex items-center gap-1 text-rose-500">
                        <ArrowUp size={14} />
                        {netCurrent?.upload_mbps.toFixed(1)} MB/s
                    </div>
                </div>
            </div>
            <div className="relative -mx-5 mt-4 -mb-5 flex-1">
                <ResponsiveContainer>
                    <LineChart data={chartData}>
                        <Line
                            type="monotone"
                            dataKey="Download"
                            stroke="#06b6d4"
                            strokeWidth={2}
                            dot={false}
                            isAnimationActive={false}
                        />
                        <Line
                            type="monotone"
                            dataKey="Upload"
                            stroke="#f43f5e"
                            strokeWidth={2}
                            dot={false}
                            isAnimationActive={false}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#0a0a0c",
                                border: "1px solid #f43f5e"
                            }}
                            labelStyle={{ color: "#ffffff" }}
                            itemStyle={{ color: "#ffffff" }}
                            formatter={(value) => `${Number(value).toFixed(1)} MB/s`}
                            labelFormatter={() => ""}
                            cursor={{ stroke: "#f43f5e", strokeWidth: 1 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
