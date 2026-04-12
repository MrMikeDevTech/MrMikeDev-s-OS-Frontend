import ConectionBadge from "./ConectionBadge";
import IconBadge from "./IconBadge";
import { MrMikeDev, LogOut } from "./Icons";
import useAuthStore from "../hooks/useAuthStore";
import { useNavigate } from "react-router";
import { Logout } from "../services/Auth";
import { toast } from "react-toastify";

export default function Header({ status }: { status: WsStatus }) {
    const { logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await Logout();
            toast.success("Sesión cerrada");
        } catch (err) {
            toast.error("Error al cerrar sesión");
        } finally {
            logout();
            navigate("/login");
        }
    };

    return (
        <header className="flex h-30 w-full flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-4">
                <IconBadge icon={<MrMikeDev className="h-10 w-10 text-white" />} color="purple" size="16" />
                <div>
                    <h1 className="text-2xl font-bold">MrMikeDev's OS</h1>
                    <p className="text-sm text-slate-400">Panel de control</p>
                </div>
            </div>
            <div className="flex items-center gap-5">
                <ConectionBadge status={status} />
                <button
                    className="cursor-pointer rounded-xl border border-slate-800 bg-black/30 p-3 transition-all duration-300 ease-in-out hover:border-slate-700 hover:brightness-150 focus:outline-none active:scale-95"
                    onClick={handleLogout}
                >
                    <LogOut className="h-4 w-4 text-white" />
                </button>
            </div>
        </header>
    );
}
