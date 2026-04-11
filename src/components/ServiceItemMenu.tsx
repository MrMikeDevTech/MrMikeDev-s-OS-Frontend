import { Loader2 } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import { StartService, StopService, RestartService, GetLogs } from "../services/Services";
import ServiceLogsModal from "./Modals/ServiceLogsModal";
import { noActionsServices } from "../data";

export default function ServiceItemMenu({ service }: { service: AsideServicesProps }) {
    const [loadingAction, setLoadingAction] = useState<"turnOn" | "turnOff" | "restart" | "logs" | null>(null);
    const [logs, setLogs] = useState<string[]>([]);
    const [isLogsModalOpen, setIsLogsModalOpen] = useState(false);

    const handleTurnOn = async () => {
        if (noActionsServices.includes(service.id)) {
            return toast.warn("No se puede iniciar el servicio desde aquí", { autoClose: 5000 });
        }

        setLoadingAction("turnOn");
        const toastId = toast.info("Iniciando servicio...", { autoClose: 5000 });

        try {
            await StartService({ serviceId: service.id });
            toast.update(toastId, { render: "Servicio iniciado correctamente", type: "success", autoClose: 5000 });
        } catch (error) {
            console.error(error);
            toast.update(toastId, { render: "Error al iniciar el servicio", type: "error", autoClose: 5000 });
        } finally {
            setLoadingAction(null);
        }
    };

    const handleTurnOff = async () => {
        if (noActionsServices.includes(service.id)) {
            return toast.warn("No se puede apagar el servicio desde aquí", { autoClose: 5000 });
        }

        setLoadingAction("turnOff");
        const toastId = toast.info("Apagando servicio...", { autoClose: 5000 });

        try {
            await StopService({ serviceId: service.id });
            toast.update(toastId, { render: "Servicio apagado correctamente", type: "success", autoClose: 5000 });
        } catch (error) {
            console.error(error);
            toast.update(toastId, { render: "Error al apagar el servicio", type: "error", autoClose: 5000 });
        } finally {
            setLoadingAction(null);
        }
    };

    const handleRestart = async () => {
        if (noActionsServices.includes(service.id)) {
            return toast.warn("No se puede reiniciar el servicio desde aquí", { autoClose: 5000 });
        }

        setLoadingAction("restart");
        const toastId = toast.info("Reiniciando servicio...", { autoClose: 5000 });

        try {
            await RestartService({ serviceId: service.id });
            toast.update(toastId, { render: "Servicio reiniciado correctamente", type: "success", autoClose: 5000 });
        } catch (error) {
            console.error(error);
            toast.update(toastId, { render: "Error al reiniciar el servicio", type: "error", autoClose: 5000 });
        } finally {
            setLoadingAction(null);
        }
    };

    const handleLogs = async () => {
        setLoadingAction("logs");
        const toastId = toast.info("Obteniendo logs...", { autoClose: 5000 });
        try {
            const response = await GetLogs({ serviceId: service.id });
            setLogs(response.logs);
            setIsLogsModalOpen(true);
            toast.update(toastId, { render: "Logs obtenidos correctamente", type: "success", autoClose: 5000 });
        } catch (error) {
            console.error(error);
            toast.update(toastId, { render: "Error al obtener los logs", type: "error", autoClose: 5000 });
        } finally {
            setLoadingAction(null);
        }
    };

    if (service.status !== "not-available") {
        return (
            <>
                <div className="flex flex-col gap-2 overflow-hidden rounded-xl border border-white/10 bg-[#0c0c0e] p-2 shadow-xl ring-1 ring-white/5 backdrop-blur-xl">
                    {service.status === "active" && (
                        <button
                            onClick={handleTurnOff}
                            disabled={!!loadingAction}
                            className={`flex w-full items-center justify-center gap-2 rounded-lg bg-red-500/10 px-2 py-1.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-500/20 ${loadingAction ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                        >
                            {loadingAction === "turnOff" && <Loader2 className="h-4 w-4 animate-spin" />}
                            Apagar
                        </button>
                    )}
                    {service.status === "inactive" && (
                        <button
                            onClick={handleTurnOn}
                            disabled={!!loadingAction}
                            className={`flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500/10 px-2 py-1.5 text-sm font-medium text-emerald-500 transition-colors hover:bg-emerald-500/20 ${loadingAction ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                        >
                            {loadingAction === "turnOn" && <Loader2 className="h-4 w-4 animate-spin" />}
                            Encender
                        </button>
                    )}
                    <button
                        onClick={handleRestart}
                        disabled={!!loadingAction}
                        className={`flex w-full items-center justify-center gap-2 rounded-lg px-2 py-1.5 text-sm text-slate-300 transition-colors hover:bg-white/10 ${loadingAction ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                    >
                        {loadingAction === "restart" && <Loader2 className="h-4 w-4 animate-spin" />}
                        Reiniciar
                    </button>
                    <button
                        onClick={handleLogs}
                        disabled={!!loadingAction}
                        className={`flex w-full items-center justify-center gap-2 rounded-lg px-2 py-1.5 text-sm text-slate-300 transition-colors hover:bg-white/10 ${loadingAction ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                    >
                        {loadingAction === "logs" && <Loader2 className="h-4 w-4 animate-spin" />}
                        Logs
                    </button>
                </div>

                {isLogsModalOpen &&
                    createPortal(
                        <div className="fixed inset-0 z-100 flex items-center justify-center transition-all duration-300 ease-out">
                            <div
                                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                                onClick={() => setIsLogsModalOpen(false)}
                            />
                            <div className="relative z-10 w-full max-w-6xl px-4">
                                <ServiceLogsModal
                                    serviceName={service.name}
                                    logs={logs}
                                    onClose={() => setIsLogsModalOpen(false)}
                                    onReload={handleLogs}
                                    isLoading={loadingAction === "logs"}
                                />
                            </div>
                        </div>,
                        document.body
                    )}
            </>
        );
    } else {
        return (
            <div className="flex flex-col gap-2 overflow-hidden rounded-xl border border-white/10 bg-[#0c0c0e] p-2 shadow-xl ring-1 ring-white/5 backdrop-blur-xl">
                <span className="text-center text-sm text-slate-400">No disponible</span>
            </div>
        );
    }
}
