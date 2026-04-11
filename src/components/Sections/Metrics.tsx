import CPUCard from "../Cards/CPUCard";
import RAMCard from "../Cards/RAMCard";
import StorageCard from "../Cards/StorageCard";
import NetworkCard from "../Cards/NetworkCard";
import useMetrics from "../../hooks/useMetrics";

export default function Metrics({ metrics }: { metrics: MetricsData }) {
    if (!metrics) return <SkeletonMetrics />;

    const {
        chartData,
        cpuCurrent,
        ramCurrent,
        netCurrent,
        storageOptions,
        currentStorage,
        selectedStorageIdx,
        setSelectedStorageIdx
    } = useMetrics(metrics);

    return (
        <header className="grid min-h-[440px] w-full grid-cols-2 gap-4">
            <CPUCard cpuCurrent={cpuCurrent} chartData={chartData} />
            <RAMCard ramCurrent={ramCurrent} chartData={chartData} />
            <StorageCard
                storageOptions={storageOptions}
                currentStorage={currentStorage}
                selectedStorageIdx={selectedStorageIdx}
                setSelectedStorageIdx={setSelectedStorageIdx}
                chartData={chartData}
            />
            <NetworkCard netCurrent={netCurrent} chartData={chartData} />
        </header>
    );
}

function SkeletonMetrics() {
    return (
        <header className="grid min-h-[440px] w-full grid-cols-2 gap-4">
            <div className="flex h-83 animate-pulse flex-col overflow-hidden rounded-2xl border border-white/5 bg-[#0a0a0c] p-5 ring-1 ring-white/5">
                <div>
                    <div className="z-10 flex items-start justify-between">
                        <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded bg-cyan-500/20" />
                            <div className="h-5 w-10 rounded bg-white/5" />
                        </div>
                        <div className="h-8 w-20 rounded bg-white/5" />
                    </div>
                    <div className="mt-2 flex flex-col items-start gap-2">
                        <div className="h-4 w-48 rounded bg-white/5" />
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-16 rounded bg-white/5" />
                            <div className="h-3 w-16 rounded bg-white/5" />
                            <div className="h-3 w-12 rounded bg-white/5" />
                            <div className="h-3 w-12 rounded bg-white/5" />
                        </div>
                    </div>
                </div>
                <div className="-mx-5 mt-4 -mb-5 flex-1 bg-linear-to-t from-transparent to-cyan-500/10" />
            </div>

            <div className="relative flex h-83 animate-pulse flex-col overflow-hidden rounded-2xl border border-white/5 bg-[#0a0a0c] p-5 ring-1 ring-white/5">
                <div className="z-10 mb-2 flex items-start justify-between">
                    <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded bg-emerald-500/20" />
                        <div className="h-5 w-28 rounded bg-white/5" />
                    </div>
                    <div className="h-8 w-20 rounded bg-white/5" />
                </div>
                <div className="-mx-5 mt-4 -mb-5 flex-1 bg-linear-to-t from-transparent to-emerald-500/10" />
                <div className="absolute bottom-5 left-5 z-10 h-3 w-32 rounded bg-white/10" />
            </div>

            <div className="relative flex h-83 animate-pulse flex-col overflow-hidden rounded-2xl border border-white/5 bg-[#0a0a0c] p-5 ring-1 ring-white/5">
                <div className="z-10 mb-2 flex items-start justify-between">
                    <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded bg-amber-500/20" />
                        <div className="h-5 w-32 rounded bg-white/5" />
                    </div>
                    <div className="h-8 w-20 rounded bg-white/5" />
                </div>
                <div className="-mx-5 mt-4 -mb-5 flex-1 bg-linear-to-t from-transparent to-amber-500/10" />
                <div className="absolute bottom-5 left-5 z-10 h-3 w-32 rounded bg-white/10" />
            </div>

            <div className="flex h-83 animate-pulse flex-col overflow-hidden rounded-2xl border border-white/5 bg-[#0a0a0c] p-5 ring-1 ring-white/5">
                <div className="z-10 mb-2 flex items-start justify-between">
                    <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded bg-rose-500/20" />
                        <div className="h-5 w-12 rounded bg-white/5" />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-5 w-20 rounded bg-cyan-500/20" />
                        <div className="h-5 w-20 rounded bg-rose-500/20" />
                    </div>
                </div>
                <div className="-mx-5 mt-4 -mb-5 flex-1 bg-linear-to-t from-transparent to-rose-500/10" />
            </div>
        </header>
    );
}
