import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import { Cpu } from "lucide-react";

export default function CPUCard({ cpuCurrent, chartData }: { cpuCurrent: MetricsData["cpu"]; chartData: ChartData }) {
    return (
        <div className="flex h-83 flex-col overflow-hidden rounded-2xl border border-white/5 bg-[#0a0a0c] p-5 ring-1 ring-white/5">
            <div>
                <div className="z-10 flex items-start justify-between">
                    <div className="flex items-center gap-2 text-sm font-medium text-cyan-500">
                        <Cpu size={16} />
                        <span>CPU</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{cpuCurrent?.percentage.toFixed(1)}%</div>
                </div>

                <div className="flex flex-col items-start gap-2">
                    <span className="text-xs font-bold text-gray-300">{cpuCurrent?.model}</span>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{cpuCurrent?.cores} núcleos</span>
                        <span className="text-xs text-gray-500">{cpuCurrent?.threads} hilos</span>
                        <span className="text-xs text-gray-500">{cpuCurrent?.temp_c} °C</span>
                        <span className="text-xs text-gray-500">{cpuCurrent?.watts} W</span>
                    </div>
                </div>
            </div>
            <div className="relative -mx-5 mt-4 -mb-5 flex-1">
                <ResponsiveContainer>
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.5} />
                                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <YAxis domain={[0, 100]} hide />
                        <Area
                            type="monotone"
                            dataKey="CPU"
                            stroke="#06b6d4"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorCpu)"
                            isAnimationActive={false}
                            dot={false}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: "#0a0a0c", border: "1px solid #06b6d4" }}
                            labelStyle={{ color: "#ffffff" }}
                            itemStyle={{ color: "#ffffff" }}
                            formatter={(value) => `${Number(value).toFixed(1)}%`}
                            labelFormatter={() => ""}
                            cursor={{ stroke: "#06b6d4", strokeWidth: 1 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
