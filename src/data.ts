export const BASE_URL = import.meta.env.VITE_API_URL;
export const API_BASE_URL = `http://${BASE_URL}`;
export const WS_BASE_URL = `ws://${BASE_URL}`;

export const API_KEY = import.meta.env.VITE_API_KEY;
export const noActionsServices = [
    "mrmikedevs-os-backend.service",
    "ssh.service",
    "docker.service",
    "docker.socket",
    "tailscaled.service"
];
