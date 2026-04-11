import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useWebsocket } from "../../hooks/useWebsocket";
import { WS_BASE_URL, API_KEY } from "../../data";
import Apps from "../Sections/Apps";
import Aside from "../Sections/Aside";
import Background from "../Background";
import Header from "../Header";
import Metrics from "../Sections/Metrics";
import useAuthStore from "../../hooks/useAuthStore";
import useServiceNotifications from "../../hooks/useServiceNotifications";

export default function Dashboard() {
    const { user } = useAuthStore();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { status, metrics, services } = useWebsocket({
        url: `${WS_BASE_URL}/ws/system`,
        token: user?.token || "",
        apiKey: API_KEY
    });

    useServiceNotifications(services);

    return (
        <section className="relative mx-auto flex h-full w-[85%] flex-1 flex-col">
            <Header status={status} />

            <main className="relative flex flex-1 flex-col gap-6 lg:flex-row">
                <div className="flex items-center lg:hidden">
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="flex items-center gap-2 rounded-xl border border-white/5 bg-[#0a0a0c] px-4 py-2.5 text-sm font-medium text-white shadow-lg ring-1 ring-white/5 transition hover:bg-white/5"
                    >
                        <Menu size={18} className="text-cyan-500" />
                        <span>Mostrar Menú Lateral</span>
                    </button>
                </div>

                {isMenuOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden"
                        onClick={() => setIsMenuOpen(false)}
                    />
                )}

                <div
                    className={`fixed inset-y-0 left-0 z-50 flex h-full max-w-[85vw] transform flex-col overflow-y-auto border-r border-white/5 bg-[#0a0a0c] p-6 shadow-2xl transition-transform duration-300 ease-in-out lg:static lg:z-auto lg:h-auto lg:w-auto lg:max-w-none lg:translate-x-0 lg:overflow-visible lg:border-none lg:bg-transparent lg:p-0 lg:shadow-none ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} `}
                >
                    <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4 lg:hidden">
                        <h2 className="text-lg font-bold text-white">Menú</h2>
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="rounded-lg p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"
                        >
                            <X size={20} />
                        </button>
                    </div>
                    <Aside services={services} />
                </div>

                <div className="flex flex-1 flex-col gap-6">
                    <Metrics metrics={metrics} />

                    <Apps />
                </div>
            </main>

            <Background />
        </section>
    );
}
