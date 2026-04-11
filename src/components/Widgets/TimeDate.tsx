import { useEffect, useState } from "react";
import { Calendar, Clock } from "../Icons";

export default function TimeDateWidget() {
    const [time, setTime] = useState<Date>(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 500);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-[#0a0a0c] p-5 ring-1 ring-white/5">
            <span className="flex items-center gap-2 text-lg text-slate-400">
                <Clock className="h-4 w-4 text-white" />
                Hora actual
            </span>
            <h3 className="my-2 text-4xl font-bold">{time.toLocaleTimeString()}</h3>
            <span className="flex items-center gap-2 text-lg text-slate-400 italic">
                <Calendar className="h-4 w-4 text-white" />
                {time.toLocaleDateString("es-MX", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                })}
            </span>
        </div>
    );
}
