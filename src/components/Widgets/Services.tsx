import { Server } from "../Icons";
import Badge, { type BadgeColor } from "../Badge";
import ServiceItem from "../ServiceItem";
import { useEffect, useState } from "react";

export default function ServicesWidget({ services }: { services: AsideServicesProps[] | null }) {
    const [activeServices, setActiveServices] = useState(0);
    const [totalServices, setTotalServices] = useState(0);

    useEffect(() => {
        if (services) {
            setActiveServices(services.filter((service) => service.status === "active").length);
            setTotalServices(services.length);
        }
    }, [services]);

    const colorServicesCount = (): BadgeColor => {
        if (!services) {
            return "gray";
        } else if (activeServices === totalServices) {
            return "green";
        } else if (activeServices > totalServices / 2) {
            return "yellow";
        } else {
            return "red";
        }
    };

    return (
        <section className="flex flex-col gap-5 overflow-hidden rounded-2xl border border-white/5 bg-[#0a0a0c] p-5 ring-1 ring-white/5">
            <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-lg text-slate-400">
                    <Server className="h-4 w-4 text-white" />
                    Estado de los servicios
                </span>

                <Badge
                    text={`${!services ? "-/-" : `${activeServices}/${totalServices}`} activos`}
                    color={colorServicesCount()}
                />
            </div>
            <div className="flex flex-col gap-2">
                {services
                    ? services.map((service) => <ServiceItem key={service.id} service={service} />)
                    : Array.from({ length: 8 }).map((_, index) => (
                          <div
                              key={index}
                              className="flex animate-pulse items-center justify-between gap-2 rounded-xl p-2"
                              style={{ marginTop: index === 0 ? "0" : "-0.25rem" }}
                          >
                              <span className="flex items-center gap-2">
                                  <div className="h-4 w-4 rounded-full bg-white/5" />
                                  <div className="h-4 w-28 rounded-md bg-white/5" />
                              </span>
                              <div className="flex items-center gap-2">
                                  <div className="h-5 w-18 rounded-full bg-white/5" />
                                  <div className="h-7 w-7 rounded-full bg-white/5" />
                              </div>
                          </div>
                      ))}
            </div>
        </section>
    );
}
