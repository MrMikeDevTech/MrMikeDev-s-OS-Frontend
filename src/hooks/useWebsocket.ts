import { useEffect, useState, useRef } from "react";

export const useWebsocket = ({ url, token, apiKey }: UseWebsocketProps) => {
    const [status, setStatus] = useState<WsStatus>("disconnected");
    const [lastMessage, setLastMessage] = useState<WsResponse["data"] | null>(null);
    const [metrics, setMetrics] = useState<WsResponse["data"]["metrics"] | null>(null);
    const [services, setServices] = useState<WsResponse["data"]["services"] | null>(null);
    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        if (wsRef.current?.readyState === WebSocket.OPEN) return;

        const createConnection = () => {
            const wsUrl = new URL(url);
            wsUrl.searchParams.append("token", token.trim());
            wsUrl.searchParams.append("x-api-key", apiKey.trim());

            const ws = new WebSocket(wsUrl.toString());
            wsRef.current = ws;

            ws.onopen = () => {
                console.log("🟩 WebSocket Abierto");
                setStatus("connected");
            };

            ws.onmessage = (event) => {
                try {
                    const json = JSON.parse(event.data) as WsResponse;
                    if (json.event === "system_update") {
                        const { metrics, services } = json.data;
                        const sortedServices = [...services].sort((a, b) => a.id.localeCompare(b.id));
                        setLastMessage({ metrics, services: sortedServices });
                    }
                } catch (error) {
                    console.error("📦 Error parseando datos:", error);
                }
            };

            ws.onclose = (e) => {
                console.log("🟥 WebSocket Cerrado:", e.code, e.reason);
                setStatus("disconnected");

                if (e.code === 1006) {
                    setTimeout(() => {
                        console.log("🔄 Intentando reconectar...");
                        createConnection();
                    }, 3000);
                }
            };

            ws.onerror = (err) => {
                console.error("⚠️ Error en WS:", err);
                ws.close();
            };
        };

        createConnection();

        return () => {
            if (wsRef.current) {
                const socket = wsRef.current;
                if (socket.readyState === WebSocket.OPEN) {
                    socket.close(1000, "Component Unmounted");
                }
                wsRef.current = null;
            }
        };
    }, [url, token, apiKey]);

    useEffect(() => {
        if (lastMessage) {
            setMetrics(lastMessage.metrics);
            setServices(lastMessage.services);
        }
    }, [lastMessage]);

    return { status, lastMessage, metrics, services };
};
