import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

export default function useServiceNotifications(services: AsideServicesProps[] | null) {
    const previousServicesRef = useRef(services);

    useEffect(() => {
        if (!services || !previousServicesRef.current) {
            previousServicesRef.current = services;
            return;
        }

        services.forEach((newService) => {
            const oldService = previousServicesRef.current?.find((s) => s.id === newService.id);
            if (oldService && oldService.status !== newService.status) {
                const mapStatus = (status: string) => {
                    switch (status) {
                        case "active":
                            return "se ha encendido";
                        case "inactive":
                            return "se ha apagado";
                        case "failed":
                            return "ha fallado";
                        case "not-available":
                            return "ha dejado de estar disponible";
                        default:
                            return `cambió a estado ${status}`;
                    }
                };

                toast.info(`El servicio ${newService.name} ${mapStatus(newService.status)}`, {
                    theme: "dark",
                    position: "bottom-right",
                    autoClose: 4000
                });
            }
        });

        previousServicesRef.current = services;
    }, [services]);
}
