import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import { MemoryStick } from "lucide-react";
import { formatBytes } from "../../utils/formats";

export default function RAMCard({ ramCurrent, chartData }: { ramCurrent: MetricsData["ram"]; chartData: ChartData }) {
    return (
        <div className="flex h-83 flex-col overflow-hidden rounded-2xl border border-white/5 bg-[#0a0a0c] p-5 ring-1 ring-white/5">
            <div className="z-10 mb-2 flex items-start justify-between">
                <div className="flex items-center gap-2 text-sm font-medium text-emerald-500">
                    <MemoryStick size={16} />
                    <span>Memoria RAM</span>
                </div>
                <div className="text-2xl font-bold text-white">{ramCurrent?.percentage.toFixed(1)}%</div>
            </div>
            <div className="relative -mx-5 mt-4 -mb-5 flex-1">
                <ResponsiveContainer>
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="colorRam" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.5} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <YAxis domain={[0, 100]} hide />
                        <Area
                            type="monotone"
                            dataKey="RAM"
                            stroke="#10b981"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorRam)"
                            isAnimationActive={false}
                            dot={false}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: "#0a0a0c", border: "1px solid #10b981" }}
                            labelStyle={{ color: "#ffffff" }}
                            itemStyle={{ color: "#ffffff" }}
                            formatter={(value) => `${Number(value).toFixed(1)}%`}
                            labelFormatter={() => ""}
                            cursor={{ stroke: "#10b981", strokeWidth: 1 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
                <div className="absolute bottom-5 left-5 z-10 text-xs text-gray-500">
                    {formatBytes(ramCurrent?.used_mb || 0)} / {formatBytes(ramCurrent?.total_mb || 0)} usados
                </div>
            </div>
        </div>
    );
}
