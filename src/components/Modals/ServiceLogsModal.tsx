import { X, RefreshCw } from "lucide-react";
import { useEffect, useRef } from "react";

interface ServiceLogsModalProps {
    serviceName: string;
    logs: string[];
    onClose: () => void;
    onReload: () => void;
    isLoading: boolean;
}

export default function ServiceLogsModal({ serviceName, logs, onClose, onReload, isLoading }: ServiceLogsModalProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: "smooth"
            });
        }
    }, [logs]);

    return (
        <div className="flex h-[75vh] w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0c0c0e] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                    <h2 className="text-lg font-semibold text-slate-200">
                        Logs: <span className="text-white">{serviceName}</span>
                    </h2>
                    <button
                        onClick={onReload}
                        disabled={isLoading}
                        className="flex cursor-pointer items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 text-sm text-slate-300 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                        Recargar
                    </button>
                </div>
                <button
                    onClick={onClose}
                    className="cursor-pointer rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>

            <div
                ref={scrollRef}
                className="flex-1 overflow-auto bg-black p-4 font-mono text-sm leading-relaxed text-green-400"
            >
                {isLoading && logs.length === 0 ? (
                    <div className="flex h-full items-center justify-center text-slate-500">Cargando logs...</div>
                ) : logs.length === 0 ? (
                    <div className="flex h-full items-center justify-center text-slate-500">
                        No hay logs disponibles para este servicio.
                    </div>
                ) : (
                    <div className="flex flex-col">
                        {logs.map((log, index) => (
                            <div key={index} className="break-all whitespace-pre-wrap">
                                {log}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
