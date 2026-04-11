import { CheckCircle, AlertTriangle, CloudOff, Settings } from "lucide-react";
import { createPortal } from "react-dom";
import Badge, { type BadgeColor } from "./Badge";
import EditNginxConf from "./Modals/EditNginxConf";
import React, { useEffect, useRef, useState } from "react";
import ServiceItemMenu from "./ServiceItemMenu";

export default function ServiceItem({ service }: { service: AsideServicesProps }) {
    const [isNginxModalOpen, setIsNginxModalOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState<"top" | "bottom">("bottom");
    const settingsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
                setIsSettingsOpen(false);
            }
        };
        if (isSettingsOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isSettingsOpen]);

    const textStatusMap: Record<ServiceStatus, string> = {
        "not-available": "No disponible",
        activating: "Activando",
        active: "En linea",
        deactivating: "Desactivando",
        failed: "Error",
        inactive: "Fuera de linea",
        restarting: "Reiniciando"
    };
    const colorStatusMap: Record<ServiceStatus, BadgeColor> = {
        "not-available": "gray",
        activating: "yellow",
        active: "green",
        deactivating: "yellow",
        failed: "yellow",
        inactive: "red",
        restarting: "yellow"
    };
    const iconStatusMap: Record<ServiceStatus, React.ComponentType<{ className: string }>> = {
        "not-available": CloudOff,
        activating: AlertTriangle,
        active: CheckCircle,
        deactivating: AlertTriangle,
        failed: CloudOff,
        inactive: AlertTriangle,
        restarting: AlertTriangle
    };

    const iconColorStatusMap: Record<ServiceStatus, string> = {
        "not-available": "text-gray-500",
        activating: "text-gray-500",
        active: "text-green-500",
        deactivating: "text-gray-500",
        failed: "text-yellow-500",
        inactive: "text-red-500",
        restarting: "text-gray-500"
    };

    const statusText = textStatusMap[service.status] || `Desconocido (${service.status})`;
    const statusColor = colorStatusMap[service.status] || "gray";
    const Icon = iconStatusMap[service.status] || CloudOff;
    const IconColor = iconColorStatusMap[service.status] || "text-slate-500";

    const handleServiceClick = (e: React.MouseEvent) => {
        if ((e.target as Element).closest(".settings-dropdown-wrapper")) return;
        if (service.id !== "nginx.service") return;
        setIsNginxModalOpen(true);
    };

    const handleSettingsClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!isSettingsOpen) {
            const rect = e.currentTarget.getBoundingClientRect();
            if (window.innerHeight - rect.bottom < 220) {
                setDropdownPosition("top");
            } else {
                setDropdownPosition("bottom");
            }
        }
        setIsSettingsOpen(!isSettingsOpen);
    };

    return (
        <>
            <div
                className={`group flex items-center justify-between gap-2 rounded-xl p-2 transition-colors ${
                    service.id === "nginx.service" ? "cursor-pointer hover:bg-white/5" : ""
                }`}
                onClick={handleServiceClick}
            >
                <span className="flex items-center gap-2 text-slate-400">
                    <Icon className={`h-4 w-4 ${IconColor}`} />
                    {service.name}
                </span>
                <div className="settings-dropdown-wrapper relative flex items-center gap-2" ref={settingsRef}>
                    <Badge text={statusText} color={statusColor} />
                    <button
                        onClick={handleSettingsClick}
                        className="cursor-pointer rounded-full border border-white/5 bg-white/5 p-1 transition-colors duration-300 ease-in-out hover:bg-white/10"
                    >
                        <Settings className="h-4 w-4 text-slate-400" />
                    </button>

                    <div
                        className={`absolute right-0 z-50 w-48 transition-all duration-200 ${
                            dropdownPosition === "bottom" ? "top-full mt-2" : "bottom-full mb-2"
                        } ${
                            isSettingsOpen
                                ? "visible translate-y-0 opacity-100"
                                : `invisible opacity-0 ${dropdownPosition === "bottom" ? "-translate-y-2" : "translate-y-2"}`
                        }`}
                    >
                        <ServiceItemMenu service={service} />
                    </div>
                </div>
            </div>

            {service.id === "nginx.service" &&
                createPortal(
                    <div
                        className={`fixed inset-0 z-100 flex items-center justify-center transition-all duration-300 ease-out ${
                            isNginxModalOpen ? "visible opacity-100" : "pointer-events-none invisible opacity-0"
                        }`}
                    >
                        <div
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setIsNginxModalOpen(false)}
                        />

                        <div
                            className={`relative z-10 w-full max-w-2xl px-4 transition-all duration-300 ease-out ${
                                isNginxModalOpen ? "translate-y-0 scale-100" : "translate-y-4 scale-95"
                            }`}
                        >
                            <EditNginxConf />
                        </div>
                    </div>,
                    document.body
                )}
        </>
    );
}
