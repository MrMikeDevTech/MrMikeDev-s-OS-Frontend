import ServicesWidget from "../Widgets/Services";
import TimeDateWidget from "../Widgets/TimeDate";
import WeatherWidget from "../Widgets/Weather";

export default function Aside({ services }: { services: AsideServicesProps[] | null }) {
    return (
        <aside className="flex w-90 flex-col gap-6">
            <TimeDateWidget />
            <WeatherWidget />
            <ServicesWidget services={services} />
        </aside>
    );
}
