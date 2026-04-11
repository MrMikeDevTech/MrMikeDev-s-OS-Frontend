import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import { ChevronDown, HardDrive } from "lucide-react";
import { formatStorageBytes } from "../../utils/formats";

export default function StorageCard({
    storageOptions,
    currentStorage,
    selectedStorageIdx,
    setSelectedStorageIdx,
    chartData
}: {
    storageOptions: NonNullable<MetricsData["storage"]>;
    currentStorage: NonNullable<MetricsData["storage"]>[number];
    selectedStorageIdx: number;
    setSelectedStorageIdx: (idx: number) => void;
    chartData: ChartData;
}) {
    return (
        <div className="flex h-83 flex-col overflow-hidden rounded-2xl border border-white/5 bg-[#0a0a0c] p-5 ring-1 ring-white/5">
            <div className="z-10 mb-2 flex items-start justify-between">
                <div className="flex items-center gap-2 text-sm font-medium text-amber-500">
                    <div className="flex items-center gap-2">
                        <HardDrive size={16} />
                        <span>Almacenamiento</span>
                    </div>
                    {storageOptions.length > 1 && (
                        <div className="relative flex items-center rounded-lg border border-amber-500/20 bg-amber-500/10 transition-colors hover:bg-amber-500/20">
                            <select
                                className="z-10 cursor-pointer appearance-none bg-transparent py-0.5 pr-6 pl-2 text-xs font-semibold tracking-wide text-amber-400 outline-none"
                                value={selectedStorageIdx}
                                onChange={(e) => setSelectedStorageIdx(Number(e.target.value))}
                            >
                                {storageOptions.map((opt: any, i: number) => (
                                    <option key={i} value={i} className="bg-[#0a0a0c] text-sm text-amber-500">
                                        {opt.mount_point}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown
                                size={14}
                                className="pointer-events-none absolute right-1.5 text-amber-500/70"
                            />
                        </div>
                    )}
                </div>
                <div className="text-2xl font-bold text-white">{currentStorage?.percentage.toFixed(1)}%</div>
            </div>
            <div className="relative -mx-5 mt-4 -mb-5 flex-1">
                <ResponsiveContainer>
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="colorStorage" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.5} />
                                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <YAxis domain={[0, 100]} hide />
                        <Area
                            type="monotone"
                            dataKey="Storage"
                            stroke="#f59e0b"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorStorage)"
                            isAnimationActive={false}
                            dot={false}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: "#0a0a0c", border: "1px solid #f59e0b" }}
                            labelStyle={{ color: "#ffffff" }}
                            itemStyle={{ color: "#ffffff" }}
                            formatter={(value) => `${Number(value).toFixed(1)}%`}
                            labelFormatter={() => ""}
                            cursor={{ stroke: "#f59e0b", strokeWidth: 1 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
                <div className="absolute bottom-5 left-5 z-10 text-xs text-gray-500">
                    {formatStorageBytes(currentStorage?.used_gb || 0)} /{" "}
                    {formatStorageBytes(currentStorage?.total_gb || 0)} usados
                </div>
            </div>
        </div>
    );
}
