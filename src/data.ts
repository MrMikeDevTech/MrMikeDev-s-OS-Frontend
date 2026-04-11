export const HOST = import.meta.env.VITE_HOST;
export const API_BASE_URL = `http://${HOST}:15800`;
export const WS_BASE_URL = `ws://${HOST}:15800`;
export const API_KEY = import.meta.env.VITE_API_KEY;
export const noActionsServices = [
    "mrmikedevs-os-backend.service",
    "ssh.service",
    "docker.service",
    "docker.socket",
    "tailscaled.service"
];
