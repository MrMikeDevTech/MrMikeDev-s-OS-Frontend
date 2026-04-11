import { Server } from "../Icons";

export default function EditNginxConf() {
    return (
        <div className="flex flex-col gap-5 overflow-hidden rounded-2xl border border-white/5 bg-[#0a0a0c] p-5 ring-1 ring-white/5">
            <span className="flex items-center gap-2 text-lg text-slate-400">
                <Server className="h-4 w-4 text-white" />
                Editar configuración de Nginx
            </span>
        </div>
    );
}
