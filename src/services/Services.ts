import { servicesApi } from "./Services.axios";

const StartService = async ({ serviceId }: { serviceId: string }) => {
    if (!serviceId) throw new Error("El id del servicio es requerido");

    try {
        const response = await servicesApi.post(`/action/start/${serviceId}`);

        return {
            message: response.data.message || "",
            status: response.data.status || "error"
        };
    } catch (error: any) {
        console.error("Error detallado:", error.response?.data || error.message);
        throw error;
    }
};

const StopService = async ({ serviceId }: { serviceId: string }) => {
    if (!serviceId) throw new Error("El id del servicio es requerido");

    try {
        const response = await servicesApi.post(`/action/stop/${serviceId}`);

        return {
            message: response.data.message || "",
            status: response.data.status || "error"
        };
    } catch (error: any) {
        console.error("Error detallado:", error.response?.data || error.message);
        throw error;
    }
};

const RestartService = async ({ serviceId }: { serviceId: string }) => {
    if (!serviceId) throw new Error("El id del servicio es requerido");

    try {
        const response = await servicesApi.post(`/action/restart/${serviceId}`);

        return {
            message: response.data.message || "",
            status: response.data.status || "error"
        };
    } catch (error: any) {
        console.error("Error detallado:", error.response?.data || error.message);
        throw error;
    }
};

const GetLogs = async ({ serviceId }: { serviceId: string }) => {
    if (!serviceId) throw new Error("El id del servicio es requerido");

    try {
        const response = await servicesApi.get(`/logs/${serviceId}`);

        return {
            service: response.data.service || "",
            status: response.data.status || "error",
            logs: response.data.logs || []
        };
    } catch (error: any) {
        console.error("Error detallado:", error.response?.data || error.message);
        throw error;
    }
};

export { StartService, StopService, RestartService, GetLogs };
