type ServiceStatus = "active" | "inactive" | "failed" | "not-available" | "activating" | "deactivating" | "restarting";

interface AsideServicesProps {
    id: string;
    name: string;
    status: ServiceStatus;
}

type WeatherData = {
    status: string;
    message: string;
    data: {
        temp: number;
        humidity: number;
        wind: number;
        rainProb: number;
    } | null;
};

type WeatherApiResponse = {
    status: string;
    message: string;
    data: {
        temp: number;
        humidity: number;
        wind: number;
        rainProb: number;
    } | null;
};

interface UseWebsocketProps {
    url: string;
    token: string;
    apiKey: string;
}

type WsResponse = {
    data: {
        metrics: {
            cpu: { model: string; cores: number; percentage: number; temp_c: number; threads: number; watts: number };
            network: { download_mbps: number; upload_mbps: number };
            ram: { percentage: number; total_mb: number; used_mb: number };
            storage: { mount_point: string; percentage: number; total_gb: number; used_gb: number }[];
        };
        services: { id: string; name: string; status: ServiceStatus }[];
    };
    event: "system_update";
};

type WsStatus = "connected" | "disconnected";

type MetricsData = NonNullable<Props>;
type ChartData = ReturnType<typeof useMetrics>["chartData"];

type User = {
    id: string;
    full_name: string;
    username: string;
    email: string;
    created_at?: string;
    updated_at?: string;
    token?: string;
};
