import { Cloud, Humidity, Pin, Wind } from "../Icons";
import { GetWeather } from "../../services/Weather";
import { useState, useEffect } from "react";

export default function WeatherWidget() {
    const [weather, setWeather] = useState<WeatherApiResponse | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            const weather = await GetWeather();
            setWeather(weather);
        };
        fetchWeather();
    }, []);

    return (
        <div className="flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-[#0a0a0c] p-5 ring-1 ring-white/5">
            <div className="flex flex-row items-center justify-between">
                <span className="text-md flex items-center gap-1 text-slate-400 italic">
                    <Pin className="h-4 w-4 text-white" />
                    Puerto Vallarta, Jalisco
                </span>
                <Cloud className="h-8 w-8 text-white" />
            </div>

            <h3 className="my-2 text-4xl font-bold">{weather?.data?.temp?.toFixed(0) ?? "--"}°C</h3>
            <div className="mt-4 flex flex-row gap-4">
                <span className="flex items-center gap-1 text-slate-400 italic">
                    <Humidity className="h-4 w-4 text-white" /> {weather?.data?.humidity?.toFixed(0) ?? "--"}%
                </span>
                <span className="flex items-center gap-1 text-slate-400 italic">
                    <Wind className="h-4 w-4 text-white" /> {weather?.data?.wind ?? "--"} km/h
                </span>
                <span className="flex items-center gap-1 text-slate-400 italic">
                    <Cloud className="h-4 w-4 text-white" /> {weather?.data?.rainProb ?? "--"}%
                </span>
            </div>
        </div>
    );
}
