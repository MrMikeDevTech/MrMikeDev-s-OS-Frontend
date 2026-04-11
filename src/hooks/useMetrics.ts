import { useEffect, useState } from "react";

type Props = WsResponse["data"]["metrics"] | null;

export default function useMetrics(metrics: NonNullable<Props>) {
    const [history, setHistory] = useState<Props[]>([]);
    const [selectedStorageIdx, setSelectedStorageIdx] = useState(0);

    const MAX_HISTORY = 50;

    useEffect(() => {
        setHistory((prev) => {
            const newHistory = [...prev, metrics];
            if (newHistory.length > MAX_HISTORY) {
                return newHistory.slice(newHistory.length - MAX_HISTORY);
            }
            return newHistory;
        });
    }, [metrics]);

    const chartData = history.map((item, idx) => ({
        id: idx,
        CPU: item?.cpu.percentage || 0,
        RAM: item?.ram.percentage || 0,
        Download: item?.network.download_mbps || 0,
        Upload: item?.network.upload_mbps || 0,
        Storage: (item?.storage || [])[selectedStorageIdx]?.percentage || 0
    }));

    return {
        chartData,
        cpuCurrent: metrics.cpu,
        ramCurrent: metrics.ram,
        netCurrent: metrics.network,
        storageOptions: metrics.storage || [],
        currentStorage: (metrics.storage || [])[selectedStorageIdx] || (metrics.storage || [])[0],
        selectedStorageIdx,
        setSelectedStorageIdx
    };
}
