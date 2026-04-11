import { weatherApi } from "./Weather.axios";

const GetWeather = async () => {
    const response = await weatherApi.get("/");

    const data: WeatherData = {
        status: response.data.status || "error",
        message: response.data.message || "",
        data: response.data.data || null
    };

    return data;
};

export { GetWeather };
